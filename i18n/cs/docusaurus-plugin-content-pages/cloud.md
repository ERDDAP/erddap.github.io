---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ a mračno

## Co je to mrak

Nejjednodušší definice nejsou lokální servery. To je velmi široké a může znamenat mnoho různých nastavení. Například by to mohl být specializovaný fyzický server v datovém centru, Virtuální privátní server, sdílený server, bez serveru nebo něco jiného.

### Proč mračno

Existuje mnoho důvodů, proč se organizace chtějí přestěhovat do cloudu. Nejdůležitější je flexibilita, kterou poskytuje pro výpočet/skladování potřeb ve srovnání s nákupem fyzického hardwaru.

Tím se eliminuje potřeba udržovat datacentrum/server místnost. To také umožňuje škálování výpočetních zdrojů pro vaše současné potřeby. Stejně jako mrak může znamenat mnoho různých věcí, být schopen škálovat své zdroje také dělá. Mohlo by to znamenat platit víc. (nebo méně) Zdroje bez serverů. Může to znamenat přesun ze sdíleného serveru na soukromý server. Mohlo by to znamenat vylepšení na větší vyhrazený fyzický server.

## Můžeš ERDDAP™ Běhat v oblacích?

Ano.

 ERDDAP™ je navržen tak, aby běžel v rámci Tomcat, který může být provozován lokálně nebo v cloudovém prostředí. V Dockeru je komunitní podpora. [úřední Dockerská podpora brzy přijde.](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

To znamená, ERDDAP™ byl navržen v době, kdy dedikované servery byly normou. Není bez serveru a bylo by nesmírně obtížné, kdyby nebylo nemožné, aby byl server bez serveru.

### Můžeš ERDDAP™ Stupnice?

Stříkání ERDDAP™ je složitější než jen využívat více zdrojů bez serveru. Máme skvělou dokumentaci. [jak zvětšit ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Usnadňuje to škálování ERDDAP™ je něco, co nás zajímá.

### Co brání automatizaci?

 ERDDAP™ dělá mnoho věcí, včetně udržování aktuálních souborů dat, oznamování předplatitelů změn souborů dat, cachování dat, zpracování žádostí uživatelů a dalších. Pro dostatečně velkou ERDDAP™ server jako [CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) To znamená, že neustále něco dělá. Kontinuální používání je ve skutečnosti extrémně nákladná situace pro volby bez serveru (platíte velkou prémii za výpočet, když děláte bez serveru a tak hlavní výhodou je, když jen občas děláte hovory) . Navíc, snaží se přesunout všechny ERDDAP™ Různé funkce bez serveru by skončily s podstatně složitějším nastavením potřebným pro administrátory.

### Můžeš ERDDAP™ použít cloud Storage?

Ano.

 ERDDAP™ podporuje ukládání cloudů (včetně AWS S3) a zlepšení této podpory (např. non-AWS S3) je vysoká priorita na ERDDAP™ plán rozvoje. ERDDAP™ je také schopen čerpat data z mnoha stávajících on-line služeb. Pro více informací doporučuji prohlédnout si naše [Dokumentace typu souboru](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
