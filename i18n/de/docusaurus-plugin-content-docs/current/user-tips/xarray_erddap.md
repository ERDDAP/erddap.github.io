Dank Roy Mendelssohn für diese Aufzeichnung.

Die Python Paket 'xarray' ist sehr beliebt für den Zugriff, Sub-Setting und Visualisierung von Rasterdaten in verschiedenen Formaten geworden. 'xarray' funktioniert gut mit ERDDAP™ sobald Sie verstehen, wie man es richtig verwendet. Ich möchte darauf hinweisen, daß Python Paket 'erddapy ' ( https://github.com/ioos/erddapy ) Zugriff auf Daten von ERDDAP™ Server, die sowohl 'griddap' als auch ' tabledap ' und 'erddapy' können die Daten für 'xarray' exportieren. Aber wenn Sie daran gewöhnt sind, 'xarray' zu verwenden und Workflows mit dem Paket zu haben, dann kann es wünschenswert sein, nur innerhalb des einzigen Pakets zu arbeiten. Im Folgenden ist ein Beispiel mit einem 'griddap'-Datensatz.

Einer meiner Lieblings-Datensätze ist die JPL MURv4.1 SST-Daten verfügbar unter https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Wenn ich eine Untermenge der Daten für sagen 28. Januar 2026 tun möchte, latitdues (20,50) und Längen (-140, -105) , und laden Sie eine netcdf-Datei, die ERDDAP™ URL dafür wäre https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00Z) ,[...][ (20) :1: (50) ,[...][ (- 140) :1: (-105) ] und es ist vernünftig, davon auszugehen, dass dies das ist, was Sie in 'xarray' verwenden würden. Aber in der Tat, wenn Sie das tun, erhalten Sie einen Fehler.

Der Grund, warum dies einen Fehler verursacht, ist, dass 'xarray' verwendet wird OPeNDAP   ( https://www.opendap.org ) als Protokoll für den Fernzugriff und ERDDAP™ syntax basiert auf OPeNDAP Syntax und ERDDAP™ Server kann auch als OPeNDAP Server, es gibt Unterschiede, wie dies für die beiden Dienste getan wird. (Siehe zum Beispiel https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . I ERDDAP URL ohne Slicing oder Filter, nur die datasetID , verhält sich wie ein OPeNDAP URL und wird mit Röntgenstrahlung kompatibel sein.

Wenn wir an die Schritte denken, auf eine lokale NetCDF Datei in 'xarray' würden wir die folgenden Schritte tun:

- Öffnen Sie die Datei, indem Sie auf den vollen Pfad zur Datei zeigen
- Sehen Sie sich die Koordinateninformationen aus dem ersten Schritt an
- Verwenden Sie eine der verschiedenen "select" Methoden, um die Daten zu unterbinden

In den oben genannten öffnen Sie die Datei zuerst, dann tun Sie die Untereinstellung. Verwendung von 'xarray' ERDDAP™ Datensatz Sie tun das gleiche, sobald Sie erkennen, wie in der ERDDAP™ Dokumentation, dass der "Weg in die Datei" die URL ohne Rückgabeformat und ohne Widerspruch ist, bei dem MUR-Datensatz, der https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Als konkretes Beispiel muss ich zuerst die Pakete importieren, die verwendet werden sollen:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Dann, wie oben beschrieben, setze ich die URL auf den Datensatz "Name" und öffne die "Datei" (nicht, dass es tatsächlich eine Aggregation von Dateien) mit "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Dies ergibt folgendes (Teil) Ergebnisse in "ds":

Abmessungen:

Zeit: 8641l Breite: 17999 Länge: 36000

Koordinaten:

Zeit (Zeit) Datetime64[ns] 2002-06-01T09:00 Uhr ... 2026-01-...
Breite (Breite) Float32 -89.99 -89.98 ... 89.98 89.99
Länge (Länge) Float32 -180.0 -180.0 ... 180.0 180.0

Index:

Zeit PandasIndex
Breite und Breite
Länge PandasIndex


An diesem Punkt gehen Sie, wie Sie es gewesen wäre eine lokale Datei. Ich gebe zwei Beispiele unten, eine, die die letzten zwei Mal mit Array-Indizierung und eine, die die Werte der letzten zwei mal bekommt und verwendet, die die Untermenge zu machen, aber in jedem Fall ist dies identisch mit dem, was Sie für eine lokale Datei tun würde.


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

So die Take-Home-Nachricht ist, dass 'xarray' funktioniert großartig für gerastete Daten auf einem ERDDAP™ Server, wenn Sie an 'xr.open_dataset übergeben () ' ERDDAP™ URL ohne Dateityp und ohne Einschränkungen.
