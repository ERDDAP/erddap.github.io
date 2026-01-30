感谢Roy Mendelssohn的写作。

那个 Python 软件包“xarray”对于以多种格式访问、子设置和可视化网格数据已变得非常流行。 "战列舰"可以 ERDDAP™ 一旦你明白如何正确使用它。 我要指出的是, Python 软件包“ erdadpy”  ' ( https://github.com/ioos/erddapy ) 可以从 ERDDAP™ 使用“ griddap” 和“ ” 的服务器 tabledap ',而'xarray'仅限于网格数据,而'erdadapy'可以导出数据用于'xarray'. 但如果你习惯于使用"xarray",并且有使用软件包的工作流程,那么仅仅在单一软件包内工作是可取的.

我最喜欢的一个数据集是 JPL MURv4.1 SST 数据 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html 。 。 。 如果我想做一个数据子集 2026年1月28日 (20 50个) 和经度 (-140, -105 (英语).) ,并下载 netcdf 文件, ERDDAP™ 这个的 URL 是 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z : 1 个: (2026-01-28 T09:00:00Z) [ (20 (简体中文).) : 1 个: (50个) [ (-140号) : 1 个: (-105岁) 假设这就是你用在"轴心"里 但事实上,如果你这样做,你是一个错误。

产生错误的原因是“ xarray” 使用 OPeNDAP   ( https://www.opendap.org ) 作为远程访问的协议,以及 ERDDAP™ 语法基于 OPeNDAP 语法,以及 ERDDAP™ 服务器也可以作为 OPeNDAP 服务器时,两种服务如何进行有差异。 (见例如 https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) 。 。 。 。

如果我们想到 进入本地的步骤 NetCDF 在“ xarray” 中,我们会采取以下步骤:

- 通过指向文件的全部路径打开文件
- 从第一步看坐标信息
- 使用各种“ 选择” 方法之一对数据进行子集

在上方,您先打开文件,然后进行子设定。 用“ xarray ” 与 ERDDAP™ 数据集,一旦你意识到, 也这样做,如 ERDDAP™ 文档,“路径到文件”是URL,没有任何返回格式,也没有任何对数,如果是MUR数据集的话。 https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

作为使用MUR数据集的具体例子,首先我需要导入将使用的软件包:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

然后,随着上面的剥离,我将URL设置到数据集"姓名"并打开"文件". (并不是它实际上是文件的集合) 使用“ xr. open_ dataset ”


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

这会产生以下结果: (部分) “ds”结果:

尺寸 :

时间:8641l 纬度:17999 纬度:36000

坐标:

时间 (时间) 日期时间64[ns]2002-06-01T09:00. 2026-01-.
纬度 (纬度) 浮点32 - 89.99 - 89.98... 89.98 89.99
经度 (经度) 浮点32 - 180.0 - 180.0 1800.0

索引 :

时间熊猫Index
纬度熊猫Index
经度 熊猫Index公司


此时此刻,你照原样进行,如果它是本地文件的话。 下面我举出两个例子,一个是使用数组索引的最近两次,一个是获得最近两次的数值,然后用它来制作子集,但无论在哪种情况下,这都与你为本地文件所做的一样。


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

所以带回家的讯息是,“xarray”对一个被网格化的数据很有用 ERDDAP™ 如果您通过到 Xr. open_dataset 服务器 ()  ' ERDDAP™ 没有文件类型和限制的 URL 。
