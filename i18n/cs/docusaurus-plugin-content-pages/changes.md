---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Změny

 ERDDAP™ je skvělý příklad [User- Driven Innovation](https://en.wikipedia.org/wiki/User_innovation) , kde inovace výrobků často pocházejí od spotřebitelů ( ERDDAP™ uživatelé) , nejen výrobci ( ERDDAP™ vývojáři) . V průběhu let, většina myšlenek na nové funkce a změny v ERDDAP™ pocházejí od uživatelů. Tito uživatelé jsou připsány níže za své skvělé nápady. Díky&#33; Prosím, nechte ty skvělé návrhy přijít&#33;

Zde jsou změny spojené s každým ERDDAP™ uvolnění.

## Verze 2.30.0{#version-2300} 
 (propuštěn 2026- 04- 07) 

Verze v2.30.0 se do značné míry zaměřuje na opravy chyb, aktualizace závislosti na stabilitě a bezpečnosti a testování výkonů.

*    **Nové funkce a změny (pro uživatele) :** 
      * Zvýšené [Croissant](https://mlcommons.org/working-groups/data/croissant/) kompatibilita metadat a zjevná podpora, včetně [mlcroissant](https://pypi.org/project/mlcroissant/) kompatibilita.
      * Lepší podpora parketových booleů.

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
      * Nepoužité příkazové řádky nástroje a související kód byly odstraněny z kódu ke snížení technického dluhu. Viz https://github.com/ERDDAP/erddap/pull/432.
 
      * Nová vlajka funkce `siceSynchronousLoading` byla přidána, aby překonala výchozí odložený přístup pro ukládání datových souborů. To by mělo být zřídka zapotřebí, a to pouze v případech, kdy odložené zatížení způsobuje problémy. Viz [flag stránka](/docs/server-admin/feature-flags#forcesynchronousloading) detaily.

## Verze 2.29.0{#version-2290} 
 (propuštěn 2025- 12- 15) 

Je třeba jednat.

 ERDDAP™ verze 2.29.0 vyžaduje jdk 25 nebo novější. Aktualizujte prosím verzi jdk. Pokud je to problém, můžete postavit ERDDAP™ pro starší jdk (zpět k nejméně 17) změnou souboru pom.xml. JDK 25 je LTS vydání Java a zahrnuje mnoho zlepšení, zejména zlepšení výkonnosti.

*    **Nové funkce a změny (pro uživatele) :** 
    * Verze ISO 19115: Informace o admin viz níže. Pro uživatele si nyní můžete vyžádat konkrétní verze metadat ISO 19115. Udělej to z griddapu / tabledap stránky pro datový soubor s typem souboru pokles. Tyto verze budou nezávislé na defaultu serveru.

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Nová funkce, podpora MQTT. Podrobnosti doporučuji přečíst [Nová stránka.](/docs/server-admin/mqtt-integration) To zahrnuje možnost sestavit soubory dat ze zpráv MQTT a zveřejňování zpráv MQTT, pokud se datový soubor změní. Je vypnutý ve výchozím nastavení, takže pokud ho chcete použít, musíte ho povolit.

Díky Ayush Singh za práci na MQTT&#33;

    * Zlepšení S3: Přidání podpory pro S3 URI jako hodnota cacheFromUrl. To umožní ERDDAP na podporu soukromých kbelíků hostovaných off amazonaws.com Také řešil problém s únikem paměti S3.

Díky @ SethChampagneNRL za práci na S3&#33;

    * Verze ISO 19115: Nyní existuje podpora pro 3 různé verze metadat ISO 19115. Výchozí verze je ovládána nastavením v setup.xml. Pokud je USESiSO19115 nepravdivé, server ve výchozím nastavení poskytne NOAA modifikovaná ISO19115 _ 2. Pokud je USESiSO19115 pravda, pak server použije jinou verzi v závislosti na hodnotě USESiSO19139. Pokud je USESiSO19139 pravda, výchozí hodnota bude ISO19139 _ 2007, pokud je USESiSO19139 nepravdivá, výchozí hodnota bude ISO19115 _ 3 _ 2016. Doporučujeme použít USESiSO19115 = true a USESiSO19139 = false. Vaše organizace může vyžadovat různá nastavení.

    * Migroval do Javy. Časová knihovna (místo Java.utility. GregorianKalendář) . To by mělo poskytnout zlepšení výkonnosti dotazů, které zahrnují sloupce data / času. Pro převážnou většinu souborů údajů by neměl být patrný dopad. Jeden známý případ, který způsobuje změnu je, pokud datový soubor používá `dny od 0000- 01- 01` nebo podobné. Pokud je to problém proměnné, můžete přidat ` <att name="legacy_time_adjust"> pravda </att> ` na addAttributes část buď a dataVariable nebo axisVariable .
    
    *    datasets.xml je nyní zpracováván [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . To má mnoho použití včetně nastavení soukromých hodnot (jako hesla) používání proměnných prostředí. To lze vypnout nastavením envParsing na false v setup.xml.

    * Tlaková osa: Přidá speciální pouzdro pro zvýšení definované tlakem. To se používá především v Meteorologických souborech dat definujících vertikální zvýšení v isobarské úrovni. POZNÁMKA: Menší tlakové hodnoty znamenají vyšší zdvihy, takže osa běží naproti normálním zdvihům definovaným v metrech nebo stopách.

Díky [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FromNcFiles s různými rozměry: Je tu (experimentální) podpora pro EDDGrid Soubory FromNcFiles mají proměnné, které nepoužívají stejnou sadu os. Prosím, nahlašte, jak to u vás funguje, nebo jestli se to chování nezdá být správné.

    * Existuje sbírka optimalizací, které by měly být bezpečné, ale mají vlajky, aby se vrátili ke starému chování, pokud je potřeba. Pokud zjistíte, že potřebujete nastavit některý z vlajek, prosím, zadejte chybu. Pokud uslyšíme o žádných problémech, většina z nich bude odstraněna s novým porušením chování v budoucnosti. Je tu [nová stránka o funkčních vlajkách](/docs/server-admin/feature-flags) kde si můžete přečíst o těchto a dalších vlajkách.

      * dotyk Prošívané Pouze WhenItles: Jedná se o změnu, takže touchThread bude spuštěn pouze tehdy, když jsou položky ve frontě se dotknout. O jednu nit méně běží je menší optimalizace, ale stále užitečné. Chyby jsou pravdivé.

      * useNcMetadata ForFileTable: Tato změna umožňuje, aby interní tabulka souborů používala atributy nc, konkrétně atributy actual _ range, aby se zabránilo čtení celého souboru nc. To může drasticky urychlit počáteční načítání souborů dat na základě nc souborů, pokud je aktuální _ range pro každou proměnnou v každém souboru zahrnut jako atribut. Všimněte si, že to důvěřuje hodnotě, takže pokud je to špatně, vnitřní tabulka souborů bude mít nesprávné informace. Chyby jsou pravdivé.

      * ncHeader MakeFile: Tato změna umožňuje generovat soubory nc hlavičky bez prvního generování reprezentativního souboru nc. To je malá optimalizace pro EDDTable, ale obrovská optimalizace pro mnoho EDDGrid žádosti. Chyby na false (jako ve false je zamýšlené optimalizované chování) .

      * pozadí CreateSubset Tabulky: Tato změna posune některé z počátečního zpracování souborů dat na pozadí. To by mělo zlepšit čas pro načítání souborů dat. Konkrétně odložená část je podmnožina tabulek, které jsou také generovány v případě potřeby, pokud se opožděné zpracování ještě nestalo. Chyby jsou pravdivé.

    * Některé malé změny, opravy chyb (díky Italo Borrelli za opravu EDDTableFromAggregateRows, Díky. @ SethChampagneNRL pro umožnění délky delší než 360 v EDDGrid LonPM180 a několik dalších oprav chyb) a optimalizací.

*    **Pro ERDDAP™ Vývojáři:** 
    * Další optimalizace, včetně zkrácení doby zkoušky na polovinu.

    * Nové testovací profily pro velmi ochablé (vnější) nebo extrémně pomalé (Zpomalte) testy.

## Verze 2.28.1{#version-2281} 
 (propuštěn 2025-09-05) 

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Podpora přidána pro X-Forwarded -Prefix. To je zvláště zajímavé pro administrátory běží servery na podchodu. Přečtěte si prosím naši aktualizovanou dokumentaci pro [Apache](/docs/server-admin/deploy-install#apache) a [Nginx](/docs/server-admin/deploy-install#nginx) pro více informací.

Díky [@ srstsavage](https://github.com/srstsavage) 

## Verze 2.28.0{#version-2280} 
 (propuštěn 2025- 08- 29) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) je nyní k dispozici. Administrátoři mohou kontrolovat, zda výchozí metadata používají Croissant, ale počínaje 2.28.0 můžete požádat o definici Croissant s novým typem exportního souboru. "croissant" (který poskytuje jsonld soubor) .

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Nový docker Obrázek vytvořený na každém sloučeném požadavku. Tohle jsou alfa stavby, nejsou to verze verze. Budou mít značku jako "20250814T034025", která ukazuje, kdy byla postavena. Pokud chcete vyzkoušet nejnovější funkce, můžete použít tyto. Pokud chcete něco stabilnějšího, použijte naše verze se sémantickou verzí (např. 2.28.0) . Vždycky se snažíme, aby alfa verze byla použitelná, ale je pro ně méně testů než pro naše verze. Vždy doporučujeme použít něco alespoň tak nového jako naše "nejnovější" verze, která bude nejnovější sémantické verze vydání.

    * Docker Obrázky nyní k dispozici na [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) kromě [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Díky [@ ocefpaf](https://github.com/ocefpaf) , [@ abkfenris](https://github.com/abkfenris) , [@ srstsavage](https://github.com/srstsavage) a [MathewBiddle](https://github.com/MathewBiddle) na jejich příspěvky kolem Docker Images. To zahrnovalo první příspěvky od všech, kromě @ ststrawad&#33;
    
    * Nyní existuje podpora pro výrobu [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) složky. Je to ve výchozím nastavení. Můžete vypnout Croissant schéma ve vašem setup.xml s (NEDOPORUČUJETE - Prosím kontaktujte GitHub, pokud to potřebujete udělat) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Některým nastavením se změnily výchozí hodnoty. USEHeadersForUrl a USEEddReflection nyní oba výchozí k true. Pokud způsobí problém a vy je musíte nastavit na falešný, prosím, vytvořte problém. Záměrem je odstranit je v budoucnu.

    * Některá nastavení byla odstraněna. USESharedWatchService a přesměrování dokumentace ToGitHublo byl nastaven na pravdivé ve výchozím nastavení pro více vydání a byl docela dobře testován v tomto bodě. Odstranění těchto povolených pro nějaké vyčištění kódu.

    * Některé malé změny, opravy chyb a optimalizace.

*    **Pro ERDDAP™ Vývojáři:** 
    * Odstranili jsme spoustu mrtvých kódů. Mnoho varování bylo opraveno.

## Verze 2.27.0{#version-2270} 
 (propuštěn 2025-06-11) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Nová data pro konvertor barev na serverech na / erddap / convert / color.html

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Výchozí chování je, že cache bude nyní vymazán nezávisle na hlavní úloze datových souborů zatížení. To umožní spolehlivější a pravidelnější čištění starých cache souborů. Tam je další práce na zlepšení chování serveru, když nízká na disku prostor (vrácení chyby pro žádosti, které by mohly způsobit, že server dojde k úniku prostoru, a čištění cache častěji za nízkých podmínek na disku, aby se pokusili zabránit chybám) . V datasets.xml   (nebo setup.xml) můžete přidat / nastavit novou cache Parametr ClearMinut pro kontrolu, jak často server kontroluje pro vyčištění cache. Poznámka, existující parametr cacheMint kontroluje věk souborů, které mají být uchovány, nový cache ClearMinut je pro to, jak často dělat cheche jasné.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Nový cache clear checks můžete vypnout nastavením taskCacheClear na false v setup.xml, i když to se nedoporučuje.
cache ClearMinut je také v [dokumentace souborů údajů](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Name Podporuje lokalizaci pro hodnoty v addAttributes sekce. Jednoduše přidejte atribut s doplňkovým xml: lang tag. Například přidat francouzský titul do datového souboru addAttributes Oddíl by zahrnoval:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Další podrobnosti jsou k dispozici v [lokalizovaná dokumentace metadat](/docs/server-admin/localized-metadata) .

    * Nový docker Sestavit soubor s možnostmi pro SSL a barebones Prometheus server. Díky Shane St. Savage za SSL a Jiahui Hu za Prometheus.

    * Podpora pro použití informací v hlavičkách k určení URL serveru namísto spoléhání se na konfigurační soubor. To umožní přístup k serveru pomocí více jmen a může zjednodušit některé konfigurace. Povolit a odeslat zpětnou vazbu.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Některé malé změny, opravy chyb a optimalizace.

*    **Pro ERDDAP™ Vývojáři:** 
    * Refactor to how output file types are defined in code. To by mělo být tak, aby typy souborů mohou být přidány bez nutnosti dotknout mnoha kódových míst.

## Verze 2.26{#version-226} 
 (propuštěn 2025- 03- 31) 

*    **Pro všechny:** 
    * Velká aktualizace naší dokumentace: https://erddap.github.io/
 
Kromě aktualizovaného vzhledu je lepší navigace, vyhledávání, překlad, a to by mělo být jednodušší udržet v budoucnu&#33;

*    **Nové funkce a změny (pro uživatele) :** 
    * Předplatné a RSS aktualizace by měly být spolehlivější pro soubory dat, které se často aktualizují ze změn souborů.

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Výchozí verze vyžaduje / podporuje Java verze 21. Zpět v této verzi je schopnost snadno vytvořit Java 17 kompatibilní binárně.

    * Nová funkce pro přizpůsobení zobrazených informací o souborech dat v UI. Očekáváme, že to bude obzvláště užitečné pro doplnění věcí, jako jsou citace datových souborů. Pro více informací si můžete přečíst [nová dokumentace](/docs/server-admin/display-info) . Díky Ayush Singh za příspěvek&#33;

    * Další Prometheova metrika. Největší je ` http _ request _ laasing _ seconds` která zahrnuje doby odezvy požadavku v členění: "request _ type", "dataset _ id", "dataset _ type", "file _ type", "lang _ code", "status _ code"
Tento strojově čitelný formát umožní lepší sběr metrik pro pochopení toho, jak uživatelé používají server.

    * Nový způsob generování souborů ISO19115 XML. Používá Apache SIS a je novou volbou v této verzi. Povolit a odeslat zpětnou vazbu.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI nyní vytvoří jednotlivé odkazy pro každý url v oblastech, jako je infoUrl a shrnutí.

    * Předplatné a RSS aktualizace by měly být spolehlivější pro soubory dat, které se často aktualizují ze změn souborů. Pokud to způsobí problémy, kontaktujte prosím GitHub a vypněte funkci přidáním níže uvedené vlajky do vašeho setup.xml.
NEDOPORUČUJE
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Proměnné Subset již nebudou automaticky generovány pro soubory typu EDDTableFromNcCFFiles. Pokud jste spoléhali na chování, můžete buď (preferovaný roztok) přidat subsetVariables k definici datového souboru ve Vašem datasets.xml , nebo přidat pod vlajku do vašeho setup.xml. Pokud máte pocit, že je třeba to zapnout, kontaktujte prosím GitHub, abychom mohli lépe podpořit vaše použití případu posun vpřed.
NEDOPORUČUJE
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Server nyní přesměruje žádosti o dokumentaci (pod stahováním / což je dokumentace, která byla přemístěna) na nové místo dokumentace. V případě potřeby to můžete vypnout pomocí vlajky v setup.xml:
NEDOPORUČUJE
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Některé drobné změny a opravy chyb.

*    **Pro ERDDAP™ Vývojáři:** 
    * Další zlepšení kvality kódu a odstranění kódu. To zahrnuje malé optimalizace, lepší nakládání s uzavíratelnými zdroji a migraci od dlouho zastaralých datových typů (Jako Vektor.) .

    * Velké refaktoring na EDStatic vytáhnout většinu konfiguraci, zprávu, a metrický kód. To také lepší zapouzdření inicializace a manipulace adresářových cest (Tyhle poslední dva musí být ještě hotové.) 

    * Spousta pokroku směrem k oficiálně podporovanému Docker Image. Plán je dokončit a uvolnit po ERDDAP™ 2.26 je k dispozici.

## Verze 2.25{#version-225} 
 (propuštěn 2024- 10- 31) 

*    **Nové funkce a změny (pro uživatele) :** 
    * EDDTableFromFiles nyní mohou podporovat dotazy pouze s odvozenými výstupy (globals, jexl script, nebo proměnné) .
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Verze 2.25 vyžaduje Java 21 nebo novější. Toto je verze LTS a je k dispozici již více než rok.
         
    * SharedWatchService je nyní výchozí. Pokud to potřebujete vypnout, kontaktujte Chrise. John z Noaa.gov mi dá vědět, abych to mohl zlepšit v budoucích verzích a přidat:
        &lt;user SharedWatchService &gt; false&lt;/ user SharedWatchService &gt; to your setup.xml.
         
    * U ERDDAP™ Server nyní začne startovat. Což znamená, že datové soubory začnou okamžitě nakládat místo čekání, až bude podána žádost.
         
    * Parametr removeMVRows v EDDTableFromMultidimNcFiles bude mít nyní efekt. Nastavení na false může podstatně urychlit některé dotazy, ale to nemusí být vhodné pro všechny soubory dat. Více informací viz [popis parametru](/docs/server-admin/datasets#removemvrows) .
         
    * Datové soubory (EDDTableFromNcFiles a EDDGrid FromNcFiles) pomocí zarr souborů jsou nyní podporovány. Musí obsahovat "zarr" v souboru NameRegex nebo path Regex. Viz [zarr sexion v dokumentaci datových souborů](/docs/server-admin/datasets#zarr) pro více detailů.
         
    * Nový typ datového souboru, EDDTableFromParquetFiles je nyní podporován. Viz [Sekce EDDTableFromParquetFiles v dokumentaci souborů](/docs/server-admin/datasets#eddtablefromparquetfiles) pro více detailů.
         
    *    [Prometheus metrics](https://prometheus.io/) jsou nyní k dispozici na / erddap / metrics.
         
    * K dispozici je nová implementace XML parser. Tento nový parser umožňuje použití XInclude v datasets.xml . Díky Ayush Singh za tu hru.
         
    * Nový parametr v datasets.xml kontrolovat neobvyklé aktivity e-mailů. UnusualActivity Procento selhání na starou hodnotu 25%. Díky Ayush Singh za tu hru.
         
    * Nový parametr v setup.xml, který kontroluje, zda jsou na záložce status.html zobrazeny chyby při načítání datového souboru. To defaults to true, vypnout chyby dataset na stavové stránce, nastavit showLoadErrorsOnStatusPage na false:&lt;showLoadErrorsOnStatusPage &gt; false&lt;/ showLoadErrorsOnStatusPage &gt;
         
    * Některé drobné změny a opravy chyb.
         
*    **Pro ERDDAP™ Vývojáři:** 
    * Zkouška oddělená od jednotky a integrace (pomalu) testy. Také více zkoušek povoleno a testy byly vyrobeny méně vločky.
         
    * Chyba Prone (některé kontroly jsou stále vypnuty) a Spot Bugs integrovaný přes Maven.
         
    * Plná kódová základna formátována tak, aby odpovídala Průvodci stylem Google.
         

## Verze 2.24{#version-224} 
 (propuštěn 2024- 06- 07) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Nová barevná paleta EK80 pro akustické soubory dat k dispozici. Díky Robu Cermakovi za tohle.
         
    * Vyřešit problém, kde EDDTableAggregateRows neukázala správné rozmezí od všech dětí. Díky Marcu Albovi za zprávu o opravách a chybě.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * ZMĚNA BEZPEČNOSTI: Autentizace Google může vyžadovat změny vašeho CSP.
        
Konkrétně, můžete také muset přidat https://accounts.google.com/gsi/style na stlye- src a https://accounts.google.com/gsi/ na Connect- src. Pro skript - src můžete nyní použít https://accounts.google.com/gsi/client.
 
        
Pro více informací můžete jít na [Google stránka](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) o konfiguraci CSP.
         
        
    * Nová služba společných hodinek. Toto je nová volba pro sledování adresářů pro aktualizace. Má jedno vlákno pro každý souborový systém místo jednoho vlákna na datový soubor. S největší pravděpodobností to drasticky sníží počet závitů použitých ke sledování změn. Znamená to, že všechny datové soubory se aktualizují společně místo každého datového souboru s vlastní aktualizační frekvencí. S největší pravděpodobností to bude znamenat častější aktualizace většiny souborů dat.
        
Povolit přidání&lt;user SharedWatchService &gt; true&lt;/ user SharedWatchService &gt; to your setup.xml.
        
          
Prosím, zkus to a nahlaš Chrisovi, jak to funguje. John v Noaa.Gove.
         
    * Oprava pro nesprávné názvy varů v protokolech. Díky Ayush Singh za opravu.
         
    * Některé drobné změny a opravy chyb.
         
*    **Zlepšení ERDDAP™ vývojáři:** 
    * Podpora místního rozvoje pomocí Docker. Díky Mattu Hopsonovi a Roje.
         
    * Podpora místního rozvoje pomocí Jetty a zlepšení dokumentace. Díky Micahu Wengrenovi.
         
    * Změny v testech ke snížení problémů napříč platformami. Díky. Shane St. Savage.
         

## Verze 2.23{#version-223} 
 (propuštěn 2023- 02- 27) 

Všimněte si, že toto vydání bylo provedeno Bob Simons, čímž ukazuje, že je stále kolem a aktivní během přechodu na Chris John, jeho nástupce. S tímto vydáním, všechny změny kódu jsou prováděny Chis John, není-li stanoveno jinak.

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * ZMĚNA BEZPEČNOSTI: Autentizace Google je nyní prováděna prostřednictvím nové knihovny služeb identifikace Google, která je součástí "Přihlášení se k Googlu". Podpora Google pro starý systém "Přihlásit se" bude ukončena 2023-03-31. Takže pokud používáte Google Authentication ve vašem ERDDAP™ instalace, musíte aktualizovat ERDDAP™ v2.23 + do té doby. (Bob se omlouvá za to narychlo. Je to Bobova chyba.)   
         
    * ZLEPŠENO: NCSV je nyní v1.2 Změna je, že soubory jsou nyní UTF-8-kódované soubory (byli ASCII) a tak může nyní zahrnovat jakýkoli Unicode znak, jak je, bez kódování jako\\ u _ hhhh _, i když to je stále povoleno.
Při psaní NCSV souborů, ERDDAP™ Nyní píše v1.2 soubory.
         ERDDAP™ budou stále číst soubory NCSV, které se řídí specifikací v1.0 a v1.1.
Díky Pauline- Chauvet, n- a- t- e, a thogar- počítač pro navrhování a provádění testů pro zajištění různých tabulkových programů mohou importovat UTF-8 soubory. Díky Bobu Simonsovi za tuhle změnu kódu.
         
    * NEW: Webová stránka status.html má nyní řádek v blízkosti horního okraje, který označuje, který datový soubor načítá Datasets a související statistiky, nebo žádný, pokud není načítán žádný datový soubor. To může být velmi užitečné ERDDAP™ administrátoři se snaží přijít na to, proč nabít Datasety trvají tak dlouho. Také, nGridDatasets, nTableDatasets, a nTotalDatasets počítá níže, které jsou nyní okamžité (Předtím byli na konci poslední velké zátěže. Datové soubory) .
Tato změna je pro Roye Mendelssohna. Díky Bobu Simonsovi za tuhle změnu kódu.
         
    * ZLEPŠENO: GeneteData Xml nyní mění CF- 1, 10 (CF- 1, 6) v atributech "Konvence".
Díky Bobu Simonsovi za tuhle změnu kódu.
         
    * Některé drobné změny a opravy chyb.
         

## Verze 2.22{#version-222} 
 (propuštěn 2022- 12- 08) 

Všimněte si, že toto vydání bylo provedeno Bob Simons, čímž ukazuje, že je stále kolem a aktivní během přechodu na jeho nástupce.

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Nic.
         
    * BEZPEČNOSTNÍ BUG FIX: Byla tam chyba související s Křížovými stránkami v kódu pro zrušení výběru jazyka. Díky NOAA Bezpečnostní skeny to zachytily. To ukazuje, že NOAA bezpečnost aktivně a rutinně hledá bezpečnostní nedostatky ERDDAP .
         
    * BEZPEČNOSTNÍ FIX: Mnoho knihoven používaných ERDDAP™ byly aktualizovány, jako obvykle, jako součást tohoto vydání. Tentokrát to zahrnovalo aktualizaci ovladače PostgreSQL (který měl bezpečnostní chybu) na 42.5.1.
         
    * ZLEPŠOVÁNÍ: Více malých změn ERDDAP systém správy paměti by měl snížit šanci daného požadavku selhat z důvodu nedostatku dostupné paměti.
         
    * Některé drobné změny a opravy chyb.
         

## Verze 2.21{#version-221} 
 (propuštěn 2022- 10- 09) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO: PRO Java 17, neměli byste používat\\ -d64 v JAVA\\ _ OPTS v setenv.bat nebo setenv.sh. Takže jestli tam je, prosím odstraňte to. Myslím, že 64 bitový režim je nyní vybrán při stahování 64 bitové verze Java . Díky Samovi Woodmanovi.
         
    * BUG FIX: Někdy se nový e-mailový systém snažil přihlásit příliš často, což způsobilo, že Google Email servery odmítly všechny budoucí log v pokusech. Nyní, e-mailový systém se vyhýbá tomuto a souvisejícím problémům.
         

## Verze 2.20{#version-220} 
 (propuštěn 2022- 09- 30) 

*    **Nepoužívejte v2.20. Je to vadné.** Administrátoři však při upgrade na v2.21 + musí provést níže uvedené položky TO DO.
     
*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * ZLEPŠENO: Povolili jsme starý systém správy paměti (Math2.ensurememory kdispozici) a upravil nový systém správy paměti (EDStatic.shedThisRequest) lépe s tím pracovat. Viz [Stav paměti](/docs/server-admin/additional-information#memory-status) detaily.
         
    * ZMĚNA: Výchozí hodnota pro&lt;ipUrčení MaxŽádosti &gt; n datasets.xml zvýšení ze 7 na 15. Je jasné, že někteří legitimní WMS klienti mohou generovat více než 7 souběžných žádostí.
         

## Verze 2.19{#version-219} 
 (propuštěn 2022- 09- 01) 

*    **Nepoužívejte v2.19. Je to vadné.** Administrátoři však musí při upgrade na v2.20 + provést níže uvedené položky TO DO.
     
*    **Nové funkce a změny (pro uživatele) :** 
    * NEW: Existuje nová serverside funkce, orderBy Sestupný, který funguje jako orderBy Ale v sestupném pořadí. Díky Adamu Leadbetterovi.
         
    * ZLEPŠENO: Grafy (ale ne mapy) rozšíří se tak, aby vyplnil dostupný prostor na plátně, tj. prostor, který legenda nepoužívá. Můžete získat vysoké grafy, čtvercové grafy nebo široké grafy přidáním a manipulací s & .size = _ width _ | _ výška _ parametr (kde šířka a výška udávají velikost plátna v pixelech) na dotaz URL. (Toto není volba na webové stránce .graph. Musíte to přidat na URL ručně.) Pokud nechcete specifikovat parametr & .size, požadavky na .small Png, .png, .largePng, .small Pdf, .pdf, a .large.pdf mají předem definované velikosti plátna, takže váš graf bude expandovat vyplnit k dispozici prostor, ale bude obvykle zhruba čtvercový. Díky Bobu Flemingovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO: ERDDAP™ Vyžaduje Java 17 a související Tomcat 10. Musíte sledovat ERDDAP™ návod k montáži (nebo ekvivalent např., pro Docker) nainstalovat Java 17 a Tomcat 10 a zkopírujte \\[ tomcat \\] / Obsah adresáře z vaší instalace Tomcat 8 do nového \\[ tomcat \\] adresář. Neexistují žádné další změny, které byste měli provést ERDDAP instalace související s touto změnou. Jinými slovy, ERDDAP™ funguje jako předtím.
        
Nezapomeň udělat ERDDAP -související změny Tomcat server.xml a context.xml při upgrade Tomcat. Viz ERDDAP s [Pokyny pro instalaci tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Můj dojem Java 17 je, že preferuje větší výkon zpracování a paměť pro dlouhotrvající, větší aplikace jako ERDDAP™ , takže to funguje mírně pomaleji než Java 8 s nízkým výkonem počítačů (např. 2 jádra a minimální RAM) a pracuje o něco rychleji než Java 8 s vyšším výkonem počítačů (např. 4 + jádra a hojnost RAM) . Takže pokud vidíte špatný výkon, použijte programy jako Linux [nahoře](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) zkontrolovat využívání zdrojů a zvážit darování ERDDAP™ více zdrojů, zejména více paměti. Paměť je levná&#33; Většina telefonů má více procesorů a paměti než serverů, které někteří z vás používají k provozu ERDDAP &#33;
Díky Erin Turnbull.
         
        
    * TO: Jestliže používáte ERDDAP™ k přístupu Cassandra, pro Cassandra, musíte pokračovat pomocí verze Java které jste používal pro řízení Cassandry. Prostě přepni na Java 17 pro běh Tomcat + ERDDAP .
         
    * TO: Doporučeno: Pokud má Váš server CPU 4 + jádra a 8 + GB RAM, zvažte změnu těchto nastavení ve vašem datasets.xml soubor:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Pokud má váš server méně zdrojů, držte se "1" pro obě tato nastavení.
Systémy nThreads pro EDDGrid FromFiles a EDDTable FromFiles byly podstatně vylepšeny. Tyto změny vedly k obrovskému zlepšení rychlosti (např. 2X zrychlení při nastavení nThreads na 2 nebo více) pro nejnáročnější požadavky (když musí být zpracován velký počet souborů pro získání výsledků) . Některé související změny od Chris John bude také vést k obecnému zrychlení po celou ERDDAP . Kód pro tyto změny přispěl Chris John. Děkuji. Chrisi&#33;
         
    * POZOR: hyphens in datasetID jsou zaostalé a již nepodporované (i když technicky stále povoleno) . V příštím vydání budou pravděpodobně zakázáni. Pokud používáte hypheny, přepněte na podtržení nyní, aby se zabránilo problémům. Jestli to teď změníš, je to na tvou vlastní rychlost. Pokud počkáte do dalšího vydání, budete v panice a budete se s tím muset vypořádat ten den.
         
    * NEW: Nyní, pro .htmlTable odpovědi na data, pokud data v buňce String obsahují data: image / png; base64, následovaný base64 kódovaným .png obrazem, ERDDAP™ zobrazí ikonu (takže uživatel může vidět obraz, pokud se vznáší nad ním) a tlačítka pro uložení textu nebo obrázku do schránky. Díky Marcu Albovi. (kdo přispěl kódem) a Bob Simons (který jej lehce upravil) .
         
    * NEW: -Not AddStandardName
Pokud zahrnujete\\ -doNotAddStandardNames jako parametr příkazového řádku, když spustíte generovat Datové soubory Xml, generovat Datové soubory Xml nepřidá standard\\_name na addAttributes pro jakékoli jiné proměnné než proměnné nazvané zeměpisná šířka, délka, výška, hloubka nebo čas (které jsou zřejmé standard\\_name s) . To může být užitečné, pokud používáte výstup z generování Datové soubory Xml přímo v ERDDAP™ bez editace výstupu, protože generovat Datové soubory Xml často odhaduje standard\\_name s nesprávně. (Všimněte si, že vždy doporučujeme upravit výstup před použitím v ERDDAP .) Použití tohoto parametru bude mít další menší související účinky, protože uhodl standard\\_name je často používán k jiným účelům, např. k vytvoření nového long\\_name , a vytvořit nastavení barevného panelu. Díky Kevinu O 'Brienovi.
         
    * NEW: Nyní můžete dát&lt;updateMaxEvents &gt; 10&lt;/ UpdateMaxEvents &gt; n datasets.xml   (v s ostatními nastavení v blízkosti vrcholu) změnit maximální počet změn souboru (výchozí hodnota = 10) který bude zpracován systémem EveryNMillis. Větší číslo. (100?) může být užitečné, pokud je velmi důležité, aby byl datový soubor vždy aktualizován. Viz [updateMaxEvents dokumentace](/docs/server-admin/datasets#updatemaxevents) . Díky Johnu Maurerovi.
         
    * NEW: Přidána podpora globálnímu " real\\_time = pravda | Falešný "atribut String.
Pokud je to lež (výchozí) a pokud datový soubor nepoužívá aktualizaci EveryNMillis, ERDDAP™ bude cache odpovědi na žádosti o typy souborů, kde celý soubor musí být vytvořen před ERDDAP™ může začít posílat odpověď na uživatele a znovu je po dobu asi 15 minut (např. .nc ,. png) .
Pokud je to nastaveno na true nebo pokud datový soubor používá aktualizaci EveryNMillis, ERDDAP™ nikdy cache soubory odezvy a vždy vrátí nově vytvořené soubory.
Díky Johnu Maurerovi.
         
    * NEW: E-maily jsou nyní zasílány v samostatném emailThread. To dělá načítání souborů dat a dalších akcí, které generují e-maily rychleji, protože načítání Datasets nemusí čekat na odeslání e-mailu, což někdy trvá dlouho. Nový systém může posílat více e-mailů na emailovou relaci, což snižuje počet přihlašovacích záznamů e-mailových serverů a snižuje riziko selhání, protože jsou příliš časté. Existují statistiky emailThread na stránce status.html a diagnostické zprávy v log.txt -- podívejte se na "emailThread". Všimněte si, že součet nEmailsPerSession = 0, naznačuje potíže, tj. e-mailová relace nebyla schopna poslat žádné e-maily.
Díky Bobu Simonsovi.
         
    * ZMĚNA: Emaily jsou nyní zasílány s mírně odlišným kódem (z důvodu Java 17 a změna emailThread) . Pokud máte potíže s posíláním emailů, prosím, e-mailem erd.data at noaa.gov .
         
    * NEW: Předplatné akcí, které "dotek" vzdálené URL jsou nyní zpracovávány v samostatném touchThread. Tím se načítají datové soubory a další akce, které se dotknou URL rychleji, protože načítání Datasets nemusí čekat na dokončení dotyku, což někdy trvá dlouho. Existují statistiky pro touchThread na stránce status.html a diagnostické zprávy v log.txt -- podívejte se na "touchThread".
Díky Bobu Simonsovi.
         
    * NEW: Na stránce status.html, v "Major LoadDatasets Time Series", je nový "kůlna" sloupec, který označuje počet žádostí, které byly uvolněny, protože aktuální ERDDAP™ Využití paměti bylo příliš vysoké. Vykládané požadavky vrátí HTTP status kód 503 "Service Available". Ty požadavky nebyly nutně problém. Právě dorazili v rušnou dobu. To bylo součástí přepracování toho, jak ERDDAP™ zabývá se vysokým využíváním paměti.
         
    * NEW: Na počítačích Unix / Linux je nyní na webové stránce status.html řádek "OS Info" s aktuálními informacemi o operačním systému včetně použití CPU a paměti.
         
    * ZLEPŠENO: Nyní, kdy ERDDAP™ je restartován a quickRestart = true, soubory EDDTableFromFiles budou znovu používat podmnožinu .nc a odlišné .nc . Pro některé soubory dat, to výrazně snižuje čas načíst datový soubor (např. od 60 sekund do 0,3s) . Spolu s novým emailThread a úkol Thread (viz výše) , To by mělo značně urychlit restartování ERDDAP™ pro mnoho ERDDAP™ zařízení. Díky Benu Adamsovi a Johnu Kerfootovi.
         
    * V minulých dílech jste viděli... (Datové soubory, které jsou živé ERDDAP™ ale nejsou v datasets.xml ) byly jednoduše zaznamenány na stavu. html a v log.txt po každém významném načítání Dataset. Nyní jsou automaticky odstraněny z ERDDAP™ a uvedeno na status.html a v log.txt, a e-mailem na e-mail Všechno. Takže pokud chcete odstranit datový soubor z ERDDAP™ Teď stačí jen odstranit kus xml. datasets.xml a bude odstraněn v dalších hlavních nakladačů. Díky Bobu Simonsovi.
         
    * ZNÁMÝ BUG v netcdf- java v5.5.2 a v5.5.3: U EDDGrid FromThredds Katalogová volba v GenetateDatasets Xml slouží k práci pro katalogy HISDDS, které zahrnují odkazy na soubory dat v katalozích vzdálených HISDDS. Teď už ne. Nahlásil jsem to vývojářům netcdf- java.
         
    * BUG FIX: Pro uživatele Docker nastavení setup.xml parametry přes ERDDAP \\ _ _ paramName _: pro int a boolean parametry (např. e-mail SmtpPort) , ERDDAP™ Nesprávně hledal jen _ paramName _. Teď to hledá _ ERDDAP \\ _ paramName _. Díky Alessandro De Donno.
         
    * ZMĚNA: ERDDAP™ testovací systém nyní používá automatizovaný systém k ověření, že nově vytvořené testovací snímky jsou přesně tak, jak se očekávalo. Díky Chrisovi. John za návrh a Bob Simons za implementaci.
         

## Verze 2.18{#version-218} 
 (propuštěn 2022- 02- 23) 

*    **Nové funkce a změny (pro uživatele) :** 
    * ŽÁDOST
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: .nc Složky nebyly za určitých okolností uzavřeny. Teď jsou. Díky Marco Albě, Rolandu Schweitzerovi, Johnu Maurerovi a dalším.
         

## Verze 2.17{#version-217} 
 (propuštěn 2022- 02- 16) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: Po změnách orderBy systém před několika lety, Tabledap 's Make A Graph neměl správně zvládnout mnoho dotazů, které použili orderBy _ Xxx _. Teď už ano. Díky Maurici Libesovi.
         
    * V minulých dílech jste viděli... ERDDAP™ zamítnuté žádosti. transparentní Png, kdy byly hodnoty zeměpisné šířky a / nebo délky částečně nebo zcela mimo rozsah. ( ERDDAP™ GitHub Issues # 19, posted by Rob Fuller -- díky za vyslání, že Rob) Nyní vrací průhledné pixely pro libovolné oblasti mimo rozsah obrázku. To je užitečné pro mnoho klientských aplikací. Změny kódu, aby se tato změna byla provedena zcela Chris John. Díky moc, Chrisi&#33;
         
    * V minulých dílech jste viděli... ERDDAP™ zamítnuté žádosti o griddap, pokud byly hodnoty indexu pro daný rozměr \\[ vysoká: nízká \\] . Nyní tyto požadavky platí výměnou nízkých a vysokých hodnot. To řeší dlouhodobý problém pro uživatele a pro externí programy, jako je xtracto, který musel sledovat několik souborů dat, které mají zeměpisné šířky hodnot, které se pohybují od vysoké k nízké, aby se žádost jako \\[  (50) : (20)  \\] tak, že žádost v indexovém prostoru byl \\[ nízká: vysoká \\] . Viz https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Teď, žádost jako \\[  (20) : (50)  \\] pro jeden z těchto souborů dat je automaticky interpretován jako \\[  (50) : (20)  \\] .
         
    * ZMĚNA: .esriAscii požaduje nyní spustit dialogové okno "Soubor: Uložit jako" v prohlížeči uživatele. Díky Joel Van Noord.
         
    * BUG FIX: Nyní, pokud délka proměnné dětského souboru EDDGrid LonPM180 nebo EDDGrid Lon0360 datový soubor má valid\\_min a / nebo valid\\_max atribut, jsou odstraněny v EDDGrid LonPM180 nebo EDDGrid Lon0360 datový soubor. Díky Royi Mendelssohnovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO: Pokud jste nastavili&lt;dataProviderFormActive &gt; na false, aby se dočasně vypořádal se zranitelností XSS, prosím nastavte jej zpět na true.
         
    * BEZPEČNOSTNÍ BUG FIX: Fixní zranitelnost XSS ve formuláři pro poskytovatele dat. Díky Genaru Contrerasovi Gutiérrezovi.
         
    * BUG FIX: Když AWS S3 dirctory měl více než 10000 souborů, ERDDAP™ "Vnitřní chyba". Teď je to napraveno. Díky Andymu Zieglerovi.
         
    * BUG FIX: EDDGrid SideBySide nedovolila proměnnou sourceName s v různých dětských souborech dat, aby byly stejné. Teď už ano. Díky Joshuovi Stanfordovi.
         

## Verze 2.16{#version-216} 
 (propuštěn 2021- 12- 17) 

*    **Nové funkce a změny (pro uživatele) :** 
    * ZMĚNY / BUG FIXY: Četné drobné změny v překladovém systému díky návrhům editorů specifických pro jazyk. Díky Melanii Abecassis, Marcu Albě, Jessy Barrette, Filipe Fernandesové, Etienne Godinové, Jennifer Sevadjianové a Mikovi Smitovi.
         
    * Přidáno řádné odřeknutí zodpovědnosti a přiřazení pro Google Translate, jak vyžaduje podmínky Google Translate. Také,&lt;html &gt; tag v HTML pro každou webovou stránku nyní správně identifikuje non-anglické webové stránky jako byly stroje přeloženy. Díky Mikovi Smitovi.
         
    * BUG FIX: Přihlašovací webové stránky nyní fungují správně s různými jazykovými nastaveními. Díky Mikovi Smitovi.
         
    * NOVÝ orderBy Suma filtru. A nové Check All and Uncheck Všechna tlačítka zapnuta EDDGrid Datový přístupový formulář. Díky příspěvku Marco Alba.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO: Jestliže máte
        &lt;Question MarkImageFile &gt; Dotazník Mark.jpg&lt;/ Question MarkImageFile &gt;
ve Vašem setup.xml souboru musíte buď odstranit celou značku (doporučeno, takže je použit výchozí soubor) nebo změnit na:
        &lt;Question MarkImageFile &gt; Dotazník Mark.png&lt;/ Question MarkImageFile &gt;
         
    * Jen abys věděl, [Adoptium](https://adoptium.net/?variant=openjdk8) nahradil AdoptOpenJDK jako hlavní / doporučený zdroj Java   (OpenJDK) .
         
    * ZMĚNA: Soubory záznamu z ERDDAP™ , GenetateDatasets Xml a DasDds jsou nyní UTF-8, ne výchozí znaková sada počítače. Hodně jsem to kontroloval a udělal pár změn, abych zajistil, že ERDDAP™ vždy určuje správnou sadu znaků při čtení nebo zápisu všech druhů souborů, a již ne (v několika případech) spoléhá na výchozí znakovou sadu počítače. To opraveno několik chyb a pohyboval se tak blízko, jak jsem mohl k cíli použití UTF-8 pro co nejvíce typů souborů, jak je to možné (např. .log, .xml, .html, .json , .json l, .nc Hlavička) . Všimněte si, že k použití ISO-8859-1 je potřeba mnoho starších typů souborů (např. OPeNDAP .das, .dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Předtím jsem se snažil pracovat se skupinou CF a Unidata přidat podporu UTF-8 v .nc 3 soubory; obě byly odolné.
         
    * NEW: Při stahování souborů z AWS S3, ERDDAP cache Systém FromUrl in EDDGrid FromFiles a EDDTable FromFiles nyní využívá nového AWS Transfer Manager ke stažení souborů přes paralelní části (tak velmi rychle.) . Cílová propustnost je nastavena na 20 Gbps, každý soubor, takže to funguje dobře se všemi typy AWS instance, ale zejména ty, které mají vynikající "Networking Performance". S touto změnou ERDDAP cache FromUrl systém nyní nabízí srovnatelné rychlosti, aby xarray přístup paralelizované stahování předčmáraných souborů, ale bez nutnosti převést zdrojové soubory z .nc a .hdf do začarovaných souborů xarray. Vlastně, ERDDAP systém je lepší, pokud je následující žádost číst ze stejného souboru, protože ERDDAP™ Nyní má místní kopii souboru. Naše komunita strávila roky standardizováním .nc a .hdf složky. Nemusíme to všechno vyhazovat, jen abychom získali dobrý výkon při ukládání dat v AWS S3. Díky Richovi Signellovi.
         
    * ZMĚNA: SearchEngine = Lucen je, prozatím, deprimovaný. Jedná se o komplexní systém, který často přináší výsledky, které jsou mírně odlišné od žádoucího chování searchEngine = originální. Pro téměř všechny ERDDAP™ instalace, časové úspory Lucene nevyrovnávají rozdíly ve výsledcích. Použijte prosím SearchEngine = originál, pokud je to možné. Pokud to způsobí problémy, napište Bobovi.
         
    * Lucenův hledač se teď chová víc jako původní hledač. Už neexistují případy, kdy si Lucy myslí, že datový soubor odpovídá a originál ne. Také, Luceniny žebříčky jsou teď stejné jako původní. (protože originál je nyní vždy používán k výpočtu hodnocení) .
         
    * BUG FIX: Od nedávného vydání, ERDDAP™ přestal vidět více než prvních 1000 objektů v daném AWS S3 kbelíku. Teď, ERDDAP™ opět vidí všechny objekty. Díky Andymu Zieglerovi.
         
    * BUG FIX: Nyní EDDTableAggregate Řádky odstraňují actual\\_range atribut vždy, když jeden nebo více dětských souborů údajů nezná své proměnné ' actual\\_range   (např. EDDTableFromDatabase) . Díky Erikovi Gelettimu.
         

## verze 2.15{#version-215} 
 (propuštěn 2021- 11- 19) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    ERDDAP™ má nový systém umožňující uživateli určit jazyk, který má být použit pro všechny webové stránky. Jestliže ERDDAP™ instalace je nastavena tak, aby ji používala, seznam jazyků se objeví v pravém horním rohu každé webové stránky. ERDDAP™ URL je před touto verzí pokračovat v práci a vždy vrátit anglický obsah, jako předtím.
        
Ne všechny texty nebo všechny webové stránky byly přeloženy. Na tomto projektu byla časová omezení, která zabránila Qi a Bobovi dostat se na 100%.
        
Zřejmá otázka zní: proč jsme do toho vložili tolik úsilí, když Chrome bude překládat webové stránky na mouše? Odpověď zní: takto získáme mnohem větší kontrolu nad tím, jak je překlad prováděn. Zejména existuje mnoho slov, která by neměla být přeložena na webových stránkách, např. názvy a souhrny souborů dat, názvy proměnných, parametrů, jednotek a organizací. Velká část překladatelského úsilí byla identifikace slov a frází, které by neměly být přeloženy. Strojní překlady také měly tendenci spojovat určité typy HTML markup. Správa překladu nám umožnila minimalizovat tento problém.
        
Překlad projektu byl proveden Qi Zeng (Google Summer of Code internista) a Bob Simons pomocí webové služby Google Translation. Byl to obrovský projekt. Díky. Qi&#33;
        
    * BUG FIX: ERDDAP™ Nyní umožňuje ID ORCID mít X jako poslední číslice. Díky Maurici Libesovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO:
        
        * Musíte udělat několik změn souvisejících s ERDDAP nový systém umožňující uživatelům určit jazyk pro webové stránky.
            * Na prvním řádku setup.xml a datasets.xml soubory, změnit na: enkódování = "UTF-8" a změnit kódování dokumentu ve vašem textovém editoru, takže je uloženo jako soubor UTF-8. GeneteDatasets Xml nyní předpokládá, že datasets.xml je soubor UTF-8.
            * Programátoři, kteří sestavují ERDDAP : Všechny ERDDAP™ .java soubory by měly být považovány za UTF-8 soubory ve výchozím nastavení. Do příkazové řádky javac můžete přidat "-enkódování UTF-8". (Ano.) 
            * Povolit tento systém (důrazně doporučeno) ,&lt;startBodyHtml5 &gt; tag, který zadáte datasets.xml , změnit "& amp&#33; loginInfo;" na "& amp&#33; loginInfo; | & amp&#33; jazyk; "tak, že seznam jazyků se objeví v pravém horním rohu každého ERDDAP™ webová stránka.
            *    ERDDAP™ pouze používá&lt;startBodyHtml5 &gt; tag, který zadáte datasets.xml zadat HTML obsah pro banner v horní části každého ERDDAP™ webové stránky, bez ohledu na to, jaký jazyk uživatel vybere. Pokud změníte značku na použití
" &EasierAccessToScientificData; "místo" snadnější přístup k vědeckým údajům "a
" &BroughtToYouBy; "místo" Přineseno k tobě, " ERDDAP™ bude používat přeložené verze těchto frází v banneru.
            * Podobně, nový výchozí&lt;ShortDescriptionHtml &gt; in datasets.xml vá
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Poslední 3 řádky obsahu jsou věci, které budou nahrazeny přeložený text. Pokud některý z nich převedete (zejména a to částice Erddap;) nebo všechny z nich explicitní text v datasets.xml   (která má přednost, je-li přítomna) nebo messages.xml, že text se objeví bez ohledu na to, jaký jazyk uživatel vybere. Tohle není perfektní, ale došlo mi, že pár administrátorů bude chtít upravit&lt;ShortDescriptionHtml &gt; v 35 různých souborech poskytnout 35 různých přeložených verzí této značky.
        
          
         
    * ZMĚNA: Některé chyby jsou nyní zpracovávány mírně jinak, a tak může být přidána do součtu "Neúspěšné žádosti" na status.html a v Daily Report Email. Takže tato čísla mohou být o něco větší než předtím.
         
    * BUG FIX: GeneteDatasets Xml pro EDDGrid Lon0360 a EDDGrid LonPM180 nyní vylučuje zdrojové datové soubory s datasetID = ~. "\\*\\ _ LonPM180 "a datasetID = ~. "\\*\\ _ Lon0360, "resp.
         

## Verze 2.14{#version-214} 
 (propuštěn 2021- 07- 02) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    (žádný)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * NEW: EDDGrid Lon0360, který dělá gridded datový soubor s hodnotami délky & gt; = 0 a&lt;= 360 z mřížkovaného datového souboru s hodnotami délky & gt; = -180 a&lt;= 180. Viz [ EDDGrid Dokumentace Lon0360](/docs/server-admin/datasets#eddgridlon0360) . Díky Daleovi Robinsonovi.
         
    * NEW: ERDDAP™ Administrátoři nyní mohou přepsat jakoukoli hodnotu v setup.xml pomocí proměnné prostředí s názvem ERDDAP \\ _ _ value Název _ před spuštěním ERDDAP . Například použít ERDDAP \\ _ baseUrl překoná&lt;baseUrl &gt; hodnota. To může být užitečné při nasazení ERDDAP™ s kontejnerem, jak můžete dát standardní nastavení v setup.xml a pak dodávat speciální nastavení přes proměnné prostředí. Pokud dodáte tajné informace ERDDAP™ Pomocí této metody se ujistěte, že informace zůstanou tajné. ERDDAP™ Čte proměnné prostředí pouze jednou za spuštění, v první sekundě spuštění, takže jeden způsob, jak použít to je: nastavit proměnné prostředí, start ERDDAP™ Počkej. ERDDAP™ je spuštěn, poté odstartuje proměnné prostředí. Díky Marcu Portierovi.
         
    * ZLEPŠENO: Pokud nějaké soubory v EDDTableFrom... Soubor dataset s mnoha soubory mají některé velmi dlouhé String hodnoty, dataset bude načítat mnohem rychleji a reagovat na požadavky mnohem rychleji. V minulých dílech... ERDDAP™ by alokovat hodně prostoru pro min a max String hodnoty v souborech, které jsou uloženy s informacemi souboru pro tyto soubory. Výsledný soubor byl obrovský, což způsobilo, že byl napsán a četl pomalu. Díky OBIS.
         
    * ZLEPŠENO: ERDDAP™ lépe interpretuje neobvyklé a neplatné sekvence znaků v CSV souborech. Díky OBIS.
         
    * Po roce potíží s Cassandrou jsem konečně úspěšně nainstaloval Cassandru. (v2) a tak se podařilo znovu provést testy s Cassandrou V2. Takže teď mohu s jistotou prohlásit, že ERDDAP™ pracuje s Cassandrou v2 a v3. Díky ONC.
         

## Verze 2.12{#version-212} 
 (propuštěn 2021-05-14) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: Pokud jste na černé listině předplatného, nemůžete si vyžádat seznam předplatného.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO: NOVÝ: systém, který automaticky omezuje schopnost škodlivých uživatelů a příliš agresivních legitimních uživatelů podávat velké množství souběžných žádostí, které by snížily výkon systému pro ostatní uživatele. Existují 3 nové volitelné značky v datasets.xml které můžete / měli byste přidat hned po&lt;GrapBackgroundColor &gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Další informace viz [ipUrčení MaxŽádosti](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ také nyní tiskne "Počet unikátních uživatelů (od spuštění) "na stránce status.html.
Díky osobě v Číně útočící na mou ERDDAP™ instalace.
         
    * Změna chování řidiče Postgresql: Když jsem aktualizoval ovladač Postgresql, názvy sloupců v seznamu tabulek generovaných Postgresql a GenetateDatasetsXml se vrátily všechny nahoru, namísto všech malých, jako předtím. Nevím, jestli to ovlivní jiné věci, protože databáze často považují tato jména za necitlivá. Můj testovací soubor stále funguje správně. Ale pokud váš datový soubor přestane pracovat s tímto ERDDAP™ Aktualizace, toto je možná příčina k pronásledování jako první.
         
    * BUG FIX: ERDDAP™ Nyní také správně zpracovává soukromé AWS S3 soubory. K dispozici byly další související zlepšení v manipulaci AWS S3 soubory. Díky Michaelu Ganglovi a Dylanu Pughovi.
         
    * NEW: EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybalené nyní můžete číst data z "struktur" v .nc 4 a .hdf 4 soubory. Pro identifikaci proměnné, která je ze struktury,&lt; sourceName &gt; musí používat formát: _ fullStructureName _ | _ memberName _, např. group1 / myStruct | Můj Člen. Díky NRL.
         
    * ZMĚNA: Nyní, pokud je současné využití paměti plus tento požadavek ještě mírně vysoký, Griddap sady nThreads pro tuto žádost na 1. Proto ERDDAP™ Šetří paměť, když je vzpomínka vzácná. Díky osobě v Číně útočící na mou ERDDAP™ instalace.
         
    * NOVÝ systém pro sledování počtu otevřených souborů (která zahrnuje zásuvky a některé další věci, nejen soubory) v Tomcat na počítačích Linux. Pokud se některé soubory omylem nikdy nezavřou, počet otevřených souborů se může zvýšit, dokud nepřesáhne maximální povolenou hodnotu a nestane se mnoho opravdu špatných věcí. Takže teď, na Linuxových počítačích (Informace nejsou k dispozici pro Windows) :
        
        * Na pravé straně webové stránky status.html se nachází nový sloupec "Otevřené soubory", který ukazuje procento otevřených souborů max. Na Windows je jen "?".
        * Kdy ERDDAP™ vygeneruje tyto informace na konci každého hlavního datového souboru, vytiskne se do záznamu. txt soubor:
openFileCount = _ current _ of max = _ max _% = _% _
        * Pokud je procento &gt; 50%, e-mail je zaslán na ERDDAP™ správce a e-mail Všechno Na e-mailové adresy.
        
Chcete-li zjistit více, nebo pokud vidíte tento problém na své ERDDAP™ , viz [Příliš mnoho otevřených souborů](/docs/server-admin/additional-information#too-many-open-files) .
Díky osobě v Číně útočící na mou ERDDAP™ instalace.
         
    * NEW: Přidal jsem hodně kontroly a manipulace "Příliš mnoho otevřených souborů", takže úkol prostě zastaví a uživatel vidí chybovou zprávu. Datové soubory již nebudou označeny jako špatné, pokud jejich čtení vyústí v chybu "Příliš mnoho otevřených souborů".
         
    * NOVÝ \\[ bigParentDirectory \\] / BadFilesFlag adresář:
Pokud vložíte soubor do tohoto adresáře s datasetID jako název souboru (na obsahu souboru nezáleží) , ERDDAP™ smaže badFiles .nc soubor pro tento datový soubor (pokud existuje) a reload data set ASAP. To způsobuje ERDDAP™ zkusit znovu pracovat se soubory dříve (Špatně?) označený jako špatný. Díky Marcu Albovi.
         
    * Při startu, pokud EDDGrid Z... souborů nebo EDDTableFrom... Soubor dataset má zpočátku 0 souborů ve svém seznamu známých platných souborů (např., je to nový datový soubor) , pak ERDDAP™ odloží načítání a nastaví vlajku tak, aby byla načtena co nejdříve po dokončení hlavních nakladačů. To zrychluje počáteční spuštění, když jsou nové soubory dat.
         
    * ZMĚNA: FileVisitorDNLS.testAWSS3 () a FileVisitorSubdir.testAWSS3 () ; nyní použijte AWS v2 (ne v1) SDK. Takže teď Git. ERDDAP™ distribuce nyní zahrnuje všechny potřebné soubory a již nemusíte ručně přidávat masivní soubor v1 AWS SDK jar.
         
    * ZMĚNA: Přešel jsem na používání Maven odhalit / shromažďovat závislosti (.jar soubory v / lib) . Změna v2 AWS SDK to vyžadovala. V budoucnu bude zapotřebí pro jiné dovážené kódy. Obrovské díky Kylovi Wilcoxovi, který poskytl pom.xml, který vytvořil a používá, který pro mě vyřešil několik problémů.
         
    * ZMĚNA: Parametr classpath (-cp) používá v GenetateDatasetXml, DasDds a dalších malých programů, které přicházejí s ERDDAP™ , a v poradenství programátorům je nyní mnohem jednodušší a neměl by nikdy změnit znovu, protože odkazuje na adresář, ne jednotlivé soubory:
\\ -cp tříd; C:\\\ programy\\ _ tomcat\\ lib\\ servlet-api.jar; lib\\\ *
         (nebo ':' místo ';' pro Linux a Mac) .
         (Měl jsem to udělat už před lety, když se z toho stala možnost.)   
         
    * NEW: GenerateDatasets Name .nc   (a související) soubory pro nalezení souborů s duplicitními časovými hodnotami. Viz [findDuplicate Čas](/docs/server-admin/datasets#findduplicatetime)   
         
    * NEW: datasets.xml může nyní zahrnovat&lt;palety &gt; tag, který převáží&lt;palety &gt; hodnota značky z messages.xml (nebo se vrátí na messages.xml hodnotu, pokud je prázdná) . To vám umožní změnit seznam dostupných palet, zatímco ERDDAP™ Běží. Také, pokud máte cptfiles v podadresáři ERDDAP™ adresář obsahu, ERDDAP™ zkopíruje všechny soubory\\ * .cpt v tomto adresáři do \\[ tomcat \\] / webové aplikace / erddap / WEB-INF / cptfiles adresář pokaždé ERDDAP™ začíná. Tyto změny společně umožňují přidat palety a mít změny přetrvávají při instalaci nové verze ERDDAP . Viz [dokumentace palet](/docs/server-admin/datasets#palettes)   
Díky Jennifer Sevadjianové, Melanii Abecassisové a možná dalším lidem z Pobřežní hlídky.
         
    * ZMĚNA: [&lt;slowDownTroubleMillis &gt;] (/ docs / server- admin / datasets # slowdowntroublemillis) je nyní používán pro všechny neúspěšné žádosti, ne jen několik typů.
         
    * ZMĚNA: vlákno RunLoadDatasets nyní přerušuje vlákno LoadDatasets na 3 / 4 LoadDatasets MaxMinut tak je více času pro LoadDatasets všimnout přerušení a odchod elegantně. Také existuje více a lepší diagnostické zprávy pro to.
         
    * Změněno ze staré verze Lucene na v8.7.0.
         
    * ZMĚNA: Emaily odeslané ERDDAP™ Nyní se objeví s fixní šířkou písma.
         
    * ZMĚNA: EDDGrid FromFiles nyní dostává hodnoty osy stejně jako atributy z PRVNÍ | Poslední soubor podle specifikace v&lt;metadataFrom &gt;. Díky. (ne) Ken Casey, et al.
         
    * ADDED podpora pro neplatné jednotky "stupeň\\ _ North" a "stupeň\\ _ East", které jsou omylem použity v posledních souborech (od 2020- 10- 01) ve verzi AVHRR Pathfinder 5.3 L3-Collated (L3C) SST soubory dat (nceiPH53 sst d1den a nceiPH53 sst n1den) . ERDDAP™ Nyní je lze standardizovat na platné jednotky. Díky. (ne) Ken Casey, et al.
         

## Verze 2.11{#version-211} 
 (propuštěn 2020-12-04) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: OrderByMean hodil NullPointerException, pokud proměnná měla jen jeden z\\ _ FillValue nebo chybí\\ _ Definovaná hodnota. Teď to zvládá správně. Díky Marcu Albovi.
         
    * BUG FIX: Byly problémy s ODV textovými soubory vytvořenými ERDDAP™ v v2.10. Ty problémy jsou vyřešené. Díky Shaunu Bellovi.
         
    * BUG FIX: Just in ERDDAP™ v2.10: Pokud v URL byly specifikovány hranice lonu, ohraničující pole nebylo vykresleno na mapě světa. Už zase. Díky Johnu Maurerovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: Just in ERDDAP™ v2.10: Skriptové soubory pro ArchiveADAtaset, GenerateDatasets Xml a DasDds nefungovaly, protože neměly změny v claspath, které byly přidány s ERDDAP™ V2.10. Teď už ano. Díky Marcu Albovi.
         
    * NOVÝ: datasets.xml Nyní můžete mít značku:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

V současné době, pokud je to pravda (nebo je-li tag prázdný, nebo není-li tag v souboru) , Pokud žádost uživatele vede k NullPointerException, ERDDAP™ bude email stohu sledovat na erd.data at noaa.gov   (s ERDDAP™ vývojový tým) . To by mělo být bezpečné a bezpečné, protože žádné důvěrné informace (např. žádost) je součástí e-mailu. To by mělo umožnit zachytit jakékoli nejasné, zcela neočekávané chyby, které vedou k NullPointerExceptions. V opačném případě uživatel vidí výjimky, ale ERDDAP™ Vývojáři ne, takže nevíme, jestli je problém, který je třeba napravit.
        
Je možné, že tato značka povede k jiným, podobné diagnostické informace e-mailem erd.data at noaa.gov v budoucnosti. Obsah e-mailu bude vždy minimální a souvisí s chybami, a ne, například, informace o použití. Díky Marcu Albovi.
         
        
    * ZMĚNA: Nyní, běžné typy komprimovaných souborů ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) jsou také zakázány pro požadavky na byte rozsah. To je zadáno pomocí&lt;extensionsNoRangeApplications &gt; in messages.xml.
         
    * ZNÁMÝ PROBLEM: Stejně jako u ERDDAP™ 2.10 .nc ml souborů, které se snaží změnit atribut, neměňte atribut. Jedná se o známou chybu v netcdf-java, kterou jsem nahlásil a říkají, že bude opravena v příštím vydání netcdf-java.
         

## Verze 2.10{#version-210} 
 (propuštěn 2020- 11- 05) 

*    **Nové funkce a změny (pro uživatele) :** 
    * NOVÝ: Nový [Interpolát](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) konvertor efektivně interpoluje hodnoty z hodnot souboru dat. Jako takový je obzvláště užitečný pro výzkumné pracovníky, kteří pracují s údaji o stopách zvířat. Tento převodník bere v tabulce s zeměpisnou šířkou, zeměpisnou délkou, a časové sloupce (a možná další sloupce) a vrací tabulku s dalšími sloupy s interpolovanými hodnotami. Tak, to je podobné populární [Xtractophythm](https://coastwatch.pfeg.noaa.gov/xtracto) skript původně vytvořil Dave Foley, ale nabízí výhodu zpracování až 100 bodů na vyžádání. Díky Davu Foleymu a Jordanovi Watsonovi ( NMFS ) .
         
    * ZLEPŠENO: Pokročilé vyhledávání je nyní přísné pro non-.html požadavky. Nyní bude házet výjimky pro žádosti, které mají trvalé chyby (např. žádosti, kde minLat &gt; maxLat) nebo dočasné chyby (např. žádosti o standard\\_name který neexistuje) . Pro .html požadavky, Advanced Search se nemění: stejně jako při vyhledávání Google, dělá své nejlepší a tiché opravy nebo ignoruje chyby. Díky Richovi Signellovi.
         
    * ZLEPŠENO: Mapa na stránce Pokročilé vyhledávání je nyní větší (Pořád musíš šimrat, ale míň.) a podstatně přesnější (ale stále není perfektní) . Díky Johnu Maurerovi.
         
    * ZLEPŠENO: Maska "Draw land" na webových stránkách Make A Graph a nastavení & .land =... v URL, která nyní požaduje mapu podporuje další dvě možnosti:
"obrys" jen nakreslí obrys, politické hranice, jezera a řeky.
"off" nic nenakreslí.
Viz [& .land =... dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Díky Johnu Maurerovi.
         
    * ZLEPŠENÉ: Grafy a mapy vytvořené ERDDAP™ nyní mohou používat tři nové typy značek: Náměstí bez hranic, kruh bez hranic, Trojúhelník bez hranic. Kód k tomu přispěl Marco Alba z ETT / EMODnet fyziky. Díky Marcu Albovi.
         
    * NEW: "files" systém nyní podporuje prostý Odpovědi typu souboru (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv nebo .xhtml .) např.: [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Díky Kylovi Wilcoxovi.
         
    * ZLEPŠENO: URL generované, když uživatel používá formulář pro přístup k datům (.html) nebo Make-A-Graph (.graf) webová stránka nyní správně zakódovat znaky \\[ a \\] . To dělá URL trochu těžší pro lidi číst, ale je lepší z web- bezpečnostní hlediska. Administrátoři mají nyní možnost nastavit relaxedQueryChars = ' \\[  \\]  | 'v souboru Tomcat server.xml (méně zabezpečené) nebo ne (bezpečnější) .
Díky Antoine Quericovi, Dominicu Fuller- Rowellovi a dalším.
         
    * NEW: Pokud žádost o soubory dat EDDTable obsahuje & add Proměnné Kde (_ atribut Název, atribut Hodnota _) , ERDDAP™ přidat všechny proměnné, které mají _ atribut Název = atribut Hodnota _ do seznamu požadovaných proměnných.
Viz [Přidat Proměnné V případě dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Díky Aurelie Briand, et al.
         
    * ZMĚNA: ERDDAP™ nyní odmítá žádosti o rozsah byte do / souborů / .nc nebo .hdf složky. Nesnažte se připojit ke vzdálenému .nc nebo .hdf jako by to byly místní soubory. Je příšerně neefektivní a často způsobuje i jiné problémy. Místo toho:
        * Použití(OPeN)DAPklientský software pro připojení k ERDDAP s DAP služby pro tento datový soubor (které mají / griddap / nebo / tabledap / v URL) . To je to DAP je pro.
        * Pro požadavek na podmnožinu dat použijte formulář datového přístupu.
        * Pokud potřebujete celý soubor nebo opakovaný přístup po dlouhou dobu, použijte curl , wget , nebo váš prohlížeč stáhnout celý soubor, pak přístup k datům z místní kopie souboru.
             
    * ZLEPŠENÉ: Txt výstupní volba byla přepsána na podporu nové verze ODV .txt soubory a na podporu řádného znázornění trajektorií, časových úseků a profilových dat.
         
    * ZLEPŠENO: Vyhledávací výrazy ve dvojitých uvozovkách jsou interpretovány jako řetězec json, takže mohou mít\\ kódované znaky. Mimo jiné, to vám umožní hledat přesnou shodu pro atribut, např. "instituce = NOAA  \\n "nebude odpovídat souboru dat s institucí = NOAA   NMFS . Díky Danu Nowackimu.
         
    * ZLEPŠENO: Na dalších místech čísla plovoucích bodů (zejména plováky přeměněné na dvojité) nyní se objeví jako mírně zaoblenější verze čísla na dalších místech, např. plovák, který byl dříve zobrazen jako dvojitý jako 32.27998779296875, by se nyní mohl objevit jako 32.28. Díky Kylovi Wilcoxovi.
         
    * BUG FIX: nesignováno celé číslo audio soubory byly čteny mírně nesprávně. Teď jsou správně čteny.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * POZOR: Poprvé utečeš ERDDAP™ v2.10, některé soubory dat založené na místních datových souborech se načtou **velmi** pomalu, protože ERDDAP™ potřebuje znovu vytvořit databázi informací o souboru. Po pomalém počátečním přetížení, budou načíst rychle, jako předtím. Prosím, buďte trpěliví.
         
    * Věci, které musíte udělat:
        * Při prvním spuštění v2.10, některé soubory dat nemusí načíst, protože ERDDAP™ je nyní přísnější ohledně některých metadat. Jako předtím, ERDDAP™ bude e-mailem Daily Report, když se poprvé načte. To bude zahrnovat chybové zprávy pro každý soubor dat, který nenahrál. Přečtěte si chybové zprávy pro zjištění problémů. Ve většině případů stačí udělat malou změnu metadat datového souboru, abyste vyřešili problém.
             
        * V datasets.xml , hledání&lt; sourceName & gt; (Poznámka '=' označení, které označuje [fined-value sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Pro většinu ERDDAP™ Tyhle jsou vzácné. Pokud některá z hodnot po '=' jsou struny (ne čísla) Nyní musíte přiložit řetězec do dvojitých uvozovek. Například,
Před:&lt; sourceName & gt; = KZ401&lt;/ sourceName &gt;
Po:&lt; sourceName = "KZ401"&lt;/ sourceName &gt;
             
        * NEW: V setup.xml je nové volitelné nastavení,&lt;defaultAccessibleViaFiles &gt;, který nastavuje výchozí&lt;accessibleViaFiles &gt; pro každý soubor dat. Výchozí hodnota této nové značky je false, která napodobuje předchozí ERDDAP™ Chování. Toto nastavení nižší úrovně může být potlačeno daným datovým souborem&lt;accessibleViaFiles &gt; nastavení.
            
DOPORUČENO (Protože existují uživatelé, kteří to chtějí) :
Jestli chceš dělat všechny EDD... Soubory FromFiles soubory přístupné přes souborový systém, pak
            
            1. Přidejte tuto značku do souboru setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Volitelně) Odstranit všechny
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
n datasets.xml protože výchozí hodnota je nyní pravdivá.
                 
        * Přidat atributy\\ _ FillValue:
             ERDDAP™ má výchozí hodnotu\\ _ FillValue pro všechny celočíselné proměnné: maximální hodnota datového typu (např. 127 pro proměnné byte) . Teď už ne. Aby se zabránilo zobrazení těchto hodnot jako datových hodnot (ne chybějící hodnoty) , je třeba výslovně uvést tyto atributy\\ _ FillValue. Od teď, pokaždé, když začneš ERDDAP™ , to pošle administrátorovi e-mail s .csv tabulky se seznamem celočíselných zdrojových proměnných, které nemají\\ _ FillValue nebo missing\\_value atributy a navrhované nové atributy\\ _ FillValue. Viz [Přidat\\ _ Vyplňte Atributy s hodnotou](/docs/server-admin/datasets#add-_fillvalue-attributes) pro více informací a pokynů.
             
        * Pokud sestavujete ERDDAP™ , je třeba upravit parametr classpath na příkazových řádcích javac přidat odkaz na tyto nové jar 's: lib / communs-jexl.jar; lib / aws-java-sdk.jar; lib / jackson- anytations.jar; lib / jackson- core.jar; lib / jackson- dataind.jar.
             
    * ZMĚNA: Tomcat 9 je nyní doporučená verze Tomcat pro ERDDAP . Nejnovější verze Tomcat 8.5 + je nyní také v pořádku. Uklízeli jsme. ERDDAP s [Pokyny pro instalaci tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Poslední verze Java 8 (ne Java 9, 10, 11,...) od [AdoptOpenJDK](https://adoptopenjdk.net/) zůstává doporučenou verzí Java místo ERDDAP . Java 8 má Long Term Support od AdoptOpenJDK, takže zůstává bezpečné použití, ale nezapomeňte získat nejnovější verzi z bezpečnostních důvodů.
        
    * NEW: Script SourceNames / Odvozené proměnné v tabulkových datových souborech
EDDTableFromFiles, EDDTableFromDatabase, a EDDTableFromFileName soubory mohou nyní obsahovat výrazy a skripty sourceName . To vám umožní vytvořit nové proměnné na základě existujících proměnných ve zdrojových souborech. Výpočet pro danou novou proměnnou se provádí v rámci jednoho řádku výsledků, opakovaně pro všechny řádky. Například, aby se zeměpisná délka proměnné s hodnotami v rozmezí -180 - 180 ° od proměnné s hodnotami v rozmezí 0 - 360 °:
        &lt; sourceName & gt; = Math2.anglePM180 (row.columnDouble ("re") ) &lt;/ sourceName &gt;
Podrobnosti viz [Skript SourceName](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Díky Bobu Simonsovi. (Kdo to předtím plánoval? ERDDAP™ v1.0 a konečně jsem našel způsob, jak to provést) , Kevin O 'Brien, Roland Schweitzer, John Maurer, a Apache JEXL knihovna za to, že dělá opravdu těžké části (a dělá to dobře) .
         
    * NEW: Nepodepsané celé datové typy (ubyte, ushort, uint, ulong) jsou nyní podporovány. Všimněte si, že mnoho typů souborů (např. .das, .dds, .nc 3) Nepodporujte všechny tyto nové datové typy. Viz [Údaje Typová dokumentace](/docs/server-admin/datasets#data-types) podrobnosti o tom, jak ERDDAP™ řeší tyto rozdíly. Zejména, protože(OPeN)DAP, zejména odpověď .dds, nepodporuje podepsané bytes, longs, nebo ulings, možná budete chtít použít ERDDAP je tabulková reprezentace .das a .das, jak je vidět v http ... / erddap / **informace** / _ datasetID Webová stránka _ .html (například: [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) které můžete také získat v jiných typů souborů nebo .nccsv Odezva na metadata (například: [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , z nichž oba podporují všechny typy dat ve všech situacích.
        
UPOZORNĚNÍ: U souborů dat, které jsou touto změnou ovlivněny, je možné, že uvidíte problémy s datovým souborem, protože údaje, které ERDDAP™ údaje ze zdroje mohou být odlišné (např., proměnné dříve čteny jako podepsaná celá čísla mohou být nyní čteny jako nepodepsaná celá čísla) . Výslednými problémy jsou: nové soubory, které nejsou přidány do datového souboru, a / nebo chyby při pokusu o přístup k datům. Pokud má datový soubor problémy, první věc, kterou je třeba zkusit, je [Nastavit tvrdý Vlajka](/docs/server-admin/additional-information#hard-flag) pro datový soubor. Pokud to ten problém nevyřeší, musíte se podívat do deníku. txt vidět chybové zprávy, ponořit do datasets.xml pro datový soubor, a / nebo možná rerun generateDatasets.xml pro datový soubor.
Díky netcdf- java 5.x (které vyvolaly problém) a nadcházející CF 1.9.
        
    * ZLEPŠENO: Nyní existuje [lepší dokumentace / poradenství](/docs/server-admin/datasets#s3-buckets) jak vytvořit datový soubor ze souborů v AWS S3 kýblech. Díky Micahu Wengrenovi.
         
    * ZMĚNA: Existuje několik změn souvisejících s "files" systém.
        * Kód k tomu byl přepsán na více tříd.
             
        * NEW: Uživatelské požadavky na výpisy adresářů mohou nyní požadovat, aby odpověď byla jedním ze standardních typů prostých tabulek, a to tak, že se přihlásí požadované rozšíření souboru: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv nebo .xhtml ). Například,
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Díky Kylovi Wilcoxovi a Shane St. Savageovi.
             
        * ZLEPŠENO: Nyní, Generovat Datové soubory Xml neobsahuje&lt;accessibleViaFiles &gt; tag ve výstupu. Předpokládá se, že datový soubor bude spoléhat na hodnotu nového&lt;defaultAccessibleViaFiles &gt; Tag in setup.xml. Viz [přístupné Soubory](/docs/server-admin/datasets#accessibleviafiles) .
             
        * ZLEPŠENO: Další typy souborů nyní podporují přístupnost ViaFiles: EDDGrid SideBySide, EDDGrid AgregateExistingDimension, EDDGrid FromErddap, EDDTableFromErddap, EDDGrid Fromeddtable, EDDTableFrom EDDGrid a EDDGrid FromEtopo. Pro tyto účely budou soubory z daného datového souboru vzdáleného / dětského souboru přístupné pouze tehdy, mají-li přístup jak rodič, tak vzdálený / dětský datový soubor ViaFiles nastaven na true (možná prostřednictvím&lt;defaultAccessibleViaFiles &gt;). Díky Damian Smyth a Robu Fullerovi.
             
        * DOPORUČENÍ: Doporučujeme zpřístupnit všechny příslušné soubory pomocí systému souborů&lt;defaultAccessibleViaFiles &gt; to true in setup.xml, protože existuje skupina uživatelů, pro které je to preferovaný způsob, jak získat data. Mimo jiné "files" systém usnadňuje uživatelům zjistit, které soubory jsou k dispozici a kdy se naposledy změnily, a tak usnadňuje uživateli udržovat si vlastní kopii celého souboru dat. Pokud obecně nechcete zpřístupnit soubory prostřednictvím systému souborů, nastavte&lt;defaultAccessibleViaFiles &gt; na false. V každém případě stačí použít&lt;accessibleViaFiles &gt; pro několik souborů dat, které jsou výjimkou z obecné politiky stanovené&lt;defaultAccessibleViaFiles &gt; (například při použití datového souboru .nc ml soubory, které nejsou pro uživatele opravdu užitečné) .
             
    * ZLEPŠENO: Pokud má zdrojový soubor informace o CF mřížce\\ _ mapování, generujte Datové soubory Xml pro gridded soubory dat přidají informace na globální&lt;addAtts &gt;, a informace budou přidány do globální&lt;sourceAtts &gt; vždy jsou data čtena ze souboru. Informace se objeví v globálních atributech datového souboru jako soubor atributů s předponou mřížky\\ _ mapování\\ _.
         
    * ZLEPŠENO: Podpora skupin při čtení .nc 4 (a do určité míry .hdf 5) složky. Obecně platí, že ERDDAP™ Dataset bude vytvořen z proměnných v jedné ze skupin souboru. Také, GenerateDatasets Xml pro EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybaleno nyní žádá o "skupinu" (např. "," pro všechny skupiny "," someGroup "," someGroup / someSubGroup ", nebo" \\[ kořen \\] "jen pro kořenovou skupinu) . Díky Charlesovi Carletonovi a Jessice Hausmanové.
         
    * ZLEPŠENO: GeneteData Xml pro EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybalený nyní podporuje volitelný parametr "DimensionsCSV", který vám umožní zadat zdrojové názvy rozměrů, které chcete, aby tento datový soubor používal. Použijte "" k získání proměnných, které používají nejvíce rozměrů, jako předtím. Také, související malá chyba, která nastala s tímto typem souboru je nyní opravena. Díky Sujal Manandharovi.
         
    * BUG FIX: GeneteDatasets Xml nyní správně uvádí "EDDTableFromJsonlCSVFiles" (ne "EDDTableFromJsonlCSV") jako jedna z možností EDDType. Díky Andymu Zieglerovi.
         
    * ZLEPŠENO: EDDGrid FromNcFiles Vybalené nyní standardizuje "jednotky" atributy pro standardní / "kanonické" udjednotky (stejná metoda jako převodník jednotek) . Například, "meter per second" , "meters/second" , "m.s^-1" a "m s-1" Všichni se stanou "m s-1" . Díky Andymu Zieglerovi.
        
UPOZORNĚNÍ: Je možné, že to způsobí problémy pro některé existující soubory dat (např. způsobit, že nové soubory budou označeny jako "špatné") . Pokud ano, [Nastavit tvrdý Vlajka](/docs/server-admin/additional-information#hard-flag) pro datový soubor tak, aby všechny zdrojové soubory byly přesměrovány s novým systémem.
        
    * ZLEPŠENO: Nyní je proměnné&lt; sourceName &gt; může určit pevnou hodnotu = NaN a proměnná může mít actual\\_range atribut, který určuje konečný rozsah. To je někdy užitečné, takže datový soubor (zejména EDDTableFromFileName dataset) může mít falešnou proměnnou (s)   (např. zeměpisná šířka, délka, čas) s pevnými hodnotami NaN, ale s platným actual\\_range   (nastaven atributem) . V Advanced Search pak může uživatel hledat soubory dat, které mají údaje v konkrétní zeměpisné šířce, délce, časovém rozsahu a tento datový soubor bude moci říci, že má relevantní údaje (i když všechny aktuální řádky dat zobrazí NaN) . Viz [dokumentace s pevnou hodnotou](/docs/server-admin/datasets#fixed-value-sourcenames) .
Díky Mathew Biddle.
         
    * NEW: Nyní, datasets.xml cunk pro EDDTableFromAsciiFiles nebo EDDTableFromColumnaAsciiFiles může obsahovat tag, který říká ERDDAP™ ignorovat všechny řádky v horní části souboru až do a včetně řádku, který odpovídá zadanému pravidelnému výrazu. Například,
        &lt;SkipHeaderToRegex &gt;\\\*\\\*\\\*Konec hlavy.\\*&lt;/ skipHeaderToRegex &gt;
bude ignorovat všechny řádky až a včetně řádku, který začíná s "\\*\\*\\ * Konec hlavy. "Viz [&lt;skipHeaderToRegex &gt; dokumentace] (/ docs / server- admin / datasets # skipheadertoregex) .
Díky Elimu Hunterovi.
         
    * NEW: Nyní, datasets.xml skunk pro EDDTableFromAsciiFiles nebo EDDTableFromColumnaAsciiFilesdataset může obsahovat značku, která říká ERDDAP™ ignorovat všechny řádky v souboru, které odpovídají zadanému regulérnímu výrazu. Například,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

Přeskočí všechny řádky, které začínají na "#". Viz [&lt;skipLinesRegix &gt; dokumentace] (/ docs / server- admin / datasets # skiplinesregex) .
Díky Elimu Hunterovi.
         
    * NEW: datasets.xml chunk pro každý soubor EDDTable může nyní obsahovat & add Proměnné Kde (_ BAR _ NamesCSV _) . Pokud ano, ERDDAP™ přidá widget pro každý ze zadaných atributů Názvy do formuláře datového přístupu datového souboru (.html webová stránka) aby bylo pro uživatele snadné přidat & přidat Proměnné Kde (_ atribut Název, atribut Hodnota _) na žádost.
Viz [Přidat Proměnné V případě dokumentace](/docs/server-admin/datasets#addvariableswhere) .
Díky Aurelie Briand, et al.
         
    * NOVÝ Third- Party nástroj: ERDDAP -Lint
         ERDDAP -Lint je program od Roba Fullera a Adama Leadbettera z Irského námořního institutu, který můžete použít ke zlepšení metadat ERDDAP™ Datové soubory. ERDDAP -lint "obsahuje pravidla a jednoduchou statickou webovou aplikaci pro provedení některých ověřovacích testů proti Vašemu ERDDAP™ Server. Všechny testy se provádějí v webovém prohlížeči. "Jako [Unix / Linux Lint nástroj](https://en.wikipedia.org/wiki/Lint_(software) ), můžete upravit stávající pravidla nebo přidat nová pravidla. Viz [ ERDDAP -Lint](https://github.com/IrishMarineInstitute/erddap-lint) pro více informací.
        
Tento nástroj je obzvláště užitečný pro soubory dat, které jste vytvořili před nějakou dobou a nyní chcete přinést -to-date s vašimi aktuálními preferencemi metadat. Například rané verze GenetateDatasets Xml se nesnažil vytvořit globální creator\\_name , creator\\_email , creator\\ _ type, or creator\\_url metadata. Hodil by se ti. ERDDAP -Lint identifikovat soubory dat, které chybí tyto atributy metadat.
        
Díky Robovi a Adamovi za vytvoření tohoto nástroje a jeho zpřístupnění ERDDAP™ komunita.
        
    * NEW: Nyní je v pořádku, pokud některé ze souborů v EDDGrid Soubor FromFiles nemá všechny proměnné. Soubory budou zahrnuty, jako kdyby měly proměnné (se všemi chybějícími hodnotami) .
Díky Dale Robinsonovi a Dougovi Latornellovi.
         
    * NEW: V logovém souboru a Daily Report jsou nové statistiky využití, které pomáhají administrátorům identifikovat uživatele, kteří způsobují problémy s pamětí. Statistiky se nazývají "OutOfMemory (Velikost pole) , "" OutOfMemory (Příliš velký) , "a" OutOfMemory (Příliš velký) . "Ukazují IP adresy uživatelů, kteří v těchto kategoriích podávali žádosti, a počet jejich žádostí. Pokud nebyly žádné problémové požadavky, tyto statistiky se neobjeví." OverPaměť (Velikost pole) "a" OutOfMemory (Příliš velký) "žádosti obvykle nejsou problém, protože žádosti byly tak velké, ERDDAP™ Chytil je rychle a vrátil chybovou zprávu. The "OutOfPaměť (Příliš velký) "žádosti jsou nebezpečnější, protože ERDDAP™ vynaložil nějaké úsilí, než si uvědomil, že není dostatek paměti v současné době k dispozici pro řešení požadavku (i když problém může být další požadavky přímo před těmito požadavky) .
        
Existují také nové statistiky s názvem "Velká žádost, IP adresa", které ukazují IP adresy uživatelů, kteří se velké požadavky (v současné době gridován .nc soubory &gt; 1GB) .
        
Také, tabulka časové řady na stránce status.html nyní obsahuje sloupec "memFail", který ukazuje počet žádostí, které selhaly s "OutOfMemory (Příliš velký) "chyby od posledních hlavních datových souborů. Jakékoliv jiné číslo než 0 je přinejmenším důvodem k obavám.
Díky Bobu Simonsovi.
        
    * NEW: Nová verze Hyrax zobrazuje seznamy adresářů jinak než předtím. ERDDAP™ Nyní si můžete přečíst staré a nové seznamy adresářů.
         
    * NEW: Dataset se načte a uživatelské odpovědi, které do dokončení &gt; 10 sekund (úspěšně nebo neúspěšně) jsou označeny " (&gt; 10&#33;) . "Proto můžete vyhledat log.txt soubor pro tuto frázi najít soubory dat, které byly pomalu k načtení, nebo číslo žádosti, které byly pomalu k dokončení. V souboru log.txt se pak můžete podívat výš, abyste zjistili, jaký byl problém s datovým souborem nebo jaký byl požadavek uživatele a od koho byl. Tyto pomalé zatížení datových souborů a uživatelské požadavky jsou někdy zdanění na ERDDAP . Takže vědět více o těchto požadavků vám může pomoci identifikovat a řešit problémy.
    * ZLEPŠENO: Při validaci souboru údajů CF DSG ERDDAP™ Nyní zajišťuje, že proměnné s atributy cf\\ _ role jsou v příslušném seznamu cdm\\ _...\\ _ proměnných a nejsou v jiných seznamech cdm\\ _...\\ _ proměnných. Pokud má například datový soubor timeseriesProfile proměnnou "station\\ _ id", která má cf\\ _ role = timeseries\\ _ id atribut, pak "station\\ _ id" musí být v seznamu cf\\ _ timeseries\\ _ proměnných, ale nesmí být v seznamu cf\\ _ profile\\ _ proměnných.
Díky Micahu Wengrenovi.
         
    * ZLEPŠENO: 'Zjednodušení' je nyní rychlejší, používá méně paměti, a může vrátit LongArray. Díky Unidata .
         
    * ZLEPŠENO: QuickRestart je nyní výrazně rychlejší pro EDDTableFrom (nc- related) Soubory (s výjimkou EDDTableFromNcCFFiles a EDDTableFromInvalidCRAFiles) Protože udělat Očekávané (a jiné místo) Nyní jen čte metadata výběrového souboru místo čtení všech dat. Díky Jessice Austinové.
         
    * ZLEPŠENO: Existuje nyní podpora pro časové řetězce s přesností větší než -the-millisecond, pokud další číslice jsou všechny 0 's, např. "2020-05-22T01: 02: 03.4560000Z". Díky Yibo Jiang.
         
    * ZLEPŠENO: GenerateDatasetsXml EDD.supposeDestinationName použitý k odstranění '(' a všeho po. Teď se odstraňuje.\\*) pouze pokud je to konec sourceName . Nyní také odstraňuje \\[ .\\* \\] pouze pokud je to konec sourceName . Díky Julienovi Paulovi.
         
    * ZLEPŠENO: GeneteData Xml nyní dělá proměnnou destinationName s unikátní přidáním\\ _ 2,\\ _ 3,..., podle potřeby. Díky Julienovi Paulovi.
         
    * ZLEPŠENO: Když Calendar2.parseDateTime parses dd, hh, nebo HH, první 'číslice' může být nyní prostor.
    * ZNÁMÝ PROBLEM: Počínaje ERDDAP™ 2.10 .nc ml souborů, které se snaží změnit atribut, neměňte atribut. Jedná se o známou chybu v netcdf-java, kterou jsem nahlásil a říkají, že bude opravena v příštím vydání netcdf-java.
         
    * BROKEN LINKS FIX: Vytvořil jsem vhodný systém pro testování na rozbité odkazy v ERDDAP™ webové stránky, takže by nyní mělo být velmi málo rozbité odkazy (alespoň od každého data vydání - často vznikají nové přerušené odkazy) .
         
    * BUG FIX: EDDTableFromHttpGet selhala s určitými typy žádostí. Teď už ne. Díky Emmě z BODC.
         
    * BUG FIX: Pro vyřizování některých požadavků, EDDTable udělal dočasný soubor pro každou požadovanou proměnnou, s názvem souboru končí v názvu proměnné. Pokud název proměnné byl také typem komprese (např. .Z) , ERDDAP zkusit (a selhává) k dekompresi dočasného souboru. Dočasné názvy souborů končí. Díky Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml a Calendar2.convertTo Java DateTime Formát je nyní mnohem méně pravděpodobné, že se špatně změní, když se snaží opravit možná neplatný formát data. Naznačuje to, že nebude změněn žádný automaticky navrhovaný formát dateTime. Díky Mathew Biddle.
         
    * BUG FIX: Pokud došlo k chybě při získávání obsahu ze vzdáleného URL, a pokud je obsah errorStream stlačen, ERDDAP™ Nyní správně rozkládá chybovou zprávu. Díky Bobu Simonsovi.
         
    * BUG FIX:&lt;předplatitToRemoteErdapDataset &gt; nebyl použit, když EDD... FromErddap dataset byl dětský dataset. Teď už ano. Díky Chrisovi Romsosovi.
         
    * BUG FIX: GeneteDatasets Xml už si nemyslí, že zdrojový proměnný název začínající "latinou" může být zeměpisná šířka. Díky Vincentu Luzzovi.
         
    * BUG FIX: Nyní, OutOfMemoryError při čtení datového souboru při zpracování žádosti uživatele není důvod přidat soubor do seznamu BadFiles. Díky Bobu Simonsovi.
         

## Verze 2.02{#version-202} 
 (propuštěn 2019-08-21) 

*    **Nové funkce a změny (pro uživatele) :** 
    * NEW: Existují dva způsoby, jak hledat soubory dat na více ERDDAP "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a. Pracují trochu jinak a mají různá rozhraní a možnosti.
        
        *    [Name ERDDAP s.html](/SearchMultipleERDDAPs.html) od Boba Simonse / NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) z Rob Fuller / The Marine Institute of Ireland.
        
Díky Tylar Murray za původní žádost.
         
    * ZLEPŠOVÁNÍ: žádost "files" systém ke stažení souboru, který je ve skutečnosti na vzdáleném místě (např. AWS S3) Nyní vede k přesměrování, takže uživatel bude skutečně stahovat data ze zdroje, namísto použití ERDDAP™ jako prostředník. Díky Andymu Zieglerovi a NOAA .
         
    * NEW: Jako příklad nových funkcí souvisejících s AWS S3-a pro usnadnění prohlížení a stahování souborů z veřejných AWS S3 kbelíků jsme vytvořili
         [~ 110 souborů vzorků](https://registry.opendata.aws/) které umožňují komukoliv procházet obsah téměř všech
         [AWS S3 Otevřené datové koše](https://registry.opendata.aws/) . Pokud kliknete na "files" odkaz pro některý z těchto výběrových souborů dat, můžete procházet adresář strom a soubory v tomto S3 kbelíku. Vzhledem k tomu, jak tyto soubory dat fungují, tyto seznamy adresářů jsou vždy dokonale up- to- date, protože ERDDAP™ dostane je na let. Pokud kliknete na strom adresáře na skutečné jméno souboru a kliknete na název souboru, ERDDAP™ přesměruje váš požadavek na AWS S3, takže si můžete stáhnout soubor přímo z AWS. ERDDAP™ Administrátoři mohou
         [přečíst návod, jak to udělat pro ostatní S3 kbelíky](/docs/server-admin/datasets#working-with-aws-s3-files) . Díky Andymu Zieglerovi a NOAA .
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Věci, které musíte udělat: žádné
         
    * ZLEPŠENO: ERDDAP metoda ukládání polí strun (StringArray) je nyní mnohem efektivnější paměť. Řetězec Pole se používají po celou dobu ERDDAP™ , zejména při čtení tabulkových souborů ASCII. Také, další změny, aby čtení CSV / TSV / SSV ASCII, columnar ASCII, a jsonlCSV tabulky datových souborů rychlejší a mnohem účinnější paměti. Výsledkem je: pro soubor 764 MB ASCII pro testování dat (ale stlačený na 52MB .gz soubor) s 3,503,266 řádky a 33 sloupce, maximální využití paměti šel z 10GB dolů na 0,6GB (na vrcholu) . Čas na čtení šel od ~ 7 minut (ale velmi se liší v tom, kolik fyzické paměti je v počítači) dolů na ~ 36 sekund (včetně 10 s pro zjednodušení () který je používán pouze GenetateDatasets Xml) . Mnoho dalších míst v ERDDAP™ bude mít prospěch z této zvýšené účinnosti paměti. Díky Tylar Murray a Mathew Biddle.
        
Prozkoumal jsem jiné řešení. (ukládání strun do StringArray jako UTF-8-kódovaných bytových polí) . To snižuje využití paměti o ~ 33%, ale za cenu ~ 33% zpomalení. Ve srovnání se systémem, který je nyní používán, se to zdálo jako špatný obchod. Je jednodušší dát počítači více paměti. (koupit více paměti ~ $200) než to udělat rychleji. (koupit celý nový počítač) .
        
Pokud je to vhodné, je stále dobrý nápad rozdělit obrovské tabulky datových souborů do několika menších souborů na základě některých kritérií, jako je stationID nebo čas. ERDDAP™ bude muset často otevřít pouze jeden z malých souborů v reakci na požadavek uživatele, a tak být schopen reagovat mnohem rychleji.
        
    * ZLEPŠENO: Nyní existuje [ ERDDAP™ Dokumentace AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files) , který popisuje, jak se dostat ERDDAP™ pracovat s datovými soubory v AWS S3 kýblech.
Také, ERDDAP™ nyní používá nové funkce v AWS S3 Java API.
Také, ERDDAP™ nyní umožňuje AWS S3 URL zahrnout další znaky (období, pomlčka, podtržení) ve jménech kbelíků.
Také, ERDDAP™ nyní vyžaduje, aby AWS S3 kbelík URL být identifikován zvláštním způsobem:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
kde prefix je volitelný.
Díky Andymu Zieglerovi a NOAA .
         
    * ZLEPŠENO: GeneteData Xml nyní léčí další časté missing\\_value s stand- iny jako chybějící hodnoty, a proto je pravděpodobnější převést sloupec na numerický datový typ. Také, PrimentiveArray.simply () Nyní protokoly, které konkrétní hodnota dat způsobil, že se k danému sloupci jako sloupec řetězců. Díky Mathew Biddle.
         
    * ZLEPŠENO:&lt;requestBlacklist &gt; nyní podporuje.\\*.\\*  (nebo\\*:\\*pro IPv6) na konci IP adres tak, abyste mohli čerpat větší kus IP adres, např. 110.52.\\*.\\*  (Čína Unicom Tianjin) . Viz dokumentace pro [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) Díky China Unicom a China Telecom.
         
    * ZLEPŠENO: Pokud zdroj datového souboru neuvádí "institution" atribut, GeneteDatasets Xml a načítání Dataset nyní získat z atributu "creator\\ _ institution" (je-li k dispozici) . Díky Micahu Wengrenovi.
         
    * BUG FIX: standardizovat Co nebylo vždy aplikováno na soubory ASCII.
EDDTable také správně neodpovídal omezením časových hodnot, když zdroj měl časové hodnoty String a standardizoval Co bylo použito.
Díky Palomě de la Vallee.
        
Předtím jsem jasně neřekl, že byste měli použít standardizaci. Jaké funkce, když je skutečně potřebujete (např., když různé zdrojové soubory ukládají hodnoty času různými způsoby) , protože některé požadavky na soubory dat, které používají standardizovat Co bude zpracováno trochu pomaleji.
        
    * BUG FIX: Chyba v kódu používaném EDDGrid FromNcFiles způsobil selhání s .nc 4 a .hdf 5 souborů, které mají "dlouhý" (int64) proměnné. Teď je to napraveno. Díky Friedlemannu Wobusovi.
         
    * BUG FIX: Malé změny souborů ISO 19115, aby byl jiný validátor šťastný. Díky Chrisovi MacDermaidovi a Anně Milanové.
         

## Verze 2.01{#version-201} 
 (propuštěn 2019-07-02) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: Chyba v kódu, který generuje formulář pro přístup k datům tabledap datové soubory způsobily, že webová stránka byla prázdná pro některé datové soubory. Také jsem vylepšil manipulaci s neočekávanými chybami na všech HTML stránkách, takže budou (obvykle) zobrazit chybovou zprávu. Díky Marcu Albovi.
    * ZLEPŠENO: GeneteData Xml už netiskne dlouhé varování na vrcholu výstupu. Místo toho, prosím viz [Name Datové soubory Xml výstup](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Díky Stevenu Baumovi.
    * ZLEPŠENO: GeneteData Xml nyní činí mírně odlišná doporučení v různých situacích pro&lt;updateEveryNMillis &gt; pro EDD... Ze souborů datových souborů. Také, GenerateDatasets Xml nyní odrazuje původní "extrakt" systém pro soubory EDDTableFromFiles.

## Verze 2.00{#version-200} 
 (propuštěn 2019-06-26) 

*    ** ERDDAP™ V2.00 je konečně tady&#33; Jo&#33;**   
     
    * Omlouváme se za dlouhé zpoždění potřebné k dokončení této verze.
Díky za trpělivost.
         
    * Dobrou zprávou je, že čas navíc byl použit k doplnění více funkcí, které uživatelé požadovali. Špatná zpráva je, že ani se zpožděním nebyly přidány všechny požadované funkce. Je nám líto, ale zdálo se, že je důležitější, aby se toto propuštění ven, než se zdržovat více (navždy?) neustále přidávat nové funkce. Slibujeme, že se v budoucnu vrátíme k častějším únikům.
         
    * "Verze 2? Jsou zde velké změny a neslučitelnost?"
Velké nové funkce? Ano.
Velké inkompatibilní nebo změny pro administrátory nebo uživatele? Ne.
Přeskočili jsme z v1.82 na v2.00:
        * částečně na oslavu 10 let (Nyní 11) od prvního veřejného vydání ERDDAP™   (v1.00 na 2008-05-06, což navenek vypadalo pozoruhodně jako v2.00) . V té době, ERDDAP™ přešla z jednoho zařízení na téměř 100 zařízení v nejméně 12 zemích (Austrálie, Belgie, Kanada, Francie, Indie, Irsko, Itálie, Jihoafrická republika, Španělsko, Thajsko, Velká Británie, USA) .
        * částečně označit významný doplněk zcela novým směrem: ERDDAP™ nyní má datový ingest systém pro zpracování stávajících služeb datového serveru (viz [EDDTableFromHttpGet](#eddtablefromhttpget) ) ,
        * a částečně proto, že to nebyl velký skok z 1,82 na 2,00 číselně, takže to vypadalo jako správný čas.
             
    * Další dobrou zprávou je, že nyní existují dvě další skupiny přispívající kód ERDDAP™   (v této verzi a s indikacemi budou pokračovat) Rob Fuller a Adam Leadbetter z Irského námořního institutu a Roland Schweitzer z PMEL a Weathertop Consulting. Děkuji mnohokrát. Je pravda, že pracují na projektech, které si sami vyberou, ale to je klasický model rozvoje open-source -- skupiny přispívají kódem pro funkce, které by nejvíce rádi viděli přidány. Přidaná výhoda pro přispěvatele: dostanou se k použití nových funkcí, jakmile jsou dokončeny; nemusí čekat na další vydání ERDDAP . Vaše skupina také může přispět&#33; Viz [ ERDDAP™ Průvodce programátorem](/docs/contributing/programmer-guide) .
         
    * Doufáme, že se vám bude líbit. ERDDAP™ v2.00. Těšíme se na dalších 10 let ERDDAP™ vývoj a stále větší využití po celém světě.
         
*    **Nové funkce a změny (pro uživatele) :**   
     
    * NEW: orderByMean filtr
místo tabledap soubory dat vypočítají prostředky pro určené skupiny. Také, všechny orderBy Volby nyní podporují další způsob definování skupin: _ numicVariable \\[ / číslo \\[ časové jednotky \\]  \\[ : ofset \\]  \\] _ např. čas / 1den nebo hloubka / 10: 5. Například, stationID , time, waterTemp & orderByMean  (" stationID , čas / 1 den ") by třídit výsledky podle stationID a čas, pak vypočítat a vrátit průměr WaterTemp pro každého stationID Každý den. To jsou pozoruhodně užitečné a výkonné nové funkce. Nový kód pro tyto funkce a změny starého kódu přispěli Rob Fuller a Adam Leadbetter z irského námořního institutu a předložili jej prostřednictvím Git. Děkuji. Rob a Adam&#33;
         
    * NOVÝ: typ výstupního souboru pro tabulky souborů dat: [.data Tabulka](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
soubor JSON formátovaný pro použití s Google Visualization klientská knihovna ( Google Charts ) . Kód k tomu přispěl Roland Schweitzer a předložil prostřednictvím Git. Děkuji. Rolande&#33;
         
    * NOVÝ: typ výstupního souboru pro tabulky souborů dat: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
který je jako stávající .jsonlCSV možnost, ale s názvy sloupců na prvním řádku. Díky Eugene Burgerovi.
         
    * NEW: Pokud to administrátor umožňuje, uživatelé se nyní mohou přihlásit s jejich [ORCID](https://orcid.org) Účet.
Jedná se o OAuth 2.0 autentizační systém, stejně jako Google autentizace. ORCID je ve velké míře využíván výzkumníky k jedinečné identifikaci. Účty ORCID jsou zdarma a nemají problémy s soukromí, které mají účty Google. Viz ERDDAP s [Pokyny pro ověřování pravosti orcidu](/docs/server-admin/additional-information#orcid) . Díky BCO-DMO (Adam Shepard, Danie Kinkade, atd.) .
         
    * NEW: Nový URL konvertor konvertuje out- of- date URL do up- to -date URL.
Viz... / erddap / convert / urls.html na libovolné ERDDAP™ instalace, např.
         [tento odkaz na převodník v ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . To by mělo být užitečné pro správce dat. Používá se také interně pomocí GenetateDatasetsXml. Díky Bobu Simonsovi a Sharon Mesickové.
         
    * ZLEPŠENÉ: [Převodník času](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) Nyní má možnosti převést jakýkoliv společný řetězec čas do ISO8601 řetězec čas, nebo převést UDUNITS -jako časová jednotka řetězec do správné UDUNITS řetězec časových jednotek. To by také mělo být užitečné pro ERDDAP™ administrátoři, kteří potřebují vědět, jaký formát specifikovat pro atribut "jednotky" pro proměnné času řetězce. To je také interně využíváno také GenerateDatasetsXml a standardizeJaké funkce EDDTableFromFiles. Díky Bobu Simonsovi.
         
    * NEW: [Převodník jednotek](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) má novou možnost "Standardizovat UDUnits".
Například, "deg\\ _ C / m" a "stupňů\\ _ C meters-1" jsou oba převedeny na
"titul\\ _ C m-1." Tato funkce je také používána normou Jaké funkce EDDTableFromFiles. Díky Bobu Simonsovi.
         
    * NOVÉ: Pro grafy (jiné než povrchové grafy) na griddapu a tabledap 's Make A Graph webové stránky, kdy osa x není časová osa, pokud je viditelná pouze podmnožina rozsahu proměnné x osy, jsou nyní tlačítka nad grafem pro posunutí levicové nebo pravé vlny X Axis. Díky Carrie Wall Bell / projektu Hydrophone.
         
    * NEW: Pro grafy může nyní osa X a / nebo Y použít stupnici log.
Uživatelé mohou ovládat měřítko osy Y pomocí nového widgetu na mřížce a tabledap Vytvořte si grafické stránky. Viz [.xRange a. yRange dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Díky Carrie Wall Bell / projektu Hydrophone.
         
    * ZLEPŠENO: ERDDAP™ nyní lépe využívá různých HTTP chybových kódů a nyní vrací(OPeN)DAPv2.0-formátované hlášení o chybě. Viz [podrobnosti](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Díky Antoine Quericovi a Aurelie Briandové.
         
    * ZLEPŠENO: Nepoužívat Netcdf-java / c nebo jiné softwarové nástroje pro připojení k .nc nebo .hdf spisy doručené ERDDAP / soubory / systém jako by to byly místní soubory. ERDDAP™ Nyní tyto požadavky odmítá. Je příšerně neefektivní a často způsobuje i jiné problémy. Místo toho:
        
        * Použití(OPeN)DAPklientský software pro připojení k ERDDAP s DAP služby pro datový soubor (které mají / griddap / nebo / tabledap / v URL) . To je to DAP je pro a dělá tak dobře.
        * Nebo použijte formulář datového přístupu datového souboru k žádosti o podmnožinu dat.
        * Nebo, pokud potřebujete celý soubor nebo opakovaný přístup po dlouhou dobu, použijte curl , wget , nebo váš prohlížeč stáhnout celý soubor, pak přístup k datům z místní kopie souboru.
        
          
         
    * ZLEPŠENÉ: ERDDAP™ homepage, Full Text Search je nyní nad "Zobrazit seznam všech datových souborů", protože je to nejlepší výchozí bod pro většinu uživatelů. Díky Didieru Mallarinovi a Maurici Libesovi.
         
    * ZLEPŠENO: Na DataProviderForm3.html tam jsou nyní dropdown seznamy společných standard\\_name "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a. Díky někomu na setkání IOOS DMAC.
         
    * ZLEPŠENO: Na / soubory / webové stránky je nyní odkaz na novou sekci "Co s těmito soubory mohu udělat?" v sekci / soubory / dokumentace. Tato část popisuje různé typy souborů a navrhuje, jak s nimi pracovat. Díky Maurici Libesovi.
         
    * ZLEPŠENÉ: Téměř každý požadavek ERDDAP™ Měl by být alespoň trochu rychlejší, a někdy mnohem rychlejší.
         
    * BUG FIX: Za určitých okolností, kdy soubor údajů EDDTable uložil data v některých typech .nc soubory, globální atribut "id" byl nastaven na navrhovaný název souboru, který obsahuje hash, aby byl jedinečný pro tento požadavek. Nyní je "id" správně ponecháno beze změny. (pokud je uvedeno) nebo nastaven na datový soubor datasetID   (není-li uvedeno) . Díky Johnu Maurerovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * TO: Toto vydání bude nějakou dobu trvat a pracovat od vás. Buďte prosím trpěliví a plánujte několik hodin na provedení požadovaných změn a několik hodin na experiment s novými funkcemi.
         
    * Chcete-li: Pro bezpečnost, udělejte záložní kopii vašeho aktuálního setup.xml a datasets.xml soubory, takže se můžete vrátit k nim v nepravděpodobném případě, kdy je třeba vrátit ERDDAP™ v1.86.
         
    * TO: Doporučené Java je nyní AdoptOpenJDK je OpenJDK 8 (LTS) + HotSpot.
Toto je varianta open source Java která nemá žádná omezení pro své použití (na rozdíl od Oracle s Java distribuce) . Je odvozen od Oracle s Java v on-going způsobem, Oracle požehnání. Z bezpečnostních důvodů je důležité zachovat Java verze up- to- date. Viz ERDDAP s [ Java návod k montáži](/docs/server-admin/deploy-install#java) .
         
    * TO DO: AdoptOpenJDK 's Java potřebuje malý doplněk k instalaci Tomcat: viz [Pokyny k úschově zdrojů](/docs/server-admin/deploy-install#contentxml) . Myslím, že to je náhrada za nastavení -XX: MaxPermSize, které (Přijmout) OpenJDK už nepodporuje.
         
    * TO: Nový výchozí a doporučuje&lt;fontFamily &gt; nastavení v setup.xml je
DejaVu Sans, které jsou zabudovány do AdoptOpenJDK Java . Viz
         [upravené pokyny pro instalaci písma](/docs/server-admin/deploy-install#fonts) .
         
    * TO DO: Mnoho značek se pohybuje od setup.xml do datasets.xml . Výhodou je, že můžete změnit jejich hodnoty, zatímco ERDDAP™ je spuštěn, bez restartování ERDDAP . Především se můžete snadno změnit.&lt;startBodyHtml5 &gt; pro zobrazení dočasné zprávy na webu ERDDAP™ úvodní strana (např. "Podívejte se na nový datový soubor JPL MUR SST v4.1"... nebo "This ERDDAP™ bude offline pro údržbu 2019-05-08T17: 00: 00 PDT až 2019-05-08T20: 00: 00 PDT. ") . Pokud / když změníte tyto značky datasets.xml , Změny nabudou účinnosti příště ERDDAP™ má být datasets.xml .
         
        
        1. Kopírovat tento obsah do vašeho datasets.xml soubor (kdekoli v blízkosti spuštění souboru, po&lt;erddapDatasets &gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One- by- one, zkopírujte hodnotu (pokud existuje) pro každou z těchto značek z vašeho setup.xml souboru do nového tagu, který jste právě vložili (výše) n datasets.xml . Například, pokud jste použili hodnotu 30 pro&lt;cacheMinut &gt; v setup.xml, měli byste zkopírovat tuto hodnotu do nového&lt;cacheMinut &gt; tag in datasets.xml   (i když je-li hodnota stejná jako nová výchozí hodnota, je nejlepší nechat značku v datasets.xml prázdný) .
            
Pokud se vaše hodnota liší od nové navrhované výchozí (jiné než pro&lt;startBodyHtml5 &gt; a&lt;ShortDescriptionHtml &gt;, které jsou užitečné pro přizpůsobení vašeho ERDDAP™ instalace), prosím zvažte přechod na nové výchozí hodnoty. To platí zejména pro&lt;partialRequestMaxBytes &gt; a&lt;partialRequestMaxCells &gt;, kde se v průběhu let významně změnila výchozí / navrhovaná hodnota.
            
Po zkopírování každé hodnoty odstraňte značku a její popis ze setup.xml. Je lepší mít tyto značky v datasets.xml . A nyní jsou lepší popisy v [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Záležitost nového systému je, že úplně první webové stránky, když začnete ERDDAP bude výchozí ERDDAP™ webová stránka. Každá další webová stránka bude používat... Html obsah, který zadáte v datasets.xml .
        
    * POZOR: Poprvé utečeš ERDDAP™ v2.0, datové soubory založené na místních datových souborech se načítají **velmi** pomalu, protože ERDDAP™ potřebuje obnovit svou databázi souborů v mírně odlišném formátu. Po pomalém počátečním přetížení, budou načíst rychle, jako předtím. Prosím, buďte trpěliví.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *    [Big New Feature: EDDTableFromHttpGet](#eddtablefromhttpget)   
Až do teď, ERDDAP™ jen číst data a zpřístupnit je uživatelům. Teď, ERDDAP™ má jednoduchý a účinný systém pro příjem dat v reálném čase ze senzorů. Kromě dalších funkcí nabízí tento datový soubor finifined-grained versioning: pamatuje si každou změnu datového souboru, kdy byl proveden, a kým. Obvykle budou uživatelé chtít jen nejnovější verzi datového souboru se všemi použitými změnami. Ale je tu možnost, aby si uživatelé vyžádali data z datového souboru, jak to bylo v každém okamžiku. To usnadňuje reprodukovatelnou vědu. Na rozdíl od většiny jiných souborů údajů v reálném čase jsou tedy tyto soubory údajů způsobilé pro [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . protože se setkají s DOI požadavek, aby se datový soubor neměnil, s výjimkou agregace. Viz [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Díky OOI (Už dávno a teď.) že jsme mluvili o potřebě tohoto a Eugena Burgera pro připomenutí toho, co je důležité.
         
    * Big New Feature: ERDDAP™ nyní mohou sloužit data přímo z externě komprimovaných datových souborů, včetně .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , nebo .Z. Data mohou obsahovat směs externě komprimovaných souborů (Možná starší datové soubory?) a non-externě komprimované soubory, a můžete komprimovat / dekomprese souboru kdykoliv.
        
Funguje to skvěle&#33;
Ve většině případů je zpomalení související s dekompresí souborů menší. Důrazně vás vyzýváme, abyste to vyzkoušeli, zejména pokud jde o soubory dat a / nebo soubory, které jsou zřídka používány.
        
Tohle ti možná ušetří 30 000 dolarů.
Tohle je jeden z mála ERDDAP™ funkce, které vám mohou ušetřit spoustu peněz - pokud stlačíte spoustu datových souborů, budete potřebovat mnohem méně RAID / pevné disky pro uložení dat, nebo naopak, můžete sloužit mnohem více dat (až 10x) S RAID, které už máte. Pokud vás tato funkce ušetří od nákupu dalšího RAID, ušetří vás asi 30 000 dolarů.
        
Viz [Externě komprimovaná dokumentace souborů](/docs/server-admin/datasets#externally-compressed-files) . Díky Benoitovi Perrimondovi a Palomě de la Vallee.
        
    * Big New Feature: Všechny EDDGrid FromFiles a všechny soubory EDDTableFromFiles podporují&lt;cacheFromUrl &gt; tag a a&lt;cacheSizeGB &gt; tag. Pokud není cacheSizeGB specifikována, stáhne se a uchová kompletní kopii vzdálených souborů datového souboru. Pokud je cacheSizeGB specifikována a je &gt; 0, stáhne se soubory ze vzdáleného datového souboru podle potřeby do lokální cache s omezenou velikostí, která je užitečná při práci s cloud- based (např. S3) datové soubory. Viz [cache Dokumentace FromUrl](/docs/server-admin/datasets#cachefromurl) detaily. Díky Bobu Simonsovi a Royovi Mendelssohnovi. (kteří již léta píší skripty pro zpracování místních kopií vzdálených souborů datových souborů) , Lloyd Cotten, Eugene Burger, Conor Delaney (když byl v Amazon Web Services) , a Google Cloud Platform.
         
    * NEW: Nový EDDTableFromJsonlCSV třída může číst tabulky data z
         [JSON Lines CSV soubory](https://jsonlines.org/examples/)   ("Lepší než CSV") . Díky lidem na Marine Institute of Ireland za to, že mi o tomto formátu a Eugene Burger a PMEL za žádost o podporu jako vstupní typ.
         
    * NEW: Všechny EDDGrid a všechny soubory EDDTableFromFiles podporují&lt;nThreads &gt; nastavení, které ukazuje ERDDAP™ kolik závitů lze použít při odpovědi na žádost. Viz [nThreads dokumentace](/docs/server-admin/datasets#nthreads) detaily. Díky Robu Bochenekovi z Axiom Data Science, Eugene Burger, Conor Delaney (když byl v Amazon Web Services) , a Google Cloud Platform.
         
    * Nová standardizace Co pro všechny podtřídy EDDTableFromFiles -
Dříve, pokud pro danou proměnnou, hodnoty důležitých atributů (např. scale\\_factor , add\\_offset , missing\\_value ,\\ _ FillValue, jednotky) nebyly konzistentní, EDDTableFromFiles by vybrat jednu hodnotu pro každý atribut být "platné" a označit soubory s jinými atributy hodnot jako "Bad Files". Existuje systém pro standardizaci souborů, jakmile EDDTableFromFiles přečte soubory. Viz [Standardizace EDDTableFromFile Co?](/docs/server-admin/datasets#standardizewhat) . Jeden z ERDDAP Jeho hlavním cílem je zpřístupnit soubory dat a soubory dat konzistentním způsobem. standardizace Co je důležitým novým nástrojem k tomu, aby se to stalo skutečností. Díky Marcu Albě, Margaret O 'Brienové. (a ostatní uživatelé EML) , BCO-DMO, a InPort uživatelé.
         
    * NOVÉ EDDTableFromInvalidCRAFiles vám umožní vytvořit datový soubor ze sbírky NetCDF   (v3 nebo v4)   .nc soubory, které používají specifickou, neplatnou variantu FS Contiguous Ragged Array (CRA) složky. Ukázkové soubory pro tento typ datového souboru naleznete na adrese https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020- 10- 21 Tento server není nyní spolehlivě dostupný \\] . I když ERDDAP™ podporuje tento typ souboru, je to neplatný typ souboru, který by nikdo neměl začít používat. Skupiny, které v současnosti používají tento typ souboru, jsou silně vybízeny k použití ERDDAP™ generovat platné soubory CF DSG CRA a přestat tyto soubory používat. Díky Ajay Krishnanovi a Timovi Boyerovi.
         
    * EDDTableFromThreddsFiles a EDDTableFrom Hyrax Soubory jsou nyní znesvěcené. Přepněte prosím na EDDTableFromNcFiles (nebo varianta) plus&lt;cacheFromUrl &gt;. Pokud to nebude z nějakého důvodu fungovat, e-mail erd.data at noaa.gov . Pokud do roku 2020 neexistují žádné stížnosti, mohou být tyto typy souborů údajů odstraněny.
         
    * ZLEPŠENO -- Systém pro automatickou přeměnu non-ISO 8601 krát na ISO 8601 krát (zavedeno v bodě v1.82) byl značně rozšířen, aby se zabýval velkým počtem dalších formátů. To ovlivňuje GenetateDatasetsXml a ERDDAP zpracovává zdrojová metadata.
         
    * ZLEPŠENO -- Se svou třetí velkou revizí systému časové analýzy String (a doufejme, že poslední) , ERDDAP™ nepoužívat Java DateTimeFormatbecause of bugs which sometimes affect extreme times (years&lt;= 0000). ERDDAP™ Nyní používá svůj vlastní systém pro rozdělení časových řetězců.
         
    * POZOR: Nový systém parsing String time je poněkud přísnější. Pokud má jeden z vašich souborů najednou pouze chybějící hodnoty pro časové hodnoty, je příčinou téměř jistě, že řetězec časového formátu je mírně nesprávný. V záznamu by měly být chybové zprávy. txt souvisí s časovými hodnotami, které se neshodují s časovým formátem -- to by vám mělo pomoci opravit řetězec časového formátu tohoto datového souboru. Pokud potřebujete pomoc, použijte možnost ERDDAP Časový konvertor, který "Převést \\[ s \\] jakýkoliv společný čas řetězce do řetězce ISO 8601 "-- označuje formát, který konvertor použil k rozdělení zdrojového řetězce.
         
    * DOPORUČENÍ: Nejrychlejší, nejjednodušší a nejlevnější způsob, jak urychlit ERDDAP přístup k tabulkovým datům je vložení datových souborů na Solid State Drive (SSD) . Většina tabulkových souborů je relativně malá, takže 1 nebo 2 TB SSD je pravděpodobně dostačující k držení všech datových souborů pro všechny soubory tabulek. SSD nakonec vyprchá, když zapíšete data do buňky, smažete je, a zapíšete nová data do této buňky příliš mnohokrát. Místo toho doporučuji, aby (co nejvíce) Stačí použít SSD pro zápis dat jednou a číst je mnohokrát. Pak by dokonce i konzumní SSD mělo trvat velmi dlouho, pravděpodobně mnohem déle než jakýkoli Hard Disk Drive (HDD) . SSD třídy spotřebitelů jsou nyní levné (v 2018, ~ 200 dolarů za 1 TB nebo ~ 400 dolarů za 2 TB) a ceny stále rychle klesají. Kdy ERDDAP™ přístup k datovému souboru, SSD nabízí obojí
        
        * kratší zpoždění (~ 0.1ms, versus ~ 3ms pro HDD, versus ~ 10 (?) V případě, že se jedná o nehmotný majetek, musí být v souladu s čl.) a
        * vyšší propustnost (~ 500 MB / S, versus ~ 75 MB / s pro HDD versus ~ 500 MB / s pro RAID) .
        
Takže můžete dostat do ~ 10X výkon zvýšení (vs HDD) Za 200 dolarů&#33; Ve srovnání s většinou dalších možných změn vašeho systému (Nový server za $10,000? Nový RAID za 35 000 dolarů? Nový síťový spínač za $5,000? atd.) , To je zdaleka nejlepší návratnost investic (ROI) . Pokud váš server není nabitý pamětí, další paměť pro váš server je také skvělý a relativně levný způsob, jak urychlit všechny aspekty ERDDAP .
         \\[ SSD by bylo skvělé i pro gridded data, ale většina gridded soubory dat jsou mnohem větší, takže SSD velmi drahé. \\]   
         
    * NEW: Každý, kdo je přihlášen dostane roli = \\[ každý zaznamenaný V \\] , i když neexistuje&lt;Uživatel &gt; tag pro ně v datasets.xml . Pokud nastavíte datový soubor&lt;AccessibleTo &gt; \\[ každý zaznamenaný V \\] , pak každý, kdo se přihlásil ERDDAP™   (např. přes jejich Gmail nebo Orcid účet) bude mít oprávnění k přístupu do datového souboru, i když jste neurčili&lt;Uživatel &gt; tag pro ně v datasets.xml . Díky Maurici Libesovi.
         
    * ZLEPŠENÉ: UDUNITS Převodník jednotek UCUM byl značně vylepšen.
Ovládá neplatné jednotky lépe řetězce (začínající s důrazem na zachování informací, nikoli prosazování platnosti) . Také, výsledky nyní mají standardizovanou syntaxi.
         
    * NEW: UDUNITS / UCUM jednotky převodník má novou možnost standardizovat UDUNITS struna.
To funguje dobře pro platné UDUNITS struny a přiměřeně dobře pro nestandardní / neplatné UDUNITS struny. Například: UDUNITS = "metry za sekundu", "metr za sekundu", "m.s^-1" a "m s-1" Všichni se vrátí "m.s-1." To bylo potřeba pro novou standardizaci Jaký systém je popsán výše. Díky Marcu Albě, Margaret O 'Brienové. (a ostatní uživatelé EML) , BCO-DMO, a InPort uživatelé.
         
    * NEW: EDDTableFromMultidimNcFiles má nyní [Rozměry](/docs/server-admin/datasets#treatdimensionsas) možnost, která ukazuje ERDDAP™ k ošetření určitých rozměrů (např. LAT a LON) Jako kdyby to byly jiné rozměry. (např. ČAS) . To je užitečné pro některé nesprávné soubory, které používají různé rozměry pro různé proměnné, když by měly použít pouze jeden rozměr (např. ČAS) . Díky Marcu Albě a Maurici Libesovi.
         
    * NEW: Nyní všichni EDDGrid Od... Soubory soubory soubory soubory podporují novou speciální osu sourceName který ukazuje ERDDAP™ extrahovat informace z souboru Název (jen filename.ext) a použít hodnotu **nahradit** stávající hodnota osy vlevo. Formát je
        \\*\\*\\ * substitueFromFileName, _ dataType _, _ extractRegex _, _ captureGroupNumber _
Viz [Tato dokumentace](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Díky NOAA Daily agregation dataset Pathfinder.
         
    * NEW: Nyní všichni EDDGrid Od... Soubory soubory soubory soubory podporují novou speciální osu sourceName který ukazuje ERDDAP™ extrahovat informace z pathName souboru (adresáře + filename.ext)   
        \\*\\*\\ * patName, _ dataType _, _ extractRegex _, _ captureGroupNumber _
K tomu, jméno cesty vždy používá '/' jako znak oddělovače adresářů, nikdy '\\'.
Viz [Tato dokumentace](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Díky Palomě de la Vallee.
         
    * Nyní, všichni z EddTableFrom... Soubory datových souborů podporují další pseudo proměnnou sourceName s, které získávají informace ze souboru (jen filename.ext)   (viz [\\*\\*\\ * FileName](/docs/server-admin/datasets#filename-sourcenames) ) nebo z celého souboru pathName (/ dir1 / dir2 / filename.ext)   (viz [\\*\\*\\ * path Name](/docs/server-admin/datasets#pathname-sourcenames) ) . Díky Palomě de la Vallee.
         
    * NOVÝ: Pokud EDDGrid Dataset má jeden nebo více velmi velkých rozměrů (např. miliony hodnot) které zabírají spoustu paměti, můžete nastavit nový [&lt;dimensionValuesInMemory &gt;] (/ docs / server- admin / soubory dat # dimensionvaluesinmemory) nastavení na false (default je true) , což způsobí, že datový soubor uloží hodnoty na disk a v případě potřeby je získá. Díky Davidu Rodriguezovi a Richovi Signellovi (re: EDDGrid FromAudioFiles) .
         
    * V minulých dílech jste viděli... dataVariable s pro EDDTableFromFiles dataset a znovu načíst dataset, EDDTableFromFiles by přečetla všechny soubory dat. Může se vypořádat s přeobjednáním bez přesměrování všech datových souborů. Díky Rolandu Schweitzerovi.
         
    * ZLEPŠENO: Nyní, kdy ERDDAP™ čtení ASCII, NCCSV, a JSON Lines CSV tabulky datových souborů, pokud najde chybu na daném řádku (např. nesprávný počet položek) , zaznamenává varovnou zprávu ("VAROVÁNÍ: Přeskakující linka #..." neočekávaný počet položek... ") na [log.txt soubor](/docs/server-admin/additional-information#log) a pak pokračuje ve čtení zbytku datového souboru. Je tedy vaší povinností pravidelně hledat (nebo napsat skript tak učinit) za tu zprávu v deníku. txt, takže můžete opravit problémy v datových souborech. ERDDAP™ je nastaveno tak, aby uživatelé mohli i nadále číst všechna dostupná platná data, i když některé řádky souboru mají nedostatky. V minulých dílech... ERDDAP™ označil soubor jako "špatný" a odstranil ho z datového souboru.
         
    * ZLEPŠENO: Přesné časy (např. na nejbližší druhou nebo milisekundu) jsou uloženy u zdroje jako "minuty od..." (nebo větší jednotky) , ERDDAP™ Nyní je zaokrouhluje na nejbližší milisekundu při čtení hodnot do ERDDAP . V opačném případě jsou čísla plovoucích bodů poškrábaná a požadavky na údaje v konkrétních časech (např. čas = 2018-06-15T01: 30: 00) selže. V minulých dílech jste viděli... (a stále dělá, pokud jednotky jsou např., "sekund od..." nebo "milisekundy od...") . Nejlepší je vyhnout se tomuto problému tím, že nepoužívá velké jednotky (např. minuty nebo hodiny) ukládat přesné časové hodnoty (např. mikrosekundy) -- počítače dělají špatnou práci při manipulaci s desetinnými čísly. Díky Marcu Albovi.
         
    * ZMĚNY EDDTableFrom EDDGrid což je mnohem lepší. EDDTableFrom EDDGrid umožňuje uživatelům dotazovat se na gridded soubory dat, jako by to byly tabulky soubory dat ("dotaz podle hodnoty") .
        
        * Nyní podporuje&lt;maxAxis0 &gt; tag (výchozí hodnota = 10) která určuje maximální počet os \\[ 0 \\]   (obvykle "time" ) hodnoty, které mohou být dotazovány najednou. To zabraňuje naivní žádosti od získání EDDTableFrom EDDGrid prohledávat celý gridded dataset (který by selhal s timeout chybu) .
        * GeneteDatasets Xml má nyní možnost generovat EDDTableFrom EDDGrid soubory dat pro všechny soubory dat v dané oblasti ERDDAP™ které odpovídají specifikovanému regexu (použít.\\ * pro porovnání všech souborů dat) . Soubory dat, které vytvoří, mají v souhrnném atributu další informace, které naznačují, že se jedná o tabulkovou verzi souboru dat. A jejich datasetID je datasetID z gridded dataset, plus "\\ _ Asatable".
        * K dispozici je velká rychlost nahoru pro nejčastější nastavení: když gridded dataset je EDDGrid Name ERDDAP .
        
Díky Jamesu Gallagherovi a Edu Armstrongovi.
         
    * NOVÝ: generovat Datové soubory Xml pro všechny typy souborů dat je nyní mnohem pravděpodobnější přidat\\ _ FillValue nebo missing\\_value atribut numerické proměnné addAttributes . K tomu například dochází, když řetězec chybí hodnotové značky (např. ",". ","? "," NA "," nd "," NaN ") pro tuto proměnnou v souboru vzorků se převádí na ERDDAP rodné chybějící hodnoty (127 ve sloupcích byte, 32767 v krátkých sloupcích, 2147483647 ve sloupcích int, 9223372036854775807 v dlouhých sloupcích, a NaN v plovoucí a dvojité proměnné) . Vyskytuje se také pro hodnoty NaN v plovoucích a dvojitých proměnných. Také "nd" byl přidán do seznamu společných markerů chybějící hodnoty v číselných datových sloupcích, které ERDDAP™ Měl bych ho hledat. Díky Mattu Biddleovi z BCODMO.
         
    * ZLEPŠENO: možnost ncdump ve generování Datové soubory Xml je nyní více jako ncdump (ale stále používá netcdf-java verzi ncdump) . Vytiskne nový seznam možností. Nyní, pro .nc ml souborů, tiskne výstup ncdump pro výsledek .nc ml změny souboru aplikované na podkladový soubor .nc nebo .hdf Složka.
         
    * BUG FIX: Došlo k úniku rukojeti. (nakonec způsobuje ERDDAP™ zmrazit) způsobené při vytváření některých typů výstupních souborů, např. .geotif, zejména pokud došlo k chybám během tvorby. Myslím, že / doufám, že je to všechno opraveno. Pokud stále vidíte problémy, řekněte mi prosím typ datového souboru (mřížka nebo tabulka) a typ souboru, který je příčinou problému. Díky Stevenu Bealeovi, Lynn DeWittové, Jibei Zhaovi a dalším.
         
    * BUG FIX: U WMS   Leaflet Demo úplně / správně nepřevedlo "hloubku" na "výšku". Teď to tak je a požadavky na rozbitou legendu jsou opraveny. Také, všechny možnosti osy v rozbalovacích seznamech jsou vždy ve vzestupném pořadí. Díky Antoine Quericovi a Aurelie Briandové.
         
    * BUG FIX: EDDTableFromFiles nyní správně podporuje omezení na proměnné String, které byly vytvořeny z proměnných char v datových souborech. Díky Antoine Quericovi a Aurelie Briandové.
         
    * BUG FIX: Když je soubor nedostupný, datový soubor se snaží informovat (se zprávou "Tento datový soubor je momentálně nedostupný".) jeho předplatitelé, uvedené akce, rss, a lonPM180 soubory dat, které se na něj spoléhají. Díky Roy Mendelssohn a Bob Simons.
         
    * BUG FIX: Dva chyby související s EDDTableCopy. Díky Samovi McClatchiemu.
         
    * ZLEPŠENO: Počet neúspěšných žádostí uvedených na stránce status.html se zvýší, protože více věcí se počítá jako selhání než předtím.
         
    * ZLEPŠENO: ERDDAP Status.html nyní ukazuje "Žádosti (střední doba v ms) "v časové sérii. V minulých dílech jste viděli medián krát zkrácený na celé sekundy.
         
    * ZLEPŠENO: V jsonldově výstupu, jsonld "name" nyní pochází z datového souboru "title" n ERDDAP , a jsonld "titulek" nyní pochází z datového souboru " datasetID "v ERDDAP . Předtím to bylo obrácené. Zdá se mi to špatné, protože při běžném používání angličtiny je "jméno" obvykle krátké, (ideálně) Jedinečný identifikátor, který se zřídka / nikdy nezmění (např. Robert Middlename Simons) , Ne popis, který není jedinečný a který může snadno a často změnit (např., "Člověk, který píše software pro NOAA "vs." Vysoký chlap, který píše software pro NOAA ") . Páni, bylo by skvělé, kdyby schéma. [Název](https://schema.org/name) , v kontextu Dataset, byly konkrétnější. Vývojáři softwaru by měli mít možnost napsat implementaci specifikace založené pouze na specifikaci, bez pokynů odborníků. Ale já se oddávám Googlu. (zejména Natasha Noy) , NCEI (zejména John Relph) A Rob Fuller.
         
    * ZLEPŠENO: V jsonldově výstupu jsou čtyři hodnoty "spatialCoverall GeoShape box" nyní minLat minLon maxLat maxLon. V předchozích dílech Lat a Lon pozice byly obráceny. Páni, bylo by skvělé, kdyby schema.org definice [GeoShape](https://schema.org/GeoShape) specifikované správné pořadí. Vývojáři softwaru by měli mít možnost napsat implementaci specifikace založené pouze na specifikaci, bez pokynů odborníků. Díky Natasha Noy a Robu Fullerovi.

## Verze 1.82{#version-182} 
 (propuštěn 2018-01-26) 

*    **Nové funkce (pro uživatele) :**   
     
    * Četné jemné změny vzhled-and- pocit ERDDAP™ webové stránky.
        * ZLEPŠENO: ERDDAP™ nyní používá HTML 5 a lépe využívá CSS.
        * ZLEPŠENÉ: Webové stránky byly mírně upraveny tak, aby byly čistší a méně "rušné". (Jsou stále husté a stále jsou věci, na které by si člověk mohl stěžovat, ale doufejme mnohem méně než předtím.) Díky Johnu Kerfootovi za pár komentářů.
        * ZLEPŠENÉ: Webové stránky nyní vypadají mnohem lépe na mobilních telefonech a jiných malých zařízeních, zejména pokud je používáte při orientaci krajiny. Ve velmi malých a velmi velkých oknech ve stolních prohlížečích také vypadají lépe.
        * ZLEPŠENO: Pro zlepšení bezpečnosti a dalších důvodů použití zastaralé verze Openlays pro WMS demonstrace stránky byly nahrazeny Leaflet .
        * NEW: Podpora pro zobrazení obrázků, audio a video souborů "files" systém (například: [Tento soubor údajů o zkoušce](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) a v .htmlTable odpovědi, pokud má buňka URL souboru obrazu, zvuku nebo videa (například: [Tato žádost](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Pokud se vznášíte nad ikonou '?', měli byste vidět obrázek, audio nebo náhled video souboru. Můžete také kliknout na odkaz souboru pro zobrazení celé obrazovky souboru ve vašem prohlížeči. Viz [Dokumentace mediálních souborů](/docs/server-admin/datasets#media-files) . Všimněte si, že různé prohlížeče podporují různé typy souborů, takže příklady nemusí fungovat ve vašem prohlížeči.
Díky těmto lidem / odkazy na nápady a výběrový kód pro tipy pouze pro obrázky CSS- (byl v https://codepen.io/electricalbah/pen/eJRLVd ) a odložené zatížení obrazu (byl v https://varvy.com/pagespeed/defer-images.html )   (i když před použitím byl kód změněn. ERDDAP ) .
Díky Cara Wilson, Matthew Austin, a Adam Shepherd / BCO-DMO pro žádosti o podporu obrazu.
Díky Jim Potemra, Rich Sigdell, OOI, a Carrie Wall Bell pro žádosti o audio / hydrophone podporu souborů.
Díky OOI za zobrazení potřeby podpory videa.
        * NEW: Podmnožina dat ERDDAP™ datový soubor (ale obvykle datový soubor z audio souborů) Nyní lze uložit do .wav audio souboru. ( [dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Díky Jim Potemra, Rich Sigdell, OOI, a Carrie Wall Bell pro žádosti o audio / hydrophone podporu souborů.
        * ZLEPŠENO: Formát pro Web Accessible složky (WAF)   (např. / soubory / složky) byla aktualizována pro použití HTML tabulky. Nový formát napodobuje novější verzi adresáře se seznamem webových stránek vytvořených novějšími verzemi Apache. Lidé zjistí, že změny usnadňují čtení informací. Software, který rozebírá tyto dokumenty (např., software, který sklízí dokumenty ISO 19115 z ERDDAP ) bude třeba revidovat, ale nový formát bude jednodušší rozebrat než předchozí formát. (Pozor, Anno Milanová.) 
        * NOVÝ outOfDateDatasets.html strana. ( [příklad](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Tato webová stránka zobrazuje tabulku se všemi datovými soubory blízko- real-time, které mají&lt; testOutOfDate &gt; tag (viz níže) , seřazené podle toho, jak jsou data zastaralá. Tato palubní deska by měla být užitečná pro ERDDAP™ administrátoři a koncoví uživatelé, pokud chtějí vědět, které soubory dat jsou zastaralé. Pro soubory dat s externím datem je pravděpodobně problém se zdrojem dat, takže ERDDAP™ není schopen vidět / získat data z nejnovějších časových bodů.
Administrátoři: Pokud nechcete webové stránky Out- Of- Date Datasets, přidejte to do vašeho setup.xml:
            &lt;outOfDateDateDatasetsActive &gt; false&lt;/ outOfDateDateDatasetsActive &gt;
Teď jsou. testOutOfDate a ven Příloha V část 2 odst. allDatasets Dataset.
Díky Bobu Simonsovi, který to celé roky chtěl, a chytrým lidem Irského námořního institutu, kteří mi dali inspiraci prostřednictvím svého oddaného Malina Pi a monitoru, který vždy ukazuje obrazovku jako je tato v jejich kanceláři.
        * ZLEPŠENO: .htmlTable a .xhtml odezva je nyní lépe formátována, kompaktnější, a tím rychleji nabít. Díky HTML5 a CSS.
    * Nový typ výstupního souboru pro soubory dat Griddap: .timeGaps. Name Ukazuje seznam mezer v časových hodnotách, které jsou větší než střední mezera. ( [příklad](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) To je užitečné pro ERDDAP™ administrátoři a koncoví uživatelé, pokud chtějí vědět, zda existují neočekávané mezery v časových hodnotách pro datový soubor, u nichž se očekává, že budou pravidelně rozlišovat časové hodnoty. Díky Bob Simons a Roy Mendelssohn kteří potřebovali tuto funkci.
    * ZLEPŠENO: Výchozí graf allDatasets Dataset je nyní mapa s x = maxLon a y = maxLat. Díky Johnu Kerfootovi, Richovi Signellovi a OOI-CI.
    * NEW: [erdapy](https://github.com/ioos/erddapy) -- není ERDDAP™ funkce, ale bude zajímat mnoho ERDDAP™ uživatelé. Erdapy ( ERDDAP™ + Python ) je Python knihovna vytvořená Filipem Fernandesem, která "využívá ERDDAP s RESTful webové služby a vytváří ERDDAP™ URL pro jakýkoli požadavek, jako je vyhledávání souborů dat, získávání metadat, stahování dat atd. "Díky Filipe Fernandesové.
    * Měl jsem se zmínit předtím: K dispozici je třetí strana R balíček navržen tak, aby bylo jednodušší pracovat s ERDDAP™ uvnitř R: [readdap](https://github.com/ropensci/rerddap#rerddap) . Díky [rOpenSci](https://ropensci.org/) a Roy Mendelssohn.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * TO DO: V setup.xml, přímo pod&lt;Administrátor &gt;, prosím přidejte&lt;AdmintionUrl &gt; tag, který určuje URL pro vaši instituci (nebo skupina) .
    * TO: Tyto 3 značky v setup.xml se již nepoužívají:
        &lt;start HeadHtml &gt;,&lt;startBodyHtml &gt; a&lt;endBodyHtml &gt;. Jsou nahrazeny
        &lt;startHeadHtml5 &gt;,&lt;startBodyHtml5 &gt; a&lt;endBodyHtml5 &gt;, které mají výchozí hodnoty uvedené v messages.xml (a znázorněno níže) .
        
Doporučujeme použít výchozí&lt;startHeadHtml5 &gt; a&lt;endBodyHtml5 &gt;.
Doporučujeme: Pokud jste provedli změny originálu&lt;startBodyHtml &gt; a / nebo chcete přizpůsobit ERDDAP™ Nyní, prosím zkopírujte nový&lt;startBodyHtml5 &gt; tag (zespodu) do setup.xml a upravit jej přizpůsobit ERDDAP™ tak, že ERDDAP webové stránky odrážejí vaši organizaci, ne NOAA   ERD . Především, prosím, změňte "Přineseno k vám" do vaší organizace (s) . Pokud potřebujete pomoc, prosím, e-mail erd.data at noaa.gov . (Pokud nechcete přizpůsobit svůj ERDDAP™ Nyní použijte výchozí&lt;startBodyHtml5 &gt;.)
        
Pak smažte 3 staré značky ve vašem setup.xml, které již nejsou používány.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Existují další způsoby, jak můžete [přizpůsobit ERDDAP™ ](/docs/server-admin/deploy-install#customize) Takže ERDDAP webové stránky odrážejí vaši organizaci místo NOAA   ERD .
        
    * TO:&lt; EDDGrid ... Příklad & gt; tagy (začínající&lt; EDDGrid IdExample & gt;) a&lt;EDDTable... Příklad & gt; tagy (začínající&lt;EDDTableIdExample & gt;) ve Vašem souboru setup.xml se používá k vytvoření příkladů v griddapu a tabledap dokumentaci. html webové stránky ve vašem ERDDAP .
        
Pokud jste tyto značky neupravovali, vymažte je prosím ze svého setup.xml souboru. Nyní mají všechny chyby v messages.xml, které se vztahují na soubory dat v Bobově ERDDAP™ v https://coastwatch.pfeg.noaa.gov/erddap/index.html . Takže už nemusíte mít specifické soubory dat ve svém ERDDAP . Pokud chcete přepsat chyby, zkopírujte některé nebo všechny tyto značky do setup.xml a změňte jejich hodnoty.
Pokud chcete, aby příklady ukazovaly na váš ERDDAP™ , Nejjednodušší metoda je:
        
        1. Zahrňte tyto dva soubory dat do svého ERDDAP™ Přidáním tohoto k vašemu datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Přidat tuto značku do setup.xml, ale změnit URL na váš ERDDAP s ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Pokud jste udělali přizpůsobit tyto značky, nechte je tak, jak je a prosím přidejte tyto 2 nové značky do vašeho setup.xml pro určení ERDDAP™ URL pro tyto soubory dat, ale změnit URL na vaše ERDDAP s ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TO: ERDDAP™ nyní používá css soubor s názvem erddap2.cs. Pokud jste provedli (a) změny \\[ tomcat \\] / webové aplikace / erddap / images / erddap.css, zvažte podobné změny na erddap2.css (ve stejném adresáři) .
    * NEW: ERDDAP Webové stránky nyní mají velký počet téměř neviditelných vnitřních odkazů (text je černý a není podtržen) . Pokud se vznášíte nad jedním z těchto odkazů (obvykle prvních pár slov čísel a odstavců) , kurzor se stane rukou. Pokud kliknete na odkaz, URL je vnitřní odkaz na tuto část dokumentu. To usnadňuje odkazování na konkrétní části dokumentace. Díky Bobu Simonsovi, který to celé roky chtěl.
    * NEW: ERDDAP™ nyní podporuje [Rozsah bajtů / Acept- ranges](https://en.wikipedia.org/wiki/Byte_serving) žádosti o porce / souborů / souborů. To bylo potřeba pro podporu audio a video diváků v prohlížečích.
    * Chcete-li: Nyní, pro zlepšení bezpečnosti, pokud jste zadali&lt;baseHttpsUrl &gt; in setup.xml (a tím podpora https ) , doporučená vlajka Url je https URL s bezpečnější flagKey. Pokud ano, všechny předchozí flagrurls / flagKeys budou neplatné. Podání: Pokud se tyto změny vztahují na ERDDAP™ a pokud váš ERDDAP™ má EDDGrid FromErddap a EDDTable FromErddap 's, který se přihlásí na dálku ERDDAP s poté, co aktualizujete ERDDAP , ERDDAP™ automaticky se pokusí přihlásit s novým flagUrl, takže byste měli smazat staré předplatné a validovat nové předplatné, když dostanete nové potvrzení předplatného e-maily.
    * TO: Jestliže ERDDAP™ má EDDGrid Soubory dat FromErddap pro soubory dat erdVH3 na Bobově pobřežní hlídce ERDDAP™ , Prosím, změnit je odkazovat na nové soubory dat erdVH2018.
    * TO: Pokud do svého souboru zahrnujete některý ze vzorků jplAquariusSSS ERDDAP™ , prosím, změnit "V4" v datasetID Na V5.
    * TO: actual\\_range je nyní standardní atribut CF (od CF- 1.7) a jasně říká, že pokud proměnná používá add\\_offset a / nebo scale\\_factor pro balení hodnot dat, pak actual\\_range hodnoty by měly používat nebalený datový typ a měly by být vybaleny. Bohužel to je v rozporu s naší předchozí radou. GeneteDatasets Xml nyní vybaleno actual\\_range hodnoty, ale to neopraví existující soubory dat ve vašem datasets.xml Složka.
        
Takže, prosím zkontrolujte své soubory dat: pokud jsou hodnoty proměnné zabaleny a pokud actual\\_range je specifikováno jako balené hodnoty dat, prosím přidejte&lt; addAttributes &gt; actual\\_range hodnota pro určení hodnot nezabalených. Jinak se datový soubor nenačte ERDDAP . Jednoduchý a téměř dokonalý způsob, jak to udělat, je prohledat datasets.xml pro zdroj Atributy, které mají
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
a scale\\_factor jiné než 1.0. To jsou actual\\_range atributy, které možná budete muset napravit.
        
Pro proměnné osy v EDDGrid soubory dat, ERDDAP™ vždy nastavuje actual\\_range atribut je skutečný rozsah hodnot, protože tyto hodnoty zná.
        
Pro proměnné osy se sestupnými hodnotami (např. některé proměnné zeměpisné šířky) , ERDDAP™ vytvořeno actual\\_range s \\[ 0 \\] ... \\[ poslední \\] hodnoty, které byly vysoké... nízké. Vždy používá nízké... vysoké hodnoty k vytvoření nové CF definice.
        
Správnost actual\\_range hodnoty jsou důležité zejména pro soubory údajů EDDTable, protože ERDDAP™ rychle zamítne žádosti uživatelů o údaje, které jsou nižší než actual\\_range minimální hodnota nebo která jsou větší než actual\\_range maximální hodnota.
        
Související: skutečný\\ _ min, skutečný\\ _ max, data\\_min a data\\_max atributy jsou nyní zaostalé. Prosím, převést své soubory dat k použití actual\\_range místo toho.
        
    * UDĚLAT (volitelné, ale doporučené) : Pro každý blížící-real-time a předpověď datového souboru ve vašem ERDDAP™ , prosím přidejte [&lt; testOutOfDate &gt;] (/ docs / server- admin / datový soubor # testoutofdate) tag s hodnotou ve formuláři now- _ nUnits _, např. now- 2 dny. Je-li maximální časová hodnota datového souboru starší než tato hodnota, je datový soubor považován za zastaralý a bude jako takový označen [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) webová stránka. To poskytuje snadný způsob, jak můžete vidět, když je něco špatně se zdrojem datového souboru.
    *    [NEW: Semantické označení datových souborů s json- ld (JSON Propojená data) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ nyní používá [json- ld (JSON Propojená data) ](https://json-ld.org) aby Váš katalog dat a soubory dat součástí [sémantický web](https://en.wikipedia.org/wiki/Semantic_Web) , což je nápad Tima Berners- Leeho udělat obsah webu strojově čitelnější a stroj "pochopitelný". Vyhledávače ( [Zejména Google](https://developers.google.com/search/docs/data-types/datasets) ) a další sémantické nástroje mohou použít tuto strukturovanou markup pro usnadnění objevování a indexování. Json- ld strukturovaná markup se jeví jako neviditelné-to-lidé&lt;script &gt; Kód http://.../erddap/info/index.html webová stránka (což je sémantický web [DataCatalog](https://schema.org/DataCatalog) ) a na každém http://.../erddap/info/_datasetID_/index.html webová stránka (což je sémantický web [Dataset](https://schema.org/Dataset) ) . (Zvláštní poděkování Adam Leadbetter a Rob Fuller z Marine Institute v Irsku za to, že dělají těžké části práce, aby se tato část ERDDAP .) 
    * NEW: Existují nové typy datových souborů, které mohou číst data z audio souborů:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , který považuje zvuková data za Gridded data.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , který zachází s audio daty jako s daty tabulek. Díky Jim Potemra, Rich Sigdell, OOI, a Carrie Wall Bell pro žádosti o audio / hydrophone podporu souborů.
    * Změny generateDatasets Xml (a související změny) :
        * NEW: ERDDAP™ nyní má systém k automatickému [update out- of- date URL](/docs/server-admin/additional-information#out-of-date-urls) jak v GeneteDatasets Xml a při nahrávání souborů dat. Pokud máte návrhy na další URL, které by měly být zachyceny a aktualizovány, nebo pokud si myslíte, že by měly být přeměněny na službu (jako Converters) , prosím e-mail erd.data at noaa.gov .
        * NEW: Pokud GenerateDatasets Xml vidí CF standard\\_name   (které by měly být všechny malé případy) se zvýšeným charakterem, přidává všechny malé verze&lt; addAttributes &gt;. Také, když datový soubor načte, pokud ERDDAP™ viz CF standard\\_name s horní znak, to tiše mění na standard\\_name . Díky Richovi Signellovi.
        * NEW: Pokud GenerateDatasets Xml vidí atribut s časem, který není ve formátu ISO 8601, přidává čas formátovaný ISO 8601&lt; addAttributes &gt;. Pokud ERDDAP™ nerozeznává formát, zanechává hodnotu času beze změny. Pokud vidíte formát, který ERDDAP™ nepoznává a opravuje, prosím, e-mail to erd.data at noaa.gov .
        * ZLEPŠENÉ: Kód nízké úrovně EDDGrid FromThredds Katalogová volba v GenetateDatasets Xml nyní závisí na Unidata netcdf-java katalog crawler kód (Tři. katalogové třídy) aby to zvládlo všechny katalogy HISDDS (které mohou být překvapivě složité) . Díky Roland Schweitzer za návrh této změny a díky Unidata pro kód.
        * NEW: GenerateDatasets Xml pro EDDGrid FromDap nyní přidává, "startYeart- EndYear" ke konci titulu na základě skutečných hodnot časové osy. EndYear = "současnost", pokud za posledních 150 dní existují údaje.
        * NEW: GenerateDatasets Xml pro EDDGrid FromDap nyní dodává, " \\[ řešení \\] ° "k názvu, pokud je datový soubor rovnoměrně rozložen a stejný pro lat a lon.
        * ZLEPŠENO: Časový převodník má nyní další funkce, zejména schopnost převést řetězec časy v široké škále společných formátů do ISO 8601 řetězce nebo do UDUnits- kompatibilní číslo. Všechny dříve podporované funkce nadále fungují, nezměněny.
        * BUG FIX: GeneteDatasets Xml a konvertor Klíčová slova nyní obsahují "Earth Science &gt;" na začátku GCMD Science Klíčová slova. Když je datový soubor nastaven ERDDAP™ , ERDDAP™ Nyní opravuje všechna GCMD klíčová slova v atributu klíčová slova, která nezačínají s "Earth Science &gt;" nebo která používají něco jiného než titulní případ (kde první písmeno každého slova je kapitalizováno) .
        * ZLEPŠENO: Při navrhování&lt; destinationName &gt; 's, GenetateDatasets Xml pro EDDTableFromAsciiFiles právě použil zadní konec sourceName s '/'   (Někteří byli film- jako) . Teď používá celý sourceName (např. "blahblahblah (m / s)". Tato změna bude dobrá pro některé soubory dat a ne pro jiné, ale je to bezpečnější chování. Díky Maurici Libesovi.
        * BUG FIX: GeneteDatasets Xml a konstruktéři datového souboru nyní zajišťují, že neexistují žádné duplicitní názvy sloupců. Díky Maurici Libesovi.
        * BUG FIX: GeneteDatasets Xml pro EDDTableFromAsciiFiles nepsal&lt;kolonSeparator &gt; na výstup. Teď už ano. Díky Maurici Libesovi.
    * NEW: Nástroj DasDds nyní vytiskne informace o časové mezery (s [.timeGaps informace](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) je-li datový soubor gridded datový soubor.
    * NEW: Advanced Search nyní přijímá "now _\\ -nUnits _" časové hodnoty. Díky Richovi Signellovi.
    * ZLEPŠENO: Pro zlepšení bezpečnosti se při zapsání e-mailové adresy v metadatech nebo datech datového souboru na html webovou stránku nahrazuje "@" na ". To zachycuje pouze e-mailové adresy, které jsou celá metadata nebo hodnota dat, nikoli e-mailové adresy zabudované v delších hodnotách.
    * ZLEPŠENO: Pro zvýšení bezpečnosti RSS informace pro soukromé soubory dat jsou nyní k dispozici pouze uživatelům (a RSS čtenáři) kteří jsou přihlášeni a oprávněni používat tento datový soubor.
    * NEW: Když se načte datový soubor, pokud date\\_created , date\\_issued , date\\_modified nebo datum\\ _ metadata\\ _ modifikovaný atribut má časovou hodnotu, která není ve formátu ISO8601, ERDDAP™ změní ji na formát ISO 8601. Pokud ERDDAP™ nerozeznává formát, zanechává hodnotu času beze změny. Pokud vidíte formát, který ERDDAP™ nepoznává a opravuje, prosím, e-mail to erd.data at noaa.gov .
    * ZLEPŠENO: EDDGrid Datové soubory by nyní měly být podstatně rychlejší. Díky Richovi Signellovi.
    * Změny související s ERDDAP vytvoření dokumentů ISO 19115:
        * BUG FIX: při vytváření dokumentů ISO19115, dataVariable jednotky nebyly HTML Atributy kódované a procenta kódované. Teď jsou. Díky validátoru ISO 19115 NGDC.
        * BUG FIX: při vytváření dokumentů ISO19115, date\\_created byl používán tak, jak je, tak často byl špatný formát. Nyní je převeden na řetězec ISO 8601 Z. Díky validátoru ISO 19115 NGDC.
        * BUG FIX: při vytváření dokumentů ISO19115, ERDDAP™ Nyní delší píše data s rokem = 0000 (jako u souborů dat klimatologie) , protože schéma ISO 19115 neumožňuje data s rokem = 0000. Díky validátoru ISO 19115 NGDC.
    * NEW: Jako před žádostí http ... / erddap / verze vrátí pouze číslo verze (jako text) např. " ERDDAP \\ _ version = 1.82. "
Nyní, žádost o http ... / erddap / version\\ _ string vrátí číslo a volitelný soubor '\\ _' plus ASCII text (žádné mezery nebo kontrolní znaky) např. " ERDDAP \\ _ version\\ _ string = 1.82\\ _ JohnsFork. "Lidé na vidličce to specifikují změnou EDStatic.erddapVersion. Tento způsob, jak to dělá nezpůsobuje problémy pro předchozí verze ERDDAP . Díky Axiomu. (zejména Kyle Wilcox) a Irský námořní institut (zejména, Rob Fuller) .
    * BUG FIX: Pro wms verze = 1.3.0, žádost = GetMap , cr = EPSG: 4326 (ne CRS: 84) požadavky: bbox order musí být minLat, minLon, maxLat, maxLon. Pro CRS: 84 požadavků, stejně jako dříve, bbox objednávky musí být minLon, minLat, maxLon, maxLat. To může být stanoveno pomocí ERDDAP s WMS 1.3.0 služba v ArcGIS   (díky Paola Arce) . Díky. (ne) do OGC že jsi to tak zkomplikoval. Díky Leaflet za to, že to správně zvládám a za to, že mi dal způsob, jak to otestovat.
    * ZLEPŠENO: Předchozí, navrhovaný odkaz pro RSS a e-mailové předplatné má http URL pro váš ERDDAP . Teď je to https URL, pokud je aktivní.
    * NEW: EDDGrid Kopírovat nyní podporuje volitelnou značku&lt;pouze od &gt; _ someValue _&lt;/ onlySince &gt;, kde hodnota je specifický ISO-8601-formátovaný čas nebo now- nUnits (např. now- 2 roky) čas. Viz [pouze Od dokumentace](/docs/server-admin/datasets#onlysince) . Díky Drewovi P.
    * ZLEPŠENO: Je-li k dispozici, ERDDAP™ ukáže https URL (od&lt;baseHttpsUrl &gt;, je-li k dispozici) místo http URL když řekne uživatelům URL přidat / validovat / odstranit / seznam předplatného.
    * BUG FIX: ERDDAP™ nyní umožňuje předplatné akce začít s " https://" . (Bob si plácne po čele.) Díky Jennifer Sevadjianové.
    * BUG FIX: .jsonlKVP nyní používá ':' mezi každým klíčem a hodnotou, místo '=' . (Bob si plácne po čele.) Díky Alexandru Barthovi.
    * BUG FIX: V minulých dílech jste viděli... ERDDAP™ s quickRestart = true, a pokud, před načtením datového souboru normálně, jste zavolaly na EDDTableFromFiles dataset, který použil updateEveryNMillis, a pokud datový soubor byl právě změněn, požadavek by selhal s null ukazatel chyby. Nyní žádost uspěje. Díky Johnu Kerfootovi.
    * NEW: Když je datový soubor vložen ERDDAP™ , Klíčová slova jsou nyní přeřazeny do tříděného pořadí a všechny nové řádky znaky jsou odstraněny.
    * ZLEPŠENÝ: .json nebo .nc oJson žádost má .json p parametr, typ odezvy mime je aplikace / javascript. Všimněte si, že .json p není podporován pro .jsonlCSV nebo .jsonlKVP Protože by to nefungovalo. Díky Robu Fullerovi.
    * ZLEPŠENO: Typ mime pro volby souboru json řádků Type je nyní "application / x-jsonlines". Byla to aplikace / jsonl. V současné době neexistuje definitivní správná volba.
    * ZLEPŠENO: Počet neúspěšných žádostí uvedených na stránce status.html se zvýší, protože více věcí se započítává jako selhání než dříve, např. ClientAbortException.
    * ZLEPŠENO: Nyní, pokud odpověď od ERDDAP™ není komprimován, pak hlavička odpovědi bude obsahovat "Content-Encoding" = "identita".
    * ZLEPŠENO: Atribut "licence" nebyl vyžadován. Pokud to není specifikováno, standardní licence z messages.xml (nebo ze setup.xml, pokud je přítomen) používá se jako výchozí.
    * NEW: Nyní je volitelný [atribut filecompliance Suffix](/docs/server-admin/datasets#fileaccessbaseurl) . které mohou být použity se stávající [atribut souboru BaseUrl](/docs/server-admin/datasets#fileaccessbaseurl) .
    * ZLEPŠENO: Pro zvýšení bezpečnosti byla tato verze sestavena s nejnovějšími Java JDK v8u162.
    * NEW: Chcete-li zvýšit bezpečnost, několik společných domén, které nabízejí dočasné e-mailové adresy (např. @ mailinator.com) jsou nyní na trvalé e-mailové černé listině pro předplatné systému.
    * NEW: Pro zvýšení bezpečnosti, součty v Daily Report nyní zahrnují:
SetDataset IP adresa vlajky selhala (od poslední denní zprávy)   
SetDataset IP adresa vlajky selhala (od spuštění)   
SetDataset Name (od poslední denní zprávy)   
SetDataset Name (od spuštění)   
The "Failed" tallies let you see who (Hacker?) snaží se nastavit vlajku, ale selhává.
    * ZLEPŠENÉ: Chcete-li zvýšit bezpečnost, e-mailové adresy v&lt;Předplatné EmailBlacklist &gt; ve Vašem datasets.xml jsou nyní považovány za případy-necitlivé.
         

## Verze 1.80{#version-180} 
 (propuštěn 2017- 08- 04) 

*    **Nové funkce (pro uživatele) :**   
     
    * NOVÝ orderByCount  () filtr umožňuje určit, jak bude tabulka výsledků seřazena (nebo ne) a jen vrátí jeden řádek pro každou skupinu, s počtem počtu non-missing- hodnoty pro každou proměnnou.
Například, orderByCount  (" stationID ") bude třídit podle stationID a vrátit jednu řadu pro každého stationID , s počtem počtu non-missing- hodnoty pro každou proměnnou.
Pokud jen zadáte orderByCount  ("") , odpověď bude jen jeden řádek s počtem non-missing- hodnot pro každou datovou proměnnou.
Viz [ orderBy ... dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Díky Benu Adamsovi.
    * NOVÝ .nc soubor oJson Typová volba pro mřížky a tabulky souborů dat. Tato volba dělá NCO lvl = 2 "pedantický" soubor JSON se všemi informacemi, které se obvykle nacházejí v .nc Složka. Viz [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Díky Charliemu Zenderovi.
    * BUG FIX: U orderBy ... () možnosti na webové stránce Make A Graph jsou nyní zpracovány správně.
    * BUG FIX: .geoJson výstup nyní netiskne řádky, kde chybí hodnoty lat nebo lon. Také hodnoty nadmořské výšky (je-li k dispozici) jsou nyní zahrnuty v souřadnicích, nikoli jako hodnoty dat. Díky Jonathanovi Wilkinsovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * BEZPEČNOST: Knihovna protocols.js používaná pro OpenLayers Demo na demo WMS stránky v ERDDAP™ je zastaralá a má chybu, která umožňuje její zneužití. (Bohužel, aktualizace OpenLayers a protokoly. Js není snadné.) Tím se otevírá možnost, že knihovna by mohla být zřízena, aby umožnila zranitelnost na kříži. Nicméně, protože ERDDAP™ pouze použití OpenLayers v konkrétním přednastavovacím způsobem a pouze se specifickým ERDDAP - založené zdroje dat, jsme přesvědčeni, že neexistuje mezilokalitní zranitelnost ERDDAP použití OpenLayers a protokols.j. Nicméně, pokud tomu nevěříte, můžete nyní zakázat používání OpenLayers Demo na demo WMS Vaše stránky ERDDAP™ přidáním
```
        <openLayersActive>false</openLayersActive>  
```
k vašemu setup.xml souboru. Výchozí je "pravda". Díky Charlesovi Carletonovi a NCEI.
    * BEZPEČNOSTNÍ ZMĚNY: Nepoužité .jar soubory a duplicitní .jar soubory (protože jsou také v netcdfAll.jar) byly odstraněny z ERDDAP™ distribuce. Složky Out- of-date .jar byly aktualizovány. Díky Charlesovi Carletonovi a NCEI.
    * Bezpečnostní změny: Soubor netcdfAll.jar distribuován ERDDAP™ je nejnovější verze (v současnosti 4. 6. 10) , ale stále obsahuje interní soubory jackson .jar, které jsou známé jako out- of-date a mají bezpečnostní slabiny, zejména Jacksonovy knihovny, které se používají pouze při přístupu k datovým zdrojům Amazon S3. Pokud nemáte přístup k datům přes Amazon S3 (Věděl bys to, kdybys byl) , Tyto slabiny nejsou relevantní.
        
Společnost Amazon uvedla, že společnost LuxOpCo je v souladu se zásadou tržně jednajícího hospodářského subjektu. Viz [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Věřím jim. Pokud máte stále obavy, kontaktujte vývojáře netcdf-java. (Všimněte si, že pokud nevěříte vývojáři netcdf-java a uvažují, že nepoužívají ERDDAP™ Proto byste také neměli používat HISDDS, protože HISDDS používá netcdf- java více zásadně a rozsáhleji než ERDDAP .) 
        
Podrobnosti: Problémový kód a varování o zranitelnosti jsou:
netcdfAll-latest.jar / META-INF / maven / com.fasterxml.jackson.core / jackson- dataind / pom.xml
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Vysoká
netcdfAll-latest.jar / META-INF / maven / com.fasterxml.jackson.dataformat / jackson- dataformat-cbor / pom.xml
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Vysoká
netcdfAll-latest.jar / META-INF / maven / com.fasterxml.jackson.core / jackson- anotations / pom.xml
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Vysoká
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritický
netcdfAll-latest.jar / META-INF / maven / com.fasterxml.jackson.core / jackson-core / pom.xml
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Vysoká
Viz https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritický
"Pro verzi 4.6.10, aws-java-sdk-core tahá ve verzi 2.6.6 Jackson-\\ * artefaktů." (email od lidí netcdf-java) .
Díky Charlesovi Carletonovi a NCEI.
        
    * ZMĚNY KOMPILER: If you pencile ERDDAP™ , Všimněte si, že parametr -cp classpath potřebný pro příkazový řádek je nyní mnohem kratší než předtím. Viz nové nastavení -cp [Tato dokumentace](/docs/contributing/programmer-guide#development-environment) . Díky Charlesovi Carletonovi a NCEI.
    * Nová volba v generateDatasetech Xml: EDDTableFromBcodmo, který je určen pouze pro interní použití v BCO-DMO.
Díky Adamu Shepherdovi a BCODMO.
    * NOVÝ ATRIBUT A PÉČE: Pokud má sloupec EDDTable názvy webových přístupných souborů (např. obrazové, video nebo audio soubory) , můžete přidat
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
pro určení základní URL (končící /) potřebné k tomu, aby názvy souborů byly kompletní URL. Pak pro .htmlTable odpovědi, ERDDAP™ zobrazí název souboru jako odkaz na kombinovanou URL (základna Url plus název souboru) .
Jestli chceš ERDDAP™ sloužit souvisejícím souborům, vytvořit samostatný EDDTableFromFileName dataset pro tyto soubory (to může být soukromý datový soubor) .
Díky Adamu Shepherdovi a BCODMO.
    * NOVÉ DOPORUČENÍ ATTRIBUTE: Pokud má sloupec EDDTable názvy souborů webových přístupných souborů (např. obrazové, video nebo audio soubory) které jsou přístupné prostřednictvím archivu (např. .zip soubor) přístupné přes URL, použití
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
zadat URL pro archiv.
Jestli chceš ERDDAP™ sloužit archivnímu souboru, vytvořit samostatný EDDTableFromFileName dataset pro tento soubor (to může být soukromý datový soubor) .
Díky Adamu Shepherdovi a BCODMO.
    * ZLEPŠOVÁNÍ PRO GenerateDatasets Xml odstranit příčiny neplatné / špatné&lt; subsetVariables &gt; návrhy a duplicitní / špatná navrhovaná jména proměnných atd. Díky Richovi Signellovi, Adamu Shepherdovi a BCODMO.
    * Nová volba: Informace o politických hranicích rozdělené s ERDDAP je od třetí strany a poněkud mimo datum. Také existují sporné hranice na několika místech na světě, kde různí lidé budou mít různé představy o tom, co je správné. Nevysvětlujeme si korektnost politických boundarických údajů, které přicházejí s ERDDAP . Pokud se vám nelíbí politické hraniční informace, které přicházejí s ERDDAP™ , můžete nyní říct ERDDAP™ nikdy nečerpat politické hranice přidáním
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
k vašemu setup.xml souboru. Výchozí je "pravda". Díky Raju Devenderovi.
    * NEW METADATA TAG: Ve datasets.xml pro datový soubor, můžete nyní zadat výchozí počet barev Profily ve tvaru tyčí a dataVariable na grafy a mapy s
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (výchozí = -1, který říká, aby let ERDDAP™ rozhodnout) . Viz [barva Nastavení lišty](/docs/server-admin/datasets#color-bar-attributes) .
    * ZLEPŠENO: barva hranice státu na mapách byla fialová (Deep Purple pro vás Baby Boomers) . Teď je šedá. (mezi národní hranice šedá a země šedá) .
    * BUG FIX:&lt;iso19115Soubor &gt; a&lt;fgdcFile &gt; in datasets.xml ne vždy s nimi bylo zacházeno správně. Teď jsou. Díky BCODMO.

## Verze 1.78{#version-178} 
 (propuštěn 2017- 05- 27) 

*    **Nové funkce (pro uživatele) :**   
     
    *    (žádný)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * ZLEPŠENO: Pořadí řádků v "Major LoadDatasets Time Series" na stránce status.html je nyní nejnovější na vrcholu až nejstarší v dolní části.
    * BUG FIX: ERDDAP™ nyní píše .nccsv soubory s časovou proměnnou actual\\_range jako ISO-8601 String time. Tím se opravuje chyba pomocí EDDTableFromErddap paragování informací ze vzdáleného datového souboru a ze souboru QuickRestart pro všechny soubory EDDTableFrom.... (Čas actual\\_range bude chybná, když se datový soubor poprvé načte v v1.78, ale opraví po jeho opětovném načtení, např., pokud označíte datový soubor.) 

## Verze 1.76{#version-176} 
 (propuštěn 2017-05-12) 

*    **Nové funkce (pro uživatele) :**   
     
    * Změna v Tomcat: Pro žádosti o ERDDAP™ pocházející z jiného softwaru než z webových prohlížečů (např. curl , R, Matlab , Python , Java ) :
Stejně jako u předchozích změn verzí Tomcat (software nižší úrovně, který běží ERDDAP ) od začátku roku 2016, stále více znaků v dotazu části URL požadavku musí být [ **Procento zakódováno** ](/docs/server-admin/datasets#infourl) z bezpečnostních důvodů. Prohlížeče se starají o procento kódování pro vás. použití ERDDAP™ v prohlížeči není ovlivněn, pokud žádost není přesměrována na jiný ERDDAP .
    * ZLEPŠENÝ: ERDDAP™ ošetřeno **Char proměnné** spíš jako nesignalizovaná krátká celá čísla než znaky. Teď s nimi zachází spíše jako s 1- charakteristickou - dlouhou UCS-2 (Unicode) Šrouby. Viz [Char dokumentace](/docs/server-admin/datasets#char) . Díky Aurelie Briand a projektu Argo.
    * ZLEPŠENÝ: ERDDAP™ nabídl malou podporu pro **Unicode znaky** nad znak # 255 v Strings. Nyní, interně, ERDDAP™ plně podporuje 2-byte UCS-2 znaky (znaky s čísly 0 až 65535) v Strings. Když jsou data String zapsána do různých typů souborů, ERDDAP™ dělá to nejlepší, co může na podporu 2-byte chars. Dalším příkladem jsou .csv soubory, které ERDDAP™ píše se znakovou sadou ISO-8859-1 (a 1-byte charset) , ERDDAP™ píše jakékoli znaky nad znak # 255 s JSON- jako\\ u _ hhhh _ syntax. Viz [Data řetězců](/docs/server-admin/datasets#string) .
    * ZLEPŠENÉ: .nc soubory napsané ERDDAP™ , Char proměnné, které mají být interpretovány jako Strings bude mít atribut
         **\\ _ Kódování = ISO-8859-1**   
V .nc soubory čteny podle ERDDAP™ , Char proměnné s "\\ _ Encoding" budou interpretovány jako Strings se zadaným znaménkem.
    * Vzpomeňte si: ERDDAP™ podložky **JSON- jako backslash- enkódování** Speciální znaky, když specifikujete omezení proměnných char a String. Takže můžete požadovat něco jako & myString = "\\ u20ac", když chcete řádky dat, kde myString = €od 20ac je hexadecimální verze kódového bodu pro Euro symbol. Několik zdrojů na webu ukazuje čísla kódových bodů pro symboly Unicode, např. [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * ZLEPŠENÝ: ERDDAP™ nabídl omezenou podporu pro **dlouhé celé číslo** proměnné. Teď. ERDDAP™ plně podporuje vnitřní délky a dělá to nejlepší při zápisu dlouhých dat do různých typů souborů. Viz [dlouhá dokumentace](/docs/server-admin/datasets#long) . Díky Irskému námořnímu institutu Craig Risien, Rich Sigdell, Christopher Wingard a OOI.
    * NEW: výstupní typ souboru pro griddap a tabledap : ** .nccsv ** , což je NetCDF -jako, ASCII, CSV soubor, který také obsahuje všechny metadata, které by byly ve srovnatelné .nc Složka. Viz [NCSV Specifikace](/docs/user/nccsv-1.00) . Díky Stevu Hankinovi.
    * NEW: ** orderByClosest filtr** umožňuje určit, jak bude tabulka výsledků tříděna a interval (např. 2 hodiny) . V každé skupině se uchovají pouze řádky nejbližší intervalu. Například, orderByClosest  (" stationID , čas, 2 hodiny ") bude třídit podle stationID a čas, ale pouze vrátit řádky pro každého stationID kde poslední orderBy sloupec (čas) je nejblíže 2 hodinové intervaly. Tohle je nejbližší věc v tabledap k posunu hodnot v požadavku griddap. Tuto volbu lze zadat pomocí libovolného tabledap Dataset .html webové stránky, .graf webové stránky, a jakékoli URL, které si sami generovat. Díky Irskému námořnímu institutu a Ocean Networks Canada.
    * NEW: ** orderByLimit filtr** umožňuje určit, jak bude tabulka výsledků tříděna a limitní číslo (např. 100) . V rámci každé skupiny se uchovají pouze první "limitní" řádky. Například, orderByMax  (" stationID , 100 ") bude třídit podle stationID , ale vrátit pouze prvních 100 řad pro každého stationID . Je to podobné SQL doložce LIMIT. Tuto volbu lze zadat pomocí libovolného tabledap Dataset .html webové stránky, .graf webové stránky, a jakékoli URL, které si sami generovat. Díky Irskému námořnímu institutu a Ocean Networks Canada.
    * NEW: Dva nové typy souborů odezvy, ** .jsonlCSV a .jsonlKVP ** jsou k dispozici pro žádosti o gridded soubory dat, tabulky souborů dat a mnoho dalších míst v ERDDAP   (např. žádosti o informace o souborech dat) . Soubory jsou soubory JSON Lines ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) kde každý řádek má samostatný JSON objekt. .jsonlCSV má pouze hodnoty ve formátu CSV. .jsonlKVP má klíč: Hodnota párů. Každý řádek stojí na vlastní pěst. Řádky nejsou uzavřeny ve větším JSON poli nebo objektu. Například, viz [žádost o vzorek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Díky Damian Smyth, Rob Fuller, Adam Leadbetter a Irský námořní institut.
    * NEW: Je zde nová dokumentace popisující [ **Jak získat přístup k soukromým datům v ERDDAP™ pomocí Písma** ](/docs/user/AccessToPrivateDatasets) . Díky Lynn DeWittové.
    * ZLEPŠENÉ: Minimální rozsah ** OpenLayers ** mapa byla 2 stupně a nyní je 4 datové pixely. Díky Rustymu Hollemanovi.
    * ZLEPŠENÉ: V některých společných případech žádosti, které zahrnují **regulární výraz** Omezení bude zpracováváno mnohem rychleji.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    *    **SLOW PRVNÍ ZAHÁJENÍ:** Při prvním spuštění této nové verze, to bude trvat dlouho ERDDAP™ načíst všechny soubory dat, protože je třeba přečíst všechny zdrojové soubory (i když jen hlavička pro archivované datové soubory) . Pokud se podíváte na protokoly, můžete vidět chybové zprávy s nápisem "stará / nepodporovaná verze" některých interních souborů -- to je v pořádku -- ERDDAP™ vytvoří nové verze interních souborů. Prosím, buďte trpěliví.
    * AKCE: ERDDAP™ Nyní používá nový **java.time** třídy (také známý jako JSR 310) místo Joda parse String times do numerických časů. Poznámky:
        * Pokud ERDDAP™ najednou má problémy s parsing String times pro daný datový soubor a tak jen převádí většinu nebo všechny časy na NaN (chybějící hodnoty) , Problém je téměř vždy s datem Řetězec s časovým formátem, který jste zadali jako "jednotky" proměnné. Nový systém někdy potřebuje trochu jiný řetězec formátu dateTime.
        * Pokud číselné měsíce a dny v dateTime řetězce nejsou 0-paddited (např. "3 / 7 / 2016") , Ujistěte se, že formát má jen jeden M a d (např. "M / d / rrrr", ne "MM / dd / rrrr") .
        * Změna jakékoli specifikace zlomových sekund, která používá malá písmena s (např. .sss in yyyy-MM-dd Ne.) , do kapitálu S. (např. yyyy-MM-dd Ne.) .
        *    ERDDAP™ již nepodporuje datum řetězce Časové formáty s dvoumístnými roky (rrrr) s implicitním stoletím (např. 1900 nebo 2000) . Podniky utratily miliardy dolarů na nápravu tohoto problému koncem 90. let. Vědci by neměli používat dvouciferné roky. Prosím, opravte zdrojový soubor (s) Přepočtením na 4místný rok, poté použijte rrrr v den Formát času.
        * Můžete použít rrrr nebo RRRR (které ERDDAP™ konvertuje na uuu) na straně 4 číslicové roky, včetně záporných let, např. -4712 (což je 4713 př.n.l.) . Díky SeaDataNet, Thomas Gardner a BODC.
        * Prosím, pokračujte v používání Z ve formátu dateTime pro získání ERDDAP k rozdělení časového posunu (např., Z, + 0200, -08, -0800, -08: 30) .
        *    **Ujistěte se, že používáte Java verze 1.8.0\\ _ 21 nebo vyšší.** 
        * Programátoři -- Pokud píšete Java programy, které běží ERDDAP™ Kód, musíte odstranit odkaz na joda- time. sklenice v parametru cesty třídy.
    * NEW: ERDDAP s [ArchiveA Name](/docs/server-admin/additional-information#archiveadataset) může nyní vytvořit [ **Soubory Bagitu** ](https://en.wikipedia.org/wiki/BagIt) . NCEI může standardizovat tento formát. Díky Scottu Crossovi a Johnu Relphovi.
    * ZLEPŠENO: Odkazy ke stažení erddap. válka proti ERDDAP™ webové stránky nyní ukazují na **GitHub** . (Jsou to veřejné odkazy, takže se nemusíš přidat k GitHubu.) To znamená mnohem rychlejší stahování (do 12Mb / s proti 1Mb / s) a málo problémů se stahováním. Díky Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney a Irský námořní institut.
    * ZLEPŠENÉ: **status.html stránka a denní Status Report email** Nyní obsahuje sekci "Major LoadDatasets Time Series", která ukazuje statistiky o ERDDAP™ od konce každé hlavní nakladače Dataset pro posledních 100 hlavních nakladačů Dataset. Díky našemu problémovému RAID.
    * NEW: nový, volitelný (doporučená) parametr pro soubory dat EDDTableFromCassandra: [ ** &lt;partitionKeyCSV &gt; ** ] (/ docs / server- admin / datasets # partitionkeycsv) . Díky Ocean Networks Canada.
    * NEW: EDDTableFromAsciiFiles nyní podporuje ** &lt;ColumnSeparator &gt; ** parametr. Pokud null nebo "," třída bude hádat, jako předtím, Jinak, první znak bude použit jako oddělovač sloupce při čtení souborů. Díky Sky Bristol a Abigail Bensonové.
    * Novinka: nový typ datového souboru, [ **EDDTableFromNcsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , může vytvořit datový soubor agregací [Soubory NCSV. csv](/docs/user/nccsv-1.00) . Díky Stevu Hankinovi.
    * ZLEPŠENO: **EDDTableFromErddap** nyní používá .nccsv získat informace ze vzdáleného zařízení ERDDAP s a pro lokální archiv informací o metadatech. To umožňuje plnou podporu pro různé typy dat a pro Unicode (UCS-2) Charset pro Chars a Strings. Díky Robu Fullerovi a Irskému námořnímu institutu.
    * ZLEPŠENO: EDDTableFromErddap a EDDGrid FromErddap nyní podporuje ** &lt;přesměrovat &gt; false&lt;/ přesměrovat &gt; ** který ukazuje ERDDAP™ nikdy přesměrovat žádost na ovladač ERDDAP . Výchozí hodnota je pravdivá. To je užitečné, když ovladač ERDDAP™ je soukromý ERDDAP . Díky Damianu Smythovi, Robovi Fullerovi a Irskému námořnímu institutu.
    * ZLEPŠENO: ERDDAP™ nyní úlovky **zrušené uživatelské požadavky** dříve. A ERDDAP™ Nyní se vypne rychleji, protože nízké úrovně závitů vypne rychleji. Díky našemu problémovému RAID.
    *    **GeneteDatasets Xml:** 
        * NEW: Nový speciální EDDType "ncdump" tiskne [ncdump](https://linux.die.net/man/1/ncdump) \\ - jako výtisk z hlavičky .nc Složka. Můžete také vytisknout hodnoty dat pro zadané proměnné (nebo zadejte "nic", abyste nevytiskli žádné hodnoty dat) . To je užitečné, protože bez ncdump je těžké vědět, co je v souboru, a tedy, který EDDType byste měli specifikovat pro GenetateDatasetsXml. Díky Craig Risien, Rich Sigdell, Christopher Wingard a OOI.
        * NEW: Pro SeaData Čisté údaje:
V případě potřeby GenetateDatasets Xml nyní provádí specifickou sémantickou konverzi pomocí vzdáleného dotazu SPARQL: pokud metadata zdroje proměnné obsahují sdn\\ _ parametr\\ _ urn, např., sdn\\ _ parametr\\ _ urn = "SDN: P01:: PSLTZZ01", GenerateDatasets Xml přidá odpovídající atribut P02, např. sdn\\ _ P02\\ _ urn = "SDN: P02:: PSAL". Pokud máte soubory dat, které používají tyto atributy, a pokud vaše ERDDAP s&lt; categoryAttributes &gt; v setup.xml obsahuje sdn\\ _ parametr\\ _ urn a sdn\\ _ P02\\ _ urn, uživatelé budou moci používat ERDDAP™ Systém vyhledávání kategorií pro vyhledávání souborů dat se specifickými hodnotami těchto atributů. Díky BODC a Alexandře Kokkinaki.
        * ZLEPŠENO: GeneteData Xml nyní mění mnoho http:// odkazy v metadatech na https:// případně.
        * ZLEPŠENO: GeneteData Xml se nyní snaží hádat tvůrce\\ _ type a vydavatel\\ _ type.
        * ZLEPŠENO: Datové typy proměnné navržené GenetateDatasets Xml bude teď trochu lepší. Díky Margaret O 'Brienové, LTER a EML.
        * ZLEPŠENO: GeneteData Xml je lepší při stanovení&lt;cdm\\ _ data\\ _ type & gt; a přidání souvisejících, požadovaných atributů (např.,&lt;cdm\\ _ timeseries\\ _ variables & gt;, takže můžete poskytnout tyto informace. Díky Richovi Signellovi.
        * ZLEPŠENO: V generateData Xml, pro soubory dat EDDTable, návrh pro&lt; subsetVariables &gt; je nyní mnohem konzervativnější. Díky Johnu Kerfootovi.
        * ZLEPŠENÉ: Pokud datasets.xml pro soubory dat specifikuje featureType ale ne cdm\\ _ data\\ _ type, featureType bude použito jako cdm\\ _ data\\ _ type. Díky Richovi Signellovi.
        * BUG FIX: generovat Datové soubory Xml nyní naznačuje správnou&lt;dataType &gt; pro datové proměnné, které mají scale\\_factor , add\\_offset a / nebo\\ _ Nepodepsané atributy.
    * ZLEPŠENO: ERDDAP™ otevře .nc soubor, který je **kratší** než to má být (Například se to úplně neokopírovalo.) , ERDDAP™ Teď se k té složce chová špatně. V minulých dílech... ERDDAP™ vrácené chybějící hodnoty pro chybějící část souboru, protože to je výchozí chování pro netcdf-java. ERDDAP™ nyní používá ucar .nc 2.iosp.netcdf3.N3header.disallow FileTruncation = true; Díky naší problémové RAID a Christian Ward-Garrison.
    * ZLEPŠENO: Autor ISO 19115 nyní využívá **Tvůrce\\ _ type** , pokud je přítomen.
    * ZLEPŠENO: ERDDAP™ nyní používá nejnovější netcdf-java v4.6.9, který může číst další typy **netcdf-4 soubory** . Díky Craig Risien, Rich Sigdell, Christopher Wingard a OOI.
    * BUG FIX: vyhnout se problémům, pokud různé zdrojové soubory mají různé typy dat pro danou proměnnou. Díky Roy Mendelssohn a Eugene Burger.
    * BUG FIX: **Převody ve formátu času** jsou nyní lépe chráněny proti špatným časovým hodnotám. Díky NDBC.
    * BUG FIX: EDDGrid FromNcFiles Vybaleno nyní zpracovává časové hodnoty **"měsíce od..." a "roky od..."** správně (navýšením měsíce nebo roku, ne hrubým přidáním např. 30denní opakovaně) . Díky Soda3.3.1
    * BUG FIX: jen v v1.74, **Předplatné** požadovaný postup (např. http:// ...) , která byla a měla by být nepovinná.
    * BUG FIX: EDDGrid FromMergeIRFiles.low GetSourceMetadata () Nepřidal žádné globální atributy. Teď už ano.
         

## Verze 1.74{#version-174} 
 (propuštěn 2016- 10- 07) 

*    **Nové funkce (pro uživatele) :**   
     
    * Nyní, když seznam datových souborů (Všechny, nebo z hledání) je zobrazen na webové stránce, dlouhé tituly jsou zobrazeny na více řádcích. Dříve, střed dlouhého názvu byl nahrazen "...". Díky Margaret O 'Brienové, LTER a EML.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * Chcete-li: Na počítačích Linux, změnit nastavení Apache timeout tak, aby časově náročné uživatelské požadavky nemají timeout (s tím, co se často jeví jako "Proxy" nebo "Bad Gateway" chyba) . Jako kořenový uživatel:
        
        1. Změnit Apache http d.conf soubor (obvykle v / etc / http d / conf /) :
Změnit existující&lt;Timeout &gt; nastavení (nebo přidat jeden na konci souboru) až 3600 (sekund) , místo výchozího 60 nebo 120 sekund.
Změnit existující&lt;ProxyTimeout &gt; nastavení (nebo přidat jeden na konci souboru) až 3600 (sekund) , místo výchozího 60 nebo 120 sekund.
        2. Restartovat Apache: / usr / sbin / apachectl -K půvabný (ale někdy je v jiném adresáři.) .
        
Díky Thomasu Oliverovi.
         
    * NEW: \\[ bigParentDirectory / hard Adresář vlajky
To funguje jako adresář vlajky, ale verze hardFlag také smaže všechny informace o cached dataset. Nejsou žádné URL pro nastavení hard Flag. To lze použít pouze vložením souboru do tohoto adresáře.
tvrdé Vlajky jsou velmi užitečné, když děláte něco, co způsobuje změnu v tom, jak ERDDAP™ čte a interpretuje zdrojová data, například při instalaci nové verze ERDDAP™ nebo pokud jste provedli určité typy změn v definici datového souboru v datasets.xml . Viz [Tato dokumentace](/docs/server-admin/additional-information#hard-flag) . Díky Johnu Kerfootovi a všem Argovým skupinám.
         
    * NEW: GenerateDatasets Xml má nyní možnost EDDTableFromEML
který čte popis datového souboru v jazyce ekologických metadat (EML) soubor, stahuje související datový soubor, a generuje kus datasets.xml tak, aby datový soubor mohl být přidán do ERDDAP . K dispozici je také EDDTableFromEMLBatt, který dělá totéž pro všechny EML soubory v adresáři. To funguje velmi dobře, protože EML odvádí vynikající práci při popisu datového souboru a protože KNB a LTER zpřístupňují aktuální datové soubory.
EML plus ERDDAP™ by mohla být skvělá kombinace, protože ERDDAP™ by mohly uživatelům poskytnout přímější přístup k bohatství dat KNB a LTER a pomoci těmto projektům splnit vládní požadavky [Veřejný přístup k výsledkům výzkumu (PARR) požadavky](https://nosc.noaa.gov/EDMC/PD.DSP.php) zpřístupněním dat prostřednictvím webové služby.
Viz [Tato dokumentace](/docs/server-admin/EDDTableFromEML) . Díky Margaret O 'Brienové, LTER a EML.
         
    * NEW: GenerateDatasets Xml má nyní možnost EDDTableFromInPort
který čte popis datového souboru v InPort XML souboru a snaží se vytvořit kus datasets.xml tak, aby datový soubor mohl být přidán do ERDDAP . To zřídka vytváří ready- to- použití kus XML pro datasets.xml , ale vytvoří dobrý hrubý návrh, který je dobrým výchozím bodem pro editaci člověkem.
Bylo by skvělé, kdyby lidé, kteří využívají InPort k dokumentování svých souborů dat, také použili ERDDAP™ zpřístupnit skutečné údaje prostřednictvím ERDDAP Webové služby, a tím se setkávají s vládou USA a NOAA s [Veřejný přístup k výsledkům výzkumu (PARR) požadavky](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) zpřístupněním dat prostřednictvím webové služby. Toto je řešení, které může být použito právě teď. ( erd.data at noaa.gov rád pomůže.)   
Viz [Tato dokumentace](/docs/server-admin/datasets#eddtablefrominport) . Díky Evanu Howellovi a Melanii Abecassisové.
         
    * ZLEPŠENO: ERDDAP™ nyní používá netcdf- java 4.6.6.
S dřívějšími verzemi, netcdf-java číst některé hodnoty vyplnění (možná, jen v netcdf-4 souborech) jako 0. Nyní se některé z nich čte jako netcdf standardní hodnota vyplnění: -127 pro bytes, -32767 pro kraťasy, -2147483647 pro ints. Unidata Říká, že nové chování je správné chování. Pokud proměnná v datovém souboru začne zobrazovat jednu z těchto hodnot, kde se zobrazují 0, můžete např. přidat:
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
k proměnné addAttributes říct ERDDAP™ považovat tuto hodnotu za missing\\_value /\\ _ Vyplňte Hodnota. Nicméně, v mnoha případech, že nebude přinášet požadovaný výsledek: 0. Pokud ano, zvažte změnu souborů s NCO nebo přepisuje soubory. Stížnosti? Prosím kontaktujte Unidata ; -)
         
    * TO DO: Nová paleta TopographyDepth
Doporučuji vám přepnout všechny soubory dat, které používají paletu OceanDepth k použití nové palety TopographyDepth, která je jako Topografie s výjimkou převrácených barev, takže je vhodná pro hloubkové hodnoty (pozitivní = dolů) , místo hodnot nadmořské výšky (pozitivní = nahoru) . Doporučené nastavení této palety je:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * Nová feature: Řetězec missing\\_value a / nebo\\ _ FillValue
Pokud proměnná String definuje missing\\_value a / nebo\\ _ FillValue, ERDDAP™ Nyní odstraní tyto hodnoty z dat a nahradí je prázdným řetězcem, takže chybějící hodnoty se objeví jako prázdné řetězce, stejně jako s ostatními soubory dat v ERDDAP . Díky Margaret O 'Brienové, LTER a EML.
         
    * Nová feature: Podpora místních časů
Proměnné timestamp se zdrojovými daty ze Strings nyní mohou specifikovat časové pásmo přes " time\\_zone "atribut, který vede ERDDAP™ převést local- time- zone zdrojové časy (některé ve standardním čase, některé v denním světle) do Zulu krát. Seznam platných názvů časových pásem je pravděpodobně identický se seznamem ve sloupci TZ v [Tento stůl](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Výchozí je " Zulu . "Běžná časová pásma USA jsou: US / Hawaii, US / Aljaška, US / Pacific, US / Mountain, US / Arizona, US / Central, US / Eastern. Pro proměnné časového razítka s numerickými zdrojovými daty můžete zadat" time\\_zone "atribut, ale hodnota musí být" Zulu "nebo" UTC. "Díky Margaret O 'Brienové, LTER a EML.
         
    * NEW Feature: EDDTableFromAsciiFiles nyní podporuje soubory oddělené středníkem
a je chytřejší při hledání oddělovače. Díky Margaret O 'Brienové, LTER a EML.
         
    * Nová feature: Pokud existuje významná chyba v načítání Datasets (hlavní nebo menší, např. chybějící nebo neplatná datasets.xml dokument) , ERDDAP™ nyní indikují ve status.html, přímo pod "n Datasets Selhal Nahrát" jako ERROR: při zpracování datasets.xml : podrobnosti viz log.txt.
         
    * Nová feature: ERDDAP™ hledá sirotky.
Kdy ERDDAP™ má velké zatížení Datasety, teď hledá sirotky. (Datové soubory, které jsou v ERDDAP™ ale ne v datasets.xml ) . Jsou-li nalezeny, jsou uvedeny ve status.html, přímo pod "n Datasets Selhal Načíst" jako Error: n Orphan Datasets (Datové soubory v ERDDAP™ ale ne v datasets.xml ) =....
Pokud chcete odstranit (Vyložit) sirotek od ERDDAP™ , musíte přidat
        &lt;Typ datového souboru = "_ anyValidType _" datasetID = "_ theDatasetID _" active = "false" / &gt;
do datasets.xml až do uvolnění datového souboru během dalších hlavních datových souborů.
         
    * BUG FIX: Pokud měl datový soubor numerickou časovou proměnnou s jednotkami jinými než "seconds since 1970-01-01T00:00:00Z" a s&lt;updateEveNMillis &gt; systém aktivní, rozsah proměnné timestamp byl nastaven nesprávně při aktualizaci datového souboru. Díky Johnu Kerfootovi.
         
    * BUG FIX: Pokud&lt;quickRestart &gt; byl pravdivý v setup.xml a vy jste požadovali data z EDDTableFrom... Name&lt;updateEveryNMillis &gt;, první požadavek na datový soubor by selhal, ale následující požadavky by uspěly. Teď první žádost nezklame. Díky Johnu Kerfootovi.
         
    * BUG FIX: GenerateDatasetsXml.sh a .bat nefungovaly s &gt; 9 parametry na příkazovém řádku. Teď už ano. Díky Johnu Kerfootovi.
         
    * BUG FIX: Nové soubory EDDTableFromMultidimNcFiles neodstranily průchozí prostory z řetězců. Teď už ano. Hlavně to ovlivnilo soubory ARGO. Díky Kevinu O 'Brienovi a Rolandu Schweitzerovi.
         
    * BUG FIX: Veškerý přístup na dálku DAP Služby jsou nyní iniciovány modernějším kódem. Tím se při přístupu k některým datovým setům EDDTableFromErddap nastaví chyba "uzavření spojení". Díky Kevinu O 'Brienovi.
         
    * BUG FIX: Manipulace s orderBy ... () a odlišné () jsou nyní zpět k tomu, jak byly před nedávnými změnami: daný požadavek může mít více orderBy ... () a / nebo odlišné () filtr; ERDDAP™ se o ně postará v pořadí, v jakém jsou specifikovány. Díky Davidu Karugovi.
         
    * BUG FIX: Pokud je datový soubor EDDTableFromDatabase a dotaz má [SourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) a / nebo [sourceCanDoDiscript](/docs/server-admin/datasets#sourcecandodistinct) , pak databáze může (v závislosti na nastavení v datasets.xml ) částečně nebo zcela uchopit **pouze první**   orderBy .. () nebo odlišné () . Díky Davidu Karugovi.
         
    * BUG FIX: Nedávné další enkódování způsobilo problémy s některými dotazy pro .nc Soubory CF, např. "HTTP Status 500 - Chyba dotazu: proměnná = stanice je uvedena dvakrát v seznamu proměnných výsledků." Díky Kevinu O 'Brienovi.
         
    * BUG FIX: EDDTableFromFiles měl potíže s nahráním datového souboru, když jeden z sloupců byl skutečný sloupec. Díky Rolandu Schweitzerovi.
         
    * BUG FIX: EDDGrid FromNcFiles Vybaleno nyní také konvertuje missing\\_value a\\ _ FillValue na standardní hodnoty, takže soubory s různými hodnotami lze agregovat. Díky této změně, po instalaci této nové verze ERDDAP™ , prosím nastavte [tvrdé Vlajka](/docs/server-admin/additional-information#hard-flag) pro každý EDDGrid FromNcFiles Vybalený datový soubor ve Vašem ERDDAP .
         
    * ZLEPŠENO: Soubory EDDTableFromNcCFF mohou nyní zpracovávat soubory, které mají více vzorků\\ _ dimension. Zadaný datový soubor musí používat pouze proměnné, které používají jeden ze vzorků\\ _ dimensions. Díky Ajay Krishnanovi.
         
    * ZLEPŠENO: Pro EDDTableFrom... soubory,&lt;SortFilesBySourceName &gt; nyní umožňuje comma- oddělené (doporučeno) nebo prostorově oddělené seznamy jmen proměnných zdrojů. V obou případech mohou být jednotlivé názvy proměnných obklopeny dvojitými uvozovkami, např. pokud má název vnitřní prostor.

## Verze 1.72{#version-172} 
 (propuštěn 2016-05-12) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * NOVÉ EDDTableFromMultidimNcFiles [EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) je novou alternativou k EDDTableFromNcFiles. Je určen k řešení skupin souborů s několika proměnnými se sdílenými rozměry, např. var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] ScalarVar. Díky projektu Argo, Aurélie Briand a Rolandu Schweitzerovi.
    * BUG FIX: ERDDAP™   (prostřednictvím tříd FileVisitorDNLS a FileVistor Subdir) nyní následuje symbolické odkazy na Linux. ERDDAP™ Pořád to nesleduje. Ink je na Windows.
    * BUG FIX chyby zavedena v 1.70: odlišné + orderBy nebyly povoleny společně v jedné žádosti. Teď už zase. Nejsou vzájemně výlučné / nadbytečné. Díky Davidu Karugovi.
    * Změna datasets.xml blacklist of IP adres:
IP v4 adresy se objeví ERDDAP™ jako 4 periodicky oddělená hex čísla.
Myslím, že IP v6 adresy se zdají být 8 koloniálně oddělených hex čísel.
Takže ERDDAP™ Nyní podporuje kolony v IP adresách v tomto seznamu a:\\ * na konci seznamu blokovat rozsah adres.
    * ZLEPŠENO: ERDDAP™ nyní používá NetcdfFileWriter k zápisu .nc soubory namísto deprimovaných NetcdfFileWritable. V výsledných souborech by neměly být žádné zřetelné změny. To otevírá možnost zvětšení .nc soubory, které používají .nc 3 64bitové prodloužení. Pokud to chcete / potřebujete, zašlete prosím žádost erd.data at noaa.gov .
    * ZLEPŠENO: Mnoho odkazů na vzdálené webové stránky bylo zastaralé. Nyní jsou up- to- date and use https: místo http : pokud možno.
    * Mnoho malých změn.

## Verze 1.70{#version-170} 
 (propuštěn 2016-04-15) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** Níže je uvedeno několik doporučených změn v dokumentaci ve vašem setup.xml souboru.
Prosím, udělejte tyto změny hned.
30 minut práce vám může ušetřit hodiny zmatku v budoucnosti.
    * Oprava chyb: Problém byl, že žádosti, které byly přesměrovány na vzdálený ERDDAP selhalo s neplatným znakem " | chybová zpráva. K tomu došlo pouze s nedávnými verzemi Tomcat. Díky Rustymu Hollemanovi, Conorovi Delaneymu a Royovi Mendelssohnovi.
    * Oprava chyb: ERDDAP™ nyní používá up- to- date verzi netcdf- java (To je dlouhý příběh.) který zahrnuje up- to- date podporu pro NcML, který řeší problém s NcML LogicalReduce nepracuje tak, jak se očekává. Může dojít k několika malým změnám metadat, které ERDDAP™ čte prostřednictvím netcdf-java od .nc , .hdf , .grib, a .bufr soubory. Díky Faviovi Medranovi.
    * Nový [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) umožňuje vytvořit sloučený soubor dat EDDTable ze dvou nebo více souborů dat EDDTable, které mají stejné datové proměnné za použití stejných jednotek. Díky Kevinu O 'Brienovi.
    * Nové možnosti pro EDDTableFromDatabase ( [SourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) a [sourceCanDoDiscript](/docs/server-admin/datasets#sourcecandodistinct) ) Upřesněte, zda ERDDAP™ , databáze, nebo obojí, zvládnout odlišné a orderBy   (a všechny varianty) omezení. Díky Davidu Karugovi.
    * Nyní můžete prostřednictvím nového [&lt;GrapsAccessibleTo &gt; public&lt;/ gramsAccessibleTo &gt;] (/ docs / server-admin / datasets # grapsaccessibleto) Tag. Díky Emanuele Lombardiové.
    * Nyní, pokud řetězec předán GenetateDatasets Xml nebo DasDds je obklopen dvojitou citace, je necitovaný (jako by to byl řetězec JSON) . Díky Johnu Kerfootovi a Melanii Abecassisové.
    * GeneteDatasets Xml nyní podporuje "výchozí" získat výchozí a "nic" získat prázdný řetězec (pracují s uvozovkami nebo bez nich) . To řeší některé problémy spojené s předáním prázdných strun.
    * Nyní, v GenetateDatasets Xml pro všechny EDDGrid FromFiles a EDDTable Soubory FromFiles, pokud je vzorek Název souboru, který zadáte, je "" (prázdný řetězec) , použije poslední odpovídající soubor Název z adresáře + regex + rekurzivní = true.
    * Aktualizováno: DisplayInBrowser kód, který se používá k zobrazení výsledků GenetateDatasetsXml a DasDds na počítačích Linux byl zastaralý a dal zvláštní zprávu o Netscape. Toto používá moderní Linux nástroj: xdg- open. Díky Melanii Abecassisové.
    * U allDatasets Dataset má nyní "files" sloupec, který označuje základní URL odkazu / souborů (pokud existuje) pro datový soubor.
    * Zvýšit všeobecnou bezpečnost ERDDAP™ změnou oprávnění spojených s adresářem tomcat a bigParentDirectory:
         (Skutečné příkazy níže jsou pro Linux. Pro ostatní OS, dělat analogické změny.) 
        * Změňte "skupinu" na tomcat, vaše uživatelské jméno, nebo jméno malé skupiny, která obsahuje tomcat a všechny administrátory Tomcat / ERDDAP např.:
chgrp -R _ yourUserName _ apache-tomcat- _ 8.0.23 _
chgrp-R _ your UserName bigParentDirectory _
        * Změna oprávnění tak, že tomcat a skupina mají číst, psát, vykonávat práva, např.
chmod-R ug + rwx apache- tomcat- _ 8.0.23 _
chmod-R ug + rwx _ bigParentDirectory _
        * Odstranit oprávnění "jiného" uživatele pro čtení, zápis nebo provedení:
chmod-R o- rwx apache- tomcat- _ 8.0.23 _
chmod-R o-rwx _ bigParentDirectory _
To je důležité, protože to brání jiným uživatelům číst možná citlivé informace v ERDDAP™ nastavené soubory, logové soubory a soubory s informacemi o soukromých souborech dat.
    * Autorizační / přihlašovací systém byl přepracován. Díky Thomasu Gardnerovi, Emanuele Lombardiové a nové vládě USA [Pouze standard HTTPS-](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Byla odstraněna autentizace = openid option. Bylo to zastaralé.
        * Nový, doporučený, [autentizace = Google](/docs/server-admin/additional-information#google) možnost použití Google Sign- In (založeno na OAuth 2.0) umožnit každému s e-mailovým účtem Google (včetně Google spravované účty jako @noaa.gov ) Přihlásit se.
        * Nový, [ověření = e-mail](/docs/server-admin/additional-information#email) option is a back up for autentication = Google. Umožňuje uživatelům&lt;uživatel &gt; tag in datasets.xml k přihlášení zasláním e-mailu se zvláštním odkazem.
        * Ve Vašem setup.xml, prosím, změňte popis&lt;ověření &gt; bude
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Do setup.xml, prosím přidejte toto přímo pod&lt;ověření &gt; značka
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Uživatelé, kteří nejsou přihlášeni, mohou použít http nebo https URL (pokud jste nastavili&lt;baseHttpsUrl &gt; ve Vašem setup.xml). Díky nové vládě USA [Pouze standard HTTPS-](https://https.cio.gov/) .
        * Nyní můžete povzbudit všechny uživatele k použití https   (ne http ) nastavením&lt;baseUrl &gt; být https URL. Nutit uživatele používat pouze https , musíte také provést změny nastavení Apache / Tomcat blokovat non - https přístup. Díky nové vládě USA [Pouze standard HTTPS-](https://https.cio.gov/) .
            
Ve Vašem setup.xml, prosím, změňte popis&lt;baseUrl &gt; bude
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Možnosti&lt;kódování hesla &gt; Změna. Ve Vašem setup.xml, prosím, změňte popis&lt;hesla Kódování &gt; bude
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Ve Vašem setup.xml, prosím, změňte popis&lt;baseHttpsUrl &gt; bude
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Nyní, pokud listPrivateDatasets = pravda v setup.xml, ještě méně informací bude zobrazeno o datových souborů, ke kterým uživatel nemá přístup.
    * Nyní, zejména pokud jste původně nastavení ERDDAP , můžete nyní říct ERDDAP™ nezkusit se přihlásit na vzdálený ERDDAP™ Datové soubory. Díky Filipe Roche Freire.
Ve Vašem setup.xml, těsně před&lt;fontFamily &gt;, prosím přidejte
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Ve Vašem setup.xml, ve výše uvedených pokynech&lt;emailFromAddress &gt;, prosím vložte:
Pokud je to možné, nastavte to pro použití bezpečného spojení (SSL / TLS) na emailový server.
Pokud vaše nastavení nepoužívá zabezpečené připojení k emailovému serveru, proveďte prosím změny.
    * Ve vaší datasets.xml , prosím přidejte tento řádek k popisu&lt;Předplatné EmailBlacklist &gt; ve Vašem datasets.xml :
Můžete použít jméno "\\*"k černé listině celé domény, např.,\\*@ example.com.
    * Od změny systému logování v v1.66, log soubor není nikdy up- to- date. Tam jsou vždy zprávy nebo části zpráv čekající na zápis do souboru záznamu. Teď to můžeš dát do pořádku. (na okamžik) Tím, že si prohlížíte ERDDAP stav webové stránky na http://_your.domain.org_/erddap/status.html .
    * Hashdigest...
    * Malá změna (na String2.kanonický) To by mělo pomoci udržet věci v pohybu rychle, když ERDDAP™ je velmi zaneprázdněn a také lépe vypořádat s velmi velkým počtem souborů dat.
    * Silně Doporučeno: přestaňte používat&lt;konvertToPublic SourceUrl &gt; n datasets.xml převést IP číslo v datovém souboru&lt; sourceUrl &gt; (např. http://192.168.#.#/ ) do názvu domény (např. http : my.domain.org /) . Od teď, nové předplatné http://localhost , http://127.0.0.1 a http://192.168.#.# URLS nebudou povoleny z bezpečnostních důvodů. Takže prosím vždy používejte název domény na veřejnosti&lt; sourceUrl &gt; tag (v případě potřeby kvůli DNS problémy) , můžete použít [/ etc / hosts table na vašem serveru](https://linux.die.net/man/5/hosts) vyřešit problém převáděním místních doménových jmen na IP čísla bez použití DNS serveru. Můžete otestovat, zda je dané jméno domény správně vyřešeno použitím
Ping _ some.domain.name _
    * V generateDatasets.xml, pro vzdálené soubory dat (např. ze serveru HISDDS) , automaticky generované datasetID s jsou nezměněny pro většinu domén. Pro několik oblastí, první část (Tj. název) automaticky generované datasetID Bude to trochu jiné. Zejména jména, která měla jednu část, mají nyní větší pravděpodobnost, že budou mít dvě části. Například datové soubory od http://oos.soest.hawaii.edu dříve vedlo k datasetID To začalo s havajským _, ale nyní vést k datasetID s, které začínají s havai\\ _ soest\\ _. Pokud vám to způsobí problémy, pošlete mi e-mail. Možná tu bude nějaká práce.
    * Řidič Cassandra byl aktualizován na Cassandra- driver- core- 3.0.0.jar a tak pro Cassandra v3. EDDTableFromCassandra nevyužívá žádné nové funkce v Cassandra v3. Indexy v Cassandře mohou být složitější, ale ERDDAP™ stále používá model Cassandra v2 index, který předpokládá, že indexovaný sloupec může být přímo dotazován '=' omezení. GeneteDatasets Xml pro EDDTableFromCassandra již detekuje sloupce s indexy; je-li index jednoduchý, je třeba zadat v datasets.xml ručně. Pokud potřebujete podporu pro složitější indexy nebo jiné nové funkce, prosím, e-mail erd.data at noaa.gov .
&#33; Pokud stále používáte Cassandra 2 x, pokračujte v používání ERDDAP™ v1.68 až do upgradu na použití Cassandra 3.x.
    * Džbány a Classpath -- Téměř všechny soubory třetích stran .jar byly aktualizovány na jejich nejnovější verze.
        * slf4j.jar byl přidán do / lib a classpath.
        * Joide. Sklenice a tsik. Sklenice byla vyjmuta z / lib a classpath.
        * Pokud dostanete chybové zprávy o hodinách, které nebyly nalezeny při sestavování nebo spuštění ERDDAP™ nebo jeden z jeho nástrojů, porovnat váš příkazový řádek je claspath ERDDAP s [nynější claspath](/docs/contributing/programmer-guide#development-environment) zjistit, které sklenice chybí ve vašem classpathu.

## Verze 1.68{#version-168} 
 (propuštěn 2016-02-08) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    [ EDDGrid Agregace FromFiles pomocí jmen souborů nebo globálních metadat](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Všechny varianty EDDGrid FromFiles nyní může agregovat skupinu souborů přidáním nového nejlevějšího rozměru, obvykle času, na základě hodnoty získané z každého názvu souboru nebo z hodnoty globálního atributu, který je v každém souboru.
    * ZLEPŠENO: Dříve jsme navrhli, že byste chtěli vytvořit EDDGrid Name datasets.xml který odkazoval a znovu sloužil jplMU RSS T datový soubor v našem ERDDAP . Vzhledem k tomu, že je nyní novější verze tohoto datového souboru, je tento datový soubor nyní deprimován. Takže pokud máte ten datový soubor ve vašem ERDDAP™ , prosím přidejte tento nový datový soubor
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Pokud chcete odstranit starou jplMU RSS T datový soubor z vašeho ERDDAP™   (Je to na tobě.) , změnit jeho aktivní nastavení z "pravda" na "lež".
    * Oprava chyb: Zkontrolujte prosím bigParentDirectory, které jste specifikovali ve vašem setup.xml. Pokud jste nedal lomítko na konci&lt;bigParentDirectory &gt; název ERDDAP™ vytvoří několik adresářů tím, že nastaví slova přímo na jméno, které jste zadali, namísto vytvoření podadresářů. Počínaje verzí 1.68, ERDDAP™ přidává lomítko na konec názvu adresáře, pokud jste žádný neurčili. Takže pokud jste předtím neurčili lomítko na konci, pak při instalaci ERDDAP™ v1.68 musíte přesunout a přejmenovat tyto adresáře **po** Vypněte staré. ERDDAP™ a **před** Spusťte nový ERDDAP . Například, pokud jste omylem specifikovali bigParentDirectory jako / home / erdapBPD (žádné vlečení lomítko) a ERDDAP™ omylem vytvořil adresáře jako
/ home / erddapBPDcache
/ home / erddapBPDcopy
/ home / erddapBPDdataset
/ home / erddapBPDflag
/ home / erddapBPDlog
/ home / erddapBPDlucen
a soubor s názvem / home / erddapBPDsubscriptionsV1.txt,
Pak se musíte přesunout a přejmenovat je, aby byly
/ home / erddapBPD / cache
/ home / erddapBPD / copy
/ home / erddapBPD / dataset
/ home / erddapBPD / flag
/ home / erddapBPD / log
/ home / erddapBPD / lucen
a / home / erddapBPD / předplatné V1.txt
    * Oprava chyb: Byli tam brouci. EDDGrid LonPM180 in ERDDAP™ v1.66, ke kterému došlo, když je dětský datový soubor EDDGrid FromErddap.
    * Oprava chyb: Byl tam brouk. EDDGrid FromFiles a EDDTable FromFiles in ERDDAP™ v1.66, které způsobily&lt;updateEveryNMillis &gt; bude ignorován při prvním načtení datového souboru po restartu.
    * Oprava chyb / Nová funkce: Pokud je dětský datový soubor v rámci EDDGrid AgregateExistingDimension, EDDGrid Rozumím. EDDGrid FromEDDTable, EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, nebo EDDTableFrom EDDGrid je... FromErddap dataset, že mateřský dataset nyní připisuje na základní ERDDAP™ Dataset. Pokud podkladový nástroj ERDDAP™ Dataset je ve stejném souboru ERDDAP™ , předplatné a jeho potvrzení jsou prováděny přímo; nebudete dostávat e-mail s žádostí o potvrzení předplatného. Jinak, pokud je systém předplatného pro vaše ERDDAP™ je vypnut, nastavit&lt;reloadEveryNMinut &gt; nastavení rodičovského souboru dat na malé číslo (60?) tak, aby to zůstalo na rande.
    * Oprava chyb / Nová funkce: Pokud je dětský datový soubor v rámci EDDGrid AgregateExistingDimension, EDDGrid Rozumím. EDDGrid FromEDDTable, EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, nebo EDDTableFrom EDDGrid má aktivní = "false", že dětský datový soubor je nyní přeskočen.

## Verze 1.66{#version-166} 
 (propuštěn 2016-01-19) 

*    **Nové funkce (pro uživatele) :** 
    * Grafy (ne mapy) nyní mohou mít sestupné hodnoty na ose. Chcete-li to získat při použití webové stránky Make A Graph, změňte novou osu Y: vzestupné nastavení (výchozí) Na sestup. Nebo, v URL, která požaduje graf, použijte nový volitelný 3. ' | "parametr pro [& .x Rozsah a / nebo &. yRange přepínače](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) To nemůže být nic. (výchozí) , true, or t to get vzestupný hodnoty, or use false or f to get sestupný hodnoty. Pravda | falešné hodnoty jsou případy necitlivé. Díky Chrisovi Fullilove, Johnu Kerfootovi, Lukovi Campbellovi a Carě Wilsonové.
    * Uživatelé nyní mohou zadat barvu pozadí grafů přidáním & .bgColor = 0x _ AARRGGBB _ přepnout na URL, která požaduje graf. Viz .bgColor v Graphics Příkazy sekce [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) a [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) dokumentaci. Díky Johnu Kerfootovi a Lukovi Campbellovi.
    * Pro tabulky souborů dat, omezení mohou nyní odkazovat na min (_ someVariableName _) nebo max (_ someVariableName _) . Viz [min () a max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Díky Johnu Kerfootovi.
    * U tabulkových souborů údajů časová omezení, která používají [Teď](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) nyní mohou určit časové jednotky milisekund nebo milisekund.
    * Žádost o obrázek tablular dataset nyní dělá mapu (není graf) pokud proměnné x a y jsou dlouhodobé a latitudové proměnné (kompatibilní jednotky) . Díky Richovi Signellovi.
    * Oprava chyb: Štítky a klíšťata v časové ose někdy měly zvláštní nesrovnalosti při požadavku na více grafů současně (např. na webové stránce) . Problém byl chyba v grafické knihovně SGT, že ERDDAP™ použití (jedna proměnná byla "statická", která neměla být) . Díky Bradfordovi Butmanovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Je to bezpečnostní riziko dát své e-mailové heslo do prostého textového souboru, jako je setup.xml. Abychom tento problém zmírnili, důrazně doporučujeme:
        1. Nastavit e-mailový účet jen pro ERDDAP použití, např. erddap @ yourInstitution.org. To má i jiné výhody; zejména více než jeden ERDDAP™ Správce pak může mít přístup k tomuto emailovému účtu.
        2. Udělat oprávnění souboru setup.xml rw (číst + psát) pro uživatele, který bude provozovat Tomcat a ERDDAP™   (User = tomcat?) a žádná oprávnění (Nečíst ani psát) pro skupinu a ostatní uživatele. Díky Filipe Roche Freire.
    * Nový [ArchiveADAtaset](/docs/server-admin/additional-information#archiveadataset) nástroj zjednodušuje tvorbu .tar  .gz archiv s podmnožinou datového souboru ve formátu, který je vhodný pro archivaci (zejména v NOAA NCEI) . To by mělo být užitečné pro mnoho ERDDAP™ administrátoři v mnoha situacích, ale zejména pro skupiny v rámci NOAA .
    * Nový typ datového souboru [ EDDGrid FromNcFilesVybaleno](/docs/server-admin/datasets#eddgridfromncfilesunpacked) je varianta EDDGrid FromNcFiles. Rozdíl je v tom, že tato třída rozbalí každý datový soubor před EDDGrid FromFiles se dívá na soubory:
        
        * Vybaluje balené proměnné, které používají scale\\_factor a / nebo add\\_offset .
        * Podporuje celočíselné proměnné, které mají\\ _ Unsigned = skutečné atributy pro větší celočíselný datový typ tak, aby se hodnoty objevily jako nesignované hodnoty. Například,\\ _ Unsigned = true byte (8 bitů) proměnná se stává podepsaným krátkým (16 bit) proměnná.
        * Převádí\\ _ FillValue a missing\\_value hodnoty, které mají být NaN (nebo MAX\\ _ VALUE pro celé datové typy) .
        
Velkou výhodou této třídy je, že poskytuje způsob, jak se vypořádat s různými hodnotami scale\\_factor , add\\_offset ,\\ _ FillValue, nebo missing\\_value v různých souborech ve sbírce. Jinak byste museli použít nástroj jako [NcML](/docs/server-admin/datasets#ncml-files) nebo [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) upravit každý soubor odstranit rozdíly tak, aby soubory mohly být řešeny EDDGrid FromNcFiles. Aby tato třída řádně fungovala, musí soubory dodržovat normy CF pro související atributy. Díky Philippu Makowskému.
    * Nový typ datového souboru [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) umožňuje měnit soubory dat, které mají některé hodnoty délky větší než 180 (např. rozsah 0 až 360) do souborů dat s hodnotami délky v rozmezí -180 až 180 (Zeměpisná délka plus nebo minus 180, proto název) . Velkou výhodou nabídky datových souborů s hodnotami délky v rozmezí -180 až 180 je, že OGC služby (např. WMS ) požadovat hodnoty délky v tomto rozsahu. Díky Lynne Tablewski, Fabien Guichard, Philippe Makowski a Martin Spel.
Viz poznámka pod čarou 1. Eeek&#33; To má chybu, která nastane, když dítě dataset je EDDGrid FromErddap, který odkazuje na datový soubor ve stejném ERDDAP . Tato chyba je opravena ERDDAP™ v1.68.
    * V [GeneteDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) , nový speciální typ datového souboru, EDDGrid LonPM180FromErdapCatalog, umožňuje generovat datasets.xml místo EDDGrid LonPM180 souborů dat ze všech EDDGrid soubory dat ERDDAP které mají jakékoli hodnoty délky větší než180.
    * Pro všechny EDDGrid Datové soubory, v datasets.xml Nyní můžete použít volitelný
[&lt;přístupné Via WMS &gt; pravda | false&lt;/ přístupný Via WMS &gt;] (/ docs / server- admin / datasets # accessibleviawms)   (výchozí = true) . Nastavením tohoto falešně zakazuje WMS služba pro tento datový soubor. Pokud je to pravda, datový soubor nemusí být stále přístupný prostřednictvím WMS z jiných důvodů (např. žádné latové nebo lonové osy) . To je zvláště užitečné pro soubory údajů, které existují samy o sobě a zabalené EDDGrid LonPM180, takže pouze verze LonPM180 je přístupná prostřednictvím WMS .
    * V setup.xml můžete zadat jinou výchozí barvu pozadí grafů. Barva je specifikována jako osmimístná hexadecimální hodnota ve tvaru 0x _ AARRGGBB _, kde AA, RR, GG a BB jsou opacita, červená, zelená a modrá, specifikovaná jako 2místná hexadecimální čísla. Všimněte si, že plátno je vždy neprůhledná bílá, takže (semi -) transparentní barva pozadí grafu se promíchá do bílého plátna. Výchozí je světle modrá:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Díky Johnu Kerfootovi a Lukovi Campbellovi.
    * V setup.xml, můžete nyní určit maximální velikost pro [soubor záznamu](/docs/server-admin/additional-information#log)   (když je přejmenována na log. TXT. předchozí a nový deník. Txt je vytvořen) , v MegaBytes. Minimální povolená hodnota je 1. Maximální povolená je 2000. Výchozí hodnota je 20 (MB) . Například:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * V datasets.xml , [&lt;fgdcFile &gt;] (/ docs / server-admin / datasets # fgdcfile) nebo [&lt;iso19115Soubor &gt;] (/ docs / server-admin / datasets # iso19115file) nyní může být lokální soubor (jako předtím) nebo URL (které budou staženy tak, že je místní kopie) . Pokud ERDDAP™ není schopen stáhnout soubor, načtení datového souboru bude pokračovat, ale datový soubor nebude mít soubor fgdc nebo iso19115.
    *    EDDGrid FromFiles a EDDTable FromFiles soubory dat mohou nyní udělat QuickRestart (systém, který ERDDAP™ se pokusí použít při prvním načtení souborů dat ERDDAP™ je znovu spuštěn) . To zrychluje restart ERDDAP .
Viz poznámka pod čarou 1. Eeek&#33; To má chybu, která způsobuje&lt;updateEveryNMillis &gt; bude ignorován při prvním načtení datového souboru po restartu. Tato chyba je opravena ERDDAP™ v1.68.
    * Obecné zlepšení systému QuickRestart umožňuje ERDDAP™ načíst soubory dat rychleji, když ERDDAP™ je restartován.
    * Všechny EDDGrid FromFiles a EDDTable FromFiles podtřídy nyní přijmout nový&lt;pathRegex &gt; tag, obvykle specifikovaný níže&lt;rekurzivní &gt;. Pokud je rekurzivní "true", pouze plné podadresářové cesty, které odpovídají pathRegex (default =. "\\ *") bude přijato. Podobně, a&lt; sourceUrl s &gt; tag in an EDDGrid AggregateExistingDimension může nyní obsahovat atribut path Regex (default =. "\\ *") .
    * Výchozí hodnota pro&lt;partialRequestMaxBytes &gt; v setup.xml je nyní 490000000 (~ 490 MB) . To se vyhýbá některým problémům / časům souvisejícím s získáváním dat z datových serverů HISDDS. Díky Leslie Thorneové.
    * Malá změna systému záznamu by měla umožnit ERDDAP™ více reagovat, když je velmi, velmi zaneprázdněn. Informace jsou nyní zapsány do souboru záznamu na disku v poměrně velkých kusech. Výhodou je, že je to velmi efektivní -- ERDDAP™ nebude blokovat čekání na zapsání informací do souboru záznamu. Nevýhodou je, že záznam téměř vždy skončí částečnou zprávou, která nebude dokončena, dokud nebude napsán další kus.
    * Oprava chyb související s inodifikací a [&lt;updateEveryNMillis &gt;] (/ docs / server-admin / datasets # updateeverynmillis) systém pro EDDGrid FromFiles a EDDTable Datové soubory FromFiles: Není již nutné uvádět velké fs.inotify.max\\ _ user\\ _ watches nebo fs.inotify.max\\ _ user\\ _ instance. Je tam štěnice. Java která způsobuje některé části Java systém inodifikace / WatchDirectory, který nemá být shromažďován odpadky, když jsou dokončeny; případně počet zombíků inodifikovaných hodinek nebo instancí by překročil stanovený maximální počet. ERDDAP™ Teď to funguje. Java brouku.
Také počet inodifikovaných nití je uveden na webové stránce status.html, takže si můžete dávat pozor na jeho používání. Obvykle existuje 1 inodifikační nit na EDDGrid FromFiles a EDDTable Datový soubor FromFiles.
    * Oprava chyb: na mnoha místech, místo aby byla chyba přehozena, byla vytvořena nová chyba, která obsahovala pouze krátkou verzi původní chybové zprávy a bez stopy stacku. Nyní, když je nová chyba generována, správně obsahuje celou původní výjimku např. hodit novou výjimku ("nějaká nová zpráva," e) ;
Díky Susan Perkinsové.
    * Oprava chyb: donedávna (V1.64?) , pokud... / datasetID Byla požadována URL, ERDDAP™ by přidal .html na URL. V v1.64 to selhalo. (byla vytvořena nesprávně formátovaná URL a pak selhala) . Teď to funguje znovu. Díky Chrisovi Fullilove.

## Verze 1.64{#version-164} 
 (propuštěn 2015-08-19) 

*    **Nové funkce (pro uživatele) :** 
    * Nyní je zde návod pro přístup k hesla-chráněné soukromé ERDDAP™ Datové soubory ( https:// ) prostřednictvím curl a Python . Viz [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) a [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) pokyny.
Díky Emiliovi Mayorgovi z NANOOS a Paulu Janeckovi ze Spyglass Technologies.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    ERDDAP™ Vyžaduje Java 1,8 +.
         Java 1.7 dosáhl svého [konec života](https://www.oracle.com/technetwork/java/eol-135779.html)   (žádné další bezpečnostní aktualizace) V dubnu 2015. Tato verze ERDDAP™ nebude pracovat s verzemi Java nižší než 1, 8. Pokud aktualizujete Java 1, 7x (nebo dříve) Měl bys také informovat Tomcata. Viz [ ERDDAP™ Nastavit instrukce](/docs/server-admin/deploy-install) ke stažení odkazy a rady.
    * Nový formulář pro poskytovatele dat.
Když k vám přijde poskytovatel dat a doufá, že k vám přidá nějaká data ERDDAP™ , To může být obtížné a časově náročné shromáždit všechny metadata potřebné pro přidání datového souboru do ERDDAP . Mnoho zdrojů dat (například soubory .csv, Excel soubory, databáze) nemají interní metadata, takže ERDDAP™ má nový formulář pro poskytovatele údajů, který shromažďuje metadata od poskytovatele dat a poskytuje poskytovateli údajů některé další pokyny, včetně rozsáhlých pokynů pro datové databáze. Předložené informace se převádějí na datasets.xml formát a pak e-mailem na ERDDAP™ správce (Ty.) a psáno (připojeno) na bigParentDirectory / logs / dataProviderForm.log. Proto formulář semi- automatizuje proces získání datového souboru do ERDDAP™ , ale ERDDAP™ Správce stále musí dokončit datasets.xml chunk a vypořádat se s získání datového souboru (s) od poskytovatele nebo napojení na databázi. Pro více informací, viz [Poskytovatel dat Popis formuláře](/docs/server-admin/datasets#data-provider-form) .
    * Nový&lt;matchAxisNDigits &gt;
může být použit EDDGrid FromFiles (a tedy z NcFiles a z MergeIRFiles) , EDDGrid AgregateExistingDimension, EDDGrid Kopírovat a EDDGrid Soubory dat SideBySide pro upřesnění, jak přesně se musí rovnat osovým hodnotám v různých souborech (kolik číslic) : 0 = žádná kontrola (Nepoužívej to&#33;) , 1-18 pro zvýšení přesnosti, nebo 20 (výchozí) pro přesnou rovnost. Pro n = 1-18, ERDDAP™ zajišťuje, že první n číslice dvojité hodnoty (nebo (n + 1) div 2 pro plavené hodnoty) jsou si rovni.
        &lt;matchAxisNDigits &gt; nahrazuje&lt;ensureAxisValuesAreEqual &gt;, který je nyní deprimován. Hodnota 'true' se převede na matchAxisNDigits = 20. Hodnota "nevyhovující" (Nedělej to&#33;) bude převeden na zápas AxisNDigits =0.
    *    EDDGrid FromFiles a EDDTable FromFiles se načte velmi pomalu při prvním použití této verze ERDDAP .
         ERDDAP™ Nyní ukládá interní informace o souboru trochu jinak, takže vnitřní tabulka souborů pro každý z těchto souborů musí být přestavěn. Takže se neboj. Nic se neděje. Je to jednorázovka.
    * Soubory vzdáleného zdroje
         EDDGrid FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFSoubory nyní umožňují, aby soubory byly vzdálenými soubory v adresáři přístupném http://   (a pravděpodobně https:// a ftp: / /, ale nejsou testovány) pokud vzdálený server podporuje [Požadavky na rozsah](https://en.wikipedia.org/wiki/Byte_serving) v hlavičce žádosti. Viz poznámka pod čarou č.1. Hyrax Ne. Tento systém umožňuje přístup k datům ve vzdálených souborech bez stahování souborů (což je užitečné, pokud jsou vzdálené soubory příliš objemné) , ale přístup k těmto souborům bude mnohem pomalejší než přístup k místním souborům nebo dokonce ke vzdálenému OPeNDAP zdroj.
To zahrnuje "files" v Amazon S3 kbelík, protože jsou přístupné prostřednictvím http:// . Pokud jsou názvy objektů S3 podobné jménům souborů (s vnitřním / 's jako Linux adresář strom) , ERDDAP™ může také zpřístupnit soubory prostřednictvím ERDDAP s "files" systém. Aby to fungovalo, vaše S3 pověření musí být v ~ / .aws / pověření (na Linux, OS X, nebo Unix) nebo C:\\ Users\\ USERNAME\\ .aws\\ pověření (na Windows) na serveru s ERDDAP . Viz [Dokumentace Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * GeneteDatasets Xml má novou, neobvyklou volbu: EDDsFromFiles.
Tohle projde souborovým systémem. (i vzdálený systém jako Amazon S3, pokud objekty mají soubory-jako jména) a vytvořit datasets.xml kousky pro řadu souborů dat. Vaše kilometry se mohou lišit. To funguje dobře, pokud jsou soubory organizovány tak, aby všechny datové soubory v daném adresáři (a jeho podadresáře) jsou vhodné pro jeden datový soubor (např. všechny SST 1denní kompozity) . Jinak (např., pokud adresář obsahuje některé SST soubory a některé chlorofyll- a soubory) , To funguje špatně, ale může být stále užitečné.
    * Programátoři: nové / libové .jar soubory.
Pokud sestavujete ERDDAP™ , Vezměte prosím na vědomí nové .jar soubory v parametru classpath -cp uvedené v parametru ERDDAP™   [Průvodce programátorem](/docs/contributing/programmer-guide) .
    * moře\\ _ voda\\ _ praktická\\ _ slanost
Pokud používáte standardní název CF moře\\ _ water\\ _ salinity pro jakoukoli proměnnou, doporučuji vám přejít na moře\\ _ water\\ _ praktický\\ _ salinity, který je k dispozici v [verze 29 standardní tabulky CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (a některé předchozí verze -- nevěděl jsem, že) . Tento název označuje, že se jedná skutečně o praktickou hodnotu salinity Practical Salinity Units   ( PSU ) , na rozdíl od starší hodnoty g / kg. Kanonické jednotky jsou jiné, ale stále neuvěřitelně nepomáhají: 1 (pravděpodobně naznačující PSU / PSS-78) , na rozdíl od 1e-3 (pravděpodobně naznačující g / kg) pro moře\\ _ water\\ _ salinity. \\[ Hej, Unidata a CF: Identifikujeme hodnoty, které používají jiné váhy, například Fahrenheit nebo Celsia, pomocí řetězce jednotek, který je název stupnice nebo nějaké variace. Proč nemůžeme identifikovat jednotky salinity pomocí jejich měřítka, např. PSS-78? Já vím: hodnoty PSS- 78 jsou "bezcenné", ale existuje implicitní měřítko, že? Pokud vymyslím novou praktickou stupnici slanosti, kde hodnoty jsou 0,875 krát hodnoty PSS-78, měly by být kanonické jednotky stále "1"? Jak by je mohl uživatel rozeznat? Jednotky 1e-3 a 1 nejsou ani popisné, ani užitečné pro uživatele, kteří se snaží přijít na to, co čísla naznačují. \\] 

## Verze 1.62{#version-162} 
 (propuštěn 2015-06-08) 

*    **Nové funkce (pro uživatele) :** 
    * Pro EDDGrid Datasety, uživatelé mohou nyní dělat Graph Type: Povrchové grafy s libovolnou kombinací numerických os, nejen zeměpisná délka versus zeměpisná šířka. To vám umožní udělat x versus y (projektované) grafy a různé [Hovmöller diagramy](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) Například rýsování délky proti hloubce, nebo času proti hloubce. \\[ Poznámka: je-li hloubka na ose Y, bude pravděpodobně převrácena od toho, co chcete. Promiň, odklonit to ještě není možnost. \\] Díky Carě Wilsonové a Lynn DeWittové.
    * Je tu nový [Převodník oceánských / atmosférických zkratek](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) což vám umožní převést společné oceánské / atmosférické zkratky na / z celého jména.
    * Je tu nový [Oceanický / atmosférický Převodník proměnných názvů](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) která vám umožní převést společný oceánský / atmosférický název proměnné na / z celého jména.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    Java 7 / 8
         Oracle již nepodporuje (poskytuje opravy bezpečnostních chyb pro)   Java 7. ERDDAP™ stále podporuje Java 7, ale prosím přesuňte se na Java 8. Další vydání ERDDAP™ bude pravděpodobně vyžadovat Java 8.
    *    valid\\_min / max / rozsah
V minulých dílech jste viděli... dataVariable měl scale\\_factor a add\\_offset metadata, ERDDAP™ vybaluje hodnoty dat a odstraňuje metadata. V minulých dílech... ERDDAP™ nemodifikoval / nevybaloval žádné valid\\_range , valid\\_min , valid\\_max metadata (které obvykle / by měly obsahovat hodnoty balení) podle scale\\_factor a add\\_offset . Teď už ano. Prosím, prohledejte své ERDDAP™ pro "valid\\ _" a ujistěte se, že všechny proměnné, které mají valid\\_range , valid\\_min nebo valid\\_max mít správné hodnoty, pokud se soubory dat objeví v nové verzi ERDDAP . Viz [ valid\\_range / min / max dokumentace](/docs/server-admin/datasets#valid_range) .
    * ACDDD- 1, 3
V minulých dílech... ERDDAP™   (zejména GenerateDatasets Xml) použitý / doporučil originál (1, 0) verze [ NetCDF Atribut Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) který byl označován jako " Unidata Dataset Discovery v1.0 "v globálních konvencích a Metadata\\_Conventions atributy. Nyní doporučujeme [ACDD verze 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) který byl ratifikován na začátku roku 2015 a je označován jako "ACDD-1.3" Naštěstí je ACDDD- 1.3 vysoce zpětně kompatibilní s verzí 1.0. DOPORUČUJME, že [Přepnout na ACDD- 1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Není to těžké.
    * GeneteDatasets Atributy Xml
Došlo k velkému počtu změn ke zlepšení&lt; addAttributes &gt; hodnoty navržené GenetateDatasets Xml pro globální konvence, creator\\_name / e-mail / url, klíčová slova, shrnutí a atributy titulů a pro proměnnou long\\_name atribut. Některé změny souvisí s novým použitím přípravku ACDD- 1.3.
    * EDDTableFrom SOS Datové soubory
S příležitostným přidáním nových typů SOS servery a změny starých serverů, to je stále těžší pro ERDDAP™ automaticky zjistit typ serveru z odpovědí serveru. Použití [&lt;sosServerType &gt;] (/ docs / server-admin / datasets # eddtableFrom sos- skelet -xml)   (s hodnotou IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys nebo WHOI) je nyní důrazně schválen. Pokud některý z vašich souborů dat tohoto typu má problémy v nové verzi ERDDAP , zkuste znovu spustit GenetateDatasets Xml pro SOS server generovat nový kus datasets.xml pro tento datový soubor. GeneteDatasets Xml vám umožní vyzkoušet různé&lt;sosServerType &gt; volby, dokud nenajdete tu správnou pro daný server. Pokud máte stále problémy, dejte mi prosím vědět, jaký problém vidíte a URL serveru a já se pokusím pomoci.
    * EDDTableFromFileName
Některé atributy, které byly doporučeno addAttributes jsou nyní sourceAtributs. Pravděpodobně nemusíte měnit nic pro existující soubory dat ve vašem datasets.xml .
    * Oprava chyb související s určitými požadavky na soubory souborů EDDTableFromNcFF.
Také jsem přidal velký počet jednotkových testů k existujícímu velkému počtu jednotkových testů základních metod (Jsou tu stovky scénářů.) . Díky Elimu Hunterovi.
    * Oprava chyb / drobné změny EDDGrid FromMergeIr.
Díky Jonathan Lafite a Philippe Makowski
    * Oprava chyb: EDDGrid FromErddap nyní funguje i když vzdálený datový soubor nemá ioos\\_category proměnné atributy.
Díky Kevinu O 'Brienovi.
    * Oprava chyb v .graf webové stránce pro EDDGrid soubory dat, pokud existuje pouze jedna osová proměnná s více než jednou hodnotou.
Díky Charlesovi Carletonovi.
    * Došlo k dalším malým zlepšením, změnám a opravám chyb.

## Verze 1.60{#version-160} 
 (propuštěn 2015-03-12) 

*    **Nové funkce (pro uživatele) :** žádný
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * STRONGLY DOPORUČENO: Aktualizace serveru [robots.txt](/docs/server-admin/additional-information#robotstxt) soubor, který obsahuje:
Zakázat: / erddap / soubory /
    * Inotifikovat problém a řešení:
Na počítačích Linux, pokud používáte&lt;updateEveryNMillis &gt; s datovými soubory s typem = EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Kopírovat, EDDTableCopy, nebo jejich podtřídy, můžete vidět problém, kdy se datový soubor nenačte (příležitostně nebo důsledně) s chybovou zprávou: "IOException: Uživatelský limit inodifikovaných instancí dosažen nebo příliš mnoho otevřených souborů". Pokud ano, můžete tento problém napravit voláním (jako kořen) :
echo fs.inotify.max\\ _ user\\ _ watches = 65536 | tee -a / etc / sysctl.conf
echo fs.inotify.max\\ _ user\\ _ instance = 1024 | tee -a / etc / sysctl.conf
sysctl - p
Nebo použijte vyšší čísla, pokud problém přetrvává. Výchozí hodnota pro hodinky je8192. Výchozí pro instance je128. \\[ UPDATE: Je tam chyba v Java což způsobuje, že inodifikované případy nejsou sbírány odpadky. Tento problém je třeba vyvarovat ERDDAP™ V1.66 a vyšší. Lepší řešení je přepnout na nejnovější verzi ERDDAP . \\] 
    * NoSuchFileException Oprava chyb:
Byla tam chyba, která mohla způsobit soubory dat typu = EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Kopírovat, EDDTableCopy, nebo jejich podtřídy, aby se příležitostně nenahrávaly s chybou "NoSuchFileException: _ someFileName _". Chyba souvisí s použitím FileVisitor a byl zaveden v ERDDAP™ v1.56. Problém je vzácný a s největší pravděpodobností ovlivní soubory dat s velkým počtem často se měnících datových souborů.
    * Došlo k několika drobným zlepšením, změnám a opravám chyb.

## Verze 1.58{#version-158} 
 (propuštěn 2015-02-25) 

*    **Nové funkce (pro uživatele) :** 
    * Nový [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) systém umožňuje procházet virtuální souborový systém a stahovat zdrojové datové soubory z mnoha ERDDAP™ Datové soubory. U "files" systém je ve výchozím nastavení aktivní, ale ERDDAP™ Administrátoři mohou vypnout tím, že
```
        <filesActive>false</filesActive>  
```
ve ERDDAP™ setup.xml soubor. Zvláštní poděkování Philippe Makowski, který pokračoval, když jsem byl pomalý ocenit krásu této myšlenky.
    * čas určení Maxi... V minulosti měla časová proměnná souborů dat EDDTable s daty téměř v reálném čase cíl Max NaN, což znamenalo, že maximální časová hodnota datového souboru je nedávná, ale není přesně známa a často se mění. Takže, osudová Max má skutečnou hodnotu, která ukazuje, co je známo posledně. Mnoho souborů údajů průběžně aktualizovalo data. ERDDAP™ podporuje přístup k nejnovějším datům, a to i v případě, že je to po aktuálně známé poslední době. Všimněte si, že nový [&lt;updateEveryNMillis &gt;] (/ docs / server-admin / datasets # updateeverynmillis) podpora EDDGrid FromFiles a EDDTable Datové soubory FromFiles aktualizují určení časové proměnné Max. Dalším důsledkem této změny je, že datasetID = allDatasets Datový soubor nyní obsahuje aktuálně známý poslední čas ve sloupcích maxTime. Díky Johnu Kerfootovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * STRONGLY DOPORUČENO: Aktualizace serveru [robots.txt](/docs/server-admin/additional-information#robotstxt) soubor, který obsahuje:
Zakázat: / soubory /
Zakázat: / erddap / soubory /
    * Vzorek datasets.xml -- Minulý rok jsme doporučili několik vynikajících datových souborů v pobřežní hlídce. ERDDAP™ že byste mohli přidat do svého ERDDAP™ jen přidáním několika řádků do vašeho datasets.xml . Pokud jste přidali soubory dat erdVH, přepněte prosím na nové soubory dat erdVH2:
        * Vytvořit kopii všech souborů dat erdVH a změnit kopírování datasetID je z erdVH... na erdVH2... a změnit odkazované sourceUrl od erdVH... po erdVH2....
        * Nastavte erdVH... datové soubory na aktivní = "false".
    * Všechny EDDGrid FromFiles a EDDTable Podtřídy FromFiles nyní podporují [&lt;AccessibleViaFiles &gt;] (/ docs / server- admin / datasets # accessibleviafiles) zpřístupnit zdrojové datové soubory prostřednictvím "files" systémy. Ve výchozím nastavení je tento systém vypnut pro každý datový soubor. Musíte přidat značku, aby se to umožnilo. Díky Philippu Makowskému.
    * Všechny EDDGrid FromFiles a EDDTable Podtřídy FromFiles nyní podporují [&lt;updateEveryNMillis &gt;] (/ docs / server-admin / datasets # updateeverynmillis) . Ve výchozím nastavení je tento systém vypnut pro každý datový soubor. Musíte přidat značku, aby se to umožnilo. Díky Dominicu Fullerovi-Rowellovi a NGDC.
    * Nový [EDDTableFromFileName](/docs/server-admin/datasets#eddtablefromfilenames) vytvoří datový soubor z informací o skupině souborů v souborovém systému serveru, ale neslouží datům uvnitř souborů. To je například užitečné pro distribuci souborů obrázků, audio souborů, video souborů, word- processing souborů a tabulkových souborů. Tohle funguje ruku v ruce s novým [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) systém, takže uživatelé mohou stahovat soubory. Zvláštní poděkování Philippe Makowski, který pokračoval, když jsem byl pomalý ocenit krásu této myšlenky.
    * Nový [ EDDGrid FromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) umožňuje převést tabulkový datový soubor na gridded datový soubor. Díky Ocean Networks Canada.
    * Nový [ EDDGrid Soubory FromMergeIRName](/docs/server-admin/datasets#eddgridfrommergeirfiles) Údaje agregátů ze skupiny místních podniků .gz složky. EDDGrid FromMergeIRFiles má rozlišení jako první kus kódu přispěl k ERDDAP . Bylo to úplně bez naší pomoci. Třikrát díky Jonathanovi Lafitovi a Philippovi Makowskému z R.Tech Engineering.
    * K dispozici je nový, volitelný setup.xml tag,&lt;unitTestDataDir &gt;, který specifikuje adresář s jednotkovými testovacími datovými soubory, které jsou dostupné prostřednictvím nového úložiště GitHub: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . Například:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
To ještě není užitečné, ale je součástí kroku směrem k tomu, aby se co nejvíce jednotkových testů spustitelné jinými lidmi, jak je to možné. Díky Terrymu Rankinovi.
    * Tam bylo mnoho malých vylepšení, změny a opravy chyb.

## Verze 1.56{#version-156} 
 (propuštěn 2014-12-16) 

*    **Nové funkce (pro uživatele) :**   (Žádné) 
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pravděpodobně už víte o [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) a [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) které vám umožní odkaz na soubory dat v jiných ERDDAP a ať se objeví ve vašem ERDDAP . Uživatelské žádosti o aktuální data z těchto souborů dat jsou směrovány neviditelně ke zdroji ERDDAP™ Takže data neprocházejí vaším systémem nebo nepoužívají vaši šířku pásma. Ve vzorku je nyní velký seznam doporučených souborů dat datasets.xml v erddapContent .zip . Zahrnout je do vašeho ERDDAP™ , vše, co musíte udělat, je zkopírovat a vložit ty, které chcete do svého datasets.xml . Díky Conorovi Delaneymu.
    * Pokud sestavujete ERDDAP™ Musíš přidat něco nového. Sklenice soubory do vašeho [switch classpath -cp](/docs/contributing/programmer-guide#development-environment) pro javac a javu.
    * Nový [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) zpracovává získávání dat z [Cassandra](https://cassandra.apache.org/) . Díky Ocean Networks Canada.
    * Nový [EDDTableFromColumnaAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) zpracovává získávání dat z datových souborů ASCII s fixní šířkou sloupců. Díky Philippu Makowskému.
    * Všechny EDDGrid FromFiles a EDDTable Podtřídy FromFiles nyní používají novou metodu, FileVisitor (přidáno Java v 1, 7) shromažďovat informace o složkách. To může mít žádný přínos pro první shromažďování informací o souboru pro daný datový soubor, ale zdá se, že má obrovský přínos pro následující shromáždění, pokud se uskuteční brzy, zatímco OS stále má informace cached. Díky NGDC.
        
Stále doporučujeme: Pokud má datový soubor velký počet souborů (např. &gt; 1000) , operační systém (a tak EDDGrid FromFiles a EDDTableFromFiles) bude fungovat mnohem efektivněji, pokud uložíte soubory do řady podadresářů (jeden za rok, nebo jeden za měsíc pro soubory s velmi častými soubory) , takže nikdy není velký počet souborů v daném adresáři.
        
    * Několik malých vylepšení EDDTableFromAsciiFiles.
    * Některá zlepšení EDDTableFromAsciiServiceNOS, zejména získat některé další sloupce informací od zdroje. Díky Lynn DeWittové.
    * Některé malé chyby opravy související s ISO 19115, že ERDDAP™ generuje. Díky Anně Milanové.

## Verze 1.54{#version-154} 
 (propuštěn 2014-10-24) 

*    **Nové funkce (pro uživatele) :** 
    * Některé proměnné nyní pracují s časem na milisekundách přesnosti, např., 2014-10-24T16: 41: 22.485Z. Díky Dominicu Fullerovi-Rowellovi.
*    **Malé změny / Fixy chyb:** 
    * Oprava chyb: s určitou kombinací okolností, EDDGrid Soubory souborů FromNcFile vrátily data se sníženou přesností (např., plave místo doubles) . To by mohlo ovlivnit pouze hodnoty dat s &gt; 8 významnými číslicemi. Omlouvám se. (A byla to klasická chyba programování počítače: jeden špatný charakter.) Díky Dominicu Fullerovi-Rowellovi.
    * Mnoho malých změn.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Soubory dat Griddap nyní podporují proměnné osy časové razítko a datové proměnné (tj. proměnné s časovými hodnotami, ale destinationName jiné než "time" ) . Díky Dominicu Fullerovi-Rowellovi.
    *    ERDDAP™ Nyní správně podporuje milisekundy time\\_precision "1970- 01- 01T00: 00: 000Z." Jeden záměrný problém: při psaní času do lidských souborů (např. .csv, .tsv , .json , .xhtml ) , ERDDAP™ používá specifikovaný time\\_precision pokud zahrnuje sekundy a / nebo desetinné sekundy; jinak používá sekundy time\\_precision "1970- 01- 01T00: 00: 00Z" (pro soudržnost a zpětnou kompatibilitu) . Díky Dominicu Fullerovi-Rowellovi.
    *    EDDGrid FromNcFiles nyní podporuje čtení String dataVariable "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a.
    *    .nc soubory napsané Griddapem mohou mít String dataVariable "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a.
    * GeneteDatasets Xml nyní obsahuje více flush () volá, aby se zabránilo problému informací, které nejsou zapsány do souborů. Díky Thierrymu Valerovi.
    * Dokumentace pro GenetateDatasetsXml byla vylepšena, zejména poukázat na to, že přepínač -i funguje pouze, pokud specifikujete všechny odpovědi na příkazovém řádku (např. skriptový režim) . A skriptový režim je vysvětlen. Díky Thierrymu Valerovi.
    *    ERDDAP™ již neumožňuje dvě proměnné v souboru dat mít stejné sourceName . (Pokud to někdo udělal předtím, pravděpodobně to vedlo k chybám.) Jako předtím, ERDDAP™ neumožňuje dvě proměnné v souboru dat mít stejné destinationName .

## Verze 1.52{#version-152} 
 (vydání 2014-10-03) 

*    **Nové funkce:**   (žádný) 
*    **Malé změny / Fixy chyb:** 
    * Další (menší) změna ERDDAP™ Rychleji.
    * Zlepšení souborů ISO 19115 generovaných ERDDAP : přidáno nově doporučeno&lt;gmd: protokol & gt; hodnoty (informace, vyhledávání, OPeNDAP : OPeNDAP , ERDDAP : griddap, a ERDDAP : tabledap ) uvnitř&lt;gmd: CI\\ _ OnlineResource & gt;. Díky Derrickovi Snowdenovi a Johnu Maurerovi.
    * Mnoho malých změn.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Oprava chyb: GenerateDatasetsXml.sh a DasDds.sh nebyly v erddap.war pro 1.48 a 1.50. Teď jsou. Díky Thierrymu Valerovi.
    * Malé změny některých rychlostních testů v TestAll, aby je méně náchylné k náhodě. Díky Terrymu Rankinovi.

## Verze 1.50{#version-150} 
 (propuštěn 2014-09-06) 

*    **Nové funkce:**   (žádný) 
*    **Malé změny / Fixy chyb:** 
    * Tohle. ERDDAP™ by měly být mnohem rychlejší než nedávné verze.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   (Nic.) 

## Verze 1.48{#version-148} 
 (vydání 2014-09-04) 

*    **Nové funkce:** 
    *    ERDDAP™ Nyní vždy vytvoří datový soubor tabulky, datasetID = allDatasets , který má tabulku informací o všech souborů dat v tomto ERDDAP . Může se ptát jako každý jiný datový soubor. To je užitečná alternativa k současnému systému pro získání informací o souborech dat programově.
    * Existují dva nové typy výstupních souborů pro EDDTable a EDDGrid , .csv0 a .tsv 0. Jsou to komma- a tab- separated- value soubory, které nemají řádky s názvy sloupců nebo jednotek. Data začínají na prvním řádku. Jsou užitečné zejména pro skripty, které chtějí jen jeden kus informací od ERDDAP .
*    **Malé změny / Fixy chyb:** 
    * Mapy lze nyní provádět na délku v rozmezí -720 až720.
    * Nový .nc Odpověď ml Typ souboru je k dispozici pro všechny EDDGrid Datové soubory. Vrací [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\ -formátovaný popis souboru dat (podobné kombinované .dds + .das) .
    * Oprava chyb: Uložení tabulkových dat do .nc soubor byl omezen na 100 000 hodnot na proměnnou. Nyní je omezena na 2 GB celková velikost souboru. Díky Kevinu O 'Brienovi.
    * Oprava chyb: SaveAs Matlab metody nyní zajistí, že datasetID s jsou převedeny na bezpečné Matlab variabilní názvy. Ale stále důrazně doporučuji, abyste vytvořili datasetID s, které jsou platné proměnné názvy: počínaje písmenem a pak jen pomocí A-Z, a-z, 0-9, a\\ _. Viz [ datasetID ](/docs/server-admin/datasets#datasetid) . Díky Lukovi Campbellovi.
    * Oprava chyb v EDDTableFromDatabase: S některými typy databází, a NO\\ _ Odezva dat z databáze vedla k zbytečnému 30 sekundovému zpoždění ERDDAP . Díky Gregovi Williamsovi.
    * Oprava chyb: EDDGrid Vytvořit graf s typem grafu = řádky (nebo značky nebo značky a čáry) nucené proměnné osy x být časem. Teď to může být jakákoliv osa. Díky Lynn DeWittové.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * STRONGLY DOPORUČENO: Aktualizace Java   
Tato verze ERDDAP™ vyžaduje Java 7 nebo vyšší, ale Java 7 dosáhne konce svého života v dubnu 2015 (Brzy&#33;) , Takže teď je správný čas přejít na Java 8. Java 8 je silně doporučeno. Testuji s Java 8. Všimněte si, že Java 6 dosáhla konce svého života v únoru 2013 (Už žádné opravy bezpečnostních chyb&#33;) .
    * STRONGLY DOPORUČENO: Aktualizace Tomcat
Pokud používáte Tomcat, přepněte prosím na nejnovější verzi Tomcat. Tomcat 8 je určen pro práci s Java 8.
    * " ERDDAP "už není zkratkou. Teď je to jen jméno. Nechci, aby to jméno zvýraznilo ERD . Chci ERDDAP™ zvýraznit vaši instituci a data.
    * Prosím. [přizpůsobit vzhled vašeho ERDDAP™ instalace pro zvýraznění vaší instituce a Vašich dat](/docs/server-admin/deploy-install#customize) . S hodinovou prací, můžete udělat pěkné zlepšení, které bude trvat navždy.
    * V setup.xml&lt;displayDiagnosticInfo &gt; volba je nyní vždy ignorována a zacházeno jako by hodnota byla falešná.
DOPORUČENÉ:&lt;DiagnosticInfo &gt; tag a související informace z vašeho setup.xml.
    * V setup.xml, výchozí pro&lt; drawLandMask &gt; byl "over", ale teď je "under", což je lepší obecný výchozí (funguje dobře se všemi soubory dat) .
    * Scénáře GenetateDatasetsXml.sh a Daddds.sh Linux nyní používají bash místo csh, a mají rozšíření .sh. Díky Emiliovi Mayorgovi.
    * GeneteDatasets Xml a DasDds nyní vytvoří vlastní logové soubory (GenerateDatasetsXml.log a DasDds.log) a výstupní soubory (GenerateDatasetsXml.out a DadDds.out) in _ bigParentDirectory _ / logs /, a nikdy dát své výsledky na schránky.
    * GeneteDatasets Xml nyní podporuje parametr -i příkazového řádku, který vloží výstup do zadaného souboru na určené místo. Viz [dokumentace](/docs/server-admin/datasets#generatedatasetsxml) . Díky Terrymu Rankinovi.
    * EDDTableFromDatabase nyní podporuje&lt;columnNameQuotes &gt;&lt;/ columnNameQuotes &gt;, s platnými hodnotami " (výchozí) Nebo nic. Tento znak (pokud existuje) budou použity před a po názvy sloupců v dotazech SQL. Různé typy databází, sestavené různými způsoby, budou potřebovat různé uvozovky názvu sloupce.
    * Tabulární zeměpisná šířka a délka proměnných může nyní přizpůsobit long\\_name Profil zeměpisné šířky. Dříve to mohla být jen zeměpisná šířka a délka.
    * Od nynějška uveďte "defaultDataQuery" a "defaultGraphQuery" jako atributy v globálních metadatech datového souboru (tj.&lt;AddAtts &gt;), ne jako samostatné&lt;defaultDataQuery &gt; a&lt;defaultGraphQuery &gt; tagy. (I když, pokud je stále specifikovat pomocí značek, ERDDAP™ automaticky vytvoří globální atributy s informacemi.) 

## Verze 1.46{#version-146} 
 (propuštěn 2013-07-09) 

*    **Nové funkce:** 
    *    (Žádné) 
*    **Malé změny / Fixy chyb:** 
    * Oprava chyb: pouze ve verzi 1.44 v EDDTableFromDatabase, ERDDAP™ špatně citoval název tabulky databáze v SQL prohlášeních. To je teď napraveno. Díky Kevinu O 'Brienovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    ** Pokud neupravujete standardní zprávy v messages.xml,
smazat \\[ tomcat \\] / obsah / erddap / messages.xml. **   
Výchozí messages.xml soubor je nyní v Erddap. válečný soubor, ne erddapContent .zip . Takže už nemusíte ručně aktualizovat zprávy.
    * Pokud změníte zprávy v messages.xml, od nynějška pokaždé, když aktualizujete ERDDAP™ buď:
        * Udělat stejné změny, které jste udělali před na nové
             \\[ tomcat \\] / webové aplikace / erddap / WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml.
A tentokrát: smazat \\[ tomcat \\] / obsah / erddap / messages.xml.
        * Nebo, zjistit, co se změnilo v nových messages.xml (via diff) , a upravit
             \\[ tomcat \\] / content / erddap / messages.xml soubor odpovídajícím způsobem.

## Verze 1.44{#version-144} 
 (uvolněno 2013-05-30) 

*    **Nové funkce:** 
    * Dotazy na soubory dat EDDTable nyní podporují & orderBy Min (...) a & orderByMinMax  (...)   (která vrací dvě řady v každé skupině s minimálním a maximálním počtem posledních orderBy hodnota) . Díky Lynn DeWittové.
    * Jsou tu dva nové. tabledap typy souborů: .nc CFHeader a .nc CFMAHeader (které vrací hlavičku ncdrop- like odpovídající .nc CF a .nc Typ souboru CFMA) . Díky Stevu Hankinovi.
*    **Malé změny / Fixy chyb:** 
    * Oprava chyb: načítání webových stránek .graf a .html pro soubory dat se spoustou časových hodnot bylo pomalé, protože ERDDAP™ byl pomalý při generování možností posuvníku času. Teď je to vždycky rychlé. Díky Michaelu Barrymu, OOICI a Kristianovi Sebastianovi Blalidovi.
    * Oprava chyb: U některých typů datových souborů EDDTable nebyla časová omezení vždy řešena správně. Teď jsou. Díky Johnu Maurerovi a Kevinu O 'Brienovi.
    * Oprava chyb: soubory dat by se nenahrály, když všechny subsetVariables byly proměnné s pevnou hodnotou. Teď budou. Díky Lynn DeWittové a Johnu Petersonovi.
    * ZLEPŠENO: nyní všechny dotazy pro jen podmnožiny proměnných fungují jako kdyby & odlišné () je součástí dotazu.
    * ZLEPŠENO: nyní, pro dotazy, které zahrnují & .json p = _ functionName _, _ function Název _ Musí být nyní řada 1 nebo více (období - oddělené) slova. Každé slovo musí začínat písmenem ISO 8859 nebo "\\ _" a musí být doplněno 0 nebo více písmeny ISO 8859, číslicemi nebo "\\ _". Ano, tohle je více omezující než Java Požadavky skriptu na názvy funkcí.
    * Časová osa grafů nyní funguje dobře pro delší časové rozmezí (80 - 10000 let) a kratší časové rozmezí (0,003 - 180 sekund) .
    *    ERDDAP™ je nyní více shovívavý při analýze variant dat ve formátu ISO-8601-.
    * Tam bylo mnoho dalších malých změn a opravy chyb.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    **Musíte aktualizovat nejnovější verzi pro zabezpečení.**   
         ERDDAP™ podstoupil bezpečnostní audit. Byly tam nějaké chyby a slabiny. Verze 1.44 obsahuje několik důležitých oprav bezpečnostních chyb a několik změn pro zvýšení bezpečnosti a přístupnosti (např. pro uživatele s poruchou zraku) . Verze 1.44 prošla následným bezpečnostním auditem. Díky všem dobrým lidem v USGS a Acunetixu, kteří to umožnili. (Neměl bych NOAA dělat tohle?) 
    * Nový [EDDTableFrom WFS Soubory](/docs/server-admin/datasets#eddtablefromwfsfiles) dělá místní kopii všech dat z ArcGIS MapServer WFS server a tak lze data rychle předávat ERDDAP™ uživatelé. Díky Christy Caudillové.
    * Nový [EDDTableFrom EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) umožňuje vytvořit EDDTable soubor dat z EDDGrid Dataset. Některé společné důvody k tomu jsou:
        * Tím lze datový soubor dotazovat OPeNDAP omezení výběru (které si uživatel mohl vyžádat) .
        * Datový soubor je v podstatě tabulkový datový soubor. Díky OOICI, Jim Potemra, Roy Mendelssohn.
    * Název proměnné "hloubka" je nyní speciální alternativou k "nadmořské výšce". Jednotky musí být nějakou variantou "metrů". Hodnoty dat musí být kladné = dole. ERDDAP™ je nyní plně vědom významu "hloubky" a podporuje ji tam, kde je podporována nadmořská výška (např. jako součást CF DSG cdm\\ _ data\\ _ type = profilový datový soubor) . Datový soubor nesmí mít proměnné "hloubka" ani "nadmořská výška".
    * Ve vaší datasets.xml , prosím, odstraňte všechna použití&lt;att name = "cdm\\ _ altitude\\ _ proxy" &gt; hloubka&lt;/ att &gt; protože hloubka je nyní zvláštní alternativou k nadmořské výšce, a proto není třeba specificky identifikovat.
    * Ve vaší datasets.xml , prosím, odstraňte všechna použití&lt;altitudeMetersPerSourceUnit &gt;, s výjimkou EDDtable Od SOS .
Pokud je hodnota 1, smažte ji.
Pokud je hodnota -1, zvažte změnu názvu proměnné do hloubky.
Pro jiné hodnoty přidejte&lt; addAttributes &gt; například:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Všechny soubory dat nyní podporují
        
        *   &lt;defaultDataQuery &gt;, který se používá, pokud je .html požadován bez dotazu.
            * Pravděpodobně to budete muset jen zřídka použít.
            * Pro soubory dat Griddap se běžně používá k určení jiné výchozí hodnoty hloubky nebo rozměru nadmořské výšky. (např. \\[ 0 \\] místo \\[ poslední \\] ) .
V každém případě byste měli vždy vyjmenovat všechny proměnné, vždy použít stejné hodnoty rozměrů pro všechny proměnné a téměř vždy použít \\[ 0 \\] , \\[ poslední \\] nebo \\[ 0: poslední \\] pro hodnoty rozměrů.
Například:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Pro tabledap soubory dat, nejběžnějším použitím tohoto je určit jiný výchozí časový rozsah (v poměru k současnosti, např., & time & gt; = now- 1 den) .
Pamatujte si, že požadavek na žádné datové proměnné je stejný jako určení všech datových proměnných, takže obvykle můžete jen zadat nové časové omezení.
Například:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery &gt;, který se používá v případě, že .graf je požadován bez dotazu.
            * Pravděpodobně to budete muset jen zřídka použít.
            * U souborů dat Griddap se nejčastěji používá k určení jiné výchozí hodnoty hloubky nebo rozměru nadmořské výšky. (např. \\[ 0 \\] místo \\[ poslední \\] ) a / nebo specifikovat, že konkrétní proměnná je grafizována.
V každém případě, budete téměř vždy používat \\[ 0 \\] , \\[ poslední \\] nebo \\[ 0: poslední \\] pro hodnoty rozměrů.
Například:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Pro tabledap Datové soubory, nejběžnější použití tohoto jsou specifikovat různé proměnné, které mají být zobrazeny, jiný výchozí časový rozsah (v poměru k současnosti, např., & time & gt; = now- 1 den) a / nebo jiná výchozí grafická nastavení (např. typ značky) .
Například:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Nezapomeňte, že potřebujete XML-encode nebo examinátor-encode (buď jeden, ale ne oba) výchozí dotazy, protože jsou v XML dokumentu. Například se stává&lt;se stává & amp; lt;, a &gt; stává & amp; gt;.
A prosím zkontrolujte si práci. Je snadné udělat chybu a nedostat to, co chceš.
Díky Charlesovi Carletonovi, Kevinu O 'Brienovi, Lukovi Campbellovi a dalším.
    *    EDDGrid FromDap, EDDGrid FromErddap a EDDTableFrom EDDGrid mít nový systém pro řešení souborů dat, které se často mění (stejně často jako zhruba každých 0,5 s) . Na rozdíl od ERDDAP je pravidelný, proaktivní systém pro úplné načítání každého datového souboru, tento volitelný doplňkový systém je reaktivní (spuštěno uživatelskou žádostí) a přírůstkové (pouze aktualizace informací, které je třeba aktualizovat) . Například, pokud žádost EDDGrid FromDap datový soubor se vyskytuje více než stanovený počet milisekund od poslední aktualizace, ERDDAP™ uvidíme, jestli jsou nějaké nové hodnoty pro levý most (obvykle "time" ) dimenze, a pokud ano, stačí stáhnout tyto nové hodnoty před vyřizením požadavku uživatele. Tento systém je velmi dobrý v udržení rychle se měnícího datového souboru až do data s minimálními nároky na zdroj dat, ale za cenu mírně zpomalit zpracování některých uživatelských požadavků. Viz [&lt;updateEveryNMillis &gt;] (/ docs / server-admin / datasets # updateeverynmillis)   
Díky Michaelu Barrymu a OOICI.
    *    EDDGrid FromNcFiles, EDDTableFromNcFiles a EDDTableFromNcCFSoubory nyní podporují [NcML .nc ml](/docs/server-admin/datasets#ncml-files) zdrojové soubory namísto .nc složky. Díky Jose B. Rodriguezovi Ruedovi.
    * Pro EDDGrid AgregateExistingDimension, ERDDAP™ podporuje novou volbu serverType = "dodsindex" pro atribut serverType&lt; sourceUrl s &gt; tag. To funguje s webovými stránkami, které mají seznamy souborů v rámci&lt;p&lt;/ pre &gt; a často pod OPeNDAP logo. Příkladem je [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Pro EDDTableFrom SOS nyní podporuje volitelnou značku
```  
        <sosServerType>_serverType_</sosServerType>  
```
takže můžete určit typ SOS server (Takže ERDDAP™ nemusí na to přijít.) . Platné hodnoty&lt;_ serverType _\\ & gt; are IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys a WHOI (nově podporovaný server Typ) . Viz [EDDTableFrom SOS ](/docs/server-admin/datasets#eddtablefromsos) . Díky Derrickovi Snowdenovi a Janet Fredericksové.
    * Všechny EDDGrid Z... souborů, EDDTableFrom... souborů, EDDGrid Kopírovat, a EDDTable Kopírovat nyní podporu volitelné značky
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
což může říct ERDDAP™ k uchování souboru Tabulka (s informacemi o každém zdrojovém datovém souboru) v paměti místo jen na disku (výchozí) . Udržení tabulky souborů v paměti urychluje žádosti o data (zvláště pokud existuje &gt; 1000 zdrojových souborů) , ale používá více paměti. Pokud to nastavíte tak, aby to bylo pravdivé pro jakýkoliv datový soubor, sledujte Paměť: v současné době používáte řádek na _ yourDomain _ /erddap/status.html zajistit, aby ERDDAP™ Pořád má spoustu volné paměti. Díky Fredrikovi Strayovi.
    * EDDTableFromasciIFiles nyní podporuje&lt;charset &gt;. Dva nejčastější znaky (Citlivý případ&#33;) jsou ISO-8859-1 (výchozí) a UTF-8.
    * Doporučeno: v setup.xml, uvnitř&lt;startHeadHtml &gt;, prosím, změnit&lt;html &gt; do
        &lt;html lang = "en- US" &gt; (nebo jiný [Kód jazyka](https://www.w3schools.com/tags/ref_language_codes.asp) pokud jste přeložili messages.xml) .
    * setup.xml má nové volitelné značky pro vyřazení částí ERDDAP :
        *   &lt;convertersActive &gt; false&lt;/ convertersActive &gt;&lt;&#33; -- výchozí hodnota je pravdivá -- &gt;
        *   &lt;slideSorterActive &gt; false&lt;/ slideSorterActive &gt;&lt;&#33; -- výchozí hodnota je pravdivá -- &gt;
        *   &lt;wmsActive &gt; false&lt;/ wmsActive &gt;&lt;&#33; -- výchozí hodnota je pravdivá -- &gt; Obecně doporučujeme, aby se některé z nich neklamaly.
    * GeneteDatasets Xml nyní píše výsledky _ bigParentDirectory _ / logs / generateDatasetsXmlLog.txt, ne log.txt Díky Kristianu Sebastianu Blalidovi.
    * GeneteDatasets Xml nyní dělá dobrý návrh pro&lt;načíst EveryMinut &gt;. Díky NOAA Projekt UAF.
    * Mnoho malých vylepšení na GenetateDatasetsXml. Díky NOAA Projekt UAF.

## Verze 1.42{#version-142} 
 (propuštěn 2012-11-26) 

*    **Nové funkce:** 
    *    (Žádné důležité nové funkce.) 
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pokud jste upgrade z ERDDAP™ 1.38 nebo 1.40, nebyly žádné změny, které vyžadují, abyste provedli změny ve svých konfiguračních souborech (ale musíte použít nový messages.xml soubor) .
    *    ERDDAP™ opět může běžet s Java 1.6. ( ERDDAP™ v1.40 požadováno Java 1.7.) Stále důrazně doporučujeme použití nejnovější verze Java 1.7.
    * Nový typ datového souboru, [EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , lze číst data ze sady Automatic Weather Station (AWS) XML datové soubory. Díky Lynn Dewittové a Exploratoriu.
*    **Malé změny / Fixy chyb:** 
    * Upraveno na změny NDBC SOS zdrojové datové servery.
    * Upraveno na změny služeb NOS COOPS ASCII.
    * Udělal několik drobných změn a oprav chyb.

## Verze 1.40{#version-140} 
 (propuštěn 2012-10-25) 

*    **Nové funkce:** 
    * Existuje nový formát výstupního souboru pro tabledap Datové soubory: .nc CFMA, který ukládá požadované údaje v .nc soubor, který odpovídá CF [Geometrie odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Multidimenzionální možnosti pole, a které proto odpovídají šablonám NODC \\[ 2021: nyní [Šablona NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] pro uchovávání tohoto druhu údajů. Díky NODC.
    *    tabledap požadavky mohou nyní zahrnovat časová omezení, jako je & time &gt; now- 5 dní. Viz [dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Díky Jamesu Goslingovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pokud jste upgrade z ERDDAP™ 1.38, nebyly žádné změny, které vyžadují, abyste dělali změny ve svých konfiguračních souborech (ale musíte použít nový messages.xml soubor) .
    *    ERDDAP™ veřejné zprávy a vnitřní milníky jsou k dispozici prostřednictvím [ ERDDAP™ na GitHub](https://github.com/ERDDAP) . Pro více informací, viz [Wiki](https://github.com/ERDDAP/erddap/wiki) pro ERDDAP™ projekt i obecnější [ ERDDAP™ Průvodce programátorem](/docs/contributing/programmer-guide) . (To bylo oznámeno samostatně několik týdnů po ERDDAP™ 1.38 uvolnění.) 
    * GeneteDatasets Xml byl zlepšen.
        * Scénář byl revidován, takže by měl správně fungovat na všech počítačích Linux (Ne jen pár.) .
        * Nyní přidává creator\\_name , creator\\_email a creator\\_url kdykoliv je to možné.
        * Mnoho dalších malých zlepšení.
    * Rafinované ERDDAP™ obchoduje s časem.
        * Vnitřní, ERDDAP™ Nyní zpracovává časy při milisekundové přesnosti (ne sekundy) .
        * Nyní můžete volitelně určit časovou přesnost daného souboru dat, viz [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Například můžete nastavit datový soubor pro zobrazení časových hodnot s přesností data (Například 1970- 01- 01) .
        * Vaše současné soubory dat budou používat výchozí nastavení, takže nejsou těmito změnami ovlivněny a budou nadále zobrazovat čas s přesností sekund. Díky Servetovi Cizmelimu a Philipovi Goldsteinovi.
    *    [Soubory EDDTableFromNcCFName](/docs/server-admin/datasets#eddtablefromnccffiles) je nový typ datového souboru, který můžete použít ve svém datasets.xml Složka. Může číst data z některého z mnoha formátů souborů definovaných [CF Geometrie odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konvence. Díky NODC a speciální díky Kyle Wilcox za vytváření výběrových souborů pro obrovský počet platných formátů DSG souborů a za jejich zpřístupnění veřejnosti.
*    **Malé změny / Fixy chyb:** 
    * Rozšířený [quickRestart](#quick-restart) systém pro všechny příslušné EDDGrid a podtřídy EDDTable.
    * Lepší dokumentace, zejména související s použitím [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) a [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) z různých klientských programů.
    * Změněno pokročilé vyhledávání na podporu minTime a / nebo maxTime vyjádřené jako epochSeconds. Díky Lynn Dewittové.
    * Změněno .htmlTable výstup zobrazovat URL a e-mailové adresy jako odkazy.
    * Přidáno "rel =" a "rev =" k relevantnímu&lt;a href &gt; tagy. Díky Pat Cappelaere z OGC   REST Projekt.
    * Lepší ochrana před nerealisticky velkými žádostmi o údaje, zejména v rámci tabledap , kde je to těžší problém.
    * Přesunul jsem další zprávy do zpráv.
    * Zlepšil rychlost.
    * Pevné EDDGrid FromFiles umožní sestupné tříděné osy. Díky Maricel Etchegaray.
    * Odstraněny odkazy na iGoogle, protože to bude přerušeno.
    * Udělal několik drobných změn a oprav chyb.

## Verze 1.38{#version-138} 
 (propuštěn 2012-04-21) 

*    **Nové funkce:** 
    * ISO 19115 a FGDC -- ERDDAP™ může automaticky generovat soubory metadat ISO 19115 a FGDC XML pro každý datový soubor. Odkazy na soubory jsou viditelné v každém seznamu souborů (např. z celotextového vyhledávání) a také v Web přístupných složkách (WAF)   (viz [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) a [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Díky Tedu Habermannovi, Daveovi Neufeldovi a mnoha dalším.
    * Full Text Hledá pro Datasety nyní podporu\\ - _ excludedWord _ a\\ - "_ vyloučená fráze _". Díky Richovi Signellovi.
    * Vyhledávání datových souborů nyní vrací výsledky stránku po stránce. Výchozí používá parametr řetězec: stránka = 1 & itemsPerPage = 1000, ale můžete změnit hodnoty v URL vašeho požadavku. Díky Stevu Hankinovi a projektu UAF.
    *    OpenSearch -- ERDDAP™ Nyní podporuje [ OpenSearch 1. 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard pro vyhledávání souborů dat. Mimo jiné, to umožňuje katalog agregace webové stránky dělat distribuované vyhledávání (předání žádosti o vyhledávání do každého katalogu, o kterém ví) .
    * Oddělené čárky Hodnota (CSV) Soubory -- ERDDAP™ nyní generuje CSV soubory jen s čárkou mezi hodnotami (které Excel preferuje) místo čárky + prostor. Díky Jeffovi de LaBeaujardiere.
    * Miliony datových souborů... Na podporu bylo provedeno několik změn ERDDAP Má obrovské množství souborů dat, možná i milion. Díky Stevu Hankinovi a projektu UAF.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
#### Rychlý restart{#quick-restart} 
*    [A](#quick-restart) rychlý restart systém umožňuje ERDDAP™ Restartovat mnohem rychleji.
     **Přidejte prosím toto do souboru setup.xml** hned po&lt;/ datasetsRegex &gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Kompletní vyhledávání textů pro soubory dat lze nyní provést pomocí vyhledávače Lucene (i když doporučujeme původní vyhledávač, pokud máte méně než 10 000 souborů dat) nebo původní vyhledávací systém.
         **Přidejte prosím toto do souboru setup.xml** hned po&lt;/ displayDiagnosticInfo &gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * V setup.xml, můžete / měli byste nyní přidat dvě nové kategorie do comma- oddělený seznam&lt; categoryAttributes &gt;:
        * globální: klíčová slova (Přidejte to hned po celém světě: instituce) -- nový speciální případ, který rozebírá komma- oddělený seznam klíčových slov z atributu globálních klíčových slov, aby se samostatná položka pro každé klíčové slovo.
        * proměnná Název (přidat na konci) -- nový speciální případ, který kategorizuje každý z dataVariable   destinationName "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a.
    * V setup.xml, můžete (Ale proč?) tell ERDDAP™ nenabízet FGDC a / nebo ISO 19115 metadata pro žádný datový soubor
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Výchozí hodnoty pro tato nastavení jsou pravdivé.
    * V datasets.xml , prosím zvažte zlepšení metadat pro vaše soubory dat. ERDDAP™ nyní automaticky generuje soubory metadat ISO 19115 a FGDC XML pro každý datový soubor na základě metadat datového souboru.
Takže... **dobrá metadata datového souboru vedou k dobrému ERDDAP -generované ISO 19115 a FGDC metadata.**   
         **Viz nová dokumentace pro řadu nových DOPORUČENÝCH [Globální atributy](/docs/server-admin/datasets#global-attributes) .** 
    * V datasets.xml , pokud chceš říct ERDDAP™ použít předvyrobený soubor FGDC a / nebo ISO 19115, který je někde v systému souborů serveru namísto toho, aby ERDDAP™ generovat tyto soubory, použít:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Pokud _ fullFileName _\\ = "" nebo soubor není nalezen, datový soubor nebude mít žádná metadata FGDC a / nebo ISO 19115. To je také užitečné, pokud chcete potlačit metadata FGDC a / nebo ISO 19115 pro konkrétní datový soubor.
    * V datasets.xml , pro všechny EDDGrid Boční strana a EDDGrid Agregates ExistingDimension soubory, ujistěte se, že dětské soubory mají různé datasetID s než jejich rodičovské soubory údajů a jiné děti. (Například můžete sledovat jednoduchý, ale efektivní systém George Foremana pro pojmenování jeho dětí.) Pokud jsou nějaká jména v rodině stejná, datový soubor se nenačte. (s chybovou zprávou, že hodnoty agregované osy nejsou v tříděném pořadí) .
    * V datasets.xml , tam byly některé změny v seznamu platných ioos\\_category hodnoty metadat:
        * "pCO2" byl změněn na "CO2".
        * Byla přidána "Fyzická Oceanografie".
        * Byla přidána "půda".
    * V datasets.xml , ERDDAP™ již neumožňuje "." v datasetID . Bylo to dovoleno, ale odrazeno. (Promiň.) 
    * V datasets.xml , nastavení EDDTableFromThreddsFiles a EDDTableFrom Hyrax Soubory se mírně změnily, protože obě třídy byly přepsány na účinnější (obě třídy nyní vždy místní kopii všech vzdálených datových souborů) . Viz dokumentace pro nastavení těchto tříd: [EDDTableFrom Hyrax Soubory](/docs/server-admin/datasets#eddtablefromhyraxfiles) a [Soubory EDDTableFromThreddsName](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Viz zejména revidované připomínky&lt;fileDir &gt; (Teď je to irelevantní.) a&lt; sourceUrl &gt; (Nyní zásadní) . Také byste nikdy neměli zabalit tuto třídu v EDDTableCopy pro účinnost.
    * V datasets.xml , pokud používáte EDDTableFromDatabase s Oracle databáze, měli byste obsahovat připojení Vlastnost jako
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
pro určení, kolik řádků dat lze najednou načíst, protože výchozí hodnota je 10, což je příšerně neefektivní. Viz [ Oracle dokumentace](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql a PostgreSQL zřejmě mají pro toto nastavení lepší chyby. Díky Kevinu O 'Brienovi.
    * Pokud používáte EDDTableFromDatabase, podívejte se na vylepšené [Dokumentace "Rychlost"](/docs/server-admin/datasets#eddtablefromdatabase) další návrhy na zlepšení výkonnosti. Díky Kevinu O 'Brienovi.
    * V datasets.xml , pro všechny EDDTable... datové soubory, v úmluvách a Metadata\\_Conventions globální atributy, viz CF-1.6 (CF- 1, 0, 1, 1, 1, 2, 1, 3, 1, 4 nebo 1, 5) , Protože CF-1.6 je první verze, která zahrnuje změny týkající se geometrie odběru vzorků.
    * Programátoři, kteří sestavují ERDDAP™ kód musí přidat lib / lucene-core.jar do seznamu jar souborů v jejich javac a java příkazové řádky cesty.
    *    ERDDAP™ má [nová služba](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) převést standardní název CF do / z GCMD Science Keyword. To můžete považovat za užitečné při generování globálních metadat klíčových slov pro soubory dat ve vašem ERDDAP .
    * Jednání s Boty... Přečtěte si prosím tuto radu [zabránit botům v plazení ERDDAP™ v hloupém způsobem](/docs/server-admin/additional-information#robotstxt) .
    * Překlad -- Text o ERDDAP Webové stránky jsou nyní většinou v messages.xml a tak vhodné pro překlad do různých jazyků (např. němčina, francouzština) . Zprávy nyní často používají MessageFormat pro formátování, také pomoci při provádění překladů. Pokud máte zájem o překlad, prosím, e-mail erd dot data at noaa dot gov .
    * Vzorek datasets.xml -- Ve vzorku bylo několik malých, ale významných chyb. datasets.xml . Pokud používáte tyto soubory dat, prosím, získejte novější verze z nového vzorku datasets.xml v novém erddapContent .zip Složka. Díky Jamesu Wilkinsonovi.
    * Git... I will try hard to make ERDDAP™ projekt GitHub ASAP po tomto vydání.
*    **Malé změny / Fixy chyb:** 
    * Nová paleta, OceanDepth, je užitečná pro hloubkové hodnoty (Pozitivní je dole.) např. 0 (mělký) až 8000 (hluboké) .
    * U .kml výstup z tabledap používá lepší ikonu značky (Není to rozmazané.) . A vznášet se nad značkou to teď dělá větší.
    * EDDTableFromFiles -- V posledním upgradu, nová netcdf-java knihovna měla přísnější omezení pro proměnné názvy v .nc složky. To způsobilo problémy pro EDDTableFromFiles, pokud proměnné sourceName měl určité interpunkční znaky. EDDTableFromFiles je nyní upraven, aby se tomuto problému vyhnul. Díky Thomasu Holcombovi.
    * Stránka .subset nyní podporuje 0 / 10 / 100 / 1000 / 10000 / 100000 místo zaškrtávacího políčka pro související údaje. Tip nástrojů varuje, že 100000 může způsobit pád prohlížeče. Díky Annette DesRochers, Richarde. (Abe.) Coughlin a biologický projekt IOOS.
    * ... / erddap / info / _ datasetID @ info: whatsthis Díky Richardovi. (Abe.) Coughlin a biologický projekt IOOS.
    * Oprava chyb: in tabledap , pro soubory dat s nadmořskou výškou MetersPerSourceUnit&lt;0, dotazy s omezeními nadmořské výšky byly zodpovězeny nesprávně. Díky Kylovi Wilcoxovi.
    * Oprava chyb: EDDGrid Aggregates FromExistingDimension nyní podporuje rozmanitější URL TDS. Díky?

## Verze 1.36{#version-136} 
 (vydání 2011-08-01) 

*    **Nové funkce:** 
    * Žádné významné změny z pohledu uživatele.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * PmelTao datový soubor, který byl často používán jako soubor vzorků pro tabledap   
Dokumentace již není k dispozici. ERDDAP™ administrátoři musí provést tyto změny:
        * Ve vaší datasets.xml , pokud máte datasetID = "pmelTao" dataset, add
aktivní = "false" těsně před "&gt;" na konci tohoto řádku.
        * V setup.xml, pokud máte&lt;EDDTableIdPříklad &gt; je pmelTao, pak:
            * Jestliže datasets.xml nemá datový soubor s datasetID = "erdGlobecBottle", add
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * V setup.xml, nahradit všechny značky z&lt;EDDTableIdPříklad &gt; skrz
                &lt;EDDTable Matlab PlotExample &gt; s
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Pro soubory dat, kde je typ podtřídou EDDTableFromFiles, si nyní můžete vytvořit data z metadat.
Konkrétně nyní můžete z hodnot atributu jedné z původních proměnných vytvořit proměnnou.
Například: datasets.xml ,&lt; dataVariable &gt; tag, pokud používáte
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ vytvoří proměnnou s hodnotami atributu PI proměnné cruise.
Díky WOD.
*    **Změny:** 
    * Malé změny

## Verze 1.34{#version-134} 
 (uvolněno 2011-06-15) 

*    **Změny:** 
    * Oprava chyb: Opravil únik paměti, ke kterému došlo na 64bitu. Java zařízení.
    * Oprava chyb: ERDDAP™ Nyní správně nastavuje tyto globální atributy, když hodnoty zeměpisné šířky se pohybují od vysoké k nízké: geoprostorové\\ _ lat\\ _ min, geoprostorové\\ _ lat\\ _ max, Southernmost\\ _ Northing, Northernmost\\ _ Northing.
        
Všimněte si, že actual\\_range je beze změny: může mít nízké, vysoké nebo vysoké, nízké hodnoty, protože je určen k označení rozsahu a pořadí skladování.
        
    * Malé změny.
    *    ERDDAP™ administrátoři nemusí provádět žádné změny v jejich setup.xml nebo datasets.xml .

## Verze 1.32{#version-132} 
 (uvolněno 2011-05-20) 

*    **Změny:** 
    * Podpora nově ratifikovaných geometrií odběru vzorků s obsahem uhlíku CF (který bohužel ještě není k dispozici online) , který nahrazuje navrhované úmluvy o pozorování podle bodu CF.
         ERDDAP™ Uživatelé uvidí, že cdm\\ _ feature\\ _ type = Station je nahrazen TimeSeries a existují malé změny v souborech vytvořených pro .nc Typ souboru CF (plochý\\ _ rozměr se nyní nazývá vzorek\\ _ rozměr) .
         ERDDAP™ Administrátoři budou muset provést tyto změny v datasets.xml :
        * cdm\\ _ data\\ _ type = Station by měla být změněna na cdm\\ _ data\\ _ type = TimeSeries.
        * cdm\\ _ data\\ _ type = StationProfile by měla být změněna na cdm\\ _ data\\ _ type = TimeSeriesProfile.
        * cdm\\ _ station\\ _ proměnné by měly být změněny na cdm\\ _ timeseries\\ _ proměnných.
        * cf\\ _ role = stanice\\ _ id by měla být změněna na cf\\ _ role = timeseries\\ _ id.
    * Nový ioos\\_category Možnosti: "Barevná rozpuštěná organická hmota", "pCO2", "Stream Flow", "Celková suspendovaná hmota".
    * Možné řešení možného úniku paměti na 64bitu Java . \\[ Nefungovalo to. \\] 
    * Malé změny.

## Verze 1.30{#version-130} 
 (propuštěn 2011-04-29) 

*    **Nové funkce:** 
    * Podpora 64bitu Java . Při použití s 64 bitem Java , ERDDAP™ nyní může využít mnohem více hromadné paměti a zvládnout mnoho dalších současně požadavky.
    * Podpora .nc žádosti do 2GB (i bez 64bitu Java ) prostřednictvím lepšího používání ERDDAP zpracovává data v kusech.
    * Mnoho 2X rychlost zlepšení v kódu a 2X rychlosti od Java 1, 6 ERDDAP™ 2X na 4X rychleji než předtím.
    * Úspora paměti výrazně nižší ERDDAP základní využití paměti.
    * Pro tabulky datových souborů, ERDDAP™ je nyní plně obeznámen s cdm\\ _ date\\ _ type a jak data mapuje na typ CDM. Viz [CF Specifikace geometrie odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Možná, že jednou brzy, že soubor Word bude převeden na .html a nahradit aktuální "OBSOLETE" informace na této webové stránce. Díky NOAA Projekt UAF.
    * Pro většinu souborů dat EDDTable je nová volba typu výstupního souboru, .nc CF, vytvoří kontiguous Ragged Array .nc soubory, které odpovídají nejnovější verzi [CF Konvence geometrie odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Tyto soubory jsou strukturovány tak, aby odrážely typ dat CDM souboru. Vzhledem k tomu, že se navrhované úmluvy právě změnily, od tohoto psaní, netcdf-java knihovna ještě podporuje čtení formátů souborů vytvořených ERDDAP a interpretovat je jako soubory CDM. Pravděpodobně brzy. Díky NOAA Projekt UAF.
    * Pohled: Distinct Datová volba na webové stránce .subset je nyní seznamem, který umožňuje uživatelům určit maximální počet řádků různých dat, která mají být zobrazena (výchozí hodnota = 1000) . Tato změna a ostatní umožňují ERDDAP™ pracovat s soubory dat, které mají velmi velký počet řádků různých dat. (Počet unikátních hodnot pro každou jednotlivou proměnnou je stále problém, ale může být docela vysoká (20 000?) před .subset a další webové stránky načíst opravdu pomalu.) Díky NOAA Projekt UAF.
    * .subset webové stránky mají novou možnost: Zobrazit Distinct Data Counts. Díky projektu GTOPP.
    * Na pomoc uživatelům, odlišné hodnoty (např. názvy stanic) jsou nyní zobrazeny na formulářích Make-A-Graph a Data Access. Díky NOAA Projekt UAF.
    * .transparentní Png požadavky nyní podporují všechny typy grafů a údajů. Kreslí jen data -- žádné osy, legendy, landmask nebo cokoliv jiného. To umožňuje vytvářet obrázky jako vrstvy transparentPngs. Pokud & .size = _ width _ | _ výška _ je specifikována v dotazu (doporučeno) Je mi ctí. Výchozí je 360x360 pixelů. Jedinou výjimkou je EDDGrid & .draw = povrch, kde výchozí (jako předtím) je obrázek s ~ 1 / pixel na datový bod (až 3000 x a y pixelů) . Díky Fredu Hochstaedterovi.
    * U WMS Webové stránky nyní zobrazí barevný pruh proměnné datového souboru (s) . Díky Emiliovi Mayorgovi a dalším.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Toto vydání zahrnuje spoustu změn. Všichni jsou důležití. Buďte prosím trpěliví a propracujte všechny změny uvedené níže.
    * Tato verze je vytlačována dříve, než se zamýšlí vypořádat s některými Java Bezpečnostní štěnice. Bohužel, několik funkcí / oprav určených k tomuto ERDDAP™ verze není v této verzi. Promiň. Doufejme, že příští verze bude relativně brzy. (a mnohem jednodušší na upgrade) .
    * Aby se zabránilo několika bezpečnostních chyb v Java 6 aktualizace 23 a níže, stáhnout a nainstalovat nejnovější verzi Java   ( Java 6 aktualizace 24 nebo vyšší) . Pokud máte 64bitový operační systém, prosím, získejte 64bitovou verzi Java .
    * Pokud používáte Tomcat 5, musíte upgradovat na Tomcat 6 nebo 7 (preferované) . Pokud používáte Tomcat6, zvažte upgrade na Tomcat verze7.
    * Prosím postupujte podle všech pokynů pro [nastavení nového ERDDAP™ ](/docs/server-admin/deploy-install) , ale tam, kde je to relevantní, budete kopírovat soubory ze své staré instalace do nové instalace, zejména \\[ tomcat \\] / content / erddap adresář a soubory. V rámci toho, Všimněte si [nová doporučení pro nastavení Tomcat](/docs/server-admin/deploy-install#tomcat) .
    * Výchozí erddap.css je nyní součástí souboru erddap.war.
        * Pro použití výchozí erddap.css, **smazat** Tvůj starý \\[ tomcat \\] / obsah / erddap / images / erddap.css.
        * If you modified \\[ tomcat \\] / obsah / erddap / obrázky / erddap.css, a chcete jej používat: stačí nechat na místě a nahradit&lt;vstup &gt; sekce s:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Ve vaší \\[ tomcat \\] / obsah / erddap / setup.xml:
        * Nahradit komentáře a tagy související&lt;partialRequestMaxBytes &gt; a&lt;partialRequestMaxCells &gt; s
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Nahradit připomínky týkající se&lt; categoryAttributes &gt; a zvažte změnu hodnoty značky:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Individuální&lt; categoryAttributes &gt; které jsou globálními atributy nyní Nutno identifikovat pomocí prefixu global: (Například globální: instituce) . Ostatní atributy se považují za proměnné atributy (např. standard\\_name ) . Také hodnoty institucí (The only one) byly ponechány v původním případě. Nyní jsou všechny kategorie přepočteny na malé.
    * Ve vaší \\[ tomcat \\] / obsah / erddap / datasets.xml :
        * Velké zlepšení: ERDDAP™ má nové požadavky týkající se datového souboru tabulky cdm\\ _ data\\ _ type. Zejména musí mít každý datový soubor správná metadata a proměnné vztahující se k cdm\\ _ data\\ _ type. Pokud ne, datový soubor se nenačte a nehodí chybu. Viz dokumentace pro [cdm\\ _ data\\ _ type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Existuje nový typ datového souboru: EDDTableFromAsciiServiceNOS.
        * FYI: Existují tři nově povolené ioos\\_category možnosti: Hydrologie, kvalita (např. pro vlajky jakosti) , a statistika (např. průměr) .
        * Pro EDDTableFrom... Soubory soubory soubory soubory, odstranit&lt;nDimensions &gt; tagy. Už nejsou potřeba nebo použity.
        * Pro proměnné s destinationName = nadmořská výška, ERDDAP™ již sílu long\\_name být nadhoz. Projděte si to, prosím. datasets.xml a opakovaně hledat&lt; destinationName &gt; nadmořská výška a přidat k této proměnné&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (nebo mírně odlišné long\\_name ve zvláštních případech) .
        * Volitelné: Všechny podtřídy EDDTableFromFiles podporují proměnnou [ sourceName = globální:...](/docs/server-admin/datasets#global-sourcenames) převést globální metadata z každého souboru do datové proměnné. Díky Lynn DeWittové.
    * Uživatelé EDDTableFromDatabase -- ERDDAP™ přichází s novým JDBC 4 ovladač pro Postgres. Pro jiné databáze, zkontrolujte web pro nejnovější JDBC .jar soubor pro vaši databázi. Od ERDDAP™ nyní používá Java 1, 6 +, JDBC 4 (ne 3) je pravděpodobně doporučeno.
    * FYI
        *    EDDGrid Z... Soubory a EDDTable Od... Soubory datových souborů nyní ukládat informace o souboru
             \\[ bigParentDirectory \\] / datový soubor Informace / \\[  datasetID  \\] /\\ * .nc složky.
Také, EDDTable soubory dat nyní ukládat informace o podmnožině v
             \\[ bigParentDirectory \\] / datový soubor Informace / \\[  datasetID  \\] /\\ * .nc složky. Tyto soubory bývaly
             \\[ bigParentDirectory \\] / datový soubor Informace / \\[  datasetID  \\] . .json složky.
Staré soubory budou smazány automaticky, když ERDDAP™ začíná. Nebo můžete smazat všechny soubory (ale nechte prázdné podadresáře) n \\[ bigParentDirectory \\] / datasetInfo /.
        * Pracoval jsem na nových souborech EDDTableFromNcCFFiles, které budou číst data z místních a vzdálených souborů pomocí navržených, nových konvencí pro pozorování CF Point. Ale není to v tomto vydání. V knihovnách netcdf-java existují problémy související s některými metodami pro čtení těchto souborů. A v navrhovaných úmluvách o pozorování CF Point došlo k několika nedávným změnám. Až bude knihovna netcdf-java opravena a aktualizována k poslednímu návrhu, budu pokračovat v práci na tomto.
        * Běžící ERDDAP™ na Windows může mít problémy: zejména, můžete vidět v \\[ bigParentDirectory / log.txt soubor, který ERDDAP™ není někdy schopen rychle smazat a / nebo přejmenovat soubory. Je to kvůli antivirovému softwaru. (např. z McAfee a Norton) což je kontrola souborů na viry. Pokud narazíte na tento problém (které lze vidět chybovými zprávami v log.txt souboru jako "Nelze smazat"...) , změna nastavení antivirového softwaru může částečně zmírnit problém.
Pokud ERDDAP™ ve Windows je jen test běží na ploše, je to jen otrava.
Pokud ERDDAP™ ve Windows je vaše veřejnost ERDDAP™ , Zvažte přechod na Linux server.
    * Pomalý první start... Když poprvé utečeš ERDDAP™ po modernizaci, ERDDAP™ může být pomalé načítání souborů dat. Cesta ERDDAP™ ukládá informace o agregovaných souborech se změnila, takže ERDDAP™ bude muset přečíst nějaké informace ze všech těchto souborů. To bude chvíli trvat.
    * Chyby na Startupu... Vzhledem ke změnám týkajícím se cdm\\ _ data\\ _ type je pravděpodobné, že některé z vašich souborů dat nebudou načítat a budou házet chyby. Opatrně si přečtěte e-mail Daily Report, že ERDDAP™ pošle tě, když ERDDAP™ je hotový. Bude mít seznam souborů dat, které nenahrály (nahoře) a důvod, proč nenabili (u dna) .
    * Pokud se zaseknete nebo budete mít jiné otázky, pošlete mi e-mail podrobnosti: erd.data at noaa.gov .
    * Programátoři -- Pokud píšete Java programy, které běží ERDDAP™ kód, musíte změnit některé reference parametru příkazového řádku:
        * Změna joda- time- 1.6.2.jar na joda- time. sklenice
        * Změnit postgres JDBC .jar odkaz na postgresql.jdbc.jar
*    **Malé změny a chyby:** 
    
    * Lepší manipulace s připojením, aby se zabránilo závitům.
    * Zlepšené konměny pro efektivnější zvládání téměř souběžných identických požadavků.
    *    ERDDAP™ nyní používá netcdfAll-4.2.jar (Přejmenováno na netcdfAll- last. sklenice) . Tento přepínač vyžadoval několik vnitřních změn a způsobil několik drobných externích změn, např. změny, jak se čtou grib soubory a drobné změny .nc Výstup hlavy.
    * Nová funkce: \\[ erddap \\] / convert / fipscounty.html konverts FIPS Okresní kódy na / z okresní názvy.
    * Na mapách, státní hranice jsou nyní tmavě fialové, takže vynikají lépe na všech pozadí barvy.
    * Tabulární .kml výstup opět používá kruhovou ikonu k označení bodů (ne ikona letadla Google nedávno přešel na) .
    * Datové soubory ErdCalcofi byly přepracovány a jsou nyní podávány z místních souborů (rychleji) .
    * GeneteDatasets Xml Trojúhelníky Katalog nyní vytváří soubor výsledků:
         \\[ tomcat \\] / webové aplikace / erddap / WEB-INF / temp / EDDGrid FromThreddsCatalog.xml. Díky Kevinu O 'Brienovi.
    * GeneteDatasets Xml Trojúhelníky Katalog se nyní snaží odstranit zbytečná čísla portu ze zdrojových URL (např.: 8080 a: 8081 lze někdy odstranit) . Díky NOAA Centrální bezpečnostní tým.
    * Pro .subset webové stránky, Mapa Distinct Data má nyní variabilní rozsah lat.
    * Několik seznamů v ERDDAP™   (např. tabulka, která zobrazuje všechny soubory dat) byly tříděny tak, aby A.. Z třídil před. .z . Teď třídí případ necitlivě.
    * Malé změny na webových stránkách .subset, včetně: jednotky jsou nyní uvedeny.
    * GeneteDatasets Xml a DasDds již nehází výjimku, pokud nejsou schopni dát výsledky na systémové schránky nebo zobrazovat InBrowser. Díky Ericovi Bridgerovi a Gregovi Williamsovi.
    * Oprava chyb: Při načtení souborů dat, ERDDAP™ nyní odstraňuje nebo upravuje geoprostorové globální atributy. Díky Charlesovi Carletonovi.
    * Oprava chyb: String2.getClassPath () nyní správně dekóduje třídu Cesta (Zejména na Windows se mezery v názvu souboru objevily jako% 20) . Toto ovlivnění ERDDAP™ EDStatic calling SSR.getContextDirectory () a nalezení obsahu / erddap. Díky Abe Coughlinovi.
    * Oprava chyb: v EDDTableFromFiles související s getDataForDapQuery manipulace s odlišným () žádosti. Díky Ericu Bridgerovi.
    * Oprava chyb: tabledap požadavky správně neodpovídaly omezením nadmořské výšky při nadmořské výšce datového souboru MetersPerSourceUnit byl -1. Díky Ericu Bridgerovi.
    * Oprava chyb: EDDTableFrom... Soubory datových souborů nyní správně zpracovávají požadavky, které zahrnují = NaN a&#33; = NaN.
    
## Verze 1.28{#version-128} 
 (propuštěn 2010-08-27) 

*    **Nové funkce:** žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** žádné.
*    **Oprava chyb:** Napravit chybu v programování (pouze v ver 1.26) které ERDDAP™ Velmi pomalu.
     

## Verze 1.26{#version-126} 
 (propuštěn 2010-08-25) 

*    **Nové funkce:** žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Od tvého \\[ tomcat \\] / obsah / erddap / setup.xml,
        * V&lt;právní &gt;, na novém řádku níže \\[ standardní DataLicenses \\] , vložte \\[ normyKontakt \\] . \\[ normyKontakt \\] vá&lt;Adminal Email &gt; specifikováno výše v setup.xml.
        * Odstranit&lt;tableCommonBGColor &gt; a&lt;tableHighlightBGColor &gt;.
        * Doporučeno: Změna&lt;endBodyHtml &gt;
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Požadováno: Na tvou \\[ tomcat \\] / content / erddap / images / erddap.css a erddapAlt.css, add at the bottom:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Fixy chyb a malé změny:** 
    
    * Oprava chyb: v některých situacích nefungovaly formuláře v některých verzích Internet Explorer. Děkuji Gregovi Williamsovi.
    * Oprava chyb: Tlačítka Make A Graph nefungovala, pokud byl datový soubor ze vzdáleného ERDDAP .
    * Oprava chyb: WMS Někdy to nefungovalo, když byl datový soubor ze vzdáleného zařízení. ERDDAP .
    * Mnoho malých změn a oprav chyb.
    

## Verze 1.24{#version-124} 
 (propuštěn 2010-08-06) 

*    **Nové funkce:** 
    * Nový [Subset webové stránky](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) použít facetované vyhledávání pro výběr podskupin datových souborů tabulek. Díky POST.
    * Nový [Pokročilé vyhledávání](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) kombinuje všechny ostatní možnosti vyhledávání a přidává zeměpisnou délku, šířku a časové ohraničení. Díky Ellyn Montgomeryové. (Omlouvám se za zpoždění.) 
    * Nový [Převést čas](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) webové stránky a služby vám umožní převést numerické časy do / z ISO řetězce krát.
    * Nový [Převést Jednotky](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) webové stránky a služby vám umožní převést UDUNITS do / z jednotek UCUM. Díky NOAA IOOS SOS .
    * Pokud tabledap žádost obsahuje & jednotky ("UCUM") , názvy jednotek budou převedeny z původních jmen (obvykle UDUNITS ) do [UKUM](https://unitsofmeasure.org/ucum.html) Jména jednotek. To se týká pouze jednotek\\*názvy\\*, ne hodnoty dat. Díky NOAA IOOS SOS .
    * Zlepšení tvorby webových stránek grafů a grafů a map:
        * Pokud je graf mapa, existují nové Make A Graph tlačítka přiblížit / out a novou volbou klepněte na tlačítko změnit střed mapy. Díky POST.
        * Nastavení filtru přidáno ke spodu. Díky Gregovi Williamsovi.
        * Zabudované v pobřežních datových souborech byly aktualizovány na GSHHS v2.0. Díky POST.
        * Mapy nyní zahrnují jezera a řeky. Díky POST. (Je mi líto, delta řeky Sacramento chybí, protože ani data z pobřeží, ani data z jezera / řeky se s tím netýkají.) 
        * Byly aktualizovány soubory z pscoast- odvozené země / státu. Díky POST.
        * Topography.cpt byl mírně upraven. (Promiň, jestli tě to nepříznivě ovlivní.) Díky POST.
        * V Griddap je Make A Graph, pokud uživatel změní proměnnou, formulář je automaticky znovu odeslán tak, aby axisVariable s 'showStartAndStop vždy odráží proměnné grafu. Díky Joaquin Trinanes.
        * Pro Png a pdf image URL:
            * Nový & .land = _ value _, kde _ value _ může být "under" (výstavní topografie) nebo "přes" (jen ukázat batymetrii) . Není-li zadáno, nastavuje se výchozí hodnota [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) n datasets.xml nebo setup.xml. Díky POST.
            * Novinka: řádky v legendě, které jsou příliš dlouhé, jsou automaticky rozděleny do více řádků. Díky POST.
        * Pro Png image URL:
            * New & .legend = _ value _, where _ value _ can be "Bottom" (výchozí) "Vypnout" nebo "Pouze". To vám umožní zahrnout legendu, vyloučit legendu, nebo získat pouze legendu. Díky Care Wilsonové.
            * Nový & .trim = _ n Pixels _ leaves a border of nPixels (např. 10) v dolní části obrázku. Aplikuje se po .legend = Off. Díky Care Wilsonové.
            * Nová & .size = _ width _ | _ výška _ umožňuje určit šířku a výšku obrázku v pixelech.
    * Nové formáty výstupních souborů:
        * .csvp a .tsv p -- jako .csv a .tsv , ale s " (_ jednotky _) "připojen ke jménům sloupců na první řádku.
        * .odvTxt -- vytvoří soubor .txt, který zjednoduší získávání dat do [Údaje o oceánu Pohled (ODV) ](https://odv.awi.de/) .
        * .esriCsv -- vytvoří soubor .csv vhodný pro import v ESRI ArcGIS . (pouze tabulky souborů údajů) Díky Jan Masonovi, Jeffovi de La Beaujardiere, a NOAA IOOS SOS Projekt.
    * Zdokonalení GUI [Akreditace](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) webové stránky. Také kategorizovat hodnoty (ostatní než instituce) Teď jsou všichni malí. Žádosti o neomezené případy jsou přijímány (přesměrováno) pro zpětnou kompatibilitu. Díky Royi Mendelssohnovi.
    * Chybové zprávy jsou nyní ještě kratší a orientovanější na uživatele. Díky Gregovi Williamsovi.
    * Vnitřní změna, která značně snižuje ERDDAP základní využití paměti.
    * Mnoho nových funkcí, které jsou relevantní pouze pro projekt POST.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** Je tu spousta změn. Promiň. Ale každý z nich přináší nějaké dobré výhody.
    * Velké změny v systému GenetateDatasetXml - nyní často klade více otázek (viz příslušný [datový soubor Typy](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) informace) a nyní vždy generuje v podstatě ready- to- use obsah pro datasets.xml . Stále jste zodpovědní za nastavení, takže byste měli stále zkontrolovat datasets.xml obsah před použitím. Lidské vložení úsilí do projektu bude vždy lepší než počítačový program. Díky projektu UAF.
    * POŽADOVANÉ: V setup.xml, musíte revidovat WMS sekce. Nyní by měla obsahovat tyto značky (ale klidně změňte hodnoty.) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * POŽADOVANÉ: V setup.xml zkopírujte a vložte tento nový návrh&lt;startHeadHtml &gt; pro nahrazení vaší staré verze. Ale klidně udělejte změny pro své preference.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Díky POST, Hans Vedo a Rick Blair.
    * POŽADOVANÉ: V setup.xml, in&lt;startBodyHtml &gt;, změnit&lt;tělo &gt; tag to be just&lt;tělo &gt;, protože styl je nyní nastavena erddap.cs.
    * POŽADOVANÉ: V setup.xml změňte na&lt;endBodyHtml &gt; (ale změnit e-mailovou adresu na vaši e-mailovou adresu a neváhejte dělat jiné změny) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * VYSOKÉ DOPORUČENO: V setup.xml, doporučený&lt;ShortDescriptionHtml &gt; je nyní
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Klidně to změňte, zejména poslední věta v prvním odstavci.
    * V setup.xml, emailEvelthingTo a emailDailDailyReport Nyní můžete komma- oddělené seznamy e-mailových adres. První e-mail Všechno Chcete-li je speciální, např., předplatné EDDXxxxxxFromErddap soubory dat použít tuto e-mailovou adresu. Díky Johnu Maurerovi.
    * Emailové chyby jsou nyní přihlášeny do \\[ bigParentDirectory \\] / logs / emailLogailLogabr -MM-DD.txt soubor.
    * V setup.xml je nový, volitelný parametr pro nastavení vlastností e-mailového účtu (obvykle hned po&lt;emailHeslo &gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Výchozí hodnota není nic. Díky Richovi Signellovi.
    * POŽADOVANÉ: Pokud používáte EDDTableCopy nebo EDDGrid Kopírovat, musíte DELETE všechny \\[ bigParentDirectory \\] / kopírovat / adresáře a soubory, které obsahují "xh" v adresáři nebo názvy souborů po zastavení starého ERDDAP™ a před zahájením nového ERDDAP™ Takže ty soubory budou překopírovány. Je mi to velmi líto, ale bylo důležité provést změnu a doufejme, že to ovlivní několik administrátorů a několik souborů.
V Linuxu můžete tyto soubory najít pomocí cd \\[ bigParentDirectory \\] / kopie
Najít.\\*xh\\*  
Ve Windows můžete tyto soubory najít s, Start | Hledat
Co chcete hledat: Dokumenty
Celý název souboru nebo jeho část: xh
Podívejte se na: Procházet - &gt; \\[ bigParentDirectory \\] / kopie
Klikněte na 'Search'
^ A vybrat všechny
Del smazat všechny
    * POŽADOVANÉ: V datasets.xml , pro soubory dat EDDTableFromDatabase, pro proměnné data a časové razítko, změnit data Od roku 1970- 01- 01T00: 00: 00Z zadejte dvojnásobek a jednotky na sekundy. Žádáme, abyste uložili data s časovým razítkem do databáze.\\*s\\*Časovou zónu. Bez informací o časové zóně, dotazy, které ERDDAP™ odešle do databáze a výsledky, které ERDDAP™ dostane z databáze přes JDBC jsou nejednoznačné a pravděpodobně se mýlí. Zkoušeli jsme to, ale nenašli jsme žádný spolehlivý způsob, jak se vypořádat s daty "timestamp without timezone". Myslíme si, že je to dobrá praxe. Koneckonců, "časové razítko bez časového pásma" data mají implicitní časové pásmo. I když je skvělé, že časové pásmo je zřejmé pro admin databáze, má smysl specifikovat ji výslovně tak, aby jiný software mohl správně komunikovat s vaší databází. Díky / promiň Michael Urzen.
    * VYSOKÉ DOPORUČENO: datasets.xml , Chcete-li povolit .subset webové stránky pro facetované vyhledávání vašich tabulkových souborů dat, musíte přidat [&lt; subsetVariables &gt;] (/ docs / server- admin / datasets # subsetproměnné) globální atributy datového souboru.
    * DOPORUČENÉ: datasets.xml , pokud máte datový soubor datasetID = "pmelGtsppp", prosím, změňte to na
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * DOPORUČENÉ: datasets.xml , Existují nové platné možnosti pro [&lt;cdm\\ _ data\\ _ type & gt;] (/ docs / server-admin / datasets # cdm _ data _ type) globální atribut, takže byste měli přezkoumat / změnit hodnotu pro soubory dat.
    * V datasets.xml , nový [&lt;sourceNeedsExpandedFP\\ _ EQ & gt;] (/ docs / server-admin / datasets # sourceneedsexpandedfp _ eq) je užitečné, pokud zdrojový server nemanipuluje s proměnnými _\\ = _ value _ tests správně (vzhledem k [obecné potíže s testováním rovnosti čísel pohyblivých bodů](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sourceNeedsExpandedFP\\ _ EQ je nastaveno na true ve výchozím nastavení (nejbezpečnější nastavení) Takže nemusíš dělat žádné změny.
    * Nový [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Díky Jerrymu Yun Panovi.
    * Nový [Soubory EDDTableFromThreddsName](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Díky Royi Mendelssohnovi.
    * Změny [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) umožňuje použití s širší škálou souborů.
    * EDDTableFromBMDE byl vyřazen. Již neexistují žádné aktivní, vhodné zdroje údajů.
    * V GenetateDatasetXml, nový EDDGrid FromThredds Katalog sklízí celý katalog HITDDS (nebo podmnožinu) a generuje datasets.xml obsah. Díky projektu UAF.
    * GeneteDatasets Xml a DasDds nyní také dát své výsledky v \\[ bigParentDirectory \\] / logs / log.txt Díky Richovi Signellovi a Charlesovi Carletonovi.
    * Mnoho vylepšení přihlašovacího systému. Díky POST.
*    **Věci ERDDAP™ Programátoři Musím vědět a udělat:** 
    * V adresáři / WEB-INF / lib / došlo ke změnám. Změňte prosím nastavení javac a java classpath.
    * Je tu nový \\[ Vaše Url \\] / erddap / verze služby pro určení verze ERDDAP . Reakce je text, např., ERDDAP \\ _ version = 1.24 Pokud dostanete HTTP 404 Not- Nalezeno chybové zprávy, léčit ERDDAP™ jako verze 1.22 nebo nižší. Díky POST.
*    **Malé změny a chyby:** 
    
    * EDDTableFrom Sos změny:
        * Upustila podpora pro čtení IOOS SOS XML odpovědi.
        * Přidána podpora pro čtení IOOS SOS text / csv. (Takže NOS SOS servery nejsou momentálně podporovány.) 
        * Udělal spoustu změn souvisejících s IOOS SOS detaily serveru.
        * Přidaná podpora pro dotazy BOX pro IOOS SOS a OOSTethys   SOS servery. Tyto změny vedou k velké rychlosti pro příslušné požadavky na údaje. Díky IOOS SOS .
    * Text v .mat Tabulkové datové soubory jsou nyní správně uloženy. Díky Royi Mendelssohnovi.
    *    WMS 
        *    OpenLayers je nyní svázaný s ERDDAP™ pro použití WMS webové stránky. To řeší problém způsobený OpenLayers před několika měsíci se změnil a zabraňuje budoucím problémům.
        * Ve WMS   GetCapabilities odpověď,&lt;OnlineResource &gt; hodnota je nyní URL WMS Servis. Díky Charltonu Galvarinovi.
        * Legenda se zobrazí na WMS webová stránka pro zobrazení barevného panelu. Díky Emiliovi Mayorgovi.
    *    EDDGrid Konstruktor Aggregates ExistingDimension měl problémy, pokud zdroj osy Hodnoty se nerovnaly jejich cíli. Hodnoty, např., pokud zdroj čas byl něco jiného než "seconds since 1970-01-01" . Díky Todd Spindler.
    * In TableWriterGeoJson, the overface ',' after bbox \\[ ... \\] byla odstraněna. Díky Gregovi Williamsovi.
    * Mnoho malých změn a oprav chyb.
    
## Verze 1.22{#version-122} 
 (propuštěn 2009-07-05) 

* Chyba SlideSorter zavedená v 1.20 je opravena.
* Chyba OBIS zavedená v 1.20 je opravena.
* Odkazy na Jasonovy datové soubory na stránce obrázky / gadgets / GoogleGadgets byly odstraněny.
     
## Verze 1.20{#version-120} 
 (propuštěn 2009- 07- 02) 

*    ERDDAP™ administrátoři, prosím přidejte toto do souboru setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nové typy datových souborů [ EDDGrid Kopírovat](/docs/server-admin/datasets#eddgridcopy) a [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) vytvořit a udržovat místní kopii jiného EDDGrid nebo data EDDTable datového souboru a slouží data z lokální kopie. Tyto jsou velmi snadné a velmi účinné **řešení některých největších problémů s obsluhou dat ze vzdálených zdrojů dat:** 
    
    * Přístup k datům ze vzdáleného zdroje dat může být pomalý (z různých důvodů) .
    * Vzdálený datový soubor je někdy nedostupný (opět, z různých důvodů) .
    * Spoléhání na jeden zdroj pro data není měřítko dobře (např., když mnoho uživatelů a mnoho ERDDAP s použití) .
    
Navíc, místní kopie je záloha originálu, což je užitečné v případě, že se něco stane originálu.
    
Na vytváření místní kopie datového souboru není nic nového. Co je tu nového je, že tyto třídy to dělají\\*snadné\\*vytvořit a\\*udržovat\\*místní kopie dat z\\*odrůda\\*typu vzdálených zdrojů dat a\\*přidat metadata\\*při kopírování dat.
    
Tyto typy datových souborů jsou součástí kompletního souboru prvků, které zjednodušují tvorbu [mřížky / klastry / federace ERDDAP s](/docs/server-admin/scaling) zvládat velmi těžká zatížení (např. v datovém centru) .
    
* Nový typ datového souboru [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) získává data z místní nebo vzdálené tabulky databáze.
*    ERDDAP™ Teď má [bezpečnost](/docs/server-admin/additional-information#security) systém, který podporuje autentizaci (umožňuje uživatelům přihlásit se) a povolení (poskytování přístupu k určitým soukromým datovým systémům) .
* Jsou. [dva, nové, velitelské nástroje](/docs/server-admin/datasets#tools) pomoci ERDDAP™ administrátoři generují XML pro nový datový soubor v datasets.xml :
    * GeneteDatasets Xml může generovat hrubý návrh souboru dat XML pro téměř jakýkoli typ souborů dat.
    * DasDds vám pomáhá opakovaně testovat a vylepšovat XML pro datový soubor. ERDDAP GeneteDatasety Byly odstraněny webové stránky Xml. Z bezpečnostních důvodů podporovali pouze několik typů datových souborů. Nové příkazové řádky jsou lepším řešením.
* Nový [stavová stránka](/docs/server-admin/additional-information#status-page) Nech někoho (ale zejména správci) zobrazit stav ERDDAP™ z jakéhokoliv prohlížeče jít do \\[ baseurl \\]  /erddap/status.html .
* Tabledap nyní podporuje [serverboard funkce](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * & odlišné () odstraňuje duplicitní řádky z tabulky odezvy,
    * & orderBy  (...) umožňuje určit, jak by měla být tabulka odezvy tříděna,
    * & orderByMax  (...) umožňuje určit, jak by měla být tabulka odpovědí roztříděna a odstraní všechny řádky s výjimkou řádků s maximálními hodnotami v posledním zadaném sloupci. To lze použít například k získání posledních dostupných dat pro každou stanici.
* Tabulární soubory dat mohou nyní obsahovat další proměnné dateTime, které nejsou pojmenovány "time" . Tyto proměnné jsou uznávány jejich metadaty "jednotek", které musí obsahovat " since "   (pro číselné datum Časy) nebo "rr" nebo "rr" (pro formátované String dateTimes) . Ale prosím, stále použijte destinationName   "time" pro hlavní datum Časová proměnná.
*    ERDDAP™ Nyní generuje [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) soubor, který říká vyhledávačům, že ERDDAP Stačí se plazit každý měsíc. ERDDAP™ Administrátoři, prosím následujte [Tyto pokyny](/docs/server-admin/additional-information#sitemapxml) informovat vyhledávače o novém souboru sitemap.xml.
*    ERDDAP Chybové zprávy jsou nyní mnohem kratší a orientované na klienty (neprogramátoři) . Díky Gregovi Williamsovi.
* [&lt;requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) Nyní také podporuje IP adresy, kde bylo poslední číslo nahrazeno\\ *.
* Žádosti .json a .geoJson soubory mohou nyní obsahovat volitelné [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) požadavek přidáním "& .json p = _ functionName _ "až do konce dotazu. V podstatě to jen říká, ERDDAP™ přidat "_ functionName _ ("na začátek reakce a") "až do konce odpovědi. Pokud původně nebyl žádný dotaz, nechte" & "ve svém dotazu. Díky Gregovi Williamsovi.
* Mnoho nových statistik bylo přidáno do [Denní zpráva](/docs/server-admin/additional-information#daily-report) .
* Na webových stránkách se seznamy datových souborů, instituce a ID jsou nyní na pravé straně. To posune předplatné a další užitečné sloupce do pohledu na úzkých počítačových obrazovek.
* Na všech webových stránkách, název stránky (na základě&lt;název &gt; v&lt;startHeadHtml &gt; který definujete v setup.xml) je upraven tak, aby obsahoval lepší popis webové stránky (například zahrnutím názvu a instituce stávajícího souboru údajů) .
* Informace Xmx jsou nyní zahrnuty v paměťových informacích vytištěných v log.txt, Daily Report a na status.html. Díky Ellyn Montgomeryové.
*    ERDDAP™ má dodatečnou, všeobecnou ochranu proti všem chybám (Např., Chyba v paměti) . Díky Charlesovi Carletonovi.
* Zlepšení řešení chyb v případě, že odpověď již byla přijata.
* ZLEPŠENO: EDDTableFromFiles a EDDGrid FromFiles nyní stačí povolit&lt;metadataFrom &gt; první nebo poslední. Předposlední verze již není podporována. A první a poslední jsou nyní založeny na posledním ModifiedTime.
* Oprava chyb: v EDDTableFrom SOS , neplatné informace pro jednu stanici hodil výjimku a způsobil, že celý datový soubor byl zamítnut. Tyhle stanice jsou ignorovány. (a chybová zpráva je přihlášena do log.txt) . Díky Rickovi Blairovi.
     

## Verze 1.18{#version-118} 
 (propuštěn 2009-04-08) 

* Oprava chyb: Od 1.14, EDDTable Data Access Form a Make A Graph webové stránky se řádně vypořádat s citovanými omezeními.
* Oprava chyb: Start v 1.14, EDDTableFromDapSequence nezvládal správně časová omezení, pokud zdrojové časové jednotky nebyly "sekundy od roku 1970- 01- 01T00: 00".
     

## Verze 1.16{#version-116} 
 (propuštěn 2009- 03- 26) 

*    ERDDAP™ administrátoři:
    * Toto je důležité uvolnění, protože opravuje chybu, která zanechala ERDDAP™ závity běží, pokud jste použili Tomcat Manager zastavit / Start nebo obnovit ERDDAP . Takže když nainstalujete 1.16, nepoužívejte jen Tomcat manažera k uvolnění staré ERDDAP™ a nasadit nové ERDDAP . Místo toho: **rozložit staré ERDDAP™ , restartovat Tomcat (nebo server) , pak nasadit nové ERDDAP .** Vždy je dobrý nápad to udělat při instalaci nové verze.
    * Prosím přidejte [&lt;requestBlacklist &gt;&lt;/ requestBlacklist &gt;] (/ docs / server- admin / datasets # requestblacklist) na vaši datasets.xml . To lze použít k určení seznamu IP adres klienta, které mají být blokovány (např., odrazit odmítnutí servisního útoku nebo příliš horlivý web robot) .
* Teď je tu \\[ bigParentDirectory \\] / Logs adresář držet ERDDAP™ Záznamy. When you start ERDDAP™ , to dělá archivní kopii log.txt a log. txt.předchozí soubory s časovým razítkem. Pokud byly problémy před restartem, může být užitečné analyzovat tyto soubory.
*    ERD s ERDDAP™ Nyní je zapnutý předplatný systém.
*    ERDDAP™ opět umožňuje (ale stále nedoporučuje) kódování URL "% 26" v požadavku (viz [související v1.14 změna](#percent26) ) .
* Několik nových přírůstků do části Tally [Denní zpráva](/docs/server-admin/additional-information#daily-report) .
* Malé opravy chyb v generateDatasetsXml.
* Pár malých oprav chyb.
     

## Verze 1.14{#version-114} 
 (propuštěn 2009- 03- 17) 

* Změny pro uživatele:
    * v žádostech o údaje o síti, ERDDAP™ nyní podporuje: [last- n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) kde n je celé číslo indexů a [ (last- d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) kde d je číselná hodnota (čas, to je v sekundách) .
    * V tabulkových požadavcích na data, String omezení nyní vyžadují [dvojité kotace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) kolem hodnoty, například, & id = "NDBC40121" To vyžaduje DAP Protokol.
    * V požadavcích na údaje v tabulkách, ERDDAP™ Nyní vyžaduje, aby [všechna omezení jsou řádně zakódována v procentech](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Prohlížeče to dělají automaticky, takže to má většinou vliv na počítačové programy / skripty, které jsou přístupné ERDDAP .
#### POKYNY{#percent26} 
*    [V minulých dílech...](#percent26) s [vložil webovou stránku grafu](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) a [ ERDDAP™ Google Gadget webové stránky](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) řekl nahradit URL "&" na obrázku "% 26". Od této chvíle, byste měli nahradit "&" v URL obrázku "& amp;". Takže musíte nahradit jakékoliv "% 26" na stávajících webových stránkách a Google Gadgets "& amp;". (Promiň.) 
*    ERDDAP™ Administrátoři, prosím:
    * Přidat do svého [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (a změnit vlajku Hodnota klíče) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Na řádku po&lt;emailUserName &gt; ve Vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor, přidat
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
a zadejte své skutečné heslo.
    * Můžeš se změnit.&lt;wmSSampleBBox &gt; ve Vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor obsahující hodnoty délky do 360, např.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Ve vaší datasets.xml soubor, přejmenovat datový soubor typu EDDTableFromNc4DFiles na EDDTableFromNcFiles (který nyní podporuje soubory s libovolným počtem rozměrů) . Pokud máte soubor EDDTableFromNc4DFiles:
        
        1. Musíte změnit na typ = "EDDTableFromNcFiles" ve svých souborech dat. XML soubor.
        2. Musíte přidat&lt;nRozměry &gt; 4&lt;/ nDimensions &gt; tag na XML datového souboru.
        3. Můžete přidat nový&lt;sortFilesBySourceName &gt; tag pro určení vnitřního pořadí souborů, který určuje celkové pořadí vrácených dat.
        
Podrobnosti viz [EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles) .
    * V minulosti, pro EDDTableFromDapSequence, pro OPeNDAP servery DRDS, in datasets.xml , použili jsme&lt;sourceCanConstrainStringsRegex &gt; ~ =&lt;/ sourceCanConstrainStringRegex &gt;. Ale nyní vidíme, že podpora DRDS regex je omezenější než ERDDAP Je, takže doporučujeme&lt;sourceCanConstrainStringsRegex &gt;&lt;/ sourceCanConstrainStringRegix &gt; tak, že regex omezení nejsou předány na zdroj, ale jsou místo toho zpracovávány ERDDAP .
    * Revamped manipulace sourceCanConkmen... n datasets.xml podle [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) a (vnitřní) všechny typy datových souborů EDDTable. Nový systém je jednodušší a lépe odráží variabilitu různých zdrojů dat. Možná budete muset upravit XML pro vaše soubory dat v datasets.xml .
* Existuje několik nových funkcí, které jsou užitečné samy o sobě, ale při kombinaci, také usnadnit vytvoření [mřížky / klastry / federace ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Nové typy datových souborů:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) a [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) který nechal jeden ERDDAP™ obsahovat datový soubor od jiného ERDDAP™ velmi jednoduchým a velmi účinným způsobem.
        *    [ EDDGrid FromFiles](/docs/server-admin/datasets#eddgridfromfiles)   (a podtřídy, [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) které mohou číst NetCDF   .nc , GRIB .grb a HDF   .hdf soubory) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) které mohou číst NetCDF   .nc které mají strukturu podobnou stolu.
    * RunLoadDatasets a LoadDatasets byly přepracovány tak, aby ERDDAP™ je velmi citlivý na reloading souborů na základě [vlajka](/docs/server-admin/additional-information#flag) adresář (často&lt;5 sekund v případě, že hlavní načítání Datasets je v současné době provedeno).
    * Nová služba umožňující [URL pro vytvoření souboru vlajky](/docs/server-admin/additional-information#set-dataset-flag) pro daný soubor dat, např.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
vytvoří soubor vlajky v adresáři vlajky pro rPmelTao (i když vlajka Klíč tady je špatný.) .
    * Nový [předplatné](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) služba tak, aby každý klient mohl určit akci, která bude provedena při vytvoření konkrétního datového souboru (kdy ERDDAP™ je znovu spuštěn) a kdykoli se datový soubor nějakým způsobem změní. Tento systém lze vypnout pomocí&lt;Předplatné SystemActive &gt; ve Vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) Složka. U ERDDAP™   [Denní zpráva](/docs/server-admin/additional-information#daily-report) nyní uvádí všechny předplatné a obsahuje URL potřebné ke zrušení každé z nich, v případě, že máte pocit, že systém je zneužíván. V datasets.xml , tam je nový, volitelný [&lt;předplatné EmailBlacklist &gt;] (/ docs / server-admin / datasets # subscriptionailblacklist) tag tak, aby administrátoři mohli zadat comma- oddělený seznam e-mailových adres, které jsou okamžitě černé listině ze systému předplatného.
    * Nové [&lt;onChange &gt;] (/ docs / server- admin / soubory dat # onchange) atribut in datasets.xml umožňuje ERDDAP™ administrátor specifikuje akci, která bude provedena při vytvoření konkrétního datového souboru (kdy ERDDAP™ je znovu spuštěn) a kdykoli se datový soubor nějakým způsobem změní.
    * Zlepšení plného hledání textu: uložení vyhledávacího řetězce pro každý datový soubor nyní používá 1 / 2 paměti. Vyhledávací algoritmus (Chlapec - Moore- jako) Teď je 3X rychlejší.
    * E-maily od ERDDAP™ nyní vždy prepend předmět a obsah s \\[ erddap Url \\] aby bylo jasné, který ERDDAP™ Tohle přišlo od (v případě, že podáváte více ERDDAP s) .
    * Rozsáhlejší statistika pro [Denní zpráva](/docs/server-admin/additional-information#daily-report) E-mail.
    * Nový soubor záznamu \\[ bigParentDirectory \\] / emailLogYEAR- MM- DD.txt zaznamenává všechny e-maily odeslané ERDDAP™ Každý den. To je obzvláště užitečné, pokud váš server nemůže skutečně posílat e-maily - můžete si je alespoň přečíst v záznamu.
    *    ERDDAP™ Teď dělá \\[ bigParentDirectory \\] / cache / ( datasetID ) adresář pro každý datový soubor, protože může být mnoho souborů cached.
* Nový [ RSS 2. 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) krmivo pro každý datový soubor (Hledejte oranžovou. RSS ikony na seznamech datových souborů, formulářů pro přístup k datům, a vytvořit graf webové stránky) .
*    EDDGrid   .kml odpovědi nyní používají dlaždicové obrázky ("superoverlays" -- dynamicky generované obrázky kvadtree) . Počáteční obraz se nahrává do GoogleEarth mnohem rychleji než předtím. Rozlišení mapy se zvyšuje, jak se přiblížíte, až do úplného rozlišení datového souboru. Doporučit: uživatelé by měli požádat .kml pro jeden časový bod, ale datový soubor je celá délka, zeměpisná šířka. Bohužel byla odstraněna podpora časového rozmezí (Doufám, že se vrátí.) .
*    ERDDAP™ Nyní přidává [Expires and Cache- Control max- age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) do všech souborů požadovaných z adresáře / obrázků. To výrazně snižuje počet statických žádostí o soubory zaslaných na ERDDAP a tak výrazně zrychluje nejvíce ERDDAP™ Page loads. Také, mnoho Java Odkazy na skriptové soubory přesunuty na spodní část svých HTML stránek, což také urychluje mnoho ERDDAP™ Page loads. Díky knize "High Performance Web Sites" by Steve Souders a ySlow doplněk k plugin FireBug v FireFox.
*    ERDDAP™ přepnuto z netcdf-java 2.2.22 na netcdf-java 4.0. Mimo jiné to umožňuje EDDGrid FromNcFiles ke čtení HDF   .hdf , stejně jako GRIB .grb a NetCDF   .nc složky.
*    EDDGrid FromDap a EDDGrid FromNcFiles nyní také podporují DArray (stejně jako DGRID)   dataVariable "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a. Pokud rozměr nemá odpovídající souřadnicovou proměnnou, ERDDAP™ vytvoří osovou proměnnou s hodnotami indexu (např. 0, 1, 2,..., 311, 312) . Takže všechny ostatní aspekty EDDGrid zůstávají stejné:
\\ * Stále slouží všem datovým setům jako Grids, s osovou proměnnou pro každý rozměr.
\\ * Dotazy mohou stále požadovat hodnoty z proměnných osy.
Díky Charlesovi Carletonovi, Thomasovi Im, Dorianu Raymerovi a dalším.
* U WMS   OpenLayers Stránky nyní mají výchozí délku, zeměpisnou šířku, která je trochu větší než rozsah datového souboru (není přesný rozsah, takže kontext malých souborů dat je jasnější) . Výchozí rozsah může být nyní 0 až 360, což umožňuje, aby byl nyní zobrazen celý rozsah mnoha souborů dat. Díky Todd Spindler.
* Nové posuvníky na některých formulářích pro přístup k datům a vytvořit graf webové stránky. Zjednodušují (surový) specifikace požadovaných dat a nabízejí dobrou vizuální zpětnou vazbu.
* Nová volba pro&lt;Datový soubor &gt; štítky v datasets.xml : [aktivní = "false"](/docs/server-admin/datasets#active) .
* Odkazy na ERD s ERDDAP™ Změna z coast watch.pfel (funguje i přes proxy) na pobřeží. (preferované) .
* Nová podpora pro [ data\\_min a data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) atributy proměnných metadat.
* Částečný roztok [WaitThenTryAgain / Partial Results Exception](/docs/server-admin/additional-information#waitthentryagain-exception) : Některé požadavky, které předtím selhaly, když byla zjištěna změna zdroje dat, budou úspěšné, protože ERDDAP™ reload dataset a re- request data automaticky, vše v kontextu původního požadavku.
* Oprava chyb: generovat Datové soubory Xml byl deaktivován ERDDAP™ verze 1.12. Díky Ellyn Montgomeryové, že na to poukázala.
* Malé změny v manipulaci s chybami.
* Mnoho zlepšení, aby se zabránilo / vypořádat se s možnými podmínkami závodu (Tj. možné problémy vyplývající z multizávitové povahy ERDDAP ) které způsobily malé, vzácné problémy.
* Nyní, pokud je na obrázku zapsána chybová zpráva, zůstane obraz v úschově pouze ~ 5-10 minut (ne 60) . Díky Care Wilsonové.
* Standardní zpráva, když nejsou žádná data, je nyní "Váš dotaz nevytvořil žádné odpovídající výsledky.", který je kratší, přesnější a odpovídá OPeNDAP servery.
*    EDDGrid již neumožňuje vázat hodnoty osy.
* Malé změny požadavků .ver a .help.
* Mnoho malých změn a oprav chyb.
     

## Verze 1.12{#version-112} 
 (propuštěn 2008- 10- 31) 

* EDDTableFrom SOS opět pracuje s NDBC SOS a pracuje s novým NOS SOS .
* EDDTableFromBMDE nyní vyžaduje ERDDAP™ admin pro upřesnění dataVariable "Technologie" ve smyslu všeobecné poznámky k technologii pro "vývoj" nebo "výrobu" zařízení uvedených v položkách 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.2., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.3., 3A001.a.2., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.a.2., 3A001.b., 3A001.a.2., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 3A001.b., 6A001.b., 6A002.a.2., d., d. a.
*    EDDGrid již nevyžaduje rovnoměrné rozestupy. transparentní Png nebo .kml . Díky Todd Spindler.
* Pár drobných změn.
     

## Verze 1.10{#version-110} 
 (propuštěn 2008- 10- 14) 

* Nová metadata "colorBar" pro datové proměnné v datasets.xml definuje výchozí nastavení barevného panelu pro grafy a mapy. Viz [více informací](/docs/server-admin/datasets#color-bar-attributes) . To je důležité proto, že výrazně zlepšuje vzhled výchozích grafů a map vytvořených Make A Graph a protože výchozí grafy a mapy mají nyní konzistentní barevnou lištu, i když klient mění požadovaný čas nebo zeměpisný rozsah. Také to bylo nezbytné pro WMS .
*    ERDDAP™ nyní slouží většina dat mřížky přes WMS Servis. To je důležité, protože ukazuje, že kromě získávání dat z mnoha typů datových serverů, ERDDAP™ umí distribuovat data pomocí různých protokolů ( DAP , WMS ,... více v budoucnosti) . Viz [dokumentace klienta](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Nebo [dokumentace pro správce](/docs/server-admin/datasets#wms) . nebo [Vyzkoušej to.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Nová podpora hodnot délky &gt; 180 v .kml složky.
* Nový cdm\\ _ data\\ _ type: Ostatní.
*    ERDDAP™ nyní podporuje "boolean" zdroj dataType. Viz [více informací](/docs/server-admin/datasets#boolean-data) To bude užitečné pro budoucí EDDTableFromDatabase.
* Nová EDDTableFromBMDE podporuje zdroje dat DiGIR / BMDE.
* EDVGridaxis nyní umožňuje sestupné tříděné hodnoty. PmelOscarovy soubory dat tohle potřebovaly.
*    ERDDAP™ nyní vrací HTTP chyby (např. "404 pro zdroj / stránku nenalezen") ve více situacích místo HTML stránek s chybovými zprávami.
* Mnoho změn / doplnění na ERDDAP™ dokumentaci.
* Hodně drobných změn.
* Nějaké opravy chyb.
*    **Věci ERDDAP™ Administrátoři by měli udělat upgrade na tuto verzi:** 
    * V datasets.xml , pro všechny EDDTableFrom SOS Datové soubory, změna "observedProperty" metadata na "sourceObservedProperty".
    * Pravidla pro axisVariable nebo dataVariable s destinationName jsou nyní [přísnější](/docs/server-admin/datasets#datavariable-addattributes) . Musíte zkontrolovat, zda jsou vaše variabilní jména platná. Buď je ručně zkontrolujte, nebo utečte. ERDDAP™ a podívejte se na chybové zprávy ve zprávě, která je emailem administrátorovi.
    * V datasets.xml , pokud chcete, aby byla datová proměnná mřížky přístupná prostřednictvím WMS , musíte přidat colorBar metadata. Alespoň, například,&lt;att name = " colorBarMinimum "type =" double "&gt; 0&lt;/ att &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Viz [více informací](/docs/server-admin/datasets#wms) .
    * Přidat do svého [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (ale přizpůsobit s vašimi informacemi) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Verze 1.08{#version-108} 
 (propuštěn 2008- 07- 13) 

* Nová webová služba v ERDDAP™ , generovat Datové soubory Xml, asistence ERDDAP™ administrátoři vytvořením hrubého návrhu XML potřebné k popisu datového souboru datasets.xml 
* Některé změny / opravy chyb související s tím, že Griddap může být viděn netcdf-java jako opendap server, včetně: globální metadata jsou nyní označeny "NC\\ _ GLOBAL" (místo GLOBAL) .
* U EDDGrid a EDDTable Data Access Forms nyní využívají informace o dotazech v URL. Takže například, pokud uživatel přechází z formuláře Make A Graph do formuláře pro přístup k datům, omezení jsou nyní správně přenášena.
*    tabledap Graf Make A nyní umožňuje omezení na proměnné String.
* EDDTable 's Make A Graph nyní umožňuje NaN omezení. Díky Stevu Hankinovi.
* Oprava chyb: Uložit EDDTable AsImage nerozpoznal správně hodnoty .colorbar min a max. Díky Stevu Hankinovi.
* Mnoho vylepšení setupDatasetsXml. Díky Ellyn Montgomeryové.
* Žádosti Griddapu nyní povolit () -styl požaduje mírně mimo skutečný rozsah osy. To je vhodné od () -hodnoty jsou zaokrouhleny na nejbližší skutečnou hodnotu. Díky Cindy Besseyové.
* Udělal jsem test na plachtění a DoubleArray, který je sofistikovanější. Vždycky to bude nedokonalé. (protože test by musel být přizpůsoben pro každý datový soubor) Ale mělo by to být lepší. Díky Ellyn Montgomeryové.
* Přesunul jsem setup.html a setupDatasets Xml.html erddap 's / download adresář a pevně kódované všechny odkazy na ně. Nyní mohu provést změny a okamžitě aktualizovat informace o nastavení.
* Mnoho malých změn. Pár malých oprav chyb.
*    **Věci ERDDAP™ Administrátoři by měli udělat upgrade na tuto verzi:** 
    * Pohyb.&lt;Popis zkratky Html &gt; z Vašich zpráv. [setup.xml](/docs/server-admin/deploy-install#setupxml) Složka. Udává text, který se objeví uprostřed levé strany ERDDAP™ Úvodní stránka. Také přidejte&lt;h1 &gt; ERDDAP &lt;/ h1 &gt; (nebo nějaký jiný titulek) na vrchol. **Nebo** kopírování&lt;ShortDescriptionHtml &gt; v novém [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (z nového erddapContent .zip ) Do vašeho setup.xml.
         

## Verze 1.06{#version-106} 
 (propuštěn 2008-06-20) 

* Nová podpora pro IOOS DIF SOS zdroje údajů.
* Mnoho malých změn. Pár malých oprav chyb.
     

## Verze 1.04{#version-104} 
 (propuštěn 2008-06-10) 

* Nová funkce Slide Sorter.
* Nová stránka a příklady Google Gadgets.
* Oprava chyb EDDGrid .saveAsNc pro proměnnou s měřítkem a addOffset.
     

## Verze 1.02{#version-102} 
 (propuštěn 2008- 05- 26) 

* Nový EDDGrid SideBySide umožňuje různé axisVariable s \\[ 0 \\] zdroj Hodnoty.
* Všechny proudy a větrné datové soubory byly sloučeny do EDDGrid Datové soubory SideBySide.
* Obrázky z požadavků na obrázky jsou nyní 1 hodinu v pouzdře.
     

## Verze 1.00{#version-100} 
 (propuštěn 2008-05-06) 

* Vytvořit Graf webové stránky a grafické příkazy v URL.
* Podpora pro soubory s vlajkou pro vynucení překládání datového souboru.
* Nový typ datového souboru: EDDTableFrom4DFiles (první podtřída EDDTableFromFiles) .
