---
sidebar_position: 2
---
# Frissítés
Hogyan lehet frissíteni egy meglévő ERDDAP™ A kiszolgáló

## Változások{#changes} 
1. A felsorolt módosítások [Változások](/changes) "Dolgok ERDDAP™ Administrators Need to know and Do "az összes ERDDAP™ verziók óta a verzió használt.
     
##  Java  {#java} 
2. Ha Ön korszerűsíti ERDDAP™ 2.18-as verzió vagy az alábbi, át kell váltanod Java 25 (vagy újabb) és a kapcsolódó Tomcat 10. Lásd a reguláris ERDDAP™ beszerelési utasítások: [ Java ](/docs/server-admin/deploy-install#java) és [Tomcat](/docs/server-admin/deploy-install#tomcat) . Akkor is kell másolni a _tomcat_/content/erddap könyvtár a régi Tomcat telepítés az új Tomcat telepítés.

## Letöltés{#download} 
3. Letöltés [Erddap. War](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/ERDDAP-2.30.0.war) into _ tomcat _ / webapps.
     (2.30.0, 706,939,121 bájt, MD5 = CDC4B3D82A20B33A6623B85312F6DC21 változat, 2026- 04- 02 keltezésű) 
     
## messages.xml{#messagesxml} 
4. 
    * Gyakori: Ha Ön korszerűsíti ERDDAP™ változat (vagy magasabb) és csak használja a standard üzenetek, az új standard üzenet.xml lesz telepítve automatikusan (a .class fájlok között az erddap-on keresztül. háború) .
         
    * Ritka: Ha Ön korszerűsíti ERDDAP™ változat (vagy alatta) ,
Törölje a régi üzenetet.
         _tomcat_/content/erddap / üzenet.xml.
Az új standard üzenet.xml lesz telepítve automatikusan (a .class fájlok között az erddap-on keresztül. háború) .
         
    * Ritka: Ha mindig változtatsz a standard üzenetfájlon (a helyén) ,
meg kell tennie ezeket a változtatásokat az új üzenet.xml fájlt (ami
WEB- INF / osztályok / gov / noaa / pfel / erddap / util / messages.xml után erdda.war is decompressed by Tomcat).
         
    * Ritka: Ha egy egyedi üzenet.xml fájlt _tomcat_/content/erddap /,
Ki kell találnod valamit. (diff) milyen változások történtek az alapértelmezett üzenetekben.xml (amelyek az új erddap. háború
WEB- INF / osztályok / gov / noaa / pfel / erddap / util / messages.xml) és ennek megfelelően módosítsa az egyedi messages.xml fájlt.
         
## Telepítés{#install} 
5. Telepítse az új ERDDAP™ in Tomcat:
- Igen. Ne használd a Tomcat Managert. Előbb vagy utóbb lesznek PermGen memória problémák. Jobb, ha kikapcsoljuk és elkezdjük Tomcat-ot.
\\ * Utalás a _ tomcat _ lenti könyvtárra az aktuális Tomcat könyvtárra a számítógépen.
     
### Linux és Macs{#linux-and-macs} 
1. Shutdown Tomcat: Egy parancssorból használd: _ tomcat _ / bin / shutdow.sh
És használja a p-efet | grep tomcat látni, ha / amikor a folyamat leállt. (Eltarthat egy-két percig.) 
2. Távolítsa el a dekompresszált ERDDAP™ telepítés: A _ tomcat _ / webalkalmazásokban használható
rm - rf erddap
3. Törölje a régi erddap. war file: In _ tomcat _ / webapps, használja rm erddap. háború
4. Másold le az új erddap-ot. háborús fájl az ideiglenes könyvtárból a _ tomcat _ / webapps könyvtárba
5. Visszaállítás Tomcat és ERDDAP : use _ tomcat _ / bin / startupsh
6. Nézet ERDDAP™ a böngészőben, hogy ellenőrizze, hogy az újraindítás sikerült.
     (Gyakran, meg kell próbálni egy párszor, és várjon egy percet, mielőtt meglátja ERDDAP™ .)   
             
### Windows{#windows} 
1. Shutdown Tomcat: Egy parancssorból használd: _ tomcat _\\ bin\\\ shutdown.bat 
2. Távolítsa el a dekompresszált ERDDAP™ telepítés: A _ tomcat _ / webalkalmazásokban használható
del / S / Q erddap
3. Törölje a régi erddap. háborús fájl: In _ tomcat _\\ webapps, use del erddap. háború
4. Másold le az új erddap-ot. háborús fájl az ideiglenes könyvtárból _ tomcat _\\ webapps
5. Visszaállítás Tomcat és ERDDAP : use _ tomcat _\\ bin\\ startup.bat
6. Nézet ERDDAP™ a böngészőben, hogy ellenőrizze, hogy az újraindítás sikerült.
     (Gyakran, meg kell próbálni egy párszor, és várjon egy percet, mielőtt meglátja ERDDAP™ .) 

Problémák frissítése ERDDAP ? Lásd a mi [szakasz a kiegészítő támogatás megszerzéséről](/docs/intro#support) .
