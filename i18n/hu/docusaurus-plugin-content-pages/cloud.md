---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ és a felhő

## Mi az a felhő

A legegyszerűbb meghatározás nem helyi szerverek. Ez nagyon széles, és sok különböző beállítást jelenthet. Például egy dedikált fizikai szerver lehet egy adatközpontban, egy virtuális magánkiszolgáló, egy közös szerver, szerver nélküli vagy valami más.

### Miért felhő

Sok oka van annak, hogy a szervezetek a felhőbe akarnak költözni. A legfontosabb, hogy a rugalmasságot, amely biztosítja a végső / tárolási igények, mint a vásárlás fizikai hardver.

Ez kiküszöböli annak szükségességét, hogy egy adatközpont / szerver szoba legyen. Lehetővé teszi továbbá, hogy az anyagi erőforrásokat a jelenlegi szükségleteidhez mérjük. Hasonlóan, mint a felhő sok különböző dolgot jelenthet, hogy képes legyen növelni az erőforrásait is. Ez többet fizethet (vagy kevesebb) szerver nélküli erőforrások. Ez azt jelentheti, hogy egy megosztott szerverről egy privát szerverre költözik. Ez azt jelentheti, hogy egy nagyobb dedikált fizikai szerverre frissül.

## Képesek ERDDAP™ fut a felhőben?

Igen.

 ERDDAP™ Úgy tervezték, hogy a Tomcat-on belül futjon, amely helyileg vagy felhő környezetben futhat. A hivatalos Docker kép elérhető a [Docker Hub](https://hub.docker.com/r/erddap/erddap) ... A `erddap:alpha-latest` A címke a legutóbbi változásokon alapuló építmény (valami, mint egy "éjszakai" kiadás, [alfa-latest részletek](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) , míg `erddap:Legjobb` a legutóbbi tesztelt kiadás ( [legújabb részletek](https://hub.docker.com/layers/erddap/erddap/latest/) ) ... Böngészheti a GitHub konténerregistry kiadásait is [GitHub csomagok](https://github.com/ERDDAP/erddap/pkgs/container/erddap) ... Tudsz többet olvasni a használatról ERDDAP™ vele [Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) ...

Kubernetes telepítések, lásd az új telepítés-kubernetes [dokumentáció](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) ...

Azt mondta: ERDDAP™ akkor tervezték, amikor a dedikált szerverek voltak a norma. Ez nem szerver nélküli, és rendkívül nehéz lenne, ha nem lehetetlen, hogy kiszolgálatlan.

### Képesek ERDDAP™ Skála?

Skaling ERDDAP™ bonyolultabb, mint csupán több kiszolgáló nélküli erőforrás használata. Van néhány nagyszerű dokumentációnk [hogyan kell méretezni ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) ... megkönnyíti a méretezést ERDDAP™ valami, amit érdekelünk.

### Mi akadályozza az autoscalingot?

 ERDDAP™ sok mindent megtesz, beleértve az adathalmazok naprakész tárolását, az adathalmazok, az adatok csatolása, a felhasználói kérések kezelése és még sok más. Egy elég nagy ERDDAP™ szerver, mint [CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Ez azt jelenti, hogy folyamatosan csinál valamit. A folyamatos használat valójában rendkívül költséges helyzet a szerver nélküli lehetőségek számára (nagy prémiumot fizetsz a kompute-ért, amikor szerver nélküli, és így a fő előny az, amikor csak alkalmanként hívsz) ... Továbbá, megpróbálja mozogni az egészet ERDDAP™ A szerver nélküli verziók különböző funkcionalitása az adminokhoz szükséges jelentősen bonyolultabb beállítással végződik.

### Képesek ERDDAP™ Használja a Cloud Storage-t?

Igen.

 ERDDAP™ támogatja a felhő tárolását (beleértve az AWS S3-t) és javítja ezt a támogatást (Például a non-AWS S3) magas prioritás a ERDDAP™ fejlesztési ütemterv. ERDDAP™ is képes adatokat húzni számos meglévő online szolgáltatásból. További információkért ajánlom, hogy átnézzük [adatállomány-dokumentáció](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) ...
