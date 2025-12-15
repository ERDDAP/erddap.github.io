---
title: "NCCSV 1.00"
---

# NCCSV -
A NetCDF -Kompatibilní specifikace souboru ASCII CSV,
Verze 1.00

Bob Simons a Steve Hankin
"NCCSV" od Boba Simonse a Steva Hankina má licenci podle [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Úvod](#introduction)  {#introduction} 

Tento dokument určuje formát textového souboru ASCII CSV, který může obsahovat všechny informace (metadata a údaje) který lze nalézt v NetCDF   .nc soubor, který obsahuje tabulku dat podobnou CSV souboru. Přípona souboru pro textový soubor ASCII CSV následující po této specifikaci musí být .csv, aby bylo možné snadno a správně číst do tabulkových programů jako Excel a Google Sheets. Bob Simons bude psát software pro převod NCCSV soubor do NetCDF - 3 (a možná také NetCDF - 4)   .nc soubor, a naopak, bez ztráty informací. Bob Simons se změnil. [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) podporovat čtení a psaní tohoto typu souboru.

Formát NCCSV je navržen tak, aby tabulkový software, jako jsou Excel a Google Sheets, mohl importovat NCCSV soubor jako csv soubor, se všemi informacemi v celách tabulky připravené k editaci. Nebo lze vytvořit tabulku od nuly po NCCSV konvencích. Bez ohledu na zdroj tabulky, pokud je exportován jako .csv soubor, bude odpovídat specifikaci NCCSV a žádné informace nebudou ztraceny. Jedinými rozdíly mezi soubory NCCSV a analogickými tabulkovými soubory, které se řídí těmito úmluvami, jsou:

* NCCSV soubory mají hodnoty na řádku oddělené čárkami.
Tabulky mají hodnoty na lince v přilehlých buňkách.
* Struny v souborech NCCSV jsou často obklopeny dvojitými uvozovkami.
Struny v tabulkách nejsou nikdy obklopeny dvojitými uvozovkami.
* Vnitřní dvojité kotace (") v Struny v NCCSV souborech se zobrazují jako 2 dvojité uvozovky.
Vnitřní dvojité citace v tabulkách se zobrazují jako 1 dvojitá citace.

Viz [Tabulkový list](#spreadsheets) sekce níže pro více informací.

### Streamovatelné{#streamable} 
Stejně jako CSV soubory obecně, NCCSV soubory jsou streamovatelné. Pokud je tedy NCSV generován on-the-fly datovým serverem, jako je [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , server může začít streamovat data do dotazovatele dříve, než budou shromážděna všechna data. Je to užitečná a žádoucí vlastnost. NetCDF Naproti tomu soubory nelze streamovat.

###  ERDDAP™  {#erddap} 
Tato specifikace je navržena tak, aby NCCSV soubory a .nc soubory, které mohou být vytvořeny z nich mohou být použity [ ERDDAP™ datový server](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (prostřednictvím [EDDTableFromNccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles) a [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Typy souborů údajů) , ale tato specifikace je externí ERDDAP . ERDDAP™ má několik požadovaných globálních atributů a mnoho doporučených globálních a proměnných atributů, většinou založených na atributech CF a ACDD (viz
 [/docs/server-admin/datasets#globální atributy](/docs/server-admin/datasets#global-attributes) ).

### Zůstatek{#balance} 
Návrh formátu NCCSV je bilance několika požadavků:

* Soubory musí obsahovat všechna data a metadata, která by byla v tabulce NetCDF soubor, včetně specifických datových typů.
* Soubory musí být schopny číst a pak zapisovat z tabulky bez ztráty informací.
* Soubory musí být pro lidi snadné vytvářet, upravovat, číst a chápat.
* Soubory musí být schopny jednoznačně analyzovat pomocí počítačových programů.

Pokud se některé požadavky v tomto dokumentu jeví podivné nebo vybíravé, je pravděpodobně nutné splnit jeden z těchto požadavků.

### Ostatní specifikace{#other-specifications} 
Tato specifikace odkazuje na několik dalších specifikací a knihoven, se kterými má pracovat, ale tato specifikace není součástí žádné z těchto jiných specifikací, ani nepotřebuje žádné změny, ani s nimi není v rozporu. Pokud zde není uveden detail týkající se jednoho z těchto standardů, viz související specifikace. To zahrnuje zejména:

* Úmluva o atributu pro odhalení datových souborů (ACDD) standard metadat:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* Klima a předpovědi (CF) standard metadat:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* The NetCDF Uživatelská příručka (NUG) :
     [https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* The NetCDF softwarové knihovny jako NetCDF - Java a NetCDF -c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Tyto knihovny nemohou číst NCCSV soubory, ale mohou číst .nc soubory vytvořené z NCCSV souborů.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Zápis{#notation} 
V této specifikaci, závorkách, \\[   \\] , označuje nepovinné položky.

##  [Struktura souboru](#file-structure)  {#file-structure} 

Kompletní NCCSV soubor se skládá ze dvou sekcí: sekce metadat, následovaná datovou sekcí.

NCCSV soubory musí obsahovat pouze 7-bitové ASCII znaky. Z tohoto důvodu může být soubor znaků nebo kódování použitý pro zápis a čtení souboru libovolnou sadou znaků nebo kódováním, které je kompatibilní se sadou znaků ASCII 7-bit, např. ISO-8859-1. ERDDAP™ čte a píše NCCSV soubory s ISO-8859-1 charset.

NCCSV soubory mohou používat buď nový řádek ( \\n )   (což je běžné na počítačích Linux a Mac OS X) nebo kočárReturn plus newline ( \\r\\n )   (což je běžné na počítačích Windows) jako koncové značky, ale ne obojí.

###  .nccsv Metadata{#nccsvmetadata} 
Když to tvůrce i čtenář očekávají, je také možné a někdy užitečné vytvořit variantu NCCSV souboru, který obsahuje pouze část metadat (včetně\\*END\\_METADATA\\*řádek) . Výsledkem je úplný popis atributů souboru, jmen proměnných a datových typů, čímž slouží stejnému účelu jako odpovědi .das plus .dds z an OPeNDAP server. ERDDAP™ vrátí tuto změnu, pokud požadujete soubor Type= .nccsv Metadata z ERDDAP™ Soubor dat.

##  [Sekce metadat](#the-metadata-section)  {#the-metadata-section} 

V NCCSV souboru používá každý řádek sekce metadat formát
 [proměnná Název](#variablename) , [atribut Název](#attributename) , [hodnota 1](#value)  \\[ , hodnota 2 \\]  \\[ , hodnota 3 \\]  \\[ , hodnota 4 \\]  \\[ ... \\]   
Prostory před nebo po položek nejsou povoleny, protože způsobují problémy při importu souboru do tabulkových programů.

### Sjezdy{#conventions} 
První řádek NCCSV souboru je první řádek sekce metadat a musí mít [\\*GLOBÁLNÍ\\*](#global) Konvence připisují seznam všech úmluv použitých v souboru jako řetězec obsahující seznam CSV, například:
\\*GLOBÁLNÍ\\*,Konvence," COARDS , CF-1,6, ACDD-1,3, NCCSV-1,0"
Jednou z uvedených úmluv musí být NCCSV-1.0, která odkazuje na aktuální verzi této specifikace.

### END_METADATA{#end_metadata} 
Konec sekce metadat NCCSV souboru musí být označen pouze řádkem
\\*END\\_METADATA\\*

Doporučuje se, ale nevyžaduje se, aby se všechny atributy dané proměnné objevily na přilehlých řádcích sekce metadat. Pokud je NCCSV soubor převeden na NetCDF soubor, pořadí, že proměnnáNázvy první objeví v sekci metadat bude pořadí proměnných v NetCDF Složka.

Volitelné prázdné řádky jsou povoleny v sekci metadat po požadovaném prvním řádku s [\\*GLOBÁLNÍ\\*](#global)   [Sjezdy](#conventions) informace (viz níže) a před požadovaným posledním řádku s\\*END\\_METADATA\\*.

Pokud je z NCCSV souboru vytvořena tabulková tabulka, zobrazí se sekce dat metadat s názvy proměnných ve sloupci A, názvy atributů ve sloupci B a hodnoty ve sloupci C.

Pokud je tabulky následujících konvencí uložena jako soubor CSV, budou na konci řádků v sekci metadat často další čárky. Software, který převádí NCCSV soubory do .nc soubory budou ignorovat další čárky.

###  [proměnná Název](#variablename)  {#variablename} 

 *proměnná Název* je název proměnné citlivé na případ v datovém souboru. Všechny proměnné musí začít 7-bitovým písmenem ASCII nebo podtržením a musí být složeny z 7-bitových ASCII písmen, podtržených a 7-bitových ASCII číslic.
#### GLOBÁLNÍ{#global} 
Speciální proměnnáName [\\*GLOBÁLNÍ\\*](#global) používá k označení globálních metadat.

###  [atribut Název](#attributename)  {#attributename} 

 *atribut Název* je jméno atributu spojeného s proměnnou nebo [\\*GLOBÁLNÍ\\*](#global) . Všechny názvy atributů musí začít 7-bitovým ASCII písmenem nebo podtržením a musí se skládat z 7-bitových ASCII písmen, podtržených a 7-bitových ASCII číslic.

#### SCALAR{#scalar} 
Zvláštní atribut Název\\*SCALAR\\*lze použít k vytvoření skalární datové proměnné a definovat její hodnotu. Datový typ\\*SCALAR\\*definuje datový typ proměnné, takže nespecifikujte\\*DATA\\_TYPE\\*atribut pro skalární proměnné. Všimněte si, že v datové sekci NCCSV souboru nesmí být data pro skalární proměnnou.

Například pro vytvoření skalární proměnné s názvem "loď" s hodnotou "Okeanos Explorer" a atribut cf\\_role použijte:
loď,\\*SCALAR\\*"Okeanos Explorer"
loď,cf\\_role,trajektorie\\_id
Když je do proměnné skalárních dat načteno ERDDAP™ , skalární hodnota se převede do sloupce v datové tabulce se stejnou hodnotou v každém řádku.

###  [hodnota](#value)  {#value} 

 *hodnota* je hodnota atributu metadat a musí být pole s jedním nebo více buď byte, krátký, int, dlouhý, plovák, dvojitý, String, nebo znak. Nejsou podporovány žádné jiné datové typy. Atributy bez hodnoty budou ignorovány. Pokud existuje více než jedna dílčí hodnota, musí být dílčí hodnoty stejného datového typu a musí být odděleny čárkami, například:
 sst , actual\\_range ,0.17f,23.58f
Pokud existuje více String hodnot, použijte jeden řetězec s \\n   (nový řádek) znaky oddělující podřetězce.

Definice atributových datových typů jsou:

#### byte{#byte} 
* hodnoty atributu byte (8-bit, podepsaný) musí být napsáno příponou "b," např. -7b, 0b, 7b . Rozsah platných bajtů je -128 až 127. Číslo, které vypadá jako byte, ale je neplatné (např. 128b) vytvoří chybovou zprávu.
     
#### krátké{#short} 
* krátké hodnoty atributu (16-bit, sign.) musí být napsáno příponou "s," např. -30000s, 0s, 30000s. Rozsah platných krátkých hodnot je -32768 až 32767. Číslo, které vypadá jako krátké, ale je neplatné (např. 32768s) vytvoří chybovou zprávu.
     
#### int{#int} 
* hodnoty atributu int (32-bit, sign.) musí být napsány jako JSON ints bez desetinné čárky nebo exponentu, ale s příponou 'i', např. -12067978i, 0i, 12067978i. Rozsah platných int hodnot je -2147483648 až 2147483647. Číslo, které vypadá jako int, ale je neplatné (např. 2147483648i) vytvoří chybovou zprávu.
     
#### dlouhé{#long} 
* dlouhé hodnoty atributu (64-bit, podepsáno, v současné době podporováno NUG a ERDDAP™ ale dosud nepodporovaná CF) musí být napsáno bez desetinné čárky a příponou "L," např. -12345678987654321L, 0L, 12345678987654321L . Pokud používáte konvertující software pro převod NCCSV souboru s dlouhými hodnotami na NetCDF -3 soubor, jakékoli dlouhé hodnoty budou převedeny na dvojnásobek hodnot. Rozsah platných dlouhých hodnot je -9223372036854775808 až 922337236854775807. Číslo, které vypadá jako dlouhé, ale je neplatné (např. 9223372036854775808L) vytvoří chybovou zprávu.
     
#### plavat{#float} 
* hodnoty atributu plováku (32-bit) musí být napsáno příponou "f" a může mít desetinnou čárku a/nebo exponent, např. 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Použijte NaNf pro plovoucí NaN (chybí) hodnota. Rozsah plováků je přibližně +/-3.40282347E+38f (~7 významných desetinných míst) . Číslo, které vypadá jako plovák, ale je neplatné (např. 1,0e39f) vytvoří chybovou zprávu.
     
#### dvakrát{#double} 
* hodnoty dvojího atributu (64-bit) musí být napsáno příponou "d" a může mít desetinnou čárku a/nebo exponent, např. 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Použít NaNd pro dvojité NaN (chybí) hodnota. Rozsah dvojníků je přibližně +/-1.79769313486231570E+308d (~ 15 významných desetinných míst) . Číslo, které vypadá jako dvojité, ale je neplatné (např. 1,0e309d) vytvoří chybovou zprávu.
     
#### String{#string} 
* Hodnoty atributu String jsou posloupností znaků UCS-2 (tj. 2-bajtové Unicode znaky jako Java ) , které musí být napsány jako 7-bit ASCII, JSON-jako řetězce tak, aby mohly být specifikovány jiné než ASCII znaky.
    * Dvojité citace (") musí být zakódováno jako dvě dvojité citace ("") . To je to, co tabulkové programy vyžadují při čtení .csv souborů. To je to, co programy tabulky psát, když uložíte tabulku jako .csv soubor.
    * Speciální JSON backslash-kódované znaky musí být zakódovány jako v JSON (zejména \\n (newline), ale také \\\\ (backslash), \\f (formfeed), \\\t (tab), \\r (carriage return) nebo s [\\\ u *Hhhh* ](#uhhhh) Syntaxe. V tabulce nepoužívejte Alt Enter k určení nového řádku v textové buňce; místo toho použijte \\n   (2 znaky: backslash and 'n ') Naznačit novou linku.
#####  \\uhhh h{#uhhhh} 
    * Všechny znaky menší než znak #32 nebo větší než znak #126, a jinak nezakódované, musí být zakódovány pomocí syntaxe \\u *Hhhh* , kde hhhh je 4-místný hexadecimální číslo znaku, např., Euro znak je \\u20AC. Viz stránky kódů odkazované na [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) najít hexadecimální čísla spojená s konkrétními znaky Unicode nebo použít softwarovou knihovnu.
    * Pokud String má prostor na začátku nebo na konci, nebo zahrnuje " (dvojitá citace) nebo čárka nebo obsahuje hodnoty, které by jinak byly vykládány jako jiný datový typ (např. int) , nebo je slovo "null," celý String musí být přiložen ve dvou citacích; jinak, na rozdíl od JSON, enclosing double citations jsou volitelné. Doporučujeme: když máte pochybnosti, zavřete celý řetězec do dvou citací. Prostory na začátku nebo na konci řetězce jsou silně odrazovány.
    * Prozatím je používání postav větších než #255 odrazováno. NCCSV je podporuje. ERDDAP™ podporuje je interně. Některé typy výstupních souborů je podporují (např. .json a .nccsv ) . Ale mnoho typů výstupních souborů je nepodporuje. Například, NetCDF -3 soubory nepodporuje takové znaky, protože NetCDF soubory používají 1-bajtové znaky a CF v současné době nemá systém pro určení, jak jsou znaky Unicode zakódovány v NetCDF Struny (např. UTF-8) . To se časem pravděpodobně zlepší.
         
#### char{#char} 
* znak atribut hodnoty jsou jeden UCS-2 znak (tj. 2-bajtové Unicode znaky jako Java ) , které musí být psáno jako 7-bit ASCII, JSON-jako znaky tak, aby ostatní znaky mohly být specifikovány (viz výše definice String pro kódování speciálních znaků, s přidáním kódování jedné citace jako \\ ') . Hodnoty atributu Char musí být uvedeny v jednotlivých uvozovkách (vnitřní uvozovky) a dvojité uvozovky (vnější uvozovky) , např. "'a'," "'""""" (dvojcitační znak) , "'\\'" (jediný znak citace) , "'\\ t'" (záložka) , "'\\\ u20AC'" (Euro znak) . Tento systém používání jednoduchých a dvojitých uvozovek je zvláštní a těžkopádný, ale je to způsob, jak rozlišit hodnoty znaku od řetězců způsobem, který pracuje s tabulkovými listy. Hodnota, která vypadá jako znak, ale je neplatná, vytvoří chybovou zprávu. Stejně jako u Strings, použití znaků větších než #255 je v současné době odrazován.

### Sufix{#suffix} 
Všimněte si, že v části atributů NCCSV musí mít všechny číselné hodnoty atributů příponu. (např. 'b') pro identifikaci číselného datového typu (např. byte) . Ale v datové sekci NCCSV souboru nesmí mít číselné hodnoty nikdy tato příponová písmena (s výjimkou "L" pro dlouhá celá čísla) ?\\*DATA\\_TYPE\\*atribut pro proměnnou.

#### DATA_TYPE{#data_type} 
Datový typ pro každý ne- [skalár](#scalar) proměnná musí být specifikována\\*DATA\\_TYPE\\*atribut, který může mít hodnotu byte, krátký, int, dlouhý, plovák, dvojitý, String, nebo znak (případ necitlivý) . Například,
qc\\_flag,\\*DATA\\_TYPE\\*,byte
UPOZORNĚNÍ: Upřesnění správného\\*DATA\\_TYPE\\*je tvoje zodpovědnost. Zadání nesprávného datového typu (např. int, kdy jste měli určit plovák) nevygeneruje chybovou zprávu a může způsobit ztrátu informací (Například hodnoty plováku se zaokrouhlí na ints) při čtení NCCSV souboru ERDDAP™ nebo přeměněn na NetCDF Složka.

### Char Distrovered{#char-discouraged} 
Použití hodnot znakových dat je deprimováno, protože nejsou široce podporovány v jiných typech souborů. hodnoty znaku mohou být v datové sekci zapsány jako jednotlivé znaky nebo jako řetězce (zejména, pokud potřebujete napsat zvláštní znak) . Pokud se najde String, bude první znak Stringu použit jako hodnota znaku. Nulová délka Struny a chybějící hodnoty budou převedeny na znak \\uFFFF. Všimněte si, že NetCDF soubory podporují pouze jednotlivé byte chars, takže všechny znaky větší než znak # 255 budou převedeny na '?' při psaní NetCDF Složky. Pokud není atribut znakové sady použit k určení jiné znakové sady pro proměnnou znaku, použije se znaková sada ISO-8859-1.

### Dlouhá odvaha{#long-discouraged} 
Ačkoli mnoho typů souborů (např. NetCDF -4 a Json) a ERDDAP™ podpora dlouhých hodnot dat, použití dlouhých hodnot dat v souborech NCCSV je v současné době odrazeno, protože v současné době nejsou podporovány Excel, CF a NetCDF - Tři složky. Pokud chcete v NCCSV souboru zadat dlouhé hodnoty dat (nebo v příslušné tabulce Excel) , Musíte použít příponu 'L' tak, aby Excel neléčí čísla jako plovoucí bod čísla s nižší přesností. V současné době, pokud jsou NCCSV soubory převedeny na NetCDF - 3 .nc soubor, dlouhé hodnoty dat budou převedeny na dvojí hodnoty, což způsobí ztrátu přesnosti pro velmi velké hodnoty (menší než -2^53 nebo větší než 2^53) .

### CF, ACDD a ERDDAP™ Metadata{#cf-acdd-and-erddap-metadata} 
Protože se předpokládá, že většina NCCSV souborů, nebo .nc soubory vytvořené z nich, budou přečteny do ERDDAP , důrazně se doporučuje, aby NCCSV soubory obsahují atributy metadat, které jsou požadovány nebo doporučené ERDDAP™ (viz
 [/docs/server-admin/datasets#globální atributy](/docs/server-admin/datasets#global-attributes) ). Vlastnosti jsou téměř všechny ze standardů CF a ACDD metadat a slouží k správnému popisu datového souboru (Kdo, co, kdy, kde, proč, jak) pro někoho, kdo jinak neví nic o datovém souboru. Zvláštní význam by měly mít téměř všechny číselné proměnné atribut jednotek s UDUNITS -kompatibilní hodnota, např.
 sst , jednotky, stupeň\\_C

Je v pořádku zahrnout další atributy, které nejsou ze standardů CF nebo ACDD nebo z ERDDAP .

##  [Oddíl údajů](#the-data-section)  {#the-data-section} 

###  [Struktura](#structure)  {#structure} 

První řádek datové sekce musí mít seznam názvů proměnných, který je citlivý na případy, oddělený čárkou. Všechny proměnné v tomto seznamu musí být popsány v sekci metadat a naopak (jiné než [\\*GLOBÁLNÍ\\*](#global) atributy a [\\*SCALAR\\*](#scalar) proměnné) .

Druhý přes předposlední řádky datové sekce musí mít čárkový seznam hodnot. Každý řádek údajů musí mít stejný počet hodnot jako čárka oddělený seznam názvů proměnných. Prostory před nebo po hodnotách nejsou povoleny, protože způsobují problémy při importu souboru do tabulkových programů. Každý sloupec v tomto oddíle musí obsahovat pouze hodnoty\\*DATA\\_TYPE\\*určené pro tuto proměnnou\\*DATA\\_TYPE\\*atribut pro tuto proměnnou. Na rozdíl od části atributů nesmí mít číselné hodnoty v datové sekci příponu pro označení datového typu. Na rozdíl od části atributů mohou hodnoty znaku v datové sekci vynechat enclosing single citations, pokud nejsou potřebné pro deambiciaci (tak, ',' a '\\' ', jak je uvedeno zde) . V NCCSV souboru může být nějaký počet těchto řádků dat, ale v současné době ERDDAP™ lze číst pouze soubory NCCSV s až 2 miliardami řad. Obecně se doporučuje rozdělit velké datové soubory na více souborů NCCSV s méně než 1 milion řádků.

#### Ukončit údaje{#end-data} 
Konec datové sekce musí být označen pouze řádkem
\\*END\\_DATA\\*

Pokud je další obsah v NCCSV souboru po\\*END\\_DATA\\*řádek, bude ignorován při přeměně NCCSV souboru na .nc Složka. Takový obsah je proto odrazován.

V tabulce, která následuje po těchto konvencích, budou názvy proměnných a hodnoty dat ve více sloupcích. Viz příklad níže.

###  [Chybějící hodnoty](#missing-values)  {#missing-values} 

Počet chybějících hodnot může být zapsán jako numerická hodnota určená missing\\_value nebo atribut \\_FillValue pro tuto proměnnou. Viz například druhá hodnota v tomto řádku dat:
Bell M. Shimada, 99,123.4
To je doporučený způsob, jak zvládnout chybějící hodnoty pro byte, krátké, int, a dlouhé proměnné.

float nebo double NaN hodnoty mohou být zapsány jako NaN. Viz například druhá hodnota v tomto řádku dat:
Bell M. Shimada, NaN,123.4

Smyčcové a numerické chybějící hodnoty mohou být označeny prázdným polem. Viz například druhá hodnota v tomto řádku dat:
Bell M. Shimada, 123.4

Pro byte, krátké, int, a dlouhé proměnné, NCCSV převodník nástroj a ERDDAP™ převést prázdné pole na maximální povolenou hodnotu pro tento datový typ (např. 127 pro bajty) . Pokud to uděláte, určitě přidejte missing\\_value nebo atribut \\_FillValue pro tuto proměnnou pro identifikaci této hodnoty, např.
 *proměnná Název* ,\\_FillValue,127b
Pro float a dvojité proměnné bude prázdné pole převedeno na NaN.

###  [Hodnoty dataTime](#datetime-values)  {#datetime-values} 

Hodnoty DateTime (včetně hodnot datumu, které nemají časovou složku) mohou být zastoupeny jako čísla nebo jako Struny v NCCSV souborech. Zadané datumTime proměnné mohou mít pouze String hodnoty nebo pouze číselné hodnoty, ne obojí. NCCSV software převede hodnoty String dateTime na numerické datum Hodnoty času při vytváření .nc soubory (podle požadavků CF) . Hodnoty string dateTime mají tu výhodu, že jsou snadno čitelné lidmi.

Hodnoty DateTime zastoupené jako číselné hodnoty musí mít atribut jednotek, který určuje " *jednotky* od *datum Čas* " podle požadavků CF a určených UDUNITS např.
čas, jednotky, sekundy od 1970-01-01T00:00:00Z

Hodnoty DateTime představující hodnoty String musí mít String\\*DATA\\_TYPE\\*atribut a atribut jednotek, který určuje datum Časový vzorec podle specifikace Java Třída DateTimeForhmota
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . Například,
čas, jednotky, yyyy-MM-dd T'HH:mm:ssZ
Všechny hodnoty dataTime pro danou datovou proměnnou musí používat stejný formát.
Ve většině případů bude dateTime vzor, který potřebujete pro atribut jednotek, variací jednoho z těchto formátů:

*    yyyy-MM-dd T'HH:mm:ss. SSSZ, což je ISO 8601:2004 (E) datum Časový formát. Možná budete potřebovat zkrácenou verzi, např. yyyy-MM-dd T'HH:mm:ssZ (pouze doporučený formát) nebo yyyy-MM-dd . Pokud měníte formát vašich dateTime hodnot, NCCSV důrazně doporučuje změnit tento formát (možná zkrácené) . Toto je formát, který ERDDAP™ použije, když píše NCCSV soubory.
* rrrrMMddHHmmss.SSS  Časový formát. Můžete potřebovat zkrácenou verzi tohoto, např. rrrrMMdd.
* M/d/rrrr H:mm:ss. Systém SSS, který zpracovává data a data ve stylu USA, jako je "3/23/2017 16:22:03.000." Můžete potřebovat zkrácenou verzi, např. M/d/rrrr .
* YYYDDDHmmssSSS ? což je rok plus nula-polstrovaný den roku (např. 001 = 1. leden 365 = 31. prosinec v nelegálním roce; to je někdy chybně nazýváno Julian datum) . Můžete potřebovat zkrácenou verzi tohoto, např. rrrrDDD .

#### Přesnost{#precision} 
Když knihovna softwaru konvertuje .nc soubor do NCCSV souboru, celé datum Časové hodnoty budou napsány jako řetězce s ISO 8601:2004 (E) datum Časový formát, např. 1970-01-01T00:00:00Z . Přesnost můžete ovládat pomocí ERDDAP - specifický atribut time\\_precision . Viz
 [/docs/server-admin/datasets# time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Časové pásmo{#time-zone} 
Výchozí časové pásmo pro datum Časové hodnoty jsou Zulu   (nebo GMT) časové pásmo, které nešetří denní světlo. Pokud má proměnná dateTime hodnoty dateTime z jiného časového pásma, musíte to zadat pomocí ERDDAP - specifický atribut time\\_zone . To je požadavek pro ERDDAP™ (viz
 [/docs/server-admin/datasets# time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Hodnoty stupně](#degree-values)  {#degree-values} 

Jak vyžaduje CF, všechny hodnoty stupně (např. u zeměpisné délky a zeměpisné šířky) musí být specifikovány jako dvojité hodnoty desetinného stupně, nikoli jako stupeň°min'sec" String nebo jako samostatné proměnné pro stupně, minuty, sekundy. Směrové konstrukce N, S, E a W nejsou povoleny. Použijte záporné hodnoty pro západní délky a pro jižní šířky.

##  [DSG Typy funkcí](#dsg-feature-types)  {#dsg-feature-types} 

NCCSV soubor může obsahovat CF Diskrétní odběr vzorků geometrie
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) data. Jsou to atributy, díky kterým to funguje:

1. Jak vyžaduje CF, musí soubor NCCSV obsahovat řádek v sekci metadat označující [\\*GLOBÁLNÍ\\*](#global)   featureType atribut, např.,
    \\*GLOBÁLNÍ\\*, featureType ,trajektorie
2. Pro použití v ERDDAP™ , NCCSV soubor musí obsahovat řádek nebo řádky v sekci metadat označující proměnné cf\\_role=...\\_id, např.
loď,cf\\_role,trajektorie\\_id
To je volitelné pro CF, ale požadované v NCCSV.
3. Pro použití v ERDDAP™ , NCCSV soubor musí obsahovat řádek nebo řádky v sekci metadat, které proměnné jsou spojeny s každým časemSérie, trajektorie, nebo profil, jak požaduje ERDDAP™ (viz
     [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ), např.
    \\*GLOBÁLNÍ\\*,cdm\\_trajectory\\_variables,"ship"
nebo
    \\*GLOBÁLNÍ\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

##  [Soubor vzorku](#sample-file)  {#sample-file} 

Zde je ukázkový soubor, který ukazuje mnoho funkcí NCCSV souboru:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
Poznámky:

* Tento soubor obsahuje mnoho složitých případů (např. znakové a dlouhé proměnné a obtížné hodnoty řetězce) . Většina NCCSV souborů bude mnohem jednodušší.
* Licenční čára je zde rozdělena do dvou řádků, ale je to jen jeden řádek ve vzorku souboru.
* \\u20AC je kódování znaku Euro a \\u00FC je kódování ü.
* Mnoho Struny v příkladu jsou přiloženy dvojími uvozovkami, i když nemusí být např. mnoha globálními atributy včetně názvu, atributu lon jednotek a třetího řádku dat.)
* Bylo by jasnější a lepší, kdyby atribut jednotek pro testDlouhá proměnná byla zapsána ve dvoucitacích, což naznačuje, že je hodnota Stringu. Ale současné zastoupení (1, bez kotací) bude interpretován správně jako String, ne celé číslo, protože neexistuje žádný 'i' přípona.
* Na rozdíl od jiných numerických datových typů mají dlouhé hodnoty v datovém oddílu příponu ("L") který identifikuje jejich číselný datový typ. To je nutné, aby se zabránilo tomu, aby tabulky interpretovaly hodnoty jako čísla plovoucích bodů, a tím ztratily přesnost.

##  [Tabulky](#spreadsheets)  {#spreadsheets} 

V tabulce, stejně jako v NCCSV souboru:

* Zapsat číselné hodnoty atributu, jak je uvedeno pro NCCSV soubory (např. s příponou, např. 'f', pro identifikaci datového typu atributu) .
* V řetězech napište všechny znaky menší než ASCII znak #32 nebo větší než znak #126 jako buď JSON-jako backslashed znak (např. \\n pro nový řádek) nebo jako hexadecimální znakové číslo Unicode (případ necitlivý) se syntaxi [\\\ u *Hhhh* ](#uhhhh)   (např. \\\u20AC pro euroznačku) . Použití \\n   (2 znaky: backslash and 'n ') k označení nové linie, nikoli Alt Enter.

Jedinými rozdíly mezi soubory NCCSV a analogickou tabulkou, která se řídí těmito úmluvami, jsou:

* NCCSV soubory mají hodnoty na řádku oddělené čárkami.
Tabulky mají hodnoty na lince v přilehlých buňkách.
* Struny v souborech NCCSV jsou často obklopeny dvojitými uvozovkami.
Struny v tabulkách nejsou nikdy obklopeny dvojitými uvozovkami.
* Vnitřní dvojité kotace (") v Struny v NCCSV souborech se zobrazují jako 2 dvojité uvozovky.
Vnitřní dvojité citace v tabulkách se zobrazují jako 1 dvojitá citace.

Pokud je tabulky následujících konvencí uložena jako soubor CSV, často budou na konci mnoha řádků další čárky. Software, který převádí NCCSV soubory do .nc soubory budou ignorovat další čárky.

###  [Excel](#excel)  {#excel} 

Pro import NCCSV souboru do Excelu:

1. Vyberte soubor: Otevřít .
2. Změnit typ souboru na textové soubory (\\*.prn;\\*.txt; \\*.csv) .
3. Prohledejte adresáře a klikněte na NCCSV .csv soubor.
4. Klepněte na tlačítko Otevřít .

Vytvořit NCCSV soubor z tabulky Excel:

1. Vyberte soubor: Uložit jako .
2. Změnit Uložit jako typ: být CSV (Čárka delimited)   (\\*.csv) .
3. V reakci na upozornění na kompatibilitu klikněte na Ano .
4. Výsledný soubor .csv bude mít na konci všech řádků kromě řádků CSV další čárky. Můžete je ignorovat.

V aplikaci Excel se výše uvedený vzorek NCCSV souboru objeví jako

![vzorekExcel.png](/img/sampleExcel.png)

###  [Google listy](#google-sheets)  {#google-sheets} 

Importovat NCCSV soubor do Google Sheets:

1. Vyberte soubor: Otevřít .
2. Vyberte si nahrát soubor a klikněte na Nahrát soubor z počítače . Vyberte soubor a poté klikněte na Otevřít .
      
Nebo zvolte My Drive a změňte výběr typu souboru na všechny typy souborů . Vyberte soubor a poté klikněte na Otevřít .

Vytvořit NCCSV soubor z tabulky Google Sheets:

1. Vyberte soubor: Uložit jako .
2. Změnit Uložit jako typ: být CSV (Čárka delimited)   (\\*.csv) .
3. V reakci na upozornění na kompatibilitu klikněte na Ano .
4. Výsledný soubor .csv bude mít na konci všech řádků kromě řádků CSV další čárky. Ignoruj je.

##  [Problémy / Varování](#problemswarnings)  {#problemswarnings} 

* Pokud vytvoříte NCCSV soubor s textovým editorem nebo vytvoříte analogickou tabulku v tabulkovém programu, textový editor nebo tabulkový program nebude kontrolovat, zda jste tyto konvence správně sledovali. Je na vás, abyste se řídili těmito sjezdy správně.
* Převod tabulky podle této úmluvy na soubor csv (takže soubor NCCSV) na konci všech řádků kromě řádků dat CSV povede k dalším čárkám. Ignoruj je. Software pak konvertuje NCCSV soubory do .nc soubory je budou ignorovat.
* Pokud NCCSV soubor má nadbytečnou čárku na konci řádků, můžete je odstranit převodem NCCSV souboru do NetCDF soubor a pak převést NetCDF soubor zpět do NCCSV souboru.
* Když se snažíte převést NCCSV soubor do NetCDF soubor, některé chyby budou detekovány software a bude generovat chybové zprávy, což způsobí, že konverze selže. Jiné problémy jsou těžké nebo nemožné chytit a nebudou generovat chybové zprávy nebo varování. Další problémy (Například přebytečné čárky na konci řádku) budou ignorováni. Převodník souborů provede pouze minimální kontrolu správnosti výsledné NetCDF soubor, např. pokud jde o dodržování předpisů CF. Je povinností tvůrce souboru a uživatele souboru ověřit, zda jsou výsledky konverze požadované a správné. Dva způsoby kontroly jsou:
    * Vytiskněte obsah .nc soubor s ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Zobrazit obsah dat v ERDDAP .
