---
title: "Scaling"
---
# Stříkání
## ERDDAP™- Heavy Loads, Grids, Clusters, Federations, and Cloud Computing{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

# ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)je webová aplikace a webová služba, která shromažďuje vědecká data z různých místních a vzdálených zdrojů a nabízí jednoduchý a konzistentní způsob, jak stáhnout podmnožiny dat ve společných formátech souborů a vytvářet grafy a mapy. Tato webová stránka pojednává o otázkách souvisejících s těžkýmERDDAP™používání zatížení a zkoumá možnosti řešení extrémně těžkých zatížení prostřednictvím sítí, klastrů, federací a cloud computingu.

Původní verze byla napsána v červnu 2009. Nedošlo k žádným významným změnám. Toto bylo naposledy aktualizováno 2019-04-15.

## ZDŮVODNĚNÍ{#disclaimer} 

Obsah této webové stránky jsou Bob Simons osobní názory a nemusí nutně odrážet žádné postavení vlády neboNational Oceanic and Atmospheric Administration. Výpočty jsou zjednodušené, ale myslím, že závěry jsou správné. Použil jsem chybnou logiku nebo jsem udělal chybu ve svých výpočtech? Pokud ano, je to jen moje chyba. Prosím, pošlete e-mail s opravouerd dot data at noaa dot gov.
 

- - -

## Těžké zatížení / omezení{#heavy-loads--constraints} 

S těžkým použitím, samostatnýERDDAP™budou omezeny (od nejvíce do nejméně pravděpodobné) podle:

