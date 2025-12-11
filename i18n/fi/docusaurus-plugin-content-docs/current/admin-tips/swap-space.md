Tämä sisältö perustuu a [Kirjoittanut Roy Mendelssohn ERDDAP Käyttäjäryhmä](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Monet apupyynnöt meillä on mukana ongelmia muistin käytön ERDDAP™ . Osa tästä johtuu muistinhallinnan muutoksista Java myös vuorovaikutusta Linux OS -muistinhallinnan kanssa. Aloitan uskomalla Java 17, Java käyttää enemmän muistia kuin mitä kasveihin on laitettu. Voit nähdä tämän, jos tarkastelet kasa asetuksia ja sitten käyttää komentoja, kuten top, htop tai btop tarkistaa muistin käyttöä sovelluksia. Esimerkiksi voimakkaasti käytetty ERDDAP™ 21 Gt: ssä on kallis tila, mutta muistin käyttö voi olla 28 GB-30GB, joskus korkeampi. Tämä arvo voi piristyä, jos järjestelmässä on paljon samanaikaisia suuria pyyntöjä.

Useimmissa Linux-järjestelmissä, kun muistin käyttö on yli 50%, OS alkaa vaihtaa muistia. Useimmissa järjestelmissä vaihtotilaa ei kerätä roskaa, kunnes se on ehdottoman välttämätöntä. ERDDAP™ on liian myöhäistä ja voi aiheuttaa ERDDAP™ jäädyttää. Swap-tila on hidas, mikä suurille datasets.xml Se voi aiheuttaa suuria päivityksiä, jotka eivät ole valmiita, mikä aiheuttaa ongelmia.

Mitä voit tehdä tämän asian suhteen. Ota ensin huomioon oikea muistin käyttö tai järjestelmä, jolloin muistin käyttö ei ylitä 50%. Mutta on myös kaksi asetta, jotka voivat muuttaa tätä käyttäytymistä, vm.swappiness. ja vm.vfs_cache_pressure.

vm.swappiness ohjaa kuinka aggressiivisesti Linux-ydin käyttää swap-tilaa. Voit tarkistaa sen nykyisen arvon:

> cat /proc/sys/vm/swappiness
>
• • Oletus on yleensä 60 (asteikolla 0-100) .
• • Pienemmät arvot tekevät järjestelmästä vähemmän todennäköistä vaihtaa.
• • 10 tai 1 arvoa käytetään usein järjestelmiin, joissa on runsaasti RAM-muistia.


Jos haluat vaihtaa arvoa uudelleenkäynnistyksen jälkeen, sano 10:

> sudo sysctl vm.swappiness=10
>

Muutos pysyvästi:

> sudo nano /etc/sysctl.conf
>

Muokkaa arvoa vm.swappiness. Muutoksen toteuttamiseksi:

> sudo sysctl -p
>

vm.vfs_cache_pressure Näytä tarkat tiedot Järjestelmä kertoo, kuinka aggressiivinen on palauttaa muisti. korkeampia arvoja. (100 tai enemmän) Pyydä järjestelmää olemaan aggressiivinen, jotta voit tarkistaa nykyisen arvon:

> cat /proc/sys/vm/vfs_cache_pressure
>

Muuttaa arvoa seuraavaan käynnistykseen asti:

> sudo sysctl vm.vfs_cache_pressure=150
>

Muuttaa arvoa pysyvästi:

> sudo nano /etc/sysctl.conf
>

Lisää tai päivitä linkki:

> vm.vfs_cache_pressure = 100
>

Sitten sovelletaan muutosta:

> sudo sysctl -p
>


Mitä voit tehdä, jos seuraat swap-tilaa ja huomaat, että swap-käyttö alkaa kasvaa? On komento, joka tyhjentää tilaa ja siirtää sisällön muistiin. Ennen kuin käytät tätä, sinun on varmistettava, että käytettävissä oleva muisti on suurempi kuin vaihdettava. Sanon käytettävissä olevaa muistia, koska Linux-järjestelmissä, joissa on raskas levynkäyttö, "salattu muisti" voi olla melko korkea, joten "vapaa muisti" näkyy hyvin alhaisena, mutta "välimuisti" tulee saataville, jos tällaista komentota tarvitaan.

> sudo swapoff -a && sudo swapon -a
>

Vain olla varma Tykkään laittaa roskakoriin myös tämän jälkeen:

> sudo jcmd $(pgrep java) GC.run
>

Toivon, että jotkut pitävät tätä tietoa hyödyllisenä. Haluamme tehdä ERDDAP™ mahdollisimman voimakkaasti ja toimi mahdollisimman saumattomasti ihmisten kanssa.
