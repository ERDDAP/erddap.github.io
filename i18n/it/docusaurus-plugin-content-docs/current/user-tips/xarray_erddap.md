Grazie a Roy Mendelssohn per questo scrivi.

The Python pacchetto 'xarray' è diventato molto popolare per l'accesso, la suddivisione e la visualizzazione dei dati grigliati in una varietà di formati. Si noti che 'xarray' funziona bene con ERDDAP™ 's OPen DAP risposta per entrambi tabledap e protocolli di grigliata utilizzando l'OPen di xarray DAP motori come netcdf4 o pidap. Che cosa è un OPeNDAP risposta? È tutto ERDDAP URL senza slicing o filtri, solo il datasetID . Quando si utilizzano fette di filtri tuttavia, o anche OPeNDAP se stesso, si può usare l'erddapy ( https://github.com/ioos/erddapy ) come motore xarray. L'esempio seguente mostra come caricare un set di dati 'griddap'.

Uno dei miei dati preferiti è il JPL MURv4.1 SST dati disponibili al https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Se voglio fare un sottoinsieme dei dati per dire il 28 gennaio 2026, latitdues (20,50) e longitudini (-140, -105) , e scaricare un file netcdf, ERDDAP™ URL per questo sarebbe https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00:00:00Z) # (20) :1: (50) # (- 140) :1: (- No.) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Si può raggiungere lo stesso utilizzando solo il OPeNDAP URL. Se pensiamo ai passi per accedere a un locale NetCDF file in 'xarray' faremo i seguenti passaggi:

- Aprire il file indicando il percorso completo al file
- Guarda le informazioni coordinate dal primo passo
- Utilizzare uno dei vari metodi "selezionare" per sottomettere i dati

In quanto sopra si apre il file prima, quindi fare la sottosetting. Per usare 'xarray' con un ERDDAP™ dataset fai lo stesso, una volta che ti rendi conto, come spiegato nel ERDDAP™ documentazione, che il "percorso al file" è l'URL senza alcun formato di reso e senza alcun contraente, nel caso del dataset MUR che è https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Come esempio concreto utilizzando il dataset MUR, prima devo importare i pacchetti che verranno utilizzati:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Poi, come descibed sopra ho impostato l'URL al dataset "nome" e aprire il "file" (non che è in realtà un aggregazione di file) usando "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Ciò produce quanto segue: (parziale) risultati in "ds":

Dimensioni:

tempo: 8641l attitudine: 17999 longitudine: 36000

Coordinate:

tempo (tempo) datetime64[ns] 2002-06-01T09:00:00:00... 2026-01-...
latitudine (latitudine) float32 -89.99 -89.98 ... 89.98 89.99
longitudine (longitudine) 180.0 -180.0 -180.0 ... 180.0 180.0

Indici:

tempo PandasIndex
latitudine PandasIndex
longitudine PandasIndex


A questo punto si procede proprio come si sarebbe potuto essere un file locale. Di seguito do due esempi, uno che prende le ultime due volte utilizzando l'indicizzazione di array e uno che ottiene i valori delle ultime due volte e utilizza che per rendere il sottoinsieme, ma in entrambi i casi questo è identico a quello che faresti per un file locale.


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

Così il messaggio di casa di take è che 'xarray' funziona grande per i dati su un ERDDAP™ server se si passa a 'xr.open_dataset () ' ERDDAP™ URL senza un tipo di file e senza vincoli, o utilizzare il motore erddapy.
