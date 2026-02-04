Roy Mendelssohn-nak köszönhetően ezt írja fel.

A Python A "xarray" csomag nagyon népszerűvé vált a hálózati adatok különböző formátumokban történő hozzáférése, leállítása és vizualizálása szempontjából. "xarray" jól működik ERDDAP™ Ha egyszer megérti, hogyan kell megfelelően használni. Rámutatnék, hogy a Python "erddapy" csomag "..." ( https://github.com/ioos/erddapy ) az adatokhoz való hozzáférés ERDDAP™ szerverek mind a "griddap", mind a " tabledap ", és a "erddapy" exportálhatja az adatokat "xarray"-re. De ha hozzászokik, hogy használja a "xarray" és a munkafolyamatok a csomagot, akkor kívánatos lehet, hogy csak működjön az egységes csomagban. Az alábbiakban egy példa egy "griddap" adatkészlettel.

Az egyik kedvenc adatkészletem a JPL MURv4.1 SST-adatok. https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html ... Ha meg akarom tenni az adatkészletet, mondjuk 2026. január 28., latitdues (20,50) és hosszúság (-140, -105) és letölteni egy netcdf fájlt, ERDDAP™ URL ez lenne https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z 1:1: (2026-01-28T09:00Z) [[Ki]]] (20.) :1:1: (50.) [[Ki]]] (-140) :1:1: (-105) ] ésszerű feltételezni, hogy ez az, amit a „szürke”-ben használ. De valójában, ha ezt megteszitek, hibát kaptok.

Az ok, amiért ez hibát okoz, az az, hogy a „szürke” használata OPeNDAP   ( https://www.opendap.org ) mint a távoli hozzáférés protokollja, és míg ERDDAP™ A szintax alapul OPeNDAP Szintaxis és ERDDAP™ szerver is működhet, mint egy OPeNDAP szerver, vannak különbségek, hogy ez hogyan történik a két szolgáltatás. (Lásd például https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) ... Minden ERDDAP URL szeletelés vagy szűrés nélkül, csak a datasetID úgy viselkedik, mint egy OPeNDAP URL és kompatibilis lesz az röntgenszel.

Ha úgy gondoljuk, hogy milyen lépések vannak a helyi hozzáféréshez NetCDF fájl "xarray" mi tennénk a következő lépéseket:

- Nyissa meg a fájlt, ha rámutat a fájl teljes útjára
- Nézze meg az első lépés koordinált adatait
- Használja az egyik különböző "szelekt" módszert az adatok leállítására

A fentiekben először megnyitja a fájlt, majd végezze el a helyettesítést. A "xarray" használatához egy ERDDAP™ adatkészlet, amit ugyanazt csinálsz, ha egyszer rájössz, ahogy azt a ERDDAP™ dokumentáció, hogy a "dokumentáció a fájlhoz" az URL, anélkül, hogy bármilyen ellentmondás, a MUR adatkészlet esetében, amely https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Konkrét példaként a MUR adatkészlet használatával, először importálni kell azokat a csomagokat, amelyeket használni kell:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Ezután, amint azt fentebb leírtam, beállítottam az URL-t az adatkészlet "nevére", és megnyitom a "filt" (nem az, hogy valójában a fájlok összesítése) "xr.open_dataset" használatával


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Ez a következőt termeli (Részleges) eredmények a "ds":

Méretek:

8641l magasság: 17999 hosszúság: 36000

Koordináták:

Idő (Idő) dátumidő64 [ns] 2002-06-01T09:00 ... 2026-01-...
magasság (magasság) Float32 -89.99 -89.98 ... 89.98 89.99
hosszúság (hosszúság) Float32 -180.0 -180.0 ... 180.0 180.0

Indexek:

Idő PandasIndex
latitude PandasIndex
hosszúság PandasIndex


Ezen a ponton épp úgy haladtatok el, ahogyan azt helyi fájlként tennétek. Két példát adok az alábbiakban, amely az utolsó két alkalommal veszi igénybe a tömör indexelést, és az egyik, amely az elmúlt két alkalommal megkapja az értékeket, és felhasználja azt, hogy az aljzatot készítse el, de mindkét esetben ez azonos azzal, amit egy helyi fájlért tenne.


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

Tehát az otthoni üzenet az, hogy a „szürke” nagyszerűen működik a rácsos adatokhoz egy ERDDAP™ szerver, ha átmegy a "xr.open_dataset () A ERDDAP™ URL fájltípus nélkül és korlátozások nélkül.
