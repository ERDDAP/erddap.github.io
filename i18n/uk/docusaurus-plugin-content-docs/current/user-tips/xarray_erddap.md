Завдяки Roy Mendelssohn для цього запису.

Про нас Python Пакет «xarray» дуже популярний для доступу, підкатування та візуалізації даних сітки в різних форматах. Зверніть увагу, що «xarray» працює відмінно з ERDDAP™ ОПЕН DAP відповідь як tabledap і протоколи сітчастих протоколів за допомогою ОПЕН-сервера xarray DAP двигуни, як netcdf4 або pydap. Що таке OPeNDAP відповідь? Це будь-який ERDDAP URL без нарізання або фільтрів, просто datasetID й При використанні часточок фільтрів, однак, або навіть навіть OPeNDAP себе, можна використовувати erddapy ( https://github.com/ioos/erddapy ) як рентгенівський двигун. На прикладі нижче показано, як завантажити "griddap" dataset.

Один з моїх улюблених даних є JPL MURv4.1 SST дані, доступні на https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html й Якщо я хочу, щоб зробити підмножину даних, щоб сказати 28 січня 2026 р., latitdues (20,50 р.) і довготи (-140, -105) , і завантажити файл netcdf, ERDDAP™ URL для цього буде https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28Т09:00:00З) й (20 хв) :1: (50 р.) й (-140) :1: (-105) до

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Один може досягти тієї ж за допомогою просто OPeNDAP URL. Якщо ми думаємо про кроки до доступу NetCDF Файл в 'xarray' ми зробимо наступні дії:

- Відкрийте файл, натиснувши на повний шлях до файлу
- Переглянути координацію з першого кроку
- Використовуйте один з різних методів "виберіть" для заміни даних

У вищезгаданих ви відкриєте файл спочатку, потім робимо підстановку. Для використання 'xarray' з ERDDAP™ пошук даних, які ви робите так само, як тільки ви зрозуміли, як пояснили в ERDDAP™ документація, що «пати до файлу» є URL без будь-якого формату повернення і без будь-яких обмежень, у випадку з даними MUR, що є https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

В якості конкретного прикладу з використанням даних MUR, спочатку потрібно імпортувати пакети, які будуть використані:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Потім, як відхиляти вище, я встановив URL до даних "ім'я" і відкрийте "файл" (не те, що це насправді сукупність файлів) Використання "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Це виробляє наступний (частковий) результати в "д":

Розміри:

час: 8641л широта: 17999 довгота: 36000

Географічні координати:

час (час) датачас64[ns] 2002-06-01T09:00 ... 2026-01-...
знаменитості (знаменитості) float32 -89,99 -89.98 ... 89.98 89,99
довгота (довгота) float32 -180.0 -180.0 ... 180.0 180.0

Індекси:

час PandasIndex
знаменитості PandasIndex
довгота ПандасІндекс


У цій точці ви приступите до того, що ви були б локальним файлом. Я даю два приклади нижче, один, який займає останні два рази за допомогою індексації масиву і один, який отримує значення останніх двох разів і використовує, щоб зробити підмножини, але в будь-якому випадку це ідентично тому, що ви б зробити для місцевого файлу.


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

Отже, домашнє повідомлення є те, що "xarray" працює відмінно для даних на сайті ERDDAP™ сервер, якщо ви передаєте на 'xr.open_dataset () - П'ятниця ERDDAP™ URL без типу файлу і без обмежень, або використовуйте двигун erddapy.
