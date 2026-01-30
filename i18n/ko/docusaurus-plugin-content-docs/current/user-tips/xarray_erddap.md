이 쓰기에 대한 로이 Mendelssohn 덕분에.

더 보기 Python 패키지 'xarray'는 다양한 형식의 그리드 데이터에 액세스, 축소 및 시각화에 매우 인기가 있습니다. 'xarray'는 잘 작동합니다. ERDDAP™ 제대로 사용하는 방법을 이해 한 번. 나는 그것을 지적한다 Python 패키지 'erddapy 이름 * ( https://github.com/ioos/erddapy ) 데이터 액세스 ERDDAP™ 'griddap'과 '를 사용하는 서버 tabledap ', 'xarray'는 그리드 데이터로 제한되고 'erddapy'는 'xarray'의 데이터를 수출 할 수 있습니다. 하지만 'xarray'를 사용 하 고 패키지를 사용 하 여 작업 흐름을가지고, 단 하나 패키지 내에서 단지 작업에 바람직할 수 있습니다.

가장 좋아하는 데이터 세트 중 하나는 JPL MURv4.1 SST 데이터입니다. https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html · 1 월 28, 2026, latitdues 라고 데이터의 하위 설정하려면 (20,50명) 및 경도 (-140, -105명) , 그리고 netcdf 파일을 다운로드, ERDDAP™ 이 URL은 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ₢ 킹 (20명) : 1 :: (50-100 원) ₢ 킹 (-140명) : 1 :: (-105명) ] 그리고 이것은 당신이 'xarray'에서 사용하는 것이 무엇인지 가정하는 것이 합리적입니다. 그러나 당신이 그렇게하면 당신은 오류를 얻을.

오류가 발생하면 'xarray'가 사용됩니다. OPeNDAP   ( https://www.opendap.org ) 원격 액세스의 프로토콜로, 그리고 동안 ERDDAP™ 구문은 OPeNDAP 구문, 그리고 ERDDAP™ 서버는 또한 행동할 수 있습니다 OPeNDAP 서버, 이 두 서비스를 위해 수행되는 방법에 차이가 있습니다. (예를 들어 https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) ·

지역에 접근하기 위한 단계의 생각 NetCDF 'xarray' 파일은 다음 단계를 수행 할 것입니다.

- 파일에 전체 경로에 포팅하여 파일을 엽니다.
- 첫 번째 단계에서 좌표 정보를 봐
- 다양한 "select" 방법 중 하나를 사용하여 데이터를 설정

위에서 먼저 파일을 열면 하위 설정이 됩니다. 'xarray'를 사용하려면 ERDDAP™ 같은 데이터 세트, 당신이 실현 한 번, 설명 된대로 ERDDAP™ 문서는 "파일 경로"는 모든 반환 형식없이 URL이며 모든 금기없이, MUR dataset의 경우 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

MUR dataset을 사용하여 구체적인 예로, 먼저 사용할 패키지를 가져야 합니다.


```python
import matplotlib.pyplot as plt
import xarray as xr
```

그런 다음 URL을 dataset "name"으로 설정하고 "file"을 엽니다. (그것은 실제로 파일의 집계이다) "xr.open_dataset" 사용


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

다음을 생성합니다. (이름 *) 결과 "ds":

크기:

시간: 8641l 고도: 17999 경도: 36000

좌표:

시간 : (시간 :) datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
이름 * (이름 *) float32 -89.99 -89.98 ... 89.98 89.99
경도 (경도) 부채32 -180.0 -180.0 ... 180.0 180.0

색인:

시간 PandasIndex
위도 PandasIndex
경도 팬더 인덱스


이 시점에서 당신은 로컬 파일이있을 것입니다. 나는 아래 두 가지 예제를 제공합니다, 배열 인덱스를 사용하여 마지막 두 번 걸리는 하나와 마지막 두 번의 값을 얻는 것은 하위 세트를 만들기 위해 사용하지만, 이 경우는 로컬 파일에 대해 할 것입니다.


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

그래서 집 메시지는 'xarray'는 그리드 데이터에 대 한 훌륭한 ERDDAP™ 'xr.open_dataset에 전달하면 서버 () 이름 * ERDDAP™ 파일 형식없이 URL 및 제약없이.
