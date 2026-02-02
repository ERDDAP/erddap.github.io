Díky Royi Mendelssohnovi za tohle psaní.

The Python balíček "xarray" se stal velmi populární pro přístup, subsetování a vizualizaci mřížkovaných dat v různých formátech. "xarray" funguje dobře s ERDDAP™ jakmile pochopíte, jak ji správně používat. Chtěl bych zdůraznit, že Python balík 'erddapy ' ( https://github.com/ioos/erddapy ) může přistupovat k údajům z ERDDAP™ servery používající 'griddap' a ' tabledap ' a 'erddapy' může exportovat data pro 'xarray'. Ale pokud jste zvyklí používat "xarray" a mají pracovní postupy pomocí balíčku, pak může být žádoucí jen pracovat v rámci jednoho balíčku. Níže je příklad s datovým souborem "griddap."

Jedním z mých oblíbených souborů dat je JPL MURv4.1 SST data dostupná na https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Pokud chci udělat podmnožinu dat pro řekněme 28. ledna 2026, latitdues (20,50) a délky (- 140, - 105) , a stáhnout soubor netcdf, ERDDAP™ URL pro toto by bylo https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) ][ (20) :1: (50) ][ (- 140) :1: (- 105) ] a je rozumné předpokládat, že to je to, co byste použít v "xarray." Ale ve skutečnosti, když to uděláte, dostanete chybu.

Důvod, proč to způsobuje chybu je, že "xarray" používá OPeNDAP   ( https://www.opendap.org ) jako protokol pro vzdálený přístup, a zatímco ERDDAP™ Syntaxe je založena na OPeNDAP syntaxe a ERDDAP™ server může také působit jako OPeNDAP Server, existují rozdíly v tom, jak se to dělá pro tyto dvě služby. (Viz např. https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . Jakýkoli ERDDAP URL bez krájení nebo filtrů, jen datasetID , chová se jako OPeNDAP URL a bude kompatibilní s xarray.

Pokud si vzpomenu na kroky k přístupu k místní NetCDF soubor v 'xarray' jsme udělali následující kroky:

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

Takže zpráva je, že xarray funguje skvěle pro mřížkované údaje o ERDDAP™ server, pokud přejdete na 'xr.open_dataset () ' ERDDAP™ URL bez typu souboru a bez omezení.
