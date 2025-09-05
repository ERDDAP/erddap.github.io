---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Změny

 ERDDAP™ je skvělý příklad [Uživatelská inovace](https://en.wikipedia.org/wiki/User_innovation) , kde inovace produktů často pocházejí od spotřebitelů ( ERDDAP™ uživatelé) , nejen výrobci ( ERDDAP™ Vývojáři) . V průběhu let, většina myšlenek na nové funkce a změny v ERDDAP™ pocházejí od uživatelů. Tito uživatelé jsou připsány níže za své skvělé nápady. Díky&#33; Prosím, pokračuj s těmi velkými návrhy&#33;

Zde jsou změny spojené s každým ERDDAP™ Uvolnit.

## Verze 2.28.1{#version-2281} 
 (propuštěn 2025-09-05) 

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Podpora přidána pro X-Forward-Prefix. To je obzvláště zajímavé pro administrátory, kteří provozují servery na podpatku. Přečtěte si prosím naši aktualizovanou dokumentaci [Apač](/docs/server-admin/deploy-install#apache) a [Nginx](/docs/server-admin/deploy-install#nginx) pro více informací.

Díky [@srstsavage](https://github.com/srstsavage) 

## Verze 2.28.0{#version-2280} 
 (propuštěn 2025-08-29) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    [schéma Croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) je nyní k dispozici. Admins mohou kontrolovat, zda výchozí metadata používají Croissant, ale počínaje 2.28.0 můžete požádat o definici Croissant pro nový typ exportního souboru ".croissant" (který poskytuje soubor jsonld) .

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * New Docker Obrázek vytvořený na každé sloučené žádosti o tah. Jsou to alfa stavby, nejsou to verze. Budou mít značku jako "20250814T034025," což naznačuje, kdy byla postavena. Chcete-li vyzkoušet nejnovější funkce, můžete použít tyto. Pokud chcete něco stabilnějšího, použijte naše verze se sémantickou verzí. (např. 2.28.0) . Vždycky chceme, aby se Alfa uvolnila, ale je pro ně méně testů než naše verze. Vždy doporučujeme použít něco alespoň tak nového, jako je naše "poslední" vydání, které bude nejnovější sémantická verze verze vydání.

    * Docker Obrázky nyní k dispozici na [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) kromě [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Díky [@ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [@srstsavage](https://github.com/srstsavage) a [MathewBiddle](https://github.com/MathewBiddle) na jejich příspěvky kolem Docker Images. To zahrnovalo první příspěvky od všech kromě @ststsavage&#33;
    
    * Nyní existuje podpora pro generování [schéma Croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) Složky. Je zapnutá ve výchozím nastavení. Můžete zakázat Croissant schéma ve vašem nastavení.xml s (NENÍ DOPORUČEN- Pokud to potřebujete udělat, kontaktujte prosím GitHuba nebo vyplňte soubor.) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Některá nastavení byla změněna. použijte hlavičkyForUrl a použijteEddReflection nyní obě výchozí na true. Pokud způsobí problém a vy je musíte nastavit na falešnou, prosím, vytvořte problém. Záměrem je odstranit je v příštím vydání.

    * Některá nastavení byla odstraněna. useSharedWatchService a přesměrováníDokumentace ToGitHublo byl nastaven na true ve výchozím nastavení pro více verzí a byl velmi dobře testován v tomto bodě. Odstraňování těchhle je povoleno pro vyčištění kódu.

    * Některé malé změny, opravy chyb a optimalizace.

*    **Pro ERDDAP™ Vývojáři:** 
    * Spousta mrtvých kódů odstraněna. Mnoho varování bylo spraveno.

## Verze 2.27.0{#version-2270} 
 (propuštěno 2025-06-11) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Nová data do převodníku barev na serverech na /erddap/convert/color.html

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Výchozím behavoirem je, že cache bude nyní vymazána nezávisle na úkolu hlavního souboru souborů zatížení. To umožní spolehlivější a pravidelné čištění starých cache souborů. Je zde další práce na vylepšení serveru behavoir, když je málo na diskovém prostoru (vrácení chyby pro žádosti, které mohou způsobit, že server vyprší z místa, a vyčištění cache častěji za nízkých okolností disku, aby se pokusil zabránit chybám) . In datasets.xml   (nebo nastavení.xml) můžete přidat/nastavit novou cache Parametr ClearMinutes pro kontrolu toho, jak často server kontroluje pro odstranění cache. Poznámka: stávající parametr cacheMinutes řídí věk souborů, které mají být uchovávány, novou cache ClearMinutes je pro to, jak často dělat Chache jasné.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Můžete zakázat nové cache jasné kontroly nastavením úkoluCacheClear na false v setup.xml, i když to se nedoporučuje.
cache ClearMinutes je také v [Dokumentace datových souborů](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Podpora lokalizovaných dat. Podporuje lokalizaci hodnot v addAttributes sekce. Jednoduše přidejte atribut s dalším xml:lang tag. Například přidat francouzský titul do souboru vaše addAttributes oddíl zahrnuje:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Další podrobnosti jsou k dispozici v [lokalizovaná dokumentace metadat](/docs/server-admin/localized-metadata) .

    * New Docker Složte soubor s možnostmi pro SSL a server pro barebony Prometheus. Díky Shane St. Savage za SSL a Jiahui Hu za Prometheus.

    * Podpora používání informací v hlavičkách k určení URL serveru namísto spoléhání na konfigurační soubor. To umožní přístup k serveru více jmény a může zjednodušit některé konfigurace. Prosím, povolte to a pošlete zpětnou vazbu.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Některé malé změny, opravy chyb a optimalizace.

*    **Pro ERDDAP™ Vývojáři:** 
    * Refaktor k tomu, jak jsou typy výstupních souborů definovány v kódu. To by mělo učinit tak, aby typy souborů mohou být přidány, aniž by bylo nutné se dotknout mnoha kódových míst.

## Verze 2.26{#version-226} 
 (propuštěno 2025-03-31) 

*    **Pro všechny:** 
    * Velká aktualizace naší dokumentace:https://erddap.github.io/
Kromě aktualizovaného vzhledu je lepší navigace, vyhledávání, překlad, a to by mělo být jednodušší udržet v pokroku&#33;

*    **Nové funkce a změny (pro uživatele) :** 
    * Předplatné a RSS aktualizace by se měly odehrávat spolehlivěji u souborů, které se často aktualizují ze změn souborů.

*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Výchozí uvolnění vyžaduje/podporuje Java verze 21. Zpět v této verzi je schopen snadno vytvořit Java 17 kompatibilní binární.

    * Nová funkce pro přizpůsobení informací o datových souborech v UI. Očekáváme, že to bude obzvlášť užitečné, když přidáme věci jako citace souborů dat. Další podrobnosti si můžete přečíst [nová dokumentace](/docs/server-admin/display-info) . Díky Ayush Singh za příspěvek&#33;

    * Další Prometheovy metriky. Největší z nich je: http _request_duration_sekundy [65], které zahrnují časy odezvy na žádost v členění podle: "request_type," "dataset_id," "dataset_type," "file_type," "lang_code," "status_code"
Tento stroj čitelný formát umožní lepší sběr metrik pochopit, jak uživatelé používají server.

    * Nový způsob generování souborů ISO19115 XML. Používá Apache SIS a je novou volbou v tomto vydání. Prosím, povolte to a pošlete zpětnou vazbu.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI nyní vytvoří individuální odkazy pro každou urlu v polích jako infoUrl a shrnutí.

    * Předplatné a RSS aktualizace by se měly odehrávat spolehlivěji u souborů, které se často aktualizují ze změn souborů. Pokud to způsobuje problémy, prosím, oslovte GitHub a zakázat funkčnost přidáním níže uvedené vlajky do nastavení.xml.
NEDOPORUČENÉ
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subsetové proměnné již nebudou automaticky generovány pro datový typ EDDTableFromNcCFFiles. Pokud jste se spoléhal na chování, můžete buď (preferovaný roztok) přidat subsetVariables k definici datového souboru ve vašem datasets.xml , nebo přidat níže uvedenou vlajku do nastavení.xml. Pokud máte pocit, že je třeba to zapnout, prosím oslovte GitHub, abychom mohli lépe podpořit vaše použití pouzdro vpřed.
NEDOPORUČENÉ
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Server nyní přesměruje požadavky na dokumentaci (v rámci stažení / což je dokumentace, která byla migrována) na nové místo dokumentace. V případě potřeby to můžete vypnout s vlajkou v setup.xml:
NEDOPORUČENÉ
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Některé malé změny a opravy chyb.

*    **Pro ERDDAP™ Vývojáři:** 
    * Více vylepšení kvality kódu a vyčištění mrtvého kódu. Jedná se o drobné optimalizace, lepší manipulaci s ucpanými zdroji a migraci od zastaralých datových typů (jako Vektor) .

    * Velkou refaktoring na ED Static vytáhnout většinu z konfigu, zprávy, a metrické kód. Je také lepší zapouzdřit inicializaci a manipulaci adresářových cest (Tyto poslední 2 mají více co dělat.) 

    * Hodně pokroku směrem k oficiálně podporovanému Docker Image. Plán je dokončit a uvolnit po ERDDAP™ 2.26 uvolnění je k dispozici.

## Verze 2.25{#version-225} 
 (propuštěn 2024-10-31) 

*    **Nové funkce a změny (pro uživatele) :** 
    * EDDTableFromFoles mohou nyní podporovat dotazy pouze s odvozenými výstupy (globální, jexl skript nebo proměnné) .
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Verze 2.25 vyžaduje Java 21 nebo novější. Jedná se o verzi LTS a je k dispozici více než rok.
         
    * Služba SharedWatchService je nyní výchozí. Pokud ji potřebujete vypnout, kontaktujte prosím Chrise. John at noaa.gov to dejte mi vědět, abych to mohl vylepšit v budoucích verzích a přidat:
        &lt;UseSharedWatchService&gt;false&lt;/useSharedWatchService&gt; to your setup.xml.
         
    * The ERDDAP™ servlet nyní začne od spuštění serveru. Což znamená, že data začnou okamžitě nakládat místo čekání, až bude podána žádost.
         
    * Parametr removeMVRows v EDDTableFromMultidimNcFiles bude mít nyní efekt. Nastavení na false může výrazně urychlit některé dotazy, ale to nemusí být vhodné pro všechny soubory dat. Více informací viz [popis parametru](/docs/server-admin/datasets#removemvrows) .
         
    * Datové soubory (EDDTableFromNcFiles a EDDGrid FromNcFiles) Nyní jsou podporovány zarr soubory. Musí obsahovat "zarr" buď do souboruNameRegex nebo pathRegex. Viz [Zarr section v dokumentaci datových souborů](/docs/server-admin/datasets#zarr) pro více detailů.
         
    * Nový typ datového souboru, nyní je podporován EDDTableFromParquetFiles. Viz [EDDTableFromParquetFiles section v dokumentaci datových souborů](/docs/server-admin/datasets#eddtablefromparquetfiles) pro více detailů.
         
    *    [Prometheovy metriky](https://prometheus.io/) jsou nyní k dispozici na /erddap/metrics.
         
    * K dispozici je nová implementace XML parseru. Tento nový parser umožňuje použití XInclude v datasets.xml . Díky Ayush Singhovi za tu roli.
         
    * Nový parametr v datasets.xml kontrolovat neobvyklé aktivity e-maily. neobvykláaktivita FailPercent defaults se starou hodnotou 25%. Díky Ayush Singhovi za tu roli.
         
    * Nový parametr v setup.xml, který řídí, pokud jsou na stránce status.html uvedeny chyby načítání souborů. It defaults to true, to disable data data errors on the status page, set showLoadErrorsOnStatusPage to false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Některé malé změny a opravy chyb.
         
*    **Pro ERDDAP™ Vývojáři:** 
    * Zkoušky oddělené od jednotky a integrace (pomalu) testy. Také více testů povoleno a testy byly provedeny méně neprůstřelné.
         
    * Chyba (některé kontroly jsou stále vypnuté) a Spot Bugs integrovaný přes Maven.
         
    * Plný kódová základna formátovaná tak, aby odpovídala Google Style Guide.
         

## Verze 2.24{#version-224} 
 (propuštěn 2024-06-07) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Nová barevná paleta EK80 pro akustické soubory. Díky Robu Cermakovi za tohle.
         
    * Opravit problém, kde EDDTableAggregateRows neukázal správné rozsahy od všech dětí. Díky Marco Alba za zprávu o opravě a chybách.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: ZMĚNA BEZPEČNOSTI: Google Authentication může vyžadovat změny vašeho ověřovatele.
        
Konkrétně můžete také přidathttps://accounts.google.com/gsi/stylena stlye-src ahttps://accounts.google.com/gsi/pro připojení-src. Pro skript-src můžete nyní použíthttps://accounts.google.com/gsi/client.
        
Pro více informací můžete přejít na [Google stránka](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) o konfiguraci CSP.
         
        
    * New Shared Watch Service. Toto je nová možnost pro sledování adresářů pro aktualizace. Má jedno vlákno pro každý souborový systém místo jednoho vlákna na jeden soubor. Nejpravděpodobněji to drasticky sníží počet vláken používaných ke sledování změn. To znamená, že všechny soubory souborů se aktualizují společně namísto každého datového souboru, který má svou vlastní frekvenci aktualizací. Nejpravděpodobněji to bude znamenat častější aktualizace většiny souborů údajů.
        
Pro povolení tohoto přidání&lt;UseSharedWatchService&gt; true&lt;/useSharedWatchService&gt; to your setup.xml.
        
          
Prosím, zkuste tohle a ohlaste, jak to funguje pro Chrise. John v Noaa.gov.
         
    * Opravit chybná jména var v logech. Díky Ayush Singhovi za opravu.
         
    * Některé malé změny a opravy chyb.
         
*    **Zlepšení ERDDAP™ vývojáři:** 
    * Podpora místního rozvoje pomocí Docker. Díky Matt Hopson a Roje.
         
    * Podpora místního rozvoje pomocí vylepšení Jetty a dokumentace. Díky Micah Wengren.
         
    * Změny testů ke snížení emisí křížovou platformou. Díky. Shane St. Savage.
         

## Verze 2.23{#version-223} 
 (uvolněno 2023-02-27) 

Všimněte si, že toto propuštění učinil Bob Simons, a tím ukázal, že je stále kolem a aktivní během přechodu na Chris John, jeho nástupce. Statistiky s touto verzí, všechny změny kódu jsou prováděny Chis John, není-li uvedeno jinak.

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: ZMĚNA BEZPEČNOSTI: Google Authentication se nyní provádí prostřednictvím nové knihovny Google Identity Services, která je součástí "Sign In with Google." Podpora Google pro starý systém "Google Přihlásit se" bude ukončena 2023-03-31. Takže pokud používáte Google Authentication ve vašem ERDDAP™ instalace, musíte aktualizovat na ERDDAP™ V2.23+ do té doby. (Bob se omlouvá za to narychlo. Je to Bobova chyba.)   
         
    * NCCSV je nyní v1.2. Změna je, že soubory jsou nyní UTF-8-kódované soubory (byli ASCII) a tak může nyní zahrnovat jakýkoli Unicode znak, jak je, bez kódování jako \\u_hhhh_, i když to je stále povoleno.
Při psaní NCCSV souborů, ERDDAP™ Nyní píše v1.2 soubory.
         ERDDAP™ bude stále číst NCCSV soubory, které se řídí specifikací v1.0 a v1.1.
Díky Pauline-Chauvet, n-a-t-e, a thogar-počítač za návrh, a dělá testy, aby se zajistilo, že různé tabulkové programy mohou import UTF-8 soubory. Díky Bobovi Simonsovi za změnu kódu.
         
    * NOVINKA: Webová stránka status.html má nyní řádek v blízkosti vrcholu, který označuje, který soubor dat načítáDatasety se v současné době načítá a související statistiky, nebo žádný, pokud není načítán soubor dat. To může být velmi užitečné ERDDAP™ Správci se snaží zjistit, proč načíst Datasety trvají tak dlouho. Také, nGridDatasets, nTableDatasets, a nTotalDatasets se počítá níže, které jsou nyní okamžité (dříve, byly jako konec poslední velké zatížení Datové soubory) .
Tato změna je pro Roye Mendelssohna. Díky Bobovi Simonsovi za změnu kódu.
         
    * ZLEPŠIT: GenerovatNastavení dat Xml nyní mění CF-1.10 (bylo CF- 1, 6) v atributech "Úmluvy."
Díky Bobovi Simonsovi za změnu kódu.
         
    * Některé malé změny a opravy chyb.
         

## Verze 2.22{#version-222} 
 (propuštěn 2022-12-08) 

Všimněte si, že toto propuštění udělal Bob Simons, a tím ukázal, že je stále kolem a aktivní během přechodu na jeho nástupce.

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Nic.
         
    * ZABEZPEČENÍ: V kódu pro výběr jazyka byla chyba související s Cross Site Scripting. Díky NOAA Bezpečnostní skeny pro chytání. To ukazuje, že NOAA bezpečnost aktivně a pravidelně hledá bezpečnostní slabiny ERDDAP .
         
    * BEZPEČNOST FIX: Mnoho knihoven používaných ERDDAP™ byly jako obvykle aktualizovány jako součást tohoto vydání. Tentokrát to zahrnovalo aktualizaci ovladače PostgreSQL (který měl bezpečnostní chybu) na 42,5.1.
         
    * ZLEPŠENÉ: Další drobné změny ERDDAP 'Systém správy paměti by měl snížit šanci na danou žádost kvůli nedostatku dostupné paměti.
         
    * Některé malé změny a opravy chyb.
         

## Verze 2.21{#version-221} 
 (vydal 2022-10-09) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: Java 17, neměli byste používat \\-d64 v JAVA\\_OPTS v setenv.bat nebo setenv.sh. Takže pokud tam je, prosím, odstraňte ho. Myslím, že 64 bitový režim je nyní vybrán při stažení 64 bitové verze Java . Díky Samu Woodmanovi.
         
    * BUG FIX: Někdy se nový e-mailový systém snažil přihlásit příliš často, což způsobilo, že servery Google Email odmítly všechny budoucí pokusy o přihlášení. Nyní, e-mailový systém se vyhýbá této a související problémy.
         

## Verze 2.20{#version-220} 
 (vydané 2022-09-30) 

*    **Nepoužívejte v2.20. Je to vadné.** Správci však stále musí při modernizaci na v2.21+ provádět níže uvedené položky TO DO.
     
*    **Nové funkce a změny (pro uživatele) :** 
    *    (Žádné)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Obnovili jsme starý systém správy paměti. (Matematika2.zajistitPaměťDostupné) a upravil nový systém správy paměti (ED Static.shedThisRequest) lépe s tím pracovat. Viz [Stav paměti](/docs/server-admin/additional-information#memory-status) pro detaily.
         
    * ZMĚNĚNO: Výchozí pro&lt;ipAddressMaxRequests&gt; v datasets.xml zvýšení ze 7 na 15. Je jasné, že některé legitimní WMS klienti mohou generovat více než 7 simultánních žádostí.
         

## Verze 2.19{#version-219} 
 (vydal 2022-09-01) 

*    **Nepoužívejte v2.19. Je to vadné.** Správci však stále musí při modernizaci na v2.20+ provádět níže uvedené položky TO DO.
     
*    **Nové funkce a změny (pro uživatele) :** 
    * NEW: Existuje nová funkce na straně serveru, orderBy Sestupně, což funguje jako orderBy , ale v sestupném pořadí. Díky Adamovi Leadbetterovi.
         
    * Nyní grafy (ale ne mapy) expanduje k vyplnění volného prostoru na plátně, tj. prostoru, který legenda nepoužívá. Můžete získat vysoké grafy, čtvercové grafy, nebo široké grafy přidáním a manipulací &.size=_šířka_ | _výška_ parametr (kde šířka a výška určují velikost plátna v pixelech) na URL požadavku. (Toto není možnost na webové stránce .graf. Na URL ji musíte přidat ručně.) Pokud nespecifikujete parametr &.size, požadavky na .maléPng, .png, .largePng, .maléPdf, .pdf a .large.pdf mají předem definované velikosti plátna, takže váš graf se rozšíří k vyplnění volného prostoru, ale obvykle bude zhruba čtvercový. Díky Bobovi Flemingovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: ERDDAP™ Teď to vyžaduje Java 17 a související Tomcat 10. Musíte následovat ERDDAP™ Návod k instalaci (nebo ekvivalentní např. pro Dockera) pro instalaci Java 17 a Tomcat 10 a kopie \\[ tomcat \\] /content adresář z instalace Tomcat 8 do nové \\[ tomcat \\] adresář. Nejsou žádné další změny, které byste měli udělat na své ERDDAP instalace související s touto změnou. Jinými slovy, ERDDAP™ funguje jako předtím.
        
Nezapomeňte udělat ERDDAP - související změny na serveru Tomcat.xml a context.xml při upgradu Tomcat. Viz ERDDAP 's [Návod k instalaci Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Můj dojem Java 17 je to, že dává přednost více zpracovatelského výkonu a paměti pro dlouhodobé, větší aplikace jako ERDDAP™ , takže to funguje o něco pomaleji než Java 8 s nízkým výkonem počítačů (např. 2 jádra a minimální RAM) a pracuje o něco rychleji než Java 8 s vyšším výkonem počítačů (Například 4+ jádra a spousta RAM) . Takže pokud vidíte špatný výkon, použijte programy jako Linux [horní](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) kontrolovat využívání zdrojů a zvážit poskytnutí ERDDAP™ Více zdrojů, zejména více paměti. Paměť je levná&#33; Většina telefonů má více procesorů a paměti než servery, které někteří z vás používají ke spuštění ERDDAP &#33;
Díky Erin Turnbullové.
         
        
    * DO: pokud používáte ERDDAP™ pro přístup k Cassandra, pro Cassandra, musíte nadále používat verzi Java že používáte pro řízení Cassandry. Přepni na Java 17 pro spuštění Tomcat+ ERDDAP .
         
    * DO: Doporučeno: Pokud má CPU vašeho serveru 4+ jádra a 8+ GB RAM, zvažte změnu tohoto nastavení ve vašem datasets.xml soubor:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Pokud má váš server méně zdrojů, držte se "1" pro obě tato nastavení.
Systémy nThreads pro EDDGrid FromFiles a EDDTable ZFile se výrazně zlepšily. Tyto změny vedly k obrovskému zlepšení rychlosti (např. 2X speedup, pokud je nThraads nastaven na 2 nebo více) pro nejnáročnější žádosti (kdy je třeba zpracovat velký počet souborů pro shromažďování výsledků) . Některé související změny od Chris John bude také vést k obecné rychlosti v celém ERDDAP . Kód pro tyto změny přispěl Chris John. Děkuji. Chrisi&#33;
         
    * UPOZORNĚNÍ: pomlčky datasetID 's jsou deprecovány a již nejsou podporovány (i když technicky stále povoleno) . V příštím vydání budou pravděpodobně zakázáni. Pokud používáte pomlčky, přepněte na podtržení nyní, aby se zabránilo problémům. Když to teď změníš, je to na tvou vlastní rychlost. Pokud počkáte do dalšího propuštění, budete panikařit a budete se s tím muset vypořádat ten den.
         
    * NEW: Nyní, pro .htmlTable odezvy na data, pokud data v buňce String obsahují data:obraz/png;base64, následované base64 zakódovaným .png obrazem, ERDDAP™ zobrazí ikonu (takže uživatel může vidět obrázek, pokud nad ním vznáší) a tlačítka pro uložení textu nebo obrázku do schránky. Díky Marco Alba (kdo kód přispěl) a Bob Simons (který ji mírně upravil) .
         
    * Novinka: -nepřidatnástandardJména
Pokud přidáte \\-donotAddStandardNames jako parametr příkazového řádku při spuštění generování Datové soubory Xml, generovat Datové soubory Xml nepřidá standard\\_name do addAttributes pro proměnné jiné než proměnné s názvem zeměpisná šířka, zeměpisná délka, výška, hloubka nebo čas (které mají očividné standard\\_name án) . To může být užitečné, pokud používáte výstup z generování Datové soubory Xml přímo v ERDDAP™ bez úpravy výstupu, protože generovat Datové soubory Xml často hádá standard\\_name špatně. (Všimněte si, že vždy doporučujeme upravit výstup před použitím v ERDDAP .) Použití tohoto parametru bude mít jiné menší související účinky, protože hádané standard\\_name se často používá k jiným účelům, např. k vytvoření nového long\\_name , a vytvořit nastavení barevBar. Díky Kevinu O'Brienovi.
         
    * NEW: Nyní můžete dát&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; v datasets.xml   (s ostatními nastaveními v blízkosti horní části) změnit maximální počet změn souboru (výchozí=10) která bude zpracována systémem updateEveryNMillis. Větší číslo (100?) může být užitečné, pokud je velmi důležité, aby soubor údajů byl vždy aktualizován. Viz [aktualizace dokumentaceMaxEvents](/docs/server-admin/datasets#updatemaxevents) . Díky Johnu Maurerovi.
         
    * NOVINKA: Přidaná podpora pro globální " real\\_time =pravda | false" String atribut.
Jestli je to lež (výchozí) a pokud datový soubor nepoužívá aktualizaci EveryNMillis, ERDDAP™ bude cache odpovědi na žádosti o typy souborů, kde celý soubor musí být vytvořen před ERDDAP™ může začít odesílat odpověď uživateli a znovu je používat po dobu cca 15 minut (např. .nc , . png) .
Pokud je to nastaveno na true nebo pokud soubor údajů používá aktualizaci EveryNMillis, ERDDAP™ nebude nikdy cache souborů odezvy a vždy vrátí nově vytvořené soubory.
Díky Johnu Maurerovi.
         
    * Novinka: E-maily jsou nyní odesílány v samostatném e-mailuThread. Tím se načítá soubory dat a další akce, které generují e-maily rychleji, protože načítáníDatasets nemusí čekat na odeslání e-mailu, což někdy trvá dlouho. Nový systém může posílat více e-mailů na e-mailovou relaci, čímž se sníží počet přihlašovacích e-mailových serverů a sníží se riziko selhání, protože jsou příliš časté. K dispozici jsou statistiky pro emailThread na stránce status.html a diagnostické zprávy v log.txt -- hledat "emailThread." Všimněte si, že soubor nEmailsPerSession=0 naznačuje problémy, tj. e-mailová relace nebyla schopna odeslat žádné e-maily.
Díky Bobovi Simonsovi.
         
    * ZMĚNĚNO: Emaily jsou nyní odesílány s mírně odlišným kódem (kvůli Java 17 a změna na emailThread) . Pokud máte potíže se zasíláním e-mailů, prosím e-mail erd.data at noaa.gov .
         
    * NOVINKA: Akce předplatného, které "dotýkejte se" vzdálené URL, jsou nyní řešeny v samostatném dotykuThread. Tím se načítá soubory dat a další akce, které se dotýkají URL rychleji, protože načítáníDatasets nemusí čekat na dokončení dotyku, což někdy trvá dlouho. Pro touchThread na stránce status.html a diagnostické zprávy v log.txt -- hledejte "touchThread."
Díky Bobovi Simonsovi.
         
    * NOVINKA: Na stránce status.html, v "Major LoadDatasets Time Series," je nový "hed" sloupec, který označuje počet žádostí, které byly vrhány, protože aktuální ERDDAP™ používání paměti bylo příliš vysoké. Žádosti, které jsou vrh vrátí HTTP status kód 503 "Service Available." Ty žádosti nebyly nutně problém. Právě dorazili v rušné době. Tohle bylo součástí přehlídky jak ERDDAP™ se zabývá vysokou paměti využití.
         
    * NOVINKA: Na Unix/Linux počítačích je nyní na webové stránce status.html linka "OS Info" s aktuálními informacemi o operačním systému včetně zatížení procesoru a využití paměti.
         
    * Teď, když ERDDAP™ je restartován a quickRestart=true, EDDTableFromFoles soubory budou znovu používat podmnožinu .nc a zřetelné .nc . U některých souborů dat to výrazně snižuje čas pro načtení datového souboru (např. od 60 sekund do 0,3s) . Spolu s novým emailemThread a úkolThread (viz výše) , To by mělo výrazně urychlit restartování ERDDAP™ pro mnohé ERDDAP™ zařízení. Díky Benu Adamsovi a Johnu Kerfootovi.
         
    * ZMĚNĚNO: V předchozích dílech jste viděli (Data, která jsou živá ERDDAP™ ale nejsou v datasets.xml ) byly prostě zaznamenány ve stavu. html a v log.txt po každém velkém zatíženíDatasets. Nyní jsou automaticky odstraněny z ERDDAP™ a zaznamenal na status.html a v log.txt, a e-mailem na e-mail Všechno. Takže pokud chcete odstranit soubor z ERDDAP™ , Nyní vše, co musíte udělat, je odstranit jeho kus xml v datasets.xml a bude odstraněna v dalším velkém zatíženíDatasets. Díky Bobovi Simonsovi.
         
    * KNOWN BUG v netcdf-java v5.5.2 a v5.5.3: The EDDGrid FromThredds Volba katalogu v GeneranteDatasets Xml pracoval pro katalogy THREDDS, které obsahují odkazy na soubory dat v vzdálených katalogech THREDDS. Teď už ne. Nahlásil jsem problém vývojářům netcdf-java.
         
    * BUG FIX: Pro uživatele Docker nastavení parametrů setup.xml prostřednictvím ERDDAP \\__paramName_: pro int a boolean parametry (např. e-mail SmtpPort) , ERDDAP™ špatně hledal jen _paramName_. Teď to vypadá na _ ERDDAP \\_paramName_. Díky Alessandru De Donnovi.
         
    * Změna: ERDDAP™ testovací systém nyní používá automatizovaný systém k ověření, že nově vytvořené testovací snímky jsou přesně podle očekávání. Díky Chrisovi John pro návrh a Bob Simons pro realizaci.
         

## Verze 2.18{#version-218} 
 (vydané 2022-02-23) 

*    **Nové funkce a změny (pro uživatele) :** 
    * NE
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: .nc Za nějakých okolností nebyly spisy uzavřeny. Teď už ano. Díky Marcu Albovi, Rolandu Schweitzerovi, Johnu Maurerovi a dalším.
         

## Verze 2.17{#version-217} 
 (vydané 2022-02-16) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: Po změnách orderBy systém před několika lety, Tabledap je Make A Graph nebyl řádně zvládnout mnoho dotazů, které používají orderBy _Xxx_. Teď už ano. Díky Maurice Libesovi.
         
    * ZMĚNA: ERDDAP™ zamítl žádosti o . transparentní Png je doba, kdy byly hodnoty zeměpisné šířky a/nebo délky částečně nebo zcela mimo rozsah. ( ERDDAP™ GitHub Issues #19, Poslal Rob Fuller -- díky za vysílání, že Rob) Nyní vrací průhledné pixely pro jakékoliv oblasti mimo dosah obrazu. To je užitečné pro mnoho klientských aplikací. Kód se mění, aby se tato změna byla provedena zcela Chris John. Díky moc, Chrisi&#33;
         
    * ZMĚNA: ERDDAP™ odmítnuté žádosti o Griddap, kde hodnoty indexu pro daný rozměr byly \\[ vysoká: nízká \\] . Nyní tyto požadavky platí výměnou nízkých a vysokých hodnot. To řeší dlouhodobý problém pro uživatele a pro externí programy, jako je xtracto, které museli sledovat několik souborů údajů, které mají hodnoty zeměpisné šířky, které se pohybují od vysoké k nízké, aby se žádost jako \\[  (50) : (20)  \\] takže žádost v indexovém prostoru byla \\[ nízká: vysoká \\] . Vizhttps://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.htmlTakže, žádost jako \\[  (20) : (50)  \\] pro jeden z těchto souborů údajů se automaticky interpretuje jako \\[  (50) : (20)  \\] .
         
    * ZMĚNĚNO: .esriAscii požadavky nyní spouští dialogové okno "File : Uložit jako" v prohlížeči uživatele. Díky Joelovi Van Noordovi.
         
    * BUG FIX: Pokud je délka proměnné dětského datového souboru EDDGrid LonPM180 nebo EDDGrid Databáze Lon0360 má valid\\_min nebo valid\\_max atribut, jsou odstraněny v EDDGrid LonPM180 nebo EDDGrid Lon0360 data. Díky Royi Mendelssohnovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: Pokud jste byli nastaveni&lt;dataProviderFormActive&gt; k false pro dočasné řešení zranitelnosti XSS, nastavte jej zpět na true.
         
    * SECURITY BUG FIX: Pevná zranitelnost XSS ve formuláři poskytovatele dat. Díky Genaro Contreras Gutiérrez.
         
    * BUG FIX: Když měl dirctory AWS S3 více než 10000 souborů, ERDDAP™ hodil "vnitřní chyba." Tohle je teď spravené. Díky Andymu Zieglerovi.
         
    * BUG FIX: EDDGrid SideBySide nedovolil proměnné sourceName s v různých souborech údajů o dětech, aby byly stejné. Teď už ano. Díky Joshuovi Stanfordovi.
         

## Verze 2.16{#version-216} 
 (uvolněno 2021-12-17) 

*    **Nové funkce a změny (pro uživatele) :** 
    * ZMĚNY/BUG FIXES: Četné drobné změny v překladatelském systému díky návrhům redaktorů specifických pro jazyk. Díky Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian a Mike Smit.
         
    * Přidáno správné prohlášení a přiřazení pro Google Translate, jak vyžaduje podmínky Google Translate. Také&lt;html&gt; tag v HTML pro každou webovou stránku nyní správně identifikuje non-anglické webové stránky jako byl stroj přeložen. Díky Mikeu Smitovi.
         
    * BUG FIX: Přihlašovací webové stránky nyní fungují správně s různými nastaveními jazyka. Díky Mikeu Smitovi.
         
    * NOVÉ orderBy Filtr součtu. A nové Zaškrtněte vše a odškrtněte všechna tlačítka EDDGrid Webová stránka Data Access Form. Díky příspěvku Marca Alby.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO: Pokud máte
        &lt;questionMarkImageFile&gt; QuestionMark.jpg&lt;/dotazMarkImageFile&gt;
ve vašem setup.xml souboru, musíte buď odstranit celý štítek (doporučujeme, aby byl použit výchozí soubor) nebo jej změnit na:
        &lt;questionMarkImageFile&gt; QuestionMark.png&lt;/dotazMarkImageFile&gt;
         
    * ZMĚNA: Jen abyste věděli, [Adoptium](https://adoptium.net/?variant=openjdk8) nahradila AdopOpenJDK jako hlavní/doporučený zdroj Java   (OpenJDK) .
         
    * ZMĚNA: Soubory protokolu z ERDDAP™ , GenerátorDatasets Xml, a DasDds jsou nyní UTF-8, ne výchozí znaková sada počítače. Hodně jsem kontroloval a udělal pár změn, abych zajistil, že ERDDAP™ vždy určuje správný znak nastavený při čtení nebo psaní všech druhů souborů, a již (v několika případech) spoléhá na výchozí soubor znaků počítače. To opravilo několik chyb a posunulo tak blízko, jak jsem mohl k cíli použití UTF-8 pro co nejvíce typů souborů, jak je to možné (např. .log, .xml, .html, .json , .json Já, .nc Hlavička) . Všimněte si, že mnoho starších typů souborů je nutné používat ISO-8859-1 (např. OPeNDAP .das, .dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Dříve jsem se snažil pracovat se skupinou CF a s Unidata přidat podporu pro UTF-8 v .nc 3 soubory; oba byly odolné.
         
    * NEW: Při stahování souborů z AWS S3, ERDDAP 's cache Systém FromUrl v EDDGrid FromFiles a EDDTable FromFiles nyní používá nový AWS Transfer Manager ke stažení souborů prostřednictvím paralelních bloků (takže velmi rychle) . Cílová propustnost je nastavena na 20 Gbps na jeden soubor, takže to funguje dobře se všemi typy AWS instance, ale zejména těmi, které mají vynikající "Networking Performance." S touto změnou ERDDAP 's cache FromUrl systém nyní nabízí srovnatelné rychlosti k xarray přístupu paralelizované stahování pre-cunked souborů, ale bez nutnosti převést zdrojové soubory z .nc a .hdf do rozcuchaných rentgenových souborů. Ve skutečnosti, ERDDAP 's systém je lepší, pokud existuje následná žádost o čtení ze stejného souboru, protože ERDDAP™ Teď má místní kopii té složky. Naše komunita strávila roky standardizací na .nc a .hdf Složky. Nemusíme to všechno vyhodit, abychom získali dobrý výkon při ukládání dat v AWS S3. Díky Richi Signellovi.
         
    * ZMĚNA: searchEngine=Lucene je prozatím deprecován. Jedná se o komplexní systém, který často přináší výsledky, které jsou mírně odlišné od žádoucího chování vyhledáváníEngine=original. Pro téměř všechny ERDDAP™ instalace, úspory času Lucene nevyrovnávají rozdíly ve výsledcích. Prosím použijte vyhledáváníMotor=originální místo, pokud je to možné. Pokud to způsobuje problémy, prosím, email Bob.
         
    * ZMĚNA: Lucene vyhledáváníMotor se nyní chová spíše jako původní vyhledáváníMotor. Už neexistují žádné případy, kdy si lucene myslí, že se soubor shoduje a originál ne. Také, Lucene je žebříček nyní rovná původní žebříčku (protože originál je nyní vždy používán k výpočtu pořadí) .
         
    * BUG FIX: Od nedávného vydání, ERDDAP™ přestal vidět více než prvních 1000 objektů v daném kbelíku AWS S3. Teď, ERDDAP™ znovu vidí všechny objekty. Díky Andymu Zieglerovi.
         
    * BUG FIX: Nyní EddtableAggregate Řádky odstraní actual\\_range atribut pokaždé, když jeden nebo více dětských souborů nezná své proměnné ' actual\\_range   (např. EDDTableFromDatabase) . Díky Eriku Gelettimu.
         

## verze 2.15{#version-215} 
 (propuštěn 2021-11-19) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    ERDDAP™ má nový systém umožňující uživateli zadat jazyk, který má být použit pro všechny webové stránky. Pokud ERDDAP™ instalace je nastavena pro její použití, seznam jazyků se objeví v pravém horním rohu každé webové stránky. ERDDAP™ URL je z doby před touto verzí pokračovat v práci a vždy vrátit anglický obsah, jako dříve.
        
Ne všechny texty nebo všechny webové stránky byly přeloženy. Na tomto projektu byla časová omezení, která Qi a Bobovi zabránila dostat se na 100%.
        
Očividně otázka zní: proč jsme do toho vložili tolik úsilí, když Chrome přeloží webové stránky na letu? Odpověď zní: tak získáme mnohem větší kontrolu nad tím, jak se překlad provádí. Je zde především mnoho slov, která by neměla být přeložena na webových stránkách, např. názvy a souhrny souborů údajů, názvy proměnných, parametrů, jednotek a organizací. Hodně z překladatelské úsilí bylo identifikovat slova a fráze, které by neměly být přeloženy. Také, Stroj překlady tendenci k zamíchání určité typy HTML značky. Správa překladu nám umožnila minimalizovat tento problém.
        
Překlad projektu bylo provedeno Qi Zeng (Google Summer of Code internist) a Bob Simons pomocí Google překladu webové služby. Byl to obrovský projekt. Díky. Qi&#33;
        
    * BUG FIX: ERDDAP™ Nyní umožňuje ORCID ID 's mít X jako poslední číslice. Díky Maurice Libesovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DO:
        
        * Musíte udělat několik změn souvisejících s ERDDAP 's novým systémem umožňujícím uživatelům určit jazyk pro webové stránky.
            * Na první linii nastavení.xml a datasets.xml Soubory, změna na: kódování="UTF-8" a změna kódování dokumentu ve vašem textovém editoru tak, aby byl uložen jako UTF-8 soubor. Generovat soubory dat Xml nyní předpokládá, že datasets.xml je soubor UTF-8.
            * Programátoři, kteří sestavují ERDDAP : Všechny ERDDAP™ .java soubory by měly být považovány za UTF-8 soubory ve výchozím nastavení. Možná budete muset přidat "kódování UTF-8" na příkazovou řádku Javac. (Ano.) 
            * Pro umožnění tohoto systému (důrazně doporučeno) , v&lt;startBodyHtml5&gt; tag, který zadáte v datasets.xml , změnit "&amp&#33;loginInfo;" na "&amp&#33;loginInfo; | &amp&#33;jazyk; "tak, že seznam jazyků se objeví v pravém horním rohu každého ERDDAP™ webové stránky.
            *    ERDDAP™ pouze&lt;startBodyHtml5&gt; tag, který zadáte v datasets.xml zadat HTML obsah pro banner v horní části každého ERDDAP™ webová stránka, bez ohledu na jazyk, který uživatel vybere. Pokud změníte tuto značku k použití
" &EasierAccessToScientificData; "místo "jednoduššího přístupu k vědeckým údajům" a
" &BroughtToYouBy; "místo "Přivedl jsem tě," ERDDAP™ budou používat přeložené verze těchto frází v banneru.
            * Podobně i nová výchozí hodnota&lt;theShortDescriptionHtml&gt; in datasets.xml je
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Poslední 3 řádky obsahu jsou věci, které budou nahrazeny přeloženým textem. Pokud některého z nich konvertujete (zejména & To Zvláštní Erddap;) nebo všichni na výslovné znění datasets.xml   (který má přednost, pokud je přítomen) nebo zprávy.xml, že text se objeví bez ohledu na jazyk, který uživatel vybere. Není to perfektní, ale došlo mi, že jen málo správců by chtělo upravit&lt;ShortDescriptionHtml&gt; v 35 různých souborech poskytnout 35 různých přeložených verzí této značky.
        
          
         
    * ZMĚNĚNO: Některé chyby jsou nyní řešeny trochu jinak a tak mohou být přidány do souboru "Failed Requests" na status.html a v Daily Report Email. Takže tato čísla mohou být o něco větší než předtím.
         
    * BUG FIX: GenerovatNastavení dat Xml pro EDDGrid Lon0360 a EDDGrid LonPM180 nyní vylučuje zdrojové soubory se datasetID =~"\\*\\_LonPM180" a datasetID =~"\\*\\_Lon0360," resp.
         

## Verze 2.14{#version-214} 
 (propuštěn 2021-07-02) 

*    **Nové funkce a změny (pro uživatele) :** 
    *    (žádný)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * NEW: EDDGrid Lon0360, který vytváří mřížkovaný datový soubor s hodnotami délky &gt; =0 a&lt;=360 z mřížkovaného datového souboru s hodnotami délky &gt;=-180 a&lt;=180. Viz [ EDDGrid Lon0360 dokumentace](/docs/server-admin/datasets#eddgridlon0360) . Díky Dale Robinsonovi.
         
    * NEW: ERDDAP™ Správci nyní mohou přepsat jakoukoli hodnotu v setup.xml přes proměnnou prostředí pojmenovanou ERDDAP \\__ hodnotaNázev_ před spuštěním ERDDAP . Například použití ERDDAP \\_baseUrl ovládá&lt;baseUrl &gt; hodnota. To může být užitečné při nasazení ERDDAP™ s kontejnerem, jak můžete dát standardní nastavení do setup.xml a pak dodat speciální nastavení přes proměnné prostředí. Pokud poskytnete tajné informace ERDDAP™ prostřednictvím této metody se ujistěte, že informace zůstanou tajné. ERDDAP™ Pouze čte proměnné prostředí jednou za spuštění, v první sekundě startu, takže jedním ze způsobů, jak to použít, je: nastavení proměnných prostředí, spuštění ERDDAP™ Počkej. ERDDAP™ je spuštěn, pak odnastavit proměnné prostředí. Díky Marcu Portierovi.
         
    * Jestli nějaké soubory v EDDTableFrom... Soubory souborů s mnoha soubory mají velmi dlouhé String hodnoty, soubor se načte mnohem rychleji a odpoví na požadavky mnohem rychleji. V minulých dílech... ERDDAP™ vyčlení mnoho místa pro min a max String hodnoty v souborech, které jsou uloženy s informacemi o souborech pro tyto soubory. Výsledný soubor byl obrovský, což způsobilo jeho psaní a čtení pomalu. Díky OBIS.
         
    * Teď, ERDDAP™ lépe interpretuje neobvyklé a neplatné sekvence znaků v CSV souborech. Díky OBIS.
         
    * FIX: Po roce problémů s Cassandrou jsem konečně úspěšně nainstaloval Cassandru (v2) znovu a tak byl schopen znovu provést testy s Cassandra v2. Takže teď mohu více sebevědomě říci, že ERDDAP™ spolupracuje s Cassandra v2 a v3. Díky Onc.
         

## Verze 2.12{#version-212} 
 (propuštěn 2021-05-14) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: Pokud jste na černé listině předplatného, nemůžete si nyní vyžádat seznam předplatného.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * TO DO: NEW: systém, který automaticky omezuje schopnost škodlivých uživatelů a příliš agresivních legitimních uživatelů podávat velký počet simultánních žádostí, které by degradovaly výkon systému pro ostatní uživatele. Existují 3 nové volitelné značky v datasets.xml které můžete/měli byste přidat hned po&lt;grafBackgroundColor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Další informace viz [ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ také nyní tiskne "Počet unikátních uživatelů (od spuštění) " na stránce status.html.
Díky osobě v Číně, která útočí na mou ERDDAP™ instalace.
         
    * Změna chování řidiče Postgresql: Když jsem aktualizoval ovladač Postgresql, názvy sloupců v seznamu tabulky generované Postgresql a GenerateDatasetsXml vrátil všechny velké, místo všech malých případů, jako dříve. Nevím, jestli to ovlivní jiné věci, protože databáze často považují tato jména za necitlivá. Můj testovací soubor stále funguje správně. Ale pokud váš datový soubor přestane pracovat s tímto ERDDAP™ Aktualizace, to je možná příčina k pronásledování první.
         
    * BUG FIX: ERDDAP™ nyní také správně zpracovává soukromé soubory AWS S3. Došlo k dalším souvisejícím zlepšením při zpracování souborů AWS S3. Díky Michaelu Ganglovi a Dylan Pughovi.
         
    * NEW: EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybalený může nyní číst data z "struktur" v .nc 4 a .hdf 4 soubory. Pro identifikaci proměnné, která je ze struktury,&lt; sourceName &gt; musí používat formát: _fullStructureName_ | _memberName_, např. skupina1/myStruct | Můj pane. Díky NRL.
         
    * ZMĚNĚNO: Nyní, pokud je současné využití paměti plus tento požadavek je dokonce mírně vysoký, sady griddap nThreads pro tuto žádost na 1. Takže, ERDDAP™ Uchovává paměť, když je paměť vzácná. Díky osobě v Číně, která útočí na mou ERDDAP™ instalace.
         
    * Nový systém pro sledování počtu otevřených souborů (která zahrnuje zásuvky a některé další věci, nejen soubory) v počítačích Tomcat. Pokud se některé soubory mylně nikdy nezavřou, počet otevřených souborů se může zvýšit, dokud nepřevýší maximum povolené a mnoho opravdu špatných věcí se stane. Takže teď na Linuxových počítačích. (informace nejsou k dispozici pro Windows) :
        
        * Zde je nový sloupec "Otevřené soubory" na krajní pravici status.html webové stránky zobrazující procento z max souborů otevřených. Na Windows to jen ukazuje "?"
        * Kdy? ERDDAP™ generuje tyto informace na konci každého hlavního opětovného načtení souboru dat, bude tisknout do logu. txt soubor:
openFileCount=_current_ of max=_max_ %=_procent_
        * Pokud je procento vyšší než 50%, zašle se e-mail ERDDAP™ správce a e-mail Všechno Na e-mailové adresy.
        
Chcete-li zjistit více, nebo pokud vidíte tento problém na vašem ERDDAP™ , viz [Příliš mnoho otevřených souborů](/docs/server-admin/additional-information#too-many-open-files) .
Díky osobě v Číně, která útočí na mou ERDDAP™ instalace.
         
    * NOVINKA: Přidal jsem hodně kontroly a zpracování "Příliš mnoho otevřených souborů," takže úkol se prostě zastaví a uživatel vidí chybovou zprávu. Datové soubory již nebudou označeny jako špatné, pokud jejich čtení vede k chybě "příliš mnoho otevřených souborů."
         
    * NOVÉ \\[ velkýRodič rodičů \\] /badFilesDarník vlajky:
Pokud vložíte soubor do tohoto adresáře s datasetID jako název souboru (Na obsahu souboru nezáleží.) , ERDDAP™ smaže špatné svorky .nc soubor pro tento datový soubor (pokud existuje) a co nejdříve znovu načíst data. To způsobuje ERDDAP™ zkusit znovu pracovat se soubory dříve (Špatně?) Označeno jako špatné. Díky Marcovi Albovi.
         
    * ZMĚNĚNO: Při spuštění, pokud EDDGrid Z...Files nebo EDDTableFrom... Soubory souborů má původně 0 souborů ve svém seznamu známých platných souborů (Například je to nový datový soubor.) , pak ERDDAP™ odloží načítání a nastaví vlajku tak, aby byla co nejdříve načtena po dokončení hlavního zatíženíDatasets. To urychluje počáteční spuštění, když jsou nové soubory dat.
         
    * ZMĚNĚNO: FileVisitorDNLS.testAWSS3 () a FileVisitorSubdir.testAWSS3 () ; nyní použijte AWS v2 (není v1) SDK. Takže teď Git ERDDAP™ distribuce nyní zahrnuje všechny potřebné soubory a již nemusíte ručně přidávat masivní v1 AWS SDK jar soubor.
         
    * ZMĚNĚNO: Přešel jsem na použití Maven k detekci/sbírání závislostí (.jar soubory v /lib) . Změna na V2 AWS SDK to vyžadovala. Bude potřeba pro další dovážený kód v budoucnu. Obrovský díky Kyle Wilcox, který poskytl pom.xml vytvořil a používá, který vyřešil několik problémů pro mě.
         
    * ZMĚNA: Parametr třídy (-Cp) používané v GenerateDatasetXml, DasDds a další malé programy, které přicházejí s ERDDAP™ , a v radě programátorů je nyní mnohem jednodušší a nikdy by se neměl měnit, protože odkazuje na adresář, ne jednotlivé soubory:
\\-cp třídy;C:\\programy\\\_tomcat\\lib\\servlet-api.jar;lib\\\*
         (nebo ':' místo ';' pro Linux a Macs) .
         (Měl jsem to udělat už před lety, když se to stalo možností.)   
         
    * Novinka: GenerovatDatasety Xml má novou možnost utility: najítDuplicateTime, která bude hledat přes sbírku mřížkovaných .nc   (a související) soubory k nalezení souborů s duplikovanými hodnotami času. Viz [najítDuplicate Čas](/docs/server-admin/datasets#findduplicatetime)   
         
    * NEW: datasets.xml může nyní zahrnovat&lt;palety&gt; značka, která přepíše&lt;palety &gt; hodnota značky ze zpráv.xml (nebo vrátí na hodnotu zpráv.xml, pokud je prázdná) . To vám umožní změnit seznam dostupných palet, zatímco ERDDAP™ Utíká. Také, pokud máte podadresář cptfiles v ERDDAP™ adresář obsahu, ERDDAP™ zkopíruje všechny soubory \\*.cpt v tomto adresáři do \\[ tomcat \\] /webapps/erddap/WEB-INF/cptfiles adresář pokaždé ERDDAP™ Začneme. Společně vám tyto změny umožní přidat palety a mít změny přetrvávají, když nainstalujete novou verzi ERDDAP . Viz [dokumentace palet](/docs/server-admin/datasets#palettes)   
Díky Jennifer Sevadjianové, Melanie Abecassisové a možná dalším lidem z pobřežní hlídky.
         
    * ZMĚNĚNO: [&lt;slowDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntroublemillis) se nyní používá pro všechny neúspěšné žádosti, nejen pro několik typů.
         
    * ZMĚNĚNO: Vlákno RunLoadDatasets nyní přeruší vlákno LoadDatasets na 3/4 LoadDatasets MaxMinutes takže je více času pro LoadDatasets, aby si všiml přerušení a elegantně výstupu. Také pro to existuje více a lepší diagnostické zprávy.
         
    * Změněno ze staré verze Lucene na v8.7.0.
         
    * ZMĚNA: Emaily zaslané ERDDAP™ Nyní se objeví s pevným písmem šířky.
         
    * Změna: EDDGrid FromFiles nyní získává hodnoty os a atributy od FIRST | LAST soubor, jak je uvedeno v&lt;metadataze&gt;. Díky. (ne) Ken Casey, et al.
         
    * Podpora pro neplatné jednotky "stupeň\\_sever" a "stupeň\\_východ," které jsou chybně používány nedávnými soubory (od roku 2020-10-01) ve verzi AVHRR Pathfinder 5.3 L3-Collated (L3C) SST soubory dat (ceiPH53 sst d1day anceiPH53 sst n1den) . ERDDAP™ nyní je může standardizovat na platné jednotky. Díky. (ne) Ken Casey, et al.
         

## Verze 2.11{#version-211} 
 (vydané 2020-12-04) 

*    **Nové funkce a změny (pro uživatele) :** 
    * BUG FIX: OrderByMean hodil NullPointerException, pokud proměnná měla jen jednu z \\_FillValue nebo chybí\\_ Hodnota definovaná. Nyní situaci řeší správně. Díky Marcovi Albovi.
         
    * BUG FIX: Byly problémy s textovými soubory ODV vytvořenými ERDDAP™ ve v2.10. Tyto problémy jsou vyřešeny. Díky Shaun Bell.
         
    * BUG FIX: Právě jsem přišel. ERDDAP™ v2.10: Pokud byly hranice lat lon specifikovány v URL, nebylo na mapě světa vykresleno ohraničení. Teď už zase. Díky Johnu Maurerovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: Právě jsem přišel. ERDDAP™ v2.10: Soubory skriptů pro ArchiveADataset, GenerateDatasets Xml a DasDds nefungovali, protože neměli změny na třídní stezce, které byly přidány s ERDDAP™ V2.10. Teď ano. Díky Marcovi Albovi.
         
    * NEW: datasets.xml , Nyní můžete mít značku:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

V současné době, pokud je to pravda (nebo pokud je značka prázdná, nebo pokud značka není v souboru) , pokud žádost uživatele vede k NullPointerException, ERDDAP™ bude e-mail stoh stopy na erd.data at noaa.gov   (vá ERDDAP™ vývojový tým) . To by mělo být bezpečné a bezpečné, protože žádné důvěrné informace (např. žádostUrl) je součástí e-mailu. To by mělo umožnit chytit všechny obskurní, zcela neočekávané chyby, které vedou k NullPointerExceptions. V opačném případě uživatel vidí výjimky, ale ERDDAP™ Vývojáři ne, takže nevíme, jestli je problém, který je třeba vyřešit.
        
Je možné, že tato značka povede k další, podobné diagnostické informace jsou e-mailem erd.data at noaa.gov v budoucnosti. Obsah e-mailu bude vždy minimální a souvisí s chybami, a ne například s informacemi o používání. Díky Marcovi Albovi.
         
        
    * ZMĚNA: Nyní běžné typy komprimovaných souborů ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) jsou také zakázány pro byte range žádosti. To je zadáno přes&lt;extensionsNoRangeRequests&gt; in messages.xml.
         
    * Znalý problém: Jako u ERDDAP™ 2.10, .nc ml soubory, které se snaží změnit atribut, neměňte atribut. Jedná se o známou chybu v netcdf-java, kterou jsem nahlásil a říkají, že bude stanovena v příštím vydání netcdf-java.
         

## Verze 2.10{#version-210} 
 (propuštěn 2020-11-05) 

*    **Nové funkce a změny (pro uživatele) :** 
    * NEW: Nový [Interpolát](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) převodník efektivně interpoluje hodnoty z hodnot mřížkovaného datového souboru. Jako taková je zvláště užitečná pro výzkumné pracovníky, kteří pracují s údaji o stopách zvířat. Tento převodník bere v tabulce s zeměpisnou šířkou, délkou a časovými sloupce (a snad i jiné sloupce) a vrací tabulku s dalšími sloupci s interpolovanými hodnotami. Tak, to je podobné populární [Xtraktomatické](https://coastwatch.pfeg.noaa.gov/xtracto) skript původně vytvořil Dave Foley, ale nabízí výhodu zpracování až 100 bodů na žádost. Díky Dave Foley a Jordan Watson ( NMFS ) .
         
    * IMPROVED: Pokročilé vyhledávání je nyní přísné pro non-.html požadavky. Nyní bude házet výjimky pro žádosti, které mají trvalé chyby (např. žádosti o minLat &gt; maxLat) nebo dočasné chyby (např. žádosti o standard\\_name který neexistuje) . Pro .html požadavky, Pokročilé vyhledávání se nemění: stejně jako u Google vyhledávání, dělá to nejlepší a tiše opraví nebo ignoruje chyby. Díky Richi Signellovi.
         
    * IMPROVED: Mapa na stránce Pokročilé vyhledávání je nyní větší (Pořád musíš šilhat, ale méně) a výrazně přesnější (ale stále není perfektní) . Díky Johnu Maurerovi.
         
    * IMPROVED: "Draw land mask" nastavení na Make A Graph webové stránky a &.land=... nastavení v URL, které vyžadují mapu nyní podporuje další dvě možnosti:
"Outline" jen kreslí krajinný obrys, politické hranice, jezera a řeky.
"vypnout" nic nenakreslí.
Viz [&.land=... dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Díky Johnu Maurerovi.
         
    * ZLEPŠENÍ: Grafy a mapy vytvořené ERDDAP™ nyní lze použít tři nové typy značek: Bezmezně naplněné náměstí, bez hranic naplněný kruh, bez hranic naplněný trojúhelníkem. Kód k tomu přispěl Marco Alba z ETT / EMODnet Physics. Díky Marcovi Albovi.
         
    * NEW: "files" systém nyní podporuje prostý Odpovědi typu souboru (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv nebo .xhtml .) např. [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Díky Kyleu Wilcoxovi.
         
    * IMPROVED: URL generované při použití formuláře pro přístup k datům (.html) nebo Make-A-Graf (.graph) webová stránka nyní správně procent-kódovat znaky \\[ a \\] . To dělá URL trochu těžší pro lidi číst, ale je lepší z hlediska webové bezpečnosti. Administrátoři nyní mají možnost nastavení uvolněnéQueryChars= ' \\[  \\]  | ' v souboru Tomcat server.xml (méně bezpečné) nebo ne (bezpečnější) .
Díky Antoine Quericovi, Dominicu Fuller-Rowellovi a dalším.
         
    * NOVINKA: Pokud žádost o datové souboryEDDTable obsahuje &add Proměnné kde (_atribut Název, atribut Hodnota_) , ERDDAP™ přidá všechny proměnné, které mají _atribute Název=attribut Hodnota_ do seznamu požadovaných proměnných.
Viz [& Přidat Proměnné V případě dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Díky Aurelie Briand, et al.
         
    * ZMĚNĚNO: ERDDAP™ nyní odmítá podat žádost o rozsah /files/ .nc nebo .hdf Složky. Nesnažte se připojit ke vzdálenému .nc nebo .hdf Jako by to byly místní soubory. Je strašně neefektivní a často způsobuje i jiné problémy. Místo toho:
        * Použití(OPeN)DAPklientský software pro připojení k ERDDAP 's DAP služby pro tento datový soubor (které mají /griddap/ nebo / tabledap / v URL) . To je ono. DAP je pro.
        * Pro žádost o podmnožinu dat použijte formulář datového přístupu datového souboru.
        * Pokud potřebujete celý soubor nebo opakovaný přístup po dlouhou dobu, použijte curl , wget , nebo váš prohlížeč ke stažení celého souboru, pak přístup k datům z místní kopie souboru.
             
    * ZLEPŠENÍ: .odv Možnost Txt výstupu byla přepsána na podporu nové verze ODV .txt soubory a na podporu řádného znázornění trajektorie, časových řad a profilových dat.
         
    * IMPROVED: Nyní, hledané výrazy ve dvou citacích jsou interpretovány jako json řetězec, takže mohou mít \\ enkódované znaky. Mimo jiné, to vám umožní hledat přesnou shodu atributu, např. "instituce= NOAA  \\n "nebude odpovídat datovému souboru s institucí= NOAA   NMFS . Díky Danu Nowackimu.
         
    * ZLEPŠENÉ: Na dalších místech čísla plovoucích bodů (zejména plováky přeměněné na dvojité) Nyní se jeví jako o něco zaoblenější verze čísla na dalších místech, např. plovák dříve zobrazený jako dvojitý jako 32.27998779296875, může nyní vypadat jako 32.28. Díky Kyleu Wilcoxovi.
         
    * BUG FIX: nepodepsané celočíselné zvukové soubory byly přečteny mírně nesprávně. Teď jsou správně přečtené.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * UPOZORNĚNÍ: Poprvé utíkáš ERDDAP™ v2.10, některé datové soubory založené na místních datových souborech budou načítat **velmi** pomalu, protože ERDDAP™ musí znovu vytvořit databázi informací o souboru. Po pomalé počáteční reload, budou nabíjet rychle, jako předtím. Prosím, buď trpělivý.
         
    * Věci, které musíte udělat:
        * Když poprvé spustíte v2.10, některé soubory souborů se nemusí načíst, protože ERDDAP™ je nyní přísnější ohledně některých metadat. Jako předtím, ERDDAP™ Vám e-mailem Daily Report, když se poprvé načte nahoru. To bude zahrnovat chybové zprávy pro každý soubor, který nebyl načten. Přečtěte si chybové zprávy, abyste vyřešili problémy. Ve většině případů stačí provést malou změnu metadat datového souboru, abyste problém vyřešili.
             
        * In datasets.xml , hledání&lt; sourceName &gt;= (Poznámka: '=' Znak, který označuje [pevná hodnota sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Pro většinu ERDDAP™ Jsou vzácné. Pokud některá z hodnot po '=' jsou řetězce (nejsou čísla) , Musíte nyní uzavřít řetězec ve dvou citacích. Například,
Předtím:&lt; sourceName &gt;=KZ401&lt;/ sourceName &gt;
Poté:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * NOVINKA: V setup.xml je nové volitelné nastavení,&lt;výchozíAccessibleViaFiles&gt;, který nastavuje výchozí&lt;dostupnéViaFiles &gt; pro každý soubor dat. Výchozí hodnota pro tuto novou značku je falešná, což napodobuje předchozí ERDDAP™ chování. Toto nastavení nižší úrovně může být zrušeno daným datovým souborem&lt;přístupnéViaFiles&gt; nastavení.
            
DOPORUČENÉ (Protože existují uživatelé, kteří to chtějí) :
Jestli chceš udělat všechny EDD... FromFiles datové soubory přístupné prostřednictvím souborového systému, pak
            
            1. Přidat tento tag do souboru setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Volitelně) Odstranit všechny
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
v datasets.xml protože výchozí hodnota je nyní pravdivá.
                 
        * Přidat atributy \\_FillValue:
             ERDDAP™ která má výchozí hodnotu \\_FillValue pro všechny celočíselné proměnné: maximální hodnota datového typu (např. 127 pro proměnné byte) . Teď už ne. Aby se zabránilo zobrazení těchto hodnot jako hodnot údajů (chybějící hodnoty) , musíte je výslovně uvést pomocí atributů \\_FillValue. Od teď, pokaždé, když začneš ERDDAP™ Pošle správci e-mail s tabulkou .csv se seznamem celočíselných zdrojových proměnných, které nemají \\_FillValue nebo missing\\_value atributy a navrhované nové atributy \\_FillValue. Viz [Přidat \\_Fill Hodnota Atributy](/docs/server-admin/datasets#add-_fillvalue-attributes) pro více informací a pokynů.
             
        * Když sestavíte ERDDAP™ , musíte upravit parametr třídy path na příkazových řádkách javac přidat odkaz na tyto nové jar's: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-anotace.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * ZMĚNA: Tomcat 9 je nyní doporučená verze Tomcat pro ERDDAP . Poslední verze Tomcat 8.5+ je v pořádku. Uklidili jsme. ERDDAP 's [Návod k instalaci Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Poslední verze Java 8 (ne Java 9, 10, 11, ...) od [PřijmoutOpenJDK](https://adoptopenjdk.net/) zůstává doporučená verze Java místo ERDDAP . Java 8 má dlouhodobou podporu od AdopOpenJDK, takže zůstává bezpečné použití, ale nezapomeňte získat nejnovější verzi z bezpečnostních důvodů.
        
    * NOVINKA: Script sourceNames / Odvozené proměnné v Tabulkových datových sadách
EDDTableFromFoles, EDDTableFromDatabase a EDDTableFromFileNames mohou nyní obsahovat výrazy a skripty v souboru sourceName . To vám umožní vytvářet nové proměnné na základě existujících proměnných ve zdrojových souborech. Výpočet pro danou novou proměnnou se provádí v rámci jednoho řádku výsledků, opakovaně pro všechny řádky. Například vytvořit proměnnou délky s hodnotami v rozsahu -180 - 180° z proměnné s hodnotami v rozsahu 0 - 360°:
        &lt; sourceName &gt;=Math2.anglePM180 (Řádek. SloupecDvoumístný ("lon") ) &lt;/ sourceName &gt;
Podrobnosti viz [Název zdroje skriptu](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Díky Bobovi Simonsovi (který to plánoval předtím ERDDAP™ v1.0 a nakonec našel způsob, jak ho implementovat) , Kevin O'Brien, Roland Schweitzer, John Maurer, a Apache JEXL knihovna pro dělá opravdu těžké části (a dělá to dobře) .
         
    * NEW: Podepsané celé datové typy (ubyte, uhort, uint, ulong) jsou nyní podporovány. Všimněte si, že mnoho typů souborů (např. .das, .dds, .nc 3) Nepodporují všechny tyto nové datové typy. Viz [Údaje Typová dokumentace](/docs/server-admin/datasets#data-types) pro podrobnosti o tom, jak ERDDAP™ řeší tyto rozdíly. Vzhledem k tomu,(OPeN)DAP, zejména .dds odpověď, nepodporuje podepsané bajty, dlouho, nebo ulongs, možná budete chtít použít ERDDAP 's tabular reprezentation of .das and .das as seen in the http .../erddap/ **Informace** /_ datasetID _.html webová stránka (například: [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) které můžete také získat v jiných typech souborů nebo .nccsv Odpověď na metadata (například: [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , z nichž oba podporuje všechny datové typy ve všech situacích.
        
UPOZORNĚNÍ: Pro soubory, které jsou touto změnou ovlivněny, je možné, že uvidíte problémy s datovým souborem, protože údaje, které ERDDAP™ čtení ze zdroje může být odlišné (Například proměnné, které byly dříve čteny jako podepsaná celá čísla, lze nyní číst jako nepodepsaná celá čísla) . Výsledné problémy zahrnují: nové soubory nejsou přidávány do datového souboru, a/nebo chyby, když se snažíte získat přístup k datům. Pokud má datový soubor problémy, první věc, která se snaží, je [nastavit tvrdý Označení](/docs/server-admin/additional-information#hard-flag) pro datový soubor. Pokud to problém nevyřeší, pak se musíte podívat na log. txt vidět chybové zprávy, ponořit se do datasets.xml pro datový soubor a/nebo pro datový soubor znovu spustit generováníDatasets.xml.
Díky netcdf-java 5.x (která donutila k problému) a nadcházející CF 1.9.
        
    * Teď už ano. [lepší dokumentace/poradenství](/docs/server-admin/datasets#s3-buckets) jak vytvořit soubor ze souborů v kbelících AWS S3. Díky Micahovi Wengrenovi.
         
    * ZMĚNA: Existuje několik změn souvisejících s "files" systém.
        * Kód k tomu byl přepsán tak, aby byl použitelný více tříd.
             
        * NOVINKA: Uživatelské požadavky na výpisy adresářů mohou nyní požadovat, aby odpověď byla jedním ze standardních jednoduchých typů tabulek tím, že doplní požadované přípony souboru: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv nebo .xhtml ). Například,
             [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Díky Kyle Wilcoxovi a Shane St Savage.
             
        * ZLEPŠIT: Nyní, Generovat Datové soubory Xml nebude zahrnovat&lt;accessibleViaFiles&gt; tag in the output. Předpokladem je, že datový soubor bude spoléhat na hodnotu nového&lt;defaultAccessibleViaFiles&gt; tag in setup.xml. Viz [přístupný ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * ZLEPŠENÉ: Další typy souborů nyní podporují přístupné ViaFiles: EDDGrid SidebySide, EDDGrid AgregátExising Dimension, EDDGrid FromErddap, EDDTableFromErddap, EDDGrid OdEDDTable, EDDTableFrom EDDGrid a EDDGrid Od Etopa. Pro tyto soubory budou dostupné soubory z daného vzdáleného/dítěte data, pouze pokud mají přístup jak rodič, tak i vzdálený/dětský soubor. ViaFiles nastavena na true (možná prostřednictvím&lt;výchozíAccessibleViaFiles&gt;). Díky Damianovi Smythovi a Robu Fullerovi.
             
        * DO / DOPORUČENÍ: Doporučujeme zpřístupnit všechny příslušné soubory prostřednictvím systému souborů nastavením&lt;defaultAccessibleViaFiles&gt; to true in setup.xml, protože existuje skupina uživatelů, pro které je to preferovaný způsob, jak získat data. Kromě jiných důvodů "files" systém usnadňuje uživatelům sledovat, které soubory jsou k dispozici a kdy se naposledy změnily, a tak umožňuje uživateli udržovat si vlastní kopii celého datového souboru. Pokud obecně nechcete zpřístupnit soubory prostřednictvím systému souborů, nastavit&lt;defaultAccessibleViaFiles &gt; to false. V obou případech stačí použít&lt;přístupnéViaFiles&gt; pro několik souborů údajů, které jsou výjimkami z obecné politiky stanovené&lt;defaultAccessibleViaFiles&gt; (například při použití datového souboru .nc ml soubory, které nejsou opravdu užitečné pro uživatele) .
             
    * IMPROVED: Nyní, pokud zdrojový soubor má CF Grid\\_Mapping informace, generovat Datové soubory Xml pro mřížkované soubory dat přidá informace do globálních&lt;addAtts&gt; a informace budou přidány do globálního&lt;sourceAtts&gt; everytime data se čtou ze souboru. Informace se objeví v globálních atributech datového souboru jako soubor atributů s předfixovou mřížkou\\_mapping\\_ .
         
    * ZLEPŠENÉ: Podpora pro skupiny při čtení .nc 4 (a do určité míry v .hdf 5) Složky. Obecně ERDDAP™ Databáze bude vytvořena z proměnných v jedné ze skupin souborů. Také generovatDatasety Xml pro EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybalené nyní žádá o "skupina" (např. "" pro všechny skupiny, "některé skupiny," "některé skupiny/některé skupiny" nebo " \\[ kořen \\] "pro jen kořenovou skupinu) . Díky Charlesi Carletonovi a Jessice Hausmanové.
         
    * ZLEPŠIT: GenerovatNastavení dat Xml pro EDDGrid FromNcFiles a EDDGrid FromNcFiles Vybalený nyní podporuje volitelný parametr "RozměryCSV," který umožňuje zadat zdrojové názvy rozměrů, které chcete, aby tento datový soubor použil. Použijte "" získat proměnné, které používají nejvíce rozměrů, jako předtím. Také, související malá chyba, která nastala s tímto typem souboru je nyní stanovena. Díky Sujalu Manandharovi.
         
    * BUG FIX: GenerovatNastavení dat Xml nyní správně uvádí "EDDTableFromJsonlCSVFiles" (ne "EDDTableFromJsoniCSV") jako jedna z možností EDDType. Díky Andymu Zieglerovi.
         
    * ZLEPŠENÍ: EDDGrid FromNcFiles Odbalené nyní standardizuje atributy "jednotky" na standardní/"kanonické" ud units (stejnou metodu jako převodník jednotek) . Například, "meter per second" , "meters/second" , "m.s^-1" a "m s-1" všichni se stanou "m s-1" . Díky Andymu Zieglerovi.
        
UPOZORNĚNÍ: Je možné, že to způsobí problémy pro některé existující soubory dat (např. způsobit, že nové soubory budou označeny jako "špatné") . Pokud ano, [nastavit tvrdý Označení](/docs/server-admin/additional-information#hard-flag) pro datový soubor tak, aby všechny zdrojové soubory byly znovu přečteny s novým systémem.
        
    * Nyní, proměnná je&lt; sourceName &gt; může určit pevnou hodnotu =NaN a proměnná může mít actual\\_range atribut, který určuje konečný rozsah. To je někdy užitečné, aby soubor údajů (a zejména soubor údajů EDDTableFromFileNames) může mít proměnnou figuríny (án)   (např. zeměpisná šířka, zeměpisná délka, čas) s pevnými hodnotami NaN, avšak s platnými actual\\_range   (podle atributu) . V pokročilém vyhledávání pak může uživatel vyhledávat soubory údajů, které mají údaje v určité zeměpisné šířce, délce, časovém rozsahu a tento soubor údajů bude moci říci, že má relevantní údaje. (i když všechny aktuální řádky dat zobrazí NaN) . Viz [dokumentace pevné hodnoty](/docs/server-admin/datasets#fixed-value-sourcenames) .
Díky Mathew Biddle.
         
    * NEW: datasets.xml Soupis pro EDDTableFromAsciiFiles nebo EDDTableFromColumnarAsciiFiles může obsahovat tag, který říká ERDDAP™ ignorovat všechny řádky v horní části souboru až do řádku, který odpovídá zadanému regulárnímu výrazu. Například,
        &lt;skipheaderToRegex&gt;\\\*\\\*\\\*Konec hlavy.\\*&lt;/skipheaderToRegex&gt;
bude ignorovat všechny řádky až do a včetně řádku, který začíná na "\\*\\*Konec hlavy. Viz [&lt;skipheaderToRegex&gt; dokumentace] (/docs/server-admin/datasets#skipheadertoregex) .
Díky Eli Hunterovi
         
    * NEW: datasets.xml chunk pro EDDTableFromAsciiFiles nebo EDDTableFromColumnarAsciiFilesdataset může obsahovat tag, který říká ERDDAP™ ignorovat všechny řádky v souboru, které odpovídají zadanému regulárnímu výrazu. Například,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

přeskočí všechny řádky, které začínají na "#." Viz [&lt;skipLinesRegex&gt; dokumentace] (/docs/server-admin/datasets#skiplinesregex) .
Díky Eli Hunterovi.
         
    * NEW: datasets.xml chunk pro libovolný datový soubor EDDTable nyní může obsahovat &add Proměnné kde (_attributeNázevsCSV_) . Pokud ano, ERDDAP™ přidá widget pro každý zadaný atribut Název datového formuláře datového přístupu datového souboru (.html webová stránka) pro snadné přidávání &add Proměnné kde (_atribut Název, atribut Hodnota_) na žádost.
Viz [& Přidat Proměnné V případě dokumentace](/docs/server-admin/datasets#addvariableswhere) .
Díky Aurelie Briand, et al.
         
    * NOVÉ Nástroj třetí strany: ERDDAP - Lint
         ERDDAP -Lint je program od Roba Fullera a Adama Leadbettera z Irish Marine Institute, který můžete použít ke zlepšení metadat vašeho ERDDAP™ Data. ERDDAP -lint "obsahuje pravidla a jednoduchou statické webové aplikace pro provádění některých ověřovacích testů proti vašemu ERDDAP™ server. Všechny testy jsou spuštěny ve webovém prohlížeči." Jako [Nástroj Unix/Linux lint](https://en.wikipedia.org/wiki/Lint_(software) ), můžete upravit stávající pravidla nebo přidat nová pravidla. Viz [ ERDDAP - Lint](https://github.com/IrishMarineInstitute/erddap-lint) pro více informací.
        
Tento nástroj je zvláště užitečný pro soubory dat, které jste vytvořili před nějakou dobou a nyní chcete aktualizovat s vašimi aktuálními preferencemi metadat. Například rané verze GenerateDatasets Xml se nesnažil vytvořit globální creator\\_name , creator\\_email , creator\\_type nebo creator\\_url metadata. Hodilo by se ti. ERDDAP -lt identifikovat soubory, které nemají atributy metadat.
        
Díky Rob a Adam za vytvoření tohoto nástroje a zpřístupnění ERDDAP™ komunita.
        
    * NEW: Nyní je v pořádku, pokud některé soubory v EDDGrid Databáze FromFiles nemá všechny proměnné datového souboru. Soubory budou zahrnuty jako kdyby měly proměnné (se všemi chybějícími hodnotami) .
Díky Dale Robinsonovi a Dougovi Latornellovi.
         
    * NOVINKA: V logovém souboru jsou nové statistiky využití a Daily Report pomáhají administrátorům identifikovat uživatele, kteří způsobují problémy s pamětí. Statistiky jsou pojmenovány "OutOfMemory (Velikost pole) ", "OutOfMemory (Příliš velká.) "a "OutOfMemory" (Příliš velká) ". Ukazují IP adresy uživatelů, kteří podali žádosti v těchto kategoriích, a počet žádostí, které podali. Pokud nebudou žádné nepříjemné požadavky, tyto statistiky se neobjeví. "OutOfMemory (Velikost pole) "a "Z paměti (Příliš velká) " žádosti obvykle nejsou problém, protože žádosti byly tak velké, že ERDDAP™ chytil je rychle a vrátil chybovou zprávu. "Vzpomínka (Příliš velká.) " požadavky jsou nebezpečnější, protože ERDDAP™ vyvinul nějaké úsilí, než si uvědomil, že není dostatek paměti v současné době k dispozici zvládnout žádost (i když problémem mohou být jiné žádosti těsně před těmito žádostmi) .
        
Existují také nové statistiky s názvem "Velká žádost, IP adresa," které ukazují IP adresy uživatelů, kteří podali velké žádosti (v současné době, roštovaný .nc Soubory &gt; 1GB) .
        
Také tabulka časových řad na stránce status.html nyní obsahuje sloupec "memFail" zobrazující počet žádostí, které selhaly s "OutOfMemory" (Příliš velká.) " chyby od posledních velkých načíst Datasety. Jakékoliv jiné číslo než 0 je alespoň důvod k obavám.
Díky Bobovi Simonsovi.
        
    * NEW: Nová verze Hyrax zobrazí seznamy adresářů jinak než předtím. ERDDAP™ nyní můžete přečíst staré a nové seznamy adresářů.
         
    * NOVINKA: Dataset reloads a uživatelská odpověď, která trvá déle než 10 sekund do konce (úspěšně nebo neúspěšně) jsou označeny " (&gt;10&#33;) ". Proto můžete prohledat soubor log.txt, aby tato fráze našla soubory, které byly pomalé k opětovnému načtení nebo číslo požadavku na žádosti, které byly pomalé k dokončení. Pak se můžete podívat výš v log.txt souboru, abyste zjistili, jaký byl problém s datovým souborem nebo jaký byl požadavek uživatele a od koho byl. Tyto pomalé zatížení souborů a požadavky uživatelů jsou někdy zdaňování na ERDDAP . Takže vědět více o těchto požadavcích vám může pomoci identifikovat a řešit problémy.
    * IMPROVED: Při validaci CF DSG souboru, ERDDAP™ nyní zajišťuje, že proměnné s atributy cf\\_role jsou v příslušném cdm\\_...\\_proměnný seznam a nejsou v jiných seznamech cdm\\_...\\_variables. Například pokud má soubor timeseriesProfile proměnnou "station\\_id," která má atribut cf\\_role=timeseries\\_id, pak "station\\_id" musí být v seznamu cf\\_timeseries\\_variables, ale nesmí být v seznamu cf\\_profile\\_variables.
Díky Micahovi Wengrenovi.
         
    * IMPROVED: 'Simplify' je nyní rychlejší, používá méně paměti, a může vrátit LongArray. Díky Unidata .
         
    * IMPROVED: rychlýRestart je nyní výrazně rychlejší pro EDDTableFrom (nc související) Soubory (kromě EDDTableFromNcCFFiles a EDDTableFromInvalidCRAFiles) protože Předpokládané (a jiné místo) Nyní jen čte metadata souboru vzorku namísto čtení všech dat. Díky Jessice Austinové.
         
    * IMPROVED: Nyní existuje podpora pro časové řetězce s přesností větší než do-milisekundy, pokud jsou všechny další číslice 0's, např. "2020-05-22T01:02:03.45 6000000Z." Díky Yibo Jiangovi.
         
    * IMPROVED: GenerateDatasetsXml's EDD.suggestDestinationName used to remove '(' and everything after. Nyní se odstraní (.\\*) pouze tehdy, je- li to konec sourceName . Nyní také odstraní \\[ .\\* \\] Pouze pokud je to konec sourceName . Díky Julienovi Paulovi.
         
    * ZLEPŠIT: GenerovatNastavení dat Xml nyní dělá proměnnou destinationName s unikátní přidáním \\_2, \\_3, ... podle potřeby. Díky Julienovi Paulovi.
         
    * IMPROVED: Když Kalendář2.parseDateTime parses dd, hh, nebo HH, první "cifra" může být nyní prostor.
    * Znalý problém: Začneme s ERDDAP™ 2.10, .nc ml soubory, které se snaží změnit atribut, neměňte atribut. Jedná se o známou chybu v netcdf-java, kterou jsem nahlásil a říkají, že bude stanovena v příštím vydání netcdf-java.
         
    * BROKEN LINKS FIX: Udělal jsem správný systém pro testování rozbitých odkazů v ERDDAP™ webové stránky, takže by mělo být velmi málo rozbitých odkazů (alespoň od každého data vydání -- často vznikají nové přerušené odkazy) .
         
    * BUG FIX: EDDTableFromHttpGet failed with certain types of requests. Teď už ne. Díky Emmě v BODC.
         
    * BUG FIX: Pro vyřízení některých požadavků udělal EDDTable dočasný soubor pro každou požadovanou proměnnou, s názvem souboru končícím v názvu proměnné. Pokud název proměnné byl také typ komprese (např. .Z) , ERDDAP Pokusí se. (a selhala) dekomprimovat dočasný soubor. Dočasná jména souborů končí v ".. temp." Díky Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml a Calendar2. convertTo Java Datum Formát jsou nyní mnohem méně pravděpodobné, že udělat nesprávnou změnu, když se snaží opravit možná neplatné datum formátu času. V neposlední řadě nebude upraven žádný auto-navrhovaný formát dataTime. Díky Mathew Biddle.
         
    * BUG FIX: Pokud došlo k chybě při získávání obsahu ze vzdálené URL, a pokud je obsah chybStream komprimován, ERDDAP™ nyní správně rozkládá chybovou zprávu. Díky Bobovi Simonsovi.
         
    * BUG FIX:&lt;appliedToRemoteErddapDataset&gt; wasn't been applied when the EDD... FromErddap soubor byl dětský soubor. Teď je. Díky Chrisi Romsovi.
         
    * BUG FIX: GenerovatNastavení dat Xml si už nemyslí, že zdroj proměnné jméno začínající na "latin" může být zeměpisná šířka. Díky Vincentu Luzzovi.
         
    * BUG FIX: Nyní, OutOfMemoryPříjezd při čtení datového souboru při zpracování požadavku uživatele není důvod přidat soubor do seznamu BadFiles. Díky Bobovi Simonsovi.
         

## Verze 2.02{#version-202} 
 (vydal 2019-08-21) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Novinka: Existují dva způsoby, jak hledat data na více ERDDAP s. Pracují trochu jinak a mají různá rozhraní a možnosti.
        
        *    [HledatMultiple ERDDAP s.html](/SearchMultipleERDDAPs.html) od Boba Simonse/ NOAA   NMFS   SWFSC   ERD .
        *    [http://erddap.com](http://erddap.com) od Roba Fullera/Mořského institutu Irska.
        
Díky Tylaru Murrayovi za původní žádost.
         
    * ZLEPŠENÍ: žádost na "files" systém ke stažení souboru, který je ve skutečnosti na vzdáleném místě (např. AWS S3) Nyní vede k přesměrování, takže uživatel bude skutečně stáhnout data ze zdroje, místo použití ERDDAP™ jako prostředník. Díky Andymu Zieglerovi a NOAA .
         
    * NOVINKA: Jako příklad nových funkcí souvisejících s AWS S3 a pro usnadnění prohlížení a stahování souborů z veřejných kbelíků AWS S3 jsme vytvořili
         [~110 souborů vzorků](https://registry.opendata.aws/) který umožňuje každému procházet obsah téměř všech
         [AWS S3 Otevřít datové vědro](https://registry.opendata.aws/) . Pokud kliknete na "files" odkaz na některý z těchto souborů, můžete procházet adresář strom a soubory v tomto S3 kbelíku. Vzhledem k tomu, jak tyto soubory dat fungují, tyto seznamy adresářů jsou vždy dokonale aktuální, protože ERDDAP™ Dostane je do letadla. Pokud kliknete na strom adresáře na aktuální název souboru a kliknete na název souboru, ERDDAP™ přesměruje váš požadavek na AWS S3 tak, abyste mohli soubor stáhnout přímo z AWS. ERDDAP™ Správci mohou
         [Přečtěte si návod, jak to udělat pro ostatní S3 kbelíky](/docs/server-admin/datasets#working-with-aws-s3-files) . Díky Andymu Zieglerovi a NOAA .
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Věci, které musíte udělat: žádné
         
    * ZLEPŠENÍ: ERDDAP 's metodou ukládání polí řetězců (StringArray) je nyní mnohem efektivnější paměť. String Array se používají po celou dobu ERDDAP™ , zejména při čtení tabulek ASCII datových souborů. Také další změny dělají čtení CSV/TSV/SSV ASCII, sloupcové ASCII a jsonlCSV tabulární datové soubory rychlejší a mnohem efektivnější paměť. Výsledkem je: pro soubor s datovým testem 764 MB ASCII (ale komprimované na 52MB .gz soubor) s 3,503,266 řádků a 33 sloupců, maximální využití paměti šlo z 10GB dolů na 0.6GB (na vrcholu) . Čas číst to šlo z ~7 minut (ale velmi se liší s tím, kolik fyzické paměti je v počítači) až na ~36 sekund (včetně desetin pro zjednodušení () který používá pouze GenerateDatasets Xml) . Mnoho dalších míst v ERDDAP™ bude mít z této zvýšené účinnosti paměti prospěch. Díky Tylaru Murrayovi a Mathewovi Biddleovi.
        
Prozkoumal jsem jiné řešení. (ukládání řetězců v StringArray jako UTF-8-kódovaná pole byte) . To snižuje využití paměti dalších ~33%, ale za cenu zpomalení ~33%. Ve srovnání se systémem, který se nyní používá, to vypadalo jako špatný obchod. Je jednodušší dát počítači více paměti (koupit více paměti za $200) než aby to bylo rychlejší (koupit úplně nový počítač) .
        
Pokud je to pohodlné, je stále dobrý nápad rozdělit obrovské tabulkové datové soubory do několika menších souborů na základě některých kritérií, jako je stationID a/nebo čas. ERDDAP™ často bude muset otevřít pouze jeden z malých souborů v reakci na žádost uživatele, a tak být schopen reagovat mnohem rychleji.
        
    * Teď už ano. [ ERDDAP™ AWS S3 dokumentace](/docs/server-admin/datasets#working-with-aws-s3-files) , Který popisuje, jak se dostat ERDDAP™ pracovat s datovými soubory v kbelících AWS S3.
Také, ERDDAP™ nyní používá nové funkce v AWS S3 Java API.
Také, ERDDAP™ nyní umožňuje AWS S3 URL obsahovat další znaky (perioda, pomlčka, podtržení) v kýblových jménech.
Také, ERDDAP™ nyní vyžaduje, aby AWS S3 kbelík URL byly identifikovány určitým způsobem:
          https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/  
kde je předpona nepovinná.
Díky Andymu Zieglerovi a NOAA .
         
    * ZLEPŠIT: GenerovatNastavení dat Xml nyní léčí další časté missing\\_value s stand-ins jako chybějící hodnoty, a tak je pravděpodobnější převést sloupec na numerický datový typ. Také PrimitiveArray.simplify () Nyní loguje, která konkrétní hodnota dat způsobila, že ji považoval za sloupec řetězců. Díky Mathew Biddle.
         
    * ZLEPŠENÍ:&lt;requestBlacklist&gt; nyní podporuje .\\*.\\*  (nebo:\\*:\\*pro IPv6) na konci IP adres, abyste mohli vymazat větší část IP adres, např. 110.52.\\*.\\*  (Čína Unicom Tianjin) . Viz dokumentace pro [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) Díky China Unicom a China Telecom.
         
    * ZLEPŠENÉ: Pokud zdroj datového souboru nespecifikuje "institution" atribut, GenerateDatasets Xml a loadDataset nyní získat z atributu "creator\\_institution" (je-li k dispozici) . Díky Micahovi Wengrenovi.
         
    * BUG FIX: standardizovat Co nebylo vždy aplikováno na datové soubory ASCII.
Také, EDDTable správně neřešil omezení časových hodnot, když zdroj měl String časové hodnoty a standardizovat Co bylo použito.
Díky Paloma de la Vallee.
        
Neřekl jsem to jasně předtím: měl bys použít standardizaci. Jaké funkce, když je skutečně potřebujete (např. když různé zdrojové soubory ukládají hodnoty času různými způsoby) , protože některé žádosti o soubory údajů, které používají standardizaci Co bude zpracováno trochu pomaleji.
        
    * BUG FIX: Chyba v kódu použitém EDDGrid FromNcFiles způsobil, že selhal s .nc 4 a .hdf 5 souborů, které mají "dlouhé" (int64) proměnné. Tohle je teď spravené. Díky Friedemann Wobus.
         
    * BUG FIX: Malé změny souborů ISO 19115, aby byl jiný validátor spokojen. Díky Chrisi MacDermaidovi a Anně Milanové.
         

## Verze 2.01{#version-201} 
 (vydal 2019-07-02) 

*    **Nové funkce a změny (pro uživatele) :** 
    * Žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * BUG FIX: Chyba v kódu, který generuje formulář pro přístup k datům tabledap Soubory dat způsobily, že webová stránka byla pro některé soubory dat prázdná. Také jsem zlepšil manipulaci s neočekávanými chybami na všech HTML stránkách, takže budou (obvykle) zobrazí chybovou zprávu. Díky Marcovi Albovi.
    * ZLEPŠIT: GenerovatNastavení dat Xml již nevytiskne zdlouhavé varování na vrcholu výstupu. Místo toho, prosím, podívejte se [Editace generování Datové soubory Xml výstup](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Díky Stevenu Baumovi.
    * ZLEPŠIT: GenerovatNastavení dat Xml nyní poskytuje mírně odlišná doporučení v různých situacích pro&lt;updatEveryNMillis&gt; pro EDD...From...Files datacases. Také generovatDatasety Xml nyní odrazuje původní "extrahovací" systém pro datové soubory EDDTableFromFoles.

## Verze 2.00{#version-200} 
 (propuštěn 2019-06-26) 

*    ** ERDDAP™ V2.00 je konečně tady&#33; Jo&#33;**   
     
    * Omlouváme se za dlouhé zpoždění potřebné k dokončení této verze.
Díky za trpělivost.
         
    * Dobrá zpráva je, že čas navíc byl použit k přidání více funkcí, které uživatelé požadovali. Špatnou zprávou je, že i přes zpoždění, ne všechny požadované funkce byly přidány. Omlouváme se, ale zdálo se mi důležitější dostat tohle propuštění ven, než oddálit víc. (Navždy?) neustále přidávat nové funkce. Slibujeme, že se v budoucnu vrátíme k častějším verzím.
         
    * "Verze 2?&#33; Existují velké změny a inkompatibility?"
Velké nové rysy? Ano.
Velké inkompatibility nebo změny pro administrátory nebo uživatele? Ne.
Skočili jsme z v1.82 na v2.00:
        * částečně oslavit 10 let (Nyní 11) od prvního zveřejnění ERDDAP™   (v1.00 dne 2008-05-06, který navenek vypadal pozoruhodně jako v2.00) . V té době, ERDDAP™ přešla z jednoho zařízení na téměř 100 zařízení ve 12 zemích (Austrálie, Belgie, Kanada, Francie, Indie, Irsko, Itálie, Jihoafrická republika, Španělsko, Thajsko, Spojené království, USA) .
        * částečně označovat hlavní doplněk zcela novým směrem: ERDDAP™ nyní má data ingest systém, který se bude hodit ke stávajícím službám datového serveru (viz [EDDTableFromHttpGet](#eddtablefromhttpget) ) ,
        * A částečně proto, že to nebyl velký skok z 1.82 na 2.00 číselně, takže tohle vypadalo jako správný čas.
             
    * Další dobrou zprávou je, že nyní existují dvě další skupiny přispívající kód ERDDAP™   (v této verzi a s indikacemi budou pokračovat) : Rob Fuller a Adam Leadbetter z irského námořního institutu a Roland Schweitzer z PMEL a Weathertop Consulting. Děkuji mnohokrát. Je pravda, že pracují na projektech podle vlastního výběru, ale to je klasický vývojový model open-source - skupiny přispívají kód pro funkce, které by nejvíce chtěli vidět přidány. Přidaná výhoda pro přispěvatele: začnou používat nové funkce, jakmile skončí; nemusí čekat na další vydání ERDDAP . Vaše skupina je také vítána, aby přispěla&#33; Viz [ ERDDAP™ Průvodce programátorem](/docs/contributing/programmer-guide) .
         
    * Doufáme, že se vám bude líbit. ERDDAP™ V2.00. Těšíme se na dalších 10 let ERDDAP™ rozvoj a stále větší využití po celém světě.
         
*    **Nové funkce a změny (pro uživatele) :**   
     
    * NEW: orderByMean filtr
místo tabledap Datové soubory vypočítají prostředky pro určené skupiny. Také, všechny orderBy Možnosti nyní podporují další způsob definování skupin: _numerickýVariable \\[ /číslo \\[ timeUnits \\]  \\[ :offset \\]  \\] - např. čas/1 den nebo hloubka/10:5. Například, stationID , čas, vodaTemp& orderByMean  (" stationID , čas/1 den") seřadit výsledky podle stationID a čas, pak vypočítat a vrátit průměr vodyTemp pro každý stationID za každý den. To jsou pozoruhodně užitečné a silné nové rysy. Nový kód pro tyto funkce a změny starého kódu přispěl Rob Fuller a Adam Leadbetter z irského námořního institutu a předložil prostřednictvím Git. Děkuji. Rob a Adam&#33;
         
    * NOVINKA: typ výstupního souboru pro soubor tabulky: [.data Tabulka](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
JSON soubor formátovaný pro použití s Google Visualization knihovna klientů ( Google Charts ) . Kód k tomu přispěl Rolandem Schweitzerem a předložil jej prostřednictvím Gitu. Děkuji. Rolande&#33;
         
    * NOVINKA: typ výstupního souboru pro soubor tabulky: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
který je jako existující .jsonlCSV možnost, ale s názvy sloupců na prvním řádku. Díky Eugenovi Burgerovi.
         
    * NOVINKA: Pokud to administrátor dovolí, uživatelé se nyní mohou přihlásit svým [ORCID](https://orcid.org) Účet.
Jedná se o ověřovací systém OAuth 2.0, podobně jako autentizace Google. ORCID je široce používán výzkumníky k jedinečné identifikaci. Účty ORCID jsou zdarma a nemají problémy s soukromím, které Google účty mají. Viz ERDDAP 's [Pokyny pro ověřování orcid](/docs/server-admin/additional-information#orcid) . Díky BCO-DMO (Adam Shepard, Danie Kinkade atd.) .
         
    * NOVINKA: Nový URL převodník přeměňuje mimoaktuální URL adresy na aktuální URL adresy.
Viz .../erddap/convert/urls.html na všech ERDDAP™ instalace, např.
         [Tento odkaz na převodník v ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . To by mělo být užitečné pro správce dat. Používá se také interně pomocí GenerateDatasetsXml. Díky Bobovi Simonsovi a Sharon Mesickové.
         
    * ZLEPŠENÉ: [Časový převodník](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) Nyní má možnosti převést libovolný společný čas řetězce na ISO8601 string čas, nebo převést UDUNITS -jako časové jednotky navléknout do správné UDUNITS Časové jednotky řetězec. To by také mělo být užitečné ERDDAP™ Správci, kteří potřebují vědět, jaký formát zadat pro atribut "jednotky" pro proměnné času řetězce. To se také používá interně prostřednictvím GenerateDatasetsXml a standardizovatCo funkce EdDtableFromFoles. Díky Bobovi Simonsovi.
         
    * NEW: [Převodník jednotek](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) má novou možnost "Standardizace UDUnits."
Například "deg\\_C/m" a "degrees\\_C metres-1" jsou obě převedeny na
"stupeň\\_C m-1." Tato funkce je také využívána standardizouCo funkce EDDTableFromFoFoles. Díky Bobovi Simonsovi.
         
    * Novinka: Pro grafy (jiné než povrchové grafy) na Griddapu a tabledap 's Make A Graph webové stránky, když osa x není časová osa, pokud je viditelná pouze podmnožina rozsahu proměnné osy x, jsou nyní tlačítka nad grafem pro posun osy X doleva nebo doprava. Díky Carrie Wall Bell / Hydrophone projekt.
         
    * Novinka: Pro grafy může nyní osa X a/nebo Y použít stupnici záznamu.
Uživatelé mohou Měřítko Y Axis ovládat pomocí nového pad-down widgetu na griddap a tabledap Vytvořit grafické webové stránky. Viz [.xRange a . yRange dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Díky Carrie Wall Bell / Hydrophone projekt.
         
    * ZLEPŠENÍ: ERDDAP™ Nyní lépe využívá různých chybových kódů HTTP a nyní vrací(OPeN)DAPv2.0-formátovaná chybová zpráva užitečné. Viz [podrobnosti](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Díky Antoine Quericovi a Aurelii Briandové.
         
    * IMPROVED: Nepoužívejte Netcdf-java/c nebo jiné softwarové nástroje pro připojení k .nc nebo .hdf soubory podávané ERDDAP 's /soubory/ systém, jako by to byly místní soubory. ERDDAP™ Nyní tyto žádosti odmítá. Je strašně neefektivní a často způsobuje i jiné problémy. Místo toho:
        
        * Použití(OPeN)DAPklientský software pro připojení k ERDDAP 's DAP služby pro datový soubor (které mají /griddap/ nebo / tabledap / v URL) . To je ono. DAP je pro a dělá tak dobře.
        * Nebo použijte formulář pro přístup k datům datového souboru k žádosti o podmnožinu dat.
        * Nebo, pokud potřebujete celý soubor nebo opakovaný přístup po dlouhou dobu, použijte curl , wget , nebo váš prohlížeč ke stažení celého souboru, pak přístup k datům z místní kopie souboru.
        
          
         
    * ZLEPŠENÉ: ERDDAP™ homepage, Full Text Search is now above "View a List of All Datasets," protože to je nejlepší výchozí bod pro většinu uživatelů. Díky Didier Mallarino a Maurice Libes.
         
    * ZLEPŠENÍ: Na DataProviderForm3.html Teď jsou tady seznamy společných míst. standard\\_name s. Díky někomu na schůzi IOOS DMAC.
         
    * IMPROVED: Na webových stránkách /files/ je nyní odkaz na nový "Co mohu dělat s těmito soubory?" oddíl /files/ dokumentace. Tato sekce popisuje různé typy souborů a dává návrhy, jak s nimi pracovat. Díky Maurice Libesovi.
         
    * Téměř každý požadavek na ERDDAP™ Měl by být alespoň trochu rychlejší a někdy mnohem rychlejší.
         
    * BUG FIX: Za určitých okolností, když soubor údajů EDDTable ukládá data v některých typech .nc soubory, globální atribut "id" byl nastaven na navrhovaný název souboru, který zahrnuje hash, aby byl jedinečný pro tuto žádost. Nyní je "id" správně ponecháno beze změny (je-li uvedeno) nebo nastaven na soubor údajů datasetID   (není-li uvedeno) . Díky Johnu Maurerovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * TO DO: Toto vydání bude chvíli trvat a pracovat od vás. Buďte prosím trpěliví a plánujte několik hodin na provedení požadovaných změn a několik hodin na experimentování s novými funkcemi.
         
    * TO DO: Pro bezpečnost udělejte záložní kopii aktuálního nastavení.xml a datasets.xml Soubory, abyste se k nim mohli vrátit v nepravděpodobném případě, kdy potřebujete vrátit ERDDAP™ v1.82.
         
    * DO: Doporučené Java je nyní AdopOpenJDK OpenJDK 8 (LTS) + HotSpot.
Jedná se o open source variantu Java které nemá žádná omezení pro jeho použití (na rozdíl Oracle 's Java distribuce) . Je odvozena z Oracle 's Java probíhajícím způsobem, Oracle 's požehnáním. Z bezpečnostních důvodů je důležité, aby vaše Java aktuální verze. Viz ERDDAP 's [ Java Návod k instalaci](/docs/server-admin/deploy-install#java) .
         
    * DO: APPOpenJDK Java potřebuje malý doplněk k instalaci Tomcat: viz [Zdroje Cache pokyny](/docs/server-admin/deploy-install#contentxml) . Myslím, že je to náhrada za nastavení -XX:MaxPermSize, které (Přijmout) OpenJDK již nepodporuje.
         
    * DO: Nové výchozí a doporučit&lt;fontFamily&gt; nastavení v setup.xml je
DejaVu Sans, které jsou zabudovány do AdoptOpenJDK Java . Viz
         [revidované pokyny pro instalaci písma](/docs/server-admin/deploy-install#fonts) .
         
    * DO: Mnoho značek se pohybuje od nastavení.xml do datasets.xml . Výhodou je, že můžete změnit jejich hodnoty, zatímco ERDDAP™ běží, bez restartu ERDDAP . Jednoduše se můžete změnit.&lt;spustitBodyHtml5&gt; pro zobrazení dočasné zprávy na ERDDAP™ domovská stránka (např. "Podívejte se na nový soubor dat JPL MUR SST v4.1 ..." nebo "Toto ERDDAP™ bude offline pro údržbu 2019-05-08T17:00:00 PDT až 2019-05-08T20:00:00 PDT.") . Pokud změníte tyto značky v datasets.xml , změny nabudou účinku příště ERDDAP™ čte datasets.xml .
         
        
        1. Zkopírujte tento obsah do svého datasets.xml soubor (kdekoliv v blízkosti začátku souboru, po&lt;erddapDatasets&gt;:
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

        2. Jeden po druhém, zkopírujte hodnotu (pokud existuje) pro každý z těchto značek ze souboru setup.xml do nové značky, kterou jste právě vložili (nad) v datasets.xml . Například, pokud jste použili hodnotu 30 pro&lt;cacheMinutes&gt; v setup.xml, měli byste zkopírovat tuto hodnotu do nového&lt;cacheMinutes&gt; tag in datasets.xml   (I když je hodnota stejná jako nová výchozí hodnota, je nejlepší nechat tag v datasets.xml prázdný) .
            
Pokud se vaše hodnota liší od nového navrhovaného výchozího (jiného než pro&lt;startBodyHtml5&gt; a&lt;ShortDescriptionHtml&gt;, které jsou užitečné pro přizpůsobení ERDDAP™ instalace), prosím zvažte přechod na nové výchozí hodnoty. To platí zejména o&lt;parciálníRequestMaxBytes&gt; a&lt;particularRequestMaxCells&gt;, kde se v průběhu let výrazně změnila výchozí/souvislá hodnota.
            
Poté, co zkopírujete každou hodnotu, smažte značku a její popis z setup.xml. Je lepší mít tyto značky v datasets.xml . A teď jsou lepší popisy v [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Vtip nového systému je, že úplně první webová stránka při spuštění ERDDAP bude výchozí ERDDAP™ webové stránky. Každá následující webová stránka bude používat ... Html obsah, ve kterém zadáte datasets.xml .
        
    * UPOZORNĚNÍ: Poprvé utíkáš ERDDAP™ v2.0, datové soubory založené na místních datových souborech se načítají **velmi** pomalu, protože ERDDAP™ potřebuje obnovit svou databázi souborů v trochu jiném formátu. Po pomalé počáteční reload, budou nabíjet rychle, jako předtím. Prosím, buď trpělivý.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *    [BIG NEW FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)   
Až do teď, ERDDAP™ stačí číst data a zpřístupnit je uživatelům. Teď, ERDDAP™ má jednoduchý, efektivní systém pro požití dat v reálném čase ze senzorů. Tento datový soubor mimo jiné nabízí jemné zpracování verzí: pamatuje si každou změnu datového souboru, kdy byl proveden a kým. Obvykle budou uživatelé chtít jen nejnovější verzi datového souboru, se všemi použitými změnami. Ale existuje možnost, aby uživatelé požadovali data z datového souboru tak, jak tomu bylo kdykoli. To usnadňuje opakovatelnost vědy. Na rozdíl od většiny jiných datových souborů v reálném čase jsou tedy tyto datové soubory způsobilé pro [ DOI án](https://en.wikipedia.org/wiki/Digital_object_identifier) . Protože se scházejí DOI požadavek, že soubor údajů se nemění, s výjimkou agregací. Viz [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Díky OOI (dávno a teď) promluvit o potřebě tohoto a Eugene Burger pro připomenutí o práci na tom, co je důležité.
         
    * Big New Fature: ERDDAP™ nyní mohou sloužit data přímo z externě komprimovaných datových souborů, včetně .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 Datasety mohou zahrnovat kombinaci externě komprimovaných souborů (Možná starší datové soubory?) a neexterně komprimované soubory, a můžete komprimovat / dekompresovat soubor kdykoliv.
        
Tohle funguje skvěle&#33;
Ve většině případů je zpomalení spojené s dekompresí souborů menší. Důrazně vás vybízíme, abyste to zkusili, zejména pokud jde o soubory dat a/nebo datové soubory, které jsou často používány.
        
To vám může ušetřit $30,000 a více&#33;
Tohle je jeden z mála. ERDDAP™ funkce, které vám mohou ušetřit spoustu peněz - pokud komprimujete mnoho datových souborů, budete potřebovat mnohem méně RAID/hard disků pro uložení dat, nebo naopak, můžete sloužit mnohem více dat (až do 10x) s RAID, které už máte. Pokud vás tato funkce ušetří před nákupem jiného RAIDu, ušetřila vám asi 30 000 dolarů.
        
Viz [Vnější dokumentace komprimovaných souborů](/docs/server-admin/datasets#externally-compressed-files) . Díky Benoit Perrimond a Paloma de la Vallee.
        
    * Big New Fature: Všechny EDDGrid FromFiles a všechny soubory EDDTableFromFoles podporují a&lt;cacheFromUrl&gt; tag a&lt;cacheSizeGB&gt; tag. Pokud cacheSizeGB není zadána, bude to stahovat a udržovat úplnou kopii souborů vzdáleného datového souboru. Pokud je cacheSizeGB zadána a je &gt;0, stáhne se soubory ze vzdáleného souboru podle potřeby do místní cache s omezenou velikostí, která je užitečná při práci s cloudem (např. S3) datové soubory. Viz [cache FromUrl dokumentace](/docs/server-admin/datasets#cachefromurl) pro detaily. Díky Bob Simons a Roy Mendelssohn (kteří po léta psali skripty, aby zvládli vytváření místních kopií souborů se vzdálenými soubory dat) Lloyd Cotten, Eugene Burger, Conor Delaney (když byl na Amazon Web Services) , a Google Cloud Platform.
         
    * Novinka: Nový EDDTableFromJsoniCSV třída může číst tabulární data z
         [JSON Řádky CSV souborů](https://jsonlines.org/examples/)   ("Lepší než CSV") . Díky lidem z Mořského institutu Irska za to, že mi řekli o tomto formátu a Eugene Burger a PMEL za žádost o podporu jako vstupní typ.
         
    * NEW: EDDGrid a všechny datové soubory EDDTableFromFoles podporují&lt;nThreads&gt; nastavení, které říká ERDDAP™ kolik vláken použít při reakci na žádost. Viz [dokumentace nThreads](/docs/server-admin/datasets#nthreads) pro detaily. Díky Robu Bochenkovi z Axiom Data Science, Eugene Burger, Conor Delaney (když byl na Amazon Web Services) , a Google Cloud Platform.
         
    * Nový standard Co pro všechny podtřídy EDDTableFromFoles -
Dříve, pokud pro danou proměnnou, hodnoty důležitých atributů (např. scale\\_factor , add\\_offset , missing\\_value , \\_FillValue, jednotky) nebyly konzistentní, EDDTableFromFoles by vybrat jednu hodnotu pro každý atribut být "platný" a označit soubory s jinými atributy hodnoty jako "Špatné soubory." Nyní existuje systém pro standardizaci souborů, jakmile EDDTableFromFoles přečte soubory. Viz [EDDTableFromFile standardizuje Co?](/docs/server-admin/datasets#standardizewhat) . Jeden z ERDDAP 'je hlavním cílem je zpřístupnit datové soubory a datové soubory důsledně. standardizovat Co je důležitý nový nástroj, aby se to stalo skutečností. Díky Marco Alba, Margaret O'Brien (a další uživatelé EML) , BCO-DMO a InPort uživatelé.
         
    * NEW EDDTableFromNeplatnéCRAFile vám umožní vytvořit soubor dat ze sbírky NetCDF   (V3 nebo v4)   .nc soubory, které používají specifický, neplatný, varianta CF DSG Contiguous Ragged Array (CRA) Složky. Ukázky souborů pro tento typ souboru lze nalézt nahttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Tento server není nyní spolehlivě dostupný \\] . I když ERDDAP™ podporuje tento typ souboru, je to neplatný typ souboru, který by nikdo neměl používat. Skupiny, které v současné době používají tento typ souboru, jsou důrazně vybízeny k používání ERDDAP™ generovat platné soubory CF DSG CRA a přestat používat tyto soubory. Díky Ajayi Krishnanovi a Timu Boyerovi.
         
    * EDDTableFromThrreddsFiles and EDDTableFrom Hyrax Soubory jsou nyní deprekovány. Přepněte na EDDTableFromNcFiles (nebo varianta) plus&lt;cacheFromUrl&gt;. Pokud to z nějakého důvodu nefunguje, email erd.data at noaa.gov . Pokud před rokem 2020 neexistují žádné stížnosti, mohou být tyto typy souborů údajů odstraněny.
         
    * ZLEPŠENÉ... Systém pro automatický převod non-ISO 8601 krát na ISO 8601 krát (zavedeno v bodě v1.82) byl značně rozšířen, aby se zabýval velkým počtem dalších formátů. To ovlivňuje GenerateDatasetsXml a ERDDAP 's nakládáním se zdrojovými metadaty.
         
    * ZLEPŠENÉ... Se svou třetí zásadní revizí systému pro analýzu času stringu (a doufám, že poslední) , ERDDAP™ používání Java 's DateTimeForhmota kvůli chybám, které někdy ovlivňují extrémní časy (roky&lt;=0000). ERDDAP™ Nyní používá svůj vlastní systém pro analýzu časových řetězců.
         
    * UPOZORNĚNÍ: Nový systém pro analýzu času strun je poněkud přísnější. Pokud má jeden z vašich souborů najednou pouze chybějící hodnoty pro časové hodnoty, příčina je téměř jistě, že řetězec časového formátu je mírně špatně. V logu by měly být chybové zprávy. txt související s hodnotami času, které se neshodovaly s časovým formátem -- to by vám mělo pomoci opravit řetězec časového formátu pro tento datový soubor. Pokud potřebujete pomoc, použijte možnost ERDDAP 's Time Converter, který "Convert \\[ án \\] jakýkoli společný čas řetězce do doby řetězce ISO 8601 -- označuje formát, který převodník použil k analýze zdrojového řetězce.
         
    * DOPORUČENÍ: nejrychlejší, nejjednodušší a nejlevnější způsob, jak urychlit ERDDAP 's přístupem k tabulkovým datům je vložení datových souborů na Solid State Drive (SSD) . Většina tabulkových souborů je relativně malá, takže 1 nebo 2 TB SSD pravděpodobně stačí k držení všech datových souborů pro všechny vaše tabulární soubory. SSD se nakonec opotřebuje, pokud zapíšete data do buňky, smažete je a napíšete nová data do této buňky příliš mnohokrát. Místo toho doporučuji (co nejvíce) stačí použít svůj SSD pro zápis dat jednou a přečíst mnohokrát. Pak by i SSD třídy spotřebitelů mělo vydržet velmi dlouho, pravděpodobně mnohem déle než jakýkoli diskový disk. (HDD) . SSD třídy spotřebitelů jsou nyní levné (v roce 2018, ~200 dolarů za 1 TB nebo ~400 dolarů za 2 TB) a ceny stále rychle klesají. Kdy? ERDDAP™ přístup k datovému souboru, SSD nabízí oba
        
        * kratší latence (~0.1ms, versus ~3ms pro HDD, versus ~10 (?) ms pro RAID, versus ~55ms pro Amazon S3) a
        * vyšší propustnost (~500 MB/S, versus 75 MB/s pro HDD versus 500 MB/s pro RAID) .
        
Takže se můžete dostat až na zvýšení výkonu ~10X (vs a HDD) za 200 dolarů&#33; Ve srovnání s většinou dalších možných změn vašeho systému (Nový server za 10 000 dolarů? Nový RAID za 35 000 dolarů? nový síťový spínač za 5000 dolarů? atd.) , To je zdaleka nejlepší návratnost investic (ROI) . Pokud váš server není nabit pamětí, další paměť pro váš server je také skvělý a relativně levný způsob, jak urychlit všechny aspekty ERDDAP .
         \\[ SSD by byla skvělá i pro roštovaná data, ale většina dat je mnohem větší, takže SSD je velmi drahé. \\]   
         
    * NEW: Každý, kdo je přihlášen, dostane roli= \\[ Kdokoliv Přidán In \\] , i když není&lt;tag pro uživatele _BAR_ datasets.xml . Pokud nastavíte soubor dat&lt;accessedTo&gt; to \\[ Kdokoliv Přidán In \\] , pak každý, kdo se přihlásil ERDDAP™   (např. prostřednictvím svého Gmailu nebo účtu Orcid) bude oprávněn přístup k datovému souboru, i když jste nespecifikovali&lt;tag pro uživatele _BAR_ datasets.xml . Díky Maurice Libesovi.
         
    * ZLEPŠENÉ: UDUNITS /UCUM převodník jednotek byl značně vylepšen.
Zvládá neplatné jednotky lepší řetězce (začínající s důrazem na zachování informací, namísto prosazování platnosti) . Výsledky mají také standardizovanou syntaxi.
         
    * NEW: UDUNITS /UCUM jednotky převodník má novou možnost standardizovat a UDUNITS Provaz.
To funguje dobře pro platné UDUNITS řetězce a přiměřeně dobře pro nestandardní / neplatné UDUNITS Struny. Například: UDUNITS = "metry za sekundu," "metr za sekundu," "m.s^-1" a "m s-1" všichni vrátí "m.s-1." To bylo potřeba pro novou standardizaci Jaký systém je popsán výše. Díky Marco Alba, Margaret O'Brien (a další uživatelé EML) , BCO-DMO a InPort uživatelé.
         
    * Novinka: EDDTableFromMultidimNcFiles má nyní [léčbaRozměryAs](/docs/server-admin/datasets#treatdimensionsas) možnost, která říká ERDDAP™ k léčbě určitých rozměrů (např. LAT a LON) jako by byly jiné dimenze (např. čas) . To je užitečné pro některé nesprávné soubory, které používají různé rozměry pro různé proměnné, když měly použít pouze jeden rozměr (např. čas) . Díky Marco Alba a Maurice Libes.
         
    * NEW: EDDGrid Z...Filové soubory podporují novou speciální osu sourceName který říká ERDDAP™ extrahovat informace ze souboruName (jen filename.ext) a použít hodnotu k **nahradit** stávající hodnota levé osy. Formát je
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Viz [Tato dokumentace](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Díky NOAA Databáze denní agregace Pathfinder.
         
    * NEW: EDDGrid Z...Filové soubory podporují novou speciální osu sourceName který říká ERDDAP™ k získání informací z cesty souboruName (Adresáře + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Pro to, název cesty vždy používá '/' jako znak oddělovače adresáře, nikdy '\\'.
Viz [Tato dokumentace](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Díky Paloma de la Vallee.
         
    * A teď, všechny EDDTableFrom... Soubory souborů podporují další pseudo proměnnou sourceName s, který extrahuje informace ze souboru (jen filename.ext)   (viz [\\*\\*\\* název souboru](/docs/server-admin/datasets#filename-sourcenames) ) nebo z celého jména souboru (/dir1/dir2/filename.ext)   (viz [\\*\\*Jméno cesty](/docs/server-admin/datasets#pathname-sourcenames) ) . Díky Paloma de la Vallee.
         
    * NEW: EDDGrid Soubor dat má jeden nebo více velmi velkých rozměrů (Například miliony hodnot) který zabere hodně paměti, můžete nastavit nový [&lt;dimensionValuesInMemory&gt;] (/docs/server-admin/datasets#dimensionvalueinmemory) nastavení na false (výchozí hodnota je pravdivá) , což způsobí, že datový soubor uloží hodnoty na disk a v případě potřeby je získá. Díky Davidu Rodriguezovi a Richi Signellovi (re: EDDGrid FromAudioFiles) .
         
    * V minulých dílech jste viděli... dataVariable s pro datový soubor EDDTableFromFoles a znovu načíst datový soubor, EDDTableFromFoles by znovu přečíst všechny datové soubory. Nyní se může vypořádat s přeobjednáním bez přečtení všech datových souborů. Díky Rolandu Schweitzerovi.
         
    * Teď, když ERDDAP™ čte ASCII, NCCSV a JSON Lines CSV tabulkové datové soubory, pokud zjistí chybu na daném řádku (např. nesprávný počet položek) , zaznamenává varovný signál ("Přeskočit čáru, nečekaný počet položek...") do [log.txt soubor](/docs/server-admin/additional-information#log) a dále čte zbytek datového souboru. Je tedy vaší povinností pravidelně se dívat (nebo k tomu napsat scénář) pro tuto zprávu v deníku. txt tak, že můžete opravit problémy v datových souborech. ERDDAP™ je nastaven tak, aby uživatelé mohli i nadále číst všechny dostupné platné údaje, i když některé řádky souboru mají nedostatky. V minulých dílech... ERDDAP™ soubor označil jako "špatný" a odstranil jej z datového souboru.
         
    * V přesných časech (např. na nejbližší sekundu nebo milisekundu) jsou uloženy u zdroje jako "minuty od ..." (nebo větší jednotky) , ERDDAP™ Nyní je zaokrouhlí na nejbližší milisekundu při čtení hodnot do ERDDAP . V opačném případě jsou čísla plovoucích bodů modřina a požadavky na data v určitých časech (např., &time=2018-06-15T01:30:00) selže. Dříve je vypočítal co nejpřesněji. (a stále to dělá, pokud jsou jednotky např. "druhé od ..." nebo "milisekundy od ...") . Nejlepší je vyhnout se tomuto problému pomocí velkých jednotek (např. minuty nebo hodiny) uložit přesné časové hodnoty (např. mikrosekundy) -- počítače dělají špatnou práci při zpracování desetinných čísel. Díky Marcovi Albovi.
         
    * ZMĚNY NA EDDTableFrom EDDGrid což je mnohem lepší. EDDTableFrom EDDGrid Umožňuje uživatelům dotazovat se mřížkované soubory dat, jako by to byly tabulární soubory dat ("Query by value") .
        
        * Nyní podporuje&lt;maxAxis0&gt; tag (výchozí=10) který určuje maximální počet os \\[ 0 \\]   (obvykle "time" ) hodnoty, které mohou být dotazovány najednou. To brání naivním požadavkům získat z EDDTableFrom EDDGrid prohledat celý datový soubor sítě (která by selhala s chybou timeout) .
        * Generovat soubory dat Xml má nyní možnost generovat EDDTableFrom EDDGrid Soubory údajů pro všechny datové soubory v dané síti ERDDAP™ který odpovídá stanovenému regexu (použít .\\* pro porovnání všech souborů dat) . Soubory údajů, které vytváří, mají další informace v souhrnném atributu, které naznačují, že se jedná o tabulární verzi mřížkovaného datového souboru. A jejich datasetID je datasetID z mřížkovaného souboru, plus "\\_AsATable."
        * K dispozici je velká rychlost pro nejčastější nastavení: když mřížkovaný datový soubor je EDDGrid FromErddap soubor, který je ve stejném ERDDAP .
        
Díky Jamesi Gallagherovi a Edu Armstrongovi.
         
    * NEW: generovat Datové soubory Xml pro všechny typy souborů dat je nyní mnohem pravděpodobnější přidat \\_FillValue nebo missing\\_value atribut numerické proměnné addAttributes . K tomu například dochází, když řetězec chybí hodnoty markerů (Například, "," "," "?" "NA," "nd," "NaN") pro tuto proměnnou ve výběrovém souboru jsou převedeny na ERDDAP 's nativní chybějící hodnoty (127 ve sloupcích bajtů, 32767 v krátkých sloupcích, 2147483647 ve sloupcích 9223372036854775807 v dlouhých sloupcích a NaN v float a double proměnných) . Nastává také pro hodnoty NaN v float a dvojitých proměnných. Také "nd" bylo přidáno do seznamu společných chybějících hodnot markerů v číselných datových sloupcích, které ERDDAP™ Měli bychom hledat. Díky Matt Biddle z BCO-DMO.
         
    * IMPROVED: možnost ncdump v generování Datové soubory Xml je teď spíš ncdump. (ale stále používá netcdf-java verzi ncdump) . Vytiskne nový seznam možností. Teď... .nc ml soubory, tiskne výstup ncdump pro výsledek .nc Změny souborů v ml použité na podklad .nc nebo .hdf Složka.
         
    * BUG FIX: Byla tam úniková karta. (nakonec způsobit ERDDAP™ zmrazit) způsobené při vytváření některých typů výstupních souborů, např. .geotif, zejména když došlo k chybám během tvorby. Doufám, že už je všechno v pořádku. Pokud stále vidíte problémy, prosím, řekněte mi typ datového souboru (mřížka nebo tabulka) a typ souboru, který způsobuje problém. Díky Stevenu Bealeovi, Lynn DeWitt, Jibei Zhao a dalším.
         
    * BUG FIX: The WMS   Leaflet Demo úplně/vhodně nepřevedlo "hloubkovou" osu na "výstup." Teď už ano, a rozbité žádosti o legendu jsou vyřešeny. Také všechny možnosti os v seznamech drop-down jsou vždy ve vzestupném pořadí. Díky Antoine Quericovi a Aurelii Briandové.
         
    * BUG FIX: EDDTableFromFuls nyní správně podporuje omezení na String proměnné, které byly vytvořeny z znakových proměnných v datových souborech. Díky Antoine Quericovi a Aurelii Briandové.
         
    * BUG FIX: Nyní, když se soubor dat stane nedostupným, se soubor údajů snaží oznámit (se zprávou "Tento datový soubor je momentálně nedostupný.") její předplatitelé, uvedené akce, rss a lonPM180 datové soubory, které na ně spoléhají. Díky Royi Mendelssohnovi a Bobovi Simonsovi.
         
    * BUG FIX: Dvě chyby související s EdDtableCopy. Díky Samu McClatchiemu.
         
    * IMPROVED: Počet neúspěšných žádostí uvedených na stránce status.html se zvýší, protože více věcí se počítá jako selhání než dříve.
         
    * ZLEPŠENÍ: ERDDAP 's status.html nyní ukazuje "Žádosti (střední doba v ms) "v časové řadě. Dříve to ukázalo medián krát zkrácený na celé sekundy.
         
    * IMPROVED: V jsonld výstupu, jsonld "jméno" nyní pochází z souboru "title" v ERDDAP , a jsonld "headline" nyní pochází z datového souboru " datasetID "v ERDDAP . Dříve to bylo obráceně. To se mi zdá špatné, protože při běžném používání angličtiny je "jméno" obvykle krátké, (ideálně) jedinečný identifikátor, který se zřídka / nikdy nemění (např. Robert Middlename Simons) , není popis, který není jedinečný a který může snadno a často změnit (např. "Chlap, který píše software pro NOAA "Vs. "Vysoký chlap, který píše software pro NOAA ") . Páni, bylo by skvělé, kdyby schema.org definice [Název](https://schema.org/name) , v souvislosti s Dataset, byly konkrétnější. Vývojáři softwaru by měli mít možnost napsat implementaci specifikace založené pouze na specifikaci bez pokynů odborníků. Ale já se vzdám Google (zejména Natasha Noy) , NCEI (zejména John Relph) , a Rob Fuller.
         
    * IMPROVED: V jsonld výstupu, čtyři "spatialCoverage GeoShape box" hodnoty jsou nyní minLat minLon maxLat maxLon. V minulých dílech jste viděli: Páni, bylo by skvělé, kdyby schema.org definice [GeoShape](https://schema.org/GeoShape) zadáno správné pořadí. Vývojáři softwaru by měli mít možnost napsat implementaci specifikace založené pouze na specifikaci bez pokynů odborníků. Díky Natasha Noyové a Robu Fullerovi.

## Verze 1.82{#version-182} 
 (propuštěno 2018-01-26) 

*    **Nové funkce (pro uživatele) :**   
     
    * Četné jemné změny vzhledu a pocitu ERDDAP™ webové stránky.
        * ZLEPŠENÍ: ERDDAP™ nyní používá HTML 5 a lépe využívá CSS.
        * IMPROVED: Webové stránky byly mírně upraveny tak, aby byly čistší a méně "vytížené." (Jsou stále husté a stále existují věci, na které by si člověk mohl stěžovat, ale doufejme, že mnohem méně než předtím.) Díky Johnu Kerfootovi za nějaké komentáře.
        * IMPROVED: Webové stránky nyní vypadají mnohem lépe na mobilních telefonech a dalších malých zařízeních, zejména pokud je používáte v krajinné orientaci. Vypadají také lépe ve velmi malých a velmi velkých oknech v stolních prohlížečích.
        * IMPROVED: Pro zlepšení bezpečnosti a dalších důvodů použití zastaralé verze Openlayers pro WMS stránky byly nahrazeny Leaflet .
        * NOVINKA: podpora náhledů obrázků, audio a video souborů v "files" systém (například: [Tento soubor údajů o zkoušce](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) a .htmlTable odpovědi, pokud má buňka URL obrazu, zvuku nebo video souboru (například: [tato žádost](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Pokud se vznášíte nad ikonou '?', měli byste vidět obrázek, audio, nebo video soubor náhled. Můžete také kliknout na odkaz souboru pro zobrazení celého souboru ve vašem prohlížeči. Viz [Dokumentace mediálních souborů](/docs/server-admin/datasets#media-files) . Všimněte si, že různé prohlížeče podporují různé typy souborů, takže příklady nemusí fungovat ve vašem prohlížeči.
Díky těmto lidem / odkazy pro nápady a vzorový kód pro CSS-pouze obrazové tipy (vhttps://codepen.io/electricalbah/pen/eJRLVd) a odložené načítání obrazu (vhttps://varvy.com/pagespeed/defer-images.html)   (i když kód byl před použitím upraven ERDDAP ) .
Díky Cara Wilson, Matthew Austin, a Adam Shepherd / BCO-DMO za žádosti o podporu obrazu.
Díky Jim Potemra, Rich Signell, OOI, a Carrie Wall Bell za žádosti o podporu souborů audio/hydrofon.
Díky OOI za ukázku potřeby video podpory.
        * NEW: Podmnožina dat z jakéhokoliv ERDDAP™ Soubor údajů (ale obvykle soubor z audio souborů) lze nyní uložit do .wav audio souboru. ( [Dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Díky Jim Potemra, Rich Signell, OOI, a Carrie Wall Bell za žádosti o podporu souborů audio/hydrofon.
        * ZLEPŠIT: Formát pro webové přístupné složky (WAF)   (např. soubory/složky) byla aktualizována pro použití HTML tabulky. Nový formát imituje novější verzi adresáře, v němž jsou uvedeny webové stránky vytvořené novějšími verzemi Apache. Lidé zjistí, že díky změnám se informace snadněji čtou. Software, který rozebírá tyto dokumenty (např. software, který sklízí dokumenty ISO 19115 z ERDDAP ) bude muset být revidován, ale nový formát bude jednodušší analyzovat než předchozí formát. (Pozor, Anno Milanová.) 
        * NOVÉ outOfDateDatasets.html Strana. ( [příklad](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Tato webová stránka zobrazuje tabulku se všemi daty v reálném čase, které mají&lt; testOutOfDate &gt; značka (viz níže) , které jsou řazeny podle toho, jak jsou datové soubory zastaralé. Tato palubní deska by měla být užitečná pro ERDDAP™ Správci a koncoví uživatelé, když chtějí vědět, které datové soubory jsou zastaralé. U zastaralých datových souborů je pravděpodobně problém se zdrojem dat, takže ERDDAP™ není schopen vidět/získat data z novějších časových bodů.
Administrátoři: Pokud nechcete webovou stránku Out-Of-Date Datasets, přidejte ji do nastavení.xml:
            &lt;OutOfDateDatasetsActive&gt;false&lt;/outOfDatasetsActive&gt;
Teď už ano. testOutOfDate a ven OfDate sloupce ve sloupci allDatasets Soubor dat.
Díky Bobovi Simonsovi, který to chtěl už léta, a chytrým lidem z irského námořního institutu, kteří mi dali inspiraci prostřednictvím svého obětavého Malinového Pi a monitoru, který vždy zobrazuje obrazovku jako je tato ve své kanceláři.
        * ZLEPŠENÍ: .htmlTable a .xhtml Odezva je nyní lépe formátovaná, kompaktnější a tím rychlejší. Díky HTML5 a CSS.
    * NOVÝ typ výstupního souboru pro griddap soubory: .timeGaps. Ukazuje seznam mezer v časových hodnotách, které jsou větší než střední mezera. ( [příklad](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) To je užitečné pro ERDDAP™ Správci a koncoví uživatelé, kteří chtějí vědět, zda existují neočekávané mezery v časových hodnotách datového souboru, u něhož se očekává, že budou mít pravidelně rozložené časové hodnoty. Díky Bob Simons a Roy Mendelssohn, který potřeboval tuto funkci.
    * IMPROVED: Výchozí graf pro allDatasets Soubor dat je nyní mapou s x=maxLon a y=maxLat. Díky Johnu Kerfootovi, Richi Signellovi a OOI-CI.
    * NEW: [erddapy](https://github.com/ioos/erddapy) -- není ERDDAP™ rys, ale bude zajímat mnoho ERDDAP™ uživatelé. Erddapy ( ERDDAP™ + Python ) je Python knihovna vytvořená Filipem Fernandesem, která "využívá ERDDAP 's RESTful webové služby a vytváří ERDDAP™ URL pro jakýkoli požadavek, jako je hledání souborů dat, získávání metadat, stahování dat, atd.." Díky Filipovi Fernandesovi.
    * Měl jsem se zmínit předtím: Existuje balíček třetí strany R navržený tak, aby bylo snazší pracovat s ERDDAP™ zevnitř R: [rerddap](https://github.com/ropensci/rerddap#rerddap) . Díky [rOpenSci](https://ropensci.org/) a Roy Mendelssohn.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * DO: V setup.xml, přímo pod&lt;adminInstitution &gt;, prosím, přidejte a&lt;adminInstitutionUrl&gt; tag, který určuje URL pro vaši instituci (nebo skupina) .
    * DO: Tyto 3 značky v setup.xml se již nepoužívají:
        &lt;start HeadHtml&gt;,&lt;startBodyHtml&gt; a&lt;endBodyHtml&gt;. Nahrazují se
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; a&lt;endBodyHtml5&gt;, které mají výchozí hodnoty uvedené ve zprávách.xml (a zobrazeno níže) .
        
Doporučujeme použít výchozí&lt;startHeadHtml5&gt; a&lt;endBodyHtml5&gt;.
Doporučujeme: Pokud jste provedli změny originálu&lt;startBodyHtml&gt; a/nebo chcete přizpůsobit ERDDAP™ Nyní, prosím, zkopírujte novou&lt;startBodyHtml5&gt; tag (zdola) do nastavení.xml a upravit jej přizpůsobit ERDDAP™ takže ERDDAP 's webovými stránkami odráží vaši organizaci, ne NOAA   ERD . Hlavně, prosím, změňte "Přinesl vám" na vaši organizaci (án) . Pokud potřebujete pomoc, prosím e-mail erd.data at noaa.gov . (Pokud nechcete přizpůsobit svůj ERDDAP™ Nyní použijte výchozí&lt;startBodyHtml5&gt;.)
        
Pak smažte 3 staré značky ve vašem nastavení.xml, které již nejsou používány.

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

Existují další způsoby, jak můžete [přizpůsobit ERDDAP™ ](/docs/server-admin/deploy-install#customize) tak ERDDAP 's webovými stránkami odráží vaši organizaci místo NOAA   ERD .
        
    * DO:&lt; EDDGrid ...Příklad &gt; značky (začíná se&lt; EDDGrid IdExample&gt;)&lt;EDDTable... Příklad &gt; značky (začíná se&lt;EDDTableIdExample&gt;) ve vašem setup.xml souboru jsou použity k vytvoření příkladů v roštu a tabledap dokumentace. html webové stránky ve vašem ERDDAP .
        
Pokud jste si tyto značky nepřizpůsobili, smažte je prosím ze souboru setup.xml. Nyní mají všechny výchozí hodnoty ve zprávách.xml, které odkazují na datové soubory v Bob's ERDDAP™ vhttps://coastwatch.pfeg.noaa.gov/erddap/index.html. Takže již nemusíte mít konkrétní data ve svém ERDDAP . Pokud chcete přepsat výchozí hodnoty, zkopírujte některé nebo všechny tyto značky do nastavení.xml a změňte jejich hodnoty.
Pokud chcete, aby příklady ukazují na vaše ERDDAP™ Nejjednodušší metoda je:
        
        1. Zahrňte tyto dva soubory do svého ERDDAP™ přidáním tohoto do vašeho datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Přidat tento tag do nastavení.xml, ale změnit URL na vaše ERDDAP 's ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Pokud jste udělali přizpůsobení těchto značek, nechte je tak, jak je a přidejte prosím tyto 2 nové značky do nastavení.xml zadat ERDDAP™ URL pro tyto soubory souborů, ale změnit URL na vaše ERDDAP 's ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * DO: ERDDAP™ Nyní používá soubor css nazvaný erddap2.css. Pokud jste provedli změny \\[ tomcat \\] /webapps/erddap/images/erddap.css, zvažte provedení podobných změn erddap2.css (ve stejném adresáři) .
    * NEW: ERDDAP 's webovými stránkami nyní mají velký počet téměř neviditelných vnitřních odkazů (text je černý a není zdůrazněn) . Pokud se vznášíte nad jedním z těchto odkazů (obvykle prvních pár slov kapitol a odstavců) Kurzor se stává rukou. Pokud kliknete na odkaz, URL je interní odkaz na tuto část dokumentu. Díky tomu lze snadno odkazovat na konkrétní části dokumentace. Díky Bobovi Simonsovi, který tohle chtěl už roky.
    * NEW: ERDDAP™ nyní podporuje [Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving) žádosti o části /souborů/ souborů. To bylo potřeba k podpoře audio a video prohlížečů v prohlížečích.
    * TO DO: Chcete-li zlepšit bezpečnost, pokud jste uvedli&lt;baseHttpsUrl&gt; in setup.xml (a tím i podporu https ) , doporučená vlajka Url je https URL s bezpečnějším klíčem. Pokud ano, jakákoliv předchozí vlajkaUrls/flagKeys se stane neplatnou. Administrátoři: Pokud se tyto změny vztahují na Váš ERDDAP™ a pokud ERDDAP™ má EDDGrid OdErddap a EDDTable FromErddap's, která se hlásí ke vzdálenému ERDDAP s, pak, po aktualizaci ERDDAP , vaše ERDDAP™ automaticky se pokusí přihlásit se s novou flagUrl, takže byste měli smazat staré předplatné a potvrdit nové předplatné, když dostanete nové předplatné validační e-maily.
    * DO: ERDDAP™ má EDDGrid Soubory dat FromErddap pro soubory ErdVH3 na Bobově pobřežní stráži ERDDAP™ , prosím, změňte je tak, aby odkazovaly na nové soubory ErdVH2018.
    * DO: Pokud do svého souboru přidáte některý ze vzorků jplAquariusSSS ERDDAP™ , prosím změňte "V4" v datasetID "V5."
    * DO: actual\\_range je nyní standardní atribut CF (od CF-1.7) a jasně říká, že pokud proměnná používá add\\_offset nebo scale\\_factor zabalit hodnoty dat, pak actual\\_range hodnoty by měly používat rozbalený datový typ a vybalit hodnoty. Bohužel je to v rozporu s předchozí radou. Generovat soubory dat Xml nyní vybalí zabalené actual\\_range hodnoty, ale to nespraví existující datové soubory ve vašem datasets.xml Složka.
        
Prohlédněte si prosím soubory souborů: pokud jsou hodnoty proměnné zabaleny a pokud actual\\_range je specifikován jako balené hodnoty dat, prosím přidejte&lt; addAttributes &gt; actual\\_range hodnota pro určení vybalených hodnot. V opačném případě nebude soubor údajů zadávat ERDDAP . Jednoduchý a téměř dokonalý způsob, jak to udělat, je prohledat datasets.xml pro zdroj Atributy
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
a scale\\_factor jiné než 1. 0. To jsou actual\\_range atributy, které budete muset opravit.
        
Pro proměnné osy v EDDGrid datové soubory, ERDDAP™ vždy nastaví actual\\_range atribut je skutečný rozsah hodnot, protože tyto hodnoty zná.
        
Pro proměnné osy se sestupnými hodnotami (Například některé proměnné zeměpisné šířky) , ERDDAP™ vytvořen actual\\_range s \\[ 0 \\] ... \\[ poslední \\] hodnoty, které byly vysoké... nízké. Nyní vždy používá nízké... vysoké hodnoty k vytvoření nové definice CF.
        
Správnost actual\\_range hodnoty jsou zvláště důležité pro soubory údajů v tabulce EDDTable, protože ERDDAP™ rychle odmítne uživatelské požadavky na hodnoty údajů, které jsou nižší než actual\\_range minimální hodnota nebo vyšší než actual\\_range maximální hodnota.
        
Související: aktuální\\_min, aktuální\\_max, data\\_min a data\\_max atributy jsou nyní deprecovány. Převeďte prosím vaše datové soubory k použití actual\\_range Místo toho.
        
    * TO DO (volitelné, ale doporučené) : Pro každý databázový soubor v blízkém čase a prognóze ERDDAP™ , prosím přidejte [&lt; testOutOfDate &gt;] (/docs/server-admin/datasets#testoutofdate) tag s hodnotou ve formuláři now- _nUnits_, např. now- 2 dny. Je-li maximální časová hodnota datového souboru starší než tato hodnota, považuje se datový soubor za zastaralý a bude jako takový označen na [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) webové stránky. To vám umožňuje snadnou představu, kdy je něco špatně se zdrojem datového souboru.
    *    [NEW: Sémantický markup datových sad s json-ld (JSON Propojené údaje) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ použití [Json- Id (JSON Propojené údaje) ](https://json-ld.org) aby byl Váš katalog dat a datové soubory součástí [sémantická síť](https://en.wikipedia.org/wiki/Semantic_Web) , což je Tim Berners-Lee nápad, aby web obsah více stroj čitelný a stroj "pochopitelný." Vyhledávací stroje ( [Zejména Google](https://developers.google.com/search/docs/data-types/datasets) ) a další sémantické nástroje mohou použít tuto strukturovanou značku k usnadnění objevu a indexování. Struktura json-ld se jeví jako neviditelní lidé&lt;skript &gt; kódhttp://.../erddap/info/index.htmlwebová stránka (což je sémantická síť [DataCatalog](https://schema.org/DataCatalog) ) a na každémhttp://.../erddap/info/_datasetID_/index.htmlwebová stránka (což je sémantická síť [Soubor dat](https://schema.org/Dataset) ) . (Zvláštní poděkování Adam Leadbetter a Rob Fuller z Mořského institutu v Irsku za to, že dělají těžké části práce, aby se tato část ERDDAP .) 
    * NOVINKA: Existují nové typy souborů, které mohou číst data z audio souborů:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , který považuje audio data za mřížkovaná data.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , který považuje audio data za tabulární data. Díky Jim Potemra, Rich Signell, OOI, a Carrie Wall Bell za žádosti o podporu souborů audio/hydrofon.
    * Změny ve generování dat Xml (a související změny) :
        * NEW: ERDDAP™ Nyní má systém automaticky [aktualizace zastaralých URL](/docs/server-admin/additional-information#out-of-date-urls) oba v GenerateDatasets Xml a při načítání dat. Pokud máte návrhy na další URL adresy, které by měly být zachyceny a aktualizovány, nebo pokud si myslíte, že by to mělo být změněno na službu (Jako konvertory) , prosím e-mail erd.data at noaa.gov .
        * NEW: Nyní, pokud GenerateDatasets Xml vidí CF standard\\_name   (které by měly být všechny malé) s velkou postavou, přidává všechny malé verze&lt; addAttributes &gt;. Také při zatížení souboru, pokud ERDDAP™ viz CF standard\\_name s velkou postavou, tiše ji mění na standard\\_name . Díky Richi Signellovi.
        * NEW: Nyní, pokud GenerateDatasets Xml vidí atribut s časem, který není ve formátu ISO 8601, přidá formát ISO 8601&lt; addAttributes &gt;. Pokud ERDDAP™ neuznává formát, nechává časovou hodnotu nezměněnou. Pokud vidíte formát, který ERDDAP™ nepoznává a neopravuje, prosím e-mailem na erd.data at noaa.gov .
        * ZLEPŠENÉ: Nízkoúrovňové kód pro EDDGrid FromThredds Volba katalogu v GeneranteDatasets Xml nyní spoléhá na Unidata katalogový kód netcdf-java (Thredds. Katalogové třídy) takže může zvládnout všechny katalogy THREDDS (což může být překvapivě složité.) . Díky Rolandu Schweitzerovi za návrh této změny a díky Unidata pro kód.
        * Novinka: GenerovatDatasety Xml pro EDDGrid FromDap nyní přidává ", startRok-EndRok" na konec titulu na základě aktuálních hodnot časové osy. EndRok="present" pokud data existují za posledních 150 dnů.
        * Novinka: GenerovatDatasety Xml pro EDDGrid FromDap nyní dodává " \\[ rozlišení \\] °" k názvu, pokud je datový soubor rovnoměrně rozložen a stejný pro lat a lo.
        * IMPROVED: Převodník času má nyní další vlastnosti, zejména schopnost převést časy strun v široké škále běžných formátů do ISO 8601 řetězce nebo na UDUnits kompatibilní číslo. Všechny dříve podporované funkce nadále fungují, beze změny.
        * BUG FIX: GenerovatNastavení dat Xml a klíčových slov převodník nyní patří "Země věda &gt; " na začátku GCMD věda Klíčová slova. Při načtení datového souboru ERDDAP™ , ERDDAP™ Nyní opravit všechna klíčová slova GCMD v atributu klíčových slov, která nezačínají na "Země věda &gt; " nebo které používají cokoli jiného než titulní případ (kde je první písmeno každého slova kapitalizováno) .
        * Při navrhování&lt; destinationName &gt;'s, GeneratorDatasets Xml pro EDDTableFromAsciiFiles právě použil konec ocasu sourceName s '/'   (některé byly jako název souboru) . Teď používá celý. sourceName (např. "blahblahblah (m/s)." Tato změna bude dobrá pro některé soubory dat a ne pro ostatní, ale je to bezpečnější chování. Díky Maurice Libesovi.
        * BUG FIX: GenerovatNastavení dat Xml a konstruktéři souborů nyní zajišťují, že neexistují žádné dvojí názvy sloupců. Díky Maurice Libesovi.
        * BUG FIX: GenerovatNastavení dat XML pro EDDTableFromAsciiFiles nenapsal&lt;sloupecSeparator &gt; na výstup. Teď už ano. Díky Maurice Libesovi.
    * NOVINKA: Nástroj DasDds nyní vytiskne informace o časové mezery (vá [.timeGaps informace](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) je-li datový soubor datový soubor mřížkou.
    * NOVINKA: Pokročilé vyhledávání nyní přijímá časové hodnoty "now_\\-nUnits_." Díky Richi Signellovi.
    * IMPROVED: Pro zlepšení bezpečnosti, když je e-mailová adresa v metadatech nebo datech datového souboru zapsána na webové stránce html, "@" se nahrazuje " na ". To zachytí pouze e-mailové adresy, které jsou celá metadata nebo hodnota dat, ne e-mailové adresy vložené do delších hodnot.
    * Pro zvýšení bezpečnosti RSS Informace o soukromých datových souborech jsou nyní dostupné pouze uživatelům (a RSS čtenáři) kteří jsou přihlášeni a oprávněni používat tento datový soubor.
    * NEW: Nyní, když je soubor dat načten, pokud date\\_created , date\\_issued , date\\_modified , nebo date\\_metadata\\_modifikovaný atribut má časovou hodnotu, která není ve formátu ISO 8601, ERDDAP™ změní ji na formátovaný čas ISO 8601. Pokud ERDDAP™ neuznává formát, nechává časovou hodnotu nezměněnou. Pokud vidíte formát, který ERDDAP™ nepoznává a neopravuje, prosím e-mailem na erd.data at noaa.gov .
    * ZLEPŠENÉ: .dods odpovědi od EDDGrid Data by teď měla být podstatně rychlejší. Díky Richi Signellovi.
    * Změny týkající se ERDDAP 's vytvořením dokumentů ISO 19115:
        * BUG FIX: při vytváření dokumentů ISO 19115 dataVariable jednotky nebyly HTML Atribute zakódovány a zakódovány. Teď už ano. Díky validátoru ISO 19115 NGDC.
        * BUG FIX: při vytváření dokumentů ISO 19115 date\\_created byl použit tak, jak je, tak často byl špatný formát. Nyní je převeden na řetězec ISO 8601 Z. Díky validátoru ISO 19115 NGDC.
        * BUG FIX: při vytváření dokumentů ISO 19115 ERDDAP™ nyní delší píše data s rokem=0000 (jako s klimatologickými soubory) , protože schéma ISO 19115 neumožňuje data s rokem=0000. Díky validátoru ISO 19115 NGDC.
    * NEW: Jako před žádostí o http .../erddap/version vrátí pouze číslo verze (jako text) , např. " ERDDAP \\_version=1.82."
Takže, žádost o http .../erddap/version\\_string vrátí číslo a volitelnou příponu '\\_' plus ASCII text (žádné mezery nebo kontrolní znaky) , např. " ERDDAP \\_version\\_string=1.82\\_JohnsFork" Lidé dělající vidličku to určí změnou ED Static.erddapVersion. Tímto způsobem to nezpůsobuje problémy pro předchozí verze ERDDAP . Díky Axiomu (zejména Kyle Wilcox) Irsko (zejména Rob Fuller) .
    * BUG FIX: Pro wms verzi=1.3.0, request= GetMap , CS=EPSG:4326 (není CRS:84) žádosti: bbox objednávka musí být minLat,minLon,maxLat,maxLon. Pro CRS: 84 požadavků, jako dříve, bbox objednávka musí být minLon,minLat,maxLon,maxLat. To může napravit použití ERDDAP 's WMS 1.3.0 služba ArcGIS   (díky Paole Arceové.) . Díky. (ne) až OGC za to, že to tak komplikuješ. Díky Leaflet za správné zacházení a za to, že jste mi dali způsob, jak to otestovat.
    * IMPROVED: Předchozí, navrhovaný odkaz pro RSS a e-mailové předplatné má http URL pro vaši ERDDAP . Teď je to https URL, pokud je aktivní.
    * NEW: EDDGrid Kopírovat nyní podporuje volitelnou značku&lt;pouzeOd&gt;_someValue_&lt;/pouzeOd &gt;, je-li hodnota specifická pro ISO-8601-formátovaný čas nebo now- nJednotky (např. now- 2 roky) Čas. Viz [pouze Od dokumentace](/docs/server-admin/datasets#onlysince) . Díky Drew P.
    * ZLEPŠENÉ: Je-li k dispozici, ERDDAP™ ukáže https URL (od&lt;baseHttpsUrl &gt;, je-li k dispozici) místo http URL, když řekne uživatelům URL přidat / validovat / odstranit / seznam předplatného.
    * BUG FIX: ERDDAP™ Nyní umožňuje předplatné akce začít s "https://". (Bob si fackuje čelo.) Díky Jennifer Sevadjianové.
    * BUG FIX: .jsonlKVP nyní používá ':' mezi každým klíčem a hodnotou namísto '=' . (Bob si fackuje čelo.) Díky Alexandru Barthovi.
    * BUG FIX: V předchozích dílech... ERDDAP™ s quickRestart=true, a pokud jste předtím, než byl datový soubor přeobnoven normálně, zavolali do souboru EDDTableFromFoles, který použil aktualizaciEveryNMillis, a pokud by byl datový soubor právě změněn, požadavek by selhal s chybou nulového ukazatele. Nyní žádost uspěje. Díky Johnu Kerfootovi.
    * NEW: Při načtení datového souboru ERDDAP™ , klíčová slova jsou nyní přeřazena do seřazeného pořadí a všechny nové znaky jsou odstraněny.
    * Teď, když je to .geoJson, .json nebo .nc oJson žádost má .json P parametr, typ mime odezvy je aplikace/javascript. Všimněte si, že .json p není podporováno .jsonlCSV nebo .jsonlKVP Protože by to nefungovalo. Díky Robu Fullerovi.
    * IMPROVED: Typ mimu pro soubor json linesType je nyní "application/x-jsonlines." Byla to žádost/jsonl. V současné době neexistuje žádná definitivní správná volba.
    * IMPROVED: Počet neúspěšných žádostí uvedených na stránce status.html se zvýší, protože více věcí se počítá jako selhání než dříve, např. ClientAbortException.
    * ZLEPŠENÍ: Nyní, pokud odpověď z ERDDAP™ není komprimován, pak hlavička odpovědi bude obsahovat "Content-Encoding"="identity."
    * Příznak "licence" nebyl nutný. Teď, pokud to není uvedeno, standardLicence ze zpráv.xml (nebo ze setup.xml, pokud je přítomen) je použita jako výchozí hodnota.
    * NEW: Nyní je volitelný [souborAccessSuffix atribut](/docs/server-admin/datasets#fileaccessbaseurl) . které lze použít s existující [atribut souboruAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl) .
    * IMPROVED: Pro zvýšení bezpečnosti byla tato verze sestavena s nejnovějšími Java JDK v8u162.
    * NEW: Chcete-li zvýšit bezpečnost, několik společných domén, které nabízejí dočasné e-mailové adresy (např. @mailinator.com) jsou nyní na trvalém e-mailu blacklist pro systém předplatného.
    * NOVINKA: Pro zvýšení bezpečnosti jsou nyní v Daily Report uvedeny tyto údaje:
SetDataset Vlajka IP adresa selhala (od poslední denní zprávy)   
SetDataset Vlajka IP adresa selhala (od spuštění)   
SetDataset Vlajka IP adresa uspěla (od poslední denní zprávy)   
SetDataset Vlajka IP adresa uspěla (od spuštění)   
"Failed" hities vám ukázat, kdo (Hacker?) Snaží se nastavit vlajku, ale selhává.
    * IMPROVED: Pro zvýšení bezpečnosti, e-mailové adresy v&lt;předplatnéEmailBlacklist &gt; ve Vašem datasets.xml jsou nyní považovány za případy necitlivé.
         

## Verze 1.80{#version-180} 
 (vydání 2017-08-04) 

*    **Nové funkce (pro uživatele) :**   
     
    * NOVÉ orderByCount  () filtr umožňuje určit, jak bude tabulka výsledků seřazena (nebo ne) a vrátí pouze jeden řádek pro každou skupinu tříd, s počtem nechybějících hodnot pro každou proměnnou.
Například, orderByCount  (" stationID ") bude třídit podle stationID a vrátí jeden řádek pro každý stationID , s počtem chybějících hodnot pro každou proměnnou.
Pokud zadáte orderByCount  ("") , odpověď bude pouze jeden řádek s počtem chybějících hodnot pro každou datovou proměnnou.
Viz [ orderBy ... dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Díky Benu Adamsovi.
    * NOVÉ .nc soubor oJson Typová volba pro mřížkované a tabulární datové soubory. Tato volba NCO lvl=2 "pedantic" JSON soubor se všemi informacemi obvykle nalezenými v .nc Složka. Viz [http://nco.sourceforge.net/nco.html#json](https://nco.sourceforge.net/nco.html#json) Díky Charliemu Zenderovi.
    * BUG FIX: The orderBy ... () Možnosti na webové stránce Make A Graph jsou nyní řešeny správně.
    * BUG FIX: .geoJson výstup nyní netiskne řádky, kde lat nebo lon hodnoty chybí. Také hodnoty nadmořské výšky (je-li k dispozici) jsou nyní zahrnuty do souřadnic, nikoli jako hodnoty dat. Díky Jonathanu Wilkinsovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * BEZPEČNOST: Protokoly.js knihovna použita pro OpenLayers demo na WMS stránky ERDDAP™ je zastaralý a má chybu, která potenciálně umožňuje její zneužití. (Bohužel, aktualizace OpenLayers a protokoly. Není to snadné.) Tím se otevírá možnost, že by knihovna mohla být nastavena tak, aby umožňovala přeshraniční zranitelnost. Nicméně od ERDDAP™ pouze použití OpenLayers zvláštním způsobem a pouze se specifickými ERDDAP -na základě zdrojů dat, věříme, že není žádné přeshraniční zranitelnost v ERDDAP 's použitím OpenLayers a protokoly.js. Nicméně, pokud tomu nevěříte, můžete nyní zakázat použití OpenLayers demo na WMS Vaše stránky ERDDAP™ přidáním
```
        <openLayersActive>false</openLayersActive>  
```
na váš soubor.xml. Výchozí je "pravda." Díky Charlesi Carletonovi a NCEI.
    * BEZPEČNOST ZMĚNY: Nevyužité .jar soubory a duplikát .jar soubory (protože jsou také v netcdfAll.jar) byly odstraněny z ERDDAP™ distribuce. Zastaralé .jar soubory byly aktualizovány. Díky Charlesi Carletonovi a NCEI.
    * ZMĚNY BEZPEČNOSTI: NetcdfAll.jar soubor distribuovaný s ERDDAP™ je nejnovější verze (v současné době 4.6.10) , ale stále obsahuje interní jackson .jar soubory, které jsou známé jako zastaralé a mají bezpečnostní slabiny, zejména Jackson knihovny, které jsou použity pouze při přístupu k Amazon S3 datové zdroje. Pokud nemáte přístup k datům přes Amazon S3 (Kdybys byl, věděl bys to.) Tyto zranitelnosti nejsou relevantní.
        
Vývojáři netcdf-java tvrdí, že tato zranitelnost není relevantní kvůli tomu, že kód netcdf používá tyto knihovny a v každém případě by byl relevantní pouze při přístupu k Amazon S3. Viz [https://github.com/Unidata/thredds/issues/866](https://github.com/Unidata/thredds/issues/866) . Věřím jim. Pokud máte stále obavy, kontaktujte prosím vývojáře netcdf-java. (Všimněte si, že pokud nevěříte vývojářům netcdf-java a uvažujete o nepoužívání ERDDAP™ kvůli tomu byste neměli používat THREDDS ani proto, že THREDDS používá netcdf-java podstatně více než ERDDAP .) 
        
Podrobnosti: Problémový kód a upozornění na zranitelnost jsou:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Vysoká
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Vysoká
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-anotace/pom.xml
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Vysoká
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-3720-- Kritický
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Vysoká
Vizhttps://nvd.nist.gov/vuln/detail/CVE-2016-3720-- Kritický
"Pro verzi 4.6.10, aws-java-sdk-core táhne ve verzi 2.6.6 artefaktů Jackson-\\*." (email od netcdf-java lidí) .
Díky Charlesi Carletonovi a NCEI.
        
    * ZMĚNÍ SE KOMILNÍK: Pokud se vrátíte ERDDAP™ , všimněte si, že parametr -cp classpath potřebný pro příkazový řádek je nyní mnohem kratší než dříve. Viz nové nastavení -cp v [Tato dokumentace](/docs/contributing/programmer-guide#development-environment) . Díky Charlesi Carletonovi a NCEI.
    * NOVÉ OPTIONY V GeneranteDatasets Xml: EDDTableFromBcodmo, který je jen pro interní použití v BCO-DMO.
Díky Adamu Shepherdovi a BCODMO.
    * NOVÉ ATRIBUTE A FEATURE: Pokud má EDDTable sloupec názvy souborů přístupných k webu (např. obraz, video nebo audio soubory) , můžete přidat
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
zadat základní URL (končí s /) potřeba, aby jména souborů byla kompletní URL. Pak pro .htmlTable odpovědi, ERDDAP™ zobrazí název souboru jako odkaz na kombinované URL (základ Url plus název souboru) .
Jestli chceš ERDDAP™ slouží související soubory, aby samostatný EDDTableFromFileNames soubor pro tyto soubory (může se jednat o soukromý soubor údajů) .
Díky Adamu Shepherdovi a BCODMO.
    * NEW ATTRIBUTE DOPORUČENÍ: Pokud má sloupec EDDTable názvy souborů přístupných na webu (např. obraz, video nebo audio soubory) které jsou přístupné prostřednictvím archivu (např. .zip soubor) přístupná přes URL, použití
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
zadat URL pro archiv.
Jestli chceš ERDDAP™ slouží archivní soubor, vytvořit samostatný EDDTableFromFileNames soubor pro tento soubor (může se jednat o soukromý soubor údajů) .
Díky Adamu Shepherdovi a BCODMO.
    * ZLEPŠENÍ Generovat soubory dat Xml pro odstranění příčin neplatných/špatných&lt; subsetVariables &gt; návrhy a duplikát/špatné navrhované názvy proměnných atd. Díky Richi Signellovi, Adamovi Shepherdovi a BCO-DMO.
    * Nová možnost: Informace o politických hranicích šířené s ERDDAP je od třetí strany a je poněkud zastaralá. Také existují sporné hranice na několika místech světa, kde budou mít různí lidé různé představy o tom, co je správné. Netvrdíme, že je správná politická nadace, která obsahuje ERDDAP . Pokud se vám nelíbí politické hraniční informace, které přicházejí s ERDDAP™ Teď už to poznáš. ERDDAP™ Nikdy nekreslit politické hranice přidáním
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
na váš soubor.xml. Výchozí je "pravda." Díky Raju Devenderovi.
    * NOVÁ METADATA TAG: V datasets.xml pro datový soubor můžete nyní zadat výchozí počet barev Barové profily pro a dataVariable na grafech a mapách s
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, který říká nechat ERDDAP™ rozhodnout) . Viz [barva Nastavení lišty](/docs/server-admin/datasets#color-bar-attributes) .
    * ZLEPŠENÍ: barva hranice státu na mapách byla fialová (Deep Purple pro vás Baby Boomers) . Teď je šedá. (mezi státní hranicí šedá a země šedá) .
    * BUG FIX:&lt;iso19115File&gt; a&lt;fgdcFile &gt; v datasets.xml nebylo vždy zacházeno správně. Teď už ano. Díky BCO-DMO.

## Verze 1.78{#version-178} 
 (propuštěn 2017-05-27) 

*    **Nové funkce (pro uživatele) :**   
     
    *    (žádný)   
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * IMPROVED: Řád řádků v "Major LoadDatasets Time Series" v záložce status.html je nyní nejnovější na vrcholu nejstarší na konci.
    * BUG FIX: ERDDAP™ Nyní píše .nccsv soubory s časovou proměnnou actual\\_range jako čas ISO-8601 String. To opraví chybu pomocí EDDTableFromErddap parsing info ze vzdáleného datového souboru a z quickRestart souboru pro všechny soubory EDDTableFrom...Files. (Čas actual\\_range bude chyba při prvním zatížení datového souboru v1.78, ale po jeho opětovném načtení správné, např. pokud označíte datový soubor.) 

## Verze 1.76{#version-176} 
 (propuštěn 2017-05-12) 

*    **Nové funkce (pro uživatele) :**   
     
    * Změna v Tomcatu: Pro žádosti o ERDDAP™ Pocházející z jiného softwaru než webových prohlížečů (např. curl , R Matlab , Python , Java ) :
Stejně jako u předchozích změn ve verzích Tomcat (software nižší úrovně, který běží ERDDAP ) od počátku roku 2016, stále více znaků v dotazové části požadavku URL musí být [ **Procento zakódováno** ](/docs/server-admin/datasets#infourl) z bezpečnostních důvodů. Prohlížeče se starají o procento kódování pro vás. použití ERDDAP™ v prohlížeči není ovlivněna, pokud žádost není přesměrována na jiný ERDDAP .
    * V minulých dílech... ERDDAP™ léčeno **proměnné znaku** spíš jako nepodepsané krátké celá čísla než znaky. Nyní se k nim chová spíš jako k UCS-2 dlouhému 1 znaku. (Unicode) Struny. Viz [Char dokumentace](/docs/server-admin/datasets#char) . Díky Aurelie Briandové a projektu Argo.
    * V minulých dílech... ERDDAP™ nabídl málo podpory pro **Unicode znaky** nad znakem #255 v Strings. Teď, uvnitř, ERDDAP™ plně podporuje 2-bajt UCS-2 chary (znaky číslované 0 až 65535) v Strings. Při zápisu String dat do různých typů souborů, ERDDAP™ Dělá, co může, aby podpořil 2-bajtové chary. Dalším příkladem jsou .csv soubory, které ERDDAP™ píše pomocí znakové sady ISO-8859-1 (1-bajtový znak) Takže ERDDAP™ píše všechny znaky nad znakem #255 s JSON-like \\\u_hhhh_ syntax. Viz [String data](/docs/server-admin/datasets#string) .
    * ZLEPŠENÍ: .nc soubory napsané ERDDAP™ , Char proměnné, které mají být interpretovány jako Strings budou mít atribut
         **\\_ Kódování=ISO-8859-1**   
In .nc soubory přečtené ERDDAP™ , proměnné znaku s "\\_Encoding" budou interpretovány jako řetězce se zadanou znakovou sadou.
    * REMINDER: ERDDAP™ Podpora **JSON-jako backslash-kódování** speciálních znaků, když zadáte omezení znaků a String proměnných. Tak si můžete vyžádat něco jako &myString="\\u20ac" když chcete řádky dat, kde myString=€ od 20ac je hexadecimální verze kódového bodu pro symbol Euro. Několik zdrojů na webu ukazuje kódová čísla pro symboly Unicode, např. [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) .
    * V minulých dílech... ERDDAP™ nabídnuta omezená podpora **dlouhé celé číslo** proměnné. Teď ERDDAP™ plně podporuje interně dlouhé a dělá to nejlepší při psaní dlouhých dat do různých typů souborů. . Viz [dlouhá dokumentace](/docs/server-admin/datasets#long) . Díky irskému námořnímu institutu Craig Risien, Rich Signell, Christopheru Wingardovi a OOI.
    * NEW: typ výstupního souboru pro griddap a tabledap : ** .nccsv ** , což dělá NetCDF - jako ASCII, CSV soubor, který také obsahuje všechna metadata, která by byla srovnatelná .nc Složka. Viz [NCCSV Specifikace](/docs/user/nccsv-1.00) . Díky Stevu Hankinovi.
    * NEW: ** orderByClosest filtr** umožňuje určit, jak bude tabulka výsledků seřazena a interval (např. 2 hodiny) . V každé skupině tříd se uchovávají pouze řádky nejbližší intervalu. Například, orderByClosest  (" stationID , čas, 2 hodiny") bude třídit podle stationID a čas, ale pouze vrátit řádky pro každý stationID kde poslední orderBy sloupec (čas) je nejblíže 2 hodinovým intervalům. Tohle je nejblíž. tabledap pro krok s hodnotami v požadavku griddap. Tuto možnost lze zadat prostřednictvím libovolného tabledap Webová stránka souboru .html, webová stránka .graph a každá URL, kterou si vytvoříte sami. Díky Irsku je Mořský institut a Ocean Networks Kanada.
    * NEW: ** orderByLimit filtr** umožňuje určit, jak bude tabulka výsledků seřazena a mezní číslo (např. 100) . V rámci každé skupiny tříd budou zachovány pouze první "limitní" řádky. Například, orderByMax  (" stationID , 100") bude třídit podle stationID , ale vrátit pouze prvních 100 řad za každý stationID . To je podobné klauzule SQL. Tuto možnost lze zadat prostřednictvím libovolného tabledap Webová stránka souboru .html, webová stránka .graph a každá URL, kterou si vytvoříte sami. Díky Irsku je Mořský institut a Ocean Networks Kanada.
    * NEW: Dva nové typy souborů odezvy, ** .jsonlCSV a .jsonlKVP ** jsou k dispozici pro žádosti o síťované datové soubory, tabulární datové soubory a mnoho dalších míst v ERDDAP   (Například žádosti o informace o souborech údajů) . Soubory jsou soubory JSON Lines ( [https://jsonlines.org/](https://jsonlines.org/) ) kde každá linie má samostatný objekt JSON. .jsonlCSV má hodnoty ve formátu CSV. .jsonlKVP má klíč: Hodnota párů. Každá linie stojí sama za sebou. Řádky nejsou uzavřeny ve větším JSON poli nebo objektu. Například, viz [žádost o vzorek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Díky Damianu Smythovi, Robu Fullerovi, Adamu Leadbetterovi a irskému námořnímu institutu.
    * NOVINKA: Je zde nová dokumentace popisující [ **Jak získat přístup k soukromým datům v ERDDAP™ přes skripty** ](/docs/user/AccessToPrivateDatasets) . Díky Lynn DeWittové.
    * ZLEPŠENÉ: Minimální rozsah ** OpenLayers ** mapa byla 2 stupně a nyní je 4 datové pixely. Díky Rusty Hollemanovi.
    * ZLEPŠENÉ: V některých běžných případech, žádosti, které zahrnují **regulární výraz** Omezení bude zpracováno mnohem rychleji.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    *    **Pomalu první hvězda:** Když poprvé spustíte tuto novou verzi, bude to trvat dlouho. ERDDAP™ načíst všechny datové soubory, protože je třeba znovu přečíst všechny zdrojové datové soubory (i když jen hlavička pro mřížkované datové soubory) . Pokud se podíváte na záznamy, můžete vidět chybové zprávy s nápisem "stará/nepodporovaná vylepšenáVerze" některých interních souborů -- to je v pořádku -- ERDDAP™ vytvoří nové verze interních souborů. Prosím, buď trpělivý.
    * AKCE ERDDAP™ nyní používá nový **java.time** třídy (také známé jako JSR 310) místo Jody k analýze Stringových časů do numerických časů. Poznámky:
        * Pokud ERDDAP™ Najednou má problémy s analýzem String Times pro daný datový soubor a tak se většinou nebo celou dobu konvertuje k NaN's (chybějící hodnoty) , Problém je téměř vždy s datem Časový formát řetězec, který jste zadali jako "jednotky" proměnné. Nový systém někdy potřebuje trochu jiný řetězec formátu dateTime.
        * Pokud numerické měsíce a dny v dateTime řetězce nejsou 0-polstrován (např. "3/7/2016") , ujistěte se, že formát má jen jeden M a d (např. "M/d/rrrr" ne "MM/dd/rrrr") .
        * Změnit jakoukoliv frakční sekundu specifikace, která používá malé s's (Např. přihrávka yyyy-MM-dd T'HH:mm:ss.ss) , do kapitálu S. (např. yyyy-MM-dd T'HH:mm:ss.SSS) .
        *    ERDDAP™ již nepodporuje datum řetězce Časové formáty s dvoumístnými roky (Yy) s implikovaným stoletím (např. 1900 nebo 2000) . Podniky utratily miliardy dolarů, když tento problém na konci 90. let řešily. Vědci by neměli používat dvě číslice let. Opravte prosím zdrojový soubor (án) přeměnou na čtyřmístné roky, poté použijte rrrr v den Časový formát.
        * Můžete použít rrrr nebo RRRR (která ERDDAP™ konvertuje na uuuu) k analýze čtyřmístných let včetně záporných let, např. -4712 (což je 4713 př. nl) . Díky SeaDataNet, Thomasi Gardnerovi a BODC.
        * Prosím pokračujte v používání Z ve formátu dateTime pro získání ERDDAP k analýze časové kompenzace (např. Z, +0200, -08, -0800, -08:30) .
        *    **Ujistěte se, že používáte Java verze 1,8.0\\_21 nebo vyšší.** 
        * Programátoři -- Když píšeš Java programy, které běží ERDDAP™ kód, musíte odstranit odkaz na joda-time. sklenice v parametru třídy.
    * NEW: ERDDAP 's [ArchivA Nástroj datové sady](/docs/server-admin/additional-information#archiveadataset) nyní může vytvořit [ **Soubory BagIt** ](https://en.wikipedia.org/wiki/BagIt) . NCEI může standardizovat tento formát. Díky Scottu Crossovi a Johnu Relphovi.
    * Odkazy ke stažení erddap. Válka proti ERDDAP™ webové stránky nyní ukazují na **GitHub** . (Jsou to veřejné odkazy, takže se nemusíš připojit k GitHubu.) To znamená mnohem rychlejší stahování (až 12Mb/s versus 1Mb/s) a několik problémů se stahováním. Díky Damianu Smythovi, Robu Fullerovi, Adamu Leadbetterovi, Conoru Delaneymu a irskému námořnímu institutu.
    * ZLEPŠENÉ: **status.html stránka a denní Status Report email** nyní zahrnuje část "Major LoadDatasets Time Series," která zobrazuje statistiky o ERDDAP™ od konce každého hlavního zatíženíDatasety pro posledních 100 hlavních zatíženíDatasety. Díky našemu nepříjemnému RAIDu.
    * NEW: nový, volitelný (ale doporučuje se) parametr pro EDDTableFromCassandra soubory dat: [ ** &lt;oddílKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeysv) . Díky Ocean Networks Canada.
    * Novinka: EDDTableFromAsciiFiles nyní podporuje ** &lt;sloupecSeparator &gt; ** parametr. Pokud null nebo "", třída bude hádat, jako předtím, Jinak, první znak bude použit jako sloupec oddělovač při čtení souborů. Díky Sky Bristol a Abigail Bensonové.
    * Novinka: nový typ souboru dat, [ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , může vytvořit soubor dat agregací [NCCSV .csv soubory](/docs/user/nccsv-1.00) . Díky Stevu Hankinovi.
    * ZLEPŠENÍ: **EDDTableFromErddap** použití .nccsv získat informace ze vzdáleného ERDDAP s a pro místní archiv těchto metadat info. To umožňuje plnou podporu pro znakové a dlouhé datové typy a pro Unicode (UCS-2) Charset pro Chars a Strings. Díky Robu Fullerovi a irskému námořnímu institutu.
    * ZLEPŠENÉ: EDDTableFromErddap a EDDGrid FromErddap nyní podporu ** &lt;přesměrování&gt;false&lt;/redirect&gt; ** který říká ERDDAP™ nikdy nepřesměrovat požadavek na ovladač ERDDAP . Default je pravdivý. To je užitečné, když ovladač ERDDAP™ je soukromý ERDDAP . Díky Damianu Smythovi, Robu Fullerovi a irskému námořnímu institutu.
    * ZLEPŠENÍ: ERDDAP™ nyní úlovky **zrušené žádosti o uživatele** dříve. A ERDDAP™ Nyní se vypne rychleji, protože nízkoúrovňové nitě se vypnou rychleji. Díky našemu nepříjemnému RAIDu.
    *    **Generovat soubory dat Xml:** 
        * NOVINKA: Nový speciální tisk EDDType "ncdump" [ncdump](https://linux.die.net/man/1/ncdump) \\-jako tisk hlavičky .nc Složka. Můžete také tisknout hodnoty dat pro zadané proměnné (nebo zadejte "nic," abyste nevytiskli žádné hodnoty dat) . To je užitečné, protože bez ncdump je těžké vědět, co je v souboru a tím, který EDDType byste měli zadat pro GenerateDatasetsXml. Díky Craig Risien, Rich Signell, Christopher Wingard a OOI.
        * NEW: For SeaData Čisté údaje:
Pokud je to vhodné, GenerovatNastavení dat Xml nyní provádí specifickou sémantickou konverzi pomocí vzdáleného dotazu SPARQL: pokud zdrojová metadata proměnné obsahuje sdn\\_parametr\\_urn, např. sdn\\_parametr\\_urn = "SDN:P01::PSLTZZ01," GeneratorDatasets Xml přidá odpovídající atribut P02, např. sdn\\_P02\\_urn = "SDN:P02::PSAL." Pokud máte soubory, které používají tyto atributy, a pokud ERDDAP 's&lt; categoryAttributes &gt; v setup.xml zahrnuje sdn\\_parameter\\_turn a sdn\\_P02\\_urn, uživatelé budou moci používat ERDDAP™ Kategorie vyhledávací systém pro vyhledávání souborů dat se specifickými hodnotami těchto atributů. Díky BODC a Alexandrě Kokkinaki.
        * ZLEPŠIT: GenerovatNastavení dat Xml nyní mění mnoho http:// odkazy v metadatech na https:// v případě potřeby.
        * ZLEPŠIT: GenerovatNastavení dat Xml se nyní snaží hádat tvůrce\\_type a vydavatele\\_type.
        * IMPROVED: DataTypes proměnné navrhuje GenerateDatasets Xml bude teď trochu lepší. Díky Margaret O'Brienové, LTER a EML.
        * ZLEPŠIT: GenerovatNastavení dat Xml je lepší v určení&lt;cdm\\_data\\_type&gt; a přidávání souvisejících, požadovaných atributů (např.&lt;cdm\\_timeseries\\_variables&gt;), takže můžete poskytnout tuto informaci. Díky Richi Signellovi.
        * ZLEPŠIT: Ve generováníDatasad Xml, pro datové soubory EDDTable, návrh pro&lt; subsetVariables &gt; je nyní mnohem konzervativnější. Díky Johnu Kerfootovi.
        * ZLEPŠENÍ: pokud datasets.xml pro datové soubory určuje featureType ale ne cdm\\_data\\_type, featureType bude použito jako cdm\\_data\\_type. Díky Richi Signellovi.
        * BUG FIX: generovat Datové soubory Xml nyní navrhuje správné&lt;dataType&gt; pro datové proměnné, které mají scale\\_factor , add\\_offset a/nebo \\_Nepodepsané atributy.
    * Kdy? ERDDAP™ otevře .nc soubor, který je **kratší** než to má být (např. nebyla zcela zkopírována na místo) , ERDDAP™ Teď bere složku jako špatnou. V minulých dílech... ERDDAP™ vrací chybějící hodnoty pro jakoukoli chybějící část souboru, protože to je výchozí chování pro netcdf-java. ERDDAP™ Nyní používá Ucar .nc 2.iosp.netcdf3.N3header.dislowFileTruncation = true; Díky naší nepříjemné RAID a Christian Ward-Garrison.
    * ZLEPŠENÉ: autor ISO 19115 nyní využívá **tvůrce\\_type** , pokud je přítomen.
    * ZLEPŠENÍ: ERDDAP™ Nyní používá nejnovější netcdf-java v4.6.9, který může číst další typy **netcdf-4 soubory** . Díky Craig Risien, Rich Signell, Christopher Wingard a OOI.
    * BUG FIX: Vyhněte se problémům, pokud mají různé zdrojové soubory různé datové typy pro danou proměnnou. Díky Royi Mendelssohnovi a Eugenovi Burgerovi.
    * BUG FIX: **Převody časových formátů** jsou nyní lépe chráněni před špatnými hodnotami času. Díky NDBC.
    * BUG FIX: EDDGrid FromNcFiles Odbalené nyní zpracovává časové hodnoty s **"Měsíce od... a roky od...** správně (zvyšováním měsíce nebo roku, a nikoli hrubou přidáním např. 30 dní opakovaně) . Díky Soda3.3.1.
    * BUG FIX: právě ve V1.74, **předplatné** požadovat opatření (např. http:// ...) , který byl a měl by být nepovinný.
    * BUG FIX: EDDGrid OdMergeIRFiles.lowZískatZdrojMetadata () nepřidal žádné globální atributy. Teď už ano.
         

## Verze 1.74{#version-174} 
 (propuštěn 2016-10-07) 

*    **Nové funkce (pro uživatele) :**   
     
    * Nyní, když seznam datových souborů (Všechny, nebo z hledání) je zobrazena na webové stránce, dlouhé tituly jsou zobrazeny na více řádcích. Dříve, uprostřed dlouhého názvu byl nahrazen " ... ." Díky Margaret O'Brienové, LTER a EML.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   
     
    * TO DO: Na Linux počítačích, změnit nastavení timeout Apache tak, aby časově náročné požadavky uživatelů don't timeout (s tím, co často vypadá jako chyba "Proxy" nebo "Bad Gateway") . Jako uživatel kořene:
        
        1. Upravit Apače http d.conf soubor (obvykle v /etc/ http d/conf/) :
Změnit existující&lt;Timeout &gt; nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
Změnit existující&lt;ProxyTimeout &gt; nastavení (nebo přidat jeden na konci souboru) do 3600 (sekund) , místo výchozí 60 nebo 120 sekund.
        2. Restartujte Apache: /usr/sbin/apachectl - K elegantní. (ale někdy je v jiném adresáři) .
        
Díky Thomasi Oliverovi.
         
    * NEW: \\[ velkýRodič/tvrdý Adresář vlajky
To funguje jako adresář vlajky, ale verze hardFlag také smaže všechny cachované informace datového souboru. Nejsou žádné URL pro nastavení pevné vlajky. To lze použít pouze vložením souboru do tohoto adresáře.
tvrdá Vlajky jsou velmi užitečné, když uděláte něco, co způsobí změnu v tom, jak ERDDAP™ čte a interpretuje zdrojová data, například při instalaci nové verze ERDDAP™ nebo pokud jste provedli určité typy změn definice datového souboru v datasets.xml . Viz [Tato dokumentace](/docs/server-admin/additional-information#hard-flag) . Díky Johnu Kerfootovi a všem skupinám Argo.
         
    * Novinka: GenerovatDatasety Xml má nyní možnost eddtableFromEML
který čte popis souboru údajů v ekologickém jazyce metadat (EML) soubor, stáhne související datový soubor a vytvoří část datasets.xml tak, aby soubor údajů mohl být přidán ERDDAP . Tam je také EDDTableFromEMLBatch, který dělá totéž pro všechny EML soubory v adresáři. To funguje velmi dobře, protože EML dělá vynikající práci při popisu datového souboru a protože KNB a LTER, aby skutečné datové soubory k dispozici.
EML plus ERDDAP™ Mohla by to být skvělá kombinace, protože ERDDAP™ mohou uživatelům poskytnout přímější přístup k bohatství dat KNB a LTER a pomoci těmto projektům splnit americkou vládu [Přístup veřejnosti k výsledkům výzkumu (PARR) požadavky](https://nosc.noaa.gov/EDMC/PD.DSP.php) zpřístupněním údajů prostřednictvím webové služby.
Viz [Tato dokumentace](/docs/server-admin/EDDTableFromEML) . Díky Margaret O'Brienové, LTER a EML.
         
    * Novinka: GenerovatDatasety Xml má nyní možnost eddtableFromInPort
který čte popis souboru v souboru InPort XML a snaží se vytvořit část datasets.xml tak, aby soubor údajů mohl být přidán ERDDAP . To zřídka vytváří připravený kus XML pro datasets.xml , ale to vytvoří dobrý hrubý návrh, který je dobrým výchozím bodem pro editaci člověkem.
Bylo by skvělé, kdyby lidé, kteří používají InPort k dokumentování svých souborů, také používali ERDDAP™ zpřístupnit skutečné údaje prostřednictvím ERDDAP 's webovými službami, a tím splnit americkou vládu's a NOAA 's [Přístup veřejnosti k výsledkům výzkumu (PARR) požadavky](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) zpřístupněním údajů prostřednictvím webové služby. Tohle je řešení, které by se teď dalo použít. ( erd.data at noaa.gov Rád vám pomůže.)   
Viz [Tato dokumentace](/docs/server-admin/datasets#eddtablefrominport) . Díky Evanu Howellovi a Melanie Abecassisové.
         
    * ZLEPŠENÍ: ERDDAP™ Nyní používá netcdf-java 4.6.6.
S dřívějšími verzemi, netcdf-java číst některé hodnoty vyplnit (Možná jen v netcdf-4 souborech) jako 0. Nyní se některé z nich čte jako standardní hodnota netcdf fill: -127 pro bajty, -32767 pro šortky, -2147483647 pro ints. Unidata Říká, že nové chování je správné chování. Pokud proměnná v datovém souboru začne zobrazovat jednu z těchto hodnot, kde se zobrazují 0, můžete přidat např.:
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
k proměnné addAttributes říct ERDDAP™ považovat tuto hodnotu za missing\\_value /\\_Fill Hodnota. Nicméně, v mnoha případech, že nebude mít požadovaný výsledek: 0. Pokud ano, zvažte změnu souborů s NCO nebo přepsat soubory. Stížnosti? Prosím kontaktujte Unidata ;-)
         
    * DO: Nová topografická paleta
Doporučuji vám přepnout všechny soubory, které používají paletu OceanDepth k použití nové palety TopographyDepth, která je jako Topography s výjimkou barev převrátil, takže je vhodná pro hodnoty hloubky (position=down) , místo nadmořské výšky (plus=up) . Doporučená nastavení pro tuto paletu jsou:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NOVÁ FEATURE: String missing\\_value a/nebo \\_FillValue
Pokud proměnná String definuje a missing\\_value a/nebo \\_FillValue, ERDDAP™ nyní odstraní tyto hodnoty z dat a nahradí je prázdným řetězcem, takže chybějící hodnoty se objeví jako prázdné řetězce, stejně jako jiné soubory souborů v ERDDAP . Díky Margaret O'Brienové, LTER a EML.
         
    * NOVÁ FEATURE: Podpora místních časů
proměnné časového razítka se zdrojovými daty ze Strings nyní mohou určit časové pásmo přes " time\\_zone " atribut, který vede ERDDAP™ převést na místní čas-zóna zdrojové časy (někteří ve standardním čase, někteří v denním světle šetří čas) do Zulu krát. Seznam platných názvů časových pásem je pravděpodobně totožný se seznamem ve sloupci TZ [Tato tabulka](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Výchozí je " Zulu ". Společná americká časová pásma jsou: USA/Hawaii, USA/Alaska, USA/Pacific, USA/Mountain, USA/Arizona, USA/Central, USA/Východ. Pro proměnné časového razítka s číselnými zdrojovými daty můžete zadat " time\\_zone " atribut, ale hodnota musí být " Zulu "nebo "UTC." Díky Margaret O'Brienové, LTER a EML.
         
    * NOVÁ FEATURE: EDDTableFromAsciiFiles nyní podporuje středníky oddělené soubory
a je chytřejší na zjištění oddělovače. Díky Margaret O'Brienové, LTER a EML.
         
    * NOVÁ FEATURE: Pokud dojde k významné chybě v loadDatasets (hlavní nebo menší, např. chybějící nebo neplatný datasets.xml doklad) , ERDDAP™ bude nyní uvádět v status.html, přímo pod "n Datasets Failed To Load" jako ERROR: při zpracování datasets.xml : Podrobnosti viz log.txt.
         
    * NOVÁ FEATURE: ERDDAP™ Hledá sirotky.
Kdy? ERDDAP™ Dělá velké zatížení Datasety, teď hledá osiřelé soubory. (Soubory údajů, které jsou v ERDDAP™ ale ne v datasets.xml ) . Jsou-li nalezeny, jsou uvedeny v status.html, přímo pod "n Datasets selhalo načíst" jako ERROR: n Orphan Datasets (Soubory údajů v ERDDAP™ ale ne v datasets.xml ) = ....
Pokud chcete odstranit (vyložit) sirotka z ERDDAP™ , musíte přidat
        &lt;Typ datového souboru="" datasetID ="_theDatasetID_" active="false" /&gt;
až datasets.xml dokud nebude soubor údajů vyložen během dalšího velkého zatíženíDatasets.
         
    * BUG FIX: Pokud má datový soubor numerickou proměnnou časového razítka s jinými jednotkami než "seconds since 1970-01-01T00:00:00Z" a s&lt;updateEveryNMillis&gt; system active, the timemark's range was closed when the database was update. Díky Johnu Kerfootovi.
         
    * FIX: pokud&lt;quickRestart&gt; byl true in setup.xml a vy jste si vyžádali data z EDDTableFrom... Soubory, které používají&lt;updateEveryNMillis&gt;, první požadavek na datový soubor by selhal, ale následné žádosti by uspěly. První žádost nezklame. Díky Johnu Kerfootovi.
         
    * BUG FIX: GenerateDatasetsXml.sh a .bat nefungovaly s parametry &gt; 9 na příkazovém řádku. Teď už ano. Díky Johnu Kerfootovi.
         
    * BUG FIX: Nový EDDTableFromMultidimNcFiles důsledně neodstranil stezkové prostory ze strun. Teď už ano. To ovlivnilo především soubory ARGO. Díky Kevinu O'Brienovi a Rolandu Schweitzerovi.
         
    * BUG FIX: Všechny přístupy vzdálené DAP Služby jsou nyní iniciovány moderním kódem. Tím se spraví chyba "připojení uzavřeno" při přístupu k některým datům EDDTableFromErddap. Díky Kevinu O'Brienovi.
         
    * BUG FIX: Léčba orderBy ... () a zřetelné () jsou nyní zpět k tomu, jak byly před nedávnými změnami: daná žádost může mít více orderBy ... () a/nebo odlišné () filtr; ERDDAP™ budou jednat v pořadí, které jsou uvedeny. Díky Davidovi Karugovi.
         
    * BUG FIX: Pokud je datový soubor EdDtableFromDatabase a dotaz má [zdrojCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) nebo [zdrojCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) , pak databáze může (v závislosti na nastavení datasets.xml ) částečně nebo zcela rukojeť **pouze první**   orderBy .. () nebo odlišné () . Díky Davidovi Karugovi.
         
    * BUG FIX: Nedávné extra procento kódování způsobilo problémy s některými dotazy na .nc CF soubory, např. "HTTP status 500 - Chyba dotazu: proměnná=station je uvedena dvakrát v seznamu proměnných výsledků." Díky Kevinu O'Brienovi.
         
    * BUG FIX: EDDTableFromFoles měl problém načíst soubor, když jeden ze sloupců byl skutečný sloupec char. Díky Rolandu Schweitzerovi.
         
    * BUG FIX: EDDGrid FromNcFiles Vybalené nyní také konvertuje missing\\_value a \\_FillValue ke standardním hodnotám, takže soubory s různými hodnotami lze shrnout. Kvůli této změně, po instalaci této nové verze ERDDAP™ , prosím nastavte [tvrdá Označení](/docs/server-admin/additional-information#hard-flag) pro každý EDDGrid FromNcFiles Vybalený soubor dat ve Vašem ERDDAP .
         
    * IMPROVED: EDDTableFromNcCFFiles nyní může zvládnout soubory, které mají více vzorků\\_dimension's. Zadaný datový soubor musí používat pouze proměnné, které používají jednu ze vzorků\\_rozměrů. Díky Ajayi Krishnanovi.
         
    * ZLEPŠENÉ: Pro EDDTableFrom...&lt;seřazenoFilesBySourceNames&gt; nyní umožňuje čárku oddělenou (doporučené) nebo mezerou oddělené seznamy jmen proměnných zdrojů. V každém případě mohou být jednotlivé názvy proměnných obklopeny dvojími uvozovkami, např. pokud má název vnitřní prostor.

## Verze 1.72{#version-172} 
 (propuštěn 2016-05-12) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * NOVÉ EDDTableFromMultidimNcFiles [EDDTablefromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) je nová alternativa k EDDTableFromNcFiles. Je navržen tak, aby se zabýval skupinami souborů s několika proměnnými se sdílenými rozměry, např. var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] , skalárVar. Díky projektu Argo, Aurélie Briand a Rolandu Schweitzerovi.
    * BUG FIX: ERDDAP™   (přes třídy FileVisitorDNLS a FileVistorSubdir) Nyní následuje symbolické odkazy na Linux. ERDDAP™ Pořád to nechápu.
    * BUG FIX chyby zavedené v 1.70: odlišné + orderBy nebyly povoleny společně v jedné žádosti. Teď jsou zase. Nejsou vzájemně exkluzivní/redundantní. Díky Davidovi Karugovi.
    * Změna na datasets.xml černý seznam IP adres:
Zdá se, že IP v4 adresy ERDDAP™ jako 4 perioda oddělená čísla hex.
Myslím, že IP v6 adresy se zobrazují jako 8 dvojtečí oddělovaná čísla.
Takže... ERDDAP™ nyní podporuje dvojtečky v IP adresách v tomto seznamu a :\\* na konci seznamu blokovat řadu adres.
    * ZLEPŠENÍ: ERDDAP™ nyní používá NetcdfFileWriter psát .nc soubory místo deprecovaných NetcdfFileWriteable. V výsledných souborech by neměla dojít k žádné zřetelné změně. Tím se otevírá možnost velkého .nc Soubory, které používají .nc 3 64bitová rozšíření. Pokud to chcete/potřebujete, zašlete prosím žádost erd.data at noaa.gov .
    * Mnoho odkazů na vzdálené webové stránky bylo zastaralých. Nyní jsou aktuální a používají https: místo http : pokud možno.
    * Mnoho malých změn.

## Verze 1.70{#version-170} 
 (propuštěn 2016-04-15) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** Níže je několik doporučených změn dokumentace ve vašem setup.xml souboru.
Prosím, udělejte teď ty změny.
30 minut práce vám může v budoucnu ušetřit hodiny zmatení.
    * Oprava chyb: Problém byl, že žádosti, které byly přesměrovány na vzdálený ERDDAP selhal s neplatným znakem ' | ' chybová zpráva. K tomu došlo pouze s nedávnou verzí Tomcat. Díky Rusty Hollemanovi, Conoru Delaneymu a Royi Mendelssohnovi.
    * Oprava chyb: ERDDAP™ nyní používá aktuální verzi netcdf-java (To je dlouhý příběh.) který zahrnuje aktuální podporu pro NcML, která řeší problém s NcML LogicalReduce nefunguje podle očekávání. Může dojít k několika drobným změnám metadat, která ERDDAP™ čte přes netcdf-java .nc , .hdf , .grib, a .bufr soubory. Díky Faviovi Medranovi.
    * Nový [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) umožňuje vytvořit sloučený soubor EDDTable ze dvou nebo více souborů EDDTable, které mají stejné datové proměnné za použití stejných jednotek. Díky Kevinu O'Brienovi.
    * Nové možnosti pro EdDtableFromDatabase ( [zdrojCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) a [zdrojCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) Upřesněte, zda ERDDAP™ , databáze, nebo obojí, zvládnout odlišné a orderBy   (a všechny varianty) omezení. Díky Davidovi Karugovi.
    * Nyní můžete zpřístupnit grafy a metadata soukromého datového souboru veřejnosti prostřednictvím nového [&lt;grafyPřístupnéTo&gt;veřejná&lt;/grafyPřístupnéTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) Tagu. Díky Emanuele Lombardimu.
    * Nyní, pokud řetězec přešel na GenerateDatasets Xml nebo DasDds je obklopen dvojitými citacemi, to je nequoted (jako by to byl JSON řetězec) . Díky Johnu Kerfootovi a Melanie Abecassisové.
    * Generovat soubory dat Xml nyní podporuje "výchozí" získat výchozí a "nic" získat prázdný řetězec (pracují s citacemi nebo bez nich) . Tím se řeší některé problémy související s průchodem prázdných řetězců.
    * Nyní, v GenerateDatasets Xml, pro všechny EDDGrid FromFiles a EDDTable Soubory údajů ze souborů, pokud vzorek Název souboru, který zadáte je "" (prázdný řetězec) , použije poslední odpovídající souborJméno z adresáře + regex + rekursive=true.
    * Updated: DisplayInBrowser kód, který se používá k zobrazení výsledků GenerateDatasetsXml a DasDds na Linux počítačích byl zastaralý a dal zvláštní zprávu o Netscape. Tohle používá moderní nástroj Linux: xdg-open. Díky Melanie Abecassisové.
    * The allDatasets Databáze má nyní "files" sloupec, který označuje základní URL odkazu /files (pokud nějaký existuje) pro datový soubor.
    * Zvýšit obecnou bezpečnost ERDDAP™ změnou oprávnění spojených s adresářem tomcat a bigParentDirectory:
         (Aktuální příkazy níže jsou pro Linux. U ostatních OS udělejte obdobné změny.) 
        * Změňte "skupina" být tomcat, vaše uživatelské jméno, nebo název malé skupiny, která zahrnuje tomcat a všechny správce Tomcat/ ERDDAP např.
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your UserName bigParentDirectory_
        * Změnit oprávnění tak, aby Tomcat a skupina četli, psali, prováděli práva, např.
Chmod -R ug+rwx apache-tomcat-_8.0.23_
Chmod -R ug+rwx _bigParentDirectory_
        * Odstranit "ostatní" uživatelská oprávnění ke čtení, zápisu nebo spuštění:
chmod -R o-rwx apache-tomcat-_8.0.23_
Chmod -R o-rwx _bigParentAdresar_
To je důležité, protože to brání ostatním uživatelům číst možná citlivé informace v ERDDAP™ nastavit soubory, log soubory a soubory s informacemi o soukromých datových souborech.
    * Autentizační/loginový systém byl přestavěn. Díky Thomasi Gardnerovi, Emanuele Lombardimu a nové vládě USA [Pouze HTTPS standard](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Autentizace=openie byla odstraněna. Bylo to zastaralé.
        * Nový, doporučený, [autentizace=google](/docs/server-admin/additional-information#google) možnost použití Přihlášení do Google (na základě OAuth 2.0) umožnit komukoliv s e-mailovým účtem Google (včetně Google spravuje účty jako @noaa.gov ) k přihlášení.
        * Nový, [autentizace=email](/docs/server-admin/additional-information#email) volba je záloha pro autentizaci=google. Umožňuje uživatelům s&lt;tag uživatele &gt; datasets.xml k přihlášení zasláním e-mailu se speciálním odkazem.
        * Ve vašem nastavení.xml, prosím změňte popis pro&lt;autentizace&gt; má být
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

        * V nastavení.xml, prosím, přidejte to přímo pod&lt;ověření _BAR_ Značka
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

        * Uživatelé, kteří nejsou přihlášeni, mohou použít http nebo https URL (pokud jste nastavili&lt;baseHttpsUrl&gt; ve vašem setup.xml). Díky nové vládě USA [Pouze HTTPS standard](https://https.cio.gov/) .
        * Nyní můžete povzbudit všechny uživatele k použití https   (ne http ) nastavením&lt;baseUrl &gt; to be an https URL. Donutit uživatele používat pouze https , musíte také provést změny v nastavení Apache/Tomcat blok non- https přístup. Díky nové vládě USA [Pouze HTTPS standard](https://https.cio.gov/) .
            
Ve vašem nastavení.xml, prosím změňte popis pro&lt;baseUrl &gt; to be
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

        * Možnosti&lt;Heslo Kódování&gt; změnil. Ve vašem nastavení.xml, prosím změňte popis pro&lt;Heslo Kódování&gt; má být
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

        * Ve vašem nastavení.xml, prosím změňte popis pro&lt;baseHttpsUrl &gt; má být
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

        * Nyní, pokud listPrivateDatasets=true v setup.xml, ještě méně informací bude zobrazeno o souborech dat, ke kterým uživatel nemá přístup.
    * Obzvlášť, když jste si původně nastavili ERDDAP Teď už to poznáš. ERDDAP™ nezkoušet se přihlásit ke vzdálenému ERDDAP™ Data. Díky Filipe Rocha Freire.
Ve vašem nastavení.xml, těsně před&lt;písmoRodina&gt;, prosím, přidejte
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

    * V nastavení.xml, v návodu výše&lt;EmailFromAddress&gt;, vložte prosím:
Pokud je to možné, nastavte to pro použití zabezpečeného spojení (SSL / TLS) na e-mailový server.
Pokud vaše nastavení nepoužívá bezpečné připojení k e-mailovému serveru, prosím, udělejte změny, aby tomu tak bylo.
    * Ve vašem datasets.xml , prosím přidejte tento řádek k popisu&lt;předplatnéEmailBlacklist &gt; ve Vašem datasets.xml :
Můžete použít jméno "\\*"na černou listinu celé oblasti, např.\\*@example.com .
    * Vzhledem k tomu, že změna systému záznamu v v1.66, není soubor záznamu nikdy aktualizován. Do souboru s logem vždy čekají zprávy nebo části zpráv. Teď to můžete aktualizovat. (na okamžik) sledováním vašeho ERDDAP 's status webová stránka nahttp://_your.domain.org_/erddap/status.html.
    * HashDigest .......
    * Malá změna. (na String2.canonical) To by mělo pomoci udržet věci v pohybu rychle, když ERDDAP™ je velmi zaneprázdněný a také lepší řešení s velmi velkým počtem souborů dat.
    * Silně. Doporučeno: přestaňte používat&lt;convertToPublicSourceUrl&gt; v datasets.xml převést číslo IP v datovém souboru&lt; sourceUrl &gt; (např.http://192.168.#.#/) do jména domény (např. http : my. domain.org/) . Od této chvíle, nové předplatnéhttp://localhost,http://127.0.0.1ahttp://192.168.#.#URLS nebudou povoleny z bezpečnostních důvodů. Takže prosím vždy použijte název veřejné domény v&lt; sourceUrl &gt; značka (v případě potřeby kvůli problémům DNS) , můžete použít [/etc/hosts tabulka na vašem serveru](https://linux.die.net/man/5/hosts) vyřešit problém převodem místních doménových jmen na IP čísla bez použití DNS serveru. Můžete otestovat, zda se dané jméno domény správně vyřeší pomocí
ping _some.domain.name_
    * V generováníDatasets.xml, pro vzdálené soubory dat (např. ze serveru THREDDS) , automaticky generované datasetID s se nemění pro většinu domén. Pro několik oblastí, první část (tj. jméno) automaticky generované datasetID bude to trochu jiné. Jména, která měla jednu část, mají nyní spíš dvě části. Například datové soubory zhttp://oos.soest.hawaii.edudříve datasetID s, která začala s hawaii\\_, ale nyní vede k datasetID s, které začínají s hawaii\\_soest\\_ . Pokud vám to způsobí problémy, pošlete mi e-mail. Možná je tu nějaká práce.
    * Cassandra řidič byl aktualizován na cassandra-driver-core-3.0.0.0.jar a tedy pro Cassandra v3. EddtableFromCassandra nevyužívá žádné nové funkce v Cassandra v3. Indexy v Cassandra může být nyní složitější, ale ERDDAP™ stále používá Cassandra v2 index model, který předpokládá, že indexovaný sloupec může být přímo dotazován s '=' omezení. Generovat soubory dat Xml pro EDDTableFromCassandra již detekuje sloupce s indexy; je-li index jednoduchý, musíte jej zadat v datasets.xml ručně. Pokud potřebujete podporu pro složitější indexy nebo jiné nové funkce, prosím e-mail erd.data at noaa.gov .
&#33;&#33; Jestliže stále používáte Cassandru 2.x, pokračujte v používání ERDDAP™ v1.68 dokud neupgrade na použití Cassandra 3.x.
    * Jars a Classpath -- Téměř všechny zahrnuté třetí strany .jar soubory byly aktualizovány na jejich nejnovější verze.
        * slf4j.jar byl přidán do /lib a třídní stezky.
        * Joid. Jar a Tsik. sklenice byla odstraněna z /lib a třídní stezky.
        * Pokud dostanete chybové zprávy o třídách nenalezen při kompilaci nebo spuštění ERDDAP™ nebo jeden z jeho nástrojů, porovnejte třídu vaší velitelské linie s ERDDAP 's [současná třídní stezka](/docs/contributing/programmer-guide#development-environment) Zjistit, které .jars chybí z vaší třídy.

## Verze 1.68{#version-168} 
 (propuštěn 2016-02-08) 

*    **Nové funkce (pro uživatele) :** Žádné.
     
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    [ EDDGrid FromFiles Agregace přes názvy souborů nebo globální metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Všechny varianty EDDGrid FromFiles nyní může agregovat skupinu souborů přidáním nového levicového rozměru, obvykle času, na základě hodnoty odvozené z každého názvu souboru nebo z hodnoty globálního atributu, který je v každém souboru.
    * Dřív jsme navrhli, že byste mohli chtít vytvořit EDDGrid FromErddap soubor ve vašem datasets.xml která odkazuje na a re-served jplMU RSS Databáze T v našem ERDDAP . Vzhledem k tomu, že nyní existuje novější verze tohoto datového souboru, je tento datový soubor nyní deprecován. Takže pokud máte tento soubor ve svém ERDDAP™ , prosím přidejte tento nový datový soubor
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Pokud chcete odstranit starý jplMU RSS Soubor T z vašeho souboru ERDDAP™   (Je to na tobě.) , změnit jeho aktivní nastavení z "true" na "false."
    * Oprava chyb: Prosím, zkontrolujte velkýDirectory Parent, které jste uvedli v nastavení.xml. Pokud jste nedali lomítko na konci&lt;bigParentDirectory&gt; name, then ERDDAP™ vytvoří několik adresářů tím, že připojí slova přímo k názvu, který jste zadali, namísto vytváření podadresářů. Od verze 1.68, ERDDAP™ přidat lomítko na konec názvu adresáře, pokud jste nespecifikovali jeden. Takže pokud jste předtím nespecifikovali lomítko na konci, pak když nainstalujete ERDDAP™ v1.68 musíte přesunout a přejmenovat tyto adresáře **po** Zastavíš staré ERDDAP™ a **předtím** spustíš nový ERDDAP . Například, pokud jste mylně určili bigParentDirectory jako /home/erddapBPD (žádná stopa) a ERDDAP™ špatně vytvořil adresáře jako
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucen
a soubor s názvem /home/erddapBPDsubscriptionsV1.txt,
pak se musíte přestěhovat a přejmenovat je tak, aby byly
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucen
a /home/erddapBPD/předplatnéV1.txt
    * Oprava chyb: Byli tam brouci. EDDGrid LonPM180 in ERDDAP™ v1.66, k němuž došlo, když je dětský soubor údajů EDDGrid Z Erddapu.
    * Oprava chyb: Byla tam chyba. EDDGrid FromFiles a EDDTable FromFiles in ERDDAP™ v1.66, který způsobil&lt;updateEveryNMillis &gt; ignorovat poprvé soubor dat byl načten po restartu.
    * Oprava chyb/Nová funkce: Pokud je soubor údajů o dítěti uvnitř EDDGrid AgregátExising Dimension, EDDGrid Rozumím. EDDGrid OdEDDTable, EDDGrid LonPM180, EDDGrid SideBySide, EddtableCopy nebo EddtableFrom EDDGrid je ...FromErddap soubor, který mateřský datový soubor nyní připisuje k podkladovému ERDDAP™ Soubor dat. V případě podkladového nástroje ERDDAP™ Databáze je stejná ERDDAP™ , předplatné a jeho validace se provádí přímo; nedostanete e-mail, který vás žádá o potvrzení předplatného. V opačném případě, pokud systém předplatného pro vaše ERDDAP™ je vypnutý, nastavte&lt;reloadEveryNMinutes&gt; nastavení rodičovského datového souboru na malé číslo (60?) takže zůstane aktuální.
    * Oprava chyb/Nová funkce: Pokud je soubor údajů o dítěti uvnitř EDDGrid AgregátExising Dimension, EDDGrid Rozumím. EDDGrid OdEDDTable, EDDGrid LonPM180, EDDGrid SideBySide, EddtableCopy nebo EddtableFrom EDDGrid má aktivní="false," že dětský datový soubor je nyní přeskočen.

## Verze 1.66{#version-166} 
 (propuštěn 2016-01-19) 

*    **Nové funkce (pro uživatele) :** 
    * Grafy (ne mapy) nyní mohou mít na osách sestupné hodnoty. Chcete-li to získat při použití webové stránky Make A Graph, změnit novou Y Axis : vzestupné nastavení (výchozí) na klesání. Nebo v URL, která požaduje graf, použijte nový volitelný 3. ' | ' parametr pro [&.x Rozsah a/nebo &. Přepínače yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , Který nemůže být nic (výchozí) , true, nebo t získat vzestupné hodnoty, nebo použít falešné nebo f získat sestupné hodnoty. Pravda. | falešná hodnota je necitlivá. Díky Chrisi Fulliloveovi, Johnu Kerfootovi, Lukovi Campbellovi a Care Wilsonové.
    * Uživatelé nyní mohou určit barvu pozadí pro grafy přidáním &.bgColor=0x_ AARRGGBB_ přepnout na URL, které požaduje graf. Viz .bgColor v části Příkazy grafiky [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) a [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) dokumentace. Díky Johnu Kerfootovi a Lukovi Campbellovi.
    * U tabulkových datových souborů mohou omezení nyní odkazovat na min. (_someVariableName_) nebo max (_someVariableName_) . Viz [min () a max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Díky Johnu Kerfootovi.
    * Pro soubor tabulkových dat, časová omezení, která používají [Teď](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) může nyní určit časové jednotky milisekund nebo milisekund.
    * Žádost o obrázek tabulkového datového souboru nyní vytváří mapu (není graf) pokud proměnné x a y jsou proměnné délky a zeměpisné šířky jako proměnné (kompatibilní jednotky) . Díky Richi Signellovi.
    * Oprava chyb: Etikety časové osy a klíšťata někdy měly podivné nesrovnalosti při žádosti o více grafů současně (např. na webové stránce) . Problémem byla chyba v knihovně grafiky SGT, která ERDDAP™ použití (jedna proměnná byla "statická," která neměla být) . Díky Bradfordu Butmanovi.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Je to bezpečnostní riziko dát své e-mailové heslo do textového souboru, jako je setup.xml. Abychom tento problém zmírnili, důrazně doporučujeme:
        1. Nastavit e-mailový účet jen pro ERDDAP "s použitím, např., erddap@yourInstitution.org . To má i jiné výhody; zejména více než jeden ERDDAP™ Správce pak může mít přístup k tomuto e-mailovému účtu.
        2. Udělejte oprávnění souboru setup.xml rw (read+write) pro uživatele, který spustí Tomcat a ERDDAP™   (user=tomcat?) a žádná povolení (nečtete ani nepíšete) pro skupinu a ostatní uživatele. Díky Filipe Rocha Freire.
    * Nový [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) nástroj zjednodušuje tvorbu .tar  .gz archiv s podmnožinou datového souboru ve formátu vhodném pro archivaci (zejména při NOAA 's NCEI) . To by mělo být užitečné pro mnohé ERDDAP™ Správci v mnoha situacích, ale zejména pro skupiny uvnitř NOAA .
    * Nový typ datového souboru [ EDDGrid FromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked) je varianta EDDGrid Z NcFiles. Rozdíl je v tom, že tato třída vybalí každý datový soubor před EDDGrid FromFiles se dívá na soubory:
        
        * Vybaluje zabalené proměnné, které používají scale\\_factor nebo add\\_offset .
        * Propaguje celočíselné proměnné, které mají \\_Unsigned=true atributy většího integer datového typu, aby se hodnoty objevovaly jako nepodepsané hodnoty. Například \\_Unsigned=true byte (8 bitů) proměnná se stává podepsaná krátká (16 bit) proměnná.
        * Převádí \\_FillValue a missing\\_value hodnoty, které mají být NaN (nebo MAX\\_VALUE pro celé datové typy) .
        
Velkou výhodou této třídy je, že poskytuje způsob, jak se vypořádat s různými hodnotami scale\\_factor , add\\_offset , \\_FillValue nebo missing\\_value v různých souborech ve sbírce. Jinak byste museli použít nástroj jako [NcML](/docs/server-admin/datasets#ncml-files) nebo [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) upravit každý soubor k odstranění rozdílů tak, aby soubory mohly být řešeny EDDGrid Z NcFiles. Aby tato třída správně fungovala, musí soubory dodržovat standardy CF pro související atributy. Díky Philippu Makowskimu.
    * Nový typ datového souboru [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) umožňuje měnit soubory dat, které mají některé hodnoty délky větší než 180 (např. rozsah 0 až 360) do souborů s hodnotami délky v rozmezí -180 až 180 (Zeměpisná délka Plus nebo Minus 180, proto název) . Velkou výhodou pro nabízení souborů dat s hodnotami délky v rozsahu -180 až 180 je, že OGC Služby (např. WMS ) vyžadují hodnoty délky v tomto rozsahu. Díky Lynne Tablewski, Fabien Guichard, Philippe Makowski a Martin Spel.
2016-01-26 Aktualizace: Eeek&#33; To má chybu, která nastane, když dětský datový soubor je EDDGrid FromErddap, který odkazuje na datový soubor ve stejném ERDDAP . Tato chyba je opravena ERDDAP™ v1.68.
    * In [GenerovatDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) , nový speciální typ datového souboru, EDDGrid LonPM180FromErddapCatalog, umožňuje generovat datasets.xml místo EDDGrid LonPM180 datové soubory ze všech EDDGrid data v souboru ERDDAP jejichž délka je větší než 180.
    * Pro všechny EDDGrid datové soubory, v datasets.xml Nyní můžete použít volitelné
[&lt;přístupný Via WMS &gt; true | false&lt;/přístupný Via WMS &gt;] (/docs/server-admin/datasets#accessibleviawms)   (default= true) . Nastavení tohoto na falešně násilně vyřadí WMS služba pro tento datový soubor. Pokud je to pravda, soubor údajů nemusí být stále přístupný prostřednictvím WMS z jiných důvodů (např. bez lat nebo lonových os) . To je zvláště užitečné pro soubory, které existují na vlastní pěst a zabalené EDDGrid LonPM180, takže pouze verze LonPM180 je přístupná přes WMS .
    * V setup.xml můžete zadat jinou výchozí barvu pro pozadí grafů. Barva je specifikována jako osmimístný hexadecimální hodnota ve formě 0x_AARRGGBB_, kde AA, RR, GG a BB jsou opacita, červené, zelené a modré složky, uvedené jako 2-místný hexadecimální čísla. Všimněte si, že plátno je vždy neprůhledné bílé, takže (polo -) transparentní barva pozadí grafu se mísí do bílé plátno. Výchozí hodnota je světle modrá:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Díky Johnu Kerfootovi a Lukovi Campbellovi.
    * V setup.xml, můžete nyní určit maximální velikost pro [soubor záznamu](/docs/server-admin/additional-information#log)   (při přejmenování na log. Txt. předchozí a nový deník. txt je vytvořen) V MegaBytech. Minimální povoleno je 1. Maximální povoleno je 2000. Výchozí hodnota je 20 (MB) . Například:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * In datasets.xml , [&lt;fgdcFile&gt;] (/docs/server-admin/datasets#fgdcfile) nebo [&lt;iso19115File&gt;] (/docs/server-admin/datasets#iso19115file) nyní může být místní soubor (jako dříve) nebo URL (která bude stažena, takže je místní kopie) . Pokud ERDDAP™ není schopen soubor stáhnout, načítání datového souboru bude pokračovat, ale datový soubor nebude mít fgdc nebo iso19115 soubor.
    *    EDDGrid FromFiles a EDDTable Soubory dat zFiles nyní mohou udělat rychlýRestart (systém, který ERDDAP™ se snaží použít při prvním načtení souborů dat ERDDAP™ restartováno) . Toto urychluje restartování ERDDAP .
2016-01-26 Aktualizace: Eeek&#33; To má chybu, která způsobuje&lt;updateEveryNMillis &gt; ignorovat poprvé soubor dat je načten po restartu. Tato chyba je opravena v ERDDAP™ v1.68.
    * Obecné zlepšení systému quickRestart umožňuje ERDDAP™ načíst soubory dat rychleji, když ERDDAP™ restartováno.
    * Všechny EDDGrid FromFiles a EDDTable FromFiles subclasses nyní přijmout nový&lt;pathRegex&gt; značka, obvykle uvedená přímo pod&lt;rekursive&gt;. Pokud rekurzivní je "true," pouze plné podadresové cesty, které odpovídají cestěRegex (default=".\\*") budou přijaty. Podobně, a&lt; sourceUrl s&gt; značka v EDDGrid AgregátExisingDimension může nyní obsahovat atribut pathRegex (default=".\\*") .
    * Výchozí pro&lt;particularRequestMaxBytes&gt; in setup.xml je nyní 490000000 (~490 MB) . Tím se zabrání některým problémům/timeoutům souvisejícím s získáváním dat z datových serverů THREDDS. Díky Leslie Thorneové.
    * Malá změna systému záznamů by měla umožnit ERDDAP™ být citlivější, když je velmi, velmi zaneprázdněný. Informace jsou nyní napsány do souboru protokolu na disku ve poměrně velkých částech. Výhodou je, že je to velmi efektivní... ERDDAP™ nebude nikdy blokovat čekání na informace, které mají být zapsány do souboru protokolu. Nevýhodou je, že deník téměř vždy skončí částečnou zprávou, která nebude dokončena, dokud nebude napsán další kus.
    * Oprava chyb týkající se inotify a [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis) systém EDDGrid FromFiles a EDDTable Databáze souborů: Už není nutné specifikovat velké množství fs.inotify.max\\_user\\_watters nebo fs.inotify.max\\_user\\_instances. Je tam brouk. Java která způsobuje některé části Java 's inotify/WatchAdresarory system, aby nebyly shromažďovány odpadky, když jsou dokončeny; nakonec, počet zombie inotifikovat hodinky nebo instance by překročil maximální uvedené číslo. ERDDAP™ Nyní pracuje kolem tohoto Java Brouku.
Také počet inotify vláken je uveden na stav.html webové stránce, takže můžete sledovat jeho používání. Obvykle je tu 1 iotify vlákno na EDDGrid FromFiles a EDDTable Z Files data.
    * Oprava chyb: na mnoha místech, místo toho, aby byla chyba přehozena, byla vytvořena nová chyba, která obsahovala pouze krátkou verzi původní chybové zprávy a beze stopy zásobníku. Nyní, když je generována nová chyba, správně obsahuje celou původní výjimku např. házet novou výjimku ("nějaká nová zpráva," e) ;
Díky Susan Perkinsové.
    * Oprava chyb: donedávna (V1.64?) , pokud a .../ datasetID URL bylo požadováno, ERDDAP™ přidá do URL .html. V 1.64 to selhalo. (byla vytvořena nesprávně formátovaná URL a poté selhala) . Teď to zase funguje. Díky Chrisi Fulliloveovi.

## Verze 1.64{#version-164} 
 (propuštěn 2015-08-19) 

*    **Nové funkce (pro uživatele) :** 
    * Nyní existují pokyny pro přístup k hesla chráněné soukromé ERDDAP™ Soubory údajů ( https:// ) přes curl a Python . Viz [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) a [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) pokyny.
Díky Emiliovi Mayorgovi z NANOOS a Paulu Janeckovi ze Spyglass Technologies.
         
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    ERDDAP™ Teď to vyžaduje Java 1.8+.
         Java 1. 7 dosáhla [konec života](https://www.oracle.com/technetwork/java/eol-135779.html)   (žádné další aktualizace zabezpečení) v dubnu 2015. Tato verze ERDDAP™ nebude pracovat s verzemi Java pod 1. 8. Pokud budete aktualizovat z Java 1, 7x (nebo dříve) , měli byste také aktualizovat Tomcat. Viz [ ERDDAP™ Nastavit návod](/docs/server-admin/deploy-install) pro stahování odkazů a poradenství.
    * Nový formulář poskytovatele dat.
Když k vám přijde poskytovatel údajů a doufá, že vám přidá nějaké údaje ERDDAP™ , může být obtížné a časově náročné shromažďovat všechna metadata potřebná pro přidání datového souboru do ERDDAP . Mnoho zdrojů údajů (například .csv soubory, Soubory Excelu, databáze) nemají žádná interní metadata, takže ERDDAP™ má nový formulář poskytovatele dat, který shromažďuje metadata od poskytovatele dat a poskytuje poskytovateli údajů další pokyny, včetně rozsáhlých pokynů pro Data v databázích. Předložené informace jsou převedeny na datasets.xml formát a pak e-mailem na ERDDAP™ Správce (Ty) a psáno (Přiložené) na bigParentDirectory/logs/dataProviderForm.log . Forma tak částečně automatizuje proces získání datového souboru do ERDDAP™ , ale ERDDAP™ Správce musí ještě dokončit datasets.xml střih a vypořádat se s získáním datového souboru (án) od poskytovatele nebo připojení k databázi. Více informací viz [Poskytovatel údajů Popis formuláře](/docs/server-admin/datasets#data-provider-form) .
    * Nový&lt;zápasAxisNDigits&gt;
může být použit EDDGrid FromFiles (a tedy odNcFiles a zMergeIRFiles) , EDDGrid AgregátExising Dimension, EDDGrid Kopírovat a EDDGrid SideBySide soubory k určení, jak přesně rovné hodnoty osy v různých souborech musí být (kolik číslic) : 0=bez kontroly (Nepoužívej to&#33;) , 1-18 pro zvýšení přesnosti nebo 20 (výchozí) pro přesnou rovnost. Pro n=1-18, ERDDAP™ zajistí, aby první n číslice dvou hodnot (nebo (n + 1) oddíl 2 pro hodnoty plováku) jsou si rovni.
        &lt;matchAxisNDigits&gt; nahrazuje&lt;zajistitAxisValuesAreEqual&gt;, který je nyní deprecován. Hodnota "true" bude převedena na zápasAxisNDigits=20. Hodnota "falešného" (Nedělej to&#33;) bude převeden na zápas AxisNDigits=0.
    *    EDDGrid FromFiles a EDDTable FromFiles se velmi pomalu načte při prvním použití této verze ERDDAP .
         ERDDAP™ nyní ukládá interní informace o souborech trochu jinak, takže interní tabulka souborů pro každý z těchto souborů musí být přestavěna. Tak se neboj. Nic se neděje. Je to jen jednou.
    * Soubory vzdáleného zdroje
         EDDGrid FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles nyní umožňují soubory být vzdálené soubory v adresáři přístupném http://   (a pravděpodobně https:// a ftp://, ale nejsou testovány) pokud vzdálený server podporuje [Žádosti o rozsah](https://en.wikipedia.org/wiki/Byte_serving) v záhlaví žádosti. THREDDS a Amazon S3 podporují požadavky na rozsah, Hyrax ne. Tento systém umožňuje přístup k datům ve vzdálených souborech bez stahování souborů (což je užitečné, pokud jsou vzdálené soubory příliš objemné) , ale přístup k těmto souborům bude mnohem pomalejší než přístup k místním souborům nebo dokonce ke vzdálenému OPeNDAP Zdroj.
To zahrnuje "files" v kbelíku Amazon S3, protože jsou přístupné přes http:// . Pokud jsou názvy objektů S3 jako názvy souborů (s interním / je jako Linux adresář strom) , ERDDAP™ může také zpřístupnit soubory prostřednictvím ERDDAP 's "files" systém. Aby to fungovalo, vaše S3 pověření musí být v ~/.aws/credentials (na Linuxu, OS X nebo Unixu) , nebo C:\\Uživatelé\\USERNAME\\.aws\\ credentials (na Windows) na serveru s ERDDAP . Viz [Amazon SDK dokumentace](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * Generovat soubory dat Xml má novou, neobvyklou možnost: EDDsFromFoles.
Tohle projde souborovým systémem (i vzdálený systém jako Amazon S3, pokud mají objekty názvy podobné souborům) a vytvořit datasets.xml kousky pro řadu souborů dat. Vaše kilometry se mohou lišit. To funguje dobře, pokud jsou soubory organizovány tak, aby všechny datové soubory v daném adresáři (a jeho podadresáře) jsou vhodné pro jeden datový soubor (např. všechny SST jednodenní kompozity) . Jinak (např. pokud adresář obsahuje některé SST soubory a některé Chlorofyll-a soubory) , To funguje špatně, ale stále může být užitečné.
    * Programátoři: nové /lib .jar soubory.
Když sestavíte ERDDAP™ , Zaznamenejte prosím nové soubory .jar v parametru classpath -cp uvedeném v ERDDAP™   [Průvodce programátorem](/docs/contributing/programmer-guide) .
    * Sea\\_water\\_practical\\_salinity
Pokud používáte standardní název CF sea\\_water\\_salinity pro jakoukoliv proměnnou, doporučuji vám přejít na mořskou\\_water\\_practical\\_salinity, která je k dispozici v [Verze 29 standardní tabulky názvu CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (a některé předchozí verze -- Nevěděl jsem, že) . Tento název ukazuje, že se jedná o praktickou hodnotu slanosti, Practical Salinity Units   ( PSU ) , na rozdíl od starší hodnoty g/kg. Kanonické jednotky jsou jiné, ale stále neuvěřitelně neužitečné: 1 (pravděpodobně naznačuje PSU /PSS-78) , na rozdíl od 1e-3 (pravděpodobně to znamená g/kg) pro mořskou_vodu\\_salinity. \\[ Hej, Unidata a CF: Identifikujeme hodnoty, které používají jiné váhy, například Fahrenheita nebo Celsia, pomocí řetězce jednotek, který je název stupnice nebo nějaké odchylky. Proč nemůžeme identifikovat jednotky salinity pomocí jejich stupnice, např. PSS-78? Já vím: PSS-78 hodnoty jsou "jednotné," ale existuje implikované měřítko, že? Pokud vymyslím novou praktickou stupnici salinity, kde jsou hodnoty 0,875 krát PSS-78, měly by být kanonické jednotky stále "1"? Jak je mohl uživatel rozeznat? Jednotky 1e-3 a 1 nejsou ani popisné ani užitečné pro uživatele, kteří se snaží zjistit, co čísla ukazují. \\] 

## Verze 1.62{#version-162} 
 (propuštěn 2015-06-08) 

*    **Nové funkce (pro uživatele) :** 
    * Pro EDDGrid Databáze, uživatelé mohou nyní graf Typ: Povrchové grafy s jakoukoli kombinací numerických os, nejen zeměpisná délka versus zeměpisná šířka. To vám umožní udělat x versus y (projekt) grafy a různé [Hovmöllerovy diagramy](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) , například draftovací délka versus hloubka, nebo čas versus hloubka. \\[ Poznámka: je-li hloubka na ose Y, bude pravděpodobně převrácena z toho, co chcete. Promiňte, odletět to ještě není možnost. \\] Díky Care Wilsonové a Lynn DeWittové.
    * Je tu nový. [Převodník Oceanic/Atmosférický Acronym](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) což vám umožní převést společnou akronymu oceánské/atmosférické na/z celého jména.
    * Je tu nový. [Oceánie/Atmosféra Převodník proměnných názvů](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) což vám umožní převést společný název proměnné oceánika/atmosféry na celé jméno.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    Java 7/8
         Oracle již nepodporují (poskytuje bezpečnostní opravy chyb pro)   Java 7. ERDDAP™ Stále podporuje Java 7, ale prosím přestěhujte se Java 8. Další vydání ERDDAP™ bude pravděpodobně vyžadovat Java 8.
    *    valid\\_min /max/rozsah
Dříve a teď, pokud a dataVariable měl scale\\_factor a add\\_offset metadata, ERDDAP™ rozbalí hodnoty dat a odstraní tato metadata. V minulých dílech... ERDDAP™ žádná změna/odbalení valid\\_range , valid\\_min , valid\\_max metadata (které obvykle / by měly obsahovat balené hodnoty) od scale\\_factor a add\\_offset . Teď už ano. Prosím, hledejte ERDDAP™ pro "platný\\_" a ujistěte se, že všechny proměnné, které mají valid\\_range , valid\\_min nebo valid\\_max mají správné hodnoty, když se datové soubory objeví v nové verzi ERDDAP . Viz [ valid\\_range /min/max dokumentace](/docs/server-admin/datasets#valid_range) .
    * ACDD-1, 3
V předchozích dílech... ERDDAP™   (GenerovatDatasety Xml) použitý/doporučený originál (1. 0) verze [ NetCDF Atributová úmluva pro Discovery datových souborů](https://wiki.esipfed.org/ArchivalCopyOfVersion1) který byl označován jako " Unidata Dataset Discovery v1.0" v globálních úmluvách a Metadata\\_Conventions atributy. Nyní doporučujeme [ACDD verze 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) která byla ratifikována na počátku roku 2015 a je označována jako "ACDD-1.3." Naštěstí je ACDD-1.3 vysoce zpětně kompatibilní s verzí 1.0. DOPORUČUJEME, že jste [přepnout na ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Není to těžké.
    * Generovat soubory dat Xml Atributy
Došlo k velkému počtu změn ke zlepšení&lt; addAttributes &gt; hodnoty navržené GeneratoremDatasets XML pro globální úmluvy, creator\\_name /email/url, klíčová slova, shrnutí a atributy názvu a proměnné long\\_name atribut. Některé změny souvisí s novým používáním ACDD-1.3.
    * EDDTableFrom SOS Soubory údajů
S příležitostným přidáním nových typů SOS servery a změny starých serverů, je stále těžší pro ERDDAP™ automaticky detekovat typ serveru z odpovědí serveru. Použití [&lt;sosServerType&gt;] (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (s hodnotou IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , nebo KDO) je nyní STRONGLIE DOPORUČUJE. Pokud některý z vašich souborů tohoto typu má problémy v nové verzi ERDDAP , Zkuste re-running GenerateDatasets Xml pro SOS server generovat nový kus datasets.xml pro tento datový soubor. Generovat soubory dat Xml vám umožní vyzkoušet různé&lt;sosServerType&gt; možnosti, dokud nenajdete tu správnou pro daný server. Pokud máte stále problémy, dejte mi prosím vědět, problém vidíte a URL serveru a já se pokusím pomoci.
    * EDDTableFromFileNames soubory dat
Některé atributy, které byly doporučeny addAttributes jsou nyní zdrojemAttributy. Pravděpodobně nemusíte měnit nic pro existující soubory dat ve vašem datasets.xml .
    * Oprava chyb týkající se některých požadavků na datové soubory EDDTableFromNcCFFiles.
Přidal jsem také velký počet jednotkových testů ke stávajícímu velkému počtu jednotkových testů základních metod (Je jich 100.) . Díky Eli Hunterovi.
    * Oprava chyb/malé změny EDDGrid Od Mergeira.
Díky Jonathanu Lafitemu a Philippu Makowskimu
    * Oprava chyb: EDDGrid FromErddap nyní funguje, i když vzdálený datový soubor nemá ioos\\_category proměnné atributy.
Díky Kevinu O'Brienovi.
    * Oprava chyb v .graf webové stránky pro EDDGrid datové soubory, pokud existuje pouze jedna proměnná osy s více než jednou hodnotou.
Díky Charlesi Carletonovi.
    * Došlo k dalším malým vylepšením, změnám a opravám chyb.

## Verze 1.60{#version-160} 
 (propuštěn 2015-03-12) 

*    **Nové funkce (pro uživatele) :** žádný
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * STRONGLY DOPORUČUJE: Aktualizovat servery [roboti.txt](/docs/server-admin/additional-information#robotstxt) soubor obsahující:
Nepovolit: /erddap/files/
    * Oznamte problém a řešení:
Na Linuxových počítačích, pokud používáte&lt;updateEveryNMillis&gt; s datovými soubory s typem= EDDGrid FromFiles, EDDTableFromFoles, EDDGrid Kopírovat, EDDTableCopy, nebo jejich podtřídy, můžete vidět problém, kde datový soubor selže načíst (příležitostně nebo důsledně) s chybovou zprávou: "IOException: Uživatelský limit inotify instancí dosaženo nebo příliš mnoho otevřených souborů." Pokud ano, můžete tento problém napravit voláním (jako kořen) :
echo fs.inotify.max\\_user\\_wakes=65536 | tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024 | tee -a /etc/sysctl.conf
sysctl - p
Nebo použijte vyšší čísla, pokud problém přetrvává. Výchozí hodnota hodinek je 8192. Výchozí hodnota pro případy je 128. \\[ UPDATE: Tam je chyba v Java což způsobuje, že případy nejsou shromažďovány odpadky. Tento problém se vyhnout v ERDDAP™ V1.66 a vyšší. Takže lepším řešením je přejít na nejnovější verzi ERDDAP . \\] 
    * NoSuchFileException Oprava chyb:
Byla tam chyba, která mohla způsobit soubory typu= EDDGrid FromFiles, EDDTableFromFoles, EDDGrid Kopírovat, EdDtableCopy, nebo jejich podtřídy, aby se občas nenačíst chybou "NoSuchFileException: _someFileName_." Chyba souvisí s použitím FileVisitor a byl zaveden v ERDDAP™ v1.56. Problém je vzácný a s největší pravděpodobností ovlivní soubory dat s velkým počtem často se měnících datových souborů.
    * Došlo k malým vylepšením, změnám a opravám chyb.

## Verze 1.58{#version-158} 
 (propuštěn 2015-02-25) 

*    **Nové funkce (pro uživatele) :** 
    * Nový [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) systém umožňuje procházet virtuální souborový systém a stahovat zdrojové datové soubory z mnoha ERDDAP™ Data. The "files" systém je ve výchozím nastavení aktivní, ale ERDDAP™ Správci to mohou vypnout vložením
```
        <filesActive>false</filesActive>  
```
v ERDDAP™ setup.xml soubor. Zvláštní poděkování Philippe Makowskimu, který trval, když jsem byl pomalý, abych ocenil krásu této myšlenky.
    * čas určení Maxi... Dříve měla časová proměnná datových souborů EDDTable s daty téměř v reálném čase cílMax NaN, což znamenalo, že maximální časová hodnota datového souboru je aktuální, ale není přesně známa a často se mění. DestinationMax má skutečnou hodnotu, což naznačuje, že je to naposledy známé. Mnoho datových souborů průběžně aktualizuje data. ERDDAP™ podporuje přístup k nejnovějším údajům, i když jde o aktuálně známé naposledy. Všimněte si, že nový [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis) podpora EDDGrid FromFiles a EDDTable Databáze souborů FromFiles aktualizuje cíl časové proměnnéMax. Dalším důsledkem této změny je, že datasetID = allDatasets Databáze nyní zahrnuje aktuálně známé naposledy ve sloupcích maxTime. Díky Johnu Kerfootovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * STRONGLY DOPORUČUJE: Aktualizovat servery [roboti.txt](/docs/server-admin/additional-information#robotstxt) soubor obsahující:
Nepovolit: /files/
Nepovolit: /erddap/files/
    * Vzorek datasets.xml -- Minulý rok jsme doporučili několik vynikajících souborů v pobřežní hlídkě ERDDAP™ že můžete přidat do svého ERDDAP™ jen přidáním pár řádků do vašeho datasets.xml . Pokud jste přidali erdVH soubory, přepněte prosím na novější erdVH2 soubory:
        * Udělat kopii všech erdVH souborů a změnit kopie datasetID 's od ErdVH... na ErdVH2... a změnit odkazované sourceUrl od ErdVH... k ErdVH2...
        * Nastavte erdVH... soubory na active="false."
    * Všechny EDDGrid FromFiles a EDDTable Podtřídy FromFiles nyní podporují [&lt;dostupnéViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) zpřístupnit zdrojové datové soubory prostřednictvím "files" systémy. Ve výchozím nastavení je tento systém vypnut pro každý soubor dat. Abyste to umožnili, musíte přidat tag. Díky Philippu Makowskimu.
    * Všechny EDDGrid FromFiles a EDDTable Podtřídy FromFiles nyní podporují [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis) . Ve výchozím nastavení je tento systém vypnut pro každý soubor dat. Abyste to umožnili, musíte přidat tag. Díky Dominicu Fuller-Rowellovi a NGDC.
    * Nový [EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) vytváří soubor dat z informací o skupině souborů v systému souborů serveru, ale nepodává data zevnitř souborů. To je například užitečné pro distribuci sbírek obrazových souborů, audio souborů, video souborů, souborů zpracování slov a tabulkových souborů. To funguje ruku v ruce s novým [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) systém, aby uživatelé mohli stáhnout soubory. Zvláštní poděkování Philippe Makowskimu, který trval, když jsem byl pomalý, abych ocenil krásu této myšlenky.
    * Nový [ EDDGrid OdEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) umožňuje převést tabulkový soubor do mřížkového souboru. Díky Ocean Networks Canada.
    * Nový [ EDDGrid Z MergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) Sčítání údajů ze skupiny místních MergeIR .gz Složky. EDDGrid OdMergeIRFiles má rozdíl být první kus kódu přispěl k ERDDAP . Bylo to provedeno bez naší pomoci. Třikrát hurá a zvlášť děkuji Jonathanu Lafiteovi a Philippu Makowskimu z R.Tech Engineeringu.
    * K dispozici je nové, volitelné nastavení.xml tag,&lt;unitTestDataDir&gt;, který určuje adresář s datovými soubory jednotky test, které jsou k dispozici prostřednictvím nového úložiště GitHub: [https://github.com/ERDDAP/erddapTest](https://github.com/ERDDAP/erddapTest) . Například:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Zatím to není užitečné, ale je to součást postupu směrem k provedení co největšího počtu testů, které mohou provádět ostatní lidé. Díky Terry Rankinovi.
    * Bylo tam mnoho malých vylepšení, změn a oprav chyb.

## Verze 1.56{#version-156} 
 (propuštěn 2014-12-16) 

*    **Nové funkce (pro uživatele) :**   (Žádné) 
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pravděpodobně už víte o [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) a [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) které vám umožní napojit na soubory dat v jiných ERDDAP a ať se objeví ve vašich ERDDAP . Uživatelské žádosti o aktuální údaje z těchto souborů se neviditelně převedou ke zdroji ERDDAP™ , Takže data netečou přes váš systém nebo používat šířku pásma. Ve vzorku je nyní velký seznam doporučených souborů údajů datasets.xml v erddapContent .zip . Zahrnout je do vašeho ERDDAP™ , vše, co musíte udělat, je zkopírovat a vložit ty, které chcete do svého datasets.xml . Díky Conoru Delaneymu.
    * Když sestavíte ERDDAP™ , musíte přidat nějaké nové . sklenice soubory do vašeho [třídní spínač - cp](/docs/contributing/programmer-guide#development-environment) pro Javac a Java.
    * Nový [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) kliky získávání dat od [Cassandra](https://cassandra.apache.org/) . Díky Ocean Networks Canada.
    * Nový [EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) zpracovává získávání dat z datových souborů ASCII s kolonami s pevnou šířkou. Díky Philippu Makowskimu.
    * Všechny EDDGrid FromFiles a EDDTable FromFiles podtřídy nyní používají novou metodu, FileVisitor (přidáno do Java v 1.7) Sbírat informace o souborech. To nemusí mít žádný prospěch pro první shromažďování souborových informací pro daný datový soubor, ale zdá se, že má obrovský přínos pro následná shromáždění, pokud bude provedeno brzy, zatímco OS má stále informace cache. Díky NGDC.
        
Stále doporučujeme: Pokud má datový soubor velký počet souborů (&gt; 1 000) , operační systém (a tak EDDGrid FromFiles and EDDTableFromFoles) bude fungovat mnohem efektivněji, pokud uložíte soubory do řady podadresářů (jeden za rok nebo jeden za měsíc pro soubory údajů s velmi častými soubory) , tak, že nikdy neexistuje obrovské množství souborů v daném adresáři.
        
    * Několik drobných vylepšení EDDTableFromAsciiFiles.
    * Některá vylepšení EDDTableFromAsciiServiceNOS, zejména získat některé další sloupce informací ze zdroje. Díky Lynn DeWittové.
    * Některé malé opravy chyb týkající se ISO 19115, že ERDDAP™ generuje. Díky Anně Milanové.

## Verze 1.54{#version-154} 
 (propuštěn 2014-10-24) 

*    **Nové funkce (pro uživatele) :** 
    * Některé proměnné nyní pracují s časem s přesností milisekund, např. 2014-10-24T16:41:22.485Z. Díky Dominicu Fuller-Rowellovi.
*    **Malé změny/Opravy chyb:** 
    * Oprava chyb: s určitou kombinací okolností, EDDGrid Soubory dat zNcFile vracel data se sníženou přesností (např. plováky místo dvojníků) . To by mohlo ovlivnit hodnoty údajů pouze s &gt; 8 významnými údaji. Omlouvám se. (A byla to klasická počítačová programovací chyba: jedna špatná postava.) Díky Dominicu Fuller-Rowellovi.
    * Mnoho malých změn.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Griddap soubory nyní podporují proměnné a datové proměnné časové osy (tj. proměnné s hodnotami času, ale destinationName jiné než "time" ) . Díky Dominicu Fuller-Rowellovi.
    *    ERDDAP™ nyní správně podporuje milisekundy time\\_precision "1970-01-01T00:00:0000Z." Jeden záměrný výstřednost: při psaní časů do lidských-orientovaných souborů (např. .csv, .tsv , .json , .xhtml ) , ERDDAP™ použije určenou time\\_precision pokud zahrnuje sekundy a/nebo desetinné sekundy; jinak používá sekundy time\\_precision "1970-01-01T00:00:00Z" (pro soulad a zpětnou kompatibilitu) . Díky Dominicu Fuller-Rowellovi.
    *    EDDGrid FromNcFiles nyní podporuje čtení String dataVariable s.
    *    .nc soubory psané griddap nyní mohou mít String dataVariable s.
    * Generovat soubory dat Xml nyní obsahuje více flush () volá, aby se zabránilo problému informací, které nejsou zapsány do souborů. Díky Thierrymu Valerovi.
    * Dokumentace pro GenerateDatasetsXml byla vylepšena, zejména aby poukázala na to, že přepínač -i funguje pouze v případě, že určíte všechny odpovědi na příkazovém řádku (např. režim skriptu) . A režim skriptu je vysvětlen. Díky Thierrymu Valerovi.
    *    ERDDAP™ již nedovolují, aby dvě proměnné v datovém souboru byly stejné sourceName . (Pokud to někdo udělal předtím, pravděpodobně to vedlo k chybovým zprávám.) Jako předtím, ERDDAP™ nedovoluje, aby dvě proměnné v datovém souboru měly stejné destinationName .

## Verze 1.52{#version-152} 
 (propuštěn 2014-10-03) 

*    **Nové funkce:**   (žádný) 
*    **Malé změny/Opravy chyb:** 
    * Další (menší) změna ERDDAP™ Rychleji.
    * Zlepšení ISO 19115 souborů generovaných ERDDAP : přidána nově doporučená&lt;gmd: protocol&gt; hodnoty (informace, vyhledávání, OPeNDAP : OPeNDAP , ERDDAP :griddap a ERDDAP : tabledap ) uvnitř&lt;gmd:CI\\_OnlineResource&gt;. Díky Derricku Snowdenovi a Johnu Maurerovi.
    * Mnoho malých změn.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Oprava chyb: GenerateDatasetsXml.sh a DasDds.sh nebyly v erddap.war pro 1.48 a 1.50. Teď už ano. Díky Thierrymu Valerovi.
    * Malé změny některých rychlostních testů v TestAll, aby byly méně náchylné k náhodě. Díky Terry Rankinovi.

## Verze 1.50{#version-150} 
 (propuštěn 2014-09-06) 

*    **Nové funkce:**   (žádný) 
*    **Malé změny/Opravy chyb:** 
    * Tohle ERDDAP™ by měly být mnohem rychlejší než nedávné verze.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:**   (Nic.) 

## Verze 1.48{#version-148} 
 (propuštěn 2014-09-04) 

*    **Nové funkce:** 
    *    ERDDAP™ Nyní vždy vytvoří soubor tabulek, datasetID = allDatasets , která má tabulku informací o všech datových souborech v tomto ERDDAP . Může být dotazován jako každý jiný soubor. Jedná se o užitečnou alternativu k současnému systému pro získání informací o datech programově.
    * Existují dva nové typy výstupních souborů pro EDDTable a EDDGrid , .csv0 a .tsv 0. Jsou to čárky- a záložky oddělené-hodnota soubory, které nemají řádky s názvy sloupců nebo jednotek. Data začínají na prvním řádku. Jsou zvláště užitečné pro skripty, které chtějí jen jeden kus informace od ERDDAP .
*    **Malé změny/Opravy chyb:** 
    * Mapy lze nyní provést na délky v rozmezí -720 až 720.
    * Nový .nc ml odpověď Typ souboru je k dispozici pro všechny EDDGrid Data. Vrací [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\-formátovaný popis datového souboru (podobné kombinovanému .dds + .das) .
    * Oprava chyb: Uložení tabulkových dat na .nc soubor byl omezen na 100 000 hodnot na jednu proměnnou. Nyní je pouze omezena na 2 GB celkové velikosti souboru. Díky Kevinu O'Brienovi.
    * Oprava chyb: saveAs Matlab metody nyní zajišťují, že datasetID s jsou převedeny na bezpečné Matlab názvy proměnných. Ale přesto důrazně doporučuji vytvořit datasetID s, které jsou platné názvy proměnných: počínaje písmenem a pak pomocí A-Z, a-z, 0-9 a \\_. Viz [ datasetID ](/docs/server-admin/datasets#datasetid) . Díky Luku Campbellovi.
    * Oprava chyb v EDDTableFromDatabase: S některými typy databází, NO\\_ Reakce na údaje z databáze vedla k zbytečnému 30 sekundovému zpoždění ERDDAP . Díky Gregovi Williamsovi.
    * Oprava chyb: EDDGrid Vytvořit graf s typem grafu = řádky (nebo značky nebo značky a řádky) vynucená proměnná osy x je čas. Teď to může být jakákoliv osa. Díky Lynn DeWittové.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * DOPORUČUJE: Aktualizace Java   
Tato verze ERDDAP™ vyžaduje Java 7 nebo vyšší, ale Java 7 dosáhne svého konce života v dubnu 2015 (Brzy&#33;) Takže teď je vhodná doba přejít na Java 8. Java 8. I test with Java 8. Všimněte si, že Java V únoru 2013 dosáhlo svého konce života 6 (Žádné další opravy bezpečnostních chyb&#33;) .
    * DOPORUČUJEME: Aktualizace Tomcat
Pokud používáte Tomcat, přepněte prosím na nejnovější verzi Tomcat. Tomcat 8 je určen pro práci s Java 8.
    * " ERDDAP "už není zkratka. Teď je to jen jméno. Nechci zvýraznit jméno. ERD . Chci ERDDAP™ upozornit na vaši instituci a data.
    * Prosím. [přizpůsobit vzhled vašeho ERDDAP™ instalace pro zdůraznění Vaší instituce a Vašich údajů](/docs/server-admin/deploy-install#customize) . S hodinovou prací, můžete udělat pěkné vylepšení, které bude trvat věčně.
    * V nastavení.xml,&lt;displayDiagnosticInfo&gt; volba je nyní vždy ignorována a zacházeno, jako by hodnota byla falešná.
DOPORUČUJE: Odstranit&lt;displayDiagnosticInfo&gt; tag a související informace ze setup.xml.
    * V nastavení.xml, výchozí pro&lt; drawLandMask &gt; bylo "nad," ale nyní je "pod," což je lepší obecný standard (funguje dobře se všemi soubory dat) .
    * GenerateDatasetsXml.sh a DadDds.sh Linux skripty nyní používají bash místo csh, a mají rozšíření .sh. Díky Emilio Mayorga
    * Generovat soubory dat Xml a DasDds nyní vytvořit své vlastní log soubory (GenerateDatasetsXml.log a DasDds.log) a výstupní soubory (GenerovatDatasetsXml.out a DadDds.out) v _bigParentDirectory_/logs/, a nikdy dát své výsledky do schránky.
    * Generovat soubory dat Xml nyní podporuje parametr příkazového řádku -i, který vloží výstup do zadaného souboru na určené místo. Viz [Dokumentace](/docs/server-admin/datasets#generatedatasetsxml) . Díky Terry Rankinovi.
    * EDDTableFromDatabase nyní podporuje&lt;sloupecNázevQuotes&gt;&lt;/sloupecNázevQuotes&gt;, s platnými hodnotami " (výchozí) Nebo nic. Tento znak (pokud existuje) budou použity před a po názvy sloupců v dotazech SQL. Různé typy databází, založené různými způsoby, budou potřebovat různé názvy sloupců uvozovek.
    * Tabulková zeměpisná šířka a délka proměnné nyní mohou mít přizpůsobené long\\_name 's, např., Profilová šířka. Dříve to mohla být jen délka a délka.
    * Od nynějška zadejte "defaultDataQuery" a "defaultGraphQuery" jako atributy v globálních metadatech datového souboru (tj.&lt;addAtts&gt;), ne jako samostatné&lt;defaultDataQuery&gt; a&lt;výchozíGraphQuery&gt; značky. (I když, pokud je stále určujete prostřednictvím značek, ERDDAP™ automaticky vytvoří globální atributy s informacemi.) 

## Verze 1.46{#version-146} 
 (propuštěn 2013-07-09) 

*    **Nové funkce:** 
    *    (Žádné) 
*    **Malé změny/Opravy chyb:** 
    * Oprava chyb: V EdDtableFromDatabase, pouze ve verzi 1.44, ERDDAP™ Špatně citoval název tabulky v SQL příkazech. To už je napravené. Díky Kevinu O'Brienovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    ** Pokud nezměníte standardní zprávy ve zprávách.xml,
smazat \\[ tomcat \\] /content/erddap/ messages.xml . **   
Výchozí soubor zpráv.xml je nyní v erddap. válečný soubor, ne erddapContent .zip . Takže už nemusíte ručně aktualizovat zprávy.xml .
    * Pokud změníte zprávy ve zprávách.xml, od této chvíle, pokaždé, když aktualizujete ERDDAP™ buď:
        * Proveďte stejné změny, které jste udělali před novým
             \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/ messages.xml.
A tentokrát: smazat \\[ tomcat \\] /content/erddap/ messages.xml .
        * Nebo zjistit, co se změnilo v nových zprávách.xml (přes rozdíl) , a upravit svůj
             \\[ tomcat \\] /content/erddap/ messages.xml souboru.

## Verze 1.44{#version-144} 
 (propuštěno 2013-05-30) 

*    **Nové funkce:** 
    * Dotazy na soubory EDDTable nyní podporují & orderBy Min (...) a & orderByMinMax  (...)   (který vrací dva řádky v každé skupině, s minimální a maximální z posledních orderBy hodnota) . Díky Lynn DeWittové.
    * Jsou dva noví. tabledap Typy souborů: .nc CFHeader a .nc CFMAHeader (které vrací hlavičku odpovídající ncdump-like .nc CF a .nc Typy souborů CFMA) . Díky Stevu Hankinovi.
*    **Malé změny/Opravy chyb:** 
    * Oprava chyb: načítání webových stránek .graf a .html pro soubory dat se spoustou časových hodnot bylo pomalé, protože ERDDAP™ byl pomalý při generování možností jezdce času. Teď je to vždy rychlé. Díky Michaelu Barrymu, OOICI a Kristianu Sebastianovi Blalidovi.
    * Oprava chyb: V některých typech údajů z databáze EDDTable nebyla časová omezení vždy řešena správně. Teď už ano. Díky Johnu Maurerovi a Kevinu O'Brienovi.
    * Oprava chyb: soubory souborů by se nenačítají, když všechny subsetVariables byly proměnné s pevnou hodnotou. Teď budou. Díky Lynn DeWittové a Johnu Petersonovi.
    * IMPROVED: nyní, všechny dotazy pro jen podmnožiny proměnných působit, jako by & Distinct () je součástí dotazu.
    * ZLEPŠENÍ: nyní, pro dotazy, které zahrnují & .json p=_funkceName_, _funkce Jméno_ MUSÍ být série 1 a více (období oddělené) slova. Každé slovo musí začít písmenem ISO 8859 nebo "\\_" a následuje 0 nebo více písmen ISO 8859, číslic nebo "\\_." Ano, tohle je více omezující než Java Požadavky skriptu na názvy funkcí.
    * Časová osa na grafech nyní funguje dobře pro delší časové rozpětí (80 - 10000 let) a kratší časové rozmezí (0,003 - 180 sekund) .
    *    ERDDAP™ je nyní více shovívavý při analýze změn dat formátu ISO-8601.
    * Došlo k mnoha dalším drobným změnám a opravám chyb.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    *    **Musíte aktualizovat nejnovější verzi, aby byla zajištěna.**   
         ERDDAP™ Prošel bezpečnostním auditem. Byly tam brouci a slabiny. Verze 1.44 obsahuje několik důležitých bezpečnostních oprav chyb a několik změn pro zvýšení bezpečnosti a dostupnosti (např. pro uživatele s poruchou zraku) . Verze 1.44 prošla následným bezpečnostním auditem. Díky všem dobrým lidem na USGS a Acunetix, kteří to umožnili. (Nemělo by. NOAA Dělat tohle?) 
    * Nový [EDDTableFrom WFS Soubory](/docs/server-admin/datasets#eddtablefromwfsfiles) vytvoří místní kopii všech údajů z ArcGIS MapServer WFS server a tak lze data rychle přeobnovit na ERDDAP™ uživatelé. Díky Christy Caudillové.
    * Nový [EDDTableFrom EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) umožňuje vytvořit soubor EDDTable z EDDGrid Soubor dat. Některé společné důvody k tomu jsou:
        * To umožňuje, aby soubor údajů byl dotazován s OPeNDAP omezení výběru (který mohl uživatel požádat) .
        * Soubor údajů je ze své podstaty souborem tabulek. Díky OOICI, Jimu Potemrovi, Royi Mendelssohnovi.
    * Název proměnné "hloubka" je nyní speciální alternativou k "výšce." Jednotky musí být nějaká varianta "metrů." Hodnoty dat musí být kladné=down. ERDDAP™ je si plně vědom významu "hloubky" a podporuje ji tam, kde je podporována výška (např. jako součást souboru CF DSG cdm\\_data\\_type=profile) . Soubor údajů nesmí mít proměnné "hloubka" ani "nadmořská výška."
    * Ve vašem datasets.xml , prosím odstraňte jakékoli použití&lt;att name="cdm\\_altitude\\_proxy'depleth&lt;/att&gt;, protože hloubka je nyní speciální alternativou k nadmořské výšce, a tak nemusí být zvlášť identifikována.
    * Ve vašem datasets.xml , prosím odstraňte jakékoli použití&lt;nadmořská výškaMatersPerSourceUnit&gt;, kromě EDDTable Od SOS .
Když je hodnota 1, smažte ji.
Pokud je hodnota -1, zvažte změnu názvu proměnné na hloubku.
Pro další hodnoty přidejte k&lt; addAttributes &gt; například:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Všechny soubory souborů nyní podporují
        
        *   &lt;defaultDataQuery&gt;, který se používá, pokud se požaduje .html bez dotazu.
            * Tohle budete pravděpodobně potřebovat jen zřídka.
            * Pro soubory dat o souřadnicích je společným použitím tato hodnota určena pro jinou hodnotu výchozí hloubky nebo nadmořské výšky. (např. \\[ 0 \\] místo \\[ poslední \\] ) .
V každém případě byste měli vždy uvést všechny proměnné, vždy použít stejné hodnoty rozměrů pro všechny proměnné a téměř vždy použít \\[ 0 \\] , \\[ poslední \\] nebo \\[ 0: poslední \\] pro hodnoty rozměrů.
Například:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Pro tabledap Nejběžnějším použitím těchto údajů je určit jiný výchozí časový rozsah (v porovnání s teď, např., &time&gt;= now- 1 den) .
Nezapomeňte, že požadavek na žádné datové proměnné je stejný jako určení všech datových proměnných, takže obvykle můžete jen zadat nové časové omezení.
Například:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt;, který se používá, pokud se požaduje .graph bez dotazu.
            * Tohle budete pravděpodobně potřebovat jen zřídka.
            * U datových souborů mřížky je nejčastějším použitím těchto údajů určit jinou hodnotu výchozí hloubky nebo rozměr výšky. (např. \\[ 0 \\] místo \\[ poslední \\] ) a/nebo upřesnit, že konkrétní proměnná je grafizována.
V každém případě budete téměř vždy používat \\[ 0 \\] , \\[ poslední \\] nebo \\[ 0: poslední \\] pro hodnoty rozměrů.
Například:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Pro tabledap Databáze, nejčastější použití tohoto souboru jsou pro upřesnění různých proměnných, které mají být grafizovány, jiný výchozí časový rozsah (v porovnání s teď, např., &time&gt;= now- 1 den) a/nebo různá výchozí nastavení grafiky (např. typ značky) .
Například:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Nezapomeňte, že potřebujete XML kód nebo procento kód (buď jeden, ale ne oba) výchozí dotazy, protože jsou v XML dokumentu. Například se stane &amp; &amp; ,&lt;se stává &amp;lt; , a &gt; stává &amp;gt; .
A prosím, zkontrolujte si práci. Je snadné udělat chybu a nedostat to, co chcete.
Díky Charlesi Carletonovi, Kevinu O'Brienovi, Lukovi Campbellovi a dalším.
    *    EDDGrid FromDap, EDDGrid FromErddap a EDDTableFrom EDDGrid mají nový systém pro řešení souborů dat, které se často mění (tak často zhruba každých 0,5 s) . Na rozdíl od ERDDAP 's pravidelným, proaktivním systémem pro úplné opětovné načtení každého datového souboru, tento volitelný doplňkový systém je reaktivní (spuštěno žádostí uživatele) a přírůstkové (pouze aktualizovat informace, které je třeba aktualizovat) . Například, pokud žádost o EDDGrid Soubor dat FromDap se vyskytuje více než stanovený počet milisekund od poslední aktualizace, ERDDAP™ uvidíme, jestli jsou nějaké nové hodnoty pro ty nejlevější. (obvykle "time" ) rozměr a pokud ano, stáhněte si tyto nové hodnoty dříve, než se postaráte o požadavek uživatele. Tento systém je velmi dobrý v udržování rychle se měnícího souboru aktuálního s minimálními nároky na zdroj dat, ale za cenu mírného zpomalení zpracování některých žádostí uživatelů. Viz [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#update everynmillis)   
Díky Michaelu Barrymu a OOICI.
    *    EDDGrid FromNcFiles, EDDTableFromNcFiles a EDDTableFromNcCFFiles nyní podporují [NcML .nc ml](/docs/server-admin/datasets#ncml-files) zdrojové soubory místo .nc Složky. Díky Jose B Rodriguez Rueda.
    * Pro EDDGrid AgregátExising Dimension, ERDDAP™ podporuje novou volbu serverType="dodsindex" pro atribut serverType&lt; sourceUrl s&gt; tag. To funguje s webovými stránkami, které mají seznamy souborů uvnitř&lt;pre&gt;&lt;/pre&gt; a často pod OPeNDAP logo. Příkladem je [https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Pro EDDTableFrom SOS Nyní podporuje volitelnou značku
```  
        <sosServerType>_serverType_</sosServerType>  
```
takže můžete zadat typ SOS server (tak ERDDAP™ Nemusí na to přijít.) . Platné hodnoty&lt;_serverType_\\&gt; jsou IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , a KDO (nově podporovaný server Typ) . Viz [EDDTableFrom SOS ](/docs/server-admin/datasets#eddtablefromsos) . Díky Derricku Snowdenovi a Janet Fredericksové.
    * Všechny EDDGrid Z...Files, EDDTableFrom...Files, EDDGrid Kopírovat a EDDTable Kopírovat nyní podporu volitelné značky
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
který může říct ERDDAP™ vést soubor Tabulka (s informacemi o každém zdrojovém datovém souboru) v paměti místo jen na disku (výchozí) . Udržení souboruTable v paměti zrychluje požadavky na data (zejména pokud existuje &gt;1000 zdrojových datových souborů) Ale používá více paměti. Pokud to nastavíte na true pro jakýkoli datový soubor, sledujte paměť: momentálně používáte řádek na _yourDomain_ /erddap/status.html zajistit, aby ERDDAP™ Pořád má spoustu volné paměti. Díky Fredriku Strayovi.
    * EDDTableFromASCIIFiles nyní podporuje&lt;charset&gt;. Dva nejčastější charsety. (Vnímavý případ&#33;) jsou ISO-8859-1 (výchozí) a UTF-8.
    * Doporučeno: v setup.xml, uvnitř&lt;startHeadHtml&gt;, prosím změňte&lt;html&gt; do
        &lt;html lang="en-US] (nebo jiný [kód jazyka](https://www.w3schools.com/tags/ref_language_codes.asp) pokud jste přeložili zprávy.xml) .
    * setup.xml má nové volitelné značky zakázat části ERDDAP :
        *   &lt;měničeActive&gt;false&lt;/konvertoryActive&gt;&lt;&#33;--- výchozí hodnota je pravdivá --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/selideSorterActive &gt;&lt;&#33;--- výchozí hodnota je pravdivá --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;--- výchozí hodnota je pravdivá --&gt; Obecně doporučujeme, aby se žádné z nich nedalo nastavit false.
    * Generovat soubory dat Xml nyní píše výsledky _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ne log.txt. Díky Kristianu Sebastianu Blalidovi.
    * Generovat soubory dat Xml nyní dělá dobrý návrh pro&lt;reload EveryNMinutes&gt;. Díky NOAA Projekt UAF.
    * Mnoho malých vylepšení GenerateDatasetsXml. Díky NOAA Projekt UAF.

## Verze 1.42{#version-142} 
 (propuštěn 2012-11-26) 

*    **Nové funkce:** 
    *    (Žádné významné nové rysy.) 
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pokud upgrade z ERDDAP™ 1.38 nebo 1.40 nebyly provedeny žádné změny, které by vyžadovaly, abyste provedli změny ve svých konfiguračních souborech (ale musíte použít nové zprávy.xml soubor) .
    *    ERDDAP™ opět může běžet s Java 1.6. ( ERDDAP™ v1.40 Java 1.7.) Stále důrazně doporučujeme použít nejnovější verzi Java 1.7.
    * Nový typ datového souboru, [EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , lze číst data ze sady automatického počasí stanice (AWS) XML datové soubory. Díky Lynn Dewittové a průzkumu.
*    **Malé změny/Opravy chyb:** 
    * Přizpůsobeno změnám NDBC SOS zdrojové datové servery.
    * Přizpůsobeno změnám služeb NOS COOPS ASCII.
    * Udělal několik malých změn a oprav chyb.

## Verze 1.40{#version-140} 
 (propuštěn 2012-10-25) 

*    **Nové funkce:** 
    * K dispozici je nový výstupní formát souboru pro tabledap Soubory údajů: .nc CFMA, která ukládá požadované údaje v .nc soubor, který odpovídá CF [Geometrie diskrétního odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Multidimenzionální možnosti Array, a které proto odpovídají šablonám NODC \\[ 2021: nyní [Šablony NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] pro ukládání tohoto typu dat. Díky NODC.
    *    tabledap Žádosti mohou nyní zahrnovat časová omezení, jako je &time&gt; now- 5 dní. Viz [Dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Díky Jamesi Goslingovi.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Pokud upgrade z ERDDAP™ 1.38 nebyly žádné změny, které by vyžadovaly, abyste změnili své konfigurační soubory (ale musíte použít nové zprávy.xml soubor) .
    *    ERDDAP™ veřejné zprávy a vnitřní milníky jsou k dispozici prostřednictvím [ ERDDAP™ na GitHubu](https://github.com/ERDDAP) . Více informací viz [Wiki](https://github.com/ERDDAP/erddap/wiki) pro ERDDAP™ projekt a obecnější [ ERDDAP™ Průvodce programátorem](/docs/contributing/programmer-guide) . (To bylo oznámeno zvlášť několik týdnů po ERDDAP™ 1.38 uvolnění.) 
    * Generovat soubory dat Xml byl vylepšen.
        * Skript byl revidován tak, aby fungoval správně na všech Linuxových počítačích (nejen pár) .
        * Nyní dodává creator\\_name , creator\\_email a creator\\_url Kdykoliv to bude možné.
        * Mnoho dalších malých vylepšení.
    * Rafinované, jak ERDDAP™ dohodne se s časem.
        * Vnitřní, ERDDAP™ Nyní zvládá čas milisekundovou přesností (ne sekund) .
        * Nyní můžete volitelně určit časovou přesnost daného datového souboru, viz [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Například můžete nastavit datový soubor pro zobrazení časových hodnot s přesností data (např. 1970-01-01) .
        * Vaše aktuální soubory budou používat výchozí nastavení, takže jsou těmito změnami ovlivněny a budou i nadále zobrazovat čas s přesností sekund. Díky Servet Cizmeli a Philipu Goldsteinovi.
    *    [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) je nový typ datového souboru, který můžete použít ve svém datasets.xml Složka. Může číst data z některého z mnoha formátů souborů definovaných [CF Geometrie diskrétního odběru vzorků](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konvence. Díky NODC a speciální díky Kyle Wilcox za vytvoření vzorových souborů pro obrovský počet platných DSG formátů souborů a za jejich zpřístupnění.
*    **Malé změny/Opravy chyb:** 
    * Rozšířil [rychleRestartovat](#quick-restart) systém pro všechny relevantní EDDGrid a podtřídy EDDTable.
    * Vylepšená dokumentace, zejména související s používáním [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) a [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) z různých klientských programů.
    * Změněno pokročilé vyhledávání na podporu minTime a/nebo maxTime vyjádřené jako epochSecond. Díky Lynn Dewittové.
    * Změněno .htmlTable výstup pro zobrazení URL a e-mailových adres jako odkazů.
    * Přidáno "rel=" a "rev=" k příslušnému&lt;značky href&gt;. Díky Pat Cappelaere z OGC   REST projekt.
    * Zlepšená ochrana před nereálně velkými žádostmi o údaje, zejména uvnitř tabledap , kde je to těžší problém.
    * Přesunul více zpráv do zpráv.xml.
    * Vylepšil rychlost.
    * Pevné EDDGrid OdFile umožňují sestupné seřazené osy. Díky Maricel Etchegaray.
    * Odstranit odkazy na iGoogle, protože to bude přerušeno.
    * Udělal několik malých změn a oprav chyb.

## Verze 1.38{#version-138} 
 (propuštěn 2012-04-21) 

*    **Nové funkce:** 
    * ISO 19115 a FGDC -- ERDDAP™ může automaticky generovat soubory ISO 19115 a FGDC XML metadata pro každý datový soubor. Odkazy na soubory jsou viditelné na každém seznamu souborů (např. z úplného vyhledávání textu) a také v webových přístupných složkách (WAF)   (viz [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) a [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Díky Tedovi Habermannovi, Davovi Neufeldovi a mnoha dalším.
    * Celý text Hledá datasety nyní podporuje \\-_ excludedWord _ a \\-"_exclude fraction_" . Díky Richi Signellovi.
    * Hledá data, která vrací výsledky najednou. Výchozí používá řetězec parametrů: stránka=1&položekPerPage=1000, ale můžete změnit hodnoty v URL vaší žádosti. Díky Stevu Hankinovi a projektu UAF.
    *    OpenSearch -- ERDDAP™ Nyní podporuje [ OpenSearch 1. 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard pro vyhledávání souborů dat. To mimo jiné umožňuje katalogové agregace webových stránek dělat distribuované vyhledávání (předat žádost o vyhledávání každému katalogu, o kterém ví) .
    * Čárka oddělená Hodnota (CSV) Soubory... ERDDAP™ nyní generuje CSV soubory pouze čárkou mezi hodnotami (který dává přednost Excelu) , místo čárky + prostor. Díky Jeffovi deLaBeaujardierovi.
    * Milion dat -- Bylo provedeno několik změn na podporu ERDDAP má obrovské množství dat, možná dokonce milion. Díky Stevu Hankinovi a projektu UAF.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
#### Rychlý restart{#quick-restart} 
*    [A](#quick-restart) systém rychlého restartu umožňuje ERDDAP™ restartovat mnohem rychleji.
     **Prosím přidejte toto do souboru setup.xml** hned po&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Celý text vyhledávání souborů dat lze nyní provést pomocí vyhledávače Lucene (i když doporučujeme původní vyhledávač, pokud máte méně než 10 000 souborů dat) nebo původní vyhledávací systém.
         **Prosím přidejte toto do souboru setup.xml** hned po&lt;/displayDiagnosticInfo&gt;:
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

    * V setup.xml, můžete / měli by nyní přidat dvě nové kategorie do čárky oddělené seznamu&lt; categoryAttributes &gt;:
        * globální:klíčová slova (přidat hned po globální:instituce) -- nový speciální případ, který parsuje čárka-oddělený seznam klíčových slov z globálních klíčových slov atribut, aby se samostatný záznam pro každé klíčové slovo.
        * proměnná Název (přidat na konci) -- nový speciální případ, který kategorizuje každý z dataVariable   destinationName s.
    * V setup.xml, můžete (Ale proč?) Řekni ERDDAP™ neposkytnout FGDC a/nebo ISO 19115 metadata pro jakýkoli datový soubor, a to včetně
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Výchozí hodnoty pro tato nastavení jsou pravdivé.
    * In datasets.xml , prosím, zvažte zlepšení metadat pro vaše soubory dat. ERDDAP™ Nyní automaticky generuje soubory ISO 19115 a FGDC XML metadata pro každý datový soubor založený na metadatech datového souboru.
Takže, **dobrá metadata datového souboru vede k dobrému ERDDAP -vygenerovala metadata ISO 19115 a FGDC.**   
         **Podívejte se na novou dokumentaci pro mnohé nové DOPORUČENÉ [Globální Atributy](/docs/server-admin/datasets#global-attributes) .** 
    * In datasets.xml , Pokud chcete říct ERDDAP™ použít předvyrobený soubor FGDC a/nebo ISO 19115, který je někde na serverovém systému, místo aby měl ERDDAP™ generovat tyto soubory, použijte:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Pokud _fullFileName_\\="" nebo soubor není nalezen, nebude mít datový soubor žádná FGDC a/nebo ISO 19115 metadata. To je také užitečné, pokud chcete potlačit metadata FGDC a/nebo ISO 19115 pro konkrétní datový soubor.
    * In datasets.xml , pro všechny EDDGrid SideBySide a EDDGrid AgregátExisingDimension datas, ujistěte se, že dětské soubory mají odlišné datasetID s než jejich rodičovské soubory údajů a než ostatní děti. (Například byste mohl následovat jednoduchý, ale účinný systém George Foremana pro pojmenování jeho dětí.) Pokud jsou jména v rodině úplně stejná, soubor údajů selže při načtení (s chybovou zprávou, že hodnoty souhrnné osy nejsou v seřazeném pořadí) .
    * In datasets.xml , tam byly některé změny v seznamu platných ioos\\_category Hodnoty metadat:
        * "pCO2" bylo změněno na "CO2.
        * Byla přidána "fyzická oceánografie."
        * "Soils" bylo přidáno.
    * In datasets.xml , ERDDAP™ již nedovoluje '.' v datasetID . Bylo to dovoleno, ale sklíčené. (Promiň.) 
    * In datasets.xml , nastavení pro EDDTableFromThreddsFiles a EDDTableFrom Hyrax Soubory se mírně změnily, protože obě třídy byly přepsány tak, aby byly efektivnější (obě třídy nyní vždy tvoří místní kopii všech vzdálených datových souborů) . Viz dokumentace pro založení těchto tříd: [EDDTableFrom Hyrax Soubory](/docs/server-admin/datasets#eddtablefromhyraxfiles) a [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Viz zejména revidované připomínky k&lt;souborDir&gt; (Teď je to irelevantní.) a&lt; sourceUrl &gt; (Teď je to nezbytné.) . Také byste nikdy neměli zabalit tuto třídu do EDDTableCopy pro účinnost.
    * In datasets.xml , pokud používáte EDDTableFromDatabase s Oracle Databáze, měli byste zahrnout spojení Majetek jako například
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
určit, kolik řádků dat lze získat najednou, protože výchozí hodnota je 10, což je strašně neefektivní. Viz [ Oracle Dokumentace](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql a PostgreSQL se zdají mít lepší výchozí hodnoty pro toto nastavení. Díky Kevinu O'Brienovi.
    * Pokud používáte EdDtableFromDatabase, podívejte se na vylepšené [Dokumentace "Speed"](/docs/server-admin/datasets#eddtablefromdatabase) pro další návrhy na zlepšení výkonnosti. Díky Kevinu O'Brienovi.
    * In datasets.xml , pro všechny EDDTable... soubory údajů, v úmluvách a Metadata\\_Conventions globální atributy, viz CF-1.6 (ne CF-1,0, 1.1, 1.2, 1.3, 1.4 nebo 1.5) , protože CF-1.6 je první verzí, která zahrnuje změny týkající se geometrie odběru vzorků diskrétních vzorků.
    * Programátoři, kteří sestavují ERDDAP™ kód je třeba přidat lib/lucene-core.jar do seznamu jar souborů v jejich Javac a Java příkazových řádkách.
    *    ERDDAP™ má [nová služba](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) převést CF Standardní jméno na / z GCMD Science Klíčové slovo. To lze najít užitečné při generování globálních klíčových slov metadat pro soubory souborů ve vašem ERDDAP .
    * Řešit s Boty... Přečtěte si tuto radu [zabránit robotům v plazení ERDDAP™ hloupým způsobem.](/docs/server-admin/additional-information#robotstxt) .
    * Překlad -- Text ERDDAP 's webové stránky je nyní většinou ve zprávách.xml a tak vhodné pro překlad do různých jazyků (např. němčina, francouzština) . Zprávy nyní často používají zprávuFormat pro formátování, také pomoci při překladu. Pokud máte zájem o překlad, prosím e-mail erd dot data at noaa dot gov .
    * Vzorek datasets.xml -- Ve vzorku bylo několik malých, ale významných chyb datasets.xml . Pokud použijete tyto soubory souborů, zvolte novější verze z nového vzorku datasets.xml v novém erddapContent .zip Složka. Díky Jamesi Wilkinsonovi.
    * Git -- Budu se snažit udělat ERDDAP™ projekt GitHub ASAP po tomto vydání.
*    **Malé změny/Opravy chyb:** 
    * Nová paleta, OceanDepth, je užitečná pro hodnoty hloubky (Pozitivní je dolů.) , např. 0 (mělké) až 8000 (hluboký) .
    * The .kml výstup z tabledap používá lepší ikonu značky (Není to rozmazané.) . A vznášet se nad fixou to teď dělá větší.
    * EDDTableFromFoles -- V poslední upgrade, nová netcdf-java knihovna měla přísnější omezení pro variabilní názvy v .nc Složky. To způsobilo problémy pro EDDTableFromFoles, pokud proměnná je sourceName měl určité interpunkční postavy. EDDTableFromFoles je nyní upraven, aby se zabránilo tomuto problému. Díky Thomasi Holcombovi.
    * Stránka .subset nyní podporuje 0/10/1000/10000/100000 namísto zaškrtávacího políčka pro související údaje. Tip nástrojů varuje, že 100000 může způsobit pád vašeho prohlížeče. Díky Annette DesRochersové, Richard (Abe) Coughlin a biologický projekt IOOS.
    * .../erddap/info/_ datasetID _/index.html webové stránky nyní zobrazují urls a e-mailové adresy jako kliknutelné odkazy. Díky Richardovi (Abe) Coughlin a biologický projekt IOOS.
    * Oprava chyb: tabledap , pro datové soubory s nadmořskou výškou MěřičePerSourceUnit&lt;0, dotazy s nadmořskými omezeními byly řešeny nesprávně. Díky Kyleu Wilcoxovi.
    * Oprava chyb: EDDGrid AgregátOdExistingDimension nyní podporuje různorodější TDS URL adresy. Díky?

## Verze 1.36{#version-136} 
 (propuštěn 2011-08-01) 

*    **Nové funkce:** 
    * Žádné významné změny z pohledu uživatele.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Databáze pmelTao, která byla často použita jako soubor vzorků pro tabledap   
dokumentace již není k dispozici. ERDDAP™ Správci MUSÍ provést tyto změny:
        * Ve vašem datasets.xml , pokud máte datasetID = "pmelTao" soubor, přidat
active="false" přímo před "&gt;" na konci tohoto řádku.
        * Ve vašem nastavení.xml, pokud vaše&lt;EDDTableIdExample&gt; je pmelTao, pak:
            * Jestliže datasets.xml nemá datový soubor s datasetID = "erdGlobecBottle," přidat
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Ve vašem nastavení.xml, nahradit všechny značky z&lt;EDDTableIdExample&gt; přes
                &lt;EDDTabulka Matlab PlotExample&gt; s
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
                
    * Pro datové soubory, kde je typ podtřídou EDDTableFromFoles, můžete nyní vytvářet data z metadat.
Konkrétně nyní můžete vytvořit proměnnou z hodnot atributu jedné z původních proměnných.
Například datasets.xml , uvnitř&lt; dataVariable &gt; značka, pokud používáte
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ vytvoří proměnnou s hodnotami atributu PI proměnné plavby.
Díky WOD.
*    **Změny:** 
    * Malé změny

## Verze 1.34{#version-134} 
 (propuštěn 2011-06-15) 

*    **Změny:** 
    * Oprava chyb: Opravený únik paměti, který se objevil na 64bitu. Java zařízení.
    * Oprava chyb: ERDDAP™ Nyní správně nastavuje tyto globální atributy, když se hodnoty rozměru zeměpisné šířky pohybují od vysoké po nízké: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_severing, Northernmost\\_severing.
        
Všimněte si, že actual\\_range je nezměněna: může mít nízké, vysoké nebo nízké hodnoty, protože je určena k označení rozsahu a pořadí skladování.
        
    * Malé změny.
    *    ERDDAP™ Správci nemusí provádět žádné změny v jejich nastavení.xml nebo datasets.xml .

## Verze 1.32{#version-132} 
 (propuštěn 2011-05-20) 

*    **Změny:** 
    * Podpora nově ratifikovaných, CF diskrétních geometrie odběru vzorků (který bohužel není ještě k dispozici on-line) , které nahrazuje navrhované úmluvy o sledování CF Point.
         ERDDAP™ uživatelé uvidí, že cdm\\_feature\\_type=Station je nahrazen TimeSeries a existují malé změny souborů vytvořených pro .nc Typ CF souboru (flat\\_dimension se nyní nazývá vzorek\\_dimension) .
         ERDDAP™ Správci budou muset provést tyto změny v datasets.xml :
        * cdm\\_data\\_type=Station by mělo být změněno na cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile by měl být změněn na cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables by měly být změněny na cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id by měla být změněna na cf\\_role=timeseries\\_id.
    * Nový ioos\\_category možnosti: "Barevná rozpuštěná organická hmota," "pCO2," "Stream Flow," "Total Suspended Matter."
    * Možné řešení možného úniku paměti na 64bit Java . \\[ Nefungovalo to. \\] 
    * Malé změny.

## Verze 1.30{#version-130} 
 (propuštěn 2011-04-29) 

*    **Nové funkce:** 
    * Podpora pro 64-bit Java . Při použití s 64 bity Java , ERDDAP™ nyní může použít mnohem více hromady paměti a zvládnout mnoho dalších simultánních požadavků.
    * Podpora .nc žádosti o soubor až do 2GB (i bez 64 bitů Java ) lepším použitím ERDDAP Zpracovává data v kouscích.
    * Mnoho 2X zlepšení rychlosti v kódu a 2X rychlost ups od Java 1.6 výrobce ERDDAP™ 2X až 4X rychleji než předtím.
    * Zlepšení úspor paměti výrazně nižší ERDDAP Je to základní využití paměti.
    * Pro soubor tabulkových dat, ERDDAP™ je si plně vědom cdm\\_data\\_typu datového souboru a toho, jak data mapují do typu CDM. Viz [CF Specifikace diskrétního odběru vzorků Geometrie](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Snad brzy, že soubor Word bude převeden na .html a nahradit aktuální "OBSOLETE" informace na této webové stránce. Díky NOAA Projekt UAF.
    * Pro většinu souborů EDDTable je nová volba typu výstupního souboru, .nc CF, vytváří kontiguous Ragged Array .nc soubory, které odpovídají nejnovější verzi [CF Konvence o diskrétním odběru vzorků geometrie](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Tyto soubory jsou strukturovány tak, aby odrážely datový typ CDM datového souboru. Vzhledem k tomu, že navrhované úmluvy se právě změnily, od tohoto psaní, netcdf-java knihovna ještě nepodporuje čtení formátů souborů vytvořených ERDDAP a interpretovat je jako CDM datové soubory. Pravděpodobně brzy. Díky NOAA Projekt UAF.
    * The View : Distinct Data option on the .subset web page is now a drop-down list that lets users specified the maximum number of rows of different data to be looked (výchozí = 1000) . Tato změna, a další, povolit ERDDAP™ pracovat s datovými soubory, které mají velmi velký počet řádků různých dat. (Počet unikátních hodnot pro každou jednotlivou proměnnou je stále problém, ale může být docela vysoká. (20 000?) před .subset a další webové stránky se načítají opravdu pomalu.) Díky NOAA Projekt UAF.
    * .subset webové stránky mají novou možnost: Zobrazit Distinct Data počítá. Díky projektu GTOPP.
    * Na pomoc uživatelům, odlišné hodnoty (např. názvy stanic) jsou nyní zobrazeny na Make-A-Graph a Data Access Forms. Díky NOAA Projekt UAF.
    * .transparentní Png žádosti nyní podporují všechny typy grafů a datových reprezentací. To kreslí jen data -- žádné osy, legendy, pevnina, nebo něco jiného. Díky tomu je možné vytvářet obrázky jako vrstvy transparentních Pngů. Pokud &.size=_width_ | _výška_ je uvedena v dotazu (doporučené) Je mi ctí. Výchozí hodnota je 360x360 pixelů. Jediná výjimka je EDDGrid &.draw=povrch, kde je výchozí (jako dříve) je obrázek s ~1/pixel na datový bod (až 3000 x a y pixelů) . Díky Fredu Hochstaedterovi.
    * The WMS Webové stránky nyní zobrazují barevnou lištu proměnné datového souboru (án) . Díky Emiliovi starostovi a dalším.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Toto vydání zahrnuje mnoho změn. Všechny jsou důležité. Buďte prosím trpěliví a propracujte všechny níže uvedené změny.
    * Tato verze je vytlačena dříve, než se má vypořádat s některými Java Bezpečnostní brouci. Bohužel několik funkcí/fixů určených k tomuto účelu ERDDAP™ verze není v této verzi. Promiň. Doufejme, že další verze bude poměrně brzy (a mnohem jednodušší upgrade na) .
    * Aby se zabránilo několika bezpečnostních chyb v Java 6 aktualizace 23 a níže, stáhnout a nainstalovat nejnovější verzi Java   ( Java 6 aktualizace 24 nebo vyšší) . Pokud máte 64-bitový operační systém, prosím, získejte 64-bitovou verzi Java .
    * Pokud používáte Tomcat 5, musíte upgradovat na Tomcat 6 nebo 7 (preferovaný) . Pokud používáte Tomcat 6, zvažte upgrade na Tomcat verzi 7.
    * Dodržujte prosím všechny pokyny pro [zřízení nového ERDDAP™ ](/docs/server-admin/deploy-install) , ale tam, kde je to relevantní, budete kopírovat soubory od své staré instalace do nové instalace, zejména \\[ tomcat \\] /content/erddap adresář a soubory. Jako součást tohoto, všimněte si [nová doporučení nastavení Tomcat](/docs/server-admin/deploy-install#tomcat) .
    * Výchozí erddap.css je nyní součástí souboru erddap.war.
        * Chcete-li použít výchozí erddap.css, **smazat** Tvůj starý \\[ tomcat \\] /content/erddap/images/erddap.csss .
        * Pokud jste upravil (a) \\[ tomcat \\] /content/erddap/images/erddap.css, a chcete jej nadále používat: stačí nechat na místě a nahradit&lt;vstup &gt; oddíl s:
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

    * Ve vašem \\[ tomcat \\] /content/erddap/setup.xml:
        * Nahradit komentáře a značky související&lt;parciálníRequestMaxBytes&gt; a&lt;partitionalRequestMaxCells&gt; s
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
        * Nahradit připomínky týkající se&lt; categoryAttributes &gt; a zvážit úpravu hodnoty značky:
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

Individuální&lt; categoryAttributes &gt; které jsou nyní globálními atributy MUSÍ být identifikovány prostřednictvím globální předpony: (např. globální:instituce) . Ostatní atributy se považují za proměnné atributy (např. standard\\_name ) . Také hodnoty institucí (Jediní) byly ponechány v původním případě. Nyní jsou všechny hodnoty kategorie převedeny na malé.
    * Ve vašem \\[ tomcat \\] / content/ erddap/ datasets.xml :
        * Big Improved: ERDDAP™ má nové požadavky týkající se cdm\\_data\\_typu souboru. Každý datový soubor musí mít zejména správná metadata a proměnné týkající se cdm\\_data\\_type. Pokud ne, data se nenačte a hází chybu. Viz dokument [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Existuje nový typ datového souboru: EDDTableFromAsciiServiceNOS.
        * FYI: Existují tři nově povoleny ioos\\_category možnosti: Hydralogie, kvalita (např. pro označení kvality) , a statistiky (např. průměr) .
        * Pro EDDTableFrom... Soubory souborů, odstranit všechny soubory&lt;nRozměry &gt; značky. Už nejsou zapotřebí ani používány.
        * Pro proměnné s destinationName = výška, ERDDAP™ již nenutí long\\_name být nadmořskou výškou. Prosím, projděte si svou datasets.xml a opakovaně hledat&lt; destinationName &gt; nadmořská výška a přidat k této proměnné&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (nebo mírně jiný long\\_name ve zvláštních případech) .
        * Volitelné: Všechny podtřídy EDDTableFromFromFoles podporují proměnnou [ sourceName = Globální:...](/docs/server-admin/datasets#global-sourcenames) převést globální metadata z každého souboru do datové proměnné. Díky Lynn DeWittové.
    * EDDTableFromDatabase uživatelé -- ERDDAP™ přichází s novým ovladačem JDBC 4 pro Postgres. Pro další databáze, zkontrolujte web pro nejnovější JDBC .jar soubor pro vaši databázi. Od ERDDAP™ použití Java 1.6+, JDBC 4 (ne 3) pravděpodobně se doporučuje.
    * FYI
        *    EDDGrid Z...Files a EDDTable Z... Soubory souborů nyní ukládají informace souboruTable v
             \\[ velkýRodič rodičů \\] /dataset Info/ \\[  datasetID  \\] /\\* .nc Složky.
Také soubory EDDTable nyní ukládají podmnožinu informace v
             \\[ velkýRodič rodičů \\] /dataset Info/ \\[  datasetID  \\] /\\* .nc Složky. Tyto soubory bývaly
             \\[ velkýRodič rodičů \\] /dataset Info/ \\[  datasetID  \\] .\\* .json Složky.
Staré soubory budou automaticky smazány, pokud ERDDAP™ Začneme. Nebo můžete smazat všechny soubory (Ale nechte prázdné podadresáře.) v \\[ velkýRodič rodičů \\] /datasetInfo/.
        * Pracoval jsem na novém programu EDDTableFromNcCFFiles, který by četl data z místních i vzdálených souborů pomocí navrhovaných nových úmluv o sledování CF Point. Ale není to v tomhle vydání. V knihovnách netcdf-java jsou problémy týkající se některých metod čtení těchto souborů. A došlo k několika nedávným změnám navrhovaných úmluv o pozorování CF Point. Až bude knihovna netcdf-java opravena a aktualizována do posledního návrhu, budu na tom pokračovat.
        * Běh ERDDAP™ na Windows může mít problémy: zejména můžete vidět v \\[ bigDirectory/logs/log.txt soubor, který ERDDAP™ není někdy schopen rychle smazat a/nebo přejmenovat soubory. To je způsobeno antivirovým softwarem (např. z McAfee a Norton) který kontroluje soubory na viry. Pokud narazíte na tento problém (které lze vidět chybovými zprávami v log.txt souboru jako "Neschopen odstranit ...") , změna nastavení antivirového softwaru může částečně zmírnit problém.
Pokud ERDDAP™ ve Windows je jen test běžící na ploše, to je jen nepříjemnost.
Pokud ERDDAP™ ve Windows je vaše veřejnost ERDDAP™ , Zvažte přechod na Linux server.
    * Pomalé první spuštění -- Když poprvé utíkáš ERDDAP™ po modernizaci, ERDDAP™ může být pomalé načíst soubory dat. Cesta ERDDAP™ ukládá informace o souhrnných souborech se změnila, takže ERDDAP™ bude muset znovu přečíst nějaké informace ze všech těchto souborů. To bude chvíli trvat.
    * Chyby při spuštění -- Vzhledem ke změnám souvisejícím s cdm\\_data\\_type, je pravděpodobné, že některé vaše soubory souborů nebudou načítat a budou házet chyby. Pečlivě si přečtěte Daily Report email, že ERDDAP™ Pošle vás, když ERDDAP™ je hotovo. Bude mít seznam souborů, které nebyly načteny (nahoře) a důvod, proč nenaložili (v blízkosti dna) .
    * Pokud zaseknete nebo budete mít jiné otázky, pošlete mi podrobnosti: erd.data at noaa.gov .
    * Programátoři -- Když píšeš Java programy, které běží ERDDAP™ kód, musíte změnit některé reference parametru příkazového řádku:
        * Změňte joda-time-1.6.2.jar na joda-time. sklenice
        * Změnit odkaz Postgres JDBC .jar na postgresql.jdbc.jar
*    **Malé změny a opravy chyb:** 
    
    * Vylepšená manipulace s připojením, aby se zabránilo zavěšení vláken.
    * Vylepšená kurzová praxe, která má efektivněji řešit téměř současně stejné požadavky.
    *    ERDDAP™ nyní používá netcdfAll-4.2.jar (přejmenována na netcdfAll-latest. sklenice) . Tento spínač vyžadoval několik interních změn a způsobil několik malých vnějších změn, např. změny v tom, jak jsou čteny grib soubory a drobné změny v .nc Výstup hlavy.
    * Nová funkce: \\[ erddap \\] /konvertovat/fipscounty.html konvertuje FIPS okresní kódy do/z okresních jmen.
    * Na mapách jsou státní hranice nyní tmavě fialové, takže vynikají lépe na všech barvách pozadí.
    * Tabulkové .kml výstup opět používá kruhovou ikonu k označení bodů (Ne ikona letadla Google nedávno přešel na) .
    * ErdCalcofi soubory byly přeorganizovány a nyní jsou podávány z místních souborů (rychleji) .
    * Generovat soubory dat Xml od Třísky Katalog nyní vytváří soubor výsledků:
         \\[ tomcat \\] /webapps/erddap/WEB-INF/ temp/ EDDGrid OdThreddsCatalog.xml . Díky Kevinu O'Brienovi.
    * Generovat soubory dat Xml od Třísky Katalog se nyní snaží odstranit nepotřebná čísla portu ze zdrojových URL (např.:8080 a :8081 lze někdy odstranit) . Díky NOAA Centrální bezpečnostní tým.
    * Pro webové stránky .subset má nyní Mapa Distinct Data variabilní rozsah lat lon.
    * Několik seznamů ERDDAP™   (Například tabulka zobrazující všechny soubory údajů) byly vyřešeny tak, že A.Z třídit před A. .z . Teď to řeší necitlivě.
    * Malé změny webových stránek .subset, včetně: jednotky jsou nyní uvedeny.
    * Generovat soubory dat Xml a DasDds již házet výjimku, pokud nemohou dát výsledky do systémové schránky nebo displejeInBrowser. Díky Ericu Bridgerovi a Gregovi Williamsovi.
    * Oprava chyb: Při načtení dat, ERDDAP™ nyní odstraní nebo upraví globální geoprostorové atributy. Díky Charlesi Carletonovi.
    * Oprava chyb: String2.getClassPath () Nyní správně procent-decodes třída Cesta (a to zejména na Windows, mezery v názvu souboru se objevily jako% 1) . To ovlivnilo ERDDAP™ ED Statické volání SSR.getContextAdresář () a hledání obsahu/hřeben. Díky Abe Coughlinovi.
    * Oprava chyb: v EDDTableFromFromFoles související s getDataForDapQuery manipulace s odlišným () žádosti. Díky Ericu Bridgerovi.
    * Oprava chyb: tabledap žádosti řádně nezvládly omezení výšky, když byl datový soubor nadmořské výšce MetryPerSourceUnit byly -1. Díky Ericu Bridgerovi.
    * Oprava chyb: EDDTableFrom... Soubory souborů nyní správně řeší požadavky, které zahrnují =NaN a &#33;=NaN.
    
## Verze 1.28{#version-128} 
 (propuštěn 2010-08-27) 

*    **Nové funkce:** žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** žádné.
*    **Oprava chyb:** Opravit chybu v programování (pouze ver 1.26) které ERDDAP™ Pomalu.
     

## Verze 1.26{#version-126} 
 (propuštěn 2010-08-25) 

*    **Nové funkce:** žádné.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** 
    * Z tvého \\[ tomcat \\] /content/erddap/setup.xml,
        * In&lt;Legální &gt;, na novém řádku níže \\[ standardní DataLicence \\] , vložit \\[ StandardKontakt \\] . \\[ StandardKontakt \\] odkazuje na&lt;adminEmail &gt; specifikováno výše v setup.xml.
        * Odstranit&lt;TabulkaSpolečnáBGColor&gt; a&lt;tableHighlightBGColor&gt;.
        * Doporučeno: Změna&lt;endBodyHtml &gt; to
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

    * Požadované: Na tvou \\[ tomcat \\] /content/erddap/images/erddap.css a erddapAlt.css, přidat dole:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Opravy chyb a malé změny:** 
    
    * Oprava chyb: v některých situacích, formy nefungovaly v některých verzích Internet Explorer. Díky moc Gregovi Williamsovi.
    * Oprava chyb: Tlačítka Make A Graph nefungovala, pokud byl soubor ze vzdáleného ERDDAP .
    * Oprava chyb: WMS Někdy to nefungovalo, když byl datový soubor ze vzdáleného ERDDAP .
    * Mnoho malých změn a oprav chyb.
    

## Verze 1.24{#version-124} 
 (propuštěn 2010-08-06) 

*    **Nové funkce:** 
    * Nový [Subset webové stránky](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) použít faceted vyhledávání pro výběr podskupin tabulkových souborů. Díky POST.
    * Nový [Pokročilé vyhledávání](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) kombinuje všechny ostatní možnosti vyhledávání a přidává délku, šířku a časové hranice boxů. Díky Ellyn Montgomeryové. (Omlouvám se za zpoždění.) 
    * Nový [Převést čas](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) webová stránka a služba vám umožní převést numerické časy do / z ISO string times.
    * Nový [Převést jednotky](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) webová stránka a služba vám umožní převést UDUNITS do/z jednotek UCUM. Díky NOAA IOOS SOS .
    * Pokud a tabledap požadavek obsahuje & jednotky ("UCUM") , názvy jednotek budou převedeny z původních jmen (obvykle UDUNITS ) až [UCUM](https://unitsofmeasure.org/ucum.html) jména jednotek. To ovlivňuje pouze jednotky.\\*názvy\\*, nikoli hodnoty dat. Díky NOAA IOOS SOS .
    * Zlepšení tvorby grafických webových stránek a grafů a map:
        * Je-li graf mapou, jsou zde nová tlačítka Make A Graph pro přiblížení/oddálení a nová volba pro změnu středu mapy. Díky POST.
        * Nastavení filtru přidáno v blízkosti dna. Díky Gregovi Williamsovi.
        * Vestavěné soubory údajů o pobřeží byly aktualizovány na GSHHS v2.0. Díky POST.
        * Mapy nyní zahrnují jezera a řeky. Díky POST. (Promiňte, Sacramento River Delta chybí, protože se s tím nevypořádají ani údaje o pobřeží, ani údaje o jezeru/řece.) 
        * Vestavěné v národních/státních souborech odvozených z pscoastu byly aktualizovány. Díky POST.
        * Topography.cpt byl mírně upraven. (Promiň, jestli tě to nepříznivě ovlivňuje.) Díky POST.
        * V griddap je Make A Graph, pokud uživatel změní proměnnou, formulář se automaticky resetuje tak, aby axisVariable s' showStartAndStop vždy odráží proměnné grafu. Díky Joaquinu Trinanesovi.
        * URL obrázků png a pdf:
            * Nová &.land=_value_, kde _value_ může být "pod" (show topografie) nebo "přes" (Jen ukázat koupelnu) . Není-li uvedeno, je výchozí hodnota nastavena [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) v datasets.xml nebo nastavení.xml. Díky POST.
            * Novinka: řádky v legendě, které jsou příliš dlouhé, jsou automaticky rozděleny do více řádků. Díky POST.
        * URL obrázků png:
            * Nová &.legend=_value_, kde _value_ může být "Bottom" (výchozí) "Off" nebo "Only." To vám umožní zahrnout legendu, vyloučit legendu, nebo získat pouze legendu. Díky Cara Wilsonové.
            * Nový &.trim=_n Pixels_ opouští hranici nPixels (např. 10) na spodní části obrázku. Aplikuje se po .legend=Off. Díky Cara Wilsonové.
            * Nová &.size=_šířka_ | _výška_ umožňuje zadat šířku a výšku obrázku v pixelech.
    * Nové výstupní formáty souborů:
        * .csvp a .tsv p -- jako .csv a .tsv , ale s " (_jednotky_) "Přiložen k jménům sloupců na prvním řádku.
        * .odvTxt -- vytvoří soubor .txt, který zjednodušuje získání dat do [Údaje o oceánu Pohled (ODV) ](https://odv.awi.de/) .
        * .esriCsv -- dělá soubor .csv vhodný pro import v ESRI ArcGIS . (Pouze tabulární data) Díky Janu Masonovi, Jeffovi de La Beaujardierovi a NOAA IOOS SOS projekt.
    * Zlepšení GUI [Kategorie](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) webové stránky. Také kategorizační hodnoty (jiné než instituce) jsou teď všichni malí. Žádosti o nelehčí případy jsou přijímány (přesměrováno) pro zpětnou kompatibilitu. Díky Royi Mendelssohnovi.
    * Chybové zprávy jsou nyní ještě kratší a orientovanější na uživatele. Díky Gregovi Williamsovi.
    * Vnitřní změna, která výrazně snižuje ERDDAP Je to základní využití paměti.
    * Mnoho nových funkcí, které jsou relevantní pouze pro projekt POST.
*    **Věci ERDDAP™ Administrátoři potřebují vědět a udělat:** Je tu spousta změn. Promiň. Ale každý z nich přináší nějaké pěkné výhody.
    * Velké změny na GenerateDatasetXml -- to nyní často klade více otázek (viz relevantní [Soubor údajů Typy](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) informace) a nyní vždy generuje v podstatě připravený obsah pro datasets.xml . Jste stále zodpovědný za nastavení, takže byste měli stále přezkoumat datasets.xml obsah před použitím. Lidská snaha do projektu bude vždy lepší než počítačový program. Díky projektu UAF.
    * Požadované: V setup.xml, musíte revidovat WMS sekce. Nyní by měla obsahovat tyto značky (ale neváhejte změnit hodnoty) :
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

    * Požadované: V setup.xml, kopírovat a vložit tento nový navrhl&lt;startHeadHtml &gt; nahradit svou starou verzi. Ale neváhejte udělat změny pro vaše preference.
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

Díky POST, Hansi Vedo a Ricku Blairovi.
    * Požadované: In setup.xml, in&lt;spustitBodyHtml &gt;, změnit&lt;karosérie &gt; značka just&lt;body &gt;, protože styl je nyní nastaven erddap.css.
    * Požadované: V nastavení.xml, změna na toto&lt;endBodyHtml&gt; (ale změnit e-mailovou adresu na vaši e-mailovou adresu a neváhejte provést další změny) :
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

    * VYŠETŘENO: V setup.xml se doporučuje&lt;ShortDescriptionHtml&gt; je nyní
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

Neváhejte to změnit, zejména poslední věta v prvním odstavci.
    * In setup.xml, emailEverythingTo a emailDailyReport Chcete-li nyní mohou být čárky oddělené seznamy e-mailových adres. První e-mailVšechno To je speciální, např. předplatné EDDXxxxFromErddap soubory používají tuto e-mailovou adresu. Díky Johnu Maurerovi.
    * E-mailové chyby jsou nyní přihlášeny k \\[ velkýRodič rodičů \\] /logs/emailLogRRRR-MM-DD.txt file.
    * V setup.xml je nový, volitelný parametr pro nastavení vlastnosti e-mailového účtu (obvykle hned po&lt;EmailPassword&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Výchozí hodnota není nic. Díky Richi Signellovi.
    * Požadované: Pokud používáte EDDtableCopy nebo EDDGrid Rozumím, musíte vypnout všechny \\[ velkýRodič rodičů \\] /kopie/ adresáře a soubory, které obsahují "xh" v adresáři nebo názvy souborů po zastavení staré ERDDAP™ a před spuštěním nového ERDDAP™ Takže ty soubory budou znovu zkopírovány. Je mi to velmi líto, ale bylo důležité provést změnu a doufejme, že se to týká několika admin a několika souborů.
V Linuxu můžete najít tyto soubory s, cd \\[ velkýRodič rodičů \\] /kopie
najít .\\*xh\\*  
Ve Windows můžete najít tyto soubory s, Start | Hledat
Co chcete hledat: Dokumenty
Název souboru nebo jeho část: xh
Podívejte se do: Procházet - &gt; \\[ velkýRodič rodičů \\] /kopie
Klikněte na 'Hledat'
^A vybrat všechny
Del je všechny vymaže.
    * Požadované: datasets.xml , pro soubory EDDTableFromDatabase, pro proměnné datumu a času změnit data Napiště na dvojnásobek a jednotky na sekundy od 1970-01-01T00:00:00Z. VYŽÁDÁME, abyste v databázi uložili data časového razítka\\*s\\*Časové pásmo. Bez informací o časové zóně, dotazy, které ERDDAP™ odešle do databáze a výsledky, které ERDDAP™ Dostat se z databáze přes JDBC jsou nejednoznačné a pravděpodobně se mýlí. Snažili jsme se, ale nenašli jsme spolehlivý způsob, jak se vypořádat s daty "časové razítko bez časového pásma." Stejně si myslíme, že je to dobrá praxe. Koneckonců, data "časového razítka bez časového pásma" mají implikované časové pásmo. I když je skvělé, že časové pásmo je zřejmé pro admin databáze, to dává smysl výslovně určit, aby jiný software může správně komunikovat s vaší databází. Díky/promiňte Michaele Urzene.
    * VYŠETŘENO: datasets.xml , Chcete-li povolit .subset webové stránky pro faceted vyhledávání vašich tabulkových souborů, musíte přidat [&lt; subsetVariables &gt;] (/docs/server-admin/datasets#subsetvariables) globální atributy datového souboru.
    * DOPORUČUJE: datasets.xml , pokud máte datový soubor s datasetID = "pmelGtsppp," prosím, změň to na
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * DOPORUČUJE: datasets.xml , existují nové platné možnosti pro [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) globální atribut, takže byste měli přezkoumat/změnit hodnotu pro vaše soubory dat.
    * In datasets.xml , nový [&lt;zdrojNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) je užitečné, pokud zdrojový server trvale nezvládá &_variable_\\=_value_ testy správně (kvůli [celková obtížnost testování rovnosti čísel plovoucích bodů](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . zdrojNeedsExpandedFP\\_EQ je nastavena na true defaultně (nejbezpečnější nastavení) Takže nemusíte dělat žádné změny.
    * Nový [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Díky Jerrymu Yun Panovi.
    * Nový [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Díky Royi Mendelssohnovi.
    * Změny [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) umožňuje použití s širší škálou souborů.
    * EDDTableFromBMDE byl zakázán. Už neexistují žádné aktivní, vhodné zdroje dat.
    * V GenerateDatasetXml, nový EDDGrid FromThredds Katalog sklízí celý katalog THREDDS (nebo podmnožina) a generuje datasets.xml obsah. Díky projektu UAF.
    * Generovat soubory dat Xml a DasDds nyní také dát své výsledky v \\[ velkýRodič rodičů \\] /logs/log.txt. Díky Richi Signellovi a Charlesi Carletonovi.
    * Mnoho vylepšení přihlašovacího systému. Díky POST.
*    **Věci ERDDAP™ Programátoři Potřeba vědět a udělat:** 
    * V adresáři /WEB-INF/lib/ došlo ke změnám. Prosím, změňte nastavení java a java třídypath.
    * Je tu nový. \\[ Vaše Url \\] /erddap/version service pro určení verze ERDDAP . Odpověď je text, např. ERDDAP \\_version=1.24 Pokud dostanete chybovou zprávu HTTP 404 Not- Found ERDDAP™ jako verze 1.22 nebo nižší. Díky POST.
*    **Malé změny a opravy chyb:** 
    
    * EDDTableFrom Sos změny:
        * Upuštěná podpora pro čtení IOOS SOS XML odpovědi.
        * Přidána podpora pro čtení IOOS SOS text/csv. (Takže NOS SOS servery momentálně nejsou podporovány.) 
        * Udělal mnoho změn souvisejících s IOOS SOS Detaily serveru.
        * Přidána podpora BBOX dotazů pro IOOS SOS a OOSTethys   SOS servery. Tyto změny vedou k velké rychlosti pro příslušné žádosti o údaje. Díky IOOS SOS .
    * Text v .mat Tabulkové datové soubory jsou nyní správně uloženy. Díky Royi Mendelssohnovi.
    *    WMS 
        *    OpenLayers je nyní spojena s ERDDAP™ pro použití na WMS webové stránky. Tím se vyřeší problém způsobený, když OpenLayers změnil před několika měsíci a zabraňuje budoucím problémům.
        * V WMS   GetCapabilities odpověď,&lt;OnlineResource&gt; hodnota je nyní URL WMS služba. Díky Charltonu Galvarinovi.
        * Legenda je zobrazena na WMS webové stránky pro zobrazení barevné lišty. Díky Emiliovi starostovi.
    *    EDDGrid AgregátExisingRozdělovací konstruktér měl problémy, pokud zdroj osy Hodnoty se nerovnaly jejich cíli. Hodnoty, např. pokud zdrojový čas byl něco jiného než "seconds since 1970-01-01" . Díky Todd Spindler.
    * V tabulceWriterGeoJson, přebytek ',' za bbox \\[ ... \\] byl odstraněn. Díky Gregovi Williamsovi.
    * Mnoho malých změn a oprav chyb.
    
## Verze 1.22{#version-122} 
 (propuštěn 2009-07-05) 

* Chyba SlideSorter zavedená v 1.20 je pevná.
* Chyba OBIS zavedená v 1.20 je opravena.
* Odkazy na Jason soubory souborů na obrazech / gadgets / GoogleGadgets stránky byly odstraněny.
     
## Verze 1.20{#version-120} 
 (propuštěn 2009-07-02) 

*    ERDDAP™ Administrátoři, přidejte prosím toto do souboru setup.xml:
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

* Nové typy souborů údajů [ EDDGrid Kopírovat](/docs/server-admin/datasets#eddgridcopy) a [EDDtableCopy](/docs/server-admin/datasets#eddtablecopy) vytvořit a udržovat místní kopii jiného EDDGrid nebo data datového souboru EDDTable a slouží datům z místní kopie. Ty jsou velmi snadné použití a velmi efektivní **řešení některých největších problémů se službou dat ze vzdálených zdrojů dat:** 
    
    * Přístup k datům ze vzdáleného zdroje dat může být pomalý (z různých důvodů) .
    * Vzdálený datový soubor je někdy nedostupný (znovu, z různých důvodů) .
    * Spoléhání na jeden zdroj pro data se neměří dobře (např. když je mnoho uživatelů a mnoho uživatelů ERDDAP Využijte ho.) .
    
Navíc místní kopie je záloha originálu, což je užitečné pro případ, že by se něco stalo s originálem.
    
Na vytvoření místní kopie souboru není nic nového. Co je tady nového je, že tyto třídy to dělají\\*snadné\\*vytvořit a\\*udržovat\\*místní kopie údajů z\\*odrůda\\*typů vzdálených zdrojů dat a\\*přidat metadata\\*při kopírování dat.
    
Tyto datové typy jsou součástí kompletního souboru funkcí, které zjednodušují tvorbu [mřížky/klastry/federace ERDDAP án](/docs/server-admin/scaling) zvládnout velmi těžké zatížení (např. v datovém centru) .
    
* Nový typ souboru [EDDtableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) získává data z místní nebo vzdálené tabulky databáze.
*    ERDDAP™ Teď má [bezpečnost](/docs/server-admin/additional-information#security) systém podporující ověřování (možnost přihlášení uživatelů) a povolení (umožnit jim přístup k určitým soukromým souborům údajů) .
* Jsou. [dva, nové nástroje příkazového řádku](/docs/server-admin/datasets#tools) pomoct ERDDAP™ Správci generují XML pro nový datový soubor v datasets.xml :
    * Generovat soubory dat Xml může generovat hrubý návrh souboru XML pro téměř jakýkoli typ souborů dat.
    * DasDds vám pomáhá opakovaně testovat a vylepšovat XML pro datový soubor. ERDDAP 's GenerateDatasets Xml webové stránky byly odstraněny. Z bezpečnostních důvodů podporovali pouze několik typů souborů údajů. Nové nástroje pro příkazovou řadu jsou lepším řešením.
* Nový [stavová stránka](/docs/server-admin/additional-information#status-page) Nechá každého (ale zejména správci) Zobrazit stav ERDDAP™ z jakéhokoliv prohlížeče tím, že jde do \\[ baseUrl \\]  /erddap/status.html .
* Tabledap nyní podporuje [funkce na straně serveru](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * & Distinct () odstraňuje z tabulky odezvy duplikát řádků,
    * & orderBy  (...) vám umožní určit, jak má být tabulka odpovědí seřazena,
    * & orderByMax  (...) Umožní vám určit, jak má být tabulka odezvy seřazena a odstraní všechny řádky kromě řádků s maximálními hodnotami v posledním zadaném sloupci. To lze například použít pro získání posledních dostupných údajů pro každou stanici.
* Tabulkové soubory nyní mohou obsahovat další proměnné DateTime, které nejsou pojmenovány "time" . Tyto proměnné jsou rozpoznány jejich metadaty "jednotek," které musí obsahovat " since "   (pro číselné datum Časy) nebo "yyy" nebo "YY" (pro formátované datum strun) . Ale použij prosím destinationName   "time" pro hlavní datum Časová proměnná.
*    ERDDAP™ Nyní generuje a [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) soubor, který říká vyhledávače, že váš ERDDAP Stačí se plazit každý měsíc. ERDDAP™ Správci, prosím následujte [Tyto pokyny](/docs/server-admin/additional-information#sitemapxml) informovat vyhledávače o novém souboru sitemap.xml.
*    ERDDAP 's chybové zprávy jsou nyní mnohem kratší a zaměřené na klienty (neprogramátoři) . Díky Gregovi Williamsovi.
* [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) nyní také podporuje IP adresy, kde bylo poslední číslo nahrazeno \\*.
* Žádosti o .json a .geoJson soubory mohou nyní zahrnovat volitelné [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) žádost přidáním "& .json p=_funkceName_" na konec dotazu. V podstatě to říká ERDDAP™ přidat "_funkceName_ ("na začátek odpovědi a ") "na konec odpovědi. Pokud původně nebyl dotaz, vynechte "&" v dotazu. Díky Gregovi Williamsovi.
* Mnoho nových statistik bylo přidáno do [Denní zpráva](/docs/server-admin/additional-information#daily-report) .
* Na webových stránkách se seznamy souborů dat, instituce a ID jsou nyní na krajní pravici. To posune předplatné a další užitečné sloupce do zobrazení na úzkých počítačových obrazovkách.
* Na všech webových stránkách je název stránky (na základě&lt;Název &gt; v&lt;startHeadHtml&gt;, který definujete v setup.xml) je upraven tak, aby obsahoval lepší popis webové stránky (Například zahrnutím názvu a instituce aktuálního datového souboru) .
* Informace o Xmx jsou nyní součástí informací o paměti vytištěných v log.txt, Daily Report a na status.html. Díky Ellyn Montgomeryové.
*    ERDDAP™ má dodatečnou univerzální ochranu proti všem chybám (např. OutOfMemoryError) . Díky Charlesi Carletonovi.
* Zlepšení manipulace s chybami, pokud odpověď již byla přijata.
* ZLEPŠENÉ: EDDTableFromFoles a EDDGrid FromFiles nyní stačí povolit&lt;metadataOd &gt; první nebo poslední. Předposlední není nadále podporován. A první a poslední jsou nyní založeny na posledním zkráceném čase souborů.
* Oprava chyb: v EDDTableFrom SOS , neplatné informace pro jednu stanici hodil výjimku a způsobil, že celý datový soubor byl zamítnut. Ty stanice jsou ignorovány. (a chybová zpráva je logována pro log.txt) . Díky Ricku Blairovi.
     

## Verze 1.18{#version-118} 
 (propuštěn 2009-04-08) 

* Oprava chyb: Začínáme v 1,14, formulář pro přístup k datům a vytvořit webovou stránku grafu, která se řádně nezabývala citovanými omezeními.
* Oprava chyb: Od 1.14, EDDTableFromDapSequence nezvládla časová omezení správně, pokud zdrojové časové jednotky nebyly "sekundy od 1970-01-01T00:00:00."
     

## Verze 1.16{#version-116} 
 (propuštěn 2009-03-26) 

*    ERDDAP™ Správci:
    * To je důležité uvolnění, protože to opraví chybu, která zanechala ERDDAP™ nit běží, pokud jste použili Tomcat Manager k zastavení / spuštění nebo obnovení ERDDAP . Takže když nainstalujete 1.16, nepoužívej jen manažera Tomcatu k odpojení starého ERDDAP™ a rozmístit nové ERDDAP . Místo toho: **nenasadit staré ERDDAP™ , restartovat Tomcat (nebo server) , pak nasadit nový ERDDAP .** Vždy je dobrý nápad to udělat při instalaci nové verze.
    * Prosím přidejte [&lt;requestBlacklist&gt;&lt;/RequestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) ke svému datasets.xml . To lze použít pro upřesnění seznamu IP adres klienta, které mají být blokovány (např. odrazit od zapírání útoku služby nebo příliš horlivého web robota) .
* Je tu \\[ velkýRodič rodičů \\] /logs adresář držet ERDDAP™ záznamy. Když začneš ERDDAP™ , dělá archivní kopii log.txt a log. txt.předchozí soubory s časovým razítkem. Pokud byly problémy před restartem, může být užitečné tyto soubory analyzovat.
*    ERD 's ERDDAP™ Teď je zapnutý systém předplatného.
*    ERDDAP™ znovu umožňuje (Ale stejně to nedoporučuju.) kódování "% 26" "&" v URL žádosti (viz [související změna v1.14](#percent26) ) .
* Několik nových doplňků k části Tally [Denní zpráva](/docs/server-admin/additional-information#daily-report) .
* Malé opravy chyb v generováníDatasetsXml.
* Pár drobných oprav.
     

## Verze 1.14{#version-114} 
 (propuštěn 2009-03-17) 

* Změny pro uživatele:
    * V požadavcích na údaje sítě ERDDAP™ nyní podporuje: [poslední-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) kde n je celé číslo indexů a [ (poslední-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) kde d je numerická hodnota (na čas, to je v sekundách) .
    * V tabulkových požadavcích na údaje, String omezení nyní vyžadují [dvojité kotace](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) o hodnotě, například, &id="NDBC40121" To vyžaduje DAP protokol.
    * V tabulkových požadavcích na údaje, ERDDAP™ Teď to vyžaduje [všechna omezení jsou řádně zakódována v procentech](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Prohlížeče to dělají automaticky, takže to většinou ovlivňuje počítačové programy/skripty, které mají přístup ERDDAP .
#### Procent26{#percent26} 
*    [V předchozích dílech...](#percent26) vá [vložit webové stránky grafu](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) a [ ERDDAP™ Google Gadget webové stránky](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) řekl vyměnit "&" na URL obrázku za "% 26." Odteď byste měli nahradit "&" na URL obrázku "&amp;." Takže musíte nahradit jakékoliv "% 26" na stávajících webových stránkách a Google Gadgets s "&amp;." (Promiň.) 
*    ERDDAP™ Správci, prosím:
    * Přidat následující [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (a změnit vlajku Hodnota klíče) :
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

    * Na lince po&lt;e-mailUživatelNázev&gt; ve vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor, přidat
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
a zadejte své skutečné heslo.
    * Můžeš se změnit.&lt;wmsSampleBBox&gt; ve vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor obsahující hodnoty délky do 360, např.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Ve vašem datasets.xml soubor, přejmenovat typ souboru EDDTableFromNc4DFiles na EDDTableFromNcFiles (který nyní podporuje soubory s libovolným počtem rozměrů) . Pokud máte EDDTableFromNc4DFiles soubor:
        
        1. Musíte změnit na typ="EDDTableFromNcFiles" ve svých datových souborech. XML soubor.
        2. Musíte přidat&lt;nRozměry &gt; 4&lt;/nDimensions &gt; tag na XML souboru.
        3. Můžete přidat nové&lt;seřazenoFillesBySourceNames&gt; tag pro upřesnění interního pořadí souborů, který určuje celkový řád vrácených dat.
        
Podrobnosti viz [EDDTableFromFoles](/docs/server-admin/datasets#eddtablefromfiles) .
    * V minulosti pro EDDTableFromDapSequence, pro OPeNDAP DRDS servery, in datasets.xml , jsme použili&lt;sourceCanCanstrainStringsRegex&gt;~=&lt;/sourceCanCanstrainStringRegex&gt;. Ale nyní vidíme, že podpora DRDS regexu je omezenější než ERDDAP Takže doporučujeme&lt;sourceCanCanstrainStringsRegex&gt;&lt;/sourceCanCanstrainStringRegex&gt; tak, aby omezení regexu nebyla přenesena na zdroj, ale jsou místo toho řešeny ERDDAP .
    * Obnovená manipulace se zdrojemCanConstrain... v datasets.xml od [EDDTableFromDapSekvence](/docs/server-admin/datasets#eddtablefromdapsequence) a (interně) všechny typy souborů údajů podle protokolu EDDTable. Nový systém je jednodušší a lépe odráží variabilitu různých zdrojů dat. Můžete potřebovat upravit XML pro vaše soubory dat v datasets.xml .
* Existuje několik nových funkcí, které jsou užitečné samy o sobě, ale při kombinaci, také usnadnit vytvoření [mřížky/klastry/federace ERDDAP án](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Nové typy souborů údajů:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) a [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) který nechal jeden ERDDAP™ zahrnují soubor údajů z jiného souboru ERDDAP™ velmi jednoduchým a velmi účinným způsobem.
        *    [ EDDGrid FromFiles](/docs/server-admin/datasets#eddgridfromfiles)   (a podtřídou, [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) který umí číst NetCDF   .nc , GRIB .grb a HDF   .hdf soubory) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) který umí číst NetCDF   .nc které mají strukturu jako stůl.
    * RunLoadDatasets a LoadDatasets byly přeformulovány tak, aby ERDDAP™ je velmi citlivý na přehrávání souborů na základě souborů v [vlajka](/docs/server-admin/additional-information#flag) adresář (často)&lt;5 sekund v případě hlavního zatíženíDatasety jsou v současné době hotové).
    * Nová služba umožňující [URL pro vytvoření souboru vlajky](/docs/server-admin/additional-information#set-dataset-flag) pro daný datový soubor, např.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
vytvoří soubor vlajky v adresáři vlajky pro rPmelTao (i když vlajka Klíč je špatný.) .
    * Nový [předplatné](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) služba tak, aby každý klient mohl určit akci, která bude provedena při vytvoření konkrétního datového souboru (kdy ERDDAP™ restartováno) a kdykoli se soubor údajů jakýmkoli způsobem změní. Tento systém může být vypnut přes&lt;předplatnéSystemActive&gt; ve vašem [setup.xml](/docs/server-admin/deploy-install#setupxml) Složka. The ERDDAP™   [Denní zpráva](/docs/server-admin/additional-information#daily-report) Nyní uvádí všechny předplatné a obsahuje URL potřebné ke zrušení každé z nich, v případě, že máte pocit, že systém je zneužíván. In datasets.xml , je nový, volitelný [&lt;předplatné EmailBlacklist&gt;] (/docs/server-admin/datasets#subscribemailblacklist) tag tak, aby správci mohli zadat čárku oddělený seznam e-mailových adres, které jsou okamžitě vymazané ze systému předplatného.
    * Nový [&lt;oZměnit&gt;] (/docs/server-admin/datasets#onchange) atribut v datasets.xml Nechává ERDDAP™ Správce určí akci, která bude provedena při vytvoření konkrétního datového souboru (kdy ERDDAP™ restartováno) a kdykoli se soubor údajů jakýmkoli způsobem změní.
    * Zlepšení plného vyhledávání textu: uložení vyhledávacího řetězce pro každý datový soubor nyní používá paměť 1/2. Algoritmus vyhledávání (Boyer-Moore) je nyní 3X rychlejší.
    * Emaily od ERDDAP™ Nyní vždy předpokládejte téma a obsah s \\[ erddap Url \\] , aby bylo jasné, který ERDDAP™ Tohle přišlo z (v případě vícenásobného podání ERDDAP án) .
    * Rozsáhlejší shromažďování statistik pro [Denní zpráva](/docs/server-admin/additional-information#daily-report) e-mail.
    * Nový soubor záznamu \\[ velkýRodič rodičů \\] /emailLogYear-MM-DD.txt zaznamenává všechny e-maily odeslané ERDDAP™ každý den. To je zvláště užitečné, pokud váš server nemůže poslat e-maily - můžete si je alespoň přečíst v logu.
    *    ERDDAP™ Teď dělá \\[ velkýRodič rodičů \\] /cache/ ( datasetID ) adresář pro každý soubor dat, protože tam může být spousta souborů cache.
* Nový [ RSS 2. 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) krmiva pro každý soubor údajů (Hledej pomeranč. RSS ikony na seznamech souborů dat, formuláře pro přístup k datům a webové stránky Make A Graph) .
*    EDDGrid   .kml reakce nyní používají kachlové obrázky ("superoverlays" -- dynamicky generované quadtree obrázky) . Počáteční obraz se načítá do GoogleEarth mnohem rychleji než předtím. Rozlišení mapy se při přiblížení zvyšuje až do úplného rozlišení datového souboru. Doporučit: uživatelé by měli požádat .kml za jeden časový bod, ale soubor dat má celou délku, rozsah šířky. Bohužel byla odstraněna podpora časových rozsahů (Doufám, že se vrátí.) .
*    ERDDAP™ nyní přidává [Vyhovuje a Cache-Control max-age hlavičky](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) do všech souborů požadovaných z adresáře /images. To výrazně snižuje počet statických žádostí o soubor zaslaných na ERDDAP a tím značně urychluje většinu ERDDAP™ načítání stránek. Také mnoho Java Odkazy na skriptový soubor se přesunuly na dno jejich HTML stránek, což také urychluje mnoho ERDDAP™ načítání stránek. Díky knize "High Performance Web Sites" od Steve Suders a YSlow doplněk k FireBug plugin ve FireFoxu.
*    ERDDAP™ přepnuto z netcdf-java 2.2.22 na netcdf-java 4.0. To mimo jiné umožňuje EDDGrid FromNcFiles číst HDF   .hdf , jakož i GRIB .grb a NetCDF   .nc Složky.
*    EDDGrid OdDap a EDDGrid FromNcFiles nyní také podporuje DArray (stejně jako DGrid)   dataVariable s. Pokud rozměr nemá odpovídající souřadnicovou proměnnou, ERDDAP™ vytvoří osovou proměnnou s indexovými hodnotami (např. 0, 1, 2, ..., 311, 312) . Takže všechny ostatní aspekty EDDGrid zůstávají stejné:
\\* Stále slouží všem souborům dat jako mřížky, s osovou proměnnou pro každý rozměr.
\\* Dotazy mohou stále požadovat hodnoty z osových proměnných.
Díky Charlesi Carletonovi, Thomasi Imovi, Dorianu Raymerovi a dalším.
* The WMS   OpenLayers stránky nyní mají výchozí délku, rozsah šířky, který je trochu větší než rozsah datového souboru (není přesný rozsah, takže kontext malých souborů dat je více zřejmé) . Výchozí rozsah může být nyní také 0 až 360, což umožňuje zobrazovat celý rozsah mnoha souborů dat. Díky Todd Spindler.
* Nové posuvníky na některých formulářích Data Access a vytvořit grafické webové stránky. Zjednodušují (surové) specifikace požadovaných dat a nabízí dobrou vizuální zpětnou vazbu.
* Nová možnost pro&lt;Databáze &gt; značky v datasets.xml : [active="false"](/docs/server-admin/datasets#active) .
* Odkazy na ERD 's ERDDAP™ změna z pobřežní hlídky.pfel (stále funguje přes proxy) do pobřežní hlídky.pfeg (preferovaný) .
* Nová podpora [ data\\_min a data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) proměnné atributy metadat.
* Částečné řešení [Počkejte a zkuste znovu / částečné výsledky výjimky](/docs/server-admin/additional-information#waitthentryagain-exception) : Některé požadavky, které dříve selhaly, když byla zjištěna změna zdroje dat, uspějí, protože ERDDAP™ bude soubor údajů znovu načíst a údaje automaticky vyžádá, a to vše v rámci původní žádosti.
* Oprava chyb: generovat Datové soubory Xml byl zakázán v ERDDAP™ verze 1.12. Díky Ellyn Montgomeryové za upozornění.
* Malé změny v manipulaci s chybami.
* Mnoho zlepšení, aby se zabránilo / uzavřít s možnými závodní podmínky (tj. možné problémy vyplývající z vícevláknité povahy ERDDAP ) což způsobilo malé, vzácné problémy.
* Pokud je na obrázku napsána chybová zpráva, obrázek zůstane v cache pouze po dobu ~5-10 minut (ne 60) . Díky Care Wilsonové.
* Standardní zpráva, když nejsou žádná data, je nyní "Váš dotaz přinesl žádné odpovídající výsledky." což je kratší, přesnější, a zápasy OPeNDAP servery.
*    EDDGrid již neumožňuje hodnoty vázané osy.
* Malé změny .ver a .help požadavky.
* Mnoho malých změn a oprav chyb.
     

## Verze 1.12{#version-112} 
 (propuštěn 2008-10-31) 

* EDDTableFrom SOS opět pracuje s NDBC SOS a pracuje s novým NOS SOS .
* EDDTableFromBMDE nyní vyžaduje ERDDAP™ admin pro upřesnění dataVariable s.
*    EDDGrid již nevyžaduje, aby lat a lon být rovnoměrně mezera pro . transparentní Png nebo .kml . Díky Todd Spindler.
* Pár drobných změn.
     

## Verze 1.10{#version-110} 
 (propuštěn 2008-10-14) 

* Nové metadata "colorBar" pro datové proměnné v datasets.xml definuje výchozí nastavení barevné lišty pro grafy a mapy. Viz [více informací](/docs/server-admin/datasets#color-bar-attributes) . To je důležité, protože to výrazně zlepšuje vzhled výchozích grafů a map vyrobených Make A Graph a protože výchozí grafy a mapy mají nyní konzistentní barevnou lištu, i když klient změní požadovaný čas nebo geografický rozsah. Také to bylo nutné pro WMS .
*    ERDDAP™ nyní slouží většina dat sítě prostřednictvím WMS služba. To je důležité, protože ukazuje, že kromě získání dat z mnoha typů datových serverů, ERDDAP™ může šířit data prostřednictvím různých protokolů ( DAP , WMS , ... více v budoucnu) . Viz [dokumentace klienta](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Nebo [dokumentace pro správce](/docs/server-admin/datasets#wms) . nebo [Zkus to.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Nová podpora pro hodnoty délky &gt;180 v .kml Složky.
* Nový cdm\\_data\\_type: Ostatní .
*    ERDDAP™ nyní podporuje "boolean" source dataType. Viz [více informací](/docs/server-admin/datasets#boolean-data) To bude užitečné pro budoucí EDDTableFromDatabase.
* Nový EDDTableFromBMDE podporuje zdroje dat DiGIR/BMDE.
* EDVGridAxis nyní umožňuje sestupné seřazené hodnoty. Pmeloscarovy soubory tohle potřebovaly.
*    ERDDAP™ nyní vrací HTTP chyby (např. "404 pro nenalezený zdroj/page") ve více situacích místo HTML stránek s chybovými zprávami.
* Mnoho změn / změn ERDDAP™ dokumentace.
* Hodně drobných změn.
* Nějaké opravy brouků.
*    **Věci ERDDAP™ Správci by měli provést aktualizaci této verze:** 
    * In datasets.xml , pro jakýkoli EDDtableFrom SOS Databáze, změňte metadata "observedProperty" na "sourceObservedProperty."
    * Pravidla pro axisVariable nebo dataVariable 's destinationName jsou nyní [přísnější](/docs/server-admin/datasets#datavariable-addattributes) . Musíte zkontrolovat, zda jsou vaše názvy proměnných platné. Buď je zkontroluj ručně, nebo uteč. ERDDAP™ a podívejte se na chybové zprávy ve zprávě, která je odeslána správci.
    * In datasets.xml , pokud chcete, aby proměnná dat sítě byla přístupná prostřednictvím WMS , musíte přidat barevnéBar metadata. Alespoň, například,&lt;att name=" colorBarMinimum "type="double [51]0&lt;/att &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Viz [více informací](/docs/server-admin/datasets#wms) .
    * Přidat následující [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (ale přizpůsobit ji s vašimi informacemi) :

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
 (propuštěn 2008-07-13) 

* Nová webová služba v ERDDAP™ , generovat Datové soubory Xml, asistence ERDDAP™ Správci vytvořením hrubého návrhu XML potřebného k popisu datového souboru v datasets.xml 
* Některé změny/úpravy chyb související s umožněním, aby byl netcdf-java vnímán jako opendap server, včetně: globální metadata jsou nyní označena jako "NC\\_GLOBAL" (místo "GLOBAL") .
* The EDDGrid a AdDTable Data Access Forms nyní využívají informace o dotazu v URL. Například pokud uživatel přejde z formuláře Make A Graph do formuláře pro přístup k datům, jsou omezení nyní správně přenesena.
*    tabledap 's Make A Graph nyní umožňuje omezení proměnných Stringu.
* EDDTable je Vytvořit graf nyní umožňuje NaN omezení. Díky Stevu Hankinovi.
* Oprava chyb: EDDTable uložit AsImage správně nerozpoznala hodnoty .colorbar min a max. Díky Stevu Hankinovi
* Mnoho vylepšení nastaveníDatasetsXml. Díky Ellyn Montgomeryové.
* Griddap požadavky nyní povolit () -style vyžaduje mírně mimo rozsah skutečné osy. To je vhodné, protože () -hodnoty jsou zaokrouhleny na nejbližší skutečnou hodnotu. Díky Cindy Bessey.
* Udělal jsem FloatArray a DoubleArray test IsEvenlySpaced sofistikovanější. Vždy to bude nedokonalé. (Protože test by měl být přizpůsoben pro každý soubor údajů) Ale mělo by to být lepší. Díky Ellyn Montgomeryové.
* Přestěhoval jsem setup.html a nastaveníDatasets Xml.html erddap /download adresář a hard kóded všechny odkazy na ně. Nyní mohu provést změny a okamžitě aktualizovat informace o nastavení.
* Mnoho malých změn. Pár drobných oprav.
*    **Věci ERDDAP™ Správci by měli provést aktualizaci této verze:** 
    * Pohyb.&lt;ShortDescription Html &gt; od Vašich zpráv.xml do Vaší [setup.xml](/docs/server-admin/deploy-install#setupxml) Složka. Určuje text, který se objeví uprostřed levé strany ERDDAP™ domovská stránka. Také přidat&lt;h1&gt; ERDDAP &lt;/h1&gt; (nebo nějaký jiný titulek) až na vrchol. **Nebo,** kopírovat&lt;theShortDescriptionHtml&gt; in the new [setup.xml](/docs/server-admin/deploy-install#setupxml) soubor (z nového erddapContent .zip ) do vašeho nastavení.xml.
         

## Verze 1.06{#version-106} 
 (propuštěn 2008-06-20) 

* Nová podpora IOOS DIF SOS zdroje dat.
* Mnoho malých změn. Pár drobných oprav.
     

## Verze 1.04{#version-104} 
 (propuštěn 2008-06-10) 

* Nová funkce Slide Sorter.
* Nová stránka Google Gadgets a příklady.
* Opravit chybu EDDGrid .saveAsNc pro proměnnou s měřítkem a addOffset.
     

## Verze 1.02{#version-102} 
 (propuštěn 2008-05-26) 

* Nový EDDGrid SideBySide umožňuje různé axisVariable án \\[ 0 \\] zdroj Hodnoty.
* Všechny proudy a větrné soubory byly sloučeny do EDDGrid SideBySide data.
* Obrázky z požadavků na obraz jsou nyní cachovány 1 hodinu.
     

## Verze 1.00{#version-100} 
 (propuštěn 2008-05-06) 

* Vytvořit webové stránky a grafické příkazy v URL.
* Podpora vlajkových souborů k donucení opětovného načtení datového souboru.
* Nový typ datového souboru: EDDTableFrom4DFiles (první podtřída EDDTableFromFoles) .
