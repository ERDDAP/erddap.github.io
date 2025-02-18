---
title: "EDDTableFromEML"
sidebar_position: 6
---
# EDDTableFromEML a EDDTableFromEMLBatch Možnosti ve generováníDatasetů Xml

\\[Tato webová stránka bude pouze zajímavéERDDAP™Správci, kteří pracují s EML soubory.
Tento dokument byl původně vytvořen v roce 2016. Bylo to naposledy upraveno v 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)je datový server, který dává uživatelům jednoduchý a konzistentní způsob, jak stáhnout podmnožiny mřížkovaných a tabulkových vědeckých souborů v běžných formátech souborů a vytvářet grafy a mapy.ERDDAP™pracuje s daným datovým souborem buď jako skupina multidimenzionálních roštových proměnných (Například satelitní nebo modelová data) nebo jako databázová tabulka (se sloupcem pro každý typ informací a řádek pro každé pozorování) .ERDDAP™je svobodný a otevřený zdroj software, takže každý může[stáhnout a instalovatERDDAP™](/docs/server-admin/deploy-install)sloužit jejich datům.

Přidání datového souboru doERDDAP™instalace,ERDDAP™Správce musí přidat část XML popisující soubor do souboru zvanéhodatasets.xml. (Existuje.[důkladná dokumentace prodatasets.xml](/docs/server-admin/datasets).) I když je možné vytvořit část XML prodatasets.xmlzcela ručně,ERDDAP™přichází s nástrojem s názvem[ **GenerovatDatasetsXml** ](/docs/server-admin/datasets#tools)který může generovat hrubý návrh části XML potřebné pro daný datový soubor na základě některého zdroje informací o datovém souboru.

První věc GenerovatDatasets Xml se ptá, jaký typ datového souboru chcete vytvořit. Generovat soubory dat Xml má speciální možnost, **EDDTableFromEML** , který používá informace v[Jazyk ekologických metadat (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML soubor pro generování části XML prodatasets.xmlvytvořit[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)Soubor údajů z každé datové tabulky v EML souboru. To funguje velmi dobře pro většinu EML souborů, většinou proto, že EML soubory dělat vynikající práci ukládání všech potřebných metadat pro datový soubor ve snadno-k-práce-s formátem. Informace, které GenerateDatasetsXml potřebuje vytvořit soubory, jsou v EML souboru, včetně URL pro datový soubor, který GenerateDatasetsXml ke stažení, parses, a porovnává s popisem v EML souboru. (Mnoho skupin by udělalo dobře přejít na EML, což je skvělý systém pro dokumentování jakéhokoliv tabulárního vědeckého souboru, nejen ekologických dat. A mnoho skupin, které vytvářejí XML schémata by udělalo dobře použít EML jako případovou studii pro XML schéma, které jsou jasné, do té míry, ne příliš hluboko (tj. příliš mnoho úrovní) , a snadno pro lidi a počítače pracovat s.) 

## Otázky{#questions} 

Zde jsou všechny otázky GenerovatDatasets Xml se zeptá, s komentáři o tom, jak byste měli odpovědět, pokud chcete zpracovat pouze jeden EML soubor nebo várku EML souborů:

* Který typ?
Pokud chcete zpracovat pouze jeden soubor, odpověď: EDDTableFromEML
Pokud chcete zpracovat skupinu souborů, odpověď: EDDTableFromEMLBatch
* Adresář pro ukládání souborů?
Zadejte název adresáře, který bude použit pro ukládání stažených EML a/nebo datových souborů.
Pokud adresář neexistuje, bude vytvořen.
*    (Pro EDDTableFromEML pouze) EML URL nebo místní souborJméno?
Zadejte URL nebo místní název souboru EML.
*    (Pouze pro EDDTableFromEMLBatch) EML dir (URL nebo místní) ?
Zadejte název adresáře s EML soubory (URL nebo místní dir) .
Například: http://sbc.lternet.edu/data/eml/files/
 
*    (Pouze pro EDDTableFromEMLBatch) Jméno souboru regex?
Zadejte regulární výraz, který bude použit k identifikaci požadovaných EML souborů v EML adresáři.
Například: knb-lter-sbc\\.\\d+
* Použít místní soubory, pokud jsou přítomny (pravda|false) ?
Zadejte true pro použití stávajících místních EML souborů a datových souborů, pokud existují.
Zadejte false a vždy znovu stáhněte EML soubory a/nebo datové soubory.
* přístupný Kam?
Pokud chcete, aby nové datové soubory byly soukromé soubory vERDDAP, uveďte název skupiny (án) bude mít přístup.
Doporučeno pro skupiny LTER: kombinovat "lter" a skupinu, např., lter Sbc .
Pokud zadáte "null," nebude žádné&lt;přístupný Na značku výstupu.
Viz[přístupný Do](/docs/server-admin/datasets#accessibleto).
* místní TimeZone (např. US/Pacific) ?
Pokud časová proměnná označuje, že má místní časové hodnoty, bude toto časové pásmo přiděleno.
To musí být hodnota z[TZ sloupec seznam názvů časových pásem](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Všimněte si všech snadno použitelných jmen "US/..." na konci seznamu.
Pokud později zjistíte, že je nesprávné, můžete změnittime\\_zonev částidatasets.xml.

EML plusERDDAP™je skvělá kombinace, protožeERDDAP™může uživatelům více přímý přístup k bohatství[Znalostní síť pro biokomplexitu (KNB) ](https://knb.ecoinformatics.org/)a[Dlouhodobý ekologický výzkum (LTER) ](https://lternet.edu/)údaje a pomoc těmto projektům splnit americkou vládu[Přístup veřejnosti k výsledkům výzkumu (PARR) požadavky](https://nosc.noaa.gov/EDMC/PD.DSP.php)zpřístupněním údajů prostřednictvím webové služby. Také, EML plusERDDAP™Vypadá to jako velký most mezi vědci v akademické / NSF-financované oblasti a vědci ve federální agentuře (NOAA, NASA, USS) říše.

Podívejte se na naše[oddíl o získání dodatečné podpory](/docs/intro#support).
 
## Detaily návrhu{#design-details} 

Zde jsou detaily návrhu volby EDDTableFromEML v GenerateDatasetsXml.
Některé jsou spojeny s rozdíly v tom, jak EML aERDDAP™dělat věci a jak generovatDatasety Xml se zabývá těmito problémy.

### Jeden datovýTable se stává jednímERDDAP™Soubor dat{#one-datatable-becomes-one-erddap-dataset} 
Jeden EML soubor může mít více&lt;údaje Tabulka&gt;s.ERDDAP™udělá jedenERDDAP™Soubor údajů podle dataTable EML. ThedatasetIDpro soubor údajů je
 *EMLName* \\_ t *TabulkaČíslo*   (když je EMLname text) nebo
 *systém\\_ EMLName* \\_ t *TabulkaČíslo*   (pokud je EMLname číslo) .
Například tabulka #1 v souboru knb-lter-sbc.28 se stáváERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Téměř všechny metadata v EML souborů dostane doERDDAP, ale v jiném formátu.ERDDAP™používá[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)a[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Standardy metadat. Jedná se o doplňkové systémy metadat, které používají páry key=value pro globální metadata a pro metadata každé proměnné.
Ano, EML reprezentace metadat je hezčí než CF+ACDD reprezentace. Nenaznačuji použít CF+ACDD reprezentaci jako náhradu za EML. Představte si, prosím, CF+ACDD jako součást mostu z EML světa doOPeNDAP/CF/ACDD svět.
     
### Malé změny{#small-changes} 
ERDDAP™dělá spoustu malých změn. Například,ERDDAP™používá EML non-DOIalternativní Identifikátor plus číslo datové tabulky jakoERDDAP™ datasetID, ale mírně se mění střídavě Identifikátor, který z něj udělá platný variabilní název ve většině počítačových jazyků, např. údaje knb-lter-sbc.33 Tabulka #1 se stává knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML používá DocBook markup systém k poskytování struktury do bloků textu v EML soubory. CF a ACDD vyžadují, aby metadata byla prostý text. So GenerateDatasets Xml přeměňuje označený text na prostý text, který vypadá jako formátovaná verze textu. Inline značky jsou sanovány hranatými závorkami, např.,\\[zdůrazněno\\], a vlevo v prostém textu.
     
### Datové soubory{#data-files} 
Vzhledem k tomu, EML dataTable obsahuje URL skutečného datového souboru, GenerateDatasets Xml bude:
1. Stáhněte si datový soubor.
2. Uložit ve stejném adresáři jako EML soubor.
3. Přečti si data.
4. Porovnejte popis dat v EML se skutečnými údaji v souboru.
5. Pokud generovatNastavení dat Xml najde rozdíly, jedná s nimi, nebo se zeptá operátora, zda jsou rozdíly v pořádku, nebo vrací chybovou zprávu. Podrobnosti jsou v různých položek níže.
         
### .zip'd Datové soubory{#zipd-data-files} 
Pokud je referenčním datovým souborem.zipSoubor, musí obsahovat jen jeden soubor. Tento soubor bude použit proERDDAP™Soubor dat. Pokud je více než 1 soubor.ERDDAP™Odmítne tento soubor údajů. V případě potřeby by to mohlo být změněno. (V praxi mají všechny soubory SBC LTER pouze jeden datový soubor.)   
     
### Typ úložiště{#storagetype} 
Pokud je sloupec uložen Typ není specifikován,ERDDAP™používá svůj nejlepší odhad na základě údajů v datovém souboru. Funguje to docela dobře.
     
### Jednotky{#units} 
ERDDAP™použití[UDUNITSformátování jednotek](https://www.unidata.ucar.edu/software/udunits/). Generovat soubory dat Xml je schopen převést EML jednotky naUDUNITSČistě asi 95% času. Zbývajících 5% má za následek čitelný popis jednotek, např. "biomassDensityUnitPerAbundanceUnit" v EML se stává "jednotkou hustoty biomasy na jednotku hojnosti" vERDDAP. Technicky to není dovoleno. Nemyslím si, že je to za těchto okolností tak špatné.\\[Pokud je to nutné, jednotky, které nelze vyrobitUDUNITSkompatibilní lze přesunout na atribut komentáře proměnné.\\]  
     
### EML verze 2.1.1{#eml-version-211} 
Tato podpora pro EML v2.1.1 souborů byla přidána do GenerateDatasets Xml v roce 2016 s nadějí, že by došlo k přijetí v EML komunitě. Od roku 2020 se to nestalo. TheERDDAP™Vývojáři by rádi přidali podporu pro novější verze EML, ale pouze pokud nové funkce budou skutečně použity. Prosím, e-mailerd.data at noaa.govpokud chcete podporu pro novější verze EML a bude skutečně používat tuto funkci.
     

## Otázky s EML soubory{#issues-with-the-eml-files} 

Existují některé problémy / problémy s EML soubory, které způsobují problémy, když softwarový klient (jako je volba EDDTableFromEML v GenerateDatasetsXML) se snaží interpretovat/zpracovat EML soubory.

* Přestože je zde uvedeno několik otázek, jsou většinou malé a řešitelné problémy. Obecně, EML je skvělý systém a bylo mi potěšením s ním pracovat.
* Tyto jsou zhruba tříděny od nejhoršího / nejčastější až po nejméně špatné / méně časté.
* Většina z nich souvisí s malými problémy v konkrétních EML souborech (které nejsou EML chyba) .
* Většinu lze opravit jednoduchými změnami EML souboru nebo datového souboru.
* Vzhledem k tomu, že LTER lidé staví EML checker pro testování platnosti EML souborů, Přidal jsem některé návrhy níže, pokud jde o funkce, které by mohly být přidány do checker.

Zde jsou otázky:

### Samostatné sloupce dat a času{#separate-date-and-time-columns} 
Některé datové soubory mají samostatné sloupce pro datum a čas, ale žádný jednotný sloupec date+time. V současné době, GenerateDatasets Xml vytváří soubor s těmito samostatnými sloupci, ale není ideální, protože:

* Nejlepší je, když soubory vERDDAP™mají kombinovaný sloupec datum+čas volal"time".
* Často se data nezadajíERDDAP™protože"time"sloupec nemá data datumu a času.

Existují dvě možná řešení:
1. Upravit zdrojový datový soubor pro přidání nového sloupce v datovém souboru (a popsat ji v EML) kde jsou sloupce datumu a času sloučeny do jednoho sloupce. Pak znovu spustit GenerateDatasets Xml tak najde nový sloupec.
2. Použijte[Odvozené proměnné](/docs/server-admin/datasets#script-sourcenamesderived-variables)funkce vERDDAP™definovat novou proměnnou vdatasets.xmlkterý je vytvořen konkretizací data a časových sloupců. Jeden z příkladů se konkrétně zabývá touto situací.
         
### Nekonzistentní názvy sloupců{#inconsistent-column-names} 
EML soubory uvádějí sloupce datového souboru a jejich jména. Bohužel se často liší od jmen sloupců ve skutečném datovém souboru. Normálně je pořadí sloupce v EML souboru stejné jako pořadí sloupce v datovém souboru, i když se názvy mírně liší, ale ne vždy. Generovat soubory dat Xml se snaží odpovídat jménům sloupců. Když nemůže (což je běžné) , to se zastaví, ukázat vám EML / data souboru párů, a zeptejte se, zda jsou správně zarovnané. Pokud zadáte 's' pro přeskočení tabulky, GeneratedDatasetsXml vytiskne chybovou zprávu a přejde do další tabulky.
Řešením je změnit chybná jména sloupců v EML souboru tak, aby odpovídaly názvy sloupců v datovém souboru.
     
### Různé pořadí sloupců{#different-column-order} 
Existuje několik případů, kdy EML zadala sloupce v jiném pořadí, než existují v datovém souboru. Generovat soubory dat Xml se zastaví a zeptá operátora, zda matchups jsou v pořádku, nebo zda by měl být přeskočen soubor dat. Pokud je přeskočena, bude ve výsledném souboru chybová zpráva, např.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Řešením je opravit pořadí sloupců v těchto EML souborech tak, aby odpovídaly pořadí v datových souborech.

Bylo by hezké, kdyby EML checker zkontroloval, že sloupce a sloupce pořadí ve zdrojovém souboru odpovídají sloupce a sloupce pořadí v EML souboru.
    
### Nesprávné numHeaderLines{#incorrect-numheaderlines} 
Několik údajů Tabulky nesprávně stav numHeaderLines=1, např., ...sbc.4011. To způsobujeERDDAP™přečíst první řádek údajů jako názvy sloupců. Snažil jsem se ručně SKIP všechny tyto tabulky dat. Jsou zřejmé, protože bezkonkurenční názvy zdrojových kol jsou všechny hodnoty dat. A pokud existují soubory, které mají chybně numHeaderLines=0, můj systém to nedává najevo. Zde je příklad ze souboru selhání SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Takže chyba se může objevit, jako kdyby GeneraceDatasets Xml si myslí, že první řádek s daty v souboru (např. s 2008-10-01T00:00 atd.) je řádek s názvy sloupců (jako kdyby 2008-10-01T00:00 byla název sloupce) .

Bylo by hezké, kdyby EML checker zkontroloval numheaderLines hodnotu.
    
### numHeaderLines = 0{#numheaderlines--0} 
Některé zdrojové soubory nemají názvy sloupců.ERDDAP™přijímá, že pokud EML popisuje stejný počet sloupců.

Podle mého názoru se to zdá velmi nebezpečné. Mohou být sloupce v jiném pořadí nebo s různými jednotkami. (viz níže) a není způsob, jak ty problémy chytit. Mnohem lepší je, když všechny datové soubory ASCII mají řádek s názvy sloupců.
    
### DateTime Format Strings{#datetime-format-strings} 
EML má standardní způsob, jak popsat formát date time. ale existuje značná odchylka v jeho použití v EML soubory. (V tomhle jsem se mýlil. Vidím EML dokumentaci pro formátString, která se zdá být odpovídající[JavaDatumTimeForhmota specifikace](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), ale které postrádá důležité pokyny o jeho použití, s výsledkem, že formátString je často / obvykle nesprávně používán.) Existuje několik případů s nesprávným případem a/nebo nesprávné zdvojení dopisu a/nebo nestandardní formátování. To klade nepřiměřené břemeno na klienty, zejména softwarové klienty jako GenerateDatasetsXml. Generovat soubory dat Xml se snaží převést nesprávně definované formáty v EML souborech do
[datum/časový formát, kterýERDDAP™vyžaduje](/docs/server-admin/datasets#string-time-units), který je téměř stejný proJava/Joda specifikace časového formátu, ale je mírně více odpouštět.

Bylo by hezké, kdyby EML checker vyžadoval přísné dodržováníJava/Joda/ERDDAPspecifikace časových jednotek a ověřil, že hodnoty času data v tabulce dat mohou být správně rozebrány zadaným formátem.
    
### DatumTime but no time Zone{#datetime-but-no-time-zone} 
Generovat soubory dat Xml hledá sloupec s datem Čas a stanovené časové pásmo (buďZulu: od časových jednotek končících v 'Z' nebo název sloupce nebo definice atributu, která zahrnuje "gmt" nebo "utc" nebo místní: od "lokální" v názvu sloupce nebo definici atributu) . Také je přijatelný soubor s datem sloupce, ale žádný časový sloupec. Přijatelný je také soubor bez data nebo času.

Generovat soubory dat Xml bere všechny "místní" časy jako z časového pásma, které můžete určit pro danou dávku souborů, např. pro SBC LTER, použijte US/Pacific. Informace jsou někdy v komentářích, ale ne ve formě, která je snadné pro počítačový program zjistit.

Soubory, které nesplňují tato kritéria, jsou odmítnuty se zprávou "NO GOOD DATE (ČAS) Variable." Časté problémy jsou:

* Tam je sloupec s daty a sloupec s časy, ale ne datum Časový sloupec.
* Jsou tu časové jednotky, ale časové pásmo není stanoveno.

Další připomínky:
Pokud existuje dobré datum + čas se sloupcem časové zóny, bude tento sloupec označen"time"vERDDAP.ERDDAP™vyžaduje, aby údaje časového sloupce byly srozumitelné/přeměnitelné naZulu/UTC/GMT časové pásmo datumTimes.\\[Moje víra je: používat místní časy a různé formáty datumu a času (Dvouciferné roky&#33; mm/dd/yyy vs dd/mm/yy vs ...) v datových souborech nutí koncového uživatele provádět složité konverze naZulučas pro porovnání údajů z jednoho datového souboru s údaji z druhého. Takže...ERDDAP™standardizuje všechna časová data: Pro časy strun,ERDDAP™vždy používá ISO 8601:2004 (E) standardní formát, například, 1985-01-02T00:00:00Z. Pro numerické časy,ERDDAP™vždy používá"seconds since 1970-01-01T00:00:00Z".ERDDAP™Vždy používáZulu  (UTC, GMT) časové pásmo k odstranění obtíží při práci s různými časovými pásmy a standardním časem versus čas úspor denního světla. So GenerateDatasets Xml hledá EML dataTable sloupec s datem+timeZulu. Je to těžké, protože EML nepoužívá formální slovní zásobu/systém (jako[Java/Jodský formát času](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) pro upřesnění údajů Formát času:
Pokud existuje kol s numerickými hodnotami času (např.Matlabčasy) aZulučasové pásmo (nebo jen data, bez časových sloupců) , používá se jako"time".
Pokud existuje kol s daty datumu a času, použijteZulučasové pásmo, používá se jako"time"a odstraní se jakékoli jiné datum nebo časový sloupec.
Jinak je- li nalezena col s pouhým datem, používá se jako"time"proměnná (bez časového pásma) .
Pokud existuje sloupec údajů a časový sloupec a žádné kombinované datum Časový sloupec, soubor údajů je VYJÁDŘEN  díru, ale soubor údajů by mohl být použit přidáním kombinovaného data Časový sloupec (pokud možno,Zulučasové pásmo) do datového souboru a přidání jeho popisu do EML souboru.
PŘÍKLAD SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #2.

Bylo by hezké, kdyby EML/LTER vyžadoval zařazení sloupce sZulu  (UTC, GMT) časy časového pásma ve všech příslušných souborech zdrojových dat. Další nejlepší je přidat systém do EML zadattime\\_zoneatribut pomocí standardních názvů (z[Sloupec TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Chybímissing\\_value {#missing-missing_value} 
Některé sloupce používajímissing\\_valueale nevypisujte to do EML metadat, např. srážky\\_mm v knb-lter-sbc.5011 používá -999. Pokud v EML není uvedena žádná chybějící hodnota, GenerateDatasetsXml automaticky hledá společné chybějící hodnoty (např. 99, -99, 999, -999, 999, -9999, atd.) a vytváří tato metadata. Ale ostatní chybí.missing\\_valueNejsou chyceny.

Bylo by hezké, kdyby EML šacher hledal chybímissing\\_values.
    
### Malé problémy{#small-problems} 
Je tu spousta malých problémů. (pravopis, interpunkce) který pravděpodobně najde pouze člověk, který kontroluje každý soubor údajů.

Bylo by hezké, kdyby EML checker hledal pravopis a gramatické chyby. To je obtížný problém, protože slova ve vědě jsou často označeny dáma kouzel. Asi je potřeba upravit lidi.
    
### Neplatné znaky Unicode{#invalid-unicode-characters} 
Některé z EML obsahu obsahuje neplatné Unicode znaky. Jedná se pravděpodobně o znaky z znakové sady Windows, které byly nesprávně kopírovány a vloženy do EML souborů UTF-8. Generovat soubory dat Xml čistí tyto znaky např.,\\[#128\\], takže jsou snadno hledat vERDDAP™ datasets.xmlSložka.

Bylo by hezké, kdyby se na tohle podívala EML. Je snadné najít a snadno opravit.
    
### Různé jednotky sloupců] (# DifferentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Některé EML dataTables definují sloupce, které jsou v rozporu se sloupcemi v datovém souboru, zejména proto, že mají různé jednotky. Generovat soubory dat Xml je označí. Je na provozovateli, aby rozhodl, zda jsou rozdíly v pořádku nebo ne. Tyto se objeví v souboru selhání jako dataTables "SKIPPED." PŘÍKLAD v souboru selhání SBC LTER:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Bylo by hezké, kdyby EML checker zkontroloval, že jednotky odpovídají. Bohužel, to je pravděpodobně nemožné chytit a pak nemožné vyřešit bez kontaktu tvůrce dat, vzhledem k tomu, že zdrojový soubor nezahrnuje jednotky. Rozdíl u výše uvedeného příkladu byl patrný pouze proto, že jednotky byly zahrnuty do názvu zdrojového sloupce a názvu sloupce EML. Kolik dalších datovýchTables mají tento problém, ale jsou nezjistitelné?
    
### Různé verze EML{#different-versions-of-eml} 
Generovat soubory dat Xml je navržen pro práci s EML 2.1.1. Další verze EML bude pracovat do té míry, že odpovídají 2.1.1 nebo že GenerateDatasetsXml má zvláštní kód, aby se s tím vypořádat. Tohle je vzácný problém. Když nastane, řešení je převést své soubory na EML 2.1.1, nebo poslat EML souborerd.data at noaa.gov, takže mohu provést změny v GenerateDatasets Xml se vypořádat s rozdíly.

Bob přidal podporu EML souborů do GenerateDatasets Xml v roce 2016 s nadějí, že by došlo k přijetí v EML komunitě. Od roku 2020 se to nestalo. Bob rád přidá podporu pro novější verze EML, ale pouze pokud nové funkce budou skutečně použity. Prosím, e-mailerd.data at noaa.govpokud chcete podporu pro novější verze EML a bude skutečně používat tuto funkci.
    
### Problémy při analýze datového souboru{#trouble-parsing-the-data-file} 
Vzácně lze datovýTable odmítnout chybou "neočekávaný počet položek na řádku #120 (pozorované=52, očekávané=50) " Taková chybová zpráva znamená, že řádek v datovém souboru má jiný počet hodnot než ostatní řádky. Může to být problémERDDAP™  (např. správně neprohlídnout soubor) nebo ve složce. PŘÍKLAD SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, viz datafile=LTER\\_měsícly\\_bottledata\\_registred\\_stations\\_20140429.txt
