ERDDAP™- Připrav si vlastníERDDAP™    

## Co potřebujete vědět{#things-you-need-to-know} 
     
###    **[Proxy chyby](#proxy-errors)**  {#proxy-errors} 
Někdy, žádost oERDDAP™vrátí Proxy Chyba, HTTP 502 Chyba Bad Gateway nebo nějakou podobnou chybu. Tyto chyby hodil Apač nebo Tomcat, neERDDAP™sám.
* Pokud každý požadavek generuje tyto chyby, zejména když jste poprvé nastaveníERDDAP™, pak to pravděpodobně je proxy nebo špatná chyba brány, a řešení je pravděpodobně opravit[ERDDAP's nastavením proxy](/docs/server-admin/deploy-install#proxypass). To může být také problém, když zavedenýERDDAP™najednou začne házet tyto chyby pro každou žádost.
* Jinak, "proxy" chyby jsou obvykle ve skutečnosti time out chyby hodil Apache nebo Tomcat. I když se stanou relativně rychle, je to nějaký druh reakce od Apače nebo Tomcat, který nastane, kdyžERDDAP™je velmi zaneprázdněná, omezená pamětí nebo omezena nějakým jiným zdrojem. V těchto případech viz níže uvedené pokyny k řešení[ERDDAP™reagovat pomalu](#responding-slowly).
        
Žádosti o dlouhý rozsah (&gt;30 časových bodů) z roštového souboru jsou náchylné k time-out selhání, které se často jeví jako Proxy chyby, protože to trvá významný čas naERDDAP™otevřít všechny datové soubory jeden po druhém. PokudERDDAP™je jinak zaneprázdněn během žádosti, problém je pravděpodobnější, že nastane. Pokud jsou soubory datového souboru komprimovány, je pravděpodobnější, že k problému dojde, i když je pro uživatele těžké určit, zda jsou soubory datového souboru komprimovány.
Řešením je podat několik žádostí, z nichž každá má menší časový rozsah. Jak malý časový rozsah? Navrhuji začít opravdu malý (-30 bodů?) , pak (přibližně) Zdvojnásobit časový rozsah, dokud požadavek selže, pak se vrátit jeden zdvojnásobení. Pak se všechny žádosti (každý pro jiný kus času) Potřeboval jsem všechna data.
AnERDDAP™Správce může snížit tento problém zvýšením[Nastavení timeout Apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Monitorování{#monitoring} 
Všichni chceme, aby naše datové služby našly své publikum a byly široce využívány, ale někdyERDDAP™mohou být použity příliš mnoho, způsobuje problémy, včetně super pomalé odpovědi na všechny žádosti. Náš plán, jak se vyhnout problémům, je:

* MonitorERDDAP™prostřednictvím[stav.html webová stránka](#status-page).
Má tuny užitečných informací. Pokud vidíte, že sem přichází obrovské množství žádostí, nebo tuny paměti, nebo tuny neúspěšných žádostí, nebo každý Major LoadDatasets trvá dlouhou dobu, nebo uvidíte jakékoliv známky toho, že se věci zamotají a reagují pomalu, pak se podívejte doERDDAP's[log.txt soubor](#log)vidět, co se děje.
    
Je také užitečné si jednoduše všimnout, jak rychle reaguje stavová stránka. Pokud reaguje pomalu, to je důležitý ukazatel, žeERDDAP™je velmi zaneprázdněný.
    
* MonitorERDDAP™prostřednictvím[Denní zpráva](#daily-report)e-mail.
     
* Sledujte zastaralé datové soubory prostřednictvím *baseUrl* /erddap/outOfDateDatasets.htmlwebová stránka, která je založena na volitelné[testOutOfDate](/docs/server-admin/datasets#testoutofdate)globální atribut.
     
#### Externí monitory{#external-monitors} 
Výše uvedené metody jsouERDDAPZpůsoby, jak se monitorovat. Je také možné vytvářet nebo používat externí systémy pro sledováníERDDAP. Jeden projekt je[Projekt erddap-metrics společnosti Axiom](https://github.com/axiom-data-science/erddap-metrics). Tyto vnější systémy mají určité výhody:
* Mohou být přizpůsobeny tak, aby poskytovaly informace, které chcete, zobrazeny tak, jak chcete.
* Mohou obsahovat informace oERDDAP™žeERDDAP™nelze přistupovat snadno nebo vůbec (např. použití procesoru, volné místo na disku,ERDDAP™doba odezvy z pohledu uživatele,ERDDAP™Uptime,
* Mohou poskytovat záznamy (e-maily, telefonní hovory, zprávy) pro správce, když problémy překračují určitou hranici.
             
### Vícečetné souběžné Žádosti{#multiple-simultaneous-requests} 
*    **Blacklist uživatelé dělat více simultánních žádostí&#33;** 
Pokud je jasné, že některý uživatel podává více než jednu simultánní žádost, opakovaně a nepřetržitě, pak přidejte jejich IP adresu kERDDAP's [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) ve Vašemdatasets.xmlSložka. Někdy jsou všechny žádosti z jedné IP adresy. Někdy jsou z více IP adres, ale jasně stejný uživatel. Můžete také černou listinu lidí dělat tuny neplatných žádostí nebo tuny mysl-hloupě neefektivní žádosti.
    
a při každé žádosti své:ERDDAP™vrací:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Doufejme, že uživatel tuto zprávu uvidí a kontaktuje vás, abyste zjistili, jak problém opravit a dostat se z černé listiny. Někdy prostě přepnou IP adresy a zkusí to znovu.
    
Je to jako rovnováha síly mezi útočnými a obrannými zbraněmi ve válce. Tady, obranné zbraně. (ERDDAP) mají pevnou kapacitu omezenou počtem jader v procesoru, šířku pásma přístupu k disku a šířku pásma sítě. Ale útočné zbraně (uživatelé, zejména skripty) mají neomezenou kapacitu:
    
    * Jediná žádost o údaje z mnoha časových bodů může způsobitERDDAPotevřít obrovské množství souborů (v pořadí nebo částečně vícevláknité) . V extrémních případech může jeden "jednoduchý" požadavek snadno spojit RAID připojený kERDDAP™po dobu jedné minuty účinně blokuje vyřizování jiných žádostí.
         
    * Jediná žádost může strávit velkou část paměti (i kdyžERDDAP™je kódován pro minimalizaci paměti potřebné pro zpracování velkých požadavků) .
         
    * Paralelizace -
Je snadné pro chytré uživatele paralelizovat velký úkol generováním spousty nití, z nichž každý podává samostatný požadavek (které mohou být velké nebo malé) . Toto chování podporuje komunita informatiky jako účinný způsob, jak se vypořádat s velkým problémem (a paralelizace je efektivní za jiných okolností) . Vracíme-li se k válečné analogii: uživatelé mohou udělat v podstatě neomezený počet simultánních žádostí s náklady na každou je v podstatě nula, ale náklady na každou žádost přichází doERDDAP™může být velký aERDDAPSchopnost reagovat je konečná. Očividně,ERDDAP™prohraje tuto bitvu, pokudERDDAP™Administrátor blacklists uživatelé, kteří provádějí více simultánních žádostí, které jsou nespravedlivě vytěsnění dalších uživatelů.
         
    * Více skriptů -
Nyní se zamyslete nad tím, co se stane, když existuje několik chytrých uživatelů, každý běží paralelní skripty. Pokud jeden uživatel může generovat tolik požadavků, že ostatní uživatelé jsou vytěsněni, pak více takových uživatelů může generovat tolik požadavků, žeERDDAP™se stává ohromen a zdánlivě nereaguje. Je to efektivní[DDOS útok](https://en.wikipedia.org/wiki/Denial-of-service_attack)Opět, jediná obrana proERDDAP™je na černou listinu uživatelů, kteří podávají více simultánních žádostí, které nespravedlivě vytlačují ostatní uživatele.
         
    * Nafukovací očekávání -
V tomto světě masivních technologických společností (Amazon, Google, Facebook, ...) , uživatelé začali očekávat v podstatě neomezené schopnosti od poskytovatelů. Vzhledem k tomu, že tyto společnosti vydělávají peníze, čím více mají uživatelů, tím více příjmů musí rozšířit svou IT infrastrukturu. Takže si mohou dovolit masivní IT infrastrukturu, aby mohli řešit požadavky. A chytře omezují počet žádostí a nákladů na každou žádost od uživatelů omezením typů žádostí, které mohou uživatelé učinit, aby žádná jediná žádost nebyla zatěžující, a nikdy není žádný důvod, (nebo způsob) pro uživatele, aby podali více simultánních žádostí. Takže tyto obrovské technologické společnosti mohou mít mnohem více uživatelů nežERDDAP™, ale mají mnohem více zdrojů a chytrých způsobů, jak omezit požadavky od každého uživatele. Je to zvládnutelná situace pro velké IT společnosti (a zbohatnou&#33;) ale ne proERDDAP™zařízení. Opět, jediná obrana proERDDAP™je na černou listinu uživatelů, kteří podávají více simultánních žádostí, které nespravedlivě vytlačují ostatní uživatele.
         
    
Takže uživatelé: Nedělejte více žádostí současně nebo budete na černé listině&#33;
     

Očividně je nejlepší, když má váš server spoustu jader, spoustu paměti. (takže můžete přidělit spoustu pamětiERDDAP™, více, než kdy potřebuje) , a vysokou šířku pásma připojení k internetu. Pak je paměť jen zřídka nebo nikdy omezujícím faktorem, ale síťová šířka pásma se stává běžnějším omezujícím faktorem. V podstatě, protože existuje více a více simultánních požadavků, rychlost každého daného uživatele klesá. To přirozeně zpomaluje počet žádostí, které přicházejí, pokud každý uživatel pouze podává jednu žádost najednou.
    
### ERDDAP™Získávání dat z THREDDS{#erddap-getting-data-from-thredds} 
JestližeERDDAP™získá některé z jeho dat z THREDDS na vašem webu, tam jsou některé výhody pro vytvoření kopie THREDDS datové soubory (alespoň pro nejpopulárnější soubory dat) na jiném RAID, žeERDDAP™má přístup kERDDAP™může přímo sloužit datům ze souborů. VERDDěláme to pro naše nejpopulárnější data.

*   ERDDAP™může získat data přímo a nemusí čekat na THREDDS znovu načíst data nebo ...
*   ERDDAP™může okamžitě zaznamenat a začlenit nové datové soubory, takže nemusí THREDDS často pesterovat, aby zjistil, zda se datový soubor změnil. Viz [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis) .
* Zatížení je rozděleno mezi 2 RAIDS a 2 servery, místo toho, aby byl požadavek tvrdý na obaERDDAP™a THREDDS.
* Vyhnete se problému neshody způsobené THREDDS s malým (ve výchozím nastavení) maximální velikost požadavku.ERDDAP™má systém pro řešení neshody, ale vyhnout se problému je lepší.
* Máte záložní kopii dat, která je vždy dobrý nápad.

V každém případě, nikdy nejezdi na THREDDS aERDDAP™ve stejné Tomcat. Spusťte je v samostatných Tomcats, nebo lépe, na oddělených serverech.

Zjistili jsme, že THREDDS se pravidelně dostává do stavu, kdy požadavky prostě visí. JestližeERDDAP™získává data z THREDDS a THREDDS je v tomto stavu,ERDDAP™má obranu. (Píše se tu, že soubor THREDDS není k dispozici.) , ale to je stále nepříjemné proERDDAP™protožeERDDAP™musí počkat do timeout pokaždé, když se pokusí znovu načíst soubor dat z zavěšeného THREDDS. Některé skupiny (včetněERD) vyhnout se tomu tím, že aktivně restartovat THREDDS často (např. v noci v cron práci) .

### Pomalu reagujeme{#responding-slowly} 
*    **PokudERDDAP™Odpovídá pomalu** nebo pokud jen některé požadavky reagují pomalu,
můžete být schopni zjistit, zda je pomalost rozumná a dočasná (např. z důvodu mnoha požadavků ze scénáře neboWMSuživatelé) , nebo pokud je něco nevysvětlitelně špatně a musíte[Vypnout a restartovat Tomcat aERDDAP™](#shut-down-and-restart).
    
PokudERDDAP™reaguje pomalu, viz níže uvedené rady k určení příčiny, která vám doufejme umožní vyřešit problém.
Můžete mít konkrétní výchozí bod (např. konkrétní URL požadavku) nebo vágní výchozí bod (např.ERDDAP™je pomalý) .
Možná znáte uživatele. (Například, protože ti poslali e-mail.) Nebo ne.
Můžeš mít jiné stopy, nebo ne.
Vzhledem k tomu, že všechny tyto situace a všechny možné příčiny problémů rozmazané společně, se níže uvedené rady snaží řešit všechny možné výchozí body a všechny možné problémy související s pomalými reakcemi.
    
    *    **Hledejte stopy v[ERDDAP's souborem záznamu](#log)**   ( *velkýRodič rodičů* /logs/log.txt) .
        \\[Ve vzácných případech, tam jsou stopy v[Soubor s deníkem Tomcat](#tomcat-logs)  ( *tomcat* /logs/catalina.out) .\\]  
Hledejte chybové zprávy.
Hledejte velké množství žádostí pocházejících z jednoho (nebo pár) uživatelé a možná zabírá mnoho zdrojů vašeho serveru (paměť, čas procesoru, přístup na disk, šířka pásma internetu) .
        
Pokud je problém spojen s **jeden uživatel** , Můžete často získat nápovědu o tom, kdo uživatel je přes webové služby, jako je[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)které vám mohou poskytnout informace týkající se IP adresy uživatele (který můžete najít vERDDAP's[log.txt](#log)soubor) .
        
        * Pokud se zdá, že uživatel **robot** chovat se špatně (především vyhledávač snaží vyplnitERDDAP™formuláře s každou možnou permutací vstupních hodnot) Ujistěte se, že jste správně nastavili server[roboti.txt](#robotstxt)Složka.
        * Pokud se zdá, že uživatel **skript (án) ** který podává více žádostí současně, kontaktujte uživatele, vysvětlit, žeERDDAP™má omezené zdroje (např. paměť, čas procesoru, přístup na disk, šířka pásma internetu) , a požádat je, aby byly ohleduplné k ostatním uživatelům a stačí podat jednu žádost najednou. Můžete také zmínit, že budete černou listinu, pokud neustoupí.
        * Pokud se zdá, že uživatel **skript** aby velký počet časově náročné žádosti, požádat uživatele, aby byl ohleduplný ostatních uživatelů tím, že malé pauza (Dvě vteřiny?) ve scénáři mezi požadavky.
        *    **WMSklientský software** může být velmi náročné. Jeden klient si často vyžádá 6 vlastních obrázků najednou. Pokud se zdá, že uživatelWMSklient, který podává oprávněné žádosti, můžete:
            * Ignoruj to. (doporučujeme, protože se brzy přesunou dál.) 
            * Vypněte servery.WMSslužba prostřednictvímERDDAP's nastavit.html soubor. (nedoporučuje se) 
        * Pokud se tyto žádosti zdají **hloupé, šílené, přehnané nebo zlomyslné,** nebo pokud nemůžete vyřešit problém jinak, zvažte dočasně nebo trvale přidání IP adresy uživatele do [&lt;requestBlacklist&gt; ve vašemdatasets.xmlsoubor] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Pokuste se zkopírovat problém sám, z vašeho počítače.**   
Zjistit, zda je problém s jedním datovým souborem nebo všemi datovými soubory, pro jednoho uživatele nebo všechny uživatele, pro některé typy žádostí atd..
Pokud můžete zdvojit problém, zkuste zúžit problém.
Pokud nemůžete zdvojit problém, pak problém může být vázán na počítač uživatele, připojení uživatele k internetu, nebo vaše instituce internetové připojení.
         
    * Pokud jen **jeden soubor údajů** reaguje pomalu. (možná jen pro **jeden typ žádosti** od jednoho uživatele) , Problém může být:
        *   ERDDAP's přístupem ke zdrojovým údajům datového souboru (zejména z relačních databází, Cassandry a vzdálených souborů dat) může být dočasně nebo trvale pomalý. Zkuste zkontrolovat rychlost zdroje nezávisle naERDDAP. Pokud je to pomalé, možná to můžete zlepšit.
        * Týká se problém konkrétní žádosti nebo obecného typu žádosti?
Čím větší je požadovaná podmnožina datového souboru, tím pravděpodobněji žádost selže. Pokud uživatel činí obrovské požadavky, požádejte uživatele, aby učinil menší požadavky, které jsou pravděpodobnější, že dostane rychlou a úspěšnou odpověď.
            
Téměř všechny datové soubory jsou lepší v řešení některých typů žádostí než jiné typy žádostí. Například když soubor dat ukládá různé časové úseky v různých souborech, mohou být žádosti o data z obrovského počtu časových bodů velmi pomalé. Pokud jsou aktuální požadavky složitého typu, zvažte nabídku varianty datového souboru, která je pro tyto žádosti optimalizována. Nebo jen uživateli vysvětlit, že tento typ žádosti je obtížné a časově náročné, a požádat o jejich trpělivost.
            
        * Databáze nemusí být optimálně nastavena. Můžete být schopni provést změny datového souborudatasets.xmlkus na pomocERDDAP™lépe zacházet s daty. Například,
            
            *   EDDGridSoubory souborů FromNcFiles, které mají přístup k datům z komprimovaných souborů nc4/hdf5 jsou pomalé při získávání dat pro celý geografický rozsah (např. pro mapu světa) Protože celý soubor musí být dekompresován. Mohli byste převést soubory na nestlačené soubory, ale pak požadavek na místo na disku bude mnohem, mnohem větší. Je pravděpodobně lepší přijmout, že tyto soubory souborů budou za určitých okolností pomalé.
            * Konfigurace [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables) tag má obrovský vliv na to, jakERDDAP™zpracovává soubory EDDTable.
            * Můžete být schopni zvýšit[rychlost EDDtableFromDatabase](/docs/server-admin/datasets#database-speed)Soubor dat.
            * Mnoho datových souborů EDDTable lze spustit pomocí[uložení kopie údajů vNetCDFSouvislé ošuntělé soubory Array](/docs/server-admin/datasets#eddtablefromfiles), kteréERDDAP™umí číst velmi rychle.
            
Pokud chcete pomoci urychlit konkrétní datový soubor, uveďte popis problému a část datového souborudatasets.xmla vidět naše[oddíl o získání dodatečné podpory](/docs/intro#support).
             
    * Pokud **všechno** vERDDAP™je **Vždy** Pomalu, problém může být:
        * Počítač, který běžíERDDAP™nemusí mít dostatek paměti nebo zpracovatelského výkonu. Je dobré utíkat.ERDDAP™na moderním multi-core serveru. Pro těžké použití by měl mít server 64-bitový operační systém a 8 GB nebo více paměti.
        * Počítač, který běžíERDDAP™může také provozovat jiné aplikace, které konzumují mnoho systémových zdrojů. Pokud ano, můžete získat dedikovaný server proERDDAP? Například (Tohle není potvrzení.) , můžete získat čtyřjádrový Mac Mini Server s 8 GB paměti za $1100.
             
    * Pokud **všechno** vERDDAP™je **dočasně** Pomalu, podívejte seERDDAP's[ **/erddap/status.htmlstrana** ](#status-page)ve vašem prohlížeči.
        * MáERDDAP™Stavová stránka se nenačítá?
Pokud ano,[restartERDDAP™](#shut-down-and-restart).
        * UdělalERDDAP™načítání stavové stránky pomalu (např. &gt;5 sekund) ?
To je znamení, že všechno vERDDAP™běží pomalu, ale nemusí to být nutně problém.ERDDAP™Možná je prostě zaneprázdněn.
        * Pro "Zřeknutí se selhání času (od posledního velkého souboru LoadDatasets) "je n= velké číslo?
To naznačuje, že v poslední době bylo mnoho neúspěšných žádostí. To může být problém nebo začátek problémů. Střední doba pro selhání je často velká (např. 210000 ms) ,
což znamená, že tam byly (Opravdu?) Spousta aktivních nití.
které svazovaly spoustu zdrojů (jako paměť, otevřené soubory, otevřené zásuvky, ...) ,
Což není dobré.
        * Pro "Odpovědi uspějí v čase (od posledního velkého souboru LoadDatasets) "je n= velké číslo?
To naznačuje, že v poslední době bylo mnoho úspěšných žádostí. Tohle není problém. To jen znamená, žeERDDAP™Je to těžké.
        * Je "Počet non-Tomcat-čekající nitě" zdvojnásobit typickou hodnotu?
To je často vážné problémy, které způsobíERDDAP™Zpomalit a nakonec zmrznout. Pokud to trvá hodiny, možná budete chtít aktivně[restartERDDAP™](#shut-down-and-restart).
        * V dolní části seznamu "Souhrn využití paměti" je poslední hodnota "Paměť: momentálně používá" velmi vysoká?
To může jen znamenat vysoké užívání, nebo to může být známka potíží.
        * Podívejte se na seznam nití a jejich stav. Dělá nějaký neobvyklý počet z nich něco neobvyklého?
             
    * Je **internetové připojení vaší instituce** Momentálně pomalý?
Vyhledejte internet pro "internetový test rychlosti" a použijte jeden z online testů zdarma, jako například[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Pokud je internetové připojení vaší instituce pomalé, pak spojení meziERDDAP™a vzdálené zdroje dat budou pomalé a spojení meziERDDAP™a uživatel bude pomalý. Někdy to můžete vyřešit zastavením zbytečného používání internetu (Například lidé, kteří sledují streamování videí nebo videokonferenční hovory) .
         
    * Je **internetové připojení uživatele** Momentálně pomalý?
Ať uživatel vyhledá internet pro "internetový test rychlosti" a použijte jeden z online testů zdarma, jako například[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Pokud je internetové připojení uživatele pomalé, zpomaluje jejich přístup kERDDAP. Někdy to mohou vyřešit tím, že ve své instituci zastaví zbytečné používání internetu (Například lidé, kteří sledují streamování videí nebo videokonferenční hovory) .
         
    *    **Zasekl?**   
Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).

### Vypnout a znovu začít{#shut-down-and-restart} 
*    **Jak vypnout a znovu nastartovat Tomcat aERDDAP™**   
Nemusíte vypnout a restartovat Tomcat aERDDAPpokudERDDAP™je dočasně pomalý, pomalý z nějakého známého důvodu (jako spousta požadavků ze scénáře neboWMSuživatelé) , nebo použít změnydatasets.xmlSložka.
    
Musíte vypnout a restartovat Tomcat aERDDAP™pokud potřebujete aplikovat změny v souboru setup.xml nebo pokudERDDAP™Zmrzne, zavěsí nebo zamkne. Za extrémních okolností,Javamůže zmrazit na minutu nebo dvě, zatímco to dělá plný sběr odpadu, ale pak se zotavit. Takže je dobré počkat minutu nebo dvě, jestliJava/ERDDAP™je opravdu zmrzlý nebo jen dělá dlouhou sbírku odpadků. (Pokud je sběr odpadků běžným problémem,[přidělit Tomcat více paměti](/docs/server-admin/deploy-install#memory).) 
    
Nedoporučuji používat Tomcat Web Application Manager pro spuštění nebo vypnutí Tomcat. Pokud úplně nevypnete a nespustíte Tomcat, dříve nebo později budete mít problémy s permGen pamětí.
    
Pro vypnutí a restart Tomcat aERDDAP:
    
    * Jestliže používáte Linux nebo Mac:
         (Pokud jste vytvořili speciálního uživatele ke spuštění Tomcat, např. tomcat, nezapomeňte udělat následující kroky jako tento uživatel.)   
         
        1. Použít cd *tomcat* /bin
             
        2. Použít ps-ef|grep tomcat k nalezení java/tomcat procesu ID (Snad bude uveden jen jeden proces.) , které zavoláme *javaProcessID* dole.
             
        3. PokudERDDAP™je zmrazen/zablokován, používá se zabít -3 *javaProcessID* říctJava  (který vede Tomcat) k odstranění vláken do souboru s logem Tomcat: *tomcat* /logs/catalina.out . Poté, co restart, můžete diagnostikovat problém tím, že zjistíte, nit vyhodit informace (a všechny další užitečné informace nad ní) v *tomcat* /logs/catalina.out a také čtením příslušných částí[ERDDAP™archiv záznamů](#log). Pokud chcete, můžete zahrnout tyto informace a vidět naše[oddíl o získání dodatečné podpory](/docs/intro#support).
             
        4. Použijte ./ztlumit. s
             
        5. Použít ps-ef|reprum tomcat opakovaně, dokud není uveden proces java/tomcat.
            
Někdy bude proces java/tomcat trvat až dvě minuty, než se úplně vypne. Důvodem je:ERDDAP™pošle zprávu na pozadí vlákna, aby jim říct, aby se zastavili, ale někdy trvá tyto nitě dlouho dostat se na dobré místo zastavení.
            
        6. Pokud po minutě nebo tak, java/tomcat nezastaví sám, můžete použít
zabít - 9 *javaProcessID*   
donutit proces java/tomcat okamžitě zastavit. Pokud je to možné, použijte to pouze jako poslední možnost. Spínač -9 je silný, ale může způsobit různé problémy.
             
        7. RestartovatERDDAP™, použijte ./startup.sh
             
        8. PohledERDDAP™ve vašem prohlížeči zkontrolovat, zda restart uspěl. (Někdy musíte počkat 30 sekund a pokusit se načístERDDAP™znovu ve vašem prohlížeči, aby to uspělo.)   
             
    * Pokud používáte Windows:
         
        1. Použít cd *tomcat* /bin
             
        2. Použitíshutdown.bat  
             
        3. Můžete chtít/potřebovat použít správce úloh Windows (přístupný přes Ctrl Alt Del) zajistit, abyJava/Tomcat/ERDDAP™proces/aplikace se zcela zastavila.
Někdy bude proces/aplikace trvat až dvě minuty. Důvodem je:ERDDAP™pošle zprávu na pozadí vlákna, aby jim říct, aby se zastavili, ale někdy trvá tyto nitě dlouho dostat se na dobré místo zastavení.
             
        4. RestartovatERDDAP™, použijte startup.bat
             
        5. PohledERDDAP™ve vašem prohlížeči zkontrolovat, zda restart uspěl. (Někdy musíte počkat 30 sekund a pokusit se načístERDDAP™znovu ve vašem prohlížeči, aby to uspělo.)   
             
### Časté havárie nebo zmrazení{#frequent-crashes-or-freezes} 
PokudERDDAP™se stává pomalým, havaruje nebo mrzne, něco je špatně. Podívejte se dovnitř.[ERDDAP's souborem záznamu](#log)Zkusit zjistit příčinu. Pokud nemůžete, prosím uveďte podrobnosti a viz naše[oddíl o získání dodatečné podpory](/docs/intro#support).

Nejčastějším problémem je problémový uživatel, který spouští několik skriptů najednou a/nebo někdo, kdo dělá velký počet neplatných žádostí. Jestli k tomu dojde, asi byste měli toho uživatele vymazat. Když uživatel na černé listině podá žádost, chybová zpráva v odpovědi je vybízí, aby vám e-mailem vyřešit problémy. Pak je můžete povzbudit, aby spustili jen jeden scénář najednou a vyřešili problémy ve scénáři. (např. požadovat data ze vzdáleného datového souboru, který nemůže odpovědět před načasováním) . Viz [&lt;requestBlacklist&gt; ve vašemdatasets.xmlsoubor] (/docs/server-admin/datasets#requestblacklist) .

Za extrémních okolností,Javamůže zmrazit na minutu nebo dvě, zatímco to dělá plný sběr odpadu, ale pak se zotavit. Takže je dobré počkat minutu nebo dvě, jestliJava/ERDDAP™je opravdu zmrzlý nebo jen dělá dlouhou sbírku odpadků. (Pokud je sběr odpadků běžným problémem,[přidělit Tomcat více paměti](/docs/server-admin/deploy-install#memory).) 

PokudERDDAP™se stává pomalý nebo zmrzne a problém není problematický uživatel nebo dlouhá sbírka odpadků, můžete obvykle vyřešit problém tím,[restartováníERDDAP™](#shut-down-and-restart). Moje zkušenost je, žeERDDAP™může běžet měsíce bez nutnosti restartu.
     

### Monitor{#monitor} 
Můžete sledovat svůjERDDAP's status při pohledu na[/erddap/status.htmlstrana](#status-page), zejména statistiky v horní části. PokudERDDAP™se stává pomalý nebo zmrzne a problém není jen extrémně těžké použití, můžete obvykle vyřešit problém tím,[restartováníERDDAP™](#shut-down-and-restart). Další metriky jsou dostupné prostřednictvím integrace Prometheus v /erddap/metrics.

Moje zkušenost je, žeERDDAP™může běžet měsíce bez nutnosti restartu. Měli byste ji restartovat pouze tehdy, pokud chcete použít některé změny, které jste udělaliERDDAP's setup.xml nebo když potřebujete nainstalovat nové verzeERDDAP™,JavaTomcat, nebo operační systém. Pokud potřebujete restartovatERDDAP™Často je něco špatně. Podívejte se dovnitř.[ERDDAP's souborem záznamu](#log)Zkusit zjistit příčinu. Pokud nemůžete, prosím uveďte podrobnosti a viz naše[oddíl o získání dodatečné podpory](/docs/intro#support). Jako dočasné řešení můžete zkusit použít[Monit](https://mmonit.com/monit/)pro sledováníERDDAP™a v případě potřeby ji restartovat. Nebo byste mohli udělat cron práci restartovatERDDAP™  (Proaktivní) Pravidelně. Může být trochu náročné napsat skript pro automatizaci monitorování a restartováníERDDAP. Některé tipy, které by mohly pomoci:

* Můžete zjednodušit testování, pokud je proces Tomcat stále běží pomocí -c switch s grep:
ps -u *tomcat Uživatel*  |grap -c java
To sníží výstup na "1," pokud je proces tomcat stále naživu, nebo "0," pokud proces zastavil.
     
* Pokud jste dobrý s pohledem, můžete extrahovat processID z výsledků
ps -u *tomcat Uživatel*  |grep java, a použijte processID v jiných řádcích skriptu.
     

Pokud nastavíte Monit nebo cron práci, bylo by skvělé, kdybyste mohli sdílet podrobnosti, aby ostatní mohli prospěch vidět naše[oddíl o získání dodatečné podpory](/docs/intro#support)kde se můžete podělit.

#### Permgen{#permgen} 
Pokud opakovaně používáte Tomcat Manager k opětovnému načtení (nebo zastavit a začít)  ERDDAP™,ERDDAP™může selhat startovat a házet java.lang. PermGen. Řešení je pravidelně (nebo pokaždé?)  [Vypnout a restartovat tomcat aERDDAP™](#shut-down-and-restart), místo jen znovu nabíjetERDDAP.
\\[Aktualizace: Tento problém byl značně minimalizován nebo stanovenERDDAP™verze 1.24.\\]  
     
#### Záznam{#log} 
*    **[log.txt](#log)**   
PokudERDDAP™nestartuje nebo pokud něco nefunguje podle očekávání, je velmi užitečné podívat se na chyby a diagnostické zprávy vERDDAP™záznamový soubor.
    * Záznamový soubor je *velkýRodič rodičů* /logs/log.txt
         ( *velkýRodič rodičů* je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Pokud není žádný deník. txt soubor nebo pokud záznam. txt soubor nebyl aktualizován od té doby, co jste restartovaliERDDAP™, podívejte se do[Soubory záznamů Tomcat](#tomcat-logs)zjistit, jestli tam není chybová zpráva.
    * Typy diagnostických zpráv v logovém souboru:
        * Slovo "error" se používá, když se něco pokazilo, takže postup nebyl dokončen. I když je otravné, aby se chyba, chyba vás nutí vypořádat se s problémem. Myslíme si, že je lepší házet chyby, než mítERDDAP™Poflakovat se, pracovat způsobem, který jsi nečekal.
        * Slovo "varování" se používá, když se něco pokazilo, ale postup byl schopen dokončit. Tyhle jsou dost vzácné.
        * Všechno ostatní je jen informativní zpráva. Můžete kontrolovat, kolik informací je přihlášeno pomocí [&lt;LogLevel &gt;] (/docs/server-admin/datasets#loglevel)  datasets.xml.
        * Dataset reloads a uživatelské odpovědi, které trvá &gt; 10 sekund dokončit (úspěšně nebo neúspěšně) jsou označeny " (&gt;10&#33;) ". Proto můžete prohledat soubor log.txt, aby tato fráze našla soubory, které byly pomalé k opětovnému načtení nebo číslo požadavku na žádosti, které byly pomalé k dokončení. Pak se můžete podívat výš v log.txt souboru, abyste zjistili, jaký byl problém s datovým souborem nebo jaký byl požadavek uživatele a od koho byl. Tyto pomalé zatížení souborů a požadavky uživatelů jsou někdy zdaňování naERDDAP. Takže vědět více o těchto požadavcích vám může pomoci identifikovat a řešit problémy.
    * Informace jsou napsány do logového souboru na disku v poměrně velkých kouscích. Výhodou je, že je to velmi efektivní...ERDDAP™nebude nikdy blokovat čekání na informace, které mají být zapsány do souboru protokolu. Nevýhodou je, že deník téměř vždy skončí částečnou zprávou, která nebude dokončena, dokud nebude napsán další kus. Můžete si to vymyslet aktuální. (na okamžik) sledováním vašehoERDDAP's status webová stránka na https://*your.domain.org*/erddap/status.html   (nebohttp://pokudhttpsnení povoleno) .
    * Když se soubory log.txt dostanou na 20 MB,
soubor je přejmenován na log. txt.předchozí a je vytvořen nový log.txt soubor. Takže záznamy se nekumulují.
        
V setup.xml, můžete zadat jinou maximální velikost pro log soubor, v MegaBytes. Minimální přípustná hodnota je 1 (MB) . Maximální povoleno je 2000 (MB) . Výchozí hodnota je 20 (MB) . Například:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Kdykoliv restartujeteERDDAP™,
        ERDDAP™zkopíruje archiv log.txt a log. txt.předchozí soubory s časovým razítkem na jméno souboru. Pokud došlo k potížím před restartem, mohlo by být užitečné analyzovat tyto archivované soubory pro stopy o tom, co problém byl. Pokud již nejsou potřebné, můžete archiv soubory smazat.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAPJe to deník. Txt soubor není určen k analýze (i když byste mohli být schopni vytvořit pravidelné výrazy, které extrahují požadované informace) . Je navržen tak, aby pomohl člověku zjistit, co se děje, když se něco děje. Když pošlete chybu nebo problém hlášení naERDDAP™vývojáři, pokud je to možné, zahrňte prosím všechny informace ze souboru log.txt související s problematickou žádostí.

Z důvodů účinnostiERDDAP™pouze píše informace do záznamu. Txt po nahromadění velkého množství informací. Takže když navštívíte deník. txt hned po chybě, informace související s chybou možná ještě nebyly zapsány do log.txt. Chcete-li získat dokonale aktuální informace z log.txt, navštivte svůjERDDAP's[status.html stránka](#status-page). Kdy?ERDDAP™procesy, které vyžadují, spláchne všechny čekající informace k log.txt.

ProERDDAP™statistiky použití, prosím použijte[Apache a/nebo soubory protokolu Tomcat](#tomcat-logs)místoERDDAP's log.txt. Všimněte si, žeERDDAP's[status.html stránka](#status-page)  (některé) a[Denní zpráva](#daily-report)  (více) mají pro vás předpočítané velké množství statistických údajů o používání.
    
### Záznamy Tomcat{#tomcat-logs} 
PokudERDDAP™nestartuje, protože chyba nastala velmi brzy vERDDAP's spuštěním, chybová zpráva se objeví v souborech Tomcat's log ( *tomcat* /logs/catalina. *dnes* .log nebo *tomcat* /logs/catalina.out) , ne v[ERDDAP's log.txt soubor](#log).

Statistika použití: Pro většinu informací, které lidé chtějí shromáždit ze souboru záznamů (Například statistiky využití) , použijte prosím soubory Apache a/nebo Tomcat. Jsou pěkně formátované a mají takový typ informací. Existuje mnoho nástrojů pro jejich analýzu, například,[AWStats](https://www.awstats.org),[ElasticSearch's Kibana](https://www.elastic.co/products/kibana)a[JMeter](https://jmeter.apache.org), Ale hledat web najít správný nástroj pro vaše účely.

Všimněte si, že soubory záznamu identifikují pouze uživatele jako IP adresy. Existují webové stránky, které vám pomohou získat informace týkající se dané IP adresy, např.[WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup), ale normálně nebudete schopni najít jméno uživatele.

Také kvůli[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), IP adresa daného uživatele se může v různých dnech lišit nebo mohou mít různí uživatelé stejnou IP adresu v různých časech.

Alternativně můžete použít něco jako[Analýza Google](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Ale pozor: když používáte externí služby jako Google Analytics, vzdáváte se soukromí svých uživatelů tím, že dáváte Google plný přístup k jejich činnosti na svých stránkách, které Google (a další?) může držet navždy a používat pro jakýkoli účel (možná ne technicky, ale pravděpodobně v praxi) . Vaši uživatelé s tím nesouhlasili a pravděpodobně si nejsou vědomi toho, že budou sledováni na vašich webových stránkách, stejně jako si pravděpodobně neuvědomují rozsah sledování na téměř všech webových stránkách. V dnešní době je mnoho uživatelů velmi znepokojeno tím, že vše, co dělají na webu, monitorují tyto velké společnosti. (Google, Facebook, atd.) a vládou, a najděte toto neopodstatněné vniknutí do jejich životů (jako v knize 1984) . To přimělo mnoho uživatelů instalovat produkty jako[Jezevec na ochranu soukromí](https://www.eff.org/privacybadger/faq)pro minimalizaci sledování, použití alternativních prohlížečů, jako je[Tor prohlížeč](https://www.torproject.org/)  (nebo vypnout sledování v tradičních prohlížečích) , a používat alternativní vyhledávače jako[Duck Duck Go](https://duckduckgo.com/). Pokud používáte službu jako Google Analytics, alespoň zdokumentujte její použití a důsledky změnou&lt;standardPrivacyPolicy&gt; tag inERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
    
### E-mailový deník{#e-mail-log} 
*    **emailLogYear-MM-DD.txt**   
    ERDDAP™vždy píše text všech odchozích e-mailových zpráv v aktuální den e-mailu LogYear-MM-DD.txt soubor v *velkýRodič rodičů* /logy ( *velkýRodič rodičů* je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Pokud server nemůže odesílat e-mailové zprávy, nebo pokud jste nakonfigurovaliERDDAP™nevysílat e-mailové zprávy, nebo pokud jste jen zvědavý, tento soubor je vhodný způsob, jak vidět všechny e-mailové zprávy, které byly odeslány.
    * Soubory e-mailového záznamu z předchozích dnů můžete smazat, pokud již nejsou potřebné.
         
### Denní zpráva{#daily-report} 
Daily Report má spoustu užitečných informací -- všechny informace z vašehoERDDAP's[/erddap/status.htmlstrana](#status-page)a ještě víc.
    * Je to nejúplnější shrnutí vašehoERDDAP's status.
    * Mimo jiné obsahuje seznam souborů údajů, které nebyly načteny, a výjimky, které generovaly.
    * Je generována při spuštěníERDDAP™  (hned poERDDAP™dokončení pokusu načíst všechny soubory dat) a generoval brzy po 7 hodin místního času každé ráno.
    * Kdykoliv je generována, je napsána na[ERDDAP's log.txt soubor](#log).
    * Kdykoli je generován, je e-mailem na&lt;emailDailyReportsTo&gt; a&lt;emailVšechno To&gt; (které jsou uvedeny v[setup.xml](/docs/server-admin/deploy-install#setupxml)) pokud jste nastavili e-mailový systém (v setup.xml) .

### Stavová stránka{#status-page} 
Můžete si prohlédnout stav vašehoERDDAP™z jakéhokoliv prohlížeče tím, že jde do&lt;baseUrl &gt;/erddap/status.html
* Tato stránka je generována dynamicky, takže má vždy aktuální statistiky pro vašeERDDAP.
* Zahrnuje statistiky týkající se počtu žádostí, využití paměti, stop z vláken, úlohyThread, atd.
* Vzhledem k tomu, že stránku stavu lze prohlížet každý, to nezahrnuje tolik informací jako[Denní zpráva](#daily-report).
         
### Přidávání/změnování datových souborů{#addingchanging-datasets} 
ERDDAP™obvykle znovu čtedatasets.xmlkaždý *loadDatasetsMinMinutes*   (uvedené v[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Takže můžete udělat změnydatasets.xmlkdykoliv, i kdyžERDDAP™Utíká.
Brzy bude detekován nový datový soubor, obvykle uvnitř *loadDatasetsMinMinutes* .
Změněný datový soubor bude znovu načten, když je *reloadEveryNMinutes* starý (jak je uvedeno vdatasets.xml) .
    
#### Označení{#flag} 
*    **[Soubor s vlajkou](#flag)ŘíkáERDDAP™pokusit se co nejdříve znovu načíst datový soubor** 
    
    *   ERDDAP™Nevšimne si žádné změny nastavení datového souboru vdatasets.xmlažERDDAP™reloaduje soubor dat.
         
    * To tellERDDAP™co nejdříve znovu načíst soubor údajů (před souborem údajů)&lt;reloadEveryNMinutes&gt; by způsobilo opětovné načtení, vložit soubor do *velkýRodič rodičů* /flag ( *velkýRodič rodičů* je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) má stejný název jako datový soubordatasetID.
To říkáERDDAP™a pokusit se znovu načíst ten soubor co nejdříve.
Stará verze datového souboru bude uživatelům k dispozici až do doby, kdy bude nová verze k dispozici, a atomovy bude vyměněna.
ProEDDGridFromFiles a EDDTable FromFiles, bude reloading database hledat nové nebo změněné soubory, číst je a začlenit je do datového souboru. Takže čas k opětovnému načtení závisí na počtu nových nebo změněných souborů.
Pokud má datový soubor aktivní="false,"ERDDAP™odstraní soubor údajů.
         
##### Vlajka špatných souborů{#bad-files-flag} 
* Jednou z variant adresáře /flag je adresář /badFilesFlag. (PřidánoERDDAP™v2.12.)   
Pokud dáte soubor do *velkýRodič rodičů* /badFilesFlag adresář sdatasetIDjako název souboru (Na obsahu souboru nezáleží.) , pak jakmileERDDAP™Vidí špatné střílečky Soubor s vlajkou,ERDDAP™bude:
    
    1. Smažte badFilesFlag soubor.
    2. Smazat badFiles.ncsoubor (pokud nějaký existuje) , který má seznam špatných souborů pro tento datový soubor.
Pro datové soubory jakoEDDGridSideBySide, které mají ChildDatasety, to také odstraní špatnéSoubory.ncsoubor všech dětských souborů.
    3. Nabít soubor co nejdříve.
    
To tedy způsobujeERDDAP™zkusit znovu pracovat se soubory dříve (Špatně?) Označeno jako špatné.
         
##### Tvrdá vlajka{#hard-flag} 
* Další variantou adresáře /flag je adresář /hardFlag. (PřidánoERDDAP™v1.74.)   
Pokud jste dali soubor do *velkýRodič rodičů* /hardFlag sdatasetIDjako název souboru (Na obsahu souboru nezáleží.) , pak jakmileERDDAP™Vidí to těžké. Soubor s vlajkou,ERDDAP™bude:
    
    1. Smažte soubor hardFlag.
    2. Odstranit soubor údajůERDDAP.
    3. Smazat všechny informace, kteréERDDAP™je uložen o tomto souboru údajů.
ProEDDGridFromFiles a EDDTable FromFiles subclasses, to smaže vnitřní databázi datových souborů a jejich obsah.
Pro datové soubory jakoEDDGridSideBySide, které mají childDatasets, to také odstraní interní databázi datových souborů a jejich obsah pro všechny dětské soubory.
    4. Znovu načíst data.
ProEDDGridFromFiles a EDDTable FromFiles subclasses, to způsobujeERDDAP™číst znovu **všechny** z datových souborů. Reload time je tedy závislý na celkovém počtu datových souborů v datovém souboru. Protože data byla odstraněna zERDDAP™Pokud byl soubor dat zaznamenán, nebude k dispozici, dokud nebude soubor údajů znovu načítán. Buď trpělivý. Podívej se dovnitř.[log.txt](#log)Jestli chceš vidět, co se děje.
    
Varianta hardFlag smaže uložené informace datového souboru, i když soubor dat není v současné době vloženERDDAP.
    
Tvrdá Vlajky jsou velmi užitečné, když uděláte něco, co způsobí změnu v tom, jakERDDAP™čte a interpretuje zdrojová data, například při instalaci nové verzeERDDAP™nebo pokud jste provedli změnu definice datového souboru vdatasets.xml
    
* Obsah vlajky, badFilesFlag a souborů hardFlag jsou irelevantní.ERDDAP™stačí se podívat na název souboru získatdatasetID.
     
* Mezi hlavními reloady dat,ERDDAP™neustále hledá vlajku, badFilesFlag a soubory hardFlag.
     
* Všimněte si, že když je soubor dat znovu načten, všechny soubory v *velkýRodič rodičů* /[cache](#cached-responses)/ *datasetID* adresář se smaže. To zahrnuje.nca obrazové soubory, které jsou běžně cachovány po dobu ~15 minut.
     
* Všimněte si, že pokud soubor údajů xml obsahuje[active="false"](/docs/server-admin/datasets#active), vlajka způsobí, že soubor údajů bude neaktivní (pokud je aktivní) , A v každém případě, není znovu nabit.
     
* KdykoliERDDAP™spustí LoadDatasets k hlavnímu opětovnému načtení (načasované opětovné načtení kontrolované&lt;loadDatasetsMinMinutes&gt;) nebo menší reload (v důsledku vnější nebo vnitřní vlajky) ,ERDDAP™číst všechny&lt;dekompresovanéCacheMaxGB&gt;,&lt;dekompresovanýCacheMaxMinutesOld&gt;,&lt;uživatel &gt;,&lt;requestBlacklist&gt;,&lt;slowDownTroubleMillis&gt; a&lt;předplatnéEmailBlacklist&gt; značky a přepínače do nového nastavení. Takže můžete použít vlajku jako způsob, jak získatERDDAP™co nejdříve si všimnout změn těchto značek.

##### Nastavit vlajku datové sady{#set-dataset-flag} 
*  ERDDAP™má webovou službu, aby vlajky mohly být nastaveny pomocí URL.
    
    * Například,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (To je falešná vlajka. Klíč) nastaví vlajku pro datový soubor rPmelTao.
    * Každý má jinou vlajku.datasetID.
    * Administrátoři mohou vidět seznam adres vlajky pro všechny soubory souborů tím, že se podívají na spodní část svých URL[Denní zpráva](#daily-report)e-mail.
    * Administrátoři by měli tyto URL považovat za důvěrné, protože dávají někomu právo resetovat datový soubor dle vůle.
    * Pokud si myslíte, že vlajkaKeys padla do rukou někoho, kdo je zneužívá, můžete se změnit.&lt;flagKeyKey&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml)a restartovatERDDAPdonutitERDDAP™generovat a používat jiný soubor FlagKeys.
    * Pokud se změníte&lt;flagKeyKey&gt;, smazat všechny staré předplatné (viz seznam v Daily Report) a nezapomeňte poslat nové URL lidem, kteří je chtějí mít.
    
Systém vlajky může sloužit jako základ pro účinnější mechanismus pro vyprávěníERDDAP™kdy znovu načíst soubor údajů. Například můžete nastavit soubor dat&lt;reloadEveryNMinutes &gt; na velké číslo (např. 10080 = 1 týden) . Pak, když víte, že soubor dat se změnil (možná proto, že jste do datového adresáře datového souboru přidali soubor) , nastavit vlajku tak, aby soubor údajů byl co nejdříve znovu načten. Vlajky jsou obvykle vidět rychle. Ale pokud je vlákno LoadDatasets již obsazeno, může to chvíli trvat, než bude k dispozici k jednání na vlajce. Ale systém vlajky je mnohem citlivější a efektivnější než nastavení&lt;reloadEveryNMinutes &gt; na malé číslo.
    
#### Odstranění datových souborů{#removing-datasets} 
Pokud je datový soubor aktivní vERDDAP™a chcete ji dočasně nebo trvale deaktivovat:
1. Indatasets.xmlpro soubor údajů nastaven[active="false"](/docs/server-admin/datasets#active)ve štítku datového souboru.
2. Počkej.ERDDAP™odstranit soubor údajů během dalšího hlavního opětovného načtení nebo[nastavit vlajku](#flag)pro soubor údajů, který má sdělitERDDAP™Všimněte si této změny co nejdříve. Když to uděláš,ERDDAP™nevyhazuje žádné informace, které by mohly být uloženy o datovém souboru a rozhodně nedělá nic s aktuálními údaji.
3. Pak můžete nechat soubor Active="false" vdatasets.xmlnebo ho odstraňte.
         
#### Kdy jsou data znovunačítána?{#when-are-datasets-reloaded} 
Vlákno zvané RunLoadDatasets je hlavní vlákno, které řídí, když jsou data znovu načítána. RunLoad Datové smyčky navždy:

1. RunLoadDatasets zaznamenává aktuální čas.
2. RunLoadDatasets spustí vlákno LoadDatasets pro "majorLoad." Informace o aktuálním/předchozím majoru Load si můžete prohlédnout v horní části vašehoERDDAP's
    [/erddap/status.htmlstrana](#status-page)  (například:[příklad stavové stránky](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets dělá kopiidatasets.xml.
    2. LoadDatasets čte prostřednictvím kopiedatasets.xmla u každého datového souboru zjistí, zda je třeba soubor údajů (re) naloženo nebo odstraněno.
        * Pokud a[vlajka](#flag)soubor existuje pro tento datový soubor, soubor je smazán a soubor je odstraněn, pokud je aktivní="false" nebo (re) načteno, pokud je aktivní="true" (bez ohledu na věk datového souboru) .
        * Je-li datový soubor datového souboru.xml chunk aktivní="false" a datový soubor je v současné době načten (aktivní) , je vyložena (odstraněno) .
        * Pokud má datový soubor aktivní="true" a datový soubor není již načten, načte se.
        * Pokud má datový soubor aktivní="true" a soubor údajů je již načten, soubor údajů se znovu načte v případě věku datového souboru (čas od posledního naložení) je větší než její&lt;reload EveryNMinutes&gt; (výchozí = 10080 minut) , jinak, soubor údajů je ponechán sám.
    3. LoadDatasets končí.
    
Závit RunLoadDatasets čeká na dokončení závitu LoadDatasets. Pokud nastavení LoadDatas trvá déle než zatíženíDatasets MinMinutes (jak je uvedeno v setup.xml) , RunLoadDatasets přeruší vlákno LoadDatasets. V ideálním případě si LoadDatasets všimne přerušení a dokončení. Ale pokud si nevšimne přerušení během minuty, RunLoadDatasets volá loadDatasets. stop () Což je nežádoucí.
3. Zatímco doba od začátku posledního MajorLoad je menší než loadDatasets MinMinutes (jak je uvedeno v setup.xml, např. 15 minut) , RunLoadDatasets opakovaně hledá[vlajka](#flag)Soubory v *velkýRodič rodičů* /Flag adresář. Pokud se najde jeden nebo více vlajkových souborů, jsou smazány a RunLoadDatasets spustí vlákno LoadDatasets pro "miniorLoad" (majorLoad=false) . Nemůžete vidět menší informace o vašemERDDAP's[/erddap/status.htmlstrana](#status-page).
    1. LoadDatasets dělá kopiidatasets.xml.
    2. LoadDatasets čte prostřednictvím kopiedatasets.xmla pro každý soubor údajů, pro který byl soubor vlajky:
        * Je-li datový soubor datového souboru.xml chunk aktivní="false" a datový soubor je v současné době načten (aktivní) , je vyložena (odstraněno) .
        * Pokud má datový soubor aktivní="true," soubor údajů je (re) Naloženo, bez ohledu na věk. Neflagované soubory jsou ignorovány.
    3. LoadDatasets končí.
4. RunLoad Datasety se vrací k kroku 1.

Poznámky:
* Spuštění
Při restartuERDDAP™, každý datový soubor s active="true" je načten.
* Cache
Pokud je datový soubor (re) naloženo, jeho cache (včetně souborů s datovou odpovědí a/nebo souborů s obrázky) je prázdný.
* Mnoho datových souborů
Pokud máte hodně souborů dat a/nebo jeden nebo více souborů dat jsou pomalé (re) zatížení, vlákno LoadDatasets může trvat dlouho, než dokončí svou práci, možná dokonce déle než zatíženíDatasets MinMinutes.
* One LoadDatasets vlákno
Nikdy neběží více než jedno vlákno LoadDatasets najednou. Je-li vlajka nastavena, když je LoadDatasets již běží, vlajka pravděpodobně nebude zachycena nebo zachycena, dokud nit LoadDatasets neskončí. Můžeš říct: "To je blbost. Proč prostě nezačneš s hromadou nových vláken k načtení dat?" Ale pokud máte spoustu souborů dat, které získávají data z jednoho vzdáleného serveru, i jedno vlákno LoadDatasets bude mít na vzdáleném serveru značný tlak. Totéž platí, pokud máte mnoho souborů, které získávají data ze souborů na jednom RAIDu. Rychle se zmenšují výnosy z více než jednoho vlákna LoadDatasets.
* Vlajka = ASAP
Nastavení vlajky pouze signály, že datový soubor by měl být (re) Naloženo co nejdříve, ne nutně okamžitě. Pokud není v současné době spuštěno žádné vlákno LoadDatasets, začne být soubor dat během několika sekund znovu načítán. Ale pokud v současné době běží vlákno LoadDatasets, bude soubor dat pravděpodobně znovu načten až po dokončení závitu LoadDatasets.
* Soubor vlajky odstraněn
Obecně, pokud dáte vlajku soubor *velkýRodič rodičů* /erddap/flag adresář (návštěvou vlajky datového souboru URL nebo umístění skutečného souboru) , Databáze se obvykle znovu načte velmi brzy poté, co je soubor vlajky smazán.
* Vlajka versus Malá reload Každý NMinutes
Pokud máte nějaký externí způsob, jak zjistit, kdy je třeba soubor dat znovu načíst a zda je pro vás vhodný, nejlepší způsob, jak zajistit, aby soubor dat byl vždy aktuální, je nastavit jeho opětovné načtení EveryNMinutes na velké číslo (10080?) a nastavit vlajku (přes scénář?) Kdykoliv to bude potřeba znovu nabít. To je systém, kterýEDDGridFromErddap a EddtableFromErddap přijímají zprávy, že soubor dat je třeba znovu načíst.
* Podívejte se do log.txt
Mnoho relevantních informací je napsáno *velkýRodič rodičů* /logs/log.txt soubor. Jestli věci nefungují tak, jak očekáváte, podívejte se na deník. Txt vám umožní diagnostikovat problém tím, že zjistíte, co přesněERDDAP™Ano.
    
    * Hledat "majorLoad=true" pro začátek hlavních vláken LoadDataset.
    * Hledat "majorLoad=false" pro začátek menších vláken LoadDatasets.
    * Hledat daný datový soubordatasetIDpro informaci o tom, že (re) naloženo nebo dotazováno.
        
          
         
#### Dosahovaná odpověď{#cached-responses} 
Obecně,ERDDAP™není cache (skladovat) odpovědi na požadavky uživatelů. Důvodem bylo, že většina žádostí by byla trochu jiná, takže cache by nebyla příliš účinná. Největší výjimky jsou požadavky na obrazové soubory (které jsou ukládány od prohlížečů a programů jakoGoogle Earthčasto znovu požadovat obrázky) a žádosti o.ncsoubory (protože nemohou být stvořeny v letu) .ERDDAP™ukládá kešované soubory každého datového souboru do jiného adresáře: *velkýRodič rodičů* /cache/ *datasetID* Protože jeden adresář cache může mít obrovský počet souborů, které by mohly být pomalé přístup.
Soubory jsou odstraněny z cache z jednoho ze tří důvodů:
* Všechny soubory v této cache jsou smazány, kdyžERDDAP™restartováno.
* Periodicky, jakýkoli soubor více než&lt;cacheMinutes &gt; starý (jak je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) budou vymazány. Odstranění souborů v cache na základě věku (není nejméně v poslední době používán) zajistí, že soubory nezůstanou v cache moc dlouho. I když by to mohlo vypadat, že daná žádost by měla vždy vrátit stejnou odpověď, to není pravda. Například:tabledapžádost, která zahrnuje &čas &gt; *některé Čas* se změní, pokud pro datový soubor dorazí nové údaje. A požadavek Griddap, který zahrnuje\\[poslední\\]pro časový rozměr se změní, pokud pro datový soubor dorazí nová data.
* Obrázky ukazující chyby jsou cachovány, ale jen na pár minut (Je to těžká situace.) .
* Pokaždé, když je soubor znovu načten, jsou všechny soubory v cache datového souboru smazány. Protože žádosti mohou být pro"last"index v roštovém souboru, soubory v cache se mohou stát neplatnými, pokud je soubor dat znovu načten.
         
#### Uložené informace o datové sadě{#stored-dataset-information} 
U všech typů souborů údajůERDDAP™Shromažďuje spoustu informací, když je soubor dat vložen a uchovává je v paměti. To umožňujeERDDAP™velmi rychle reagovat na vyhledávání, žádosti o seznamy souborů údajů a žádosti o informace o datovém souboru.

Pro několik typů souborů dat (zejménaEDDGridRozumím, EddtableCopy,EDDGridOd *Xxx* Soubory a EDDTableFrom *Xxx* Soubory) ,ERDDAP™ukládá na disku určité informace o datovém souboru, které se při opětovném načtení datového souboru znovu použijí. To značně urychluje proces nabíjení.

* Některé soubory údajů jsou čitelné člověkem.jsonsoubory a jsou uloženy v *velkýRodič rodičů* /dataset/ *Last2LettersOfDatasetID/datasetID* .
*   ERDDAP™pouze smaže tyto soubory v neobvyklých situacích, např. pokud přidáte nebo smažete proměnnou z datového souborudatasets.xmlkus.
* Většina změn datového souborudatasets.xmlkus (např. změna globálního atributu nebo atributu proměnné) Nevyžadujte, abyste tyto soubory smazal. Tyto typy změn zvládne pravidelné opětovné načítání dat. You can tellERDDAP™načíst soubor údajů ASAP nastavením[vlajka](#flag)pro datový soubor.
* Podobně, přidání, vymazání nebo změna datových souborů bude řešeno, kdyžERDDAP™reloaduje soubor dat. Ale...ERDDAP™brzy zaznamená tento typ změny a automaticky, pokud soubor údajů používá [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis) systém.
* Pouze zřídka by mělo být nutné tyto soubory smazat. Nejběžnější situace, kde musíte nutitERDDAP™smazat uložené informace (protože je zastaralá/nepravá a nebude automaticky stanovenaERDDAP) je, když provedete změny datového souborudatasets.xmlkousek, který ovlivňuje jakERDDAP™interpretuje data v souborech zdrojových dat, například mění řetězec formátu časové proměnné.
* Smazat uložené informační soubory datového souboru zERDDAP™který běží (i když data nejsou v současné době načtena) , nastavit a[tvrdá Označení](#hard-flag)pro tento datový soubor. Nezapomeňte, že pokud je datový soubor agregací velkého počtu souborů, opětovné načtení souboru může trvat značnou dobu.
* Vymazat uložené informační soubory datového souboruERDDAP™neutíká, utíkej[DasDds](/docs/server-admin/datasets#dasdds)pro tento datový soubor (který je jednodušší než přijít na to, v jakém adresáři se informace nachází a odstranit soubory ručně) . Nezapomeňte, že pokud je datový soubor agregací velkého počtu souborů, opětovné načtení souboru může trvat značnou dobu.
         
### Stav paměti{#memory-status} 
ERDDAP™Neměli bychom nikdy havarovat ani mrznout. Pokud ano, jednou z nejpravděpodobnějších příčin je nedostatečná paměť. Používání paměti můžete sledovat při pohledu na webovou stránku status.html, která obsahuje řádek jako

0 GC hovory, 0 žádostí kůlna, a 0 nebezpečné PaměťEmaily od posledního velkého souboru LoadDatas

 (to jsou postupně závažnější události)   
a MB inUse a gc Volá sloupce v tabulce statistik. Můžeš říct, jak tě paměť stresovalaERDDAP™je sledováním těchto čísel. Vyšší čísla naznačují větší stres.

* MB inUse by měla být vždy menší než polovina[\\-Xmx nastavení paměti](/docs/server-admin/deploy-install#memory). Větší čísla jsou špatné znamení.
* GC hovory indikují početkrátERDDAP™volal sběratel odpadků, aby se pokusil zmírnit vysokou paměť. Pokud to bude &gt;100, je to známka vážných problémů.
* v kůlně je uveden počet příchozích žádostí, které byly staženy (s chybovým číslem HTTP 503, služba nedostupná) Protože používání paměti bylo už příliš vysoké. V ideálním případě by se neměly propouštět žádné žádosti. Je v pohodě, když je pár žádostí v háji, ale je to známka vážných problémů, když je jich hodně pryč.
* nebezpečný PaměťEmaily - Pokud se použití paměti stane nebezpečně vysokou,ERDDAP™zašle e-mail na e-mailové adresy uvedené v&lt;emailVšechno To&gt; (v setup.xml) se seznamem žádostí aktivních uživatelů. Jak říká e-mail, pošlete prosím tyto e-maily Chrisovi. John v Noaa. gov takže můžeme použít informace ke zlepšení budoucích verzíERDDAP.
     

JestližeERDDAP™je stresovaná pamětí:
* Zvažte rozdělení více paměti vašeho serveru naERDDAP™změnou Tomcatu[Nastavení paměti Xmx](/docs/server-admin/deploy-install#memory).
* Pokud jste již alokovali tolik paměti, jak můžeteERDDAP™přes -Xmx, zvažte nákup více paměti pro váš server. Paměť je levná. (ve srovnání s cenou nového serveru nebo vašeho času) &#33; Pak zvýšit -Xmx.
* Indatasets.xml, nastaveno&lt;nGridThreads &gt; to 1, set&lt;nTableThreads &gt; až 1, a nastavit&lt;ipAddressMaxRequestsActive&gt; to 1.
* Podívejte se na požadavky v log.txt pro neefektivní nebo nepříjemné (ale legitimní) žádosti. Přidejte jejich IP adresy k&lt;requestBlacklist&gt; vdatasets.xml. Chyba na černé listině obsahujeERDDAP™e-mailová adresa správce s nadějí, že vás uživatelé budou kontaktovat, abyste s nimi mohli pracovat a používatERDDAP™efektivněji. Je dobré mít seznam IP adres, které máte na černé listině a proč, abyste mohli pracovat s uživateli, pokud vás kontaktují.
* Podívejte se na žádosti v log.txt o žádosti od škodlivých uživatelů. Přidejte jejich IP adresy k&lt;requestBlacklist&gt; vdatasets.xml. Pokud podobné žádosti pocházejí z více podobných IP adres, můžete použít některé who-is služby (např.[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) zjistit rozsah IP adres z tohoto zdroje a načerno celý rozsah. Viz [&lt;requestBlacklist&gt; documentation] (/docs/server-admin/datasets#requestblacklist) .
         
#### OutOfMemoryError{#outofmemoryerror} 
When you set upERDDAP™, určíte maximální množství paměti, žeJavamůže použít prostřednictvím[Nastavení \\-Xmx](/docs/server-admin/deploy-install#memory). PokudERDDAP™Jestli bude potřebovat víc paměti, hodí to kavu. Lang. OutOfMemoryError.ERDDAP™dělá hodně kontroly, aby to umožnilo zvládnout tuto chybu elegantně (Například, takže nepříjemná žádost selže, ale systém si zachovává svou integritu) . Ale někdy, chyba poškozuje integritu systému a musíte restartovatERDDAP. Doufejme, že je to vzácné.

Rychlé a snadné řešení OutOfMemoryError je zvýšit[Nastavení \\-Xmx](/docs/server-admin/deploy-install#memory), ale nikdy byste neměli zvýšit nastavení -Xmx na více než 80% fyzické paměti na serveru (např. pro 10GB server, nenastavujte -Xmx nad 8GB) . Paměť je relativně levná, takže může být dobrou volbou pro zvýšení paměti na serveru. Ale pokud jste maximalizovali paměť na serveru nebo z jiných důvodů ji nemůže zvýšit, musíte se zabývat více přímo s příčinou OutOfMemoryError.

Pokud se podíváte do[log.txt](#log)soubor k viděníERDDAP™Dělal, když chyba vznikla, obvykle můžete získat dobré vodítko k příčině OutOfMemoryError. Existuje mnoho možných příčin, včetně:

* Jeden obrovský datový soubor může způsobit OutOfMemoryError, zejména obrovské datové soubory ASCII. Pokud je to problém, mělo by to být zřejmé, protožeERDDAP™nebude načítat soubor údajů (pro soubor tabulkových dat) nebo číst údaje z tohoto souboru (pro mřížkované soubory dat) . Řešením, pokud je to proveditelné, je rozdělit soubor na více souborů. V ideálním případě můžete rozdělit soubor na logické kousky. Například pokud má soubor 20 měsíční hodnotu dat, rozdělí je na 20 souborů, každý z nich má 1 měsíční hodnotu dat. Ale existují výhody, i když je hlavní soubor rozdělen libovolně. Tento přístup má více výhod: a) Tím se sníží paměť potřebná pro čtení datových souborů na 1/20th, protože pouze jeden soubor se čte najednou. b) Často,ERDDAP™může řešit požadavky mnohem rychleji, protože se musí podívat pouze do jednoho nebo několika souborů najít data pro danou žádost. c) Pokud sběr dat probíhá, pak se může stávající 20 souborů změnit, a stačí upravit jeden, malý, nový soubor pro přidání dat v hodnotě příští měsíc do souboru.
* Jediná obrovská žádost může způsobit OutOfMemoryError. Zejména některé zorderBymožnosti mají celou odpověď v paměti na sekundu (např. k tomu, aby se dělalo něco takového) . Pokud je odpověď obrovská, může vést k chybě. Vždy bude existovat několik požadavků, které jsou v různých ohledech příliš velké. Problém můžete vyřešit zvýšením nastavení -Xmx. Nebo můžete povzbudit uživatele, aby podal řadu menších požadavků.
* Je nepravděpodobné, že by velký počet souborů způsobil index souboru, žeERDDAP™vytvoří tak velký soubor, že způsobí chybu. Pokud předpokládáme, že každý soubor používá 300 bajtů, pak 1 000 000 souborů zabere jen 300MB. Ale soubory s obrovským počtem datových souborů způsobují další problémyERDDAP, zejména, trvá to dlouho naERDDAP™otevřít všechny tyto datové soubory při reakci na žádost uživatele o data. V tomto případě může být řešením seskupení souborů tak, aby bylo méně datových souborů. U tabulkových souborů je často skvělé, pokud uložíte data z aktuálního datového souboru v[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Spojité datové soubory Ragged Array (žádost.ncCF soubory zERDDAP) a pak vytvořit nový datový soubor. Tyto soubory lze řešit velmi efektivně sERDDAP's[EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Pokud jsou logicky organizovaní (každý s údaji pro kus prostoru a času) ,ERDDAP™může z nich velmi rychle extrahovat data.
* Pro tabulkové soubory, které používají [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables) atribut,ERDDAP™vytvoří tabulku jedinečných kombinací hodnot těchto proměnných. Pro velké soubory dat nebo kdy&lt;subsetVariables&gt; je špatně nakonfigurovaná, tato tabulka může být dostatečně velká, aby způsobila OutOfMemoryErrors. Řešením je odstranit proměnné ze seznamu&lt;subsetVariables&gt; pro které existuje velký počet hodnot, nebo odstranit proměnné podle potřeby, dokud velikost této tabulky není přiměřená. ČástiERDDAP™kterésubsetVariablessystém nefunguje dobře (např., webové stránky se načítají velmi pomalu) když je v tom stole více než 100 000 řad.
* Vždy je možné, že několik současně velkých žádostí (na opravdu rušnéERDDAP) může kombinovat způsobit problémy s pamětí. Například 8 požadavků, každý pomocí 1GB každý, by způsobit problémy pro -Xmx=8GB nastavení. Ale je vzácné, že každá žádost by byla na vrcholu své paměti současně. A můžete snadno vidět, že vašeERDDAP™je opravdu zaneprázdněn velkými požadavky. Ale je to možné. Je těžké se s tímto problémem vypořádat jinak než zvýšením nastavení -Xmx.
* Jsou i jiné scénáře. Když se podíváte na[log.txt](#log)soubor k viděníERDDAP™Dělal, když došlo k chybě, obvykle můžete získat dobré vodítko o příčině. Ve většině případů existuje způsob, jak tento problém minimalizovat. (viz výše) , ale někdy jen potřebujete více paměti a vyšší -Xmx nastavení.
         
### Příliš mnoho otevřených souborů{#too-many-open-files} 
Začneme sERDDAP™v2.12ERDDAP™má systém pro sledování počtu otevřených souborů (která zahrnuje zásuvky a některé další věci, nejen soubory) v počítačích Tomcat. Pokud se některé soubory omylem nikdy nezavřou ("únik zdroje") , počet otevřených souborů se může zvýšit, dokud nepřekročí maximum povolené operačním systémem a mnoho opravdu špatných věcí se stane. Takže teď na Linuxových počítačích. (protože informace nejsou k dispozici pro Windows) :

* Tam je sloupec "Otevřené soubory" na krajní pravici status.html webové stránky zobrazující procento z max souborů otevřených. Na Windows to jen ukazuje "?"
* Kdy?ERDDAP™generuje tyto informace na konci každého hlavního opětovného načtení souboru dat, bude tisknout do logu. txt soubor:
openFileCount= *aktuální* max = *max* % = *procento* 
* Pokud je procento vyšší než 50%, zašle se e-mailERDDAP™správce a e-mail Všechno Na e-mailové adresy.

Pokud je procento 100%,ERDDAP™má strašný problém. Nedovol to.
Pokud je procento &gt;75%,ERDDAP™je blízko hrozným problémům. To není v pořádku.
Pokud je procento &gt;50%, je velmi možné, že nárůst způsobí, že procento dosáhne 100.
Pokud je procento někdy &gt; 50%, měli byste:
* Zvýšit maximální počet otevřených souborů povolených buď:
    * Dělat tyto změny pokaždé před zahájením tomcat (Dát je do souboru Tomcat startup.sh?) :
ulimit -Hn 16384
ulimit -Sn 16384
    * Nebo udělat trvalou změnu editací (jako kořen) /etc/security/ limits.conf a přidání řádků:
tomcat soft nofile 16384
tomcat hard nofile 16384
Tyto příkazy předpokládají, že uživatel běžící Tomcat se nazývá "tomcat."
Na mnoha variantách Linuxu musíte restartovat server, abyste tyto změny použili. Příkladem je pro obě možnosti "16384." Vyberte si číslo, které je podle vás nejlepší.
* RestartovatERDDAP. Operační systém uzavře všechny otevřené soubory.
         
### Nepodařené žádosti{#failed-requests} 
*    **Neobvyklá činnost: &gt;25% neúspěšných žádostí**   
Jako součást každé reloadDatasets, která je obvykle každých 15 minut,ERDDAP™se dívá na procento žádostí, které selhaly od posledního opětovného načteníDatasetů. Pokud je &gt;25%,ERDDAP™odešle e-mail naERDDAP™správce s předmětem "Neobvyklá činnost: &gt;25% žádostí selhalo." Tento e-mail obsahuje přehled v blízkosti spodního s názvem "Označovací IP adresa" (Selhalo)   (od posledního Major LoadDatasets) ". Hledej to. Říká vám IP adresu počítačů, které podávají nejvíce neúspěšné žádosti. Pak můžete hledat tyto IP adresy v\\[velkýRodič rodičů\\]/logs/[log.txt](#log)Slož a zjisti, jaký typ žádostí požadují.
    
Můžete použít IP číslo uživatele (například:[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) Zkusit zjistit, kdo nebo co je uživatel. Někdy vám to řekne docela přesně, kdo je uživatel. (Například, je to webová síť vyhledávače) . Většinu času ti to dává nápovědu. (Například, je to počítač Amazonaws, je z nějaké univerzity, je to někdo v určitém městě.) .
    
Při pohledu na aktuální požadavek, IP číslo a chybovou zprávu (všechny[log.txt](#log)) pro řadu chyb, můžete obvykle přijít na to, co se děje špatně. Podle mých zkušeností existují čtyři běžné příčiny mnoha neúspěšných žádostí:
    
1) Žádosti jsou škodlivé (např. hledání bezpečnostních nedostatků nebo podávání žádostí a jejich zrušení před jejich dokončením) . Měli byste použít&lt;requestBlacklist&gt; vdatasets.xmlna černou seznam těchto IP adres.
    
2) Hledač naivně zkouší URL uvedené vERDDAP™webové stránky a dokumenty ISO 19115. Například, existuje mnoho míst, která seznam základnyOPeNDAPURL, například, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , ke kterému má uživatel přidat typ souboru (např. .das, .dds, .html) . Ale vyhledávač to neví. A požadavek na základní URL selhal. S tím souvisí situace, kdy vyhledávač generuje bizarní požadavky nebo se snaží vyplnit formuláře, aby se dostal na "skryté" webové stránky. Ale vyhledávače často dělají špatnou práci, což vede k neúspěchu. Řešením je: vytvořit[roboti.txt](#robotstxt)Složka.
    
3) Někteří uživatelé spouští skript, který opakovaně žádá o něco, co tam není. Možná je to soubor, který kdysi existoval, ale teď je pryč. (dočasně nebo trvale) . Skripty to často nečekají a tak se s tím nevypořádejte inteligentně. Scénář stále klade požadavky a požadavky stále selhávají. Pokud můžete hádat, kdo je uživatel (z výše uvedeného čísla IP) , kontaktujte je a řekněte jim, že soubor dat již není k dispozici a požádejte je, aby změnili svůj skript.
    
4) Něco je opravdu špatně s některými soubory dat. Obvykle,ERDDAP™bude problémový datový soubor neaktivní. Někdy ne, takže všechny žádosti k němu vedou k chybám. Pokud ano, napravte problém s datovým souborem nebo (Pokud nemůžeš) nastavit datový soubor na[active="false"](/docs/server-admin/datasets#active). Samozřejmě to může vést k problému číslo 2.
    
Někdy chyby nejsou tak špatné, zejména pokudERDDAP™může zjistit chybu a reagovat velmi rychle (&lt;=1 ms). Takže se můžete rozhodnout, že nebudete jednat.
    
Pokud vše ostatní selže, existuje univerzální řešení: přidat IP číslo uživatele do [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) . Není to tak špatné nebo tak drastické řešení, jak by se mohlo zdát. Uživatel pak dostane chybovou zprávu, která říká, že byl na černé listině a říká jim, (váERDDAP™Správce) e-mailová adresa. Někdy vás uživatel kontaktuje a problém můžete vyřešit. Někdy vás uživatel nekontaktuje a další den uvidíte přesně stejné chování z jiného IP čísla. Seznam nových IP čísel a doufat, že nakonec dostanou zprávu. (Nebo je to tvůj Den svišťů, ze kterého nikdy neutečeš. Promiň.) 
    
### roboti.txt{#robotstxt} 
Vyhledávací společnosti používají web crawlery (např. Google Bot předseda) zkoumat všechny stránky na webu přidat obsah do vyhledávače. ProERDDAP™To je v podstatě dobré.ERDDAP™má spoustu odkazů mezi stránkami, takže plazíci najdou všechny webové stránky a přidají je do vyhledávačů. Pak budou uživatelé vyhledávačů schopni najít data na vašichERDDAP.
    
Bohužel, některé pavučiny (např. Google Bot předseda) nyní vyplňují a předkládají formuláře, aby našli další obsah. Pro webové stránky obchodu, to je skvělé. Ale tohle je hrozné.ERDDAP™protože to vede k **nekonečno** počet nežádoucích a zbytečných pokusů o vytažení skutečných údajů. To může vést k více žádostem o údaje než od všech ostatních uživatelů dohromady. A naplní vyhledávač pitomými, nesmyslnými podmnožinami skutečných dat.
    
Chcete-li říct web crawlers přestat vyplňovat formuláře a obecně nedívejte se na webové stránky, na které se nemusí dívat, musíte vytvořit textový soubor s názvem[roboti.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)v kořenovém adresáři vaší webové stránky hierarchie dokumentů tak, aby ji mohl kdokoliv vnímat jako např. http://*www.your.domain*/robots.txt .
Pokud vytváříte nové roboty. Txt soubor, to je dobrý začátek:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Ale nahradit *vaše.instituce.url* s vašímERDDAP's base URL.)   
To může trvat několik dní, než vyhledávači všimnout a pro změny nabýt účinku.
     
### sitemap.xml{#sitemapxml} 
Jako[ https://www.sitemaps.org ](https://www.sitemaps.org/)Webová stránka říká:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Vlastně odERDDAP™jeRESTful, hledač pavouci mohou snadno plazit vašeERDDAP. Ale dělají to častěji. (denně&#33;) než je nutné (měsíčně?) .

* Vzhledem k tomu, že každý vyhledávač může být plazit celý vášERDDAP™Každý den to může vést k mnoha zbytečným požadavkům.
* Takže...ERDDAP™generuje soubor sitemap.xml pro VášERDDAP™což říká vyhledávači, že vašeERDDAP™Stačí se plazit každý měsíc.
* Měli byste přidat odkaz naERDDAP's sitemap.xml na vaše[roboti.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)soubor:
Mapa stránek: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Pokud se nezdá, že by to dostávalo zprávu k plazičům, můžete o sitemap.xml souboru sdělit různé vyhledávače návštěvou těchto URL (ale změnit **Vaše instituce** zkratka nebo zkratka vaší instituce a **www.yoursite.org** ke svémuERDDAP's URL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I think) stačí ping každý vyhledávač jednou, navždy. Vyhledávač poté pravidelně rozpozná změny v sitemap.xml.
     
### Šíření dat / Distribuce dat Síť:PushaPullTechnologie{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normálně,ERDDAP™jedná jako zprostředkovatel: bere žádost od uživatele; získává data ze vzdáleného zdroje dat; reformuje data a posílá je uživateli.
*   [PullTechnologie](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™má také schopnost aktivně získávat všechna dostupná data ze vzdáleného zdroje dat a[uložení místní kopie údajů](/docs/server-admin/datasets#eddgridcopy).
*   [PushTechnologie](https://en.wikipedia.org/wiki/Push_technology): PoužitímERDDAP's[služby předplatného](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), ostatní datové servery mohou být oznámeny, jakmile jsou k dispozici nové údaje, aby mohly požadovat údaje (vytažením dat) .
*   ERDDAP's[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)a[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)podáníERDDAP's předplatné služby a[Systém vlajky](#flag)tak, aby bylo okamžitě oznámeno, jsou-li k dispozici nové údaje.
* Můžete je kombinovat s velkým účinkem:EDDGridKopírovat kolemEDDGridOd souboru Erddap (nebo zabalit EDDTableCopy kolem EDDTableFromErddap souboru) ,ERDDAP™automaticky vytvoří a udržuje místní kopii jinéERDDAP's datem.
* Vzhledem k tomu, že služby předplatného fungují, jakmile jsou k dispozici nová data, tlačí technologie šíří data velmi rychle (během sekund) .

Tato architektura dává každýERDDAP™správce odpovědný za určení, kde jsou údaje pro nějERDDAP™pochází.

* OstatníERDDAP™Správci mohou udělat totéž. Není třeba koordinovat mezi správci.
* Pokud mnohoERDDAP™Správci se vzájemně spojujíERDDAPs, je vytvořena síť pro distribuci dat.
* Údaje budou rychle, efektivně a automaticky šířeny ze zdrojů dat (ERDDAPs a další servery) do míst pro přerozdělování dat (ERDDAPán) kdekoliv v síti.
* ZadánoERDDAP™může být jak zdrojem údajů pro některé datové soubory, tak přerozdělovacím místem pro jiné datové soubory.
* Výsledná síť je zhruba podobná distribučním sítím založeným s programy jako[Unidata's IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), ale méně pevně strukturované.
         
### Bezpečnost, ověřování a autorizace{#security-authentication-and-authorization} 
Standardně,ERDDAP™běží jako zcela veřejný server (podáníhttpnebohttps) bez přihlášení ([ověření](https://en.wikipedia.org/wiki/Authentication)) systém a žádná omezení přístupu k údajům ([povolení](https://en.wikipedia.org/wiki/Authorization)) .

#### Bezpečnost{#security} 
Pokud chcete omezit přístup k některým nebo všem souborům dat na některé uživatele, můžete použítERDDAPVestavěný bezpečnostní systém. Při používání bezpečnostního systému:

*   ERDDAP™použití[kontrola přístupu založený na úloze](https://en.wikipedia.org/wiki/Role-based_access_control).
    * TheERDDAP™Správce definuje uživatele pomocí [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag indatasets.xml. Každý uživatel má uživatelské jméno, heslo (pokud autentizace=custom) , a jednu nebo více rolí.
    * TheERDDAP™Správce definuje, které role mají přístup k danému souboru dat prostřednictvím [&lt;accessTo&gt;] (/docs/server-admin/datasets#accessibleto) tag indatasets.xmlpro všechny soubory, které by neměly mít přístup veřejnosti.
* Přihlašovací status uživatele (a odkaz na přihlášení/odhlášení) bude zobrazeno v horní části každé webové stránky. (But a logged in user will seem toERDDAP™nebýt přihlášen, pokud používáhttpURL.) 
* Pokud&lt;baseUrl&gt;, které jste zadat ve svém nastavení.xml je **http** URL, uživatelé, kteří nejsou přihlášeni, mohou použítERDDAP's **http** URL. Pokud&lt;baseHttpsUrl&gt; je také uvedeno, uživatelé, kteří nejsou přihlášeni mohou také použíthttpsURL.
* Pouze HTTPS -- Pokud&lt;baseUrl&gt;, které jste zadat ve svém nastavení.xml je **https** URL, jsou podporováni uživatelé, kteří nejsou přihlášeni (nevynucené) k použitíERDDAP's **https** URL -- všechny odkazy naERDDAP™webové stránky budou odkazovat nahttpsURL.
    
Chcete-li přinutit uživatele používathttpsURL, přidat Redirect permanentní řádek uvnitř&lt;VirtualHost \\*:80&gt; sekce v konfiguračním souboru vašeho Apače (obvyklehttpd.conf) např.
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Jestli chcete, existuje další způsob, jak přinutit použitíhttps: [HTTP Přísná bezpečnost dopravy (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). K jeho použití:
    
    1. Povolit modul hlaviček Apache: a2enmod hlavičky
    2. Do směrnice HTTPS VirtualHost přidejte další hlavičku. Max-věk se měří v sekundách a může být nastaven na nějakou dlouhou hodnotu.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Upozorňujeme, že tato hlavička je platná pouze na HTTPS VirtualHost.
    
Důvod nenutit uživatele k použitíhttpsURL je: podkladový odkaz SSL/TLS vyžaduje čas k vytvoření a pak trvá čas na šifrování a dešifrování všech informací přenášených mezi uživatelem a serverem. Ale některé instituce vyžadujíhttpsJen.
    
* Uživatelé, kteří jsou přihlášeni, musí používatERDDAP's **https** URL. Používají- lihttpURL, zdá se, žeERDDAP™nebýt přihlášen. To zajišťuje soukromí komunikace a pomáhá předcházet[Session hacking and sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Každý, kdo není přihlášen, má přístup k veřejným datům. Ve výchozím nastavení se soukromé soubory nezobrazují v seznamech souborů dat, pokud není uživatel přihlášen. Pokud správce má nastaveno nastavení.xml&lt;listPrivateDatasets&gt; to true, objeví se. Pokusy požádat o údaje ze soukromých datových souborů (pokud uživatel zná URL) bude přesměrováno na přihlašovací stránku.
* Každý, kdo je přihlášen, bude schopen vidět a požadovat údaje z jakéhokoliv veřejného datového souboru a jakéhokoli soukromého datového souboru, ke kterému jim jejich úloha umožňuje přístup. Ve výchozím nastavení se soukromé soubory dat, ke kterým uživatel nemá přístup, nezobrazují v seznamech souborů dat. Pokud správce má nastaveno nastavení.xml&lt;listPrivateDatasets&gt; to true, objeví se. Pokusy požadovat data ze soukromých souborů dat, ke kterým uživatel nemá přístup, budou přesměrovány na přihlašovací stránku.
* TheRSSinformace pro plně soukromé datové soubory jsou dostupné pouze uživatelům (aRSSčtenáři) kteří jsou přihlášeni a oprávněni používat tento datový soubor. To děláRSSnení příliš užitečné pro plně soukromé soubory údajů.
    
Pokud je datový soubor soukromý, ale jeho [&lt;grafyPřístupnéTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) je nastaven na veřejnost, soubor údajůRSSje přístupná každému.
    
* Předplatné e-mailu lze nastavit pouze tehdy, má-li uživatel přístup k datovému souboru. Pokud se uživatel přihlásí k soukromému datovému souboru, předplatné nadále funguje poté, co se uživatel odhlásí.

##### Bezpečnost nastavení{#setup-security} 
Nastavit bezpečnostní/autentizační/autorizační systém:

* Do the standardERDDAP™ [počáteční nastavení](/docs/server-admin/deploy-install).
* In[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Přidat/ změnit&lt;autenticita _BAR_ hodnota z ničeho na zakázku (Nepoužívej to.) , e-mail (Nepoužívej to.) , Google (doporučené) , orcid (doporučené) , nebo oauth2 (což je google+ord, doporučeno) . Viz připomínky k těmto možnostem níže.
    * Přidat/ změnit&lt;baseHttpsUrl &gt; hodnota.
    * Vložit/nekomentovat&loginInfo;v&lt;spustitBodyHtml &gt; pro zobrazení přihlašovacích/odchozích informací uživatele v horní části každé webové stránky.
* Pro testování na vašem osobním počítači,[postupujte podle těchto pokynů konfigurovat tomcat na podporu SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (základ prohttpsspojení) vytvořením internetového obchodu s[samopodepsané osvědčení](https://en.wikipedia.org/wiki/Self-signed_certificate)a úpravou *tomcat* /conf/server.xml odblokovat konektor pro port 8443. Na Windows, můžete potřebovat přesunout .keystore z "c:\\ Uživatelé\\ *Ty* \\.keystore" to "c:\\Uživatelé\\\Default User\\.keystore" nebo "c:\\.keystore" (viz *tomcat* /logs/catalina. *dnes* .log, pokud aplikace nenačítá nebo uživatelé nemohou vidět log v stránce) . Když se přihlásíte, můžete vidět, kdy vyprší certifikát .keystore.
    
U veřejně přístupného serveru, namísto použití vlastního podpisu certifikátu, se důrazně doporučuje koupit a nainstalovat certifikát podepsaný[certifikační orgán](https://en.wikipedia.org/wiki/Certificate_authority), protože to dává vašim klientům větší jistotu, že jsou skutečně spojení s vašíERDDAP™, ne muž ve středu verze vašehoERDDAP. Mnoho prodejců prodává digitální certifikáty. (Hledej web.) Nejsou drahé.
    
* Na Linux počítačích, pokud Tomcat běží v Apache, upravte /etc/httpd/conf.d/ssl.conf soubor umožňující provoz HTTPS do/zERDDAP™bez požadavku :8443 číslo portu v URL:
    1. Upravit existující&lt;VirtualHost&gt; tag (pokud nějaký existuje) , nebo přidat jeden na konci souboru tak, aby měl alespoň tyto řádky:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Poté restartujte Apache: /usr/sbin/apachectl - K elegantní. (ale někdy je v jiném adresáři) .
* In *tomcat* /conf/server.xml, odkomentovat port=8443&lt;Konektor &gt; značka:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
a změnit umístění certifikátuKeystoreFile.
##### Autorizace{#authorization} 
*   [Indatasets.xml, vytvořit](#authorization)[&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag pro každého uživatele s uživatelským jménem, heslo (pokud autorizace=custom) a informace o rolích. Toto je autorizační částERDDAPJe to bezpečnostní systém.
     
* Indatasets.xml, přidat [&lt;accessTo&gt;] (/docs/server-admin/datasets#accessibleto) tag na každý soubor dat, který by neměl mít přístup veřejnosti.&lt;accessibleTo&gt; umožňuje určit, které role mají přístup k tomuto datovému souboru.
     
* Restartujte Tomcat. Problémy? Zkontroluj záznamy Tomcat.
     
* Zkontroluj si práci&#33; Jakákoliv chyba by mohla vést k bezpečnostní chybě.
     
* Zkontrolujte, zda přihlašovací stránka používáhttps  (nehttp) . Pokusy o přihlášení přeshttpje třeba automaticky přesměrovat nahttpsa přístav 8443 (i když číslo portu může být skryto prostřednictvím Apache proxy) . Možná budete muset pracovat se správcem sítě, abyste umožnili přístup k portu 8443 na vašem serveru.
     
* Můžete změnit&lt;uživatel &gt; a&lt;AvailableTo&gt; značky kdykoliv. Změny budou aplikovány při dalším pravidelném opětovném načtení libovolného datového souboru nebo ASAP, pokud použijete[vlajka](#flag).

##### Ověření{#authentication} 
[ **Ověření (přihlášení) ** ](#authentication)  
Pokud nechcete umožnit uživatelům přihlásit se, nespecifikujte hodnotu pro&lt;autentizace&gt; v setup.xml.
Pokud chcete uživatelům povolit přihlásit se, musíte zadat hodnotu pro&lt;autentizace&gt;. V současné době,ERDDAP™Podpora
[vlastní](#custom)  (Nepoužívej to.) ,
[e-mail](#email)  (Nepoužívej to.) ,
[google](#google)  (doporučené) ,
[orcid](#orcid)  (doporučené) a
[oauth2color](#oauth2)  (doporučené) pro metodu ověřování.
Chcete-li povolit přihlášení, důrazně doporučujeme Google, orcid, nebo Oauth2 možnosti, protože vás osvobodit od ukládání a manipulaci s hesly uživatele (potřebné pro vlastní potřebu) a jsou bezpečnější než e-mailová volba. Pamatujte, že uživatelé často používají stejné heslo na různých stránkách. Takže mohou používat stejné heslo pro vašeERDDAP™jako v jejich bance. To dělá jejich heslo velmi cenné - mnohem cennější pro uživatele než jen data, která požadují. Takže musíte udělat co nejvíc, abyste hesla udrželi v tajnosti. To je velká zodpovědnost. E-mail, google, orcid, a Oauth2 možnosti postarat se o hesla, takže nemusíte shromažďovat, ukládat, nebo pracovat s nimi. Takže jsi osvobozen od této odpovědnosti.

Všechny&lt;autentizace &gt; možnosti použití a[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)na počítači uživatele, takže prohlížeč uživatele musí být nastaven tak, aby umožňoval cookies. Pokud uživatel děláERDDAP™žádosti z počítačového programu (ne prohlížeč) S cookies a ověřováním je těžké pracovat. To je běžný problém se všemi ověřovacími systémy. Promiň.

Podrobnosti o&lt;ověření _BAR_ možnosti jsou:

###### Vlastní{#custom} 
Na zakázku.ERDDAP's vlastním systémem pro přihlášení uživatelů zadáním svého uživatelského jména a hesla ve formuláři na webové stránce. Pokud se uživatel pokusí a nepřihlásí 3x během 10 minut, uživatel je blokován z pokusu se přihlásit po dobu 10 minut. To brání hackeři jednoduše zkoušet miliony hesel, dokud nenajdou to správné.

To je poněkud bezpečné, protože Uživatelské jméno a heslo jsou přenášeny přeshttps  (nehttp) , Ale autentizace=google, orcid, nebo oauth2 jsou lepší, protože vás osvobodit od nutnosti zvládnout hesla. Vlastní přístup vyžaduje, abyste sbírali jméno uživatele a hašiš jejich Heslo (Použij svůj telefon&#33; e-mail není bezpečný&#33;) a uložit je dodatasets.xmlv [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) Tagy.

S vlastní volbou se nikdo nemůže přihlásit, dokud (váERDDAP™Správce) vytvořit&lt;user&gt; tag pro uživatele s uvedením jména uživatele jako uživatelské jméno, hash dist jejich hesla jako heslo a jejich rolí.

Nedoporučuje se
Vzhledem k nešikovnosti generování a přenosu hash dist hesla uživatele a vzhledem k rizikům spojeným sERDDAP™držení hašišových tráví hesla, tato volba se nedoporučuje.

Pro zvýšení bezpečnosti této možnosti:

* Musíte zajistit, že ostatní uživatelé na serveru (tj. uživatelé Linuxu, nikoliERDDAP™uživatelé) nelze číst soubory v adresáři Tomcat (zvláštědatasets.xmlSoubor&#33;) neboERDDAP's big Parent Directory.
Na Linuxu, jako user=tomcat, použijte:
Chmod - R g-rwx *velkýRodič rodičů*   
Chmod - R o-rwx *velkýRodič rodičů*   
Chmod - R g-rwx *tomcat Directory*   
Chmod - R o-rwx *tomcat Directory*   
     
* Používejte UEPSHA256 pro&lt;heslemEncoding&gt; in setup.xml.
     
* Pomocí metody jako-secure-as-possible předat hash dist uživatelského hesla z uživatele doERDDAP™Správce (Telefon?) .
         
###### e-mail{#email} 
Možnost autentizace e-mailem používá e-mailový účet uživatele k ověření totožnosti uživatele (zasláním e-mailu se zvláštním odkazem, ke kterému mají přístup, aby se mohli přihlásit) . Na rozdíl od jiných e-mailů, kteréERDDAP™posílá,ERDDAP™nepíše tyto pozvánky e-maily do souboru e-mail log, protože obsahují důvěrné informace.
Teoreticky to není moc bezpečné, protože e-maily nejsou vždy zašifrované, takže špatný člověk se schopností zachytit e-maily by mohl zneužít tento systém pomocí platné uživatelské e-mailové adresy a zachytit pozvánku e-mail.
V praxi, pokud jste nastavitERDDAP™použít e-mailový účet Google k odeslání e-mailů, a pokud jste nastavit, aby využili jednu z možností TLS pro připojení, a pokud uživatel má e-mailový účet Google, to je poněkud bezpečné, protože e-maily jsou zašifrované celou cestu odERDDAP™uživateli.

Pro zvýšení bezpečnosti této možnosti:

* Ujistěte se, že ostatní uživatelé na serveru (tj. uživatelé Linuxu, nikoliERDDAP™uživatelé) nemůže číst soubory v adresáři Tomcat neboERDDAP's big Parent Directory.
Na Linuxu, jako user=tomcat, použijte:
Chmod - R g-rwx *velkýRodič rodičů*   
Chmod - R o-rwx *velkýRodič rodičů*   
Chmod - R g-rwx *tomcat Directory*   
Chmod - R o-rwx *tomcat Directory*   
     
* Nastavit věci pro získání konečné zabezpečení pro e-maily odeslané odERDDAP™uživatelům. Například můžete vytvořit systém zaměřený na Google pouze vytvořením&lt;user&gt; značky pro Google-managed emailové adresy a nastavenímERDDAP™používání e-mailového serveru Google prostřednictvím zabezpečeného/TLS připojení: ve vašem setup.xml použijte např.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Nedoporučuje se
Autentizace e-mailu se nedoporučuje. Prosím použijte místo toho Google, Orcid nebo Oauth2.

Stejně jako u Google, Orcid, a Oauth2 možnosti, e-mail je velmi výhodné proERDDAP™Správci -- nemusíte se nikdy zabývat hesly nebo jejich hašišemi. Vše, co potřebujete vytvořit, je [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag pro uživatele indatasets.xmlje e-mailová adresa uživatele, kteráERDDAP™používá jako uživatelské jméno. (Příznak hesla se nepoužívá při autentizaci=email, google, orcid nebo oauth2.) 

S možností e-mailu, pouze uživatelé, kteří mají&lt;tag uživatele &gt;datasets.xmlmůže zkusit se přihlásit doERDDAP™poskytnutím své e-mailové adresy a kliknutím na odkaz v e-mailu, žeERDDAP™Pošlete je.

ERDDAP™považuje e-mailové adresy za případ-necitlivý. To dělá tím, že převést e-mailové adresy zadáte (v&lt;Uživatelské &gt; značky) nebo uživatelé zadejte (na přihlašovacím formuláři) do jejich malé verze.

Nastavit autentizaci=email:

1. Ve vašem nastavení. xml, změnit&lt;baseHttpsUrl&gt; hodnota značky.
Pro experimentování/pracování na vašem osobním počítači použijte
     https://localhost:8443   
Pro vaši veřejnost.ERDDAP™, použití
     https://*your.domain.org*:8443   
nebo bez: 8443 pokud používáte Apač[proxypass](/docs/server-admin/deploy-install#proxypass)aby číslo přístavu nebylo potřeba.
     
2. Ve vašem nastavení. xml, změnit&lt;ověření _BAR_ Hodnota značky na email:
```
    <authentication>email</authentication>  
```

3. Ve svém nastavení.xml, ujistěte se, že e-mailový systém je nastaven přes všechny&lt;e-mail... &gt; značky, abyERDDAP™může posílat e-maily. Pokud je to možné, nastavte to pro použití zabezpečeného spojení (SSL / TLS) na e-mailový server.
     
4. Ve vašemdatasets.xml, vytvořit [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) značky pro každého uživatele, který bude mít přístup k soukromým souborům dat.
Použijte e-mailovou adresu uživatele jako uživatelské jméno v záložce.
V uživatelském záložce nespecifikujte atribut hesla.
     
5. RestartovatERDDAP™tak, aby změny nastavení.xml adatasets.xmlnabýt účinku.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **google** ](#google),[ **orcid** ](#orcid)a[ **oauth2color** ](#oauth2)   (doporučené)   
Všechny tři tyto možnosti jsou doporučenéERDDAP™Možnosti ověřování. Jsou to všechny nejbezpečnější možnosti. Ostatní možnosti mají výrazně slabší bezpečnost.
     
###### Google{#google} 
* Možnost autentizace Google používá[Podpis V Google](https://developers.google.com/identity/gsi/web/guides/overview), což je provádění[Auth 2.0 ověřovací protokol](https://oauth.net/2/).ERDDAP™uživatelé se zaregistrují do svého e-mailového účtu Google, včetně účtů spravovaných společností Google, například@noaa.govúčty. To umožňujeERDDAP™k ověření totožnosti uživatele (jméno a e-mailová adresa) a přístup ke svému profilu obrazu, ale nedáváERDDAP™přístup k jejich e-mailům, jejich Google Drive nebo jakékoli jiné soukromé informace.
    
ProERDDAP™v2.22 a nižší,ERDDAP™používá se "Přihlášení Google." Podle Google je tento systém po 31. březnu 2023 deprecován. Pokud jste to ještě neudělali, přepněte naERDDAP™v2.23+ použít nový ověřovací systém založený na "Přihlásit se s Google."
    
ProERDDAP™v2.23 instance s nakonfigurovanou Content-Becurity-Policy a pomocí Google Authentication musíte přidat https://accounts.google.com na seznam povolených skriptů-src (nebo skript-src-elem) .ERDDAP™používání https://apis.google.com Takže pokud to máte povolené, můžete to nyní odstranit.
    
ProERDDAP™v2.24+ můžete také přidat https://accounts.google.com/gsi/style na stlye-src a https://accounts.google.com/gsi/ pro připojení-src. Pro skript-src můžete nyní použít https://accounts.google.com/gsi/client.
 
    
Pro více informací můžete přejít na[Google stránka](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)o konfiguraci CSP. Pokud máte nějaké otázky, kontaktujte Chris.Johna v Noaa.gov.
         
###### Orcid{#orcid} 
* Možnost ověření orcidu používá[Autentizace orcidu](https://members.orcid.org/api/integrate/orcid-sign-in), což je provádění[Auth 2.0 ověřovací protokol](https://oauth.net/2/).ERDDAP™uživatelé se podepisují[Orcid účet](https://members.orcid.org/api/integrate/orcid-sign-in), který je běžně používán výzkumnými pracovníky k identifikaci. To umožňujeERDDAP™k ověření totožnosti uživatele Orcid a získat jejich číslo účtu Orcid, ale nedáváERDDAP™přístup k dalším informacím o účtu Orcid.

###### Oauth2color{#oauth2} 
* Volba Oauth2 umožňuje uživatelům přihlásit se buď svým účtem Google nebo jejich účtem Orcid.

Google, orcid a Oauth2 možnosti jsou nástupci Openid možnosti, která byla ukončena poERDDAP™verze 1.68, která byla založena na verzi otevřené Identifikace, která je nyní zastaralá. Přepněte prosím na Google, orcid nebo Oauth2.

Tyto možnosti jsou velmi výhodné proERDDAP™Správci -- nemusíte se nikdy zabývat hesly nebo jejich hašišemi. Vše, co potřebujete vytvořit, je [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag pro uživatele indatasets.xmlkterý určuje e-mailovou adresu uživatele Google nebo číslo účtu Orcid jako atribut uživatelského jména. (Příznak hesla se nepoužívá při autentizaci=email, google, orcid nebo oauth2.) 

S těmito možnostmi se může každý přihlásitERDDAP™Přihlášením do svého e-mailového účtu Google nebo účtu Orcid, ale nikdo nebude mít právo na přístup k soukromým souborům dat, dokud (váERDDAP™Správce) vytvořit&lt;user &gt; tag, s uvedením jejich Google e-mailové adresy nebo čísla účtu Orcid jako uživatelské jméno, a upřesnění jejich rolí.

ERDDAP™považuje e-mailové adresy za případ-necitlivý. To dělá tím, že převést e-mailové adresy zadáte (v&lt;Uživatelské &gt; značky) nebo uživatelé zadejte (na přihlašovacím formuláři) do jejich malé verze.

Chcete-li nastavit Google, orcid, nebo Oauth2 ověření:

* Ve vašem nastavení. xml, změnit&lt;baseHttpsUrl&gt; hodnota značky.
Pro experimentování/pracování na vašem osobním počítači použijte
     https://localhost:8443   
Pro vaši veřejnost.ERDDAP™, použití
     https://*your.domain.org*:8443   
nebo lepší, bez:8443 pokud používáte Apache[proxypass](/docs/server-admin/deploy-install#proxypass)aby číslo přístavu nebylo potřeba.
     
* Ve vašem nastavení. xml, změnit&lt;ověření _BAR_ Hodnota značky pro google, orcid, nebo oauth2, například:
```
    <authentication>oauth2</authentication>  
```
###### Nastavení Google{#google-setup} 
* Pro možnosti Google a Oauth2:
Postupujte podle níže uvedených pokynů pro nastavení autentizace Google pro vašeERDDAP.
     
    1. Pokud nemáte e-mailový účet Google,[vytvořit](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Následujte[Tyto pokyny](https://developers.google.com/identity/sign-in/web/devconsole-project)vytvořit projekt Google Developers Console a získat ID klienta.
        
Když Google formulář žádá o oprávněníJavaPůvod skriptu, zadejte hodnotu z&lt;baseHttpsUrl&gt; z vašeho osobního počítačeERDDAP™setup.xml, např.
         https://localhost:8443   
Na druhém řádku přidejte&lt;baseHttpsUrl&gt; z vaší veřejnostiERDDAP™setup.xml, např.
         https://*your.domain.org*:8443
 
        
Nespecifikujte žádné autorizované přesměrování URI.
        
Když vidíte ID klienta pro tento projekt, zkopírujte jej a vložte do setup.xml (obvykle jen níže)&lt;autentizace &gt; být řádné, ale umístění ve skutečnosti nezáleží), v&lt;GoogleClientID &gt; tag, např.
        &lt;GoogleClientID&gt; *yourClientID* &lt;/googleClientID &gt;
ID klienta bude řetězec asi 75 znaků, pravděpodobně začíná několika číslicemi a končí .apps.googleusercontent.com .
         
        
    3. Ve vašemdatasets.xml, vytvořit [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag pro každého uživatele, který bude mít přístup k soukromým souborům dat. Pro atribut uživatelského jména v záložce:
        
        * Pro uživatele, kteří se přihlásí s Google, použijte e-mailovou adresu uživatele Google.
        * Pro uživatele, kteří se přihlásí s orcidem, použijte číslo účtu Orcid uživatele (s pomlčkami) .
        
Nespecifikujte atribut hesla pro uživatelský tag.
         
    4. RestartovatERDDAP™tak, aby změny nastavení.xml adatasets.xmlnabýt účinku.
         
###### Nastavení orcidu{#orcid-setup} 
* Pro možnosti orcid a oauth2:
Postupujte podle níže uvedených pokynů pro nastavení autentizace Orcid pro vašeERDDAP.
     (Podrobnosti viz[Autentizační dokumentace Orcid API](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Pokud nemáte účet Orcid,[vytvořit](https://orcid.org/signin)  
         
    2. Přihlášení do Orcidu[ https://orcid.org/signin ](https://orcid.org/signin)pomocí osobního účtu Orcid.
         
    3. Klikněte na "Developer Tools" (pod "Pro výzkumné pracovníky" nahoře) .
         
    4. Klikněte na "Register for the free ORCID public API." Zadejte tyto informace:
Jméno:ERDDAP™v\\[Vaše organizace\\]  
Internetová stránka:\\[VašeERDDAP's doménou\\]  
Popis:ERDDAP™je vědecký datový server. Uživatelé potřebují ověřit pomocí Google nebo Orcidu přístup k neveřejným souborům dat.
Přesměrování URI:\\[VašeERDDAP's doménou\\]/erddap/loginOrcid.html
         
    5. Klikněte na ikonu Uložit (Vypadá to jako 3,5" disk&#33;) .
Pak můžete vidět ID klienta ORCID APP a ORCID Client Secret.
         
    6. Zkopírujte a vložte ID klienta aplikace ORCID (který začne s "APP-") do nastavení. xml v&lt;orcidClientID &gt; tag, např.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Zkopírovat a vložit ORCID Client Secret (malé alfanumerické znaky s pomlčkami) do nastavení. xml v&lt;tag OrcidClientSecret&gt;, např.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Ve vašemdatasets.xml, vytvořit [&lt;uživatel &gt;] (/docs/server-admin/datasets#user) tag pro každého uživatele, který bude mít přístup k soukromým souborům dat. Pro atribut uživatelského jména v záložce:
        
        * Pro uživatele, kteří se přihlásí s Google, použijte e-mailovou adresu uživatele Google.
        * Pro uživatele, kteří se přihlásí s orcidem, použijte číslo účtu Orcid uživatele (s pomlčkami) .
        
Nespecifikujte atribut hesla pro uživatelský tag.
         
    9. RestartovatERDDAP™tak, aby změny nastavení.xml adatasets.xmlnabýt účinku.
             

###### Přihlásit se tak či onak{#log-in-either-way} 
Pokud používáte Google, orcid, nebo Oauth2 možnosti ověřování, a Google Přihlásit se nebo Orcid authentication API náhle přestane pracovat (z jakéhokoli důvodu) nebo přestane pracovat jakoERDDAP™očekává, uživatelé nebudou moci přihlásit se do vašehoERDDAP. Jako dočasný (nebo trvalé) řešení, můžete požádat uživatele, aby se zaregistrovali s jiným systémem (získat e-mailový účet Google nebo získat účet Orcid) . K tomu:

1. Změňte&lt;autentizační značka&gt; tak, aby umožňovala další ověřovací systém. Možnost Oauth2 umožňuje uživatelům přihlásit se s oběma systémy.
2. Duplikovat každý z&lt;user&gt; značky a změnit atribut uživatelského jména z e-mailové adresy Google na odpovídající číslo účtu Orcid (nebo naopak) , ale udržet role atribut stejné.

###### OpenId{#openid} 
ERDDAP™již nepodporuje možnost openid autentizace, která byla založena na verzi otevřené Identifikace, která je nyní zastaralá. Prosím použijte Google, orcid, nebo Oauth2 možnosti místo.

###### ZÁKLADNÍ{#basic} 
ERDDAP™nepodporuje základní ověření, protože:
* BASIC se zdá být zaměřen na předem definované webové stránky, které potřebují bezpečný přístup nebo přikrývku k celému webu, aleERDDAP™umožňuje (omezený přístup) Soubory údajů, které mají být přidávány během letu.
* BASIC autentizace nenabízí způsob, jak se uživatelé odhlásit&#33;
* Je známo, že základní ověření není bezpečné.

##### Bezpečné zdroje dat{#secure-data-sources} 
Pokud má soubor dat mít omezený přístup kERDDAP™uživatelé, zdroj dat (odkudERDDAP™získává data) nesmí být veřejně přístupný. Tak jak?ERDDAP™získat data pro data s omezeným přístupem? Některé možnosti jsou:

*   ERDDAP™může sloužit data z místních souborů (například prostřednictvím EDDTable z Akt neboEDDGridFromFiles) .
     
*   ERDDAP™může být v[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) a zdroj dat (např.OPeNDAPserver nebo databáze) může být za[firewall](https://en.wikipedia.org/wiki/Firewall), kde je přístupnýERDDAP™ale ne veřejnosti.
     
* Zdroj dat může být na veřejných internetových stránkách, ale vyžaduje přihlášení pro získání dat. Dva typy souborů údajů, kteréERDDAP™může přihlásit k přístupu jsou[EDDtableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)a[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Podpora těchto souborů dat (a měl by vždy používat) názvy uživatelů (vytvořitERDDAP™uživatel, který má pouze práva ke čtení) , hesla, SSL připojení a další bezpečnostní opatření.
    
Ale obecně, v současnosti,ERDDAP™nemůže se vypořádat s těmito zdroji dat, protože nemá žádná ustanovení pro přihlášení ke zdroji dat. To je důvod, proč přístup k[EDDGridOdErddap a EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Data nemohou být omezena. V současné době místníERDDAP™nemá žádný způsob, jak se přihlásit a získat přístup k metadatům ze vzdálenéhoERDDAP. A dát "odstranit"ERDDAP™za firewall a odstranění tohoto datového souboru je přístupné Omezení problém nevyřeší: protože požadavky uživatelů na EDDXxx OdErddap data je třeba přesměrovat na vzdálenýERDDAP™, ovladačERDDAP™musí být přístupné.
    
#### Obrana proti hackerům{#defenses-against-hackers} 
Jsou zlí hackeri, kteří se snaží využít bezpečnostních slabin v serverovém softwaru jakoERDDAP.ERDDAP™následuje společné bezpečnostní rady mít několik vrstev obrany:

* Omezená práva... Jednou z nejdůležitějších obran je spustit Tomcat přes uživatele jménem Tomcat, který nemá heslo (takže se nikdo nemůže přihlásit jako tento uživatel) a má omezená práva na souborový systém (např. přístup k údajům pouze pro čtení) . VizERDDAP's pokyny pro[nastavení tomcat](/docs/server-admin/deploy-install#tomcat).
* Těžké využití - Obecně,ERDDAP™je postaven pro těžké použití, včetně skriptů, které činí desítky tisíc žádostí, jeden po druhém. Je to těžké proERDDAP™aby se současně otevřela těžkému legitimnímu použití a chránila se před zneužíváním. Někdy je těžké rozlišit těžké legitimní použití, nadměrné legitimní použití a nelegitimní použití (a někdy je to opravdu snadné) . Mimo jiné obrany,ERDDAP™vědomě neumožňuje jediné žádosti použít nadměrný zlomek zdrojů systému (není-li systém jinak aktivní) .
* Identifikovat problémové uživatele - pokudERDDAP™zpomaluje nebo mrzne (Možná proto, že naivní uživatel nebo robot spouští více skriptů k podání více žádostí současně nebo možná kvůli špatnému člověku[Odmítnutí služby](https://en.wikipedia.org/wiki/Denial-of-service_attack)Útok) , můžete se podívat na[Denní zpráva e-mail](#daily-report)  (a častější identické informace v[ERDDAP™soubor záznamu](#log)) který zobrazuje počet žádostí podaných nejaktivnějšími uživateli (viz IP adresa příjemce (Povoleno) ") .ERDDAP™také posílá e-maily správci, kdykoli je["Neobvyklá činnost: &gt;25% žádostí selhalo"](#failed-requests). Pak se můžete podívat doERDDAP™log soubor vidět povahu jejich požadavků. Pokud máte pocit, že někdo dělá příliš mnoho žádostí, bizarní žádosti (Nevěřil bys, co jsem viděl, možná bys) , nebo požadavky útočného typu, můžete přidat jejich IP adresu na černé listině.
* Černý seznam... Můžete přidat IP adresu problematických uživatelů, robotů a[Odmítnutí služby](https://en.wikipedia.org/wiki/Denial-of-service_attack)útočníci naERDDAP [černý seznam](/docs/server-admin/datasets#requestblacklist), aby budoucí žádosti od nich byly okamžitě zamítnuty. Toto nastavení je vdatasets.xmltakže můžete rychle přidat IP adresu do seznamu a pak[vlajka](#flag)soubor údajů tak, abyERDDAP™okamžitě zjistí a použije změnu. Chybová zpráva poslaná uživatelům černého seznamu je vybízí, aby kontaktovaliERDDAP™Správce, pokud mají pocit, že byli omylem uvedeni na černé listině. (Z našich zkušeností několik uživatelů nevědělo, že spouští více skriptů současně, nebo že jejich skripty dělají nesmyslné požadavky.) 
* Bezpečnost datové sady - Některé typy souborů dat (zejména EDDtableFromDatabase) představovat dodatečná bezpečnostní rizika (např. injekce SQL) a mají vlastní bezpečnostní opatření. Viz informace o těchto typech souborů údajů v[Práce sdatasets.xmlSoubor](/docs/server-admin/datasets), zejména[EDDTableFromDatabase security](/docs/server-admin/datasets#database-security).
* Bezpečnostní audit... I kdyžNOAAOchranka IT odmítla naše žádosti o skenování po celá léta, nyní běžně skenují můj (Bobův)  ERDDAP™instalace. I když počáteční skeny našly nějaké problémy, které jsem pak opravit, následné skenování nenašly problémy sERDDAP. Snímky se obávají spousty věcí: zejména odtabledappožadavky vypadají jako SQL požadavky, mají obavy o SQL vstřikovací zranitelnosti. Ale tyto obavy jsou neopodstatněné, protožeERDDAP™vždy parses a validuje dotazy a pak samostatně staví SQL dotaz tak, aby se zabránilo zranitelnosti vstřiku. Další věc, na kterou si občas stěžují je, že našeJavaverze nebo Tomcat verze nejsou tak aktuální, jak chtějí, takže je aktualizujeme v reakci. Předtím jsem se nabídl, že lidem ukážu bezpečnostní zprávy, ale teď mi řekli, že to nemůžu udělat.

#### Otázky? Návrhy?{#questions-suggestions} 
Máte-li jakékoli otázky kERDDAP's bezpečnostní systém nebo mají nějaké otázky, pochybnosti, obavy, nebo návrhy o tom, jak je nastaven, viz náš[oddíl o získání dodatečné podpory](/docs/intro#support).
    

## Věci, které nepotřebuješ vědět{#things-you-dont-need-to-know} 

To jsou detaily, které nepotřebujete vědět, dokud nebude potřeba.

### DruhýERDDAP™ {#second-erddap} 
*    **Nastavuji druhýERDDAP™pro zkoušení/vývoj**   
Pokud to chcete udělat, existují dva přístupy:
    *    (Nejlepší) Nainstalujte Tomcat aERDDAP™na jiném počítači než počítači, který má vaši veřejnostERDDAP. Pokud používáte svůj osobní počítač:
        1. Proveďte instalaci krok za krokem. Získat Tomcat nahoru a běžet jako první.
Když Tomcat běží, manažer Tomcat by měl být na
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (nebo možná[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. NainstalovatERDDAP.
        3. Nepoužívejte ProxyPass k odstranění čísla portu zERDDAP™URL.
        4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), nastavit základnuUrl na http://127.0.0.1:8080
 
        5. Až začneš tohle.ERDDAP™, měli byste být schopni vidět na
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (nebo možná[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Druhý Tomcat{#second-tomcat} 
*    (Druhý nejlepší) Nainstalujte další Tomcat na stejný počítač jako vaši veřejnostERDDAP.
    1. Proveďte instalaci krok za krokem. Získat Tomcat nahoru a běžet jako první.
Změnit všechna čísla portu spojená s druhým Tomcat (např. změna 8080 až 8081)   (viz[Tomcat Oddíl instance](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)v polovině tohoto dokumentu) .
    2. NainstalovatERDDAP™v novém Tomcatu.
    3. Nepoužívejte ProxyPass k odstranění čísla portu zERDDAP™URL.
    4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), nastavit základnuUrl na http://www.*yourDomainName*:8081
 
    5. Až začneš tohle.ERDDAP™, měli byste být schopni vidět na
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Pevné státní pohony{#solid-state-drives} 
*    **Pevné státní pohony (SSD) jsou skvělé&#33;**   
Nejrychlejší, nejjednodušší a nejlevnější způsob, jak urychlitERDDAP's přístupem k tabulkovým datům je vložení datových souborů na Solid State Drive (SSD) . Většina tabulkových souborů je relativně malá, takže 1 nebo 2 TB SSD pravděpodobně stačí k držení všech datových souborů pro všechny vaše tabulární soubory. SSD se nakonec opotřebuje, pokud zapíšete data do buňky, smažete je a napíšete nová data do této buňky příliš mnohokrát. Takže pokud použijete svůj SSD k zápisu dat jednou a mnohokrát si je přečtete, i SSD třídy spotřebitelů by mělo trvat velmi dlouho, pravděpodobně mnohem déle než jakýkoli diskový disk. (HDD) . SSD třídy spotřebitelů jsou nyní levné (v roce 2018, ~200 dolarů za 1 TB nebo ~400 dolarů za 2 TB) a ceny stále rychle klesají. Kdy?ERDDAP™přístup k datovému souboru, SSD nabízí oba kratší latence (~0.1ms, versus ~3ms pro HDD, versus ~10 (?) ms pro RAID, versus ~55ms pro Amazon S3) a vyšší propustnost (~500 MB/S, versus 75 MB/s pro HDD, versus 500 MB/s pro RAID) . Takže můžete získat velký výkon (až 10X versus HDD) za 200 dolarů&#33; Ve srovnání s většinou dalších možných změn vašeho systému (Nový server za 10 000 dolarů? Nový RAID za 35 000 dolarů? nový síťový spínač za 5000 dolarů? atd.) , To je zdaleka nejlepší návratnost investic (ROI) . Pokud/kdy SSD zemře (za 1, 2, ... 8 let) , nahradit. Nespoléhejte se na to jako na dlouhodobé archivní ukládání dat, jen pro kopii dat v přední části.\\[SSD by byla skvělá i pro roštovaná data, ale většina dat je mnohem větší, takže SSD je velmi drahé.\\]
    
Pokud váš server není nabit pamětí, další paměť pro váš server je také skvělý a relativně levný způsob, jak urychlit všechny aspektyERDDAP.
     
    
### [Těžké zatížení / omezení](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
S těžkým použitím, samostatnýERDDAP™mohou být omezeny různými problémy. Více informací viz[seznam omezení a řešení](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Mřížky, hvězdokupy a federace{#grids-clusters-and-federations} 
Při velmi těžkém použití, jediný samostatnýERDDAP™narazí na jedno nebo více omezení a dokonce i navrhovaná řešení budou nedostatečná. V takových situacíchERDDAP™má vlastnosti, které usnadňují konstrukci škálovatelných sítí (také nazývané klastry nebo federace) zERDDAPs, které umožňují systému zvládnout velmi těžké použití (např. pro velké datové centrum) . Více informací viz[sítě, klastry a federaceERDDAPán](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Několik společností začíná nabízet[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)  (např.[Amazon Webové služby](https://aws.amazon.com/)) .[Web hostingové společnosti](https://en.wikipedia.org/wiki/Web_hosting_service)nabízejí jednodušší služby od poloviny 90. let, ale služby "cloud" značně rozšířily flexibilitu systémů a nabídku služeb. Tyto služby můžete využít k vytvoření jedinéhoERDDAP™nebo mřížka/klastrERDDAPs velmi těžkým použitím. Více informací viz[cloud computing sERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Amazon Webové služby (AWS) Přehled zařízení EC2](#amazon)**   
    [Amazon Webové služby (AWS) ](https://aws.amazon.com/)je[cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing)která nabízí širokou škálu počítačové infrastruktury, kterou si můžete pronajmout do hodiny. Můžete nainstalovatERDDAP™na[Elastic Compute Cloud (EC2) ](https://aws.amazon.com/ec2/)instance (jejich jméno pro počítač, který si můžete pronajmout do hodiny) . AWS má vynikající[Uživatelská příručka AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)a můžete použít Google najít odpovědi na konkrétní otázky, které můžete mít. Připravte se - je to docela dost práce začít. Ale jakmile dostanete jeden server nahoru a běží, můžete snadno pronajmout co nejvíce dalších zdrojů (servery, databáze, SSD-prostor atd.) jak potřebujete, za rozumnou cenu.\\[Toto není doporučení ani podpora webových služeb Amazon. Existují i jiní poskytovatelé cloudů.\\]
    
Přehled věcí, které musíte udělat, abyste získaliERDDAP™běží na AWS je:
    
    * Obecně, budete dělat všechny věci popsané v[Uživatelská příručka AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Zařiď účet AWS.
    * Nastavit uživatele AWS v rámci tohoto účtu s administrátorskými právy. Přihlaste se jako tento uživatel k provedení všech následujících kroků.
    * Elastické úložiště bloku (EBS) je AWS ekvivalent pevného disku připojeného k vašemu serveru. Některé prostory EBS budou přiděleny při prvním vytvoření EC2. Je to trvalé skladování -- informace se neztratí, když zastavíte svůj EC2. A pokud změníte typy instancí, váš EBS prostor se automaticky připojí k nové instanci.
    * Vytvořit elastickou IP adresu tak, aby vaše EC2 instance měla stabilní, veřejnou URL (na rozdíl od jen soukromé URL, které se mění pokaždé, když restartujete svůj instanci) .
    * Vytvořit a spustit instanci EC2 (počítač) . Existuje široká škála[typ instance](https://aws.amazon.com/ec2/instance-types/), každý za jinou cenu. M4. velké nebo m4.x velká instance je silná a je pravděpodobně vhodná pro většinu použití, ale vyberte si, co vyhovuje vašim potřebám. Asi budete chtít použít Linux Amazonu jako operační systém.
    * Pokud je Váš stolní počítač / laptop počítač Windows, můžete použít[PUTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), volný SSH klient pro Windows, získat přístup k příkazovému řádku vašeho EC2 instance. Nebo můžete mít jiný program SSH, který dáváte přednost.
    * Při přihlášení do své instance EC2 budete přihlášeni jako administrativní uživatel s uživatelským jménem "ec2-user." ec2-user má sudo privilegia. Takže když potřebujete něco udělat jako uživatel kořene, použijte: sudo *některéCommand* 
    * Pokud je Váš stolní počítač / laptop počítač Windows, můžete použít[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), volný SFTP program, pro přenos souborů do / z vašeho EC2 instance. Nebo můžete mít jiný SFTP program, který preferujete.
    *   [Nainstalovat Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)na vašem stupni EC2.
    * Postupujte podle normy[ERDDAP™Návod k instalaci](/docs/server-admin/deploy-install).
         
### Počkejte a zkuste znovu výjimku.{#waitthentryagain-exception} 
Uživatel může dostat chybovou zprávu jako
Počkej a zkus to znovu.
Byla tam (Dočasně?) problém. Počkej chvíli, pak to zkus znovu. (V prohlížeči klikněte na tlačítko Znovu načíst.)   
Podrobnosti: GridDataPříslušenství.inkrement: dílčíVýsledky\\[0\\]= "123542730" mělo být "123532800."

Obecné vysvětlení WaitThenThreeAgainException je:
Kdy?ERDDAP™odpovídá na žádost uživatele, může dojít k neočekávané chybě s datovým souborem (např. chyba při čtení dat ze souboru nebo při přístupu ke vzdálenému souboru) . Počkej a zkus to znovu.ERDDAP™že žádost selhala (Zatím) ale toERDDAP™by se měl pokusit rychle znovu načíst soubor dat (volá[RequestReloadASAP](#requestreloadasap)) a zkuste to znovu. Často to uspěje a uživatel vidí, že odpověď na žádost byla pomalá. Jindy znovunačítání selže nebo je příliš pomalé, nebo následný pokus vypořádat se s žádostí také selže a hodí další WaitThennTryAgain. Pokud se to stane,ERDDAP™označuje datový soubor pro opětovné načtení, ale říká uživateli (přes WaitThenThreeAgain Exception) že při reakci na žádost došlo k selhání.

To je normální chování. Tento systém se může vypořádat s mnoha běžnými problémy.
Je však možné, aby se tento systém příliš spustil. Nejčastější příčinou je, žeERDDAP's načítáním souboru nevidí problém, aleERDDAP's odpovědí na žádost o data vidí problém. Bez ohledu na to, co je příčinou, řešení je pro vás vypořádat se s tím, co je špatné s datovým souborem. Podívejte se do log.txt vidět aktuální chybové zprávy a vypořádat se s problémy. Pokud má mnoho souborů platné hlavičky, ale neplatné údaje (poškozený soubor) , Nahradit soubory neporušené soubory. Jestli je spojení s RAID lajdákem, sprav to. Je-li připojení ke vzdálené službě flakey, najděte způsob, jak to není flakey nebo stáhnout všechny soubory ze vzdáleného zdroje a sloužit data z místních souborů.

Podrobné vysvětlení této konkrétní chyby (nad) je:
Pro každýEDDGridsoubor údajů,ERDDAP™udržuje hodnoty proměnné osy v paměti. Používají se například k převodu požadovaných hodnot osy, které používají " () " formát do indexových čísel. Například pokud jsou hodnoty osy "10, 15, 20, 25," žádost o (20) bude interpretován jako žádost o index #2 (Indexy založené na 0) . Kdy?ERDDAP™získá žádost o data a získá data ze zdroje, ověří, že hodnoty osy, které získal ze zdroje, odpovídají hodnotám osy v paměti. Normálně ano. Ale někdy se zdroj dat výrazně změnil: například hodnoty indexu od začátku proměnné osy mohly být odstraněny (Například "10, 15, 20, 25" se mohlo stát "20, 25, 30") . Pokud k tomu dojde, je jasné, žeERDDAP's výkladem žádosti (např. " (20) "je index #2) je teď špatně. Takže...ERDDAP™hodit výjimku a volání RequestReloadAP.ERDDAP™bude brzy aktualizovat soubor údajů (často během několika sekund, obvykle během minuty) . Jiné, podobné problémy také házet WaitThenZkuste znovu výjimku.
    
#### RequestReloadASAP{#requestreloadasap} 
Můžete vidět RequestReloadASAP v log.txt souboru hned po chybové zprávě a často v blízkosti[Počkejte a zkuste znovu výjimku.](#waitthentryagain-exception). Je to v podstatě vnitřní, programový způsob proERDDAP™nastavit a[vlajka](#flag)Signalizovat, že soubor údajů by měl být co nejdříve znovu načten.
     
### Soubory nejsou smazány{#files-not-being-deleted} 
Pro párERDDAP™instalace, došlo k problému s některými dočasnými soubory byly vytvořenyERDDAP™Zůstat otevřený (omylem) a tím se nesmaže. V několika případech se mnoho z těchto souborů nahromadilo a zabralo značné množství místa na disku.

Doufejme, že tyto problémy budou vyřešeny. (odERDDAP™v2.00) . Pokud tento problém vidíte, pošlete prosím Chrisovi email do adresáře + jména urážlivých souborů. John v Noaa.gov. Máte několik možností, jak se vypořádat s problémem:

* Pokud soubory nejsou velké a nezpůsobují, že vám dojde místo na disku, můžete tento problém ignorovat.
* Nejjednodušší řešení je vypnutí tomcat/ERDDAP™  (po hodinách je ovlivněno méně uživatelů) . Pokud během vypnutí operační systém soubory nesmaže, smažte je ručně. Pak restartovatERDDAP.
         
### JSON- ID{#json-ld} 
*    **[Sémantický markup datových sad s json-ld (JSON Propojené údaje) ](#json-ld)**   
    ERDDAP™použití[Json- Id (JSON Propojené údaje) ](https://json-ld.org)aby byl Váš katalog dat a datové soubory součástí[sémantická síť](https://en.wikipedia.org/wiki/Semantic_Web), což je Tim Berners-Lee nápad, aby web obsah více stroj čitelný a stroj "pochopitelný." Obsah json-ld používá[schema.org](https://schema.org/)pojmy a definice. Vyhledávací stroje ([Zejména Google](https://developers.google.com/search/docs/data-types/datasets)) a další sémantické nástroje mohou použít tuto strukturovanou značku k usnadnění objevu a indexování. Struktura json-ld se jeví jako neviditelní lidé&lt;skript &gt; kód https://.../erddap/info/index.html webová stránka (což je sémantická síť[DataCatalog](https://schema.org/DataCatalog)) a na každém https://.../erddap/info/*datasetID*/index.html webová stránka (což je sémantická síť[Soubor dat](https://schema.org/Dataset)) . (Zvláštní poděkování Adam Leadbetter a Rob Fuller z Mořského institutu v Irsku za to, že dělají těžké části práce, aby se tato částERDDAP.)   
     
### Out-Of-Date URL{#out-of-date-urls} 
Pomalu, ale jistě, URL adresy, které poskytovatelé dat zapsali do datových souborů se stávají zastaralé (například:httpse stanehttps, webové stránky jsou přeorganizovány a organizace jako NODC/NGDC/NCDC jsou přeorganizovány do NCEI) . Výsledné zlomené odkazy jsou stále přítomný problém, kterému čelí všechny webové stránky. Abych se s tím vyrovnal,ERDDAP™nyní má systém pro automatickou aktualizaci zastaralých URL adres. Pokud generovatNastavení dat Xml vidí zastaralé URL, přidá aktuální URL&lt;addAttributes&gt;. Také při zatížení souboru, pokudERDDAP™vidí zastaralou URL, tiše ji změní na aktuální URL. Změny jsou řízeny řadou vyhledávacích/replace-s páry definované v&lt;aktualizaceUrls&gt; vERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Tam můžeš udělat změny. Pokud máte návrhy na změny, nebo pokud si myslíte, že by se to mělo změnit ve službu (Jako konvertory) , prosím e-mail Chris. John v Noaa.gov.
     
### KORS{#cors} 
* KORS ([Cross-Původ sdílení zdrojů](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"je mechanismus umožňující omezené zdroje (např. písma neboERDDAP™údaje) na webové stránce, která má být požadována z jiné domény mimo doménu, ze které byl podáván první zdroj" (Arun Ranganathan) . V podstatě, CORS je zpráva, která může být vložena do HTTP hlavičky odpovědi, přičemž v podstatě, "to je v pořádku s touto webovou stránkou, pokud některé další stránky (specifické nebo všechny) Chytit zdroje (např. data) z této stránky a aby ji k dispozici na svých stránkách." Je tedy alternativou k[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
VývojářiERDDAP™netvrdí, že jsou bezpečnostní experti. Nejsme si zcela vědomi bezpečnostních otázek souvisejících s CORS. Nechceme žádné prohlášení, které by podpořilo akci, která snižuje bezpečnost. Takže zůstaneme neutrální a necháme to na každém.ERDDAP™Administrátor rozhodne, zda výhody nebo povolení hlavičky COR stojí za rizika. Jako vždy, pokudERDDAP™Má nějaké soukromé soubory dat, je dobrý nápad být extra opatrný ohledně bezpečnosti.
    
Pokud chcete povolit CORS pro vašeERDDAP™, tam jsou[snadno dostupné pokyny](https://enable-cors.org/index.html)popis toho, jak mohou správci webových stránek povolit hlavičku COR prostřednictvím softwaru nižší úrovně serveru (např. Apači nebo manginx) .
    
### Palety{#palettes} 
* Palety používajíERDDAP™převést rozsah hodnot dat do škály barev při vytváření grafů a map.
    
Každá paleta je definovaná v paletě .cpt-stylu, kterou používá[GMT](https://www.soest.hawaii.edu/gmt/). VšechnyERDDAP™.cpt soubory jsou platné GMT .cpt soubory, ale opak není pravda. Pro použití vERDDAP™.cpt soubory mají:
    
    * Volitelné řádky komentářů na začátku souboru, počínaje "#."
    * Hlavní část s popisem segmentů palety, jeden segment na řádek. Každý řádek popisu segmentu má 8 hodnot:
start Hodnota, startRed, start Zelená, začněte. Modrá, endValue, endRed, endGreen, endBlue.
Může existovat několik segmentů.ERDDAP™používá lineární interpolaci mezi startemRed/Green/Blue a koncemRed/Green/Blue každého segmentu.
        
Doporučujeme, aby každý segment zadat start a konec barvy, které jsou odlišné, a že počáteční barva každého segmentu je stejná jako konečná barva předchozího segmentu, takže paleta popisuje kontinuální směs barev.ERDDAP™má systém pro vytvoření palety diskrétních barev z palety s kontinuální směsí barev. AnERDDAP™uživatel může určit, zda chce, aby paleta byla kontinuálně (originál) nebo diskrétní (pocházející z originálu) . Existují však oprávněné důvody, proč tyto doporučení pro některé palety nerespektovat.
        
    * StartValue a endValues musí být celá čísla.
První segment musí mít startValue=0 a endValue=1.
Druhý segment musí mít startValue=1 a endValue=2.
atd.
    * Červené, zelené a modré hodnoty musí být celá čísla od 0 (žádný) ... 255 (Naplno) .
    * Konec souboru musí mít 3 řádky s:
        1. Barva pozadí rgb pro hodnoty dat menší než minimum barevné lišty, např.: B 128 128 128
Je to často startRed, startGreen a startBlue prvního segmentu.
        2. Barva popředí rgb pro hodnoty dat vyšší než maximální barevná lišta, např.: F 128 0 0
Je to často konecRed, endGreen, a konecBlue posledního segmentu.
        3. Barva rgb pro hodnoty NaN dat, např. N 128 128 128
Je často středně šedá. (128 128 128) .
    * Hodnoty na každém řádku musí být odděleny záložky bez cizích mezer.
    
Vzorek .cpt souboru je BlueWhiteRed.cpt:
    
\\# Tady BlueWhiteRed.cpt.
0 0 0 128 1 0 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Pro další příklady viz existující soubory .cpt. Pokud je problém se souborem .cpt,ERDDAP™bude pravděpodobně hodit chybu, když je .cpt soubor parsed (což je lepší než zneužití informací) .
    
Můžete přidat další paletyERDDAP. Můžete je vyrobit sami nebo je najít na webu (např.[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) I když budete pravděpodobně muset upravit jejich formát mírně přizpůsobitERDDAP's .cpt požadavky. To getERDDAP™použít nový soubor .cpt, uložit soubor v *tomcat* /webapps/erddap/WEB-INF/cptfiles (Musíte to udělat pro každou novou verziERDDAP) a buď
    
    * Používáte-li výchozí soubor zpráv.xml: přidejte název souboru do souboru&lt;palety &gt; značka
         *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/ messages.xml.
Pokud to uděláte, musíte to udělat pokaždé, když upgradeERDDAP.
    * Pokud používáte vlastní soubor zpráv.xml: přidat název souboru&lt;palety&gt; tag ve vašich vlastních zprávách.xml souboru: *tomcat* /content/erddap/ messages.xml . Pokud to uděláš, musíš to udělat jen jednou. (ale existuje i jiná práce na udržování vlastních zpráv.xml soubor) .
    
Pak restartovatERDDAP™takERDDAP™Všimne si změn. Výhodou tohoto přístupu je, že můžete určit pořadí palet v seznamu předloženém uživatelům. Pokud přidáte kolekci, doporučujeme vám přidat předponu s iniciály autorů (např. "KT\\_") ke jménu každé palety pro identifikaci sbírky a tak, že může existovat více palet, které by jinak měly stejný název.
    
Prosím, neodstraňujte ani neměňte žádnou standardní paletu. Jsou standardní funkcí všechERDDAP™zařízení. Pokud si myslíte, že paleta nebo kolekce palet by měly být zahrnuty do normyERDDAP™distribuce, protože by byla obecně užitečná, prosím, pošlete je Chrisovi. John v Noaa.gov.
    
### Barvy{#colorbars} 
*    **Jak seERDDAP™generovat barvy v barvě?** 
    
    1. Uživatel vybere jednu z předem definovaných[palety](#palettes)nebo použije výchozí hodnotu, např. Duha. Palety jsou uloženy/definovány v souborech GMT stylu .cpt Color Palette Table. Každý zERDDAP's předdefinovanými paletami má jednoduchý celočíselný rozsah, např. 0 až 1 (pokud je v paletě jen jedna část) , nebo 0 až 4 (pokud jsou v paletě čtyři části) . Každý segment souboru zahrnuje n až n+1, počínaje n=0.
    2.  ERDDAP™generuje nový soubor .cpt on-the-fly pomocí škálování předem definované palety (např. 0 až 4) do rozsahu palety potřebné uživatelem (např. 0,1 až 50) a pak generovat část v nové paletě pro každou část nové palety (Například stupnice logů s klíšťaty 0,1, 0,5, 1, 5, 10, 50 bude mít 5 sekcí) . Barva pro koncový bod každé sekce je generována nalezením příslušné části palety v souboru .cpt a pak lineárně interpolací hodnot R, G a B. (Stejně jako GMT generuje barvy ze souborů Color Palette Table.) Tento systém umožňujeERDDAP™začít s obecnými paletami (např. Rainbow s 8 segmenty, celkem 0 až 8) a vytvořit vlastní palety na létání (např. vlastní duha, která mapuje 0,1 až 50 mg/l na duhové barvy) .
    3.  ERDDAP™pak použije tento nový soubor .cpt generovat barvu pro každý barevný pixel v barevném pruhu (a později pro každý datový bod při plánování dat na grafu nebo mapě) , opět nalezením příslušné části palety v souboru .cpt a pak lineárně interpolací hodnot R, G a B.
    
Tento proces se může zdát zbytečně složitý. Ale řeší problémy související s logaritmickými stupnicemi, které se těžko řeší jinak.
    
Tak jak můžeš napodobovat co?ERDDAP™co děláš? To není snadné. V podstatě potřebujete duplikovat proces, kterýERDDAP™užívá. Pokud jsteJavaprogramátor, můžete použít stejnýJavatřída, žeERDDAP™používá k tomu všechno:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Pokyny pro systémy distribuce dat{#guidelines-for-data-distribution-systems} 
Více obecných názorů na návrh a vyhodnocení systémů distribuce dat naleznete[Tady.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
ZahrnujeERDDAP™instalace je nástroj příkazového řádku s názvem ArchiveADataset, který vám může pomoci vytvořit archiv (a.zipnebo.tar.gzsoubor) s částí nebo celým datovým souborem uloženým v sérii netcdf-3.ncdatové soubory ve formátu souboru, který je vhodný pro předkládáníNOAA's NCEI archív (.ncpro mřížkované soubory dat nebo[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)u tabulkových datových souborů, jak je stanoveno[NCEINetCDFŠablony v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

ArchivA Dataset může vytvořit dva různé formáty archivu:

* "Originální" formát následuje tyto[Pokyny NCEI pro archivaci](https://www.ncdc.noaa.gov/atrac/guidelines.html), tento návod pro[Archivování vašich údajů v NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), a související[Postupy pro zajištění integrity údajů](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Formát "BagIt"[Soubory BagIt](https://en.wikipedia.org/wiki/BagIt), standardizovaný archiv formát propagovaný Americkou knihovnou Kongresu, jak je uvedeno v[BagIt v0.97 specifikace](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI může standardizovat na BagIt soubory pro podání do archivu.

Není divu, že[globální a variabilní metadata](/docs/server-admin/datasets#global-attributes)žeERDDAP™Povzbuzování/vyžadování je téměř přesně to samé v souboru CF a ACDD metadata, které NCEI podporuje/vyžaduje, takže všechny vaše datové soubory by měly být připraveny k podání NCEI prostřednictvím[Send2NCEI](https://www.nodc.noaa.gov/s2n/)nebo[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Pokročilý sledovací a zdrojový nástroj NCEI pro archivní sbírky) .

Jestliže (váERDDAP™Správce) pomocí ArchiveADataset odesílat data do NCEI, pak (ne NCEI) určí, kdy předat NCEI kus dat a jaký bude tento kus, protože budete vědět, kdy jsou nová data a jak určit, že kus (a NCEI nebude) . ArchiveADataset je tedy nástroj, který můžete použít k vytvoření balíku, který se předloží NCEI.

ArchivA Dataset může být užitečný například v jiných situacíchERDDAP™Správci, kteří potřebují převést podmnožinu datového souboru (na soukroméERDDAP) z jeho nativního formátu do souboru[.ncSoubory CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), aby veřejnostERDDAP™může sloužit data z.ncCF soubory místo původních souborů.

Jakmile to nachystášERDDAP™a spustit (alespoň jednou) , můžete najít a použít ArchiveADataset v *tomcat* /webapps/erddap/WEB-INF adresář. Je tu scénář. (ArchiveADataset.sh) pro Linux/Unix a soubor šarže (ArchiveADataset.bat) pro Windows.

Na Windows, když poprvé spustíte ArchiveADataset, musíte editovat ArchiveADataset. bat soubor s textovým editorem změnit cestu k javě. exe soubor tak, aby Windows mohli najítJava.

Když spustíte ArchiveADataset, bude vám klást řadu otázek. Pro každou otázku napište odpověď a stiskněte Enter. Nebo kdykoliv stiskněte ^C, abyste opustili program.

Nebo můžete odpovědět na otázky v pořadí na příkazovou čáru. Chcete-li to udělat, spusťte program jednou a zadejte a zapište své odpovědi. Pak můžete vytvořit jeden příkazový řádek (s odpověďmi jako parametry) který řídí program a odpovídá na všechny otázky.
Pokud chcete použít výchozí hodnotu pro daný parametr, použijte slovo default.
Použití "" (dvě dvojité uvozovky) jako náhradník pro prázdný řetězec.
Upřesnění parametrů na příkazovém řádku může být velmi výhodné, například pokud používáte ArchiveADataset jednou měsíčně k archivaci dat v hodnotě měsíce. Jakmile vygenerujete příkazový řádek s parametry a uložíte jej do poznámek nebo do shellu, stačí udělat každý měsíc malé změny, abyste mohli tento měsíční archiv provést.

Otázky, které ArchiveADataset žádá, vám umožňují:

* Specifikujte originální nebo souborový obal. Pro NCEI použijte Bagit.
* Zadejte zip nebo dehet.gzkomprese pro balíček. Pro NCEI použijte dehet.gz.
* Zadejte kontaktní e-mailovou adresu pro tento archiv (bude zapsáno v souboru READ\\_ME.txt v archivu) .
* UveďtedatasetIDdata, která chcete archivovat.
* Určete, které datové proměnné chcete archivovat (obvykle všechny) .
* Upřesněte, která podmnožina souboru chcete archivovat. Musíte formátovat podmnožinu stejným způsobem, jakým byste formátovali podmnožinu pro požadavek na údaje, takže to bude jiné pro mřížkované než pro tabulkové soubory.
    * U roštových souborů můžete určit rozsah hodnot levé dimenze, obvykle to je rozsah času. ArchiveADataset provede samostatný požadavek a vytvoří samostatný datový soubor pro každou hodnotu v rozsahu hodnot. Vzhledem k tomu, že roštové soubory jsou obvykle velké, budete téměř vždy muset určit malou podmnožinu vzhledem k velikosti celého souboru dat.
Například,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * U tabulkových souborů můžete určit jakýkoliv soubor omezení, ale často je to rozsah času. Vzhledem k tomu, že tabulkové datové soubory jsou obvykle malé, je často možné určit žádná omezení, takže celý datový soubor je archivován.
Například &time &gt;=2015-12-01&time&lt;2016-01-01
* U tabulkových souborů: zadejte čárku oddělený seznam 0 nebo více proměnných, které určí, jak jsou archivovaná data dále podmnožována do různých datových souborů. Pro datové soubory, které mají
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=TimeSeries|TimeSeriesProfil|Trajektorie|TrajektorieProfile
Měli byste téměř vždy zadat proměnnou, která má cf\\_role=timeseries\\_id (např.stationID) nebo cf\\_role=trajectory\\_id atribut. ArchivADataset provede samostatný požadavek a vytvoří samostatný datový soubor pro každou kombinaci hodnot těchto proměnných, např. pro každoustationID.
Pro všechny ostatní tabulkové soubory nebudete pravděpodobně za tímto účelem uvádět žádné proměnné.
Varování: Pokud podmnožina souboru, který archivujete, je velmi velká (&gt;2GB) a pro tento účel neexistuje žádná vhodná proměnná, pak ArchiveADataset není s tímto datovým souborem použitelný. Tohle by mělo být vzácné.
* Zadejte formát souboru pro soubory, které budou vytvořeny.
Pro mřížkované soubory dat pro NCEI použijte.nc.
Pro tabulkové soubory, pro NCEI, použijte[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)pokud je to možnost; jinak.nc.
* Upřesněte typ souboru, který má být vytvořen pro každý datový soubor a pro celý soubor archivu: MD5, SHA-1, nebo SHA-256. Soubor dist poskytuje způsob pro klienta (např. NCEI) otestovat, zda je datový soubor poškozen. Tradičně to bylo[.md5 soubory](https://en.wikipedia.org/wiki/MD5)Ale teď jsou lepší možnosti. Pro NCEI použijte SHA-256 .

Poté, co odpovíte na všechny otázky, ArchiveADataset bude:

1. Vytvořit řadu žádostí o soubor údajů a zinscenovat výsledné datové soubory v *velkýRodič rodičů* /ArchiveADataset/ *datasetID\\_timestrom* /.
U roštových souborů bude soubor pro každou hodnotu levého rozměru (např. čas) . Název souboru bude tato hodnota (Například časová hodnota) .
U tabulkových souborů bude soubor pro každou hodnotu proměnné ... (án) . Název souboru bude tato hodnota. Pokud existuje více než jedna proměnná, levé proměnné budou použity k vytvoření podadresářových jmen a nejpravoprávnější proměnná bude použita k vytvoření názvů souborů.
Každý datový soubor musí být&lt;2GB (maximální povolenou.ncverze 3 soubory) .
2. Udělejte soubor související s každým datovým souborem se sběrem datového souboru. Například pokud je datový soubor 46088.nca typ dist je .sha256, pak soubor dist bude mít název 46088.nc.sha256 .
3. Vytvořte si soubor READ\\_ME.txt s informacemi o archivu, včetně seznamu všech nastavení, která jste zadali pro vytvoření tohoto archivu.
4. Vytvořit 3 soubory *velkýRodič rodičů* /ArchiveADataset/ :
    
    * A.zipnebo.tar.gzarchivní soubor s názvem *datasetID\\_timestrom* .zip  (nebo.tar.gz) obsahující všechny zinscenované datové soubory a trávit soubory. Tento soubor může být libovolný, omezen pouze prostorem na disku.
    * Například soubor dist pro archivní soubor, *datasetID\\_timestrom* .zip.sha256.txt
    * Pro "originální" typ archivu, textový soubor pojmenovaný *datasetID\\_timestrom* .zip.listOfFiles.txt (nebo.tar.gz) který uvádí všechny soubory v.zip  (nebo.tar.gz) Složka.
    
Pokud připravujete archiv pro NCEI, tyto soubory pošlete do NCEI, možná prostřednictvím[Send2NCEI](https://www.nodc.noaa.gov/s2n/)nebo[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Pokročilý sledovací a zdrojový nástroj NCEI pro archivní sbírky) .
5. Smazat všechny zinscenované soubory tak, aby pouze archiv soubor (např..zip) , trávení (např. .sha256.txt) archivu a (volitelně) .listOfFiles.txt soubory zůstávají.

#### ISO 19115.xml Soubory metadat{#iso-19115-xml-metadata-files} 
ArchivADataset archivní balíček neobsahuje soubor s metadaty ISO 19115 .xml pro datový soubor. Pokud chcete/potřebujete odeslat soubor ISO 19115 pro váš datový soubor do NCEI, můžete jim poslat soubor s metadaty ISO 19115 .xml, kterýERDDAP™vytvořen pro datový soubor (aleNMFSlidé by měli získat soubor ISO 19115 pro své soubory dat z InPort, pokudERDDAP™už ten soubor nepodává.) .

Problémy? Návrhy? ArchiveADataset je nový. Pokud máte problémy nebo návrhy, Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).
     