### Šířka pásma vzdáleného zdroje{#remote-source-bandwidth} 
1. Vzdálený zdroj dat je šířka pásma i s efektivním připojením (např. prostřednictvímOPeNDAP) , pokud vzdálený zdroj dat nemá velmi vysoké připojení k internetu,ERDDAP's reakce budou omezeny tím, jak rychleERDDAP™může získat data ze zdroje dat. Řešením je zkopírovat soubor dat naERDDAP's pevným diskem, možná s[EDDGridKopírovat](/docs/server-admin/datasets#eddgridcopy)nebo[EDDtableCopy](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAP's šířka pásma serveru{#erddaps-server-bandwidth} 
2. PokudERDDAP's serverem má velmi velké připojení k internetu,ERDDAP's reakce budou omezeny tím, jak rychleERDDAP™může získat data ze zdrojů dat a jak rychleERDDAP™může klientům vrátit data. Jediným řešením je získat rychlejší internetové připojení.
     
### paměť{#memory} 
3. Pokud existuje mnoho současných žádostí,ERDDAP™může dojít paměti a dočasně odmítnout nové požadavky. (ERDDAP™má několik mechanismů, jak se tomu vyhnout a minimalizovat důsledky, pokud k tomu dojde.) Čím více paměti na serveru, tím lépe. Na 32bitovém serveru je 4+ GB opravdu dobrá, 2 GB je v pořádku, méně se nedoporučuje. Na 64-bitovém serveru se můžete téměř zcela vyhnout problému tím, že získáte spoustu paměti. Viz[Nastavení \\-Xmx a -Xms](/docs/server-admin/deploy-install)místoERDDAPTomcat. AnERDDAP™získání těžkého použití na počítači s 64-bitovým serverem s 8GB paměti a -Xmx nastaven na 4000M je zřídka, pokud vůbec, omezena pamětí.
     
### Had Drive Bandwidth{#had-drive-bandwidth} 
4. Přístup k datům uloženým na pevném disku serveru je mnohem rychlejší než přístup k vzdáleným datům. I tak, pokudERDDAP™server má velmi vysokou šířku pásma připojení k internetu, je možné, že přístup k datům na pevném disku bude zablokovat. Částečný roztok je rychlejší (např. 10 000 otáček za minutu) magnetické pevné disky nebo SSD disky (Jestli to dává smysl.) . Dalším řešením je ukládat různé soubory dat na různých diskech, takže kumulativní šířka pásma pevného disku je mnohem vyšší.
     
### Příliš mnoho souborů zachycených{#too-many-files-cached} 
5. Příliš mnoho souborů v[cache](/docs/server-admin/additional-information#cached-responses)adresářERDDAP™caches všechny obrázky, ale pouze caches data pro některé typy požadavků na data. Je možné, aby adresář cache pro datový soubor měl dočasně velký počet souborů. To zpomalí požadavky, zda je soubor v cache (Opravdu&#33;) .&lt;cache Minuty[setup.xml](/docs/server-admin/deploy-install#setupxml)umožňuje nastavit, jak dlouho může být soubor v cache před jeho odstraněním. Nastavení menšího čísla by tento problém minimalizovalo.
     
### CPU{#cpu} 
6. Jen dvě věci zaberou spoustu času CPU:
    *   NetCDF4 aHDF5 nyní podporuje vnitřní komprese dat. Dekompresní velký komprimovanýNetCDF4 /HDF5 datových souborů může trvat 10 nebo více sekund. (To není chyba při realizaci. Je to povaha komprese.) Takže více simultánních žádostí o datové soubory s daty uloženými v komprimovaných souborech může způsobit vážné napětí na jakémkoli serveru. Pokud jde o problém, řešením je ukládat populární data v nestlačených souborech nebo získat server s procesorem s více jádry.
    * Výroba grafů (včetně map) : přibližně 0,2 - 1 sekunda na graf. Takže pokud existuje mnoho současných unikátních žádostí o grafy (WMSklienti často požadují 6 současně&#33;) Mohlo by dojít k omezení CPU. Když běží více uživatelůWMSKlienti, tohle je problém.
         

- - -

## VíceznačnéERDDAPS Load Balancing?{#multiple-identical-erddaps-with-load-balancing} 

Často přichází otázka: "Můžu se vypořádat s těžkými břemeny, a tak vytvořit více stejnýchERDDAPs vyvažováním nákladu?" Je to zajímavá otázka, protože se rychle dostane do jádraERDDAPJe to design. Rychlá odpověď je "ne." Vím, že je to neuspokojivá odpověď, ale existuje několik přímých důvodů a některé větší základní důvody, proč jsem navrhlERDDAP™používat jiný přístup (federaceERDDAPs, popsaná ve velké části tohoto dokumentu) Což je podle mě lepší řešení.

Některé přímé důvody, proč nemůžete / by neměl nastavit více stejnýchERDDAPjsou:

* ZadánoERDDAP™čte každý datový soubor, jakmile je poprvé k dispozici, aby bylo možné najít rozsah dat v souboru. Pak tyto informace uloží do indexu. Později, když přijde žádost uživatele o data,ERDDAP™pomocí tohoto indexu zjistit, které soubory hledat požadované údaje. Pokud by bylo více stejnýchERDDAPS, každý by dělal toto indexování, což je promarněné úsilí. S federovaným systémem popsaným níže, indexování se provádí pouze jednou, jedním zERDDAPs.
* Pro některé typy žádostí o uživatele (např. pro.nc, .png, .pdf soubory)  ERDDAP™musí provést celý soubor před odesláním odpovědi. Takže...ERDDAP™na krátkou dobu ukládá tyto soubory. Pokud přijde stejná žádost (jako často, zejména pro obrázky, kde je URL vložena do webové stránky) ,ERDDAP™může znovu použít ten cachovaný soubor. V systému více identickýchERDDAPs, tyto cachované soubory nejsou sdíleny, takže každýERDDAP™by zbytečně a zbytečně znovu vytvořit.nc, .png, nebo .pdf soubory. S federovaným systémem popsaným níže, soubory jsou vyrobeny pouze jednou, jedním zERDDAPs a znovu použít.
*   ERDDAP's systém předplatného není nastaven tak, aby byl sdílen víceERDDAPs. Například pokud vyvažovač zatížení pošle uživateli jednuERDDAP™a uživatel se přihlásí k datovému souboru, pak k druhémuERDDAPNebude si toho předplatného vědom. Později, pokud vyvažovač zatížení pošle uživatele jinémuERDDAP™a žádá o seznam jeho předplatného, druhýERDDAP™řekne, že žádné nejsou. (vede ho k dvojímu předplatnému na druhé EREDDAP) . S federovaným systémem popsaným níže je systém předplatného jednoduše řešen hlavním, veřejným, kompozitemERDDAP.

Ano, pro každý z těchto problémů bych mohl (s velkým úsilím) vytvořit řešení (sdílet informace meziERDDAPán) , ale myslím, že[Federace-of-ERDDAPs přiblížení](#grids-clusters-and-federations)  (popisovaný ve velké části tohoto dokumentu) je mnohem lepší celkové řešení, částečně proto, že se zabývá jinými problémy, které více-identické-ERDDAPs-s-a-ta-balancer přístup ani nezačne řešit, zejména decentralizované povahy zdrojů dat ve světě.

Nejlepší je přijmout prostý fakt, že jsem nenavrhovalERDDAP™rozmístěno jako vícenásobná identickáERDDAPs vyvažovačem zatížení. I vědomě navrženERDDAP™pracovat dobře v rámci federaceERDDAPMyslím, že má mnoho výhod. FederaceERDDAPs je dokonale sladěno s decentralizovaným, distribuovaným systémem datových center, která máme v reálném světě (Myslete na různé regiony IOOS, nebo různé regiony CoastWatch, nebo různé části NCEI, nebo 100 dalších datových center vNOAA, nebo různé NASA DAAC, nebo 1000's datových center po celém světě) . Místo toho, aby řekli všem datacentrům světa, že musí opustit své úsilí a dát všechna data do centralizovaného "data lake" (i kdyby to bylo možné, je to hrozný nápad z mnoha důvodů - viz různé analýzy ukazující četné výhody[decentralizované systémy](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAPDesign pracuje se světem tak, jak je. Každé datové centrum, které vytváří data, může i nadále udržovat, kurovat a sloužit svým údajům (jak by měly) , a přesto, sERDDAP™, data mohou být také okamžitě k dispozici z centralizovanéERDDAP, bez nutnosti přenosu dat do centralizovanéERDDAP™nebo uchovávání duplikátních kopií údajů. Vskutku, daný soubor údajů může být současně k dispozici
zERDDAP™v organizaci, která vytvořila a skutečně uchovává údaje (např. GoMOOS) ,
zERDDAP™v mateřské organizaci (např. IOOS central) ,
ze všech-NOAA ERDDAP™,
od americké federální vládyERDDAP™,
z globálníhoERDDAP™  (Goos) ,
a ze specializovanýchERDDAPán (např.ERDDAP™v instituci věnované výzkumu HAB) ,
všechny v podstatě okamžitě a efektivně, protože pouze metadata jsou přenesena meziERDDAPS, ne data. Nejlepší ze všeho, po iniciáluERDDAP™v původní organizaci, všechny ostatníERDDAPs lze nastavit rychle (Pár hodin práce) , s minimálními zdroji (jeden server, který nepotřebuje RAID pro ukládání dat, protože neukládá žádná data lokálně) , a tedy za skutečně minimální cenu. Porovnejte to s náklady na zřízení a udržování centralizovaného datového centra s datovým jezerem a nutností skutečně masivního, skutečně drahého připojení k internetu, plus s doprovodem problému centralizovaného datového centra je jediným místem selhání. Pro mě,ERDDAPDecentralizovaný přístup je daleko lepší.

V situacích, kdy dané datové centrum potřebuje víceERDDAPs k uspokojení vysoké poptávky,ERDDAP's designem je plně schopen sladit nebo překročit výkon víceidentického--ERDDAPs-s-a-balancer přístup. Vždycky máš možnost nastavit[vícesložkovéERDDAPán (jak je uvedeno níže) ](#multiple-composite-erddaps), každý z nich dostane všechny své údaje od ostatníchERDDAPs, bez vyvažování zatížení. V tomto případě doporučuji vám, abyste dali každému z kompozitůERDDAPs odlišným jménem / identitou a pokud možno nastavením v různých částech světa (např. různé oblasti AWS) např.ERD\\_US\\_Východ,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, takže uživatelé vědomě, opakovaně, pracovat s konkrétníERDDAP, s přidaným přínosem, že jste odstranili riziko z jediného bodu selhání.
 

- - -

## [ **Mřížky, hvězdokupy a federace** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Při velmi těžkém použití, jediný samostatnýERDDAP™narazí na jednu nebo více z[omezení](#heavy-loads--constraints)uvedené výše a dokonce i navrhované řešení budou nedostatečné. V takových situacíchERDDAP™má vlastnosti, které usnadňují konstrukci škálovatelných sítí (také nazývané klastry nebo federace) zERDDAPs, které umožňují systému zvládnout velmi těžké použití (např. pro velké datové centrum) .

Používám[mřížka](https://en.wikipedia.org/wiki/Grid_computing)jako obecný výraz pro označení typu[počítačový klastr](https://en.wikipedia.org/wiki/Computer_cluster)kde všechny části mohou nebo nemusí být fyzicky umístěny v jednom zařízení a mohou nebo nemusí být centrálně spravovány. Výhoda společných, centrálně vlastněných a regulovaných sítí (klastry) že mají prospěch z úspor z rozsahu (zejména pracovní zátěž) a zjednodušit fungování částí systému. Výhoda nelokovaných sítí, které nejsou centrálně vlastněny a spravovány (federace) je to, že distribuují lidskou pracovní zátěž a náklady a mohou poskytnout dodatečnou chybovou toleranci. Řešení, které navrhuji níže, funguje dobře pro všechny topografie sítě, clusteru a federace.

Základní myšlenkou návrhu škálovatelného systému je určit potenciální překážky a navrhnout systém tak, aby části systému mohly být replikovány podle potřeby ke zmírnění překážek. V ideálním případě každá replikovaná část zvyšuje kapacitu této části systému lineárně (účinnost škálování) . Systém není škálovatelný, pokud neexistuje škálovatelné řešení pro každý výběžek.[Skalovatelnost](https://en.wikipedia.org/wiki/Scalability)se liší od účinnosti (jak rychle je možné provést úkol - účinnost dílů) . Škálovatelnost umožňuje, aby systém rostl a zvládl jakoukoli úroveň poptávky. **Účinnost**   (o rozměrech a částech) určuje, kolik serverů, atd. bude potřeba k uspokojení dané úrovně poptávky. Účinnost je velmi důležitá, ale vždy má limity. Škálovatelnost je jediným praktickým řešením budování systému, který dokáže zvládnout **velmi** těžké využití. V ideálním případě bude systém škálovatelný a efektivní.

### Cíle{#goals} 
Cílem tohoto návrhu jsou:

* Vytvořit škálovatelnou architekturu (ten, který je snadno extenzovatelný replikací jakékoliv části, která se stane přetížený) . Pro vytvoření efektivního systému, který maximalizuje dostupnost a průchodnost dat za předpokladu dostupných výpočetních zdrojů. (Cena je téměř vždy problém.) 
* Vyvážit schopnosti částí systému tak, aby jedna část systému nepřemohla další část.
* Vytvořit jednoduchou architekturu tak, aby systém bylo snadné nastavit a spravovat.
* Vytvořit architekturu, která dobře funguje se všemi topografiemi.
* Vytvořit systém, který elegantně a omezeně selže, pokud se nějaká část přetíží. (Čas potřebný k kopírování velkých souborů dat vždy omezí schopnost systému vypořádat se s náhlým zvýšením poptávky po určitém datovém souboru.) 
*    (Pokud je to možné) Vytvořit architekturu, která není vázána na žádné konkrétní[cloud computing](#cloud-computing)služby nebo jiné externí služby (Protože je nepotřebuje.) .

### Doporučení{#recommendations} 
Naše doporučení jsou
![diagram mřížky/klastru](/img/cluster.png)

* V podstatě navrhuji vytvořit kompozit.ERDDAP™  ( **D** v diagramu) , který je pravidelnýERDDAP™kromě toho, že slouží pouze údaje z jinýchERDDAPs. Architektura sítě je navržena tak, aby co nejvíce pracovala (Využití CPU, využití paměti, využití šířky pásma) z kompozituERDDAP™na druhouERDDAPs.
*   ERDDAP™má dva speciální typy souborů údajů,[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)a[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap), které odkazují na
Údaje o ostatních datechERDDAPs.
* Při kompozituERDDAP™obdrží žádost o údaje nebo obrázky z těchto souborů souborů, složenéERDDAP™ [přesměrování](https://en.wikipedia.org/wiki/URL_redirection)žádost o údaje pro ostatníERDDAP™server. Výsledkem je:
    * Tohle je velmi efektivní. (CPU, paměť a šířka pásma) , protože jinak
        1. KompozitERDDAP™musí zaslat žádost o údaje druhé osoběERDDAP.
        2. DruhýERDDAP™musí získat data, přeformátovat je a předat data kompozitu.ERDDAP.
        3. KompozitERDDAP™musí přijímat údaje (pomocí extra šířky pásma) , přeformátovat ji (pomocí extra CPU času a paměti) , a předat data uživateli (pomocí extra šířky pásma) . Přesměrováním požadavku na údaje a umožněním druhéERDDAP™zaslat odpověď přímo uživateli, složenémuERDDAP™Netráví v podstatě žádný čas CPU, paměť, nebo šířku pásma na požadavky dat.
    * Přesměrování je transparentní pro uživatele bez ohledu na klientský software (prohlížeč nebo jiný software nebo nástroj příkazového řádku) .

### Části mřížky{#grid-parts} 
[Součástí sítě jsou:](#grid-parts)

 **A** : Pro každý vzdálený zdroj dat, který má vysokou šířku pásmaOPeNDAPserver, můžete se připojit přímo na vzdálený server. Pokud je vzdálený serverERDDAP™, použitíEDDGridFromErddap nebo EddtableFromERDDAPsloužit údajům v kompozituERDDAP. Pokud je vzdálený server jiným typemDAPserver, např. THREDDS,Hyrax, nebo GRADS, použitíEDDGridFromDap.

 **B** : Pro každýERDDAP-ovatelný zdroj dat (zdroj dat, z něhožERDDAPmůže číst data) který má vysokopásmový server, nastavit dalšíERDDAP™v síti, která je odpovědná za poskytování údajů z tohoto zdroje dat.

* Pokud několik takovýchERDDAPs nedostává mnoho žádostí o data, můžete je konsolidovat do jednéERDDAP.
* PokudERDDAP™věnované získání dat z jednoho vzdáleného zdroje je dostat příliš mnoho požadavků, tam je pokušení přidat dalšíERDDAPs přístup ke vzdálenému zdroji dat. Ve zvláštních případech to možná dává smysl, ale je pravděpodobnější, že to přemůže vzdálený zdroj dat. (která se sama porazí) a také zabránit ostatním uživatelům v přístupu ke vzdálenému zdroji dat (Což není hezké.) . V takovém případě zvažte zřízení jinéhoERDDAP™sloužit tomuto datovému souboru a zkopírovat datový soubor na němERDDAP's pevným diskem (viz **C** ) , snad s[EDDGridKopírovat](/docs/server-admin/datasets#eddgridcopy)nebo[EDDtableCopy](/docs/server-admin/datasets#eddtablecopy).
*    **B** servery musí být veřejně přístupné.

 **C** : Pro každýERDDAP-schopný zdroj dat, který má nízkopásmový server (nebo je pomalý servis z jiných důvodů) , Zvažte zřízení jinéhoERDDAP™a uložení kopie souboru údajů na němERDDAP's pevnými disky, možná s[EDDGridKopírovat](/docs/server-admin/datasets#eddgridcopy)nebo[EDDtableCopy](/docs/server-admin/datasets#eddtablecopy). Pokud několik takovýchERDDAPs nedostává mnoho žádostí o data, můžete je konsolidovat do jednéERDDAP.
 **C** servery musí být veřejně přístupné.

#### KompozitníERDDAP {#composite-erddap} 
 **D** : KompozitERDDAP™je pravidelnáERDDAP™kromě toho, že slouží pouze údaje z jinýchERDDAPs.

* Protože ta kompoziceERDDAP™má v paměti informace o všech datových souborech, může rychle reagovat na žádosti o seznamy datových souborů (úplné vyhledávání textů, vyhledávání kategorií, seznam všech souborů údajů) , a žádosti o individuální formulář pro přístup k datům datového souboru, vytvořit graf neboWMSInformační stránka. To vše jsou malé, dynamicky generované HTML stránky založené na informacích, které jsou uloženy v paměti. Takže odpovědi jsou velmi rychlé.
* Protože žádosti o aktuální data jsou rychle přesměrovány na druhouERDDAPs, složenéERDDAP™může rychle reagovat na žádosti o aktuální data bez použití CPU času, paměti nebo šířky pásma.
* Přesouváním co nejvíce práce (CPU, paměť, šířka pásma) z kompozituERDDAP™na druhouERDDAPs, složenéERDDAP™může se zdát, že slouží data ze všech souborů údajů a přesto stále drží krok s velkým počtem žádostí o údaje od velkého počtu uživatelů.
* Předběžné zkoušky ukazují, že směsERDDAP™může reagovat na většinu žádostí v ~1ms času procesoru, nebo 1000 požadavků/sekundu. Takže 8 jádrový procesor by měl být schopen reagovat na asi 8000 požadavků za sekundu. I když je možné si představit výbuchy vyšší aktivity, které by způsobily zpomalení, to je hodně průniku. Je pravděpodobné, že šířka datového centra bude těsnícím výklenem dlouho před kompozitemERDDAP™Stane se zákoutí.
##### Aktuální max (čas) ?{#up-to-date-maxtime} 
TheEDDGrid/TableFromErddap v kompozituERDDAP™změní své uložené informace o každém zdrojovém souboru pouze tehdy, pokud zdrojový soubor je["reloaded"ed](/docs/server-admin/datasets#reloadeverynminutes)a některé změny metadat (např. časová proměnnáactual\\_range) , čímž vzniká oznámení o předplatném. Pokud má zdrojový soubor data, která se často mění (například nová data každou sekundu) a používá["aktualizace"](/docs/server-admin/datasets#updateeverynmillis)systém pro zjištění častých změn základních údajů,EDDGrid/TableFromErddap nebude informován o těchto častých změnách až do dalšího souboru souborů "načíst," takžeEDDGrid/TableFromErddap nebude dokonale aktuální. Tento problém lze minimalizovat změnou zdrojového souboru&lt;Načíst každý NMinutes na menší hodnotu (60, 15?) takže existuje více oznámení o předplatném říctEDDGrid/TableFromErddap aktualizovat své informace o zdrojovém souboru.

Nebo pokud váš systém správy dat ví, kdy má zdrojový soubor nová data (např. prostřednictvím skriptu, který kopíruje datový soubor na místo) , a pokud to není super časté (např. každých 5 minut nebo méně často) Existuje lepší řešení:

1. Nepoužívejte&lt;aktualizovatEveryNMillis&gt; udržovat zdrojový soubor aktuální.
2. Nastavit zdrojový soubor&lt;Načíst každý NMinutes na větší číslo (1440?) .
3. Ať skript kontaktuje zdrojový soubor[URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)Hned poté, co kopíruje nový datový soubor.
To povede k tomu, že zdrojový soubor bude dokonale aktualizován a způsobí, že vytvoří oznámení o předplatném, které bude zaslánoEDDGrid/TableFromErddap data data. To povedeEDDGrid/TableFromErddap database to be perfectly up-to-date (No, do 5 sekund po přidání nových údajů) . A vše, co bude provedeno efektivně (bez zbytečného opětovného načítání dat) .

#### VícesložkovéERDDAPán{#multiple-composite-erddaps} 
* Ve velmi extrémních případech, nebo pro chybovou toleranci, můžete chtít nastavit více než jeden kompozitníERDDAP. Je pravděpodobné, že ostatní části systému (zejména šířka pásma datového centra) se stane problémem dlouho před složenímERDDAP™Stane se z toho blázen. Takže řešení je pravděpodobně vytvořit další, geograficky různorodá, data centra (zrcadla) , každý s jedním složenýchERDDAP™a servery sERDDAPs a (alespoň) zrcadlové kopie souborů údajů, které jsou ve vysoké poptávce. Takové nastavení také poskytuje chybovou toleranci a zálohování dat (prostřednictvím kopírování) . V tomto případě je nejlepší, pokud kompozitERDDAPs mají různé URL adresy.
    
Pokud opravdu chcete všechny kompozityERDDAPs mít stejnou URL, použijte přední koncový systém, který přiřadí daného uživatele jen jednomu z kompozitůERDDAPán (na základě IP adresy) , aby všechny požadavky uživatele jít jen na jeden z kompozitůERDDAPs. Existují dva důvody:
    
    * Při opětovném načtení podkladového datového souboru a změně metadat (Například nový datový soubor v mřížkovaném souboru způsobuje časovou proměnnouactual\\_rangezměnit) , složenéERDDAPs bude dočasně mírně mimo synchronizaci, ale s[případný soulad](https://en.wikipedia.org/wiki/Eventual_consistency). Normálně se do 5 sekund znovu sesynchronizují, ale někdy to bude delší. Pokud uživatel vytvoří automatizovaný systém, který spoléhá na[ERDDAP™předplatné](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)že spouštěcí akce, krátké problémy synchronity se stanou významným.
    * 2+ kompozitERDDAPKaždý si udržuje svůj vlastní soubor předplatnéch (protože synchronizace problém popsané výše) .
    
Takže daný uživatel by měl být nasměrován pouze na jeden z kompozitů.ERDDAPs, aby se zabránilo těmto problémům. Pokud jeden z kompozitůERDDAPS jde dolů, přední konec systému může přesměrovat, žeERDDAP's uživateli jinéhoERDDAP™To je ono. Pokud se však jedná o problém s kapacitou, který způsobuje první kompozitERDDAP™selhat (příliš horlivý uživatel? a[Popírání služebního útoku](https://en.wikipedia.org/wiki/Denial-of-service_attack)?) , To je velmi pravděpodobné, že přesměrování svých uživatelů na jiné složenéERDDAPs[Kaskádové selhání](https://en.wikipedia.org/wiki/Cascading_failure). Nej robustější nastavení je tedy mít složenéERDDAPs různými URL adresami.
    
Nebo snad lépe, nastavit více kompozitůERDDAPs bez vyvažování zatížení. V tomto případě byste měli mít bod dát každý zERDDAPs odlišným jménem / identitou a pokud možno nastavením v různých částech světa (např. různé oblasti AWS) např.ERD\\_US\\_Východ,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, takže uživatelé vědomě, opakovaně pracovat s konkrétníERDDAP.
    
*   \\[Pro fascinující návrh vysoce výkonného systému běžícího na jednom serveru viz tento[podrobný popis Mailinatora](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Datové soubory ve velmi vysoké poptávce{#datasets-in-very-high-demand} 
V opravdu neobvyklém případě, že jeden z **A** , **B** nebo **C**  ERDDAPs nemůže udržet krok s požadavky z důvodu šířky pásma nebo omezení pevného disku, to dává smysl kopírovat data (znovu) na jiný server+hard Disk+ERDDAP, snad s[EDDGridKopírovat](/docs/server-admin/datasets#eddgridcopy)nebo[EDDtableCopy](/docs/server-admin/datasets#eddtablecopy). I když se může zdát ideální mít původní datový soubor a zkopírovaný datový soubor se bez problémů objeví jako jeden datový soubor v kompozituERDDAP™, To je obtížné, protože dva soubory souborů budou v trochu různých státech v různých časech (zejména poté, co originál získá nová data, ale předtím, než zkopírovaný soubor dostane svou kopii) . Proto doporučuji, aby byly datové soubory opatřeny mírně odlišnými názvy (Například, "... (kopie #1) "a... (kopie #2) "nebo možná " (zrcadlo # *n* ) "nebo " (server # *n* ) ") a zobrazí se jako samostatné soubory údajů v kompozituERDDAP. Uživatelé se používají k zobrazení seznamů[zrcadlová místa](https://en.wikipedia.org/wiki/Website#mirror_site)na oblíbených stránkách stahování souborů, takže by je to nemělo překvapit nebo zklamat. Vzhledem k omezení šířky pásma na daném místě, to může mít smysl mít zrcadlo umístěné na jiném místě. Pokud je zrcadlová kopie v jiném datovém centru, je přístupná jen kompozitem datového centra.ERDDAP™, různé tituly (např. "zrcadlo č.1) nejsou nutné.

### RAID versus pravidelné pevné disky{#raids-versus-regular-hard-drives} 
Pokud velký datový soubor nebo skupina souborů dat nejsou silně používány, může mít smysl ukládat data na RAID, protože nabízí chybovou toleranci a protože nepotřebujete procesní výkon nebo šířku pásma jiného serveru. Ale pokud je soubor dat silně používán, může mít větší smysl zkopírovat data na jiném serveru +ERDDAP™+ pevný disk (podobné[co dělá Google](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) namísto použití jednoho serveru a RAID k ukládání více souborů dat, protože můžete použít oba servery+hardDrive+ERDDAPJe v síti, dokud jeden z nich nezklame.

### Selhání{#failures} 
Co se stane, když...

* Je tu výbuch žádostí o jeden datový soubor (Například všichni studenti ve třídě současně požadují podobná data) ?
PouzeERDDAP™pokud bude tento soubor údajů přemožen a zpomalen nebo odmítne žádosti. KompozitERDDAP™a dalšíERDDAPNebude to ovlivněno. Jelikož mezním faktorem pro daný datový soubor uvnitř systému je pevný disk s daty (neERDDAP) , jediné řešení (není okamžité) je vytvořit kopii datového souboru na jiném serveru+hardDrive+ERDDAP.
* An **A** , **B** nebo **C**  ERDDAP™selhání (např. selhání pevného disku) ?
Pouze datový soubor (án) Sloužil tímERDDAP™jsou ovlivněny. Pokud soubor údajů (án) je zrcadlena na jiném serveru+hardDrive+ERDDAP, Účinek je minimální. Pokud je problémem selhání pevného disku v úrovni 5 nebo 6 RAID, stačí vyměnit disk a nechat RAID obnovit data na disku.
* KompozitERDDAP™Selhává?
Pokud chcete vytvořit systém s velmi[vysoká dostupnost](https://en.wikipedia.org/wiki/High_availability), můžete připravit[vícesložkovéERDDAPán (jak je uvedeno výše) ](#multiple-composite-erddaps), pomocí něčeho jako[NGINX](https://www.nginx.com/)nebo[Traefik](https://traefik.io/)zvládnout vyvážení nákladu. Poznámka:ERDDAP™může zvládnout velmi velký počet žádostí od velkého počtu uživatelů, protože
žádosti o metadata jsou malé a jsou zpracovávány informacemi, které jsou v paměti, a
žádosti o údaje (který může být velký) jsou přesměrovány na dítěERDDAPs.

### Jednoduché, škálovatelné{#simple-scalable} 
Tento systém se snadno nastavuje a spravuje a snadno se rozšiřuje, když se jeho část přetíží. Jediná reálná omezení pro dané datové centrum jsou šířka pásma datového centra a cena systému.

### Šířka pásma{#bandwidth} 
Všimněte si přibližné šířky pásma běžně používaných součástí systému:

|Složka|Přibližná šířka pásma (GByty/s)  |
|---|---|
|DDR paměť|2. 5|
|SSD disk|1|
|SATA pevný disk|0, 3|
|Gigabit Ethernet|0, 1|
|OC-12|0, 06|
|OC-3|0, 015|
|T1|0, 0002|

  
Takže jeden pevný disk SATA. (0, 3GB/ s) na jednom serveru s jednímERDDAP™může pravděpodobně nasytit Gigabit Ethernet LAN (0, 1 GB/ s) . A jeden Gigabit Ethernet LAN (0, 1 GB/ s) může pravděpodobně nasytit OC-12 připojení k internetu (0, 06GB/s) . A nejméně jeden zdrojový seznam linek OC-12 stojí asi 100 000 dolarů měsíčně. (Ano, tyto výpočty jsou založeny na posunu systému na jeho limity, což není dobré, protože vede k velmi pomalým reakcím. Tyto výpočty jsou však užitečné pro plánování a vyvážení částí systému.)   **Je zřejmé, že vhodné rychlé připojení k internetu pro vaše datové centrum je zdaleka nejdražší část systému.** Můžete snadno a relativně levně postavit mřížku s tuctem serverů běžící tucetERDDAPs, který je schopen pumpovat spoustu dat rychle, ale vhodně rychlé připojení k internetu bude velmi, velmi drahé. Částečné roztoky jsou:

* Povzbuzovat klienty, aby požadovali podmnožiny dat, pokud je to vše, co je potřeba. Pokud klient potřebuje pouze údaje pro malý region nebo v menším rozlišení, měli by o to požádat. Subsetting je ústředním zaměřením protokolůERDDAP™podporuje žádost o údaje.
* Podporujte přenos komprimovaných dat.ERDDAP™ [obklady](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)přenos dat, pokud nalezne "přijímací kódování" vHTTP GETŽádám hlavičku. Všechny webové prohlížeče používají "accept-encoding" a automaticky dekompresují odpověď. Ostatní klienti (Například počítačové programy) musím to použít explicitně.
* Najdi servery na ISP nebo jiné stránce, která nabízí relativně nižší náklady na šířku pásma.
* Rozptylte servery pomocíERDDAPS různými institucemi tak, aby náklady byly rozptýleny. Pak můžete spojit kompozitERDDAP™k jejichERDDAPs.

Všimněte si, že[Cloud Computing](#cloud-computing)a webhostingové služby nabízejí veškerou šířku pásma, kterou potřebujete, ale nevyřešte problém s cenou.

Obecné informace o návrhu škálovatelných, vysoce kapacitních, systémů tolerantních k poruchám viz kniha Michaela T. Nygarda[Uvolněte ji.](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Jako Lego.{#like-legos} 
Software designéři se často snaží používat dobré[vzory návrhu softwaru](https://en.wikipedia.org/wiki/Software_design_pattern)řešit problémy. Dobré vzory jsou dobré, protože zapoutají dobré, snadno vytvořit a pracovat s, univerzální řešení, která vedou k systémům s dobrými vlastnostmi. Vzor jména nejsou standardizována, takže nazvu vzor, žeERDDAP™používá Lego vzor. Každé Lego (každýERDDAP) je jednoduchý, malý, standardní, samostatný, cihlový (datový server) s definovaným rozhraním, které umožňuje připojení k jiným legos (ERDDAPán) . ČástiERDDAP™které tvoří tento systém jsou: předplatné a flagURL systémy (která umožňuje komunikaci meziERDDAPán) EDD... FromErddap přesměrování systém, a systémRESTfulžádosti o údaje, které mohou získat uživatelé nebo jiníERDDAPs. Takže, vzhledem k dvěma nebo více legos (ERDDAPán) , můžete vytvořit obrovské množství různých tvarů (topologie sítěERDDAPán) . Jistě, design a vlastnostiERDDAP™mohlo být provedeno jinak, ne jako Lego, možná jen proto, aby bylo možné a optimalizováno pro jednu konkrétní topologii. Ale cítíme, žeERDDAP's Lego-jako design nabízí dobré, univerzální řešení, které umožňujeERDDAP™Správce (nebo skupina správců) vytvořit různé druhy topologie federace. Například jedna organizace by mohla vytvořit tři (nebo více)  ERDDAPs, jak je uvedeno v[ERDDAP™Nákres mřížky/Cluster výše](#recommendations). Nebo distribuovaná skupina (IOOS? Pobřežní hlídka? NCEI? NWS?NOAA? USS? Dataone? Neon? LTERe? OOI? BODC? Onc? SVS? WMO?) může nastavit jedenERDDAP™v každé malé základně (takže data mohou zůstat blízko zdroje) a pak nastavit složenéERDDAP™v centrální kanceláři s virtuálními soubory dat (které jsou vždy dokonale aktuální) z každé malé základnyERDDAPs. Vskutku, všechnyERDDAPs, instalován v různých institucích po celém světě, které získávají data od jinýchERDDAPs a/nebo poskytovat údaje jinýmERDDAPs, tvoří obrovskou síťERDDAPs. Není to super? Takže stejně jako u Lega jsou možnosti nekonečné. Proto je to dobrý vzor. Proto je to dobrý design.ERDDAP.

### Různé typy žádostí{#different-types-of-requests} 
Jednou z reálných komplikací této diskuse o topologii datového serveru je to, že existují různé typy žádostí a různé způsoby optimalizace pro různé typy žádostí. Tohle je většinou samostatná otázka. (Jak rychle můžeERDDAP™pokud údaje odpovídají na žádost o údaje?) z diskuse o topologii (který se zabývá vztahy mezi datovými servery a který server má aktuální data) .ERDDAP™, samozřejmě, snaží vypořádat se se všemi typy žádostí efektivně, ale zachází s některými lepšími než ostatní.

* Mnoho žádostí je jednoduchých.
Například: Jaké jsou metadata pro tento datový soubor? Nebo: Jaké jsou hodnoty časového rozměru tohoto mřížkovaného souboru?ERDDAP™je navržen tak, aby s nimi manipuloval co nejrychleji (obvykle v&lt;=2 ms) udržováním této informace v paměti.
     
* Některé požadavky jsou mírně těžké.
Například: Dejte mi tuto podmnožinu datového souboru. (který je v jednom datovém souboru) . Tyto požadavky lze řešit poměrně rychle, protože nejsou tak těžké.
     
* Některé požadavky jsou těžké, a proto jsou časově náročné.
Například: Dejte mi tuto podmnožinu datového souboru. (který může být v některém z 10 000+ datových souborů, nebo by mohl být z komprimovaných datových souborů, které každý trvá 10 sekund na dekompresi) .ERDDAP™v2.0 uvedl některé nové, rychlejší způsoby, jak se s těmito požadavky vypořádat, zejména tím, že umožnil, aby nit pro zpracování žádostí rozmnožila několik pracovních nití, které řeší různé podskupiny žádosti. Ale existuje jiný přístup k tomuto problému, kterýERDDAP™dosud nepodporuje: podmnožiny datových souborů pro daný datový soubor by mohly být uloženy a analyzovány na samostatných počítačích, a pak výsledky kombinované na původním serveru. Tento přístup se nazývá[MapReduce](https://en.wikipedia.org/wiki/MapReduce)a je příkladem[Hadoop předseda](https://en.wikipedia.org/wiki/Apache_Hadoop), první (?) open-source MapReduce program, který byl založen na nápadech z Google papíru. (Pokud potřebujete MapReduceERDDAP, prosím pošlete e-mailovou žádost naerd.data at noaa.gov.) Google[Velká škola](https://cloud.google.com/bigquery/)je zajímavé, protože se zdá, že se jedná o implementaci MapReduce aplikované na subsetting tabulkových dat, která je jedním zERDDAP's hlavními cíli. Je pravděpodobné, že můžete vytvořitERDDAP™Soubor dat z souboru BigQuery přes[EDDtableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)protože k BigQuery lze přistupovat přes rozhraní JDBC.

### To jsou moje názory.{#these-are-my-opinions} 

Ano, výpočty jsou zjednodušené. (a nyní mírně datovaný) Ale myslím, že závěry jsou správné. Použil jsem chybnou logiku nebo jsem udělal chybu ve svých výpočtech? Pokud ano, je to jen moje chyba. Prosím, pošlete e-mail s opravouerd dot data at noaa dot gov.

- - -

## [ **Cloud Computing** ](#cloud-computing) {#cloud-computing} 

Několik společností nabízí cloud computing služby (např.[Amazon Webové služby](https://aws.amazon.com/)a[Google Cloud Platform](https://cloud.google.com/)) .[Web hostingové společnosti](https://en.wikipedia.org/wiki/Web_hosting_service)nabízejí jednodušší služby od poloviny 90. let, ale služby "cloud" značně rozšířily flexibilitu systémů a nabídku služeb. OdERDDAP™mřížka se skládá zERDDAPs a odERDDAPs jsouJavawebové aplikace, které mohou běžet v Tomcat (nejčastější server aplikace) nebo jiné servery aplikace by mělo být relativně snadné nastavitERDDAP™mřížka na cloudové službě nebo web hosting stránky. Výhody těchto služeb jsou:

* Nabízejí přístup k velmi vysoké šířce pásma připojení k internetu. To samo o sobě může ospravedlnit používání těchto služeb.
* Platí jen za služby, které používáte. Například získáte přístup k velmi vysokému připojení k internetu, ale platíte pouze za skutečně přenášená data. To vám umožní vybudovat systém, který se zřídkakdy přemůže (i při nejvyšší poptávce) , aniž by museli platit za kapacitu, která je zřídka používaná.
* Jsou snadno rozšiřitelné. Můžete změnit typy serverů nebo přidat tolik serverů nebo tolik úložišť, kolik chcete, za méně než minutu. To samo o sobě může ospravedlnit používání těchto služeb.
* Osvobodí vás od mnoha administrativních povinností provozování serverů a sítí. To samo o sobě může ospravedlnit používání těchto služeb.

Nevýhodou těchto služeb jsou:

* Za své služby si někdy účtují hodně. (v absolutních hodnotách, ne že by to nebyla dobrá hodnota) . Ceny uvedené zde jsou pro[Amazon EC2](https://aws.amazon.com/ec2/pricing). Tyto ceny (od června 2015) Sleze dolů.
V minulosti byly ceny vyšší, ale datové soubory a počet žádostí byly menší.
V budoucnu budou ceny nižší, ale datové soubory a počet žádostí budou větší.
Detaily se mění, ale situace zůstává relativně konstantní.
A není to tím, že služba je předražená, ale že používáme a kupujeme mnoho služeb.
    * Přenos dat do systému je nyní zdarma (Jo&#33;) .
Přenosy dat ze systému jsou 0,09 $/GB.
Jeden pevný disk SATA (0, 3GB/ s) na jednom serveru s jednímERDDAP™může pravděpodobně nasytit Gigabit Ethernet LAN (0, 1 GB/ s) .
One Gigabit Ethernet LAN (0, 1 GB/ s) může pravděpodobně nasytit OC-12 připojení k internetu (0, 06GB/s) .
Pokud jedno připojení OC-12 může přenášet ~150.000 GB/měsíc, náklady na přenos dat by mohly být až 150.000 GB @ $0.09/GB = $13.500/měsíc, což je významná cena. Očividně, pokud máte tucet těžce pracujícíchERDDAPs v cloudové službě, vaše měsíční poplatky za přenos dat by mohly být podstatné (až do 162 000 dolarů za měsíc) . (Opět, není to tím, že služba je předražená, je to, že používáme a kupujeme mnoho služeb.) 
    * Úložiště dat Amazon účtuje 50 dolarů za měsíc na TB. (Srovnejte to s nákupem podniku 4TB přímo za ~50 dolarů/TB, i když RAID připočte k celkovým nákladům.) Takže pokud potřebujete uložit spoustu dat do cloudu, mohlo by to být dost drahé. (např. 100 TB by stálo 5000 dolarů za měsíc) . Ale pokud nemáte opravdu velké množství dat, jedná se o menší problém, než je šířka pásma / přenos dat náklady. (Opět, není to tím, že služba je předražená, je to, že používáme a kupujeme mnoho služeb.)   
         
### Subsetting{#subsetting} 
* Problém s posouváním: Jediný způsob, jak efektivně šířit data z datových souborů, je mít program, který distribuuje data (např.ERDDAP) běžící na serveru, který má data uložená na místním pevném disku (nebo podobně rychlý přístup k SAN nebo místní RAID) . Místní souborové systémy umožňujíERDDAP™  (a základní knihovny, jako je netcdf-java) požadovat konkrétní byte se pohybuje od souborů a získat odpovědi velmi rychle. Mnoho typů žádostí o údaje odERDDAP™do souboru (zejména žádosti o mřížku údajů, pokud je hodnota kroku &gt; 1) nelze provést efektivně, pokud program vyžaduje celý soubor nebo velké kusy souboru z nelokálního (proto pomaleji) systém ukládání dat a pak extrahovat podmnožinu. Pokud cloud nastavení nedáváERDDAP™rychlý přístup k byte rozsahy souborů (stejně rychle jako u místních souborů) ,ERDDAP's přístupem k datům bude těžké zablokovat a potlačit další výhody využívání cloudové služby.

### Hostované údaje{#hosted-data} 
Alternativa k výše uvedené analýze přínosů nákladů (která je založena na majiteli údajů (např.NOAA) platby za uložení jejich dat v cloudu) Dorazila kolem roku 2012, kdy Amazon (a v menší míře i někteří další poskytovatelé cloudů) začal hostovat některé soubory v jejich cloudu (AWS S3) zdarma (pravděpodobně s nadějí, že by mohli získat zpět své náklady, pokud by uživatelé pronajali AWS EC2 Comput instance pro práci s těmito údaji) . Je zřejmé, že díky tomu je cloud computing mnohem dražší, protože čas a náklady nahrávají data a hosting jsou nyní nulové. SERDDAP™v2.0, existují nové funkce pro usnadnění provozuERDDAPv mraku:

* Takže...EDDGridFromFiles nebo EDDTableFromFoles lze vytvořit z datových souborů, které jsou vzdálené a přístupné přes internet (např. kbelíky AWS S3) použitím&lt;cacheFromUrl&gt; a&lt;cacheSize Možnosti.ERDDAP™bude udržovat místní cache nejpoužívanějších datových souborů.
* Nyní, pokud jsou komprimovány některé EDDTableFromFoles zdrojové soubory (např..tgz) ,ERDDAP™automaticky je dekompresuje, když je čte.
* Takže...ERDDAP™vlákno reagující na danou žádost bude plodit pracovní vlákno pracovat na pododdílech žádosti, pokud používáte&lt;NThreads&gt; Možnosti. Tato paralela by měla umožnit rychlejší reakci na náročné požadavky.

Tyto změny řeší problém AWS S3 nenabízí lokální úložiště souborů na úrovni bloku a (starý) problém přístupu k údajům S3 s významným zpožděním. (Před lety (~2014) , že tato prodleva byla významná, ale nyní je mnohem kratší a tak není tak významná.) Celkem to znamená, že nastaveníERDDAP™V oblacích teď funguje mnohem lépe.

 **Díky.** Mnohokrát děkuji Matthew Arrottovi a jeho skupině v původním OOI úsilí za jejich práci na uvedeníERDDAP™v cloudu a výsledná diskuse.
 

- - -

## [Vzdálená replikace datových souborů](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

Existuje společný problém, který souvisí s výše uvedenými diskusemi o sítích a federacíchERDDAPs: vzdálená replikace souborů dat. Základním problémem je: poskytovatel údajů udržuje datový soubor, který se občas mění a uživatel chce udržovat aktuální místní kopii tohoto datového souboru. (z různých důvodů) . Je zřejmé, že je zde obrovské množství variant. Některé varianty jsou mnohem těžší než jiné.

* Rychlé aktualizace
Je těžší udržet místní data aktuální. *okamžitě*   (např. do 3 sekund) po každé změně zdroje, spíše než například během několika hodin.
     
* Časté změny
Časté změny je těžší řešit než časté změny. Například změny jednou denně jsou mnohem jednodušší než změny každé 0,1 sekundy.
     
* Malé změny
Malé změny zdrojového souboru je těžší řešit než zcela nový soubor. To platí zejména v případě, že malé změny mohou být kdekoliv v souboru. Malé změny se obtížněji detekují a ztěžují izolaci dat, která je třeba replikovat. Nové soubory lze snadno detekovat a efektivně přenášet.
     
* Celý soubor dat
Udržování celého souboru aktuálních dat je těžší než uchovávání dat z poslední doby. Někteří uživatelé jen potřebují aktuální údaje (např. hodnota posledních 8 dnů) .
     
* Mnohonásobné kopie
Udržování více vzdálených kopií na různých místech je těžší než udržování jedné vzdálené kopie. Tohle je problém se škálováním.
     

Samozřejmě existuje velké množství variant možných typů změn zdrojového souboru a potřeb a očekávání uživatele. Mnohé varianty je velmi obtížné vyřešit. Nejlepším řešením pro jednu situaci je často není nejlepší řešení pro jinou situaci.

### [ **PříslušnáERDDAP™Nástroje** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™nabízí několik nástrojů, které lze použít jako součást systému, který usiluje o udržení vzdálené kopie datového souboru:

*   ERDDAP's[RSS  (Přehled bohatých stránek?) služba](https://en.wikipedia.org/wiki/RSS)  
nabízí rychlý způsob, jak zkontrolovat, zda soubor dat na vzdálenémERDDAP™se změnil.
     
*   ERDDAP's[služba předplatného](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
je efektivnější (nežRSS) přístup: okamžitě zašle e-mail nebo kontakt na URL každému účastníkovi, kdykoli je soubor dat aktualizován a aktualizace vedla ke změně. Je efektivní v tom, že se to stane ASAP a neexistuje žádné zbytečné úsilí (jako při hlasováníRSSslužba) . Uživatelé mohou používat jiné nástroje (jako[IFTTT](https://ifttt.com/)) reagovat na e-mailové oznámení ze systému předplatného. Například uživatel by se mohl přihlásit k datovému souboru na vzdálenémERDDAP™a pomocí IFTTT reagovat na oznámení o předplatném a spustit aktualizaci místního datového souboru.
     
*   ERDDAP's[Systém vlajky](/docs/server-admin/additional-information#flag)  
poskytuje způsob proERDDAP™správce, aby na svém/jejím účtu oznámil soubor údajůERDDAPNabít co nejdřív. URL forma vlajky lze snadno použít ve skriptech. URL forma vlajky může být také použita jako akce pro předplatné.
     
*   ERDDAP's["files"systém](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
může nabídnout přístup ke zdrojovým souborům pro daný datový soubor, včetně seznamu adresářů ve stylu Apache ("Web přístupná složka") který má každý soubor stáhnout URL, naposledy upravený čas a velikost. Jedna nevýhoda použití"files"systém je, že zdrojové soubory mohou mít různé názvy proměnných a různá metadata než datový soubor, jak se objeví vERDDAP. Pokud je ovladačERDDAP™Databáze nabízí přístup ke zdrojovým souborům, které otevírají možnost verze rsyncu chudého člověka: pro místní systém je snadné zjistit, které vzdálené soubory se změnily a které je třeba stáhnout. (Viz[cacheFromUrl volba](#cache-from-url)pod kterým to může využít.)   
     

### [Řešení](#solutions) {#solutions} 

Přestože existuje obrovské množství variant problému a nekonečný počet možných řešení, existuje jen hrstka základních přístupů k řešení:

#### Vlastní, Brute Force Solutions{#custom-brute-force-solutions} 
Zjevným řešením je ručně vyrobit vlastní řešení, které je proto pro danou situaci optimalizováno: vytvořit systém, který detekuje/identifikuje, která data se změnila, a odeslat tyto informace uživateli, aby uživatel mohl požádat o změněná data. Můžeš to udělat, ale jsou tu nevýhody:

* Vlastní řešení jsou hodně práce.
* Vlastní řešení jsou obvykle tak přizpůsobená danému datovému souboru a danému systému uživatele, že je nelze snadno znovu použít.
* Vlastní řešení musí být postavena a udržována vámi. (To není nikdy dobrý nápad. Vždycky je dobrý nápad vyhnout se práci a přimět někoho jiného, aby tu práci odvedl&#33;) 

Odradím se tohoto přístupu, protože je téměř vždy lepší hledat obecná řešení, postavená a udržovaná někým jiným, která lze snadno znovu použít v různých situacích.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)je existující, ohromně dobré, obecné řešení pro udržení sběru souborů na zdrojovém počítači synchronizovat na vzdáleném počítači uživatele. Funguje to takhle:

1. nějaká událost (např.ERDDAP™událost systému předplatného) spouštěče běžící rsync,
     (nebo cron práce běží rsync v určité době každý den na počítači uživatele) 
2. který kontaktuje Rsync na zdrojovém počítači,
3. který počítá sérii hashů pro jednotlivé kusy každého souboru a přenáší tyto hashy na rsync uživatele,
4. která tyto informace porovnává s podobnými informacemi pro uživatelskou kopii souborů,
5. který pak požaduje kousky souborů, které se změnily.

    
Vzhledem k tomu, co dělá, Rsync pracuje velmi rychle. (např. 10 sekund plus čas přenosu dat) a velmi efektivně. Jsou.[Variace rsync](https://en.wikipedia.org/wiki/Rsync#Variations)které optimalizují různé situace (např. předčíslením a cachováním hashů jednotlivých zdrojových souborů) .

Hlavní slabiny rsynchronizace jsou: je třeba vyvinout určité úsilí (bezpečnostní otázky) ; tam jsou některé problémy škálování; a to není dobré pro udržení NRT soubory opravdu aktuální (Například je trapné používat Rsync více než každých 5 minut) . Pokud se můžete vypořádat se slabostmi, nebo pokud nemají vliv na vaši situaci, rsync je vynikající, obecný účel řešení, které může každý použít k řešení mnoha scénářů zahrnujících vzdálené replikace dat.

Tam je položka naERDDAP™Do seznamu se pokusit přidat podporu služeb rsync doERDDAP  (Asi dost těžký úkol.) , aby každý klient mohl použít rsync (nebo varianta) udržovat aktuální kopii datového souboru. Jestli na tom chce někdo pracovat, pošlete prosím e-mail.erd.data at noaa.gov.

Existují i jiné programy, které dělají víceméně to, co dělá rsync, někdy orientované na replikaci dat (i když často na úrovni kopírování souborů) např.Unidata's[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Cache z Urlu{#cache-from-url} 
[CacheFromUrl](/docs/server-admin/datasets#cachefromurl)nastavení je k dispozici (Začneme sERDDAP™v2. 0) pro všechnyERDDAP's typy souborů, které vytvářejí soubory dat ze souborů (v podstatě všechny podtřídy[EDDGridFromFiles](/docs/server-admin/datasets#eddgridfromfiles)a[EDDTableFromFoles](/docs/server-admin/datasets#eddtablefromfiles)) . cache FromUrl je triviální automaticky stahovat a udržovat místní datové soubory kopírováním ze vzdáleného zdroje přes cache FromUrl nastavení. Vzdálené soubory mohou být v Web Accessible Složka nebo adresářový seznam souborů nabízených THREDDS,Hyrax, kbelík S3 neboERDDAP's"files"systém.
    
Pokud je zdroj vzdálených souborů vzdálenýERDDAP™soubor, který nabízí zdrojové soubory prostřednictvímERDDAP™ "files"systém, pak můžete[upsat](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)do vzdáleného datového souboru a použijte[URL vlajky](/docs/server-admin/additional-information#flag)pro váš místní datový soubor jako akci pro předplatné. Pokaždé, když se vzdálený datový soubor změní, kontaktuje pro váš datový soubor URL vlajky, která mu řekne, aby co nejdříve znovu nahrál, což detekuje a stáhne změněné vzdálené datové soubory. Všechno se to děje velmi rychle. (obvykle ~5 sekund plus čas potřebný ke stažení změněné soubory) . Tento přístup funguje skvěle, pokud jsou změny zdrojového souboru pravidelně přidávány nové soubory a pokud se stávající soubory nikdy nezmění. Tento přístup nefunguje dobře, pokud jsou údaje často připojeny ke všem (nebo většina) ze stávajících zdrojových datových souborů, protože pak váš místní datový soubor často stahuje celý vzdálený datový soubor. (To je místo, kde je zapotřebí rsync-jako přístup.) 
    
#### ArchiveADataset{#archiveadataset} 
ERDDAP™'s[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)je dobrým řešením, když jsou data často přidávány do datového souboru, ale starší data se nikdy nemění. V podstatěERDDAP™správce může spustit ArchiveADataset (možná ve scénáři, možná běží Cron) a uveďte podmnožinu datového souboru, který chtějí extrahovat (možná v několika souborech) a balení v.zipnebo.tgzsoubor, takže soubor můžete poslat zájemcům nebo skupinám (např. NCEI pro archivaci) nebo je k dispozici ke stažení. Například, můžete spustit ArchiveADataset každý den ve 12:10 a nechat to udělat.zipze všech dat od 12:00 hodin předchozího dne do 12:00 dnes. (Nebo to dělejte každý týden, měsíčně nebo ročně, podle potřeby.) Vzhledem k tomu, že zabalený soubor je generován offline, neexistuje žádné nebezpečí timeout nebo příliš mnoho dat, jak by bylo pro standardERDDAP™žádost.
     
#### ERDDAP™'s standardním systémem žádosti{#erddaps-standard-request-system} 
ERDDAP™'s standardním systémem požadavku je alternativním dobrým řešením, když jsou data často přidávány do souboru dat, ale starší data se nikdy nemění. V podstatě, každý může použít standardní požadavky získat data pro konkrétní rozsah času. Například každý den ve 12:10 si můžete vyžádat všechna data ze vzdáleného datového souboru od 12:00 do 12:00. Omezení (ve srovnání s přístupem ArchiveADataset) je riziko timeout nebo je příliš mnoho dat pro jeden soubor. Můžete se vyhnout omezení tím, že častěji žádosti o menší časové období.
     
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
\\[Tato možnost ještě neexistuje, ale zdá se, že je možné stavět v blízké budoucnosti.\\]  
Nový[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)Typ souboru vERDDAP™v2.0 umožňuje představit si jiné řešení. Základní soubory vedené tímto typem datového souboru jsou v podstatě soubory záznamu, které zaznamenávají změny datového souboru. Mělo by být možné vytvořit systém, který pravidelně udržuje místní datový soubor (nebo na bázi spouštěče) požadovat od této poslední žádosti všechny změny, které byly provedeny ve vzdáleném datovém souboru. To by mělo být stejně účinné. (nebo více) než rsync a bude řešit mnoho složitých scénářů, ale bude fungovat pouze v případě, že vzdálené a místní soubory jsou EDDTableFromHttpGet soubory.

Pokud na tom chce někdo pracovat, kontaktujte prosímerd.data at noaa.gov.
    
#### Distribuované údaje{#distributed-data} 
Žádné z výše uvedených řešení nedělá velkou práci při řešení tvrdých variant problému, protože replikace téměř reálného času (NRT) Soubory dat jsou velmi těžké, částečně kvůli všem možným scénářům.

Existuje skvělé řešení: ani se nesnažte replikovat data.
Místo toho použijte jediný autoritativní zdroj (jeden datový soubor na jednomERDDAP) , vedené poskytovatelem údajů (Např. regionální úřad) . Všichni uživatelé, kteří chtějí data z tohoto souboru, je vždy dostanou ze zdroje. Například aplikace založené na prohlížeči získávají data z URL požadavku, takže by nemělo záležet na tom, aby požadavek byl na původním zdroji na vzdáleném serveru (není stejný server, který hostí ESM) . Mnoho lidí obhajuje tento distribuovaný přístup k datům už dlouho. (např. Roy Mendelssohn za posledních 20 let) .ERDDAP"model mřížky/federace (horní 80% tohoto dokumentu) je založen na tomto přístupu. Toto řešení je jako meč pro Gordian Knot, celý problém zmizí.

* Toto řešení je neuvěřitelně jednoduché.
* Toto řešení je úžasně efektivní, protože se nedělá žádná práce na uchovávání replikovaného souboru dat (án) aktuální.
* Uživatelé mohou získat nejnovější data kdykoliv (např. s latencí pouze ~0,5 sekundy) .
* Docela dobře se měří a existují způsoby, jak zlepšit škálování. (Podívejte se na diskuzi v horní 80% tohoto dokumentu.)   
     

Ne, tohle není řešení pro všechny možné situace, ale je to skvělé řešení pro drtivou většinu. Existují-li problémy/slabosti s tímto řešením v určitých situacích, často stojí za to pracovat na řešení těchto problémů nebo žít s těmito slabostmi kvůli ohromujícím výhodám tohoto řešení. Pokud je toto řešení pro danou situaci skutečně nepřijatelné, např. pokud skutečně musíte mít místní kopii údajů, pak se zamyslete nad ostatními řešeními uvedenými výše.
     
### Závěr{#conclusion} 
I když neexistuje jediné, jednoduché řešení, které dokonale řeší všechny problémy ve všech scénářích (jako Rsync a Distributed Data jsou téměř) , Doufejme, že existuje dostatek nástrojů a možností, takže můžete najít přijatelné řešení pro vaši konkrétní situaci.
