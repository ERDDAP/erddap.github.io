---
sidebar_position: 3
---
#  ERDDAP™ Release Process
* Győződjön meg róla, hogy a kép összehasonlító fájlok elérhetőek (Ez azt jelenti, hogy futni `mvn ellenőrzés` , ha azt szeretné, hogy felgyorsítsa, hogy korlátozza csak a ImageComparison csoport, bár megjegyzi, hogy még mindig szüksége van futó Jetty tesztek) 
* frissítési függőségek
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Frissítés pluginok
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Run tesztek, hogy megbizonyosodjanak arról, hogy a függőségi frissítések nem törnek semmit a nagy konfigurációk (különösen az olyan adatkészletek, amelyek egyéb jelentős beállításokat is tartalmaznak) ... Vegye figyelembe, hogy a külső tesztcsomag nagyon ízletes lehet. A lassúAWS tesztcsomag nagyon hosszú időt vehet igénybe.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Használja a TranslateMessages.translate () a fordítások frissítése, ha szükséges
* EDStatic.java létrehozta a fejlesztést Módja hamis, változtassa meg a verziószámot, és adja meg a kiadás dátumát.
* Csináld az építést
```
mvn clean
mvn compile
mvn package
```
## Kanári
Küldje el a háborús fájlt a Coastwatch szerveren vagy más szerveren, amely a legtöbb adatkészlettípust használja, és sok forgalmat kap.
Meg akarjuk próbálni hibákat találni az építkezés szélesebb elosztása előtt.

Tartsa be az üzenetet, amikor egy új kiadásról beszél.

A szabványos eljárás:
* Töltse fel a .war fájlt a partra \\[ Tomcat \\] /content/erddap/
* Felhasználóként=tomcat:
  * Inkább \\[ Tomcat \\] /bin/ :
./shutdown.sh //use "ps -fu tomcat" annak biztosítása érdekében, hogy megállt
  * Inkább \\[ Tomcat \\] /webapps/ :
rm -rf erddap
rm erddap. háború
cp ../content/erddap/erddap2.22.war erddap.war/vagy bármi legyen is a szám
  * Inkább \\[ Tomcat \\] /bin/ :
./startup.sh
  * utána ERDDAP visszatért egy weboldalra, \\[ Tomcat \\] /webapps/ :
Chgrp - R erddap erddap
Chmod - R g+rw erddap
Chmod - R o-rwx erddap

## GitHub kiadás
Raft the GitHub kiadás, beleértve erddap.war és erddapContent .zip   (Nincs verziószám) 

title: The official v2.25 version
Leírás: Lásd a változások listáját
      https://erddap.github.io/changes#version-225

## Dokumentáció frissítés
* Frissítse a verziószámot a docusaurus.config.ts fájlban (a lábléc szakaszában) ...
* Szerkeszteni a dokumentációs oldalakat (telepítés-install.md és telepítés-update.md) ...
  * Keresés \\[ erddap.war \\]  
  * Másolja a meglévő információkat (kissé megreformálva) a korábbi létesítmények listájára 2. 2. 2.
  * Változtassa meg a jelenlegi kiadási információkat az erddap számára. háború \\[ erddap.war \\] 
* Futtassa a dokumentációs oldal fordítását.
* Készítsen egy húzó kérést, és egyesítse a változásokat.
* Dokumentációs webhely telepítése (Olvass tovább) ...

## Gondoskodjon más válaszok naprakészek
Főleg ez azt jelenti, hogy ErddapContent és ErddapTest, de a fejlesztési változások során naprakészen kell tartani őket.

## Bejelentse a felhasználókat
Először értesítsen minden olyan felhasználót, aki módosított (vagy kinek a hibái rögzítettek) ... Adj nekik időt a változások ellenőrzésére és / vagy kérdéseket.

 ERDDAP A 2.25 verzió már elérhető&#33;

Elolvashatja a változásokat a
https://erddap.github.io/changes#version-225

A változások egy része megváltozik, amit javasolt. Köszönöm nagyon a javaslatokat. Keresse meg a nevét a változások listáján, hogy lássa a részleteket. Nagyszerű lenne, ha hamarosan kipróbálnák az új funkciókat, mielőtt bejelentem volna ezt az új verziót egy szélesebb közönségnek.

Ha Ön egy ERDDAP adminisztrátor, a frissítési utasítások vannak
https://erddap.github.io/docs/server-admin/deploy-update

Ha bármilyen problémád van, kérdéseid, javaslataid, küldj nekem.

Köszönöm, hogy használja ERDDAP ...

### Bejelentkezés
Küldjön bejelentést a Bejelentések Mailing listájához.
