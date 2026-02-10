Graças a Roy Mendelssohn para escrever.

O Python pacote 'xarray' tornou-se muito popular para acessar, subconfigurar e visualizar dados gradeados em uma variedade de formatos. Note que 'xarray' funciona bem com ERDDAP™ OPen DAP resposta para ambos tabledap e protocolos do griddap usando o OPen do xarray DAP motores como netcdf4 ou pydap. O que é um OPeNDAP resposta? É qualquer ERDDAP URL sem slicing ou filtros, apenas o datasetID . Ao usar fatias de filtros no entanto, ou mesmo OPeNDAP em si, pode-se usar o erddapy ( https://github.com/ioos/erddapy ) como um motor de raio-x. O exemplo abaixo mostra como carregar um conjunto de dados "griddap".

Um dos meus conjuntos de dados favoritos é os dados JPL MURv4.1 SST disponíveis em https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Se eu quiser fazer um subconjunto dos dados para dizer 28 de janeiro de 2026, latitdues (20,50) e longitudes (-140, -105) , e baixar um arquivo netcdf, o ERDDAP™ URL para isso seria https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z :1: (2026-01-28T09:00Z) Não. (20.) :1: (50) Não. (- 140) :1: (- 105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

Um pode alcançar o mesmo usando apenas o OPeNDAP URL. Se pensarmos nos passos para acessar um local NetCDF arquivo em 'xarray' nós faríamos os seguintes passos:

- Abra o arquivo apontando para o caminho completo para o arquivo
- Veja as informações de coordenadas do primeiro passo
- Use um dos vários métodos "selecionar" para subpor os dados

No acima você abre o arquivo primeiro, então faça a subconfiguração. Para usar "xarray" com um ERDDAP™ dataset você faz o mesmo, uma vez que você percebe, como explicado no ERDDAP™ documentação, que o "caminho para o arquivo" é a URL sem qualquer formato de retorno e sem quaisquer contraints, no caso do conjunto de dados MUR que é https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Como exemplo concreto usando o conjunto de dados MUR, primeiro preciso importar os pacotes que serão usados:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Então, como dizimado acima, eu defina a URL para o conjunto de dados "nome" e abra o "arquivo" (não que é realmente uma agregação de arquivos) usando "xr.open_dataset"


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Isso produz o seguinte (parcial) resultados em "ds":

Dimensões:

time: 8641l atitude: 17999 longitude: 36000

Coordenadas:

Tempo (Tempo) Datetime64[ns] 2002-06-01T09:00 ... 2026-01-...
latitude (latitude) float32 -89.99 -89.98 ... 89.98 89.99
longitude (longitude) float32 -180.0 -180.0 ... 180.0 180.0

Índices:

Tempo em PandasIndex
latitude PandasIndex
longitude Produtos de plástico


Neste ponto você prosseguir assim como você teria sido um arquivo local. Eu dou dois exemplos abaixo, um que leva as duas últimas vezes usando indexação de array e um que recebe os valores das duas últimas vezes e usa isso para fazer o subconjunto, mas em qualquer caso isso é idêntico ao que você faria para um arquivo local.


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

Então, a mensagem leva para casa é que "xarray" funciona muito bem para dados sobre um ERDDAP™ servidor se você passar para 'xr.open_dataset () ' ERDDAP™ URL sem um tipo de arquivo e sem restrições, ou usar o motor erddapy.
