---
sidebar_position: 3
---
#  ERDDAP™ Kibocsátási folyamat
* Győződjön meg róla, hogy a képösszehasonlítás fájlok rendelkezésre állnak (Ez azt jelenti, hogy futás. `mvn ellenőrzés` , ha azt szeretnénk, hogy gyorsítsa fel, hogy korlátozza, hogy csak az ImageComparison csoport azonban megjegyzi, hogy még mindig szükséges futtatni Jetty tesztek) 
* A függések frissítése
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* A bővítmények frissítése
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Futtasd le a teszteket, hogy a függőségi frissítések ne törjenek meg semmit minden nagyobb konfigurációnál. (adatsorok különösen, bár bármilyen más jelentős beállítások is) . Vegye figyelembe, hogy a külső tesztlakosztály nagyon flúgos lehet. A lassított AWS tesztlakosztály nagyon sokáig eltarthat.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Felhasználás `python fordítás / translate.py` szükség esetén a fordítások frissítése.
* EDStatic.java készlet fejlesztése A hamisítás módja, a verziószám módosítása és a kiadás dátuma.
* Csináld meg&#33;
```
mvn clean
mvn compile
mvn package
```
## Kanári
Küldje el a háborús fájlt terjesztésre a Coastwatch szerver vagy más szerver, amely használja a legtöbb adatkészlet típusok és kap egy csomó forgalom.
Megpróbálunk hibákat találni az épület szélesebb körű elterjedése előtt.

Az üzenet beillesztése egy új kiadáshoz.

Az általános eljárás a következő:
* Töltse fel a .war fájlt a parti őrség \\[ Nincs magyar neve \\] / tartalom / erddap /
* Felhasználóként = tomcat:
  * In \\[ Nincs magyar neve \\] / Bin /:
. / shutdow.sh / / használja a "ps-fu tomcat" annak biztosítására, hogy leállt
  * In \\[ Nincs magyar neve \\] / Webalkalmazások /:
rm - rf erddap
Erddap. háború
cp.. / tartalom / erddap / erddap2.22.war Erddap. War / / vagy bármi is a szám
  * In \\[ Nincs magyar neve \\] / Bin /:
/ starttupsh
  * A ERDDAP visszaadott egy weboldalt, \\[ Nincs magyar neve \\] / Webalkalmazások /:
chgrp-R erddap erddap
chmod - R g + rw erddap
chmod -R o- rwx erddap

## GitHub kiadás
Draft the GitHub release, include erddap.war and erddapContent .zip   (nincs verziószám) 

title: The official v2.25 version
leírja: Lásd a változtatási listát:
       https://erddap.github.io/changes#version-225
 

## Dokumentáció frissítése
* A verziószám frissítése a docusaurus.config.ts fájlban (a lábszárrész) .
* A dokumentációs oldalak szerkesztése (deploy- install.md és deploy- update.md) .
  * Keresés \\[ Erddap. War \\]  
  * A meglévő információk másolása (kissé átalakított) a korábbi létesítmények listájához 2.
  * Az erddap aktuális megjelenési adatainak módosítása. háború \\[ Erddap. War \\] 
* Futtassa le a fordítások a dokumentáció oldalon.
* Készítsen egy húzókérést és egyesítse a változásokat.
* A dokumentáció telepítése (lásd readme) .

## Annak biztosítása, hogy szükség esetén más repók is naprakészek legyenek
Ez elsősorban azt jelenti, hogy az ErddapContent és az ErdapTest, de a fejlesztési változások során naprakészen kell tartani őket.

## A felhasználók értesítése
Először értesítsenek minden olyan felhasználót, aki változást kért (vagy akinek a hibáit rögzítették) . Adjon nekik időt a változások ellenőrzésére és / vagy a kérdések felvetésére.

 ERDDAP A 2.25-ös verzió már elérhető&#33;

A változásokról a következő címen olvashat:
 https://erddap.github.io/changes#version-225
 

Néhány változtatás az ön által javasolt változtatás. Köszönöm a javaslatait. Keresd meg a neved a változások listáján, hogy lásd a részleteket. Jó lenne, ha hamarosan kipróbálná az új funkciókat, mielőtt bejelentem ezt az új verziót egy szélesebb közönségnek.

Ha Ön ERDDAP adminisztrátor, a korszerűsítési utasítások:
 https://erddap.github.io/docs/server-admin/deploy-update
 

Ha bármilyen problémája, kérdése, javaslata van, kérem, írjon nekem.

Köszönöm, hogy használja ERDDAP .

### A kibocsátás bejelentése
Küldjön egy bejelentést a bejelentések levelezési listájára.
