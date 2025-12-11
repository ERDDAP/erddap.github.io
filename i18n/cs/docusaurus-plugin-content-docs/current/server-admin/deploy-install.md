---
sidebar_position: 1
---

# Nainstalovat
Jak udělat počáteční nastavení ERDDAP™ na Vašem serveru

 ERDDAP™ může běžet na jakémkoli serveru, který podporuje Java a Tomcat (a další servery jako Jetty, ale my je nepodporujeme.) .
 ERDDAP™ byla testována na Linuxu (včetně AWS Amazonu) , Mac a Windows počítače.

*  **Docker** -- Poskytujeme [ ERDDAP™ v kontejneru Docker](https://hub.docker.com/r/erddap/erddap) 
a IOOS nyní nabízí [Návod k rychlému startu pro ERDDAP™ v kontejneru Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Je to standard. ERDDAP™ instalace v kontejneru Docker.
Přes Dockera Kompozit poskytujeme jednoduché způsoby, jak nastavit ssl a monitoring, číst více ven [Dokumentace dockerů](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Pokud již používáte Docker, budete pravděpodobně preferovat Docker verzi.
Pokud hledáte spustit na cloud služby budete pravděpodobně preferovat verzi Docker.
*  **Amazon** -- Pokud instalujete ERDDAP™ v případě Amazon Web Services EC2: [Přehled webových služeb Amazon](/docs/server-admin/additional-information#amazon) Nejdřív.
*  **Linux a Macs** -- ERDDAP™ funguje skvěle na Linux a Mac počítače. Viz pokyny níže.
*  **Okna** -- Windows je v pořádku pro testování ERDDAP™ a pro osobní použití (viz níže uvedené pokyny) ,
ale nedoporučujeme ho používat pro veřejnost. ERDDAP™ nasazení. Běh ERDDAP™ na Windows mohou mít problémy:
zejména: ERDDAP™ nemusí být schopen rychle smazat a/nebo přejmenovat soubory. To je pravděpodobně kvůli antivirovému softwaru.
   (např. z McAfee a Norton) který kontroluje soubory na viry. Pokud narazíte na tento problém
(které lze vidět chybovými zprávami v [log.txt](/docs/server-admin/additional-information#log) soubor jako
"Neschopen odstranit ..."), změna nastavení antivirového softwaru může částečně zmírnit problém. Nebo místo toho používejte Linux nebo Mac server.

 **Standard ERDDAP™ návod k instalaci počítačů Linux, Macs a Windows jsou:** 

0. Ujistěte se, že jsou nainstalovány jakékoli závislosti. Na nevětrných strojích (Linux a Mac) Potřebuješ csh.

##  Java  {#java} 

1.  [Pro ERDDAP™ v2.19+, nastaveno Java 21.](#java) 
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzi Java 21.
Stáhnout a nainstalovat nejnovější verzi
    [Adoptium OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Pro ověření instalace spusťte `/javaJreBinDirectory/java -verze` , například
    `/usr/local/jdk-21.0.3+9/jre/bin/java -verze` .

    ERDDAP™ spolupracuje s Java z jiných zdrojů, ale doporučujeme Adoptium, protože je to hlavní, komunitně podporované,
volný (jako pivo a řeč) verze Java 21, která nabízí dlouhodobou podporu (bezplatné upgrady pro mnoho let po počáteční vydání) .
Z bezpečnostních důvodů, prosím aktualizujte ERDDAP 's verzí Java pravidelně jako nové verze Java 21 bude k dispozici z Adoptia.

    ERDDAP™ byl testován a používán rozsáhle s 21, nikoli s jinými verzemi. Z různých důvodů netestujeme s jinými verzemi Java .
     
## Tomcat{#tomcat} 

2.  [Připravit](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat je nejvíce používaný Java Aplikační server,
což je Java software, který stojí mezi síťovými službami operačního systému a Java Serverový software jako ERDDAP™ .
Je to svobodný a otevřený zdrojový software (FOSS) .

Můžeš použít jiný. Java Aplikační server (např. Jetty) Ale testujeme jen s Tomcatem a podporujeme ho.

   * Stáhněte si Tomcat a vybalte ho na server nebo PC.
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzi Tomcat 10 (Verze 9 a níže nejsou přijatelné) 
která je určena pro práci s Java 21 nebo novější. Níže bude adresář Tomcat označován jako `tomcat` .

__ Varování&#33;_ Pokud již máte Tomcat spuštěnou jinou webovou aplikaci (zejména THREDDS) , Doporučujeme vám nainstalovat ERDDAP™ v
      [druhý Tomcat](/docs/server-admin/additional-information#second-tomcat) , protože ERDDAP™ potřebuje různé nastavení Tomcat
a neměl by se muset potýkat s jinými aplikacemi pro paměť.

     * Na Linuxu, [stáhnout "Core" "tar .gz " Distribuce Tomcat](https://tomcat.apache.org/download-10.cgi) a vybalit.
Doporučujeme vybalit `/usr/local` .
     * Na Mac, Tomcat je pravděpodobně již nainstalován v `/Knihovna/Tomcat` , ale měl by ji aktualizovat na nejnovější verzi Tomcat 10.
Když to stáhneš, [stáhnout "Core" "tar .gz " Distribuce Tomcat](https://tomcat.apache.org/download-10.cgi) a vybalit `/Knihovna/Tomcat` .
     * Na Windows, můžete [stáhnout "Core" "zip" Tomcat distribuce](https://tomcat.apache.org/download-10.cgi) 
        (který nezahrává s registrem Windows a který ovládáte z příkazového řádku DOS) a vybalit ji do vhodného adresáře.
        (Pro vývoj používáme distribuci "Core" "zip." Uděláme `/programy` adresář a vybalit ho tam.) 
Nebo si můžete stáhnout distribuci "Core" "64-bit Windows zip," která obsahuje více funkcí.
Pokud je distribuce instalátorem Windows, bude pravděpodobně dát Tomcat do, například, `/Programové soubory/apache-tomcat-10,0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - V `tomcat/conf/server.xml` soubor, existují dvě změny, které byste měli udělat pro každou z obou ` <Connector> ` značky
   (jeden pro `&lt;Connector port="8080"` a jeden pro `&lt;Konektorový port="8443"` ) .
   1.  (Doporučené) Zvýšit `spojení Timeout` hodnota parametru, možná 300000 (milisekundy, což je 5 minut) .
   2.  (Doporučené) Přidat nový parametr: `relaxQueryChars="[] | "` . Toto je volitelné a o něco méně bezpečné,
ale odstraňuje potřebu, aby uživatelé procentně kódovali tyto znaky, když se objeví v parametrech požadavku uživatele URL.
             
### obsah.xml{#contentxml} 

* context.xml -- Zdroje Cache - In `tomcat/conf/context.xml` , těsně před ` </Context> ` tag, změna značky Resources
   (nebo přidejte, pokud už tam není.) nastavit cache MaxSize parametr to 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Tím se v Catalině vyhýbáme mnoha varováním. ven, že všechny začínají s
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Timeout Apache{#apache-timeout} 

* Na Linuxových počítačích, změnit nastavení timeout Apache tak, aby časově náročné požadavky uživatelů netimeout
   (s tím, co často vypadá jako chyba "Proxy" nebo "Bad Gateway") . Jako uživatel kořene:
  * Upravit Apače ` http d.conf` soubor (obvykle v `/etc/ http d/conf/` ) :
    * Změnit existující ` <Timeout> ` nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
    * Změnit existující ` <ProxyTimeout> ` nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
  * Restartovat Apache: `/usr/sbin/apachectl - K elegantní.`   (ale někdy je v jiném adresáři) .

### Bezpečnost{#security} 
         
* Bezpečnostní doporučení: Viz [Tyto pokyny](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) zvýšit bezpečnost
Vaše instalace Tomcat, zejména pro veřejné servery.
         
* Pro veřejnost ERDDAP™ instalace na Linux a Macs, je nejlepší nastavit Tomcat (program) jako součást uživatele `tomcat` 
   (samostatný uživatel s omezeným oprávněním a který [nemá žádné heslo](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Tak, jen super uživatel může přejít k jednání jako uživatel `tomcat` . To znemožňuje hackerům přihlásit se na váš server jako uživatel `tomcat` .
A v každém případě byste to měli udělat tak, aby `tomcat` uživatel má v systému souboru serveru velmi omezená oprávnění (read+write+execute privilegia)
pro `apache-tomcat` adresářový strom a ` <bigParentDirectory> ` a práva pouze pro čtení pro adresáře s daty, která ERDDAP™ vyžaduje přístup k).
  * Můžete vytvořit `tomcat` uživatelský účet (který nemá heslo) pomocí příkazu:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Můžete přejít na práci jako uživatel `tomcat` pomocí příkazu
    ```
    sudo su - tomcat
    ```
     (Požádá vás o heslo pro superuživatele, abyste to mohli udělat.) 
    * Můžete přestat pracovat jako uživatel tomcat pomocí příkazu
    ```
    exit
    ````
    * Udělat většinu zbytku Tomcat a ERDDAP™ nastavit návod k nastavení jako uživatel `tomcat` . Později, spusťte `startup.` a `Vypnout. s` skripty jako uživatel `tomcat` 
aby měl Tomcat povolení napsat do svých logových souborů.
    * Po vybalení Tomcat, od rodiče `apache-tomcat` adresář:
      * Změna vlastnictví adresáře apache-tomcat na uživatele tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ale nahraďte skutečný název vašeho adresáře) .
      * Změňte "skupina" být tomcat, vaše uživatelské jméno, nebo název malé skupiny, která zahrnuje tomcat a všechny správce Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Změnit oprávnění tak, aby Tomcat a skupina četli, psali, prováděli práva:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Odstranit "ostatní" uživatelská oprávnění ke čtení, zápisu nebo spuštění:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
To je důležité, protože to brání ostatním uživatelům číst možná citlivé informace v ERDDAP™ nastavit soubory.

### paměť{#memory} 

Nastavit proměnné prostředí Tomcat

* Na Linuxu a Macu:
Vytvořit soubor `Tomcat/bin/setenv.sh`   (nebo v Red Hat Enterprise Linux \\[ RHEL \\] , upravit `~tomcat/conf/tomcat10.conf` ) nastavit Tomcatovy proměnné prostředí.
Tento soubor bude použit `tomcat/bin/startup.sh` a `Vypnout. s` . Soubor by měl obsahovat něco jako:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ale nahradit názvy adresářů z počítače) .
   (Pokud jste již dříve nastaven `JRE_HOME` Můžeš to odstranit.) 
Na Macs, pravděpodobně nemusíte nastavit `JAVA_ DOMŮ` .

* Na Windows:
Vytvořit soubor `Tomcat\bin\\setenv.bat` nastavit Tomcatovy proměnné prostředí.
Tento soubor bude použit `Tomcat\bin\\ startup.bat` a ` shutdown.bat ` .
Soubor by měl obsahovat něco jako:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ale nahradit názvy adresářů z počítače) .
Pokud je to jen pro místní testování, odstraňte "-server."
   (Pokud jste již dříve nastaven `JRE_HOME` Můžeš to odstranit.) 

The `- Xmx` a `- Xms` nastavení paměti je důležité, protože ERDDAP™ lépe funguje s více paměti.
Vždy nastaveno `- Xms` na stejnou hodnotu jako `- Xmx` .

* Pro 32 bitové operační systémy a 32 bitů Java :
64 bitů Java je mnohem lepší než 32 bitů Java , ale 32 bitů Java bude fungovat tak dlouho, dokud nebude server zaneprázdněn.
Čím více fyzické paměti na serveru, tím lépe: 4+ GB je opravdu dobré, 2 GB je v pořádku, méně se nedoporučuje.
S 32 bity Java , i s bohatou fyzickou pamětí, Tomcat a Java neuteče, když se pokusíte nastavit `- Xmx` vysoko nad 1500M (1200M na některých počítačích) .
Pokud má váš server méně než 2GB paměti, snižte `- Xmx` hodnota (v 'M'egaBytech) na 1/2 fyzické paměti počítače.

* Pro 64 bitů operačních systémů a 64 bitů Java :
64 bitů Java bude fungovat pouze na 64 bitovém operačním systému.
  * S Java 8, musíte přidat `-d64` Tomcatovi `CATALINA_OPTS` parametr v `setenv.bat` .
  * S Java 21, vyberete 64 bitů. Java při stažení verze Java označené "64 bit."

Se 64 bity Java , Tomcat a Java může použít velmi vysoké `- Xmx` a `- Xms` nastavení. Čím více fyzické paměti na serveru, tím lépe.
Jako zjednodušený návrh: doporučujeme nastavit `- Xmx` a `- Xms` až (v 'M'egaBytech) až 1/2 (nebo méně) fyzické paměti počítače.
Uvidíš, jestli Tomcat, Java a ERDDAP™ jsou skutečně běží v 64 bitovém režimu hledáním " bit," v ERDDAP 's Daily Report email
nebo `bigDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` soubor ( `velkýRodič rodičů` je uvedeno v [setup.xml](#setupxml) ) .

#### Sběr odpadků{#garbage-collection} 

* In ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) soubor, uvidíte mnoho "GC (Selhání přidělení) "zprávy.
Tohle obvykle není problém. Je to častou zprávou od normálně fungujícího Java že právě dokončila menší odpad.
sbírka, protože jí došel prostor v Edenu (část Java hromada pro velmi mladé předměty) . Obvykle vám zpráva ukazuje
   `PaměťPoužítPřed-&gt;paměťPo použití` . Pokud jsou ta dvě čísla blízko sebe, znamená to, že odpadky nebyly produktivní.
Zpráva je jen známkou problémů, pokud je velmi časté (každých pár sekund) , není produktivní, a čísla jsou velké a nerostou,
které společně naznačují, že Java potřebuje více paměti, snaží se uvolnit paměť a nemůže uvolnit paměť.
To se může stát během stresující doby a pak odejít. Ale pokud bude pokračovat, je to známka problémů.
* Pokud uvidíte `java.lang.OutOfMemoryError` s v ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) soubor,
viz [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) pro tipy, jak diagnostikovat a řešit problémy.
         
### Povolení{#permissions} 

*  [Na Linux a Macs, změnit oprávnění](#permissions) ze všech `*.sh` soubory v `tomcat/bin/` musí být spustitelný vlastníkem:
  ```
  chmod +x *.sh
  ```

### Písma{#fonts} 

*  [Písma pro obrázky:](#fonts) Rozhodně dáváme přednost svobodným. [DejaVu písma](https://dejavu-fonts.github.io/) na druhou Java písma.
Používání těchto písem se důrazně doporučuje, ale nevyžaduje se.

Pokud se rozhodnete nepoužívat písma DejaVu, musíte změnit písmoFamily nastavení v setup.xml na ` <fontFamily> SansSerif </fontFamily> ` ,
který je k dispozici se všemi Java distribuce. Při nastavení ` <fontFamily> ` na jméno písma, které není k dispozici, ERDDAP™ Nenabíjí.
a vytiskne seznam dostupných písem v `log.txt` Složka. Musíte použít jedno z těch písm.

Pokud se rozhodnete použít písma DejaVu, ujistěte se, že ` <fontFamily> ` nastavení v setup.xml je ` <fontFamily> DejaVu Sans </fontFamily> ` .

Pro instalaci písem DejaVu si stáhněte [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
a rozepnout soubory s písmem do dočasného adresáře.

  * Na Linuxu:
    * Pro Linux Adoptium Java distribuce, viz [Tyto pokyny](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Ostatní Java distribuce: Jako `tomcat` uživatel, zkopírovat soubory písma do `$JAVA_HOME/LIB/fonts` tak Java může najít písma.
Pamatujte: pokud/když později upgrade na novější verzi Java , musíte reinstalovat tato písma.
  * Na Macs: pro každý soubor s písmem dvakrát klikněte na něj a pak klikněte na Install Font.
  * Na Windows 7 a 10: ve Windows Exploreru vyberte všechny soubory písma. Pravým tlačítkem. Klikněte na Install.
             
### Test Tomcat{#test-tomcat} 

* Otestujte si instalaci Tomcat.
  * Linux:
    * Jako uživatel "tomcat," spustit `tomcat/bin/startup.sh` .
    * Zobrazit své URL + ":8080/" ve svém prohlížeči (např. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (spustit tomcat jako uživatel správce systému) :
    * Utíkej. `tomcat/bin/startup.sh` .
    * Zobrazit své URL + ":8080/" ve svém prohlížeči (např. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Všimněte si, že ve výchozím nastavení je váš Tomcat přístupný pouze vámi. Není veřejně přístupná.
  * Localhost Windows:
    * Klikněte pravým tlačítkem na ikonu Tomcat v systémové podnose a vyberte "Spustit službu."
    * Pohled [http://127.0.0.1:8080/](http://127.0.0.1:8080/) nebo snad [http://localhost:8080/](http://localhost:8080/) Ve vašem prohlížeči. Všimněte si, že ve výchozím nastavení je váš Tomcat přístupný pouze vámi. Není veřejně přístupná.

Měli byste vidět stránku Tomcat "Gratulujeme."

Jestli se něco stane, podívejte se do souboru Tomcat. `Tomcat/logs/catalina.out` .

### Problémy s instalací Tomcat?{#troubles-with-the-tomcat-installation} 

* Na Linux a Mac, pokud nemůžete dosáhnout Tomcat nebo ERDDAP™   (nebo se k nim možná nedostanete z počítače mimo váš firewall.) ,
můžete testovat, zda Tomcat poslouchá port 8080, psaním (jako kořen) na příkazovém řádku serveru:

  ```
  netstat -tuplen | grep 8080
  ```

To by mělo vrátit jeden řádek s něčím jako:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (kde `#` je nějaká číslice) , s uvedením, že a `kava` postup (pravděpodobně Tomcat) poslouchá v přístavu "8080" pro "tcp" provoz.
Pokud nebyly vráceny žádné linky, pokud se řádek výrazně liší, nebo pokud byly vráceny dvě nebo více řádků, pak může být problém s nastavením portu.

* Viz soubor s logem Tomcat `Tomcat/logs/catalina.out` . Tomcat problémy a některé ERDDAP™ startup problémy jsou téměř vždy uvedeny tam.
To je běžné, když jste poprvé nastavení ERDDAP™ .

* Viz [Tomcat](https://tomcat.apache.org/) webové stránky nebo hledat web o pomoc, ale prosím dejte nám vědět problémy, které jste měli a řešení jste našli.

* Podívejte se na naše [oddíl o získání dodatečné podpory](/docs/intro#support) .
             
###  ERDDAP™ Obsah{#erddap-content} 
3.   [Připravit `Tomcat/content/erddap` Konfigurační soubory.](#erddap-content) 
Na Linux, Mac a Windows, stáhnout [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
a rozepnout do `tomcat` adresář, vytváření `Tomcat/content/erddap` .

__Version 1.0.1, 20883 bytes, MD5=98a8099e7e674da59fe35e9c96efa7b5, dated 2025-06-02_

Některé předchozí verze jsou také k dispozici:

    *  [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, dat. 2022-02-16) 
    *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, dat. 2022-02-16) 
    *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191,EE6868C40B9A29362, dat. 2022-10-09) 
    *  [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, dat. 2022-12-08) 
    *  [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191,EE6868C40B9A29362, dat. 2023-02-27) 

#### Další adresář{#other-directory} 

Pro Red Hat Enterprise Linux (RHEL) nebo pro jiné situace, kdy není dovoleno upravovat adresář Tomcat nebo kde chcete/potřebujete
dát ERDDAP™ adresář obsahu v jiném místě z nějakého jiného důvodu (například, pokud používáte Jetty místo Tomcat) ,
unzip `erddapContent .zip ` do požadovaného adresáře (na které pouze `tomcat` uživatel má přístup) a nastavit ` erddapContentDirectory ` vlastnost systému
 (např. ` erddapContentDirectory  =~tomcat/content/erddap ` ) tak ERDDAP™ může najít tento nový adresář obsahu.

### setup.xml{#setupxml} 

*  [Přečti si komentáře `tomcat/content/erddap/setup.xml` ](#setupxml) a provést požadované změny. setup.xml je soubor se všemi nastaveními, které určují, jak ERDDAP™ Chová se slušně.

Pro počáteční nastavení musíte alespoň změnit tato nastavení:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` nastavení
      *  ` <admin...> ` nastavení
      *  ` <baseHttpsUrl> `   (Když jste to nachystali https ) 

Když vytvoříte velký Rodič Directory, z rodičovského adresáře bigParentDirectory:

    * Make the `tomcat` uživatel majitele `velkýRodič rodičů` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Změňte "skupina" být tomcat, vaše uživatelské jméno, nebo název malé skupiny, která zahrnuje tomcat a všechny správce Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Změnit oprávnění tak, aby Tomcat a skupina četli, psali, prováděli práva:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Odstraňte "jiné" uživatelské oprávnění ke čtení, zápisu nebo spuštění. To je důležité, aby se zabránilo čtení potenciálně citlivých informací
v ERDDAP™ log soubory a soubory s informacemi o soukromých datových souborech.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Proměnné prostředí{#environment-variables} 

Začneme s ERDDAP™ v2.13, ERDDAP™ Správci mohou přepsat jakoukoli hodnotu v setup.xml zadáním proměnné prostředí
jméno ` ERDDAP _hodnotaNázev` před spuštěním ERDDAP™ . Například použití ` ERDDAP _baseUrl` Přepíše ` <baseUrl> ` hodnota.
To může být užitečné při nasazení ERDDAP™ s kontejnerem jako je Docker, jak můžete dát standardní nastavení do setup.xml
a pak dodat speciální nastavení pomocí proměnných prostředí. Pokud poskytnete tajné informace ERDDAP™ pomocí této metody,
Ujistěte se, že informace zůstanou v tajnosti. ERDDAP™ pouze čte proměnné prostředí jednou za spuštění,
v první sekundě startupu, takže jeden způsob, jak to použít, je: nastavit proměnné prostředí, začít ERDDAP ,
Počkej. ERDDAP™ je spuštěn, pak odnastavit proměnné prostředí.

###  datasets.xml  {#datasetsxml} 

* Přečti si komentáře [ **Práce s datasets.xml Soubor** ](/docs/server-admin/datasets) . Později, až se dostaneš ERDDAP™ běží
poprvé (obvykle pouze s výchozími soubory dat) , budete modifikovat XML v `tomcat/content/erddap/ datasets.xml ` 
k určení všech souborů dat, které chcete ERDDAP™ sloužit. Tady budeš trávit většinu času.
při nastavení ERDDAP™ a později při zachování ERDDAP™ .

Můžete vidět příklad [ datasets.xml na GitHubu](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Nepravděpodobné) Teď nebo (o něco pravděpodobnější) v budoucnu, pokud chcete změnit soubor Erddap CSS, kopírujte
   `Tomcat/content/erddap/images/erddapStart2.cs` až `Tomcat/content/erddap/images/erddap2.cs` a pak udělat změny.
Změny `erddap2.css` nabývají účinku pouze tehdy, ERDDAP™ je restartován a často také vyžaduje, aby uživatel vymazal cachované soubory prohlížeče.
     
 ERDDAP™ nefunguje správně, pokud nastavení.xml nebo datasets.xml soubor není dobře vytvořený XML soubor. Takže, po editaci těchto souborů,
je dobrý nápad ověřit, že výsledek je dobře vytvořený XML vložením XML textu do XML checkeru, jako je [xmlvalidace](https://www.xmlvalidation.com/) .
     
### Nainstalujte erddap. válečný soubor{#install-the-erddapwar-file} 

4. Na Linuxu, Macu a Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) __ do `Tamcat/webaps` :

__Version 2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, dated 12-15-2025__

Soubor .war je velký, protože obsahuje pobřeží s vysokým rozlišením, hranice a nadmořské výšky potřebné k vytvoření map.

Některé předchozí verze jsou také k dispozici.

   *  [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, dat. 2022-02-16) 
   *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, dat. 2022-02-23) 
   *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDB519B6, dat. 2022-10-09) 
   *  [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, dat. 2022-12-08) 
   *  [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, dat. 2023-03-03) 
   *  [2. 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dat.2024-06-07e) 
   *  [2. 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datováno 2024-11-07) 
   *  [2. 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, dat. 2025-03-31) 
   *  [2, 27. 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, dat. 2025-06-11) 
   *  [2, 28, 1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, dat. 2025-09-05) 

### Nastavit proxy (specifické nasazení)  {#proxy} 

 ERDDAP™ je obvykle nasazen za webserveru reverzní proxy, aby bylo možné jej obsloužit na standardních HTTP portech (80 a 443) .
Ukončení SSL/TLS je často zahaleno i ve vrstvě proxy serveru. Specifikace závisí na požadavcích každého nasazení.

#### Apač{#apache} 

1. Zajistit, aby `mod_ proxy` a `mod_proxy_ http ` jsou naloženy:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Upravit existující ` <VirtualHost> ` Značka (pokud nějaký existuje) , nebo přidat jeden na konci souboru:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Pokud ERDDAP™ se podává na jiné cestě než `/erddap` , také nastavit `X- Forward- Prefix` hlavička k
úsek cesty _před_ `/erddap` . Toto nastavení by bylo vhodné pro ERDDAP™ podávané v
 `/subpath/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Pak restartujte Apache: `/usr/sbin/apachectl - K elegantní.`   (ale někdy je v jiném adresáři) .
         
#### NGINX{#nginx} 

V konfiguračním souboru zadejte tyto hlavičky:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Pokud ERDDAP™ se podává na jiné cestě než `/erddap` , také nastavit `X- Forward- Prefix` hlavička k
úsek cesty _před_ `/erddap` . Toto nastavení by bylo vhodné pro ERDDAP™ podávané v
 `/subpath/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Pro získání NGINX a ERDDAP™ správně pracovat s https , musíte dát následující úryvek do Tomcat server.xml ` <Host> ` blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Spustit Tomcat{#start-tomcat} 

*  (Nedoporučuji používat Tomcat Web Application Manager. Pokud úplně nevypnete a nespustíte Tomcat, dříve nebo později budete mít problémy s permGen pamětí.) 
*  (V Linuxu nebo Mac OS, pokud jste vytvořili speciálního uživatele ke spuštění Tomcat, např. Tomcat, nezapomeňte udělat následující kroky jako tento uživatel.) 
* Pokud Tomcat už běží, zavřete Tomcat s (v Linuxu nebo Mac OS)   `Tomcat/bin/shutdown.sh` 
nebo (ve Windows)   `tomcat\bin\\ shutdown.bat ` 

U Linuxu použijte `ps -ef | grep tomcat` před a po `Vypnout. s` aby se ujistil, že proces tomcat přestal.
Proces by měl být uveden před vypnutím a po vypnutí by nakonec nebyl uveden.
To může trvat minutu nebo dvě pro ERDDAP™ úplně vypnuto. Buď trpělivý. Nebo pokud to vypadá, že to sám nezastaví, použijte:
   `zabít - 9 <processID> ` 
* Začněte s Tomcat (v Linuxu nebo Mac OS)   `tomcat/bin/startup.sh` nebo (ve Windows)   `Tomcat\bin\\ startup.bat` 

## Je ERDDAP™ Běhat?{#is-erddap-running} 

Pro zobrazení použijte prohlížečhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Začíná bez načtení dat. Datasety jsou načteny v podkladovém vlákně, takže jsou dostupné jedno po druhém.

### Řešení problémů{#troubleshooting} 

* Když přijde žádost uživatele, jde do Apache (na počítačích Linux a Mac OS) , pak Tomcat, pak ERDDAP™ .
* Můžete vidět, co přijde do Apače (a související chyby) v záznamech Apache.
*    [Ty.](/docs/server-admin/additional-information#tomcat-logs) může vidět, co přijde na Tomcat (a související chyby) 
v souborech protokolu Tomcat ( `Tomcat/logs/catalina.out` a další soubory v tomto adresáři) .
*    [Ty.](/docs/server-admin/additional-information#log) může vidět, co přijde na ERDDAP , diagnostické zprávy z ERDDAP ,
a chybové zprávy z ERDDAP , v ERDDAP™   ` <bigParentDirectory> /logs/log.txt` Složka.
* Tomcat nezačíná. ERDDAP™ dokud Tomcat nedostane žádost o ERDDAP™ . Takže můžete vidět v záznamech Tomcat, pokud to
Začalo ERDDAP™ nebo pokud existuje chybová zpráva související s tímto pokusem.
* Kdy? ERDDAP™ Začíná to, přejmenovává staré ERDDAP™ log.txt soubor ( `logArchivedAt <CurrentTime> .txt` ) a vytvoří nový log.txt soubor.
Takže pokud `log.txt` soubor je starý, je to znamení, že ERDDAP™ Ještě se nevrátil. ERDDAP™ zapíše informace o záznamu do bufferu
a pouze pravidelně píše buffer do log souboru, ale můžete nutit ERDDAP™ napsat buffer do souboru protokolu návštěvou
     ` /erddap/status.html ` .

### Problém: Stará verze Java  {#trouble-old-version-of-java} 

Pokud používáte verzi Java To je příliš staré na ERDDAP , ERDDAP™ nebude běžet a uvidíte chybovou zprávu v Tomcat je log souboru jako

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Řešením je aktualizovat na nejnovější verzi Java A ujisti se, že ji Tomcat používá.

### Problém: Pomalé spuštění poprvé{#trouble-slow-startup-first-time} 

Tomcat musí udělat hodně práce, když poprvé aplikace jako ERDDAP™ je zahájena; zejména musí vybalit `erddap.war` soubor
 (což je jako .zip soubor) . Na některých serverech, první pokus o zobrazení ERDDAP™ stánky (30 sekund?) Dokud ta práce neskončí.
Na jiných serverech první pokus okamžitě selže. Ale když počkáte 30 sekund a zkusíte to znovu, uspěje to, pokud ERDDAP™ byla nainstalována správně.

Na tohle není řešení. Takhle prostě Tomcat pracuje. Ale to nastane pouze poprvé poté, co nainstalujete novou verzi ERDDAP™ .

## Vypnout a restartovat{#shut-down-and-restart} 

V budoucnosti, zavřít (a restartovat)   ERDDAP™ , viz [Jak vypnout a znovu nastartovat Tomcat a ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problémy?{#trouble} 

Potíže s instalací Tomcat nebo ERDDAP™ ? Podívejte se na naše [oddíl o získání dodatečné podpory](/docs/intro#support) .

## E-mailové oznámení nových verzí ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Pokud chcete dostávat e-mail, kdykoli nová verze ERDDAP™ je k dispozici nebo jiné důležité ERDDAP™ oznámení,
Můžete se připojit k ERDDAP™ seznam oznámení [Tady.](https://groups.google.com/g/erddap-announce) . Tento seznam má průměr zhruba jeden e-mail každé tři měsíce.

## Přizpůsobit{#customize} 

*  [Přizpůsobte si svůj ERDDAP™ zvýraznit vaši organizaci (ne NOAA   ERD ) .](#customize) 
* Změňte banner, který se objeví nahoře ERDDAP™ .html stránky editací ` <startBodyHtml5> ` tag in your ` datasets.xml ` Složka.
(Pokud žádný není, zkopírujte výchozí z ERDDAP™ 's `Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/ messages.xml` soubor
do ` datasets.xml ` a upravit.) Například byste mohli:
  * Použít jiný obrázek (tj. logo vaší organizace) .
  * Změňte barvu pozadí.
  * Změna " ERDDAP™ "na "_VašeOrganizace_ ERDDAP™ "
  * Změňte "jednodušší přístup k vědeckým datům" na "jednodušší přístup k datům _YourOrganization_."
  * Změňte odkazy "Přivedl k vám" na odkazy na vaši organizaci a zdroje financování.
* Změnit informace na levé straně domovské stránky editací ` <theShortDescriptionHtml> ` tag in your ` datasets.xml ` Složka.
(Pokud žádný není, zkopírujte výchozí z ERDDAP™ 's `Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/ messages.xml` soubor
do ` datasets.xml ` a upravit.) Například byste mohli:
  * Popište, co vaše organizace a/nebo skupina dělá.
  * Popište jaká data to jsou. ERDDAP™ Ano.
  * Chcete-li změnit ikonu, která se objeví na záložce prohlížeče, vložte do vaší organizace favicon. ico in `Tomcat/content/erddap/images/` .
Vizhttps://en.wikipedia.org/wiki/Favicon.
