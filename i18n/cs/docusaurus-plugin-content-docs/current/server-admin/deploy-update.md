---
sidebar_position: 2
---
# Aktualizovat
Jak udělat aktualizaci existujícího ERDDAP™ na Vašem serveru

## Změny{#changes} 
1. Provést změny uvedené v [Změny](/changes) v oddíle nazvaném " Věci" ERDDAP™ Administrátoři potřebují vědět a udělat "pro všechny ERDDAP™ verze od verze, kterou používáte.
     
##  Java  {#java} 
2. Pokud upgrade z ERDDAP™ verze 2.18 nebo níže, musíte přejít na Java 21 (nebo novější) a související Tomcat 10. Viz pravidelné ERDDAP™ návod k instalaci [ Java ](/docs/server-admin/deploy-install#java) a [Tomcat](/docs/server-admin/deploy-install#tomcat) . Budete muset také kopírovat _tomcat_/content/erddap adresář z vaší staré instalace Tomcat do vaší nové instalace Tomcat.

## Stáhnout{#download} 
3. Stáhnout [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) do _tomcat_/webaps .
     (verze 2.28.1, 622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, dat. 09-05-2025) 
     
## zprávy.xml{#messagesxml} 
4. 
    * Časté: Pokud upgrade z ERDDAP™ verze 1.46 (nebo vyšší) a stačí použít standardní zprávy, nové standardní zprávy.xml bude nainstalován automaticky (mezi soubory .class prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud upgrade z ERDDAP™ verze 1.44 (nebo níže) ,
musíte smazat staré zprávy.xml soubor:
         _tomcat_/content/erddap Zvěsti.
Nové standardní zprávy.xml budou nainstalovány automaticky (mezi soubory .class prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud vždy provedete změny ve standardním souboru zpráv.xml (na místě) ,
musíte provést tyto změny nového souboru zpráv.xml (což je
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).
         
    * Vzácné: Pokud budete udržovat vlastní zprávy.xml soubor v _tomcat_/content/erddap /,
Musíš přijít na to, (přes rozdíl) jaké změny byly provedeny ve výchozích zprávách.xml (které jsou v novém erddap. válka jako
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) a odpovídajícím způsobem upraví váš vlastní soubor zpráv.xml.
         
## Nainstalovat{#install} 
5. Nainstalovat nový ERDDAP™ v Tomcat:
\\* Nepoužívejte Tomcat Manager. Dříve nebo později budou problémy s pamětí PermGen. Je lepší skutečně vypnutí a spuštění Tomcat.
\\* Nahraďte odkazy na _tomcat_ níže skutečným adresářem Tomcat na vašem počítači.
     
### Linux a Macs{#linux-and-macs} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _tomcat_/bin/shutdown.sh
A použít ps-ef | grep tomcat zjistit, zda/kdy byl proces zastaven. (Může to trvat minutu nebo dvě.) 
2. Odstranit odkompresované ERDDAP™ instalace: V _tomcat_/webapps, použití
rm -rf erddap
3. Smaž ten starý erddap. Válečný soubor: V _tomcat_/webapps, použijte rm erddap. válka
4. Rozumím. válečný soubor z dočasného adresáře do _tomcat_/webaps
5. Restartovat Tomcat a ERDDAP : použijte _tomcat_/bin/startup.sh
6. Pohled ERDDAP™ ve vašem prohlížeči zkontrolovat, zda restart uspěl.
     (Často, musíte zkusit několikrát a počkat minutu, než uvidíte ERDDAP™ .)   
             
### Okna{#windows} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _tomcat_\\bin\\ shutdown.bat 
2. Odstranit odkompresované ERDDAP™ instalace: V _tomcat_/webapps, použití
del / S/Q erddap
3. Smaž ten starý erddap. Válečný soubor: V _tomcat_\\webaps, použijte del erddap. válka
4. Rozumím. Válečný soubor z dočasného adresáře do _tomcat_\\webaps
5. Restartovat Tomcat a ERDDAP : use _tomcat_\\bin\\startup.bat
6. Pohled ERDDAP™ ve vašem prohlížeči zkontrolovat, zda restart uspěl.
     (Často, musíte zkusit několikrát a počkat minutu, než uvidíte ERDDAP™ .) 

Aktualizace potíží ERDDAP ? Podívejte se na naše [oddíl o získání dodatečné podpory](/docs/intro#support) .
