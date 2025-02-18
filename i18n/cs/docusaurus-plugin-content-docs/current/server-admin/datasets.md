---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Práce sdatasets.xmlSoubor

\\[Tato webová stránka bude pouze zajímavéERDDAP™Správci.\\]

Poté, co jste následovaliERDDAP™ [Návod k instalaci](/docs/server-admin/deploy-install), musíte upravitdatasets.xmlsoubor v *tomcat* /content/erddap/ pro popis souborů dat, které máteERDDAP™instalace bude sloužit.

Můžete vidět příklad[datasets.xmlna GitHubu](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - -

## [Úvod](#introduction) {#introduction} 

### Některá montáž nutná{#some-assembly-required} 
Nastavení datového souboru vERDDAP™není jen otázkou ukazování na adresář nebo URL souboru. Musíte napsat část XML prodatasets.xmlkterý popisuje datový soubor.

* V případě roštových souborů údajů, aby byl datový soubor v souladu sERDDAP's datovou strukturou pro roštovaná data, musíte identifikovat podmnožinu proměnných datového souboru, které sdílejí stejné rozměry. ([Proč?](#why-just-two-basic-data-structures) [Jak?](#dimensions)) 
* Současná metadata datového souboru jsou importována automaticky. Ale pokud chcete upravit metadata nebo přidat jiná metadata, musíte je zadat vdatasets.xml. AERDDAP™potřebuje další metadata, včetně[globální atributy](#global-attributes)  (např.infoUrl, instituce,sourceUrl, shrnutí a název) a[proměnné atributy](#variable-addattributes)  (např.long\\_namea jednotky) . Stejně jako metadata, která jsou v současné době v datovém souboru, doplňují popisné informace do datového souboru, metadata požadovanáERDDAP™doplňuje popisné informace do souboru údajů. Další metadata jsou dobrým doplňkem k vašemu souboru dat a pomáhajíERDDAP™lépe se snažte prezentovat svá data uživatelům, kteří je neznají.
*   ERDDAP™potřebuje, abys dělal speciální věci s[zeměpisná délka, zeměpisná šířka, výška (nebo hloubka) , a časové proměnné](#destinationname).

Pokud si koupíte do těchto myšlenek a vynaložit úsilí vytvořit XML prodatasets.xml, dostanete všechny výhodyERDDAP™včetně:

* Úplné vyhledávání textu pro soubory dat
* Hledat datové soubory podle kategorií
* Formuláře pro přístup k datům ( *datasetID* .html) takže můžete požádat o podmnožinu dat ve spoustě různých formátů souborů
* Formuláře na vyžádání grafů a map ( *datasetID* .graph) 
* Web Map Service (WMS) pro mřížkované soubory dat
*   RESTfulpřístup k vašim údajům

Making thedatasets.xmlvyžaduje značné úsilí pro prvních několik souborů údajů, ale **Je to jednodušší.** . Po prvním datovém souboru můžete často pro další datový soubor použít mnoho své práce. Naštěstí,ERDDAP™přichází se dvěma[Nástroje](#tools)vám pomůže vytvořit XML pro každý soubor dat vdatasets.xml.
Když se zasekneš, uvidíš naše[oddíl o získání dodatečné podpory](/docs/intro#support).

### Poskytovatel údajů Formulář{#data-provider-form} 
Když k vám přijde poskytovatel údajů a doufá, že vám přidá nějaké údajeERDDAP, může být obtížné a časově náročné shromažďovat všechna metadata (informace o datovém souboru) potřeba přidat soubor údajů doERDDAP. Mnoho zdrojů údajů (například .csv soubory, Soubory Excelu, databáze) nemají žádná interní metadata, takžeERDDAP™má formulář poskytovatele údajů, který shromažďuje metadata od poskytovatele údajů a poskytuje poskytovateli údajů další pokyny, včetně rozsáhlých pokynů pro[Data v databázích](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Předložené informace jsou převedeny nadatasets.xmlformát a pak e-mailem naERDDAP™Správce (Ty) a psáno (Přiložené) až *velkýRodič rodičů* /logs/dataProviderForm.log . Forma tak částečně automatizuje proces získání datového souboru doERDDAP, aleERDDAP™Správce musí ještě dokončitdatasets.xmlstřih a vypořádat se s získáním datového souboru (án) od poskytovatele nebo připojení k databázi.

Předkládání skutečných datových souborů z externích zdrojů je obrovské bezpečnostní riziko, takžeERDDAP™s tím se nevyrovná. Musíte přijít na řešení, které funguje pro vás a poskytovatele dat, například, e-mail (pro malé soubory) , vytáhnout z mraku (například DropBox nebo Google Drive) , místo sftp (s hesly) nebo tenisky Čistá (USB disk nebo externí pevný disk) . Asi bys měl přijmout složky jen od lidí, které znáš. Budete muset skenovat soubory pro viry a přijmout další bezpečnostní opatření.

Není tam žádné spojení.ERDDAP™na formulář poskytovatele údajů (např.ERDDAP™domovská stránka) . Místo toho, když vám někdo řekne, že chce, aby jim jejich data doručila vašeERDDAP, můžete jim poslat e-mail s nápisem:
Ano, můžeme vaše data dostat doERDDAP. Pro začátek prosím vyplňte formulář na https://*yourUrl*/erddap/dataProviderForm.html   (nebohttp://pokudhttps://není povoleno) .
Až to dokončíte, zavolám vám, abych vám vysvětlila detaily.
Pokud se jen chcete podívat na formulář (bez vyplnění) , můžete vidět formulář naERD'sERDDAP:[Úvod](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Část 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Část 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Část 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)a[Část 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Tyto odkazy naERD ERDDAP™Pošlete mi informace, ne vy, takže s nimi neposílejte informace, pokud opravdu nechcete přidat data doERD ERDDAP.

Chcete-li odstranit formulář poskytovatele dat ze svéhoERDDAP™, dát
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
ve vašem souboru.xml.

Popud k tomu bylNOAA's 2014[Přístup veřejnosti k výsledkům výzkumu (PARR) Směrnice](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), které vyžaduje, aby všechnyNOAAenvironmentální údaje financované prostřednictvím dolarů daňových poplatníků jsou zpřístupněny prostřednictvím datové služby (nejen soubory) do 12 měsíců od stvoření. Takže je zde zvýšený zájem o používáníERDDAP™zpřístupnit soubory dat prostřednictvím služby ASAP. Potřebovali jsme účinnější způsob, jak se vypořádat s velkým počtem poskytovatelů dat.

Zpětná vazba/návrhy? Tento formulář je nový, tak prosím e-mailerd dot data at noaa dot govpokud máte nějakou zpětnou vazbu nebo návrhy na zlepšení.

### Nástroje{#tools} 
ERDDAP™přichází se dvěma programy příkazového řádku, které jsou nástroji, které vám pomohou vytvořit XML pro každý soubor dat, který chceteERDDAP™sloužit. Jakmile to nachystášERDDAP™a spustit (alespoň jednou) , můžete najít a použít tyto programy v *tomcat* /webapps/erddap/WEB-INF adresář. Existují skripty Linux/Unix (s prodloužením .sh) a skripty Windows (s rozšířením .bat) pro každý program.\\[Na Linuxu, spusťte tyto nástroje jako stejný uživatel (Tomcat?) Tomcat.\\]Když spustíte každý program, bude vám klást otázky. Pro každou otázku napište odpověď a stiskněte Enter. Nebo kdykoliv stiskněte ^C, abyste opustili program.

#### Program nebude fungovat?{#program-wont-run} 

* Pokud dostanete neznámý program (nebo podobné) chybová zpráva, problém je pravděpodobně, že operační systém nemohl najítJava. Musíš zjistit, kdeJavaje ve vašem počítači, pak upravit odkaz na javu v .bat nebo .sh soubor, který se snažíte použít.
* Pokud máte soubor se sklenicí nenalezen nebo třída nenalezena chybová zpráva, pakJavanemohl najít jednu ze tříd uvedených v .bat nebo .sh souboru se snažíte použít. Řešením je zjistit, kde .jar soubor je, a upravit java odkaz na něj v .bat nebo .sh souboru.
* Pokud používáte verziJavakterý je příliš starý na program, program nebude fungovat a uvidíte chybovou zprávu jako
Výjimku ve vlákně "main" java.lang.UnsupportedClassVersionError:
     *některé/třída/jméno* : Nepodporovaná major.málo verze *některéČíslo*   
Řešením je aktualizovat na nejnovější verziJavaa ujistěte se, že .sh nebo .bat soubor pro program používá.

#### Nástroje tisknou různé diagnostické zprávy:{#the-tools-print-various-diagnostic-messages} 

* Slovo "ERROR" se používá, když se něco pokazilo, takže postup nebyl dokončen. I když je otravné, aby se chyba, chyba vás nutí vypořádat se s problémem.
* Slovo "WARNING" se používá, když se něco pokazilo, ale postup byl schopen dokončit. Tyhle jsou dost vzácné.
* Všechno ostatní je jen informativní zpráva. Můžete přidat \\-verbose do[GenerovatDatasetsXml](#generatedatasetsxml)nebo[DasDds](#dasdds)příkazový řádek pro získání dalších informativních zpráv, které někdy pomáhají řešit problémy.

Oba nástroje jsou velkou pomocí, ale stále musíte přečíst všechny tyto pokyny na této stránce pečlivě a dělat důležitá rozhodnutí sami.

### GenerovatDatasetsXml{#generatedatasetsxml} 
*    **GenerovatDatasetsXml** je program příkazového řádku, který může generovat hrubý návrh datového souboru XML pro téměř jakýkoli typ datového souboru.
    
We STRONGLY RECOMMEND that you use GenerateDatasets Xml místo vytváření částídatasets.xmlručně, protože:
    
    * Generovat soubory dat Xml funguje za sekundu. Dělat to ručně je nejméně hodinová práce, i když víte, co děláte.
    * Generovat soubory dat Xml dělá lepší práci. Dělat to ručně vyžaduje rozsáhlé znalosti o tom, jakERDDAP™Funguje to. Je nepravděpodobné, že budete dělat lepší práci ručně. (Bob Simons vždy používá GenerátorDatasets Xml pro první návrh, a napsalERDDAP.) 
    * Generovat soubory dat Xml vždy generuje platný kusdatasets.xml. Jakýkoliv kusdatasets.xmlže budete psát bude pravděpodobně mít alespoň několik chyb, které bráníERDDAP™od načtení souboru údajů. Často lidem trvá hodiny, než tyto problémy diagnostikují. Neztrácej čas. Nechte generovat Datové soubory Xml dělat tvrdou práci. Pak můžete vylepšit .xml rukou, pokud chcete.
    
Když používáte GeneranteDatasets Xml program:
    
    * Na Windows, když poprvé spustíte GenerateDatasetsXml, musíte upravit soubor GenerateDatasetsXml.bat s textovým editorem pro změnu cesty k javě. exe soubor tak, aby Windows mohli najítJava.
    * Generovat soubory dat Xml Vás nejprve požádá, abyste zadali EDDType (Erd Dap Dataset Typ) souboru údajů. Viz[Seznam typů datových souborů](#list-of-types-datasets)  (v tomto dokumentu) zjistit, který typ je vhodný pro datový soubor, na kterém pracujete. Kromě pravidelných EDDTypes, existuje také několik[Speciální/Pseudo Typy datové sady](#specialpseudo-dataset-types)  (např. ten, který se plazí po katalogu THREDDS k vytvoření kusudatasets.xmlpro každý soubor údajů v katalogu) .
    * Generovat soubory dat Xml se vás pak zeptá na řadu otázek specifických pro tento EDDType. Otázky shromažďují informace potřebné proERDDAP™přístup ke zdroji datového souboru. Abych pochopil coERDDAP™žádá, viz dokumentaci pro EDDType, kterou jste zadali kliknutím na stejný typ datového souboru v[Seznam typů datových souborů](#list-of-types-datasets).
        
Pokud potřebujete zadat řetězec se speciálními znaky (Znaky Whitespace na začátku nebo konci, jiné než ASCII) , zadejte[String ve stylu JSON](https://www.json.org/json-en.html)  (se speciálními znaky utekl s \\ znaky) . Například zadat pouze znak karty, zadejte "\\t" (s okolními dvojitými citacemi, které říkajíERDDAP™že tohle je řetězec ve stylu JSON.
        
    * Často, jedna z vašich odpovědí nebude to, co GenerateDatasetsXml potřebuje. Pak můžete zkusit znovu, s revidovanými odpověďmi na otázky, až do GenerateDatasets Xml může úspěšně najít a pochopit zdrojová data.
    * Pokud správně odpovíte na otázky (nebo dostatečně správně) , GenerátorDatasets Xml se připojí ke zdroji datového souboru a shromáždí základní informace (například názvy proměnných a metadata) .
Pro soubory, které jsou z místníchNetCDF .nca související soubory, GeneratorDatasets Xml bude často tisknout ncdump-jako strukturu souboru po prvním čtení souboru. To vám může poskytnout informace k odpovědi na otázky lépe na následné smyčce přes GenerateDatasetsXml.
    * Generovat soubory dat Xml pak vytvoří hrubý návrh datového XML pro tento datový soubor.
    * Diagnostické informace a hrubý návrh datového souboru XML budou zapsány do *velkýRodič rodičů* /logs/GenerateDatasetsXml.log .
    * Hrubý návrh souboru XML bude zapsán do *velkýRodič rodičů* /logs/GenerateDatasetsXml.out .
#### "0 souborů" Chyba zprávy{#0-files-error-message} 
Pokud spustíte GenerateDatasets Xml nebo[DasDds](#dasdds), nebo pokud se pokusíte načístEDDGridZ...Files nebo EDDTableFrom... Soubory souborů vERDDAP™, a dostanete chybovou zprávu "0 souborů" ukazující, žeERDDAP™nalezeno 0 odpovídajících souborů v adresáři (když si myslíte, že jsou odpovídající soubory v tomto adresáři) :
* Zkontrolujte, zda jste zadali celé jméno adresáře. A pokud jste zadali název souboru vzorku, ujistěte se, že jste zadali celé jméno souboru, včetně celého názvu adresáře.
* Zkontrolujte, zda jsou soubory skutečně v adresáři.
* Zkontrolujte pravopis názvu adresáře.
* Zkontrolujte souborNameRegex. Je opravdu snadné dělat chyby s regexy. Pro testovací účely zkuste regex .\\*, který by měl odpovídat všem názvům souborů. (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Zkontrolujte, zda uživatel, který program provozuje (např. user=tomcat (?) pro přípravek Tomcat/ERDDAP) má "číst" povolení pro tyto soubory.
* V některých operačních systémech (např. SELinux) a v závislosti na nastavení systému musí mít uživatel, který program spustil, oprávnění číst celý řetězec adresářů vedoucích do adresáře, který má soubory.


* Pokud máte problémy, které nemůžete vyřešit,[požádat o podporu](/docs/intro#support)s co největším množstvím informací. Podobně, pokud se zdá, že vhodný EDDType pro daný datový soubor nefunguje s tímto datovým souborem, nebo pokud neexistuje vhodný EDDType, prosím, soubor[vydání na GitHubu](https://github.com/ERDDAP/erddap/issues)s údaji (a případně soubor vzorku) .
         
#### Musíte editovat výstup z GenerateDatasets Xml, aby to bylo lepší.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
SCHUNG OFdatasets.xmlVYROBIT GenerovatDatasady Xml není perfektní. Musíte číst a editovat XML, než jej použijete u veřejnostiERDDAP. Generovat soubory dat Xml odpouští spoustě pravidel, která nejsou vždy správná. Jste zodpovědní za zajištění správnosti XML, ke kterému se připojíteERDDAP'Sdatasets.xmlFile.
    
     (Nekřičím. Z historických právních důvodů musí být zřeknutí se odpovědnosti zapsáno ve všech hlavičkách.) 
    
Výstup GenerateDatasetsXml je hrubý návrh.
Budete ho téměř vždy muset upravit.
Vyvinuli jsme a i nadále vyvíjíme obrovské úsilí, abychom co nejpřipravenější výstup učinili, ale existují hranice. Ze zdrojových metadat nejsou často dostupné potřebné informace.
    
Základním problémem je, že žádáme počítačový program. (GenerovatDatasetsXml) dělat úkol, kde, pokud jste dali stejný úkol pro 100 lidí, dostanete 100 různých výsledků. Neexistuje jediná správná odpověď. Je zřejmé, že program je nejblíže čtení Bobovy mysli (Ne tvoje.) , ale i tak, to není vše-pochopení AI program, jen banda heuristiky dláždil dohromady dělat Al-jako úkol. (Ten den, kdy se všechno pochopí, může přijít, ale ještě nepřišel. Pokud ano, my lidé můžeme mít větší problémy. Opatrně, co si přeješ.) 
    
* Pro informační účely ukazuje výstup globální zdrojAttributy a variabilní zdrojAttributy jako komentáře.ERDDAP™kombinuje zdrojAttributy aaddAttributes  (které mají přednost) k výrobě kombinované Atributy, které jsou zobrazeny uživateli. (A další atributy jsou automaticky přidávány do délky, zeměpisné šířky, výšky, hloubky a časových proměnných, kdyžERDDAP™vlastně vytváří soubor dat) .
     
* Pokud nemáte rádi zdrojAttribute, přepište jej přidáním addAttribute se stejným názvem, ale jinou hodnotou (nebo bez hodnoty, pokud ji chcete odstranit) .
     
* VšechnyaddAttributesjsou počítačové návrhy. Upravte je&#33; Pokud nemáte rádi addAttribute, změňte to.
     
* Pokud chcete přidat dalšíaddAttributes, přidejte je.
     
* Pokud chcete změnitdestinationNameZměň to. Ale neměň se.sourceNames.
     
* Můžete změnit pořadídataVariables nebo odstranit některý z nich.


    * Pak můžete použít[DasDds](#dasdds)  (viz níže) opakovaně testovat XML pro tento datový soubor, aby bylo zajištěno, že výsledný datový soubor se objeví, jak chcete, aby vERDDAP.
    * Neváhejte udělat malé změny nadatasets.xmlnapříklad vygenerovaný kus dodává lepšíinfoUrl, shrnutí nebo název.
#### DoNOTAddStandardNames{#donotaddstandardnames} 
Pokud přidáte \\-donotAddStandardNames jako parametr příkazového řádku při spuštění generování Datové soubory Xml, generovat Datové soubory Xml nepřidástandard\\_namedoaddAttributespro proměnné jiné než proměnné s názvem zeměpisná šířka, zeměpisná délka, výška, hloubka nebo čas (které mají očividnéstandard\\_nameán) . To může být užitečné, pokud používáte výstup z generování Datové soubory Xml přímo vERDDAP™bez úpravy výstupu, protože generovat Datové soubory Xml často hádástandard\\_namešpatně. (Všimněte si, že vždy doporučujeme upravit výstup před použitím vERDDAP.) Použití tohoto parametru bude mít jiné menší související účinky, protože hádanéstandard\\_namese často používá k jiným účelům, např. k vytvoření novéholong\\_name, a vytvořit nastavení barevBar.
#### Skriptování{#scripting} 
Jako alternativu k interaktivnímu zodpovězení otázek na klávesnici a smyčce pro generování dalších souborů dat můžete poskytnout argumenty příkazových řádků, abyste mohli zodpovědět všechny otázky pro vytvoření jednoho datového souboru. Generovat soubory dat Xml tyto parametry zpracuje, napíše výstup do výstupního souboru a program ukončí.
        
Chcete-li to nastavit, nejprve použijte program v interaktivním režimu a zapište své odpovědi. Zde je částečný příklad:
Řekněme, že spustíte skript: ./GenerateDatasetsXml.sh
Pak zadejte: EDDTableFromAsciiFiles
Pak zadejte: /u00/data/
Pak zadejte: .\\ *\\.ask
Pak zadejte: /u00/data/sampleFile.asc
Poté zadejte: ISO-8859-1
        
Pro neinteraktivní spuštění použijte tento příkaz:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Takže v podstatě vypíšete všechny odpovědi na příkazový řádek.
To by mělo být užitečné pro soubory dat, které se často mění způsobem, který vyžaduje opětovné spuštění GenerateDatasets Xml (zejménaEDDGridFromThreddsCatalog) .
        
Podrobnosti:

* Pokud parametr obsahuje prostor nebo nějaký zvláštní znak, pak enkódovat parametr jako[String ve stylu JSON](https://www.json.org/json-en.html), např. "můj parametr s mezerami a dvěma\\nřádky."
* Pokud chcete zadat prázdný řetězec jako parametr, použijte:
* Pokud chcete zadat výchozí hodnotu parametru, použijte: výchozí
             
* Generovat soubory dat Xml podporuje a -i *Soubory údajů XmlName* # *Název značky* parametr příkazového řádku, který vkládá výstup do zadanéhodatasets.xmlsoubor (výchozí je *tomcat* / content/ erddap/datasets.xml) . Generovat soubory dat Xml hledá dva řádky v souborech dat XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
a
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
a nahradí vše mezi těmito řádky novým obsahem, a změní některéDatetime.
* Přepínač -i je pouze zpracován (a změnydatasets.xmljsou pouze vyrobeny) Pokud spustíte GenerateDatasets Xml s argumenty příkazového řádku, které specifikují všechny odpovědi na všechny otázky pro jednu smyčku programu. (Viz výše "Scripting.")   (Myšlenka je: Tento parametr je určen pro použití se skripty. Pokud program používáte v interaktivním režimu (psaní informací na klávesnici) , jste pravděpodobně generovat některé nesprávné kousky XML před tím, než si vytvořit ten, který chcete.) 
* Pokud nejsou nalezeny Begin a End řádky, pak jsou tyto řádky a nový obsah vloženy těsně před&lt;/erddapDatasets&gt;.
* Existuje také - I (kapitál i) přepínač pro testovací účely, který funguje stejně jako -i, ale vytváří soubor nazvanýdatasets.xml *Datum* a nedělá změnydatasets.xml.
* Nezkoušejte GenerovatDatasety Xml s -i ve dvou procesech najednou. Existuje šance, že bude zachována pouze jedna sada změn. Může to být vážný problém. (například poškozené soubory) .
    
Pokud používáte "GenerateDatasetsXml -verbose," vytiskne více diagnostických zpráv než obvykle.
    
#### Speciální/Pseudo Typy datové sady{#specialpseudo-dataset-types} 
Obecně platí, že možnosti EDDType v GenerateDatasets Xml shoda typů EDD popsaných v tomto dokumentu (viz[Seznam typů datových souborů](#list-of-types-datasets)) a vygenerovat jedendatasets.xmlcuk pro vytvoření jednoho datového souboru z jednoho konkrétního zdroje dat. Existuje několik výjimek a zvláštních případů:
    
##### EDDGridFromErddap{#eddgridfromerddap} 
Tento EDDType generuje všechnydatasets.xmlkousky potřebné k výrobě[EDDGridFromErddap](#eddfromerddap)Data ze všechEDDGridData ve vzdálenémERDDAP. Budete mít možnost ponechat si origináldatasetIDán (který může kopírovat některédatasetIDjižERDDAP) nebo generování nových jmen, které budou jedinečné (ale obvykle nejsou tak čitelné jako lidé.) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Tento EDDType generuje všechnydatasets.xmlkousky potřebné k výrobě[EDDTableFromErddap](#eddfromerddap)Soubory dat ze všech datových souborů EDDTable ve vzdálenémERDDAP. Budete mít možnost ponechat si origináldatasetIDán (který může kopírovat některédatasetIDjižERDDAP) nebo generování nových jmen, které budou jedinečné (ale obvykle nejsou tak čitelné jako lidé.) .
     
##### EDDGridFromThreddsCatalog{#eddgridfromthreddscatalog} 
Tento EDDType generuje všechnydatasets.xmlkousky potřebné pro všechny[EDDGridFromDap](#eddgridfromdap)Soubory dat, které může najít tím, že se opakovaně plazí přes THREDDS (sub) Katalog. Existuje mnoho forem katalogových URL THREDDS. Tato volba REQUERES a THREDDS .xml URL s /catalog/ v ní, například,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml nebo
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(příbuzný katalog .html je na
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , které není přijatelné proEDDGridFromThreddsCatalog).
Pokud máte problémy sEDDGridFromThredds Katalog:
* Ujistěte se, že URL, kterou používáte, je platné, obsahuje /catalog/ a končí s /catalog.xml .
* Pokud je to možné, použijte veřejnou IP adresu (například: https://oceanwatch.pfeg.noaa.gov ) v URL, nikoli místní numerická IP adresa (například: https://12.34.56.78 ) . Pokud je THREDDS přístupný pouze prostřednictvím místní číselné IP adresy, můžete použít [&lt;convertToPublicSourceUrl&gt;] (# Konvertovat na veřejné zdrojeurl) takERDDAP™uživatelé vidí veřejnou adresu, i kdyžERDDAP™získává data z místní číselné adresy.
* Pokud máte problémy, které nemůžete vyřešit,[zkontrolovat tipy na odstraňování problémů](#troubleshooting-tips).
* Nízkoúrovňové kód pro tento nyní používáUnidatakatalogový kód netcdf-java (Thredds. Katalogové třídy) takže může zvládnout všechny katalogy THREDDS (což může být překvapivě složité.) DíkyUnidatana ten kód.
         
##### EDDGridLonPM180FromErddapKatalog{#eddgridlonpm180fromerddapcatalog} 
Tento EDDType generujedatasets.xmlk výrobě[EDDGridLonPM180](#eddgridlonpm180)Data ze všechEDDGriddata v souboruERDDAPjejichž délka je větší než 180.
* Pokud je to možné, použijte veřejnou IP adresu (například: https://oceanwatch.pfeg.noaa.gov ) v URL, nikoli místní numerická IP adresa (například: https://12.34.56.78 ) . PokudERDDAP™je přístupná pouze prostřednictvím místní číselné IP adresy, můžete použít [&lt;convertToPublicSourceUrl&gt;] (# Konvertovat na veřejné zdrojeurl) takERDDAP™uživatelé vidí veřejnou adresu, i kdyžERDDAP™získává data z místní číselné adresy.
         
##### EDDGridLon0360FromErddapKatalog{#eddgridlon0360fromerddapcatalog} 
Tento EDDType generujedatasets.xmlk výrobě[EDDGridLon0360](#eddgridlon0360)Data ze všechEDDGriddata v souboruERDDAPjejichž délka je menší než 0.
* Pokud je to možné, použijte veřejnou IP adresu (například: https://oceanwatch.pfeg.noaa.gov ) v URL, nikoli místní numerická IP adresa (například: https://12.34.56.78 ) . PokudERDDAP™je přístupná pouze prostřednictvím místní číselné IP adresy, můžete použít [&lt;convertToPublicSourceUrl&gt;] (# Konvertovat na veřejné zdrojeurl) takERDDAP™uživatelé vidí veřejnou adresu, i kdyžERDDAP™získává data z místní číselné adresy.
         
##### EDDsFromFoles{#eddsfromfiles} 
Vzhledem k startovnímu adresáři prochází adresář a všechny podadresáře a snaží se vytvořit soubor pro každou skupinu datových souborů, které najde.
* To předpokládá, že pokud je soubor údajů nalezen, soubor údajů zahrnuje všechny podadresáře.
* Pokud je soubor údajů nalezen, budou podobné adresáře sourozenců považovány za samostatné soubory dat (Například adresáře pro 90. léta, 2000 a 2010 budou vytvářet samostatné datové soubory) . Měli by být snadno kombinovat ručně - stačí změnit první datový soubor&lt;fileDir&gt; do mateřského adresáře a smažte všechny následující soubory sourozenců.
* Tohle se bude snažit vytvořit jen kusdatasets.xmlpro nejčastější typ přípony souboru v adresáři (nepočítám .md5, který je ignorován) . Takže, vzhledem k adresáři s 10.ncsoubory a 5 .txt soubory, soubor bude generován pro.ncPouze soubory.
* To předpokládá, že všechny soubory v adresáři se stejným rozšířením patří do stejného datového souboru. Pokud má adresář nějaké.ncsoubory s daty SST a některé.ncsoubory s údaji o chlorofylu, pouze jeden vzorek.ncsoubor bude přečten (SST? chlorofyl?) a pouze jeden soubor bude vytvořen pro tento typ souboru. Tento datový soubor se pravděpodobně nepodaří načíst kvůli komplikacím ze snaze načíst dva typy souborů do stejného souboru.
* Pokud existuje méně než 4 soubory s nejčastějším rozšířením v adresáři, to předpokládá, že nejsou datové soubory a jen přeskočí adresář.
* Pokud jsou 4 nebo více souborů v adresáři, ale to nemůže úspěšně generovat částdatasets.xmlpro soubory (například nepodporovaný typ souboru) , to bude generovat[EDDTableFromFileNames](#eddtablefromfilenames)Databáze souborů.
* Na konci diagnostiky, že to píše do logu souboru, těsně předdatasets.xmlTohle vytiskne tabulku se shrnutím informací shromážděných přes všechny podadresáře. Tabulka vyjme všechny podadresáře a uvede nejčastější typ přípony souboru, celkový počet souborů a jaký typ souboru byl vytvořen pro tyto soubory (pokud existuje) . Pokud čelíte složité, hluboce vnořené struktuře souborů, zvažte spuštění GenerateDatasets Xml s EDDType=EDDsFromFromFoles jen pro generování těchto informací,
* Tato volba nemusí dělat velkou práci odhadovat nejlepší EDDType pro danou skupinu datových souborů, ale je to rychlé, snadné a stojí za pokus. Pokud jsou zdrojové soubory vhodné, funguje dobře a je dobrým prvním krokem při generovánídatasets.xmlpro souborový systém se spoustou podadresářů, každý s datovými soubory z různých souborů dat.
         
##### EDDTableFromEML a EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Tyto speciální EDDType generujedatasets.xmlk vytvoření[EDDTableFromAsciiFiles](#eddtablefromasciifiles)soubor údajů z každé tabulky popsané v[Jazyk ekologických metadat](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML soubor. Varianta "Batch" funguje na všech EML souborech v lokálním nebo vzdáleném adresáři. Prosím, podívejte se na oddělení[dokumentace pro EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTableFromInPort{#eddtablefrominport} 
Tento speciální EDDType generujedatasets.xmlk vytvoření[EDDTableFromAsciiFiles](#eddtablefromasciifiles)Soubor údajů z informací v[inport- xml](https://inport.nmfs.noaa.gov/inport)Složka. Pokud můžete získat přístup ke zdrojovému datovému souboru (inport-xml soubor by měl mít vodítka, kde ho najít) , můžete vytvořit pracovní soubor vERDDAP.

Následující kroky nastíní, jak používat GenerateDatasets Xml s inport-xml souborem, aby se pracovní data vERDDAP.

1. Jakmile máte přístup k inport-xml souboru (buď jako URL nebo lokální soubor) : spustit generováníDatasets Xml, zadejte EDDType=EDDTableFromInPort, zadejte inport-xml URL nebo celé jméno souboru, zadejte, kteréChild=0, a zadejte další požadované informace (pokud je známo) . (V tuto chvíli nemusíte mít zdrojový datový soubor nebo zadat jeho jméno.) Nastavení Child=0 říká GenerateDatasets Xml napsat informace pro **všechny** z&lt;Informace o subjektu a atributu &gt;&lt;Účetní jednotka &gt; je v inport-xml souboru (pokud existují) . Vytiskne také shrnutí informací o pozadí, včetně všech download-url uvedených v inport-xml souboru.
2. Podívej se na všechny ty informace. (včetně informací o pozadí, které generujíNastavení dat Xml otisky) a navštívit download-url (án) pro pokus o nalezení zdrojového datového souboru (án) . Jestli ho najdeš (Oni) , stáhnout (Oni) do adresáře, který je přístupnýERDDAP. (Pokud nemůžete najít žádné zdrojové datové soubory, není důvod pokračovat.) 
3. Spustit generování Datové soubory Zase Xml.
Pokud zdrojový datový soubor odpovídá jednomu ze souborů inport-xml&lt;Informace o subjektu a atributu &gt;&lt;Účetní jednotka &gt;, uveďte, které Child= *které číslo Entity*   (např. 1, 2, 3, ...) .ERDDAP™pokusí se spojit názvy sloupců v souboru zdrojových dat s názvy v informacích o subjektu a vyzve k přijetí/odmítnutí/opravení jakýchkoli nesrovnalostí.
Nebo, pokud inport-xml soubor nemá žádné&lt;Informace o subjektu a atributu &gt;&lt;Upřesněte, které dítě =0.
4. V částidatasets.xmlkterá byla vyrobena pomocí GenerateDatasets Xml, revidovat [globální&lt;addAttributes&gt;] (#Global-atributes) dle potřeby/žádoucí.
5. V částidatasets.xmlkterý byl vyroben GenerateDatasetsXml, přidat / obnovit [&lt;dataVariable&gt;] (# Dataproměnná) informace potřebné k popisu každé proměnné. Ujistěte se, že správně identifikujete každou proměnnou
[&lt;sourceName&gt;] (#zdrojové jméno)   (jak to vypadá ve zdroji) ,
[&lt;destinationName&gt;] (Název místa určení)   (který má více omezení povolených znaků nežsourceName) ,
[&lt;jednotky &gt;] (#jednotky)   (zvláště pokud je[proměnné času nebo času](#timestamp-variables)kde jednotky musí stanovit formát) a
[&lt;missing\\_value&gt;] (#missing_value) ,
6. Když jste blízko dokončení, opakovaně používat[DasDds](#dasdds)nástroj, který rychle zjistí, zda je popis datového souboru platný a zda se soubor údajů objeví vERDDAP™jak si přeješ.
     

Bylo by skvělé, kdyby skupiny používající InPort dokumentovaly své soubory dat.ERDDAP™zpřístupnit skutečné údaje:

*   ERDDAP™je řešení, které lze použít právě teď, takže můžete splnitNOAA's[Přístup veřejnosti k výsledkům výzkumu (PARR) požadavky](https://nosc.noaa.gov/EDMC/PD.DSP.php)Právě teď, ne v nějakém neurčitém čase v budoucnosti.
*   ERDDAP™zpřístupní aktuální údaje uživatelům, nejen metadatům. (K čemu jsou metadata bez dat?) 
*   ERDDAP™podporuje metadata (zejména jednotky proměnných) , na rozdíl od některých jiných softwaru datového serveru je zvažován. (K čemu jsou data bez metadat?) Používat software, který nepodporuje metadata, je zvát data k nepochopení a zneužití.
*   ERDDAP™je svobodný a open-source software, na rozdíl od některých jiných software je zvažován. Probíhající vývojERDDAP™je již zaplaceno. PodporaERDDAP™uživatelé jsou zdarma.
*   ERDDAP's vzhled lze snadno přizpůsobit, aby odrážel a zvýraznit vaši skupinu (neERDneboERDDAP) .
*   ERDDAP™nabízí konzistentní způsob přístupu ke všem datům.
*   ERDDAP™lze číst data z mnoha typů datových souborů a z relačních databází.
*   ERDDAP™může řešit velké soubory údajů, včetně souborů údajů, kde jsou zdrojová data v mnoha datových souborech.
*   ERDDAP™mohou psát data do mnoha typů datových souborů, na žádost uživatele, včetně vědeckých datových souborů typů, jako je netCDF, ESRI .csv, aODV .txt.
*   ERDDAP™může vytvořit vlastní grafy a mapy podmnožin dat, na základě specifikace uživatele.
*   ERDDAP™mohou řešit nedatové soubory, jako jsou sbírky obrazů, video nebo audio souborů.
*   ERDDAP™byla instalována a použita při[více než 60 institucí po celém světě](/#who-uses-erddap).
*   ERDDAP™je uveden jako jeden z datových serverů doporučených pro použití v rámciNOAAv[NOAAProcesní směrnice pro přístup k údajům](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), na rozdíl od některých jiných software je zvažován.
*   ERDDAP™je produktemNMFS/NOAA, takže použití uvnitřNMFSaNOAAby měla být pýchou proNMFSaNOAA.

Prosím, dej mi to.ERDDAP™Zkus to. Pokud potřebujete pomoc, vyšlete prosím zprávu doERDDAP™Skupina Google.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Tato speciální volba EDDType není typ souboru dat. Jedná se o nástroj, který může přidat atributy \\_FillValue do některých proměnných v některých souborech dat. Viz[addFillValueAttributes](#add-_fillvalue-attributes).
     
##### najítDuplicate Čas{#findduplicatetime} 
Tato speciální volba EDDType není typ souboru dat. Místo toho to říká GenerateDatasets Xml prohledat sbírku mřížkovaných.nc  (a související) soubory k nalezení a vytištění seznamu souborů s duplikovanými hodnotami času. Když se podívá na časové hodnoty, převede je z původních jednotek na"seconds since 1970-01-01"v případě, že různé soubory používají různé jednotky řetězce. Musíte poskytnout výchozí adresář (též se stopovacím lomítkem) , název souboru regulární výraz (např. .\\*\\.nc ) , a název časové proměnné v souborech.
     
##### ncdump{#ncdump} 
Tato speciální volba EDDType není typ souboru dat. Místo toho to říká GenerateDatasets Xml tisknout[ncdump](https://linux.die.net/man/1/ncdump)\\-jako výtisk.nc,.ncml nebo.hdfSložka. Ve skutečnosti používá netcdf-java[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), což je omezenější nástroj než C verze NCdump. Pokud použijete tuto volbu, GenerateDatasetsXml vás požádá, abyste využili jednu z možností: "-h" (hlavička) , "-c" (souřadnice varů) , "-vall" (výchozí) , "-v var1;var2," "-v var1 (0,0:10,0:20) ". To je užitečné, protože bez ncdump je těžké vědět, co je v.nc,.ncml nebo.hdfsoubor a tím, který EDDType byste měli zadat pro GenerateDatasets Xml. Pro.ncml soubor, bude tisknout výstup ncdump pro výsledek.ncZměny souborů v ml použité na podklad.ncnebo.hdfSložka.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)je program příkazového řádku, který můžete použít poté, co jste vytvořili první pokus na XML pro nový datový soubor vdatasets.xml. S DasDds můžete opakovaně testovat a vylepšovat XML. Když používáte program DasDds:
    1. Na Windows, když poprvé spustíte DasDds, musíte upravit DasDds. bat soubor s textovým editorem změnit cestu k javě. exe soubor tak, aby Windows mohli najítJava.
    2. DasDds vás žádá odatasetIDpro datový soubor, na kterém pracujete.
    3. DasDds se snaží vytvořit datový soubor s tímtodatasetID.
        * DasDds vždy tiskne spoustu diagnostických zpráv.
Pokud použijete "DasDds -verbose," DasDds vytiskne více diagnostických zpráv než obvykle.
        * Pro bezpečnost, DasDds vždy odstraní všechny cached data data data (soubory) pro datový soubor před pokusem o vytvoření datového souboru. Toto je ekvivalent nastavení[Tvrdá vlajka](/docs/server-admin/additional-information#hard-flag)Takže pro souhrnné soubory, možná budete chtít upravit souborNameRegex dočasně omezit počet souborů, které konstruktér najde.
        * Pokud datový soubor nenačte (z jakéhokoli důvodu) , DasDds se zastaví a ukáže vám chybovou zprávu pro první chybu, kterou najde.
             **Nesnažte se uhodnout, v čem by mohl být problém. Přečtěte si zprávu ERROR pozorně.**   
Pokud je to nutné, přečtěte si předchozí diagnostické zprávy a najděte další vodítka a informace.
        *    **Proveďte změnu XML souboru, abyste se pokusili vyřešit tento problém**   
a nechat DasDds se pokusit vytvořit soubor znovu.
        *    **Pokud budete opakovaně řešit každý problém, nakonec vyřešíte všechny problémy**   
a data se nabijí.
    4. Všechny DasDds výstup (diagnostika a výsledky) jsou zapsány na obrazovce a na *velkýRodič rodičů* /logs/DasDds.log .
    5. Pokud DasDds mohou vytvořit soubor dat, DasDds vám pak ukáže[.das (Struktura datového souboru) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Dataset Descriptor Struktura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)a[.timeGaps (časové mezery) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informace pro datový soubor na vaší obrazovce a zapsat na *velkýRodič rodičů* /logs/DasDds.out .
    6. Často budete chtít provést nějakou malou změnu XML datového souboru, aby se vyčistila metadata datového souboru a znovu spustila DasDds.

### Bonus Nástroj třetí strany:ERDDAP- Lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-Lint je program od Roba Fullera a Adama Leadbettera z Irish Marine Institute, který můžete použít ke zlepšení metadat vašehoERDDAP™Data.ERDDAP-lint "obsahuje pravidla a jednoduchou statické webové aplikace pro provádění některých ověřovacích testů proti vašemuERDDAP™server. Všechny testy jsou spuštěny ve webovém prohlížeči." Jako[Nástroj Unix/Linux lint](https://en.wikipedia.org/wiki/Lint_(software)), můžete upravit stávající pravidla nebo přidat nová pravidla. Viz[ERDDAP- Lint](https://github.com/IrishMarineInstitute/erddap-lint)pro více informací.

Tento nástroj je zvláště užitečný pro soubory dat, které jste vytvořili před nějakou dobou a nyní chcete aktualizovat s vašimi aktuálními preferencemi metadat. Například rané verze GenerateDatasets Xml se nesnažil vytvořit globálnícreator\\_name,creator\\_email, creator\\_type nebocreator\\_urlmetadata. Hodilo by se ti.ERDDAP-lt identifikovat soubory, které nemají atributy metadat.

Díky Rob a Adam za vytvoření tohoto nástroje a zpřístupněníERDDAP™komunita.
 
## Základní strukturadatasets.xmlSoubor{#the-basic-structure-of-the-datasetsxml-file} 
Požadované a volitelné značky povolené vdatasets.xmlsoubor (a počet případů, kdy se mohou objevit) jsou uvedeny níže. V praxi, vašedatasets.xmlbude mít hodně&lt;Štítky datového souboru&gt; a používat pouze ostatní značky uvnitř&lt;erddapDatasets&gt; podle potřeby.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Je možné, že v budoucnu budou povolena jiná kódování, ale prozatím se doporučuje pouze ISO-8859-1.
 
### XInclude{#xinclude} 
Novinka ve verzi 2.25 je podpora pro XInclude. To vyžaduje použití parseru SAX&lt;UseSaxParser &gt; true&lt;/useSaxParser &gt; ve vašem nastavení.xml. To vám umožní zapsat každý soubor do vlastního souboru a pak je všechny zahrnout do hlavního souborudatasets.xml, opakované části definic datového souboru nebo obojí. Pokud chcete vidět příklad,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)stanoví XInclude pro opětovné použití proměnných definic.
 

- - -

## Poznámky{#notes} 

Práce sdatasets.xmlSoubor je netriviální projekt. Přečtěte si prosím pozorně všechny tyto poznámky. Až si vybereš[Typ souboru](#list-of-types-datasets), pečlivě si přečtěte podrobný popis.
     
### Výběr typu datové sady{#choosing-the-dataset-type} 
Ve většině případů je jen jedenERDDAP™Typ datového souboru, který je vhodný pro daný zdroj dat. V několika případech (např..ncsoubory) , Existuje několik možností, ale obvykle jedna z nich je určitě nejlepší. První a největší rozhodnutí, které musíte udělat, je: je vhodné považovat soubor dat za skupinu multidimenzionálních polí (Pokud ano, uvidíte[EDDGridTypy souborů údajů](#eddgrid)) nebo jako databázová tabulka údajů (Pokud ano, uvidíte[Typy datového souboru EDDTable](#eddtable)) .
     
### Sloužit údaje, jak je{#serving-the-data-as-is} 
Obvykle není třeba měnit zdroj dat (např. převést soubory na jiný typ souboru) takžeERDDAP™může sloužit. Jeden z předpokladůERDDAP™je, že zdroj dat bude použit tak, jak je. Obvykle to funguje dobře. Některé výjimky jsou:
* Související databáze a Cassandra --ERDDAP™mohou sloužit data přímo z relačních databází a Cassandra. Ale pro bezpečnost, vyvážení zatížení a problémy s výkonem se můžete rozhodnout vytvořit jinou databázi se stejnými údaji nebo uložit data doNetCDFv3.ncSoubory a mítERDDAP™slouží data z nového zdroje dat. Viz[EDDtableFromDatabase](#eddtablefromdatabase)a[EDDTableFromCassandra](#eddtablefromcassandra).
* Nepodporované zdroje dat --ERDDAP™může podporovat velký počet typů datových zdrojů, ale svět je naplněn 1000's (Milióny?) různých zdrojů údajů (zejména struktury datových souborů) . PokudERDDAP™nepodporuje váš zdroj dat:
    * Pokud je zdroj datNetCDF .ncsoubory, můžete použít[NcML](#ncml-files)upravit soubory údajů při letu nebo použít[NCO](#netcdf-operators-nco)trvale upravovat datové soubory.
    * Data můžete zapisovat do datového zdroje, kterýERDDAP™Podpora.NetCDF- 3.ncsoubory jsou dobré, obecné doporučení, protože jsou binární soubory, kteréERDDAP™umí číst velmi rychle. Pokud jde o tabulková data, zvažte uložení údajů do souboru.ncSoubory, které používají[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array datové struktury a tak lze zacházet sERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)). Pokud jsou logicky organizovaní (každý s údaji pro kus prostoru a času) ,ERDDAP™může z nich velmi rychle extrahovat data.
    * Můžete požádat, aby podpora pro tento zdroj dat byla přidána doERDDAP™e-mailem Chrisovi. John v Noaa.gov.
    * Můžete přidat podporu pro tento zdroj dat tím, že zapíšete kód, aby se o něj postaral sám. Viz[váERDDAP™Průvodce programátorem](/docs/contributing/programmer-guide)
* Rychlost...ERDDAP™může číst data z některých zdrojů dat mnohem rychleji než ostatní. Například čteníNetCDFv3.ncSoubory jsou rychlé a čtení ASCII souborů je pomalejší. A pokud je velký (&gt; 1000) nebo obrovský (&gt; 10 000) počet zdrojových datových souborů,ERDDAP™bude reagovat na některé požadavky na údaje pomalu. Obvykle není rozdíl pro lidi patrný. Nicméně, pokud si myslíte,ERDDAP™je pomalý pro daný datový soubor, můžete se rozhodnout vyřešit problém zápisem dat do efektivnější nastavení (obvykle: několik, dobře strukturovaných,NetCDFv3.ncsoubory) . Pro tabulková data viz[Tato rada](#millions-of-files).
         
### Nápověda{#hint} 
Často je snazší vytvořit XML pro datový soubor tak, že vytvoří kopii pracovního popisu datového souboru v datovém souboru.xml a poté jej upraví.
    
### Kódování zvláštních znaků{#encoding-special-characters} 
Oddatasets.xmlje XML soubor, musíte[& Kód](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&,"&lt;"a "&gt;" v jakémkoli obsahu jako "&amp;," "&lt;"a "&gt;."
Špatně:&lt;Název &gt; Čas a osy&lt;/title &gt;
Správně:&lt;Název &gt; Čas a tides&lt;/title &gt;
     
### XML netoleruje chyby syntaxe{#xml-doesnt-tolerate-syntax-errors} 
Poté, co editujete soubor datate.xml, je dobrý nápad ověřit, že výsledek je[dobře tvarované XML](https://www.w3schools.com/xml/xml_dtd.asp)vložením XML textu do XML checkeru jako[xmlvalidace](https://www.xmlvalidation.com/).
     
### Tipy proti potížím{#troubleshooting-tips} 
*    **Jiné způsoby, jak diagnostikovat problémy s daty**   
Kromě dvou hlavních[Nástroje](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)je log soubor se všemiERDDAPDiagnostické zprávy.
    * The[Denní zpráva](/docs/server-admin/additional-information#daily-report)má více informací než stránka stavu, včetně seznamu souborů údajů, které nebyly načteny, a výjimky (chyby) vygenerovali.
    * The[Stavová stránka](/docs/server-admin/additional-information#status-page)je rychlý způsob, jak zkontrolovatERDDAP's statusem každého webového prohlížeče. Obsahuje seznam souborů, které nebyly načteny (i když ne související výjimky) a za úkolŠíření statistik (ukazující pokrok[EDDGridKopírovat](#eddgridcopy)a[EDDtableCopy](#eddtablecopy)Soubory údajů a všechny[EDDGridFromFiles](#eddgridfromfiles)nebo[EDDTableFromFoles](#eddtablefromfiles)Soubory údajů, které používají[cacheFromUrl](#cachefromurl)  (ale ne cache VelikostGB) ) .
    * Když se zasekneš, uvidíš naše[oddíl o získání dodatečné podpory](/docs/intro#support).
         
### Zvláštní proměnné{#special-variables} 
*    **[Zeměpisná délka, zeměpisná šířka, výška (nebo hloubka) , a čas (LLAT) proměnná](#destinationname) [destinationName](#destinationname)Jsou zvláštní.** 
    * Obecně:
        * LLAT proměnné jsou uvedeny naERDDAP™pokud proměnná osy je (místoEDDGridSoubory údajů) nebo datové proměnné (pro soubory EDDTable)  [destinationName](#destinationname)je "délka," "zeměpisná šířka," "nadmořská výška," "hloubka," nebo"time".
        * Důrazně vás vybízíme, abyste pro tyto proměnné používali tyto standardní názvy, kdykoli je to možné. Žádný z nich není nutný. Pokud nepoužijete tyto speciální názvy proměnných,ERDDAP™nepozná jejich význam. Například proměnné LLAT jsou zpracovávány speciálně pomocí Make A Graph ( *datasetID* .graph) : Pokud je proměnná X Axis "délka" a proměnná Y Axis je "zeměpisná šířka," dostanete mapu (pomocí standardní projekce a s pozemní maskou, politickými hranicemi atd.) místo grafu.
        *   ERDDAP™automaticky přidá spoustu metadat k LLAT proměnných (Například, "[ioos\\_category](#ioos_category)","[jednotky](#units)"a několik atributů souvisejících s normami, jako je "\\_CoordinaceAxisType") .
        *   ERDDAP™automaticky, on-the-fly, přidá spoustu globálních metadat souvisejících s hodnotami LLAT vybrané podmnožiny dat (například "geospatial\\_lon\\_min") .
        * Klienti, kteří podporují tyto standardy metadat, budou moci využít přidané metadata k umístění dat v čase a prostoru.
        * Pro klienty bude snazší vytvářet dotazy, které zahrnují proměnné LLAT, protože názvy proměnné jsou ve všech příslušných souborech stejné.
    * Pro proměnnou "délka" a proměnnou "zeměpisná šířka":
        * Použijte[destinationName](#destinationname)s "délka" a "zeměpisná šířka" pouze pokud[jednotky](#units)jsou stupně\\_východ a stupně\\_north, resp. Pokud vaše údaje neodpovídají těmto požadavkům, použijte různé názvy proměnných (například x, y, lonRadians, latRadians) .
        * Pokud máte údaje o délce a zeměpisné šířce vyjádřené v různých jednotkách, a tedy s různýmidestinationNames, například, lonRadians a latRadians, Make A Graph ( *datasetID* .graph) vytvoří grafy (například časové řady) místo map.
    * U proměnné "nadmořská výška" a proměnné "hloubka":
        * Použijte[destinationName](#destinationname)"nadmořská výška" pro identifikaci vzdálenosti dat nad hladinou moře (pozitivní hodnoty="up") . Volitelně můžete použít "nadmořskou výšku" pro vzdálenosti pod hladinou moře, pokud jsou hodnoty pod mořem záporné (nebo pokud například použijete,
[&lt;att name="scale\\_factor"type="int" - 1&lt;/att&gt;] (#scale_factor) převést hodnoty hloubky na hodnoty nadmořské výšky.
        * PoužijtedestinationName"hloubka" pro identifikaci vzdálenosti dat pod hladinou moře (pozitivní hodnoty="down") .
        * Databáze nemusí mít "nadmořskou výšku" ani "hloubkové" proměnné.
        * Pro tyto názvy proměnných[jednotky](#units)musí být "m," "meter" nebo "metry." Pokud se jednotky liší (například sáhy) , můžete použít
[&lt;att name="scale\\_factor"&gt; *některé Hodnota* &lt;/att&gt;] (#scale_factor) a [&lt;att name="jednotky"&lt;/att&gt;] (#jednotky) převést jednotky na metry.
        * Pokud vaše údaje neodpovídají těmto požadavkům, použijte jinýdestinationName  (například nadGround, vzdálenost ToBottom) .
        * Pokud znáte vertikální CRS, zadejte jej v metadatech, např. "EPSG:5829" (okamžitá výška nad hladinou moře) , "EPSG:5831" (okamžitá hloubka pod hladinou moře) , nebo "EPSG:5703" (NAVD88 výška) .
    * Pro"time"proměnná:
        * Použijte[destinationName](#destinationname) "time"pouze pro proměnné, které zahrnují celé datum+čas (nebo datum, pokud je to vše, co existuje) . Pokud například existují samostatné sloupce pro datum a časOfDay, nepoužívejte název proměnné"time".
        * Viz[jednotky](#time-units)pro více informací o atributu jednotek pro proměnné času a časuStamp.
        * Časová proměnná a související[čas Proměnné známky](#timestamp-variables)jsou jedinečné v tom, že vždy převést hodnoty dat z časového formátu zdroje (Ať je to cokoliv.) do číselné hodnoty (sekundy od 1970-01-01T00:00:00Z) nebo hodnota řetězce (ISO 8601:2004 (E) formát) V závislosti na situaci.
        * Pokud uživatel požaduje údaje o čase, může o ně požádat zadáním času jako číselné hodnoty (sekundy od 1970-01-01T00:00:00Z) nebo hodnota řetězce (ISO 8601:2004 (E) formát) .
        *   ERDDAP™má nástroj pro[Převést numerické Čas do/z doby řetězce](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Viz[JakERDDAPObchoduje s časem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Proč jen dvě základní datové struktury?{#why-just-two-basic-data-structures} 
* Vzhledem k tomu, že je obtížné pro lidské klienty a počítačové klienty řešit komplexní soubor možných datových struktur,ERDDAP™používá pouze dvě základní datové struktury:
    * a[struktura roštových dat](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (například pro satelitní data a modelová data) a
    * a[struktura tabulkových dat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (například pro in-situ bóje, stanice a data trajektorie) .
* Určitě ne všechny údaje mohou být vyjádřeny v těchto strukturách, ale většina z nich může. Zejména tabulky jsou velmi flexibilní datové struktury (Podívejte se na úspěch relačních databázových programů) .
* Tím se datové dotazy snadněji konstruují.
* Díky tomu mají datové odpovědi jednoduchou strukturu, díky které je jednodušší data sloužit v širší škále standardních typů souborů. (které často jen podporují jednoduché datové struktury) . To je hlavní důvod, proč jsme to naplánovali.ERDDAP™Tudy.
* Tohle nám to velmi usnadňuje. (nebo kdokoliv) psát klientský software, který pracuje se všemiERDDAP™Data.
* To usnadňuje srovnání dat z různých zdrojů.
* Jsme si velmi vědomi toho, že pokud jste zvyklí pracovat s daty v jiných datových strukturách, můžete si zpočátku myslet, že tento přístup je zjednodušující nebo nedostatečný. Ale všechny datové struktury mají kompromisy. Žádný není dokonalý. Dokonce i do-it-všechny struktury mají své nevýhody: práce s nimi je složitá a soubory lze psát nebo číst pouze se speciálními softwarovými knihovnami. Pokud přijmeteERDDAP's přístupem dost na to, aby se s ním pokusil pracovat, můžete zjistit, že má své výhody (zejména podpora pro více typů souborů, které mohou držet odpovědi na údaje) . The[ERDDAP™slide show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (zvláště[skluzavka datových struktur](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) Hodně o těchto otázkách mluví.
* A i kdyby vám to připadalo divné,ERDDAP™klienti si toho nikdy nevšimnou - prostě uvidí, že všechny datové soubory mají pěknou jednoduchou strukturu a budou vděční, že mohou získat data z široké škály zdrojů vrácených v široké škále formátů souborů.
         
### Rozměry{#dimensions} 
*    **Co když proměnné mřížky ve zdrojovém souboru NESdílejí stejné proměnné osy?**   
InEDDGridSoubory údajů, všechny datové proměnné MUSÍ používat (podíl) všechny proměnné osy. Takže pokud zdrojový soubor má některé proměnné s jednou sadou rozměrů, a další proměnné s jinou sadou rozměrů, budete muset udělat dva soubory souborů vERDDAP. Například, můžete udělat jedenERDDAP™Soubor s názvem "Nějaká hlava (na povrchu) " držet proměnné, které používají\\[čas\\]\\[zeměpisná šířka\\]\\[zeměpisná délka\\]rozměry a dalšíERDDAP™Soubor s názvem "Nějaká hlava (v hloubkách) " držet proměnné, které používají\\[čas\\]\\[výška\\]\\[zeměpisná šířka\\]\\[zeměpisná délka\\]. Nebo můžete změnit zdroj dat a přidat rozměr s jedinou hodnotou. (například nadmořská výška=0) aby proměnné byly konzistentní.
    
    ERDDAP™nezvládá složitější soubory dat (například modely, které používají síť trojúhelníků) Dobře. Můžete sloužit tyto soubory vERDDAP™vytvořením dvou nebo více souborů údajů vERDDAP™  (tak, aby všechny datové proměnné v každém novém datovém souboru sdílely stejnou sadu osových proměnných) Ale tohle uživatelé nechtějí. U některých souborů údajů můžete zvážit vytvoření pravidelné roštové verze datového souboru a nabídnout ji kromě původních údajů. Nějaký klientský software se může zabývat pouze pravidelnou sítí, takže tím získáte další klienty.
     
    
### Promítnutá data{#projected-gridded-data} 
Některá data mají komplexní strukturu. Například satelitní úroveň 2 ("Dlouhá trať") data nepoužívají jednoduchou projekci. Modelky (a další) často pracují s daty o různých necyklických projekcích (například kuželovité, polární stereografické, tripolární) nebo v nestrukturovaných sítích (komplexnější strukturu dat) . Někteří koncoví uživatelé chtějí tato data tak, jak jsou, takže nedochází ke ztrátě informací. Pro tyto klienty,ERDDAP™mohou sloužit data, jak je, pouze pokudERDDAP™správce rozdělí původní datový soubor na několik souborů údajů, přičemž každá část obsahuje proměnné, které sdílejí stejné proměnné osy. Ano, je to zvláštní pro lidi, kteří jsou do toho zapleteni a je to jiné než většinaOPeNDAPservery. Ale...ERDDAP™zdůrazňuje zpřístupnění údajů v mnoha formátech. To je možné, protožeERDDAP™použití/vyžaduje jednotnější strukturu údajů. I když je to trochu trapné. (tj. jiné, než se očekávalo) ,ERDDAP™může distribuovat promítaná data.

\\[Ano.ERDDAP™mohou mít uvolněnější požadavky na strukturu dat, ale zachovat požadavky na výstupní formáty. Ale to by vedlo k záměně mezi mnoha uživateli, zejména nováčky, protože mnoho zdánlivě platných žádostí o data s různými strukturami by bylo neplatné, protože data by do typu souboru nezapadala. Stále se vracíme k návrhu současného systému.\\]

Někteří koncoví uživatelé chtějí data v lat lon válcové projekce, jako je Equirectangulární / deska carrée nebo Mercator) pro snadné použití v různých situacích. V těchto situacích podporujemeERDDAP™správce používat jiný software (NCO?Matlab? R? IDV? ...?) re-projektovat údaje na geograficky (Equirektangulární projekce / deska carrée) nebo jiné válcové projekce a slouží této formě dat vERDDAP™jako jiný datový soubor. To je podobné tomu, co lidé dělají, když převádějí satelitní data úrovně 2 na data úrovně 3. Jeden takový nástroj je[NCO](https://nco.sourceforge.net/nco.html#Regridding)která nabízí možnosti rozšíření pro regriding dat.

#### GIS a reprojektování dat{#gis-and-reprojecting-data} 
Vzhledem k tomu, že je svět GIS často orientován na mapu, programy GIS obvykle nabízejí podporu pro přeprojektování dat, tj. propracovávání dat na mapě s jinou projekcí.

V současné době,ERDDAP™nemá nástroje pro přepracovávání údajů. Místo toho doporučujeme použít externí nástroj k vytvoření varianty datového souboru, kde byly údaje přeprojektovány z původního formuláře do obdélníku (zeměpisná délka) pole vhodné proERDDAP.

Podle našeho názoru CF/DAPsvět je trochu jiný než svět GIS a pracuje na mírně nižší úrovni.ERDDAP™to odráží. Obecně,ERDDAP™je určen především pro práci s daty (ne mapy) a nechce se změnit (např. reprojekt) ta data. ProERDDAP™, roštovaná data jsou často/obvykle/nejlépe spojena s hodnotami lat lon a válcovou projekcí, a ne s hodnotami x,y. V každém případě,ERDDAP™nedělá nic s projekcí dat, jen předává data, jak je to s jeho aktuální projekcí, o teorii, že reprojekce je významnou změnou dat aERDDAP™nechce být zapojen do významných změn. Následní uživatelé by také mohli naivně data znovu promítat, což by nebylo tak dobré, jako jen provést jednu rekonstrukci. (Takže, pokudERDDAP™Správce chce data nabídnout v jiné projekci, v pořádku; jen reprojektovat data offline a nabídnout, že jako jiný datový soubor vERDDAP. Spousta satelitních dat je nabízena jako to, co NASA nazývá Level 2 (swath) a jako úroveň 3 (Ekvirektální projekce) verze.) Kdy?ERDDAP™dělá mapy (přímo nebo prostřednictvímWMSnebo KML) ,ERDDAP™v současné době nabízí pouze mapy s projekcí Equirektangular / deska carrée, která je naštěstí přijata většina mapovacích programů.

PodporujemeERDDAP™Správci používají jiný software (NCO?Matlab? R? IDV? ...?) re-projektovat údaje na geograficky (Equirektangulární projekce / deska carrée) nebo jiné válcové projekce a slouží této formě dat vERDDAP™jako jiný datový soubor. To je podobné tomu, co lidé dělají, když převádějí satelitní data úrovně 2 na data úrovně 3. Jeden takový nástroj je[NCO](https://nco.sourceforge.net/nco.html#Regridding)která nabízí možnosti rozšíření pro regriding dat.

Doufáme, žeERDDAP™budou mít v budoucnu vestavěné nástroje pro nabízení map s dalšími projekcemi. Také doufáme, že budeme mít v budoucnu lepší spojení se světem GIS (jiný než proudWMSslužba) . Je hrozné, že v tomto "moderním" světě jsou vazby mezi CF/DAPSvět a svět GIS jsou stále tak slabé. Obě ty věci jsou na seznamu To Do. (Chcete-li pomoci, zejména s připojenímERDDAP™Na MapServer, prosím e-mail Chris. John at noaa.gov .) 
    
### Typy údajů{#data-types} 
ERDDAP™podporuje následující datové typy
 (názvy jsou případově citlivé;'u'prefix znamená "nepodepsaný"; číslo mnoha jmen v jiných systémech je počet bitů) :

#### byte{#byte} 
*    **byte** podepsal celé hodnoty s rozsahem -128 až 127.
V jiných systémech se tomu někdy říká int8.
Tomuhle se říká "tinyint" od SQL a Cassandry.
    ERDDAP™převody[boolean](#boolean-data)z některých zdrojů (např. SQL a Cassandra) do bajtů vERDDAP™s hodnotou 0=false, 1=true a 127=missing\\_value.
#### ubyte{#ubyte} 
*    **ubyte** má nesignované celé hodnoty s rozsahem 0 až 255.
V jiných systémech se tomu někdy říká uint8.
#### krátké{#short} 
*    **krátké** podepsal celé hodnoty s rozsahem -32768 až 32767.
V jiných systémech se tomu někdy říká int16.
Tomu se říká "malý" od SQL a Cassandry.
#### krátké{#ushort} 
*    **krátké** má nesignované celé hodnoty s rozsahem 0 až 65535.
V jiných systémech se tomu někdy říká uint16.
#### int{#int} 
*    **int** podepsal celé hodnoty s rozsahem -2147483648 až 2147483647.
V jiných systémech se tomu někdy říká int32.
Tomuhle se říká "integer"|číselný (?) " by SQL and "int" by Cassandra.
#### uint{#uint} 
*    **uint** má nesignované celočíselné hodnoty s rozsahem 0 až 4294967295.
V jiných systémech se tomu někdy říká uint32.
#### dlouhé{#long} 
*    **dlouhé** podepsal celé hodnoty s rozsahem -9223372036854775808 až 922337236854775807.
V jiných systémech se tomu někdy říká int64.
Tomuhle se říká "velký|číselný (?) " od SQL a "velký" od Cassandry.
Protože mnoho typů souborů nepodporuje dlouhá data, jejich použití je deprimováno. Pokud je to možné, použijte místo toho dvojité (viz níže) .
#### ulong{#ulong} 
*    **ulong** má nesignované celočíselné hodnoty v rozsahu 0 až 18446740737095516115
V jiných systémech se tomu někdy říká uint64.
Protože mnoho typů souborů nepodporuje ulong data, jejich použití je deprimováno. Pokud je to možné, použijte místo toho dvojité (viz níže) .
#### plavat{#float} 
*    **plavat** je plovák IEEE 754 s rozsahem přibližně +/- 3.402823466e+38.
V jiných systémech se tomu někdy říká plovák 32.
Tomuhle se říká "skutečná|plavat (?) |desetinné číslo (?) |číselný (?) " by SQL and "float" by Cassandra.
Zvláštní hodnota NaN znamená Not-a-Number.
    ERDDAP™převádí kladné a záporné hodnoty nekonečna na NaN.
#### dvakrát{#double} 
*    **dvakrát** je dvoulůžkový IEEE 754 s rozsahem přibližně
+/- 1,7976931348623157E+308.
V jiných systémech se tomu někdy říká plovák64.
Tomu se říká "dvojitá přesnost."|plavat (?) |desetinné číslo (?) |číselný (?) " by SQL and "double" by Cassandra.
Zvláštní hodnota NaN znamená Not-a-Number.
    ERDDAP™převádí kladné a záporné hodnoty nekonečna na NaN.
#### char{#char} 
*    **char** je jeden, 2- bajt (16-bit)  [Unicode UCS-2 znak](https://en.wikipedia.org/wiki/UTF-16)od\\u0000  (# 0) přes\\uffff  (#65535) .
    \\uffff'je definice není-a-charakter, analogická dvojité hodnotě NaN.
Použití znaku je deprimováno, protože mnoho typů souborů buď nepodporuje chary nebo pouze podporuje 1-bajtové chary (viz níže) . Zvažte místo toho použití Stringu.
Uživatelé mohou použít znakové proměnné k vytváření grafů.ERDDAP™převést znaky na jejich kódové číslo Unicode, které lze použít jako numerická data.
#### String{#string} 
*    **String** je sekvence 0 nebo více, 2-bajt (16-bit)  [Unicode UCS-2 znaky](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™používá/vykládá řetězec o délce 0 jako chybějící hodnotu.ERDDAP™nepodporuje skutečný nulový řetězec.
Teoretická maximální délka řetězce je 2147483647 znaků, ale tam jsou pravděpodobně různé problémy na různých místech i s poněkud kratší Struny.
PoužitíERDDAP's String for SQL's character, varchar, character change, binary, varbinary, interval, pole, multiset, xml, and any other database data type that doesn't fit cleanly with any otherERDDAP™datový typ.
PoužitíERDDAP's String for Cassandra's "text" and any other Cassandra data type that doesn't cleanly fit with any otherERDDAP™datový typ.
     

PředERDDAP™v2.10,ERDDAP™nepodporula nepodepsané integer typy interně a nabídla omezenou podporu u svých čtenářů a spisovatelů dat.
    
### Omezení typu údajů{#data-type-limitations} 
Napadá těERDDAP™jako systém, který má virtuální datové soubory a který pracuje čtením dat ze zdroje datového souboru do interního datového modelu a zápisem dat do různých služeb (např.(OPeN)DAP,WMS) a typy souborů v reakci na požadavky uživatelů.

* Každý vstupní čtečka podporuje podmnožinu datových typů, kteréERDDAP™Podpora. Takže čtení dat doERDDAPVnitřní datové struktury nejsou problém.
* Každý autor výstupu také podporuje podmnožinu datových typů. To je problém, protožeERDDAPmusí například zmáčknout dlouhá data do souborů, které nepodporují dlouhá data.
     

Níže jsou uvedena vysvětlení omezení (nebo žádný) různých autorů výstupů a jakERDDAP™řeší problémy. Tyto komplikace jsou nedílnou součástíERDDAP'je cílem učinit rozdílné systémy interoperabilní.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, atd.) textové soubory -
    * Všechna numerická data jsou zapsána prostřednictvím svého reprezentace String (s chybějícími datovými hodnotami zobrazenými jako řetězce s délkou 0) .
    * I kdyžERDDAP™píše dlouhé a ulong hodnoty správně do ASCII textových souborů, mnoho čtenářů (např. tabulkové programy) nemůže správně řešit dlouhé a ulong hodnoty a místo toho je převést na dvojnásobek hodnot (se ztrátou přesnosti v některých případech) .
    * Char a String data jsou psána přes JSON Strings, které řídí všechny znaky Unicode (zejména "neobvyklé" znaky za ASCII #127, např. znak Euro se jeví jako "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, atd.) textové soubory -
    * Všechna numerická data se zapisují prostřednictvím reprezentace String.
    * Char a String data jsou zapsána jako JSON Strings, které řídí všechny znaky Unicode (zejména "neobvyklé" znaky za ASCII #127, např. znak Euro se jeví jako "\\u20ac") .
    * Chybějící hodnoty pro všechny numerické datové typy se jeví jako nulové.
         
#### .nc3 soubory{#nc3-files} 
*   .nc3 soubory nativní podporu žádné nepodepsané integer datové typy. Před CF v1.9, CF nepodporuje nepodepsané integer typy. Abych se s tím vyrovnal,ERDDAP™2.10+ následuje standard NUG a vždy přidá atribut "\\_Unsigned" s hodnotou "true" nebo "false" k označení, zda jsou data z nepodepsané nebo podepsané proměnné. Všechny celočíselné atributy jsou zapsány jako podepsané atributy (např. byte) s podepsanými hodnotami (např. ubyteactual\\_rangeatribut s hodnotami 0 až 255, se zobrazí jako atribut byte s hodnotami 0 až -1 (překročení hodnoty komplementu obou hodnot mimo rozsah). Neexistuje žádný jednoduchý způsob, jak zjistit, které (podepsané) celočíselné atributy by se měly číst jako nepodepsané atributy.ERDDAP™podporuje atribut "\\_Unsigned" při čtení.nc3 složky.
*   .nc3 soubory nepodporuje dlouhé nebo dlouhé datové typy.ERDDAP™se s tím vypořádá tím, že je dočasně převede do dvou proměnných. Dvojnásobek může přesně reprezentovat všechny hodnoty do +/- 9,007,199,254,740,992 Což je 2^53. To je nedokonalé řešení.Unidataodmítá provést menší upgrade na.nc3 řešit tyto a související problémy, citace.nc4 (velká změna) jako řešení.
* Specifikace CF (před v1. 9) řekl, že podporuje znak datový typ, ale to není jasné, pokud znak je určen pouze jako stavební bloky char pole, které jsou efektivně Struny. Otázky na jejich mailing list přinesl pouze matoucí odpovědi. Vzhledem k těmto komplikacím, je nejlepší vyhnout se Char proměnné vERDDAP™a pokud možno použít String proměnné.
* Tradičně.nc3 soubory pouze podporované řetězce s ASCII-kódován (7-bit, #0 - #127) Postavy. NUG (aERDDAP) rozšířit, že (začínající ~2017) vložením atributu "\\_Encoding" s hodnotou "ISO-8859-1" (rozšíření ASCII, které definuje všech 256 hodnot každého 8-bitového znaku) nebo "UTF-8" k označení toho, jak jsou zakódována String data. Jiné kódování může být legální, ale jsou odrazeni.
         
#### .nc4 soubory{#nc4-files} 
*   .nc4 soubory podporují všechnyERDDAP's datovými typy.
    
#### NCCSV soubory{#nccsv-files} 
NCCSV 1.0 soubory nepodporuje žádné nepodepsané celočíselné datové typy.
[NCCSV 1.1+ soubory](/docs/user/nccsv-1.00)podporovat všechny nepodepsané integer datové typy.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII soubory, a .dods binární soubory) -
    *   (OPeN)DAPmá krátké, krátké, int, uint, float a dvojité hodnoty správně.
    *   (OPeN)DAPmá "byte" datový typ, který definuje jako nepodepsaný, zatímco historicky THREDDS aERDDAP™zacházeli s "byte" jako s podepsanými v jejich(OPeN)DAPslužby. Abych se s tím vyrovnal lépe,ERDDAP™2,10+ se řídí normou NUG a vždy přidává atribut "\\_Unsigned" s hodnotou "true" nebo "false" k označení, zda data jsou coERDDAP™volá byte nebo ubyte. Všechny atributy byte a ubyte jsou zapsány jako atributy "byte" s podepsanými hodnotami (např. ubyteactual\\_rangeatribut s hodnotami 0 až 255, se zobrazí jako atribut byte s hodnotami 0 až -1 (překročení hodnoty komplementu obou hodnot mimo rozsah). Neexistuje jednoduchý způsob, jak zjistit, které atributy "byte" by se měly číst jako atributy ubyte.
    *   (OPeN)DAPnepodporuje podepsané nebo nepodepsané longy.ERDDAP™se s tím vypořádá tím, že je dočasně převede do dvou proměnných a atributů. Dvojnásobek může přesně reprezentovat všechny hodnoty do 9,007,199,254,740,992 Což je 2^53. To je nedokonalé řešení.OPeNDAP  (organizace) odmítá provést menší upgrade naDAP2.0 řešit tyto a související problémy, citaceDAP4 (velká změna) jako řešení.
    * Protože(OPeN)DAPnemá samostatný znakový datový typ a technicky podporuje pouze 1-bayte ASCII znaky (#0 - #127) v řetězech se proměnné znakových dat zobrazí jako 1-znakové dlouhé řetězce v(OPeN)DAP.das, .dds, a .dods reakce.
    * Technicky vzato,(OPeN)DAPspecifikace podporuje pouze řetězce s ASCII kódovanými znaky (#0 - #127) . NUG (aERDDAP) rozšířit, že (začínající ~2017) vložením atributu "\\_Encoding" s hodnotou "ISO-8859-1" (rozšíření ASCII, které definuje všech 256 hodnot každého 8-bitového znaku) nebo "UTF-8" k označení toho, jak jsou zakódována String data. Jiné kódování může být legální, ale jsou odrazeni.
         
### Poznámky typu údajů{#data-type-comments} 
* Vzhledem k tomu, že špatná podpora pro dlouhé, ulong, a char data v mnoha typech souborů, odrazujeme používání těchto datových typů vERDDAP. Pokud je to možné, použijte dvojité místo dlouhé a ulong, a použijte String místo char.
     
* Metadata - protože(OPeN)DAP's .das a .dds odpovědi nepodporuje dlouhé nebo dlouhé atributy nebo datové typy (a místo toho jim ukázat jako dvojité) , můžete místo toho použítERDDAP's tabulární reprezentace metadat, jak je vidět vhttp.../erddap/ **Informace** / *datasetID* .html webová stránka (například:[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (které můžete také získat v jiných typech souborů, např. .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) nebo.nccsvOdpověď na metadata (například:[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)i když.nccsvMetadata jsou dostupná pouze pro tabulkové soubory dat) , obojí podporuje všechny datové typy (zejména dlouhé, ulong a char) .
         
### Soubory médií{#media-files} 
Ne všechna data jsou pole čísel nebo textu. Některé soubory souborů se skládají z mediálních souborů, jako jsou obrazy, audio a video soubory.ERDDAP™má některé speciální funkce, které uživatelům usnadní přístup k mediálním souborům. Je to dvoustupňový proces:
 

1. Zpřístupněte každý soubor prostřednictvím vlastní URL prostřednictvím systému, který podporuje požadavky na rozsah byte.
Nejjednodušší způsob, jak to udělat, je dát soubory do adresáře, kterýERDDAP™má přístup k. (Pokud jsou v kontejneru jako.zipsoubor, rozbalte je, i když možná budete chtít nabídnout.zipsoubor také uživatelům.) Tak udělej[EDDTableFromFileNames](#eddtablefromfilenames)Soubor dat pro zpřístupnění souborů prostřednictvímERDDAP™, zejména prostřednictvímERDDAP's["files"systém](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Všechny soubory přístupné prostřednictvím EDDTableFromFileNames aERDDAP's"files"podpora systému[požadavky na rozsah byte](https://en.wikipedia.org/wiki/Byte_serving). Normálně, když klient (Například prohlížeč) se žádost na URL, dostane celý soubor jako odpověď. Ale s žádostí o rozsah byte, žádost určuje rozsah bajtů ze souboru, a server vrací pouze tyto byty. To je zde důležité, protože audio a video přehrávače v prohlížečích fungují pouze v případě, že se k souboru lze dostat prostřednictvím požadavků na rozsah byte.
    
Nepovinné: Pokud máte více než jeden soubor souborů s přidruženými mediálními soubory, můžete vytvořit pouze jeden EDDTableFromFileNames, který má podsložka pro každou skupinu souborů. Výhodou je, že když chcete přidat nové soubory médií pro nový datový soubor, stačí vytvořit novou složku a vložit soubory do této složky. Složka a soubory budou automaticky přidány do souboru EDDTableFromFileNames.
    
2. Nepovinné: Pokud máte soubor dat, který obsahuje odkazy na soubory médií, přidejte jej doERDDAP.
Například, můžete mít soubor .csv s řadou pokaždé, když někdo viděl velrybu a sloupec, který obsahuje název souboru obrázku související s tímto pozorováním. Pokud název souboru obrázku je pouze název souboru, např., Img20141024T192403Z, ne úplný URL, pak musíte přidat[souborAccessBase Url a/nebo souborAccessSuffix](#fileaccessbaseurl)atributy metadat pro tento účeldataVariablekterý určuje základní URL a příponu pro tyto názvy souborů. Pokud jste soubory zpřístupnili prostřednictvím EDDTableFromFileNames, URL bude ve formě
     *baseUrl* /erddap/files/ *datasetID* /
Například,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Pokud existuje.zipnebo jiný kontejnerový soubor se všemi mediálními soubory vztahujícími se k datové proměnné, doporučujeme, abyste tento soubor také zpřístupnit uživatelům (Viz krok 1 výše) a pak ji identifikovat pomocí[souborAccessArchive Url](#fileaccessarchiveurl)atribut.
    

\\[ZačínámeERDDAP™v1. 82\\]Pokud uděláte první krok výše (nebo oba kroky) , pak když uživatel zobrazitERDDAP™ "files"systém pro tento datový soubor (nebo žádá o zobrazení podmnožiny datového souboru prostřednictvím.htmlTabležádost, pokud jste udělali druhý krok) ,ERDDAP™zobrazí '?' ikonu vlevo od názvu souboru. Pokud se uživatel vznáší nad ikonou, uvidí popup zobrazující obraz, nebo audio přehrávač, nebo video přehrávač. Prohlížeče podporují pouze omezený počet typů

* obrázek (obvykle .gif, .jpg, a .png) ,
* audio (obvykle .mp3, .ogg, a .wav) a
* video soubory (obvykle .mp4, .ogv, a . webm) .

Podpora se liší od různých verzí různých prohlížečů na různých operačních systémech. Takže pokud máte na výběr, který typ souboru nabídnout, dává smysl nabídnout tyto typy.

Nebo pokud uživatel klikne na název souboru zobrazený naERDDAP™webová stránka, jejich prohlížeč zobrazí obraz, audio nebo video soubor jako samostatné webové stránky. To je většinou užitečné vidět velmi velký obraz nebo video na celé obrazovce, místo v popup.
    
### Práce se soubory AWS S3{#working-with-aws-s3-files} 
[Amazon Web Service (AWS) ](https://aws.amazon.com)je prodejcem[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)služby.[S3](https://aws.amazon.com/s3/)je systém úložiště objektů nabízený AWS. Místo hierarchického systému adresářů a souborů tradičního souborového systému (jako pevný disk ve vašem počítači) , S3 nabízí jen "kakety," které drží "objekty" (Zavoláme jim."files") .

Pro soubory ASCII (např. .csv) ,ERDDAP™může pracovat přímo se soubory v kbelících. Jediné, co musíte udělat, je upřesnit&lt;souborDir&gt; pro datový soubor, který používá specifický formát pro kbelík AWS, např. https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Nepoužívejte&lt;cacheFromUrl&gt; . Podrobnosti viz níže.

Ale pro binární soubory (např..nc, .grib, .bufr a.hdfsoubory) , musíte použít&lt;cacheFromUrl&gt; systém popsaný níže.ERDDAP, netcdf-java (kteráERDDAP™používá pro čtení dat z těchto souborů) , a další vědecký datový software jsou navrženy pro práci se soubory v tradičním souborovém systému, který nabízí[úroveň bloku](https://en.wikipedia.org/wiki/Block-level_storage)přístup ke souborům (který umožňuje čtení částí souboru) , ale pouze S3 nabízí[Úroveň souboru (objekt) ](https://en.wikipedia.org/wiki/Block-level_storage)přístup ke souborům (což umožňuje pouze čtení celého souboru) . AWS nabízí alternativu k S3,[Elastický blokový obchod (EBS) ](https://aws.amazon.com/ebs/)), který podporuje přístup k souborům na úrovni bloku, ale je dražší než S3, takže se zřídka používá pro hromadné ukládání velkého množství datových souborů. (Takže když lidé říkají ukládání dat v cloudu (S3) je levné, je to obvykle jablka k pomerančům srovnání.) 

#### Kýble S3{#s3-buckets} 
 **Obsah kýblu. Klíče. Objekty, oddělovače.**   
Technicky S3 kbelíky nejsou organizovány v hierarchické struktuře souborů jako souborový systém na počítači. Místo toho kbelíky obsahují pouze "objekty" (soubory) , každý z nich má "klíč" (jméno) . Příkladem klíče v tomto noaa-goes17 kbelíku je

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Odpovídající URL pro tento objekt je

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS podporuje malou variaci v tom, jak je tato URL vytvořena, aleERDDAP™vyžaduje tento zvláštní formát:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Je to běžná praxe, stejně jako u tohoto příkladu, aby jména klíčů vypadala jako hierarchická cesta plus název souboru, ale technicky nejsou. Protože je to běžné a užitečné,ERDDAP™zachází s klíči / je, jako by se jedná o hierarchickou cestu plus název souboru, a tato dokumentace bude odkazovat na ně jako takové. Pokud klíče kbelíku nepoužívají / jsou (např., klíč jako
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s201805222475755), potéERDDAP™bude celý klíč považovat za dlouhý název souboru.

Soukromé vs veřejné kýble -- Správce kbelíku S3 může učinit kbelík a jeho obsah veřejným nebo soukromým. Pokud je veřejný, jakýkoli soubor v kbelíku může být stažen někým, kdo používá URL pro soubor. Amazon má[Otevřít data](https://aws.amazon.com/opendata/)program, který hostí veřejné datové soubory (včetně údajů odNOAA, NASA a USGS) Zdarma a neúčtuje nikomu stáhnout soubory z těchto kbelíků. Pokud je kbelík soukromý, soubory v kbelíku jsou přístupné pouze oprávněným uživatelům a AWS účtuje poplatek (obvykle platí majitel kbelíku) pro stahování souborů do počítače S3.ERDDAP™může pracovat s daty ve veřejných i soukromých kbelících.

#### AWS oprávnění{#aws-credentials} 
Aby to tak bylo.ERDDAP™můžete číst obsah soukromých kbelíků, potřebujete AWS pověřovací listiny a musíte uložit pověřovací soubor na standardní místo, takžeERDDAP™může najít informace. Viz AWS SDKJava2.x dokumentace:[Nastavit výchozí akreditivy](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (Možnost uložení hodnot jakoJavaparametry příkazového řádku v\\[tomcat\\]/bin/setenv.sh může být dobrá volba.) 
#### AWS /soubory/{#aws-files} 
* /soubory/ systém -- TheERDDAP™ [/soubory/ systém](#accessibleviafiles)umožňuje uživatelům stáhnout zdrojové soubory pro datový soubor. Doporučujeme zapnout všechny soubory souborů se zdrojovými soubory, protože mnoho uživatelů si chce stáhnout původní zdrojové soubory.
    * Pokud jsou soubory v soukromém kbelíku S3, bude žádost uživatele o stažení souboru řešenaERDDAP™, který přečte data ze souboru a pak je předá uživateli, čímž zvýší zatížení vašeho souboruERDDAP™, pomocí příchozí a odchozí šířky pásma, a dělá vás (váERDDAP™Správce) zaplatit poplatek za výstup dat AWS.
    * Pokud jsou soubory ve veřejném kbelíku S3, bude žádost uživatele o stažení souboru přesměrována na URL AWS S3 pro tento soubor, takže data neprojdouERDDAP™, tedy snížení zatížení naERDDAP. A pokud jsou soubory v Amazon Open Data (volný) veřejný kbelík, pak vy (váERDDAP™Správce) nebude muset AWS platit žádný poplatek za přenos dat. Proto je zde velká výhoda, která slouží datům veřejnosti. (ne soukromá) Kbelíky S3 a obrovská výhoda pro podávání dat z Amazon Open Data (volný) Kbelíky.

#### ERDDAP™a AWS S3 Kýble{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™a AWS S3 Kýble** ](#erddap-and-aws-s3-buckets)  
Naštěstí, po velkém úsilí,ERDDAP™má řadu funkcí, které jí umožňují řešit vlastní problémy při práci s blokovým přístupem S3 souborů rozumně účinným způsobem:

*   \\[Prohlášení: Práce s kbelíky AWS S3 je spousta práce navíc. AWS je obrovský ekosystém služeb a funkcí. Je toho hodně k učení. Chce to čas a úsilí, ale je to možné. Buď trpělivý a všechno zařídíš. Hledej/pros o pomoc
([AWS dokumentace](https://aws.amazon.com/documentation/gettingstarted/), webové stránky jako[Přetok zásobníku](https://stackoverflow.com/), a pravidelné
    [ERDDAP™možnosti podpory](/docs/intro#support)Pokud se zasekneš.\\]  
     
* Může být těžké zjistit strukturu adresáře a jména souborů v kbelíku S3.ERDDAP™má řešení pro tento problém: EDDTableFromFileNames má speciální[\\*\\*\\*fromOnTheFly](#fromonthefly)možnost, která umožňuje vytvořit soubor EDDTableFromFileNames, který umožňuje uživatelům prohlížet obsah kbelíku S3 (a stahovat soubory) prostřednictvím datového souboru"files"Možnost. Existuje[příklad níže](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™může číst data z[externí komprimované datové soubory](#externally-compressed-files), takže je v pořádku, pokud soubory na S3 jsou uloženy jako.gz,.gzip,.bz2, .Z, nebo jiné typy externě komprimovaných datových souborů, které mohou dramaticky (2 - 20X) snížit náklady na skladování souborů. Často není žádný časový trest za použití externě komprimovaných souborů, protože čas uložen přenosem menšího souboru ze S3 doERDDAPzhruba bilance času potřebného proERDDAP™aby dekomprimoval soubor. Chcete-li tuto funkci použít, stačí se ujistit, že soubor dat&lt;souborNázevRegex&gt; umožňuje typ komprimovaného souboru (např. přidáním (|.gz) až do konce regexu) .
     
* Pro nejčastější případ, kde máteERDDAP™nainstalován ve vašem PC pro test/vývoj a kde má datový soubor binární datové soubory, které jsou uloženy jako objekty v kbelíku S3, jeden přístup k získání datového souboru vERDDAP™je:
    1. Vytvořte si adresář ve vašem PC a podržte několik testovacích datových souborů.
    2. Stáhněte si dva datové soubory ze zdroje do adresáře, který jste právě vytvořili.
    3. Použití[GenerovatDatasetsXml](#generatedatasetsxml)k vytvoření částidatasets.xmlpro datový soubor založený na dvou místních datových souborech.
    4. Zkontrolujte, zda soubor údajů funguje podle potřeby[DasDds](#dasdds)a/nebo vaše místníERDDAP.
        
         **Následující kroky vytvoří kopii tohoto souboru údajů (který získá data z kbelíku S3) na veřejnostiERDDAP.** 
        
    5. Kopírovat částdatasets.xmlpro soubor údajů do souborudatasets.xmlpro veřejnostERDDAP™To bude sloužit datům.
    6. Vytvořit adresář na veřejnostiERDDAPMístní pevný disk, který udrží dočasné soubory. Adresář nebude používat mnoho místa na disku (viz cacheSizeGB níže) .
    7. Změna hodnoty datového souboru&lt;fileDir&gt; tag tak, že ukazuje na adresář, který jste právě vytvořili (i když je adresář prázdný) .
    8. Přidat a[cacheFromUrl](#cachefromurl)tag, který určuje název kbelíku datového souboru a volitelnou předponu (tj. adresář) v konkrétním[Aws S3 URL formát, kterýERDDAP™vyžaduje](#accessing-files-in-an-aws-s3-bucket).
    9. Přidat [&lt;cacheSizeGB&gt;] (#Cachefromurl) Označení xml datového souboru (Například 10 je dobrá hodnota pro většinu souborů údajů) říctERDDAP™omezit velikost místní cache (tj. nesnažte se skrývat všechny vzdálené soubory) .
    10. Zjisti, jestli to funguje na veřejnosti.ERDDAP. Všimněte si, že poprvéERDDAP™načítá data, bude trvat dlouho načíst, protožeERDDAP™potřebuje stáhnout a přečíst všechny datové soubory.
        
Pokud je datový soubor obrovskou sbírkou rozsáhlých datových souborů, bude to trvat velmi dlouho a bude to nepraktické. V některých případech, pro mřížkované datové soubory,ERDDAP™může extrahovat potřebné informace (např. časový bod pro data v datovém souboru s mřížkou) ze jména souboru a vyhnout se tomuto problému. Viz[Agregace prostřednictvím Název souboru](#aggregation-via-file-names-or-global-metadata).
        
    11. Volitelně (ale zejména pro datové soubory EDDTableFromFoles) , můžete přidat[nThreads](#nthreads)tag k datovému souboruERDDAPpoužít více než 1 vlákno při reakci na požadavek uživatele na data. To minimalizuje účinky zpoždění, které nastane, kdyžERDDAP™čte datové soubory z (vzdálený) AWS S3 kbelíky do místní cache a (Možná.) Dekomprese.

#### AWS S3 Otevřít data{#aws-s3-open-data} 
V rámciNOAA's[Velký datový program](https://www.noaa.gov/nodd/about),NOAAmá partnerství s pěti organizacemi, včetně AWS, "k prozkoumání možných výhod uložení kopií klíčových pozorování a výstupů modelu v Cloudu, aby bylo možné počítat přímo na datech bez nutnosti dalšího šíření." AWS zahrnuje soubory, ze kterých pocházíNOAAjako součást svého programu nabídnout veřejnosti přístup k velké kolekci[Otevřít data o AWS S3](https://registry.opendata.aws/)z jakéhokoli počítače, zda se jedná o Amazon Compute instance (pronajatý počítač) na síti AWS nebo vlastním počítači v jakékoliv síti. Níže uvedený příklad předpokládá, že pracujete s veřejně přístupným datovým souborem.

#### Přístup k souborům v AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
Pro soukromý datový kbelík S3 vám majitel kbelíku musí dát přístup k vědru. (Viz dokument AWS.) 

Ve všech případech budete potřebovat účet AWS, protože AWS SDK proJava  (kteráERDDAP™používá k získávání informací o obsahu vědra) vyžaduje oprávnění AWS účtu. (více v tomto níže) 

ERDDAP™přístup k kbelíkům AWS S3 pouze pokud zadáte [&lt;cacheFromUrl&gt;] (#Cachefromurl) (nebo&lt;souborDir&gt;) ve zvláštním formátu:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
kde

* KbelíkJméno je krátká forma jména kbelíku, např. noaa-goes17 .
* Oblast Aws, např. us-east-1, je ze sloupce "Region" v jedné z tabulek[Konec služby AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html)kde je kbelík skutečně umístěn.
* Předpona je volitelná. Pokud je přítomen, musí skončit'/'.

Například, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Tento formát URL je jedním z doporučení AWS S3: viz[Přístup k kýblu](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)a[popis předpon](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™vyžaduje, abyste spojili kbelík URL a volitelný prefix do jedné URL, aby bylo možné určit&lt;cacheFromUrl&gt; (nebo&lt;fileDir&gt;) kde jsou soubory umístěny.

#### Testování veřejných AWS S3 Kýble{#test-public-aws-s3-buckets} 
Pro veřejné kbelíky můžete a měli byste otestovat kbelík URL adresáře AWS S3 ve vašem prohlížeči, např.
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Pokud je kbelík URL správný a vhodný proERDDAP, vrátí XML dokument, který má (částečný) seznam obsahu toho vědra. Bohužel, celá URL (tj. kbelík URL plus předpona) žeERDDAP™nefunguje v prohlížeči. AWS nenabízí systém prohlížení hierarchie kbelíku snadno ve vašem prohlížeči. (Pokud je to špatně, pošlete prosím Chrisovi email. John v Noaa.gov. Jinak, Amazone, prosím přidejte podporu&#33;) 

#### Zobrazení obsahu kýblu{#viewing-the-contents-of-a-bucket} 
Kbelíky S3 často obsahují několik kategorií souborů, v několika pseudo podadresářů, které by se mohly stát párERDDAP™Data. Aby seERDDAP™Soubory dat, musíte znát výchozí adresář pro&lt;cacheFromUrl&gt; (nebo&lt;fileDir&gt;) a formát názvů souborů, které tuto podmnožinu souborů identifikují. Pokud se pokusíte zobrazit celý obsah kbelíku v prohlížeči, S3 vám ukáže prvních 1000 souborů, což je nedostatečné. V současné době, nejlepší způsob, jak si prohlédnout veškerý obsah kbelíku je vytvořit[EDDTableFromFileNames](#eddtablefromfilenames)Soubor údajů (na počítači.ERDDAP™a/nebo na veřejnostiERDDAP) , který vám také dává snadný způsob, jak procházet strukturu adresáře a stahovat soubory. The&lt;souborDir&gt; pro to bude URL, které jste vytvořili výše, např., https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Proč AWS S3 nenabízí rychlý a snadný způsob, jak to udělat bez účtu AWS?\\]Všimněte si, že když tohle dělám na svém počítači v neamazonské síti, zdá se, že Amazon zpomaluje reakci na trik. (asi 100 (?) Soubory za kus) po prvních několika útržcích (1000 souborů za kus) jsou staženy. Vzhledem k tomu, kbelíky mohou mít obrovské množství souborů (Noaa-goes17 má 26 milionů) , získání všech obsahů kbelíku může trvat EDDTableFromFileJména několik hodin (např. 12&#33;) do konce.\\[Amazonka, je to tak?\\]

#### Vytvářet graf ZFileNames Dataset s AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Pokud máte jméno kbelíku, ale již nemáte seznam souborů v kbelíku S3 nebo předponu, která identifikuje umístění příslušných souborů v kbelíku, použijte níže uvedené pokyny k vytvoření souboru EDDTableFromFileNames, abyste mohli procházet hierarchii adresáře kbelíku S3 prostřednictvímERDDAP's"files"systém.

1. Otevřít účet AWS
    ERDDAP™používá[AWS SDK proJava](https://docs.aws.amazon.com/sdk-for-java/index.html)získat informace o vědě od AWS, takže musíte[vytvořit a aktivovat účet AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). To je docela velká práce, se spoustou věcí, které se musíš naučit.
     
2. Dejte své AWS oprávnění kamERDDAP™může je najít.
Postupujte podle pokynů[Nastavit AWS Credentials a Region for Development](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)takERDDAP™  (Konkrétně AWS SDKJava) bude moci najít a použít vaše AWS pověření. PokudERDDAP™Nemůžete najít doklady, uvidíte
Java.lang. IlegálníHargument Výjimkou: profilový soubor nemůže být chybou vERDDAP's log.txt soubor.
    
Tip pro Linux a Mac OS: pověřovací soubor musí být v domovském adresáři uživatele, který spouští Tomcat (aERDDAP)   (pro tento odstavec, budeme předpokládat user=tomcat) ve složce zvané ~/.aws/credentials . Nepředpokládejte, že ~ je /home/tomcat -- vlastně použít cd ~ zjistit, kde operační systém myslí ~ pro uživatele=tomcat je. Vytvořte adresář, pokud neexistuje. Dále, poté, co umístíte pověřovací soubor na místo, ujistěte se, že uživatel a skupina pro soubor jsou tomcat a pak použít Chmod 400 pověřovacích listin, aby se ujistil, že soubor je čten pouze pro uživatele=tomcat.
    
3. Vytvořit kbelík URL v[formát, kterýERDDAP™vyžaduje](#accessing-files-in-an-aws-s3-bucket)např.
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)a (pro veřejné vědro) otestujte jej v prohlížeči, aby se ujistil, že vrátí XML dokument, který má částečný seznam obsahu tohoto kbelíku.
     
4. Použití[GenerovatDatasetsXml](#generatedatasetsxml)vytvořit[EDDTableFromFileNames](#eddtablefromfilenames)Soubor údajů:
    * Pro úvodní adresář použijte tuto syntaxi:
        \\*\\*\\ *z OnTheFly,* Vaše BucketUrl*
například:
        \\*\\*\\* from OnThe Fly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Jméno souboru regex? .\\*
    * Rekurzivní? pravda
    * reload Každý NMinutes? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * Instituce?NOAA
    * Shrnutí? Nic. (ERDDAP™automaticky vytvoří slušné shrnutí.) 
    * Název? Nic. (ERDDAP™automaticky vytvoří slušný název.) Jako obvykle byste měli editovat výsledný XML pro ověření správnosti a provést vylepšení před částí souborů, které jej používají vdatasets.xml.
5. Pokud budete postupovat podle výše uvedených pokynů a načíst soubor údajů vERDDAP, jste vytvořili EDDTableFromFoles soubor. Jako příklad, a aby bylo pro každého jednodušší procházet a stahovat soubory z kbelíků AWS Open Data, jsme vytvořili soubory EDDTableFromFileNames (viz seznam na
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) pro téměř všechny[AWS S3 Otevřít datové vědro](https://registry.opendata.aws/).
    \\[Pár kýblů, které jsme do kořenového adresáře nezahrnuli. (více než lze stáhnout v přiměřeném čase) , nebo nedovolují přístup veřejnosti (Neměly by být všechny veřejné?) , nebo jsou kbelíky Requester Pays (např. Sentinel) .\\]  
Pokud kliknete na"files"odkaz na jeden z těchto souborů, můžete procházet adresář strom a soubory v tomto S3 kbelíku. Kvůli cestě\\*\\*\\*fromOnTheFly EDDTableFromFiles funguje, tyto seznamy adresářů jsou vždy dokonale aktuální, protožeERDDAP™Dostane je do letadla. Pokud kliknete na strom adresáře na aktuální název souboru a kliknete na název souboru,ERDDAP™přesměruje váš požadavek na AWS S3 tak, abyste mohli soubor stáhnout přímo z AWS. Pak si můžete ten soubor prohlédnout.
    
Problémy?
Pokud váš EDDTableFromFoles nenačte doERDDAP™  (nebo DasDds) , podívejte se do souboru log.txt pro chybovou zprávu. Pokud uvidíte
Java.lang. NelegálníHargumentVýjimka: profilový soubor nemůže být chybou nula, problém je, že AWS SDK proJava  (používanýERDDAP) Nenašel jsem tu složku. Viz pokyny výše.
     

Je nešťastné, že AWS nedovoluje lidem, aby prohlížečem prohlíželi obsah veřejného kbelíku.

 **Pak můžete udělatERDDAP™data, která uživatelům umožňují přístup k datům v souborech.**   
Viz pokyny v[ERDDAP™a S3 kýbly](#erddap-and-aws-s3-buckets)  (nad) .
Pro vzorek EDDTableFromFileNames soubor, který jste vytvořili výše, pokud uděláte trochu pošťouchání kolem adresáře a názvy souborů ve stromu adresáře, je jasné, že jména adresářů nejvyšší úrovně (např. ABI-L1b-RadC) odpovídá tomu, coERDDAP™Volal bych samostatné soubory dat. Kbelík, se kterým pracujete, může být podobný. Pak byste mohli pokračovat v vytváření samostatných souborů vERDDAP™pro každý z těchto souborů údajů, např.
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
jako&lt;cacheFromUrl&gt;. Bohužel, pro tento konkrétní příklad, soubory údajů v kbelíku se zdá být úroveň 1 nebo úroveň 2 soubory údajů, kteréERDDAP™ [není moc dobrý v](#dimensions), protože datový soubor je složitější sběr proměnných, které používají různé rozměry.
     
    
### NcML soubory{#ncml-files} 
NcML soubory vám umožní zadat změny při letu na jeden nebo více původních zdrojůNetCDF  (V3 nebo v4)  .nc, .grib, .bufr, nebo.hdf  (v4 nebo v5) soubory, a pak mítERDDAP™Léčba.ncml soubory jako zdrojové soubory.ERDDAP™Soubory budou akceptovat.ncml soubory kdykoliv.ncSoubory se očekávají. NcML soubory musí mít rozšíření.ncml. Viz[UnidataDokumentace NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML je užitečné, protože můžete udělat některé věci s ním (například provádět různé změny různých souborů ve sbírce, včetně přidání rozměru se specifickou hodnotou do souboru) , že nemůžete dělat sERDDAP'sdatasets.xml.

* Změny.ncml souboru posledníModifikovaný čas způsobí, že soubor bude znovu načten, kdykoli je soubor znovu načten, ale změny v podkladovém souboru.ncDatové soubory nebudou přímo zaznamenány.
* Tip: NcML\\*velmi\\*citlivé na pořadí některých položek v NcML souboru. Myslete na NcML jako upřesnění řady pokynů v uvedeném pořadí, se záměrem změnit zdrojové soubory (stav na začátku/nahoře souboru NcML) do cílových souborů (stav na konci/podmínce souboru NcML) .

Alternativou k NcML je[NetCDFProvozovatelé (NCO) ](#netcdf-operators-nco). Velký rozdíl je v tom, že NcML je systém pro provádění změn při letu (takže zdrojové soubory nejsou změněny) , vzhledem k těmto důvodům:NCOlze použít k provedení změn (nebo nové verze) Složky. ObaNCOa NcML jsou velmi, velmi flexibilní a umožňují vám udělat téměř jakoukoli změnu můžete myslet na soubory. Pro oba, může být náročné přijít na to, jak přesně dělat to, co chcete dělat - zkontrolujte web pro podobné příklady. Oba jsou užitečné nástroje pro přípravu netCDF aHDFsoubory pro použití sERDDAP, zejména k provedení změn nad rámec toho, coERDDAPManipulační systém to zvládne.

Příklad #1: Přidání rozměru času s jednou hodnotou
Tady je..ncml soubor, který vytváří nový vnější rozměr (čas, s 1 hodnotou: 1041379200) a přidá tento rozměr do proměnné pic v souboru s názvem A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Příklad #2: Změna stávající hodnoty času
Někdy zdroj.ncsoubor již má časový rozměr a časovou hodnotu, ale hodnota je nesprávná (pro vaše účely) . Tohle.ncml soubor říká: pro datový soubor s názvem ""19810825230030-NCEI..." pro rozměr proměnné"time", nastavit jednotky atribut být 'sekundy od 1970-01-01T00:00:00Z' a nastavit časovou hodnotu 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFProvozovatelé (NCO)  {#netcdf-operators-nco} 
"NetCDF operátori (NCO) se skládá z tuctu samostatných, příkazových programů, které berou netCDF\\[V3 nebo v4\\],HDF \\[v4 nebo v5\\],\\[.grib, .bufr,\\]neboDAPsoubory jako vstup, pak fungovat (Například odvození nových dat, výpočetní statistiky, tisk, hyperslab, manipulace metadat) a výstup výsledků na obrazovku nebo soubory v textových, binárních nebo netCDF formátech.NCOAsistence analýzy mřížkovaných vědeckých údajů. Shell-command styleNCOumožňuje uživatelům interaktivně manipulovat a analyzovat soubory nebo s expresivními skripty, které se vyvarují nadbytku vyšších úrovní programovacích prostředí." (z[NCO](https://nco.sourceforge.net/)domovská stránka) .

Alternativa kNCOje[NcML](#ncml-files). Velký rozdíl je v tom, že NcML je systém pro provádění změn při letu (takže zdrojové soubory nejsou změněny) , vzhledem k těmto důvodům:NCOlze použít k provedení změn (nebo nové verze) Složky. ObaNCOa NcML jsou velmi, velmi flexibilní a umožňují vám udělat téměř jakoukoli změnu můžete myslet na soubory. Pro oba, může být náročné přijít na to, jak přesně dělat to, co chcete dělat - zkontrolujte web pro podobné příklady. Oba jsou užitečné nástroje pro přípravu netCDF aHDFsoubory pro použití sERDDAP, zejména k provedení změn nad rámec toho, coERDDAPManipulační systém to zvládne.

Můžete například použítNCOaby jednotky časové proměnné byly konzistentní ve skupině souborů, kde původně nebyly konzistentní. Nebo můžete použítNCOuplatnitscale\\_factoraadd\\_offsetve skupině souborů, kdescale\\_factoraadd\\_offsetmají různé hodnoty v různých zdrojových souborech.
 (Nebo se nyní můžete vypořádat s těmito problémy vERDDAP™přes[EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked), což je variantaEDDGridFromNcFiles, které rozebírá zabalená data a standardizuje časové hodnoty na nízké úrovni, aby se mohly zabývat soubory sběru, které mají různéscale\\_factors aadd\\_offset, nebo jiné časové jednotky.) 

NCOje svobodný a otevřený zdroj software, který používá[GPL 3. 0](https://www.gnu.org/licenses/gpl-3.0.html)Řidičák.

Příklad #1: Udělat jednotky konzistentní
EDDGridFromFiles a EDDTable Ze souborů trvají na tom, že jednotky dané proměnné jsou totožné ve všech souborech. Pokud některé soubory jsou triviálně (ne funkčně) jiné než jiné (např. časové jednotky
"sekundy od 1970-01-01 00:00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z", můžete použítNCO's[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). změnit jednotky ve všech souborech být totožné s
nco/ncatted -a jednotky,time,o,c,'sekundy od 1970-01-01T00:00:00Z' \\*.nc  
\\[Pro mnoho problémů, jako je tento v EDDTableFrom... Soubory souborů, nyní můžete použít[standardizovat Co?](#standardizewhat)říctERDDAPstandardizovat zdrojové soubory, jak jsou čteny doERDDAP.\\]
    
### Limity velikosti datové sady{#limits-to-the-size-of-a-dataset} 
Uvidíte mnoho odkazů na "2 miliardy" níže. Přesněji řečeno, to je odkaz na 2.147, Praha4647 (2^31-1) , což je maximální hodnota 32-bit podepsané celé číslo. Například v některých počítačových jazycíchJava  (kteráERDDAP™je napsáno) , že je největší datový typ, který lze použít pro mnoho datových struktur (například velikost pole) .

Pro hodnoty řetězce (například pro názvy proměnných, názvy atributů, hodnoty atributů String a hodnoty dat String) , maximální počet znaků na StringERDDAP™2 miliardy. Ale téměř ve všech případech, tam budou malé nebo velké problémy, pokud String přesahuje rozumnou velikost (např. 80 znaků pro názvy proměnných a názvy atributů a 255 znaků pro většinu hodnot atributu String a hodnot dat) . Například webové stránky, které zobrazují dlouhé názvy proměnných, budou trapně široké a dlouhé názvy proměnných seškrtány, pokud překročí limit typu souboru odezvy.

U mřížkovaných souborů údajů:

* Maximální početaxisVariableJe to 2 miliardy.
Maximální početdataVariableJe to 2 miliardy.
Ale pokud má datový soubor &gt;100 proměnných, bude to obtížné pro uživatele používat.
A pokud má datový soubor více než 1 milion proměnných, bude váš server potřebovat mnoho fyzické paměti a budou zde další problémy.
* Maximální velikost každého rozměru (axisVariable) je ~2 miliardy hodnot.
* Myslím, že maximální celkový počet buněk (produkt všech rozměrů) je neomezené, ale může to být ~9e18.

U tabulkových souborů:

* Maximální početdataVariableJe to 2 miliardy.
Ale pokud má datový soubor &gt;100 proměnných, bude to obtížné pro uživatele používat.
A pokud má datový soubor více než 1 milion proměnných, bude váš server potřebovat mnoho fyzické paměti a budou zde další problémy.
* Maximální počet zdrojů (například soubory) To se dá shrnout na ~2 miliardy.
* V některých případech maximální počet řádků z jednotlivého zdroje (například soubor, ale ne databáze) je ~2 miliardy řad.
* Nemyslím si, že existují jiné hranice.

U roštových i tabulárních souborů existují určité interní limity velikosti podmnožiny, které může uživatel požadovat v jediné žádosti (často související s &gt;2 miliardy něčeho nebo ~9e18 něčeho) , ale je mnohem pravděpodobnější, že uživatel narazí na limit pro daný typ souboru.

*   NetCDFverze 3.ncsoubory jsou omezeny na 2GB bajty. (Pokud je to pro někoho opravdu problém, dejte mi vědět: Mohl bych přidat podporu proNetCDFverze 3.nc64-bitové rozšíření neboNetCDFVerze 4, která by výrazně zvýšila limit, ale ne nekonečně.) 
* Prohlížeče havarovat pouze po ~500MB dat, takžeERDDAP™omezuje odpověď na.htmlTablepožaduje ~400MB dat.
* Mnoho programů analýzy dat má podobné limity (Například, maximální velikost rozměru je často ~2 miliardy hodnot) , takže není důvod tvrdě pracovat, aby se dostali kolem omezení typu souboru.
* Limity specifické pro daný soubor jsou užitečné v tom, že brání naivním žádostem o skutečně obrovské množství údajů (Například "dejte mi celý tento soubor údajů," když má datový soubor 20TB dat) , které by trvalo týdny nebo měsíce ke stažení. Čím delší bude stahování, tím pravděpodobněji selže z různých důvodů.
* Limity specifické pro daný soubor jsou užitečné v tom, že přinutí uživatele zabývat se přiměřeně velkými podskupinami (např. řešení velkého mřížkovaného datového souboru prostřednictvím souborů s daty z jednoho časového bodu) .
         
### Přepnout na ACDD-1.3{#switch-to-acdd-13} 
My (zejména[GenerovatDatasetsXml](#generatedatasetsxml)) v současné době doporučujeme[ACDD verze 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), která byla ratifikována na počátku roku 2015 a která je v atributu globálních úmluv označována jako "ACDD-1.3." PředERDDAP™verze 1.62 (vydané v červnu 2015) ,ERDDAP™použitý/doporučený originál, verze 1.0,[NetCDFAtributová úmluva pro Discovery datových souborů](https://wiki.esipfed.org/ArchivalCopyOfVersion1)který byl označován jako "UnidataDataset Discovery v1.0" v globálních úmluvách aMetadata\\_Conventionsatributy.

Pokud vaše datové soubory používají dřívější verze ACDD, DOPORUČUJEme, že přepnete na ACDD-1.3. Není to těžké. ACDD-1.3 je vysoce zpětně kompatibilní s verzí 1.0. Přepnout pro všechny soubory dat (kroměEDDGridOdErddap a EDDTable Z dat Erddapu) :

1. Odstranit nově deprecovaný globálníMetadata\\_Conventionsatribut přidáním (nebo změnou existujícíhoMetadata\\_Conventionsatribut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
do globálního souboru údajů&lt;addAttributes&gt;.
     
2. Pokud má datový soubor atribut Konvence v globálním měřítku&lt;addAttributes&gt;, změnit vše "UnidataDataset Discovery v1.0" reference na "ACDD-1.3."
Pokud datový soubor nemá atribut Conventions v globálním měřítku&lt;addAttributes&gt;, pak přidat jeden, který odkazuje na ACDD-1.3. Například,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Pokud má datový soubor globálnístandard\\_name\\_vocabularyatribut, prosím změňte formát hodnoty například na:
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Pokud je odkaz na starší verzi[Standardní tabulka názvu CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). je pravděpodobně dobrý nápad přejít na aktuální verzi (65, jak to píšeme) , Vzhledem k tomu, že nové standardní názvy jsou přidány do této tabulky s následnými verzemi, ale staré standardní názvy jsou zřídka deprekovány a nikdy odstraněny.
     
4. I když ACDD-1.0 zahrnoval globální atributy procreator\\_name,creator\\_email,creator\\_url,[GenerovatDatasetsXml](#generatedatasetsxml)automaticky je přidal až někdy kolemERDDAP™v1.50. Jedná se o důležité informace:
        
    *   creator\\_namedává uživatelům vědět / citovat tvůrce datového souboru.
    *   creator\\_emailsdělí uživatelům preferovanou e-mailovou adresu pro kontaktování tvůrce datového souboru, například pokud mají otázky týkající se datového souboru.
    *   creator\\_urldává uživatelům způsob, jak zjistit více o tvůrce.
    *   ERDDAP™všechny tyto informace využívá při vytváření dokumentů o metadatech FGDC a ISO 19115-2/19139 pro každý datový soubor. Tyto dokumenty často používají externí vyhledávací služby.
    
Přidejte prosím tyto atributy do globálního souboru dat&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
To je ono. Doufám, že to nebylo tak těžké.
     
### Zarr{#zarr} 
Od verze 2.25ERDDAP™může číst místní Zarr soubory pomocí[EDDTableFromNcFiles](#eddtablefromncfiles)a[EDDGridFromNcFiles](#eddgridfromncfiles).

 (Od srpna 2019) Snadno se můžeme mýlit, ale ještě nejsme přesvědčeni, že[Zarr](https://github.com/zarr-developers/zarr-python), nebo podobné systémy, které rozbíjejí datové soubory do menších částí, jsou skvělá řešení problémuERDDAP™čtení dat uložených v cloudových službách jako Amazon AWS S3. Zarr je skvělá technologie, která ukázala svou užitečnost v různých situacích, jen si nejsme jisti, žeERDDAP+S3 bude jednou z těchto situací. Hlavně říkáme, že než se pokusíme uložit všechna data do Zarru, uděláme nějaké testy, abychom zjistili, jestli je to skutečně lepší řešení.

Problémy s přístupem k datům v cloudu jsou latence (zpoždění na první získání údajů) a přístup na úrovni souborů (spíše než blokový přístup) . Zarr řeší problém přístupu na úrovni souborů, ale s latencí nic nedělá. Ve srovnání s pouhým stažením souboru (takže lze číst jako místní soubor s přístupem na úroveň bloku) , Zarr může dokonce zhoršit problém latence, protože se Zarr, čtení souboru nyní zahrnuje řadu několika volání číst různé části souboru (každý s vlastním zpožděním) . Problém latence lze vyřešit paralelizací požadavků, ale to je řešení vyšší úrovně, které není závislé na Zarr.

A se Zarr (jako u relačních databází) , ztratíme pohodlí mít datový soubor je jednoduchý, jediný soubor, který můžete snadno ověřit integritu, nebo provést / stáhnout kopii.

ERDDAP™  (od v2) má systém pro udržování lokální cache souborů ze zdroje URL (např. S3) (viz [&lt;cacheFromUrl&gt; a&lt;cacheMaxGB&gt;] (#Cachefromurl) ). A nový [&lt;nThreads&gt;] (# nitra) by měl minimalizovat problém latence paralelizací vyhledávání dat na vysoké úrovni.&lt;cacheFromUrl&gt; se zdá, že pracuje velmi dobře pro mnoho scénářů. (Nejsme si jistí, jak prospěšné&lt;nThreads&gt; je bez dalších zkoušek.) Připouštíme, že jsme neudělali časové testy na AWS instance s dobrým síťovým připojením, ale úspěšně jsme testovali s různými vzdálenými URL zdroji souborů. AERDDAP's&lt;cacheFromUrl&gt; pracuje s jakýmkoli typem datového souboru (např..nc,.hdf, .csv,.jsonlCSV) , i když externě komprimované (např..gz) , bez jakýchkoli změn souborů (Například je přepisuje jako sbírky Zarr) .

Je pravděpodobné, že různé scénáře upřednostní různá řešení, např., stačí si přečíst část souboru jednou (Zarr vyhraje.) , vs. potřeba číst celý soubor jednou, vs. potřeba číst část nebo celý soubor opakovaně (&lt;cacheFromUrl&gt; vyhraje).

Hlavně říkáme, že než se pokusíme uložit všechna data do Zarru, uděláme nějaké testy, abychom zjistili, jestli je to skutečně lepší řešení.

- - -
## Seznam datových souborů typu{#list-of-types-datasets} 
Pokud potřebujete pomoci vybrat správný typ datového souboru, viz[Výběr typu datové sady](#choosing-the-dataset-type).

Typy souborů dat spadají do dvou kategorií. ([Proč?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)Datové soubory zvládají datovaná data.
    * InEDDGriddatové soubory, datové proměnné jsou multidimenzionální pole dat.
    * Pro každý rozměr musí existovat proměnná osy. Proměnné osy MUSÍ být specifikovány v pořadí, v jakém je datové proměnné používají.
    * InEDDGridSoubory údajů, všechny datové proměnné MUSÍ používat (podíl) všechny proměnné osy.
         ([Proč?](#why-just-two-basic-data-structures) [Co když ne?](#dimensions)) 
    * Vytříděné hodnoty rozměrů - CelkemEDDGridSoubory údajů, každý rozměr musí být v seřazeném pořadí (vzestupně nebo sestupně) . Každý může být nepravidelně mezerný. Nejsou žádné vazby. To je požadavek[Standard metadat CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Pokud hodnoty jakéhokoli rozměru nejsou v seřazeném pořadí, soubor dat se nenačte aERDDAP™určí první netříděnou hodnotu v souboru záznamu, *velkýRodič rodičů* /logs/log.txt .
        
Několik podtříd má další omezení (zejména,EDDGridAgregátExistingDimension vyžaduje, aby vnější (nejlevější, první) rozměr byl vzestupný.
        
Netříděné hodnoty rozměrů téměř vždy indikují problém se zdrojovým souborem. To se nejčastěji vyskytuje, když je do agregace zahrnut chybný nebo nevhodný soubor, což vede k netříděné časové dimenzi. Pro vyřešení tohoto problému viz chybová zpráva vERDDAP™log.txt soubor k nalezení urážlivé časové hodnoty. Pak se podívejte do zdrojových souborů najít odpovídající soubor (nebo jeden před nebo jeden po) To nepatří do agregace.
        
    * Viz podrobnější popis[EDDGriddatový model](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * TheEDDGridTypy údajů jsou:
        *   [EDDGridFromAudioFiles](#eddfromaudiofiles)shromažďuje data ze skupiny místních audio souborů.
        *   [EDDGridFromDap](#eddgridfromdap)zpracovává roštová data zDAPservery.
        *   [EDDGridOdEDDTable](#eddgridfromeddtable)umožňuje převést tabulkový soubor do mřížkového souboru.
        *   [EDDGridFromErddap](#eddfromerddap)zvládá mřížkovaná data ze vzdálenéhoERDDAP.
        *   [EDDGridOdEtopa](#eddgridfrometopo)jen zpracovává vestavěná data ETOPO topography.
        *   [EDDGridFromFiles](#eddgridfromfiles)je supertřída všechEDDGridZ... tříd.
        *   [EDDGridZ MergeIRFiles](#eddgridfrommergeirfiles)Sčítání údajů ze skupiny místních MergeIR.gzSložky.
        *   [EDDGridFromNcFiles](#eddgridfromncfiles)Údaje o agregátech ze skupiny místníchNetCDF  (V3 nebo v4)  .nca související soubory.
        *   [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked)je varianta, pokudEDDGridFromNcFiles, které také hromadí data ze skupiny místníchNetCDF  (V3 nebo v4)  .nca související soubory, kteréERDDAP™Vybaluje na nízké úrovni.
        *   [EDDGridLonPM180](#eddgridlonpm180)mění hodnoty délky dítěteEDDGridtakže jsou v rozmezí -180 až 180.
        *   [EDDGridLon0360](#eddgridlon0360)mění hodnoty délky dítěteEDDGridtakže jsou v rozmezí 0 až 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)agregáty dvě nebo víceEDDGridÚdaje bok po boku.
        *   [EDDGridAgregátExistujícíRozměr](#eddgridaggregateexistingdimension)agregáty dvě nebo víceEDDGriddatové soubory, z nichž každý má jiný rozsah hodnot pro první rozměr, ale stejné hodnoty pro ostatní rozměry.
        *   [EDDGridKopírovat](#eddgridcopy)může vytvořit místní kopii jinéhoEDDGrid's daty a slouží data z místní kopie.
             
    * VšechnyEDDGridSoubory dat podporují nastavení nThreads, které říkáERDDAP™kolik vláken použít při reakci na žádost. Viz[nThreads](#nthreads)dokumentace pro podrobnosti.
         
### EDDTabulka{#eddtable} 
*   [ **EDDTabulka** ](#eddtable)Soubory dat zpracovávají tabulární data.
    * Tabulková data mohou být reprezentována jako databázová tabulka s řádky a sloupcemi. Každý sloupec (datové proměnné) má název, soubor atributů a ukládá pouze jeden typ dat. Každá řada má postřeh (nebo skupina souvisejících hodnot) . Zdroj dat může mít data v jiné datové struktuře, složitější datové struktuře a/nebo více datových souborů, aleERDDAP™musí být schopna srovnat zdrojová data do tabulky podobné databázi, aby bylo možné prezentovat data jako soubor tabulek uživatelůmERDDAP.
    * Viz podrobnější popis[Datový model EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * Typy souborů údajů EDDTable jsou:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets)je datový soubor vyšší úrovně, který má informace o všech ostatních datových souborech ve vašemERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)agreguje data z čárkových, tabulkových, středníkových nebo mezerně oddělených datových souborů ASCII.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice)je supertřída všech EDDTableFromAsciiService... tříd.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)zpracovává údaje z některýchNOAANOS webové služby.
        *   [EDDTableFromAudioFiles](#eddfromaudiofiles)shromažďuje data ze skupiny místních audio souborů.
        *   [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles)agreguje data ze sady automatických počasí (AWS) XML soubory.
        *   [EDDTableFromCassandra](#eddtablefromcassandra)zpracovává tabulková data z jedné Cassandry tabulky.
        *   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)shromažďuje data z tabulkových datových souborů ASCII s datovými sloupy s pevnou šířkou.
        *   [EDDTableFromDapSekvence](#eddtablefromdapsequence)zpracovává tabulární data zDAPsekvenční servery.
        *   [EDDtableFromDatabase](#eddtablefromdatabase)zpracovává tabulková data z jedné tabulky databáze.
        *   [EDDTableFromEDDGrid](#eddtablefromeddgrid)umožňuje vytvořit soubor EDDTable zEDDGridSoubor dat.
        *   [EDDTableFromErddap](#eddfromerddap)zpracovává tabulková data ze vzdálenéhoERDDAP.
        *   [EDDTableFromFileNames](#eddtablefromfilenames)vytváří soubor dat z informací o skupině souborů v systému souborů serveru, ale nepodává data zevnitř souborů.
        *   [EDDTableFromFoles](#eddtablefromfiles)je supertřída všech EDDTableFrom...Files třídy.
        *   [EDDTableFromHttpGet](#eddtablefromhttpget)jeERDDAP'je pouze systém pro import dat a export dat.
        *   [EDDTableFromHyraxSoubory](#eddtablefromhyraxfiles)  (ODCHYLKY) kumuluje data ze souborů s několika proměnnými se sdílenými rozměry poskytovanými[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFromNeplatnéCRAFile](#eddtablefrominvalidcrafiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory, které používají specifický, neplatný, varianta CF DSG Contiguous Ragged Array (CRA) Složky. I kdyžERDDAP™podporuje tento typ souboru, je to neplatný typ souboru, který by nikdo neměl používat. Skupiny, které v současné době používají tento typ souboru, jsou důrazně vybízeny k používáníERDDAP™generovat platné soubory CF DSG CRA a přestat používat tyto soubory.
        *   [EDDTableFromJsoniCSVFiles](#eddtablefromjsonlcsvfiles)Údaje z agregátů[JSON Řádky CSV souborů](https://jsonlines.org/examples/).
        *   [EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory s několika proměnnými se sdílenými rozměry.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory s několika proměnnými se sdílenými rozměry. Je v pořádku pokračovat v používání tohoto datového souboru pro stávající datové soubory, ale pro nové datové soubory doporučujeme použít místo toho EDDTableFromMultidimNcFiles.
        *   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory, které používají jeden ze formátů souborů uvedených v[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvence. Ale pro soubory používající jednu z multidimenzionálních CF DSG variant, použijte[EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Místo toho.
        *   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)Údaje z agregátů[NCCSV](/docs/user/nccsv-1.00)ASCII .csv soubory.
        *   [EDDTableFromNOS](#eddtablefromnos)  (ODCHYLKY) zpracovává tabulková data z NOS XML serverů.
        *   [EDDTableFromOBIS](#eddtablefromobis)zpracovává tabulková data ze serverů OBIS.
        *   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)zpracovává údaje od[Parket](https://parquet.apache.org/).
        *   [EDDTableFromSOS](#eddtablefromsos)zpracovává tabulární data zSOSservery.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (ODCHYLKY) kumuluje data ze souborů s několika proměnnými se sdílenými rozměry poskytovanými[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTableFromWFSSoubory](#eddtablefromwfsfiles)  (ODCHYLKY) vytvoří místní kopii všech údajů zArcGISMapServerWFSserver, takže data pak mohou být rychle re-servedERDDAP™uživatelé.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)může vytvořit soubor EDDTable ze skupiny datových souborů EDDTable.
        *   [EDDtableCopy](#eddtablecopy)může vytvořit místní kopii mnoha typů souborů údajů EDDTable a pak rychle re-serve dat z místní kopie.

  
- - -

## Podrobné popisy typů datových souborů{#detailed-descriptions-of-dataset-types} 

### EDDGridFromDap{#eddgridfromdap} 
[ **EDDGridFromDap** ](#eddgridfromdap)zpracovává proměnné sítě z[DAP](https://www.opendap.org/)servery.

* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Můžete shromáždit informace, které potřebujete k vylepšení, nebo vytvořit vlastní XML proEDDGridFromDap data database tím, že se podíváte na soubory DDS a DAS zdrojového souboru ve vašem prohlížeči (přidáním .das a .dds dosourceUrlNapříklad:[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap může získat data z jakékoliv multidimenzionální proměnné z aDAPdatový server. (V předchozích dílech...EDDGridFromDap byl omezen na proměnné označené jako "grid," ale to již není požadavek.)   
     
* Vytříděné hodnoty rozměrů - Hodnoty pro každý rozměr MUSÍ být v seřazeném pořadí (vzestupně nebo sestupně) . Hodnoty mohou být nepravidelně rozloženy. Nejsou žádné vazby. To je požadavek[Standard metadat CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Pokud hodnoty jakéhokoli rozměru nejsou v seřazeném pořadí, soubor dat se nenačte aERDDAP™určí první netříděnou hodnotu v souboru záznamu, *velkýRodič rodičů* /logs/log.txt .
    
Netříděné hodnoty rozměrů téměř vždy indikují problém se zdrojovým souborem. To se nejčastěji vyskytuje, když je do agregace zahrnut chybný nebo nevhodný soubor, což vede k netříděné časové dimenzi. Pro vyřešení tohoto problému viz chybová zpráva vERDDAP™log.txt soubor k nalezení urážlivé časové hodnoty. Pak se podívejte do zdrojových souborů najít odpovídající soubor (nebo jeden před nebo jeden po) To nepatří do agregace.
    
#### EDDGridFromDap kostra XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridOdEDDTable{#eddgridfromeddtable} 
[ **EDDGridOdEDDTable** ](#eddgridfromeddtable)umožňuje převést soubor tabulky EDDTable do souboruEDDGridSouřadnice dat. Pamatuj si to.ERDDAP™považuje soubory údajů za buď[Souřadnice dat (podtřídyEDDGrid) nebo soubor tabulkových dat (podtřídy EDDTable) ](#why-just-two-basic-data-structures).

* Normálně, pokud máte nastavená data, stačí nastavitEDDGridDatabáze přímo. Někdy to není možné, například když máte data uložená v relační databázi, kteráERDDAP™lze přistupovat pouze přes EDDTableFromDatabase.EDDGridZ třídy EDDTable vám umožní tuto situaci napravit.
     
* Je zřejmé, že údaje v podkladovém souboru EDDTable musí být (v podstatě) datová pole, ale v tabulkové formě. Databáze EDDTable může mít například data CDD: měření východního a severního proudu, v několika hloubkách, několikrát. Vzhledem k tomu, že hloubky jsou v každém bodě stejné,EDDGridFromEDDTable může vytvořit roštový soubor s časem a rozměrem hloubky, který přístup k datům prostřednictvím základního datového souboru EDDTable.
     
* Generovat soubory dat Xml... Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Můžete shromáždit informace, které potřebujete ke zlepšení hrubého návrhu.
     
* Zdrojové atributy -- Stejně jako u všech ostatních typů souborů údajů,EDDGridFromTable má představu, že existují globální zdrojAttributes a[globálníaddAttributes](#global-attributes)  (uvedené vdatasets.xml) , které jsou kombinovány pro globální kombinaci Atributy, které uživatelé vidí. Pro globální zdrojAttributy,EDDGridFromEDDTable používá globální kombinaci Atributy podkladového souboru EDDTable. (Když se nad tím chvíli zamyslíš, dává to smysl.) 
    
Podobně, pro každýaxisVariable's adataVariable's[addAttributes](#addattributes),EDDGridFromEDDTable používá kombinaci proměnné Atributy základního datového souboru EDDTable jakoEDDGridOd zdroje EDDTable proměnnéAttributy. (Když se nad tím chvíli zamyslíš, dává to smysl.) 
    
V důsledku toho, pokud má EDDTable dobrá metadata,EDDGridFromEDDTable často potřebuje velmi máloaddAttributesMetadata -- jen pár vylepšení sem a tam.
    
*   dataVariables versusaxisVariables -- Základní EDDTable má pouzedataVariables. AnEDDGridSoubor dat z EDDTable bude mít některéaxisVariableán (vytvořeno z některé z EDDTabledataVariableán) a některédataVariableán (vytvořen ze zbývajícího EDDTabledataVariableán) .[GenerovatDatasetsXml](#generatedatasetsxml)bude hádat, o který EDDTabledataVariablesEDDGridOdEDDTableaxisVariableAle je to jen odhad. Musíte upravit výstup GenerateDatasetsXml, abyste určili, kterýdataVariables se staneaxisVariables, a v jakém pořadí.
     
* OsaValues -- Není nic o podkladovém EDDTable říctEDDGridOdEDDTable možné hodnotyaxisVariables v roštové verzi datového souboru, takže musíte poskytnout tyto informace pro každýaxisVariablepřes jeden z těchto atributů:
    
    * osaValues -- umožňuje zadat seznam hodnot. Například,
        &lt;att name="axisValues"[type="doubleList"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/att &gt;
Všimněte si použití[datový typ](#data-types)plus slovo List. Také typ seznamu (například dvojitá) , MUSÍ odpovídat údajům Typ proměnné v EDDTable aEDDGridZ dat EDDTable.
    * osaValuesStartStrideStop -- umožňuje zadat posloupnost pravidelně rozložených hodnot zadáním start, krok a stop hodnot. Zde je příklad, který odpovídá příkladu osValues výše:
        &lt;att name="axisValuesStartStrideStop"[type="doubleList"](#attributetype)\\&gt;2, 0, 5, 4&lt;/att &gt;
Znovu si všimněte použití datového typu seznamu. Také typ seznamu (například dvojitá) , MUSÍ odpovídat údajům Typ proměnné v EDDTable aEDDGridZ dat EDDTable.
         
    
Aktualizace... Stejně jako neexistuje žádná možnost proEDDGridFromEDDTable pro stanovení osValues z EDDTable zpočátku neexistuje spolehlivý způsob proEDDGridFromEDDTable to determine from the EDDTable when the axisValues have changed (zejména pokud existují nové hodnoty časové proměnné) . V současné době je jediným řešením změna atributu OsaValues vdatasets.xmla znovu načíst data. Například, můžete napsat scénář
    
    1. Hledatdatasets.xmlmísto
        datasetID=" *theDatasetID* "
Takže pracujete se správným souborem dat.
    2. Hledatdatasets.xmlpro další výskyt
        <sourceName> *VariablesSourceName* </sourceName>  
Takže pracujete se správnou proměnnou.
    3. Hledatdatasets.xmlpro další výskyt
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
takže znáte výchozí pozici značky.
    4. Hledatdatasets.xmlpro další výskyt
```
        </att>  
```
takže znáte konečnou polohu hodnot osy.
    5. Nahradit starý start, krok, zastavit hodnoty s novými hodnotami.
    6. Kontaktujte[URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)pro soubor údajů, který má sdělitERDDAP™znovu načíst soubor údajů.
    
Není to ideální, ale funguje to.
     
* přesnost... Kdy?EDDGridFromEDDTable reaguje na požadavek uživatele na data, přenáší řádek dat z tabulky odezvy EDDTable do tabulkyEDDGridreakční síť. Aby to bylo možné, musí zjistit, zda hodnoty "osy" v daném řádku tabulky odpovídají kombinaci hodnot osy v mřížkě. Pro celé datové typy je snadné určit, zda jsou dvě hodnoty stejné. Ale pro plováky a dvojité, to přináší hrozný problém plovoucí bod čísla[přesně neodpovídá](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (například 0,2 versus 0.199999999999996) . Do (pokusit se) Vypořádej se s tím.EDDGridFromTable umožňuje určit atribut přesnosti pro některý zaxisVariables, který určuje celkový počet desetinných čísel, které musí být totožné.
    * Například,&lt;att name="precision" type="int [51]5&lt;/att &gt;
    * Pro různé typy datových proměnných existují různé výchozí přesné hodnoty. Výchozí hodnoty jsou obvykle vhodné. Pokud nejsou, musíte určit různé hodnoty.
    * ProaxisVariable, které jsou[čas nebo čas Proměnné známky](#timestamp-variables), výchozí je plná přesnost (přesná shoda) .
    * ProaxisVariables, které jsou plováky, výchozí přesnost je 5.
    * ProaxisVariables, které jsou dvojité, výchozí přesnost je 9.
    * ProaxisVariables, které mají celé datové typy,EDDGridFromEDDTable ignoruje přesný atribut a vždy používá plnou přesnost (přesná shoda) .
         
    *    **Varování&#33;** Při konverzi kusu tabulárních dat na kus mřížkovaných dat, pokudEDDGridFromEDDTable nemůže shodovat hodnotu "osy" eddTable s jednou z očekávanýchEDDGridhodnoty osy EDDTable,EDDGridOdEDDTable tiše (žádná chyba) vyhodí data z této řádky tabulky. Například mohou existovat jiné údaje (není na síti) v souboru EDDTable. (A pokud krok &gt; 1, není zřejmé, žeEDDGridOdTable, které hodnoty osy jsou požadované hodnoty a které jsou ty, které mají být přeskočeny kvůli kroku.) Takže pokud jsou přesné hodnoty příliš vysoké, uživatel uvidí chybějící hodnoty v odezvě na data, pokud skutečně existují platné hodnoty dat.
        
Naopak, pokud jsou hodnoty přesnosti nastaveny příliš nízko, hodnoty "osy" eddTable, které by neměly odpovídatEDDGridOd EDDTable hodnoty osy budou (chybně) shoda.
        
Tyto potenciální problémy jsou hrozné, protože uživatel dostane špatná data (nebo chybějící hodnoty) kdy by měli získat správné údaje (nebo alespoň chybová zpráva) .
Tohle není chyba.EDDGridZ tabulky.EDDGridFromTable tento problém nevyřeší. Problém spočívá v převodu tabulkových dat na roštovaná data (Ledaže by bylo možné učinit jiné předpoklady, ale tady je udělat nelze.) .
Je to na tobě.ERDDAP™správce **Vyzkoušejte siEDDGridOdEDDTable důkladně** zajistit, aby byly stanoveny přesné hodnoty, aby se zabránilo těmto potenciálním problémům.
        
#### gapThreshold{#gapthreshold} 
*   [gapThreshold](#gapthreshold)-- Toto je velmi neobvyklý typ datového souboru. Vzhledem k tomu, typy dotazů, které mohou být provedeny na (Vyřešeno) aEDDGridSoubor údajů (v souvislosti s rozsahy a krokyaxisVariableán) jsou velmi odlišné od typů dotazů, které mohou být provedeny na (Vyřešeno) soubor údajů EDDTable (jen souvisí s rozsahy některých proměnných) , výkonEDDGridZ údajů EDDTable se budou značně lišit v závislosti na přesné žádosti, která je podána, a rychlosti základního souboru EDDTable. Pro žádosti, které mají postupnou hodnotu &gt; 1,EDDGridFromEDDTable může požádat o poměrně velký kus dat o podkladovém EDDTable (jako kdyby stride=1) a pak prosévat výsledky, uchovávat data z některých řádků a vyhazovat data od ostatních. Pokud bude muset prosít hodně dat, aby získal data, která potřebuje, bude žádost trvat déle.
    
PokudEDDGridOdEDDTable může říci, že tam budou velké mezery (s řádky nežádoucích údajů) mezi řádky s požadovanými údaji,EDDGridFromEDDTable se může rozhodnout, že provede několik dílčích žádostí k podkladovému EDDTable namísto jedné velké žádosti, čímž přeskočí nežádoucí řádky dat ve velkých mezerách. Citlivost pro toto rozhodnutí je kontrolována mezerouThreshold hodnota, jak je uvedeno v&lt;gapThreshold&gt; tag (výchozí=1000 řádků zdrojových dat) . Nastavení mezeryThreshold na menší číslo povede k vytvoření datového souboru (obecně) Další žádosti. Nastavení mezeryThreshold k většímu počtu povede k vytvoření datového souboru (obecně) Méně žádostí.
    
Pokud je mezeraThreshold nastavena příliš malá,EDDGridFromEDDTable bude fungovat pomaleji, protože nadmořská výška více požadavků bude větší než čas uložený získáním některých přebytečných dat. Je-li mezeraThreshold je nastaven příliš velký,EDDGridFromEDDTable bude fungovat pomaleji, protože z EDDTable budou vyčerpána tolik přebytečných dat, jen aby byla vyřazena. (Jak Goldilocks objevil, uprostřed je "právě.") Nadmořská výška pro různé typy datových souborů EDDTable se značně liší, takže jediný způsob, jak znát aktuální nejlepší nastavení vašeho datového souboru, je prostřednictvím experimentování. Ale nezajdeš příliš daleko, když se budeš držet výchozí hodnoty.
    
Jednoduchý příklad je: Představte siEDDGridOdTable pouze s jednímaxisVariable  (čas, o velikosti 100000) , jednadataVariable  (teplota) , a výchozí mezeraThreshold 1000.
    
    * Pokud uživatel požaduje teplotu\\[0&#58;100&#58;5000\\], krok je 100, takže velikost mezery je 99, což je méně než mezeraThreshold. Takže...EDDGridOdTable bude pouze jeden požadavek na EDDTable pro všechny údaje potřebné pro žádost (odpovídá teplotě\\[0:5000\\]) a zahodit všechny řádky dat, které nepotřebuje.
    * Pokud uživatel požaduje teplotu\\[0:2500:5000\\], že krok je 2500 takže velikost mezery je 2499, což je větší než mezeraThreshold. Takže...EDDGridFromTable bude podávat samostatné požadavky na EDDTable, které odpovídají teplotě\\[0\\], teplota\\[2500\\], teplota\\[5000\\].
    
Výpočet velikosti mezery je složitější, pokud existuje více os.
    
Pro každou žádost uživatele:EDDGridFromEDDTable tiskne diagnostické zprávy související s tímto v[log.txt](/docs/server-admin/additional-information#log)Složka.
    
    * Pokud [&lt;LogLevel &gt;] (#loglevel) vdatasets.xmlje nastaven na info, to vytiskne zprávu jako
\\* nOuterAxes=1 of 4 nOuterRequests=22
Pokud nOuterAxes=0, gapThreshold nebyl překročen a pouze jedna žádost bude podána do EDDTable.
Pokud nOuterAxes&gt;0, gapThreshold byl překročen a nOuterRequests budou provedeny do EDDTable, což odpovídá každé požadované kombinaci nejlevějších nOuterAxes. Například pokud má datový soubor 4axisVariables adataVariableJako na východ.\\[čas\\]\\[zeměpisná šířka\\]\\[zeměpisná délka\\]\\[hloubka\\], nejlevější (první) Osová proměnná je čas.
    * Pokud&lt;logLevel &gt; vdatasets.xmlje nastaven na všechny, další informace jsou zapsány do log.txt souboru.
         
#### EDDGridZ EDDTable kostry XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* fromERDDAP {#eddfromerddap} 
 **EDDGridFromErddap** zvládá mřížkovaná data ze vzdálenéhoERDDAP™server.
 **EDDTableFromErddap** zpracovává tabulková data ze vzdálenéhoERDDAP™server.

*   EDDGridFromErddap a EDDTableFromErddap se chovají odlišně od všech ostatních typů souborů dat vERDDAP.
    * Stejně jako ostatní typy souborů dat, i tyto soubory dat získávají informace o datovém souboru ze zdroje a uchovávají jej v paměti.
    * Stejně jako jiné typy souborů údajů, kdyžERDDAP™vyhledávání souborů dat, zobrazení formuláře pro přístup k datům ( *datasetID* .html) , nebo zobrazí formulář Make A Graph ( *datasetID* .graph) ,ERDDAP™používá informace o datovém souboru, který je v paměti.
    *   EDDGridOdErddap a EDDTable FromErddap jsou základem pro[mřížky/klastry/federace](/docs/server-admin/scaling)zERDDAPs, která efektivně distribuuje využití procesoru (převážně pro vytváření map) , využití paměti, ukládání dat a využití pásma velkého datového centra.
#### Přesměrování{#redirect} 
* Na rozdíl od jiných typů souborů údajů, kdyERDDAP™přijímá žádost o údaje nebo obrázky z těchto souborů údajů,ERDDAP [přesměrování](https://en.wikipedia.org/wiki/URL_redirection)požadavek na ovladačERDDAP™server. Výsledkem je:
    * Tohle je velmi efektivní. (CPU, paměť a šířka pásma) , protože jinak
        1. KompozitERDDAP™musí zaslat žádost druhé osoběERDDAP™  (Což zabere čas.) .
        2. DruhýERDDAP™musí získat data, přeformátovat je a předat data kompozitu.ERDDAP.
        3. KompozitERDDAP™musí přijímat údaje (pomocí šířky pásma) , přeformátovat ji (pomocí procesoru a paměti) , a předat data uživateli (pomocí šířky pásma) . Přesměrováním žádosti a umožněním druhéERDDAP™zaslat odpověď přímo uživateli, složenémuERDDAP™V podstatě netráví čas, paměť nebo šířku pásma na žádost.
    * Přesměrování je transparentní pro uživatele bez ohledu na klientský software (prohlížeč nebo jiný software nebo nástroj příkazového řádku) .
*   [You can tellERDDAP™](#redirect)nepřesměrovat žádné uživatelské požadavky nastavením&lt;přesměrování&gt;false&lt;/redirect&gt;, ale to neguje většinu výhod datového souboru ...FromErddap (zejména rozptyl zatížení na předním konciERDDAP™na vzdálený/zádajERDDAP) .
         
     
#### Předplatné{#subscriptions} 
Normálně, kdyžEDDGridOdErddap a EDDTable OdErddap jsou (re) nabitý na vašemERDDAP, se snaží přidat předplatné do vzdáleného datového souboru prostřednictvím vzdálenéhoERDDAP's e-mailem / URL předplatné systém. Tak, kdykoli se vzdálený soubor změní, je vzdálenýERDDAP™kontaktujte[setDataset URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)na VašemERDDAP™tak, aby byl místní datový soubor znovu načten ASAP a aby byl místní datový soubor vždy dokonale aktualizován a napodoboval vzdálený datový soubor. Takže, když se to stane poprvé, měli byste dostat e-mail, který požaduje, abyste potvrdili předplatné. Nicméně, pokud místníERDDAP™nelze poslat e-mail nebo pokud ovladačERDDAP's e-mailem / URL předplatné systém není aktivní, měli byste e-mailem vzdálenéERDDAP™správce a požádat, aby s/he ručně přidat [&lt;oZměnit&gt;] (#Změnit) ...&lt;/onChange&gt; značky na všechny příslušné soubory dat volat soubor dat[setDataset URL vlajky](/docs/server-admin/additional-information#set-dataset-flag). Podívejte se.ERDDAP™denní report pro seznam setuDataset Vlajka URL, ale jen poslat ty proEDDGridFromErddap a EDDTableFromErddap soubory do vzdálenéhoERDDAP™Správce.
    
Nefunguje to? Nezůstávají vaše lokální data v synchronizaci se vzdálenými soubory dat?
Několik věcí musí fungovat správně, aby tento systém fungoval tak, aby vaše datové soubory zůstaly aktuální. Zkontrolujte každou z těchto věcí v pořadí:
    
    1. VašeERDDAP™musí být schopen odesílat e-maily. Viz nastavení e-mailu ve vašem nastavení.xml.
    2. Obecně (ale ne vždy) , vašeERDDAP's&lt;baseUrl&gt; a&lt;baseHttpsUrl &gt; nesmí mít číslo portu (např.: 8080, :8443) . Pokud ano, použijte[proxypass](/docs/server-admin/deploy-install#proxypass)k odstranění přístavu z Urlu.
    3. Ve vašem nastavení.&lt;screenToRemoteErddapDataset&gt; musí být nastaven na true.
    4. Když váš místní EDD... FromErddap soubor je znovu načten, měl by poslat žádost na vzdálenýERDDAP™k odběru vzdáleného datového souboru. Podívejte se do log.txt, jestli se to děje.
    5. Měli byste dostat e-mail a požádat vás o potvrzení žádosti o předplatné.
    6. Musíte kliknout na odkaz v tomto e-mailu potvrdit žádost o předplatné.
    7. OvladačERDDAP™by měl říci, že potvrzení bylo úspěšné. Kdykoli si můžete vyžádat e-mail ze vzdálenéhoERDDAP™se seznamem vašich předplatných. Viz formulář na *vzdálenýErddapBase Url* /erddap/subscriptions/list.html .
    8. Při změně vzdáleného souboru dat (např. získá další údaje) , ovladačERDDAP™zkuste kontaktovat vlajku URL na vašemERDDAP. Nemůžete to zkontrolovat, ale můžete se zeptat správce ovladače.ERDDAP™Zkontrolovat tohle.
    9. VašeERDDAP™musí obdržet žádost o stanovení této vlajkyURL. Podívejte se do svého log.txt pro "nastavitDatasetFlag.txt?" požadavek (án) a zjistěte, zda existuje chybová zpráva spojená s požadavky.
    10. VašeERDDAP™pak by se měl pokusit znovu načíst soubor (Možná ne hned, ale ASAP) .
         
#### Aktuální max (čas) ?{#up-to-date-maxtime} 
EDDGrid/TableFromErddap soubory dat mění své uložené informace o každém zdrojovém souboru pouze tehdy, když zdrojový soubor je["reloaded"ed](#reloadeverynminutes)a některé změny metadat (např. časová proměnnáactual\\_range) , čímž vzniká oznámení o předplatném. Pokud má zdrojový soubor data, která se často mění (například nová data každou sekundu) a používá["aktualizace"](#updateeverynmillis)systém pro zjištění častých změn základních údajů,EDDGrid/TableFromErddap nebude informován o těchto častých změnách až do dalšího souboru souborů "načíst," takžeEDDGrid/TableFromErddap nebude dokonale aktuální. Tento problém lze minimalizovat změnou zdrojového souboru&lt;reloadEveryNMinutes &gt; na menší hodnotu (60, 15?) takže existuje více oznámení o předplatném říctEDDGrid/TableFromErddap aktualizovat své informace o zdrojovém souboru.

Nebo pokud váš systém správy dat ví, kdy má zdrojový soubor nová data (např. prostřednictvím skriptu, který kopíruje datový soubor na místo) , a pokud to není super časté (např. každých 5 minut nebo méně často) Existuje lepší řešení:

1. Nepoužívejte&lt;updateEveryNMillis&gt; za účelem aktualizace zdrojového souboru.
2. Nastavit zdrojový soubor&lt;reloadEveryNMinutes &gt; na větší číslo (1440?) .
3. Ať skript kontaktuje zdrojový soubor[URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)Hned poté, co kopíruje nový datový soubor.
     

To povede k tomu, že zdrojový soubor bude dokonale aktualizován a způsobí, že vytvoří oznámení o předplatném, které bude zaslánoEDDGrid/TableFromErddap data data. To povedeEDDGrid/TableFromErddap database to be perfectly up-to-date (No, do 5 sekund po přidání nových údajů) . A vše, co bude provedeno efektivně (bez zbytečného opětovného načítání dat) .
     
#### Ne.addAttributes,axisVariablenebodataVariable {#no-addattributes-axisvariable-or-datavariable} 
Na rozdíl od jiných typů souborů dat, EDDTableFromErddap aEDDGridOdErddap soubory neumožňují globální&lt;addAttributes&gt;,&lt;axisVariable&gt; nebo&lt;dataVariable&gt; sekcedatasets.xmlpro tento datový soubor. Problém je v tom, že to by vedlo k nesrovnalosti:
    
1. Řekněme, že to bylo povoleno a vy jste přidal nový globální atribut.
2. Když se uživatel zeptáERDDAP™pro globální atributy se objeví nový atribut.
3. Ale když se uživatel zeptáERDDAP™pro datový soubor, VášERDDAP™přesměruje žádost na zdrojERDDAP. ToERDDAP™neví o novém atributu. Pokud tedy vytvoří datový soubor s metadaty, např..ncSoubor, metadata nebudou mít nový atribut.

Existují dvě pracovní skupiny:

1. Přesvědčit správce zdrojeERDDAP™provést změny, které chcete k metadatům.
2. Místo eddtableFromErddap použijte[EDDTableFromDapSekvence](#eddtablefromdapsequence). Nebo místoEDDGridFromErddap, use[EDDGridFromDap](#eddgridfromdap). Tyto typy EDD vám umožní efektivně se připojit k datovému souboru na vzdálenémERDDAP™  (ale bez přesměrování požadavků na údaje) a umožňují vám zahrnout globální&lt;addAttributes&gt;,&lt;axisVariable&gt; nebo&lt;dataVariable&gt; sekcedatasets.xml. Další rozdíl: budete se muset ručně přihlásit ke vzdálenému datovému souboru, aby soubor dat na vašemERDDAP™bude oznámeno (prostřednictvím[URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)) pokud dojde ke změnám vzdáleného datového souboru. Vytváříte tedy nový datový soubor namísto propojení se vzdáleným datovým souborem.
         
#### Ostatní poznámky{#other-notes} 
* Z bezpečnostních důvodůEDDGridOdErddap a EDDTable FromErddap nepodporuje [&lt;accessTo&gt;] (#přístupný) tag a nemůže být použit se vzdálenými soubory dat, které vyžadují přihlášení (protože používají [&lt;accessTo&gt;] (#přístupný) )... VizERDDAP's[bezpečnostní systém](/docs/server-admin/additional-information#security)za omezení přístupu k některým datům pro některé uživatele.
     
* Začneme sERDDAP™v2.10,EDDGridFromErddap a EddtableFromErddap podporu [&lt;dostupnéViaFiles&gt;] (#Accessibleviafiles) Tagu. Na rozdíl od jiných typů souborů dat je výchozí hodnota pravdivá, ale soubory datového souboru budou přístupnéViaFiles pouze v případě, že zdrojový soubor má také&lt;přístupnéViaFiles&gt; nastaveno na true.
     
* Můžete použít[Generovat soubory dat Xml program](#generatedatasetsxml)k vytvořenídatasets.xmlkus pro tento typ datového souboru. Ale tyto typy dat můžete provádět snadno ručně.
     
#### EDDGridOd kostry Erddap XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridOd kostry Erddap XML datový soubor je velmi jednoduchý, protože záměrem je pouze napodobit vzdálený datový soubor, který je již vhodný pro použití vERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap kostra XML{#eddtablefromerddap-skeleton-xml} 
* Kostra XML pro soubor EDDTableFromErddap je velmi jednoduchá, protože záměrem je pouze napodobit vzdálený soubor dat, který je již vhodný pro použití vERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridOdEtopa{#eddgridfrometopo} 
[ **EDDGridOdEtopa** ](#eddgridfrometopo)Jen slouží[ETOPO1 Global 1-Minute Gridd](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, mřížka registrovaná, binární, 2byte int: etopo1\\_ice\\_g\\_i2.zip) který je distribuován sERDDAP.

* Jen dva.datasetIDjsou podporovány proEDDGridFromEtopo, takže můžete přistupovat k datům s hodnotami délky -180 až 180, nebo k hodnotám délky 0 až 360.
* Nikdy nejsou žádné subtagy, protože data jsou již popsána v rámciERDDAP.
* Takže dvě možnosti proEDDGridZ Etopo souborů jsou (Doslova) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFromFiles{#eddgridfromfiles} 
[ **EDDGridFromFiles** ](#eddgridfromfiles)je supertřída všechEDDGridZ... tříd. Nemůžeš použítEDDGridZ Files přímo. Místo toho použijte podtříduEDDGridOdFiles pro zpracování konkrétního typu souboru:

*   [EDDGridZ MergeIRFiles](#eddgridfrommergeirfiles)zpracovává data z mřížky[MergeIR.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)Složky.
*   [EDDGridFromAudioFiles](#eddfromaudiofiles)shromažďuje data ze skupiny místních audio souborů.
*   [EDDGridFromNcFiles](#eddgridfromncfiles)zpracovává data z mřížky[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)soubory,[HDF  (v4 nebo v5)  .hdf](https://www.hdfgroup.org/)soubory,[.ncml](#ncml-files)soubory a[NetCDF  (V3 nebo v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)Složky. To může fungovat s jinými typy souborů (například BUFR) Jen jsme to neotestovali. Prosím, pošlete nám nějaké vzorky, pokud máte zájem.
*   [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked)je variantaEDDGridFromNcFiles, které zpracovává data z mřížkyNetCDF  (V3 nebo v4)  .nca související soubory, kteréERDDAP™Vybaluje na nízké úrovni.

V současné době nejsou podporovány žádné jiné typy souborů. Obvykle je však poměrně snadné přidat podporu pro jiné typy souborů. Kontaktujte nás, pokud máte požadavek. Nebo, pokud jsou vaše data ve starém formátu, ze kterého byste se chtěli odstěhovat, doporučujeme převést soubory, které mají býtNetCDFv3.ncSložky.NetCDFje široce podporovaný binární formát, umožňuje rychlý náhodný přístup k datům a je již podporovánERDDAP.

#### Z detailů souborů{#from-files-details} 
Následující informace se vztahují na všechny podtřídyEDDGridZ Files.

##### Agregace stávajícího rozměru{#aggregation-of-an-existing-dimension} 
Všechny variantyEDDGridFromFiles mohou hromadit data z místních souborů, kde každý soubor má 1 (nebo více) různé hodnoty pro nejlevější (první) rozměr, obvykle\\[čas\\], které budou shrnuty. Například, rozměry mohou být\\[čas\\]\\[výška\\]\\[zeměpisná šířka\\]\\[zeměpisná délka\\], a soubory mohou mít data pro jednoho (nebo pár) časová hodnota (án) na soubor. Výsledný datový soubor se jeví jako by všechny údaje souboru byly kombinovány. Velké výhody agregace jsou:

* Velikost souhrnné datové sady může být mnohem větší než jeden soubor může být pohodlně (~2GB) .
* Pro téměř aktuální data je snadné přidat nový soubor s nejnovějším souborem dat. Nemusíš přepisovat celý soubor.

Požadavky na agregaci jsou:
* Místní složky nemusí mít stejné.dataVariableán (podle definice v datovém souborudatasets.xml) . Databáze bude mítdataVariables definovaná vdatasets.xml. Pokud daný soubor nemá danýdataVariable,ERDDAP™přidá chybějící hodnoty podle potřeby.
* VšechnydataVariablesaxisVariables/rozměry (podle definice v datovém souborudatasets.xml) . Soubory budou shrnuty na základě prvního (nejvíce vlevo) rozměr, tříděný vzestupně.
* Každý soubor MŮŽE mít data pro jednu nebo více hodnot prvního rozměru, ale mezi soubory nemůže být žádné překrytí. Pokud má soubor více než jednu hodnotu pro první rozměr, hodnoty MUSÍ být tříděny vzestupně, bez vazeb.
* Všechny soubory musí mít přesně stejné hodnoty pro všechny ostatní rozměry. Přesnost zkoušky určuje[zápasAxisNDigits](#matchaxisndigits).
* Všechny soubory musí mít úplně stejné.[jednotky](#units)metadata pro všechnyaxisVariables adataVariables. Pokud je problém, můžete být schopni použít[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)Napravit problém.
         
##### Agregace prostřednictvím názvů souborů nebo globálních metadat{#aggregation-via-file-names-or-global-metadata} 
Všechny variantyEDDGridFromFiles může také agregovat skupinu souborů přidáním nového levičáku (první) rozměr, obvykle čas, na základě hodnoty odvozené z každého názvu souboru nebo z hodnoty globálního atributu, který je v každém souboru. Například název souboru může obsahovat časovou hodnotu dat v souboru.ERDDAP™pak vytvoří novou časovou dimenzi.

Na rozdíl od podobné funkce v THREDDS,ERDDAP™vždy vytvoříaxisVariables číselnými hodnotami (podle požadavků CF) , nikdy String hodnoty (které nejsou povoleny CF) . Také,ERDDAP™bude třídit soubory v agregace na základě číselnéaxisVariablehodnota, která je přiřazena každému souboru, takže proměnná osy bude mít vždy tříděné hodnoty, jak požaduje CF. Přístup THREDDS k provedení lexikografického typu na základě názvů souborů vede k agregace, kde hodnoty osy nejsou tříděny (který není povolen CF) pokud názvy souborů třídí jinak než odvozenáaxisVariablehodnoty.

Nastavit jednu z těchto agregace vERDDAP™, budete definovat nový levý nejvíce (první)  [axisVariable](#axisvariable)se speciálním pseudo&lt;sourceName&gt;, který říkáERDDAP™kde a jak najít hodnotu nového rozměru z každého souboru.

* Formát pseudosourceNamekterá získává hodnotu z názvu souboru (jen filename.ext) je
    \\*\\*\\ *název souboru,* [údaje Typ](#data-types) *,* extraktRegex *,* ZachytitSkupinovéČíslo*
* Formát pseudosourceNamekterá získá hodnotu z absolutního jména cesty souboru je
    \\*\\*\\ *název cesty,* [údaje Typ](#data-types) *,* extraktRegex *,* ZachytitSkupinovéČíslo*
    \\[Pro to, název cesty vždy používá'/'jako znak oddělovače adresáře, nikdy '\\'.\\]
* Formát pseudosourceNamekterý získává hodnotu z globálního atributu je
    \\*\\*\\ *globální:* atribut Název *,* [údaje Typ](#data-types) *,* extraktRegex *,* ZachytitSkupinovéČíslo*
* Tento pseudosourceNamevolba funguje jinak než ostatní: místo vytvoření nového levičáku (první)  axisVariable, to nahrazuje hodnotu prouduaxisVariables hodnotou získanou z názvu souboru (jen filename.ext) . Formát je
    \\*\\*\\ *nahradit FromFileName,* [údaje Typ](#data-types) *,* extraktRegex *,* ZachytitSkupinovéČíslo*
     

Popisy částí, které potřebujete poskytnout, jsou:

*    *atribut Název* -- název globálního atributu, který je v každém souboru a který obsahuje rozměrovou hodnotu.
*    *údaje Typ* -- To určuje datový typ, který bude použit k ukládání hodnot. Viz standardní seznam[údaje Typy](#data-types)žeERDDAP™podporuje, kromě toho, že String zde není povolen, protože proměnné osy vERDDAP™nemůže být String proměnné.
    
Existuje další pseudodataType, timeFormat= *řetězec TimeFormat* , který říkáERDDAP™že hodnota je String timeStamp[jednotky vhodné pro časy strun](#string-time-units). Ve většině případů, stringTimeFormat budete potřebovat bude změna jednoho z těchto formátů:
    
    *   yyyy-MM-dd"T'HH:mm:ss.SSSZ -- která ISO 8601:2004 (E) formát času data. Možná budete potřebovat zkrácenou verzi, např.yyyy-MM-ddT'HH:mm:ss neboyyyy-MM-dd.
    * rrrrMMddHHmmss.SSS -- což je kompaktní verze formátu data ISO 8601. Můžete potřebovat zkrácenou verzi, např. rrrrMMddHHmmss nebo rrrrMMdd.
    * M/d/rrrr H:mm:ss.SSS -- což je U.S. slash datum formátu. Můžete potřebovat zkrácenou verzi, např. M/d/rrrr .
    * rrrrDDDHmmssSSS -- což je rok plus nula-polstrovaný den roku (např. 001 = 1. leden 365 = 31. prosinec v nelegálním roce; to je někdy chybně nazýváno Julian datum) . Můžete potřebovat zkrácenou verzi tohoto, např. rrrrDDD .
    
Pokud použijete tento pseudo dataType, přidejte to do nové proměnné&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Pokud chcete posunout všechny časové hodnoty, posuňte časovou hodnotu v jednotkách, např.
1970-01-01T12:00:00Z.
*    *extraktRegex* -- Tohle je[regulární výraz](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) která zahrnuje skupinu zachytávání (v závorce) který popisuje, jak extrahovat hodnotu z názvu souboru nebo globální hodnoty atributu. Například název souboru jako S19980011998031.L3b\\_MO\\_CHL.nc, zachytit skupinu #1, "\\dtutoriál"v pravidelném výrazu S (\\dtutoriál) \\dtutoriál\\.L3b.\\* zachytí prvních 7 číslic za 'S': 1998001.
*    *Comment* -- Tohle je číslo zachycené skupiny. (v závorce) v pravidelném vyjádření, které obsahuje informace o zájmu. Obvykle je to 1, první skupina. Někdy je třeba použít zachycení skupin pro jiné účely v regexu, takže důležité zachycení skupiny číslo bude 2 (druhá skupina zajetí) nebo 3 (třetí) , atd.

Plný příkladaxisVariablecož činí souhrnný datový soubor s novou časovou osou, která získá časové hodnoty z názvu souboru každého souboru je
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Když používáte "timeFormat=" pseudo data Typ,ERDDAP™přidá 2 atributy doaxisVariabletakže se zdá, že pocházejí ze zdroje:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Takže v tomto případě,ERDDAP™vytvoří novou osu pojmenovanou"time"s dvojitými hodnotami (sekundy od 1970-01-01T00:00:00Z) extrahováním 7 číslic za 'S' a před ".L3m" v názvu souboru a výkladem hodnot jako časových hodnot formátovaných jako rrrrDDD.

Můžete přepsat výchozí základní čas (1970-01-01T00:00:00Z) přidáním[addAttribut](#addattributes)který určuje jiný atribut jednotek s jiným základním časem. Běžná situace je: existují skupiny datových souborů, každý s jedním dnem složené ze satelitního datového souboru, kde chcete, aby čas hodnota být poledne dne uvedený v názvu souboru (středový čas každého dne) a chtějí proměnnoulong\\_namebýt "Centered Time." Příkladem je:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Note hours=12 in the base time, which adds 12 hours related to the original base time of 1970-01-01T00:00:00Z.

Plný příkladaxisVariablecož činí souhrnný soubor údajů s novou "běh" osou (s int hodnotami) který získává spuštěné hodnoty z globálního atributu "runID" v každém souboru (s hodnotami jako "r17\\_globální," kde 17 je číslo spuštění) je
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Všimněte si, že skupina zachytit číslo 2 zachytit číslice, které se vyskytují po 'r' nebo 's', a před "\\_globální'. Tento příklad také ukazuje, jak přidat další atributy (např.ioos\\_categorya jednotky) k proměnné osy.
     
#### Vnější komprimované soubory{#externally-compressed-files} 
* Datové soubory, které jsou podskupinamiEDDGridFromFiles a EDDTable FromFiles mohou sloužit data přímo z externě komprimovaných datových souborů, včetně.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, a .Z soubory.
     
*    **To funguje překvapivě dobře&#33;**   
Ve většině případů je zpomalení spojené s dekompresí malých a středních datových souborů menší. Pokud potřebujete ušetřit místo na disku, důrazně podporujeme použití této funkce, zejména pro starší soubory, které jsou zřídka přístupné.
     
*    **Šetřete peníze&#33;**   
To je jeden z mála funkcí vERDDAP™To vám nabízí šanci ušetřit spoustu peněz (i když za cenu mírně sníženého výkonu) . Pokud je kompresní poměr např. 6:1 (Někdy to bude mnohem vyšší.) , pak datové soubory souboru budou potřebovat pouze 1/6 prostor disku. Pak možná dokážeš zvládnout 1 RAID (o dané velikosti) místo 6 RAIDS (o stejné velikosti) . To jsou obrovské úspory nákladů. Doufejme, že schopnost komprimovat některé soubory ve sbírce (Ty starší?) a nestlačit ostatní (Ty novější?) , A změnit to kdykoliv, pojďme minimalizovat nevýhody komprimovat některé ze souborů (pomalejší přístup) . A pokud je volba mezi uložením souborů na pásku (a přístupné pouze na požádání, po prodlení) vs uložení komprimované na RAID (a přístupné prostřednictvímERDDAP) , pak je obrovská výhoda pro použití komprese tak, aby uživatelé dostat interaktivní a (relativně) rychlý přístup k datům. A pokud vám to může ušetřit od zakoupení dalšího RAIDu, může vám tato funkce ušetřit asi 30 000 dolarů.
     
* Pro všechnyEDDGridPodtřídy FromFiles, pokud mají datové soubory rozšíření, které naznačuje, že jsou externě komprimované soubory (v současné době:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2nebo .Z) ,ERDDAP™dekompresní soubory do adresáře cache datového souboru, když je čte (pokud už nejsou v cache) . Totéž platí pro binární soubor (např..nc) podtřídy EDDTableFromFoles.
     
* Pro podtřídy EDDTableFromFoles pro nebinární soubory (např. .csv) , datové soubory s příponou naznačující, že jsou externě komprimované soubory budou dekompresovány při čtení souboru.
     
* POŽADAVEK: Pokud je použit typ externího komprimovaného souboru (např..tgznebo.zip) podporuje více než 1 soubor uvnitř komprimovaného souboru, komprimovaný soubor musí obsahovat pouze 1 soubor.
     
* REQUIREMENT: Tato funkce předpokládá, že obsah externě komprimovaných souborů se nemění, takže může být znovu použit dekomprimovaný soubor. Pokud jsou některé nebo všechny datové soubory datového souboru někdy změněny, neshrňte tyto soubory. To odpovídá běžnému používání, protože lidé obvykle nestlačí soubory, které někdy potřebují změnit.
     
*   &lt;souborNázevRegex&gt; Aby to fungovalo, data jsou&lt;souborNameRegex&gt; musí odpovídat jménům komprimovaných souborů. Očividně, regexy jako .\\*bude odpovídat všem jménům souborů. Pokud zadáte specifický typ souboru, např. .\\*\\.nc, pak je třeba upravit regex tak, aby zahrnovala i kompresní rozšíření, např., .\\ *\\.nc\\.gz(pokud všechny soubory budou* Něco *.nc.gzSoubory) .
     
* Je v pořádku, pokud váš datový soubor obsahuje kombinaci komprimovaných a ne komprimovaných souborů. To může být užitečné, pokud věříte, že některé soubory (např. starší soubory) bude používán méně často, a proto by bylo užitečné ušetřit prostor na disku stlačením. Aby to fungovalo,&lt;fileNameRegex&gt; se musí shodovat s názvy komprimovaných a nestlačených souborů, např. .\\*nebo .\\*\\.nc (|\\.gz) (pokud skupina zachycuje na konci této skupiny stanoví, že.gzje volitelné.
     
* Je v pořádku, pokud komprimujete nebo dekompresujete konkrétní soubory ve sbírce kdykoliv.
Pokud soubor údajů nepoužívá [&lt;updateEveryNMillis&gt;] (#update everynmillis) , nastavit soubor údajů[vlajka](/docs/server-admin/additional-information#flag)říctERDDAP™znovu načíst datový soubor a tím si všimnout změn. Zajímavé je, že můžete použít různé kompresní algoritmy a nastavení pro různé soubory ve stejném souboru (např..bz2pro zřídka používané soubory,.gzpro často nepoužité soubory a bez komprese pro často používané soubory) , Ujistěte se, že regex podporuje všechny použité přípony souboru, např. .\\*\\.nc (|\\.gz|\\.bz2) .
     
* Kompresní poměry a rychlosti pro různé kompresní algoritmy se samozřejmě liší podle zdrojového souboru a nastavení (např. úroveň stlačení) . Pokud chcete optimalizovat tento systém pro vaše soubory, proveďte test různých kompresních metod s vašimi soubory a s celou řadou nastavení komprese. Pokud chcete spolehlivě dobré (nemusí být nutně nejlepší) nastavení, budeme mírně doporučitgzip  (.gz) .gzipnedělá nejmenší komprimovaný soubor (Je to dost blízko.) , ale komprimuje soubor velmi rychle a (důležitější proERDDAP™uživatelé) Rozkládá soubor velmi rychle. Navíc,gzipsoftware přichází standardně s každou instalací Linux a Mac OS a je snadno dostupný pro Windows prostřednictvím bezplatných nástrojů, jako jsou 7Zip a Linux doplňky jako Git Bash. Například pro stlačení zdrojového souboru do.gzverze souboru (stejný název souboru, ale s.gzPřiložené) , použití (v Linuxu, Mac OS a Git Bash)   
    gzip  *sourceName*   
Dekompresní a.gzsoubor zpět k originálu, použijte
gunzip *sourceName.gz*   
Chcete-li komprimovat každý ze zdrojových souborů v adresáři a jeho podadresáře, rekurzivně, použijte
    gzip- R *režisér Název*   
Dekompresní každý z.gzsoubory v adresáři a jeho podadresáře , rekurzivně , použití
gunzip - r *režisér Název*   
     
* UPOZORNĚNÍ: Nekomprimujte vnější tlak (gzip) Soubory, které jsou již interně komprimované&#33;
Mnoho souborů již má komprimovaná data interně. JestližegzipTyto soubory, výsledné soubory nebudou o moc menší (&lt;5%) aERDDAP™bude ztrácet čas dekompresí je, když je potřebuje přečíst. Například:
    
    * datové soubory: např..nc4 a.hdf5 souborů: Některé soubory používají vnitřní komprese, některé ne. Jak říct: komprimované proměnné mají atributy "\\_Chunksize." Také, pokud skupina roštů.ncnebo.hdfSoubory jsou různé velikosti, jsou pravděpodobně vnitřně komprimované. Pokud jsou všechny stejné velikosti, nejsou vnitřně stlačené.
    * Soubory obrázků: např. .gif, .jpg a .png
    * audio soubory: např. .mp3 a .ogg.
    * video soubory: např. .mp4, .ogv, a .webm.
    
        
Jeden nešťastný případ: .wav audio soubory jsou obrovské a nejsou vnitřně komprimované. Bylo by hezké stlačit (gzip) Oni, ale obecně byste neměli, protože pokud ano, uživatelé nebudou schopni přehrávat komprimované soubory ve svém prohlížeči.
     
* Zkušební pouzdro: stlačení (sgzip) datový soubor s mřížkou 1523.ncSložky.
    
    * Údaje ve zdrojových souborech byly řídké. (mnoho chybějících hodnot) .
    * Celkový diskový prostor šel z 57 GB před kompresí na 7 GB po.
    * Žádost o mnoho údajů z 1 time point je&lt;1 s před a po kompresi.
    * Žádost o 1 datový bod pro 365 časových bodů (nejhorší případ) přešla ze 4 s na 71 s.
         
    
Pro mě je to rozumný kompromis pro jakýkoli soubor údajů a určitě pro soubory údajů, které jsou často používány.
     
* Vnitřní versus vnější tlak --
Ve srovnání s interní kompresí souborů nabízených.nc4 a.hdf5 souborů,ERDDAP's přístupem pro externě komprimované binární soubory má výhody a nevýhody. Nevýhodou je: pro jednou přečíst malou část jednoho souboru, vnitřní komprese je lepší, protožeEDDGridFromFiles stačí dekompresovat pár kusů (án) Složka, ne celá složka. Ale...ERDDAP's přístupem má některé výhody:
    
    *   ERDDAP™podporuje komprese všech typů datových souborů (binární a non-binář, např..nc3 a .csv) nejen.nc4 a.hdf4.
    * Pokud většina souboru musí být přečtena více než jednou v krátkém časovém období, pak šetří čas na dekompresi souboru jednou a přečíst jej mnohokrát. To se stává vERDDAP™pokud uživatel používá Make-A-Graph pro datový soubor a provede sérii malých změn v grafu.
    * Schopnost mít komprimované soubory a nekomprimované soubory ve stejné kolekci vám umožní více ovládat, které soubory jsou komprimovány a které nejsou. A toto přidané ovládání přichází bez úpravy zdrojového souboru (protože můžete zkomprimovat soubor např..gza pak ji dekomprimovat pro získání původního souboru) .
    * Schopnost kdykoli změnit, zda je daný soubor komprimován a jak je komprimován (různé algoritmy a nastavení) dává vám větší kontrolu nad výkonem systému. A původní nestlačený soubor můžete snadno kdykoliv obnovit.
    
I když ani jeden přístup není vítězem ve všech situacích, je jasné, žeERDDAP's schopností sloužit datům z externích komprimovaných souborů činí vnější kompresi přiměřenou alternativou k vnitřní komprese nabízené.nc4 a.hdf5. To je důležité vzhledem k tomu, že vnitřní komprese je jedním z hlavních důvodů, proč se lidé rozhodnou použít.nc4 a.hdf5.
     
##### Dekomprese Cache{#decompressed-cache} 
ERDDAP™je dekompresní verze komprimované binární (např..nc) datový soubor, když je potřeba soubor přečíst. Dekompresované soubory jsou uloženy v adresáři datového souboru *velkýRodič rodičů* /dekomprimováno/ . Dekompresované soubory, které nebyly v poslední době použity, budou vymazány, aby uvolnily prostor, když je kumulativní velikost souboru &gt;10GB. Můžete to změnit nastavením&lt;dekomprimovanýCacheMaxGB&gt; (výchozí=10) v souborech údajů Xml.xml, např.
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Také, dekompresované soubory, které nebyly použity v posledních 15 minutách budou vymazány na začátku každého hlavního souboru reload. Můžete to změnit nastavením&lt;dekompresovanýCacheMaxMinutesOld&gt; (výchozí=15) v souborech údajů Xml.xml, např.
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Větší čísla jsou pěkné, ale kumulativní velikost dekompresních souborů může způsobit *velkýRodič rodičů* dojít z diskového prostoru, což způsobuje vážné problémy.
     
* Protože dekomprese souboru může trvat hodně času. (0,1 až 10 sekund) , soubory souborů s komprimovanými soubory mohou využít nastavení souboru [&lt;nThreads&gt;] (# nitra) nastavení na vyšší číslo (2? 3? 4?) . Nevýhody k ještě vyššímu počtu (Například 5? 6? 7?) snižují výnosy a požadavek jednoho uživatele pak může využít vysoké procento zdrojů systému, čímž výrazně zpomalí zpracování žádostí druhého uživatele. Proto neexistuje žádné ideální nastavení nThreads, jen různé důsledky v různých situacích s různými nastaveními.
         
#### Vytříděné hodnoty rozměrů{#sorted-dimension-values} 
Hodnoty pro každý rozměr MUSÍ být v seřazeném pořadí (vzestupně nebo sestupně, kromě prvního (nejvíce vlevo) rozměr, který musí být vzestupný) . Hodnoty mohou být nepravidelně rozloženy. Nemůžou být žádné vazby. To je požadavek[Standard metadat CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Pokud hodnoty jakéhokoli rozměru nejsou v seřazeném pořadí, soubor dat se nenačte aERDDAP™určí první netříděnou hodnotu v souboru záznamu, *velkýRodič rodičů* /logs/log.txt .
    
Netříděné hodnoty rozměrů téměř vždy indikují problém se zdrojovým souborem. To se nejčastěji vyskytuje, když je do agregace zahrnut chybný nebo nevhodný soubor, což vede k netříděné časové dimenzi. Pro vyřešení tohoto problému viz chybová zpráva vERDDAP™log.txt soubor k nalezení urážlivé časové hodnoty. Pak se podívejte do zdrojových souborů najít odpovídající soubor (nebo jeden před nebo jeden po) To nepatří do agregace.
    
#### Adresáře{#directories} 
Soubory mohou být v jednom adresáři nebo v adresáři a jeho podadresáři (rekurzivně) . Pokud existuje velký počet souborů (např. &gt; 1 000) , operační systém (a takEDDGridFromFiles) bude fungovat mnohem efektivněji, pokud uložíte soubory do řady podadresářů (jeden za rok nebo jeden za měsíc pro soubory údajů s velmi častými soubory) , tak, že nikdy neexistuje obrovské množství souborů v daném adresáři.
     
#### &lt;cacheFromUrl&gt;{#cachefromurl} 
VšechnyEDDGridFromFiles a všechny soubory EDDTableFromFoles podporují sadu tagů, které říkajíERDDAP™stáhnout a udržovat kopii všech souborů vzdáleného datového souboru nebo cache několika souborů (stažen podle potřeby) . Tohle může být neuvěřitelně užitečné. Viz[cache FromUrl dokumentace](#cachefromurl).
    
#### Vzdálené adresáře a HTTP požadavky na rozsah{#remote-directories-and-http-range-requests} 
 (AKA Byte Servírování, Byte Range Žádosti, Přijmout-Rangeshttphlavička)   
EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles, can *Někdy* sloužit údaje od.ncsoubory na vzdálených serverech a přístupné přes HTTP, pokud server podporuje[Byte Slouží](https://en.wikipedia.org/wiki/Byte_serving)přes HTTP požadavky na rozsah (HTTP mechanismus pro bajtové podávání) . To je možné, protože netcdf-java (kteráERDDAP™použití ke čtení.ncsoubory) podporuje čtení dat ze vzdáleného.ncsoubory přes HTTP požadavky na rozsah.

 **Nedělej to&#33;** Je strašně neefektivní a pomalý.
Místo toho použijte [&lt;cacheFromUrl&gt; system] (#Cachefromurl) .

PřístupERDDAP™Soubory jako soubory prostřednictvím žádostí o rozsah byte --
Otočím to kolem, vzhledem k tomu, že můžete (teoreticky) Pomyšlení na soubor údajů vERDDAP™jako obr.ncsoubor započítáním ".nc" na základnu OPenDAPURL pro daný datový soubor (např. https://myserver.org/erddap/griddap/datasetID.nc a také přidáním ?query poté, co zadat podmnožinu) , je možná rozumné se zeptat, zda můžete použít netcdf-java,Ferret, nebo jinéNetCDFklientský software pro čtení dat prostřednictvím Žádosti o HTTP rozsah odERDDAP. Odpověď je ne, protože není opravdu velký ".nc"Složka. Pokud to chcete udělat, udělejte místo toho jednu z těchto možností:

* Použití(OPeN)DAPklientský software pro připojení ke službám Griddap nabízenýmERDDAP. To je ono.DAP  (a takERDDAP) byl navržen pro. Je velmi efektivní.
* Nebo stáhnout zdrojový soubor (án) z"files"systém (nebo podmnožina souboru prostřednictvím.nc? dotaz) do počítače a používat netcdf-java,Ferret, nebo jinéNetCDFklientský software pro čtení (Teď) místní soubor (án) .
         
#### Informace o souboru{#cached-file-information} 
KdyžEDDGridDatabáze FromFiles je nejprve načtena,EDDGridFromFiles čte informace ze všech příslušných souborů a vytváří tabulky (jeden řádek pro každý soubor) s informacemi o každém platném souboru a každém "špatném" (jiný nebo neplatný) Složka.
* Tabulky jsou také uloženy na disku, jakoNetCDFv3.ncsoubory v *velkýRodič rodičů* /dataset/ *last2CharsOfDatasetID* / *datasetID* / v souborech pojmenovaných:
dirTable.nc  (který obsahuje seznam jedinečných názvů adresářů) ,
soubor Tabulka.nc  (která obsahuje tabulku s údaji každého platného souboru) ,
badFiles.nc  (který drží tabulku s informacemi každého špatného souboru) .
* Pro urychlení přístupu kEDDGridDatabáze souborů (ale na úkor využití více paměti) , můžete použít
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
říctERDDAP™uchovávat kopii tabulek informací o souboru v paměti.
* Kopie tabulek informací o souboru na disku je také užitečná, kdyžERDDAP™je vypnuto a restartováno: ukládáEDDGridOdFiles z nutnosti znovu přečíst všechny datové soubory.
* Když je soubor dat znovu načten,ERDDAP™stačí přečíst data v nových souborech a souborech, které se změnily.
* Pokud má soubor jinou strukturu než ostatní soubory (například jiný datový typ pro jednu z proměnných nebo jinou hodnotu pro "[jednotky](#units)" atribut) ,ERDDAPpřidá soubor do seznamu "špatných" souborů. Informace o problému se souborem budou zapsány do *velkýRodič rodičů* /logs/log.txt soubor.
* Nikdy byste neměli muset smazat nebo pracovat s těmito soubory. Jednou výjimkou je: pokud stále provádíte změny datového souborudatasets.xmlnastavit, možná budete chtít odstranit tyto soubory k vynuceníERDDAP™znovu přečíst všechny soubory, protože soubory budou číst/interpretovat jinak. Pokud budete někdy potřebovat odstranit tyto soubory, můžete to udělat, kdyžERDDAP™Utíká. (Pak nastavte[vlajka](/docs/server-admin/additional-information#set-dataset-flag)co nejdříve načíst soubor údajů.) Nicméně,ERDDAP™obvykle si všimne, žedatasets.xmlinformace neodpovídají souboru Informace o tabulce a automaticky smaže tabulky souborů.
* Pokud chcete podpořitERDDAP™aktualizovat uložené informace o datovém souboru (například, pokud jste právě přidali, odstranili nebo změnili některé soubory do datového adresáře datového souboru) , použijte[Systém vlajky](/docs/server-admin/additional-information#flag)donutitERDDAP™aktualizovat informace o cached souboru.
         
#### Žádosti o zacházení{#handling-requests} 
Při zpracování žádosti klienta o údaje,EDDGridFromFiles se může rychle podívat do tabulky s platnou informací o souboru zjistit, které soubory mají požadovaná data.
     
#### Aktualizace informací o souboru{#updating-the-cached-file-information} 
Kdykoli je soubor znovu načten, jsou aktualizovány informace o cache souboru.
    
* Databáze se pravidelně načítá tak, jak stanoví&lt;reloadEveryNMinutes&gt; v informacích datového souboru vdatasets.xml.
* Databáze je znovu načítána co nejdříve.ERDDAP™zjistí, že jste přidali, odstranili,[Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (změnit poslední soubor Změněný čas) , nebo změnil datový soubor.
* Databáze je znovu načtena co nejdříve, pokud použijete[Systém vlajky](/docs/server-admin/additional-information#flag).

Když je soubor dat znovu načten,ERDDAP™Porovnává aktuálně dostupné soubory s informačními tabulkami v cache. Nové soubory se čtou a přidávají do platné tabulky souborů. Soubory, které již neexistují, jsou staženy z platné tabulky souborů. Soubory, kde došlo ke změně časového razítka souboru, se čtou a jejich informace se aktualizují. Nové tabulky nahrazují staré tabulky v paměti a na disku.
     
#### Špatné soubory{#bad-files} 
Tabulka špatných souborů a důvody, proč byly soubory prohlášeny za špatné (poškozený soubor, chybějící proměnné atd.) je e-mailem na e-mail Všechno Na e-mailovou adresu (Pravděpodobně vy.) pokaždé, když je soubor dat znovu načten. Měli byste tyto soubory co nejdříve nahradit nebo opravit.
     
#### Chybějící proměnné{#missing-variables} 
Pokud některé složky nemají některé zdataVariables definovaná v souboru údajůdatasets.xmlTo je v pořádku. Kdy?EDDGridFromFiles čte jeden z těchto souborů, to bude působit, jako by soubor měl proměnnou, ale se všemi chybějícími hodnotami.
     
#### FTP Potíže/Advice{#ftp-troubleadvice} 
Pokud FTP nové datové soubory doERDDAP™server zatímcoERDDAP™Utíká, je tu šance, žeERDDAP™bude soubor údajů během procesu FTP znovu nabíjet. Stává se to častěji, než si myslíte&#33; Pokud k tomu dojde, bude se soubor zdát platný (má platné jméno) Ale ta složka ještě není platná. PokudERDDAP™pokusí se číst data z tohoto neplatného souboru, výsledná chyba způsobí přidání souboru do tabulky neplatných souborů. To není dobré. Aby se zabránilo tomuto problému, použijte dočasné jméno souboru při FTP 'ing soubor, například ABC2005.nc\\_TEMP . Pak souborNameRegex test (viz níže) uvede, že se nejedná o relevantní soubor. Po dokončení procesu FTP přejmenujte soubor na správný název. Proces přejmenování způsobí, že soubor bude okamžitě relevantní.
     
#### "0 souborů" Chyba zprávy{#0-files-error-message-1} 
Když utečeš[GenerovatDatasetsXml](#generatedatasetsxml)nebo[DasDds](#dasdds), nebo pokud se pokusíte načístEDDGridZ... soubory souborů dat vERDDAP™, a dostanete chybovou zprávu "0 souborů" ukazující, žeERDDAP™nalezeno 0 odpovídajících souborů v adresáři (když si myslíte, že jsou odpovídající soubory v tomto adresáři) :
    * Zkontrolujte, zda jsou soubory skutečně v adresáři.
    * Zkontrolujte pravopis názvu adresáře.
    * Zkontrolujte souborNameRegex. Je opravdu snadné dělat chyby s regexy. Pro testovací účely zkuste regex .\\*, který by měl odpovídat všem názvům souborů. (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Zkontrolujte, zda uživatel, který program provozuje (např. user=tomcat (?) pro přípravek Tomcat/ERDDAP) má "číst" povolení pro tyto soubory.
    * V některých operačních systémech (např. SELinux) a v závislosti na nastavení systému musí mít uživatel, který program spustil, oprávnění číst celý řetězec adresářů vedoucích do adresáře, který má soubory.
         
#### EDDGridZ files kostra XML{#eddgridfromfiles-skeleton-xml} 
*    **Kostra XML** pro všechnyEDDGridPodtřídy FromFiles jsou:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles{#eddfromaudiofiles} 
 **EDDGridFromAudioFiles** a **EDDTableFromAudioFiles** souhrn dat ze sbírky místních audio souborů. (Tyto se poprvé objevily vERDDAP™v1.82.) Rozdíl je, žeEDDGridFromAudioFiles považuje data za multidimenzionální datový soubor (obvykle se 2 rozměry:\\[start souboru Čas\\]a\\[uplynulo Čas v rámci souboru\\]) , zatímco EDDTableFromAudioFiles považuje data za tabulární data (obvykle se sloupcemi pro spuštění souboruTime, uplynulý čas se souborem a data z audio kanálů) .EDDGridFromAudioFiles vyžaduje, aby všechny soubory měly stejný počet vzorků, takže pokud to není pravda, musíte použít EDDTableFromAudioFiles. Jinak je volba typu EDD zcela na vás. Jednou z výhod EDDTableFromAudioFiles: můžete přidat další proměnné s jinými informacemi, např.,stationID, staniceType. V obou případech nedostatek jednotné časové proměnné ztěžuje práci s daty z těchto typů EDD, ale nebyl žádný dobrý způsob, jak nastavit jednotnou časovou proměnnou.

Vidíš tyhle třídy?[EDDGridFromFiles](#eddgridfromfiles)a[EDDTableFromFoles](#eddtablefromfiles), pro obecné informace o tom, jak tato třída funguje a jak ji používat.

Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Vzhledem k tomu, že audio soubory nemají jiná metadata než informace související se kódováním zvukových dat, budete muset editovat výstup z GenerateDatasets Xml poskytovat základní informace (např. titul, shrnutí,creator\\_name, instituce, historie) .

Podrobnosti:

* Existuje velký počet formátů audio souborů. V současné době,ERDDAP™lze číst data z většiny .wav a .au souborů. Momentálně nemůže číst jiné typy audio souborů, např. .aiff nebo .mp3. Pokud potřebujete podporu pro jiné formáty audio souborů nebo jiné varianty .wav a .au, prosím, pošlete svou žádost Chrisovi. John at noaa.gov . Nebo jako workaround můžete použít právě teď, můžete převést své zvukové soubory na PCM\\_ Podepsáno (pro celá data) nebo PCM\\_ FLOAT (pro údaje o plovoucích bodech) .wav soubory tak, žeERDDAP™může s nimi pracovat.
* V současné době,ERDDAP™může číst audio soubory s tím, coJava's AudioFormat třída volá PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW, a ULAW kódování.ERDDAP™konvertuje hodnoty PCM\\_UNSIGNED (např. 0 až 255) do podepsaných hodnot (např. -128 až 128) přeskupením bitů v hodnotách dat.ERDDAP™konvertuje ALAW a ULAW kódován z jejich nativní kódovaný byte formát do krátké (int16) hodnoty. OdJavachce bigEndian=true data,ERDDAP™přerovnává bajty dat uložených s bigEndian=false (malý endián) pro správné čtení hodnot. Pro všechna ostatní kódování (PCM) ,ERDDAP™čte data tak, jak je.
* Kdy?ERDDAP™čte data z audio souborů, převádí dostupná audio metadata souboru na globální atributy. To bude vždy zahrnovat (s zobrazenými hodnotami vzorku) 
    
Smyčcový audioBigEndian "false"; //true or false
int audio kanály 1;
Smyčcové audiokódování "PCM\\_SIGNED";
float audioFrameRate 9600.0; //per second
int audioFrameSize 2; //# of data bytes per frame
float audioSampleRate 9600.0; //per second
int audioSampleSizeInBits 16; //# bitů na kanál na vzorek
    
ProERDDAP's účely, rám je synonymem pro vzorek, což jsou údaje pro jeden bod v čase.
Vlastnosti vERDDAP™bude mít informace popisující data, jak to bylo ve zdrojových souborech.ERDDAP™budou často měnit tato data při čtení dat, např. PCM\\_UNSIGNED, ALAW, a ULAW kódovaná data jsou převedena na PCM\\_SIGNED a bigEndian=false data jsou převedena na bigEndian=true data (což je jakJavachce si to přečíst.) . Nakonec hodnoty údajůERDDAP™vždy bude[Kódováno PCM](https://en.wikipedia.org/wiki/Pulse-code_modulation)hodnoty údajů (tj. jednoduché digitalizované vzorky zvukové vlny) .
* Kdy?ERDDAP™čte data z audio souborů, čte celý soubor.ERDDAP™může číst až 2 miliardy vzorků na jeden kanál. Například pokud je vzorkovací frekvence 44,100 vzorků za sekundu, 2 miliardy vzorků se přeloží na asi 756 minut zvukových údajů na jeden soubor. Pokud máte audio soubory s více než tímto množstvím dat, musíte rozebrat soubory do menších částí tak, abyERDDAP™může je přečíst.
* ProtožeERDDAP™čte celé zvukové soubory,ERDDAP™musí mít přístup k velkému množství paměti pro práci s velkými zvukovými soubory. Viz[ERDDAP's nastavením paměti](/docs/server-admin/deploy-install#memory). Opět, pokud je to problém, práce, kterou můžete použít právě teď je rozebrat soubory na menší kousky tak, žeERDDAP™umí je přečíst s menší pamětí.
* Některé zvukové soubory byly špatně napsány.ERDDAP™vyvíjí malé úsilí, aby se těmito případy zabýval. Ale obecně, když je chyba,ERDDAP™a věru se vymaní (a odmítnout tento soubor) nebo (pokud je chyba nezjistitelná) číst údaje (ale údaje budou nesprávné) .
*   ERDDAP™nekontroluje ani nemění hlasitost zvuku. V ideálním případě jsou celočíselná data zvuku zvětšena tak, aby byla použita celá škála datového typu.
* Audio soubory a audio přehrávače nemají systém pro chybějící hodnoty (např. -999 nebo Float.NaN) . Takže audio data by neměla mít žádné chybějící hodnoty. Pokud chybí hodnoty (např. pokud potřebujete prodloužit audio soubor) Použijte řadu 0, které budou vykládány jako dokonalé ticho.
* Kdy?ERDDAP™čte data z audio souborů, vždy vytváří sloupec zvaný "prošlý" Čas s časem pro každý vzorek, v sekundách (uloženy jako dvojité) , vzhledem k prvnímu vzorku (který je přidělen Time=0.0 s) . SEDDGridFromAudioFiles se stává proměnnou uplynulé časové osy.
*   EDDGridFromAudioFiles vyžaduje, aby všechny soubory měly stejný počet vzorků. Takže pokud to není pravda, musíte použít EDDTableFromAudioFiles.
* ProEDDGridFromAudioFiles, doporučujeme nastavit [&lt;dimensionValuesInMemory&gt;] (# Dimensionvalueinmemory) na false (jak doporučuje GenerateDatasets Xml) Protože časový rozměr má často obrovský počet hodnot.
* ProEDDGridFromAudioFiles, měli byste téměř vždy používatEDDGridSystém FromFiles pro[Agregace prostřednictvím Název souboru](#aggregation-via-file-names-or-global-metadata), téměř vždy výpisem data zahájení nahrávky Čas z názvů souborů. Například,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Generovat soubory dat Xml to podpoří a pomůže vám s tím.
* Pro EDDTableFromAudioFiles byste měli téměř vždy používat systém EDDTableFromFoles pro[\\*\\*\\* fileName pseudosourceNameán](#filename-sourcenames)k získání informací ze jména souboru (téměř vždy datum zahájení Čas na nahrávání) a podporovat jej tak, aby byl sloupcem údajů. Například,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Časový formát by pak měl být uveden jako atribut jednotek:&lt;att name="onities="yyyMMdd"\\_'HHmmss&lt;/att &gt;
     
### EDDGridZ MergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridZ MergeIRFiles** ](#eddgridfrommergeirfiles)souhrnné údaje z místních,[MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)Soubory, které jsou z[Měřící mise pro tropické deště (TRMM) ](https://trmm.gsfc.nasa.gov), což je společná mise mezi NASA a Japan Aerospace Exploration Agency (JAXA) . Sloučit IR soubory lze stáhnout z[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridOdMergeIRFiles.java byl napsán a přispěl kERDDAP™projekt Jonathana Lafiteho a Philippa Makowskiho z R.Tech Engineeringu (licence: autorizovaný open source) .

EDDGridZ MergeIRFiles je trochu neobvyklé:

*   EDDGridFromMergeIRFile podporuje komprimované nebo nestlačené zdrojové datové soubory, v jakékoli kombinaci, ve stejném datovém souboru. To vám například umožňuje komprimovat starší soubory, které jsou zřídka přístupné, ale odkompresovat nové soubory, které jsou často přístupné. Nebo můžete změnit typ kompresi z původní . Z na příklad,.gz.
* Pokud máte komprimované a nestlačené verze stejných datových souborů ve stejném adresáři, ujistěte se prosím, že&lt;fileNameRegex&gt; pro váš soubor se shoduje s názvy souborů, které chcete, aby se shodovaly a neodpovídá názvům souborů, které nechcete, aby se shodovaly.
* Nekompresní zdrojové datové soubory nesmí mít příponu souboru (tj. žádné "" v názvu souboru) .
* Stlačené zdrojové datové soubory musí mít příponu souboru, aleERDDAP™určuje typ komprese tím, že zkontroluje obsah souboru, nikoli pohledem na příponu souboru souboru (například ".Z") . Podporované typy komprese zahrnují "gz," "bzip2," "xz," "lzma," "nappy-raw," "nappy-framed," "pack200" a "z." Kdy?ERDDAP™čte komprimované soubory, dekompresuje se při letu, bez zápisu do dočasného souboru.
* Všechny zdrojové datové soubory musí používat původní systém pojmenování souborů: tj., merg\\_ *RRRRMMDDHH* \\_4km-pixel (kde *RRRRMMDDHH* označuje čas spojený s údaji v souboru) , plus přípona souboru, pokud je soubor komprimován.

Vidíš tuhle třídu?[EDDGridFromFiles](#eddgridfromfiles), pro obecné informace o tom, jak tato třída funguje a jak ji používat.

Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
 
### EDDGridFromNcFiles{#eddgridfromncfiles} 
[ **EDDGridFromNcFiles** ](#eddgridfromncfiles)souhrnné údaje z místní, mřížkované,[GRIB .grb a .grb2](https://en.wikipedia.org/wiki/GRIB)soubory,[HDF  (v4 nebo v5)  .hdf](https://www.hdfgroup.org/)soubory,[.ncml](#ncml-files)soubory,[NetCDF  (V3 nebo v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)soubory a[Zarr](https://github.com/zarr-developers/zarr-python)soubory (od verze 2.25) . Soubory Zarr mají mírně odlišné chování a vyžadují buď souborNameRegex nebo cestuRegex zahrnout "zarr."

To může fungovat s jinými typy souborů (například BUFR) Jen jsme to neotestovali. Prosím, pošlete nám nějaké vzorky.

* Pro soubory GRIB,ERDDAP™udělá .gbx index soubor poprvé čte každý soubor GRIB. Takže soubory GRIB musí být v adresáři, kde "uživatel," který spustil Tomcat má oprávnění číst + psát.
* Vidíš tuhle třídu?[EDDGridFromFiles](#eddgridfromfiles), informace o tom, jak tato třída funguje a jak ji používat.
* Začneme sERDDAP™v2.12EDDGridFromNcFiles aEDDGridFromNcFiles Vybalené mohou číst data z "struktur" v.nc4 a.hdf4 soubory. Pro identifikaci proměnné, která je ze struktury,&lt;sourceName&gt; musí používat formát: *FullStructureName* | *Název člena* , například skupina1/myStruct|Můj pane.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
#### Skupiny v souborech Gridded Nc{#groups-in-gridded-nc-files} 
    [Netcdf4 soubory mohou obsahovat skupiny.](#groups-in-gridded-nc-files) ERDDAP™jen vytvoří soubor údajů z proměnných v jedné skupině a všech jejích mateřských skupinách. Můžete zadat konkrétní název skupiny v GeneranteDatasets Xml (vynechat stopovací lomítko) , nebo použít "" mít GenerateDatasets Xml hledat všechny skupiny pro proměnné, které používají nejvíce rozměrů, nebo použití "\\[kořen\\]" mít GenerateDatasets stačí hledat proměnné v kořenové skupině.
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    

### EDDGridFromNcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridFromNcFilesUnpacked** ](#eddgridfromncfilesunpacked)je varianta[EDDGridFromNcFiles](#eddgridfromncfiles)které agregují údaje z místní, mřížkovanéNetCDF  (V3 nebo v4)  .nca související soubory. Rozdíl je v tom, že tato třída vybalí každý datový soubor předEDDGridFromFiles se dívá na soubory:

* Vybaluje proměnné, které jsou plné[scale\\_factorneboadd\\_offset](#scale_factor).
* Převádí \\_FillValue amissing\\_valuehodnoty, které mají být NaN (nebo MAX\\_VALUE pro celé datové typy) .
* Převádí hodnoty času a času na"seconds since 1970-01-01T00:00:00Z".

Velkou výhodou této třídy je, že poskytuje způsob, jak se vypořádat s různými hodnotamiscale\\_factor,add\\_offset\\_FillValue,missing\\_value, nebo časové jednotky v různých zdrojových souborech ve sbírce. Jinak byste museli použít nástroj jako[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)upravit každý soubor k odstranění rozdílů tak, aby soubory mohly být řešenyEDDGridZ NcFiles. Aby tato třída správně fungovala, musí soubory dodržovat standardy CF pro související atributy.

* Pokud se pokusíte vytvořitEDDGridFromNcFiles Vybalené ze skupiny souborů, se kterými jste se dříve snažili a nepoužívaliEDDGridOdNcFiles, cd do
     *velkýRodič rodičů* /dataset/ *Last2Letters* / *datasetID* /
kde *Last2Letters* je poslední 2 písmenadatasetID,
a odstranit všechny soubory v tomto adresáři.
* Začneme sERDDAP™v2.12EDDGridFromNcFiles aEDDGridFromNcFiles Vybalené mohou číst data z "struktur" v.nc4 a.hdf4 soubory. Pro identifikaci proměnné, která je ze struktury,&lt;sourceName&gt; musí používat formát: *FullStructureName* | *Název člena* , například skupina1/myStruct|Můj pane.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
Netcdf4 soubory mohou obsahovat skupiny. Viz[Tato dokumentace](#groups-in-gridded-nc-files).
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru **předtím** Je vybalená. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)mění hodnoty délky dítěte (uzavřen)  EDDGriddata, která mají některé hodnoty délky větší než 180 (například 0 až 360) takže jsou v rozmezí -180 až 180 (Zeměpisná délka Plus nebo Minus 180, proto název) .

* To poskytuje způsob, jak vytvořit soubory údajů, které mají hodnoty délky větší než 180 v souladu sOGCSlužby (např.WMSserver vERDDAP) , protože všechnyOGCslužby vyžadují hodnoty délky v rozmezí -180 až 180.
* Práce v blízkosti přerušení způsobuje problémy bez ohledu na to, zda je přerušení na délce 0 nebo na délce 180. Tento typ datového souboru umožňuje vyhnout se těmto problémům pro každého tím, že nabízí dvě verze stejného datového souboru:
jedna s hodnotami délky v rozmezí 0 až 360 ("Pacificentric"?) ,
jedna s hodnotami délky v rozmezí -180 až 180 ("Atlanticentric"?) .
* U dětských souborů se všemi hodnotami délky většími než 180 jsou všechny nové hodnoty délky prostě o 360 stupňů nižší. Například datový soubor s hodnotami délky 180 až 240 by se stal datovým souborem s hodnotami délky -180 až -120.
* U dětských souborů údajů, které mají hodnoty délky pro celou planetu (přibližně 0 až 360) , nová hodnota délky bude upravena tak, aby byla (zhruba) - 180 až 180:
Původní hodnoty 0 až téměř 180 se nemění.
Původní hodnoty 180 až 360 jsou převedeny na -180 až 0 a přesunuty na začátek pole délky.
* U dětských souborů, které se pohybují 180, ale nepokrývají svět,ERDDAP™vloží chybějící hodnoty podle potřeby k vytvoření souboru, který pokrývá zeměkouli. Například dětský datový soubor s hodnotami délky 140 až 200 by se stal datovým souborem s hodnotami délky -180 až 180.
Hodnoty dětí 180 až 200 by se staly -180 až -160.
Vkládají se nové hodnoty délky od -160 do 140. Odpovídající hodnoty dat budou \\_FillValues.
Hodnoty dětí 140 až téměř 180 by se nezměnily.
Vložení chybějících hodnot se může zdát divné, ale vyhýbá se několika problémům, které vyplývají z toho, že hodnoty délky, které náhle skočí (např. od -160 do 140) .
* In[GenerovatDatasetsXml](#generatedatasetsxml), existuje zvláštní "dataset type,"EDDGridLonPM180FromErddapCatalog, který umožňuje generovatdatasets.xmlmístoEDDGridLonPM180 datové soubory z každého zEDDGriddata v souboruERDDAPjejichž délka je větší než 180. To usnadňuje nabízet dvě verze těchto souborů údajů:
originál s hodnotami délky v rozmezí 0 až 360,
a nový datový soubor s hodnotami délky v rozmezí -180 až 180.
    
Soubor údajů o dětech v rámci každéhoEDDGridDatabáze LonPM180 budeEDDGridOd souboru Erddap, který ukazuje na původní datový soubor.
Nový soubor údajůdatasetIDbude název původního datového souboru plus "\\_LonPM180."
Například,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Polož to.EDDGridDatabáze LonPM180 **níže** původní soubor údajů vdatasets.xml. To se vyhýbá některým možným problémům.
    
Alternativně můžete nahraditEDDGridFromErddap child database with the original database'sdatasets.xml. Pak bude existovat pouze jedna verze datového souboru: ta s hodnotami délky v rozmezí -180 až 180. Odradíme ji, protože jsou chvíle, kdy je každá verze datového souboru pohodlnější.
    
* Pokud například nabízíte dvě verze datového souboru s délkou 0 až 360 a jednou s délkou 180 až 180:
    * Můžete použít volitelné [&lt;přístupný ViaWMS&gt; false&lt;/přístupný ViaWMS&gt;] (#Accessibleviawms) s datovým souborem 0-360 k násilnému vypnutíWMSslužba pro tento datový soubor. Pak bude přístupná pouze verze souboru LonPM180WMS.
    * Existuje několik způsobů, jak udržet soubor údajů LonPM180 aktuální se změnami základního datového souboru:
        * Pokud je soubor údajů o dítětiEDDGridFromErddap soubor, který odkazuje na datový soubor ve stejnémERDDAP™, soubor údajů LonPM180 se pokusí přímo přihlásit k podkladovému datovému souboru tak, aby byl vždy aktuální. Přímé předplatné nevytváří e-maily, které vás žádají o potvrzení předplatného - validace by měla být provedena automaticky.
        * Pokud dětský soubor údajů neníEDDGridOdErddap soubor, který je na stejnéERDDAP™Databáze LonPM180 se pokusí používat systém pravidelného předplatného k upsání základního datového souboru. Pokud máte systém předplatného ve svémERDDAP™Zapnuto, měli byste dostat e-maily a požádat vás o potvrzení předplatného. Prosím, udělejte to.
        * Pokud máte systém předplatného ve svémERDDAP™Vypnuto, databázový soubor LonPM180 může mít někdy zastaralá metadata, dokud nebude soubor LonPM180 znovu načten. Takže pokud je systém předplatného vypnut, měli byste nastavit [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) nastavení souboru údajů LonPM180 na menší číslo, takže je pravděpodobnější, že dříve zachytí změny v souboru údajů o dítěti.

#### EDDGridkostra LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)mění hodnoty délky dítěte (uzavřen)  EDDGridSoubor údajů, který má některé hodnoty délky menší než 0 (například -180 až 180) takže jsou v rozmezí 0 až 360 (Proto název) .

* Práce v blízkosti přerušení způsobuje problémy bez ohledu na to, zda je přerušení na délce 0 nebo na délce 180. Tento typ datového souboru umožňuje vyhnout se těmto problémům pro každého tím, že nabízí dvě verze stejného datového souboru:
jedna s hodnotami délky v rozmezí -180 až 180 ("Atlanticentric"?) .
jedna s hodnotami délky v rozmezí 0 až 360 ("Pacificentric"?) ,
* U dětských souborů se všemi hodnotami délky menšími než 0, jsou všechny nové hodnoty délky jednoduše o 360 stupňů vyšší. Například datový soubor s hodnotami délky -180 až -120 by se stal datovým souborem s hodnotami délky 180 až 240.
* U dětských souborů údajů, které mají hodnoty délky pro celou planetu (zhruba -180 až 180) , nová hodnota délky bude upravena tak, aby byla (zhruba) 0 až 360:
Původní hodnoty -180 až 0 se převedou na 180 až 360 a posunou se na konec pole délky.
Původní hodnoty 0 až téměř 180 se nemění.
* U dětských souborů, které pokrývají lon=0, ale nepokrývají glóbus,ERDDAP™vloží chybějící hodnoty podle potřeby k vytvoření souboru, který pokrývá zeměkouli. Například dětský datový soubor s hodnotami délky -40 až 20 by se stal datovým souborem s hodnotami délky 0 až 360.
Hodnoty dětí od 0 do 20 by se nezměnily.
Nové hodnoty délky budou vloženy od 20 do 320. Odpovídající hodnoty dat budou \\_FillValues.
Hodnoty dětí -40 až 0 by se staly 320 až 360.
Vložení chybějících hodnot se může zdát divné, ale vyhýbá se několika problémům, které vyplývají z toho, že hodnoty délky, které náhle skočí (např. od 20 do 320) .
* In[GenerovatDatasetsXml](#generatedatasetsxml), existuje zvláštní "dataset type,"EDDGridLon0360From ErddapCatalog, který vám umožní generovatdatasets.xmlmístoEDDGridLon0360 datové soubory z každého zEDDGriddata v souboruERDDAPjejichž délka je větší než 180. To usnadňuje nabízet dvě verze těchto souborů údajů:
originál s hodnotami délky v rozmezí 0 až 360,
a nový datový soubor s hodnotami délky v rozmezí -180 až 180.
    
Soubor údajů o dětech v rámci každéhoEDDGridLon0360 bude soubor datEDDGridOd souboru Erddap, který ukazuje na původní datový soubor.
Nový soubor údajůdatasetIDbude název původního datového souboru plus "\\_Lon0360."
Například,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Polož to.EDDGridDatabáze Lon0360 **níže** původní soubor údajů vdatasets.xml. To se vyhýbá některým možným problémům.
    
Alternativně můžete nahraditEDDGridFromErddap child database with the original database'sdatasets.xml. Pak bude existovat pouze jedna verze datového souboru: ta s hodnotami délky v rozmezí 0 až 360. Odradíme ji, protože jsou chvíle, kdy je každá verze datového souboru pohodlnější.
    
* Pokud například nabízíte dvě verze datového souboru s délkou 0 až 360 a jednou s délkou 180 až 180:
    * Můžete použít volitelné [&lt;přístupný ViaWMS&gt; false&lt;/přístupný ViaWMS&gt;] (#Accessibleviawms) s 0 až 360 datovým souborem k násilnému vypnutíWMSslužba pro tento datový soubor. Pak bude přístupná pouze verze -180 až 180 souborůWMS.
    * Existuje několik způsobů, jak udržet datový soubor Lon0360 aktuální se změnami základního datového souboru:
        * Pokud je soubor údajů o dítětiEDDGridFromErddap soubor, který odkazuje na datový soubor ve stejnémERDDAP™, soubor údajů Lon0360 se pokusí přímo přihlásit k podkladovému souboru tak, aby byl vždy aktuální. Přímé předplatné nevytváří e-maily, které vás žádají o potvrzení předplatného - validace by měla být provedena automaticky.
        * Pokud dětský soubor údajů neníEDDGridOdErddap soubor, který je na stejnéERDDAP™, soubor údajů Lon0360 se pokusí použít systém pravidelného předplatného k upsání základního datového souboru. Pokud máte systém předplatného ve svémERDDAP™Zapnuto, měli byste dostat e-maily a požádat vás o potvrzení předplatného. Prosím, udělejte to.
        * Pokud máte systém předplatného ve svémERDDAP™Vypnuto, soubor souborů Lon0360 může někdy mít zastaralá metadata, dokud není soubor Lon0360 znovu načten. Takže pokud je systém předplatného vypnut, měli byste nastavit [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) nastavení souboru údajů Lon0360 na menší číslo, takže je pravděpodobnější, že dříve zachytí změny souboru údajů o dítěti.
#### EDDGridLon0360 kostra XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)agregáty dvě nebo víceEDDGridSoubory údajů (děti) Bok po boku.

* Výsledný datový soubor má všechny proměnné ze všech dětských souborů.
* Databáze rodičů a všechny soubory údajů o dětech musí být odlišnédatasetIDs. Pokud jsou jména v rodině úplně stejná, soubor údajů selže při načtení (s chybovou zprávou, že hodnoty souhrnné osy nejsou v seřazeném pořadí) .
* Všechny děti musí mít stejné výchozí hodnoty proaxisVariableán\\[1+\\]  (například zeměpisná šířka, zeměpisná délka) . Přesnost zkoušky určuje[zápasAxisNDigits](#matchaxisndigits).
* Děti mohou mít různé výchozí hodnoty proaxisVariableán\\[0\\]  (například čas) , ale obvykle jsou většinou stejné.
* Zdá se, že mateřský soubor bude mít všechnyaxisVariableán\\[0\\]výchozí hodnoty od všech dětí.
* To například umožňuje kombinovat zdrojový soubor s U-komponentou vektoru a dalším zdrojovým datovým souborem s v-komponentou vektoru, takže mohou být podávaná kombinovaná data.
* Děti vytvořené touto metodou jsou drženy v soukromí. Nejsou samostatně přístupné datové soubory (například požadavky klientů na údaje nebo[Soubory s vlajkou](/docs/server-admin/additional-information#flag)) .
* Globální metadata a nastavení pro rodiče pocházejí z globálních metadat a nastavení pro první dítě.
* Pokud existuje výjimka při vytváření prvního dítěte, rodiče nebudou stvořeni.
* Pokud existuje výjimka při vytváření jiných dětí, to posílá e-mail na e-mail vše (jak je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) a pokračuje s ostatními dětmi.
#### EDDGridBoční kostra XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridAgregátExistujícíRozměr{#eddgridaggregateexistingdimension} 
[ **EDDGridAgregátExistujícíRozměr** ](#eddgridaggregateexistingdimension)agregáty dvě nebo víceEDDGriddatové soubory, z nichž každý má jiný rozsah hodnot pro první rozměr, ale stejné hodnoty pro ostatní rozměry.

* Například jeden soubor údajů o dětech může mít 366 hodnot. (pro rok 2004) pro časový rozměr a jiné dítě může mít 365 hodnot (pro rok 2005) pro časovou dimenzi.
* Všechny hodnoty pro všechny ostatní rozměry (například zeměpisná šířka, zeměpisná délka) Musí být stejné pro všechny děti. Přesnost zkoušky určuje[zápasAxisNDigits](#matchaxisndigits).
* Vytříděné hodnoty rozměrů - Hodnoty pro každý rozměr MUSÍ být v seřazeném pořadí (vzestupně nebo sestupně) . Hodnoty mohou být nepravidelně rozloženy. Nejsou žádné vazby. To je požadavek[Standard metadat CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Pokud hodnoty jakéhokoli rozměru nejsou v seřazeném pořadí, soubor dat se nenačte aERDDAP™určí první netříděnou hodnotu v souboru záznamu, *velkýRodič rodičů* /logs/log.txt .
    
Netříděné hodnoty rozměrů téměř vždy indikují problém se zdrojovým souborem. To se nejčastěji vyskytuje, když je do agregace zahrnut chybný nebo nevhodný soubor, což vede k netříděné časové dimenzi. Pro vyřešení tohoto problému viz chybová zpráva vERDDAP™log.txt soubor k nalezení urážlivé časové hodnoty. Pak se podívejte do zdrojových souborů najít odpovídající soubor (nebo jeden před nebo jeden po) To nepatří do agregace.
    
* Databáze rodičů a soubor údajů o dětech se musí lišitdatasetIDs. Pokud jsou jména v rodině úplně stejná, soubor údajů selže při načtení (s chybovou zprávou, že hodnoty souhrnné osy nejsou v seřazeném pořadí) .
* V současné době, dítě soubor musí býtEDDGridFromDap data data a MUSÍ mít nejnižší hodnoty souhrnné dimenze (obvykle nejstarší časové hodnoty) . Všechny ostatní děti musí být téměř stejné soubory údajů. (se liší jen v hodnotách pro první rozměr) a jsou určeny jen jejichsourceUrl.
* Souhrnný soubor dat získává metadata od prvního dítěte.
* The[Generovat soubory dat Xml program](#generatedatasetsxml)může vytvořit hrubý návrhdatasets.xmlproEDDGridAgregátExisingDimension založený na souboru souborů, které podáváHyraxnebo THREDDS server. Například, použijte tento vstup pro program ("/1988" v URL dělá příklad běžet rychleji) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Můžete použít výsledný&lt;sourceUrl&gt; značky nebo odstranit a odkomentovat&lt;sourceUrl&gt; tag (tak, že nové soubory jsou zaznamenány pokaždé, když je soubor znovu načten.
#### EDDGridAgregátExistující kostra rozdělení XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridKopírovat{#eddgridcopy} 
[ **EDDGridKopírovat** ](#eddgridcopy)vyrábí a udržuje místní kopii jinéhoEDDGrid's daty a slouží data z místní kopie.

*   EDDGridKopírovat (a pro tabulková data,[EDDtableCopy](#eddtablecopy)) je velmi snadné použití a velmi efektivní
     **řešení některých největších problémů se službou dat ze vzdáleného zdroje dat:** 
    * Přístup k datům ze vzdáleného zdroje dat může být pomalý.
        * Může být pomalý, protože je neodmyslitelně pomalý. (například neefektivní typ serveru) ,
        * Protože je přemožena příliš mnoha požadavky,
        * nebo proto, že váš server nebo vzdálený server je omezen.
    * Vzdálený datový soubor je někdy nedostupný (znovu, z různých důvodů) .
    * Spoléhání na jeden zdroj pro data se neměří dobře (například, když mnoho uživatelů a mnohoERDDAPVyužijte ho.) .
         
* Jak to funguje...EDDGridKopírování řeší tyto problémy tím, že automaticky vytvoří a udržuje místní kopii dat a slouží data z místní kopie.ERDDAP™může sloužit data z místní kopie velmi, velmi rychle. A vytvoření místní kopie uvolní zátěž vzdáleného serveru. A místní kopie je záloha originálu, což je užitečné pro případ, že by se něco stalo s originálem.
    
Na vytvoření místní kopie souboru není nic nového. Co je tady nového je, že tato třída to dělá\\*snadné\\*vytvořit a\\*udržovat\\*místní kopie údajů z\\*odrůda\\*typů vzdálených zdrojů dat a\\*přidat metadata\\*při kopírování dat.
    
* Kousky dat...EDDGridKopírování dělá místní kopii dat tím, že požaduje kousky dat ze vzdáleného&lt;Soubor údajů &gt; . Tam bude kus pro každou hodnotu z nejlevnějších (první) proměnná osy.EDDGridKopírování nespoléhá na čísla indexu vzdáleného datového souboru pro osu - ty se mohou změnit.
    
UPOZORNĚNÍ: Pokud je velikost kusu dat tak velká (&gt; 2GB) že způsobuje problémy,EDDGridKopii nelze použít. (Promiňte, doufáme, že pro tento problém budeme mít řešení v budoucnosti.) 
    
*   \\[Alternativa kEDDGridKopírovat -
Pokud jsou vzdálená data dostupná prostřednictvím stažených souborů, nikoli webové služby, použijte[cache Možnost FromUrl proEDDGridFromFiles](#cachefromurl), který tvoří místní kopii vzdálených souborů a slouží data z místních souborů.\\]
* Místní soubory... Každý kus dat je uložen v samostatnémNetCDFsoubor v podadresáři *velkýRodič rodičů* /kopie/ *datasetID* / (jak je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Jméno souboru vytvořené z osových hodnot je upraveno tak, aby byly bezpečné (Například pomlčky se nahrazují "x2D") Tohle nemá vliv na skutečná data.
     
* Nová data -- PokaždéEDDGridKopírování je znovu načteno, kontroluje ovladač&lt;Databáze &gt; zjistit, jaké kousky jsou k dispozici. Pokud soubor pro kus dat již neexistuje, je do fronty přidán požadavek na získání kusu.ERDDAP's úkolemThread zpracovává všechny ve frontě žádosti o kousky dat, jeden po druhém. Můžete vidět statistiky pro úkolThread činnost na[Stavová stránka](/docs/server-admin/additional-information#status-page)a v[Denní zpráva](/docs/server-admin/additional-information#daily-report). (Ano.ERDDAP™by mohl přidělit více úkolů tomuto procesu, ale to by využít spoustu vzdáleného zdroje dat šířky pásma, paměti a času CPU, a mnoho místníchERDDAP's šířkou pásma, pamětí a CPU časem, ani jeden z nich není dobrý nápad.) 
    
POZNÁMKA: Úplně poprvéEDDGridRozumím. (Pokud vše půjde dobře) Do fronty úkolThread bude přidáno mnoho žádostí o kousky dat, ale nebudou vytvořeny žádné místní datové soubory. Takže konstruktér selže, ale úkolThread bude i nadále pracovat a vytvářet místní soubory. Pokud vše půjde dobře, úkolThread vytvoří místní datové soubory a další pokus o opětovné načtení datového souboru (za ~15 minut) bude úspěšný, ale zpočátku s velmi omezeným množstvím dat.
    
POZNÁMKA: Poté, co má místní datový soubor nějaká data a objeví se ve vašemERDDAP, pokud je vzdálený datový soubor dočasně nebo trvale nepřístupný, bude místní datový soubor stále fungovat.
    
UPOZORNĚNÍ: Pokud je vzdálený datový soubor velký a/nebo je vzdálený server pomalý (To je ten problém, že?) , bude trvat dlouho, aby kompletní místní kopii. V některých případech bude potřebný čas nepřijatelný. Například přenos 1 TB dat přes řádek T1 (0, 15 GB/s) trvá nejméně 60 dní, za optimálních podmínek. Navíc využívá spoustu šířky pásma, paměti a času CPU na vzdálených a místních počítačích. Řešením je odeslání pevného disku správci vzdálené datové sady tak, aby mohl vytvořit kopii souboru dat a odeslat pevný disk zpět vám. Použít tyto údaje jako výchozí bod aEDDGridKopírování do něj přidá data. (To je jeden způsob, jak[Cloud Service společnosti Amazon](https://aws.amazon.com/importexport/)řeší problém, i když jejich systém má hodně šířky pásma.) 
    
UPOZORNĚNÍ: Pokud je daná hodnota pro levý (první) proměnná osy mizí ze vzdáleného datového souboru,EDDGridKopírování nevymaže místní zkopírovaný soubor. Jestli chceš, můžeš to smazat sám.
    
#### @ info: whatsthis Údaje{#grid-copy-checksourcedata} 
Thedatasets.xmlpro tento datový soubor může mít volitelnou značku
```
    <checkSourceData>true</checkSourceData>  
```
Výchozí hodnota je pravdivá. Pokud / když jej nastavíte na false, data nikdy nezkontrolují zdrojový soubor, aby zjistili, zda jsou k dispozici další data.

#### pouze od{#onlysince} 
You can tellEDDGridKopírovat pro vytvoření kopie podmnožiny zdrojového souboru, místo celého zdrojového souboru, přidáním značky ve formuláři&lt;pouzeOd&gt; *některé Hodnota* &lt;/pouzeOd &gt; do souboru údajůdatasets.xmlkus.EDDGridKopírování bude stahovat pouze hodnoty dat související s hodnotami prvního rozměru (obvykle časový rozměr) které jsou větší než *některé Hodnota* . *některé Hodnota* může být:
    * Relativní čas stanovený prostřednictvímnow- *nJednotky* .
Například,&lt;pouzeOd&gt;now-2 roky&lt;/pouzeVzhledem k tomu, že &gt; říká datovému souboru, aby pouze místní kopie údajů pro data, kde hodnoty vnějšího rozměru (obvykle časové hodnoty) jsou v posledních dvou letech (který je přehodnocen pokaždé, když je soubor dat znovu načten, což je, když hledá nové údaje kopírovat) . Viz[now- *nJednotky* Popis syntaxe](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). To je užitečné, pokud má první rozměr časová data, což obvykle má.
        
        EDDGridKopírování nevymaže místní datové soubory, které mají data, která časem zestárnounow- *nJednotky* . Tyto soubory můžete kdykoli smazat, pokud se rozhodnete. Pokud ano, důrazně doporučujeme nastavit[vlajka](/docs/server-admin/additional-information#flag)poté, co smažete soubory k prozrazeníEDDGridKopírovat pro aktualizaci seznamu cached souborů.
        
    * Pevný bod v čase určený jako řetězec ISO 8601yyyy-MM-ddTHH:mm:ssZ.
Například,&lt;pouzeOd &gt;2000-01-01T00:00:00Z&lt;/onlyOd té doby&gt; říká souboru dat pouze, aby místní kopie dat, kde je hodnota prvního rozměru \\&gt;=2000-01-01T00:00:00Z . To je užitečné, pokud první rozměr má data času, což obvykle dělá.
         
    * Číslo plovoucího bodu.
Například,&lt;pouzeOd &gt;94668480. 0&lt;/pouzeOd &gt; . Jednotky budou cílové jednotky první dimenze. Například pro časové rozměry, jednotky vERDDAP™jsou vždy"seconds since 1970-01-01T00:00:00Z". Takže 94668480.0."seconds since 1970-01-01T00:00:00Z"odpovídá 2000-01-01T00:00:00Z. To je vždy užitečná volba, ale je zvláště užitečná, když první dimenze nemá data o čase.

#### EDDGridKopírovat doporučené použití{#eddgridcopy-recomended-use} 
1. Vytvořit&lt;Databáze &gt; položka (původní typ, nikoliEDDGridKopírovat) pro vzdálený zdroj dat.
     **Udělejte to správně, včetně všech požadovaných metadat.** 
2. Pokud je to příliš pomalé, přidejte XML kód k zabalení doEDDGridKopírovat data.
    * Použít jinýdatasetID  (Možná změnoudatasetIDstarýchdatasetIDmírně) .
    * Kopírovat&lt;přístupný To&gt;,&lt;reloadEveryNMinutes&gt; a&lt;onChange&gt; ze vzdálenéhoEDDGrid's XML naEDDGridXML kopie. (Jejich hodnoty proEDDGridKopírovat hmotu; jejich hodnoty pro vnitřní datový soubor jsou irelevantní.) 
3.  ERDDAP™vytvoří a udržuje místní kopii údajů.
         
* UPOZORNĚNÍ:EDDGridKopírovat předpokládá, že hodnoty dat pro každý kus se nikdy nezmění. Pokud ano, musíte ručně smazat jednotlivé soubory v *velkýRodič rodičů* /kopie/ *datasetID* / která se změnila a[vlajka](/docs/server-admin/additional-information#flag)soubor údajů, který má být znovu načten, aby byly smazané kusy nahrazeny. Pokud máte e-mailové předplatné datového souboru, dostanete dva e-maily: jeden, když soubor dat poprvé načte a začne kopírovat data, a další, když se soubor dat znovu načte (automaticky) a detekuje nové místní datové soubory.
     
* Všechny hodnoty osy musí být stejné.
Pro každou z os kromě těch nejlevějších (první) , všechny hodnoty musí být stejné pro všechny děti. Přesnost zkoušky určuje[zápasAxisNDigits](#matchaxisndigits).
     
* Nastavení, Metadata, Proměnné --EDDGridKopírovat používá nastavení, metadata a proměnné z uzavřeného zdrojového souboru.
     
* Změnit metadata -- Pokud potřebujete změnit některýaddAttributesnebo změnit pořadí proměnných spojených se zdrojovým datovým souborem:
    1. ZměňteaddAttributespro zdrojový soubor dat vdatasets.xml, podle potřeby.
    2. Smazat jeden z kopírovaných souborů.
    3. Nastavit[vlajka](/docs/server-admin/additional-information#flag)okamžitě načíst soubor údajů. Pokud použijete vlajku a máte e-mailové předplatné datového souboru, dostanete dva e-maily: jeden, když soubor dat poprvé znovu načte a začne kopírovat data, a druhý, když se soubor dat znovu načte (automaticky) a detekuje nové místní datové soubory.
    4. Smazaný soubor bude regenerován s novými metadaty. Pokud zdrojový soubor není k dispozici,EDDGridKopírovat soubor získá metadata z regenerovaného souboru, protože je to nejmladší soubor.
#### EDDGridKopírovat kostru XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
[ **EDDTableFromCassandra** ](#eddtablefromcassandra)zpracovává údaje z jednoho[Cassandra](https://cassandra.apache.org/)stůl. Cassandra je databáze NoSQL.

*   ERDDAP™může pracovat s Cassandra v2 a v3 bez změn nebo rozdílů v nastavení. Testovali jsme s[Cassandra v2 a v3 z Apač](https://cassandra.apache.org/download/). PravděpodobněERDDAP™může také pracovat s Cassandrou staženou z DataStax.
     
* Pro srpen 2019 - květen 2021 jsme měli problém přimět Cassandru pracovat s AdoptOpenJdkemJavav8. Hodila EXCEPTION\\_ACCESS\\_VIOLATION). Ale teď (květen 2021) , že problém je pryč: můžeme úspěšně použít Cassandra v2.1.22 a AdopOpenJdk jdk8u292-b10.
     
#### Jedna tabulka{#one-table} 
Cassandra nepodporuje "připojení" tak, jak to dělají relační databáze. JednaERDDAP™EDDTableFromCassandra databázové mapy na jednu (možná podmnožina jednoho) Stůl Cassandry.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™přichází s Cassandrou.Javařidič, takže nemusíte instalovat samostatně.
* Pečlivě si přečtěte všechny informace tohoto dokumentu o EDDTableFromCassandra. Některé detaily jsou velmi důležité.
* CassandraJavařidič je určen k práci s Apache Cassandra (1,2+) a DataStax Enterprise (3.1+) . Pokud používáte Apache Cassandra 1.2.x, musíte upravit soubor cassandra.yaml pro každý uzel pro nastavení startu\\_native\\_transport: true, pak restartovat každý uzel.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak můžete upravit, že na jemné naladění (zejména [&lt;oddíl Název KeySource &gt;] (#partitionkeysourcenames) ). Většinu informací, které potřebujete k vytvoření XML pro datový soubor EDDTableFromCassandra, můžete shromáždit prostřednictvím kontaktu se správcem Cassandry a vyhledáváním na webu.
    
Generovat soubory dat Xml má dvě speciální možnosti pro EDDTableFromCassandra:
    
    1. Pokud vstoupíte "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" (bez kotací) pro klíčový prostor program zobrazí seznam klíčových prostor
    2. Pokud vstoupíte do určitého klíčového prostoru a zadáte "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" (bez kotací) pro název tabulky, program zobrazí seznam tabulek v tomto keyspace a jejich sloupců.
##### Citlivost případu{#case-sensitivity} 
* Klíčově citlivé názvy a tabulky -
Cassandra zachází se jmény klíčů a tabulky způsobem, který je citlivý na případy. Kvůli tomuhle nesmíte nikdy použít rezervované slovo. (ale s jiným případem) jako keyspace Cassandra nebo jméno stolu.
* Název sloupce necitlivý na případy --
Ve výchozím nastavení, Cassandra zachází názvy sloupců způsobem, který je citlivý na případy. Pokud použijete jedno z Cassandriných vyhrazených slov jako název sloupce (Prosím, ne&#33;) , musíte použít
```
        <columnNameQuotes>"<columnNameQuotes>  
```
vdatasets.xmlpro tento datový soubor tak, aby Cassandra aERDDAP™bude s názvy sloupců zacházet způsobem, který je citlivý na případy. To bude pravděpodobně masivní bolest hlavy pro vás, protože je těžké určit případ citlivé verze jmen sloupců - Cassandra téměř vždy zobrazuje názvy sloupců jako všechny malé-případ, bez ohledu na skutečný případ.
* úzce spolupracovat se správcem Cassandry, který může mít příslušné zkušenosti. Pokud datový soubor nenačte, přečtěte si[chybová zpráva](#troubleshooting-tips)pečlivě zjistit proč.
         
#### Cassandra&lt;spojení Nemovitost&gt;{#cassandra-connectionproperty} 
Cassandra má vlastnosti připojení, které mohou být uvedeny vdatasets.xml. Mnoho z nich ovlivní výkon Cassandry...ERDDAP™spojení. Bohužel, vlastnosti Cassandra musí být nastaveny programově vJavaTakžeERDDAP™musí mít kód pro každou nemovitostERDDAP™Podpora. V současné době,ERDDAP™podporuje tyto vlastnosti:
 (Zobrazené výchozí hodnoty jsou to, co vidíme. Default vašeho systému může být jiný.) 

*    **Obecné možnosti**   
    &lt;spojení Název nemovitosti=" **komprese** "&gt; *žádný|LZ4|Snappy* &lt;/připojení Majetek &gt; (případ-necitlivý, výchozí=ne)   
     (Obecné kompresní poradenství: použijte "ne," pokud je spojení mezi Cassandrou aERDDAP™je lokální/rychlostní a pokud je spojení vzdálené/pomalé, použijte 'LZ4'.)   
    &lt;spojení Název nemovitosti=" **pověřovací listiny** "&gt; *uživatelské jméno/heslo* &lt;/připojení Majetek &gt; (To je doslova.'/')   
    &lt;spojení Název nemovitosti=" **metriky** "&gt; *pravda|false* &lt;/připojení Majetek &gt; (2021-01-25 byl výchozí=true, nyní ignorován a vždy false)   
    &lt;spojení Název nemovitosti=" **přístav** "&gt; *anInteger* &lt;/připojení Majetek &gt; (výchozí pro nativní binární protokol=9042)   
    &lt;spojení Název nemovitosti=" **ssl** "&gt; *pravda|false* &lt;/připojení Majetek &gt; (default=false)   
     (Můj rychlý pokus použít ssl selhal. Pokud uspějete, prosím, řekněte mi, jak jste to udělal.) 
*    **Možnosti dotazu**   
    &lt;spojení Název nemovitosti=" **soulad Úroveň** "&gt; *všechny|jakékoli|každý\\_quorum|místní\\_one|místní\\_quorum|místní\\_serial|jeden|usnášeníschopnost|sériová|tři|dva* &lt;/připojení Majetek &gt; (případ necitlivý, výchozí=ON)   
    &lt;spojení Název nemovitosti=" **getSize** "&gt; *anInteger* &lt;/připojení Majetek &gt; (výchozí=5000)   
     (Nenastavujte getSize na menší hodnotu.)   
    &lt;spojení Název nemovitosti=" **Sériová konzistenceLevel** "&gt; *všechny|jakékoli|každý\\_quorum|místní\\_one|místní\\_quorum|místní\\_serial|jeden|usnášeníschopnost|sériová|tři|dva* &lt;/připojení Majetek &gt; (nesenzitivní případ, výchozí hodnota = SERIAL) 
*    **Možnosti socketu**   
    &lt;spojení Název nemovitosti=" **connectTimeoutMillis** "&gt; *anInteger* &lt;/připojení Majetek &gt; (výchozí=5000)   
     (Nenastavit připojení TimeoutMillis na menší hodnotu.)   
    &lt;spojení Název nemovitosti=" **uchovávatAlive** "&gt; *pravda|false* &lt;/připojení Majetek &gt;
    &lt;spojení Název nemovitosti=" **readTimeoutMillis** "&gt; *anInteger* &lt;/připojení Majetek &gt;
     (Cassandra výchozí readTimeoutMillis je 12000, aleERDDAP™změní výchozí hodnotu na 120000. Pokud Cassandra hází readTimeouts, zvýšení to nemusí pomoci, protože Cassandra někdy hází je dříve než tentokrát. Problém je pravděpodobnější, že ukládáte příliš mnoho dat na oddíl Klíčová kombinace.)   
    &lt;spojení Název nemovitosti=" **receiveBufferSize** "&gt; *anInteger* &lt;/připojení Majetek &gt;
     (Není jasné, co je výchozí receiveBufferSize. Nenastav to na malou hodnotu.)   
    &lt;spojení Název nemovitosti=" **soLinger** "&gt; *anInteger* &lt;/připojení Majetek &gt;
    &lt;spojení Název nemovitosti=" **tcpNoDelay** "&gt; *pravda|false* &lt;/připojení Majetek &gt; (default=null) 

Pokud potřebujete být schopni nastavit další vlastnosti připojení, viz naše[oddíl o získání dodatečné podpory](/docs/intro#support).

Pro daný startup Tomcat se připojeníProperties používá pouze poprvé, kdy je vytvořen soubor dat pro danou Cassandra URL. Všechny reloady tohoto datového souboru a všech následných souborů, které sdílejí stejnou URL, budou používat tyto originální připojeníProperties.
    
#### CQL{#cql} 
Jazyk dotazů Cassandra (CQL) je povrchně jako SQL, dotaz jazyk používaný tradiční databáze. ProtožeOPeNDAP's tabulkovými požadavky na data byly navrženy tak, aby napodobovaly požadavky SQL tabulky dat, je možné proERDDAP™převést tabulkové žádosti o data do CQL Bound/PreparedStatements.ERDDAP™vloží prohlášení do[log.txt](/docs/server-admin/additional-information#log)jako
prohlášení jako text: *státAsText*   
Verze prohlášení, kterou uvidíte, bude textovou reprezentací prohlášení a bude mít pouze "?" kde budou umístěny mezní hodnoty.
       
Není to tak jednoduché... Bohužel, CQL má mnoho omezení, na které sloupce mohou být dotazovány, s kterými typy omezení, například oddíly klíčových sloupců lze omezit s = a IN, takžeERDDAP™pošle Cassandra několik omezení a použije všechna omezení po obdržení údajů od Cassandry. Abych pomohl.ERDDAP™efektivně jednat s Cassandra, musíte upřesnit [&lt;oddíl Název KeySource &gt;] (#partitionkeysourcenames) , [&lt;ClosterColumnSourceNames&gt;] (#clustercolumsourcenames) a [&lt;indexColumnSourceNázevs&gt;] (#indexcolunctionsourcenames) vdatasets.xmlpro tento datový soubor. To jsou nejdůležitější způsoby, jak pomoci.ERDDAP™efektivně pracovat s Cassandrou. Když to neřeknešERDDAP™Tyto informace, data budou bolestivě pomalé vERDDAP™a využít tuny zdrojů Cassandry.
     
#### &lt;oddíl Jméno KeySource&gt;{#partitionkeysourcenames} 
Protože diskové klíče hrají ústřední roli v tabulkách Cassandra,ERDDAP™potřebuje znát jejichsourceNames a případně další informace o tom, jak s nimi pracovat.
* Musíte zadat čárku oddělený seznam jmen zdrojového sloupce oddílu vdatasets.xmlpřes&lt;oddíl KeySourceNames&gt;.
Jednoduchý příklad,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Složitější příklad:
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys -- Je-li jedním ze sloupců klíčů oddílu sloupec časové razítko, který má hrubou verzi jiného sloupce časového razítka, zadejte tuto informaci přes
     *oddílKeySourcName/otherColumnSourceName/time\\_precision*   
kdetime\\_precisionje jeden z[time\\_precision](#time_precision)struny používané jinde vERDDAP.
Stopa Z vtime\\_precisionřetězec je výchozí, takže nezáleží na tom, zdatime\\_precisionřetězec končí v Z nebo ne.
Například,ERDDAP™bude interpretovat datum/vzorkčas/1970-01-01 jako "Závazky pro datum lze vytvořit z omezení doby odběru vzorků pomocí tohototime\\_precision.." Skutečná konverze omezení je složitější, ale to je přehled.
     **Použijte to, kdykoli je to důležité.** UmožňujeERDDAP™pracovat efektivně s Cassandrou. Pokud tento vztah mezi sloupcemi existuje v tabulce Cassandra a neřekneteERDDAP™, datový soubor bude bolestivě pomalý vERDDAP™a využít tuny zdrojů Cassandry.
* Jednoduché Klíče k rozdělení hodnot -- Pokud chceteERDDAP™Soubor dat pro práci pouze s jednou hodnotou jednoho diskového klíče, upřesněte *oddílKeySourceName=hodnota* .
Nepoužívejte citace pro numerický sloupec, například deviceid=1007
Používat citace pro String sloupec, například, standid="Point Pinos"
* Nastavení dat Default Sort Order -- Pořadí klíče pro rozdělení&lt;dataVariable&gt; je vdatasets.xmlurčuje výchozí pořadí výsledků od Cassandry. Uživatelé samozřejmě mohou požádat o jiný druh objednávky pro daný soubor výsledků zadáním &orderBy (" *čárka oddělený seznam proměnných* ") až do konce jejich dotazu.
* Ve výchozím nastavení, Cassandra aERDDAP™zacházet s názvy sloupců necitlivým způsobem. Ale když to nastavíš[sloupecNázevQuotes](#case-sensitivity)"ERDDAP™bude zacházet s názvy sloupců Cassandra v případě citlivém způsobem.
         
#### &lt;oddíl KeyCSV&gt;{#partitionkeycsv} 
Je-li uvedeno toto,ERDDAP™použije ho místo toho, aby požádal Cassandru o oddíl Klíčové informace při každém opětovném načtení souboru údajů. To poskytuje seznam různých hodnot klíče oddílu, v pořadí budou použity. Časy musí být specifikovány jako sekundy od 1970-01-01T00:00:00Z. Ale existují také dva zvláštní alternativní způsoby, jak určit časy (každá zakódovaná jako řetězec) :

1) čas (aISO8601 Čas)   (MŮŽE být zakódován jako řetězec)   
2) "časy (anISO8601StartTime, strideSecond, stopTime) " (Musí být zakódován jako řetězec)   
stop Čas může být ISO8601 Čas nebo "now-čas nUnits (např. "now-3 minuty") .
stop Čas nemusí přesně odpovídat startu. Čas + x krokSecond.
Hádka s časy () hodnota dostane rozšířen do více řádků před každým dotazem, takže seznam oddílu Klíče mohou být vždy dokonale aktuální.
Například,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
expanduje do této tabulky kombinací diskových klíčů:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;ClosterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra akceptuje omezení SQL na klastry, které tvoří druhou část primárního klíče (za rozdělovacím klíčem (án) ) . Takže je důležité identifikovat tyto sloupce pomocí&lt;closterColumnSourceNames&gt;. To umožňujeERDDAP™pracovat efektivně s Cassandrou. Pokud jsou shluky sloupců a neřekneteERDDAP, datový soubor bude bolestivě pomalý vERDDAP™a využít tuny zdrojů Cassandry.
    * Například,&lt;ClosterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Pokud tabulka Cassandra nemá žádné sloupce, buď nespecifikujte&lt;closterColumnSourceNames&gt; nebo jej zadat bez hodnoty.
    * Ve výchozím nastavení, Cassandra aERDDAP™zacházet s názvy sloupců necitlivým způsobem. Ale když to nastavíš[sloupecNázevQuotes](#case-sensitivity)"ERDDAP™bude zacházet s názvy sloupců Cassandra způsobem citlivým na případy.
         
#### &lt;indexColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra přijímá'='omezení na sekundární index sloupce, které jsou sloupce, které jste výslovně vytvořili indexy pro přes
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ano, závorky jsou nutné.)   
Takže je velmi užitečné, když identifikujete tyto sloupce pomocí&lt;indexColumnSourceNázevs&gt;. To umožňujeERDDAP™pracovat efektivně s Cassandrou. Pokud existují sloupce indexu a neřekneteERDDAP, Některé dotazy budou zbytečné, bolestivě pomalé vERDDAP™a využít tuny zdrojů Cassandry.
* Například,&lt;indexColumnSourceNázevs&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNázevs&gt;
* Pokud tabulka Cassandra nemá žádné sloupce indexu, buď nespecifikujte&lt;indexColumnSourceNames&gt;, nebo jej zadat bez hodnoty.
* Cassandra indexy nejsou jako databázové indexy. Cassandra indexy pomáhají pouze s'='omezení. A jsou jen[doporučené](https://cassandra.apache.org/doc/latest/cql/indexes.html)pro sloupce, které mají mnohem méně odlišných hodnot než celkové hodnoty.
* Ve výchozím nastavení, Cassandra aERDDAP™zacházet s názvy sloupců necitlivým způsobem. Ale když to nastavíš[sloupecNázevQuotes](#case-sensitivity)"ERDDAP™bude zacházet s názvy sloupců Cassandra způsobem citlivým na případy.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
Kdy?ERDDAP™  (re) zatížení souboru dat,ERDDAP™dostane od Cassandry seznam různých kombinací diskových klíčů. Pro obrovský datový soubor bude počet kombinací obrovský. Pokud chcete zabránit žádosti uživatelů požadovat většinu nebo všechny soubory údajů (nebo dokonce žádost, která se ptáERDDAP™stáhnout většinu nebo všechny údaje za účelem dalšího filtrování) , můžete říctERDDAP™pouze povolit žádosti, které snižují počet kombinací prostřednictvím&lt;maxRequestFraction&gt;, což je číslo plovoucího bodu mezi 1e-10 (Což znamená, že žádost nemůže potřebovat více než jednu kombinaci v miliardě.) a 1 (selhání, což znamená, že žádost může být pro celý soubor údajů) .
Například pokud má datový soubor 10000 různých kombinací diskových klíčů a maxRequestFraction je nastaven na 0,1,
pak žádosti, které potřebují data ze 1001 nebo více kombinací, vytvoří chybovou zprávu,
ale budou povoleny žádosti, které potřebují údaje od 1000 nebo méně kombinací.
    
Obecně platí, že čím větší soubor dat, tím nižší byste měli nastavit&lt;maxRequestFraction&gt;. Takže to můžete nastavit na 1 pro malý datový soubor, 0,1 pro středně velký datový soubor, 0,01 pro velký datový soubor a 0,0001 pro obrovský datový soubor.
    
Tento přístup zdaleka není dokonalý. To povede k tomu, že některé rozumné žádosti budou zamítnuty a některé příliš velké žádosti budou povoleny. Je to však obtížný problém a toto řešení je mnohem lepší než nic.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Stejně jako u ostatních datových souborů v programu EDDTable můžete zadat seznam oddělených čárkami&lt;dataVariable&gt;destinationNames v globálním atributu nazvaném "[subsetVariables](#subsetvariables)" určit proměnné, které mají omezený počet hodnot. Soubor pak bude mít webovou stránku .subset a zobrazí seznamy různých hodnot pro tyto proměnné v seznamech drop-down na mnoha webových stránkách.
    
Včetně proměnných klíčů pro rozdělení a statických sloupců v seznamu je STRONGLIE ENCOUraged. Cassandra bude moci vytvořit seznam různých kombinací velmi rychle a snadno pokaždé, když je soubor dat znovu načten. Výjimkou jsou klíče od časoznaku, které jsou hrubými verzemi některého jiného sloupce časového razítka -- je pravděpodobně nejlepší je vynechat ze seznamusubsetVariablesprotože existuje velké množství hodnot a nejsou příliš užitečné pro uživatele.
    
Pokud zahrnete nerozdělovací klíč, nestatické proměnné do seznamu, bude pravděpodobně **velmi** Výpočetně drahé pro Cassandra pokaždé, když je soubor dat znovu načten, protožeERDDAP™musí procházet každý řádek datového souboru, aby informace vygeneroval. Ve skutečnosti, dotaz pravděpodobně selže. Takže, až na velmi malé soubory dat, toto je STRONGLY DISCOURAGED.
    
#### DataTypes Cassandra{#cassandra-datatypes} 
Protože je tu nějaká nejednoznačnost, o které[Datové typy Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)mapa, na kterouERDDAP™datové typy, musíte zadat [&lt;dataType&gt;] (#datatyp) tag pro každého [&lt;dataVariable&gt;] (# Dataproměnná) říctERDDAP™které dataType použít. StandardERDDAP™údaje Typy (a nejčastější odpovídající datové typy Cassandra) jsou:
    
*   [boolean](#boolean-data)  (boolean) , kteréERDDAP™pak obchody jako byty
* byte (int, pokud je rozsah -128 až 127) 
* krátké (int, pokud je rozsah -32768 až 32767) 
* int (int, counter?, varint?, pokud je dosah -2147483648 až 2147483647) 
* dlouhé (bigint, pult?, varint?, je-li rozsah -9223372036854775808 až 922337236854775807) 
* plavat (plavat) 
* dvakrát (dvojité desetinné číslo (s možnou ztrátou přesnosti) , časové razítko) 
* char (ascii nebo text, pokud nikdy nemají více než 1 znak) 
* String (Ascii, text, varchar, inet, uuid, timeuid, blob, mapa, set, list?) 

Cassandra's[časové razítko](#cassandra-timestamp-data)je zvláštní případ: použitíERDDAP's dvojími údaji Typ.

Pokud zadáte String dataType vERDDAP™pro Cassandra mapu, nastavit nebo seznam, mapa, nastavit nebo seznam v každém řádku Cassandra bude převeden na jeden řetězec v jednom řádku vERDDAP™stůl.ERDDAP™má alternativní systém pro seznamy; viz níže.

 *typ* Seznamy...ERDDAP's [&lt;dataType&gt;] (#datatyp) značka pro CassandrudataVariables může zahrnovat pravidelnéERDDAP™údaje Typy (viz výše) plus několik speciálních datových typů, které lze použít pro sloupce seznamu Cassandra: booleanList, byteList, ubyteList, shortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Když jeden z těchto sloupců seznamu je ve výsledcích jsou předány doERDDAP™, každý řádek zdrojových dat bude rozšířen na seznam. velikost () řádky údajů vERDDAP; jednoduchá data Typy (např. int) v tomto řádku zdrojových dat bude duplikován seznam. velikost () krát. Pokud výsledky obsahují více než jeden seznam proměnných, všechny seznamy v daném řádku údajů musí mít stejnou velikost a musí být "paralelní" seznamy neboERDDAP™vytvoří chybovou zprávu. Například pro měření proudů z ADCP,
hloubka\\[0\\], uCurrent\\[0\\], vCurrent\\[0\\], a zCurrent\\[0\\]jsou všechny související a
hloubka\\[1\\], uCurrent\\[1\\], vCurrent\\[1\\], a zCurrent\\[1\\]jsou všichni příbuzní, ...
Alternativně, pokud nechceteERDDAP™rozšířit seznam do více řádkůERDDAP™tabulka, zadejte String jakodataVariable's údaji Zadejte tak, aby celý seznam byl reprezentován jako jeden String v jednom řádkuERDDAP.
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Data Cassandry jsou vždy obeznámena s časovými pásmy. Pokud zadáte data časového razítka bez upřesnění časového pásma, Cassandra předpokládá, že časové razítko používá místní časové pásmo.
    
ERDDAP™podporuje data časového razítka a vždy uvádí data vZulu/GMT časové pásmo. Takže pokud zadáte data časového razítka v Cassandra pomocí jiného časového pásma nežZulu/GMT, nezapomeňte, že musíte udělat všechny dotazy pro data časového razítka vERDDAP™s použitímZulu/GMT časové pásmo. Takže nebuď překvapená, když hodnoty časového razítka, které vycházejí zERDDAPjsou posunuty o několik hodin kvůli přepínání časového pásma z lokálního naZuluČas GMT.

* InERDDAP'sdatasets.xml, v&lt;dataVariable&gt; tag pro proměnnou časového razítka, nastaveno
```
          <dataType>double</dataType>  
```
a&lt;addAttributes&gt; nastaveno
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Návrh: Pokud jsou data časovým rozsahem, je užitečné, aby se hodnoty časového razítka vztahovaly na střed implikovaného časového rozsahu. (například poledne) . Například pokud má uživatel data za 2010-03-26T13:00Z z jiného datového souboru a chce nejbližší data z tohoto souboru souborů Cassandra, která mají data za každý den, pak data za 2010-03-26T12:00Z (představující údaje Cassandra pro uvedené datum) je samozřejmě nejlepší (oproti půlnoci před nebo po, kde je méně zřejmé, co je nejlepší) .
*   ERDDAP™má nástroj pro[Převést numerické Čas do/z doby řetězce](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Viz[JakERDDAP™Obchoduje s časem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer nulls{#integer-nulls} 
Cassandra podporuje nuly v Cassandra int (ERDDAP™int) a velký (ERDDAP™dlouhé) sloupce, aleERDDAP™nepodporuje true nulles pro žádný integer datový typ.
Ve výchozím nastavení, Cassandra integer nulls bude převeden vERDDAP™do 2147483647 pro int sloupce nebo 9223372036854775807 pro dlouhé sloupy. Tyto se objeví jako "NaN" v některých typech textových výstupních souborů (například .csv) , "" v jiných typech textových výstupních souborů (například:.htmlTable) , a zvláštní číslo (2147483647 pro chybějící int hodnoty) v jiných typech souborů (například binární soubory jako.nca rohož) . Uživatel může vyhledávat řádky dat s tímto typem chybějící hodnoty odkazem na "NaN," např. "&windSpeed=NaN."
    
Pokud použijete nějakou jinou celočíselnou hodnotu k označení chybějících hodnot v tabulce Cassandra, prosím, uveďte tuto hodnotu vdatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Pro Cassandra plovoucí bod sloupce, nuly se převést na NaNs vERDDAP. Pro datové typy Cassandra, které jsou převedeny na Strings inERDDAP™, nuly jsou převedeny na prázdné Strings. To by neměl být problém.
    
#### "WARNING: Re-příprava již připravený dotaz"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-příprava již připravený dotaz" v *tomcat* /logs/catalina.out (nebo nějaký jiný soubor protokolu Tomcat)   
Cassandra dokumentace říká, že je problém, pokud stejný dotaz je provedena do připravenéStatement dvakrát (nebo více) . (Vidíš tohle?[hlášení chyby](https://datastax-oss.atlassian.net/browse/JAVA-236).) Aby se vyhnula naštvání Cassandry,ERDDAP™caches všechny PřipravenéStatements tak, aby je mohl znovu použít. Tato cache je ztracena, pokud / když Tomcat /ERDDAP™je restartován, ale myslím, že je to v pořádku, protože připravené stavy jsou spojeny s danou relací (meziJavaa Cassandra) , který je také ztracen. Takže můžete vidět tyto zprávy. Neznám žádné jiné řešení. Naštěstí je to varování, ne chyba. (Ačkoli Cassandra hrozí, že to může vést k problémům s výkonem) .
    
Cassandra tvrdí, že připravené stavy jsou navždy dobré, takžeERDDAP's cache PreparedStatements by nikdy neměla být zastaralá/neplatná. Jestli to není pravda a dostanete chyby ohledně zastaralého stavu, který je zastaralý/neplatný, pak musíte restartovatERDDAP™vymazatERDDAP's cache připravených stavů.
    
#### Bezpečnost Cassandry{#cassandra-security} 
Viz[Zabezpečení Cassandry](https://cassandra.apache.org/doc/latest/operating/security.html)

Při práci s Cassandrou musíte dělat věci tak bezpečně a bezpečně, jak je to možné, abyste nedovolili škodlivému uživateli poškodit Vaši Cassandru nebo získat přístup k datům, ke kterým by neměli mít přístup.ERDDAP™Snaží se také dělat věci bezpečně.

* Povzbuzujeme vás, abyste to připravili.ERDDAP™připojit se k Cassandra jako uživatel Cassandra, který má přístup pouze k **relevantní** tabulka (án) a má pouze práva na čtení.
* Doporučujeme vám nastavit spojení odERDDAP™Cassandra tak, aby to
    * vždy používá SSL,
    * pouze umožňuje připojení z jedné IP adresy (nebo jeden blok adres) a z jednohoERDDAP™uživatele a
    * pouze přenáší hesla ve své MD5 hashed formě.
*   \\[ZNÁMÝ PROBLÉM\\]SpojeníProperties (včetně hesla&#33;) jsou uloženy jako prostý text vdatasets.xml. Nenašli jsme způsob, jak nechat správce zadat heslo Cassandra běhemERDDAP's startup in Tomcat (který nastane bez vstupu uživatele) , takže heslo musí být přístupné v souboru. Aby to bylo bezpečnější:
    * Ty. (váERDDAP™Správce) měl by být vlastníkemdatasets.xmla mají READ a WRITE přístup.
    * Vytvořte skupinu, která zahrnuje pouze uživatelskou=tomcat. Použijte chgrp, aby se skupina prodatasets.xml, jen s oprávněním číst.
    * Použít chmod pro přiřazení práv O-rwx (žádný přístup READ nebo WRITE pro "jiné" uživatele) místodatasets.xml.
* Až dovnitřERDDAP™, heslo a další vlastnosti připojení jsou uloženy v "soukromém"Javaproměnné.
* Žádosti klientů jsou rozebrány a zkontrolovány platnost před generováním CQL žádostí o Cassandru.
* Žádosti o aplikaci Cassandra se podávají s CQL Bound/PreparedStatements, aby se zabránilo aplikaci CQL. Cassandra je v každém případě méně náchylná k CQL injekci než tradiční databáze[SQL injekce](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Cassandra rychlost{#cassandra-speed} 
Cassandra může být rychlá nebo pomalá. Existují věci, které můžete udělat, aby to rychle:
* Obecně -
Povaha CQL je, že dotazy jsou[deklarativní](https://en.wikipedia.org/wiki/Declarative_programming). Jen určují, co uživatel chce. Neobsahují specifikace nebo tipy, jak má být dotaz řešen nebo optimalizován. Takže neexistuje žádná možnost proERDDAP™generovat dotaz takovým způsobem, že to pomáhá Cassandra optimalizovat dotaz (nebo jakýmkoli způsobem určuje, jak má být dotaz řešen) . Obecně je na správci Cassandry, aby věci naplánovali. (například indexy) optimalizovat pro určité typy dotazů.
     
* Upřesnění sloupců časového razítka, které jsou spojeny s hrubým přesným časovým znakem přes [&lt;oddíl Název KeySource &gt;] (#partitionkeysourcenames) je nejdůležitější způsob, jak pomociERDDAP™efektivně pracovat s Cassandrou. Pokud tento vztah existuje v tabulce Cassandra a neřekneteERDDAP™, datový soubor bude bolestivě pomalý vERDDAP™a využít tuny zdrojů Cassandry.
     
* Upřesnění sloupců seskupení prostřednictvím [&lt;ClosterColumnSourceNames&gt;] (#clustercolumsourcenames) je druhý nejdůležitější způsob, jak pomociERDDAP™efektivně pracovat s Cassandrou. Pokud jsou shluky sloupců a neřekneteERDDAP, velká podmnožina možných dotazů na data bude zbytečně, bolestivě pomalé vERDDAP™a využít tuny zdrojů Cassandry.
     
* Značka[Indexy](https://cassandra.apache.org/doc/latest/cql/indexes.html)pro běžné proměnné --
Můžete urychlit několik dotazů vytvořením indexů pro sloupce Cassandra, které jsou často omezeny s "=" omezení.
    
Cassandra nemůže dělat indexy pro seznam, množinu nebo mapu sloupců.
    
* Upřesnění sloupců indexu prostřednictvím [&lt;indexColumnSourceNázevs&gt;] (#indexcolunctionsourcenames) je důležitý způsob, jak pomociERDDAP™efektivně pracovat s Cassandrou. Pokud existují sloupce indexu a neřekneteERDDAP, některé dotazy na data budou zbytečné, bolestivě pomalé vERDDAP™a využít tuny zdrojů Cassandry.
     
#### Statistiky Cassandry{#cassandra-stats} 
*   ["Cassandra stats" Diagnostické zprávy](#cassandra-stats)-- Za každouERDDAP™uživatelský dotaz do souboru Cassandra,ERDDAP™vytiskne řádek v souboru protokolu, *velkýRodič rodičů* /logs/log.txt, s některými statistikami souvisejícími s dotazem, například,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Použití čísel v příkladu výše, to znamená:

* Kdy?ERDDAP™poslední (re) Cassandra řekla:ERDDAP™že existuje 10000 různých kombinací diskových klíčů.ERDDAP™cache všechny odlišné kombinace v souboru.
* Vzhledem k omezením uživatele,ERDDAP™identifikovány 2 kombinace z 10000, které mohou mít požadované údaje. Takže,ERDDAP™2 hovory do Cassandry, jeden pro každou kombinaci diskových klíčů. (To Cassandra vyžaduje.) Je zřejmé, že je obtížné, pokud velký datový soubor má velký počet kombinací diskových klíčů a daný požadavek není drasticky snížit, že. Můžete požadovat, aby každý požadavek snížit klíčový prostor nastavením [&lt;maxRequestFraction&gt;] (#maxrequestfraction) . Tady, 2/10000=2e-4, což je méně než maxRequestFraction (0, 1) Takže žádost byla povolena.
* Po uplatnění omezení na diskové klíče,[sloupce klastrů](#clustercolumnsourcenames)a[indexové sloupce](#indexcolumnsourcenames)které poslalERDDAP™, Cassandra vrátil 1200 řádků dat doERDDAP™v ResultSet.
* Výsledek Set musel mít[údaje Type= *nějaký typ* Seznam](#cassandra-datatypes)sloupce (s průměrem 10 položek na seznam) , protožeERDDAP™Rozšíření 1200 řad z Cassandry na 12000 řadERDDAP.
*   ERDDAP™vždy aplikuje všechna omezení uživatele na data z Cassandry. V tomto případě omezení, která Cassandra nezvládla, snížila počet řádků na 7405. To je počet řádků odeslaných uživateli.

Nejdůležitější použití těchto diagnostických zpráv je zajistit, abyERDDAP™Dělá to, co si myslíš, že dělá. Jestli ne. (Například, není to snížení počtu odlišných kombinací, jak se očekávalo?) Pak můžete použít informace, abyste zjistili, co se děje.
 
* Výzkum a experiment najít a nastavit lépe [&lt;spojeníProperty&gt;] (#cassandra-connectionproperty) Je.
 
* Zkontrolujte rychlost síťového spojení mezi Cassandrou aERDDAP. Pokud je spojení pomalé, zkuste to zlepšit. Nejlepší je, kdyžERDDAP™běží na serveru připojeném ke stejnému (rychle) přepnout jako server běžící uzel Cassandra, ke kterému jste připojeni.
 
* Prosím, buď trpělivý. Informace si pozorně přečtěte zde a v dokumentaci Cassandry. Experiment. Zkontroluj si práci. Pokud Cassandra...ERDDAP™spojení je stále pomalejší, než jste očekávali, prosím, uveďte schéma vašeho stolu Cassandra aERDDAP™částdatasets.xmla vidět naše[oddíl o získání dodatečné podpory](/docs/intro#support).
 
* Pokud všechno ostatní selže,
zvážit uložení údajů ve shromažďováníNetCDFv3.ncsoubory (zvláště.ncSoubory, které používají[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array datové struktury a tak lze zacházet sERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Pokud jsou logicky organizovaní (každý s údaji pro kus prostoru a času) ,ERDDAP™může z nich velmi rychle extrahovat data.
         
#### EDDTableFromCassandra kostra XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSekvence{#eddtablefromdapsequence} 
[ **EDDTableFromDapSekvence** ](#eddtablefromdapsequence)zpracovává proměnné v rámci 1- a 2-úrovňové posloupnosti od[DAP](https://www.opendap.org/)servery jako např.DAPPE (v https://www.pmel.noaa.gov/epic/software/dapper/ , nyní přerušen) .

* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili. Informace, které potřebujete, můžete získat při pohledu na soubory DDS zdrojových dat a DAS ve vašem prohlížeči (přidáním .das a .dds dosourceUrl(příklad byl https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Proměnná je vDAPsekvence, pokud odpověď .dds ukazuje, že datová struktura drží proměnnou je "sekvence" (případ necitlivý) .
* V některých případech uvidíte sekvenci v sekvenci, dvouúrovňovou sekvenci -- EDDTableFromDapSekvence je také zpracovává.
#### EDDTableFromDapSekvenční kostra XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDtableFromDatabase{#eddtablefromdatabase} 
[ **EDDtableFromDatabase** ](#eddtablefromdatabase)zpracovává data z jedné relační databáze nebo[pohled](https://en.wikipedia.org/wiki/View_(database)).

#### Jedna tabulka nebo pohled{#one-table-or-view} 
Pokud data, která chcete sloužit, jsou ve dvou nebo více tabulkách (a proto je třeba join k získání údajů z obou tabulek najednou) , musíte udělat jeden[denormalizované](https://en.wikipedia.org/wiki/Denormalization)  (již připojen) Tabulka nebo[pohled](https://en.wikipedia.org/wiki/View_(SQL)) se všemi údaji, které chcete zpřístupnit jako jeden datový soubor vERDDAP.

U velkých, komplexních databází může mít smysl oddělit několik částí jako denormalizované tabulky, každá s jiným typem dat, které se stanou samostatnými soubory dat vERDDAP.

Příprava denormalizované tabulky pro použití vERDDAP™Možná to zní jako šílený nápad. Prosím, věřte nám. Existuje několik důvodů, pročERDDAP™pracuje s denormalizovanými tabulkami:

* Pro uživatele je to mnohem jednodušší.
Kdy?ERDDAP™prezentuje soubor dat jako jeden, jednoduchý, denormalizovaný, jeden stůl, je velmi snadné pro každého pochopit data. Většina uživatelů nikdy neslyšel o normalizovaných tabulek, a velmi málo pochopit klíče, cizí klíče, nebo tabulky se připojí, a téměř jistě neznají podrobnosti různých typů spojení, nebo jak určit SQL, aby se připojili (nebo více spojení) Správně. Používání denormalizovaného stolu se vyhýbá všem těmto problémům. Tento důvod sám o sobě ospravedlňuje použití denormalizované jediné tabulky pro prezentaci datového souboruERDDAP™uživatelé.
     
* Normalizované tabulky (více tabulek souvisejících podle klíčových sloupců) jsou skvělé pro ukládání dat v databázi.
Ale i v SQL, výsledek, který je vrácen k uživateli je denormalizovaný (Připojeno) Jeden stůl. Takže se zdá rozumné prezentovat soubor dat uživatelům jako obrovskou, denormalizovanou, jedinou tabulku, ze které pak mohou požadovat podskupiny (např. ukažte mi řádky tabulky, kde teplota &gt; 30) .
     
* Můžete udělat změny proERDDAP™bez výměny stolů.
    ERDDAP™má několik požadavků, které mohou být odlišné od toho, jak jste založili svou databázi.
Například,ERDDAP™vyžaduje, aby data časového razítka byla uložena v polích "časové razítko s časovým pásem."
Vytvořením oddělené tabulky/pohledu proERDDAP™, Můžete provést tyto změny, když uděláte denormalizovaný stůl proERDDAP. Nemusíte tedy měnit své stoly.
     
*   ERDDAP™bude rekonstruovat některé z struktury standardizovaných tabulek.
Můžete určit, které sloupce dat pocházejí z tabulek "vnější," a proto mají omezený počet různých hodnot.ERDDAP™bude shromažďovat všechny různé kombinace hodnot v těchto sloupcích a prezentovat je uživatelům na speciální . Podmnožina webové stránky, která pomáhá uživatelům rychle vybrat podmnožiny datového souboru. Rozdílné hodnoty pro každý sloupec jsou rovněž uvedeny v seznamech drop-down na ostatních webových stránkách datového souboru.
     
* Denormalizovaná tabulka dělá data předání od vás doERDDAPPomalu správce.
Jste expert na tento soubor dat, takže dává smysl, abyste rozhodovali o tom, které tabulky a které sloupce se připojit a jak se k nim připojit. Takže nám nemusíš nic dávat. (nebo hůř, koncoví uživatelé) Několik tabulek a podrobné pokyny, jak se k nim připojit, stačí nám dát přístup k denormalizovanému stolu.
     
* Denormalizovaná tabulka umožňuje efektivní přístup k datům.
Denormalizovaná forma je obvykle rychlejší přístup než normalizovaná forma. Spojení může být pomalé. Několik spojení může být velmi pomalé.
     

Za účelem získání dat ze dvou nebo více tabulek v databázi doERDDAP™, Existují tři možnosti:
 

* Doporučená volba:
S daty z denormalizované tabulky si můžete vytvořit soubor čárky nebo záložky oddělené hodnoty.
Pokud je soubor obrovský, pak dává smysl vytvořit několik souborů, každý s soudržnou podmnožinu denormalizované tabulky (například údaje z menšího časového rozmezí) .
    
Velkou výhodou je, žeERDDAP™bude schopen zvládnout uživatelské požadavky na data bez dalšího úsilí vaší databází. Takže...ERDDAP™nebude zátěží pro vaši databázi nebo bezpečnostní riziko. To je nejlepší možnost za téměř všech okolností, protožeERDDAP™obvykle získat data ze souborů rychleji než z databáze (Pokud jsme převést .csv soubory na.ncSoubory CF) . (Součástí je, žeERDDAP+ soubory je systém pouze pro čtení a nemusí se zabývat změnami při poskytování[KYSELINA](https://en.wikipedia.org/wiki/ACID)  (Atomie, konzistence, izolace, trvanlivost) .) Také, pravděpodobně nebudete potřebovat samostatný server, protože můžeme ukládat data na jednom z našich RAID a přístup k němu s existujícíERDDAP™na existujícím serveru.
    
* Možnost:
Vytvoříte novou databázi na jiném počítači s denormalizovaným stolem.
Vzhledem k tomu, že tato databáze může být zdarma a open source databáze jako MariaDB, MySQL, a PostgreSQL, tato volba nemusí stát hodně.
    
Velkou výhodou je, žeERDDAP™bude schopen zvládnout uživatelské požadavky na data bez dalšího úsilí vaší aktuální databází. Takže...ERDDAP™nebude zátěží pro vaši současnou databázi. To také eliminuje mnoho bezpečnostních obav, protožeERDDAP™nebude mít přístup do vaší aktuální databáze.
    
* Odporná možnost:
Můžeme se spojit.ERDDAP™do vaší současné databáze.
K tomu musíte:
    
    * Vytvořte oddělenou tabulku nebo zobrazení s denormalizovanou tabulkou dat.
    * Vytvořit uživatele "erddap," který má přístup pouze ke čtení pouze k denormalizované tabulce (án) .
         
    
To je možnost, pokud se data mění velmi často a chcete dátERDDAP™uživatelům okamžitý přístup k těmto změnám; nicméně, i tak, může mít smysl použít volbu souboru výše a pravidelně (každých 30 minut?) nahradit soubor, který má dnešní data.
Obrovské nevýhody tohoto přístupu jsou, žeERDDAP™uživatelské požadavky budou pravděpodobně klást nesnesitelně velké břemeno na vaší databázi a žeERDDAP™spojení představuje bezpečnostní riziko (I když můžeme minimalizovat/spravovat riziko) .

Výroba denormalizované tabulky nebo pohled naERDDAP™je dobrá příležitost udělat několik změn, kteréERDDAP™potřeby, způsobem, který neovlivňuje vaše původní stoly:

* Změna dat a časových polí/sloupců pro použití datového typu, který Postgres volá[časové razítko s časovým pásem](#database-date-time-data)  (nebo ekvivalent ve vaší databázi) .
Časové značky bez informací časového pásma nefungují správně vERDDAP.
* Vytvořit indexy pro sloupce, které uživatelé často hledají.
* Být velmi vědomi[případ pole/název sloupce](#quotes-for-names-and-case-sensitivity)  (například použijte všechny malé případy) když je píšeš.
* Nepoužívejte vyhrazená slova pro tabulku a pro názvy polí/sloupců.

Pokud potřebujete pomoc s denormalizovanou tabulkou nebo zobrazením, kontaktujte prosím správce databáze.
Pokud chcete mluvit o celém tomto přístupu nebo strategii, jak to nejlépe udělat, prosím, e-mail Chris. John at noaa.gov .
    
#### databáze vdatasets.xml {#database-in-datasetsxml} 
Je těžké vytvořit správnoudatasets.xmlinformace potřebné proERDDAP™navázat spojení s databází. Buď trpělivý. Buďte metodičtí.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
        
Generovat soubory dat Xml má tři speciální možnosti pro EDDTableFromDatabase:
1. Pokud vstoupíte "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" (bez kotací) pro název katalogu zobrazí program seznam názvů katalogů.
2. Pokud vstoupíte "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" (bez kotací) pro název schématu zobrazí program seznam názvů schémat.
3. Pokud vstoupíte "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" (bez kotací) pro název tabulky program zobrazí seznam tabulek a jejich sloupců. První "&#33;&#33;&#33;LIST&#33;&#33;&#33;&#33;" položka, kterou uděláte, je ten, který bude použit.
* Pečlivě si přečtěte všechny informace tohoto dokumentu o EDDTableFromDatabase.
* Většinu informací, které potřebujete k vytvoření XML pro datový soubor EDDTableFromDatabase, můžete shromáždit prostřednictvím kontaktu se správcem databáze a vyhledáváním na webu.
* I když databáze často zachází s názvy sloupců a názvy tabulek způsobem, který je citlivý na případ, jsou případ-citlivý vERDDAP. Takže pokud chybová zpráva z databáze říká, že název sloupce je neznámý (například "Neznámý identifikátor= ' *sloupec\\_název* '") i když víte, že existuje, zkuste použít všechny hlavní města, například, *COLUMN\\_NAME* , což je často pravda, případ-citlivý verze názvu sloupce.
* úzce spolupracovat se správcem databáze, který může mít příslušné zkušenosti. Pokud datový soubor nenačte, přečtěte si[chybová zpráva](#troubleshooting-tips)pečlivě zjistit proč.
         
#### JDBC ovladač{#jdbc-driver} 
* [JDBC ovladač a&lt;Název řidiče &gt;] (#jdbc-driver) -- Musíte získat příslušný JDBC 3 nebo JDBC 4 ovladač .jar soubor pro vaši databázi a
Dej to tam. *tomcat* /webapps/erddap/WEB-INF/lib po instalaciERDDAP. Pak ve tvémdatasets.xmlpro tento soubor údajů musíte uvést&lt;DriverName&gt; pro tohoto řidiče, který je (Bohužel) jiný než název souboru. Hledat na webu JDBC ovladač pro vaši databázi a ovladačJméno, žeJavaMusíš ho použít.
    
    * Pro MariaDB, zkuste[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
The&lt;název řidiče &gt; pro použití vdatasets.xml  (viz níže) je pravděpodobně org.mariadb.jdbc. Řidiči.
    * Pro MySQL a Amazon RDS, zkuste[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
The&lt;název řidiče &gt; pro použití vdatasets.xml  (viz níže) je pravděpodobně com.mysql.jdbc. Řidiči.
    * ProOracle, zkuste[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
The&lt;název řidiče &gt; pro použití vdatasets.xml  (viz níže) je pravděpodobně oracle.jdbc.driver.OracleŘidiči.
    * Pro Postgresql jsme dostali JDBC 4 řidiče z[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
The&lt;název řidiče &gt; pro použití vdatasets.xml  (viz níže) je pravděpodobně Org.postgresql. Řidiči.
    * Pro SQL Server můžete získat JTDS JDBC ovladač od[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
The&lt;název řidiče &gt; pro použití vdatasets.xml  (viz níže) je pravděpodobně net.sourceforge.jtds.jdbc. Řidiči.
    
Poté, co dáte JDBC ovladač .jarERDDAP™lib adresář, musíte přidat odkaz na že .jar soubor v .bat a / nebo .sh skript soubory pro GenerateDatasets Xml, DasDds, a ArchiveADataset, které jsou v *tomcat* /webapps/erddap/WEB-INF/ adresář; jinak získáte ClassNotFoundException při spuštění těchto skriptů.
    
Bohužel, JDBC je někdy zdrojem problémů. Ve své roli prostředníkaERDDAP™a v databázi někdy provádí jemné změny standardní/generické databáze SQL požadovat, abyERDDAP™vytváří, čímž způsobuje problémy (například související[identifikátory horních/nízkých případů](#quotes-for-names-and-case-sensitivity)a související[datum/časová časová pásma](#database-date-time-data)) . Prosím, buďte trpěliví, pozorně si přečtěte informace, zkontrolujte si svou práci a podívejte se na naši[oddíl o získání dodatečné podpory](/docs/intro#support).
    
#### Databáze&lt;spojení Nemovitost&gt;{#database-connectionproperty} 
* [&lt;spojeníProperty&gt;] (#Database-connectionproperty) -- Vdatasets.xmlpro váš datový soubor musíte definovat několik spojení Majetkové značkyERDDAP™jak se připojit k vaší databázi (například pro upřesnění uživatelského jména, hesla, ssl připojení a[velikost webu](#set-the-fetch-size)) . Pro každou situaci je to jiné a je trochu těžké to zjistit. Vyhledejte na webu příklady použití JDBC ovladače pro připojení do vaší databáze. The&lt;connectionProperty&gt; names (například "uživatel," "heslo" a "ssl") , a některé z připojeníProperty hodnoty lze nalézt vyhledáváním na webu pro "Vlastnosti připojení JDBC *databáze Typ* " (například:Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citlivost jmen a případů{#quotes-for-names-and-case-sensitivity} 
*   [Citlivost případu](#quotes-for-names-and-case-sensitivity)- Ve výchozím nastavení EDDTableFromDatabase uvádí ANSI-SQL-standardní dvojité citace kolem názvu pole/sloupce ve SELECT příkazech v případě, že jste použili vyhrazené slovo jako název pole/sloupce nebo zvláštní znak v názvu pole/sloupce. Dvojité citace také zmařit některé typy SQL vstřikových útoků. You can tellERDDAP™používat ", " nebo žádné citace prostřednictvím&lt;sloupecNázevQuotes&gt; vdatasets.xmlpro tento datový soubor.
    
Pro mnoho databází, použití jakéhokoliv typu citací způsobí, že databáze pracovat s názvem pole / sloupce v případě citlivé způsobem (místo výchozího databázového případu necitlivý způsob) . Databáze často zobrazují názvy souborů/sloupců jako všechny vyšší případy, kdy je ve skutečnosti citlivá forma jiná. InERDDAP™, Prosím vždy pokládejte názvy sloupců databáze za citlivé případy.
    
    * Pro Marii DB, musíte spustit databázi s[\\---sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Pro MySQL a Amazon RDS musíte spustit databázi s[\\---sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oraclepodporuje ANSI-SQL-standardní dvojité uvozovky[ve výchozím nastavení](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL standardně podporuje dvojcitace ANSI-SQL.
    
      
Nepoužívejte rezervované slovo pro databázi, katalog, schéma nebo jméno tabulky.ERDDAP™Nedává jim to uvozovky.
    
Pokud je to možné, použijte při vytváření tabulky databáze všechny malé případy pro databázi, katalog, schémata, názvy tabulek a názvy polí (nebo pohled) a při odkazování na pole/název sloupce vdatasets.xmlvERDDAP. Jinak můžete dostat chybovou zprávu s nápisem databáze, katalog, schéma, tabulka a/nebo pole nebyla nalezena. Pokud dostanete chybovou zprávu, zkuste použít verzi citlivou na případ, veškerou verzi v horním případě a všechny malé verze názvu vERDDAP. Jeden z nich může fungovat. Pokud ne, musíte změnit název databáze, katalogu, schématu a/nebo tabulky na všechny malé případy.
    
#### Databáze&lt;údaje Typ&gt;{#database-datatype} 
*   [Databáze](#database-datatype)[&lt;dataType&gt;] (#datatyp) Tagy... Protože je tu nějaká nejednoznačnost, o které[databázové datové typy](https://www.w3schools.com/sql/sql_datatypes_general.asp)mapa, na kterouERDDAP™datové typy, musíte zadat [&lt;dataType&gt;] (#datatyp) tag pro každého [&lt;dataVariable&gt;] (# Dataproměnná) říctERDDAP™které dataType použít. Součástí problému je to, že různé datové soubory používají různé termíny pro různé datové typy - takže se vždy snažte odpovídat definicím, nejen jménům. Viz popis[standardníERDDAP™údaje Typy](#data-types), který zahrnuje odkazy na odpovídající datové typy SQL.[Datum a časové razítko](#database-date-time-data)jsou zvláštní případy: použitíERDDAP's dvojími údaji Typ.
     
#### Databáze Datum Čas Data{#database-date-time-data} 
Některé časové sloupce databázových dat nemají výslovné časové pásmo. Takové sloupy jsou pro nás problém.ERDDAP. Databáze podporují pojem data (s časem nebo bez) bez časového pásma jako přibližného rozsahu času. Ale...Java  (a takERDDAP) se zabývá pouze okamžitým datem + časy s časovým pásem. Takže možná víte, že data data data jsou založena na místním časovém pásmu (též s šetřícím časem denního světla) nebo GMT/Zulučasové pásmo, aleJava  (aERDDAP) Ne. Původně jsme si mysleli, že bychom mohli tento problém vyřešit. (Například upřesněním časového pásma pro sloupec) , ale databáze+JDBC+Javainterakce z toho udělaly nespolehlivé řešení.
* Takže,ERDDAP™vyžaduje, abyste v databázové tabulce uložili všechna data data data a data data data databázového datového typu, který odpovídá typu JDBC "timestrom s časovým pásem" (ideálně, že používá GMT/Zulučasové pásmo) .
* InERDDAP'sdatasets.xml, v&lt;dataVariable&gt; tag pro proměnnou časového razítka, nastaveno
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

a&lt;addAttributes&gt; nastaveno
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Návrh: Pokud jsou data časovým rozsahem, je užitečné, aby se hodnoty časového razítka vztahovaly na střed implikovaného časového rozsahu. (například poledne) . Například pokud má uživatel data pro 2010-03-26T13:00Z z jiného datového souboru a chce nejbližší data z databázového datového souboru, který má data za každý den, pak databázová data pro 2010-03-26T12:00Z (představující údaje pro uvedené datum) je samozřejmě nejlepší (oproti půlnoci před nebo po, kde je méně zřejmé, co je nejlepší) .
*   ERDDAP™má nástroj pro[Převést numerické Čas do/z doby řetězce](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Viz[JakERDDAPObchoduje s časem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer nulls{#integer-nulls-1} 
Databáze podporují nuly v celé řadě (int, drobounký, malinký) sloupce, aleERDDAP™nepodporuje pravé nuly.
Databáze nulls bude převedena vERDDAP™127 pro bytové sloupce, 255 pro ubytové sloupce, 32767 pro krátké sloupce, 65535 pro krátké sloupce, 2147483647 pro int sloupce, 4294967295 pro uint sloupce, 9,223,372,036,854,775,807 pro dlouhé sloupce, nebo 184467407370955115 pro dlouhé sloupce. Pokud použijete tyto výchozí hodnoty, identifikujte prosím tytomissing\\_values pro uživatele datového souboru vERDDAP™s

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

nebo

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativně můžete použít "missing\\_value" atribut místo "\\_FillValue."
Generovat soubory dat Xml automaticky přidá tyto atributy \\_FillValue, když generuje navrhovanédatasets.xmlpro databázové soubory.

Pro databázi plovoucích bodů sloupce, nuly se převést na NaNs vERDDAP.
Pro databázové datové typy, které jsou převedeny do Strings inERDDAP™, nuly jsou převedeny na prázdné Strings.
    
#### Bezpečnost databáze{#database-security} 
* Při práci s databázemi musíte dělat věci tak bezpečně a bezpečně, jak je to možné, abyste zabránili tomu, aby škodlivý uživatel poškodil vaši databázi nebo získal přístup k datům, ke kterým by neměl mít přístup.ERDDAP™Snaží se také dělat věci bezpečně.
    * Zvažte replikování, na jiném počítači, databáze a databázové tabulky s daty, které chceteERDDAP™sloužit. (Ano, pro komerční databáze jakoOracleTo zahrnuje dodatečné licenční poplatky. Ale pro databáze open source jako PostgreSQL, MySQL, Amazon RDS a MariaDB to nic nestojí.) To vám dává vysokou úroveň bezpečnosti a také zabraňujeERDDAP™žádosti o zpomalení původní databáze.
    * Povzbuzujeme vás, abyste to připravili.ERDDAP™připojit se k databázi jako uživatel databáze, který má přístup pouze k **relevantní** databáze (án) a má pouze práva na čtení.
    * Doporučujeme vám nastavit spojení odERDDAP™do databáze tak, aby
        * vždy používá SSL,
        * pouze umožňuje připojení z jedné IP adresy (nebo jeden blok adres) a z jednohoERDDAP™uživatele a
        * pouze přenáší hesla ve své MD5 hashed formě.
    *   \\[ZNÁMÝ PROBLÉM\\]SpojeníProperties (včetně hesla&#33;) jsou uloženy jako prostý text vdatasets.xml. Nenašli jsme způsob, jak nechat správce zadat heslo k databázi běhemERDDAP's startup in Tomcat (který nastane bez vstupu uživatele) , takže heslo musí být přístupné v souboru. Aby to bylo bezpečnější:
        * Ty. (váERDDAP™Správce) měl by být vlastníkemdatasets.xmla mají READ a WRITE přístup.
        * Vytvořte skupinu, která zahrnuje pouze uživatelskou=tomcat. Použijte chgrp, aby se skupina prodatasets.xml, jen s oprávněním číst.
        * Použít chmod pro přiřazení práv O-rwx (žádný přístup READ nebo WRITE pro "jiné" uživatele) místodatasets.xml.
    * Až dovnitřERDDAP™, heslo a další vlastnosti připojení jsou uloženy v "soukromém"Javaproměnné.
    * Žádosti klientů jsou rozebrány a zkontrolovány platnost před vytvořením SQL žádosti o databázi.
    * Žádosti do databáze jsou podány s SQL ReadyStatements, aby se zabránilo[SQL injekce](https://en.wikipedia.org/wiki/SQL_injection).
    * Žádosti do databáze se podávají s provedením Dotaz (neprovede seStation) omezit žádosti pouze o čtení (takže pokus o SQL injekci změnit databázi selže také z tohoto důvodu,) .
         
#### SQL{#sql} 
* ProtožeOPeNDAP's tabulkovými požadavky na data byly navrženy pro napodobení SQL tabulkových požadavků na data, je to snadné proERDDAP™převést tabulkové žádosti o data na jednoduché SQL PřipravenéStatements. Například:ERDDAP™žádost
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
bude převeden na SQL připravený stav
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™požadavky s & distinct () a/nebo &orderBy ( *proměnné* ) přidá DISTINCT a/nebo ORDER BY *proměnné* SQL připravené prohlášení. Obecně platí, že to výrazně zpomalí odpověď z databáze.
ERDDAP™přihlásí připravený stav do[log.txt](/docs/server-admin/additional-information#log)jako
```
    statement=*thePreparedStatement*  
```
Toto bude textová reprezentace PřipravenéhoStatementu, která se může mírně lišit od skutečného PřipravenéhoStatementu. Například v PřipravenémStatementu jsou časy zakódovány zvláštním způsobem. Ale v textové reprezentaci se zobrazují jako data ISO 8601.
     
#### Rychlost databáze{#database-speed} 
* Databáze mohou být pomalé. Jsou věci, které můžete udělat:
    * Obecně -
Povaha SQL je, že dotazy jsou[deklarativní](https://en.wikipedia.org/wiki/Declarative_programming). Jen určují, co uživatel chce. Neobsahují specifikace nebo tipy, jak má být dotaz řešen nebo optimalizován. Takže neexistuje žádná možnost proERDDAP™generovat dotaz takovým způsobem, že pomáhá databázi optimalizovat dotaz (nebo jakýmkoli způsobem určuje, jak má být dotaz řešen) . Obecně je na správci databáze, aby věci nastavil. (například indexy) optimalizovat pro určité typy dotazů.
##### Nastavit velikost souboru{#set-the-fetch-size} 
Databáze vrací data doERDDAP™v kouscích. Ve výchozím nastavení vrací různé databáze jiný počet řádků. Často je toto číslo velmi malé a velmi neefektivní. Například výchozí proOracle10&#33; Přečti si dokumentaci JDBC pro ovladač databáze JDBC pro nalezení vlastnosti připojení, která má být nastavena, a přidej ji k popisu datového souborudatasets.xml. Například,
Pro MySQL a Amazon RDS použijte
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Pro MariaDB není v současné době možné změnit velikost aportu. Ale je to požadovaná funkce, takže hledat na webu zjistit, zda to bylo provedeno.
ProOracle, použití
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Pro PostgreSQL použijte
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
Ale klidně to číslo změňte. Nastavení čísla příliš velké způsobíERDDAP™používat spoustu paměti a být více pravděpodobné, že dojde paměti.
#### Vlastnosti připojení{#connectionproperties} 
Každá databáze má jiné vlastnosti připojení, které mohou být uvedeny vdatasets.xml. Mnoho z nich bude mít vliv na výkon databázeERDDAP™spojení. Pro zobrazení možností si přečtěte dokumentaci pro ovladač JDBC databáze. Pokud zjistíte vlastnosti připojení, které jsou užitečné, prosím, pošlete e-mail s údaji naerd dot data at noaa dot gov.
* Udělej stůl...
Pravděpodobně dostanete rychlejší odpovědi, pokud budete pravidelně (Každý den? Kdykoliv jsou nová data?) generovat skutečnou tabulku (Podobně jako jste vytvořili názor) a říctERDDAP™získat data z tabulky místo VIEW. Vzhledem k tomu, že každý požadavek na stůl pak může být splněn bez připojení k jinému stolu, odpověď bude mnohem rychlejší.
* Vysavač stolu -
MySQL a Amazon RDS budou reagovat mnohem rychleji, pokud používáte[OPTIMILNÍ TABULKA](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria DB bude reagovat mnohem rychleji, pokud používáte[OPTIMILNÍ TABULKA](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL bude reagovat mnohem rychleji, pokud[VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)Stůl.
    Oraclenemá ani nepotřebuje analogický příkaz.
* Značka[Indexy](https://en.wikipedia.org/wiki/Database_index)pro běžné proměnné --
Můžete urychlit mnoho / většina dotazů vytvořením indexů v databázi pro proměnné (které databáze nazývají "sloupce") které jsou často omezeny v dotazu uživatele. Obecně platí, že tyto proměnné jsou stejné jako [&lt;subsetVariables&gt;] (#subsetvariables) a/nebo zeměpisné šířky, délky a časových proměnných.
##### Použít spojení{#use-connection-pooling} 
Normálně,ERDDAP™provede samostatné připojení k databázi pro každou žádost. To je nejspolehlivější přístup. Rychlejší alternativou je použití datového zdroje, který podporuje sdílení připojení. Pro nastavení, upřesněte (například)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
přímo vedle&lt;sourceUrl&gt;,&lt;název řidiče &gt; a&lt;spojení Property&gt;.
A v *tomcat* /conf/context.xml, definovat zdroj se stejnou informací, například,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Obecné informace o použití datového zdroje jsou na[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Viz[Informace o datovém zdroji Tomcat](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)a[Příklady datového zdroje Tomcat](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)nebo hledat na webu příklady použití DataSources s jinými servery aplikace.
* Pokud všechno ostatní selže,
zvážit uložení údajů ve shromažďováníNetCDFv3.ncsoubory (zvláště.ncSoubory, které používají[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array datové struktury a tak lze zacházet sERDDAP's[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Pokud jsou logicky organizovaní (každý s údaji pro kus prostoru a času) ,ERDDAP™může z nich velmi rychle extrahovat data.
         
#### EDDTableFromDatabase kostra XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromEDDGrid {#eddtablefromeddgrid} 
[ **EDDTableFromEDDGrid** ](#eddtablefromeddgrid)umožňuje vytvořit soubor EDDTable z libovolnéhoEDDGridSoubor dat.

* Některé společné důvody k tomu jsou:
    * To umožňuje, aby soubor údajů byl dotazován sOPeNDAPomezení výběru, což je typ "požadavky podle hodnoty" (který mohl uživatel požádat) .
    * Soubor údajů je ze své podstaty souborem tabulek.
* Hodnota globálního atributu "maxAxis0" (obvykle type="int") , (výchozí hodnota je 10) budou použity k omezení počtu os\\[0\\]  (obvykle"time"osa) hodnoty uzavřenéhoEDDGriddata, ke kterým lze přistupovat na žádost o údaje. Pokud nechcete mít žádný limit, zadejte hodnotu 0. Toto nastavení je důležité, protože jinak by pro uživatele bylo příliš snadné požádat EDDTableFromEDDGridprohledat všechna data datového souboru. To by trvalo dlouho a téměř jistě by selhalo s timeout chybou. Toto je nastavení, díky kterému je bezpečné mít EDDTableFromEDDGridSoubory dat ve VašemERDDAPbez obav, že povedou k nepřiměřenému využívání výpočetních zdrojů.
* Pokud je uzavřenEDDGridvá[EDDGridFromErddap](#eddfromerddap)aERDDAP™je stejnéERDDAP, pak EDDTableFromEDDGridbude vždy používat aktuálně dostupná verze referenčního datového souboru přímo. To je velmi efektivní způsob pro EDDTableFromEDDGridpřístup k datům v síti.
* Tato třída je [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) Záleží na tom. PřiloženéEDDGrid's&lt;reloadEveryNMinutes&gt; se ignoruje.
* Pokud hodnota pro [&lt;updateEveryNMillis&gt;] (#update everynmillis) je dodáván pro tento datový soubor, je ignorován. PřiloženéEDDGrid's&lt;updateEveryNMillis&gt; je to, na čem záleží.
*   [GenerovatDatasetsXml](#generatedatasetsxml)má možnost pro datový typ=EDDTableFromEDDGridkterý žádá o URLERDDAP  (obvykle stejnéERDDAP)   (končí v "/erddap/") a pravidelný výraz. Generovat soubory dat Xml pak vytvoří XML pro EDDTableFromEDDGridDatabáze pro každý datový soubor v sítiERDDAP™který mádatasetIDkterý odpovídá regulárnímu výrazu (použijte .\\* k porovnání všechdatasetIDs pro mřížkované soubory dat) .
    
Část XML, která je generována pomocí GenerateDatasetsXml pro každý soubor dat, zahrnuje:
    
    * AdatasetIDcož jeEDDGrid'sdatasetIDplus "\\_AsATable."
    * Nový souhrnný globální atribut, který jeEDDGrid's shrnutím plus nový první odstavec popisující, co je tento datový soubor.
    * Nový titul globální atribut, který jeEDDGrid's názvem plus', (Jako tabulka) ".
    * Nový globální atribut maxAxis0 s hodnotou 10.
#### EDDTableFromEDDGridkostra XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
[ **EDDTableFromFileNames** ](#eddtablefromfilenames)vytvoří soubor dat z informací o skupině souborů v systému serveru, včetně URL pro každý soubor, aby uživatelé mohli soubory stáhnout prostřednictvímERDDAP's["files"systém](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Na rozdíl od všech[EDDTableFromFoles](#eddtablefromfiles)podtřídy, tento typ datového souboru neslouží datům zevnitř souborů.

* EDDTableFromFileNames je užitečné, když:
    * Máte skupinu souborů, které chcete distribuovat jako celé soubory, protože neobsahují "data" stejným způsobem, jako mají pravidelné datové soubory data. Například obrazové soubory, video soubory, Word dokumenty, Excel tabulkové soubory, PowerPoint prezentační soubory, nebo textové soubory s nestrukturovaným textem.
    * Máte skupinu souborů, které mají data ve formátu, kterýERDDAP™Ještě neumím číst. Například projektově specifický, vlastní, binární formát.
         
#### EDDTableFromFileNames Data{#eddtablefromfilenames-data} 
*   [Údaje v souboru EDDTableFromFileNames](#eddtablefromfilenames-data)je stůl, kterýERDDAP™vytváří on-the-fly s informacemi o skupině místních souborů. V tabulce je řádek pro každý soubor. Čtyři zvláštní atributy v[datasets.xmlpro tento soubor údajů](#eddtablefromfilenames-skeleton-xml)určit, které soubory budou zahrnuty do tohoto souboru údajů:
    
##### soubor Dir{#filedir} 
    *   &lt;fileDir&gt; -- To určuje zdrojový adresář v souborovém systému serveru soubory pro tento soubor. Soubory, které jsou skutečně umístěny v systému serveru v&lt;fileDir&gt; se objeví ve sloupci URL tohoto datového souboru ve virtuálním adresáři s názvem https://*serverUrl*/erddap/files/*datasetID/* .
Například, pokuddatasetIDn jplMURSST,
a&lt;fileDir&gt; is /home/data/mur/ ,
a že adresář má soubor jplMURSST20150103000000.png,
pak URL, která bude zobrazena uživatelům pro tento soubor bude
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Kromě použití místního adresáře pro&lt;fileDir&gt; můžete také zadat URL vzdálené webové stránky podobné adresáři. To funguje s:
        
        * Neagregovaná data v THREDDS, např.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Tento server již není spolehlivě dostupný.\\]
        * Neagregované datové soubory vHyraxnapř.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Většina adresářů podobných Apači, např.
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### zOnTheFly{#fromonthefly} 
[\\*\\*\\*fromOnTheFly](#fromonthefly)-- Pro nějaké velké S3 vědro (jako noaa-goes17, který má 26 milionů souborů) , může trvatERDDAP™do 12 hodin ke stažení veškeré informace o obsahu kbelíku (a pak jsou tu další problémy.) . Abych se přes to dostal, existuje zvláštní způsob, jak použít&lt;fileDir&gt; v EDDTableFromFileNames vytvořit soubor s adresářem a názvy souborů z kbelíku AWS S3. Databáze nebude mít seznam všech adresářů kbelíku S3 a názvů souborů, které uživatel může vyhledávat prostřednictvím žádostí do datového souboru. Ale soubor dostane jména adresářů a souborů on-the-fly, pokud uživatel přejde hierarchii adresáře s datovým souborem"files"Možnost. To umožňuje uživatelům prohlížet hierarchii souborů a souborů v kbelíku S3 prostřednictvím datového souboru"files"systém. K tomu místo určení URL pro kbelík S3 jako "Starting adresář" (ve generováníDatasets Xml) nebo&lt;souborDir&gt; (vdatasets.xml) , použití:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
například:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Viz dokument[práce s S3 Kyblíky vERDDAP™](#working-with-aws-s3-files), zejména popis konkrétního formátu, který musí být použit pro S3 kbelík URL. A vidíš
[tyto podrobnosti a příklad](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)používání\\*\\*Z OnThe Fly.
        
##### rekurzivní{#recursive} 
*   &lt;rekurzivní &gt; -- Soubory v podadresáři&lt;fileDir&gt; s názvy, které odpovídají&lt;souborRegex&gt; se objeví ve stejných podadresách"files"URL pokud&lt;rekursive&gt; je nastaven na true. Výchozí hodnota je nepravdivá.
* [&lt;pathRegex&gt;] (#pathragex) -- Pokud rekursive=true, Pouze názvy adresářů, které odpovídají cestěRegex (default=".\\*") budou přijaty. Pokud se rekursive=false, to je ignorováno. To se zřídka používá, ale může být velmi užitečné za neobvyklých okolností. (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### souborRegex{#fileregex} 
*   &lt;souborRegex&gt; -- Pouze názvy souborů, kde celý název souboru (bez názvu adresáře) odpovídá&lt;souborRegex&gt; bude zařazen do tohoto souboru. Například jplMURSST.&#123;14&#125;\\\.png . (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Z názvů souborů Obsah tabulky dat{#from-file-names-data-table-contents} 
V tabulce budou sloupce s:
* URL... URL, které mohou uživatelé použít ke stažení souboru přesERDDAP's["files"systém](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* jméno -- Jméno souboru (bez názvu adresáře) .
* Poslední věc... Doba, kdy byl soubor naposledy upraven (uloženy jako dvojníky s"seconds since 1970-01-01T00:00:00Z") . Tato proměnná je užitečná, protože uživatelé mohou vidět, zda obsah daného souboru naposledy změnil. Tato proměnná je a[čas Proměnná známka](#timestamp-variables), takže údaje se mohou objevit jako číselné hodnoty (sekundy od 1970-01-01T00:00:00Z) nebo hodnota řetězce (ISO 8601:2004 (E) formát) V závislosti na situaci.
* velikost -- Velikost souboru v bajtech, uloženo jako dvojnásob. Jsou uloženy jako dvojité soubory, protože některé soubory mohou být větší, než umožňují ints a dlouhé nejsou podporovány v některých typech souborů odezvy. Dvojité dá přesnou velikost, dokonce i pro velké soubory.
* sloupce pro přidávání definovanéERDDAP™správce s informacemi extrahovanými z názvu souboru (například čas spojený s údaji v souboru) na základě dvou atributů, které zadáte v metadatech pro každý další sloupec/dataVariable:
    
    * ExtractRegex -- Tohle je[regulární výraz](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Celý regex musí odpovídat celému názvu souboru (bez názvu adresáře) . Regex musí zahrnovat alespoň jednu zachycovací skupinu. (část regulárního výrazu, která je přiložena závorkami) kteráERDDAP™používá k určení, který oddíl názvu souboru pro získání dat.
    * výtažek Skupina... Tohle je číslo zachycené skupiny. (#1 je první skupina zachycení) v pravidelném vyjádření. Výchozí hodnota je 1. Zachycovací skupina je část regulárního výrazu, který je uzavřen závorkami.
    
Zde jsou dva příklady:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
V případě časové proměnné, pokud má soubor název jplMURSST20150103000000.png, extraktRegex bude odpovídat názvu souboru, extrahovat znaky, které odpovídají první skupina zachycení ("20150103000000") jako dataType=String, pak použijte[jednotky vhodné pro časy strun](#string-time-units)k analýze řetězců do hodnot časových dat (2015-01-03T00:00:00Z) .

V případě denní proměnné, pokud má soubor název jplMURSST20150103000000.png, extraktRegex bude odpovídat názvu souboru, extrahovat znaky, které odpovídají první skupina zachycení ("03") jako [&lt;dataType&gt;] (#datatyp) \\=int, získávání datové hodnoty 3.
        
#### Další informace{#other-information} 
* Ne [&lt;updateEveryNMillis&gt;] (#update everynmillis) -- Tento typ datového souboru nepotřebuje a nemůže použít&lt;updateEveryNMillis&gt; tag, protože informace, které EDDTableFromFileJména jsou vždy dokonale aktuální, protožeERDDAP™dotazuje souborový systém, aby reagoval na každou žádost o údaje. I když existuje obrovské množství souborů, tento přístup by měl fungovat přiměřeně dobře. Odpověď může být pomalá, pokud existuje obrovský počet souborů a databáz nebyl dotazován na chvíli. Ale několik minut poté, operační systém uchovává informace v cache, takže odpovědi by měly být velmi rychlé.
     
* Můžete použít[Generovat soubory dat Xml program](#generatedatasetsxml)k vytvořenídatasets.xmlkus pro tento typ datového souboru. Můžete přidat/definovat další sloupce s informacemi extrahovanými z názvu souboru, jak je uvedeno výše.
     
#### EDDTableFromFileNázev kostry XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFoles{#eddtablefromfiles} 
[ **EDDTableFromFoles** ](#eddtablefromfiles)je supertřída všech EDDTableFrom...Files třídy. Nemůžete použít EDDTableFromFoFoles přímo. Místo toho použijte podtřída EDDTableFromFromFoles pro zpracování konkrétního typu souboru:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)agreguje data z čárkových, tabulkových, středníkových nebo mezerně oddělených datových souborů ASCII.
*   [EDDTableFromAudioFiles](#eddfromaudiofiles)shromažďuje data ze skupiny místních audio souborů.
*   [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles)agreguje data ze sady automatických počasí (AWS) XML soubory.
*   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)shromažďuje data z tabulkových datových souborů ASCII s datovými sloupy s pevnou šířkou.
*   [EDDTableFromHyraxSoubory](#eddtablefromhyraxfiles)  (ODCHYLKY) souhrnné údaje o několika proměnných, každá se sdílenými rozměry (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) , a sloužil[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFromNeplatnéCRAFile](#eddtablefrominvalidcrafiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory, které používají specifický, neplatný, varianta CF DSG Contiguous Ragged Array (CRA) Složky. I kdyžERDDAP™podporuje tento typ souboru, je to neplatný typ souboru, který by nikdo neměl používat. Skupiny, které v současné době používají tento typ souboru, jsou důrazně vybízeny k používáníERDDAP™generovat platné soubory CF DSG CRA a přestat používat tyto soubory.
*   [EDDTableFromJsoniCSVFiles](#eddtablefromjsonlcsvfiles)Údaje z agregátů[JSON Řádky CSV souborů](https://jsonlines.org/examples/).
*   [EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory s několika proměnnými, každá se sdílenými rozměry (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) .
*   [EDDTableFromNcFiles](#eddtablefromncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory s několika proměnnými, každá se sdílenými rozměry (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) . Je v pořádku pokračovat v používání tohoto datového souboru pro stávající datové soubory, ale pro nové datové soubory doporučujeme použít místo toho EDDTableFromMultidimNcFiles.
*   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory, které používají jeden ze formátů souborů uvedených v[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvence. Ale pro soubory používající jednu z multidimenzionálních CF DSG variant, použijte[EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Místo toho.
*   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)Údaje z agregátů[NCCSV](/docs/user/nccsv-1.00)ASCII .csv soubory.
*   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)zpracovává údaje od[Parket](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (ODCHYLKY) kumuluje data ze souborů s několika proměnnými se sdílenými rozměry poskytovanými[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTableFromWFSSoubory](#eddtablefromwfsfiles)  (ODCHYLKY) vytvoří místní kopii všech údajů zArcGISMapServerWFSserver, takže data pak mohou být rychle re-servedERDDAP™uživatelé.

V současné době nejsou podporovány žádné jiné typy souborů. Obvykle je však poměrně snadné přidat podporu pro jiné typy souborů. Kontaktujte nás, pokud máte požadavek. Nebo, pokud jsou vaše data ve starém formátu, ze kterého byste se chtěli odstěhovat, doporučujeme převést soubory, které mají býtNetCDFv3.ncsoubory (a zejména.ncSoubory s[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array data struktura --ERDDAP™může z nich velmi rychle extrahovat data) .NetCDFje široce podporovaný binární formát, umožňuje rychlý náhodný přístup k datům a je již podporovánERDDAP.

#### Podrobnosti z souborů{#fromfiles-details} 
Následující informace platí pro všechny podtřídy EDDTableFromFoles.
##### Agregace{#aggregation} 
Tato třída shromažďuje data z místních souborů. Každý soubor má (relativně) malá tabulka dat.
    * Výsledný datový soubor se jeví jako by všechny tabulky souboru byly kombinovány (všechny řádky dat ze souboru #1, plus všechny řádky ze souboru #2, ...) .
    * Soubory nemusí mít všechny zadané proměnné. Pokud daný soubor nemá zadanou proměnnou,ERDDAP™přidá chybějící hodnoty podle potřeby.
    * Proměnné ve všech souborech MUSÍ mít stejné hodnoty pro[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[\\_Fill Hodnota](#missing_value),[scale\\_factor](#scale_factor)a[jednotky](#units)atributy (pokud existuje) .ERDDAP™kontroly, ale je to nedokonalý test -- pokud existují různé hodnoty,ERDDAPneví, co je správné, a proto, které soubory jsou neplatné. Pokud je problém, můžete být schopni použít[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)Napravit problém.
         
##### Stlačené soubory{#compressed-files} 
Soubory zdrojových dat pro všechny podtřídy EDDTableFromFromFoles lze externě komprimovat (např..tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2nebo .Z) . Viz[Vnější dokumentace komprimovaných souborů](#externally-compressed-files).
     
##### Informace o souboru{#cached-file-information-1} 
* Při prvním načtení databázového souboru EDDTableFromFoles čte informace ze všech příslušných souborů a vytváří tabulky (jeden řádek pro každý soubor) s informacemi o každém platném souboru a každém "špatném" (jiný nebo neplatný) Složka.
    * Tabulky jsou také uloženy na disku, jakoNetCDFv3.ncsoubory v *velkýRodič rodičů* /dataset/ *last2CharsOfDatasetID* / *datasetID* / v souborech pojmenovaných:
dirTable.nc  (který obsahuje seznam jedinečných názvů adresářů) ,
soubor Tabulka.nc  (která obsahuje tabulku s údaji každého platného souboru) ,
badFiles.nc  (který drží tabulku s informacemi každého špatného souboru) .
    * Pro urychlení přístupu k datovému souboru EDDTableFromFoles (ale na úkor využití více paměti) , můžete použít
[&lt;souborTableInMemory&gt; true&lt;/fileTableInMemory&gt;] (# filetableinmemory)   
říctERDDAP™uchovávat kopii tabulek informací o souboru v paměti.
    * Kopie tabulek informací o souboru na disku je také užitečná, kdyžERDDAP™je vypnuto a restartováno: ukládá EDDTable OdFiles z nutnosti znovu přečíst všechny datové soubory.
    * Když je soubor dat znovu načten,ERDDAP™stačí přečíst data v nových souborech a souborech, které se změnily.
    * Pokud má soubor jinou strukturu než ostatní soubory (například jiný datový typ pro jednu z proměnných nebo jinou hodnotu pro "[jednotky](#units)" atribut) ,ERDDAPpřidá soubor do seznamu "špatných" souborů. Informace o problému se souborem budou zapsány do *velkýRodič rodičů* /logs/log.txt soubor.
    * Nikdy byste neměli muset smazat nebo pracovat s těmito soubory. Jednou výjimkou je: pokud stále provádíte změny datového souborudatasets.xmlnastavit, možná budete chtít odstranit tyto soubory k vynuceníERDDAP™znovu přečíst všechny soubory, protože soubory budou číst/interpretovat jinak. Pokud budete někdy potřebovat odstranit tyto soubory, můžete to udělat, kdyžERDDAP™Utíká. (Pak nastavte[vlajka](/docs/server-admin/additional-information#set-dataset-flag)co nejdříve načíst soubor údajů.) Nicméně,ERDDAP™obvykle si všimne, žedatasets.xmlinformace neodpovídají souboru Informace o tabulce a automaticky smaže tabulky souborů.
    * Pokud chcete podpořitERDDAP™aktualizovat uložené informace o datovém souboru (například, pokud jste právě přidali, odstranili nebo změnili některé soubory do datového adresáře datového souboru) , použijte[Systém vlajky](/docs/server-admin/additional-information#flag)donutitERDDAP™aktualizovat informace o cached souboru.
         
##### Žádosti o zacházení{#handling-requests-1} 
*   ERDDAP™Tabulkové žádosti o údaje mohou klást omezení na jakoukoli proměnnou.
    * Při zpracování požadavku klienta na data se může EDDTableFromFoles rychle podívat do tabulky s platnou informací o souboru, aby zjistil, které soubory mohou mít příslušná data. Například pokud má každý zdrojový soubor data pro jednu bóji s pevným umístěním, může EDDTableFromFoles velmi účinně určit, které soubory mohou mít data v daném rozsahu délky a zeměpisné šířky.
    * Vzhledem k tomu, že platná tabulka informací o souboru obsahuje minimální a maximální hodnotu každé proměnné pro každý platný soubor, může EDDTableFromFoles často efektivně řešit další dotazy. Například pokud některé z bójí nemají čidlo tlaku vzduchu a klient požaduje data pro AirPressure&#33;=NaN, EdDTableFromFiles může efektivně určit, která bóje mají údaje o tlaku vzduchu.
         
##### Aktualizace informací o souboru{#updating-the-cached-file-information-1} 
Kdykoli je soubor znovu načten, jsou aktualizovány informace o cache souboru.
    
* Databáze se pravidelně načítá tak, jak stanoví&lt;reloadEveryNMinutes&gt; v informacích datového souboru vdatasets.xml.
* Databáze je znovu načítána co nejdříve.ERDDAP™zjistí, že jste přidali, odstranili,[Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (změnit poslední soubor Změněný čas) , nebo změnil datový soubor.
* Databáze je znovu načtena co nejdříve, pokud použijete[Systém vlajky](/docs/server-admin/additional-information#flag).

Když je soubor dat znovu načten,ERDDAP™Porovnává aktuálně dostupné soubory s kašovanou informační tabulkou souboru. Nové soubory se čtou a přidávají do platné tabulky souborů. Soubory, které již neexistují, jsou staženy z platné tabulky souborů. Soubory, kde došlo ke změně časového razítka souboru, se čtou a jejich informace se aktualizují. Nové tabulky nahrazují staré tabulky v paměti a na disku.
     
##### Špatné soubory{#bad-files-1} 
Tabulka špatných souborů a důvody, proč byly soubory prohlášeny za špatné (poškozený soubor, chybějící proměnné, nesprávné hodnoty osy atd.) je e-mailem na e-mail Všechno Na e-mailovou adresu (Pravděpodobně vy.) pokaždé, když je soubor dat znovu načten. Měli byste tyto soubory co nejdříve nahradit nebo opravit.
     
##### Chybějící proměnné{#missing-variables-1} 
Pokud některé složky nemají některé zdataVariables definovaná v souboru údajůdatasets.xmlTo je v pořádku. Když EDDTableFromFoles čte jeden z těchto souborů, bude to působit, jako by soubor měl proměnnou, ale se všemi chybějícími hodnotami.
     
##### Údaje v blízkém reálném čase{#near-real-time-data} 
* EDDTableFromFoles považuje žádosti o nejnovější data za zvláštní případ. Problém: Pokud jsou soubory tvořící soubor často aktualizovány, je pravděpodobné, že data nebudou aktualizována pokaždé, když se soubor změní. Takže EDDTableFromFoles nebude vědět o změně souborů. (Můžeš použít[Systém vlajky](/docs/server-admin/additional-information#flag), ale to může vést kERDDAP™načítání dat téměř neustále. Ve většině případů to nedoporučujeme.) EDDTableFromFoles se tímto zabývá následujícím systémem: Kdy?ERDDAP™obdrží žádost o údaje během posledních 20 hodin (například před 8 hodinami až do teď) ,ERDDAP™bude vyhledávat všechny soubory, které mají všechna data za posledních 20 hodin. Takže,ERDDAP™nemusí mít dokonale aktuální data pro všechny soubory, aby našel nejnovější data. Měli byste se ještě nastavit [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) na přiměřeně malou hodnotu (například 60) , Ale nemusí to být malé (například 3) .
     
    *    **Nedoporučuje se** organizace téměř reálných dat v souborech: Pokud například máte datový soubor, který ukládá data pro mnoho stanic (nebo bóje, nebo trajektorie, ...) po mnoho let, můžete zařídit soubory tak, aby například, tam je jeden soubor na stanici. Ale pokaždé, když dorazí nová data pro stanici, musíte si přečíst velký starý soubor a napsat velký nový soubor. A kdyERDDAP™znovu načte soubor, všimne si, že některé soubory byly upraveny, takže tyto soubory čte úplně. To je neefektivní.
         
    *    **Doporučené** organizace téměř reálných dat v souborech: Uložit data například do bloků, všechna data za jednu stanici/buoy/trajektorii za jeden rok (nebo jeden měsíc) . Pak, když přijde nový datum, jen soubor s letošní (nebo měsíc) jsou ovlivněny údaje.
        
        * Nejlepší: PoužitíNetCDFv3.ncsoubory s neomezeným rozměrem (čas) . Pak, pro přidání nových dat, stačí přidat nová data, aniž byste museli číst a přepisovat celý soubor. Změna se provádí velmi efektivně a v podstatě atomově, takže soubor není nikdy v rozporu.
        * Jinak:.ncsoubory s neomezeným rozměrem (čas) , pak, když potřebujete přidat nová data, musíte přečíst a přepsat celý dotčený soubor (Doufejme, že malé, protože to má jen rok (nebo měsíc) hodnota údajů) . Naštěstí všechny soubory za předchozí roky (nebo měsíce) pro tuto stanici zůstat beze změny.
        
V obou případech, kdyERDDAP™reloads soubor, většina souborů se nemění; jen několik, malé soubory se změnily a je třeba číst.
         
##### Adresáře{#directories-1} 
Soubory mohou být v jednom adresáři nebo v adresáři a jeho podadresáři (rekurzivně) . Pokud existuje velký počet souborů (např. &gt; 1 000) , operační systém (a tedy EDDTableFromFoles) bude fungovat mnohem efektivněji, pokud uložíte soubory do řady podadresářů (jeden za rok nebo jeden za měsíc pro soubory údajů s velmi častými soubory) , tak, že nikdy neexistuje obrovské množství souborů v daném adresáři.
     
##### Vzdálené adresáře a HTTP požadavky na rozsah{#remote-directories-and-http-range-requests-1} 
*    **Vzdálené adresáře a HTTP požadavky na rozsah**   (AKA Byte Servis, Byte Range žádosti) --
    EDDGridEDDTableFromMultidimNcFiles, EDDTableFromNcFiles a EDDTableFromNcCFFiles mohou někdy sloužit data z.ncsoubory na vzdálených serverech a přístupné přes HTTP, pokud server podporuje[Byte Slouží](https://en.wikipedia.org/wiki/Byte_serving)přes HTTP požadavky na rozsah (HTTP mechanismus pro bajtové podávání) . To je možné, protože netcdf-java (kteráERDDAP™použití ke čtení.ncsoubory) podporuje čtení dat ze vzdáleného.ncsoubory přes HTTP požadavky na rozsah.
    
     **Nedělej to&#33;**   
Místo toho použijte [&lt;cacheFromUrl&gt; system] (#Cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;cacheFromUrl&gt; ** ] (#Cachefromurl) -
VšechnyEDDGridFromFiles a všechny soubory EDDTableFromFoles podporují sadu tagů, které říkajíERDDAP™stáhnout a udržovat kopii všech souborů vzdáleného datového souboru nebo cache několika souborů (stažen podle potřeby) . **Tohle je neuvěřitelně užitečná vlastnost.** 
    * The&lt;cacheFromUrl&gt; tag umožňuje zadat URL se seznamem souborů vzdáleného souboru ze vzdáleného seznamu souborů.
        
        * Neagregovaná data v THREDDS, např.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Tento server již není spolehlivě dostupný.\\]
        * Neagregované datové soubory vHyraxnapř.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Většina adresářů podobných Apači, např.
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3 kbelíky, např.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
To však může vyžadovat účet AWS a další nastavení.
Viz[práce s S3 Kyblíky vERDDAP™](#working-with-aws-s3-files).
Také, obvykle nemusíte používat cache FromUrl se soubory v S3 kbelíky, pokud jsou soubory ASCII soubory (např. .csv) , protožeERDDAP™efektivně číst data z kbelíku přímo přes proud.
        
        ERDDAP™bude kopírovat nebo cachovat tyto soubory v souboru&lt;fileDir&gt; adresář. Pokud potřebujete podporu pro jiný typ vzdáleného seznamu souborů (např. FTP) Pošlete prosím svou žádost Chrisovi. John at noaa.gov .
        
        * Výchozí hodnota pro&lt;cacheFromUrl&gt; tag je null. Pokud nespecifikujete hodnotu pro&lt;cacheFromUrl&gt; tag, systém kopírování/cache nebude použit pro tento datový soubor.
        * Pokud je datový soubor&lt;souborRegex&gt; nastavení je něco jiného než .\\*,ERDDAP™bude stahovat pouze soubory, které odpovídají souboruRegex.
        * Pokud je datový soubor&lt;rekursive&gt; nastavení je pravda a vzdálené soubory jsou v podadresáři,ERDDAP™bude hledat ve vzdálených podadresářech, které odpovídají datovému souboru [&lt;pathRegex&gt;] (#pathragex) , vytvořit stejnou strukturu adresáře lokálně a dát místní soubory do stejných podadresářů.
        * Ve generováníDatasets Xml, pokud zadáte&lt;cacheFromUrl&gt; hodnota, Generovat Datové soubory Xml vytvoří místní&lt;fileDir&gt; adresář a kopírovat 1 vzdálený soubor do něj. Generovat soubory dat Xml pak generujedatasets.xmlkus založený na souboru vzorku (specifikovat vzorek Soubor=nic) .
        * Pokud je zdroj dat vzdálenýERDDAP™, použití[EDDGridFromErddap](#eddfromerddap)nebo[EDDTableFromErddap](#eddfromerddap)místo&lt;cacheFromUrl&gt;. Tímto způsobem, váš místníERDDAP™Zdá se, že data mají, ale nebudou muset ukládat žádná z dat na místě. Jediný důvod k použití&lt;cacheFromUrl &gt; získat data ze vzdálenéhoERDDAP™je, když máte nějaký jiný důvod, proč chcete mít místní kopii datových souborů. V takovém případě:
            * Tento datový soubor se pokusí odeslat datový soubor na vzdálenémERDDAPtakže změny tohoto datového souboru budou nazývat vlajku tohoto souboru Url, což způsobuje, že tento místní datový soubor znovu načíst a stáhnout změněné vzdálené soubory. Místní datový soubor bude proto aktualizován velmi brzy po provedení změn vzdáleného datového souboru.
            * Měli byste e-mail správce vzdálenéhoERDDAP™požádat odatasets.xmlpro vzdálený datový soubor, takže můžete vytvořit datový soubor ve svém lokálnímERDDAP™Vypadá to jako datový soubor ve vzdálenémERDDAP.
        * Pokud je zdroj dat vzdálenýERDDAP™, místní datový soubor se pokusí přihlásit ke vzdálenému datovému souboru.
            * Pokud předplatné uspěje, kdykoli je vzdálenéERDDAPreloads and has new data, it will contact the flagURL for this data data, což způsobí, že bude znovu načíst a stáhnout nové a / nebo změněné datové soubory.
            * Pokud předplatné selže (z jakéhokoli důvodu) nebo pokud jednoduše chcete zajistit, aby byl místní datový soubor aktualizován, můžete nastavit[vlajka](/docs/server-admin/additional-information#flag)pro místní datový soubor, takže bude znovu načíst, takže bude kontrolovat nové a/nebo změněné vzdálené datové soubory.
        * Pokud zdroj dat není vzdálenýERDDAP: databázový soubor zkontroluje nové a/nebo změněné vzdálené soubory pokaždé, když je znovu načte. Normálně je řízen [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) . Ale pokud víte, kdy jsou nové vzdálené soubory, můžete nastavit[vlajka](/docs/server-admin/additional-information#flag)pro místní datový soubor, takže bude znovu načíst a kontrolovat nové a/nebo změněné vzdálené datové soubory. Pokud k tomu dojde pravidelně v určitou denní dobu (např. v 7 ráno) , můžete udělat cron práci používatcurlkontaktovat vlajku Url pro tento datový soubor, takže bude znovu načíst a kontrolovat nové a/nebo změněné vzdálené datové soubory.
    * The&lt;cacheSizeGB&gt; tag určuje velikost místní cache. Pravděpodobně to potřebujete použít pouze při práci s cloudovými úložnými systémy, jako je[Amazon S3](https://aws.amazon.com/s3/)což je běžně používaný skladovací systém, který je součástí[Amazon Webové služby (AWS) ](https://aws.amazon.com/). Výchozí hodnota je -1.
        * Pokud je hodnota&lt;0, 0 (např. výchozí hodnota -1) ,
            ERDDAP™stáhne a udržuje **kompletní kopie** ze všech souborů vzdáleného datového souboru v datovém souboru&lt;fileDir&gt;.
            * Toto je nastavení, které se doporučuje kdykoli je to možné.
            * Pokaždé, když je soubor dat znovu načten, porovnává jména, velikosti a poslední kodifikované časy vzdálených souborů a místních souborů a stahuje všechny vzdálené soubory, které jsou nové nebo se změnily.
            * Pokud soubor, který byl na vzdáleném serveru zmizí,ERDDAP™nevymaže odpovídající místní soubor (jinak, pokud je něco dočasně špatně se vzdáleným serverem,ERDDAP™může smazat některé nebo všechny místní soubory&#33;) .
            * S tímto nastavením, obvykle budete nastavit&lt;updateEveryNMillis&gt; to -1, protože datový soubor si je vědom toho, kdy kopíroval nové datové soubory.
        * Je-li hodnota &gt;0,
            ERDDAP™bude stahovat soubory ze vzdáleného souboru podle potřeby do místního **cache** (v souboru údajů)&lt;fileDir&gt;) s mezní velikostí uvedeného počtu GB.
            * Ceche musí být dostatečně velká, aby měla alespoň několik datových souborů.
            * Obecně platí, že čím větší cache, tím lepší, protože další požadovaný datový soubor bude pravděpodobnější, že již bude v cache.
            * Caching by měl být použit pouze tehdy,ERDDAP™běží na cloud computing serveru (např. výpočetní instance AWS) a vzdálené soubory v cloudovém úložišti (např. AWS S3) .
            * Když místo na disku používané místními soubory přesahuje cache VelikostGB,ERDDAP™bude brzy (Možná ne hned.) smazat některé z cached souborů (v současné době, na základě nejméně nedávno použité (LRU) algoritmus) dokud není místo na disku používané místními soubory&lt;0.75\\*cacheSizeGB ("cíl") . Ano, existují případy, kdy LRU provádí velmi špatně - neexistuje žádný dokonalý algoritmus.
            *   ERDDAP™se nikdy nepokusí smazat cached soubor, kterýERDDAP™začal používat během posledních 10 sekund. Jedná se o nedokonalý systém pro řešení systému cache a systém čtečky dat je pouze volně integrován. Kvůli tomuto pravidlu,ERDDAP™nemusí být schopen odstranit dostatek souborů pro dosažení svého cíle, v tom případě to bude tisknout VAROVÁNÍ do log.txt souboru, a systém bude plýtvat hodně času se snaží prořezat cache, a je možné, že velikost souborů v cache může výrazně překročit cacheSizeGB. Pokud k tomu někdy dojde, použijte větší cacheSizeGB nastavení pro tento datový soubor.
            * V současné době,ERDDAP™nikdy nekontrolujte, zda má vzdálený server novější verzi souboru, který je v lokální cache. Pokud potřebujete tuto funkci, prosím, e-mail Chris. John at noaa.gov .
        * Ačkoli použití stejných názvů značek může znamenat, že kopírovací systém a systém cache používají stejný základní systém, to není správné.
            * Kopírovací systém aktivně spouští úkolyThread pro stahování nových a změněných souborů pokaždé, když je soubor znovu načten. Pouze soubory, které byly skutečně zkopírovány do místního adresáře jsou k dispozici prostřednictvímERDDAP™Soubor dat.
            * Systém cache získá seznam vzdálených souborů pokaždé, když je soubor znovu načten a předstírá, že všechny tyto soubory jsou k dispozici prostřednictvímERDDAP™Soubor dat. Zajímavé je, že všechny vzdálené soubory se dokonce objeví v /souborech/ webových stránkách datového souboru a jsou k dispozici ke stažení (I když možná až po zpoždění, zatímco soubor je nejprve stažen ze vzdáleného serveru do místní cache.) 
        * Datové soubory, které používají cacheSizeGB, mohou mít prospěch z použití[nThreads](#nthreads)nastavení větší než 1, protože to umožní soubor dat stáhnout více než 1 vzdálený soubor najednou.
    * The&lt;cachePartialPathRegex&gt; tag je zřídka používaný tag, který může určit alternativu pro soubor dat [&lt;pathRegex&gt;] (#pathragex) . Výchozí hodnota je nulová.
        * Použijte to pouze v případě, že kopírujete celý soubor souborů přes výchozí&lt;cacheSizeGB&gt; hodnota -1.&lt;cacheSizeGB&gt; hodnoty &gt;1, to bude ignorováno, protože to je nesmyslné.
        * Viz [dokumentace pro&lt;pathRegex&gt;] (#pathragex) pro návod, jak vytvořit regex.
        * Je-li uvedeno toto, použije se vždy při opětovném načtení souboru dat, s výjimkou prvního opětovného načtení datového souboru na začátku měsíce.
        * To je užitečné, když je vzdálený soubor uložen v labyrintu podadresářů a kdy se velká většina těchto souborů, pokud vůbec, mění. (&lt;kašel &gt; NASA&lt;kašel &gt;) Můžete například zadat&lt;cachePartialPathRegex&gt;, který jen odpovídá aktuálnímu roku nebo aktuálnímu měsíci. Tyto regexy jsou velmi složité určit, protože všechny částečné a plné názvy cest musí odpovídat&lt;cachePartialPathRegex&gt; a protože&lt;cachePartialPathRegex&gt; musí pracovat se vzdálenými URL adresami a místními adresáři. Skutečný životní příklad je:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Sample URL má soubory v podadresářech podle roku (např., 2018) a den roku (např. 001, 002, ..., 365 nebo 366) .
Všimněte si, že&lt;cachePartialPathRegex&gt; začíná na .\\*,
pak má konkrétní podadresář, který je společný pro vzdálené URL a lokální adresáře, např., /v4\\.1/
pak má řadu vnořených skupin, kde první možnost je nic.
a druhá možnost je specifická hodnota.
            
Výše uvedený příklad bude odpovídat adresářům pouze pro druhé 10 dnů roku 2018, např.
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Tento server již není spolehlivě dostupný.\\]  
a den 011, 012, ..., 019.
             (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Pokud potřebujete pomoct vytvořit&lt;cachePartialPathRegex&gt;, prosím e-mailem&lt;cacheFromUrl&gt; to Chris. John at noaa.gov .
            
        * Společný přístup: Pokud chcete použít&lt;cachePartialPathRegex&gt;, nepoužívejte jej zpočátku, protože chceteERDDAP™stáhnout všechny soubory zpočátku. PoERDDAP™stáhnul všechny soubory, přidal je do souborudatasets.xml.
             
##### Tisíce souborů{#thousands-of-files} 
Pokud váš soubor má mnoho tisíc souborů,ERDDAP™může být pomalé reagovat na žádosti o údaje z tohoto datového souboru. Jsou tu dva problémy:
 

1. Počet souborů v adresáři.
Vnitřní,ERDDAP™pracuje stejnou rychlostí bez ohledu na to, zda jsou n soubory v jednom adresáři nebo rozptýleny v několika adresářích.
     
Ale je tu problém: Čím více souborů v daném adresáři, tím pomalejší je operační systém při vrácení seznamu souborů v adresáři (na soubor) ažERDDAP. Doba odezvy může být 0. (n log n) . Je těžké říct, kolik souborů v jednom adresáři je příliš mnoho, ale 10 000 je pravděpodobně příliš mnoho. Takže pokud vaše nastavení generuje spoustu souborů, doporučení zde může být: dát soubory do logicky organizovaných podadresářů (např. stanice nebo stanice/rok) .
    
Další důvod k použití podadresářů: pokud uživatel chce použítERDDAP's"files"systém pro nalezení jména nejstaršího souboru pro stanici X, je rychlejší a efektivnější, pokud jsou soubory ve stanici / rok podadresáře, protože mnohem méně informací je třeba převést.
    
2. Celkový počet souborů.
Pro soubor tabulkových dat,ERDDAP™sleduje rozsah hodnot pro každou proměnnou v každém souboru. Když uživatel podá žádost,ERDDAP™musí číst všechna data ze všech souborů, které mohou mít data odpovídající žádosti uživatele. Pokud uživatel požádá o data z omezeného času (např. jeden den nebo jeden měsíc) , pakERDDAP™nebude muset otevřít příliš mnoho souborů ve vašem souboru. Ale jsou extrémní případy, kdy téměř každý soubor může mít odpovídající data (např. při voděTeplota =13.2C) . Od té dobyERDDAP™trochu času (částečně čas hledání na HDD, částečně čas na čtení hlavičky souboru) jen otevřít daný soubor (a více, pokud je mnoho souborů v adresáři) , existuje významný časový trest, pokud celkový počet souborů, kteréERDDAP™Musí se otevřít, je velmi velká. I otevření 1000 souborů vyžaduje značný čas. Takže jsou tu výhody, jak pravidelně konsolidovat denní soubory do větších částí (např. 1 stanice na 1 rok) . Chápu, že to možná nechcete dělat z různých důvodů, ale vede to k mnohem rychlejším reakcím. V extrémních případech (Například, jednám s datovým souborem GTSPP, který má ~35 milionů zdrojových souborů) , podávání dat z obrovského počtu zdrojových souborů je nepraktické, protožeERDDAP's odpovědí na jednoduché dotazy může trvat hodiny a používat tuny paměti. Konsolidací zdrojových souborů do menšího čísla (pro GTSPP mám nyní 720, 2 měsíčně) ,ERDDAP™může reagovat rozumně rychle. Viz[Miliony souborů](#millions-of-files)  
     

N.B. Solid State Drives jsou skvělé&#33; Nejrychlejší, nejjednodušší, nejlevnější způsob, jak pomociERDDAP™vypořádat se s obrovským počtem (malý) Soubory je použít pevný stav disk. Viz[Solid State Drives jsou skvělé&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Miliony souborů{#millions-of-files} 
* Některé soubory mají miliony zdrojových souborů.ERDDAP™Zvládne to, ale se smíšenými výsledky.
    
    * Pro žádosti, které zahrnují pouze proměnné uvedené v [&lt;subsetVariables&gt;] (#subsetvariables) ,ERDDAP™má všechny potřebné informace již extrahované z datových souborů a uložené v jednom souboru, takže může reagovat velmi, velmi rychle.
    * Pro další žádosti,ERDDAP™může skenovat soubory dat[cachované informace o souboru](#cached-file-information)a zjistit, že pouze několik souborů může mít údaje, které jsou relevantní pro žádost, a tak rychle reagovat.
    * Ale na jiné požadavky (například vodaTeplota=18 stupňů\\_C) kde jakýkoli soubor může mít příslušné údaje,ERDDAP™musí otevřít velký počet souborů, aby zjistil, zda každý soubor má nějaké údaje, které jsou relevantní pro žádost. Soubory se otevírají postupně. Na jakémkoli operačním systému a jakémkoli souborovém systému (jiné než pevné pohony) Trvá to dlouho. (takERDDAP™reaguje pomalu.) a opravdu spojuje souborový systém (takERDDAP™reaguje pomalu na jiné požadavky) .
    
Naštěstí existuje řešení.
    
    1. Nastavení datového souboru na neveřejnémERDDAP™  (Váš osobní počítač?) .
    2. Vytvořit a spustit skript, který požaduje řadu.ncCF soubory, každý s velkým kusem datového souboru, obvykle časové období (například všechny údaje za daný měsíc) . Vyberte si časové období tak, aby všechny výsledné soubory byly menší než 2GB (ale doufejme, že větší než 1GB) . Pokud má datový soubor data téměř v reálném čase, spusťte skript pro regeneraci souboru za aktuální časové období (např. tento měsíc) často (každých 10 minut? každou hodinu?) . Žádosti oERDDAP™místo.ncCF soubory vytvořit aNetCDFv3.ncsoubor, který používá[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array data structures).
    3. Nastavit[EDDTableFromNcCFFiles](#eddtablefromnccffiles)Soubor údajů na veřejnostiERDDAP™který získává data od.nc (CF) Složky.ERDDAP™může extrahovat data z těchto souborů velmi rychle. A protože jsou teď tucty nebo stovky (místo milionů) souborů, i kdyžERDDAP™musí otevřít všechny soubory, může to udělat rychle.
    
Ano, tento systém vyžaduje nějaký čas a úsilí, ale funguje velmi, velmi dobře. Většinu požadavků na data lze zvládnout stokrát rychleji než předtím.
    \\[Bob věděl, že je to možné, ale byl to Kevin O'Brien, kdo to udělal poprvé a ukázal, že to funguje dobře. Teď, Bob to používá pro soubor GTSPP, který má asi 18 milionů zdrojových souborů a kterýERDDAP™Nyní slouží přes asi 500.nc (CF) Složky.\\]
    
N.B. Solid State Drives jsou skvělé&#33; Nejrychlejší, nejjednodušší, nejlevnější způsob, jak pomociERDDAP™vypořádat se s obrovským počtem (malý) Soubory je použít pevný stav disk. Viz[Solid State Drives jsou skvělé&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Obrovské soubory{#huge-files} 
* Jeden obrovský datový soubor (zejména obrovské datové soubory ASCII) Může způsobit OutOfMemoryError. Pokud je to problém, mělo by to být zřejmé, protožeERDDAP™nebude načítat soubor údajů. Řešením, pokud je to proveditelné, je rozdělit soubor na více souborů. V ideálním případě můžete rozdělit soubor na logické kousky. Například pokud má soubor 20 měsíční hodnotu dat, rozdělí je na 20 souborů, každý z nich má 1 měsíční hodnotu dat. Ale existují výhody, i když je hlavní soubor rozdělen libovolně. Tento přístup má více výhod: a) Tím se sníží paměť potřebná pro čtení datových souborů na 1/20th, protože pouze jeden soubor se čte najednou. b) Často,ERDDAP™může řešit požadavky mnohem rychleji, protože se musí podívat pouze do jednoho nebo několika souborů najít data pro danou žádost. c) Pokud sběr dat probíhá, pak se může stávající 20 souborů změnit, a stačí upravit jeden, malý, nový soubor pro přidání dat v hodnotě příští měsíc do souboru.
     
##### FTP Potíže/Advice{#ftp-troubleadvice-1} 
* Pokud FTP nové datové soubory doERDDAP™server zatímcoERDDAP™Utíká, je tu šance, žeERDDAP™bude soubor údajů během procesu FTP znovu nabíjet. Stává se to častěji, než si myslíte&#33; Pokud k tomu dojde, bude se soubor zdát platný (má platné jméno) Ale ta složka není platná. PokudERDDAP™pokusí se číst data z tohoto neplatného souboru, výsledná chyba způsobí přidání souboru do tabulky neplatných souborů. To není dobré. Aby se zabránilo tomuto problému, použijte dočasné jméno souboru při FTP 'ing soubor, například ABC2005.nc\\_TEMP . Pak souborNameRegex test (viz níže) uvede, že se nejedná o relevantní soubor. Po dokončení procesu FTP přejmenujte soubor na správný název. Proces přejmenování způsobí, že soubor bude okamžitě relevantní.
    
##### Extrakty názvu souboru{#file-name-extracts} 
\\[Tato funkce je DEPRECED. Prosím použijte[\\*\\*\\* fileName pseudosourceName](#filename-sourcenames)Místo toho.\\]  
EDDTableFromFoles má systém pro extrahování Stringu z každého názvu souboru a jeho použití k vytvoření pseudo datové proměnné. V současné době neexistuje systém, který by tyto Struny interpretoval jako data/časy. Existuje několik XML značek pro nastavení tohoto systému. Pokud nepotřebujete část nebo celý tento systém, prostě nespecifikujte tyto značky nebo použijte "" hodnoty.

* PreExtractRegex je[regulární výraz](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) slouží k identifikaci textu, který má být odstraněn od začátku názvu souboru. K odstranění dojde pouze tehdy, pokud se regex shoduje. To obvykle začíná na "^," aby odpovídal začátku názvu souboru.
* místo ExtractRegex je regulární výraz používaný k identifikaci textu, který má být odstraněn z konce názvu souboru. K odstranění dojde pouze tehdy, pokud se regex shoduje. To obvykle končí "$" na konci názvu souboru.
* extraktRegex Je-li přítomen, používá se tento regulární výraz po preExtractRegex a postExtractRegex k identifikaci řetězce, který má být extrahován z názvu souboru (např.stationID) . Pokud regex neodpovídá, použije se celý název souboru (- PreExtract a post Výtažek) . Použijte ".\\*" k porovnání celého názvu souboru, který je ponechán po preExtractRegex a postExtractRegex.
* sloupec NázevForExtract je zdrojový název datového sloupce pro extrahované řetězce. AdataVariables tímhle.[sourceName](#sourcename)musí být vdataVariableSeznam (s jakýmkoli datovým typem, ale obvykle String) .

Například pokud má datový soubor soubory se jmény jako XYZAble.nc, XYZBaker.nc, XYZCharlie.nc, ... a chcete vytvořit novou proměnnou (stationID) při čtení každého souboru, který bude mít hodnoty stanice ID (Able, Baker, Charlie, ...) extrahované z názvů souborů, můžete použít tyto značky:

*   &lt;PreExtractRegex&gt;^XYZ&lt;/preExtractRegex &gt;
Počáteční ^ je regulární výraz zvláštní znak, který nutíERDDAP™hledat XYZ na začátku názvu souboru. To způsobuje, že XYZ, pokud je nalezen na začátku názvu souboru, bude odstraněn (například název souboru XYZAble.ncse stane Able.nc) .
*   &lt;PostExtractRegex&gt;\\.nc$&lt;/postExtractRegex&gt;
$ na konci je pravidelný výraz zvláštní znak, který nutíERDDAP™Hledat.ncna konci názvu souboru. Od . je regulární výraz zvláštní znak (který odpovídá jakékoli postavě) , je kódován jako \\. Tady. (protože 2E je hexadecimální číslo znaku po dobu) . To způsobuje.nc, najdete-li na konci názvu souboru, který má být odstraněn (například částečný název souboru Able.ncse stane Able) .
*   &lt;extraktRegex&gt;.\\*&lt;/extrahRegex&gt;
.\\* regulární výraz odpovídá všem zbývajícím znakům (například částečný název souboru Able se stává výpisem pro první soubor) .
*   &lt;sloupecNázevForExtract&gt;stationID&lt;/SloupceNázevForExtract&gt;
To říkáERDDAP™vytvořit nový zdrojový sloupec nazvanýstationIDpři čtení každého souboru. Každý řádek dat pro daný soubor bude mít text extrahovaný z názvu souboru (například: Able) jako hodnota vstationIDsloupek.

Ve většině případů existuje mnoho hodnot pro tyto extrahovací značky, které budou mít stejné výsledky - regulární výrazy jsou velmi flexibilní. Ale v několika případech existuje jen jeden způsob, jak získat požadované výsledky.
     
##### PseudosourceNameán{#pseudo-sourcenames} 
Každá proměnná v každém datovém souboru vERDDAP™má [&lt;sourceName&gt;] (#zdrojové jméno) který určuje název zdroje proměnné. EDDTableFromFoles podporuje několik pseudosourceNames, které extrahují hodnotu z jiného místa (např. název souboru nebo hodnota globálního atributu) a podporovat tuto hodnotu jako sloupec konstantních hodnot pro tento kus dat (Například tabulka údajů tohoto souboru) . Pro tyto proměnné musíte zadat datový typ proměnné přes [&lt;dataType&gt;] (#datatyp) Tagu. Pokud jsou extrahované informace řetězec dateTime, zadejte formát řetězce dateTime v[atribut jednotek](#string-time-units). JménosourceNamemožnosti jsou:
 
###### globální:sourceNameán{#global-sourcenames} 
Příznak globálních metadat v každém zdrojovém datovém souboru může být podporován jako sloupec dat. Pokud proměnná je&lt;sourceName&gt; má formát
```
        <sourceName>global:*attributeName*</sourceName>
```
pak kdyžERDDAP™čte data ze souboru,ERDDAP™bude hledat globální atribut tohoto jména (např. PI) a vytvořit sloupec naplněný hodnotou atributu. To je užitečné, pokud atribut má různé hodnoty v různých zdrojových souborech, protože jinak by uživatelé viděli pouze jednu z těchto hodnot pro celý soubor dat. Například,
```
        <sourceName>global:PI</sourceName>
```
Když propagujete atribut jako data,ERDDAP™odstraní odpovídající atribut. To je vhodné, protože hodnota je pravděpodobně odlišná v každém souboru; vzhledem k tomu, že v souhrnném souboru údajůERDDAP™bude mít jen jednu hodnotu. Pokud chcete, můžete přidat novou hodnotu pro atribut pro celý soubor dat přidáním&lt;att name=" *atribut Název* "&gt; *nový Hodnota* &lt;/att &gt; na globální soubor dat [&lt;addAttributes&gt;] (#addattributy) . Pro globální atributy, kteréERDDAP™vyžaduje například instituci, musíte přidat novou hodnotu atributu.
     
###### proměnná:sourceNameán{#variable-sourcenames} 
Příznak metadat proměnné v každém souboru může být podporován jako sloupec dat. Pokud proměnná je&lt;[sourceName](#sourcename)\\&gt; má formát
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
pak kdyžERDDAP™čte data ze souboru,ERDDAP™bude hledat zadaný atribut (například ID) zadané proměnné (například nástroj) a vytvořit sloupec naplněný hodnotou atributu. Mateřská proměnná (například nástroj) Nemusí být jedním zdataVariableS zahrnutý v definici datového souboruERDDAP. Například,
```
        <sourceName>variable:instrument:ID</sourceName>
```
To je užitečné, pokud atribut má různé hodnoty v různých zdrojových souborech, protože jinak by uživatelé viděli pouze jednu z těchto hodnot pro celý soubor dat.

Když propagujete atribut jako data,ERDDAP™odstraní odpovídající atribut. To je vhodné, protože hodnota je pravděpodobně odlišná v každém souboru; vzhledem k tomu, že v souhrnném souboru údajůERDDAP™bude mít jen jednu hodnotu. Pokud chcete, můžete přidat novou hodnotu pro atribut pro celý soubor dat přidáním&lt;att name=" *atribut Název* "&gt; *nový Hodnota* &lt;/att &gt; k proměnné [&lt;addAttributes&gt;] (#addattributy) . Pro atributy, kteréERDDAP™vyžaduje například:ioos\\_category  (v závislosti na nastavení) , musíte přidat novou hodnotu pro atribut.
        
###### název souborusourceNameán{#filename-sourcenames} 
Můžete extrahovat část souboruJméno a propagovat jej jako sloupec dat. Formát tohoto pseudo [&lt;sourceName&gt;] (#zdrojové jméno) je
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Například,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Když EDDTableFromFromFoles čte data ze souboru, ujistí se, že název souboru (například A201807041442.slcpV1.nc) odpovídá specifikovanému regulárnímu výrazu ("regex") a extrahovat specifikované (v tomto případě první) Skupina pro zachycení (která je součástí obklopená závorkami) Například "201807041442." (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Reflex může být specifikován jako řetězec s okolními citacemi nebo bez nich. Pokud je regex určen jako řetězec s okolními citacemi, musí být řetězec[String ve stylu JSON](https://www.json.org/json-en.html)  (se speciálními znaky utekl s \\ znaky) . Číslo skupiny zachycení je obvykle 1 (první skupina zajetí) , ale může být jakékoliv číslo.
     
###### název cestysourceNameán{#pathname-sourcenames} 
Můžete extrahovat část plné cesty souboru Název (/adresáře/fileName.ext) a podporovat to, aby to byl sloupec údajů. Formát tohoto pseudo [&lt;sourceName&gt;] (#zdrojové jméno) je
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Například,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Když EDDTableFromFromFoles čte data ze souboru, zajistí celou cestuName (např. /data/myDatasetID/BAY17/B201807041442.nc. Pro tento test, adresář oddělovače budou vždy'/', nikdy '\\ ') odpovídá specifikovanému regulárnímu výrazu ("regex") a extrahovat specifikované (v tomto případě první) Skupina pro zachycení (která je součástí obklopená závorkami) Například "BAY17." (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Reflex může být specifikován jako řetězec s okolními citacemi nebo bez nich. Pokud je regex určen jako řetězec s okolními citacemi, musí být řetězec[String ve stylu JSON](https://www.json.org/json-en.html)  (se speciálními znaky utekl s \\ znaky) . Číslo skupiny zachycení je obvykle 1 (první skupina zajetí) , ale může být jakékoliv číslo.
         
##### "0 souborů" Chyba zprávy{#0-files-error-message-2} 
* Když utečeš[GenerovatDatasetsXml](#generatedatasetsxml)nebo[DasDds](#dasdds), nebo pokud se pokusíte načíst EDDTableFrom... Soubory souborů vERDDAP™, a dostanete chybovou zprávu "0 souborů" ukazující, žeERDDAP™nalezeno 0 odpovídajících souborů v adresáři (když si myslíte, že jsou odpovídající soubory v tomto adresáři) :
    * Zkontrolujte, zda jsou soubory skutečně v adresáři.
    * Zkontrolujte pravopis názvu adresáře.
    * Zkontrolujte souborNameRegex. Je opravdu snadné dělat chyby s regexy. Pro testovací účely zkuste regex .\\*, který by měl odpovídat všem názvům souborů. (Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Zkontrolujte, zda uživatel, který program provozuje (např. user=tomcat (?) pro přípravek Tomcat/ERDDAP) má "číst" povolení pro tyto soubory.
    * V některých operačních systémech (např. SELinux) a v závislosti na nastavení systému musí mít uživatel, který program spustil, oprávnění číst celý řetězec adresářů vedoucích do adresáře, který má soubory.
         
##### standardizovat Co?{#standardizewhat} 
* Pokud každá podtřída EDDTableFromFromFoles agreguje soubor zdrojových souborů pro danou proměnnou, všechny zdrojové soubory musí mít stejné hodnoty atributů pro několik atributů:scale\\_factor,add\\_offset, \\_ nepodepsané,missing\\_value, \\_FillValue a jednotky). Zamyslete se nad tím: pokud jeden soubor má windSpeed jednotky=knots a druhý má windSpeed jednotky=m/s, pak by se hodnoty dat ze dvou souborů neměly zahrnout do stejného souhrnného souboru. Když tedy EDDTableFromFoles nejprve vytvoří soubor, přečte hodnoty atributu z jednoho souboru, pak odmítne všechny soubory, které mají pro tyto důležité atributy různé hodnoty. Pro většinu souborů to není problém, protože atributy všech proměnných jsou konzistentní. U jiných sbírek souborů to však může vést k 1%, 10%, 50%, 90% nebo dokonce k 99% odmítnutých souborů jako "špatných." To je problém.
    
EDDTableFrom soubory má systém, který řeší tento problém: standardizovat Co? Standardizace To, co nastavení říká, že EDDTableFromFromFoles má standardizovat soubory, jakmile je přečte, než se EdDTableFromFoles podívá na atributy, aby zjistil, zda jsou konzistentní.
    
Obrácená strana je: pokud datový soubor nemá tento problém, nepoužívejte standardizaci Co? standardizovat Co má některá možná rizika (Diskutováno níže) a neefektivnosti. Takže pokud vlastně nepotřebujete funkce standardizace Není třeba čelit potenciálním rizikům a neefektivitě. Největší neefektivita je: Když různé standardizovat Jaké možnosti používá datový soubor, to znamená, že zdrojové soubory ukládají data výrazně různými způsoby (např. s různýmiscale\\_factoraadd\\_offset, nebo s časovými řetězci používajícími různé formáty) . Proto pro dané omezení v žádosti uživatele neexistuje žádný způsob, jakERDDAP™vytvořit jediné omezení úrovně zdroje, které lze aplikovat na všechny zdrojové soubory. Takže...ERDDAP™mohou dotčená omezení uplatňovat pouze na vyšší úrovni. Takže...ERDDAP™musí před použitím vyšších omezení cílové úrovně číst údaje z více souborů. Takže žádosti o soubory, které používají standardizaci Co trvá déle, než bude zpracováno.
    
Chcete-li tento systém používat, musíte určit
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
v[datasets.xmlpro EDDtableFrom... Soubory souborů](#eddtablefromfiles-skeleton-xml)(v rámci&lt;Soubor údajů &gt; značka).
    
The *standardizovat Co?* hodnota určuje, které změny by se měly zkusit použít. Změny jsou součtem některých kombinací:
    
1. Vybalit
To dělá mnoho běžných a bezpečných operací pro standardizaci numerických sloupců v souborech:
    * Pokudscale\\_factorneboadd\\_offsetatributy jsou přítomny, odstranit je a použít je k vybalení hodnot dat.
    * Rozbalit zabalené atributy (např. aktuální\\_min, aktuální\\_max,actual\\_range,data\\_min,data\\_max, data\\_range,valid\\_min,valid\\_max,valid\\_range) , pokud existuje, pokud proměnná byla zabalena, a pokud atribut hodnoty byly zabaleny (Je to složité, ale přiměřeně spolehlivé.) .
    * Pokud \\_FillValue a/nebomissing\\_valuejsou přítomny, převést tyto hodnoty dat naERDDAP's "standardní" chybějící hodnoty: MAX\\_valueE pro integer typy (např. 127 pro bajty, 32,767 pro zkratku a 2.147, 21.3.200647 pro ints, 9223372036854775807 dlouho) a NaN pro dvojníky a plováky.
    * Odstranit staré \\_FillValue a/nebomissing\\_valueatributy (pokud existuje) , a nahradit je pouze \\_FillValue=\\[váERDDAP™standardní chybějící hodnota\\].
         
2. Standardizovat číselné časy
Pokud má číselný sloupec číselné časové jednotky ve stylu CF (" *timeUnits* od *baseTime* "např. "dny od roku 1900-01-01") , To převádí datum Hodnoty času do"seconds since 1970-01-01T00:00:00Z"hodnoty a změny atributu jednotek to indikují.
Pokud je zvolena a existuje šance, že tato proměnná máscale\\_factorneboadd\\_offset, #1 MUSÍ být také vybrán.
     
3. Použít řetězecmissing\\_value  
Pokud má sloupec String \\_FillValue a/nebomissing\\_valueatributy, to převádí tyto hodnoty na "" a odstraňuje atributy.
     
4. Najít číselnoumissing\\_value  
Pokud číselný sloupec nemá \\_FillValue nebomissing\\_valueatributy, které se snaží identifikovat nedefinované číselnémissing\\_value  (např. -999, 999, 1e37f) a převést její případy na "standardní" hodnoty (MAX\\_VALUE pro integer typy, a NAN pro dvojníky a plováky) .
     **Tato možnost má riziko:** pokud největší nebo nejmenší platná hodnota údajů vypadá jako chybějící hodnota (např. 999) , pak tyto platné hodnoty údajů budou převedeny na chybějící hodnoty (např. NaN) .
     
5. Změnit řetězec "N/A" na ""
Pro každý sloupec String, převést několik řetězců běžně používaných k označení chybějící hodnota String na "" . V současné době to vypadá jako "," "..." "-," "?" "??" "N/A," "NA," "None," "není použitelné," "null," "neznámý," "nespecifikovaný." Hledání strun je případ-necitlivé a aplikovat po strun jsou trim'd. "nd" a "ostatní" nejsou konkrétně na seznamu.
     **Tato možnost má riziko:** Struny, které považujete za platné hodnoty, mohou být převedeny na ""
     
6. Standardizovat na řetězec ISO 8601 DateTimes
Pro každý sloupec String se snažte převést ne-čisté-numerické datum řetězceTimes (např. "Jan 2, 2018") ISO 8601 Datum provázku ("2018-01-02") .
     **Poznámka** že všechny hodnoty údajů pro sloupec musí používat stejný formát, jinak tato volba neprovede žádné změny v daném sloupci.
     **Tato možnost má riziko:** Pokud existuje sloupec s hodnotami řetězce, který vypadá jako běžné datum Časový formát, budou převedeny na ISO 8601 String dateTimes.
     
7. Standardizovat Compact DateTimes do ISO 8601 DateTimes
Pro každý sloupec String nebo integer-type se snažte převést čistě numerické datum řetězceTimes (např. "20180102") ISO 8601 Datum provázku ("2018-01-02") .
     **Poznámka** že všechny hodnoty údajů pro sloupec musí používat stejný formát, jinak tato volba neprovede žádné změny v daném sloupci.
     **Tato možnost má riziko:** Pokud existuje sloupec s hodnotami, které nejsou kompaktní datum Times but look like compact dateTimes, they will be converted to ISO 8601 String dateTimes.
     
8. Standardizovat jednotky
To se snaží standardizovat řetězec jednotek pro každou proměnnou. Například "metry za sekundu," "metr za sekundu,""m.s^-1","m s-1", "m.s-1" budou všechny převedeny na "m.s-1." To nemění hodnoty dat. To funguje dobře pro platnéUDUNITSjednotky řetězce, ale může mít problémy s invalidy nebo složité řetězce. Můžete se vypořádat s problémy tím, že konkrétní od-na páry v&lt;standardizaceUd units &gt; vERDDAP's
    \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Prosím, pošlete Chrisovi všechny změny. John na noaa.gov tak, aby mohly být začleněny do výchozích zpráv.xml.
     **Tato možnost má riziko:** To může zamotat některé složité nebo neplatné jednotky; nicméně, můžete použít pracovní-obcházení výše popsané k obcházení problémů, pokud k nim dojde.
         
    
Výchozí hodnota standardizace Co je 0, což nic nedělá.

Pokud změníte hodnotu standardizace Co, příště až bude soubor znovu načten,ERDDAP™bude znovu číst všechny datové soubory pro datový soubor s cílem obnovit mini-databázi s informacemi o každém souboru. Pokud má soubor mnoho souborů, bude to trvat dlouho.
    
Poznámky:

* Ošemetná věc je...
Standardizace Jaké nastavení se používá pro všechny sloupce ve zdrojovém souboru. Například použití #2048 může úspěšně převést sloupec kompaktního smyčcového dataTimes do ISO 8601 String dateTimes, ale může také omylem převést sloupec se Strings, který se náhodou jeví jako kompaktní datumTimes.
     
*   datasets.xmla generovatDatasety Xml -
Je obzvláště obtížné dostat nastavení správné vdatasets.xmlaby váš soubor fungoval tak, jak chcete. Nejlepší přístup (jako vždy) je:
    1. Použití[GenerovatDatasetsXml](#generatedatasetsxml)a zadat hodnotu standardizace Co byste chtěl použít.
    2. Použití[DasDds](#dasdds)zajistit správné zatížení datového souboru a odrážet standardizaci Jaké nastavení jste zadali.
    3. Otestovat soubor údajů ručně, když je vERDDAP™zajistit, aby postižené proměnné fungovaly podle očekávání.
         
* Riziko -
Možnosti #256 a vyšší jsou více riskantní, tj. je větší šance, žeERDDAP™udělá změnu, která by neměla být provedena. Například možnost #2048 může omylem převést proměnnou pomocí řetězce stanice ID, které se jen náhodou podívat ISO 8601 "kompaktní" data (např. 20180102) do ISO 8601"extended"data ("2018-01-02") .
     
* Pomalu po změně...
Od hodnoty standardizace Co mění hodnoty dat, které EDDTableFromFromFoles vidí pro každý datový soubor, pokud změníte standardizaci Jaké nastavení, EDDTableFromFoles vyhodí všechny cached informace o každém souboru (která zahrnuje min a max pro každou datovou proměnnou v každém souboru) a znovu si přečtěte každý datový soubor. Pokud má datový soubor velký počet souborů, může to být velmi časově náročné, takže bude trvat dlouho, než soubor bude poprvé znovu načístERDDAP™Nabije ho po změně.
     
* Heuristika -
Možnosti #256 a výše použít heuristiku k provedení jejich změn. Pokud narazíte na situaci, kdy se heuristici špatně rozhodnou, pošlete prosím Chrisovi popis problému. John v Noaa. Gov, abychom mohli zlepšit heuristiku.
     
* Alternativy...
Pokud jedna ze standardních možností nevyřeší problém pro daný datový soubor, můžete být schopni vyřešit problém vytvořením[.ncsoubor ml](#ncml-files)paralelně každý datový soubor a definovat změny ve věcech v souborech tak, aby byly soubory konzistentní. Pak řekni EDDTableFrom... Soubory souborů k shrnutí.ncml souborů.
    
Nebo použít[NCO](#netcdf-operators-nco)skutečně provést změny souborů tak, aby soubory byly konzistentní.
        
##### Samostatné sloupce pro rok, měsíc, datum, hodina, minuta, druhý{#separate-columns-for-year-month-date-hour-minute-second} 
Je poměrně běžné, že tabulkové datové soubory mají samostatné sloupce pro rok, měsíc, datum, hodinu, minutu, sekundu. PředERDDAP™V2.10, jediným řešením bylo upravit datový soubor tak, aby tyto sloupce byly kombinovány do jednotného časového sloupce. SERDDAP™2, 0+, můžete použít
[&lt;sourceNameOstatní *výraz* &lt;sourceName&gt;] (#zdrojové jméno) říctERDDAP™jak kombinovat zdrojové sloupce pro vytvoření jednotného časového sloupce, takže již nemusíte editovat zdrojový soubor.
##### &lt;SkipHeaderToRegex&gt;{#skipheadertoregex} 
* [&lt;skipheaderToRegex&gt;] (# Skipheadertoregex) --
Volitelně. (Pro EDDTableFromAsciiFiles a EDDTableFromColumnarAsciiFiles pouze datové soubory.)   
Když EDDTableFromAsciiFiles přečte datový soubor, bude ignorovat všechny řádky až do řádky včetně řádku, který odpovídá tomuto regulárnímu výrazu. Výchozí je "," který nepoužívá tuto volbu. Příkladem je
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
který bude ignorovat všechny řádky až do a včetně řádku, který začíná na "\\*\\*Konec hlavy.

Když používáte tuto značku,&lt;sloupecNázevRow&gt; a&lt;prvníDataRow&gt; působí, jako by hlavička byla odstraněna před čtením souboru. Například byste použili sloupecNázevsRow=0 pokud jsou názvy sloupců v řádku hned za hlavičkou.

Pokud chcete použít generovat Datové soubory Xml s datovým souborem, který potřebuje tuto značku:

1. Vytvořit nový, dočasný, vzorek soubor kopírováním existující soubor a odstranění hlavičky.
2. Spustit generovat Datové soubory Xml a zadejte vzorek souboru.
3. Ručně přidejte&lt;skipheaderToRegex&gt; tag nadatasets.xmlkus.
4. Smažte dočasný soubor.
5. Použít datový soubor vERDDAP.
##### &lt;SkipLinesRegex&gt;{#skiplinesregex} 
Volitelně. (Pro EDDTableFromAsciiFiles a EDDTableFromColumnarAsciiFiles pouze datové soubory.)   
Když EDDTableFromAsciiFiles přečte datový soubor, bude ignorovat všechny řádky, které odpovídají tomuto regulárnímu výrazu. Výchozí je "," který nepoužívá tuto volbu. Příkladem je
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
které budou ignorovat všechny řádky, které začínají na "#."

Když používáte tuto značku,&lt;sloupecNázevRow&gt; a&lt;prvníDataRow&gt; působí, jako by všechny odpovídající řádky byly odstraněny před čtením souboru. Například byste použili sloupecNázevsRow=0 i když existuje několik řádků začínajících například "#" na začátku souboru.
    
#### EDDTableFromFoles kostra XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
[ **EDDTableFromAsciiService** ](#eddtablefromasciiservice)je v podstatě škrabač obrazovky. Je určena k řešení zdrojů dat, které mají jednoduchou webovou službu pro žádost o údaje (často HTML formulář na webové stránce) a které mohou údaje vrátit ve strukturovaném formátu ASCII (například formát textu ASCII oddělený čárkou nebo sloupcem, často s jinými informacemi před údaji a/nebo po nich) .

EDDTableFromAsciiService je supertřída všech EDDTableFromAsciiService... tříd. Nemůžete použít EDDTableFromAsciiService přímo. Místo toho použijte podtřídu EDDTableFromAsciiService pro zpracování konkrétních typů služeb:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)získává data odNOAANOSovy ASCII služby.

V současné době nejsou podporovány žádné jiné typy služeb. Je však obvykle relativně snadné podporovat jiné služby, pokud fungují podobným způsobem. Kontaktujte nás, pokud máte požadavek.

#### Podrobnosti{#details} 
Následující informace se vztahují na všechny podtřídy EDDTableFromAsciiService.

* Omezení...ERDDAP™Tabulkové žádosti o údaje mohou klást omezení na jakoukoli proměnnou. Základní služba může, ale nemusí umožňovat omezení všech proměnných. Například mnoho služeb podporuje pouze omezení jmen stanic, zeměpisné šířky, délky a času. Když tedy podtřída EDDTableFromAsciiService obdrží žádost o podmnožinu datového souboru, přenese co nejvíce omezení na zdrojovou datovou službu a poté použije zbývající omezení na data, která služba vrací, před předáním dat uživateli.
* Platný rozsah -- Na rozdíl od mnoha jiných typů souborů dat, EDDTableFromAsciiService obvykle nezná rozsah dat pro každou proměnnou, takže nemůže rychle odmítnout žádosti o data mimo platný rozsah.
* Analýza ASCII textové odpovědi -- Když EDDTableFromAsciiService dostane odpověď od ASCII Text Service, musí potvrdit, že odpověď má očekávaný formát a informace, a pak extrahovat data. Formát můžete zadat pomocí různých speciálních značek v části XML pro tento datový soubor:
    *   &lt;předData1&gt; přes&lt;před značkamiData10&gt; -- Můžete zadat řadu kusů textu (kolik chceš, až do deseti.) že EDDTableFromAsciiService musí hledat v hlavičce textu ASCII vráceného službou s&lt;předData1&gt; přes&lt;předData10&gt;. To je například užitečné pro ověření, zda odpověď zahrnuje očekávané proměnné využívající očekávané jednotky. Poslední předdatová značka, kterou určíte, identifikuje text, který nastane těsně před spuštěním dat.
    *   &lt;afterData&gt; -- To určuje text, který bude EDDTableFromAsciiService hledat v textu ASCII vráceném službou, která označuje konec dat.
    *   &lt;noData&gt; -- Pokud EDDTableFromAsciiService najde tento text v textu ASCII vráceném službou, dojde k závěru, že neexistují žádné údaje, které by odpovídaly požadavku.
#### EDDTableFromAsciiService kostra XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)provádí datové soubory EDDTable z textových datových služeb ASCII nabízenýchNOAA's[National Ocean Service (NOS) ](https://oceanservice.noaa.gov/). Informace o tom, jak tato třída funguje a jak ji používat, naleznete v supertřídě této třídy.[EDDTableFromAsciiService](#eddtablefromasciiservice). Je nepravděpodobné, že někdo jiný než Bob Simons bude muset použít tuto podtřídu.

Vzhledem k tomu, že údaje v rámci odezvy ze služby NOS používají formát textového sloupce ASCII, musí mít datové proměnné jiné než zeměpisná šířka a délka zvláštní atribut, který určuje, které znaky každé datové linky obsahují například údaje této proměnné,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets)je datový soubor vyšší úrovně, který má informace o všech ostatních datových souborech, které jsou v současné době naloženy do vašeho souboruERDDAP. Na rozdíl od jiných typů souborů údajů neexistuje žádná specifikace proallDatasetsSoubor údajů vdatasets.xml.ERDDAP™automaticky vytvoří jeden EDDTableFromAllDatasets soubor (sdatasetID=allDatasets) . ProtoallDatasetsDatabáze bude vytvořena v každémERDDAP™instalace a bude pracovat stejným způsobem v každémERDDAP™instalace.

TheallDatasetsDatabáze je soubor tabulek. Má řadu informací pro každý soubor údajů. Má sloupce s informacemi o každém datovém souboru, např.datasetID, přístupné, instituce, název, minLongitude, maxLongitude, minZeměpisná šířka, maxZeměpisná šířka, minTime, maxTime, atd. ProtožeallDatasetsje tabulkový datový soubor, můžete si jej vyžádat stejným způsobem, jak si můžete vyžádat jakýkoli jiný soubor tabulky vERDDAP™, a můžete určit typ souboru pro odpověď. To umožňuje uživatelům hledat soubory zájmů velmi mocnými způsoby.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles)agreguje data z čárkových, tabulkových, středníkových nebo mezerně oddělených datových souborů ASCII.

* Nejčastěji budou mít soubory jména sloupců v prvním řádku a data začínající ve druhém řádku. (První řádek souboru se nazývá řádek číslo 1.) Ale můžete použít&lt;sloupecNázevRow&gt; a&lt;prvníDataRow&gt; ve Vašemdatasets.xmlsoubor pro upřesnění jiného čísla řádku.
*   ERDDAP™umožňuje řádkům dat mít různé počty hodnot dat.ERDDAP™předpokládá, že chybějící hodnoty údajů jsou poslední sloupce v řádku.ERDDAP™přidělí standardní chybějící hodnoty pro chybějící hodnoty údajů. (přidáno v1.56) 
* Soubory ASCII se snadno pracují, ale nejsou nejúčinnějším způsobem, jak ukládat/vymazat data. Pro větší efektivitu uložte soubory jakoNetCDFv3.ncsoubory (s jedním rozměrem, "řádkem," sdíleným všemi proměnnými) Místo toho. Můžeš.[podáníERDDAP™generovat nové soubory](#millions-of-files).
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Vzhledem k celkovému nedostatku metadat v ASCII souborech, budete vždy muset upravit výsledky GenerateDatasetsXml.
* UPOZORNĚNÍ: KdyERDDAP™čte datové soubory ASCII, pokud na daném řádku najde chybu (např. nesprávný počet položek) , zaznamenává varovný signál (Špatná linka (án) data" ... se seznamem špatných řádků na následujících řádcích) do[log.txt soubor](/docs/server-admin/additional-information#log)a dále čte zbytek datového souboru. Je tedy vaší povinností pravidelně se dívat (nebo k tomu napsat scénář) pro tuto zprávu v deníku. txt tak, že můžete opravit problémy v datových souborech.ERDDAP™je nastaven tak, aby uživatelé mohli i nadále číst všechny dostupné platné údaje, i když některé řádky souboru mají nedostatky.
     
### EDDTableFrom AwsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTableFrom AwsXmlFiles** ](#eddtablefromawsxmlfiles)agreguje data ze sady automatických počasí (AWS) XML datové soubory pomocí WeatherBug Rest XML API (která již není aktivní) .

* Tento typ souboru je jednoduchý, ale neefektivní způsob uložení dat, protože se zdá, že každý soubor obvykle obsahuje pozorování jen z jednoho časového bodu. Takže může být velký počet souborů. Pokud chcete zlepšit výkonnost, zvažte konsolidaci skupin pozorování. (Za týden?) vNetCDFv3.ncsoubory (Nejlepší:.ncSoubory s[CF Geometrie diskrétního odběru vzorků (DSG) Kontiguous Ragged Array format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) a použití[EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)  (nebo[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) sloužit datům. Můžeš.[podáníERDDAP™generovat nové soubory](#millions-of-files).
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)kumuluje data z tabulkových datových souborů ASCII s kolonami s pevnou šířkou.

* Nejčastěji budou mít soubory jména sloupců v prvním řádku a data začínající ve druhém řádku. První řádek/řádek v souboru se nazývá řádek #1. Ale můžete použít&lt;sloupecNázevRow&gt; a&lt;prvníDataRow&gt; ve Vašemdatasets.xmlsoubor pro upřesnění jiného čísla řádku.
* The&lt;addAttributes&gt; pro každý&lt;dataVariable&gt; pro tyto datové soubory MUSÍ zahrnovat tyto dva zvláštní atributy:
    
    *   &lt;att name="startColumn&gt; *celé číslo* &lt;attt&gt; -- určuje sloupec znaků v každém řádku, který je začátkem této datové proměnné.
    *   &lt;att name="stopColumn] *celé číslo* &lt;attt&gt; -- určuje sloupec znaku v každém řádku, který je 1 za koncem této datové proměnné.
    
První sloupec znaku se nazývá sloupec #0.
Například pro tento soubor, který má časové hodnoty abutting teplotní hodnoty :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
proměnná časových údajů by měla
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
a proměnná časových údajů by měla
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Tyto atributy MUSÍ být specifikovány pro všechny proměnné kromě[pevná hodnota](#fixed-value-sourcenames)a[název souboru a zdrojová jména](#filename-sourcenames)proměnné.
* Soubory ASCII se snadno pracují, ale nejsou efektivním způsobem, jak ukládat/oddělovat data. Pro větší efektivitu uložte soubory jakoNetCDFv3.ncsoubory (s jedním rozměrem, "řádkem," sdíleným všemi proměnnými) Místo toho. Můžeš.[podáníERDDAP™generovat nové soubory](#millions-of-files).
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Vzhledem k tomu, že je obtížné určit počáteční a koncové pozice pro každý datový sloupec a celkový nedostatek metadat v ASCII souborů, budete vždy muset upravit výsledky z GenerateDatasetsXml.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
EDDTabulka OdHttpGet se liší od všech ostatních typů souborů dat vERDDAP™v tom, že má systém, ve kterém mohou konkrétní "autoré" pravidelně přidávat údaje, revidovat údaje nebo mazat údaje z datového souboruHTTP GETnebo[POST](#http-post)žádosti z počítačového programu, skriptu nebo prohlížeče. Databázový soubor je dotazovatelný uživateli stejným způsobem, jako jsou všechny ostatní soubory údajů z EDDTable vERDDAP. Viz popis supertřídy této třídy,[EDDTableFromFoles](#eddtablefromfiles), číst o funkcích, které jsou zděděny z této supertřídy.

Unikátní vlastnosti EDDTableFromHttpGet jsou popsány níže. Musíte si přečíst celou tuto úvodní část a pochopit ji; jinak můžete mít nerealistická očekávání nebo se dostat do problémů, které je těžké opravit.

#### Zamýšlené použití{#intended-use} 
Tento systém je určen pro:

* Tabulkové (in situ) data, ne síťovaná data.
* Údaje v reálném čase -
Cílem je umožnit autorovi (např. senzor, automatický QC skript nebo konkrétní člověk) provést změnu datového souboru (prostřednictvím[. vložit nebo .delete příkaz](#insert-and-delete)) a zpřístupnit tuto změnuERDDAP™uživatelé, vše za méně než 1 sekundu, a možná mnohem rychleji. Většina té sekundy je síťový čas.ERDDAP™může žádost zpracovat za cca 1 ms a údaje jsou okamžitě přístupné uživatelům. Tohle je[rychle](#httpget-speed),[robustní](#robust)a[spolehlivý systém](#system-reliability).
* Téměř jakákoli frekvence dat -
Tento systém může přijímat častá data (např. denně) prostřednictvím velmi častých údajů (např. data 100 Hz) . Pokud optimalizujete systém, zvládne vyšší frekvenci dat (snad 10 KHz dat, pokud jdete do extrémů) .
* Data z jednoho senzoru nebo sbírky podobných senzorů.
*   [Verze](#versioning)/[Reprodukovatelné vědy](https://en.wikipedia.org/wiki/Reproducibility)/DOIs --
Situace, kdy musíte být schopni provést změny údajů (Například změnit vlajku kontroly kvality) , vědět, který autor udělal každou změnu, znát časové razítko, kdy autor udělal změnu, a (na vyžádání) být schopni vidět původní údaje z doby před provedením změny. Proto jsou tyto datové soubory způsobilé pro[DOIán](https://en.wikipedia.org/wiki/Digital_object_identifier). Protože se scházejíDOIpožadavek, že soubor údajů se nemění, s výjimkou agregací. Obecně platí, že údaje v reálném čase nejsou způsobilé proDOIs, protože údaje se často zpětně mění (např. pro účely QA/QC) .
     

Jakmile jsou data v souboru EDDTableFromHttpGet, může každý uživatel požadovat data stejným způsobem, jako požadují data z jakéhokoliv jiného souboru EDDTable.
     
#### Experimentální: Opatrně.{#experimental-be-careful} 
Vzhledem k tomu, že tento systém je nový a protože ztracená data o životním prostředí nelze znovu získat, měli byste se k EDDTableFromHttpGet jako experimentální. Pokud jste přechod z jiného systému, spusťte prosím starý systém a nový systém souběžně, dokud si nejste jisti, že nový systém funguje dobře (týdny nebo měsíce, nejen hodiny nebo dny) . Ve všech případech se prosím ujistěte, že váš systém odděleně archivuje .vložte a .delete URL adresy, které jsou zaslány do EDDTableFromHttpGet database (i když jen v Apači a/nebo Tomcatových protokolech) Aspoň na chvíli. A ve všech případech se ujistěte, že datové soubory vytvořené vaším souborem EDDTableFromHttpGet jsou rutinně zálohovány až na externí paměťová zařízení. (Všimněte si, že[rsync](https://en.wikipedia.org/wiki/Rsync). může zálohovat datové soubory vytvořené pomocí EDDTableFromHttpZískejte velmi efektivně.)   
     
#### . vložit a .delete{#insert-and-delete} 

Pro jakýkoli datový soubor vERDDAP™, když zašlete žádost naERDDAP™pro podmnožinu dat v souboru zadáte typ souboru, který chcete pro odpověď, např. .csv,.htmlTable,.nc,.json. EDDTableFromHttp Získat rozšíření tohoto systému na podporu dvou dalších "typů souborů," které mohou vložit (nebo změna) nebo vymazat údaje v souboru údajů:

* . vložit
    * Žádost je formátována jako standardní HTML forma odezvy, s key=value párů, oddělena '&'. Například,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
říkáERDDAP™přidat nebo změnit údaje prostationID=46088 pro stanovený čas.
    * Autorem této změny je JohnSmith a klíčem je Klíč1.
    * URL musí obsahovat platné hodnoty (chybějící hodnoty) pro všechny[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    * Pokud hodnotyhttpGetRequest Proměnné v žádosti (např.stationIDa čas) odpovídají hodnoty v řádku již v datovém souboru, nové hodnoty efektivně přepisují staré hodnoty (i když staré hodnoty jsou stále přístupné, pokud uživatel požaduje údaje z předchozího[verze](#versioning)souboru údajů) .
    * . vložit URL nesmí nikdy obsahovat &timestrom= (ERDDAP™generuje tuto hodnotu) nebo příkaz = (který je určen . vložit (což je příkaz=0) nebo .delete (což je příkaz= 1) ) .
    * Pokud .instalovat URL nespecifikuje hodnoty pro jiné sloupce, které jsou v datovém souboru, jsou považovány za nativní chybějící hodnoty (MAX\\_VALUE pro celočíselné datové typy, NaN pro plováky a dvojité a "" pro Struny) .
             
    * .delete
        * Žádost je formátována jako standardní HTML forma odezvy, s key=value párů, oddělena '&'. Například,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
říkáERDDAP™smazat údaje prostationID=46088 ve stanovené době.
        * Autorem této změny je JohnSmith a klíčem je Klíč1.
        * URL musí určit[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)v žádosti (např.stationIDa čas) . Pokud tyto hodnoty odpovídají hodnotám v řádku, které jsou již v datovém souboru (které obvykle budou) , staré hodnoty jsou účinně smazány (i když staré hodnoty jsou stále přístupné, pokud uživatel požaduje údaje z předchozího[verze](#versioning)souboru údajů) .
        * Není třeba uvádět hodnoty pro non-HttpGetRequiredVariables, jiné než autor, které jsou potřebné k ověření žádosti.
             
    
Podrobnosti:
    * .Vložit a .delete žádosti jsou formátovány jako standardní HTML formuláře odpovědi, s key=hodnota párů, odděleny '&'. Hodnoty musí být:[% zakódováno](https://en.wikipedia.org/wiki/Percent-encoding). Proto je třeba zakódovat speciální znaky do formuláře %HH, kde HH je 2 číslice hexadecimální hodnota znaku. Obvykle stačí převést několik interpunkčních znaků: % na% 225, & na% 226, "na% 222,&lt;do% 3C, = do% 3D, &gt; do% 3E, + do% 2B,|do% 7C,\\[do % 5B,\\]do %5D, prostor na%20, a převést všechny znaky nad #127 do jejich UTF-8 formuláře a pak procento enkódovat každý byte UTF-8 formuláře do%HH formátu (Požádat programátora o pomoc) .
    * . Vložit a .delete žádosti musí obsahovat[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)např.stationIDa čas. Pro . vložit žádosti, proměnné, které nejsou uvedeny v žádosti se považují za chybějící hodnoty (MAX\\_VALUE pro celočíselné proměnné, NaN pro float a dvojité proměnné a prázdný řetězec pro proměnné String) . Pro .delete žádosti, hodnoty pro non-HtpGetPožadováno Proměnné (jiný než autor, který je vyžadován) jsou ignorováni.
    * .Vložit a .delete žádosti musí obsahovat jméno autora a autorův klíč přes parametr ve formuláři autor= *autor\\_key* jako poslední parametr v žádosti. Požadovat to jako poslední zajistí, že celá žádost byla obdrženaERDDAP. Pouze autor (Ne ten klíč.) budou uloženy v datovém souboru. Musíte uvést seznam povolených *autor\\_key* 's pomocí globálního atributu[httpGetKeys](#httpgetkeys)
    * . Vložit a .delete parametry mohou být skalární (svobodný) hodnoty nebo pole jakékoli délky ve formě\\[hodnota1, hodnota2, hodnota3,..., hodnotaN\\]. Pro daný požadavek musí mít všechny proměnné s polemi pole se stejným počtem hodnot (jinak je to chyba.) . Pokud má požadavek skalární hodnoty a hodnoty pole, skalární hodnoty se replikují tak, aby se staly polemi o stejné délce jako zadaná pole, např.stationID= 46088 lze považovat zastationID=\\[46088 46088 46088\\]. Arrays jsou klíčem k[vysoká propustnost](#httpget-speed). Bez polí bude náročné .vložit nebo .vymazat více než 8 řádků dat za sekundu od vzdáleného autora (kvůli všem hlavám sítě) . Pomocí polí bude snadné .vložit nebo .vymazat více než 1000 řádků dat za sekundu ze vzdáleného senzoru.
    * . vložit a .delete přijmout (bez chybové zprávy) čísla plovoucích bodů, pokud jsou očekávána celá čísla. V těchto případech datový soubor zaokrouhlí hodnoty na celá čísla.
    * . vložit a .delete přijmout (bez chybové zprávy) celá čísla a čísla plovoucích bodů, která jsou mimo rozsah datového typu proměnné. V těchto případech databáz ukládá hodnoty jakoERDDAP's nativní chybějící hodnoty pro tento datový typ (MAX\\_VALUE pro integer typy a NaN pro plováky a dvojité) .
         
#### Odpověď{#response} 
Pokud URL . vložit nebo .delete uspěje, HTTP kód odezvy bude 200 (Dobře.) a odpověď bude text s.jsonpředmět, např.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Všimněte si, že časové značky mají milisekundovou přesnost.

Pokud URL . insert nebo .delete selže, dostanete jiný HTTP kód odezvy než 200 (Dobře.) , např. chyba 403 Zakázat, pokud předložíte nesprávnou hodnotu autora\\_key.ERDDAP™odešle HTTP kód odezvy (ne, např.,.jsonZformátovaná chyba) protože tak se věci dělají na internetu a protože chyby se mohou objevit kdekoliv v systému (např. v síti, která vrací chybu HTTP) . Pokud je chyba zERDDAP™, odpověď může obsahovat nějaký text (ne.json) s podrobnějším vysvětlením, co se pokazilo, ale HTTP kód odezvy (200=OK, všechno ostatní jsou potíže) je správný způsob, jak zkontrolovat, zda . vložit nebo .delete podařilo. Pokud není kontrola HTTP kódu odezvy možná nebo není vhodná, hledejte "status":"úspěch" v textu odpovědi, který by měl být spolehlivým ukazatelem úspěchu.
    
#### Soubory záznamů{#log-files} 
Když EDDTableFromHttpGet receives . vložit a .delete příkazy, jednoduše připojí informace k příslušnému souboru v sadě log souborů, z nichž každý je tabulka uložená v[JSON Řádky CSV souboru](https://jsonlines.org/examples/). Pokud uživatel podá žádost o údaje,ERDDAP™rychle čte příslušné soubory záznamů, aplikuje změny datového souboru v pořadí, které byly provedeny, a pak filtruje žádost prostřednictvím omezení uživatele, jako každý jinýERDDAP™požadavek na údaje. Rozdělení dat do různých souborů protokolu, ukládání různých informací (např. časové razítko příkazu a zda příkaz byl . vložit nebo .delete) , a různé aspekty nastavení datového souboru, vše umožňuje proERDDAPukládat data do tohoto datového souboru a získávat data z tohoto souboru velmi rychle a velmi efektivně.
     
#### Bezpečnost a autor{#security-and-author} 
Každý příkaz . vložit a .delete musí obsahovat &autor= *autor\\_key* jako poslední parametr, kde se autor\\_key skládá z identifikátoru autora (jste si vybrali: jméno, iniciály, pseudonym, číslo) Podtržení a tajný klíč. TheERDDAP™Správce bude pracovat s autory na vytvoření seznamu platných hodnot autora\\_key, které lze kdykoli změnit.
Když EDDTableFromHttpGet obdrží příkaz .vlož nebo .delete, zajistí, že autorID\\_key je poslední parametr a je platný. Protože je to poslední parametr, ukazuje to, že celá příkazová čára dosáhlaERDDAP™a nebyl zkrácen. Tajný klíč zajišťuje, že údaje do datového souboru mohou vkládat nebo smazat pouze konkrétní autoři.ERDDAP™pak extrahuje autoraID a uloží to do proměnné autora, aby každý mohl vidět, kdo byl zodpovědný za danou změnu datového souboru.
. vložit a .delete příkazy lze provést pouze prostřednictvímhttps:  (bezpečné)  ERDDAP™URL. Tím se zajistí, že informace, které se předávají, jsou během přepravy utajeny.
     
#### časové razítko{#timestamp} 
Jako součást systému záznamu, EDDTableFromHttpGet přidá časové razítko (čas, kdyERDDAPobdržel žádost) na každý příkaz, který ukládá do logových souborů. ProtožeERDDAP™generuje časové razítko, ne autory, nezáleží na tom, zda různí autoři provádějí změny z počítačů s hodinami nastavenými na mírně odlišné časy. Časové razítko spolehlivě označuje dobu, kdy byla provedena změna datového souboru.
     
#### HTTP POST{#http-post} 
*   ["A co HTTP POST?"](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)) je lepší alternativa (ve srovnání sHTTP GET) pro zasílání informací od klienta na HTTP server. Pokud můžete, nebo pokud opravdu chcete zlepšit bezpečnost, použijte POST místo GET odeslat informace naERDDAP. POST je bezpečnější, protože: s GET ahttps, URL je přenášena bezpečným způsobem, ale celé URL (včetně parametrů, včetně autora\\_key) budou napsány Apači, Tomcatovi aERDDAP™soubory protokolu, kde je někdo může přečíst, pokud nejsou řádně zabezpečeny. S POST jsou parametry přenášeny bezpečným způsobem a nejsou zapsány do logových souborů. POST je trochu těžší pro klienty pracovat a není podporován tak široce klientským softwarem, ale programovací jazyky jej podporují. Obsah, který zašlete do souboru dat prostřednictvím GET nebo POST, bude stejný, jen formátován jiným způsobem.
     
#### httpGetRequest Proměnné Globální atribut{#httpgetrequiredvariables-global-attribute} 
Základní součástí toho, co dělá celý tento systém funkční je požadovaný globální atributhttpGetRequest Proměnné, které je čárkou oddělený seznamdataVariablenázev zdroje, který jednoznačně identifikuje řádek údajů. To by mělo být co nejmenší a bude téměř vždy obsahovat časovou proměnnou. Například zde jsou doporučenéhttpGetRequest Proměnné pro každou z[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (ID jména se samozřejmě mohou ve vašem souboru lišit.) :

* Pro časové řady:stationID, čas
* Pro trajektorie: trajektorie ID, čas
* Pro profil: čas (za předpokladu, že čas je profil\\_id) , hloubka
* Pro časové řady Profil:stationID, čas (za předpokladu, že čas je profil\\_id) , hloubka
* Pro trajektorii Profil: trajektorie ID, čas (za předpokladu, že čas je profil\\_id) , hloubka

    
Bereme TimeSeries jako příklad:
Vzhledem k tomu, . vložit příkaz, který zahrnujestationID=46088 a čas=2016-06-23T19:53:00Z (a další hodnoty pro jiné proměnné) :
* Pokud pro tuto stanici a tuto dobu neexistují žádné údaje, pak bude mít za následek přidání údajů do souboru údajů.
* Pokud pro tuto stanici a tuto dobu existují údaje, pak bude mít za následek nahrazení existujícího řádku dat těmito novými daty. (Samozřejmě, odERDDAP™uchovává záznam každého příkazu, který obdrží, stará data jsou stále v záznamu. Pokud uživatel před touto změnou požádá o data z verze datového souboru, uvidí starší data.)   
         
#### httpGet DirectoryStrukture{#httpgetdirectorystructure} 
*   [httpGet Directory Struktura Globální atribut a data (Záznam) Název souboru](#httpgetdirectorystructure)  
Součástí toho, co dělá celý tento systém efektivně fungovat, je, žeERDDAP™vytvoří soubor dat (log) soubory, každý s jiným kusem datového souboru. Jestli jsou dobře nastavené,ERDDAP™bude moci rychle reagovat na většinu žádostí o údaje. Toto nastavení je určenohttpGetDirectoryStructure globální atribut, což je String, který vypadá jako relativní název souboru, např., "stationID/10 let," ale ve skutečnosti je to specifikace struktury adresáře. V části, která označuje, jak adresář a názvy souborů pro data (log) Soubory budou vytvořeny.
    
    * Pokud část je celé číslo (Ostatní 1) plus časPeriod (milisekunda, sekunda, minuta, hodina, datum, měsíc, rok nebo jejich množné číslo) , např. 10 let, pak EDDTableFromHttpGet soubor dat bude mít časovou hodnotu pro řádek dat (např. 2016-06-23T19:53:00Z) , vypočítat čas zkrácený na tuto přesnost (např. 2010) , a vytvořit složku nebo soubor Jméno z toho.
        
Cílem je dostat poměrně velký kus dat do každého souboru, ale mnohem méně než 2GB.
        
    * V opačném případě musí být část specifikacedataVariable'ssourceNamenapř.stationID. V tomto případě, EDDTableFromHttpGet vytvoří složku nebo název souboru z hodnoty této proměnné pro nový řádek dat (např. "46088") .
    
Vzhledem k tomu, . vložit a .delete příkaz data jsou uloženy v konkrétních datech (log) soubory, EDDTableFromHttpZískejte obvykle pouze jednu nebo několik dat (log) soubory k nalezení údajů pro daný uživatelský požadavek. A protože každá data (log) soubor má všechny relevantní informace pro jeho část datového souboru, je to rychlé a snadné pro EDDTableFromHttpZískejte konkrétní verzi (nebo aktuální verze) souboru údajů pro údaje v tomto souboru (a nemusí vytvářet požadovanou verzi celého souboru údajů) .
    
Obecné pokyny vycházejí z množství a četnosti údajů. Pokud předpokládáme 100 bytů za řádek dat, pak ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Například, pokud struktura adresáře jestationID/2 měsíce a vložíte data ze dvou stanic (46088 a 46155) s časovými hodnotami od prosince 2015 do května 2016, EDDTableFromHttp Get vytvoří adresáře pojmenované 46088 a 46155 a vytvoří soubory v každém pojmenovaném 2015-11.jsonL, 2016-01.jsonL, 2016-03.jsonL, 2016-05.jsonl (každý podnik v hodnotě dvou měsíců údajů pro příslušnou stanici) . Kdykoliv v budoucnu, pokud používáte .vložte nebo .delete pro změnu nebo vymazání údajů například pro stanici 46088 na 2016-04-05T14:45:00Z, EDDTableFromHttp Získat připojí tento příkaz na 46088/2016-03.jsonl příslušné údaje (log) Složka. A je jasné, že je v pořádku kdykoli v budoucnu přidávat data pro další stanice, protože datový soubor vytvoří pouze další adresáře potřebné k uchování dat z nových stanic.
    
#### httpGetKeys{#httpgetkeys} 
Každý EDDTable OdHttp Získat soubor dat musí mít globální atributhttpGetKeys, který určuje seznam autorů a jejich tajných klíčů jako čárku oddělený seznam *autor\\_key* např. JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* autor\\_key jsou citlivé na případ a musí být zcela ASCII znaky (#33 - #126, a bez čárky, " nebo ' znaků
* Klíče jsou jako hesla, takže MUSÍ být [ng.8] znaků, těžko uhodnout, a bez vnitřních slovníkových slov. Měli byste se k nim chovat tak, jako byste k heslům přistupovali. Udržujte je v soukromí.
* První znak '\\_' odděluje autora od klíče, takže jméno autora nemůže obsahovat znak '\\_' (Ale klíč může) .
* Každý daný autor může mít jeden nebo více autorů, např. JohnSmith\\_some Key1, JohnSmith\\_some Key7, atd.
* Hodnota tohoto atributu můžete kdykoli změnit. Změny nabývají účinku, až bude příště soubor dat načten.
* Tyto informace budou odstraněny z globálních atributů datového souboru dříve, než budou zveřejněny.
* Každá žádost o vložení nebo odstranění údajů do datového souboru musí obsahovat &Author= *autor\\_key* parametr. Po ověření platnosti klíče,ERDDAP™pouze zachrání autorskou část (Ne ten klíč.) v datovém souboru.

#### Nastavit{#set-up} 

Zde jsou doporučené kroky k nastavení EDDTableFromHttpGet souboru:

1. Udělejte hlavní adresář pro uložení dat tohoto datového souboru. Pro tento příklad pojďme použít /data/testGet/ . Uživatel běžící GenerateDatasetsXml a běžící uživatelERDDAP™musí mít oba přístup ke čtení do tohoto adresáře.
     
2. Použijte textový editor k vytvoření vzorku.jsonl CSV soubor s příponou.jsonV tom adresáři.
Jméno není důležité. Například, můžete tomu říkat vzorek..jsonl
Udělejte čáru 2.jsonl CSV soubor s názvy sloupců na prvním řádku a netypickými hodnotami (správného datového typu) na druhém řádku. Zde je vzorek soubor, který je vhodný pro sběrfeatureType=TimeSeries data, která měří teplotu vzduchu a vody.
    \\[ProfeatureTypeTrajectory, možná se změníš.stationIDk trajektorii ID.\\]  
    \\[ProfeatureTypeProfile, můžete změnitstationIDbýt profileID a přidat proměnnou hloubky.\\]
    
    \\["stationID""time", "zeměpisná šířka," "podélka," "airTemp," "waterTemp," "timestrom," "autor," "command"\\]
    \\["myStation," "2018-06-25T17:00:00Z," 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody," 0\\]
    
Poznámka:
    * Na skutečných datových hodnotách nezáleží, protože nakonec tento soubor smažete, ale měly by být správného datového typu. Zejména by časová proměnná měla používat stejný formát, jaký budou používat skutečná data ze zdroje.
    * Pro všechny proměnnésourceNamebude rovnodestinationName, tak použijte správné/konečné názvy proměnných nyní, včetně času, zeměpisné šířky, délky a někdy hloubky nebo výšky, pokud budou zahrnuty proměnné s těmito informacemi.
    * Téměř vždy bude proměnná pojmenovaná čas, který zaznamenává čas pozorování. Může to být dataType String s[jednotky vhodné pro časy strun](#string-time-units)  (např.yyyy-MM-ddT'HH:mm:ss.SSSZ) nebo údaje Typ dvojitý s[jednotky vhodné pro numerické časy](#time-units)  (např. sekundy od 1970-01-01T00:00:00Z nebo nějaký jiný základní čas) .
    * Tři sloupce (obvykle poslední tři.) Musí to být časové razítko, autore, příkaz.
    * Sloupec časového razítka bude použit pomocí EDDTableFromHttpGet to add a timemarking when it added a protection of data to the data file. Bude mít dataType double a jednotky sekundy od 1970-01-01T00:00:00Z.
    * Autorský sloupec s datyType String bude použit k záznamu autora, který poskytl data tohoto řádku. Autorizovaní autoři jsou určeni[httpGetKeys globální atribut](#httpgetkeys). Přestože klíče jsou specifikovány jako *autor\\_key* a jsou v "žádosti" URL v této podobě, pouze autorská část je uložena v datovém souboru.
    * Sloupec příkazu s datovým typem byte označuje, zda jsou data na tomto řádku vložena (0) nebo výmaz (1) .
         
3. Spustit generováníDatasets Xml a řekni to.
    
    1. Typ datového souboru je EDDTableFromHttpGet
    2. Adresář je (pro tento příklad) /data/test Dostat/
    3. Soubor vzorku je (pro tento příklad) /data/testGet/startup.jsonl
    4. ThehttpGetRequest Proměnné jsou (pro tento příklad)  stationID, čas Viz popis[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)dole.
    5. Pokud jsou údaje shromažďovány každých 5 minut,httpGetDirectoryStruktura pro tento příklad jestationID/2 měsíce . Viz popis[httpGet DirectoryStrukture](#httpgetdirectorystructure)dole.
    6. The[httpGetKeys](#httpgetkeys)
    
Přidat výstup (částdatasets.xmlpro soubor údajů) aždatasets.xml.
     
4. Upravitdatasets.xmlkus pro tento datový soubor, aby byl správný a kompletní.
Hlavně nahradit všechny ??? se správným obsahem.
     
5. Pro&lt;souborTableInMemory&gt; nastavení:
    * Nastavte to na true, pokud soubor souborů obvykle dostane časté . vložit a / nebo .delete žádosti (např. častěji než jednou za 10 sekund) . To pomáhá EDDTableFromHttpZískejte odpověď rychleji .vložit a / nebo .delete žádosti. Pokud to nastavíte na true, EDDTableFromHttpGet bude stále ukládat souborTable a související informace na disk pravidelně (podle potřeby přibližně každých 5 sekund) .
    * Nastav to na faleš. (výchozí) v případě, že soubor údajů se obvykle dostane zřídka . vložit a / nebo .delete žádosti (např. méně než jednou za 10 sekund) .
         
6. Poznámka: Je možné použít&lt;cacheFromUrl&gt; a související nastavení vdatasets.xmlpro EDDTable OdHttp Získejte soubory dat jako způsob, jak vytvořit a udržovat místní kopii vzdáleného EDDTableFromHttpGet soubor na jinémERDDAP. V tomto případě však tento místní datový soubor odmítne žádné . vložit a .delete žádosti.

#### Použití EDDTable OdHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Autoři mohou podat "žádost," která[vložit údaje do souboru údajů nebo je z něj vymazat](#insert-and-delete).
     
* Po vložení reálných dat do datového souboru můžete a měli byste smazat původní soubor se vzorkem dat.
     
* Uživatelé mohou požadovat data z datového souboru, jako to dělají pro jakýkoli jiný datový soubor EDDTable vERDDAP. Pokud žádost neobsahuje omezení sloupce časového razítka, pak žádost získá data z aktuální verze datového souboru (soubor záznamu po zpracování všech příkazů k vložení a vymazání a opětovném tříděníhttpGetRequiredVariables) .
     
* Uživatelé mohou také podávat žádosti, které jsou specifické pro EDDTableFromHttpZískejte soubory dat:
    * Pokud žádost obsahuje&lt;nebo&lt;= omezení sloupce časového razítka, pakERDDAP™zpracovává řádky souboru záznamu až do stanoveného časového razítka. To ve skutečnosti dočasně odstraní všechny změny v datovém souboru od této hodnoty časového razítka. Více informací viz[Verze](#versioning).
    * Pokud žádost obsahuje &gt;, &gt; &gt;, &gt; nebo = omezení sloupce časového razítka, např. &time razítko&lt;=0, pakERDDAP™vrací data z datových souborů tak, jak je, bez zpracování vkládání a vymazání příkazů.
* V budoucnu si představujeme, že nástroje budou postaveny (námi? tebou?) pro práci s těmito soubory dat. Například by mohl existovat skript, který čte raw log soubory, používá jinou kalibrační rovnici, a generuje / aktualizuje jiný datový soubor s těmito odvozenými informacemi. Všimněte si, že skript může získat původní data prostřednictvím požadavku naERDDAP™  (který dostane data ve formátu souboru, který je nejjednodušší pro skript pracovat s) a generovat / aktualizovat nový datový soubor prostřednictvím . vložit "žádosti" naERDDAP. Skript nepotřebuje přímý přístup k datovým souborům; může být na libovolném autorském počítači.
     

#### Podrobné informace o EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Témata jsou:

*   [Neměňte nastavení&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Neplatné žádosti](#invalidrequests)
*   [Rychlost](#httpget-speed)
*   [Robustní](#robust)
*   [Spolehlivost systému](#system-reliability)
*   [Verze](#versioning)
*   ["A co HTTP PUT a DELETE?&#33;"](#https-put-and-delete)
*   [Poznámky](#httpget-notes)
*   [Díky CHORDS za základní myšlenku.](#thanks)

Zde jsou podrobné informace:

##### Neměňte nastavení&#33;{#dont-change-the-setup} 
Po vytvoření datového souboru jste k němu přidali data:

* Nepřidávejte ani neodstraňujtedataVariables.
* NeměňtesourceNamenebodestinationNamezdataVariables.
* Neměňte data. DruhdataVariables. Ale můžete změnitdataVariableMetadata.
* NeměňtehttpGetRequest Proměnné globální atribut.
* NeměňtehttpZískat globální atribut DirectoryStructure.

Pokud potřebujete změnit některou z těchto věcí, vytvořte nový datový soubor a všechny údaje přeneste do nového datového souboru.
     
##### CRUD{#crud} 
V počítačové vědě jsou čtyři základní příkazy pro práci s datovým souborem[CREATE, READ, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, jazyk pro práci s relačními databázemi, má ekvivalent v INSERT, SELECT, UPDATE a DELETE. V EDDTableFromHttpGet,

* .Vložit je kombinace CREATE a UPDATE.
* .delete je DELETE.
* Pravidelný systém pro požadavek podskupin dat je READ.

Proto EDDTableFromHttpGet podporuje všechny základní příkazy pro práci s datovým souborem.
     
* .vložte nebo .delete žádosti bez chyb vrátí HTTP status kód=200 a JSON objekt, např.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Dvě hodnoty časového razítka se vztahují na stejnou milisekundu, což je milisekunda, která bude uložena v proměnné časového razítka pro řádky dat, které byly vloženy nebo smazány.ERDDAP™nezmění jméno a formátování těchto párů hodnot klíče v budoucnu.ERDDAP™může v budoucnu přidat další dvojice hodnot klíče k objektu JSON.
     
##### Neplatné žádosti{#invalidrequests} 
Neplatné . vložte nebo .delete žádosti vrátí HTTP chybový kód jiný než status=200 a žádná změna nebude provedena do souboru dat. To zahrnuje požadavky s nesprávnými autorskými informacemi, nesprávné názvy proměnných, různé délky pole pro různé proměnné, chybějící požadované proměnné, chybějící požadované proměnné atd. Pokud se žádost týká více než jednoho datového souboru, je možné, že část žádosti uspěje a část selže. Nicméně by to neměl být problém, pokud senzor odešle požadavek považuje jakékoli selhání za úplné selhání. Například, když řekneteERDDAP™k vložení (nebo smazat) stejná data dvakrát v řadě, nejhorší případ je, že tato informace je uložena dvakrát, zavřít společně v log souboru. Je těžké pochopit, jak by to mohlo způsobit potíže.
     
##### HttpGet Speed{#httpget-speed} 
Pro . vložit nebo . vymazat žádosti (nepočítámhttprežijní náklady) , Ballpark čísla rychlost . vložit nebo .delete jsou
1ms per . vložit s 1 řádek údajů
2ms per . vložte 10 řádků dat do polí (\\[\\])   
3ms per . vložte do polí 100 řádků dat (\\[\\])   
13ms per . Vložte 1000 řádků dat do polí (\\[\\])   
Jasně pole jsou klíčem k[vysoká propustnost](#httpget-speed). Bez polí bude náročné .vložit nebo .vymazat více než 8 řádků dat za sekundu od vzdáleného autora (kvůli všem hlavám sítě) . Pomocí polí bude snadné .vložit nebo .vymazat více než 1000 řádků dat za sekundu ze vzdáleného senzoru.

S velmi velkým množstvím dat na žádost, budete hit Tomcat je limit na maximální délku dotazu (výchozí je 8KB?) , ale to lze zvýšit editací nastavení maxHttpHeaderSize ve vašem *tomcat* /conf/server.xml HTTP/1.1 Vstup konektoru.

Kdy?ERDDAP™čte data JSON Lines CSV (log) soubory, tam je malý časový trest ve srovnání s čtením binárních datových souborů. Měli jsme pocit, že tento časový trest při čtení byl rozumnou cenou za rychlost a robustnost systému při psaní údajů (která má zásadní význam) .

##### SSD{#ssd} 
[Pro větší rychlost,](#ssd)a[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)uchovávat data. Mají mnohem rychlejší přístupový čas (&lt;0.1ms) než pevné disky (3 - 12 ms) . Také mají rychlejší přenos dat. (200 - 2500 MB/s) než disky pevných disků (~200 MB/s) . Jejich náklady se v posledních letech značně snížily. I když brzy SSD měl problémy po velkém počtu píše na daný blok, tento problém je nyní výrazně snížena. Pokud stačí použít SSD pro zápis dat jednou pak přečíst mnohokrát, dokonce i spotřebitelské třídy SSD (která je podstatně levnější než SSD kategorie podniků) Mělo by to vydržet dlouho.
    
##### Robustní{#robust} 
Snažili jsme se, aby tento systém byl co nejjednodušší a co nejpevnější.
* Systém je navržen tak, aby měl více vláken (např. senzor, automatický QC skript a člověk) současně pracuje na stejném datovém souboru a dokonce na stejném souboru. Většinu z toho je možné pomocí log souboru přístup k ukládání dat a pomocí velmi jednoduchý typ souboru,[JSON Řádky CSV souborů](https://jsonlines.org/examples/)Uložit data.
* Další obrovskou výhodou JSON Lines CSV je, že pokud se soubor někdy zkazí (např. neplatná kvůli chybě na řádku) , je snadné otevřít soubor v textovém editoru a opravit problém.
* Další výhodou je, že pokud je chyba na řádku v souboru, systém může stále číst všechna data na řádku před a po řádku chyb. A systém může stále log další . vložit a .delete informace.
* Obrovská výhoda použití admin-přístupných standardních souborů (ve srovnání s relační databází nebo Cassandrou nebo jiným softwarem) : Neexistuje žádný jiný software, který musí být udržován a který musí být spuštěn, aby mohl ukládat nebo získávat data. A je snadné zálohovat standardní soubory kdykoliv a postupně, protože data jsou v částech (Po chvíli se bude měnit pouze aktuální soubor pro každou stanici) . Naproti tomu k vytvoření externích zálohových souborů z databází a z Cassandry vyžaduje značné úsilí a systém dolů.
         
##### Spolehlivost systému{#system-reliability} 
Je rozumné očekávat jeden server sERDDAP™mít 99,9% přesčas - to je asi 9 hodin volna ročně (I když to můžeš použít za jednu špatnou noc&#33;) .
Pokud jste pilní a šťastní, můžete dostat 99,99% přesčas (53 minut prostoje ročně) , Protože jen několik restartů pro aktualizace bude trvat tolik času.
Musíte přijmout extrémní opatření. (samostatný záložní server, nepřerušitelný zdroj energie, záložní klimatizace, 24x7x365 personál sledovat stránky, atd.) mít malou šanci na 99,99% přesčas (5,25 minut prostoje ročně) . I tehdy je velmi nepravděpodobné, že dosáhnete 99,99% přesčasu. (nebo dokonce 99,99%) Protože problémy jsou často mimo vaši kontrolu. Například Amazon Web Service a Google nabízejí neuvěřitelně spolehlivé webové služby, ale velké části z nich jsou někdy mimo hodiny.

Přiznej si to, každý chceERDDAP™mít stoprocentní čas, nebo alespoň "šest devítek" (99,9999% přepážky se rovná 32 sekund prostoje za rok) Ale není možné, abys ho dostal, bez ohledu na to, kolik času, úsilí a peněz utratíš.

Ale...ERDDAP™Uptime není skutečný cíl. Cílem je vybudovat spolehlivé **systém** , který neztratí žádná data. Tohle je řešitelný problém.

Řešením je: vybudovat chybovou toleranci do počítačového softwaru, který posílá data doERDDAP. Konkrétně, tento software by měl udržovat frontu dat čekajících na přechod naERDDAP. Když jsou data přidána do fronty, software by měl zkontrolovat odpověďERDDAP. Pokud odpověď nezahrnuje přijatá data. Žádné chyby., pak software by měl nechat data ve frontě. Při generování a přidávání dat do fronty by se software měl pokusit znovu vložit data do fronty. (Možná s\\[\\]systém) . Uspěje nebo selže. Pokud selže, zkusí to později. Pokud napíšete software pro práci tímto způsobem a pokud je software připraven na frontu několika dní v hodnotě dat, máte skutečně dobrou šanci nahrát 100% dat senzoru doERDDAP. A uděláte to bez velkého úsilí nebo výdajů.

\\[Pozadí: Nevymysleli jsme si to.[Takto počítačové sítě dosahují spolehlivosti.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Počítačové sítě jsou neodmyslitelně nespolehlivé. Takže když přenesete soubor z jednoho počítače do druhého, odesílací software ví / očekává, že některé pakety mohou být ztraceny. Pokud nedostane správné uznání pro daný paket z přijímače, odešle ztracený paket. S tímto přístupem může relativně jednoduchý odesilatel a přijímačový software vybudovat spolehlivý systém přenosu souborů na vrcholu nespolehlivé sítě.\\]
    
##### Proč JSON Lines CSV soubory?&#33;{#why-json-lines-csv-files} 
EDDTableFromHttpZískat použití[JSON Řádky CSV souborů](https://jsonlines.org/examples/). pro uložení dat. Důvody jsou:

* Hlavním důvodem je: jednoduchost souborů JSON Lines CSV nabízí rychlý, snadný a spolehlivý způsob, jak umožnit více vláken k zápisu do daného souboru (např. synchronizací názvu souboru) .
* Pokud se soubor JSON Lines CSV někdy zkazil (např. neplatná kvůli chybě na řádku) , EDDTableFromHttpGet mohl stále číst všechna data na všech řádcích před a po řádku chyb. A .insert a .delete systém by mohl i nadále přidávat nová data do datového souboru.
* Protože soubory JSON Lines CSV jsou ASCII soubory, pokud by soubor byl někdy poškozen, bylo by snadné opravit (v textovém editoru) .
* JSON Lines CSV podporuje Unicode strings.
* JSON Lines CSV podporuje řetězce délky proměnné (není omezena na určitou maximální délku) .
* JSON Lines CSV podporuje 64-bit celá čísla (dlouhé) .
* Formální povaha a extra syntaxe JSON Lines CSV (CSV ze staré školy) poskytuje zvláštní ujištění, že daná linka nebyla poškozena.

Zpočátku jsme se snažili použít.nc3 soubory s neomezeným rozměrem. Byly však problémy:

* Hlavním problémem bylo: Neexistuje spolehlivý způsob, jak umožnit více vláken psát na.nc3 soubor, i když vlákna spolupracují tím, že píše synchronizovaným způsobem.
* Pokud.nc3 soubor se zkazí, . vložit a .delete systém nemůže nadále používat soubor.
* Protože.nc3 soubory jsou binární, pokud se soubor zkazí (což dělají kvůli problému s více vlákny) jsou mimořádně těžké nebo nemožné opravit. Nejsou žádné nástroje, které by pomohly s opravou.
* CF nemá žádný způsob, jak určit kódování řetězců, takže neexistuje oficiální způsob, jak podpořit Unicode, např. kódování UTF-8. Snažili jsme se získat CF na podporu atributu \\_Encoding, ale nebyli schopni dosáhnout žádného pokroku. (Unidata, ke svému úvěru, podporuje atribut \\_Encoding.) 
*   .nc3 soubory podporují pouze řetězce s pevnou délkou. Znovu jsme se snažili získat CF aUnidatapodporovat řetězce proměnné délky, ale nebyli schopni dosáhnout žádného pokroku.
*   .nc3 soubory nepodporuje snadný způsob, jak rozlišit proměnné jednotlivých znaků od proměnných String. Znovu jsme se snažili získat CF aUnidatapodporovat systém pro rozlišení těchto dvou typů údajů, avšak nebyli schopni dosáhnout žádného pokroku.
*   .nc3 soubory podporují pouze 8-bitové znaky s nespecifikovaným kódováním. Znovu jsme se snažili získat CF aUnidatapodporovat systém pro určení kódování, ale nebyli schopni dosáhnout žádného pokroku.
*   .nc3 soubory nepodporuje 64-bit celá čísla (dlouhé) . Znovu jsme se snažili získat CF aUnidatapodporovat systém po dlouhou dobu, ale nebyli schopni dosáhnout žádného pokroku.
         
##### Verze{#versioning} 
Protože EDDTable OdHttp Získejte záznamy všech změn datového souboru s časovým razítkem a autorem každé změny, může rychle obnovit tento datový soubor kdykoli. V jistém smyslu existuje verze pro jakýkoliv čas. Pokud žádost uživatele o údaje obsahuje časové razítko&lt;= omezení, např. &časové razítko&lt;=2016-06-23T16:32:22.128Z (nebo jakýkoli časový bod) , ale bez omezení autora nebo příkazu,ERDDAP™bude na žádost reagovat prvním vytvořením verze datového souboru k tomuto okamžiku. Pak,ERDDAP™uplatňuje jiná omezení uživatele, stejně jako u všech ostatních žádostí o údaje odERDDAP. EDDTableFromHttpGet je nastaven tak, že tento proces je velmi rychlý a efektivní, i pro velmi velké soubory dat.

Podobně může uživatel zjistit, kdy byl datový soubor naposledy aktualizován žádostí o ...?timerazítko&timerazítko=max (časové razítko) & Distinct () 

A pro každou žádost o data, pro jakoukoli verzi datového souboru, uživatelé mohou vidět, který autor udělal, které změny, a když je udělali.

Tento systém verzí umožňuje[Reprodukovatelné vědy](https://en.wikipedia.org/wiki/Reproducibility)protože kdokoliv může kdykoli požádat o údaje z verze datového souboru. Toto jemné verze není možné s žádným jiným systémem, o kterém víme. Podkladový mechanismus je velmi efektivní, protože není zapotřebí žádné další skladovací prostory, a zpracování nad rámec je skutečně minimální.

Ne každý potřebuje tento typ jemné verze, ale je mimořádně užitečný, možná nezbytný, v kontextu velké organizace pro správu dat. (např. OOI, Earth Cube, Data One aNOAA's NCEI) kde soubor údajů může mít více autorů (např. senzor, automatický QC skript a lidský editor) .

\\[Historie: Potřeba tohoto typu verze poprvé přišla pro mě (Bobe.) při čtení a diskusi o OOI v roce 2008. V té době, OOI měl těžkopádný, pomalý, neefektivní systém pro verze založené na Git. Git je skvělý pro to, k čemu byl navržen, ale ne pro tohle. V roce 2008 jsem na diskuzi OOI navrhl rozsáhlý, účinný alternativní systém pro správu dat, včetně mnoha funkcí, které jsem přidal kERDDAP™od té doby, včetně tohoto systému verzí. V té době a od té doby byl OOI oddán jejich systému verzí a nezajímal se o alternativy. V roce 2016 se objevily další aspekty tohoto plánu a začal jsem jej provádět. Vzhledem k tomu, že tam bylo mnoho přerušení pracovat na jiných projektech, jsem neměl dokončit až 2018. Ani teď nevím o žádném jiném vědeckém datovém systému, který nabízí tak rychlý a snadný přístup k verzi dat z jakéhokoliv okamžiku, pro často se měnící soubory dat. Jednoduchý souborový systém to nenabízí. Relativní databáze ne. Cassandra ne.\\]
    
##### HTTPS Put and Delete{#https-put-and-delete} 
*   ["A co HTTPS PUT a DELETE?&#33;"](#https-put-and-delete)  
    [Protokol Hypertext Transfer (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)je základem World Wide Web a důvod, proč webové stránky URL začínají s " http://" nebo " https://" . HTTPS je HTTP s dodatečnou bezpečnostní vrstvou. Každý den, prohlížeče, skripty a počítačové programy tvoří miliardy HTTP (S)   **GET** žádá o získání informací ze vzdálených zdrojů. HTTP (S) zahrnuje také jiné[slovesa](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), zejména PUT (přesměrovat data na server) A DELETE (na DELETE data ze serveru) . Ano, PUT a DELETE jsou vhodným způsobem, jak vložit data do datového souboru a z něj odstranit data přes HTTP (S) . GET podporuje každý kousek softwaru, který může pracovat s HTTP (S) . GET je opravdu snadné pracovat s. Každý již ví, jak pracovat s GET a mnozí vědí, jak používat POST (které lze použít v podstatě stejným způsobem jako GET) , Takže jsme udělali EDDTableFromHttpZískejte práci s GET a POST. Velmi málo lidí (i málo programátorů počítačů) kdy pracoval s PUT a DELETE. PUT a DELETE jsou obecně podporovány pouze počítačovými jazyky, takže jejich použití vyžaduje zručný program. Takže PUT a DELETE jsou obvykle mnohem náročnější přístup vzhledem k tomu, jak se nástroje vyvinuly.
     
##### HttpGet Notes{#httpget-notes} 
*   [Poznámky](#httpget-notes)
    * Ne.dataVariablemůže mít dataType=char. Místo toho použijte dataType=String. Pokud opravdu potřebujete dataType=char, email Chris. John at noaa.gov .
         
##### Díky.{#thanks} 
*   [Díky CHORDS za základní myšlenku.](#thanks)  
Základní myšlenka pro EDDTableFromHttpGet (tj. použitíHTTP GETžádost o přidání údajů do souboru údajů) je z UCAR (NOR?)  [Cloudové datové služby v reálném čase (OZNAČENÍ) ](https://github.com/earthcubeprojects-chords)projekt. Formát parametrů v žádosti (opakovaná *name=value* , odděleno pomocí &) je stejný standardní formát, který používá HTML formuláře na webových stránkách. Je to jednoduchý a brilantní nápad a ještě více proto, že se tak dokonale prolíná sERDDAP's existujícím systémem pro zpracování tabulkových dat. Myšlenka je jasná, ale já (Bobe.) Nepřemýšlel jsem o tom. EDDTableFromHttp Získejte využití této základní myšlenky, v kombinaci s našimi představami o tom, jak ji implementovat, aby systém vERDDAP™pro nahrávání dat. Kromě základní myšlenky použití GET pro vkládání dat do systému je implementace EDDTableFromHttpGet zcela odlišná a zcela nezávislá na CHORDS a má různé vlastnosti (např. soubory záznamů, ukládání dat, jiný bezpečnostní systém, podpora CRUD, opakovatelná data) . Naše vystavení CHORDS byl jen webinar. Nedívali jsme se na jejich kód ani nečetli o jejich projektu, protože jsme okamžitě věděli, že chceme systém implementovat jiným způsobem. Ale jsme jim vděční za základní myšlenku. Plná zmínka o přípravku CHORDS je
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Cloud-hosted v reálném čase datové služby pro geovědy (OZNAČENÍ) software. UCAR/NCAR -- Laboratoř pozorování Země.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFromHyraxSoubory{#eddtablefromhyraxfiles} 
[ **EDDTableFromHyraxSoubory** ](#eddtablefromhyraxfiles)  (odprekovaný) agreguje datové soubory s několika proměnnými, každý s jednou nebo více sdílenými rozměry (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) , a sloužil[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).

* Tento datový soubor je **ODCHYLKY** . Nejnovější a obecnější řešení je použít[cache Možnost FromUrl pro EDDTable FromFiles](#cachefromurl)  (nebo varianta) , který tvoří místní kopii vzdálených souborů a slouží data z místních souborů. The&lt;cacheFromUrl&gt; možnost lze použít s libovolným typem tabulkového datového souboru. **   
Jestli to z nějakého důvodu nezvládneš, napiš Chrisovi. John at noaa.gov .
Pokud před rokem 2020 neexistují žádné stížnosti, může být tento typ datového souboru odstraněn. ** 
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
* Ve většině případů má každý soubor více hodnot pro levý (první) rozměr, například čas.
* Soubory často (Ale nemusíš.) mají jedinou hodnotu pro ostatní rozměry (například výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) .
* Soubory mohou mít proměnné znaku s dodatečným rozměrem (například nCharacters) .
*   Hyraxservery lze identifikovat pomocí "/dods-bin/nph-dods/" nebo "/opendap/" v URL.
* Tato třída obrazovka-scrapesHyraxwebové stránky se seznamy souborů v každém adresáři. Vzhledem k tomu, že je velmi specifický pro současný formátHyraxwebové stránky. Pokusíme se přizpůsobit.ERDDAP™rychle pokud / pokud budoucí verzeHyraxzměnit, jak jsou soubory uvedeny.
* The&lt;fileDir&gt; nastavení je ignorováno. Protože tato třída stáhne a vytvoří místní kopii každého vzdáleného datového souboru,ERDDAP™nutí soubor Dir to be *velkýRodič rodičů* /kopie/ *datasetID* /.
* Pro&lt;sourceUrl&gt; použijte URL základního adresáře datového souboru vHyraxnapříklad server,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (Ale dejte to na jednu čáru.)   (Promiň, ale ten server už není k dispozici.) .
ThesourceUrlWebová stránka má obvykle "OPeNDAPIndex serveru\\[název adresáře\\]"nahoře.
* Vzhledem k tomu, že tato třída vždy stáhne a vytvoří místní kopii každého vzdáleného datového souboru, nikdy byste neměli zabalit tento soubor do[EDDtableCopy](#eddtablecopy).
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.
* Viz příklady 1D, 2D, 3D a 4D[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromNeplatnéCRAFile{#eddtablefrominvalidcrafiles} 
[ **EDDTableFromNeplatnéCRAFile** ](#eddtablefrominvalidcrafiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .ncsoubory, které používají specifický, neplatný, varianta CF DSG Contiguous Ragged Array (CRA) Složky. I kdyžERDDAP™podporuje tento typ souboru, je to neplatný typ souboru, který by nikdo neměl používat. Skupiny, které v současné době používají tento typ souboru, jsou důrazně vybízeny k používáníERDDAP™generovat platné soubory CF DSG CRA a přestat používat tyto soubory.

Podrobnosti: Tyto soubory mají více proměnných řádků\\_size, z nichž každá má atribut vzor\\_dimension. Soubory jsou non-CF-standardní soubory, protože více vzorků (obs) rozměry musí být dekódovány a vzájemně spojeny s tímto doplňkovým pravidlem a slibem, který není součástí specifikace CF DSG: "Můžete spojovat danou např. hodnotu teploty (rozměr tempa\\_obs) s danou hloubkou (z\\_obs rozměr, rozměr s nejvíce hodnot) , protože: teplotní řádek\\_velikost (pro danou sádru) bude buď 0 nebo rovno příslušnému řádku hloubky\\_velikost (pro tyto obsazení)   (To je pravidlo.) . Pokud tedy teplotní řádek\\_velikost není 0, pak hodnoty n teploty pro tento odlitek se vztahují přímo k hodnotám n hloubky pro tento odlitek (To je slib.) .."

Další problém s těmito soubory: proměnná Principal\\_Investigator row\\_size nemá atribut vzor\\_dimension a neřídí se výše uvedeným pravidlem.

Ukázky souborů pro tento typ souboru lze nalézt na https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Tento server již není spolehlivě dostupný\\].

Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.

První věc GenerovatDatasets Xml dělá pro tento typ souboru dat poté, co odpovíte na otázky, je vytisknout strukturu ncdump-jako vzorku souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
 
### EDDTableFromJsoniCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFromJsoniCSVFiles** ](#eddtablefromjsonlcsvfiles)Údaje z agregátů[JSON Řádky CSV souborů](https://jsonlines.org/examples/). Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

* Jak říká jsonlines.org, tento formát je "Lepší než CSV" (A legálně, jako federální zaměstnanec s nimi nemůžu souhlasit nebo nesouhlasit -- jak šílené to je?) . CSV nebyl nikdy formálně definován a je brzděn historickými zavazadly souvisejícími s jeho připojením k původním tabulkovým programům. JSON Lines CSV je ve srovnání s tím plně definován a těží z jeho připojení k široce používanému standardu JSON, který zase těží z jeho připojení kJavaSkript aJava. Bohužel existuje plná podpora pro dlouhá celá čísla a pro Unicode znaky v řetězech, a jasný způsob, jak zahrnout další speciální znaky (Zejména karty a nové linky) v řetězech.
    
Tento formát je vhodný zejména pro datové soubory, kde potřebujete pravidelně přidávat další řádky na konec daného datového souboru. Z tohoto důvodu a další (viz výše) ,[EDDTableFromHttpGet](#eddtablefromhttpget)používá soubory Json Lines CSV pro ukládání dat.
    
* Předpokládají se, že vstupní soubory jsou zakódovány UTF-8. Nicméně vzhledem k \\ u *dddd* formát pro kódování zvláštních znaků (např. \\u20ac je kódování znaku Euro) , Máte možnost napsat soubory tak, že obsahují pouze 7-bit ASCII znaky pomocí \\u *dddd* zakódovat všechny znaky nad 127.
     
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    
* UPOZORNĚNÍ: KdyERDDAP™čte JSON Linky datové soubory CSV, pokud zjistí chybu na daném řádku (např. nesprávný počet položek) , zaznamenává varovný signál (Špatná linka (án) data" ... se seznamem špatných řádků na následujících řádcích) do[log.txt soubor](/docs/server-admin/additional-information#log)a dále čte zbytek datového souboru. Je tedy vaší povinností pravidelně se dívat (nebo k tomu napsat scénář) pro tuto zprávu v deníku. txt tak, že můžete opravit problémy v datových souborech.ERDDAP™je nastaven tak, aby uživatelé mohli i nadále číst všechny dostupné platné údaje, i když některé řádky souboru mají nedostatky.
     
### EDDTablefromMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTablefromMultidimNcFiles** ](#eddtablefrommultidimncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory s několika proměnnými, každá s jednou nebo více sdílenými rozměry. Soubory mohou mít proměnné znaku s doplňkovým rozměrem nebo bez něj (například: STRING14) . Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

* Pokud jsou soubory multidimenzionální CF DSG varianty, použijte tento typ souborů místo[EDDTableFromNcCFFiles](#eddtablefromncfiles).
     
* Pro nové tabulkové soubory dat z.ncsoubory, použijte tuto volbu před pokusem o starší[EDDTableFromNcFiles](#eddtablefromncfiles). Některé výhody této třídy jsou:
    * Tato třída může číst více proměnných z širší škály struktur souborů. Pokud zadáte rozměryCSV (čárkou oddělený seznam názvů rozměrů) ve generováníDatasets Xml (nebo&lt;rozměryCSV&gt; vdatasets.xmlinformace pro jeden z těchto souborů údajů), pakERDDAP™budou číst pouze proměnné ve zdrojových souborech, které používají některé nebo všechny tyto rozměry, plus všechny skalární proměnné. Pokud je rozměr ve skupině, musíte zadat celé jméno, např. " *groupName/dimensionName* ".
    * Tato třída může často odmítnout soubory velmi rychle, pokud se neshodují s omezeními žádosti. Čtení dat z velkých sbírek tedy bude často mnohem rychlejší.
    * Tato třída zpracovává skutečné proměnné znaku (jiné proměnné než String) Správně.
    * Tato třída může zmenšit String proměnné, když tvůrce nepoužil Netcdf-java writeStrings (což znamená znak #0 označit konec řetězce) .
    * Tato třída je lepší při řešení jednotlivých souborů, které postrádají určité proměnné nebo rozměry.
    * Tato třída může odstranit bloky řádků s chybějícími hodnotami, jak je uvedeno pro[CF Geometrie diskrétního odběru vzorků (DSG) Nekompletní multidimenzionální soubory Array](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    
Skupina... Generovat soubory dat Xml požádá o "Skupinu." Můžete zadat "" aby hledala všechny skupiny, " *některé Skupina* "nebo " *některéGroup/nějakýSubGroup* "prohledat určitou skupinu, nebo "\\[kořen\\]"aby hledala jen kořenovou skupinu. Řetězec "Skupina" se stává&lt;skupina &gt; vedatasets.xmlInformace pro soubor údajů (i když "\\[kořen\\]"se stane") .
    
RozměryCSV -- GenerovatNastavení dat Xml požádá o "RozměryCSV" řetězec. Toto je seznam jmen zdrojových jmen sady rozměrů oddělených čárkou. Generovat soubory dat Xml bude číst pouze datové proměnné ve vzorku.ncsoubory, které používají některé nebo všechny tyto rozměry (a žádné jiné rozměry) , plus všechny skalární proměnné v souboru, a vytvořit soubor z těchto datových proměnných. Pokud je rozměr ve skupině, musíte zadat celé jméno, např. " *groupName/dimensionName* ".
Pokud nic nespecifikujete (prázdný řetězec) , GenerátorDatasets Xml bude hledat proměnné s nejvíce rozměry, na teorii, že budou nejzajímavější, ale tam mohou být časy, kdy budete chtít vytvořit soubor z některé jiné skupiny datových proměnných, které používají některé jiné skupiny rozměrů.
Pokud zadáte název rozměru, který neexistuje (např. NO\\_MATCH) ,ERDDAP™najde všechny skalární proměnné.
Řetězec "RozměryCSV" se stává&lt;rozměryCSV&gt; vdatasets.xmlinformace pro datový soubor.
    
#### léčbaRozměryAs{#treatdimensionsas} 
Je kategorie invalidů.ncsoubory (Protože se neřídí pravidly CF) které mají více rozměrů (např. lat, lon, čas) kdy měli použít jen jeden rozměr (např. čas) , například:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles má speciální funkci pro řešení těchto souborů: pokud přidáte globální atribut "treatDimensionsAs" do souborů globálníaddAttributes, můžete říctERDDAP™k léčbě určitých rozměrů (např. lat a lat) jako by byly jiné dimenze (např. čas) . Hodnota atributu musí být čárkou oddělený seznam, který určuje "od" rozměrů a pak rozměr "do," např.
<att name="treatDimensionsAs">jihoameričanky, chvilka, čas</att>  
PakERDDAP™bude číst soubor, jako by byl:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Současná velikost každého z rozměrů v seznamu musí být samozřejmě stejná;ERDDAP™bude soubor považovat za "špatný soubor."

Všimněte si, že tyto soubory jsou neplatné, protože se neřídí pravidly CF. Takže i kdyžERDDAP™může číst, důrazně doporučujeme, abyste nevytvářeli soubory, jako je tato, protože ostatní softwarové nástroje založené na CF je nebudou moci správně přečíst. Pokud již tyto soubory máte, doporučujeme je co nejdříve nahradit platnými soubory.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromncfiles)Údaje z agregátůNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory a[Zarr](https://github.com/zarr-developers/zarr-python)soubory (od verze 2.25) s několika proměnnými, každá s jedním společným rozměrem (například čas) nebo více než jeden společný rozměr (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) . Soubory musí mít stejné názvy rozměrů. Zadaný soubor může mít pro každý rozměr více hodnot a hodnoty se mohou lišit v různých zdrojových souborech. Soubory mohou mít proměnné znaku s dodatečným rozměrem (například: STRING14) . Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

Soubory Zarr mají mírně odlišné chování a vyžadují buď souborNameRegex nebo cestuRegex zahrnout "zarr."

* Pokud.ncSoubory používají jeden z[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)formáty souborů, zkuste použít[EDDTableFromNcCFFiles](#eddtablefromncfiles)než zkusím tohle.
     
* Pro nové tabulkové soubory dat z.ncsoubory, zkuste novější[EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Nejdřív.
     
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    
RozměryCSV -- GenerovatNastavení dat Xml požádá o "RozměryCSV" řetězec. Toto je seznam jmen zdrojových jmen sady rozměrů oddělených čárkou. Generovat soubory dat Xml najde datové proměnné v.ncsoubory, které používají některé nebo všechny tyto rozměry, plus všechny skalární proměnné, a aby data z těchto datových proměnných. Pokud nic nespecifikujete (prázdný řetězec) , GenerátorDatasets Xml bude hledat proměnné s nejvíce rozměry, na teorii, že budou nejzajímavější, ale tam mohou být časy, kdy budete chtít vytvořit soubor z některé jiné skupiny datových proměnných, které používají některé jiné skupiny rozměrů.
    
* 1D Příklad: 1D soubory jsou poněkud odlišné od 2D, 3D, 4D, ... souborů.
    * Možná máte sadu.ncdatové soubory, kde každý soubor má měsíční hodnotu dat z jedné unášené bóje.
    * Každý soubor bude mít 1 rozměr, například čas (velikost =\\[mnoho\\]) .
    * Každý soubor bude mít jednu nebo více 1D proměnných, které používají tento rozměr, například čas, zeměpisná délka, zeměpisná šířka, teplota vzduchu, ....
    * Každý soubor může mít například 2D proměnné znaků s rozměry (Time,nCharacters) .
         
* 2D příklad:
    * Možná máte sadu.ncdatové soubory, kde každý soubor má měsíční hodnotu dat z jedné unášené bóje.
    * Každý soubor bude mít 2 rozměry, například čas (velikost =\\[mnoho\\]) a ID (velikost = 1) .
    * Každý soubor bude mít 2 1D proměnné se stejnými názvy jako rozměry a pomocí stejného rozměru jména, například čas (čas) , id (id) . Tyto 1D proměnné by měly být zařazeny do seznamu&lt;dataVariable&gt; je v XML souboru.
    * Každý soubor bude mít jednu nebo více 2D proměnných, například délku, šířku, teplotu vzduchu, teplotu vody, ...
    * Každý soubor může mít například proměnné 3D znaku s rozměry (Čas, id,nCharacters) .
         
* 3D příklad:
    * Možná máte sadu.ncdatové soubory, kde každý soubor má měsíční hodnotu dat z jedné stacionární bóje.
    * Každý soubor bude mít 3 rozměry, například čas (velikost =\\[mnoho\\]) , lat (velikost = 1) , av (velikost = 1) .
    * Každý soubor bude mít 3 1D proměnné se stejnými názvy jako rozměry a pomocí stejného rozměru jména, například čas (čas) , lat (lat) , (ní) . Tyto 1D proměnné by měly být zařazeny do seznamu&lt;dataVariable&gt; je v XML souboru.
    * Každý soubor bude mít jednu nebo více 3D proměnných, například teplotu vzduchu, teplotu vody, ...
    * Každý soubor může mít například 4D proměnné znaků s rozměry (Time,lat,lon,nCharakterers) .
    * Jméno souboru může mít jméno bóje uvnitř složky.
         
* Příklad 4D:
    * Možná máte sadu.ncdatové soubory, kde každý soubor má měsíční hodnotu dat z jedné stanice. V každém okamžiku, stanice bere údaje v sérii hlubin.
    * Každý soubor bude mít 4 rozměry, například čas (velikost =\\[mnoho\\]) , hloubka (velikost =\\[mnoho\\]) , lat (velikost = 1) , av (velikost = 1) .
    * Každý soubor bude mít 4 1D proměnné se stejnými názvy jako rozměry a pomocí stejného rozměru jména, například čas (čas) , hloubka (hloubka) , lat (lat) , (ní) . Tyto 1D proměnné by měly být zařazeny do seznamu&lt;dataVariable&gt; je v XML souboru.
    * Každý soubor bude mít jednu nebo více 4D proměnných, například teplotu vzduchu, teplotu vody, ...
    * Každý soubor může mít například 5D proměnné znaků s rozměry (čas, hloubka, la, la, la, characters) .
    * Jméno souboru může mít jméno bóje uvnitř složky.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles)Údaje o agregátechNetCDF  (V3 nebo v4)  .nc  (nebo[.ncml](#ncml-files)) soubory, které používají jeden ze formátů souborů uvedených v[CF Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvence. Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

Pro soubory používající jednu z multidimenzionálních CF DSG variant použijte[EDDTablefromMultidimNcFiles](#eddtablefrommultidimncfiles)Místo toho.

Konvence CF DSG definují desítky formátů souborů a zahrnují četné drobné varianty. Tato třída se zabývá všemi variacemi, o kterých víme, ale možná jsme jeden propásli. (nebo více) . Takže pokud tato třída nemůže číst data z vašich CF DSG souborů, prosím.[požádat o dodatečnou podporu](/docs/intro#support).

Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles)Údaje z agregátů[NCCSV](/docs/user/nccsv-1.00)ASCII .csv soubory. Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
    
První věc, kterou GenerateDatasetsXml dělá pro tento typ datového souboru poté, co odpovíte na otázky, je tisk ncdump-jako struktura výběrového souboru. Takže pokud zadáte pár hloupých odpovědí pro první smyčku přes GenerateDatasets Xml, aspoň uvidíš, jestliERDDAP™může přečíst soubor a zjistit, jaké rozměry a proměnné jsou v souboru. Pak můžete dát lepší odpovědi pro druhou smyčku přes GenerateDatasetsXml.
    
* UPOZORNĚNÍ: KdyERDDAP™čte NCCSV datové soubory, pokud na daném řádku najde chybu (např. nesprávný počet položek) , zaznamenává varovný signál (Špatná linka (án) data" ... se seznamem špatných řádků na následujících řádcích) do[log.txt soubor](/docs/server-admin/additional-information#log)a dále čte zbytek datového souboru. Je tedy vaší povinností pravidelně se dívat (nebo k tomu napsat scénář) pro tuto zprávu v deníku. txt tak, že můžete opravit problémy v datových souborech.ERDDAP™je nastaven tak, aby uživatelé mohli i nadále číst všechny dostupné platné údaje, i když některé řádky souboru mají nedostatky.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (ODCHYLKY) zpracovává údaje odNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)zdroj, který používá[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)pro žádosti a odpovědi. Je to velmi specifické proNOAAXML. Viz vzorek EDDTableFromNOS v souborech dat2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
[ **EDDTableFromOBIS** ](#eddtablefromobis)zpracovává data z Ocean Biogeographic Information System (OBIS) server (byl http://www.iobis.org  ) . Je možné, že již neexistují žádné aktivní servery, které tento zastaralý typ OBIS serveru používají.

* OBIS servery očekávají požadavek XML a vrací XML odpověď.
* Protože všechny OBIS servery slouží stejným způsobem. (byl http://iobis.org/tech/provider/questions ) , Nemusíte specifikovat moc, aby nastavení OBIS data vERDDAP.
* Musíte zahrnout "creator\\_email" atribut v globálníaddAttributesVzhledem k tomu, že se tato informace používá v rámci licence. Vhodná e-mailová adresa lze nalézt čtením XML odezvy ze zdrojeURL.
* Můžete, ale nemusíte být schopni získat globální atribut [&lt;subsetVariables&gt;] (#subsetvariables) pracovat s daným OBIS serverem. Pokud to zkusíte, zkuste jednu proměnnou. (například vědecký název nebo genus) .
#### EDDTableFromOBIS kostra XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
[ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles)zpracovává údaje od[Parket](https://parquet.apache.org/). Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.

* Parket je navržen tak, aby komprimoval velmi efektivně, takže vám může dát menší velikost souborů než jiné formáty.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
* UPOZORNĚNÍ: KdyERDDAP™čte datové soubory Parquet, pokud na daném řádku najde chybu (např. nesprávný počet položek) , zaznamenává varovný signál (Špatná linka (án) data" ... se seznamem špatných řádků na následujících řádcích) do[log.txt soubor](/docs/server-admin/additional-information#log)a dále čte zbytek datového souboru. Je tedy vaší povinností pravidelně se dívat (nebo k tomu napsat scénář) pro tuto zprávu v deníku. txt tak, že můžete opravit problémy v datových souborech.ERDDAP™je nastaven tak, aby uživatelé mohli i nadále číst všechny dostupné platné údaje, i když některé řádky souboru mají nedostatky.
     
### EDDTableFromSOS {#eddtablefromsos} 
[ **EDDTableFromSOS** ](#eddtablefromsos)zpracovává data ze služby sledování senzorů (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

* Tento typ datového souboru agreguje údaje ze skupiny stanic, které jsou všechny obslouženy jednouSOSserver.
* Všechny stanice slouží stejné sadě proměnných (i když zdroj pro každou stanici nemusí sloužit všem proměnným) .
*   SOSservery očekávají požadavek XML a vrací XML odpověď.
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili. Není snadné vytvořit soubor XML proSOSÚdaje ručně. Chcete-li najít potřebné informace, musíte navštívitsourceUrl+"? služba=SOS& Žádost=GetCapabilities"v prohlížeči; podívejte se na XML; ručně vyžádejte GetObservation a podívejte se na XML odpověď na žádost.
* S příležitostným přidáním nových typůSOSservery a změny starých serverů, je stále těžší proERDDAP™automaticky detekovat typ serveru z odpovědí serveru. Použití&lt;sosServerType&gt; (s hodnotou IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, nebo KDO) je nyní STRONGLIE DOPORUČUJE. Pokud máte problémy s jakýmkoliv datovým souborem tohoto typu, zkuste znovu spustit GenerátorDatasets Xml proSOSserver. Generovat Datové soubory Xml vám umožní vyzkoušet různé&lt;sosServerType&gt; možnosti, dokud nenajdete tu správnou pro daný server.
*   SOSpřehled:
    * SWE (Povolit web senzoru) aSOS  (Služba sledování senzorů) jsou[Standardy OpenGIS®](https://www.ogc.org/standards). Tato webová stránka má standardní dokumenty.
    * TheOGCWebové služby Společné specifikace ver 1.1.0 (OGC06-121r3) pokrývá výstavbu dotazů GET a POST (viz bod 7.2.3 a bod 9) .
    * Pokud jste poslat getKapacity xml žádost naSOSserver (sourceUrl+"?service=SOS& Žádost=GetCapabilities") , dostanete xml výsledek se seznam stanic a pozorované Vlastnosti, které mají data.
    * ObservedProperty je formální URI odkaz na vlastnost. Například urn:ogc:fenomén:longitude:wgs84 nebo https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Pozorovaná vlastnost není proměnná.
    * Více než jedna proměnná může mít stejný pozorovaný Majetek (například uvnitřTempu a vně Teplota by mohla pozorovat oba Majetek https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Pokud pošlete GetObservation xml žádost naSOSserver, dostanete xml výsledek s popisy jmen polí v odpovědi, jednotky pole, a data. Název pole bude zahrnovat délku, zeměpisnou šířku, hloubku (Možná.) A čas.
    * KaždýdataVariablepro EDDTableFromSOSmusí obsahovat atribut "observedProperty," který identifikuje observedProperty, který musí být vyžádán ze serveru pro získání této proměnné. Často, několikdataVariables bude vyjmenována stejná směs ObservedProperty.
    * DataType pro každýdataVariableserver nemusí být specifikován. Pokud ano, musíte se podívat na odpovědi XML dat ze serveru a přiřadit příslušné [&lt;dataType&gt;s] (#datatyp) vERDDAP™Soubor údajůdataVariabledefinice.
    *    (V době psaní) některéSOSservery reagují na GetObservation požadavky pro více než jeden pozorovaný Vlastnost tím, že jen vrací výsledky pro první z sledovanýchProperties. (Žádná chybová zpráva&#33;) Viz požadavek parametru konstruktoru Sledoval jsem vlastnosti separátně.
* EDDTableFromSOSautomaticky přidává
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
globální atributy datového souboru při vytváření datového souboru.
*   SOSservery obvykle expresní[jednotky](#units)s[UCUM](https://unitsofmeasure.org/ucum.html)systém. VětšinaERDDAP™servery expresní jednotky s[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)systém. Pokud potřebujete převést mezi oběma systémy, můžete použít[ERDDAP's webovou službou převést UCUM jednotky na / zUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTableFromSOSkostra XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)  (odprekovaný) agreguje datové soubory s několika proměnnými, každý s jednou nebo více sdílenými rozměry (například čas, výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) , a sloužil[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).

* Tento datový soubor je **ODCHYLKY** . Nejnovější a obecnější řešení je použít[cache Možnost FromUrl pro EDDTable FromFiles](#cachefromurl)  (nebo varianta) , který tvoří místní kopii vzdálených souborů a slouží data z místních souborů. The&lt;cacheFromUrl&gt; lze použít s libovolným typem tabulkového datového souboru z libovolného webového zdroje, který publikuje adresářový seznam souborů. **   
Jestli to z nějakého důvodu nezvládneš, napiš Chrisovi. John at noaa.gov .
Pokud před rokem 2020 neexistují žádné stížnosti, může být tento typ datového souboru odstraněn. ** 
* Důrazně doporučujeme použít[Generovat soubory dat Xml program](#generatedatasetsxml)vytvořit hrubý návrhdatasets.xmlkus pro tento datový soubor. Pak to můžete upravit tak, abyste to naladili.
* Ve většině případů má každý soubor více hodnot pro levý (první) rozměr, například čas.
* Soubory často (Ale nemusíš.) mají jedinou hodnotu pro ostatní rozměry (například výška (nebo hloubka) , zeměpisná šířka, zeměpisná délka) .
* Soubory mohou mít proměnné znaku s dodatečným rozměrem (například nCharacters) .
* Servery THREDDS lze v URL identifikovat pomocí "/thredds/." Například,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Servery THREDDS mají katalogy na různých místech. Tato třída VYBAVÍ, že URL obsahuje "/thredds/catalog/." Tuto proměnnou můžete obvykle najít spuštěním v prohlížeči v kořenovém katalogu a poté kliknutím na požadovaný podkatalog.
* Tato třída čte katalog.xml soubory podávané THREDDS se seznamy&lt;katalogRefs&gt; (odkazy na další katalog.xml podsoubory) a&lt;Databáze &gt; (datové soubory) .
* The&lt;fileDir&gt; nastavení je ignorováno. Protože tato třída stáhne a vytvoří místní kopii každého vzdáleného datového souboru,ERDDAP™nutí soubor Dir to be *velkýRodič rodičů* /kopie/ *datasetID* /.
* Pro&lt;sourceUrl&gt; použijte URL souboru catalog.xml pro soubor dat v THREDDS serveru, například: pro tuto URL, která může být použita ve webovém prohlížeči,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Tento server již není spolehlivě dostupný.\\],
podání&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (Ale dejte to na jednu čáru.) .
* Vzhledem k tomu, že tato třída vždy stáhne a vytvoří místní kopii každého vzdáleného datového souboru, nikdy byste neměli zabalit tento soubor do[EDDtableCopy](#eddtablecopy).
* Tento typ datového souboru podporuje VOLITELNÝ, zřídka používaný speciální štítek,&lt;SpecialMode&gt; *režim* &lt;/specialMode&gt;, které lze použít k určení, že by měla být použita speciální, hard-kódovaná pravidla k určení, které soubory by měly být staženy ze serveru. V současné době jediný platný *režim* je SAMOS, který se používá s datovými soubory z https://tds.coaps.fsu.edu/thredds/catalog/samos stáhnout pouze soubory s číslem poslední verze.
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), informace o tom, jak tato třída funguje a jak ji používat.
* Viz příklady 1D, 2D, 3D a 4D[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromWFSSoubory{#eddtablefromwfsfiles} 
[ **EDDTableFromWFSSoubory** ](#eddtablefromwfsfiles)  (ODCHYLKY) vytvoří místní kopii všech údajů zArcGISMapServerWFSserver, takže data pak mohou být rychle re-servedERDDAP™uživatelé.

* Musíte zadat speciálně formátovanýsourceUrlglobální atributERDDAP™jak požádat o informace o funkcích ze serveru. Použijte tento příklad jako šablonu:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (ale dát to všechno na jeden řádek) 
* Musíte přidat speciální globální atribut říctERDDAP™jak identifikovat názvy částí dat, které by měly být staženy. To bude pravděpodobně fungovat pro všechny EDDTableFromWFSSoubory souborů:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Vzhledem k tomu, že tato třída vždy stáhne a vytvoří místní kopii každého vzdáleného datového souboru, nikdy byste neměli zabalit tento soubor do[EDDtableCopy](#eddtablecopy).
* Vidíš tuhle třídu?[EDDTableFromFoles](#eddtablefromfiles), pro další informace o tom, jak tato třída funguje a jak ji používat.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)může vytvořit soubor údajů EDDTable ze skupiny souborů "dítěte" EdDTable.

* Zde jsou některé použití pro EDDTableAggregateRows:
    * Mohli byste vytvořit soubor EDDTableAggregateRows ze dvou různých typů souborů nebo zdrojů dat, například soubor dat s daty až do konce posledního měsíce uložené v.ncCF soubory a datový soubor s daty za běžný měsíc uloženými v relační databázi.
    * Mohli byste vytvořit EDDTableAggregateRows soubor pro řešení změny zdrojových souborů (například změna časového formátu nebo změna názvu proměnné nebo data Typ/scale\\_factor/add\\_offsetzměna) . V tomto případě by jedno dítě získalo data ze souborů provedených před změnou a druhé dítě by získalo data ze souborů provedených po změně. Toto použití EDDTableAggregateRows je alternativou k použití[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco). Pokud není v názvu souboru rozlišovací funkce (takže můžete použít&lt;fileNameRegex&gt; k určení, který soubor patří do jakého dětského souboru), budete pravděpodobně muset uložit soubory pro dva dětské soubory do různých adresářů.
    * Mohli byste vytvořit soubor EDDTableAggregateRows, který má sdílenou podmnožinu proměnných jedné nebo více podobných, ale různých souborů souborů, například soubor údajů, který vytváří soubor profilů z kombinace datového souboru profilu, datového souboru TimeSeriesProfile a datového souboru TrajectoryProfile (které mají některé různé proměnné a některé proměnné společné -- v tom případě budete muset vytvořit speciální varianty pro dětské soubory, s pouze in-common proměnné) .
    * Můžete mít několik samostatných souborů, každý se stejným typem dat, ale z jiné stanice. Mohli byste nechat tyto soubory nedotčené, ale také vytvořit soubor EDDTableAggregateRows, který má data ze všech stanic -- každý soubor údajů o dětech může být jednoduchý[EDDTableFromErddap](#eddfromerddap), který ukazuje na jeden ze stávajících datových souborů stanic. Pokud to uděláte, dejte každému z EDDTableFromErddap soubory jinédatasetIDnež původní samostatné datové soubory, např. přidáváním "Child" origináludatasetID.
* Každé dítě&lt;Soubor údajů&gt; musí být úplným datovým souborem, jako by se jednalo o samostatný datový soubor. Každý musí mít stejný.[dataVariableán](#datavariable), ve stejném pořadí , se stejným[destinationNameán](#destinationname),[údaje Typy](#datatype),[missing\\_valueán](#missing_value),[\\_FillValues](#missing_value)a[jednotky](#units). Metadata pro každou proměnnou pro soubor EDDTableAggregateRows pocházejí z proměnných v prvním dětském souboru, ale EDDTableAggregateRows budou aktualizovat[actual\\_range](#actual_range)Metadata mají být skutečným rozsahem pro všechny děti.
* Doporučení: Získat každý soubor údajů o dětech jako samostatné soubory údajů. Pak se pokuste vytvořit soubor EDDTableAggregateRows řezáním a lepenímdatasets.xmlkus pro každého do nového EDDTableAggregate Soubor řádků.
* Nastavení dat Default Sort Order -- Pořadí dětských souborů stanoví celkový standard pořadí výsledků. Uživatelé samozřejmě mohou požádat o jiný druh objednávky pro daný soubor výsledků zadáním &orderBy (" *čárka oddělený seznam proměnných* ") až do konce jejich dotazu.
* Zdroj[globální Atributy](#global-attributes)pro EDDTableAggregateRows jsou kombinované globální atributy z prvního dětského souboru. EDDTableAggregate Řádky mohou mít globální&lt;addAttributes&gt; poskytovat další globální atributy nebo přepsat zdrojové globální atributy.
#### EDDTableAggregate Řádky kostry XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDtableCopy{#eddtablecopy} 
[ **EDDtableCopy** ](#eddtablecopy)může vytvořit místní kopii mnoha typů souborů údajů EDDTable a pak rychle re-serve dat z místní kopie.

* EDDtableCopy (a pro údaje o souřadnicích,[EDDGridKopírovat](#eddgridcopy)) je velmi snadné použití a velmi efektivní **řešení některých největších problémů se službou dat ze vzdálených zdrojů dat:** 
    * Přístup k datům ze vzdáleného zdroje dat může být pomalý.
        * Mohou být pomalé, protože jsou neodmyslitelně pomalé (například neefektivní typ serveru) ,
        * protože jsou přemoženi příliš mnoha žádostmi,
        * nebo proto, že váš server nebo vzdálený server je omezen.
    * Vzdálený datový soubor je někdy nedostupný (znovu, z různých důvodů) .
    * Spoléhání na jeden zdroj pro data se neměří dobře (například, když mnoho uživatelů a mnohoERDDAPVyužijte ho.) .
         
* Jak to funguje -- EdDtableCopy řeší tyto problémy automatickým vytvářením a udržováním místní kopie dat a podáváním dat z místní kopie.ERDDAP™může sloužit data z místní kopie velmi, velmi rychle. A vytváření a používání místní kopie zmírňuje zátěž vzdáleného serveru. A místní kopie je záloha originálu, což je užitečné pro případ, že by se něco stalo s originálem.
    
Na vytvoření místní kopie souboru není nic nového. Co je tady nového je, že tato třída to dělá\\*snadné\\*vytvořit a\\*udržovat\\*místní kopie údajů z\\*odrůda\\*typů vzdálených zdrojů dat a\\*přidat metadata\\*při kopírování dat.
    
#### EDDtableCopy vs&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; je alternativou k EdDtableCopy. Pracují jinak.

* EDDTabulka Kopírování pracuje tím, že požaduje kousky dat ze vzdálené služby a ukládá tyto kousky do místních souborů. Proto je EDDTableCopy užitečné v některých případech, kdy jsou data dostupná prostřednictvím vzdálené služby.
* [&lt;cacheFromUrl&gt;] (#Cachefromurl) stáhne existující soubory uvedené na vzdálené webové stránce.&lt;cacheFromUrl&gt; je jednodušší použít a spolehlivější, protože snadno pozná, kdy existuje nový vzdálený datový soubor nebo kdy se změnil vzdálený datový soubor, a proto je třeba jej stáhnout.

Jsou-li situace, kdy EdDtableCopy nebo&lt;cacheFromUrl&gt; lze použít, použít&lt;cacheFromUrl&gt;, protože je jednodušší a spolehlivější.
     
#### &lt;extrahování Jméno&gt;{#extractdestinationnames} 
EDDTabulka Kopírování vytváří místní kopii dat tím, že požaduje kousky dat ze vzdáleného datového souboru. EDDTabulka Kopírovat určuje, které kousky požádat o & distinct () hodnoty pro&lt;extractDestinationNames&gt; (uvedené vdatasets.xml, viz níže) , které jsou názvy proměnných ve vzdáleném datovém souboru oddělené od místa. Například,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
může generovat odlišné kombinace hodnot tuláku=tig17,profile=1017, tulák=tig17,profile=1095, ... tulák=une12,profile=1223, tulák=une12,profile=1251, ....

V situacích, kdy jeden sloupec (například profil) může být vše, co je nezbytné pro jedinečnou identifikaci skupiny řádků údajů, pokud existuje velmi velký počet například profilů, může být užitečné také uvést další výpis Země určení Název (například tulák) který slouží k rozdělení profilů. To vede k menšímu počtu datových souborů v daném adresáři, což může vést k rychlejšímu přístupu.
    
#### Místní soubory{#local-files} 
Každý kus dat je uložen v samostatnémNetCDFsoubor v podadresáři *velkýRodič rodičů* /kopie/ *datasetID* / (jak je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Existuje jedna podadresářská úroveň pro všechny kromě posledního výpisuDestinationName. Například data pro tig17+0117 by byla uložena v
     *velkýRodič rodičů* /kopie/vzorekDataset/tig17/1017.nc.
Například data une12+1251, budou uložena v
     *velkýRodič rodičů* /kopie/vzorekDataset/une12/1251.nc.
Adresář a názvy souborů vytvořené z hodnot dat jsou modifikovány tak, aby byly bezpečné (Například prostory se nahrazují slovy "x20") Tohle nemá vliv na skutečná data.
     
#### Nová data{#new-data} 
Pokaždé EDDTable Kopírování je znovu načteno, kontroluje vzdálený datový soubor, aby zjistil, jaké jednotlivé kusy jsou k dispozici. Pokud soubor pro kus dat již neexistuje, je do fronty přidán požadavek na získání kusu.ERDDAP's úkolemThread zpracovává všechny ve frontě žádosti o kousky dat, jeden po druhém. Můžete vidět statistiky pro úkolThread činnost na[Stavová stránka](/docs/server-admin/additional-information#status-page)a v[Denní zpráva](/docs/server-admin/additional-information#daily-report). (Ano.ERDDAP™by mohl přidělit více úkolů tomuto procesu, ale to by využít spoustu vzdáleného zdroje dat šířky pásma, paměti a času CPU, a mnoho místníchERDDAP's šířkou pásma, pamětí a CPU časem, ani jeden z nich není dobrý nápad.) 
    
POZNÁMKA: Úplně poprvé se načte EdDtableCopy, (Pokud vše půjde dobře) Do fronty úkolThread bude přidáno mnoho žádostí o kousky dat, ale nebudou vytvořeny žádné místní datové soubory. Takže konstruktér selže, ale úkolThread bude i nadále pracovat a vytvářet místní soubory. Pokud vše půjde dobře, úkolThread vytvoří místní datové soubory a další pokus o opětovné načtení datového souboru (za ~15 minut) bude úspěšný, ale zpočátku s velmi omezeným množstvím dat.
    
POZNÁMKA: Poté, co má místní datový soubor nějaká data a objeví se ve vašemERDDAP, pokud je vzdálený datový soubor dočasně nebo trvale nepřístupný, bude místní datový soubor stále fungovat.
    
UPOZORNĚNÍ: Pokud je vzdálený datový soubor velký a/nebo je vzdálený server pomalý (To je ten problém, že?) , bude trvat dlouho, aby kompletní místní kopii. V některých případech bude potřebný čas nepřijatelný. Například přenos 1 TB dat přes řádek T1 (0, 15 GB/s) trvá nejméně 60 dní, za optimálních podmínek. Navíc využívá spoustu šířky pásma, paměti a času CPU na vzdálených a místních počítačích. Řešením je odeslání pevného disku správci vzdálené datové sady tak, aby mohl vytvořit kopii souboru dat a odeslat pevný disk zpět vám. Použijte tato data jako výchozí bod a EDDTableCopy k nim přidá data. (To je způsob, jak Amazon EC2 Cloud Service používá k řešení problému, i když jejich systém má hodně šířky pásma.) 
    
POZOR: Pokud daná kombinace hodnot zmizí ze vzdáleného datového souboru, EdDtableCopy nevymaže lokální zkopírovaný soubor. Jestli chceš, můžeš to smazat sám.
    
#### TabulkaCopy&lt;zkontrolovatSourceData&gt;{#tablecopy-checksourcedata} 
Thedatasets.xmlpro tento datový soubor může mít volitelnou značku
```
    <checkSourceData>true</checkSourceData>  
```
Výchozí hodnota je pravdivá. Pokud / když jej nastavíte na false, data nikdy nezkontrolují zdrojový soubor, aby zjistili, zda jsou k dispozici další data.
     
#### Doporučené použití{#recommended-use} 
1. Vytvořit&lt;Databáze &gt; položka (Nativní typ, nikoli EdDtableCopy) pro vzdálený zdroj dat. **Udělejte to správně, včetně všech požadovaných metadat.** 
2. Pokud je to příliš pomalé, přidejte XML kód k zabalení do souboru EDDTableCopy.
    * Použít jinýdatasetID  (Možná změnoudatasetIDstarýchdatasetIDmírně) .
    * Kopírovat&lt;přístupný To&gt;,&lt;reloadEveryNMinutes&gt; a&lt;onChange&gt; od vzdáleného EDDTable XML až po XML EDDTableCopy. (Jejich hodnoty pro EDDTableCopy hmoty; jejich hodnoty pro vnitřní datový soubor se stávají nepodstatnými.) 
    * Vytvořit&lt;extractDestinationNames&gt; tag (viz výše) .
    *   &lt;orderExtractBy&gt; je OPTIVAL space oddělený seznam jmen cílových proměnných ve vzdáleném datovém souboru. Když se každý kus dat stáhne ze vzdáleného serveru, bude blok seřazen těmito proměnnými (první proměnnou, pak druhou proměnnou, pokud je první proměnná svázána, ...) . V některých případechERDDAP™bude moci extrahovat data rychleji z místních datových souborů, pokud první proměnná v seznamu je numerická proměnná ("time"počítá jako numerická proměnná) . Ale vyberte tyto proměnné způsobem, který je vhodný pro datový soubor.
3.  ERDDAP™vytvoří a udržuje místní kopii údajů.
         
* UPOZORNĚNÍ: EDDTableCopy předpokládá, že hodnoty dat pro každý kus se nikdy nemění. Pokud ano, musíte ručně smazat jednotlivé soubory v *velkýRodič rodičů* /kopie/ *datasetID* / která se změnila a[vlajka](/docs/server-admin/additional-information#flag)soubor údajů, který má být znovu načten, aby byly smazané kusy nahrazeny. Pokud máte e-mailové předplatné datového souboru, dostanete dva e-maily: jeden, když soubor dat poprvé načte a začne kopírovat data, a další, když se soubor dat znovu načte (automaticky) a detekuje nové místní datové soubory.
     
* Změnit metadata -- Pokud potřebujete změnit některýaddAttributesnebo změnit pořadí proměnných spojených se zdrojovým datovým souborem:
    1. ZměňteaddAttributespro zdrojový soubor dat vdatasets.xml, podle potřeby.
    2. Smazat jeden z kopírovaných souborů.
    3. Nastavit[vlajka](/docs/server-admin/additional-information#flag)okamžitě načíst soubor údajů. Pokud použijete vlajku a máte e-mailové předplatné datového souboru, dostanete dva e-maily: jeden, když soubor dat poprvé znovu načte a začne kopírovat data, a druhý, když se soubor dat znovu načte (automaticky) a detekuje nové místní datové soubory.
    4. Smazaný soubor bude regenerován s novými metadaty. Pokud zdrojový soubor není k dispozici, databázový soubor EDDTableCopy získá metadata z regenerovaného souboru, protože je to nejmladší soubor.
         
*   [EDDGridKopírovat](#eddgridcopy)je velmi podobný EdDtableCopy, ale pracuje s roštovými soubory dat.
#### EDDtableCopy kostra XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - -

## Podrobnosti{#details-1} 

Zde jsou podrobné popisy běžných značek a atributů.

### &lt;úhlovýRozhodněUnits&gt;{#angulardegreeunits} 
* [ ** &lt;angulaDegreeUnits&gt; ** ] (#angulární jednotky) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje čárku oddělený seznam jednotek řetězců, kteréERDDAP™by se mělo zacházet jako s jednotkami úhlových stupňů. Pokud má proměnná jednu z těchto jednotek,tabledap'sorderByMeanfiltr vypočítá průměr zvláštním způsobem, pak uvede průměr jako hodnotu od -180 do 180. VizERDDAP's ED Static.java zdrojový kód soubor pro aktuální výchozí seznam. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
### &lt;úhlováSouhlasíPravdaUnits&gt;{#angulardegreetrueunits} 
* [ ** &lt;úhel DegreeTrueUnits&gt; ** ] (#angulargree true units) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje čárku oddělený seznam jednotek řetězců, kteréERDDAP™Měli bychom se chovat jako úhlové stupně. Pokud má proměnná jednu z těchto jednotek,tabledap'sorderByMeanfiltr vypočítá průměr zvláštním způsobem, pak uvede průměr jako hodnotu od 0 do 360. VizERDDAP's ED Static.java zdrojový soubor pro aktuální výchozí seznam. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
     
### &lt;Obecný standardJména&gt;{#commonstandardnames} 
* [ ** &lt;Obecný standardJména&gt; ** ] (#commonstandardnames) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlpro upřesnění čárky oddělené seznamu společného[Standardní názvy CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). např.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Tento seznam se používá v DataProviderForm3.html jako komfort pro uživatele.
Pokud chcete tyto informace poskytnoutdatasets.xml, začít kopírováním aktuálního výchozího seznamu v&lt;DEFAULT\\_commonStandardNames &gt; vERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes&gt;{#cacheminutes} 
* [ ** &lt;cacheMinutes&gt; ** ] (#cachemintes) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlurčit věk (v minutách) na kterém souboru v cache by měly být vymazány (default=60) . např.
```
    <cacheMinutes>60</cacheMinutes>  
```
Obecně platí, že pouze obrazové soubory (Protože stejné obrázky jsou často žádány opakovaně) a.ncsoubory (protože musí být plně vytvořeny před odesláním uživateli) jsou utajené. I když by to mohlo vypadat, že daná žádost by měla vždy vrátit stejnou odpověď, to není pravda. Například:tabledapžádost, která zahrnuje čas&gt; *některé Čas* změní se, jakmile pro datový soubor dorazí nové údaje. A požadavek Griddap, který zahrnuje\\[poslední\\]pro časový rozměr se změní, jakmile pro datový soubor přijdou nová data. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, to bylo uvedeno v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;ConvertI TálibánuRequestCSVexample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;ConvertI TálibánuRequestCSVexample&gt; ** ] (#Konverti Tipolaterequestcsvexample) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xml \\[Začneme sERDDAP™v2.10\\]který obsahuje příklad, který bude uveden na webové stránce Interpolate převodníku. Výchozí hodnota je: jplMURSST41/analyzovaný\\_sst/Bilineární/4 .
### &lt;ConvertI TipolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;ConvertI TipolateDatasetIDVariableList&gt; ** ] (#Konverti Tipolatedatasetidvariablelist) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xml \\[Začneme sERDDAP™v2.10\\]který obsahuje seznam CSVdatasetID/proměnná Příklady jmen, které budou použity jako návrhy webové stránky Interpolate převodníku. Výchozí hodnota je: jplMURSST41/analyzovaný\\_sst.
### &lt;convertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;convertToPublicSourceUrl&gt; ** ] (# Konvertovat na veřejné zdrojeurl) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje "od" a "do" atribut, který určuje, jak převést odpovídající místnísourceUrl  (obvykle IP číslo) do veřejnostisourceUrl  (název domény) . "z" musí mít formu "\\[něco\\]//\\[něco\\]/." Může jich být 0 nebo více. Více informací viz [&lt;sourceUrl&gt;] (#sourcerl) . Například,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
způsobí odpovídající místnísourceUrl  (např. https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
do veřejnostisourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).

Ale z bezpečnostních důvodů a důvodů spojených se systémem předplatného, **Nepoužívej tenhle pytel&#33;**   
Místo toho vždy použijte název veřejné domény v&lt;sourceUrl&gt; označení a použití[Tabulka /etc/hosté](https://linux.die.net/man/5/hosts)na vašem serveru převést místní doménová jména na IP čísla bez použití DNS serveru. Můžete testovat, zda je název domény správně převeden na IP číslo pomocí:
ping *Někteří. Doména. jméno*   
     
### údaje:obraz/png;base64,{#dataimagepngbase64} 
* Pokud uživatel požaduje.htmlTableodpověď odERDDAP™, pokud data v buňce String obsahují data:obraz/png;base64, následovaná base64 zakódovaným .png obrazem,ERDDAP™zobrazí ikonu (takže uživatel může vidět obrázek, pokud nad ním vznáší) a tlačítka pro uložení textu nebo obrázku do schránky. Tato funkce byla přidána vERDDAP™v2.19 od Marca Alby.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)určuje výchozí nastavení, které kontroluje kdy a jak má být peněženka kreslenaERDDAP™Nakreslí mapu. To může být uvedeno na třech různých místech vdatasets.xml  (uvedené od nejnižší do nejvyšší priority) :
    
    1. PokuddrawLandMaskje uvedeno uvnitř&lt;erddapDatasets&gt; (není spojena s žádným konkrétním datovým souborem) , pak určuje výchozí hodnotudrawLandMaskpro všechny proměnné ve všech datových souborech. Například,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAPčtedatasets.xml.
Pokud tato značka není přítomna, výchozí hodnota je nižší.
         
    2. PokuddrawLandMaskje určen jako globální atribut daného datového souboru, pak určuje výchozí hodnotudrawLandMasku všech proměnných v tomto datovém souboru převažuje jakékoli nastavení nižší priority. Například,
    ```
        <att name="drawLandMask">under</att>  
    ```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™Nabije ten soubor.
         
    3. PokuddrawLandMaskje zadán jako atribut proměnné v daném datovém souboru, pak určuje výchozí hodnotudrawLandMaskpro tuto proměnnou v tomto datovém souboru převažuje jakékoli nižší prioritní nastavení. Například,
    ```
        <att name="drawLandMask">under</att>  
    ```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™Nabije ten soubor.
    
Uživatel může přepsat výchozí hodnotu (kde je uvedeno) výběrem hodnoty pro "Draw land mask" ze seznamu dropdown na webové stránce souboru Make A Graph, nebo zahrnutím &.land= *hodnota* v URL, která požaduje mapu zERDDAP.
    
Ve všech situacích jsou pro atribut 4 možné hodnoty:
    
    * "Pod" kreslí pevninu dřív, než nakreslí data na mapě.
U mřížkovaných souborů se půda jeví jako konstantní světle šedá barva.
U tabulkových souborů "pod" zobrazuje data topografie nad zemí a oceány.
    * "přes" -- U roštových souborů "přes" čerpá pevnina poté, co nakreslí data o mapách, aby zamaskovala všechna data nad zemí. U tabulkových souborů ukazuje "přes" batymetrii oceánu a konstantní světle šedou, kde je půda, oba vykreslené pod údaji.
    * "outline" kreslí obrys pevniny, politických hranic, jezer a řek.
    * "vypnout" nic nenakreslí.
### &lt;emailDiagnostikaToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;emailDiagnostikaToErdData&gt; ** ] (#emaildiagnosticstoerddata) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xml. Hodnota značky může být pravdivá (výchozí) nebo falešně. Pokud je to pravda,ERDDAP™Pošlete zprávu Chrisovi. John v Noaa. gov (váERDDAP™vývojový tým) . To by mělo být bezpečné a bezpečné, protože žádné důvěrné informace (např. žádostUrl) je součástí e-mailu. To by mělo umožnit chytit všechny obskurní, zcela neočekávané chyby, které vedou k NullPointerExceptions. V opačném případě uživatel vidí výjimky, aleERDDAP™Vývojový tým ne. (takže nevíme, jestli je tu nějaký problém, který je třeba napravit.) .
     
### &lt;grafBackgroundColor&gt;{#graphbackgroundcolor} 
* [ ** &lt;graphBackgroundColor&gt; ** ] (#grafbackgroundcolor) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlzadat výchozí barvu pozadí na grafech. To ovlivňuje téměř všechny grafy. Existuje několik situací, které nebyly ovlivněny. Barva je specifikována jako osmimístný hexadecimální hodnota ve formě 0xAARRGGBB, kde AA, RR, GG a BB jsou opacity, červené, zelené a modré složky. "0x" je případ citlivý, ale hexadecimální číslice nejsou citlivé. Například zcela neprůhledná (ff) zelená modrá barva s červenou=22, zelená=88, modrá=ee by byla 0xff2288e. Neprůhledná bílá je 0xffffffffffff. Výchozí je neprůhledná světle modrá (0xffffccff) , která má tu výhodu, že se liší od bílé, což je důležitá barva v mnoha paletách používaných k kreslení dat. Například,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxRequests&gt; ** ] (#ipaddressmax requests) je zřídka používaná volitelná značka (První podporovanáERDDAP™v2. 12) v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý je součástí systému, který omezuje schopnost příliš agresivních oprávněných uživatelů a škodlivých uživatelů podávat velký počet simultánních žádostí, které by degradovaly výkon systému pro ostatní uživatele. ipAdresa MaxRequests určuje maximální počet simultánních žádostí, které budou přijaty z jakékoli konkrétní IP adresy. Další žádosti obdrží HTTP 429 chyba: Příliš mnoho požadavků. Malé, statické soubory v erddap/download/ a erddap/images/ nejsou z tohoto počtu vyloučeny. Výchozí hodnota je 15. Maximálně 1000, což je šíleně vysoko -- nedělejte to&#33;ERDDAP™Nepřijme číslo menší než 6, protože mnoho oprávněných uživatelů (zejména webové prohlížeče aWMSklienti) vyplňte až 6 žádostí najednou. TheERDDAP™Daily Report a podobné informace napsané do log.txt souboru s každým Major Dataset Reload, budou nyní obsahovat přehled požadavků těchto IP adres pod názvem "Requester's IP Address (Příliš mnoho žádostí) ".
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
    
"Major LoadDatasets Time Series" sekce status.html obsahuje sloupec "TooMany," který uvádí počet žádostí, které přesahují nastavení ipAddressMaxRequests uživatele a tak viděl chybu "Too Many Requests." To vám umožní snadno vidět, když jsou aktivní příliš agresivní legitimní uživatelé a škodlivé uživatele, takže můžete (volitelně) podívejte se do log.txt souboru a rozhodněte se, zda chcete tyto uživatele na černou listinu.
    
Není nic konkrétně špatného na tom, nastavit to na vyšší číslo. Je to na tobě. Ale to umožňuje/povzbuzuje lidi, aby nastavili systémy, které používají velké množství vláken k práci na projektech a pak jim nedává žádnou zpětnou vazbu, že to, co dělají, jim nepřináší žádnou výhodu.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ipaddressmax requestsactive) je zřídka používaná volitelná značka (První podporovanáERDDAP™v2. 12) v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý je součástí systému, který omezuje schopnost příliš agresivních oprávněných uživatelů a škodlivých uživatelů podávat velký počet simultánních žádostí, které by degradovaly výkon systému pro ostatní uživatele. ipAddressMaxRequestsActive určuje maximální počet simultánních žádostí, které budou aktivně zpracovávány z jakékoli konkrétní IP adresy. Další žádosti budou sedět ve frontě, dokud nebudou vyřízeny předchozí žádosti. Malé, statické soubory v erddap/download/ a erddap/images/ jsou z tohoto počtu a souvisejícího throtlingu vyňaty. Výchozí hodnota je 2. Maximální povoleno je 100, což je šíleně vysoko -- nedělejte to&#33; Můžete to nastavit na 1 být striktní, zejména pokud máte problémy s příliš agresivní nebo zlomyslné uživatele. Uživatelé budou stále rychle získat všechna data, která požadují (až ipAddressMaxRequests) Ale nebudou schopni využít systémové zdroje. Nedoporučujeme to nastavit na větší číslo, protože umožňuje příliš agresivní legitimní uživatele a škodlivé uživatele dominovatERDDAP's kapacitou zpracování.
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAddressUnlimited&gt; ** ] (#ipadadressunlimited) je zřídka používaná volitelná značka (První podporovanáERDDAP™v2. 12) v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý je součástí systému, který omezuje schopnost příliš agresivních oprávněných uživatelů a škodlivých uživatelů podávat velký počet simultánních žádostí, které by degradovaly výkon systému pro ostatní uživatele. ipAddressUnlimited je čárka-oddělený seznam IP adres, které chcete povolit neomezený přístup k vašemuERDDAP. Podívej se do svého deníku. txt soubor zjistit, který formát váš server používá pro IP adresy. Na některých serverech budou IP adresy ve formátu #.#.#.# (kde # je celé číslo od 0 do 255) ; zatímco na ostatních to bude ve formátu #:#:#:#:#:#:#:#:#:#:# . Žádající na tomto seznamu nepodléhají ani ipAddressMaxRequests, ani ipAddressMaxRequestsActive nastavení. Tohle by mohlo být sekundární.ERDDAP™nebo pro některé uživatele nebo servery ve vašem systému.ERDDAP™vždy přidá " (neznámáNPPadresa) "ERDDAP™používá, když není možné určit IP adresu requesteru, např. pro jiné procesy běžící na stejném serveru.
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
    
Pokud z nějakého důvodu všechny žádosti uživatele dostanou chybovou zprávu "Timeout čeká na vaše další požadavky na zpracování." pak můžete problém vyřešit přidáním IP adresy uživatele do ipAddressUnlimited list, aplikace této změny, pak odstranit z tohoto seznamu.
    
### &lt;loadDatasetsMinMinutes&gt;{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasetsMinMinutes&gt; ** ] (#loaddatasetsminminutes) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlstanovit minimální čas (v minutách) mezi hlavním zatížením Datové soubory (kdyERDDAP™reprocesydatasets.xml, včetně kontroly každého datového souboru, zda je třeba jej znovu načíst podle jeho opětovného načtení Nastavení everyNMinutes, default=15) . např.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Pokud daný průběh zatíženíDatasets trvá méně než tentokrát, nakladač se jen opakovaně dívá do adresáře vlajky a/nebo spí, dokud neuplyne zbývající čas. Výchozí hodnota je 15 minut, což by mělo stačit téměř všem. Jediná nevýhoda nastavení tohoto na menší počet je, že zvýší frekvenci, žeERDDAP™retruje soubory, které mají chyby, které jim brání v načtení (např. nefunguje vzdálený server) . Pokud je takových souborů mnoho a jsou často přezkoušeny, zdroj údajů by mohl považovat za otravné/agresivní chování. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, to bylo uvedeno v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinutes&gt; ** ] (#loaddatasetsmaxminutes) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlstanovit maximální čas (v minutách) hlavní zátěž Snaha datových souborů je povolena (před zatížením Datové sady nitě považované za "nainstalované" a jsou přerušeny)   (default=60) . např.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Obecně by to mělo být nastaveno nejméně dvakrát tak dlouho, pokud si rozumně myslíte, že přehrávání všech souborů dat (kumulativně) měl by brát (protože počítače a sítě jsou někdy pomalejší, než se očekávalo) To by mělo být vždy mnohem delší než načítáníDatasetsMinMinutes. Výchozí hodnota je 60 minut. Někteří lidé to nastaví na delší dobu. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, to bylo uvedeno v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;LogLevel&gt;{#loglevel} 
* [ ** &lt;logLevel &gt; ** ] (#loglevel) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlurčit, kolik diagnostických zpráv je odesláno do souboru log.txt. Může být nastaveno na "varování" (Nejmenší zprávy) , "info" (výchozí) , nebo "všechny" (nejvíce zpráv) . např.
```
    <logLevel>info</logLevel>  
```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, to bylo uvedeno v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;částečný požadavekMaxBytes&gt; a&lt;Částečná žádostMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;partitionalRequestMaxBytes &gt; **] (#částečněpožadavekmaxbytes-a-částečněpožadavekmaxbuňky) a [** &lt;partitionalRequestMaxCells&gt; ** ] (#částečněpožadavekmaxbytes-a-částečněpožadavekmaxbuňky) jsou vzácně používány VOLITELNÉ tagy v rámci&lt;erddapDatasets&gt; tag indatasets.xml. Pokud je to možné (A není to vždy možné.) ,ERDDAP™rozbíjí velké požadavky na data do kousků pro zachování paměti.
    
S 32 bityJava, v zjednodušeném smyslu, maximální počet současně *velký* požadavky jsou zhruba 3/4 dostupné paměti (hodnota -Xmx přenesena na Tomcat) děleno velikostí kusu (např. 1200 MB / 100 MB =&gt; 12 žádostí) . Jiné věci vyžadují paměť, takže skutečný počet žádostí bude menší. V praxi to není vždy možné. Takže jedna obrovská nebo několik velmi velkých simultánně nenáročných žádostí může způsobit problémy 32 bitů.Java.

Se 64 bityJava, hodnota -Xmx může být mnohem větší. Takže paměť je mnohem méně pravděpodobná jako omezení.

Můžete přepsat výchozí velikost bloku definováním těchto značek vdatasets.xml  (s různými hodnotami, než je zde uvedeno) :
U sítí:&lt;ČástRequestMaxBytes&gt;100000000&lt;/částečněRequestMaxBytes &gt;
Pro tabulky:&lt;parciálníRequestMaxCells&gt;1000000&lt;/částečněRequestMaxCells &gt;

particiousRequestMaxBytes je preferovaný maximální počet bytů pro žádost o dílčí údaje sítě (část celkové žádosti) . default=100000000 (10^8) . Větší velikosti nejsou nutně lepší. (a nejezdi nad 500 MB, protože to je výchozí limit THREDDS proDAPodpovědi) . Ale větší velikosti mohou vyžadovat méně přístupu tun souborů (myslet naERD's satelitními daty s každým časovým bodem v samostatném souboru - je lepší získat více dat z každého souboru v každé částečné žádosti) .

parciálníRequestMaxCells je preferovaný maximální počet buněk (nRows \\* nColumns v tabulce dat) pro žádost o dílčí údaje TABLE (část celkové žádosti) . Výchozí = 100000. Větší velikosti nejsou nutně lepší. Výsledkem je delší čekání na počáteční dávku dat ze zdroje.

Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, tyto byly specifikovány v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;ŽádostBlacklist&gt;{#requestblacklist} 
* [ ** &lt;requestBlacklist&gt; ** ] (#Request blacklist)  [je VOLITELNÁ tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje čárku oddělený seznam číselných IP adres, které budou na černé listině. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
    * To lze použít k odvrácení[Popírání služebního útoku](https://en.wikipedia.org/wiki/Denial_of_service), příliš horlivý[web robot](https://en.wikipedia.org/wiki/Internet_bot), nebo jakýkoli jiný typ problémového uživatele.
    * Potížistka... PokudERDDAP™zpomalí na plazí nebo zamrzne / zastaví, příčinou je často problémový uživatel, který běží více než jeden skript najednou a / nebo dělá velký počet velmi velké, extrémně neefektivní, nebo neplatné žádosti, nebo současné žádosti. Podívejte se dovnitř.[log.txt](/docs/server-admin/additional-information#log)zjistit, zda tomu tak je, a najít numerickou IP adresu problematického uživatele. Jestli je tohle ten problém, měl bys toho uživatele asi vymazat.
        
Kdy?ERDDAP™dostane žádost z blacklisted IP adresy, vrátí HTTP Chyba 403: Zakázané. Doprovodná textová chybová zpráva podporuje uživatele, aby vám e-mail,ERDDAPSprávce, aby vyřešil problémy. Pokud chtějí čas na čtení chybové zprávy (Mnozí zřejmě ne.) a kontaktovat vás, pak můžete pracovat s nimi, aby spustit jen jeden skript najednou, dělat účinnější požadavky, opravit problémy ve svém scénáři (například požadavek na údaje ze vzdáleného datového souboru, který nemůže odpovědět před načasováním) Nebo cokoliv jiného bylo zdrojem problémů.
        
Uživatelé si často prostě neuvědomují, že jejich požadavky jsou nepříjemné. Často si neuvědomují chyby, hrubé nedostatky nebo jiné problémy se svými scénáři. Často si to myslí, protožeERDDAP™nabízí data zdarma, že mohou požadovat tolik dat, kolik chtějí, např. spuštěním více skriptů nebo pomocí více vláken současně.
        
        * Můžete jim vysvětlit, že každýERDDAP™, Nyní záleží na tom, jak velký a silný, má konečné zdroje (CPU čas, pevný disk I/O, síťová šířka pásma, atd.) a není fér, pokud jeden uživatel požaduje data způsobem, který vytěsní ostatní uživatele nebo přetíženíERDDAP.
        * Jakmile uživatel ví, jak podat 2 simultánní žádosti, často nevidí žádný důvod, proč nevyužít 5, 10 nebo 20 simultánní žádosti, protože dodatečné žádosti je nic nestojí. Je to jako asymetrická válka: zde mají útočné zbraně obrovskou výhodu (nulové náklady) přes obranné zbraně (konečná instalace se skutečnými náklady) .
        * Upozorňujeme na ně, že dochází ke snížení výnosů k podávání stále více a více simultánních žádostí; dodatečné žádosti jen dále blokují požadavky jiných uživatelů; nevytvářejí pro ně obrovské zlepšení.
        * Připomeň jim, že jsou i jiní uživatelé (jak příležitostní uživatelé, tak i jiní uživatelé běžící skripty) , takže to není fér od nich, aby všechnyERDDAPZdroje.
        * Poukaz na to, že techničtí obři přiměli uživatele, aby od webových služeb očekávali nekonečné zdroje. Zatímco existují způsoby, jak to nastavit[mřížky/klastry/federaceERDDAPán](/docs/server-admin/scaling)k vytvořeníERDDAP™systém s více zdroji, většinaERDDAP™Správci nemají peníze ani lidi, kteří by takové systémy nastavili, a takový systém bude stále konečný. VERDNapříklad, je tu jedna osoba. (Já.) psaníERDDAP™, podávání dvouERDDAPán (s pomocí mého šéfa) , a řízení několika zdrojů dat, vše s ročním hardwarovým rozpočtem ve výši 0 dolarů (spoléháme na příležitostné granty na zaplacení hardwaru) . To není Google, Facebook, Amazon, atd. se 100's inženýrů, a miliony dolarů příjmů recyklovat do stále větších systémů. A nemůžeme jen tak hýbatERDDAP™například Amazon AWS, protože náklady na ukládání dat jsou velké a poplatky za výstup dat jsou velké a variabilní, zatímco náš rozpočet na externí služby je fixní 0 dolarů.
        * Mým požadavkem pro uživatele je: pro non-time-citlivé žádosti (což je zdaleka nejčastější případ) Jejich systém by měl podat jednu žádost najednou. Pokud jsou žádosti časově citlivé (např. více .pngs na webové stránce, více dlaždic proWMSklient atd.) , pak možná 4 simultánní žádosti by měly být max (a jen na krátkou dobu) .
        * Pokud vysvětlíte situaci uživateli, většina uživatelů pochopí a bude ochotna provést nezbytné změny, abyste mohli odstranit jejich IP adresu z černé listiny.
             
    * Pro blacklist uživatele přidejte jejich numerickou IP adresu do čárkového seznamu IP adres v&lt;requestBlacklist&gt; ve vašemdatasets.xmlSložka. Chcete- li najít problémovou IP adresu uživatele, podívejte se doERDDAP™  *velkýRodič rodičů* /logs/log.txt soubor ( *velkýRodič rodičů* je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml)) zjistit, zda tomu tak je, a najít IP adresu uživatele. IP adresa pro každou žádost je uvedena na řádku začínajícím "&#123;&#123;&#123;&#123;#123;#" a je 4 čísla oddělena například obdobími 123.45.67.8 . Hledání "ERROR" vám pomůže najít problémy, jako jsou neplatné žádosti.
    * Můžete také nahradit poslední číslo na IP adrese\\*(například 202.109.200.\\*) blokovat rozsah IP adres, 0-255.
    * Můžete také nahradit poslední 2 čísla v IP adrese\\*.\\*  (například 121.204.\\*.\\*) blokovat širší rozsah IP adres, 0-255.0-255.
    * Například,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Nemusíš restartovat.ERDDAP™pro změny&lt;requestBlacklist&gt; nabýt účinku. Změny budou detekovány příštěERDDAP™kontroluje, zda je třeba znovu načíst některé soubory údajů. Nebo můžete urychlit proces návštěvou[setDataset URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)pro jakýkoli datový soubor.
    * VašeERDDAP™denní zpráva obsahuje seznam/tálně těch nejaktivnějších povolených a blokovaných žadatelů.
    * Pokud chcete zjistit, jaká doména/instituce souvisí s numerickou IP adresou, můžete použít bezplatnou, reverzní DNS webovou službu jako[ https://network-tools.com/ ](https://network-tools.com/).
    * Mohou nastat chvíle, kdy má smysl blokovat určité uživatele na vyšší úrovni, například škodlivé uživatele. Například můžete blokovat jejich přístup ke všemu na vašem serveru, nejenERDDAP. Na Linux, jedna taková metoda je použít[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Například můžete přidat pravidlo, které zablokuje vše přicházející z 198.51.100.0 příkazem
iptables -I INPUT -s 198.51.100.0 -J DROP
       
### &lt;ZpomalilTalloubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;slowDownTroubleMillis&gt; ** ] (# Slowdowntroublemillis) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje celé číslo s uvedením počtu milisekund (výchozí=1000) zastavit při reakci na všechny neúspěšné žádosti, např. neznámý datový soubor, požadavek příliš velký, uživatel na černé listině. např.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Pokud scénář podává jednu žádost okamžitě za druhou, pak by mohl rychle podat jednu špatnou žádost za druhou. S tímto nastavením můžete zpomalit selhávání skriptu, takžeERDDAP™není zaplaven špatnými požadavky. Pokud člověk podá špatnou žádost, ani si nevšimnou tohoto zpoždění. Doporučení:
    
    * Je-li to problém, je to rozptýlené zapírání služby (DDOS) útok 100+ útočníků, nastavte to na menší počet (100?) . Zpomalit je všechny příliš dlouho vede k příliš mnoho aktivním vláknům.
    * Pokud je problém z 1-10 zdrojů, nastavte to na 1000 ms (výchozí) , ale větší číslo (jako 10000) je také rozumný. To je zpomaluje, takže plýtvají méně síťových zdrojů. Také, 1000 ms nebo tak nebude otravovat lidské uživatele, kteří mají špatnou žádost.
    
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
     
### &lt;předplatnéEmailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;předplatné EmailBlacklist&gt; ** ] (#Předplatnémail blacklist) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkterý obsahuje čárku oddělený seznam e-mailových adres, které jsou okamžitě načerno[systém předplatného](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), například
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Tohle je systém necitlivý na případy. Pokud je do tohoto seznamu přidána e-mailová adresa, pokud má tato e-mailová adresa předplatné, předplatné bude zrušeno. Pokud se e-mailová adresa v seznamu pokusí přihlásit, žádost bude zamítnuta. Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
     
### Standardní text{#standard-text} 
*   [ **Standardní text** ](#standard-text)-- Existuje několik VOLITELNÝCH tagů (nejčastěji se používají vzácně) v rámci&lt;erddapDatasets&gt; tag indatasets.xmlzadat text, který se objeví na různých místech vERDDAP. Pokud chcete změnit výchozí text, zkopírujte existující hodnotu ze značky stejného jména v
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml dodatasets.xml, pak upravit obsah. Výhoda mít tyto vdatasets.xmlje, že můžete zadat nové hodnoty kdykoliv, i kdyžERDDAP™Utíká. Jakékoli změny hodnot těchto značek nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). Jména tag popisují svůj účel, ale pro hlubší pochopení viz výchozí obsah zpráv.xml.
    
    *   &lt;standardLicense&gt;
    *   &lt;StandardKontakt&gt;
    *   &lt;standardDataLicenses&gt;
    *   &lt;StandardDisclaimerOfEndorsement&gt;
    *   &lt;StandardDisclaimerOfExternalLinks&gt;
    *   &lt;Norma GeneralDisclaimer&gt;
    *   &lt;standardní PrivacyPolicy&gt;
    *   &lt;startHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; je dobrá značka pro změnu s cílem přizpůsobit vzhled horní části každé webové stránky ve vašemERDDAP. Můžete to použít k přidání dočasné zprávy naERDDAP™domovská stránka (např. "Podívejte se na nový soubor dat JPL MUR SST v4.1 ..." nebo "TotoERDDAP™bude offline pro údržbu 2019-05-08T17:00:00 PDT až 2019-05-08T20:00:00 PDT.") . Jeden vtip dát tuto značku dodatasets.xmlje: při restartuERDDAP, první žádost oERDDAP™vrátí výchozí start BodyHtml5 HTML, ale každý další požadavek bude používat startBodyHtml5 HTML uvedené vdatasets.xml.
    *   &lt;ShortDescription Html&gt; je dobrá značka pro změnu pro přizpůsobení popisuERDDAP. Všimněte si, že můžete snadno změnit toto přidat dočasnou zprávu na domovské stránce (např. "TotoERDDAP™bude offline pro údržbu 2019-05-08T17:00:00 PDT až 2019-05-08T20:00:00 PDT.") .
    *   &lt;EndBodyHtml5&gt;
    
      
PředERDDAP™v2.00, tyto byly specifikovány v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;neobvyklé Aktivita&gt;{#unusualactivity} 
* [ ** &lt;neobvykláaktivita&gt; ** ] (#neobvyklá aktivita) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlk určení maximálního počtu žádostí mezi dvěma řadami souborů LoadDatasets, které jsou považovány za normální (výchozí hodnota=10000) . Pokud je toto číslo překročeno, e-mail je odeslán na e-mailEverythingTo (jak je uvedeno v setup.xml) . např.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag). PředERDDAP™v2.00, to bylo uvedeno v nastavení.xml, který je stále povoleno, ale odrazen.
     
### &lt;Aktualizace MaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;updateMaxEvents&gt; ** ] (#updatemaxevents) je vzácně používaná VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlzadat maximální počet událostí změny souboru (výchozí=10) který bude řešen [&lt;updateEveryNMillis&gt;] (#update everynmillis) systém před přepnutím na opětovné načtení datového souboru. Například,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
UpdateEveryNMillis system má běžet velmi rychle těsně před zpracováním požadavku uživatele. Pokud existuje mnoho událostí změny souboru, pak pravděpodobně nemůže běžet rychle, takže místo toho volá po opětovném načtení souboru. JestližeERDDAP™se zabývá soubory dat, které musí být aktualizovány, i když dochází ke změnám velkého počtu datových souborů, můžete to nastavit na větší číslo (100?) .

### &lt;uživatel&gt;{#user} 
* [ ** &lt;uživatel &gt; ** ] (# user) je VOLITELNÁ tag v rámci&lt;erddapDatasets&gt; tag indatasets.xmlkteré identifikuje uživatelské jméno uživatele, heslo (pokud autentizace=custom) , a role (seznam oddělených čárek) . Použití uživatelského jména a hesla se mírně liší podle hodnoty [&lt;autentizace&gt;] (/docs/server-admin/dodatečné informace#authentication) ve VašemERDDAP's nastavit.xml soubor.
    * Tohle je částERDDAP's[bezpečnostní systém](/docs/server-admin/additional-information#security)za omezení přístupu k některým datům pro některé uživatele.
    * Oddělit&lt;user &gt; tag pro každého uživatele. Volitelně, pokud autentizace=oauth2, můžete nastavit dvě&lt;uživatel &gt; značky pro každého uživatele: jeden pro případ, kdy se uživatel přihlásí přes Google, jeden pro kdy uživatel přihlásí přes Orcid, pravděpodobně se stejnými rolemi.
    * Pokud není&lt;user&gt; tag pro klienta, bude mít přístup pouze k veřejným souborům dat, tj. souborům, které nemají [&lt;accessTo&gt;] (#přístupný) Tagu.
    * uživatelské jméno
Pro autentizaci=zákaz je uživatelské jméno obvykle kombinací písmen, číslic, podtrhuje a period.
Pro autentizaci=email je uživatelské jméno e-mailovou adresou uživatele. Může to být jakákoli e-mailová adresa.
Pro autentizaci=google je uživatelské jméno plnou adresou uživatele Google. To zahrnuje účty vedené společností Google, jako je@noaa.govúčty.
Pro autentizaci=orcid je uživatelské jméno číslo účtu uživatele Orcid (s pomlčkami) .
Pro autentizaci=oauth2 je uživatelské jméno úplná e-mailová adresa uživatele Google nebo číslo účtu uživatele Orcid (s pomlčkami) .
    * heslo
Pro autentizaci=email, google, orcid, nebo oauth2, nespecifikujte atribut hesla.
Pro autentizaci=custom musíte pro každého uživatele zadat atribut hesla.
        * Hesla, která uživatelé zadávají, jsou případově citlivá a musí mít 8 nebo více znaků, takže je těžší je rozlousknout. V současné době lze i 8 znaků rychle a levně rozluštit hrubou silou pomocí clusteru počítačů na AWS.ERDDAP™Vymáhá minimálně 8 znaků, pouze když se uživatel pokusí přihlásit (ne když&lt;user &gt; tag je zpracováván, protože tento kód vidí pouze hash dist hesla, ne prostý text heslo).
        * setup.xml&lt;Heslo Kódování&gt; určuje, jak jsou hesla uložena v&lt;uživatel &gt; značky vdatasets.xml. V zájmu zvýšení bezpečnosti jsou tyto možnosti:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Nepoužívej to&#33;) -- pro atribut hesla zadejte hash dist uživatele.
            * UEPMD5 (Nepoužívej to&#33;) -- pro atribut hesla zadejte MD5 hash dist *uživatelské jméno* :ERDDAP: *heslo* . Uživatelské jméno a "ERDDAP"jsou zvyklí[sůl](https://en.wikipedia.org/wiki/Salt_(cryptography)) hodnotu hašiše, takže je obtížnější dekódovat.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (nedoporučuje se) -- pro atribut hesla zadejte SHA-256 hash dist uživatelského hesla.
            * UEPSHA256 (výchozí, doporučené heslo Kódování. Ale mnohem lepší: použijte Google, orchideje, nebo Oauth2 možnosti ověřování.) -- pro atribut hesla zadejte SHA-256 hash dist *uživatelské jméno* :ERDDAP: *heslo* . Uživatelské jméno a "ERDDAP" se používají k osolení hašišové hodnoty, takže je obtížnější dekódovat.
        * Na Windows můžete generovat hodnoty MD5 Heslo dist pomocí stahování programu MD5 (např.[MD5](https://www.fourmilab.ch/md5/)) a použití (například) :
md5 -djsmith:ERDDAP: *aktuálníHeslo* 
        * Na Linux/Unix můžete generovat hodnoty MD5 dist pomocí vestavěného md5sum programu (například) :
echo-n "Jsmith:ERDDAP: *aktuálníHeslo* "|md5sum
        * Uložený prostý text hesla jsou případově citlivé. Uložené formy hesel MD5 a UEPMD5 nejsou případově citlivé.
        * Například (pomocí UEPMD5) , pokud uživatelské jméno="jsmith" a heslo="myPassword"&lt;user &gt; tag je:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
kde bylo uložené heslo generováno s
md5 -djsmith:ERDDAP:myPassword
        * role jsou čárkou oddělený seznam rolí, pro které je uživatel oprávněn. Jakýkoli&lt;Soubor údajů &gt; může mít [&lt;accessTo&gt;] (#přístupný) tag, který obsahuje seznam rolí, ke kterým lze přistupovat. U daného uživatele a daného datového souboru, pokud jedna z rolí v seznamu úloh uživatele odpovídá jedné z rolí uvedených v seznamu datového souboru&lt;accessableTo&gt; role, pak je uživatel oprávněn k přístupu k tomuto datovému souboru.
            
Každý uživatel, který se přihlásí, je automaticky uveden v roli\\[Kdokoliv Přidán In\\], zda existuje&lt;tag pro uživatele _BAR_datasets.xmlnebo ne. Takže pokud má daný datový soubor
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
pak každý uživatel, který je přihlášen, bude oprávněn k přístupu k tomuto souboru dat, i když neexistuje&lt;tag pro uživatele _BAR_datasets.xml.
            
    * Jakékoli změny hodnoty této značky nabudou účinku příštěERDDAP™čtedatasets.xml, včetně odpovědi na soubor údajů[vlajka](/docs/server-admin/additional-information#flag).
         
### &lt;CestaRegex&gt;{#pathregex} 
* [ ** &lt;pathRegex&gt; ** ] (#pathragex) umožňuje zadat regulární výraz, který omezuje cestu (které podadresáře) budou zahrnuty do souboru údajů. Výchozí je .\\*, která odpovídá všem cestám. To je vzácně používané, vzácně potřebné, VOLITELNÁ tag proEDDGridDatabáze souborů FromFiles, datové soubory EDDTableFromFoles a několik dalších typů souborů dat. Nicméně, když to potřebuješ, opravdu to potřebuješ.
    
Aby to fungovalo, musíš být opravdu dobrý s pravidelnými výrazy. Vidíš tohle?[dokumentace regexu](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)a[reflexní tutoriál](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). Zejména potřebujete vědět o zachycovacích skupinách (něco uvnitř závorky) , a "nebo" symbol "|".
Společně vám umožní určit libovolný počet možností, např. (možnost1|možnost2|možnost3) .
Taky žádná z možností nemůže být nic, např., (|možnost2|možnost3) .
Také je třeba vědět, že zachycovací skupiny mohou být vnořeny do hnízda, tj. každá možnost v zachycovací skupině může obsahovat další skupinu, např. (|možnost2 (|možnost2 b|option2c) |možnost3) což říká, že možnost 2 nemůže být následována ničím, nebo option2b, nebo option2c.
Pro cestuRegexes bude každá volba jedním jménem složky následovaným /, např., bar/ .
    
Obtížná část cestyRegex je:ERDDAP™Rekurzivně sestupuje strom adresáře, cestaRegex musí přijmout všechny cesty, se kterými se setká na své cestě do adresářů s daty. Regex je s hnízděnými zajatci je dobrý způsob, jak se s tím vypořádat.
    
Příklad:
Předpokládejme, že máme následující strukturu adresáře:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
a zadaný souborAdresář je /foo/bar/, a chceme jen.ncsoubory v D\\[0-9\\]&#123;4&#125;/ a/ subdirectories.
Řešením je nastavit cestuRegex na /foo/bar/ (|D\\[0-9\\]&#123;4&#125;/ (|a/) )   
To znamená:
Cesta musí začít s /foo/bar/
To může následovat nic nebo D\\[0-9\\]&#123;4&#125;/
To může následovat nic nebo a/
    
Ano, cesta Regex se dá neuvěřitelně těžko formulovat. Pokud se zaseknete, zeptejte se počítačového programátora (Nejbližší věc ve skutečném světě kouzelnickému zaříkávání?) nebo poslat Chrisovi e-mail. John v Noaa.gov.
    
### &lt;Databáze&gt;{#dataset} 
* [ ** &lt;Databáze &gt; ** ] (#Dataset) VOLITELNĚ (ale vždy použité) označení uvnitř&lt;erddapDatasets&gt; tag indatasets.xmlže (pokud zahrnete všechny informace mezi&lt;Soubor údajů &gt; a&lt;/dataset&gt;) zcela popisuje jeden datový soubor. Například,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
MŮŽE být nějaký počet značek datového souboru ve vašemdatasets.xmlSložka.
V rámci&lt;Soubor údajů &gt; značka:
     
    *    **type=" *a Typ* "** je požadovaný atribut v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlkterý identifikuje typ datového souboru (např.EDDGrid/gridd nebo EDDTable/tabulární soubor dat) a zdroj údajů (například databáze, soubory nebo vzdálenáOPeNDAPserver) . Viz[ **Seznam typů datových souborů** ](#list-of-types-datasets).
         
#### Soubor údajů Id{#datasetid} 
*   [ **datasetID=" *aDatasetID* "** ](#datasetid)je požadovaný atribut v rámci&lt;Databáze &gt; značka, která přiřazuje krátký (obvykle&lt;15 znaků), jedinečné, identifikační jméno datového souboru.
    * ThedatasetIDMusí to být písmeno. (A-Z, a-z) následované libovolným počtem A-Z, A-Z, 0-9 a \\_ (ale nejlepší pokud&lt;Celkem 32 znaků).
    * Soubor dat ID jsou citlivé na případ, ale nevytvářejte dvadatasetIDs, které se liší pouze v horních/ dolních písmenech. To způsobí problémy na Windows počítačích (Váš a/nebo uživatelský počítač) .
    * Osvědčené postupy: Doporučujeme použít[velbloud Případ](https://en.wikipedia.org/wiki/CamelCase).
    * Osvědčené postupy: Doporučujeme, aby první část byla zkratkou nebo zkratkou jména zdrojové instituce a druhá část zkratkou jména datového souboru. Pokud je to možné, vytvoříme název, který odráží název zdroje pro datový soubor. Například jsme použilidatasetID="erdPHssta8day" pro soubor údajů zNOAA NMFS SWFSCOddělení environmentálního výzkumu (ERD) který je určen zdrojem jako satelit/PH/sst8 dní.
    * Pokud změníte název datového souboru, starý datový soubor (se starým jménem) budou stále žít vERDDAP. To je "orfan" soubor, protože specifikace pro něj vdatasets.xmlje pryč. To musí být řešeno:
        1. ProERDDAP™V2.19 a později nemusíš dělat nic.ERDDAP™automaticky odstraní tyto sirotčí soubory.
        2. ProERDDAP™V2.18 a dříve musíte udělat něco pro odstranění osiřelých souborů: Vytvořit datový soubor aktivní="false," např.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Po dalším velkém zatížení datové soubory, Tuto značku můžete odstranit poté, co je starý datový soubor neaktivní.
                 
#### aktivní{#active} 
*   [ **active=" *boolean* "** ](#active)je VOLITELNÝ atribut v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlkterý označuje, zda je soubor údajů aktivní (způsobilé pro použití vERDDAP) nebo ne.
    * Platné hodnoty jsou pravdivé (výchozí) a falešné.
    * Vzhledem k tomu, že výchozí hodnota je pravdivá, nemusíte používat tento atribut, dokud nechcete dočasně nebo trvale odstranit tento soubor zERDDAP.
    * Pokud jen odstraníte soubor Active="true" zdatasets.xml, soubor údajů bude stále aktivní vERDDAP™ale nikdy nebude aktualizován. Takový datový soubor bude "orfan" a bude jako takový uveden ve statutu. html webová stránka přímo pod seznamem souborů, které se nepodařilo načíst.
    * Pokud nastavíte aktivní="false,"ERDDAP™bude deaktivovat soubor údajů, když se příště pokusí aktualizovat soubor údajů. Když to uděláš,ERDDAP™nevyhazuje žádné informace, které by mohly být uloženy o datovém souboru a rozhodně nedělá nic s aktuálními údaji.
    * Za účelem odstranění datového souboruERDDAP™, viz[Vynutit odstranění dat](/docs/server-admin/additional-information#removing-datasets).
         

 ** Několik značek se může objevit mezi&lt;Soubor údajů &gt; a&lt;/dataset&gt; značky. **   
Existuje určitá odchylka, ve které značky jsou povoleny, které typy souborů dat. Viz dokumentace pro konkrétní[typ datového souboru](#list-of-types-datasets)pro detaily.

#### &lt;přístupný Na...{#accessibleto} 
* [ ** &lt;přístupný To&gt; ** ] (#přístupný) je VOLITELNÁ tag v rámci&lt;tag datového souboru &gt;, který určuje čárkový seznam[role](#user)které mají přístup k tomuto souboru údajů. Například,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Tohle je částERDDAP's[bezpečnostní systém](/docs/server-admin/additional-information#security)za omezení přístupu k některým datům pro některé uživatele.
    * Pokud tato značka není přítomna, všichni uživatelé (i když se nepřihlásili) bude mít přístup k tomuto datovému souboru.
    * Pokud je tato značka přítomna, bude tento soubor viditelný a přístupný pouze pro přihlášené uživatele, kteří mají jednu z uvedených rolí. Tento soubor nebude viditelný pro uživatele, kteří nejsou přihlášeni.
    * Každý uživatel, který se přihlásí, je automaticky uveden v roli\\[Kdokoliv Přidán In\\], zda existuje&lt;tag pro uživatele _BAR_datasets.xmlnebo ne. Takže pokud má daný datový soubor
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
pak každý uživatel, který je přihlášen, bude oprávněn k přístupu k tomuto souboru dat, i když neexistuje&lt;tag pro uživatele _BAR_datasets.xml.
         
#### &lt;grafyPřístupnépro&gt;{#graphsaccessibleto} 
* [ ** &lt;grafyPřístupnéTo&gt; ** ] (#grafsaccessibleto) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlkterá určuje, zda jsou grafika a metadata pro datový soubor k dispozici veřejnosti. Nabízí způsob, jak částečně přepsat datový soubor [&lt;accessTo&gt;] (#přístupný) Nastavení. Přípustné hodnoty jsou:
    * auto -- Tato hodnota (nebo absence&lt;grafyPříslušnéTo&gt; tag pro datový soubor) umožňuje přístup k grafům a metadatům z datového souboru napodobovat soubor dat&lt;accessableTo&gt; nastavení.
Takže pokud je datový soubor soukromý, jeho grafy a metadata budou soukromé.
A pokud je datový soubor veřejný, jeho grafy a metadata budou veřejné.
    * veřejný -- Toto nastavení umožňuje přístup k grafům a metadatům datového souboru komukoli, dokonce i uživatelům, kteří nejsou přihlášeni, i když je soubor dat jinak soukromý, protože má&lt;accessedTo&gt; tag.
         
#### &lt;přístupný ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;accessibleViaFiles &gt; ** ] (#Accessibleviafiles) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlmísto[EDDGridAgregátExistujícíRozměr](#eddgridaggregateexistingdimension),[EDDGridKopírovat](#eddgridcopy),[EDDGridOdEDDTable](#eddgridfromeddtable),[EDDGridFromErddap](#eddfromerddap),[EDDGridOdEtopa](#eddgridfrometopo),[EDDGridFromFiles](#eddgridfromfiles)  (včetně všech podtříd) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDtableCopy](#eddtablecopy) [EDDTableFromErddap](#eddfromerddap),[EDDTableFromEDDGrid](#eddtablefromeddgrid)a[EDDTableFromFoles](#eddtablefromfiles)  (včetně všech podtříd) Data. Může mít hodnotu pravdy nebo lži. Například,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Pokud je hodnota pravdivá,ERDDAP™bude to tak, aby uživatelé mohli procházet a stahovat zdrojové soubory datového souboru prostřednictvímERDDAP's["files"systém](https://coastwatch.pfeg.noaa.gov/erddap/files/). Viz"files"systém[Dokumentace](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)pro více informací.
    
Výchozí hodnota&lt;accessibleViaFiles &gt; pochází z&lt;defaultAccessibleViaFiles&gt; v[setup.xml](/docs/server-admin/deploy-install#setupxml). Má výchozí hodnotu false, ale doporučujeme přidat tento tag do nastavení.xml s hodnotou true.
    
Doporučení -- Doporučujeme zpřístupnit všechny příslušné soubory prostřednictvím systému souborů nastavením&lt;defaultAccessibleViaFiles&gt; to true in setup.xml, protože existuje skupina uživatelů, pro které je to preferovaný způsob, jak získat data. Kromě jiných důvodů"files"systém usnadňuje uživatelům sledovat, které soubory jsou k dispozici a kdy se naposledy změnily, a tak umožňuje uživateli udržovat si vlastní kopii celého datového souboru. Pokud obecně nechcete zpřístupnit soubory prostřednictvím systému souborů, nastavit&lt;defaultAccessibleViaFiles &gt; to false. V obou případech stačí použít&lt;přístupnéViaFiles&gt; pro několik souborů údajů, které jsou výjimkami z obecné politiky stanovené&lt;defaultAccessibleViaFiles&gt; (například při použití datového souboru[.ncml](#ncml-files)soubory, které nejsou opravdu užitečné pro uživatele) .
     
#### &lt;přístupný ViaWMS&gt;{#accessibleviawms} 
* [ ** &lt;přístupný ViaWMS&gt; ** ] (#Accessibleviawms) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlpro všechny[EDDGrid](#eddgrid)podtřídy. Může mít hodnotu pravdy. (výchozí) nebo falešně. Například,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Pokud je hodnota falešná,ERDDAP'sWMSserver nebude pro tento soubor k dispozici. To se běžně používá pro soubory údajů, které mají některé hodnoty délky větší než 180 (který je technicky neplatnýWMSSlužby) , a pro které nabízíte také variantu datového souboru s hodnotami délky zcela v rozmezí -180 až 180 přes[EDDGridLonPM180](#eddgridlonpm180).
Pokud je hodnota pravdivá,ERDDAP™se pokusí zpřístupnit datový soubor prostřednictvímERDDAP'sWMSserver. Ale pokud je datový soubor zcela nevhodný proWMS  (Například neexistují údaje o délce nebo šířce) , pak soubor nebude k dispozici prostřednictvímERDDAP'sWMSserver, bez ohledu na toto nastavení.
     
#### &lt;přidat Proměnné Kde?{#addvariableswhere} 
* [&lt;addVariablesKde &gt;] (#Addvariableswhere) je VOLITELNÝ tag uvnitř&lt;Soubor údajů &gt; tag pro všechny soubory údajů z databáze EDDTable.
    
Žádosti o libovolný datový soubor podle protokolu EDDTable mohou zahrnovat &add Proměnné kde (" *atribut Název* "," *atribut Hodnota* ") , který říkáERDDAP™přidat všechny proměnné do datového souboru, kde *atributName=attributeValue* na seznam požadovaných proměnných. Například pokud uživatel přidá &add Proměnné kde ("ioos\\_category""Vítr") na dotaz,ERDDAPpřidá všechny proměnné v datovém souboru, které majíioos\\_category=Wind atribut seznamu požadovaných proměnných (například windSpeed, windDirection, windGustSpeed) . *atribut Název* a *atribut Hodnota* jsou citlivé na případy.
    
Indatasets.xml, pokud část datového souboru.xml pro datový soubor má
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
například:
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
formulář pro přístup k údajům (.html webová stránka) pro soubor bude obsahovat widget (pro každý atributJméno v čárce odděleném seznamu) přímo pod seznamem proměnných, které umožňují uživatelům určit hodnotu atributu. Pokud uživatel zvolí hodnotu atributu pro jeden nebo více jmen atributů, budou k žádosti přidány prostřednictvím &add Proměnné kde (" *atribut Název* "," *atribut Hodnota* ") . Proto tento štítekdatasets.xmlumožňuje zadat seznam jmen atributů, které se zobrazí ve formuláři pro přístup k datům pro tento datový soubor, a umožňuje uživatelům přidat &addVariables Kde funkce na žádost. The *atributNázevsCSV* Seznam je citlivý na případy.
    
#### &lt;nadmořská výškaMeteřiPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;nadmořské výškyMatersPerSourceUnit&gt; ** ] (#Altitudemetrypersourceunit) je VOLITELNÝ tag uvnitř&lt;Databáze &gt; značka v souborech dat. xxml pro EDDTableFromSOSSoubory údajů (Jen&#33;) která udává číslo, které se vynásobí výchozí nadmořskou výškou nebo hodnotami hloubky pro jejich přeměnu na hodnoty výšky (v metrech nad hladinou moře) . Například,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Tato značka MUSÍ být použita, pokud hodnoty vertikální osy datového souboru nejsou metry, pozitivní=up. Jinak je to VOLITELNÉ, protože výchozí hodnota je 1. Například,
    * Pokud je zdroj již měřen v metrech nad hladinou moře, použijte 1 (nebo nepoužívejte tuto značku, protože 1 je výchozí hodnota) .
    * Pokud se zdroj měří v metrech pod hladinou moře, použijte -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Pokud se zdroj měří v km nad mořem, použijte 0.001.
         
#### &lt;defaultDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;defaultDataQuery&gt; ** ] (#defaultdataquery) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlTo říkáERDDAP™použít zadaný dotaz (část URL za "?") pokud je soubor .html Typ (formulář pro přístup k údajům) je požadováno bez dotazu.
    * Tohle budete pravděpodobně potřebovat jen zřídka.
    * Potřebujete XML kód (ne procentní kód) výchozí dotazy, protože jsou v XML dokumentu. Například se stane &amp; ,&lt;se stane&lt;, &gt; se stává &gt; .
    * Prosím, zkontrolujte si práci. Je snadné udělat chybu a nedostat to, co chcete.ERDDAP™Pokusí se očistit vaše chyby -- ale nespoléhejte se na to, protože\\*Jak\\*se může změnit.
    * Pro soubory dat o souřadnicích je společným použitím tato hodnota určena pro jinou hodnotu výchozí hloubky nebo nadmořské výšky. (například:\\[0\\]místo\\[poslední\\]) .
V každém případě byste měli vždy uvést všechny proměnné, vždy použít stejné hodnoty rozměrů pro všechny proměnné a téměř vždy použít\\[0\\],\\[poslední\\]nebo\\[0: poslední\\]pro hodnoty rozměrů.
Například:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * ProtabledapDatabáze, pokud neurčíte žádné omezení, žádost vrátí celý soubor údajů, který může být neprakticky velký, v závislosti na datovém souboru. Pokud nechcete určit žádná omezení, spíše než mít prázdný&lt;defaultDataQuery&gt; (což je stejné jako nespecifikovat selhání DataQuery) , musíte explicitně vyjmenovat všechny proměnné, které chcete zahrnout do defaultDataQuery.
    * ProtabledapNejběžnějším použitím těchto údajů je určit jiný výchozí časový rozsah (vzhledem k max. (čas) Například &time &gt;=max (čas) -1day, nebo vzhledem k teď, například, &time &gt;=now-1 den) .
Nezapomeňte, že požadavek na žádné datové proměnné je stejný jako určení všech datových proměnných, takže obvykle můžete jen zadat nové časové omezení.
Například:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
nebo
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery&gt; ** ] (#defaultgraphquery) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlTo říkáERDDAP™použít zadaný dotaz (část URL za "?") pokud soubor .graph Typ (zformovat graf) je požadováno bez dotazu.
    * Tohle budete pravděpodobně potřebovat jen zřídka.
    * Potřebujete XML kód (ne procentní kód) výchozí dotazy, protože jsou v XML dokumentu. Například se stane &amp; ,&lt;se stane&lt;, &gt; se stává &gt; .
    * Prosím, zkontrolujte si práci. Je snadné udělat chybu a nedostat to, co chcete.ERDDAP™Pokusí se očistit vaše chyby -- ale nespoléhejte se na to, protože\\*Jak\\*se může změnit.
    * U datových souborů mřížky je nejčastějším použitím těchto údajů určit jinou hodnotu výchozí hloubky nebo rozměr výšky. (například:\\[0\\]místo\\[poslední\\]) a/nebo upřesnit, že konkrétní proměnná je grafizována.
V každém případě budete téměř vždy používat\\[0\\],\\[poslední\\]nebo\\[0: poslední\\]pro hodnoty rozměrů.
Například:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (ale dát to všechno na jeden řádek) 
    * ProtabledapDatabázové soubory, pokud neurčíte žádné omezení, bude požadavek grafizovat celý datový soubor, který může trvat dlouho, v závislosti na datovém souboru.
    * ProtabledapNejběžnějším použitím těchto údajů je určit jiný výchozí časový rozsah (vzhledem k max. (čas) Například &time &gt;=max (čas) -1day, nebo vzhledem k teď, například, &time &gt;=now-1 den) .
Nezapomeňte, že požadavek na žádné datové proměnné je stejný jako určení všech datových proměnných, takže obvykle můžete jen zadat nové časové omezení.
Například:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
nebo
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;DimensionValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;rozměr HodnotyInMemory&gt; ** ] (# Dimensionvalueinmemory)   (pravda (výchozí) nebo falešné) je VOLITELNÝ a vzácně používaný štítek uvnitř&lt;Databáze &gt; značka pro všechnyEDDGridSoubor údajů, který uvádíERDDAP™kde zachovat výchozí hodnoty rozměrů (také známý jakoaxisVariableán) :
    
    * true = v paměti (který je rychlejší, ale používá více paměti) 
    * false = na disku (který je pomalejší, ale nepoužívá žádnou paměť) 
    
Například,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Měli byste to použít pouze s nevýchozí hodnotou false, pokudERDDAP™má mnoho souborů s velmi velkými rozměry (Například miliony hodnot, např. vEDDGridDatabáze souborů FromAudioFiles) aERDDAP's In Use použití paměti je vždy příliš vysoká. Viz paměť: momentálně používá řádek na\\[Vaše Doména\\]/erddap/status.htmlsledovatERDDAP™používání paměti.
     
#### &lt;souborTableInMemory&gt;{#filetableinmemory} 
* [ ** &lt;souborTableInMemory&gt; ** ] (# filetableinmemory)   (Pravda nebo lež (výchozí) ) je VOLITELNÝ tag uvnitř&lt;Databáze &gt; značka pro všechnyEDDGridFromFiles a EDDTable Databáze FromFiles, která říkáERDDAP™kde uchovávat souborTable (který má informace o každém zdrojovém datovém souboru) :
    
    * true = v paměti (který je rychlejší, ale používá více paměti) 
    * false = na disku (který je pomalejší, ale nepoužívá žádnou paměť) 
    
Například,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Pokud to nastavíte na true pro jakýkoli datový soubor, dávejte pozor na paměť: v současné době používá řádek na\\[Vaše Doména\\]/erddap/status.htmlzajistit, abyERDDAP™Pořád má spoustu volné paměti.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;fgdcFile &gt; ** ] (#fgdcfile) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlTo říkáERDDAP™použít předvyrobený soubor FGDC namístoERDDAP™pokuste se vytvořit soubor. Použití:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *plný Název souboru* může odkazovat na místní soubor (Někde na serverovém souborovém systému) nebo URL vzdáleného souboru.
Pokud *plný Název souboru* \\="" nebo soubor není nalezen, soubor nebude mít žádná metadata FGDC. To je také užitečné, pokud chcete potlačit metadata FGDC pro konkrétní datový soubor.
Nebo můžete dát&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; in setup.xml to tellERDDAP™nenabízíme FGDC metadata pro jakýkoli datový soubor.
     
#### &lt;iso19115 Soubor&gt;{#iso19115file} 
* [ ** &lt;iso19115File&gt; ** ] (#iso19115file) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlTo říkáERDDAP™použít předvyrobený soubor ISO 19115 namístoERDDAP™pokuste se vytvořit soubor. Použití:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *plný Název souboru* může odkazovat na místní soubor (Někde na serverovém souborovém systému) nebo URL vzdáleného souboru.
Pokud *plný Název souboru* \\="" nebo soubor není nalezen, soubor nebude mít žádné ISO 19115 metadata. To je také užitečné, pokud chcete potlačit ISO 19115 metadata pro konkrétní datový soubor.
Nebo můžete dát&lt;iso19115Active&gt;false&lt;/iso19115Active&gt; in setup.xml to tellERDDAP™nenabízíme ISO 19115 metadata pro jakýkoli datový soubor.
     
#### &lt;matchAxis NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;zápasAxisNDigits&gt; ** ] (#matchaxisndigraphics) je VOLITELNÁ tag v rámciEDDGrid &lt;Soubor údajů &gt; značka proEDDGriddatové soubory, které jsou agregace, např. agregace souborů. Pokaždé, když je soubor dat znovu načten,ERDDAP™kontroluje, zda hodnoty os každé složky agregace jsou stejné. Přesnost zkoušky určuje[zápasAxisNDigits](#matchaxisndigits), který určuje celkový počet číslic, které musí odpovídat při zkoušení hodnot dvojité přesné osy, 0 - 18 (výchozí) . Při testování hodnot float os se zkouška provádí se zápasemAxisNDigits/2. Hodnota 18 nebo vyšší říkáEDDGridudělat přesný test. Hodnota 0 říkáEDDGridnesmí provádět žádné zkoušky, které se nedoporučuje, s výjimkou níže popsaných.
    
I kdyžEDDGridumožňuje, aby součásti agregace měly mírně odlišné hodnoty os, uživateli je zobrazena pouze jedna sada hodnot os. Sada je ze stejné složky, která poskytuje zdrojová metadata datového souboru. Například:EDDGridDatabáze FromFiles, která je specifikována&lt;metadataod &gt; nastavení (default=last) .
    
Použití matchAxisNDigits\\=0 je ve většině případů silně deprimován, protože vypne všechny kontroly. I minimální kontrola je užitečná, protože zajišťuje, že komponenty jsou vhodné pro agregaci. Všichni předpokládáme, že všechny komponenty jsou vhodné, ale není tomu tak vždy. Jedná se tedy o důležitý test duševního zdraví. Dokonce i hodnoty zápasuAxisNDigits1, 2, 3 nebo 4 jsou odrazeny, protože různé hodnoty osy často naznačují, že komponenty byly vytvořeny (Vyhozený?) jiným způsobem a nejsou proto vhodné pro agregace.
    
Existuje jeden případ, kdy je použití matchAxisNDigits\\=0 užitečné a doporučené: s agregacemi vzdálených souborů, např. dat v kbelících S3. V tomto případě, pokud datový soubor používá cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, aEDDGridSystém FromFiles pro[Agregace prostřednictvím Název souboru](#aggregation-via-file-names-or-global-metadata), pakEDDGridnemusí číst všechny vzdálené soubory, aby udělal agregace. To umožňuje velmi rychle načíst soubory z dat v kbelících S3 (na rozdíl od absurdně pomalu, pokudEDDGridmusí stáhnout a přečíst všechny soubory) .
    
#### &lt;NThreads&gt;{#nthreads} 
* Začneme sERDDAP™verze 2.00, pokud je podtřída EDDTableFromFoles neboEDDGridčte data ze svého zdroje, dokáže číst jeden kus dat (např. jeden zdrojový soubor) v čase (v jednom vlákně)   (To je výchozí hodnota.) nebo více než jeden kus dat (např. 2+ zdrojové soubory) v čase (do 2 nebo více nití) při zpracování každé žádosti.
     
    * Pravidlo palce:
Pro většinu souborů souborů na většině systémů použijte nThreads=1, výchozí. Pokud máte výkonný počítač (spousta CPU jader, spousta paměti) , pak zvážit nastavení nThreards na 2, 3, 4, nebo vyšší (ale nikdy více než počet CPU jader v počítači) pro soubory údajů, které by mohly mít prospěch:
        
        * Většina EDDTableFromFoles bude přínosem.
        * Datasety, kde něco způsobí zpoždění před tím, než může být část dat skutečně zpracována, budou přínosem například:
            * Datové soubory s[vnější komprimované (např..gz) ](#externally-compressed-files)binární (např..nc) Soubory, protožeERDDAP™musí dekompresovat celý soubor, než začne číst soubor.
            * Datové soubory, které používají[cacheSizeGB](#cachefromurl), protožeERDDAP™často musí soubor stáhnout, než ho bude moci přečíst.
            * Datasety s datovými soubory uloženými v paralelním systému s vysokou šířkou pásma, protože může na požádání dodat více dat, rychleji. Příklady paralelních souborových systémů zahrnují[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[pNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster), Amazon S3, a Google Cloud Storage.
                 
        
Varování: Při použití nThreads &gt; 1, dávejte pozorERDDAP's použitím paměti, použitím nití a celkovou citlivostí (viz[ERDDAP's status page](/docs/server-admin/additional-information#status-page)) . Viz připomínky k těmto otázkám níže.
         
    * Pro daný datový soubor může toto nastavení nThreads pocházet z různých míst:
        
        * Pokuddatasets.xmlčást pro datový soubor má&lt;nThreads&gt; značka (v rámci&lt;Soubory údajů &gt; tag, nikoli jako globální atribut) s hodnotou &gt; 1, že hodnota nThreads se používá. Pro každý soubor můžete zadat jiné číslo.
        * Jinak, pokuddatasets.xmlmá&lt;nTableThreads&gt; tag (pro EDDTable Databáze souborů) nebo&lt;nGridThrads&gt; tag (místoEDDGridSoubory údajů) v hodnotě &gt; 30 € za 100 kg čisté hmotnosti 1, mimo&lt;Soubor &gt; značka, že hodnota nThreads se používá.
        * Jinak se použije 1 vlákno, což je bezpečná volba, protože používá nejmenší množství paměti.
             
        
Pro[originálERDDAP™instalace](https://coastwatch.pfeg.noaa.gov/erddap/index.html), používáme
        &lt;nTableThreads&gt; 6&lt;/nTableThrads &gt; (Je to silný server.) Obtížné žádosti nyní vyžadují 30% z předchozího času.
         
##### Sledování využívání zdrojů{#monitor-resource-usage} 
Když experimentujete s různými nastaveními nThreads (a možná obtížné žádosti o vzorek na vašeERDDAP) , můžete sledovat využívání zdrojů počítače:
* Na Macs použít vyhledávač: Aplikace: Nástroje : Monitor aktivity
* Na Linuxu použijte horní část
* Na Windows 10 použijte *Ctrl + Shift + Esc* otevřít správce úloh
             
##### Varování: snížená odezva{#warning-decreased-responsiveness} 
V izolaci,ERDDAP™splní požadavek na soubor dat s vyšším nastavením nThreads rychleji, než když nThreads=1. Ale zatímco se tato žádost zpracovává, další požadavky od jiných uživatelů budou poněkud vytěsněny a dostanou pomalejší odpověď. Také, kdyžERDDAP™reaguje na danou žádost, jiné výpočetní zdroje (např. přístup na disk, síťová šířka pásma) může být omezující, zejména s vyšší nastavení nThreads. Proto s vyššími nastaveními nThreads, celková systémová citlivost bude horší, když se zpracovává více žádostí - to může být velmi nepříjemné pro uživatele&#33; Kvůli tomu: nikdy nenastavte nThreads na více než počet CPU jader v počítači. nThreads=1 je nejspravedlivější nastavení od každé žádosti (mezi několika současnými žádostmi) dostane stejný podíl na výpočetních zdrojích. Ale čím silnější počítač, tím méně to bude problém.
         
##### Varování: Vyšší paměť Použití proEDDGridDatové soubory{#warning-higher-memory-use-for-eddgrid-datasets} 
Použití paměti při zpracování požadavků je přímo úměrné nastavení nThreads. Dostatečně bezpečné pravidlo palce je: musíte nastavit[ERDDAP's nastavením paměti](/docs/server-admin/deploy-install#memory)alespoň 2GB + (2GB \\* nThreads) . Některé požadavky na některé datové soubory budou potřebovat více paměti. Například nastavení nThreads=3 pro všechnyEDDGridSoubor dat znamená, že nastavení -Xmx by mělo být alespoň -Xmx8000M. Pokud je nastavení paměti větší než 3/4 fyzickou paměť počítače, zmenšte nastavení nThreards tak, abyste mohli snížit nastavení paměti.

Použití paměti žádostí o zpracování vláken na soubory EDDTable je téměř vždy nižší, protože soubory jsou obvykle mnohem menší. Nicméně, pokud má daný soubor údajů EDDTable obrovský (Ostatní, j. n.) datové soubory, dále výše uvedené poznámky se vztahují i na tyto soubory údajů.

Ať už je nastavení nThreads jakékoliv, pozorně sledujte statistiky využití paměti na vašem[ERDDAP's status page](/docs/server-admin/additional-information#status-page). Nikdy byste se neměli přiblížit k maximalizaci využití paměti vERDDAP; jinak dojde k vážným chybám a chybám.
        
##### Dočasně nastaveno na 1{#temporarily-set-to-1} 
Pokud je současné využití paměti dokonce mírně vysoké,ERDDAP™nastaví nThreards pro tuto žádost na 1. Takže,ERDDAP™Uchovává paměť, když je paměť vzácná.
         
##### Zmenšující se návrat{#diminishing-returns} 
Tam jsou klesající výnosy ke zvýšení nastavení nThreads: 2 vlákna budou mnohem lepší než 1 (Pokud budeme ignorovat dynamické přetáčení) . Ale 3 bude jen kus lepší než 2. A 4 bude jen okrajově lepší než 3.

V jedné zkoušce obtížného dotazu na velký soubor údajů z EDDTable byla doba odezvy 1, 2, 3, 4, 5, 6 vláken 38, 36, 20, 18, 13, 11 sekund. (Nyní používáme nTableThreads=6 na tomto serveru.) 

nThreads=2: Ačkoliv, tam je často významný přínos pro určení nThreads=2 místo nThreads=1, to často nebude mít velký rozdíl v hodinový čas potřebný k reakci na žádost daného uživatele. Důvodem je: s nThreads=1, většina moderní CPU vůle často[dynamicky přesčas](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (zvýšení turbo) dočasně zvýšit rychlost hodin procesoru. Takže s nThreads=1, jedno jádro bude často pracovat vyšší rychlostí hodin než každé ze dvou jader, pokud jste použili nThreads=2. Bez ohledu na to, stále si myslíme, že je lepší použít nThrads=2 spíše než nThrads=1, protože toto nastavení přinese lepší výsledky v širší škále situací. A samozřejmě, pokud váš počítač má dostatečné CPU jádra, ještě vyšší nastavení nThreadů by mělo přinést lepší výsledky.

Jak bylo uvedeno výše, velmi vysoká nastavení nThreads může vést k rychlejší odpovědi na některé žádosti, ale riziko celkového poklesuERDDAP™citlivost a použití vysoké paměti (jak je uvedeno výše) Zatímco tyto žádosti jsou zpracovávány znamená, že obecně není dobrý nápad.
        
##### CPU Jádra{#cpu-cores} 
Neměli byste nikdy nastavit nThreads na číslo větší než počet CPU jader v procesoru počítače. V podstatě všechny moderní procesory mají více jader (např. 2, 4 nebo 8) . Některé počítače dokonce mají více procesorů (např. 2 procesory \\* 4 jádra/CPU = 8 jader procesoru) . Chcete-li zjistit, kolik procesorů a jader počítač má:

* Na Macs, použijte *Klíč pro volbu* : Apple Menu : Systémové informace
* Na Linuxu použijte kočku /proc/cpuinfo
* Na Windows 10 použijte *Ctrl + Shift + Esc* otevřít Správce úloh: Výkon (Logické procesory zobrazují celkový počet CPU jader) 

Ano, většina procesorů dnes říká, že podporují 2 vlákna na jádro (přes[hypervaziva](https://en.wikipedia.org/wiki/Hyper-threading)) , ale 2 vlákna sdílet výpočetní zdroje, takže neuvidíte dvakrát průchodnost na procesoru pod těžkým zatížením. Například počítač s jedním procesorem se 4 jádry může tvrdit, že podporuje až 8 vláken, ale nikdy byste neměli překročit nThreads=4 v tom, žeERDDAP. Pamatuj si to:

* NThreads nastavení vERDDAP™je na žádost.ERDDAP™často řeší více žádostí současně.
*   ERDDAP™provádí jiné věci než žádosti o zpracování, např. opětovné načtení dat.
* Kdy?ERDDAP™reaguje na danou žádost, jiné výpočetní zdroje (např. přístup na disk, síťová šířka pásma) může být omezující. Čím vyšší budete nastavit nThreads, tím pravděpodobnější, že tyto další zdroje budou maximalizovány a zpomalíERDDAP's obecnou citlivostí.
* Operační systém dělá věci jiné než spustitERDDAP.

Takže je lepší nenastavit nastavení nThreadů na více než počet jader v procesoru počítače.
         
##### Vaše míle květen Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Výsledky různých nastavení nThreads se budou značně lišit u různých požadavků na různé soubory dat na různých systémech. Pokud opravdu chcete znát vliv různých nastavení nThreads, spusťte realistické testy.
         
##### Proč nThreads na žádost?{#why-nthreads-per-request} 
Někteří z vás si myslí: "Proč je nThreads na žádost? Kdybych to kódoval, použil bych jedno stálé pracovní vlákno a frontu na zprávy pro lepší výkon." Problém s použitím jednoho dělnického poolu a fronty zpráv je, že jeden obtížný požadavek by zaplavit frontu s mnoha pomalými úkoly. To by účinně zablokovaloERDDAP™od i zahájení práce na úkolech týkajících se jiných žádostí až do počáteční žádosti byla (v podstatě) Hotovo. Dokonce i jednoduché následné žádosti by reagovaly velmi pomalu.ERDDAP's použitím nThreads na žádost vede k mnohem spravedlivější využití výpočetních zdrojů.
         
##### nThreads vs. více pracovních počítačů{#nthreads-vs-multiple-worker-computers} 
Bohužel,ERDDAP's nThreads systém nebude nikdy tak účinný jako skutečné paralelizace prostřednictvím více pracovních počítačů, s každým pracuje na kusu dat, ve způsobu, jakým Hadoop nebo Apache Spark jsou obvykle používány. Když je úkol skutečně paralelizován/distribuován na více počítačů, každý počítač může využít všechny své zdroje na svou část úkolu. SERDDAP's systémem nThreads, každá z vláken soutěží o stejnou šířku pásma počítače, diskové disky, paměť, atd. Bohužel, většina z nás nemá prostředky ani prostředky na založení ani pronájem (o webových službách Amazon (AWS) nebo Google Cloud Platform (GCP) ) masivní sítě počítačů. Na rozdíl od relační databáze, která může vrátit řádky výsledků v libovolném pořadí,ERDDAP™slibuje, že vrátí řádky výsledků v konzistentním pořadí. Toto omezení děláERDDAP's nThreads implementace méně efektivní. Ale...ERDDAP's nThreads je užitečné v mnoha případech.

Existují však způsoby, jakERDDAP™stupnice pro rychlé zvládnutí obrovského počtu žádostí vytvořením[mřížka/klastr/federaceERDDAPán](/docs/server-admin/scaling).
         
#### &lt;palety&gt;{#palettes} 
* Začneme sERDDAP™verze 2.2,datasets.xmlmůže zahrnovat&lt;palety&gt; značka (v rámci&lt;erddapDatasets&gt;), který přepíše&lt;palety &gt; hodnota značky ze zpráv.xml (nebo se vrátí k hodnotě zprávy.xml, pokud tagdatasets.xmlje prázdná) . To vám umožní změnit seznam dostupných palet, zatímcoERDDAP™Utíká. Umožňuje také provést změnu a mít ji přetrvávající, když nainstalujete novou verziERDDAP.
UPOZORNĚNÍ: palety uvedené vdatasets.xmlmusí být superset palet uvedených ve zprávách.xml; jinakERDDAP™Hodí výjimku a přestane zpracovánídatasets.xml. To zajišťuje, že všechnyERDDAP™instalace alespoň podporují stejné základní palety.
UPOZORNĚNÍ:ERDDAP™kontroluje, že palety souborů uvedených ve zprávách.xml skutečně existují, ale nekontroluje paletové soubory uvedené vdatasets.xml. Je vaší povinností zajistit, aby byly soubory přítomny.
    
Také začínáme sERDDAP™verze 2.12, pokud vytvoříte podadresář cptfiles vERDDAP™adresář obsahu,ERDDAP™zkopíruje všechny soubory \\*.cpt v tomto adresáři do\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles adresář pokaždéERDDAP™Začneme. Pokud tedy vložíte do tohoto adresáře vlastní soubory cpt, budou tyto soubory použityERDDAP™, bez extra úsilí na vaší straně, i když nainstalujete novou verziERDDAP.
    
UPOZORNĚNÍ: Pokud přidáte vlastní palety do svéhoERDDAP™a máteEDDGridFromErddap a/nebo EDDTableFromErddap soubory ve vašemERDDAP™, pak uživatelé uvidí své vlastní paletové možnosti naERDDAP™Vytvořit graf webové stránky, ale pokud se je uživatel pokusí použít, dostanou graf s výchozím (obvykle duha) paleta. Je to proto, že obraz je vytvořen ovladačemERDDAP™která nemá vlastní paletu. Jediná řešení jsou nyní e-mailem vzdálenéERDDAP™správce, který přidá vaše vlastní palety do své/jiERDDAPnebo e-mail Chris. John v noaa.gov požádat, aby palety byly přidány do normyERDDAP™distribuce.
    
#### &lt;onChange&gt;{#onchange} 
* [ ** &lt;onChange&gt; ** ] (#Změnit) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlkterá určuje činnost, která bude provedena při vytvoření tohoto souboru údajů (kdyERDDAP™restartováno) a kdykoli se tento datový soubor jakýmkoli způsobem změní.
    * V současné době proEDDGridpodtřídy, jakákoli změna metadat nebo proměnné osy (například nový časový bod pro data v reálném čase) je považována za změnu, ale opětovné načtení datového souboru se nepovažuje za změnu (sama) .
    * V současné době se u podtříd EDDTable jakékoli opětovné načtení datového souboru považuje za změnu.
    * V současné době jsou povoleny pouze dva druhy akcí:
        * " http://" nebo " https://" -- Pokud akce začíná na " http://" nebo " https://" ,ERDDAP™pošleHTTP GETpožadavek na zadanou URL adresu. Odpověď bude ignorována. Například, URL může říct některé jiné webové služby, aby něco udělat.
            * Pokud má URL dotaz (po "?") , to musí být již[% zakódováno](https://en.wikipedia.org/wiki/Percent-encoding). Musíte zakódovat speciální znaky do omezení (jiné než počáteční "&" a hlavní'='omezení) do formuláře %HH, kde HH je 2 číslice hexadecimální hodnota znaku. Obvykle stačí převést několik interpunkčních znaků: % na% 225, & na% 226, "na% 222,&lt;do% 3C, = do% 3D, &gt; do% 3E, + do% 2B,|do% 7C,\\[do % 5B,\\]do %5D, prostor na%20, a převést všechny znaky nad #127 do jejich UTF-8 formuláře a pak procento enkódovat každý byte UTF-8 formuláře do%HH formátu (Požádat programátora o pomoc) .
NapříkladstationIDPodvozky a jejich části a součásti
se stává &stationID% 3E=% 2241004%22
Procentuální kódování je obecně nutné, když přístupERDDAPpřes jiný software než prohlížeč. Prohlížeče obvykle zvládnout procento kódování pro vás.
V některých situacích, musíte procent enkódovat všechny znaky jiné než A-Za-z0-9\\_-&#33;.~ ' () \\*, ale stále nezakódujte počáteční "&" nebo hlavní'='v omezeních.
Programovací jazyky mají k tomu nástroje (např. vizJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)aJavaSkript je [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) a existují
                [webové stránky, které pro vás tvoří procento enkódování/dekódování](https://www.url-encode-decode.com/).
            * Oddatasets.xmlje XML soubor, musíte také kódovat ALL '&', '&lt;"a "&gt;" v URL jako "&amp;," "&lt;' a '&gt;' po procentu kódování.
            * Příklad: Pro URL, které můžete zadat do prohlížeče jako:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Měli byste určit&lt;onChange&gt; značka prostřednictvím (na jednom řádku) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Pokud akce začíná na "mailto:,"ERDDAP™zašle e-mail na následující e-mailovou adresu, v níž uvede, že datový soubor byl aktualizován/změnil.
Například:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange &gt; Pokud máte dobrý důvodERDDAP™na podporu jiného typu akce, pošlete nám e-mail popisující, co chcete.
    * Tato značka je volitelná. Může jich být tolik, kolik budeš chtít. Pro každou akci použijte jeden z těchto značek.
    * To je analogické sERDDAP's e-mailem / URL předplatné systém, ale tyto akce nejsou uloženy trvale (tj. jsou uloženy pouze v objektu EDD) .
    * Pro odstranění předplatného stačí odstranit&lt;onChange&gt; tag. Změna bude zaznamenána až bude příště soubor údajů znovu načten.
         
#### &lt;znovu načíst každý NMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;reload EveryNMinutes&gt; ** ] (# reload everynminutes) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmltéměř všech typů souborů údajů, které určují, jak často by měl být soubor údajů znovu načítán. Například,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Obecně platí, že soubory, které se často mění (například získat nové datové soubory) je třeba často znovu nabíjet například každých 60 minut.
    * Datasety, které se mění zřídka, by měly být opakovaně načítány, například každých 1440 minut (denně) nebo 10080 minut (týdenní) .
    * Tato značka je VOLITELNÁ, ale doporučená. Výchozí hodnota je 10080.
    * Příkladem je:&lt;reloadEveryNMinutes&gt;1440&lt;/reload EveryNMinutes&gt;
    * Když je soubor dat znovu načten, všechny soubory v souboru *velkýRodič rodičů* /cache/ *datasetID* adresář se smaže.
    * Bez ohledu na to, co je nastaveno, nebude soubor dat načten častěji než&lt;loadDatasetsMinMinutes&gt; (výchozí hodnota = 15) , jak je uvedeno v[setup.xml](/docs/server-admin/deploy-install#setupxml). Takže pokud chcete, aby byly soubory znovu načítány velmi často, musíte nastavit jak reloadEveryNMinutes a loadDatasets MinMinutes na malé hodnoty.
    * Nenastavovat znovunačítáníEveryNMinutes na stejnou hodnotu jako loadDatasets MinMinutes, protože uplynulý čas bude pravděpodobně (například) 14:58 nebo 15:02, takže data budou znovu načtena pouze asi v polovině hlavních reloadů. Místo toho, použijte menší (například 10) nebo větší (například 20) reload Každý NMinutes má hodnotu.
    * Bez ohledu na reloadEveryNMinutes, můžete ručně říctERDDAP™co nejdříve znovu načíst konkrétní datový soubor[Soubor s vlajkou](/docs/server-admin/additional-information#flag).
    * Pro podivné programátory --ERDDAP™, opětovné načtení všech souborů dat je řešeno dvěma jednotlivými účelově vázanými vlákny. Jedno vlákno spustí menší opětovné načtení, pokud najde vlajkový soubor nebo hlavní opětovné načtení (který kontroluje všechny soubory dat, aby zjistil, zda je třeba je znovu načíst) . Druhé vlákno načítá data po jednom. Tato vlákna fungují v pozadí a zajišťují, aby byly všechny soubory údajů aktualizovány. Vlákno, které skutečně reloads připravuje novou verzi datového souboru, pak jej vymění na místo (v podstatě nahrazuje starou verzi atomicky) . Takže je velmi možné, že následující sled událostí nastane (To je dobře.) :
        
        1.  ERDDAP™začne znovu načítat soubor údajů (vytvoření nové verze) v pozadí.
        2. Uživatelské 'A' podává žádost k datovému souboru.ERDDAP™k vytvoření odezvy používá aktuální verzi datového souboru. (To je dobře. Uživatel neměl žádné zpoždění a současná verze datového souboru by nikdy neměla být příliš zastaralá.) 
        3.  ERDDAP™dokončuje vytvoření nové reloadované verze datového souboru a swapy této nové verze do výroby. Všechny následující nové žádosti jsou řešeny novou verzí datového souboru. Pro konzistence je požadavek uživatele A stále vyplněn původní verzí.
        4. Uživatelské 'B' podává žádost k datovému souboru aERDDAP™použije novou verzi datového souboru k vytvoření odezvy.
        5. Nakonec jsou vyplněny požadavky uživatele A a uživatele B (Možná. A je první, možná B je první.) .
        
Slyším někoho říkat, "Jen dvě trojky&#33; Ha&#33; To je ubohý&#33; Měl by to nastavit tak, aby opětovné nabíjení souborů dat používalo tolik vláken, kolik je potřeba, takže se to všechno dělá rychleji a s malým nebo žádným zpožděním." Ano i ne. Problém je v tom, že načítání více dat najednou vytváří několik těžkých nových problémů. Musí být vyřešeny nebo vyřešeny. Současný systém funguje dobře a má zvládnutelné problémy (například možnost zpoždění před vlajkou) . (Pokud potřebujete pomoc s jejich řízením, podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).) Související[aktualizace EveryNMillis](#updateeverynmillis). systém funguje v rámci reakčních vláken, takže může a vede k více soubory souborů jsou aktualizovány (ne naplno načíst) současně.
##### Proaktivní vs. reaktivní{#proactive-vs-reactive} 
ERDDAP's reload system is proaktivní -- data jsou znovu načtena brzy po jejich opětovném načtení EveryNMinutes time is up (To znamená, že se z nich stane "příběh," ale nikdy příliš otupělý) , zda soubor údajů dostává žádosti od uživatelů nebo ne. Takže...ERDDAP™Data jsou vždy aktuální a jsou připravena k použití. To je v rozporu s reaktivním přístupem THREDDS: žádost uživatele je to, co říká THREDDS zkontrolovat, zda je soubor dat zastaralý (to může být velmi zatuchlé) . Pokud je zatuchlý, THREDDS nechá uživatele čekat (často na několik minut) Zatímco data jsou znovu načítána.
        
#### &lt;aktualizace EveryNMillis&gt;{#updateeverynmillis} 
* [ ** &lt;updateEveryNMillis&gt; ** ] (#update everynmillis) je VOLITELNÁ tag v rámci&lt;Soubor údajů &gt; značka vdatasets.xmlněkteré typy souborů údajů, které pomáhajíERDDAP™práce s datovými soubory, které se mění velmi často (často tak zhruba každou sekundu) . Na rozdíl odERDDAPJe pravidelný, aktivní, [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) systém pro úplné načtení každého datového souboru, tento VOLITELNÝ doplňkový systém je reaktivní (spuštěno žádostí uživatele) a rychlejší, protože je to postupné (pouze aktualizovat informace, které je třeba aktualizovat) . Například, pokud žádost oEDDGridSoubor dat FromDap se vyskytuje více než stanovený počet milisekund od poslední aktualizace,ERDDAP™uvidíme, jestli jsou nějaké nové hodnoty pro ty nejlevější. (první, obvykle"time") rozměr a pokud ano, stáhněte si tyto nové hodnoty dříve, než se postaráte o požadavek uživatele. Tento systém je velmi dobrý v udržování rychle se měnícího souboru aktuálního s minimálními nároky na zdroj dat, ale za cenu mírného zpomalení zpracování některých žádostí uživatelů.
    * Pro použití tohoto systému, přidat (například) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
bezprostředně po&lt;reloadEveryNMinutes&gt; Označení datového souboru vdatasets.xml. Počet milisekund, které zadáte může být stejně malý jako 1 (zajistit, aby soubor údajů byl vždy aktuální) . Hodnota 0 (výchozí) nebo záporné číslo vypne systém.
    * Vzhledem k jejich přírůstkové povaze by aktualizace měly skončit velmi rychle, takže by uživatelé nikdy neměli čekat dlouho.
    * Pokud druhá žádost o údaje dorazí před dokončením předchozí aktualizace, druhá žádost nespustí další aktualizaci.
    * V celé dokumentaci se pokusíme použít slovo "reload" pro pravidelné, úplné opětovné načítání souborů a "update" pro tyto nové přírůstkové, částečné aktualizace.
    * Pro testovací účely jsou některé diagnostiky vytištěny pro log.txt, pokud [&lt;LogLevel &gt;] (#loglevel) vdatasets.xmlje nastaven na "všechny."
    * Pokud používáte přírůstkové aktualizace a zejména pokud nejlevější (první) Například čas, osa je velká, možná budete chtít nastavit&lt;reloadEveryNMinutes &gt; na větší číslo (1440?) , tak, aby aktualizace dělat většinu práce udržet soubor údajů aktuální, a plné opětovné načítání se provádí zřídka.
    * Poznámka: tento nový systém aktualizace metadat (například časactual\\_range, time\\_coverage\\_end, ...) ale nespouští na Change (emailem nebo dotykem URL) nebo změnitRSSkrmiva (Možná by to mělo...) .
    * Pro všechny datové soubory, které používají podtřídy[EDDGridFromFiles](#eddgridfromfiles)a[EDDTableFromFoles](#eddtablefromfiles):
        *    **UPOZORNĚNÍ:** při přidání nového datového souboru do datového souboru kopírováním do adresáře, kterýERDDAP™Podívejte, je tu nebezpečí, žeERDDAP™všimne si částečně písemného souboru; pokusí se jej přečíst, ale selže, protože soubor je nekompletní; prohlásí soubor za "špatný" soubor a odstraní jej (dočasně) z datového souboru.
Abychom se tomu vyhnuli, **DOPORUČIT SE STRONGLII** že kopírujete nový soubor do adresáře s dočasným jménem (např. 20150226.ncTmp) který neodpovídá souboru souborů dat NázevRegex (\\*\\.nc) , pak přejmenovat soubor na správný název (např. 20150226.nc) . Pokud použijete tento přístup,ERDDAP™bude ignorovat dočasný soubor a všimne si správně pojmenovaný soubor pouze tehdy, když je dokončen a připraven k použití.
        * Pokud změníte existující datové soubory na místě (například přidání nového datového bodu) ,&lt;updateEveryNMillis&gt; bude fungovat dobře, pokud se změny objeví atomicky (v okamžiku) a soubor je vždy platný soubor. Například netcdf-java knihovna umožňuje přidání do neomezeného rozměru "klasické".ncV3 soubor se provede atomovy.
            &lt;updateEveryNMillis&gt; bude špatně fungovat, pokud je soubor neplatný při provádění změn.
        *   &lt;updateEveryNMillis&gt; bude pracovat dobře pro soubory, kde se jeden nebo několik souborů změní v krátkém čase.
        *   &lt;updateEveryNMillis&gt; bude špatně pracovat pro soubory souborů, kde se velký počet souborů mění v krátkém čase (pokud se změny neobjeví atomově) . Pro tyto datové soubory je lepší nepoužívat&lt;aktualizovatEveryNMillis&gt; a nastavit a[vlajka](/docs/server-admin/additional-information#set-dataset-flag)říctERDDAP™znovu načíst soubor údajů.
        *   &lt;updateEveryNMillis&gt; neaktualizuje informace související s [&lt;subsetVariables&gt;] (#subsetvariables) . Normálně to není problém, protožesubsetVariablesmít informace o věcech, které se příliš často nemění (například seznam názvů stanic, zeměpisné šířky a délky) . PokudsubsetVariableszměny údajů (například při přidání nové stanice do datového souboru) , pak kontaktujte[URL vlajky](/docs/server-admin/additional-information#set-dataset-flag)pro soubor údajů, který má sdělitERDDAP™znovu načíst soubor údajů. Jinak,ERDDAP™nevšimne si nové podmnožiny Proměnné informace až do příštího opětovného načtení datového souboru (&lt;reloadEveryNMinutes&gt;).
        * Naše obecné doporučení je použít:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Problémy? Na Linuxových počítačích, pokud používáte&lt;updateEveryNMillis&gt; sEDDGridFromFiles nebo EDDTableFromFoles třídy, můžete vidět problém, kde datový soubor selže načíst (příležitostně nebo důsledně) s chybovou zprávou: "IOException: Uživatelský limit inotify instancí dosaženo nebo příliš mnoho otevřených souborů." Příčinou může být chyba vJavacož způsobuje, že případy nejsou shromažďovány odpadky. Tento problém se vyhnout vERDDAP™V1.66 a vyšší. Takže nejlepší řešení je přepnout nejnovější verziERDDAP.
Pokud to nevyřeší problém (tj. pokud máte opravdu velký počet souborů pomocí&lt;updateEveryNMillis&gt;), můžete tento problém napravit voláním:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Nebo použijte vyšší čísla, pokud problém přetrvává. Výchozí hodnota hodinek je 8192. Výchozí hodnota pro případy je 128.
    * Můžete tam dát&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; vdatasets.xml  (s ostatními nastaveními v blízkosti horní části) změnit maximální počet změn souboru (výchozí=10) která bude zpracována systémem updateEveryNMillis. Větší číslo může být užitečné pro soubor údajů, kde je velmi důležité, aby byly vždy aktualizovány. Viz[aktualizace dokumentaceMaxEvents](#updatemaxevents).
    * Pro podivné programátory -- tyto přírůstkové aktualizace, na rozdíl odERDDAPJe plná.[reloadEveryNMinutes](#reloadeverynminutes)systém, objeví se v rámci uživatelského požadavku vlákna. Jakýkoliv počet souborů dat může být aktualizován současně. Existuje kód. (a zámek) zajistit, aby na aktualizaci daného datového souboru v daném okamžiku pracovalo pouze jedno vlákno. Umožnit více simultánních aktualizací bylo snadné; umožnit více simultánních celých reloadů by bylo těžší.
         
#### &lt;sourceCanCanstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanCanstrainStringEQNE&gt; ** ] (# sourcecantrainstringeqne) je VOLITELNÁ tag v tabulce&lt;Soubor údajů &gt; značka vdatasets.xmlkterý určuje, zda zdroj může omezit proměnné String pomocí operátorů = a &#33;=.
    * Pro EDDTableFromDapSequence to platí pouze pro vnější sekvence String proměnné. Předpokládá se, že zdroj nezvládne žádná omezení na proměnné vnitřní sekvence.
    * Tato značka je volitelná. Platné hodnoty jsou pravdivé (výchozí) a falešné.
    * Pro EDDTableFromDapSequenceOPeNDAPDRDS servery, to by mělo být nastaveno na true (výchozí) .
    * Pro EDDTableFromDapSequence Dapper servery, tohle by mělo být nastaveno na false.
    * Příkladem je:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;zdrojCanCanstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;zdrojCanCanstrainStringGTLT&gt; ** ] (#sourcecantrainstringgtlt) je VOLITELNÁ tag v tabulce&lt;Soubor &gt; značka, která určuje, zda zdroj může omezit proměnné String pomocí&lt;,&lt;=, &gt; a &gt; hospodářské subjekty.
    * Pro EDDTableFromDapSequence to platí pouze pro vnější sekvence String proměnné. Předpokládá se, že zdroj nezvládne žádná omezení na proměnné vnitřní sekvence.
    * Platné hodnoty jsou pravdivé (výchozí) a falešné.
    * Tato značka je volitelná. Default je pravdivý.
    * Pro EDDTableFromDapSequenceOPeNDAPDRDS servery, to by mělo být nastaveno na true (výchozí) .
    * Pro EDDTableFromDapSequence Dapper servery, tohle by mělo být nastaveno na false.
    * Příkladem je:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;zdrojCanCanstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;sourceCanCanstrainStringRegex&gt; ** ] (# sourcecanconstriningregex) je VOLITELNÁ tag v tabulce&lt;tag datového souboru &gt;, který určuje, zda zdroj může omezit proměnné String pomocí pravidelných výrazů, a pokud ano, co je operátor.
    * Platné hodnoty jsou "=~" (váDAPstandardní) , "~=" (mylně podporován mnoha lidmiDAPservery) nebo "" (naznačující, že zdroj nepodporuje pravidelné výrazy) .
    * Tato značka je volitelná. Výchozí je ""
    * Pro EDDTableFromDapSequenceOPeNDAPDRDS servery, to by mělo být nastaveno na "" (výchozí) .
    * Pro EDDTableFromDapSequence Dapper servery, to by mělo být nastaveno na "" (výchozí) .
    * Příkladem je:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;zdrojCanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;sourceCanDoDistinct&gt; ** ] (# sourcecandodistant) je VOLITELNÝ tag v databázi EdDtableFromDatabase&lt;tag datového souboru &gt;, který určuje, zda má zdrojová databáze zvládnout & Distinct () omezení v uživatelských dotazech.
    * Tato značka je volitelná. Platné hodnoty jsou ne (ERDDAP™ovládá odlišné; výchozí) , částečné (zdroj ovládá odlišné aERDDAP™Zvládne to znovu.) , a ano (zdroj zvládá odlišné) .
    * Jestliže užíváte ne aERDDAP™Dochází mu paměť, když se s ním zachází jinak, použijte ano.
    * Pokud používáte ano a zdrojová databáze pracuje příliš pomalu, použijte ne.
    * parciální vám dává nejhorší z obou: to je pomalé, protože zpracování databáze odlišné je pomalé a může dojít paměť vERDDAP.
    * Databáze interpretují DISTINCT jako požadavek na pouze jedinečné řádky výsledků, zatímcoERDDAP™interpretuje jej jako žádost o setříděný seznam unikátních řádků výsledků. Pokud to nastavíte na částečné nebo ano,ERDDAP™automaticky také říká databázi, aby třídila výsledky.
    * Jeden malý rozdíl ve výsledcích:
Ne.|částečné,ERDDAP™bude třídit "" na začátku výsledků (před ne-""" řetězce) .
S ano, databáze může (Postgres bude) Sort "" na konci výsledků (po non-"" řetězce) .
Budu hádat, že to také ovlivní třídění krátkých slov oproti delším slovům, která začínají krátkým slovem. Například,ERDDAP™bude třídit "Simon" před "Simony."
    * Příkladem je:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt;{#sourcecanorderby} 
* [ ** &lt;zdroj CanOrderBy&gt; ** ] (#Sourcecanorderby) je VOLITELNÝ tag v databázi EdDtableFromDatabase&lt;tag datového souboru &gt;, který určuje, zda má zdrojová databáze zvládnout &orderBy (...) omezení v uživatelských dotazech.
    * Tato značka je volitelná. Platné hodnoty jsou ne (ERDDAP™klikyorderBy (...) ; výchozí) , částečné (zdrojové klikyorderByaERDDAP™Zvládne to znovu.) , a ano (zdrojové klikyorderBy (...) ) .
    * Jestliže užíváte ne aERDDAP™dochází mi paměť při manipulaciorderBy (...) , použijte ano.
    * Pokud používáte ano a kliky na zdrojovou databáziorderBy (...) příliš pomalu, použijte ne.
    * částečné dává vám nejhorší z obou: je to pomalé, protože databázové zpracováníorderBy (...) je pomalý a může dojít paměť vERDDAP.
    * Jeden malý rozdíl ve výsledcích:
Ne.|částečné,ERDDAP™bude třídit "" na začátku výsledků (před ne-""" řetězce) .
S ano, databáze může (Postgres bude) Sort "" na konci výsledků (po non-"" řetězce) .
To může také ovlivnit třídění krátkých slov oproti delším slovům, která začínají krátkým slovem. Například,ERDDAP™bude třídit "Simon" před "Simony," ale nejsem si jistý, jak je bude databáze třídit.
    * Příkladem je:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;zdrojNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;zdrojNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) je VOLITELNÁ tag v tabulce&lt;Soubor &gt; značka, která určuje (pravda (výchozí) nebo falešné) pokud zdroj potřebuje pomoct s dotazy s&lt;číselný Proměnná &gt;=&lt;floatingPointValue&gt; (a &#33;=, &gt;&lt;=). Například,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Pro některé zdroje dat, číselné dotazy zahrnující =, &#33;=,&lt;= nebo &gt; nesmí pracovat podle přání s čísly plovoucích bodů. Například hledání délky=220.2 může selhat, pokud je hodnota uložena jako 220.20000000000001.
    * Tento problém vzniká, protože plovoucí bod čísla jsou[není zrovna v počítačích](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Pokud zdrojNeedsExpandedFP\\_EQ je nastaven na true (výchozí) ,ERDDAP™modifikuje dotazy zaslané do zdroje dat, aby se zabránilo tomuto problému. Je vždy bezpečné a v pořádku nechat tento soubor být.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** ] (#sourcerl) je společná značka v rámci globálního datového souboru&lt;addAttributes&gt; tag, který určuje URL, který je zdrojem dat.
    * Příkladem je:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (ale dát to všechno na jeden řádek) 
    * InERDDAP™, všechny datové soubory budou mít "sourceUrl" v kombinovaných globálních atributech, které jsou zobrazeny uživatelům.
    * U většiny typů souborů dat je tato značka povinná. Viz popis typu datového souboru, aby bylo možné zjistit, zda je to vyžadováno či nikoli.
    * Pro některé datové soubory je oddělená&lt;sourceUrl&gt; značka není povolena. Místo toho musíš poskytnout "sourceUrl"[globální atribut](#global-attributes), obvykle v globální \\ &gt;addAttributes&lt;. Pokud neexistuje skutečná zdrojová URL (například pokud jsou data uložena v místních souborech) , Tento atribut má často jen místodržitel hodnotu, například,&lt;att name="name] (místní soubory) &lt;/att&gt; .
    * Pro většinu souborů dat je to základ URL, který se používá k požadavku na data. Například:DAPservery, toto je URL, do kterého lze přidat .dods, .das, .dds nebo .html.
    * Oddatasets.xmlje XML soubor, musíte také enkódovat '&', '&lt;"a "&gt;" v URL jako "&amp;," "&lt;' a '&gt;'.
    * U většiny typů souborů údajůERDDAP™přidá originálsourceUrl  ("localSourceUrl" ve zdrojovém kódu) do[globální atributy](#global-attributes)  (kde se stane "publicSourceUrl" ve zdrojovém kódu) . Když zdroj dat je místní soubory,ERDDAP™přidatsourceUrl=" (místní soubory) " globálním atributům jako bezpečnostní opatření. Pokud je zdrojem dat databáze,ERDDAP™přidatsourceUrl=" (databáze zdrojů) " globálním atributům jako bezpečnostní opatření. Pokud některé vaše datové soubory používají neveřejnésourceUrl's (obvykle proto, že jejich počítač je ve vašem DMZ nebo na lokální LAN) můžete použít [&lt;convertToPublicSourceUrl&gt;] (# Konvertovat na veřejné zdrojeurl) značky pro upřesnění, jak převést místnísourceUrls na veřejnostsourceUrls.
    * AsourceUrlmůže začíthttp://,https://, ftp://, a možná další předpony.httpsspojení čte a kontroluje digitální certifikát zdroje, aby bylo zajištěno, že zdroj je tím, kým říkají, že jsou. Ve vzácných případech může tato kontrola selhat s chybou "javax.net.ssl.SSLProtocolVýjimkou: handshake alarm: uncognized\\_name." To je pravděpodobně způsobeno doménovým jménem na certifikátu, který neodpovídá doménovému názvu, které používáte. Můžete a měli byste si přečíst podrobnosti osourceUrl's certifikátem ve vašem webovém prohlížeči, zejména seznam "DNS Name" v sekci "Subjekt Alternative Name."
        
V některých případechsourceUrlpoužíváte jméno domény uvedené v osvědčení. Například,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ bude házet tuto chybu, ale
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , Který používá název domény na certifikátu, nebude. Řešením v těchto případech je proto najít a použít název domény na osvědčení. Pokud ho nenajdete v certifikátu, kontaktujte poskytovatele dat.
        
V ostatních případech může být název domény uvedený v osvědčení pro skupinu jmen. Pokud k tomu dojde nebo je problém jinak neřešitelný, prosím, e-mail Chris. John v Noaa.gov nahlásí problém.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** ] (#addattributy) je VOLITELNÁ tag pro každý soubor údajů a pro každou proměnnou, která umožňujeERDDAPSprávci kontrolují atributy metadat spojené s datovým souborem a jeho proměnnými.
    *   ERDDAP™kombinuje atributy ze zdroje datového souboru ("sourceAttributes") a "addAttributes"který definujetedatasets.xml  (které mají přednost) k vytvoření "kombinovaných atributů," což je coERDDAP™uživatelé vidí. Můžete tedy použítaddAttributesredefinovat hodnoty zdrojových atributů, přidat nové atributy nebo odstranit atributy.
    * The&lt;addAttributes&gt; značka obsahuje 0 nebo více ** &lt;att &gt; ** podtagy, které se používají k určení jednotlivých atributů.
    * Každý atribut se skládá z názvu a hodnoty (který má specifický datový typ, například, dvojitý) .
    * S daným jménem může existovat pouze jeden atribut. Jestli je jich víc, tak ten poslední má přednost.
    * Hodnota může být jedna hodnota nebo mezerně oddělený seznam hodnot.
    * Syntaxe
        * Pořadí&lt;att &gt; subtags withinaddAttributesnení důležité.
        * The&lt;attt&gt; podtag formát je
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Název místa určení všech atributů MUSÍ začít písmenem (A-Z, a-z) a MUSÍ obsahovat pouze znaky A-Z, a-z, 0-9 nebo '\\_'.
        * Pokud&lt;attt&gt; podtag nemá hodnotu nebo hodnotu nuly, tento atribut bude odstraněn z kombinovaných atributů.
Například,&lt;att name="rows" /&gt; odstraní řádky z kombinovaných atributů.
Například,&lt;att name="coordinations¶null&lt;/att&gt; odstraní souřadnice z kombinovaných atributů.
##### atribut Typ{#attributetype} 
* [VOLITELNÁ hodnota typu pro&lt;att &gt; subtags] (#atributetyp) označuje datový typ hodnot. Výchozím typem je String. Příkladem atributu String je:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Platné typy pro jednotlivé hodnoty jsou byte (8-bitové celé číslo) , krátké (16-bit podepsané celé číslo) , int (32-bit podepsané celé číslo) , dlouhá (64-bit podepsané celé číslo) , plavat (32-bitový plovoucí bod) , dvojitá (64-bitový plovoucí bod) , Char, a String. Například,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Viz tyto poznámky o[datový typ znaku](#char).
Viz tyto poznámky o[Dlouhý datový typ](#long).
        
    * Platné typy pro seznamy hodnot oddělených od prostoru (nebo jednotné hodnoty) jsou byteList, shortList, unsignedShortList, charList, intList, longList, floatList, double Seznam. Například,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
UnsignedShortList vám umožní zadat seznam nesignovaných kraťasů, ale budou převedeny na seznam odpovídajících znaků Unicode (např. "65 67 69" bude přeměněno na "A C E."
Pokud zadáte charList, zakódujte jakékoliv speciální znaky (např. prostor, dvojité uvozovky, backslash,&lt;#32 nebo &gt;#127), jak byste je zakódovali v datové sekci NCCSV souboru (např., "," "\\"" nebo """," "\\\\," "\\n", "\\ u20ac") .
Není žádný strunný list. Uložte hodnoty String jako multi-line String. Například,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globální Atributy{#global-attributes} 
* [ ** Globální Atributy / Global&lt;addAttributes&gt; ** ] (#Global-atributes) --
    &lt;addAttributes&gt; je VOLITELNÁ tag v rámci&lt;Databáze &gt; značka, která se používá ke změně atributů, které se vztahují na celý datový soubor.
    
    *    ** Použijte globální&lt;addAttributes&gt; změnit globální atributy datového souboru. ** ERDDAP™kombinuje globální atributy ze zdroje datového souboru (** zdrojAtributy **) a globální** addAttributes **který definujete vdatasets.xml  (které mají přednost) vytvořit globální** kombinovanéAtributy ** , které jsou coERDDAP™uživatelé vidí. Můžete tedy použítaddAttributesredefinovat hodnoty zdrojových atributů, přidat nové atributy nebo odstranit atributy.
    * Viz [ ** &lt;addAttributes&gt; **informace] (#addattributy) která se vztahuje na globální a variabilní** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)a[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata -- Normálně,ERDDAP™automaticky generuje ISO 19115-2/19139 a FGDC (FGDC-STD-001-1998) Soubory XML metadat pro každý datový soubor s využitím informací z metadat datového souboru. Takže, **dobrá metadata datového souboru vede k dobrémuERDDAP-vygenerovala metadata ISO 19115 a FGDC. Zvažte, prosím, vložit hodně času a úsilí do zlepšení metadat vašich souborů (Což je stejně dobrá věc.) .** Většina atributů metadat datového souboru, které se používají pro generování metadat ISO 19115 a FGDC jsou z[Standard metadat ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)a jsou uvedeny níže.
    * Mnohé globální atributy jsou zvláštní v tom, žeERDDAP™Hledá je a používá je různými způsoby. Například odkaz nainfoUrlje zahrnuta na webových stránkách se seznamy souborů dat a dalších míst, aby uživatelé mohli zjistit více o datovém souboru.
    * Pokud uživatel vybere podmnožinu dat, globální atributy vztahující se k délce proměnné, zeměpisné šířce, výšce (nebo hloubka) , a časové rozsahy (např. Southernmost\\_severní, Northernmost\\_severní, time\\_coverage\\_start, time\\_coverage\\_end) jsou automaticky generovány nebo aktualizovány.
    * Jednoduchý globální vzorek&lt;addAttributes&gt; je:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Prázdný atribut cwhdf\\_version způsobuje atribut zdroj cwhdf\\_version (pokud existuje) která se odstraní ze konečného seznamu atributů.
    * Poskytování těchto informací pomáháERDDAP™dělat lepší práci a pomáhá uživatelům pochopit soubory dat.
Dobré metadata činí datový soubor použitelný.
Nedostatečná metadata činí datový soubor k ničemu.
Prosím, udělejte si čas na dobrou práci s atributy metadat.
##### Zvláštní globální atributy vERDDAP™
###### Potvrzení{#acknowledgement} 
*   [ **Potvrzení** ](#acknowledgement)a **uznání**   (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob uznání skupiny nebo skupin, které poskytly podporu (zejména finanční) pro projekt, který vytvořil tato data. Například,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Všimněte si, že ACDD 1.0 a 1.1 používají hláskování "poznámky" (což je obvyklé pravopis v USA.) , ale ACDD 1.3 to změnilo na "poznání" (což je obvyklé pravopis ve Velké Británii.) . Chápu to tak, že změna byla v podstatě nehoda a že rozhodně nepoznali důsledky změny. To je bordel&#33; Po celém světě jsou miliony datových souborů, které mají "poznání" a miliony, které mají "poznání." To zdůrazňuje pošetilost "jednoduchých" změn normy a zdůrazňuje potřebu stability norem. Protože ACDD 1.3 (což je verze ACDD, žeERDDAP™Podpora) říká "poznání,"ERDDAP™  (GenerovatDatasety Xml) podporuje.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)je pouze pro soubory EDDTable, které nemají proměnnou výšky nebo hloubky, ale mají proměnnou, která je proxy pro nadmořskou výšku nebo hloubku (například tlak, sigma, láhevČíslo) , můžete použít tento atribut k identifikaci této proměnné. Například,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Pokud[cdm\\_data\\_type](#cdm_data_type)je Profile nebo TrajectoryProfile a neexistuje žádná proměnná výšky nebo hloubky, cdm\\_altitude\\_proxy MUSÍ být definováno. Pokud je definován cdm\\_altitude\\_proxy,ERDDAP™přidá do proměnné následující metadata: \\_Souřadnice AxisType=Height and axis=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je globální atribut, který označujeUnidata [Společný datový model](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)datový typ datového souboru. Například,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM se stále vyvíjí a může se opět změnit.ERDDAP™splňuje související a podrobnější požadavky[Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitola[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Konvence metadat (dříve nazývané úmluvy o sledování CF bod) .
    * Buď je soubor globální[zdrojAtributy](#global-attributes)nebo jeho globální&lt;addAttributes&gt; MUSÍ obsahovat atribut cdm\\_data\\_type. Několik typů souborů údajů (jako EDDTable FromObis) automaticky to nastaví.
    * ProEDDGridSoubory dat, možnosti cdm\\_data\\_type jsou Grid (výchozí a zdaleka nejčastější typ proEDDGridSoubory údajů) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajektorie a TrajektoryProfile. V současné době,EDDGridnevyžaduje, aby byla specifikována žádná související metadata, ani nekontroluje, zda data odpovídají typu cdm\\_data\\_. To se pravděpodobně v blízké budoucnosti změní.
    * EDDTable používá cdm\\_data\\_type přísně, po specifikaci CF DSG spíše než CDM, který z nějakého důvodu nebyl aktualizován, aby byl v souladu s DSG. Pokud metadata datového souboru neodpovídáERDDAP's požadavky cdm\\_data\\_type' (viz níže) , datový soubor nebude načíst a bude generovat[chybová zpráva](#troubleshooting-tips). (To je dobře, v tom smyslu, že chybová zpráva vám řekne, co je špatně, abyste to mohli napravit.) A pokud data datového souboru neodpovídají nastavení metadat datového souboru (Například pokud existuje více než jedna hodnota zeměpisné šířky pro danou stanici v souboru časových řad) , některé žádosti o údaje vrátí nesprávné údaje v odpovědi. Takže se ujisti, že to všechno uděláš správně.
        
Pro všechny tyto soubory údajů, v úmluvách aMetadata\\_Conventionsglobální atributy, viz CF-1.6 (ne CF-1,0, 1.1, 1.2, 1.3, 1.4 nebo 1.5) , protože CF-1.6 je první verze, která zahrnuje změny související s diskrétní odběr vzorků geometrie (DSG) Konvence.
        *   **ERDDAP™nemá jednoduchý vztah k CF DSG** 
        *   ERDDAP™může vytvořit platný datový soubor DSG ze zdrojového souboru, který je již platným DSG souborem (án) , nebo ze zdrojového souboru, který není nastaven pro DSG, ale lze jej provést prostřednictvím změn metadat (některé z nich jsouERDDAP-specifický s cílem poskytnout obecnější přístup k upřesnění nastavení DSG) .
        *   ERDDAP™provádí hodně zkoušek platnosti, když načítá soubor údajů. Pokud má datový soubor cdm\\_data\\_type (nebofeatureType) atribut úspěšně zatížení vERDDAP™, pakERDDAP™tvrdí, že datový soubor splňuje požadavky DSG (jinak,ERDDAP™bude hodit výjimku vysvětlit první problém, který našel) .
UPOZORNĚNÍ: Zdá se, že úspěšně naložený soubor dat splňuje požadavky DSG (má správnou kombinaci atributů) , ale stále může být špatně nastaven, což vede k nesprávným výsledkům.ncCF a.ncSoubory odpovědí CFMA. (Software je v některých ohledech chytrý a v jiných netušící.) 
        * Když se podíváte na metadata souboru vERDDAP™, zdá se, že DSG soubor je vERDDAP's vnitřním formátem (obří, databázová tabulka) . Není v jednom z DSG formátů (Například rozměry a metadata nejsou správné) , ale informace potřebné pro zpracování datového souboru jako DSG data jsou v metadatech (například cdm\\_data\\_type=TimeSeries a cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* v globálních metadatech a cf\\_role=timeseries\\_id pro některé proměnné) .
        * Pokud uživatel požaduje podmnožinu datového souboru v.ncCF (a.ncsoubor ve formátu DSG kontiguous Ragged Array) nebo.ncSoubor CFMA (a.ncsoubor ve formátu DSG Multidimenzional Array) , že soubor bude platný CF DSG soubor.
UPOZORNĚNÍ: Nicméně, pokud byl soubor dat nastaven nesprávně (takže sliby z metadat nejsou pravdivé) , pak soubor odpovědi bude technicky platný, ale bude být nějakým způsobem nesprávné.
             
###### EDDTable cdm_data_types
* Pro soubory EDDTable jsou možnosti cdm\\_data\\_type (a související požadavky vERDDAP) jsou
###### Bod{#point} 
*   [Bod](#point)-- je pro soubor měření provedených v nesouvisejících časech a místech.
    * Stejně jako u všech cdm\\_data\\_typů jiných než jiných, musí mít bodové datové soubory délku, šířku a časové proměnné.
###### Profil{#profile} 
*   [Profil](#profile)-- je soubor měření všech provedených najednou, v jedné zeměpisné šířce, ale ve více než jedné hloubce (nebo výška) . Soubor údajů může být souborem těchto profilů, například 7 profilů z různých míst. Tento cdm\\_data\\_type neznamená žádné logické spojení mezi žádným z profilů.
    
* Jedna z proměnných (například profil\\_číslo) MUSÍ mít variabilní atribut cf\\_role=profile\\_id pro identifikaci proměnné, která jednoznačně identifikuje profily.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Pokud žádná jiná proměnná není vhodná, zvažte použití časové proměnné.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* Soubor údajů MUSÍ obsahovat globální atribut[cdm\\_profile\\_variables](#cdm_profile_variables), kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každém profilu. Pro daný profil musí být hodnoty těchto proměnných konstantní. Například,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=profile\\_id a všechny další proměnné s informacemi o profilu, a čas, zeměpisná šířka a délka.
Seznam nebude nikdy zahrnovat nadmořskou výšku, hloubku ani žádné proměnné pozorování.
     

\\[Opinion: cdm\\_data\\_type=Profil by měl být používán zřídka. V praxi je daný datový soubor obvykle buď TimeSeriesProfile (profily v pevné poloze) nebo TrajektoryProfile (profily podél trajektorie) , a to by mělo být řádně identifikováno jako takové.\\]  
###### Časové řady{#timeseries} 
*   [Časové řady](#timeseries)-- je sled měření (Například teplota mořské vody) 1 písm. a) a čl. (nebo výška) Umístění. (Ber to jako "station.") Databáze může být sbírkou těchto TimeSeries, například posloupnost z každé ze 3 různých míst.
    * Jedna z proměnných (například stanice\\_id) MUSÍ mít variabilní atribut cf\\_role=timeseries\\_id pro identifikaci proměnné, která jednoznačně identifikuje stanice.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Soubor údajů MUSÍ obsahovat globální atribut[cdm\\_timeseries\\_variables](#cdm_timeseries_variables), kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každé stanici. Pro danou stanici musí být hodnoty těchto proměnných konstantní. Například,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=timeseries\\_id a všechny ostatní proměnné s informacemi o stanici, která téměř vždy zahrnuje zeměpisnou šířku a délku (a výška nebo hloubka, pokud jsou přítomny) .
Seznam nikdy nebude obsahovat časové nebo pozorovací proměnné.
* Pro některé kotvené bóje může mít datový soubor dvě sady proměnných zeměpisné šířky a délky:
    1. Jeden pár hodnot zeměpisné šířky a délky, které jsou konstantní (tj. pevné umístění kotviště) . InERDDAP™, dát tyto proměnnédestinationNames zeměpisné šířky a délky a zahrnout tyto proměnné do seznamu cdm\\_timeseries\\_variables.
    2. Přesné hodnoty zeměpisné šířky a délky spojené s každým pozorováním. InERDDAP™, dát tyto proměnné různédestinationNameán (např. přesné a přesné Lon) a nezahrnují tyto proměnné do seznamu cdm\\_timeseries\\_variables.
Důvodem je: z teoretického hlediska soubor dat DSG TimeSeries, zeměpisná šířka a délka (a výška nebo hloubka, pokud jsou přítomny) Umístění stanice musí být konstantní.
###### TimeSeriesProfil{#timeseriesprofile} 
*   [TimeSeriesProfil](#timeseriesprofile)-- je pro sekvenci profilů pořízených v jednom, pevném, zeměpisné poloze. Každý profil je soubor měření provedených ve více výškách nebo hloubkách. Databáze může být sbírkou těchto TimeSeriesProfiles, například sled profilů pořízených na každém z 12 různých míst.
    * Jedna z proměnných (například stanice\\_id) MUSÍ mít variabilní atribut cf\\_role=timeseries\\_id pro identifikaci proměnné, která jednoznačně identifikuje stanice.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Jedna z proměnných (například profil\\_číslo) MUSÍ mít variabilní atribut cf\\_role=profile\\_id pro identifikaci proměnné, která jednoznačně identifikuje profily.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Zadaný profil\\_id musí být jedinečný pouze pro dané časové řady\\_id.) Pokud žádná jiná proměnná není vhodná, zvažte použití časové proměnné.
    * Databáze MUSÍ obsahovat globálníAttribute cdm\\_timeseries\\_variables, kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každé stanici. Pro danou stanici musí být hodnoty těchto proměnných konstantní. Například,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=timeseries\\_id a všechny ostatní proměnné s informacemi o stanici, která téměř vždy zahrnuje zeměpisnou šířku a délku.
Seznam nikdy nebude zahrnovat čas, výšku, hloubku nebo jakékoli proměnné pozorování.
    * Soubor údajů MUSÍ zahrnovat globálníAttribute cdm\\_profile\\_variables, kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každém profilu. Pro daný profil musí být hodnoty těchto proměnných konstantní. Například,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=profile\\_id a všechny další proměnné s informacemi o profilu, který téměř vždy obsahuje čas.
Seznam nebude nikdy zahrnovat zeměpisnou šířku, délku, výšku, hloubku nebo jakékoli proměnné pozorování.
###### Trajektorie{#trajectory} 
*   [Trajektorie](#trajectory)-- je sled měření na trajektorii (cesta prostorem a časem)   (např. teplota moře\\_voda\\_teplota pořízené lodí při pohybu vodou) . Databáze může být sbírkou těchto trajektorií, například posloupnosti z každé ze 4 různých lodí.
    * Jedna z proměnných (například ship\\_id) Musí mít atribut cf\\_role=trajektory\\_id pro identifikaci proměnné, která jednoznačně identifikuje trajektorie.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajektory\\_variables{#cdm_trajectory_variables} 
* Soubor údajů MUSÍ obsahovat globální atribut[cdm\\_trajektory\\_variables](#cdm_trajectory_variables), kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každé trajektorii. Pro danou trajektorii musí být hodnoty těchto proměnných konstantní. Například,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=trajectory\\_id a všechny další proměnné s informacemi o trajektorii.
Seznam nebude nikdy zahrnovat čas, zeměpisnou šířku, délku nebo jakékoli proměnné pozorování.
###### TrajektorieProfile{#trajectoryprofile} 
*   [TrajektorieProfile](#trajectoryprofile)-- je sekvence profilů na trajektorii. Databáze může být sbírkou těchto TrajectoryProfiles, například sled profilů pořízených 14 různými loděmi.
    * Jedna z proměnných (například ship\\_id) MUSÍ mít variabilní atribut cf\\_role=trajektory\\_id pro identifikaci proměnné, která jednoznačně identifikuje trajektorie.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Jedna z proměnných (například profil\\_číslo) MUSÍ mít variabilní atribut cf\\_role=profile\\_id pro identifikaci proměnné, která jednoznačně identifikuje profily.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Zadaný profil\\_id musí být jedinečný pouze pro danou trajektorii\\_id.) Pokud žádná jiná proměnná není vhodná, zvažte použití časové proměnné.
    * Soubor údajů MUSÍ zahrnovat globálníAttribute cdm\\_trajektory\\_variables, kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každé trajektorii. Pro danou trajektorii musí být hodnoty těchto proměnných konstantní. Například,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=trajectory\\_id a všechny další proměnné s informacemi o trajektorii.
Seznam nebude nikdy obsahovat proměnné související s profilem, čas, zeměpisná šířka, zeměpisná délka nebo jakékoli proměnné pozorování.
    * Soubor údajů MUSÍ zahrnovat globálníAttribute cdm\\_profile\\_variables, kde hodnota je čárkou oddělený seznam proměnných, které mají informace o každém profilu. Pro daný profil musí být hodnoty těchto proměnných konstantní. Například,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Seznam MUSÍ obsahovat proměnnou cf\\_role=profile\\_id a všechny další proměnné s informacemi o profilu, který téměř vždy zahrnuje čas, zeměpisnou šířku a délku.
Seznam nebude nikdy zahrnovat nadmořskou výšku, hloubku ani žádné proměnné pozorování.
###### Ostatní{#other} 
*   [Ostatní](#other)-- nemá žádné požadavky. Použijte jej, pokud datový soubor neodpovídá jedné z dalších možností, zejména pokud datový soubor neobsahuje zeměpisnou šířku, délku a časové proměnné.
     
###### Související poznámky{#related-notes} 
* Všechny soubory EDDTable s cdm\\_data\\_typem jiným než "Ostatní" musí mít délku, šířku a časové proměnné.
* Datasety s profily MUSÍ mít proměnnou výšky, proměnnou hloubky nebo[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)proměnná.
* Pokud nemůžete vytvořit soubor dat v souladu se všemi požadavky na ideální cdm\\_data\\_type, použijte "Point" (který má několik požadavků) nebo "Ostatní" (který nemá žádné požadavky) Místo toho.
* Tyto informace používáERDDAP™různými způsoby, například, ale hlavně pro výrobu.ncSoubory CF (.ncsoubory, které odpovídají Contiguous Ragged Array Representations spojené s cdm\\_data\\_type) a.ncSoubory CFMA (.ncsoubory, které jsou v souladu s Multidimenzionální Array Reprezentations spojené s datovým souborem cdm\\_data\\_type) podle definice v[Geometrie diskrétního odběru vzorků (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitola[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)úmluvy o metadatech, které byly dříve označovány jako "konvence o pozorování bodů CF."
* Tip: Pro tyto soubory dat je správné nastavení pro[subsetVariables](#subsetvariables)je obvykle kombinací všech proměnných uvedených v atributech cdm\\_...\\_variables. Například pro TimeSeriesProfile použijte cdm\\_timeseries\\_variables plus cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob identifikace osoby, organizace nebo projektu, který přispěl k tomuto datovému souboru (například původní tvůrce dat, před tím, než je tvůrce tohoto datového souboru přepracoval) . Například,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Pokud se "sponzor" ve skutečnosti nevztahuje na datový soubor, vynechat tento atribut. Ve srovnání s[creator\\_name](#creator_name)To je někdy více zaměřeno na zdroj financování.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob určení úlohy[contributor\\_name](#creator_name). Například,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Pokud se "sponzor" ve skutečnosti nevztahuje na datový soubor, vynechat tento atribut.
###### Sjezdy{#conventions} 
*   [ **Sjezdy** ](#conventions)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadat) Velmi časté: (Může být požadováno v budoucnu.) Hodnota je čárkou oddělený seznam standardů metadat, které tento datový soubor sleduje. Například:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Společné úmluvy o metadatech používané vERDDAP™jsou:
    
    *   [COARDSSjezdy](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)je prekurzor CF.
    *   [Klima a předpovědi (CF) Sjezdy](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)je zdrojem mnoha doporučených a požadovaných atributů vERDDAP. Současná verze CF je označena jako "CF-1.6."
    * TheNetCDFAtributová úmluva pro Discovery datových souborů (ACDD) je zdrojem mnoha doporučených a požadovaných atributů vERDDAP. Originální verze 1.0 ACDD (brilantní dílo Ethana Davise) , byl identifikován jako[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Proud (od roku 2015) 1.3 verze ACDD je označena jako[ACDD-1, 3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Pokud vaše datové soubory používajíUnidataDataset Discovery v1.0, doporučujeme[přepněte své soubory dat pro použití ACDD-1.3](#switch-to-acdd-13).
    
Pokud se váš datový soubor řídí nějakým dodatečným standardem metadat, přidejte název do CSV seznamu v atributu Conventions.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (z[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)standard metadat) je DOPORUČENÝ způsob, jak určit typ roštových dat (vEDDGridSoubory údajů) . Například,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Jediné povolené hodnoty jsou pomocnéInformace, obraz, modelResult, fyzický Měření (výchozí hodnota při generování metadat podle ISO 19115) , kvalitaInformace, referenceInformace a tematickéKlasifikace. (Nepoužívej tuto tag pro soubory EDDTable.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob identifikace osoby, organizace nebo projektu (pokud ne konkrétní osoba nebo organizace) , nejzodpovědnější za tvorbu (nebo poslední přepracování) těchto údajů. Například,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Pokud byly údaje rozsáhle přepracovány (Například satelitní data z úrovně 2 do úrovně 3 nebo 4) , pak obvykle reprocesor je uveden jako tvůrce a původní tvůrce je uveden přes[contributor\\_name](#contributor_name). Ve srovnání s[projekt](#project), To je pružnější, protože to může identifikovat osobu, organizaci, nebo projekt.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob identifikace e-mailové adresy (správně upravený) který poskytuje způsob, jak kontaktovat tvůrce. Například,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je RECOMMENDED způsob, jak identifikovat URL pro organizaci, která vytvořila soubor údajů, nebo URL s informacemi tvůrce o tomto datovém souboru (ale to je spíš účel[infoUrl](#infourl)) . Například,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je způsob, jak zjistit datum, kdy byly údaje poprvé vytvořeny (například zpracované do této formy) , ve formátu ISO 8601. Například,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Pokud jsou údaje pravidelně přidávány do souboru údajů, je to první datum, kdy byly k dispozici původní údaje.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob, jak určit datum poslední úpravy údajů (například při opravě chyby nebo při přidání nejnovějších údajů) , ve formátu ISO 8601. Například,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob, jak určit datum, kdy byly údaje poprvé zpřístupněny ostatním, například ve formátu ISO 8601 2012-03-15. Například,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Například soubor údajů může mít[date\\_created](#date_created)ze dne 2010-01-30, ale byl zveřejněn pouze 2010-07-30.date\\_issuedje méně často používán neždate\\_createdadate\\_modified. Pokuddate\\_issuedje vynechán, předpokládá se, že je stejný jakodate\\_created.
###### globálnídrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Jedná se o VOLITELNÝ globální atribut používanýERDDAP™  (a žádné standardy metadat) který určuje výchozí hodnotu pro volbu "Draw Land Mask" ve formuláři Make A Graph ( *datasetID* .graph) a pro parametr &.land v URL žádající mapu dat. Například,
    ```
    <att name="drawLandMask">over</att>  
    ```
Viz[drawLandMaskpřehled](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadat) je ignorován a/nebo placen. Pokud je datový soubor[cdm\\_data\\_type](#cdm_data_type)je vhodné,ERDDAP™automaticky ji použije k vytvořenífeatureTypeatribut. Takže není třeba, abys to přidal.
    
Jestliže však užíváte[EDDTableFromNcCFFiles](#eddtablefromnccffiles)vytvořit soubor souborů, které budou následovat[CF Geometrie diskrétního odběru vzorků (DSG) standardní](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), soubory musí mít sámfeatureTypesprávně definované, takžeERDDAP™může správně přečíst soubory. To je součástí požadavků CF DSG pro tento typ souboru.
     
###### historie{#history} 
*   [ **historie** ](#history)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat) je globální atribut RECOMMENDED multi-line String s řádkou pro každý proces, kterým byly údaje podrobeny. Například,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * V ideálním případě má každá řada ISO 8601:2004 (E) Zformátované datum+timeZ (např. 2011-08-05T08:55:02Z) následuje popis zpracovatelského kroku.
    *   ERDDAP™vytvoří to, pokud už neexistuje.
    * Pokud už existuje,ERDDAP™připojí nové informace ke stávajícím informacím.
    * historie je důležitá, protože umožňuje klientům vrátit se zpět k původnímu zdroji dat.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)je požadovaný globální atribut s URL webové stránky s více informacemi o tomto datovém souboru (obvykle na internetových stránkách zdrojové instituce) . Například,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Buď je soubor globální[zdrojAtributy](#global-attributes)nebo jeho globální&lt;addAttributes&gt; Musí obsahovat tento atribut.
    *   infoUrlje důležité, protože umožňuje klientům dozvědět se více o datech z původního zdroje.
    *   ERDDAP™zobrazí odkaz nainfoUrlo formuláři pro přístup k datům datového souboru ( *datasetID* .html) , Vytvořit graf webové stránky ( *datasetID* .graph) , a další webové stránky.
    * Pokud má URL dotaz (po "?") , to musí být již[% zakódováno](https://en.wikipedia.org/wiki/Percent-encoding). Musíte zakódovat speciální znaky do omezení (jiné než počáteční "&" a hlavní'=', pokud existuje) do formuláře %HH, kde HH je 2 číslice hexadecimální hodnota znaku. Obvykle stačí převést několik interpunkčních znaků: % na% 225, & na% 226, "na% 222,&lt;do% 3C, = do% 3D, &gt; do% 3E, + do% 2B,|do% 7C,\\[do % 5B,\\]do %5D, prostor na%20, a převést všechny znaky nad #127 do jejich UTF-8 formuláře a pak procento enkódovat každý byte UTF-8 formuláře do%HH formátu (Požádat programátora o pomoc) .
NapříkladstationIDPodvozky a jejich části a součásti
se stává &stationID% 3E=% 2241004%22
Procentuální kódování je obecně nutné, když přístupERDDAPpřes jiný software než prohlížeč. Prohlížeče obvykle zvládnout procento kódování pro vás.
V některých situacích, musíte procent enkódovat všechny znaky jiné než A-Za-z0-9\\_-&#33;.~ ' () \\*, ale stále nezakódujte počáteční "&" nebo hlavní'='.
Programovací jazyky mají k tomu nástroje (např. vizJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
aJavaSkript je [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) a existují
        [webové stránky, které pro vás tvoří procento enkódování/dekódování](https://www.url-encode-decode.com/).
    * Oddatasets.xmlje XML soubor, musíte také kódovat ALL '&', '&lt;"a "&gt;" v URL jako "&amp;," "&lt;' a '&gt;' po procentu kódování.
    *   infoUrlje jedinečná proERDDAP. Není to ze standardu metadat.
###### instituce{#institution} 
*   [ **instituce** ](#institution)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat) je požadovaný globální atribut s krátkou verzí názvu instituce, která je zdrojem těchto údajů (obvykle zkratka, obvykle&lt;20 znaků). Například,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Buď je soubor globální[zdrojAtributy](#global-attributes)nebo jeho globální&lt;addAttributes&gt; Musí obsahovat tento atribut.
    *   ERDDAP™zobrazí instituci pokaždé, když zobrazí seznam souborů údajů. Pokud je zde název instituce delší než 20 znaků, bude v seznamu souborů údajů viditelné pouze prvních 20 znaků (ale celá instituce může být vidět tím, že kurzor myši přes sousední "?" ikona) .
    * Pokud přidáte instituci na seznam&lt;categoryAttributes&gt; vERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)soubor, uživatelé mohou snadno najít soubory dat ze stejné instituce prostřednictvímERDDAP'Search for Datasets by Category' na domovské stránce.
###### Klíčová slova{#keywords} 
*   [ **Klíčová slova** ](#keywords)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je seznam slov a krátkých frází, které jsou odděleny čárkou (například:[GCMD Věda Klíčová slova](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) které obecně popisují soubor údajů a nezakládají žádné jiné znalosti datového souboru (například pro oceánografická data zahrnují oceán) . Například,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Oddatasets.xmlje XML dokument, znaky &,&lt;, a &gt; v atributu, jako jsou klíčová slova (např. znaky ve vědeckých klíčových slovech GCMD) musí být zakódováno jako &amp;&lt;, a &gt; resp.
Při načtení datového souboruERDDAP,
    
    * "Země věda &gt; " je přidána na začátek každého klíčového slova GCMD, které chybí.
    * Klíčová slova GCMD jsou převedena na titulní případ (tj. první písmena jsou kapitalizována) .
    * Klíčová slova jsou přeřazena do seřazeného pořadí a všechny nové znaky jsou odstraněny.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je atribut DOPORUČENÉ: pokud se řídíte pokyny pro slova / fráze v atributu klíčová slova (například, GCMD věda Klíčová slova) , dát název tohoto pokynu sem. Například,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licence{#license} 
*   [ **licence** ](#license)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je globální atribut STRONGLIE s licencí a/nebo omezeními používání. Například,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Pokud "\\[standardní\\]" se vyskytuje v hodnotě atributu, bude nahrazen standardemERDDAP™licence od&lt;standardní značkaLicence&gt;ERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)je ze zastaralých[ACDD 1. 0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (který byl identifikován vMetadata\\_Conventionsjako "UnidataDataset Discovery v1.0") Standard metadat. Hodnota atributu byla čárkou odděleným seznamem úmluv metadat použitých tímto datovým souborem.
Pokud datový soubor používá ACDD 1.0, tento atribut je například STRONGLY RECOMMENDED,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Ale...ERDDAP™Nyní doporučujeme ACDD-1.3. Jestliže máte[přepnul vaše soubory dat k použití ACDD-1.3](#switch-to-acdd-13), použitíMetadata\\_ConventionsSTRONGLIE SLEVA: stačí použít [&lt;Úmluva &gt;] (#konvence) Místo toho.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je textový popis zpracování (například:[Úroveň satelitního zpracování dat NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels)Například úroveň 3) nebo úroveň kontroly jakosti (např. kvalita vědy) údajů. Například,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projekt{#project} 
*   [ **projekt** ](#project)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je VOLITELNÝ atribut pro identifikaci projektu, kterého je datový soubor součástí. Například,
    ```
    <att name="project">GTSPP</att>  
    ```
Pokud data nejsou součástí projektu, nepoužívejte tento atribut. Ve srovnání s[creator\\_name](#creator_name), to je zaměřeno na projekt (osoba nebo organizace, které se mohou účastnit více projektů) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob, jak identifikovat osobu, organizaci nebo projekt, který vydává tento datový soubor. Například,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Například, jste vydavatel, pokud jiná osoba nebo skupina[vytvořen](#creator_name)data a vy jste jen re-serving přesERDDAP. Pokud se "vydavatel" ve skutečnosti nevztahuje na datový soubor, vynechat tento atribut. Ve srovnání s[creator\\_name](#creator_name), vydavatel pravděpodobně nijak významně neupravoval nebo znovu nezpracovával data; vydavatel jen dodává data do nového místa.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je DOPORUČENÝ způsob identifikace e-mailové adresy (správně formátovaný např. john\\_smith@great.org) který poskytuje způsob, jak kontaktovat vydavatele. Například,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Pokud se "vydavatel" ve skutečnosti nevztahuje na datový soubor, vynechat tento atribut.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je RECOMMENDED způsob, jak identifikovat URL pro organizaci, která zveřejnila soubor údajů, nebo URL s informacemi vydavatele o tomto souboru dat (ale to je spíš účel[infoUrl](#infourl)) . Například,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Pokud se "vydavatel" ve skutečnosti nevztahuje na datový soubor, vynechat tento atribut.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)je globální atribut String (není z žádné normy) uvádí, zda se jedná o datový soubor v reálném čase. Například,
    ```
    <att name="real\\_time">true</att>  
    ```
Jestli je to lež (výchozí) ,ERDDAP™bude cache odpovědi na žádosti o typy souborů, kde celý soubor musí být vytvořen předERDDAP™může začít odesílat odpověď uživateli a znovu je používat po dobu cca 15 minut (např..nc, . png) .
Jestli je to pravda,ERDDAP™nebude nikdy cache souborů odezvy a vždy vrátí nově vytvořené soubory.
###### sourceUrlatribut{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)je globální atribut s URL zdroje dat. Například,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (ale dát to všechno na jeden řádek) 
    *   ERDDAP™obvykle vytváří tento globální atribut automaticky. Dvě výjimky jsou EDDTableFromHyraxSoubory a EDDTableFromThreddsFiles.
    * Pokud jsou zdrojem místní soubory a soubory byly vytvořeny vaší organizací, použijte
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Pokud je zdrojem místní databáze a data byla vytvořena vaší organizací, použijte
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlje důležité, protože umožňuje klientům vrátit se zpět k původnímu zdroji dat.
    *   sourceUrlje jedinečná proERDDAP. Není to ze standardu metadat.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (z[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) je atribut DOPORUČENÉ k identifikaci názvu kontrolované slovní zásoby, ze které proměnné[standard\\_name](#standard_name)Jsou obsazeny. Například,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
pro verzi 77[Standardní tabulka názvu CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (pouze pro soubory EDDTable) je globální atribut, který umožňuje zadat čárku oddělený seznam [&lt;dataVariable&gt;] (# Dataproměnná)  [destinationName](#destinationname)s pro identifikaci proměnných s omezeným počtem hodnot (uvedl jiný způsob: proměnné, pro které má každá z hodnot mnoho duplikátů) . Například,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Pokud je tento atribut přítomen, bude mít datový soubor *datasetID* .subset webové stránky (a odkaz na něj na každém seznamu souborů údajů) což umožňuje uživatelům rychle a snadno vybrat různé podmnožiny dat.
    * Pokaždé, když je soubor dat načten,ERDDAPzatížení a ukládání na disku stůl se všemi odlišnými () kombinace podskupiny Hodnoty proměnné.ERDDAP™může číst, žesubsetVariablesstůl a velmi rychle jej zpracovat (zejména ve srovnání se čtením spousty datových souborů nebo získáním dat z databáze nebo jiné externí služby) .
    * To umožňujeERDDAP™dělat 3 věci:
        1. UmožňujeERDDAP™vložit seznam možných hodnot do seznamu dropdownů na formulář Data Access, vytvořit grafickou webovou stránku a .subset webové stránky.
        2. UmožňujeERDDAP™nabídnout .subset webovou stránku pro tento datový soubor. Tato stránka je zajímavá, protože je snadné najít platné kombinace hodnot těchto proměnných, které pro některé datové soubory a některé proměnné je velmi, velmi těžké (téměř nemožné) . Pak všechny uživatelské požadavky pro odlišné () Podkategorie Proměnná data budou velmi rychlá.
        3. Pokud existuje požadavek uživatele, který odkazuje pouze na podmnožinu těchto proměnných,ERDDAP™může rychle přečístsubsetVariablesstůl a reagovat na žádost. To může ušetřit spoustu času a úsilí proERDDAP.
    * PořadídestinationNames určujete pořadí na *datasetID* .subset webová stránka, takže obvykle zadat nejdůležitější proměnné nejprve, pak nejméně důležité. Například pro datové soubory s daty časových řad pro několik stanic můžete použít například:
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
tak, aby hodnoty byly tříděny podle stanice\\_id.
    * Samozřejmě, je to vaše volba, které proměnné zahrnout dosubsetVariablesseznam, ale navrhované použití je:
        
Obecně uveďte proměnné, pro které chceteERDDAP™Zobrazení seznamu možností pro stažení na datovém formuláři datového přístupu datového souboru (.html) a Make-A-Graf (.graph) webové stránky.
        
Obecně uveďte proměnné s informacemi o vlastnostech datového souboru (stanice, profily a/nebo trajektorie, zejména z[cdm\\_timeseries\\_variables](#cdm_timeseries_variables),[cdm\\_profile\\_variables](#cdm_profile_variables),[cdm\\_trajektory\\_variables](#cdm_trajectory_variables)) . Pro tyto proměnné existuje jen několik různých hodnot, takže dobře fungují se seznamem drop-down.
        
Nezahrnujte nikdy žádné datové proměnné spojené s jednotlivými pozorováními (např. čas, teplota, slanost, aktuální rychlost) vsubsetVariablesseznam. Existuje příliš mnoho různých hodnot pro tyto proměnné, takže seznam drop-down by bylo pomalé zatížení a je těžké pracovat s (nebo nepracuje) .
        
    * Pokud je počet různých kombinací těchto proměnných větší než asi 1 000 000, měli byste zvážit omezenísubsetVariablesže jste určit snížit počet různých kombinací pod 1 000 000; jinak, *datasetID* .subset webové stránky mohou být generovány pomalu. V extrémních případech nesmí soubor údajů zadávatERDDAP™protože generování seznamu odlišných kombinací využívá příliš mnoho paměti. Pokud ano, musíte odstranit některé proměnné zsubsetVariablesseznam.
    * Pokud je počet různých hodnot jedné podmnožiny větší než 20 000, měli byste zvážit, že do seznamusubsetVariables; jinak, to trvá dlouhou dobu, aby předal *datasetID* .subset, *datasetID* .graf a *datasetID* .html webové stránky. Také, na Mac, je velmi těžké, aby výběry ze seznamu drop down s více než 500 položek, protože chybí scroll bar. Kompromisem je: odstranění proměnných ze seznamu, kdy uživatelé pravděpodobně nevyberou hodnoty ze seznamu dolů.
    * Měli byste otestovat každý soubor dat, abyste zjistili, zdasubsetVariablesnastavení je v pořádku. Pokud je zdrojový datový server pomalý a trvá to příliš dlouho (nebo selže) stáhnout data, buď snížit počet určených proměnných nebo odstranitsubsetVariablesglobální atribut.
    * Subset Proměnné jsou velmi užitečné. Takže pokud je váš datový soubor vhodný, vytvořte prosímsubsetVariablesatribut.
    * EDDTableFromSOSautomaticky přidává
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
při vytvoření datového souboru.
        * Možné varování: pokud uživatel používá *datasetID* .subset webová stránka vybere hodnotu, která má kočárReturn nebo nový znak, *datasetID* .subset selže.ERDDAP™nemůže pracovat kolem tohoto problému, protože některé HTML detaily. V každém případě je téměř vždy dobrý nápad odstranit kočárReturn a nové znaky z dat. Chcete-li vám pomoci vyřešit problém, pokud EDDTable.subsetVariablesMetoda DataTable vERDDAPdetekuje hodnoty dat, které způsobí potíže, e-mailem varování se seznam urážlivých hodnot na e-mail Všechno Pro e-mailové adresy uvedené v setup.xml. Tak víte, co je třeba napravit.
        *    **Předvyrobené podskupinové tabulky.** Normálně, kdyžERDDAP™načítá soubor údajů, požaduje odlišné () podmnožina proměnných datové tabulky ze zdroje dat, jen přes normální požadavek na data. V některých případech nejsou tato data dostupná ze zdroje dat nebo jejich získání ze zdroje dat může být na serveru datového zdroje obtížné. Pokud ano, můžete poskytnout tabulku s informacemi v.jsonnebo .csv soubor se jménem *tomcat* / content/ erddap/ subset/ *datasetID* .json  (nebo .csv) . Pokud je přítomen,ERDDAP™bude číst jednou při načtení datového souboru a používat jej jako zdroj podmnožinových dat.
            * Pokud dojde k chybě při jejím čtení, soubor souborů selže v načtení.
            * Musí mít stejné názvy sloupců. (například stejný případ) jako&lt;subsetVariables&gt;, ale sloupce mohou být v libovolném pořadí.
            * Může mít navíc sloupce (budou odstraněny a nově uvolněné řádky budou odstraněny) .
            * Chybějící hodnoty by měly chybět (není falešný čísla jako -99) .
            *   .jsonsoubory může být trochu těžší vytvořit, ale vypořádat se s Unicode znaky dobře..jsonsoubory jsou snadno vytvořit, pokud je vytvořit sERDDAP.
            * .csv soubory jsou snadno pracovat s, ale vhodné pouze pro ISO 8859-1 znaků. .csv soubory MUSÍ mít jména sloupců v prvním řádku a data v následujících řádcích.
        * Pro velké soubory dat nebo kdy&lt;subsetVariables&gt; je chybně konfigurována, tabulka kombinací hodnot může být dostatečně velká, aby způsobila příliš mnoho dat nebo chyby OutOfMemory. Řešením je odstranit proměnné ze seznamu&lt;subsetVariables&gt; pro které existuje velký počet hodnot, nebo odstranit proměnné podle potřeby, dokud velikost této tabulky není přiměřená. Bez ohledu na chybu, částiERDDAP™kterésubsetVariablessystém nefunguje dobře (např., webové stránky se načítají velmi pomalu) když je příliš mnoho řádků (např. více než milion) v tom stole.
        *   subsetVariablesnemá nic společného s určením, které proměnné mohou uživatelé používat v omezeních, tj. jak mohou uživatelé požadovat podmnožiny datového souboru.ERDDAP™vždy umožňuje omezení odkazovat na některou z proměnných.
###### Časové jednotky{#time-units} 
[Čas a časové razítko](#time-units)sloupce by měly mít ISO 8601:2004 (E) Zformátované datum+čas Z řetězce (např. 1985-01-31T15:31:00Z) .
             
###### shrnutí{#summary} 
*   [ **shrnutí** ](#summary)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat) je požadovaný globální atribut s dlouhým popisem datového souboru (obvykle&lt;500 znaků). Například,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Buď je soubor globální[zdrojAtributy](#global-attributes)nebo jeho globální&lt;addAttributes&gt; Musí obsahovat tento atribut.
    * shrnutí je velmi důležité, protože umožňuje klientům přečíst popis datového souboru, který má více informací než název, a tím rychle pochopit, co je datový soubor.
    * Poradenství: napište shrnutí, aby bylo možné popsat datový soubor náhodné osobě, se kterou se setkáte na ulici nebo kolegovi. Nezapomeňte zahrnout[Pět W a jedna H.](https://en.wikipedia.org/wiki/Five_Ws): Kdo vytvořil soubor dat? Jaké informace byly shromážděny? Kdy byly shromážděny údaje? Kde ho sebrali? Proč byl vybrán? Jak byla shromážděna?
    *   ERDDAP™zobrazí souhrn ve formuláři pro přístup k datům datového souboru ( *datasetID* .html) , Vytvořit graf webové stránky ( *datasetID* .graph) , a další webové stránky.ERDDAP™souhrn používá při vytváření dokumentů FGDC a ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (volitelnýERDDAP- specifický atribut globálních metadat, nikoli z žádného standardu) specifikuje zjednodušujícím způsobem, kdy jsou data pro datový soubor v reálném čase považována za zastaralá, specifikovaná jakonow- *nJednotky* Například:now-2 dny pro data, která se obvykle objevují 24-48 hodin po časové hodnotě. Pro předpověď dat použijte nyní **+**  *nJednotky* , například nyní+6dny pro předpověď dat, která jsou maximálně 8d v budoucnu. (Viz[now- *nJednotky* Popis syntaxe](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Pokud je maximální časová hodnota datového souboru čerstvější než stanovená doba, považuje se datový soubor za aktuální. Je-li maximální časová hodnota starší než stanovená doba, považuje se datový soubor za aktuální. Pro zastaralé datové soubory existuje pravděpodobně problém se zdrojem dat, takžeERDDAP™není schopen získat přístup k údajům z novějších časových bodů.
    
ThetestOutOfDatehodnota je zobrazena jako sloupec ve sloupci[allDatasetsSoubor údajů](#eddtablefromalldatasets)ve VašemERDDAP. Používá se také k výpočtu indexu OutOfDate, což je další sloupec vallDatasetsSoubor dat.
Pokud index je&lt;1, datový soubor se považuje za aktuální.
Pokud index je&lt;=1, datový soubor se považuje za zastaralý.
Pokud index je&lt;=2 je datový soubor považován za velmi zastaralý.
    
ThetestOutOfDatehodnota je také použitaERDDAP™generovat https://*yourDomain*/erddap/outOfDateDatasets.html webová stránka ([příklad](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) který ukazuje soubory údajů, které mají&lt;testOutOfDate&gt; značky, s datovými soubory zařazenými podle toho, jak jsou zastaralé. Pokud změníte typ souboru (od .html do .csv,.jsonlCSV,.nc,.tsv, ...) , můžete získat tyto informace v různých formátech souborů.
    
Pokud je to možné,[GenerovatDatasetsXml](#generatedatasetsxml)přidává atestOutOfDateatribut globálníaddAttributesdatového souboru. Tato hodnota je návrh založený na informacích dostupných pro GenerateDatasetsXml. Pokud hodnota není vhodná, změňte ji.
    
"Ven-of-date" zde je velmi odlišné od [&lt;reload EveryNMinutes &gt;] (# reload everynminutes) , který se zabývá tím, jak aktuálníERDDAPJe to znalost datového souboru. The&lt;testOutOfDate&gt; systém předpokládá, žeERDDAPZnalost datového souboru je aktuální. K otázce&lt;testOutOfDate&gt; řešení je: zdá se, že je něco špatně se zdrojem dat, což způsobuje, že novější údaje nejsou přístupnéERDDAP?
    
###### název{#title} 
*   [ **název** ](#title)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat) je požadovaný globální atribut s krátkým popisem datového souboru (obvykle&lt;= 95 znaků). Například,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Buď je soubor globální[zdrojAtributy](#global-attributes)nebo jeho globální&lt;addAttributes&gt; Musí obsahovat tento atribut.
    * název je důležitý, protože každý seznam souborů dat předloženýchERDDAP  (jiné než výsledky hledání) uvádí data v abecedním pořadí podle názvu. Takže pokud chcete určit pořadí souborů dat, nebo mít některé soubory souborů seskupené dohromady, musíte vytvořit tituly s ohledem na to. Mnoho seznamů souborů údajů (například v reakci na vyhledávání kategorií) , Zobrazit podmnožinu celého seznamu a v jiném pořadí. Název každého datového souboru by tedy měl zůstat sám.
    * Pokud název obsahuje slovo "OCHRANA" (všechna velká písmena) , pak datový soubor dostane nižší pořadí při vyhledávání.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** ] (#oxisvariable) se používá k popisu rozměru (také nazývané "osa") .
ProEDDGridSoubory údajů, jeden nebo víceaxisVariableŠtítky jsou povinné a všechny[dataVariableán](#datavariable)vždy sdílet / používat všechny proměnné osy. ([Proč?](#why-just-two-basic-data-structures) [Co když ne?](#dimensions))   
Pro každý rozměr datových proměnných musí existovat proměnná osy.
Proměnné osy MUSÍ být specifikovány v pořadí, v jakém je datové proměnné používají.
(EDDTable soubory nelze použít&lt;axisVariable&gt; značky.)
Příkladem je:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; podporuje tyto podtagy:
###### &lt;sourceName\\&gt;{#sourcename} 
* [&lt;sourceName\\&gt;] (#zdrojové jméno) -- název datového zdroje proměnné. To je jméno, kteréERDDAP™použije se při požadavku na údaje ze zdroje údajů. To je jméno, kteréERDDAP™bude hledat, kdy jsou data vrácena ze zdroje dat. Tohle je případ citlivý. To je nutné.
###### &lt;destinationName\\&gt;{#destinationname} 
* [&lt;destinationName\\&gt;] (Název místa určení) je název proměnné, která bude zobrazena a použitaERDDAP™uživatelé.
    * Tohle je volitelné. Pokud chybí,sourceNamepoužívá se.
    * To je užitečné, protože umožňuje změnit záhadné nebo podivnésourceName.
    *   destinationNameje případ citlivý.
    *   destinationNameMUSÍME začít písmenem (A-Z, a-z) a MUSÍ následovat 0 nebo více znaků (A-Z, a-z, 0-9 a \\_) . ('-' bylo dovoleno předtímERDDAP™verze 1.10.) Toto omezení umožňuje, aby názvy os proměnných byly stejné vERDDAP™, ve souborech odpovědí a ve všech softwarech, kde budou tyto soubory použity, včetně programovacích jazyků (jakoPython,MatlabaJavaSkript) kde existují podobná omezení pro názvy proměnných.
    * InEDDGriddatové soubory,[zeměpisná délka, zeměpisná šířka, výška, hloubka a čas](#destinationname)proměnné osy jsou zvláštní.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addattributes) definuje VOLITELNOU sadu atributů ( *název* = *hodnota* ) které jsou přidány do atributů zdroje pro proměnnou, aby se kombinované atributy pro proměnnou.
Pokud proměnná je[zdrojAtributy](#variable-addattributes)nebo&lt;addAttributes&gt; zahrnují[scale\\_factorneboadd\\_offset](#scale_factor)atributy, jejich hodnoty budou použity k vybalení dat ze zdroje před odesláním klientovi
     (výsledek Hodnota = zdroj Hodnota \\*scale\\_factor+add\\_offset) . Vybalená proměnná bude stejného datového typu (například plovák) jakoscale\\_factoraadd\\_offsethodnoty.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** ] (# Dataproměnná) je požadováno (pro téměř všechny datové soubory) Štítek uvnitř&lt;Soubor údajů &gt; značka, která se používá k popisu datové proměnné. Musí být 1 nebo více případů této značky. Příkladem je:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; podporuje tyto podtagy:
###### &lt;sourceName&gt;{#sourcename-1} 
* [&lt;sourceName&gt;] (#zdrojové jméno) -- název datového zdroje proměnné. To je jméno, kteréERDDAP™použije se při požadavku na údaje ze zdroje údajů. To je jméno, kteréERDDAP™bude hledat, kdy jsou data vrácena ze zdroje dat. Tohle je případ citlivý. To je nutné.
###### Skupiny{#groups} 
CF přidala podporu pro skupiny s CF v1.8. Od ~2020,NetCDFnástroje podpory uvedení proměnných do skupin ve.ncSložka. V praxi to znamená, že proměnné mají dlouhý název, který identifikuje skupinu (án) a název proměnné, například skupina1a/group2c/varName ).ERDDAP™podporuje skupiny převodem "/" v proměnné&lt;sourceName&gt; do "\\_" je v proměnné&lt;destinationName&gt; například skupina1a\\_group2c\\_varName . (Když to vidíte, měli byste si uvědomit, že skupiny nejsou nic víc než syntaxní sjezd.) Pokud jsou proměnné uvedeny vERDDAP™, Všechny proměnné ve skupině se objeví společně, napodobující základní skupinu.\\[PokudERDDAP™, zejména GenerateDatasets Xml, nevystupuje tak dobře, jak by to šlo se zdrojovými soubory, které mají skupiny, prosím, odeslat vzorek soubor Chrisovi. John at noaa.gov .\\]

Databáze EDDTableFromFoles mohou používat speciálně kódované pseudosourceNames definovat nové datové proměnné, např. pro podporu globálního atributu jako datové proměnné. Viz[Tato dokumentace](#pseudo-sourcenames).
###### HDFStruktura{#hdf-structures} 
Začneme sERDDAP™v2.12EDDGridFromNcFiles aEDDGridFromNcFiles Vybalené mohou číst data z "struktur" v.nc4 a.hdf4 soubory. Pro identifikaci proměnné, která je ze struktury,&lt;sourceName&gt; musí používat formát: *FullStructureName* | *Název člena* , například skupina1/myStruct|Můj pane.

###### Název zdroje pevné hodnoty{#fixed-value-sourcenames} 
V souboru EDDTable, pokud chcete vytvořit proměnnou (s jedinou pevnou hodnotou) který není ve zdrojovém souboru, použijte:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Prvotní rovná se značka říkáERDDAP™to a fixed Hodnota bude následovat.

* Pro číselné proměnné musí být pevná hodnota jedinou konečnou hodnotou nebo NaN (necitlivé případy, např. \\=NaN) .
* Pro proměnné String musí být pevná hodnota jednoduchá,[String ve stylu JSON](https://www.json.org/json-en.html)  (se speciálními znaky utekl s \\ znaky) , např. \\="Můj \\"Special\\" String" .
* Pro proměnnou časového razítka uveďte pevnou hodnotu jako číslo v"seconds since 1970-01-01T00:00:00Z"a použití
jednotky=sekundy od 1970-01-01T00:00:00Z .
    
Ostatní značky pro&lt;dataVariable&gt; pracovat jako by to byla pravidelná proměnná.
Například vytvořit proměnnou zvanou nadmořská výška s pevnou hodnotou 0,0 (plavat) , použití:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Pro neobvyklé situace můžete dokonce určitactual\\_rangeaddAttribute, který přepíše očekávané hodnoty destinationMin a destinationMax (což by se jinak rovnalo pevné Hodnota) .
 
###### Název zdroje skriptu/zadané proměnné{#script-sourcenamesderived-variables} 
Začneme sERDDAP™v2.10, v an[EDDTableFromFoles](#eddtablefromfiles),[EDDtableFromDatabase](#eddtablefromdatabase)nebo[EDDTableFromFileNames](#eddtablefromfilenames)Soubor údajů,&lt;sourceName&gt; může být
výraz (rovnice, která hodnotí jedinou hodnotu) , pomocí formátu
```
    <sourceName>=*expression*</sourceName>  
```
nebo scénář (série příkazů, které vrací jedinou hodnotu) , pomocí formátu
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™spoléhá na[Projekt Apache](https://www.apache.org/) [JavaJazyk výrazu (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licence:[Apač](https://www.apache.org/licenses/LICENSE-2.0)) vyhodnotit výrazy a spustit skripty.
Výpočet pro danou novou proměnnou se provádí v rámci jednoho řádku výsledků, opakovaně pro všechny řádky.
Výrazy a skripty používajíJava- aJavaSyntaxe podobná skriptu a může použít některý z
[provozovatele a metody, které jsou zabudovány do JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Skripty mohou také používat metody (funkce) z těchto tříd:
*   [Kalendář2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), což je obal pro některé statické, časové a kalendářové metody v com.cohort.util.Calendar2 ([licence](/acknowledgements#cohort-software)) . Například,
Kalendář2.parseToEpochSecond ( *zdrojTime, datum TimeFormat* ) bude zkoumat zdroj Časový řetězec přes datumTimeFormat řetězec a vrátit"seconds since 1970-01-01T00:00:00Z"  (epochsekundární) Dvojitou hodnotu.
*   [Matematika](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), což je obal pro téměř všechny statické, matematicky související metody v[Java.lang. Matematika](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Například, Math.atan2 ( *y, x* ) přijímá obdélníkové souřadnice (y, x) a vrací polární souřadnice (pole dvojníků s\\[r, theta\\]) .
*   [Matematika2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), což je obal pro téměř všechny statické matematicky související metody v com.cohort.util. Matematika2 ([licence](/acknowledgements#cohort-software)) . Například,
Matematika 2. kolo ( *d, nPlaces* ) bude zaokrouhlit d na uvedený počet číslic vpravo od desetinné hodnoty.
* String, který vám umožní přístup ke všem statickým metodám souvisejícím se stringem[Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). String objects inERDDAP™výrazy a skripty mohou použít některý z jejich souvisejícíchJavametody, jak je popsáno v java.lang. Provázková dokumentace. Například String.valueOf (d) změní dvojitou hodnotu d na řetězec (i když můžete také použít ""+d) .
*   [String2color](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), který je obalem pro většinu statických, String- a pole souvisejících metod v com.cohort.util.String2 ([licence](/acknowledgements#cohort-software)) . Například String2.zeropad ( *číslo, nDigits* ) přidá 0 nalevo od čísla String tak, aby celkový počet číslic byl nDigits (např. String2.zeropad ("6," 2) vrátí "06") .
*   [řádek](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), který má nestatické metody pro přístup k datům z různých sloupců v aktuálním řádku tabulky zdrojových dat. Například řádek.sloupecString ("rok") čte hodnotu ze sloupce "rok" jako String, zatímco řádek. sloupec Int ("rok") čte hodnotu ze sloupce "rok" jako celé číslo.

Z bezpečnostních důvodů nemohou výrazy a skripty používat jiné třídy než ty 6.ERDDAP™vymáhá toto omezení vytvořením výchozí černé listiny (které černé listy všechny třídy) a pak bílý seznam (který výslovně umožňuje 6 výše popsaných tříd) . Pokud potřebujete jiné metody a/nebo jiné třídy, abyste mohli pracovat, pošlete prosím své žádosti Chrisovi. John at noaa.gov .
    
###### Účinnost
Pro soubory EDDTableFromFoles je pouze velmi, velmi minimální (pravděpodobně není patrné) zpomalení žádostí o údaje z těchto proměnných. Pro EDDTableFromDatabase existuje obrovský trest za rychlost pro žádosti, které zahrnují omezení těchto proměnných (např. (&longitude0360&gt;30&longitude0360)&lt;40) protože omezení nelze přenést do databáze, takže databáze musí vrátit mnohem více dat doERDDAP™  (který je velmi časově náročný) takžeERDDAP™může vytvořit novou proměnnou a uplatnit omezení. Abych se vyhnul nejhoršímu případu (kde nejsou do databáze přenesena žádná omezení) ,ERDDAP™hodí chybovou zprávu, aby databáze nemusela vrátit celý obsah tabulky. (Pokud to chcete obejít, přidejte omezení ke sloupci non-skriptu, který bude vždy pravdivý, např. &time&lt;3000-01-01.) Z tohoto důvodu, s EdDtableFromDatabase, je pravděpodobně vždy lepší vytvořit odvozený sloupec v databázi spíše než použítsourceName= popisERDDAP.

###### Přehled, jak vyjádřit (Nebo skript) Používá se:
V reakci na žádost uživatele o tabulková data,ERDDAP™získává data ze série zdrojových souborů. Každý zdrojový soubor vytvoří tabulku syrových (přímo ze zdroje) data.ERDDAP™pak prochází tabulkou surových dat, řádek po řádku, a vyhodnotí výraz nebo skript jednou pro každý řádek, aby se vytvořil nový sloupec, který má tento výraz nebo skript jakosourceName.
    
###### GenerovatDatasetsXml
Všimněte si, že generovatDatasety Xml je zcela nevědomý, když je potřeba vytvořit proměnnou s&lt;sourceNameOstatní *výraz* &lt;/sourceName&gt;. Musíte vytvořit proměnnou vdatasets.xmlručně.

###### Příklady vyjádření:
Zde jsou některé kompletní příklady datových proměnných, které používají výraz pro vytvoření nového sloupce dat. Očekáváme, že tyto příklady (a jejich varianty) bude zahrnovat asi 95% využití všech získaných výrazůsourceNames.

###### Kombinace samostatných "datum" a"time"sloupce do jednotného časového sloupce:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
TosourceNamevýraz dělá nový"time"sloupec konkatováním Stringových hodnot z "datum" (yyyy-MM-dd) a"time"  (HH:mm:ss) sloupce v každém řádku zdrojového souboru a přeměnou tohoto řetězce na"seconds since 1970-01-01"  (epochsekundární) Dvojitou hodnotu.

Nebo kurz, budete muset přizpůsobit řetězec časového formátu se vypořádat s konkrétním formátem v každém souboru zdroj datum a čas sloupce, viz
[dokumentace časových jednotek](#string-time-units).

Technicky vzato nemusíš používat Kalendář2.parseToEpochSecond () převést kombinované datum+čas na epochsekundy. Můžete prostě předat datum + čas String naERDDAP™a uveďte formát (např.
yyyy-MM-dd'T'HH:mm:ss'Z' přes atribut jednotek. Ale existují významné výhody pro převod do epochSekund -- zejména, EDDTableFromFoles pak může snadno sledovat rozsah časových hodnot v každém souboru a tak rychle rozhodnout, zda se podívat do daného souboru při reakci na žádost, která má časová omezení.

S tím souvisí potřeba vytvořit jednotný sloupec date+time ze zdroje se samostatným rokem, měsícem, datem, hodinou, minutou, sekundou. Řešení je velmi podobné, ale budete často muset nula-pad mnoho z polí, takže, například, měsíc (1 - 12) a datum (1 - 31) vždy mají 2 číslice. Zde je příklad s rokem, měsícem, datem:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
S tím související problém je potřeba vytvořit jednotný sloupec zeměpisné šířky nebo délky kombinací dat v samostatném stupni, minutách a sekundách sloupce, každý uložen jako celá čísla. Například,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Převod sloupce s názvem "lon" s hodnotami délky od 0 do 360° do sloupce nazvaného "loučení" s hodnotami od -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
TosourceNamevýraz dělá nový sloupec "délka" převodem dvojité hodnoty ze sloupce "lon" v každém řádku zdrojového souboru (pravděpodobně s hodnotami 0 - 360) , A tím, že převést to na -180 na 180 dvojnásobek hodnoty.

Pokud místo toho chcete převést hodnoty výchozí délky -180 - 180° na 0 - 360°, použijte
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Pojmenování dvou proměnných délky:
Pokud bude mít datový soubor 2 proměnné délky, doporučujeme použítdestinationName= délka pro proměnnou -180 - 180° adestinationName=longitude0360 (a dlouhý název=\\"Longitude 0-360°") u proměnné 0 - 360°. To je důležité, protože uživatelé někdy používají Advanced Search k vyhledávání dat v rámci určitého rozsahu délky. Toto vyhledávání bude fungovat lépe, pokud má zeměpisná délka trvale -180 - 180° hodnot pro všechny datové soubory. Také geospantial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting a Easternmost\\_Eastings globální atributy budou pak nastaveny konzistentním způsobem (s hodnotami délky -180 až 180°) ;
    
###### Převod sloupce s názvem "TempF" s hodnotami teploty ve stupni\\_ F do sloupce s názvem "TempC" s teplotami ve stupních\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
TosourceNamevýraz dělá nový sloupec "tempC" převodem plovákového stupně\\_ Hodnota F ze sloupce "TempF" v každém řádku zdrojového souboru do plovoucího stupně\\_ Hodnota C.

Všimněte si, že váš datový soubor může mít jak původní teplotu F proměnná a nová teplota C proměnná tím, že má jinou proměnnou s
```
    <sourceName>tempF</sourceName>
```
###### Převod "rychlost" a "směr" sloupců do dvou sloupců s u,v komponenty
* Pro vytvoření proměnné U použijte
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Pro vytvoření proměnné v použijte
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Nebo, vzhledem k u, v:
* K vytvoření proměnné rychlosti použijte
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Pro vytvoření směrové proměnné použijte
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Příklad skriptu:
Zde je příklad použití skriptu, nejen výraz, jakosourceName. Očekáváme, že scénáře, na rozdíl od výrazů, nebudou potřeba často. V tomto případě je cílem vrátit chybějící hodnotu non-NaN (- 99) pro hodnoty teploty mimo určitý rozsah. Všimněte si, že skript je část za "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Tvrdá vlajka
Pokud změníte výraz nebo skript definovaný vsourceName, musíte nastavit[Tvrdá vlajka](/docs/server-admin/additional-information#hard-flag)pro datový soubor, takžeERDDAP™smaže všechny cachované informace pro datový soubor a znovu přečte každý datový soubor (pomocí nového výrazu nebo skriptu) příště nabije soubor dat. Alternativně můžete použít[DasDds](#dasdds)což odpovídá nastavení tvrdé vlajky.

###### Procentuální kód
To je jen vzácně relevantní: Protože výrazy a scénáře jsou napsány vdatasets.xml, což je XML dokument, musíte procent enkódovat&lt;, \\&gt; a & znaky v výrazech a skriptech jako&lt;, &gt; a &amp; .

###### Časté problémy
Běžný problém je, že vytvoříte proměnnou ssourceName= *výraz* ale výsledný sloupec dat má chybějící hodnoty. Případně některé řádky nového sloupce mají chybějící hodnoty a vy si myslíte, že by neměly. Základní problém je, že něco je špatně s výrazem aERDDAPje převést tuto chybu na chybějící hodnotu. Abych vyřešil problém,

* Podívej se na ten výraz a uvidíš, jaký by mohl být problém.
* Podívejte se dovnitř.[log.txt](/docs/server-admin/additional-information#log), která zobrazí první chybovou zprávu vygenerovanou během vytvoření každého nového sloupce.

Časté příčiny jsou:

* Použil jsi špatný případ. Výrazy a scénáře jsou případově citlivé.
* Vynechal jsi jméno třídy. Například, musíte použít Math.abs () , nejen svaly () .
* Nedělala jsi typ konverze. Například pokud je datovým typem parametru String a máte dvojí hodnotu, musíte převést dvojitou na String přes ""+d.
* Název sloupce ve výrazu neodpovídá přesně názvu sloupce v souboru (nebo jméno může být v některých souborech jiné) .
* Ve výrazu je chyba syntaxe (např. chybějící nebo extra ") ").

Pokud uvíznete nebo potřebujete pomoc,
prosím uveďte podrobnosti a viz naše[oddíl o získání dodatečné podpory](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [&lt;destinationName&gt;] (Název místa určení) -- název proměnné, která bude zobrazena a použitaERDDAP™uživatelé.
    * Tohle je volitelné. Pokud chybí,[sourceName](#sourcename)používá se.
    * To je užitečné, protože umožňuje změnit záhadné nebo podivnésourceName.
    *   destinationNameje případ citlivý.
    *   destinationNameMUSÍME začít písmenem (A-Z, a-z) a MUSÍ následovat 0 nebo více znaků (A-Z, a-z, 0-9 a \\_) . ('-' bylo dovoleno předtímERDDAP™verze 1.10.) Toto omezení umožňuje vERDDAP™, ve souborech odpovědí a ve všech softwarech, kde budou tyto soubory použity, včetně programovacích jazyků (jakoPython,MatlabaJavaSkript) kde existují podobná omezení pro názvy proměnných.
    * V datových souborech EDDTable[zeměpisná délka, zeměpisná šířka, výška (nebo hloubka) , a čas](#destinationname)datové proměnné jsou zvláštní.
             
###### &lt;údaje Typ&gt;{#datatype} 
* [&lt;dataType&gt;] (#datatyp) -- určuje datový typ pocházející ze zdroje. (V některých případech například při čtení dat ze souborů ASCII určuje, jak by měla být data pocházející ze zdroje uložena.) 
    * To vyžadují některé typy souborů údajů a jiné je ignorují. Typy datových souborů, které to vyžadují pro jejichdataVariablejsou:EDDGridFromXxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFromNOS, EDDTableFromSOS. Jiné typy souborů ignorují tuto značku, protože získávají informace ze zdroje.
         
    * Platné hodnoty jsou některé z norem[ERDDAP™datové typy](#data-types)plus boolean (viz níže) . Názvy DataType jsou citlivé na případy.
         
###### booleovské údaje{#boolean-data} 
*   ["Boolean"](#boolean-data)je zvláštní případ.
    * Vnitřní,ERDDAP™nepodporuje booleánský typ, protože booleáni nemohou ukládat chybějící hodnoty a většina typů souborů nepodporuje booleans. Také,DAPnepodporuje booleany, takže neexistuje standardní způsob, jak se ptát na booleovské proměnné.
    * Upřesnění "boolean" pro data Zadatdatasets.xmlzpůsobí uložení a zastoupení booleánských hodnot jako bajtů: 0=false, 1=true, 127=missing\\_value.
    * Uživatelé mohou určit omezení pomocí číselných hodnot (například "isAlive=1") .
    *   ERDDAP™Správci někdy potřebují použít data "boolean" Zadatdatasets.xmlříctERDDAP™jak komunikovat se zdrojem dat (např. pro čtení booleánských hodnot z relační databáze a jejich převod na 0, 1, nebo 127) .
         
* Pokud chcete změnit proměnnou dat z datového typu ve zdrojových souborech (například krátká) do některých dalších údajů Typ datového souboru (např. int) , Nepoužívejte&lt;dataType&gt; zadat, co chcete. (Pracuje pro některé typy souborů dat, ale ne pro jiné.) Místo toho:
    * Použití&lt;dataType&gt; zadat, co je v souborech (například krátká) .
    * V&lt;addAttributes&gt; pro proměnnou, přidat a[scale\\_factor](#scale_factor)atribut s novými údaji Typ (např. int) a hodnotu 1, například,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addattributes) -- definuje soubor atributů ( *název* = *hodnota* ) které jsou přidány do atributů zdroje pro proměnnou, aby se kombinované atributy pro proměnnou. Tohle je volitelné.
Pokud proměnná je[zdrojAtributy](#variable-addattributes)nebo&lt;addAttributes&gt; zahrnují[scale\\_factorneboadd\\_offset](#scale_factor)atributy, jejich hodnoty budou použity k vybalení dat ze zdroje před odesláním klientovi. Vybalená proměnná bude stejného datového typu (například plovák) jakoscale\\_factoraadd\\_offsethodnoty.
        
###### Proměnná&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Variabilní Atributy / Proměnná&lt;addAttributes&gt; ** ] (#variable-addattributes) --&lt;addAttributes&gt; je VOLITELNÁ tag v rámci&lt;axisVariable&gt; nebo&lt;dataVariable&gt; tag, který se používá ke změně atributů proměnné.
    
    *    ** Použít proměnné&lt;addAttributes&gt; změnit atributy proměnné. ** ERDDAP™kombinuje atributy proměnné ze zdroje datového souboru (** zdrojAtributy **) a proměnná je** addAttributes **který definujete vdatasets.xml  (které mají přednost) k vytvoření proměnné "** kombinovanéAtributy ** "což je coERDDAP™uživatelé vidí. Můžete tedy použítaddAttributesredefinovat hodnoty zdrojových atributů, přidat nové atributy nebo odstranit atributy.
    * Viz [ ** &lt;addAttributes&gt; **informace] (#addattributy) která se vztahuje na globální a variabilní** &lt;addAttributes&gt; ** .
    *   ERDDAP™hledá a využívá mnoho z těchto atributů různými způsoby. Například, barevnéBar hodnoty jsou nutné, aby proměnná k dispozici přesWMS, tak, že mapy mohou být vyrobeny s konzistentní barvyBars.
    *   [Zeměpisná délka, zeměpisná šířka, výška (nebo hloubka) , a časové proměnné](#destinationname)získat spoustu vhodných metadat automaticky (například:[jednotky](#units)) .
    * Vzorek&lt;addAttributes&gt; u datové proměnné je:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Prázdné čísloObservations atribut způsobuje zdrojové čísloObservations atribut (pokud existuje) která se odstraní ze konečného seznamu atributů.
    * Poskytování těchto informací pomáháERDDAP™dělat lepší práci a pomáhá uživatelům pochopit soubory dat.
Dobré metadata činí datový soubor použitelný.
Nedostatečná metadata činí datový soubor k ničemu.
Prosím, udělejte si čas na dobrou práci s atributy metadat.
    
###### Komentáře o proměnných atributů, které jsou zvláštní vERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)je atribut proměnné RECOMMENDED. Například,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Tento atribut je z[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)a[CF 1. 7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Standardy metadat.
* Pokud existuje, musí to být pole dvou hodnot téhož datového typu jako cílový datový typ proměnné s uvedením skutečné (není teoretický nebo povolený) minimální a maximální hodnoty údajů pro tuto proměnnou.
* Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor),actual\\_rangemusí mít vybalené hodnoty a být stejného datového typu jako vybalené hodnoty.
* Pro některé zdroje dat (například všechny EDDTableFrom... Soubory souborů) ,ERDDAP™určujeactual\\_rangekaždé proměnné a nastavíactual\\_rangeatribut. S jinými zdroji dat (například relační databáze, Cassandra,DAPPER,Hyrax) , to může být obtížné nebo zátěž pro zdroj vypočítat rozsah, takžeERDDAP™Nežádá o to. V tomto případě je nejlepší, pokud můžete nastavitactual\\_range  (zejména u proměnných délky, zeměpisné šířky, výšky, hloubky a času) přidánímactual\\_rangeatribut každé proměnné [&lt;addAttributes&gt;] (#addattributy) pro tento soubor údajů vdatasets.xmlNapříklad:

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Pro numerické[proměnné času a času](#time-units), stanovené hodnoty by měly být relevantním zdrojem (místo určení) číselné hodnoty. Například pokud jsou výchozí hodnoty času uloženy jako "dny od roku 1985- 01- 01," pakactual\\_rangeby měly být uvedeny v "dnech od roku 1985-01-01." A pokud chcete odkazovat na Now jako druhá hodnota pro téměř-real-time data, která jsou pravidelně aktualizována, měli byste použít NaN . Například pro upřesnění datového rozpětí 1985-01-17 až do TEĎ použijte

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Pokudactual\\_rangeje známo (buďERDDAP™výpočet nebo přidáním přes&lt;addAttributes&gt;),ERDDAP™zobrazí jej uživateli na formuláři pro přístup k datům ( *datasetID* .html) a vytvořit grafické webové stránky ( *datasetID* .graph) pro tento datový soubor a používat jej při vytváření metadat FGDC a ISO 19115. Také, posledních 7 dní časuactual\\_rangejsou použity jako výchozí podmnožina času.
* Pokudactual\\_rangeje známo, uživatelé mohou použít[min () a max () funkce](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)v požadavcích, které jsou často velmi užitečné.
* Pro všechny soubory EDDTable... pokudactual\\_rangeje známo (buď tím, že to určíte, neboERDDAP™výpočet) ,ERDDAP™bude moci rychle odmítnout jakékoli žádosti o údaje mimo tento rozsah. Například, pokud nejnižší časová hodnota datového souboru odpovídá 1985-01-17, pak žádost o všechna data od 1985-01-01 do 1985-01-16 bude okamžitě odmítnuta chybovou zprávou "Váš dotaz nevytvořil žádné odpovídající výsledky." To děláactual\\_rangevelmi důležitý kus metadat, jak to může uložitERDDAP™hodně úsilí a ušetřit uživateli spoustu času. A to zdůrazňuje, žeactual\\_rangehodnoty nesmí být užší než skutečný rozsah údajů; jinakERDDAP™může chybně říci: "Neexistují žádná odpovídající data," pokud ve skutečnosti existují relevantní data.
* Pokud uživatel vybere podmnožinu dat a požádá o typ souboru, který obsahuje metadata (například:.nc) ,ERDDAP™Změnyactual\\_rangev souboru odezvy, aby odrážel rozsah podmnožiny.
* Viz také[data\\_minadata\\_max](#data_min-and-data_max), které jsou alternativním způsobem, jak upřesnitactual\\_range. Nicméně, jsou deprecovány teď, kdyžactual\\_rangeje definována CF 1.7+.
         
###### Atributy barevné lišty{#color-bar-attributes} 
Existuje několik VOLITELNÉ proměnné atributy, které zadávají navrhované výchozí atributy pro barevnou lištu (slouží k převodu hodnot dat do barev na obrazech) pro tuto proměnnou.
* Pokud jsou tyto informace k dispozici, použijí se jako výchozí informace pomocí mřížky atabledapKdykoli si vyžádáte obrázek, který používá barevnou lištu.
* Například v případě, že jsou datová délka zeměpisné šířky nastavena jako pokrytí na mapě, barevná lišta určuje, jak jsou hodnoty dat převedeny na barvy.
* Mít tyto hodnoty umožňujeERDDAP™vytvořit obrázky, které používají konzistentní barevnou lištu napříč různými požadavky, i když se hodnoty času nebo jiných rozměrů liší.
* Tyto názvy atributů byly vytvořeny pro použití vERDDAP. Nejsou ze standardu metadat.
* Vlastnosti vztahující se k barevnému panelu jsou:
    *    **colorBarMinimum** určuje minimální hodnotu v barvěBar. Například,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor), uveďtecolorBarMinimumjako nevybalenou hodnotu.
    * Hodnoty údajů nižší nežcolorBarMinimumjsou zastoupeny stejnou barvou jakocolorBarMinimumhodnoty.
    * Příznak by měl být[type="double"](#attributetype), bez ohledu na typ datové proměnné.
    * Hodnota je obvykle pěkné kulaté číslo.
    * Osvědčené postupy: Doporučujeme hodnotu mírně vyšší než minimální hodnota dat.
    * Neexistuje žádná výchozí hodnota.
*    **colorBarMaximum** určuje maximální hodnotu v barvěBar. Například,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor), uveďtecolorBarMinimumjako nevybalenou hodnotu.
    * Hodnoty údajů vyšší nežcolorBarMaximumjsou zastoupeny stejnou barvou jakocolorBarMaximumhodnoty.
    * Příznak by měl být[type="double"](#attributetype), bez ohledu na typ datové proměnné.
    * Hodnota je obvykle pěkné kulaté číslo.
    * Osvědčené postupy: Doporučujeme hodnotu mírně nižší než maximální hodnota dat.
    * Neexistuje žádná výchozí hodnota.
*    **barva BarPalette** určuje paletu pro barvuBar. Například,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * VšechnyERDDAP™instalace podporují tyto standardní palety: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography, TopographyDepth\\[přidáno do v1.74\\]WhiteBlack, WhiteBlueBlack a WhiteRedBlack.
    * Pokud jste nainstalovali[další palety](/docs/server-admin/additional-information#palettes), můžete odkazovat na jeden z nich.
    * Pokud tento atribut není přítomen, výchozí je BlueWhiteRed pokud \\-1\\*colorBarMinimum=colorBarMaximum; jinak výchozí je Duha.
*    **BarScale** určuje stupnici pro barvuBar. Například,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Platné hodnoty jsou Lineární a Log.
    * Pokud je hodnota Log,colorBarMinimummusí být větší než 0.
    * Pokud tento atribut není přítomen, výchozí hodnota je lineární.
*    **barva Kontinuální** určuje, zda barvaBar má souvislou paletu barev, nebo zda barvaBar má několik diskrétních barev. Například,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Platné hodnoty jsou řetězce pravdivé a falešné.
    * Pokud tento atribut není přítomen, je výchozí hodnota pravdivá.
*    **barvaBarNOddíly** určuje výchozí počet oddílů v barvěBar. Například,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Platné hodnoty jsou pozitivní celá čísla.
    * Pokud tento atribut není přítomen, výchozí hodnota je \\-1, která říkáERDDAP™vybrat počet sekcí na základě rozsahu barevBar.
###### WMS {#wms} 
Hlavní požadavky na přístup k proměnné prostřednictvímERDDAP'sWMSserver jsou:
* Soubor údajů musí býtEDDGrid... data.
* Datová proměnná MUSÍ být roštovaná proměnná.
* Datová proměnná MUSÍ mít proměnné délky a šířky. (Jiné proměnné osy jsou VOLITELNÉ.) 
* Musí být nějaké hodnoty délky mezi -180 a 180.
* ThecolorBarMinimumacolorBarMaximumatributy MUSÍ být specifikovány. (Další atributy barev jsou VOLITELNÉ.) 

###### data\\_minadata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** a **data\\_max** ](#data_min-and-data_max)-- Toto jsou deprecované proměnné atributy definované ve Světovém experimentu s cirkulací oceánu (WOCE) popis metadat. Například,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Doporučujeme použít[actual\\_range](#actual_range), místodata\\_minadata\\_max, protožeactual\\_rangeje nyní definován specifikací CF.
    * Pokud jsou přítomny, musí být stejného typu údajů jako datový typ proměnné určení a musí uvádět skutečný (není teoretický nebo povolený) minimální a maximální hodnoty údajů pro tuto proměnnou.
    * Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor),data\\_minadata\\_maxmusí být vybaleny hodnoty pomocí rozbaleného datového typu.
         
###### proměnnádrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Jedná se o VOLITELNÝ atribut proměnné používanýERDDAP™  (a žádné standardy metadat) který určuje výchozí hodnotu pro volbu "Draw Land Mask" ve formuláři Make A Graph ( *datasetID* .graph) a pro parametr &.land v URL žádající mapu dat. Například,
    ```
        <att name="drawLandMask">under</att>  
    ```
Viz[drawLandMaskpřehled](#drawlandmask).
###### Kódování{#encoding} 
*   [ **\\_ Kódování** ](#encoding)
    * Tento atribut lze použít pouze s proměnnými String .
    * Tento atribut se důrazně doporučuje.
    * Tento atribut je z[NetCDFUživatelská příručka (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * VnitřníERDDAP™, Struny jsou posloupnost 2-bajtových znaků, které používají[Unicode UCS-2 znaková sada](https://en.wikipedia.org/wiki/UTF-16).
    * Mnoho typů souborů podporuje pouze 1-bajtové znaky v Strings a proto tento atribut potřebuje k identifikaci přiřazeného
        [charset (AKA kódová stránka) ](https://en.wikipedia.org/wiki/Code_page)která definuje, jak zmapovat 256 možných hodnot do souboru 256 znaků vytažených ze sady znaků UCS-2 a/nebo kódovacího systému, např.[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (který vyžaduje mezi 1 a 4 byty na znak) .
    * Hodnoty pro \\_Encoding jsou případově citlivé.
    * Teoreticky,ERDDAP™mohou podporovat \\_kódování identifikátorů z[Tento seznam IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml)Ale v praxi,ERDDAP™v současné době jen podporuje
        * ISO-8859-1 (všimněte si, že má pomlčky, ne podtržení) , která má výhodu, že je identická s prvními 256 znaky Unicode a
        * UTF-8.
    * Při čtení zdrojových souborů je výchozí hodnota ISO-8859-1, kromě netcdf-4 souborů, kde je výchozí hodnota UTF-8.
    * Jedná se o pokračující problém, protože mnoho zdrojových souborů používá charsety nebo kódování, které jsou odlišné od ISO-8859-1, ale neidentifikujte znakovou sadu nebo kódování. Například mnoho zdrojových datových souborů má některá metadata zkopírovaná a vložená z Microsoft Word na Windows a tak mají fantastické pomlčky a apostrofy z znakové sady specifické pro Windows místo pomlček ASCII a apostrophes. Tyto postavy pak ukázat jako zvláštní znaky nebo '?' vERDDAP.
         
###### souborAccessBaseUrl{#fileaccessbaseurl} 
*    **[souborAccessBaseUrl](#fileaccessbaseurl)a souborAccessSuffix** jsou velmi zřídka používané atributy, které nejsou z žádného standardu. Pokud má EDDTable sloupec názvy souborů přístupných k webu (např. obraz, video nebo audio soubory) , můžete přidat
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
zadat základní URL (končí s /) potřeba, aby jména souborů byla kompletní URL. V neobvyklých případech, například když má sloupec odkazy na soubory .png, ale hodnoty chybí ".png," můžete přidat
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(například&lt;att name="fileAccessSuffix.png&lt;/a&gt;)
zadat příponu, která má být přidána, aby jména souborů byla kompletní URL. Pak pro.htmlTableodpovědi,ERDDAP™zobrazí název souboru jako odkaz na plnou URL (základ Url plus název souboru plus přípona) .

Jestli chcešERDDAP™sloužit souvisejícím souborům, oddělovat[EDDTableFromFileNames](#eddtablefromfilenames)Soubor údajů pro tyto soubory (může se jednat o soukromý soubor údajů) .
    
###### souborAccessArchive Url{#fileaccessarchiveurl} 
*   [ **souborAccessArchive Url** ](#fileaccessarchiveurl)je velmi zřídka používaný atribut, který není z žádného standardu. Pokud má EDDTable sloupec názvy souborů přístupných k webu (např. obraz, video nebo audio soubory) které jsou přístupné prostřednictvím archivu (např..zipsoubor) přístupná přes URL, použití&lt;att name="fileAccessArchiveUrl] *URL* &lt;/att&gt; zadat URL pro archiv.
    
Jestli chcešERDDAP™sloužit archivnímu souboru, oddělovat[EDDTableFromFileNames](#eddtablefromfilenames)Soubor údajů pro tento soubor (může se jednat o soukromý soubor údajů) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Jedná se o požadovaný atribut proměnné, pokud&lt;proměnnéMusíHaveIoosKategorie&gt; je nastavena na true (výchozí) v[setup.xml](/docs/server-admin/deploy-install#setupxml); jinak je to VOLITELNÉ.
Například,&lt;att name="ioos\\_category"&gt;Slanost&lt;/att &gt;
Kategorie jsou z[NOAAIntegrovaný systém pozorování oceánu (IOOS) ](https://ioos.noaa.gov/).
    
    *    (K psaní) Nejsme si vědomi formálních definic těchto jmen.
    * Hlavní názvy jsou ze Zdenky Willisové.ppt "Integrovaný systém pozorování oceánu" (IOOS)  NOAA's přístupem k budování počáteční provozní schopnosti' a z[US IOOS plán](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (Strana 1-5) .
    * Je pravděpodobné, že tento seznam bude v budoucnu revidován. Pokud máte nějaké požadavky, prosím, e-mail Chris. John v Noaa.gov.
    *   ERDDAP™podporuje větší seznam kategorií než IOOS, protože Bob Simons přidal další jména (většinou založené na jménech vědeckých oborů, např. biologie, ekologie, meteorologie, statistika, taxonomie) pro jiné typy údajů.
    * Aktuální platné hodnotyERDDAP™jsou Bathymetrie, Biologie, Spodní znak, CO2, Barevné rozpuštěné organické hmoty, Kontaminanty, Proudy, Rozpuštěné živiny, Rozpuštěné O2, Ekologie, Ryby Hojnost, Ryby Druhy, Teplá Flux, Hydraologie, Distribuce ledu, Identifikátor, Umístění, Meteorologie, Barva oceánu, Optické vlastnosti, Ostatní, Patogeny, Fytoplankton Druhy, Tlak, Produktivita, Kvalita, Slanost, Úroveň moře, Statistiky, Průtok proudu, Povrchové vlny, Taxonomie, Teplota, Čas, Total Suspended Matter, Neznámý, Wind, Zooplankton Druhy, a Zooplankton Abundance.
    * Mezi různými pojmy je určité překrytí a nejednoznačnost - snažte se.
    * Pokud přidáteioos\\_categoryna seznam&lt;categoryAttributes&gt; vERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)soubor, uživatelé mohou snadno najít datové soubory s podobnými údaji prostřednictvímERDDAP'Search for Datasets by Category' na domovské stránce.
        [Zkuste použítioos\\_categoryhledat soubory údajů o zájmech.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Tam byl[diskuse oERDDAP™aioos\\_categoryvERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Můžete být v pokušení nastavit&lt;proměnnéMusíHaveIoosKategorie&gt; false tak, aby tento atribut nebyl vyžadován. ("Pfft&#33; Co je mi do toho?") Některé důvody k tomu, aby to bylo správné (výchozí) a použitíioos\\_categoryjsou:
    
    * Pokud nastavení.xml&lt;proměnnéMusí mítIoosKategorie&gt; je pravda,[GenerovatDatasetsXml](#generatedatasetsxml)vždy vytváří / navrhujeioos\\_categoryatribut pro každou proměnnou v každém novém datovém souboru. Tak proč to tam nenechat?
    *   ERDDAP™umožňuje uživatelům vyhledávat soubory zájmů podle kategorií.ioos\\_categoryje velmi užitečná vyhledávací kategorie, protože joos\\_kategorie (např. teplota) jsou docela široké. To děláioos\\_categorymnohem lepší pro tento účel než například mnohem jemnější CFstandard\\_nameán (které nejsou pro tento účel tak dobré, protože všechny synonyma a mírné varianty, například, moře\\_povrch\\_teplota versus moře\\_ voda\\_teplota) .
(Použitíioos\\_categoryza tímto účelem je kontrolován&lt;categoryAttributes&gt; ve vašem setup.xml souboru.)
        [Zkuste použítioos\\_categoryhledat soubory údajů o zájmech.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Tyto kategorie jsou z[NOAAIntegrovaný systém pozorování oceánu (IOOS) ](https://ioos.noaa.gov/). Tyto kategorie jsou zásadní pro popis mise IOOS. Pokud jste uvnitřNOAA, podporaioos\\_categoryje dobrá Jedna...NOAAco dělat. (Sleduj.[JednaNOAAvideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)a inspirovat se&#33;) Pokud jste v nějaké jiné americké nebo mezinárodní agentuře, nebo pracujete s vládními agenturami, nebo pracujete s jinými Ocean Observing System, není dobrý nápad spolupracovat s kanceláří IOOS USA?
    * Dříve nebo později možná budete chtít někoho jiného.ERDDAP™odkaz na vaše soubory dat prostřednictvím[EDDGridFromErddap](#eddfromerddap)a[EDDTableFromErddap](#eddfromerddap). Pokud druhýERDDAP™vyžadujeioos\\_category, vaše soubory musí mítioos\\_categoryv případěEDDGridOdErddap a EddtableFromErddap do práce.
    * Je mnohem jednodušší zahrnoutioos\\_categorykdyž vytvoříte soubor dat (Je to jen další věc, kteráERDDAP™vyžaduje přidání datového souboru doERDDAP) , než přidat to po faktu (Pokud jste se rozhodli ji použít v budoucnu) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat) je atribut proměnné vERDDAP. Například,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™používálong\\_namepro značení os na grafech.
    * Osvědčené postupy: Kapitalizovat slova vlong\\_namejako by to byl titul (Získejte první slovo a všechna slova bez článku) . Nezahrnujte jednotky dolong\\_name. Dlouhé jméno by nemělo být příliš dlouhé (obvykle&lt;20 znaků), ale mělo by být více popisné než[destinationName](#destinationname), což je často velmi stručné.
    * Pokud "long\\_name"není definován v proměnné"[zdrojAtributy](#variable-addattributes)nebo&lt;addAttributes&gt;,ERDDAP™bude generovat tím, že čistí[standard\\_name](#standard_name)  (pokud je přítomen) nebodestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)a **\\_Fill Hodnota**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)a[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) jsou proměnné atributy, které popisují číslo (například -9999) která se používá k vyjádření chybějící hodnoty. Například,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Pro String proměnné, výchozí pro oba je "" (prázdný řetězec) .
Pro numerické proměnné je výchozí hodnota pro obě proměnné NaN.
*   ERDDAP™podporuje obojímissing\\_valuea \\_FillValue, protože některé datové zdroje jim přiřazují trochu jiný význam.
* Pokud jsou přítomny, měly by mít stejný datový typ jako proměnná.
* Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor),missing\\_valuea hodnoty \\_FillValue by měly být rovněž zabaleny. Podobně pro sloupec s hodnotami String date/time, které používají lokální[time\\_zone](#time_zone),missing\\_valuea hodnoty \\_FillValue by měly používat místní časové pásmo.
* Pokud proměnná používá tyto speciální hodnoty,missing\\_valuea/nebo \\_FillValue atributy jsou povinné.
* Pro[proměnné času a času](#time-units)  (zda je zdrojem řetězec nebo číselný) ,missing\\_values a \\_FillValues se objeví jako "" (prázdný řetězec) když je čas napsán jako String a jako NaN, kdy je čas napsán jako dvojitý. Hodnoty zdroje promissing\\_valuea \\_FillValue se neobjeví v metadatech proměnné.
* Pro proměnné String,ERDDAP™vždy konvertuje jakékolivmissing\\_values nebo \\_FillValue hodnoty dat do "" (prázdný řetězec) . Hodnoty zdroje promissing\\_valuea \\_FillValue se neobjeví v metadatech proměnné.
* Pro číselné proměnné:
Themissing\\_valuea \\_FillValue se objeví v metadatech proměnné.
Pro některé výstupní datové formáty,ERDDAP™tato speciální čísla zůstanou nedotčena, např. uvidíte -9999.
Pro ostatní výstupní datové formáty (zejména textové formáty jako .csv a.htmlTable) ,ERDDAP™nahradí tato speciální čísla s NaN nebo "" .
* Některé datové typy mají vlastní chybějící hodnoty, které nemusí být výslovně označenymissing\\_valuenebo atributy \\_FillValue: float a dvojité proměnné mají NaN (Není číslo) , Hodnoty Stringu používají prázdný řetězec a hodnoty znaku mají znak\\uffff  (znak #65535, což je hodnota Unicode for Not a Character) . Datové typy Integer nemají vlastní chybějící hodnoty.
* Pokud má celá proměnná chybějící hodnotu (například prázdná pozice v souboru .csv) ,ERDDAP™bude interpretovat hodnotu jako definovanoumissing\\_valuenebo \\_FillValue pro tuto proměnnou. Pokud žádný není definován,ERDDAP™bude interpretovat hodnotu jako výchozí chybějící hodnotu pro tento datový typ, což je vždy maximální hodnota, kterou může tento datový typ držet:
127 pro byte proměnné, 32767 pro zkratku, 2147483647 pro int, 9223372036854775807 dlouho,
255 pro ubyte, 65535 pro ukrote, 4294967295 pro uint a 184467440737095516115 pro ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
PokaždéERDDAP™načítá soubor údajů, kontroluje, zda proměnné s celočíselný zdroj datové typy mají definovanémissing\\_valuenebo atribut \\_FillValue. Pokud proměnná ne, pakERDDAP™vytiskne zprávu do souboru záznamu (začínající na "Přidat \\_FillValue Attribute?") doporučujeERDDAP™Správce přidá \\_Fill Hodnota atributu pro tuto proměnnou vdatasets.xml. Je velmi užitečné pro každou proměnnou mít \\_FillValue nebomissing\\_valueprotože chybějící hodnoty jsou vždy možné, např. pokud daný soubor v souboru nemá danou proměnnou,ERDDAP™musí být schopen tuto proměnnou prezentovat jako všechny chybějící hodnoty této proměnné. Pokud se rozhodnete, že proměnná by neměla mít atribut \\_FillValue, můžete přidat
    &lt;att names="\\_FillValue&gt;null&lt;/att &gt; místo toho, který potlačí zprávu pro todatasetID+variační kombinace v budoucnu.
    
PokaždéERDDAP™spustí se, shromažďuje všechna doporučení do zprávy, která je zapsána do souboru protokolu (začínáme s "ADD \\_FillValue ATTRIBUTES?") , e-mailemERDDAP™správce a napsaný do datového souboru CSV v\\[velkýRodič rodičů\\]/logy/ adresář. Pokud chcete, můžete použít program GenerateDatasetsXml (a možnost AddFillValueAttributes) použít všechny návrhy v CSV souboru nadatasets.xmlSložka. Pro všechnydatasetID/proměnné kombinace v tomto souboru, pokud se rozhodnete, že není třeba přidat přiřazený, můžete změnit atribut&lt;att names="\\_FillValue&gt;null&lt;/att &gt; k potlačení tohoto doporučenídatasetID+variační kombinace v budoucnu.
    
Tohle je důležité&#33;
Jak často říká Bob: bylo by to špatné (a trapné) pokud byly některé důkazy o globálním oteplování způsobeny neidentifikovanými chybějícími hodnotami v údajích (Například hodnoty teplot 99 nebo 127 stupňů\\_ C, které měly být označeny jako chybějící hodnoty, a tím zkreslily střední a/nebo střední statistiky vyšší) .

* \\_FillValue amissing\\_valuehodnoty dané proměnné v různých zdrojových souborech musí být konzistentní; jinakERDDAP™přijme soubory s jednou sadou hodnot a všechny ostatní soubory odmítne jako "Špatné soubory." Abych vyřešil problém,
    * Pokud jsou soubory roštovány.ncsoubory, můžete použít[EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
    * Pokud jsou soubory tabulkové datové soubory, můžete použít EDDTableFrom... '[standardizovat Co?](#standardizewhat)říctERDDAPstandardizovat zdrojové soubory, jak jsou čteny doERDDAP.
    * Pro těžší problémy, můžete použít[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)vyřešit problém.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (výchozí hodnota = 1) a **add\\_offset**   (výchozí = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)a[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) jsou VOLITELNÉ proměnné atributy, které popisují data, která jsou zabalena do jednoduššího datového typu prostřednictvím jednoduché transformace.
    * Pokud jsou přítomny, jejich datový typ se liší od typu zdrojových dat a popisuje datový typ cílových hodnot.
Například zdroj dat mohl uložit float datové hodnoty s jednou desetinnou čárkou zabalenou jako krátké inty (int16) , použitímscale\\_factor= 0, 1 aadd\\_offsetNapříklad

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

V tomto příkladu,ERDDAP™vybalí data a prezentuje je uživateli jako float data hodnoty.
    * Pokud je přítomen,ERDDAP™bude extrahovat hodnoty z těchto atributů, odstranit atributy a automaticky rozebrat data pro uživatele:
místo určení Hodnota = zdroj Hodnota \\*scale\\_factor+add\\_offset  
Nebo, řekl jiný způsob:
unpackedValue = baleno Hodnota \\*scale\\_factor+add\\_offset
    * Thescale\\_factoraadd\\_offsethodnoty dané proměnné v různých zdrojových souborech musí být konzistentní; jinakERDDAP™přijme soubory s jednou sadou hodnot a všechny ostatní soubory odmítne jako "Špatné soubory." Abych vyřešil problém,
        * Pokud jsou soubory roštovány.ncsoubory, můžete použít[EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Pokud jsou soubory tabulkové datové soubory, můžete použít EDDTableFrom... '[standardizovat Co?](#standardizewhat)říctERDDAPstandardizovat zdrojové soubory, jak jsou čteny doERDDAP.
        * Pro těžší problémy, můžete použít[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)vyřešit problém.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (z[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadat) je atribut proměnné vERDDAP. CF vede seznam povolených[Standardní názvy CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Například,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Pokud přidátestandard\\_namek atributům proměnných a k přidánístandard\\_namena seznam&lt;categoryAttributes&gt; vERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)soubor, uživatelé mohou snadno najít datové soubory s podobnými údaji prostřednictvímERDDAP'Search for Datasets by Category' na domovské stránce.
    * Pokud zadáte CFstandard\\_nameu proměnné atribut jednotek proměnné nemusí být totožný s kanonickými jednotkami uvedenými pro standardní název v tabulce názvu CF Standard Name, ale jednotky MUSÍ být konvertibilní ke kanonickým jednotkám. Například všechny CF související s teplotoustandard\\_name"K" (Kelvin) jako kanonické jednotky. Takže proměnná s teplotou souvisejícístandard\\_nameMusí mít jednotky K, stupeň\\_C, stupeň\\_F, nebo některé varianty UDUnits těchto názvů, protože jsou všechny vzájemně proměnitelné.
    * Osvědčené postupy: Část síly[kontrolované slovní zásoby](https://en.wikipedia.org/wiki/Controlled_vocabulary)pochází z používání pouze podmínek v seznamu. Takže doporučujeme držet se pojmů definovaných v kontrolovaném slovníku, a doporučujeme ne vymýšlet termín, pokud není vhodný v seznamu. Pokud potřebujete další podmínky, podívejte se, zda výbor norem je přidá do kontrolované slovní zásoby.
    *   standard\\_namehodnoty jsou jediné hodnoty atributu CF, které jsou případově citlivé. Všechny jsou vždy malé. ZačínámeERDDAP™v1.82, GenerateDatasets budou převádět velká písmena na malá písmena. A když je soubor načtenERDDAP, velká písmena se tiše mění na malá písmena.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionje VOLITELNÝ atribut používanýERDDAP™  (a žádné standardy metadat) místo[proměnné času a času](#time-units), které mohou být v mřížkových datových souborech nebo tabulárních datech aaxisVariables nebodataVariables. Například,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionurčuje přesnost, která má být použita vždyERDDAP™formátuje časové hodnoty z této proměnné jako řetězce na webových stránkách, včetně.htmlTablereakce. Ve formátech souborů, kdeERDDAP™formáty krát jako řetězce (například .csv a.json) ,ERDDAP™pouzetime\\_precision- stanovený formát, pokud zahrnuje zlomkové sekundy;ERDDAP™používá 1970-01-01T00:00:00 Formát Z.
* Platné hodnoty jsou 1970-01, 1970-01-01, 1970-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00Z (výchozí) , 1970-01-01T00:00:0.0Z, 1970-01-01T00:00:00.00Z, 1970-01-01T00:00:0.000Z.\\[1970 není možnost, protože je jedno číslo, takžeERDDAP™nemůže vědět, jestli je to formátovaný časový řetězec (rok) nebo pokud je to nějaký počet sekund od 1970-01-01T00:00:00Z.\\]
* Pokudtime\\_precisionnení zadána nebo hodnota není shodná, použije se výchozí hodnota.
* Tady, jako v jiných částechERDDAP™Předpokládá se, že všechna pole formátovaného času, která nejsou zobrazena, mají minimální hodnotu. Například 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z a 1985-07-01T00:00:00 Z jsou všechny považovány za rovnocenné, i když s různou úrovní přesnosti implikované. To odpovídá[ISO 8601:2004"extended"Specifikace formátu času](https://www.iso.org/iso/date_and_time_format).
*    **UPOZORNĚNÍ:** Měl (a) byste užívat pouze omezené množstvítime\\_precisionpokud **všechny** hodnoty údajů pro proměnnou mají pouze minimální hodnotu pro všechna pole, která jsou skryta.
    * Například můžete použíttime\\_precisionz 1970-01-01, pokud mají všechny hodnoty dat hodinu = 0, minuta = 0, a druhá =0 (např. 2005-03-04T00:00:00Z a 2005-03-05T00:00:00Z) .
    * Například, nepoužívejtetime\\_precisionze dne 1970-01-01, pokud existují hodnoty non-0 hodiny, minuty nebo sekund, (např. 2005-03-05T12:00:00Z) protože hodnota nedefaultní hodiny by nebyla zobrazena. Jinak, pokud uživatel požádá o všechna data s time=2005-03-05, žádost nečekaně selže.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneje VOLITELNÝ atribut používanýERDDAP™  (a žádné standardy metadat) místo[proměnné času a času](#time-units), které mohou být v mřížkových datových souborech nebo souborech tabulek.
    * Výchozí je "Zulu" (což je moderní časová zóna verze GMT) .
    * Základní informace: "časové offsety" (např. Pacific Standard Time, -08:00, GMT-8) jsou pevné, specifické, offsety vzhledem kZulu  (GMT) . Naproti tomu "časové zóny" jsou mnohem složitější věci, které jsou ovlivněny úsporou denního světla (např. "US/Pacific") , které měly různá pravidla na různých místech v různých časech. Časová pásma mají vždy jména, protože nemohou být shrnuta jednoduchou offsetovou hodnotou. (viz sloupec "TZ database names" v tabulce v[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'stime\\_zoneatribut vám pomůže vypořádat se s místními daty z určitého časového pásma (např. 1987-03-25T17:32:05 Tichý oceán Čas) . Pokud máte řetězec nebo numerická data času s (pevný) časový posun, měli byste jednoduše upravit data naZulu  (Což je coERDDAP™chce) určením jiného základního času v atributu jednotek (např. "hodiny od 1970-01-01T08:00Z," zaznamenejte T08 pro upřesnění časové kompenzace) , a vždy zkontrolujte výsledky, abyste získali výsledky, které chcete.
    * Pro proměnné časového razítka se zdrojovými daty ze Strings vám tento atribut umožňuje určit časové pásmo, které vedeERDDAP™převést na místní čas-zóna zdrojové časy (někteří ve standardním čase, někteří v denním světle šetří čas) doZulučasy (které jsou vždy ve standardním čase) . Seznam platných názvů časových pásem je pravděpodobně totožný se seznamem ve sloupci TZ[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Společná americká časová pásma jsou: USA/Hawaii, USA/Alaska, USA/Pacific, USA/Mountain, USA/Arizona, USA/Central, USA/Východ.
    * Pro proměnné časového razítka s číselnými zdrojovými daty můžete zadat "time\\_zone" atribut, ale hodnota musí být "Zulu"nebo "UTC." Pokud potřebujete podporu pro jiná časová pásma, prosím e-mail Chris. John at noaa.gov .
         
###### jednotky{#units} 
*   [ **jednotky** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadat) definuje jednotky hodnot dat. Například,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "jednotky" jsou povinné buď jako zdrojAttribute, nebo jako addAttribute pro"time"proměnné a je STRONGLIE DOPORUČEN pro jiné proměnné, kdykoli je to vhodné (Což je skoro vždy.) .
    * Obecně doporučujeme[UDjednotky](https://www.unidata.ucar.edu/software/udunits/)\\ kompatibilní jednotky, které vyžadují[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)a[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standardy.
    * Dalším společným standardem je[UCUM](https://unitsofmeasure.org/ucum.html)-- Unified Code for Units of Measure.[OGC](https://www.ogc.org/)služby jako např.[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)a[WMS](https://www.ogc.org/standards/wms)vyžaduje UCUM a často se na UCUM odkazuje jako na UOM (Jednotky opatření) .
    * Doporučujeme použít jednu jednotku standard pro všechny soubory souborů ve vašemERDDAP. Měl bys to říct.ERDDAP™který standard používáte&lt;jednotky\\_standard&gt;, ve Vašem[setup.xml](/docs/server-admin/deploy-install#setupxml)Složka.
    * Jednotky dané proměnné v různých zdrojových souborech musí být konzistentní. Pokud máte sběr datových souborů, kde jedna podmnožina souborů používá různé hodnoty jednotek než jedna nebo více dalších podskupin souborů (například,
"days since 1985-01-01" versus "days since 2000-01-01,"
"stupeň\\_Celsius" versus "deg\\_C," nebo
"uzel" versus "m/s") musíte najít způsob, jak standardizovat hodnoty jednotek, jinak,ERDDAP™načte pouze jednu podmnožinu souborů. Přemýšlejte o tom: pokud má jeden soubor windSpeed jednotky=knots a druhý má windSpeed jednotky=m/s, pak by hodnoty ze dvou souborů neměly být zahrnuty do stejného souhrnného souboru.
        * Pokud jsou soubory roštovány.ncsoubory, v mnoha situacích můžete použít[EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Pokud jsou soubory tabulkové datové soubory, v mnoha situacích můžete použít EDDTableFrom... '[standardizovat Co?](#standardizewhat)říctERDDAPstandardizovat zdrojové soubory, jak jsou čteny doERDDAP.
        * Pro těžší problémy, můžete použít[NcML](#ncml-files)nebo[NCO](#netcdf-operators-nco)vyřešit problém.
    * Norma CF sekce 8.1 říká, že pokud jsou data proměnné zabalena přes[scale\\_factorneboadd\\_offset](#scale_factor), "Jednotky proměnné by měly být reprezentativní pro rozbalená data."
    *   [Pro proměnné času a času,](#time-units)buď proměnná je[zdrojAtributy](#variable-addattributes)nebo&lt;addAttributes&gt; (který má přednost) Musí mít[jednotky](#units)což je buď
        
        * Pro proměnné časové osy nebo proměnné časových údajů s číselnými údaji:[UDjednotky](https://www.unidata.ucar.edu/software/udunits/)\\ kompatibilní řetězec (s formátem *jednotky* od *baseTime* ) popis toho, jak interpretovat hodnoty času zdroje (například sekundy od 1970-01-01T00:00:00Z) .
            
         *jednotky* může být některý z:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Technicky vzato,ERDDAP™NETÝKÁ SEUDUNITSstandardní při převodu"years since"a"months since"časové hodnoty do"seconds since". TheUDUNITSstandard definuje rok jako pevnou jedinou hodnotu: 3.15569259747e7 sekund. AUDUNITSdefinuje měsíc jako rok/12. Bohužel, většina/všechny soubory údajů, které jsme viděli, že použití"years since"nebo"months since"jasně zamýšlejí hodnoty jako kalendářní roky nebo kalendářní měsíce. Například, 3"months since 1970-01-01"má obvykle znamenat 1970-04-01. Takže,ERDDAP™interpretuje"years since"a"months since"jako kalendářní roky a měsíce, a ne přesně sledovatUDUNITSstandardní.
            
The *baseTime* musí být ISO 8601:2004 (E) Name (yyyy-MM-dd'T'HH:mm:ssZ, například, 1970-01-01T00:00:00Z) , nebo některé změny, že (například s chybějícími částmi na konci) .ERDDAP™se snaží pracovat s širokou škálou variant tohoto ideálního formátu, například "1970-1-1 0:0:0" je podporován. Pokud informace o časovém pásmu chybí, předpokládá se, že se jedná oZulučasové pásmo (AKA GMT) . I kdyby byl stanoven jiný časový posun,ERDDAP™Nikdy nepoužívá Daylight Saving Time. Pokud základnaTime používá jiný formát, musíte použít&lt;addAttributes&gt; zadat nový řetězec jednotek, který používá změnu ISO 8601:2004 (E) formát (např. změna dnů od 1. ledna 1985 do dnů od roku 1985-01-01.
        
Můžete to otestovat.ERDDAP's schopností vypořádat se s konkrétní *jednotky* od *baseTime* sERDDAP's[Časový převodník](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Doufejme, že můžete připojit číslo (první časová hodnota ze zdroje dat?) a jednotky řetězec, klikněte na Convert, aERDDAP™bude moci převést na ISO 8601:2004 (E) Zformátovaný časový řetězec data. Převodník vrátí chybovou zprávu, pokud řetězec jednotek není rozpoznatelný.

###### Časové jednotky řetězce{#string-time-units} 
*   [Pro atribut jednotek pro proměnné času nebo času s daty String,](#string-time-units)musíte uvést[Java.time.DatumForhmota](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)vzor (který je většinou kompatibilní s java.textem. SimpleDateFormat) který popisuje, jak interpretovat časy strun.
    
Pro běžně používané časové formáty, které jsou variantami ISO 8601:2004 (E) standardní formát (např. 2018-01-02T00:00:00Z) , můžete zadat variantyyyyy-MM-dd'T'HH:mm:ssZ, například použitíyyyy-MM-ddpokud má strunný čas pouze datum. Pro jakýkoli formát začínající na rrrr-M,ERDDAPpoužívá speciální parser, který je velmi odpouštějící drobných variant ve formátu. Parser zvládá časová pásma ve formátu "Z," "UTC," "GMT," ±XX:XX, ±XXXX a ±XX. Pokud části data nejsou specifikovány (například minuty a sekundy) ,ERDDAP™předpokládá nejnižší hodnotu pro toto pole (Například pokud nejsou zadány sekundy, předpokládá se sekundy =0) .
    
Pro všechny ostatní formáty strun je třeba přesně zadat řetězec formátu DateTimeForhmotu kompatibilní s časem. Jakoyyyy-MM-dd'T'HH:mm:ssZ, tyto formátové řetězce jsou postaveny z znaků, které určují určitý typ informací z časového řetězce, např. m znamená minutu za hodinu. Pokud opakujete znak formátu určitý početkrát, dále zpřesní význam, např. m znamená, že hodnota může být specifikována libovolným počtem číslic, mm znamená, že hodnota musí být specifikována dvěma číslicemi. TheJavadokumentace pro DateTimeForhmota je hrubý přehled a nedává tyto podrobnosti jasně najevo. Takže tady je seznam vzorových variací znaků a jejich význam v rámciERDDAP™  (která se někdy trochu liší odJava's DateTimeForhmota) :
    
    |Znaky|Příklady|Význam|
    |---|---|---|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|roční číslo, libovolný počet číslic.ERDDAP™léčí y (roční období) a Y (týdenní rok, protože se často špatně používá místo y) jako u,[astronomické číslo roku](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Astronomické roky jsou pozitivní nebo negativní celá čísla, která nepoužívají BCE (BC) nebo CE (AD) era designators: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuuu, rrrr, RRRR|\\-4712, 0000, 0001, 0010, 0100, 2018|4 číslice astronomického roku čísla (Ignorovat všechny předchozí '-')  |
    |Př|1, 01, 12|měsíční číslo, libovolný počet číslic (1= leden)  |
    |MM|01, 12|2 číslice (0 polstrovaný) měsíční číslo|
    |MMM|Jan, Jan, JAN|3 písmeno anglického měsíce jméno, případ necitlivý|
    |MMMM|Jan, Jan, Jan, Leden, leden, leden|3 písmeno nebo celé anglické jméno měsíce, případ necitlivý|
    |d|1, 01, 31|číslo dne měsíce, jakýkoli počet číslic|
    |dd|01, 31|2 číslice (0 polstrovaný) Den v měsíci. První číslice může být prostor.|
    |D|1, 001, 366|Den v roce, libovolný počet číslic, 001=Jan 1|
    |DDD|001, 366|den v roce, 3 číslice, 001=Jan 1|
    |OEEZ|Thu, THU, Thu|3 písmeno den v týdnu, hodnota je ignorována při analýze|
    |OEEZ|Thu, THU, Thu, čtvrtek, čtvrtek, čtvrtek|3 písmeno nebo celý anglický den v týdnu, případ necitlivý, hodnota je ignorována při analýze|
    |H|0, 00, 23|H hodina dne (0- 23) , libovolný počet číslic|
    |HH|00, 23|HH hodina dne (00- 23) , 2 číslice. První číslice může být prostor.|
    |a|AM, AM, PM, PM|AM nebo PM, citlivé na případy|
    |h|12, 1, 01, 11|hodinová hodina (12, 1, 2, ... 11) , libovolný počet číslic|
    |hh|12, 01, 11|hodinová hodina (12, 1, 2, ... 11) , 2 číslice. První číslice může být prostor.|
    |K|0, 1, 11|hodina (0, 1, ...11) , libovolný počet číslic|
    |KK|00, 01, 11|hodina-am-pm, 2 číslice|
    |m|0, 00, 59|minuta za hodinu, libovolný počet číslic|
    |mm|00, 59|minuta za hodinu, 2 číslice|
    |án|0, 00, 59|druhá minuta, libovolný počet číslic|
    |ss|00, 59|druhá minuta, 2 číslice|
    |S|0, 000, 9, 999|zlomek sekundy, jako kdyby po desetinné čárce, jakýkoliv počet číslic|
    |SS|00, 99|Setiny sekundy, 2 číslice|
    |SSS|000, 999|tisíce sekund, 3 číslice|
    |A|0, 0000, 86399999|milisekunda dne, libovolný počet číslic|
    |AAAAAAAA|00000000, 86399999|milisekunda dne, 8 číslic|
    |N|0, 00000000000000, 86399999999999|nanosekundu dne, libovolný počet číslic. InERDDAP™Tohle je zkrácené na nMillis.|
    |NNNNNNNNNNNNNNN|00000000000000, 86399999999999999|Nanosekunda dne, 14 číslic. InERDDAP™Toto je zkráceno na nMillis.|
    |n|0, 00000000000, 59999999999|nanosekundu sekundy, libovolný počet číslic. InERDDAP™Toto je zkráceno na nMillis.|
    |nnnnnn[nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn]][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn][nn]]][nn][nn][nn][nn][nn]|00000000000, 59999999999|nanosekunda sekundy, 11 číslic. InERDDAP™Toto je zkráceno na nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|časové pásmo s formátem "Z" nebo ± (2 číslice hodiny offset) : (2 číslice minuty offset) . Tohle zabírá. *prostor* jako + (nestandardní) . ZZZ podpora 'Z' je nestandardní, ale zabývá se společnou uživatelskou chybou.|
    |XX, ZZ|Z -0800, +100|časové pásmo s formátem "Z" nebo ± (2 číslice hodiny offset) : (2 číslice minuty offset) . Tohle zabírá. *prostor* jako + (nestandardní) . ZZ podpora 'Z' je nestandardní, ale zabývá se běžným uživatelským omylem.|
    |X, Z|Z, -08, +01|časové pásmo s formátem "Z" nebo ± (2 číslice hodiny offset) : (2 číslice minuty offset) . Tohle zabírá. *prostor* jako + (nestandardní) . Z podpora 'Z' je nestandardní, ale zabývá se běžným uživatelským omylem.|
    |xxx|\\-08:00, +01:00|časové pásmo s formátem ± (2 číslice hodiny offset) : (2 číslice minuty offset) . Tohle zabírá. *prostor* jako + (nestandardní) .|
    |xx|\\-0800, +0100|časové pásmo s formátem ± (2 číslice hodiny offset)  (2 číslice minuty offset) . Tohle zabírá. *prostor* jako + (nestandardní) .|
    |x|\\-08, +01|časové pásmo s formátem ± (2 číslice hodiny offset) . Tohle zabírá. *prostor* jako + (nestandardní) .|
    |'|"T," "Z," "GMT"|start a konec série doslovných znaků|
    |' ' (dvě jediné citace)  |' '|dvě jediné citace označuje doslovnou jedinou nabídku|
    | \\[\\] | \\[ \\] |začátek ("\\[") a konec ("\\]") volitelného oddílu. Tato notace je podporována pouze pro doslovné znaky a na konci řetězce formátu.|
    |# &#123; &#125;|# &#123; &#125;|vyhrazeno pro budoucí použití|
    |G,L,Q,e,c,V,z,O,p|     |Tyto formátovací znaky jsou podporoványJava's DateTimeForhmota, ale momentálně není podporovánERDDAP. Pokud potřebujete podporu, pošlete Chrisovi email. John at noaa.gov .|
    
Poznámky:
    
    * V datovém čase s interpunkcí mohou mít číselné hodnoty variabilní počet číslic (Například v americkém formátu "1/2/1985" může být měsíc a datum 1 nebo 2 číslice) formát musí tedy používat jednopísmenné žetony, např. M/d/rrrr, které přijímají libovolný počet číslic za měsíc a datum.
    * Je-li počet číslic pro položku konstantní, např. 01/02/1985, uveďte počet číslic ve formátu, např. MM/dd/rrrr pro dvoumístný měsíc, dvoumístné datum a čtyřmístný rok.
    * Tyto formáty jsou složité pracovat s. Zadaný formát může pracovat pro většinu, ale ne pro všechny, časové řetězce pro danou proměnnou. Vždy zkontrolujte, zda formát, který zadáte, funguje podle očekáváníERDDAPpro všechny časové řetězce proměnné.
    * Pokud je to možné, GenerateDatasetXml navrhne řetězce ve formátu času.
    * Pokud potřebujete pomoct vytvořit formátovací řetězec, prosím email Chris. John at noaa.gov .

Hlavní proměnná časových dat (pro soubor tabulkových dat) a proměnná hlavní časové osy (pro mřížkované soubory dat) jsou uznávány[destinationName](#destinationname)Čas. Jejich metadata jednotek musí být řetězec jednotek kompatibilních s UDUnits pro číselné časové hodnoty, např. "den od 1970-01-01" (pro tabulkové nebo mřížkované soubory dat) nebo[jednotky vhodné pro časy strun](#string-time-units), např. "M/d/rrrr" (pro soubor tabulkových dat) .

Různé časové jednotky v různých gridd.ncSoubory - Pokud máte sbírku mřížkovaných.ncsoubory, kde pro časovou proměnnou jedna podmnožina souborů používá různé časové jednotky než jedna nebo více dalších podmnožin souborů, můžete použít[EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked). Převádí časové hodnoty na"seconds since 1970-01-01T00:00:00Z"na nižší úrovni, a tím skrývá rozdíly, takže můžete vytvořit jeden soubor ze sbírky heterogenních souborů.

###### Proměnné časového údaje{#timestamp-variables} 
[Proměnné časového údaje](#timestamp-variables)-- Každá jiná proměnná (axisVariablenebodataVariable,EDDGridnebo EDDTable soubor) může být proměnná timeStamp. Časové proměnné jsou proměnné, které mají časové jednotky a data, ale mají&lt;destinationName&gt; jiná než čas. TimeStamp proměnné se chovají jako hlavní čas proměnné v tom, že převést zdroj je časový formát do"seconds since 1970-01-01T00:00:00Z"a/nebo ISO 8601:2004 (E) formát).ERDDAP™rozpozná čas Proměnné známek podle jejich časové souvislosti "[jednotky](#units)" Metadata, která musí odpovídat tomuto pravidelnému výrazu "\\[a-zA-Z\\]+ + +od +\\[0-9\\].+" (pro číselné datum Například časy,"seconds since 1970-01-01T00:00:00Z") nebo být datem String ve formátu času obsahující "uuuuu," "rrrr" nebo "RRRR" (Například, "yyyy-MM-ddT'HH:mm:ssZ") . Ale použij prosímdestinationName "time"pro hlavní datum Časová proměnná.

 **Vždy zkontrolujte svou práci, abyste si byli jisti, že časové údaje, které se objeví vERDDAP™je správná časová data.** Práce s daty o čase je vždy ošemetná a chybovitá.

Viz[více informací o časových proměnných](#destinationname).
ERDDAP™má nástroj pro[Převést numerické Čas do/z doby řetězce](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Viz[JakERDDAP™Obchoduje s časem](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** nebo **valid\\_min** a **valid\\_max** ](#valid_range)-- Jedná se o VOLITELNÉ proměnné atributy definované v[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Konvence metadat. Například,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

nebo

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Pokud jsou přítomny, měly by mít stejný datový typ jako proměnná a uvádět platné minimální a maximální hodnoty údajů pro tuto proměnnou. Uživatelé by měli považovat hodnoty mimo tento rozsah za neplatné.
    *   ERDDAP™nepoužívávalid\\_range. Řekl jsem to jinak:ERDDAP™nepřevádí hodnoty dat mimovalid\\_range\\_ Fill Hodnota nebomissing\\_value.ERDDAP™Prostě předá tato metadata a aplikaci nechá na vás.
Proč? Na to jsou ta metadata. Pokud by poskytovatel údajů chtěl, mohl převést hodnoty údajů mimo rámecvalid\\_rangebýt \\_FillValues.ERDDAP™nehádá poskytovatele dat. Tento přístup je bezpečnější: pokud se později ukáže, ževalid\\_rangebyl příliš úzký nebo jinak nesprávný,ERDDAP™nevymaže data.
    * Pokud jsou data zabalena[scale\\_factorneboadd\\_offset](#scale_factor),valid\\_range,valid\\_minavalid\\_maxby měl být balený datový typ a hodnoty. OdERDDAP™platíscale\\_factoraadd\\_offsetpři zatížení souboru dat,ERDDAP™vybalívalid\\_range,valid\\_minavalid\\_maxhodnoty tak, aby metadata místa určení (zobrazeno uživatelům) označuje rozbalený datový typ a rozsah.
Nebo, pokud vybalené\\_valid\\_rangeje přítomen atribut, bude přejmenovánvalid\\_rangekdyERDDAP™načítá data.
##### &lt;Odstranit MVRows&gt;{#removemvrows} 
* [ ** &lt;removeMVRows&gt; ** ] (#removemvrows) je VOLITELNÝ tag v záložcedatasets.xmlpro EDDTableFromFoles (včetně všech podtříd) Databáze, i když se používá pouze pro EDDTableFromMultidimNcFiles. Může mít hodnotu pravdy nebo lži. Například pravda
Tím se odstraní jakýkoliv blok řádků na konci skupiny, kde jsou všechny hodnotymissing\\_value, \\_FillValue, nebo CoHort ...Array nativní chybějící hodnota (nebo char=#32 pro CharArrays) . To je pro CF DSG Multidimenzional Array typ souboru a podobné soubory. Pokud je to pravda, je to správná zkouška a tak vždy načte všechny proměnné max dim, takže to může trvat déle.
Výchozí hodnota je falešná.
Doporučení -- Pokud je to pro váš datový soubor možné, doporučujeme nastavení odstranit MVRows na false. Nastavení odstraněníMVRows do true může výrazně zpomalit požadavky, i když může být potřeba pro některé soubory dat.
