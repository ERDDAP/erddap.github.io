Díky Royi Mendelssohnovi za tohle psaní.

The Python balíček "xarray" se stal velmi populární pro přístup, subsetování a vizualizaci mřížkovaných dat v různých formátech. Všimněte si, že "xarray" funguje v pořádku s ERDDAP™ OPen DAP odpověď pro oba tabledap a Griddap protokoly pomocí xarray OPen DAP Motory jako netcdf4 nebo pydap. Co je OPeNDAP Odpověď? Je to všechno. ERDDAP URL bez krájení nebo filtrů, jen datasetID . Při použití plátků filtrů však nebo dokonce OPeNDAP sám, jeden může použít erddapy ( https://github.com/ioos/erddapy ) jako rentgenový motor. Níže uvedený příklad ukazuje, jak načíst soubor dat 'griddap'.

Jedním z mých oblíbených souborů dat je JPL MURv4.1 SST data dostupná na https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Pokud chci udělat podmnožinu dat pro řekněme 28. ledna 2026, latitdues (20,50) a délky (- 140, - 105) , a stáhnout soubor netcdf, ERDDAP™ URL pro toto by bylo https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (- 140) :1: (- 105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Jeden může dosáhnout stejné pomocí jen OPeNDAP URL. Pokud si vzpomenu na kroky k přístupu k místní NetCDF soubor v 'xarray' jsme udělali následující kroky:

- Otevřete soubor ukazováním na plnou cestu k souboru
- Podívejte se na informace o souřadnicích z prvního kroku
- Pomocí jedné z různých metod "vybrat" podmnožovat data

Ve výše uvedeném otevřete nejprve soubor, pak provedete subsetting. K použití xarray s ERDDAP™ Uděláte totéž, jakmile si uvědomíte, jak je vysvětleno v ERDDAP™ dokumentace, že "cesta do souboru" je URL bez jakéhokoliv formátu návratu a bez jakýchkoliv kontraintů, v případě souboru MUR, který je https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Jako konkrétní příklad pomocí datového souboru MUR musím nejprve importovat balíčky, které budou použity:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Poté, jak je uvedeno výše, nastavím URL do datového souboru "jméno" a otevřem "soubor" (ne že by se jednalo o agregace souborů) pomocí "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

To vytváří následující: (částečný) výsledky "ds":

Rozměry:

čas: 8641lzeměpisná šířka: 17999 zeměpisná délka: 36000

Souřadnice:

čas (čas) datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
zeměpisná šířka (zeměpisná šířka) plovák32 -89.99 -89.98 ... 89.98 89.99
zeměpisná délka (zeměpisná délka) plovák32 - 180.0 - 180.0 ... 180.0 180.0

Indexy:

čas PandasIndex
zeměpisná šířka PandasIndex
zeměpisná délka PandasIndex


V tuto chvíli budete postupovat stejně jako by to byl místní soubor. Uvedu dva příklady níže, jeden, který vezme poslední dvakrát pomocí indexování pole a jeden, který dostane hodnoty poslední dvakrát a používá to k vytvoření podmnožiny, ale v obou případech je to stejné jako to, co byste udělali pro místní soubor.


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

Takže zpráva je, že xarray funguje skvěle pro data o ERDDAP™ server, pokud přejdete na 'xr.open_dataset () ' ERDDAP™ URL bez typu souboru a bez omezení, nebo použijte motor erddapy.
