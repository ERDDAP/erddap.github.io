Roy Mendelssohn のおかげで、この書き込みのために.

ザ・オブ・ザ・ Python パッケージ「xarray」は、さまざまなフォーマットでグリッドデータをアクセス、サブセッティング、視覚化するために非常に人気があります。 'xarray' がうまく機能することに注意してください。 ERDDAP™ オプン DAP 両方のための応答 tabledap xarray の OPen を使用して、および Griddap プロトコル DAP netcdf4 や pydap などのエンジン。 新着情報 OPeNDAP 応答? それはあります ERDDAP スライスまたはフィルタなしでURL、ちょうど datasetID お問い合わせ ただし、フィルタのスライスを使用する場合、 OPeNDAP それ自体、erddapyを使うことができます ( https://github.com/ioos/erddapy ) xarrayエンジンとして。 以下の例では、'griddap' のデータセットをロードする方法を示します。

私のお気に入りのデータセットの1つは、JPL MURv4.1 SSTデータが利用可能 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html お問い合わせ 2026年1月28日、データのサブセットをしたい場合、 (20,50) と経度 (-140, -105) ,netcdfファイルをダウンロード, ERDDAP™ このURLは https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) 〔 〕 (2018年12月20日) :1: (50万円) 〔 〕 (・140) :1: (・105) . .

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

一つは、ちょうど使用して同じを達成することができます OPeNDAP サイトマップ ローカルにアクセスする手順を考えると NetCDF 'xarray' のファイルでは、次の手順を実行します。

- ファイルへのフルパスを指すことでファイルを開く
- 最初のステップから座標情報を見る
- さまざまな「選択」メソッドの1つを使用して、データをサブセットします。

上記では、最初にファイルを開き、サブセットを行います。 'xarray' を使うには、 ERDDAP™ 同じことをするデータセット、あなたが実現したら、説明するように ERDDAP™ ドキュメントは、「ファイルへのパス」が返された形式のないURLであり、制約のないURLであるMURデータセットの場合 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

MUR データセットを使用して具体的な例として、最初に使用するパッケージをインポートする必要があります。


```python
import matplotlib.pyplot as plt
import xarray as xr
```

すると、上記のURLを「名前」に置き、「ファイル」を開きます。 (実際にはファイルの集計ではない) "xr.open_dataset" を使う


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

以下を生成します (部分的な) "ds" の結果:

寸法:

時間: 8641l 高度:17999 経度: 36000

座標:

タイムタイム (タイムタイム) datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
最近の投稿 (最近の投稿) float32 -89.99 -89.98 ... 89.98 89.99
経緯 (経緯) float32 -180.0 -180.0 ... 180.0 180.0

インデックス:

時間 パンダインデックス
緯度 パンダズインデックス
経緯 パンダスインデックス


この時点では、ローカルファイルだっただけに進みます。 以下の2つの例を、配列インデックスと最後の2回の値を取得し、サブセットを作るために使用する配列インデックスを使用して最後の2回をとりますが、この場合はローカルファイルで何をするかと同一です。


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

そのため、"xarray" はデータに対して素晴らしい機能です。 ERDDAP™ 'xr.open_dataset に渡すとサーバ () お問い合わせ ERDDAP™ ファイルタイプなしのURL、制約なし、または erddapy エンジンを使用します。
