---
sidebar_position: 2
---
# Aktualizovat
Jak udělat aktualizaci existujícíhoERDDAP™na Vašem serveru

## Změny{#changes} 
1. Provést změny uvedené v[Změny](/changes)v oddíle nazvaném " Věci"ERDDAP™Administrátoři potřebují vědět a udělat "pro všechnyERDDAP™verze od verze, kterou používáte.
     
## Java {#java} 
2. Pokud upgrade zERDDAP™verze 2.18 nebo níže, musíte přejít naJava21 (nebo novější) a související Tomcat 10. Viz pravidelnéERDDAP™návod k instalaci[Java](/docs/server-admin/deploy-install#java)a[Tomcat](/docs/server-admin/deploy-install#tomcat). Budete muset také kopírovat_tomcat_/content/erddapadresář z vaší staré instalace Tomcat do vaší nové instalace Tomcat.

## Stáhnout{#download} 
3. Stáhnout[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)do _tomcat_/webaps .
     (verze 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, dated 06-11-2025) 
     
## zprávy.xml{#messagesxml} 
4. 
    * Časté: Pokud upgrade zERDDAP™verze 1.46 (nebo vyšší) a stačí použít standardní zprávy, nové standardní zprávy.xml bude nainstalován automaticky (mezi soubory .class prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud upgrade zERDDAP™verze 1.44 (nebo níže) ,
musíte smazat staré zprávy.xml soubor:
        _tomcat_/content/erddapZvěsti.
Nové standardní zprávy.xml budou nainstalovány automaticky (mezi soubory .class prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud vždy provedete změny ve standardním souboru zpráv.xml (na místě) ,
musíte provést tyto změny nového souboru zpráv.xml (což je
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).
         
    * Vzácné: Pokud budete udržovat vlastní zprávy.xml soubor v_tomcat_/content/erddap/,
Musíš přijít na to, (přes rozdíl) jaké změny byly provedeny ve výchozích zprávách.xml (které jsou v novém erddap. válka jako
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) a odpovídajícím způsobem upraví váš vlastní soubor zpráv.xml.
         
## Nainstalovat{#install} 
5. Nainstalovat novýERDDAP™v Tomcat:
\\* Nepoužívejte Tomcat Manager. Dříve nebo později budou problémy s pamětí PermGen. Je lepší skutečně vypnutí a spuštění Tomcat.
\\* Nahraďte odkazy na _tomcat_ níže skutečným adresářem Tomcat na vašem počítači.
     
### Linux a Macs{#linux-and-macs} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _tomcat_/bin/shutdown.sh
A použít ps-ef|grep tomcat zjistit, zda/kdy byl proces zastaven. (Může to trvat minutu nebo dvě.) 
2. Odstranit odkompresovanéERDDAP™instalace: V _tomcat_/webapps, použití
rm -rf erddap
3. Smaž ten starý erddap. Válečný soubor: V _tomcat_/webapps, použijte rm erddap. válka
4. Rozumím. válečný soubor z dočasného adresáře do _tomcat_/webaps
5. Restartovat Tomcat aERDDAP: použijte _tomcat_/bin/startup.sh
6. PohledERDDAP™ve vašem prohlížeči zkontrolovat, zda restart uspěl.
     (Často, musíte zkusit několikrát a počkat minutu, než uvidíteERDDAP™.)   
             
### Okna{#windows} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _tomcat_\\bin\\shutdown.bat
2. Odstranit odkompresovanéERDDAP™instalace: V _tomcat_/webapps, použití
del / S/Q erddap
3. Smaž ten starý erddap. Válečný soubor: V _tomcat_\\webaps, použijte del erddap. válka
4. Rozumím. Válečný soubor z dočasného adresáře do _tomcat_\\webaps
5. Restartovat Tomcat aERDDAP: use _tomcat_\\bin\\startup.bat
6. PohledERDDAP™ve vašem prohlížeči zkontrolovat, zda restart uspěl.
     (Často, musíte zkusit několikrát a počkat minutu, než uvidíteERDDAP™.) 

Aktualizace potížíERDDAP? Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).
