---
sidebar_position: 1
---

# Nainstalovat
Jak udělat počáteční nastaveníERDDAP™na Vašem serveru


ERDDAP™může běžet na jakémkoli serveru, který podporujeJavaa Tomcat (a další servery jako Jetty, ale my je nepodporujeme.) .ERDDAP™byla testována na Linuxu (včetně AWS Amazonu) , Mac a Windows počítače.

*    **Amazon** -- Pokud instalujeteERDDAP™v případě Amazon Web Services EC2:[Přehled webových služeb Amazon](/docs/server-admin/additional-information#amazon)Nejdřív.
*    **Docker** -- Axiom nyní nabízí[ERDDAP™v kontejneru Docker](https://hub.docker.com/u/axiom/)a IOOS nyní nabízí[Návod k rychlému startu proERDDAP™v kontejneru Docker](https://ioos.github.io/erddap-gold-standard/index.html).
Je to standard.ERDDAP™instalace, ale Axiom to dal do kontejneru s dockery.
Pokud již používáte Docker, budete pravděpodobně preferovat Docker verzi.
Pokud už nepoužíváte Dockera, obvykle to nedoporučujeme.
Pokud jste se rozhodli pro instalaciERDDAP™přes Dockera nenabízíme žádnou podporu procesu instalace.
Ještě jsme s Dockerem nepracovali. Pokud s tím budete pracovat, pošlete nám své připomínky.
*    **Linux a Macs** --ERDDAP™funguje skvěle na Linux a Mac počítače. Viz pokyny níže.
*    **Okna** -- Windows je v pořádku pro testováníERDDAP™a pro osobní použití (viz níže uvedené pokyny) , ale nedoporučujeme ji používat pro veřejnostERDDAPs. BěhERDDAP™na Windows mohou mít problémy: zejménaERDDAP™nemusí být schopen rychle smazat a/nebo přejmenovat soubory. To je pravděpodobně kvůli antivirovému softwaru. (např. z McAfee a Norton) který kontroluje soubory na viry. Pokud narazíte na tento problém (které lze vidět chybovými zprávami v[log.txt](/docs/server-admin/additional-information#log)soubor jako "Nelze smazat ...") , změna nastavení antivirového softwaru může částečně zmírnit problém. Nebo místo toho používejte Linux nebo Mac server.

 **StandardERDDAP™návod k instalaci počítačů Linux, Macs a Windows jsou:** 

0. Ujistěte se, že jsou nainstalovány jakékoli závislosti. Na nevětrných strojích (Linux a Mac) Potřebuješ csh.
## Java {#java} 
1.  [ProERDDAP™v2.19+, nastavenoJava21.](#java)
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verziJava21.
Stáhnout a nainstalovat nejnovější verzi
    [Adoptium OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Pro ověření instalace např. zadejte "/_javaJreBinDirectory_/java -version"
/usr/local/jdk-21.0.3+9/jre/bin/java -verze
    
    ERDDAP™spolupracuje sJavaz jiných zdrojů, ale doporučujeme Adoptium, protože je to hlavní, komunitně podporované, zdarma (jako pivo a řeč) verzeJava21, která nabízí dlouhodobou podporu (bezplatné upgrady pro mnoho let po počáteční vydání) . Z bezpečnostních důvodů, prosím aktualizujteERDDAP's verzíJavapravidelně jako nové verzeJava21 bude k dispozici z Adoptia.
    
    ERDDAP™byl testován a používán rozsáhle s 21, nikoli s jinými verzemi. Z různých důvodů netestujeme s jinými verzemiJava.
     
## Tomcat{#tomcat} 
2.  [Připravit](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat je nejvíce používanýJavaAplikační server, který jeJavasoftware, který stojí mezi síťovými službami operačního systému aJavaServerový software jakoERDDAP™. Je to svobodný a otevřený zdrojový software (FOSS) .
    
Můžeš použít jiný.JavaAplikační server (např. Jetty) Ale testujeme jen s Tomcatem a podporujeme ho.
     
    
    * Stáhněte si Tomcat a vybalte ho na server nebo PC.
Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzi Tomcat 10 (Verze 9 a níže nejsou přijatelné) která je určena pro práci sJava21 nebo novější. Níže bude adresář Tomcat označován jako _tomcat_.
        
Varování&#33; Pokud již máte Tomcat spuštěnou jinou webovou aplikaci (zejména THREDDS) , Doporučujeme vám nainstalovatERDDAP™v[druhý Tomcat](/docs/server-admin/additional-information#second-tomcat), protožeERDDAP™potřebuje různé nastavení Tomcat a neměl by se muset potýkat s jinými aplikacemi pro paměť.
        
        * Na Linuxu,[stáhnout "Core" "tar.gz" Distribuce Tomcat](https://tomcat.apache.org/download-10.cgi)a vybalit. Doporučujeme vybalit v /usr/local.
        * Na Macu je Tomcat pravděpodobně již nainstalován v /Library/Tomcat, ale měl by jej aktualizovat na nejnovější verzi Tomcat 10.
Když to stáhneš,[stáhnout "Core" "tar.gz" Distribuce Tomcat](https://tomcat.apache.org/download-10.cgi)a vybalte to do /Knihovny/Tomcat.
        * Na Windows, můžete[stáhnout "Core" "zip" Tomcat distribuce](https://tomcat.apache.org/download-10.cgi)  (který nezahrává s registrem Windows a který ovládáte z příkazového řádku DOS) a vybalit ji do vhodného adresáře. (Pro vývoj používáme distribuci "Core" "zip." Uděláme adresář /programy a vybalíme ho tam.) Nebo si můžete stáhnout distribuci "Core" "64-bit Windows zip," která obsahuje více funkcí. Pokud je distribuce instalátor Windows, bude pravděpodobně dát Tomcat do, například /Program Files/apache-tomcat-10.0.023.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- V souboru _tomcat_/conf/server.xml jsou dvě změny, které byste měli udělat pro každý ze dvou&lt;Konektor &gt; značky - jeden pro
```
        <Connector port="8080" 
```
a jeden pro
```
        <Conector port="8443"
```
    1.   (Doporučené) Zvýšit hodnotu parametru připojeníTimeout na 300000 (milisekundy)   (což je 5 minut.) .
    2.   (Doporučené) Přidat nový parametr: uvolněnýQueryChars="\\[\\]|" Toto je volitelné a o něco méně bezpečné, ale odstraňuje potřebu, aby uživatelé procentně kódovali tyto znaky, když se objeví v parametrech požadavku uživatele URL.
             
### obsah.xml{#contentxml} 
* kontext.xml -- Zdroje Cache - V _tomcat_/conf/context.xml, těsně před&lt;/Context &gt; tag, změnit značku Resources (nebo přidejte, pokud už tam není.) nastavit cache MaxSize parametr to 80000:
    &lt;Zdroje cachingAllowed="true" cacheMaxSize="80000" /&gt;
Tím se v Catalině vyhýbáme mnoha varováním. ven, že všechny začínají s
"WARNING\\[hlavní\\]org.apache.catalina.webresources.Cache.getResource Nelze přidat zdroj na\\[/WEB-INF/třídy/...]"
         
### Timeout Apache{#apache-timeout} 
* Na Linuxových počítačích, změnit nastavení timeout Apache tak, aby časově náročné požadavky uživatelů netimeout (s tím, co často vypadá jako chyba "Proxy" nebo "Bad Gateway") . Jako uživatel kořene:
    1. Upravit Apačehttpd.conf soubor (obvykle v /etc/httpd/conf/) :
Změnit existující&lt;Timeout&gt; Nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
Změnit existující&lt;ProxyTimeout&gt; nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
    2. Restartujte Apache: /usr/sbin/apachectl - K elegantní. (ale někdy je v jiném adresáři) .
             
    * Bezpečnostní doporučení: Viz[Tyto pokyny](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)zvýšit bezpečnost instalace Tomcat, zejména pro veřejné servery.
         
    * Pro veřejnostERDDAP™instalace na Linux a Macs, je nejlepší nastavit Tomcat (program) patří uživateli "tomcat" (samostatný uživatel s omezeným oprávněním a který[nemá žádné heslo](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Takže jen super uživatel může přepnout na to, aby působil jako uživatel tomcat. To znemožňuje hackerům přihlásit se na váš server jako uživatel tomcat. A v každém případě byste to měli udělat tak, aby uživatel Tomcat měl velmi omezená oprávnění na souborovém systému serveru (read+write+execute privilegia pro adresář apache-tomcat stromu a&lt;bigParentDirectory&gt; a práva pouze pro čtení pro adresáře s daty, kteréERDDAP™vyžaduje přístup k).
        * Můžete vytvořit uživatelský účet tomcat (který nemá heslo) pomocí příkazu
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Můžete přepnout na práci jako uživatel Tomcat pomocí příkazu
sudo su - tomcat
             (Požádá vás o heslo pro superuživatele, abyste to mohli udělat.) 
        * Můžete přestat pracovat jako uživatel tomcat pomocí příkazu
výstup
        * Udělat většinu zbytku Tomcat aERDDAP™nastavte pokyny jako uživatel "tomcat." Později spusťte startup.sh a odstraňte.sh skripty jako uživatel "tomcat," aby měl Tomcat oprávnění psát do svých log souborů.
        * Po vybalení Tomcat, z rodiče adresáře Apache-tomcat:
            
            * Změna vlastnictví adresáře apache-tomcat na uživatele tomcat.
Chown -R tomcat apache-tomcat-_10.0.23_
                 (ale nahraďte skutečný název vašeho adresáře) .
            * Změňte "skupina" být tomcat, vaše uživatelské jméno, nebo název malé skupiny, která zahrnuje tomcat a všechny správce Tomcat/ERDDAPnapř.
chgrp -R _your Jméno uživatele_ apache-tomcat-_10.0.0.23_
            * Změnit oprávnění tak, aby Tomcat a skupina četli, psali, prováděli práva, např.
Chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Odstranit "ostatní" uživatelská oprávnění ke čtení, zápisu nebo spuštění:
Chmod -R o-rwx apache-tomcat-_10.0.23_
To je důležité, protože to brání ostatním uživatelům číst možná citlivé informace vERDDAP™nastavit soubory.
            
              
### paměť{#memory} 
* Nastavit proměnné prostředí Tomcat
    
Na Linuxu a Macu:
Vytvořit soubor _tomcat_/bin/setenv.sh (nebo v Red Hat Enterprise Linux\\[RHEL\\], edit ~tomcat/conf/tomcat10.conf) nastavit Tomcatovy proměnné prostředí. Tento soubor bude použit pomocí _tomcat_/bin/startup.sh a vypnutí.sh. Soubor by měl obsahovat něco jako:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (ale nahradit názvy adresářů z počítače) .
 (Pokud jste předtím nastavili JRE\\_HOME, můžete to odstranit.)   
Na Macs asi nepotřebujete nastavit JAVA\\_HOME.

Na Windows:
Vytvořit soubor _tomcat_\\bin\\setenv.bat pro nastavení proměnných prostředí Tomcat. Tento soubor bude použit _tomcat_\\bin\\ startup.bat ashutdown.bat. Soubor by měl obsahovat něco jako:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (ale nahradit názvy adresářů z počítače) .
Pokud je to jen pro místní testování, odstraňte "-server."
 (Pokud jste předtím nastavili JRE\\_HOME, můžete to odstranit.) 

Nastavení paměti -Xmx a -Xms jsou důležité, protožeERDDAP™lépe funguje s více paměti. Vždy nastavte -Xms na stejnou hodnotu jako -Xmx.

* Pro 32 bitové operační systémy a 32 bitůJava:
64 bitůJavaje mnohem lepší než 32 bitůJava, ale 32 bitůJavabude fungovat tak dlouho, dokud nebude server zaneprázdněn. Čím více fyzické paměti na serveru, tím lépe: 4+ GB je opravdu dobré, 2 GB je v pořádku, méně se nedoporučuje. S 32 bityJava, i s bohatou fyzickou pamětí, Tomcat aJavanebude běžet, pokud se pokusíte nastavit -Xmx mnohem nad 1500M (1200M na některých počítačích) . Pokud má váš server méně než 2GB paměti, snižte hodnotu -Xmx (v 'M'egaBytech) na 1/2 fyzické paměti počítače.
* Pro 64 bitů operačních systémů a 64 bitůJava:
64 bitůJavabude fungovat pouze na 64 bitovém operačním systému.
    
    * SJava8, musíte přidat \\-d64 do parametru Tomcat CATALINA\\_OPTS v setenv.bat
    * SJava21, vyberete 64 bitů.Javapři stažení verzeJavaoznačené "64 bit."
    
Se 64 bityJava, Tomcat aJavamůže použít velmi vysoké -Xmx a -Xms nastavení. Čím více fyzické paměti na serveru, tím lépe. Jako zjednodušený návrh: doporučujeme nastavit -Xmx a -Xms na (v 'M'egaBytech) až 1/2 (nebo méně) fyzické paměti počítače. Uvidíš, jestli Tomcat,JavaaERDDAP™jsou skutečně běží v 64 bitovém režimu hledáním " bit," vERDDAP's Daily Report email nebo v _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)soubor (_bigParentDirectory_ je uvedeno v[setup.xml](#setupxml)) .
#### Sběr odpadků{#garbage-collection} 
* InERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)soubor, uvidíte mnoho "GC (Selhání přidělení) "zprávy.
Tohle obvykle není problém. Je to častou zprávou od normálně fungujícíhoJavaŘíkala, že právě dokončila malou sbírku odpadků, protože v Edenu došla místnost. (částJavahromada pro velmi mladé předměty) . Obvykle zpráva ukazuje _paměťUseBefore_\\-&gt;_paměťUseAfter_. Pokud jsou ta dvě čísla blízko sebe, znamená to, že odpadky nebyly produktivní. Zpráva je jen známkou problémů, pokud je velmi časté (každých pár sekund) , není produktivní, a čísla jsou velké a nerostou, které společně naznačují, žeJavapotřebuje více paměti, snaží se uvolnit paměť a nemůže uvolnit paměť. To se může stát během stresující doby a pak odejít. Ale pokud bude pokračovat, je to známka problémů.
* Pokud uvidíte java.lang.OutOfMemoryError's inERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)soubor, viz[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)pro tipy, jak diagnostikovat a řešit problémy.
         
### Povolení{#permissions} 
*   [Na Linux a Macs, změnit oprávnění](#permissions)ze všech\\*.shsoubory v _tomcat_/bin/ které mají být spustitelné majitelem, např.
```
    chmod +x \\*.sh  
```
### Písma{#fonts} 
*   [Písma pro obrázky:](#fonts)Rozhodně dáváme přednost svobodným.[DejaVu písma](https://dejavu-fonts.github.io/)na druhouJavapísma. Používání těchto písem se důrazně doporučuje, ale nevyžaduje se.
    
Pokud se rozhodnete nepoužívat písma DejaVu, musíte změnit písmoFamily nastavení v setup.xml na&lt;FontRodina&gt;SansSerif&lt;/fontRodina&gt; který je k dispozici se všemiJavadistribuce. Pokud nastavíte fontFamily na název písma, který není k dispozici,ERDDAP™nebude načítat a vytiskne seznam dostupných písem v log.txt souboru. Musíte použít jedno z těch písm.
    
Pokud se rozhodnete použít písma DejaVu, ujistěte se, že písmoFamily nastavení v setup.xml je&lt;písmo DejaVu Sans&lt;/FontRodina&gt;.
    
Pro instalaci písem DejaVu si stáhněte[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) a rozepnout soubory s písmem do dočasného adresáře.
    
    * Na Linuxu:
        * Pro Linux AdoptiumJavadistribuce, viz[Tyto pokyny](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * OstatníJavadistribuce: Jako uživatel Tomcat zkopírujte soubory písma do _JAVA\\_HOME_/lib/fonts soJavamůže najít písma. Pamatujte: pokud/když později upgrade na novější verziJava, musíte reinstalovat tato písma.
    * Na Macs: pro každý soubor s písmem dvakrát klikněte na něj a pak klikněte na Install Font.
    * Na Windows 7 a 10: ve Windows Exploreru vyberte všechny soubory písma. Pravým tlačítkem. Klikněte na Install.
             
### Test Tomcat{#test-tomcat} 
* Otestujte si instalaci Tomcat.
    * Linux:
        * Jako uživatel "tomcat" spusťte _tomcat_/bin/startup.sh
        * Zobrazit své URL + ":8080/" ve svém prohlížeči (např.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Měli byste vidět stránku Tomcat "Gratulujeme."
V případě problémů se podívejte do souboru Tomcat log _tomcat_/logs/catalina.out.
    * Mac (spustit tomcat jako uživatel správce systému) :
        * Spustit _tomcat_/bin/startup.sh
        * Zobrazit své URL + ":8080/" ve svém prohlížeči (např.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Všimněte si, že ve výchozím nastavení je váš Tomcat přístupný pouze vámi. Není veřejně přístupná.
        * Měli byste vidět stránku Tomcat "Gratulujeme."
V případě problémů se podívejte do souboru Tomcat log _tomcat_/logs/catalina.out.
    * Localhost Windows:
        
        * Klikněte pravým tlačítkem na ikonu Tomcat v systémové podnose a vyberte "Spustit službu."
        * Pohled[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)nebo snad[ http://localhost:8080/ ](http://localhost:8080/)Ve vašem prohlížeči. Všimněte si, že ve výchozím nastavení je váš Tomcat přístupný pouze vámi. Není veřejně přístupná.
        * Měli byste vidět stránku Tomcat "Gratulujeme."
V případě problémů se podívejte do souboru Tomcat log _tomcat_/logs/catalina.out.
            
### Problémy s instalací Tomcat?{#troubles-with-the-tomcat-installation} 
* Na Linux a Mac, pokud nemůžete dosáhnout Tomcat neboERDDAP™  (nebo se k nim možná nedostanete z počítače mimo váš firewall.) , můžete otestovat, zda Tomcat poslouchá port 8080, psaním (jako kořen) na příkazovém řádku serveru:
```  
    netstat -tuplen | grep 8080  
```
To by mělo vrátit jeden řádek s něčím jako:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (kde '#' je nějaká číslice) , což naznačuje, že proces "java" (pravděpodobně Tomcat) poslouchá v přístavu "8080" pro "tcp" provoz. Pokud nebyly vráceny žádné linky, pokud se řádek výrazně liší, nebo pokud byly vráceny dvě nebo více řádků, pak může být problém s nastavením portu.
* Viz soubor protokolu Tomcat _tomcat_/logs/catalina.out. Tomcat problémy a některéERDDAP™startup problémy jsou téměř vždy uvedeny tam. To je běžné, když jste poprvé nastaveníERDDAP™.
* Viz[Tomcat](https://tomcat.apache.org/)webové stránky nebo hledat web o pomoc, ale prosím dejte nám vědět problémy, které jste měli a řešení jste našli.
* Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).
             
### ERDDAP™Obsah{#erddap-content} 
3.  [Připravit_tomcat_/content/erddapKonfigurační soubory.](#erddap-content)  
Na Linux, Mac a Windows, stáhnout[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (verze 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, dat. 2024-10-14) a rozbalit do _tomcat_, vytváření_tomcat_/content/erddap.

    \\[Některé předchozí verze jsou také k dispozici:
    [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, dat. 2022-02-16)   
    [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, dat. 2022-02-16)   
    [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191,EE6868C40B9A29362, dat. 2022-10-09)   
    [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, dat. 2022-12-08) 
    [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191,EE6868C40B9A29362, dat. 2023-02-27) 
a rozbalit do _tomcat_, vytváření_tomcat_/content/erddap.\\]
    
#### Další adresář{#other-directory} 
Pro Red Hat Enterprise Linux (RHEL) nebo pro jiné situace, kdy není dovoleno upravit adresář Tomcat nebo kde chcete/potřebujeteERDDAP™adresář obsahu v jiném místě z nějakého jiného důvodu (například, pokud používáte Jetty místo Tomcat) , unzip erddapContent.zipdo požadovaného adresáře (ke kterému má přístup pouze uživatel=tomcat) a nastaviterddapContentDirectoryvlastnost systému (např.erddapContentDirectory=~tomcat/content/erddap) takERDDAP™může najít tento nový adresář obsahu.
    
### setup.xml{#setupxml} 
*   [Přečti si komentáře_tomcat_/content/erddap/ **setup.xml** ](#setupxml)a provést požadované změny. setup.xml je soubor se všemi nastaveními, které určují, jakERDDAP™Chová se slušně.
Pro počáteční nastavení musíte alespoň změnit tato nastavení:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Když vytvoříte velký Rodič Directory, z rodičovského adresáře bigParentDirectory:
    
    * Udělat user=tomcat majitelem bigParentDirectory, např.,
```
        chown -R tomcat _bigParentDirectory_
```
    * Změňte "skupina" být tomcat, vaše uživatelské jméno, nebo název malé skupiny, která zahrnuje tomcat a všechny správce Tomcat/ERDDAPnapř.
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Změnit oprávnění tak, aby Tomcat a skupina četli, psali, prováděli práva, např.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Odstraňte "jiné" uživatelské oprávnění ke čtení, zápisu nebo spuštění. To je důležité, aby se zabránilo čtení potenciálně citlivé informace vERDDAP™log soubory a soubory s informacemi o soukromých datových souborech.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Proměnné prostředí{#environment-variables} 
Začneme sERDDAP™v2.13,ERDDAP™Správci mohou přepsat jakoukoliv hodnotu v setup.xml zadáním proměnné prostředí s názvemERDDAP\\__ hodnotaNázev_ před spuštěnímERDDAP™. Například použitíERDDAP\\_baseUrl ovládá&lt;Hodnota. To může být užitečné při nasazeníERDDAP™s kontejnerem jako je Docker, jak můžete dát standardní nastavení do setup.xml a pak dodat speciální nastavení přes proměnné prostředí. Pokud poskytnete tajné informaceERDDAP™prostřednictvím této metody se ujistěte, že informace zůstanou tajné.ERDDAP™Pouze čte proměnné prostředí jednou za spuštění, v první sekundě startu, takže jedním ze způsobů, jak použít toto je: nastavit proměnné prostředí, spustitERDDAPPočkej.ERDDAP™je spuštěn, pak odnastavit proměnné prostředí.
    
### datasets.xml {#datasetsxml} 
* Přečti si komentáře[ **Práce sdatasets.xmlSoubor** ](/docs/server-admin/datasets). Později, až se dostanešERDDAP™poprvé běží (obvykle pouze s výchozími soubory dat) , budete modifikovat XML v_tomcat_/content/erddap/ **datasets.xml** k určení všech souborů dat, které chceteERDDAP™sloužit. Tady budete trávit většinu času při přípravěERDDAP™a později při zachováníERDDAP™.

Můžete vidět příklad[datasets.xmlna GitHubu](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Nepravděpodobné) Teď nebo (o něco pravděpodobnější) v budoucnu, pokud chcete změnit soubor Erddap CSS, udělejte kopii_tomcat_/content/erddap/images/erddapStart2.css volal erddap2.css a pak provést změny. Změny erddap2.cs nabývají účinku pouze tehdy, pokudERDDAP™je restartován a často také vyžaduje, aby uživatel vymazal cachované soubory prohlížeče.
     
ERDDAP™nefunguje správně, pokud nastavení.xml nebodatasets.xmlsoubor není dobře vytvořený XML soubor. Takže po editaci těchto souborů je dobrý nápad ověřit, že výsledek je dobře vytvořený XML vložením XML textu do XML checkeru jako[xmlvalidace](https://www.xmlvalidation.com/).
     
### Nainstalovat soubor erddap.war{#install-the-erddapwar-file} 
4. Na Linux, Mac a Windows, stáhnout[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)do _tomcat_/webaps .
     (verze 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, dated 06-11-2025) 
    
Soubor .war je velký, protože obsahuje pobřeží s vysokým rozlišením, hranice a nadmořské výšky potřebné k vytvoření map.
    
    \\[Některé předchozí verze jsou také k dispozici.
    [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, dat. 2022-02-16)   
    [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, dat. 2022-02-23)   
    [2. 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDB519B6, dat. 2022-10-09)   
    [2. 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, dat. 2022-12-08) 
    [2. 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, dat. 2023-03-03) 
    [2. 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dat.2024-06-07e) 
    [2. 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datováno 2024-11-07) 
    [2. 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, dat. 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Použít Proxy Pass tak uživatelé nemusí dát číslo portu, např.:80800, do URL.
Na Linuxových počítačích, pokud Tomcat běží v Apači, upravte prosím Apačehttpd.conf soubor (obvykle v /etc/httpd/conf/) povolit provoz HTTP do/zERDDAP™bez požadavku na číslo portu, např.:80800, v URL. Jako uživatel kořene:
    1. Upravit existující&lt;VirtualHost&gt; tag (pokud nějaký existuje) , nebo přidat jeden na konci souboru:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Poté restartujte Apache: /usr/sbin/apachectl - K elegantní. (ale někdy je v jiném adresáři) .
         
### NGINX{#nginx} 
 (UNCOMMON) Jestliže užíváte[NGINX](https://www.nginx.com/)  (webový server a vyvažovač zatížení) :
za účelem získání NGINX aERDDAP™správně pracovat shttps, musíte dát následující úryvek do Tomcat server.xml&lt;Hostitel, blok:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
A v konfiguračním souboru musíš nastavit tyto hlavičky:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Díky Kyleu Wilcoxovi.)   
     
### Spustit Tomcat{#start-tomcat} 
*    (Nedoporučuji používat Tomcat Web Application Manager. Pokud úplně nevypnete a nespustíte Tomcat, dříve nebo později budete mít problémy s permGen pamětí.)   
     
*    (V Linuxu nebo Mac OS, pokud jste vytvořili speciálního uživatele ke spuštění Tomcat, např. Tomcat, nezapomeňte udělat následující kroky jako tento uživatel.)   
     
* Pokud Tomcat už běží, zavřete Tomcat s (v Linuxu nebo Mac OS) Tomcat_/bin/shutdown.sh
nebo (ve Windows) _tomcat_\\bin\\shutdown.bat
    
Na Linuxu použijte ps-ef|grep tomcat před a po vypnutí.sh, aby se ujistil, že tomcat proces se zastavil. Proces by měl být uveden před vypnutím a po vypnutí by nakonec nebyl uveden. To může trvat minutu nebo dvě proERDDAP™úplně vypnuto. Buď trpělivý. Nebo pokud to vypadá, že to sám nezastaví, použijte:
kill -9 _processID_
    
* Začněte s Tomcat (v Linuxu nebo Mac OS) Tomcat_/bin/startup.sh
nebo (ve Windows) _tomcat_\\bin\\startup.bat

## JeERDDAP™Běhat?{#is-erddap-running} 
Pro zobrazení použijte prohlížeč http://_www.YourServer.org_/erddap/status.html   
ERDDAP™Začíná bez načtení dat. Datasety jsou načteny v podkladovém vlákně, takže jsou dostupné jedno po druhém.

### Řešení problémů{#troubleshooting} 
* Když přijde žádost uživatele, jde do Apache (na počítačích Linux a Mac OS) , pak Tomcat, pakERDDAP™.
* Můžete vidět, co přijde do Apače (a související chyby) v záznamech Apache.
*   [Ty.](/docs/server-admin/additional-information#tomcat-logs)může vidět, co přijde na Tomcat (a související chyby) v souborech protokolu Tomcat (_tomcat_/logs/catalina.out a další soubory v tomto adresáři) .
*   [Ty.](/docs/server-admin/additional-information#log)může vidět, co přijde naERDDAP, diagnostické zprávy zERDDAP, a chybové zprávy zERDDAP, vERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt soubor.
* Tomcat nezačíná.ERDDAP™dokud Tomcat nedostane žádost oERDDAP™. Takže můžete vidět v záznamech Tomcat, pokud to začaloERDDAP™nebo pokud existuje chybová zpráva související s tímto pokusem.
* Kdy?ERDDAP™Začíná to, přejmenovává staréERDDAP™log.txt soubor (logArchivedAt_CurrentTime_.txt) a vytvoří nový log.txt soubor. Takže pokud je to deník. Txt soubor je starý, je to znamení, žeERDDAP™Ještě se nevrátil.ERDDAP™píše log info do bufferu a pouze pravidelně píše buffer do log souboru, ale můžete vynutitERDDAP™napsat buffer do souboru protokolu návštěvou .../erddap/status.html.

### Problém: Stará verzeJava {#trouble-old-version-of-java} 
Pokud používáte verziJavaTo je příliš staré naERDDAP,ERDDAP™nebude běžet a uvidíte chybovou zprávu v Tomcat je log souboru jako
Výjimku ve vlákně "main" java.lang.UnsupportedClassVersionError:
_některé/třída/jméno_: Nepodporovaná major.mourn version _someNumber_
Řešením je aktualizovat na nejnovější verziJavaA ujisti se, že ji Tomcat používá.

### Problém: Pomalé spuštění poprvé{#trouble-slow-startup-first-time} 
Tomcat musí udělat hodně práce, když poprvé aplikace jakoERDDAP™je zahájena; zejména musí vybalit erddap. válečný soubor (což je jako.zipsoubor) . Na některých serverech, první pokus o zobrazeníERDDAP™stánky (30 sekund?) Dokud ta práce neskončí. Na jiných serverech první pokus okamžitě selže. Ale když počkáte 30 sekund a zkusíte to znovu, uspěje to, pokudERDDAP™byla nainstalována správně.
Na tohle není řešení. Takhle prostě Tomcat pracuje. Ale to nastane pouze poprvé poté, co nainstalujete novou verziERDDAP™.

## Vypnout a restartovat{#shut-down-and-restart} 
V budoucnosti, zavřít (a restartovat)  ERDDAP, viz[Jak vypnout a znovu nastartovat Tomcat aERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Problémy?{#trouble} 
Potíže s instalací Tomcat neboERDDAP? Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).
## E-mailové oznámení nových verzíERDDAP {#email-notification-of-new-versions-of-erddap} 
Pokud chcete dostávat e-mail, kdykoli nová verzeERDDAP™je k dispozici nebo jiné důležitéERDDAP™Oznámení, můžete se připojit kERDDAP™seznam oznámení[Tady.](https://groups.google.com/g/erddap-announce). Tento seznam má průměr zhruba jeden e-mail každé tři měsíce.
## Přizpůsobit{#customize} 
[Přizpůsobte si svůjERDDAP™zvýraznit vaši organizaci (neNOAA ERD) .](#customize)
    * Změňte banner, který se objeví nahořeERDDAP™.html stránky editací&lt;startBodyHtml5&gt; značka ve vašemdatasets.xmlSložka. (Pokud žádný není, zkopírujte výchozí zERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml soubor dodatasets.xmla upravit.) Například byste mohli:
        * Použít jiný obrázek (tj. logo vaší organizace) .
        * Změňte barvu pozadí.
        * Změna "ERDDAP"na "_VašeOrganizace_ERDDAP"
        * Změňte "jednodušší přístup k vědeckým datům" na "jednodušší přístup k datům _YourOrganization_."
        * Změňte odkazy "Přivedl k vám" na odkazy na vaši organizaci a zdroje financování.
    * Změnit informace na levé straně domovské stránky editací&lt;ShortDescriptionHtml&gt; značka ve vašemdatasets.xmlSložka. (Pokud žádný není, zkopírujte výchozí zERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml soubor dodatasets.xmla upravit.) Například byste mohli:
        * Popište, co vaše organizace a/nebo skupina dělá.
        * Popište jaká data to jsou.ERDDAP™Ano.
    * Chcete-li změnit ikonu, která se objeví na záložce prohlížeče, vložte do vaší organizace favicon. ico in_tomcat_/content/erddap/images/ . Viz[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
