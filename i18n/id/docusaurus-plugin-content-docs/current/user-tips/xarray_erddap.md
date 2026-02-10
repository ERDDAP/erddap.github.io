Terima kasih kepada Roy Mendelssohn untuk menulis ini.

Login Python paket 'xarray' telah menjadi sangat populer untuk mengakses, mengatur dan memvisualisasikan data gridded dalam berbagai format. Perhatikan bahwa 'xarray' bekerja dengan baik dengan ERDDAP™ Sitemap DAP respon baik tabledap dan protokol griddap menggunakan OPen xarray DAP mesin seperti netcdf4 atau pydap. Apa itu OPeNDAP Sitemap Sitemap ERDDAP URL tanpa lisensi atau filter, hanya datasetID Sitemap Saat menggunakan irisan filter namun, atau bahkan OPeNDAP sendiri, satu dapat menggunakan erddapy ( https://github.com/ioos/erddapy ) sebagai mesin xarray. Contoh di bawah ini menunjukkan bagaimana memuat dataset 'griddap'.

Salah satu set data favorit saya adalah data JPL MURv4.1 SST yang tersedia di https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html Sitemap Jika saya ingin melakukan subset data untuk mengatakan Januari 28, 2026, latitdues (20 g) Login (-140, -105) , dan mengunduh file netcdf, ERDDAP™ URL https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) Login (20 g) :1: (50 g) Login (-140) :1: (-105) Sitemap

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Satu dapat mencapai penggunaan yang sama hanya Meme it OPeNDAP URL Jika kita memikirkan langkah-langkah untuk mengakses lokal NetCDF file di 'xarray' kita akan melakukan langkah-langkah berikut:

- Buka file dengan menunjuk pada path penuh ke file
- Lihat informasi koordinat dari langkah pertama
- Gunakan salah satu metode "pilih" untuk mengatur data

Di atas Anda membuka file terlebih dahulu, kemudian lakukan subsetting. Untuk menggunakan 'xarray' dengan ERDDAP™ dataset Anda melakukan hal yang sama, setelah Anda menyadari, seperti dijelaskan di Meme it ERDDAP™ dokumentasi, bahwa "path ke file" adalah URL tanpa format pengembalian dan tanpa kontraint, dalam kasus dataset MUR yang merupakan https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Sebagai contoh beton menggunakan dataset MUR, pertama saya perlu mengimpor paket yang akan digunakan:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Kemudian, sebagai descibed di atas saya mengatur URL ke dataset "nama" dan membuka "file" (tidak itu sebenarnya agregasi file) menggunakan "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Ini menghasilkan berikut (Login) di "ds":

Dimensi:

waktu: 8641l atitude: 17999 longitude: 36000

Koordinat:

Sitemap (Sitemap) datetime64[ns] 2002-06-01T09:00 ... 2026-01-...
Login (Login) TARGET KIRA 8595
Login (Login) Hepatitis C Virus (HCV)

Indeks:

waktu PandasIndex
Login
Login Login


Pada titik ini Anda melanjutkan seperti yang Anda akan memiliki file lokal. Saya memberikan dua contoh di bawah ini, satu yang mengambil dua kali terakhir menggunakan indeks array dan satu yang mendapatkan nilai dari dua kali terakhir dan menggunakan yang membuat subset, tetapi dalam kasus ini identik dengan apa yang akan Anda lakukan untuk file lokal.


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

Jadi pesan pulang adalah 'xarray' bekerja bagus untuk data pada ERDDAP™ server jika Anda lulus ke 'xr.open_dataset () Sitemap ERDDAP™ URL tanpa jenis file dan tanpa batasan, atau gunakan mesin erddapy.
