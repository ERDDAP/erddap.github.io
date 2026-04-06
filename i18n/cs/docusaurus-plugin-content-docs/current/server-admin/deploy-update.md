---
sidebar_position: 2
---
# Aktualizovat
Jak udělat aktualizaci existujícího ERDDAP™ na Vašem serveru

## Změny{#changes} 
1. Provést změny uvedené v [Změny](/changes) v oddíle s názvem "Věci ERDDAP™ Administrátoři potřebují vědět a udělat "pro všechny ERDDAP™ verze od verze, kterou používáte.
     
##  Java  {#java} 
2. Pokud jste upgrade z ERDDAP™ verze 2.18 nebo nižší, musíte přejít na Java 25 (nebo novější) a související Tomcat 10. Viz pravidelně ERDDAP™ návod k montáži [ Java ](/docs/server-admin/deploy-install#java) a [Tomcat](/docs/server-admin/deploy-install#tomcat) . Budete také muset zkopírovat _tomcat_/content/erddap adresář z vaší staré instalace Tomcat do vaší nové instalace Tomcat.

## Stáhnout{#download} 
3. Stáhnout [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/erddap.war) do _ tomcat _ / webových aplikací.
     (verze 2.30.0, 706,939,121 bytes, MD5 = CDC4B3D82A20B33A6623B85312F6DC21, datováno 2026-04-06) 
     
## messages.xml{#messagesxml} 
4. 
    * Časté: Pokud jste upgrade z ERDDAP™ verze 1.46 (nebo výše) a stačí použít standardní zprávy, nové standardní messages.xml bude nainstalován automaticky (mezi .class soubory prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud jste upgrade z ERDDAP™ verze 1.44 (nebo níže) ,
musíte odstranit starý messages.xml soubor:
         _tomcat_/content/erddap / messages.xml.
Nový standardní messages.xml bude instalován automaticky (mezi .class soubory prostřednictvím erddap. válka) .
         
    * Vzácné: Pokud vždy provedete změny ve standardním souboru messages.xml (na místě) ,
musíte provést tyto změny nového messages.xml souboru (což je
WEB-INF / class / gov / noaa / pfel / erddap / util / messages.xml po erddap.war je rozkládán Tomcat).
         
    * Vzácné: Pokud udržíte vlastní messages.xml soubor v _tomcat_/content/erddap /,
Musíš přijít na to, (via diff) jaké změny byly provedeny v výchozí messages.xml (které jsou v nové erddap. válka jako
WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml) a odpovídajícím způsobem upravit Váš vlastní messages.xml soubor.
         
## Instalovat{#install} 
5. Instalovat nové ERDDAP™ v Tomcat:
\\ * Nepoužívej Tomcat Manager. Dříve nebo později budou problémy s pamětí PermGen. Je lepší opravdu vypnout a nastartovat Tomcat.
\\ * Nahradit odkazy na _ tomcat _ níže s aktuálním adresářem Tomcat ve vašem počítači.
     
### Linux a Mac{#linux-and-macs} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _ tomcat _ / bin / shutdow.sh
A používat p-ef | Grep tomcat zjistit, zda / kdy proces byl zastaven. (Může to trvat minutu nebo dvě.) 
2. Odstranit dekomprese ERDDAP™ instalace: In _ tomcat _ / webapps, use
rm-rf erddap
3. Smazat starý erddap. válečný soubor: In _ tomcat _ / webapps, použijte rm erddap. válka
4. Zkopírujte nový erddap. válečný soubor z dočasného adresáře do _ tomcat _ / webapps
5. Restartovat Tomcat a ERDDAP : use _ tomcat _ / bin / startup.sh
6. Pohled ERDDAP™ v prohlížeči zkontrolovat, zda restart uspěl.
     (Často se musíte pokusit několikrát a počkat minutu, než uvidíte ERDDAP™ .)   
             
### Okna{#windows} 
1. Vypnout Tomcat: Z příkazového řádku použijte: _ tomcat _\\ bin\\\ shutdown.bat 
2. Odstranit dekomprese ERDDAP™ instalace: In _ tomcat _ / webapps, use
del / S / Q erddap
3. Smazat starý erddap. Válečný spis: V _ tomcat _\\ webapps použijte del erddap. válka
4. Zkopírujte nový erddap. válečný soubor z dočasného adresáře do _ tomcat _\\ webapps
5. Restartovat Tomcat a ERDDAP : use _ tomcat _\\ bin\\ startup.bat
6. Pohled ERDDAP™ v prohlížeči zkontrolovat, zda restart uspěl.
     (Často se musíte pokusit několikrát a počkat minutu, než uvidíte ERDDAP™ .) 

Aktualizace problémů ERDDAP ? Podívejte se na naše [část o získání další podpory](/docs/intro#support) .
