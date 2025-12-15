---
sidebar_position: 3
---
#  ERDDAP™ Proces uvolňování
* Ujistěte se, že jsou k dispozici soubory srovnání obrázků (To by mohlo znamenat útěk. `mvn ověřit` , pokud chcete urychlit, že až omezení pouze ImageComparison skupiny ačkoli poznámka, která stále vyžaduje spustit Jetty testy) 
* Aktualizace závislostí
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Aktualizovat pluginy
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Spusťte testy, aby se ujistili, že aktualizace závislosti nezlomí cokoliv pro všechny hlavní konfigurace (Zejména analýza dat, i když i jiná významná nastavení) . Všimněte si, že vnější zkušební apartmá může být velmi neprůstřelné. Testovací apartmá SlowAWS může trvat velmi dlouho.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Použít TranslateMessages.translate () v případě potřeby aktualizovat překlady
* Vývoj ED Static.java Režim false, změňte číslo verze a zadejte datum vydání.
* Do the build
```
mvn clean
mvn compile
mvn package
```
## Kanárské ostrovy
Poslat válečný soubor pro distribuci na serveru Coastwatch nebo na jiném serveru, který využívá většinu typů souborů dat a přijímá hodně provozu.
Chceme hledat chyby před širším rozdělením stavby.

Včetně zprávy při vyprávění o novém vydání.

Standardní postup je:
* Nahrát soubor .válka na pobřežní hlídku \\[ tomcat \\] / content/ erddap/
* Jako uživatel=tomcat:
  * In \\[ tomcat \\] / bin/ :
./shutdown.sh/use "ps -fu tomcat" pro zajištění toho, aby se zastavila
  * In \\[ tomcat \\] /webapps/ :
rm -rf erddap
Rm erddap. válka
cp ../content/erddap/erddap2.22.war erddap.war / nebo jakékoliv číslo
  * In \\[ tomcat \\] / bin/ :
./startup.sh
  * Po ERDDAP vrátil webovou stránku, v \\[ tomcat \\] /webapps/ :
chgrp - R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub verze
Návrh GitHub vydání, včetně erddap.war a erddapContent .zip   (žádná čísla verzí) 

title: The official v2.25 version
popis: Viz seznam změn
      https://erddap.github.io/changes#version-225

## Aktualizace dokumentace
* Aktualizovat číslo verze v souboru docusaurus.config.ts (v části zápatí) .
* Upravit stránky dokumentace (nasadit-install.md a nasadit-update.md) .
  * Hledat \\[ erddap.war \\]  
  * Kopírovat existující informace (mírně reformované) na seznam předchozích zařízení 2.
  * Změnit aktuální informace o vydání pro erddap. válka \\[ erddap.war \\] 
* Spusťte překlady na místo dokumentace.
* Vytáhni žádost a spojte změny.
* Nasadit místo dokumentace (viz readme) .

## Zajistit, aby ostatní repo obchody byly aktuální podle potřeby
To znamená především ErddapContent a ErddapTest, ale měly by být během vývojových změn aktualizovány.

## Informujte uživatele
Nejprve informujte všechny uživatele, kteří požadovali změny (nebo čí brouci byli opraveni) . Dejte jim čas na ověření změn a/nebo vydání otázek.

 ERDDAP verze 2.25 je nyní k dispozici&#33;

Můžete si přečíst o změnách na
https://erddap.github.io/changes#version-225

Některé změny jsou změny, které jste navrhl. Děkuji vám za vaše návrhy. Hledat své jméno v seznamu změn vidět podrobnosti. Bylo by skvělé, kdybyste mohli vyzkoušet nové funkce brzy, než oznámím tuto novou verzi širšímu publiku.

Pokud jste ERDDAP Správce, pokyny pro modernizaci jsou na
https://erddap.github.io/docs/server-admin/deploy-update

Pokud máte nějaké problémy, otázky, návrhy, prosím, pošlete mi e-mail.

Děkujeme, že používáte ERDDAP .

### Vydání oznámení
Pošlete oznámení na seznam oznámení.
