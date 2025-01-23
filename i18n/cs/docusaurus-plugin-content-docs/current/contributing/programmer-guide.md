---
sidebar_position: 2
---

# Průvodce programátorem

To jsou věci, se kterými chce pracovat jen programátor.ERDDAP'sJavaHodiny to musí vědět.

###  **Získání zdrojového kódu**  {#getting-the-source-code} 
   

  - Přes zdrojový kód na GitHubu
Zdrojový kód pro nedávné veřejné verze a vývojové verze je také k dispozici prostřednictvím[GitHub](https://github.com/ERDDAP). Prosím, přečtěte si[Wiki](https://github.com/ERDDAP/erddap/wiki)na ten projekt. Pokud chcete změnit zdrojový kód (a případně mít změny začleněny do normyERDDAP™distribuce) Toto je doporučený přístup.

###  **ERDDAP™závislosti**  {#erddap-dependencies} 
ERDDAP™používá Maven k načtení závislosti na kódu, stejně jako některé statické referenční soubory (WEB-INF/ref) . To se dělá, aby se zabránilo ukládání mnoha velkých souborů do úložiště.
Můžete použít kompilační soubory a to přinese závislost a ref soubory. K vytvoření válečného souboru můžete také použít balíček 
Ref soubory si můžete ručně stáhnout:

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)a rozepni ji do /WEB-INF/ref/ .

  - [ref\\_ files.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)a rozepni ji do /WEB-INF/ref/ .

  - [erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (verze 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, dat. 2024-10-14) a rozbalit do _tomcat_, vytváření_tomcat_/content/erddap.

POZNÁMKA: Maven bude ve výchozím nastavení cache static reference a test data archiv ke stažení a extrahovat je pouze při stažení nové verze. Chcete-li přeskočit stahování zcela, můžete nastavit SkipResourceStáhněte si&#33;Stáhnout a/nebo &#33;skipTestResourceStáhnout vlastnosti do Maven (např. DskipResourceStáhnout balíček ?) . Chcete-li vynutit extrakci, nastavte na &ndash; download.unpack=true[a] a &gt; Download.unpackWhenChanged=false[a].

- ERDDAP™a jeho podkomponenty mají velmi liberální, otevřený zdroj[licence](/license), takže můžete použít a upravit zdrojový kód pro jakýkoli účel, pro zisk nebo neziskový. Všimněte si, žeERDDAP™a mnoho dílčích složek má licence, které vyžadují, abyste uznali zdroj kódu, který používáte. Viz[Kredity](/credits). Ať už je to nutné nebo ne, je to jen dobrá forma uznání všech těchto přispěvatelů.
  

-  **Použít kód pro jiné projekty** 

Zatímco jste vítáni používat částiERDDAP™kód pro jiné projekty, varovat, že kód může a bude měnit. Neslibujeme, že budeme podporovat jiné využití našeho kódu. Git a GitHub budou vaše hlavní řešení -- Git vám umožní sloučit naše změny do vašich změn.
   **V mnoha situacích, kde byste mohli být v pokušení použít částiERDDAP™ve vašem projektu si myslíme, že pro vás bude mnohem jednodušší instalovat a používatERDDAP™jak je,** a pak psát další služby, které používajíERDDAPSlužby. Můžeš si zařídit vlastní.ERDDAP™instalace hrubá za hodinu nebo dvě. Můžeš si zařídit vlastní.ERDDAP™instalace v leštěném způsobem během několika dnů (v závislosti na počtu a složitosti vašich souborů dat) . Ale hackování částíERDDAP™pro váš vlastní projekt bude pravděpodobně trvat týdny (a měsíce chytat jemnosti) a ztratíte schopnost začlenit změny a opravy chyb z následnéERDDAP™Uvolnit. My (Samozřejmě.) Myslím, že je mnoho výhod pro použitíERDDAP™jak je a dělá vašeERDDAP™veřejně přístupná instalace. Nicméně, za určitých okolností, nemusíte chtít, aby vašeERDDAP™veřejně přístupná instalace. Pak, vaše služby mohou přístup a používat své soukroméERDDAP™a vaši klienti nemusí vědět oERDDAP™.

  ####  **V půli cesty.** 

Nebo je tu jiný přístup, který vám může být užitečný, který je v polovině cesty mezi ponořováním doERDDAP's kódem a použitímERDDAP™jako samostatná internetová služba: Ve třídě EDD existuje statická metoda, která umožňuje vytvořit instanci datového souboru (na základě specifikace vdatasets.xml) :
OneFromDataset Xml (String tDatasetID) 
Vrací instanci EDDTable neboEDDGridSoubor dat. Vzhledem k tomuto případě, můžete zavolat\\
MakeNewFileForDapQuery (String userDapQuery, String dir, String fileName, String file Název typu) 
Abyste mohli instanci sdělit, že chcete vytvořit datový soubor, konkrétní souborType, s výsledky uživatelského dotazu. To je tedy jednoduchý způsob použití.ERDDAP's metodami, jak požadovat data a získat soubor v reakci, stejně jako klient by použítERDDAP™webová aplikace. Ale tento přístup funguje v rámciJavaprogram a obchází potřebu aplikace serveru, jako je Tomcat. Používáme tento přístup pro mnoho jednotkových testů EDDTable aEDDGridPodtřídy, takže můžete vidět příklady tohoto ve zdrojovém kódu pro všechny tyto třídy.

###  **Rozvojové prostředí**  {#development-environment} 

  - Existují konfigurace pro[Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty)a[Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker)v GitHubu, i když se očekává, že se uvolní v Tomcat.

  -  **Nepovinné** : PřipravitERDDAP™v Tomcat\\
OdERDDAP™je určen především jako servírku běžící v Tomcatu, důrazně doporučujeme dodržovat standard[Návod k instalaci](/docs/server-admin/deploy-install)nainstalovat Tomcat a pak nainstalovatERDDAP™v Tomcatově adresáři. Mimo jiné,ERDDAP™byl navržen tak, aby byl nainstalován v adresářové struktuře Tomcat a očekává, že Tomcat poskytne některé .jar soubory.

  - ERDDAP™nevyžaduje konkrétní IDE (Chris používá především Visual Studio Code, Bob použil EditPlus) . My nepoužíváme Eclipse, Ant, atd.; ani nenabízímeERDDAP- s nimi související podpora. Projekt využívá Maven.

  - Používáme dávkový soubor, který smaže všechny soubory .class ve zdrojovém stromu, abychom zajistili, že budeme mít čistý překlad (s javacem) .

  - V současné době používáme Adoptium javac jdk-21.0.3+9 pro sestavení gov.noaa.pfeg.coastwatch.TestAll (má vazby na několik tříd, které by jinak nebyly sestaveny.) a proveďte testy. Z bezpečnostních důvodů je téměř vždy nejlepší použít nejnovější verzeJava21 a Tomcat 10.

    - Při spuštění javac nebo java, aktuální adresář je _tomcat_/webapps/erddap/WEB-INF .

    - Náš Javac a Java třída path je
Classes;../../../lib/servlet-api.jar;lib/**

    - Takže vaše příkazová linka Javac bude něco jako\\
UTF-8 - třída Cp;../../../lib/servlet-api.jar;lib/* třídy/gov/noaa/pfel/pobřežní hlídka/TestAll.java [*]

    - A váš příkaz Java bude něco jako\\
C. třídy/gov/noaa/pfel/pobřežní hlídka/testVšechny
Volitelné: můžete přidat Javak tisku statistiky sběru odpadu.

    - Při zkoušce Všechny kompilace, všechnoERDDAP™potřeby byly sestaveny. Několik tříd je sestaveno, které nejsou potřebné proERDDAP™. Pokud kompilace TestAll uspěje, ale nesloží nějakou třídu, tato třída není nutná. (Jsou tu nedokončené nebo nepoužité hodiny.) 

  - V několika případech používáme zdrojový kód třetí strany místo .jar souborů (zejména proDODS) a mírně je upravil, aby se zabránilo problémům s kompilací sJava21. Často jsme dělali jiné drobné úpravy (zejménaDODS) z jiných důvodů.

  - Většina tříd má zkušební metody ve svém přidruženém souboru src/test. Testy JUnit můžete provést příkazem JUnit. To bude stahovat několik zip souborů dat, které testy spoléhají na nejnovější vydání[ERDDAP/erddap Zkouška](https://github.com/ERDDAP/erddapTest/releases/).\\
     
POZNÁMKA: Maven cache stahuje, ale rozepne stažené archivy na každé provedení, což zabere čas. Přeskočit stahování
a odipování testovacích datových archivů, můžete zadat &gt; SkipTestResourceStáhněte si majetek Maven (např. DskipTestResourceStáhnout balíček ?) .

###   **Důležité třídy**  {#important-classes} 

Pokud se chcete podívat na zdrojový kód a pokusit se přijít na to, jakERDDAP™Funguje to, prosím.

  - Kód máJavaDoc komentuje, aleJavaDoktoři nebyli generováni. Klidně je vygeneruj.

  - Nejdůležitější třídy (včetně níže uvedených) jsou v rámci gov/noaa/pfel/erddap.

  - TheERDDAP™třída má nejvyšší úroveň metod. Rozšíří HttpServlet.

  - ERDDAP™předává žádosti na případy podtřídEDDGridnebo EDDTable, které představují jednotlivé soubory údajů.

  - ED Static má většinu statických informací a nastavení (např. ze souborů setup.xml a zpráv.xml) a nabízí statické služby (např. zasílání e-mailů) .

  - EDDGrida EDDTable podtřídí analýzu žádosti, získá data z podtřídních specifických metod, pak formátovat data pro odpověď.

  - EDDGridpodtřídy tlačí data do GridDataPříslušenství (vnitřní datový kontejner pro mřížkované údaje) .

  - Podtřídy EDDTable tlačí data do podtříd TableWriter, které zapisují data do konkrétního typu souboru při letu.

  - Ostatní třídy (např. třídy nízké úrovně) jsou také důležité, ale je méně pravděpodobné, že budete pracovat na jejich změně.
     

###  **Kód Příspěvky**  {#code-contributions} 

- GitHub problémy
Pokud byste chtěli přispět, ale nemají projekt, viz seznam[GitHub problémy](https://github.com/ERDDAP/erddap/issues), z nichž mnohé jsou projekty, které byste mohli přijmout. Pokud byste chtěli pracovat na nějakém problému, prosím, přiřaďte si jej sami, abyste ukázali ostatním, že na něm pracujete. Otázka GitHub je nejlepším místem pro diskusi o jakýchkoli otázkách, jak postupovat s prací na této otázce.

- Pokud změna, kterou chcete provést, je jedním z níže uvedených společných případů, prosím vytvořte[GitHub vydání](https://github.com/ERDDAP/erddap/issues)Což naznačuje změnu, kterou hodláte udělat. Jakmile bude změna dokončena, požádejte o sloučení. Mezi společné změny patří:

  - Chcete napsat další podtříduEDDGridnebo EDDTable pro zpracování jiného typu zdroje dat. Pokud ano, doporučujeme najít nejbližší existující podtřída a použít tento kód jako výchozí bod.

  - Chcete napsat další metodu saveAs_FileType_. Pokud ano, doporučujeme, abyste našli nejbližší existující metodu saveAs_FileType_EDDGridnebo EDDTable a použít tento kód jako výchozí bod.

Tyto situace mají výhodu, že kód, který píšete, je soběstačný. Nemusíte znát všechny detailyERDDAPJe to vnitřní. A bude pro nás snadné začlenit váš kód doERDDAP. Všimněte si, že pokud odešlete kód, licence bude potřebovat kompatibilní sERDDAP™ [licence](/license)  (např.[Apač](https://www.apache.org/licenses/),[BSD](https://www.opensource.org/licenses/bsd-license.php)nebo[MIT- X](https://www.opensource.org/licenses/mit-license.php)) . Vypíšeme váš příspěvek[Úvěry](/credits).

- Pokud máte funkci, která není zahrnuta výše, že byste chtěli přidat kERDDAP, doporučuje se nejprve vytvořit diskusní vlákno v[GitHub Diskuse](https://github.com/ERDDAP/erddap/discussions/categories/ideas). Pro významné prvky/změny bude technická rada diskutovat o nich a rozhodnout, zda schválí její zařazení doERDDAP™.

###  **Soudě podle vašeho kódu příspěvky**  {#judging-your-code-contributions} 
Pokud chcete předložit kód nebo jiné změny, které mají být zahrnuty doERDDAPTo je skvělé. Váš příspěvek musí splňovat určitá kritéria, aby byl přijat. Pokud budete postupovat podle níže uvedených pokynů, výrazně zvýšíte šance na přijetí vašeho příspěvku.
   

  - TheERDDAP™projekt řídí NATD (NOAAJmenovaný technický ředitel) se vstupem z technického výboru.
Od roku 2007 (začátekERDDAP) přes 2022 to byl Bob Simons. (rovněž vedoucí postavení zakladatele) . Od ledna 2023 je to Chris John. V podstatě, NATD je zodpovědný zaERDDAPTakže má poslední slovo o rozhodnutíchERDDAP™kód, zejména o návrhu a zda bude daná žádost o tah přijata, či nikoli. Musí to tak být částečně z důvodů účinnosti. (funguje skvěle pro Linus Torvalds a Linux) a částečně z bezpečnostních důvodů: Někdo musí říct lidem z IT bezpečnosti, že přebírá odpovědnost za bezpečnost a integritu kodexu.
     

  - NATD nezaručuje, že přijme váš kód.
Pokud projekt nevyjde tak dobře, jak jsme doufali, a pokud ho nelze zachránit, NATD nebude zahrnovat projekt doERDDAP™distribuce. Prosím, necítím se špatně. Někdy projekty nevyjdou tak dobře, jak doufali. Stává se to všem vývojářům softwaru. Pokud budete postupovat podle níže uvedených pokynů, výrazně zvýšit své šance na úspěch.
     

  - Nejlepší je, když jsou změny obecného zájmu a užitečnosti.
Pokud je kód specifický pro vaši organizaci, je pravděpodobně nejlepší udržovat oddělenou pobočkuERDDAP™pro vaše použití. Axiom tohle dělá. Naštěstí to Git dělá snadné. NATD chce zachovat konzistentní vizi proERDDAP, nedovolit, aby se stal kuchyňský dřez projekt, kde každý přidává vlastní funkce pro svůj projekt.
     

  - NásledujteJavaKonvence kodexu.
Obecně by měl být váš kód kvalitní a měl by se řídit originálem.[JavaÚmluva o kodexu](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): dát .class soubory na správné místo v adresářové struktuře, dát .class soubory vhodné jméno, včetně správnéJavaDoc připomínky, zahrnují //komentáře na začátku každého odstavce kódu, odrážka se 4 prostory (není záložka) , vyhnout se řádkám &gt; 80 znaků atd. Konvence se mění a zdrojový kód není vždy plně aktuální. Když máte pochybnosti, připojte kód k úmluvám a ne k existujícímu kódu.

- Použijte popisnou třídu, metodu a názvy proměnných.
To dělá kód jednodušší pro ostatní číst.
   

- Vyhněte se nóbl kódu.
Z dlouhodobého hlediska budete muset přijít na kód, abyste ho udrželi. Takže prosím použijte jednoduché kódovací metody, které jsou tak jednodušší pro ostatní (včetně tebe v budoucnosti) přijít na to. Očividně, pokud existuje skutečná výhoda k použití nějaké fantazieJavaprogramovací funkce, používat, ale rozsáhle dokumentovat, co jste udělali, proč a jak to funguje.
   

- Pracujte s technickou radou, než začnete.
Pokud doufáte, že váš kód změníERDDAP™, Technická rada bude určitě chtít mluvit o tom, co budete dělat a jak to uděláte předtím, než provedete změny kódu. Tak se můžeme vyhnout tomu, že uděláš změny, které NATD nakonec nepřijme. Když pracujete, NATD a technická rada jsou ochotni odpovědět na otázky, které vám pomohou zjistit stávající kód a (celkově) Jak se vypořádat s vaším projektem.
   

- Pracovat nezávisle (co nejvíce) Až začneš.
Na rozdíl od výše uvedeného "Pracujte s technickou radou," poté, co začnete na projektu, NATD vás vybízí, abyste pracovali co nejsamostatněji. Pokud vám NATD řekne téměř všechno a odpoví na spoustu otázek (zejména ty, které jste mohli zodpovědět čtením dokumentace nebo kódu) , pak vaše úsilí nejsou úspory času pro NATD a s / on může stejně dobře dělat práci sami. Je to...[Měsíc mýtického muže](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)problém. Samozřejmě bychom měli stále komunikovat. Bylo by skvělé pravidelně vidět vaši práci v průběhu, aby se ujistil, že projekt je na cestě. Ale čím více můžete pracovat nezávisle (poté, co technická rada schválí daný úkol a obecný přístup) , tím lépe.
   

- Vyhněte se broukům.
Pokud chyba není chycena před uvolněním, způsobuje problémy pro uživatele (přinejlepším) , vrací špatné informace (v nejhorším) Je skvrna naERDDAP's pověstí, a bude trvat na zastaraléERDDAP™léta zařízení. Pracovat velmi tvrdě, aby se zabránilo chyby. Součástí toho je zápis čistého kódu. (takže je snazší vidět problémy) . Součástí toho jsou písemné testy. Součástí je stálý přístup vyhýbání se chybám, když píšete kód. Nenuťte NATD litovat přidání vašeho kódu doERDDAP™.
   

- Napište jednotku zkoušky nebo zkoušky.
Pro nový kód byste měli zapsat JUnit testy do testovacího souboru.
Napište prosím alespoň jednu individuální zkušební metodu, která důkladně otestuje kód, který zapíšete, a přidejte jej do zkušebního souboru JUnit třídy tak, aby byl spuštěn automaticky. Jednotka (a související) testy jsou jedním z nejlepších způsobů, jak chytit chyby, zpočátku a v dlouhodobém horizontu (jako jiné věci se měníERDDAP™) . Jak řekl Bob: "Jednotné testy mi umožňují v noci spát."
   

- Aby bylo snadné pro NATD pochopit a přijmout změny ve vašem pull požadavku.
Součástí toho je zápis zkušební metody jednotky (án) . Součástí toho je omezení vašich změn na jednu část kódu. (nebo jedna třída) pokud možno. NATD nepřijme žádnou žádost o tah se stovkami změn v celém kódu. NATD říká lidem z IT bezpečnosti, že přebírá odpovědnost za bezpečnost a integritu kodexu. Je-li příliš mnoho změn nebo jsou příliš těžké zjistit, pak je to jen příliš těžké ověřit změny jsou správné a nezavádějí chyby nebo bezpečnostní problémy.
   

- Je to jednoduché.
Dobrý celkový motiv pro váš kód je: Udržet to jednoduché. Jednoduchý kód je snadný pro ostatní (včetně tebe v budoucnosti) číst a udržovat. Pro NATD je snadné pochopit a přijmout.
   

- Předpokládejme dlouhodobou odpovědnost za váš kód.
Z dlouhodobého hlediska je nejlepší, když převezmete trvalou odpovědnost za udržování svého kódu a odpovídáte na otázky týkající se něj (např. vERDDAP™Skupina Google) . Jak někteří autoři uvádějí, kód je závazek, stejně jako aktivum. Pokud je chyba objevena v budoucnu, je nejlepší, když ji opravíte, protože nikdo nezná váš kód lépe než vy. (také tak, že existuje podnět, aby se zabránilo chyby v první řadě) . NATD nežádá o pevný závazek zajistit trvalou údržbu. NATD jen říká, že provádění údržby bude velmi ocení.
