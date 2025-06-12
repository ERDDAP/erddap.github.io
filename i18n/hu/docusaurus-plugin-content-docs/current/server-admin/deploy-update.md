---
sidebar_position: 2
---
# frissítés
Hogyan készítsünk egy meglévő frissítéstERDDAP™A szervered

## változások{#changes} 
1. Készítse el a felsorolt változásokat[változások](/changes)a „Things” című szakaszbanERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük az egészetERDDAP™verziók az Ön által használt verzió óta.
     
## Java {#java} 
2. Ha frissülszERDDAP™2.18 vagy alul, át kell váltaniJava21. (vagy újabb) a kapcsolódó Tomcat 10. Lásd a rendszertERDDAP™telepítési utasítások[Java](/docs/server-admin/deploy-install#java)és[Tomcat](/docs/server-admin/deploy-install#tomcat)... Meg kell másolnia is_tomcat_/content/erddapkönyvtár a régi Tomcat telepítés az új Tomcat telepítés.

## Letöltés{#download} 
3. Letöltés[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)_tomcat_/webapps .
     (2.27.0, 620,554,403 bytees, MD5=3b2086c659eee4145ca2dff447bf4ef7, dátumozott 06-11-2025) 
     
## üzenetek.xml{#messagesxml} 
4. 
    * Gyakori: Ha frissülszERDDAP™verzió 1.46 (vagy felette) és csak a szabványos üzeneteket használja, az új szabványos üzeneteket.xml automatikusan telepítik (a .class fájlok között az erddapon keresztül. háború) ...
         
    * Ritka: Ha frissülszERDDAP™verzió 1.44 (vagy alább) ,
Törölje a régi üzeneteket.xml fájlt:
        _tomcat_/content/erddap/messages.xml .
Az új szabványos üzeneteket.xml automatikusan telepítik (a .class fájlok között az erddapon keresztül. háború) ...
         
    * Ritka: Ha mindig módosítja a szabványos üzeneteket.xml fájl (helyén) ,
meg kell tennie ezeket a változásokat az új üzenetek.xml fájlba (ami az
WEB-INF / osztályok / gov/noaa/pfel/erddap/util/messages.xml, miután az erddap.war depressziós Tomcat.
         
    * Ritka: Ha fenntart egy egyedi üzeneteket.xml fájlt_tomcat_/content/erddap/,
Ki kell találnod (keresztül diff) milyen változások történtek az alapértelmezett üzenetek.xml (ami az új erddap. háború, mint
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml), és ennek megfelelően módosítja a szokásos üzeneteket.xml fájlt.
         
## Beállítás{#install} 
5. Telepítse az újatERDDAP™Tomcatban:
\\* Ne használja a Tomcat Managert. Előbb vagy utóbb PermGen memória problémák lesznek. Jobb, ha ténylegesen leállítjuk és elindítjuk a Tomcat-ot.
\\* Helyettesítse az alábbi _tomcat_-t a tényleges Tomcat könyvtárral a számítógépén.
     
### Linux és Macska{#linux-and-macs} 
1. Shutdown Tomcat: Egy parancssorból használd: _tomcat_/bin/shutdown.sh
Használjon ps -ef|grep tomcat látni, ha/ha a folyamat leállt. (Lehet, hogy egy-két percet vesz igénybe.) 
2. Távolítsa el a depressziótERDDAP™telepítés: _tomcat_/webapps, használat
rm -rf erddap
3. Törölje a régi erddap. háborús fájl: In _tomcat_/webapps, használja rm erddap. háború
4. Másolja az új erddapot. háborús fájl az ideiglenes könyvtárból _tomcat_/webapps
5. Indítsa újra Tomcat ésERDDAPHasználat _tomcat_/bin/startup.sh
6. MegtekintésERDDAP™a böngészőben ellenőrizze, hogy az újraindítás sikeres volt.
     (Gyakran meg kell próbálnia néhányszor, és várjon egy percet, mielőtt látjaERDDAP™...)   
             
### Windows Windows{#windows} 
1. Shutdown Tomcat: Egy parancssorból használjuk: _tomcat_bin\\shutdown.bat
2. Távolítsa el a depressziótERDDAP™telepítés: _tomcat_/webapps, használat
del /S/Q erddap
3. Törölje a régi erddap. háborús fájl: A _tomcat_ \\ webapps, használja del erddap. háború
4. Másolja az új erddapot. háborús fájl az ideiglenes könyvtárból _tomcat_\'webapps-be
5. Indítsa újra Tomcat ésERDDAPHasználat _tomcat_\bin\\startup.bat
6. MegtekintésERDDAP™a böngészőben ellenőrizze, hogy az újraindítás sikeres volt.
     (Gyakran meg kell próbálnia néhányszor, és várjon egy percet, mielőtt látjaERDDAP™...) 

Troubles frissítésERDDAP? Lásd:[rész további támogatás megszerzéséről](/docs/intro#support)...
