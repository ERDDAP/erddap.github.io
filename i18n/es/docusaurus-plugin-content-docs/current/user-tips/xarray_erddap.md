Gracias a Roy Mendelssohn por este escrito.

El Python paquete 'xarray' se ha convertido en muy popular para acceder, subsetting y visualizar los datos rejillados en una variedad de formatos. Tenga en cuenta que 'xarray' funciona bien con ERDDAP™ 's OPen DAP respuesta para ambos tabledap y protocolos de cuadrícula usando OPen de rayos X DAP motores como netcdf4 o pydap. ¿Qué es un OPeNDAP ¿Respuesta? Es cualquier ERDDAP URL sin corte o filtros, sólo el datasetID . Sin embargo, al usar rodajas de filtros, o incluso OPeNDAP en sí, uno puede usar el erddapy ( https://github.com/ioos/erddapy ) como un motor de rayos X. El ejemplo a continuación muestra cómo cargar un conjunto de datos "griddap".

Uno de mis conjuntos de datos favoritos es los datos JPL MURv4.1 SST disponibles en https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Si quiero hacer un subconjunto de los datos para decir 28 de enero de 2026, latitdues (20,50) y longitudes (-140, -105) , y descargar un archivo netcdf, el ERDDAP™ URL para esto sería https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) [ ] (20) :1: (50) [ ] (-140) :1: (-105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Uno puede lograr lo mismo usando sólo el OPeNDAP URL. Si pensamos en los pasos para acceder a un local NetCDF archivo en 'xarray' haríamos los siguientes pasos:

- Abra el archivo señalando la ruta completa hacia el archivo
- Mira la información de coordenadas desde el primer paso
- Utilice uno de los diversos métodos "seleccionar" para subconfigurar los datos

En lo anterior se abre el archivo primero, luego se hace el subsetting. Para usar 'xarray' con un ERDDAP™ dataset usted hace el mismo, una vez que se da cuenta, como se explica en el ERDDAP™ documentación, que el "path to the file" es la URL sin ningún formato de retorno y sin ningún contrante, en el caso del conjunto de datos MUR que es https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Como ejemplo concreto usando el conjunto de datos MUR, primero necesito importar los paquetes que se utilizarán:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Luego, como descibed arriba, puse la URL al conjunto de datos "nombre" y abrí el "file" (no es que en realidad es una agregación de archivos) usando "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Esto produce lo siguiente (parcial) resultados en "ds":

Dimensiones:

tiempo: 8641l latitud: 17999 longitud: 36000

Coordenadas:

tiempo (tiempo) datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
latitud (latitud) flotador32 -89.99 -89.98 ... 89.98 89.99
longitud (longitud) flotador32 -180.0 -180.0 ... 180.0 180.0

Índices:

tiempo PandasIndex
latitud PandasIndex
longitud PandasIndex


En este punto usted procede como si hubiera sido un archivo local. Doy dos ejemplos a continuación, uno que toma las últimas dos veces usando indexación de matriz y uno que obtiene los valores de las últimas dos veces y utiliza que para hacer el subconjunto, pero en cualquier caso esto es idéntico a lo que haría por un archivo local.


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

Así que el mensaje de toma a casa es que 'xarray' funciona bien para los datos en un ERDDAP™ servidor si pasas a 'xr.open_dataset () ' ERDDAP™ URL sin tipo de archivo y sin restricciones, o utilizar el motor de erddapy.
