Bu yazı için Roy Mendelssohn sayesinde.

The The The The The The The The Python Paket ‘xarray’ çeşitli formatlarda ağlayan verileri erişim için çok popüler hale geldi. 'xarray'ın iyi çalıştığını unutmayın ERDDAP™ "Ey OPen DAP Her ikisi için de yanıt tabledap ve griddap protokolleri xarray'ın OPen DAP netcdf4 veya pydap gibi motorlar. Nedir? OPeNDAP Cevap? Herhangi bir şeydir ERDDAP Link veya filtreler olmadan URL, sadece datasetID . Ancak filtrelerini kullanırken veya hatta hatta OPeNDAP Kendisi, biri erddapy kullanabilir ( https://github.com/ioos/erddapy ) xarray motoru olarak. Aşağıdaki örnek, bir 'griddap' veri setini nasıl yükleyeceğinizi gösteriyor.

En sevdiğim veri setlerimden biri, mevcut JPL MURv4.1 SST verileridir https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . 28 Ocak 2026 diyor için verilerin bir alt kümesi yapmak istiyorsam latitdues (20,50) Ve uzun (-140, -105) , ve bir netcdf dosyasını indir, ERDDAP™ Bu URL için URL olurdu https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z 1): (2026-01-28T09:00Z) [8] (20 20) :1: (50 50 50) [8] (-140) :1: (-105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Biri sadece aynı şeyi kullanarak elde edebilir OPeNDAP URL. Yerel bir siteye erişmek için adımları düşünürsek NetCDF 'xarray'da dosya aşağıdaki adımları yaparız:

- Dosyayı dosyayı dosyaya işaret ederek açın
- İlk adımdan koordinat bilgilere bakın
- Verilerin alt kümesi için çeşitli "select" yöntemlerinden birini kullanın

Yukarıdakilerde ilk önce dosyayı açın, sonra alt işareti yapın. "xarray" kullanmak için ERDDAP™ Dataset you do the same, once you understand, as Explain in the ERDDAP™ Belgeler, " Dosyaya sempati" herhangi bir geri format olmadan URL'dir ve herhangi bir kontrat olmadan, MUR veri kümesi durumundadır. https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

MUR veri setini kullanarak somut bir örnek olarak, öncelikle kullanılacak paketleri ithal etmem gerekiyor:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Sonra, URL'yi veri setine "isim" ayarlarım ve "file" açın. (Aslında dosyaların kısaltılması değil) "xr.open_dataset" kullanmak


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Bu aşağıdakileri üretir (kısmi kısmi kısmi kısmi kısmi kısmi) Sonuçlar "ds":

Boyut:

Zaman: 8641l bir yetenek: 17999 uzunluğundalık: 36000

koordinatlar:

Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman (Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman) datetime64[ns] 2002-06-01T09:00 ... 2026-01-...
Entitude (Entitude) yüz32 -89.99 -89.98 ... 89.98 89.99
Uzunlık (Uzunlık) yüz32 -180.0 -180.0 ... 180.0 180.0

Indexes:

Zaman PandasIndex
Entitude PandasIndex
Uzunlık PandasIndex


Bu noktada sadece yerel bir dosya olduğu gibi devam edersiniz. Aşağıda iki örnek veriyorum, son iki kez dizi indeksleme ve son iki kez değerleri alır ve alt kümesi yapmak için bunu kullanırım, ancak bu yerel bir dosya için yaptığınız şeye aynı.


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

Bu yüzden ev mesajı, 'xarray'ın veri için harika çalıştığıdır ERDDAP™ Eğer 'xr.open_dataset () " ERDDAP™ Bir dosya türü olmadan ve kısıtlamalar olmadan URL veya hatalı motoru kullanın.
