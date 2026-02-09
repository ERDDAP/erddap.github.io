Thanks to Roy Mendelssohn for this write up.

The Python package 'xarray' has become very popular for accessing, subsetting and visualizing gridded data in a variety of formats. Note that 'xarray' works fine with ERDDAP™'s OPenDAP response for both tabledap and griddap protocols using xarray's OPenDAP engines like netcdf4 or pydap. What is an OPeNDAP response? It is any ERDDAP URL without slicing or filters, just the datasetID. When using slices of filters however, or even OPeNDAP itself, one can use the erddapy (https://github.com/ioos/erddapy) as an xarray engine. The example below shows how to load a 'griddap' dataset.

One of my favorite datasets is the JPL MURv4.1 SST data available at https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html.  If I want to do a subset of the data for say January 28, 2026, latitdues (20,50)  and longitudes (-140, -105), and download a netcdf file,  the ERDDAP™ URL for this would be  https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

One can achieve the same using just the OPeNDAP URL. If we think of the steps to access a local NetCDF file in 'xarray' we would do the following steps:

- Open the file by pointing at the full path to the file
- Look at the coordinate information from the first step
- Use one of the various "select" methods to subset the data

In the above you open the file first,  then do the subsetting.  To use 'xarray' with an ERDDAP™ dataset you do the same, once you realize,  as explained in the ERDDAP™ documentation,  that the "path to the file" is the URL without any return format and without any contraints,  in the case of the MUR dataset that is https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.

As a concrete example using the MUR dataset,  first I need to import the packages that will be used:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Then,  as descibed above I set the URL to the dataset "name" and open the "file" (not that it is actually an aggregation of files) using "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

This produces the following (partial) results in "ds":

Dimensions:

    time: 8641l atitude: 17999 longitude: 36000

Coordinates:

    time(time) datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
    latitude(latitude) float32 -89.99 -89.98 ... 89.98 89.99
    longitude(longitude) float32 -180.0 -180.0 ... 180.0 180.0

Indexes:

    time PandasIndex
    latitude PandasIndex
    longitude PandasIndex


At this point you proceed just as you would had it been a local file.  I give two examples below,  one that takes the last two times using array indexing and one that gets the values of the last two times and uses that to make the subset, but in either case this is identical to what you would do for a local file.


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

So the take home message is that 'xarray' works great for data on an ERDDAP™ server if you pass to 'xr.open_dataset()' the ERDDAP™ URL without a file type and without constraints, or use the erddapy engine.
