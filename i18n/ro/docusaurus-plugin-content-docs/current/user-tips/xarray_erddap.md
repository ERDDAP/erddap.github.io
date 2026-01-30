Mulţumită lui Roy Mendelssohn pentru asta.

ă Python pachet "xarray" a devenit foarte popular pentru accesarea, subsetarea și vizualizarea datelor în rețea într-o varietate de formate. 'xarray' funcţionează bine cu ERDDAP™ Odată ce înţelegi cum să-l foloseşti cum trebuie. Aș sublinia că Python pachet 'erddapy ' ( https://github.com/ioos/erddapy ) poate accesa date din ERDDAP™ servere care utilizează atât "griddap" cât și " tabledap ', în timp ce 'xarray' este limitat la date în rețea, și 'erddapy' poate exporta datele pentru 'xarray'. Dar dacă sunteți obișnuiți să utilizați 'xarray' și să aveți fluxuri de lucru folosind pachetul, atunci poate fi de dorit să lucrați doar în cadrul pachetului unic.

Unul dintre setările mele preferate este datele JPL MURv4.1 SST disponibile la https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Dacă vreau să fac un subset de date pentru a spune 28 ianuarie 2026, latitdues (20, 50) și longitudine (- 140, -105) , și descărca un fișier netcdf, ERDDAP™ URL pentru acest lucru ar fi https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09: 00: 00Z) [] (20) :1: (50) [] (- 140) :1: (-105) ] și este rezonabil să presupunem că acest lucru este ceea ce v-ar folosi în "xarray." Dar, de fapt, dacă faci acest lucru ai o eroare.

Motivul pentru care acest lucru produce o eroare este că "xarray" folosește OPeNDAP   ( https://www.opendap.org ) ca protocol pentru accesul la distanță, și în timp ce ERDDAP™ sintaxa se bazează pe OPeNDAP sintaxă și ERDDAP™ serverul poate acționa și ca un OPeNDAP server, există diferențe în modul în care se face acest lucru pentru cele două servicii. (A se vedea de exemplu https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) .

Dacă ne gândim la pașii de acces la un local NetCDF fișier în 'xarray' am face următorii pași:

- Deschide fișierul arătând calea completă către fișier
- Uită-te la informațiile coordonate de la primul pas
- Utilizați una dintre diferitele metode "select" pentru a subseta datele

În cele de mai sus deschideți fișierul mai întâi, apoi face subsetarea. Pentru a utiliza "xarray" cu un ERDDAP™ Set de date faci același lucru, odată ce realizezi, așa cum se explică în ERDDAP™ documentație, că "calea către fișier" este URL-ul fără format de returnare și fără contraint-uri, în cazul setului de date MUR care este https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Ca un exemplu concret folosind setul de date MUR, mai întâi trebuie să import pachetele care vor fi utilizate:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Apoi, așa cum descibed de mai sus am setat URL-ul la setul de date "nume" și deschide "fișier" (nu că este de fapt o agregare de fișiere) Folosind "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Acest lucru produce următoarele (parţial) rezultate în "ds":

Dimensiuni:

timp: 8641l altitudine: 17999 longitudine: 36000

Coordonate:

timp (timp) data64[ns] 2002-06-01T09:00 ... 2026-01-...
latitudine (latitudine) float32 -89.99 -89.98 ... 89.98 89.99
longitudine (longitudine) float32 - 180, 0 - 180, 0 ... 180, 0 180, 0

Indice:

timp PandasIndex
latitudine PandasIndex
longitudine PandasIndex


În acest moment vei continua la fel cum ai fi avut un dosar local. Vă dau două exemple de mai jos, unul care ia ultimele două ori folosind indexarea array și unul care primește valorile ultimelor două ori și folosește că pentru a face subgrupul, dar în ambele cazuri acest lucru este identic cu ceea ce ar face pentru un fișier local.


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

Deci, mesajul de a lua acasă este că "xarray" funcționează foarte bine pentru datele în rețea pe o ERDDAP™ server dacă treci la 'xr.open_dataset () ' ERDDAP™ URL fără tip de fișier și fără constrângeri.
