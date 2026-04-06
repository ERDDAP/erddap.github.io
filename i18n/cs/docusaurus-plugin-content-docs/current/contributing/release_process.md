---
sidebar_position: 3
---
#  ERDDAP™ Proces uvolňování
* Ujistěte se, že jsou k dispozici soubory pro porovnání obrázků (Tohle může znamenat běh. `mvn ověření` Pokud to chcete urychlit, omezte to na skupinu ImageComparison, i když poznámka, která stále vyžaduje provedení testů Jetty) 
* Aktualizovat závislost
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Aktualizovat pluginy
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Spustit testy, aby se ujistil, že aktualizace závislosti nezlomily nic pro všechny hlavní konfigurace (soubory údajů, které se zejména zpracovávají, i když i jiná významná nastavení) . Všimněte si, že externí zkušební souprava může být velmi ochromující. Pomalé testovací apartmá může trvat velmi dlouho.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Použití `python translation / translate.py` aktualizovat překlady v případě potřeby.
* EDStatic.java vývoj Režim na false, změna čísla verze a datum vydání.
* Stavět.
```
mvn clean
mvn compile
mvn package
```
## Kanárské
Poslat válečný soubor pro distribuci na Coastwatch serveru nebo některé jiné server, který používá většinu typů datových souborů a přijímá spoustu provozu.
Chceme se pokusit najít chyby před širším rozdělením budovy.

Zahrnout zprávu při vyprávění o novém vydání.

Standardní postup je:
* Nahrát .war soubor na pobřeží hodinky \\[ tomcat \\] / obsah / erddap /
* Jako uživatel = tomcat:
  * V \\[ tomcat \\] / bin /:
. / shutdow.sh / / použít "ps -fu tomcat", aby se ujistil, že se zastavil
  * V \\[ tomcat \\] / webové aplikace /:
rm-rf erddap
rm erddap. válka
cp.. / obsah / erddap / erddap2.22.war erddap.war / / nebo jaké číslo je
  * V \\[ tomcat \\] / bin /:
/ startup.sh
  * Po ERDDAP vrátil webové stránky, v \\[ tomcat \\] / webové aplikace /:
chgrp-R erddap erddap
chmod - R g + rw erddap
chmod-R o-rwx erddap

## Vydání GitHub
Návrh vydání GitHub, včetně erddap.war a erddapContent .zip   (žádná čísla verzí) 

title: The official v2.25 version
popis: Viz seznam změn
       https://erddap.github.io/changes#version-225
 

## Aktualizace dokumentace
* Aktualizovat číslo verze v souboru docusaurus.consult.ts (v sekci patky) .
* Upravit stránky dokumentace (deploy- instal.md a deploy- update.md) .
  * Hledat \\[ erddap.war \\]  
  * Kopírovat stávající informace (lehce reformovaný) seznam předchozích zařízení2.
  * Změnit aktuální informace o uvolnění pro erddap. válka v \\[ erddap.war \\] 
* Spustit překlady pro dokumentaci stránky.
* Požádat o tahání a sloučit změny.
* Nastavit místo dokumentace (viz readme) .

## Zajistit, aby ostatní repo obchody byly aktuální podle potřeby
Především to znamená ErdapContent a ErdapTest, ale měly by být aktualizovány během změn vývoje.

## Upozornit uživatele
První oznámení všem uživatelům, kteří požadovali změny (nebo jejichž chyby byly opraveny) . Dejte jim čas na ověření změn a / nebo řešení problémů.

 ERDDAP verze 2.25 je nyní k dispozici&#33;

O změnách si můžete přečíst v
 https://erddap.github.io/changes#version-225
 

Některé změny jsou změny, které jste navrhl. Děkuji vám za vaše návrhy. Hledejte své jméno v seznamu změn, abyste viděli podrobnosti. Bylo by skvělé, kdybyste mohli vyzkoušet nové funkce brzy, než ohlásím tuto novou verzi širšímu publiku.

Pokud jste ERDDAP administrátor, pokyny pro modernizaci jsou uvedeny v
 https://erddap.github.io/docs/server-admin/deploy-update
 

Pokud máte nějaké problémy, otázky, návrhy, prosím, pošlete mi e-mail.

Díky za použití ERDDAP .

### Oznámit vydání
Pošlete oznámení na seznam hlášení.
