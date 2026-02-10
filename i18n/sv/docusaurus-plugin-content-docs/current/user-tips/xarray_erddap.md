Tack till Roy Mendelssohn för den här skrivningen.

och Python paketet "xarray" har blivit mycket populärt för att komma åt, subsetting och visualisera rutnätsdata i en mängd olika format. Observera att "xarray" fungerar bra med ERDDAP™ OPen DAP Svar för båda tabledap och griddap protokoll med röntgen OPen DAP motorer som netcdf4 eller pydap. Vad är en OPeNDAP svar? Det är någon ERDDAP URL utan skivning eller filter, bara datasetID . När du använder skivor av filter, eller till och med OPeNDAP Själv kan man använda erddapy ( https://github.com/ioos/erddapy ) Som röntgenmotor. Exemplet nedan visar hur man laddar en "griddap" dataset.

En av mina favoritdatamängder är JPL MURv4.1 SST-data tillgänglig på https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Om jag vill göra en delmängd av data för säg 28 januari 2026, latitdues (20,50) och longituds (-140, -105) och ladda ner en netcdf-fil, ERDDAP™ URL för detta skulle vara https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][[f]] (20 20 20 20) 1:1: (50 50 50) ][[f]] (-140) 1:1: (-105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Man kan uppnå samma sak med bara den OPeNDAP URL. Om vi tänker på stegen för att komma åt en lokal NetCDF fil i "xarray" skulle vi göra följande steg:

- Öppna filen genom att peka på hela vägen till filen
- Koordinera information från första steget
- Använd en av de olika "välj" metoderna för att kompensera data

I ovanstående öppnar du filen först, gör sedan subsetting. Att använda "xarray" med en ERDDAP™ dataset du gör detsamma, när du inser, som förklaras i ERDDAP™ dokumentation, att "vägen till filen" är webbadressen utan returformat och utan några motsägelser, när det gäller MUR-datamängden som är https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Som ett konkret exempel med hjälp av MUR-datamängden måste jag först importera de paket som kommer att användas:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Sedan, som descibed ovan anger jag webbadressen till dataset "namn" och öppnar "filen" (inte att det faktiskt är en aggregation av filer) med "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Detta ger följande (partiell) resultat i "ds":

Dimensioner:

8641l atitude: 17999 longitud: 36000

Koordinater:

Tid (Tid) datetime64 [n] 2002-06-01T09:00:00 ... 2026-01-...
Latitud (Latitud) float32 -89.99 -89.98 ... 89.98 89.99
Längd (Längd) float32 -180.0 -180.0 ... 180.0 180.0

Index:

Tid PandasIndex
Latitud PandasIndex
Längd PandasIndex


Vid denna tidpunkt fortsätter du precis som du skulle ha varit en lokal fil. Jag ger två exempel nedan, en som tar de senaste två gångerna med array indexering och en som får värdena av de senaste två gånger och använder som för att göra delmängden, men i båda fallen är det identiskt med vad du skulle göra för en lokal fil.


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

Så ta hem meddelande är att "xarray" fungerar bra för data på en ERDDAP™ server om du passerar till "xr.open_dataset () "den ERDDAP™ URL utan filtyp och utan begränsningar, eller använda erddapy-motorn.
