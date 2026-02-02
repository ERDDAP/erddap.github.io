多虧羅伊·門德爾索恩寫了這封信

其 Python 套件「 xarray 」 已經非常流行, 用于以多种格式存取、 子設定和可視化網格化的資料 。 "神舟"行得通 ERDDAP™ 一旦你明白如何正确使用它。 我要指出的是 Python 套件 ' ' ( https://github.com/ioos/erddapy ) 可以存取資料 ERDDAP™ 使用“ griddap” 和“ ” 的伺服器 tabledap ', 而 'erdadapy' 可以匯出 'xarray' 的資料 。 但如果你習慣使用「 xarray」 , 並且有工作流程使用套件, 那么只用單個套件就可以了 。 以下為「 griddap」 資料集的示例 。

我最喜歡的數據集是 JPL MURv4.1 SST 資料 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . 如果我想做2026年1月28日的數據的子集, (20,50) 和經度 (-140, -105) 下載 netcdf 檔案 ERDDAP™ 網址會是 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z : 1: (2026-01-28 T09:00Z) [ (20) : 1: (50) [ (-140) : 1: (-105) 並且可以合理推測這就是你在"x"中會用到的. 但事實上,如果你這樣做,你就會有錯誤。

造成錯誤的原因是「 xarray」 使用 OPeNDAP   ( https://www.opendap.org ) 作為遠端存取的協議, ERDDAP™ 語法基于 OPeNDAP 語法,和 a ERDDAP™ 伺服器也可以做為 OPeNDAP 伺服器, 兩項服務的處理方式不同 。 (例如, https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . 任何 ERDDAP URL 沒有切片或滤波器,只有 datasetID 表現得像個 OPeNDAP URL 與 xarray 兼容 。

如果我們想一想到一個本地人 NetCDF 檔案在「 xarray 」 中會做以下的步數 :

- 指向檔案的全部路徑開啟檔案
- 從第一步看座標信息
- 使用各種「 選取」 方法中的一种來分類資料

在上方您先開啟檔案, 然后做子設定 。 用「 xarray 」 表示 ERDDAP™ 數據集,一旦你意識到,你也會做同樣的事, ERDDAP™ 文件,如果是 MUR 數據集,“ 通向檔案的路徑” 是 URL , 沒有任何回復格式, 也沒有任何對數。 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

首先我需要匯入將使用的套件:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

然後,我把網址放入數據集"姓名" 并打開"檔案" (並不是檔案的集合) 使用 Xr. open_ dataset


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

此產生以下 (部分) 結果為 ds :

尺寸 :

經度: 8641度: 1799度: 36000度

座標:

時間 (時間) 日期時間64[ns] 2002-06-01T09:00... 2026-01-...
纬度 (纬度) 浮32 -89.99 -89.98 89.98
经度 (经度) 浮點32 - 180.0 - 180.0... 1800.0

索引 :

時光熊貓Index
纬度熊貓Index
经度 熊貓Index


這時你照著當地文件做 下面我举了兩個例子,一個是用數目索引來做最後兩次, 一個是用最後兩次的數值來做子集, 但不管怎樣, 這都和您對本地檔案所做的一樣。


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

因此,回家的訊息是, 'xarray' 效果很好,在一個 ERDDAP™ 如果您傳到 Xr. open_ dataset () ' 其 ERDDAP™ URL 沒有檔案類型, 也沒有限制 。
