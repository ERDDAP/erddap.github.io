Dzięki Royowi Mendelssohnowi za to napisanie.

W Python pakiet 'xarray' stał się bardzo popularny w zakresie dostępu do danych, ich podstawiania i wizualizacji w różnych formatach. Zauważ, że 'xarray' działa dobrze z ERDDAP™ Open DAP odpowiedź dla obu tabledap i protokoły griddap przy użyciu Open Xarray DAP silniki takie jak netcdf4 lub pydap. Co to jest OPeNDAP Odpowiedź? Jest ERDDAP URL bez krojenia lub filtrów, tylko datasetID . Przy użyciu plasterki filtrów lub nawet OPeNDAP sam, można użyć erddapy ( https://github.com/ioos/erddapy ) jako silnik xarray. Poniższy przykład pokazuje jak załadować zbiór danych 'griddap'.

Jednym z moich ulubionych zbiorów danych jest JPL MURv4.1 SST dane dostępne na stronie https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Jeśli chcę zrobić podzbiór danych na powiedzmy 28 stycznia 2026, latitdues (20,50) i przemijające (- 140, - 105) , i pobrać plik netcdf, ERDDAP™ URL dla tego będzie https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ): 1 (2026-01-28T09: 00: 00Z) ] [ (20) 1: (50) ] [ (- 140) 1: (- 105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Można osiągnąć to samo za pomocą tylko OPeNDAP URL. Jeśli pomyślimy o krokach do dostępu do lokalnego NetCDF plik w 'xarray' wykonalibyśmy następujące kroki:

- Otwórz plik wskazując pełną ścieżkę do pliku
- Spójrz na informacje o współrzędnych z pierwszego kroku
- Użyj jednej z różnych metod "select" do podzbioru danych

W powyższym najpierw otwierasz plik, a następnie podstawiasz. Aby użyć 'xarray' z ERDDAP™ dataset zrobić to samo, gdy uświadomisz sobie, jak wyjaśniono w ERDDAP™ dokumentacja, że "ścieżka do pliku" jest URL bez żadnego formatu zwrotu i bez żadnych kontrastów, w przypadku zbioru danych MUR, który jest https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Jako konkretny przykład przy użyciu zbioru danych MUR, najpierw muszę zaimportować pakiety, które będą używane:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Następnie, jak descibed above I ustawić URL do zbioru danych "name" i otworzyć "file" (nie to, że jest to właściwie agregacja plików) przy użyciu "xr.open _ dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Powoduje to: (częściowy) wyniki w "ds":

Wymiary:

czas: 8641l szerokość geograficzna: 17999 długość geograficzna: 36000

Współrzędne:

czas (czas) datetime64 [ns] 2002-06-01T09: 00: 00... 2026-01-...
szerokość geograficzna (szerokość geograficzna) float32 -89,99 -89,98... 89,98 89,99
długość geograficzna (długość geograficzna) float32 -180.0 -180.0... 180.0 180.0

Wskaźniki:

Czas PandasIndex
szerokość geograficzna PandasIndex
długość geograficzna PandasIndex


W tym momencie postępuj tak jak byś chciał, żeby to były lokalne akta. Podam dwa przykłady poniżej, jeden, który bierze ostatnie dwa razy używając indeksowania tablic i jeden, który otrzymuje wartości ostatnich dwóch razy i używa tego do tworzenia podzbioru, ale w każdym przypadku jest to identyczne z tym, co zrobiłbyś dla lokalnego pliku.


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

Więc wiadomość do domu jest, że 'xarray' działa świetnie dla danych na ERDDAP™ server if you pass to 'xr.open _ dataset () " ERDDAP™ URL bez typu pliku i bez ograniczeń, lub użyć erddapy silnika.
