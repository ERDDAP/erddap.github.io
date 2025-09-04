---
sidebar_position: 1
---

# Instalovat
Jak provést počáteční nastavení ERDDAP™ na Vašem serveru

 ERDDAP™ může běžet na libovolném serveru, který podporuje Java a Tomcat (a další aplikační servery jako Jetty, ale my je nepodporujeme) .
 ERDDAP™ byl testován na Linuxu (V tomto ohledu je třeba poznamenat, že společnost LuxSCS se domnívá, že společnost LuxSCS je v souladu se zásadou tržně jednajícího hospodářského subjektu.) , Mac, a Windows počítače.

*  **Docker** -- Poskytujeme [ ERDDAP™ v kontejneru na dok](https://hub.docker.com/r/erddap/erddap) 
a IOOS nyní nabízí [Rychlý začátek průvodce pro ERDDAP™ v kontejneru docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Je to standard. ERDDAP™ instalace, v kontejneru Docker.
Přes Docker Kompozice nabízíme snadné způsoby, jak nastavit ssl a monitorování, číst více v ven [Dokovací dokumentace](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Pokud již používáte Docker, budete pravděpodobně preferovat verzi Docker.
Pokud hledáte spustit na cloud služby budete pravděpodobně preferovat verzi Docker.
*  **Amazon** -- Pokud instalujete ERDDAP™ na instanci Amazon Web Services EC2, viz [Amazon Web Services Přehled](/docs/server-admin/additional-information#amazon) Nejdřív.
*  **Linux a Mac** -- ERDDAP™ funguje skvěle na Linux a Mac počítače. Viz níže uvedené pokyny.
*  **Okna** -- Windows je v pořádku pro testování ERDDAP™ a pro osobní potřebu (viz níže uvedené pokyny) ,
ale nedoporučujeme ho používat pro veřejnost. ERDDAP™ Rozmístění. Běžící ERDDAP™ na Windows mohou mít problémy:
zejména ERDDAP™ nemusí být schopen rychle smazat nebo přejmenovat soubory. Tohle je pravděpodobně kvůli antivirovému softwaru.
   (např. z McAfee a Norton) což je kontrola souborů na viry. Pokud narazíte na tento problém
(které mohou být zobrazeny chybovými zprávami v [log.txt](/docs/server-admin/additional-information#log) soubor jako
"Nelze smazat..."), změna nastavení antivirového softwaru může částečně zmírnit problém. Nebo místo toho zvažte použití serveru Linux nebo Mac.

 **Norma ERDDAP™ instalační pokyny pro počítače Linux, Macs a Windows jsou:** 

0. Ujistěte se, že jsou nainstalovány nějaké závislosti. Na neWindows strojích (Linux a Mac) Potřebuješ Csh.

##  Java  {#java} 

1.  [Pro ERDDAP™ v2.19 +, nastaveno Java 21.](#java) 
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzi Java 21.
Stáhněte si a nainstalujte nejnovější verzi
    [Adoptium 's OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Pro ověření instalace spusťte například '/ javaJreBinDirectory / java -version'
'/ usr / local / jdk-21.0.3 + 9 / jre / bin / java -verze.

    ERDDAP™ pracuje s Java z jiných zdrojů, ale doporučujeme Adoptium, protože je hlavní, komunity- podporované,
bez (jako v pivu a řeči) verze Java 21 nabízí dlouhodobou podporu (zdarma upgrady pro mnoho let po prvním vydání) .
Z bezpečnostních důvodů prosím aktualizujte ERDDAP verze Java pravidelně jako nové verze Java 21 být k dispozici z Adopcia.

    ERDDAP™ byla podrobena rozsáhlému testování s 21, nikoli s jinými verzemi. Z různých důvodů netestujeme ani nepodporujeme jiné verze Java .
     
## Tomcat{#tomcat} 

2.  [Nastavit](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat je nejpoužívanější Java Aplikační server,
což je Java software, který stojí mezi síťovými službami operačního systému a Java serverový software jako ERDDAP™ .
Je to svobodný a open source software (FOSS) .

Můžeš použít jiný. Java Server aplikace (např., Jetty) Ale testujeme jen s Tomcatem.

   * Stáhněte si Tomcat a vybalte jej na vašem serveru nebo PC.
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzi Tomcat 10 (verze 9 a níže jsou nepřijatelné) 
která je určena pro práci s Java 21 nebo novější. Níže bude adresář Tomcat označen jako "tomcat".

Varování&#33; Pokud již máte Tomcat běží některé jiné webové aplikace (Obzvláště HISDDS) , doporučujeme nainstalovat ERDDAP™ n
      [druhý Tomcat](/docs/server-admin/additional-information#second-tomcat) , protože ERDDAP™ potřebuje různá nastavení Tomcat
a neměl by se potýkat s jinými aplikacemi na paměť.

     * Na Linuxu, [stáhnout "Core" "tar .gz "Rozdělení Tomcat](https://tomcat.apache.org/download-10.cgi) a vybalte to.
Doporučujeme vybalovat v '/ usr / local'.
     * Na Mac, Tomcat je pravděpodobně již nainstalován v '/ knihovna / Tomcat', ale měl by aktualizovat na nejnovější verzi Tomcat10.
Když to stáhnete, [stáhnout "Core" "tar .gz "Rozdělení Tomcat](https://tomcat.apache.org/download-10.cgi) a vybalte to v '/ Knihovně / Tomcat'.
     * Na Windows, můžete [stahovat "Core" "zip" Tomcat distribuce](https://tomcat.apache.org/download-10.cgi) 
        (který nezahrává s registrem Windows a který ovládáte z příkazové řádky DOS) a vybalte ji v příslušném adresáři.
        (Pro rozvoj používáme "Core" "zip" distribuci. Vytvoříme adresář '/ programy' a vybalíme ho tam.) 
Nebo si můžete stáhnout "Core" "64-bit Windows zip" distribuci, která obsahuje více funkcí.
Pokud je distribuce instalátorem Windows, pravděpodobně to Tomcat vloží například do '/ Program Files / apache- tomcat- 10.0.23'.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - V souboru 'tomcat / conf / server.xml' jsou dvě změny, které byste měli provést u každého z těchto dvou " <Connector> 'značky
   (jeden pro "&lt; konektor port =" 8080 "" a jeden pro "&lt; Contector port =" 8443 "") .
   1.  (Doporučené) Zvýšit hodnotu parametru "connectionTimeout", možná na 300000 (milisekundy, což je 5 minut) .
   2.  (Doporučené) Přidat nový parametr: 'relaxedQueryChars = "[] | "'. Toto je volitelné a mírně méně bezpečné,
ale odstraňuje potřebu uživatelů zakódovat tyto znaky, pokud se objeví v parametrech URL žádosti uživatele.
             
### obsah{#contentxml} 

* context.xml -- Resources Cache - In 'tomcat / conf / context.xml', těsně před ' </Context> 'tagu, změň značku Zdroje
   (nebo to přidejte, pokud už tam není.) Nastavení cache Parametr MaxSize na 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Vyhýbá se tak četným varováním v Catalině. ven, že všechno začíná
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Timeout Apache{#apache-timeout} 

* Na Linuxových počítačích změňte nastavení Apache timeout tak, aby časově náročné uživatelské požadavky netimeout
   (s tím, co se často jeví jako "Proxy" nebo "Bad Gateway" chyba) . Jako kořenový uživatel:
  * Upravit Apache ' http soubor d.conf (obvykle v '/ etc / http d / conf / ') :
    * Změnit stávající " <Timeout> 'nastavení (nebo přidat jeden na konci souboru) až 3600 (sekund) , místo výchozího 60 nebo 120 sekund.
    * Změnit stávající " <ProxyTimeout> 'nastavení (nebo přidat jeden na konci souboru) až 3600 (sekund) , místo výchozího 60 nebo 120 sekund.
  * Restartovat Apache: '/ usr / sbin / apachectl -K půvabný' (ale někdy je v jiném adresáři.) .

### Bezpečnost{#security} 
         
* Bezpečnostní doporučení: Viz [Tyto pokyny](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) zvýšení bezpečnosti
Vaše instalace Tomcat, zejména pro veřejné servery.
         
* Pro veřejnost ERDDAP™ instalace na Linux a Mac, je nejlepší nastavit Tomcat (program) jako součást uživatelskéhokocoura '
   (samostatný uživatel s omezenými povoleními a [nemá heslo](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Pouze super uživatel tak může přepnout na funkci uživatele "tomcat". Tím je pro hackery nemožné přihlásit se na váš server jako uživatel 'tomcat'.
A v každém případě byste to měli udělat tak, aby uživatel 'tomcat' měl velmi omezená oprávnění k souborovému systému serveru (čtení + zápis + výkon práv
pro adresář "apache- tomcat" strom a " <bigParentDirectory> 'a pouze pro čtení adresářů s daty, které ERDDAP™ potřebuje přístup k).
  * Můžete vytvořit uživatelský účet 'tomcat' (který nemá heslo) pomocí příkazu:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Můžete přepnout na funkci uživatelského počítače pomocí příkazu
    ```
    sudo su - tomcat
    ```
     (Bude vás žádat o heslo pro superuživatele pro povolení k tomu.) 
    * Můžete přestat pracovat jako uživatel tomcat pomocí příkazu
    ```
    exit
    ````
    * Udělat většinu zbytku Tomcat a ERDDAP™ návody k nastavení jako uživatel 'tomcat'. Později spusťte 'startup.sh' a 'shutdow.sh' skripty jako uživatelská 'tomcat'
takže Tomcat má povolení psát do svých log souborů.
    * Po vybalení Tomcat z mateřského adresáře "apachetomcat":
      * Změňte vlastnictví adresáře apache- tomcat stromu na uživatele tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ale nahradit skutečný název vašeho adresáře tomcat) .
      * Změňte "skupinu" na tomcat, vaše uživatelské jméno, nebo jméno malé skupiny, která obsahuje tomcat a všechny administrátory Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Změna oprávnění tak, že tomcat a skupina mají číst, psát, vykonávat práva:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Odstranit oprávnění "jiného" uživatele pro čtení, zápis nebo provedení:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
To je důležité, protože to brání jiným uživatelům číst možná citlivé informace v ERDDAP™ Nastavit soubory.

### Paměť{#memory} 

Nastavit proměnné prostředí pro Tomcat

* Na Linuxu a Macích:
Vytvořit soubor 'tomcat / bin / setenv.sh' (nebo v Red Hat Enterprise Linux \\[ RHEL \\] , editovat '~ tomcat / conf / tomcat10.conf') nastavit Tomcatovy proměnné prostředí.
Tento soubor bude použit 'tomcat / bin / startup.sh' a 'shutdown.sh'. Soubor by měl obsahovat něco jako:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ale nahradit názvy adresářů z počítače) .
   (Pokud jste předtím nastavili JRE _ HOME, můžete to odstranit.) 
Na Macse asi nebudeš muset nastavit "JAVA _ HOME".

* Na Windows:
Vytvořte soubor 'tomcat\\ bin\\ setenv.bat' pro nastavení proměnných prostředí Tomcat.
Tento soubor bude použit 'tomcat\\ bin\\ startup.bat' a ' shutdown.bat ".
Soubor by měl obsahovat něco jako:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ale nahradit názvy adresářů z počítače) .
Pokud je to jen pro lokální testování, odstraňte "-server".
   (Pokud jste předtím nastavili JRE _ HOME, můžete to odstranit.) 

Nastavení paměti '-Xmx' a '-Xms' je důležité, protože ERDDAP™ lépe pracuje s více pamětí.
Vždy nastavte '-Xms' na stejnou hodnotu jako '-Xmx'.

* Pro 32 bitové operační systémy a 32 bitů Java :
64 bit Java je mnohem lepší než 32 bit Java , ale 32 bit Java bude fungovat, pokud server nebude mít moc práce.
Čím více fyzické paměti na serveru lepší: 4 + GB je opravdu dobré, 2 GB je v pořádku, méně se nedoporučuje.
S 32 bity Java , i s bohatou fyzickou pamětí, Tomcat a Java nebude běžet, pokud se pokusíte nastavit '-Xmx' mnohem nad 1500M (1200M na některých počítačích) .
Pokud má váš server méně než 2GB paměti, snižte hodnotu '-Xmx' (In 'M' egaBytes) 1 / 2 fyzické paměti počítače.

* Pro 64 bitové operační systémy a 64 bitů Java :
64 bit Java bude pracovat pouze na 64 bitovém operačním systému.
  * S Java 8, musíte přidat '-d64' k parametru Tomcat 'CATALINA _ OPTS' v parametru 'setenv.bat'.
  * S Java 21, vyberete 64 bit Java při stahování verze Java značeno "64 bitů".

S 64 bity Java , Tomcat a Java může použít velmi vysoké nastavení '-Xmx' a '-Xms'. Čím více fyzické paměti na serveru, tím lépe.
Jako zjednodušený návrh: doporučujeme nastavit '-Xmx' a '-Xms' na (In 'M' egaBytes) až 1 / 2 (nebo méně) fyzické paměti počítače.
Uvidíš, jestli Tomcat, Java a ERDDAP™ skutečně běží v 64 bitovém režimu hledáním "bitu", v ERDDAP Daily Report email
nebo v 'bigParentDirectory / logs / [log.txt](/docs/server-admin/additional-information#log) 'soubor ('bigParentDirectory' je specifikováno v [setup.xml](#setupxml) ) .

#### Sbírka odpadků{#garbage-collection} 

* V ERDDAP™ s [log.txt](/docs/server-admin/additional-information#log) soubor, uvidíte mnoho "GC (Selhání přidělování) "zprávy.
Tohle obvykle není problém. Je to častá zpráva z normálně fungující Java že právě dokončil menší odpad.
sbírka, protože v Edenu došlo místo (Oddíl Java hromada pro velmi mladé předměty) . Obvykle vám zpráva ukáže
'memoryUseBefore- &gt; memoryUseAfter'. Pokud jsou ta dvě čísla blízko sebe, znamená to, že sbírka odpadků nebyla produktivní.
Zpráva je jen známkou potíží, pokud je velmi častá (každých pár sekund) , není produktivní, a čísla jsou velké a nerostou,
které společně naznačují, že Java potřebuje více paměti, snaží se uvolnit paměť, a není schopen uvolnit paměť.
Může se to stát během stresujícího období a pak odejít. Ale pokud to trvá, je to známka potíží.
* Pokud uvidíte 'java.lang.OutOfMemoryError' s in ERDDAP™ s [log.txt](/docs/server-admin/additional-information#log) soubor,
viz [Chyba v paměti](/docs/server-admin/additional-information#outofmemoryerror) pro tipy, jak diagnostikovat a řešit problémy.
         
### Povolení{#permissions} 

*  [Na Linuxu a Macích změňte oprávnění](#permissions) ze všech souborů '* .sh' v 'tomcat / bin /', které má vlastník provést:
  ```
  chmod +x *.sh
  ```

### Písma{#fonts} 

*  [Písma pro obrázky:](#fonts) Silně preferujeme svobodu [DejaVu písma](https://dejavu-fonts.github.io/) na druhou Java Písma.
Používání těchto písem se důrazně doporučuje, ale nevyžaduje se.

Pokud se rozhodnete nepoužívat písma DejaVu, musíte změnit nastavení fontFamily v setup.xml na ' <fontFamily> SansSerif </fontFamily> ',
který je k dispozici se všemi Java Rozdělení. Pokud jste nastavit ' <fontFamily> 'jméno písma, které není k dispozici, ERDDAP™ nebude nabíjet.
a vytiskne seznam dostupných písem v souboru 'log.txt'. Musíš použít jeden z těch fontů.

Pokud se rozhodnete používat DejaVu písma, ujistěte se, že ' <fontFamily> 'set in setup.xml is' <fontFamily> DejaVu Sans </fontFamily> ".

Chcete-li nainstalovat písma DejaVu, stáhněte si [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bajtů, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
a rozepnout fontové soubory do dočasného adresáře.

  * Na Linuxu:
    * Pro Linux Adoptium Java rozdělení, viz [Tyto pokyny](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Ostatní Java rozdělení: Jako uživatel 'tomcat' zkopírujte soubory písma do '$JAVA _ HOME / lib / fonts' tak Java najít písma.
Pamatujte: pokud / když později upgrade na novější verzi Java , musíte znovu nainstalovat tato písma.
  * Na Mac: pro každý soubor s fontem na něj dvakrát klikněte a potom klikněte na Install Font.
  * Na Windows 7 a 10: ve Windows Explorer vyberte všechny soubory písma. Pravým tlačítkem myši. Klikněte na Install.
             
### Test Tomcat{#test-tomcat} 

* Otestujte si instalaci Tomcat.
  * Linux:
    * Jako uživatel "tomcat", spusťte "tomcat / bin / startup.sh".
    * Zobrazit URL + ": 8080 /" ve svém prohlížeči (např. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (spusťte tomcat jako administrátor systému uživatele) :
    * Spusťte 'tomcat / bin / startup.sh'.
    * Zobrazit URL + ": 8080 /" ve svém prohlížeči (např. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Všimněte si, že ve výchozím nastavení, váš Tomcat je přístupný pouze vy. Není veřejně přístupný.
  * Localhost Windows:
    * Klikněte pravým tlačítkem myši na ikonu Tomcat v systémovém panelu a zvolte "Start service".
    * Pohled [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , nebo možná [http://localhost:8080/](http://localhost:8080/) , ve vašem prohlížeči. Všimněte si, že ve výchozím nastavení, váš Tomcat je přístupný pouze vy. Není veřejně přístupný.

Měl bys vidět stránku "Blahopřeju".

Pokud se objeví potíže, viz soubor Tomcat log na 'tomcat / logs / catalina.out'.

### Potíže s instalací Tomcat?{#troubles-with-the-tomcat-installation} 

* Na Linux a Mac, pokud se nemůžete dostat Tomcat nebo ERDDAP™   (Nebo se k nim prostě nemůžete dostat z počítače mimo váš firewall.) ,
můžete otestovat, zda Tomcat poslouchá port 8080, zadáním (jako kořen) na příkazovém řádku serveru:

  ```
  netstat -tuplen | grep 8080
  ```

To by mělo vrátit jednu větu s něčím jako:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (kde '#' je nějaká číslice) s uvedením, že proces "java" (Pravděpodobně Tomcat) je poslech na portu "8080" pro "tcp" provoz.
Pokud nebyly vráceny žádné řádky, pokud se vrácené řádky významně liší, nebo pokud byly vráceny dvě nebo více řádků, pak může být problém s nastavením portu.

* Viz soubor Tomcat log 'tomcat / logs / catalina.out'. Tomcat problémy a některé ERDDAP™ problémy se startem jsou zde téměř vždy indikovány.
To je běžné, když jste první nastavení ERDDAP™ .

* Viz [Tomcat](https://tomcat.apache.org/) webové stránky nebo hledat na webu o pomoc, ale dejte nám prosím vědět, jaké problémy jste měli a řešení jste našli.

* Podívejte se na naše [část o získání další podpory](/docs/intro#support) .
             
###  ERDDAP™ Obsah{#erddap-content} 
3.   [Nastavte konfigurační soubory 'tomcat / content / erddap'.](#erddap-content) 
Na Linux, Mac a Windows, stáhnout [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
a rozepnout do adresáře 'tomcat', čímž vznikne 'tomcat / content / erddap'.

_ _ Verze 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, datováno 2024- 10- 14 _ BAR _

K dispozici jsou i některé předchozí verze:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bajtů, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datováno 2022- 02- 16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bajtů, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, datováno 2022- 02- 16) 
    *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bajtů, MD5 = 1E26F62E7A06191EE6868C40B9A29362, datováno 2022-10-09) 
    *  [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bajtů, MD5 = 1E26F62E7A06191EE6868C40B9A29362, datováno 2022- 12- 08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bajtů, MD5 = 1E26F62E7A06191EE6868C40B9A29362, datováno 2023-02-27) 

#### Ostatní adresář{#other-directory} 

Pro Red Hat Enterprise Linux (RHEL) nebo pro jiné situace, kdy nemáte povoleno měnit adresář Tomcat nebo kde chcete / potřebujete
dát ERDDAP™ obsah adresáře v jiném místě z nějakého jiného důvodu (například, pokud používáte Jetty místo Tomcat) ,
unzip 'erddapContent .zip 'do požadovaného adresáře (k němuž má přístup pouze uživatel "tomcat") a nastavit ' erddapContentDirectory "vlastnictvím systému
 (např. " erddapContentDirectory  =~tomcat/content/erddap ') Takže ERDDAP™ najít tento nový adresář obsahu.

### setup.xml{#setupxml} 

*  [Přečtěte si komentáře v 'tomcat / content / erddap / setup.xml'](#setupxml) a provést požadované změny. setup.xml je soubor se všemi nastaveními, která specifikují, jak váš ERDDAP™ Chová se slušně.

Pro počáteční nastavení, musíte alespoň změnit tato nastavení:
      * ' <bigParentDirectory> '
      * ' <emailEverythingTo> '
      * ' <baseUrl> '
      * ' <email...> 'nastavení
      * ' <admin...> 'nastavení
      * ' <baseHttpsUrl> ' (Když to nastavíš https ) 

Když vytvoříte bigParentDirectory, z mateřského adresáře bigParentDirectory:

    * Udělat z uživatele "tomcat" majitele "bigParentDirectory":
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Změňte "skupinu" na tomcat, vaše uživatelské jméno, nebo jméno malé skupiny, která obsahuje tomcat a všechny administrátory Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Změna oprávnění tak, že tomcat a skupina mají číst, psát, vykonávat práva:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Odstranit oprávnění "jiného" uživatele ke čtení, psaní nebo spuštění. To je důležité, aby se zabránilo čtení možná citlivé informace
n ERDDAP™ logovat soubory a soubory s informacemi o soukromých souborech dat.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Proměnné prostředí{#environment-variables} 

Počínaje ERDDAP™ v2.13, ERDDAP™ administrátoři mohou přepsat jakoukoli hodnotu v setup.xml specifikováním proměnné prostředí
Název ERDDAP _ valueName 'před spuštěním ERDDAP™ . Například použít " ERDDAP _ baseUrl 'přejede' <baseUrl> "hodnota.
To může být užitečné při nasazení ERDDAP™ s kontejnerem jako Docker, jak můžete dát standardní nastavení v setup.xml
a pak dodat speciální nastavení přes proměnné prostředí. Pokud dodáte tajné informace ERDDAP™ pomocí této metody,
Ujistěte se, že informace zůstanou tajné. ERDDAP™ přečte proměnné prostředí pouze jednou za spuštění,
v první sekundě spuštění, takže jeden způsob, jak použít to je: nastavit proměnné prostředí, start ERDDAP ,
Počkej. ERDDAP™ je spuštěn, poté odstartuje proměnné prostředí.

###  datasets.xml  {#datasetsxml} 

* Přečtěte si komentáře v [ **Spolupráce s datasets.xml Soubor** ](/docs/server-admin/datasets) . Později, až budeš mít ERDDAP™ běh
poprvé (obvykle jen s výchozími soubory dat) , budete modifikovat XML v 'tomcat / content / erddap / datasets.xml '
pro určení všech souborů dat, které chcete ERDDAP™ sloužit. Tady strávíš většinu svého času.
při nastavení ERDDAP™ a později při zachování ERDDAP™ .

Můžete vidět příklad. [ datasets.xml na GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Nepravděpodobné) Teď nebo (mírně pravděpodobnější) v budoucnu, pokud chcete změnit soubor CSS erddapu, zkopírujte
"tomcat / content / erddap / images / erddapStart2.css" to "tomcat / content / erddap / images / erddap2.css" a poté provést změny.
Změny "erddap2.css" nabývají účinku pouze tehdy, pokud ERDDAP™ je restartován a často také vyžaduje, aby uživatel vymazal soubory v prohlížeči.
     
 ERDDAP™ pokud setup.xml nebo datasets.xml soubor není dobře vytvořený XML soubor. Takže, až upravíte tyto soubory,
je dobrý nápad ověřit, že výsledek je dobře tvořen XML tím, že vložení XML text do XML checker jako je [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Nainstalujte erddap. válečný spis{#install-the-erddapwar-file} 

4. Na Linux, Mac a Windows _ _ download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ _ do 'tomcat / webapps':

_ _ Version 2.28.0, 620,824,288 bytes, MD5 = f948b2ba603f65a83ac67af43da9e4c2, dated 2025-08-29 _

.war soubor je velký, protože obsahuje vysoké rozlišení pobřeží, hranice a nadmořská výška data potřebná k vytvoření mapy.

K dispozici jsou i některé předchozí verze.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bajtů, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, datováno 2022-02-16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bajtů, MD5 = 461325E97E7577EC671DD50246CFB8B, datováno 2022- 02- 23) 
   *  [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bajtů, MD5 = F2CF805893146E932E498FDDBD519B6, dat. nar.) 
   *  [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bajtů, MD5 = 2B33354F633294213AE2AFDDCF4DA6D0, dat. nar.) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bajtů, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, datováno 2023-03-03) 
   *  [2. 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bajtů, MD5 = 970fbee172e28b0b8a07756eecbc898e, dat. nar.) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bajtů, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, datováno 2024- 11- 07) 
   *  [2. 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bajtů, MD5 = 99a725108b37708e5420986c1616a119, datováno 2025-03-31) 
   *  [2. 27. 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bajtů, MD5 = 3b2086c659eee4145ca2dff447bf4ef7, datováno 2025-06-11) 

### Nastavit proxy (Specifické nasazení)  {#proxy} 

 ERDDAP™ je obvykle nasazen za webserver reverzní proxy, aby bylo možné sloužit na standardních HTTP portech (80 a 443) .
Výpověď SSL / TLS je často i na proxy vrstvě webserveru. Specifika závisí na požadavcích každého nasazení.

#### Apache{#apache} 

1. Ujistěte se, že 'mod _ proxy' a 'mod _ proxy _ http "jsou naloženy:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Změnit stávající " <VirtualHost> 'tag (pokud existuje) , nebo přidat jeden na konci souboru:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Pokud ERDDAP™ je podáván na jiné cestě než '/ erddap', také nastavte hlavičku 'X- Forwarded- Prefix' na hlavičku
path segment _ before _ '/ erddap'. Toto nastavení by bylo vhodné pro ERDDAP™ podáváno v
"/ subpath / erddap":

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Poté restartujte Apache: '/ usr / sbin / apachectl -K půvabný' (ale někdy je v jiném adresáři.) .
         
#### NGINX{#nginx} 

V konfiguračním souboru nginx nastavte tyto hlavičky:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Pokud ERDDAP™ je podáván na jiné cestě než '/ erddap', také nastavte hlavičku 'X- Forwarded- Prefix' na hlavičku
path segment _ before _ '/ erddap'. Toto nastavení by bylo vhodné pro ERDDAP™ podáváno v
"/ subpath / erddap":

```
proxy_set_header X-Forwarded-Prefix /subpath
```


S cílem získat NGINX a ERDDAP™ správně pracovat s https , je třeba vložit následující snippet uvnitř Tomcat server.xml ' <Host> "blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Spustit Tomcat{#start-tomcat} 

*  (Nedoporučuji používat Tomcat Web Application Manager. Pokud nebudete plně vypnout a nastartovat Tomcat, dříve či později budete mít problémy s pamětí PermGen.) 
*  (V Linuxu nebo Mac OS, pokud jste vytvořili speciální uživatele pro spuštění Tomcat, např. tomcat, nezapomeňte udělat následující kroky jako tento uživatel.) 
* Pokud Tomcat už běží, vypněte Tomcat s (v Linuxu nebo Mac OS) "tomcat / bin / shutdown."
nebo (ve Windows) 'tomcat\\ bin\\ shutdown.bat '

Na Linuxu použijte 'ps -ef | Grep tomcat 'před a po' shutdow.sh ', aby se ujistil, že proces tomcat přestal.
Proces by měl být uveden před ukončením a nakonec by neměl být uveden po ukončení.
To může trvat minutu nebo dvě na ERDDAP™ úplně vypnout. Buď trpělivý. Nebo pokud to vypadá, že se nezastaví sám, použijte:
"zabít -9 <processID> '
* Spusťte Tomcat s (v Linuxu nebo Mac OS) "tomcat / bin / startup.sh" nebo (ve Windows) 'tomcat\\ bin\\ startup.bat'

## Je ERDDAP™ Běhání?{#is-erddap-running} 

Pomocí prohlížeče se pokusíte zobrazithttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ začne bez načtení datových souborů. Datasety jsou načteny do záhlaví a tak jsou k dispozici jeden-by-jeden.

### Řešení problémů{#troubleshooting} 

* Když přijde žádost uživatele, jde do Apache (na počítačích Linux a Mac OS) Pak Tomcat. ERDDAP™ .
* Můžete vidět, co přijde do Apache (a související chyby) v záznamech Apache.
*    [Ty.](/docs/server-admin/additional-information#tomcat-logs) vidět, co přijde na Tomcat (a související chyby) 
v souborech Tomcat log ('tomcat / logs / catalina.out' a další soubory v tomto adresáři) .
*    [Ty.](/docs/server-admin/additional-information#log) vidět, co přijde na ERDDAP , diagnostické zprávy od ERDDAP ,
a chybové zprávy z ERDDAP , ERDDAP™ ' <bigParentDirectory> / loguje / log.txt 'soubor.
* Tomcat nezačíná. ERDDAP™ dokud Tomcat nedostane žádost ERDDAP™ . Takže můžete vidět v Tomcat log soubory, pokud to
spuštěn ERDDAP™ nebo pokud existuje chybová zpráva týkající se tohoto pokusu.
* Kdy ERDDAP™ začíná, přejmenovává staré ERDDAP™ log.txt soubor ('logArchived V <CurrentTime> .) a vytvoří nový log.txt soubor.
Takže pokud je soubor 'log.txt' starý, je to znamení, že ERDDAP™ v poslední době nebyl znovu zahájen. ERDDAP™ zapisuje informace o záznamu do bufferu
a pouze píše buffer do logového souboru pravidelně, ale můžete vynutit ERDDAP™ napsat buffer do souboru záznamu návštěvou
' /erddap/status.html ".

### Problémy: Stará verze Java  {#trouble-old-version-of-java} 

Pokud používáte verzi Java Na to je moc starý. ERDDAP , ERDDAP™ nebude běžet a uvidíte chybovou zprávu v Tomcat log souboru jako

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Řešení je aktualizovat na nejnovější verzi Java a ujisti se, že ho Tomcat používá.

### Problém: Pomalý start poprvé{#trouble-slow-startup-first-time} 

Tomcat musí udělat hodně práce při první aplikaci jako ERDDAP™ je zahájena; zejména musí rozbalit soubor "erddap.war"
 (který je jako .zip soubor) . Na některých serverech, první pokus vidět ERDDAP™ stánky (30 vteřin?) dokud tato práce neskončí.
Na jiných serverech, první pokus selže okamžitě. Ale pokud počkáte 30 sekund a zkusíte to znovu, uspěje to, když ERDDAP™ byl nainstalován správně.

Na to není žádná náprava. Takhle prostě Tomcat funguje. Ale to se vyskytuje pouze poprvé po instalaci nové verze ERDDAP™ .

## Vypnout a restartovat{#shut-down-and-restart} 

V budoucnosti, vypnutí (a restartovat)   ERDDAP™ , viz [Jak vypnout a obnovit Tomcat a ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problémy?{#trouble} 

Potíže s instalací Tomcat nebo ERDDAP™ ? Podívejte se na naše [část o získání další podpory](/docs/intro#support) .

## E-mailové oznámení nových verzí ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Pokud chcete dostávat e-mail kdykoliv novou verzi ERDDAP™ je k dispozici nebo jiné důležité ERDDAP™ oznámení,
můžete se připojit k ERDDAP™ Seznam oznámení [Tady.](https://groups.google.com/g/erddap-announce) . Tento seznam představuje zhruba jeden e-mail každé tři měsíce.

## Přizpůsobit{#customize} 

*  [Přizpůsobte si ERDDAP™ zvýraznit vaši organizaci (ne NOAA   ERD ) .](#customize) 
* Změnit banner, který se objeví na vrcholu všeho ERDDAP™ .html stránky editací ' <startBodyHtml5> 'tag in your' datasets.xml Složka.
(Pokud žádný není, zkopírujte výchozí z ERDDAP™ 'tomcat / webapps / erddap / WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml' soubor
do " datasets.xml 'a upravit.) Například byste mohli:
  * Použít jiný obrázek (tedy logo vaší organizace) .
  * Změňte barvu pozadí.
  * Změnit " ERDDAP™ "to" _ YourOrganization _ 's ERDDAP™ "
  * Změna "Snadnější přístup k vědeckým údajům" na "Snadnější přístup k údajům _ YourOrganization _ '."
  * Změňte "Přinesl vám" odkazy být odkazy na vaši organizaci a zdroje financování.
* Změnit informace na levé straně domovské stránky editací ' <theShortDescriptionHtml> 'tag in your' datasets.xml Složka.
(Pokud žádný není, zkopírujte výchozí z ERDDAP™ 'tomcat / webapps / erddap / WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml' soubor
do " datasets.xml 'a upravit.) Například byste mohli:
  * Popište, co vaše organizace a / nebo skupina dělá.
  * Popište, jaké údaje to jsou ERDDAP™ má.
  * Chcete-li změnit ikonu, která se objeví na záložkách prohlížeče, dejte si favicon vaší organizace. ico in 'tomcat / content / erddap / images /'.
Vizhttps://en.wikipedia.org/wiki/Favicon.
