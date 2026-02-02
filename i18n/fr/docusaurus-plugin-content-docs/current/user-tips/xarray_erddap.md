Merci à Roy Mendelssohn pour cette écriture.

Les Python paquet 'xarray' est devenu très populaire pour l'accès, la sous-réglage et la visualisation des données maillées dans une variété de formats. 'xarray' fonctionne bien avec ERDDAP™ une fois que vous comprenez comment l'utiliser correctement. Je voudrais souligner que Python paquet 'erddapy ' ( https://github.com/ioos/erddapy ) peut accéder aux données de ERDDAP™ serveurs utilisant à la fois 'griddap' et ' tabledap ', et 'erddapy' peut exporter les données pour 'xarray'. Mais si vous êtes habitué à utiliser "xarray" et avez des workflows en utilisant le paquet, alors il peut être souhaitable de simplement travailler dans le paquet unique. Ce qui suit est un exemple avec un ensemble de données 'griddap'.

L'un de mes ensembles de données préférés est les données SST JPL MURv4.1 disponibles à https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Si je veux faire un sous-ensemble des données par exemple janvier 28, 2026, latitdues (20,50) et longitudes (-140, -105) , et télécharger un fichier netcdf, le ERDDAP™ URL pour cela serait https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z ):1: (2026-01-28T09:00:00Z) [] (20) :1 : (50) [] (-140) :1 : (-105) ] et il est raisonnable de supposer que c'est ce que vous utiliseriez dans "xarray". Mais en fait, si vous le faites, vous avez eu une erreur.

La raison pour laquelle cela produit une erreur est que 'xarray' utilise OPeNDAP   ( https://www.opendap.org ) comme son protocole pour l'accès à distance, et pendant ERDDAP™ syntaxe est basée sur OPeNDAP syntaxe, et un ERDDAP™ serveur peut également agir comme un OPeNDAP serveur, il y a des différences dans la façon dont cela est fait pour les deux services. (Voir par exemple https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) . Toutes ERDDAP URL sans coupe ou filtres, juste le datasetID , se comporte comme un OPeNDAP URL et sera compatible avec xarray.

Si nous pensons aux étapes pour accéder à un local NetCDF fichier dans 'xarray' nous faisons les étapes suivantes:

- Ouvrir le fichier en pointant le chemin complet vers le fichier
- Regardez les coordonnées dès la première étape
- Utilisez l'une des différentes méthodes de sélection pour sous-ensembler les données

Dans ce qui précède vous ouvrez le fichier d'abord, puis faites le sous-réglage. Pour utiliser 'xarray' avec un ERDDAP™ dataset vous faites la même chose, une fois que vous réalisez, comme expliqué dans le ERDDAP™ documentation, que le "chemin vers le fichier" est l'URL sans aucun format de retour et sans contrainte, dans le cas de l'ensemble de données MUR qui est https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

En tant qu'exemple concret utilisant l'ensemble de données MUR, je dois d'abord importer les paquets qui seront utilisés:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Puis, comme décrit ci-dessus, j'ai défini l'URL du jeu de données "nom" et j'ouvre le "fichier" (pas qu'il s'agisse en fait d'une agrégation de fichiers) utilisant "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Cela donne les résultats suivants : (partielle) résultats en "ds":

Dimensions:

durée: 8641l altitude: 17999 longitude: 36000

Coordonnées :

heure (heure) dateheure64[ns] 2002-06-01T09:00:00 ... 2026-01-...
latitude (latitude) float32 -89.99 -89.98 ... 89.98 89.99
longitude (longitude) float32 -180,0 -180,0 ... 180,0 180,0

Indices

temps PandasIndex
latitude PandasIndex
longitude Indice de Pandas


À ce moment-là, vous procédez comme si c'était un fichier local. Je donne deux exemples ci-dessous, un qui prend les deux dernières fois en utilisant l'indexation de tableau et un qui obtient les valeurs des deux dernières fois et utilise cela pour faire le sous-ensemble, mais dans les deux cas c'est identique à ce que vous feriez pour un fichier local.


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

Donc le message à la maison est que 'xarray' fonctionne bien pour les données maillées sur un ERDDAP™ serveur si vous passez à 'xr.open_dataset () Les ERDDAP™ URL sans type de fichier et sans contraintes.
