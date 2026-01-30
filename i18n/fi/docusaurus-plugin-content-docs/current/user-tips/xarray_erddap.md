Kiitos Roy Mendelssohnille tästä kirjoituksesta.

The Python Paketista ”harmaa” on tullut erittäin suosittu pääsy, alisääminen ja visualisointi verkkotietojen eri muodoissa. "Ray toimii hyvin" ERDDAP™ Kun ymmärtää, miten sitä käytetään oikein. huomauttaisin, että Python Pakkaus &gt; erddapy """ ( https://github.com/ioos/erddapy ) voi käyttää tietoja ERDDAP™ palvelimet, jotka käyttävät sekä Griddap- että tabledap "Vaikka jyrsijä" on rajoitettu verkkoon tallennettuihin tietoihin, ja "erddapia" voi viedä tiedot "ryöstöön". Mutta jos olet tottunut käyttämään räjähdystä ja työnkulkuja pakkauksen avulla, voi olla toivottavaa vain työskennellä yhden paketin sisällä.

Yksi suosikkitietokoneistani on JPL MURv4.1 SST -tiedot, jotka ovat saatavilla https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . Jos haluan tehdä osan tiedoista 28. tammikuuta 2026, (20,50) ja pituus (140, 105) ja lataa netcdf-tiedosto, ERDDAP™ URL-osoite olisi tämä https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z :1: (2026-01-28T09:00) [1] (20 20) :1: (50) [1] (-140) :1: (105) On järkevää olettaa, että tämä on sitä, mitä käyttäisit rypäleessä. Mutta jos teet niin, saat virheen.

Syynä tähän on se, että räjähdys käyttää OPeNDAP   ( https://www.opendap.org ) etäkäytön pöytäkirjana ja ERDDAP™ syntaksi perustuu OPeNDAP syntaksi ja ERDDAP™ Palvelin voi toimia myös OPeNDAP Palvelin, on eroja, miten tämä tehdään kahden palvelun. (Katso esimerkiksi https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#opendapLibraries ) .

Jos mietimme, miten pääsemme paikalliseen NetCDF Tiedostossa "Carray" teemme seuraavat vaiheet:

- Avaa tiedosto osoittamalla koko reitti tiedostoon
- Katso yhteensovitettu tieto ensimmäisestä askeleesta
- Käytä yhtä "valitsemista" menetelmistä tietojen alentamiseen

Edellä esitetyssä avaat tiedoston ensin ja tee sitten aliasetukset. käyttää nyrkkeilyä yhdellä ERDDAP™ aineisto, jonka teet samalla tavalla, kun tajuat, kuten selitetty ERDDAP™ dokumentaatio, että "tiedoston tie" on URL-osoite ilman palautusmuotoa ja ilman vasta-aineita, jos kyseessä on MUR-tietoaineisto, joka on https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

Konkreettisena esimerkkinä MUR-tietokannan avulla minun on ensin tuotava käytetyt paketit:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

Sitten, kuten edellä on päätetty, asetan URL-osoitteen "nimi" -tietokantaan ja avaan "tiedoston" (Se ei todellakaan ole tiedostojen yhdistämistä.) &gt;xr.open_dataset


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

Tämä tuottaa seuraavat (Osittainen) Tulokset "D":

Dimensio:

Aika: 8641l atitude: 17999 pituus: 36000

Koordinaatit:

Aika-aika (Aika-aika) päivämäärä 64 [n] 2002-06-01T09:00:00 ... 2026-01-
leveys (leveys) float32 -89,99 -89,98 ... 89,98 89,99
Pituus (Pituus) float32 -180.0 -180.0 ... 180.0 180.0

Indeksit:

PandasIndexin aika
PandasIndex
Pituus Pandas-indeksi


Tässä vaiheessa jatkat samalla tavalla kuin olisit ollut paikallinen tiedosto. Alla on kaksi esimerkkiä, joista toinen ottaa viimeiset kaksi kertaa indeksoinnin avulla ja toinen, joka saa arvot viimeisen kaksi kertaa ja käyttää alijoukkoa, mutta kummassakin tapauksessa se on sama kuin mitä tekisit paikalliselle tiedostolle.


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

Kotiviestin otsikko on, että räjähdys toimii erinomaisesti verkkotietoihin ERDDAP™ palvelin, jos siirryt osoitteeseen xr.open_dataset () &gt; ERDDAP™ URL ilman tiedostotyyppiä ja ilman rajoituksia.
