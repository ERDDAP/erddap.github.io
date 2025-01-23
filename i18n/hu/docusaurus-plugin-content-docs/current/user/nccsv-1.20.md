---
title: "NCCSV 1.20"
---

# NCCSV -
ANetCDF- Kompatibilis, UTF-8, CSV File Specification,
Verzió 1.20

Bob Simons és Steve Hankin
"NCCSV" Bob Simons és Steve Hankin engedélyezett alatt[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## [Bevezetés](#introduction) {#introduction} 

Ez a dokumentum egy UTF-8 CSV szöveges fájlformátumot tartalmaz, amely tartalmazza az összes információt (metaadat és adat) ez megtalálható egyNetCDF .ncolyan fájl, amely CSV-file-szerű adattáblát tartalmaz. Az UTF-8 CSV szövegfájlnak a specifikációt követõ fájl kiterjesztése .csv-nek kell lennie, hogy könnyen és helyesen olvashasson olyan táblázatprogramokra, mint az Excel és a Google Sheets. Bob Simons szoftvert ír, hogy egy NCCSV-fájlot egyNetCDF-3 (és talán egyNetCDF-4)  .ncfájl és fordított, információ elvesztése nélkül. Bob Simons módosította[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)az ilyen típusú fájl olvasásának és írásának támogatása.

Az NCCSV formátumot úgy tervezték, hogy az olyan táblázatos szoftverek, mint az Excel és a Google Sheets csv fájlként importálhatnak egy NCCSV fájlt, az összes információval a táblázat celláiban, amelyek készen állnak a szerkesztésre. Vagy egy táblázat létrehozható az NCCSV-egyezményeket követő karcolásból. Függetlenül attól, hogy a táblázat forrása, ha ez után .csv fájlként exportálódik, megfelel az NCCSV specifikációnak, és semmilyen információ nem fog elveszni. Az egyetlen különbség az NCCSV fájlok és az analóg táblázatok között, amelyek követik ezeket az egyezményeket:

* Az NCCSV fájlok értékei a commas által elválasztott vonalon.
A spreadsheets értékei a szomszédos sejtek vonalán.
* Az NCCSV fájlokat gyakran kettős idézetek veszik körül.
A táblákban lévő húrokat soha nem veszik körül kettős idézetek.
* Belső kettős idézetek ("...") Az NCCSV fájlokban található Strings 2 dupla idézetnek tűnik.
Internal dupla idézetek táblák úgy tűnik, mint 1 dupla idézet.

Lásd:[Spreadsheet](#spreadsheets)Az alábbi szakasz több információért.

### Átlátható{#streamable} 
Mint a CSV fájlok általában, az NCCSV fájlok streamable. Így, ha az NCSV-t egy adatkiszolgáló generálja, például[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)A szerver elkezdheti az adatokat a kérőnek továbbítani, mielőtt az összes adatot összegyűjtötték. Ez egy hasznos és kívánatos funkció.NetCDFEzzel szemben a fájlok nem racionalizálhatók.

### ERDDAP {#erddap} 
Ezt a specifikációt úgy tervezték, hogy az NCCSV fájlokat és.ncolyan fájlokat, amelyeket tőlük lehet létrehozni, egy[ERDDAP™Data szerver](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (keresztül[EDDTableFromNccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles)és[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)adatkészlet típusa) de ez a specifikáció külsőERDDAP...ERDDAP™számos szükséges globális tulajdonsággal és számos ajánlott globális és változó tulajdonsággal rendelkezik, többnyire a CF és az ACDD tulajdonságai alapján (lásd:
[/docs/server-admin/adatbázisok#globális tulajdonságok](/docs/server-admin/datasets#global-attributes)).

### Egyensúly{#balance} 
Az NCCSV formátum kialakítása számos követelmény egyensúlya:

* A fájloknak tartalmazniuk kell az összes adatot és metaadatot, amely tabuláris lenneNetCDFfájl, beleértve a konkrét adattípusokat is.
* A fájlokat képesnek kell lennie arra, hogy olvassa el, majd írja ki egy táblát, anélkül, hogy az információ elvesztése lenne.
* A fájloknak könnyűnek kell lenniük az emberek számára, hogy létrehozzák, szerkesztsék, olvassák és értsék.
* A fájloknak képesnek kell lenniük arra, hogy a számítógépes programok egyértelműen párosuljanak.

Ha a dokumentumban egyes követelmények furcsának vagy szelídnek tűnnek, valószínűleg az egyik követelménynek kell megfelelnie.

### Egyéb specifikációk{#other-specifications} 
Ez a specifikáció számos más specifikációra és könyvtárra utal, amelyeket úgy terveztek, hogy együtt dolgozzanak, de ez a specifikáció nem része az egyéb specifikációknak, és nem is kell semmilyen változást nekik, és nem is ellentmond velük. Ha az egyik ilyen szabványhoz kapcsolódó részleteket itt nem határozzák meg, lásd a kapcsolódó specifikációt. Ez különösen magában foglalja:

* Az adatkészlet-felfedezés tulajdonsági egyezménye (ACDD) metadata szabvány:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)...
* Az éghajlat és előrejelzés (CF) metadata szabvány:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)...
* ANetCDFFelhasználói útmutató (NUG) :
    [ https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html)...
* ANetCDFszoftver könyvtárak, mint példáulNetCDFJava ésNetCDFc:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/)... Ezek a könyvtárak nem olvashatják az NCCSV fájlokat, de olvashatók.ncAz NCCSV fájlokból létrehozott fájlok.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### Megjegyzés{#notation} 
Ebben a specifikációban, konzolok,\\[ \\], denote opcionális elemek.

## [File struktúra](#file-structure) {#file-structure} 

A teljes NCCSV fájl két részből áll: a metadata rész, amelyet az adatszekció követ.

Az NCCSV fájlok tartalmazhatnak bármilyen UCS-2 karaktert (i.e., 2 fehér Unicode karakterek, mint aJava) kódolt UTF-8.ERDDAP™olvassa és írja az NCCSV fájlokat az UTF-8 kódolás segítségével.

Az NCCSV fájlok akár újvonalat is használhatnak (\\n)   (amely gyakori a Linux és a Mac OS X számítógépeken) vagy carriageReturn plus newline (\\r\\n)   (ami gyakori a Windows számítógépeken) mint végvonalas markerek, de nem mindkettő.

### .nccsvMetadata{#nccsvmetadata} 
Amikor mind az alkotó, mind az olvasó várja, lehetséges, és néha hasznos, hogy egy változatos NCCSV fájlt, amely csak a metaadat szakaszt tartalmazza (beleértve a\\*END\\_METADATA\\*vonalvonal) ... Az eredmény teljes leírást nyújt a fájl tulajdonságairól, a változó nevekről és az adattípusokról, így ugyanazt a célt szolgálja, mint a .das plus .dds válaszok egyOPeNDAPszerver.ERDDAP™visszaadja ezt a variációt, ha fájlt kér Type=.nccsvMetadata egyERDDAP™adatkészlet.

## [Metadata szakasz](#the-metadata-section) {#the-metadata-section} 

Egy NCCSV fájlban a metadata rész minden sora a formátumot használja
[változó név](#variablename),[tulajdonság név](#attributename),[érték1](#value)\\[,érték2\\]\\[,érték3\\]\\[,érték4\\]\\[...\\]  
Az elemek előtti vagy utáni űrek nem engedélyezettek, mert problémákat okoznak a fájl behozatalakor a táblázatban lévő programokba.

### Egyezmények{#conventions} 
Az NCCSV fájl első sora a metadata rész első vonala, és rendelkeznie kell[\\*Globális\\*](#global)Az egyezmények tulajdonítják a fájlban használt összes egyezmény felsorolását, például a CSV listát tartalmazó String-ként:
\\*Globális\\*, találmányok"COARDSCF-1.6, ACDD-1.3, NCCSV-1.2"
Az egyik felsorolt egyezménynek NCCSV-1.2-nek kell lennie, amely a specifikáció jelenlegi verziójára vonatkozik.

### End Metadata{#end-metadata} 
Az NCCSV-fájl metaadata szakaszának végét csak egy sorral kell denotálni
\\*END\\_METADATA\\*

Javasoljuk, de nem szükséges, hogy az adott változó tulajdonságai a metadata szakasz szomszédos vonalain jelenjenek meg. Ha egy NCCSV fájlt egyNetCDFfájl, a megrendelés, hogy a variableNames először jelenik meg a metaadat szakaszban lesz a sorrend a változók aNetCDFfájl.

Optionális üres vonalak megengedett a metaadat szakaszban a szükséges első sor után[\\*Globális\\*](#global) [Egyezmények](#conventions)információ (lásd alább) és a szükséges utolsó sor előtt\\*END\\_METADATA\\*...

Ha egy táblát egy NCCSV fájlból hoznak létre, a metaadat-adatrész változatos nevekkel fog megjelenni az A oszlopban, a B oszlopban lévő attribútum nevek és a C oszlopban szereplő értékek.

Ha az ilyen egyezményeket követő táblázat CSV-fájlként mentésre kerül, gyakran extra commas lesz a metadatai szakaszban lévő sorok végén. A szoftver, amely átalakítja az NCCSV fájlokat.ncA fájlok figyelmen kívül hagyják az extra commas.

### [változó név](#variablename) {#variablename} 

 *változó név* az adatfájlban változó esetérzékeny neve. Minden változó nevet 7 bites ASCII levéllel vagy alulbecsüléssel kell kezdeni, és 7 bites ASCII betűkkel, alpontokkal és 7 bites ASCII számjegyekkel kell összeállítani.
#### Globális{#global} 
A speciális változóName[\\*Globális\\*](#global)használják, hogy denote globális metaadata.

### [tulajdonság név](#attributename) {#attributename} 

 *tulajdonság név* a változóval vagy[\\*Globális\\*](#global)... Minden tulajdonság neve 7 bites ASCII levéllel vagy alulbecsüléssel kezdődik, és 7 bites ASCII levélből, alpontokból és 7 bites ASCII számjegyből áll.

#### SCALAR{#scalar} 
A különleges tulajdonság név\\*SCALAR\\*Használható egy skalár adat változó létrehozására, és meghatározhatja értékét. Az adattípus\\*SCALAR\\*meghatározza a változó adattípusát, így ne határozza meg a\\*DATA_TYPE\\*a skalár változók tulajdonsága. Vegye figyelembe, hogy az NCCSV fájl adatszekciójában nem lehet adatok.

Például, hogy hozzon létre egy skalár változó neve "hajó" értéke "Okeanos Explorer" és a cf\\_role tulajdonság, használat:
hajó,\\*SCALAR\\*"Okeanos Explorer"
hajó,cf\\_role,trajectory\\_id
Amikor egy skalár adat változó olvashatóERDDAP™, a skalár érték egy oszlopba kerül az adattáblában, azonos értékkel minden sorban.

### [érték](#value) {#value} 

 *érték* a metaadat tulajdonságának értéke, és egy vagy több byte, ubyte, rövid, ubyte, int, ulong, float, kettős, String vagy char. Nincs más adattípus. Az érték nélküli tulajdonságokat figyelmen kívül hagyják. Ha egynél több alérték van, az alértékeknek mind ugyanazon adattípusnak kell lenniük. A Strings-tól eltérő adattípusok esetében például az MUST értékeket a kommák választják el, például:
sst,actual\\_range,0.17f,23.58f
Strings számára használjon egyetlen Stringet\\n  (újdonság) karakterek elválasztják a szubsztringeket.

Az attribútum adattípusok meghatározásai:

#### byte{#byte} 
* byte attribútum értékek (8 bites, aláírt) Meg kell írni a "b", például -7b, 0b, 7b . Az érvényes byte értékek tartománya -128-127. Egy szám, ami úgy néz ki, mint egy byte, de érvénytelen (pl. 128b) Hiányzó értékre fog váltani, vagy hibaüzenetet generál.
     
#### Ubyte{#ubyte} 
* ubyte tulajdonsági értékek (8 bites, nem kijelölt) Meg kell írni a "ub", például 0ub, 7ub, 250ub. Az érvényes byte értékek tartománya 0-255. Egy szám, amely úgy néz ki, mint egy ubyte, de érvénytelen (pl. 256ub) Hiányzó értékre fog váltani, vagy hibaüzenetet generál. Ha lehetséges, használja a byte helyett ubyte, mert sok rendszer nem támogatja a lemondatlan byte (pl. attribútumokNetCDF-3 fájl) ...
     
#### rövid{#short} 
* rövid tulajdonsági értékek (16 bites, aláírt) Meg kell írni a kellék ", pl. -30000s, 0s, 30000s. Az érvényes rövid értékek hatóköre -32768–32767. Egy szám, ami úgy néz ki, mint egy rövid, de érvénytelen (pl. 32768s) Hiányzó értékre fog váltani, vagy hibaüzenetet generál.
     
#### Uraim{#ushort} 
* ushort attribute értékek (16 bites, lemondatlan) Meg kell írni a "mi", például 0us, 30000us, 60000us. Az érvényes rövid értékek tartománya 0-65535. Egy szám, ami úgy néz ki, mint egy wehort, de érvénytelen (pl. 65536us) Hiányzó értékre fog váltani, vagy hibaüzenetet generál. Ha lehetséges, használja rövid helyett ushort, mert sok rendszer nem támogatja a nem aláírt bytes (pl. attribútumokNetCDF-3 fájl) ...
     
#### byte{#byte-1} 
* tulajdonsági értékek (32 bites, aláírt) Írni kell, mint JSON betűk nélkül döntő pont vagy exponens, de a elegendő "i", pl. -12067978i, 0i, 12067978i. Az érvényes int értékek tartománya -2147483648 2147483647. Egy szám, amely úgy néz ki, mint egy int, de érvénytelen (pl.: 2147483648i) Hiányzó értékre fog váltani, vagy hibaüzenetet generál.
     
#### Uint{#uint} 
* Uint attribute értékek (32 bites, lemondatlan) Írni kell, mint JSON betűk nélkül döntő pont vagy exponens, de a elegendő "ui", például 0ui, 12067978ui, 4123456789ui. Az érvényes int értékek tartománya 0–4294967295. Egy szám, amely úgy néz ki, mint egy uint, de érvénytelen (pl.: 2147483648ui) Hiányzó értékre fog váltani, vagy hibaüzenetet generál. Ha lehetséges, használjon int az uint helyett, mert sok rendszer nem támogatja a nem aláírt byte-eket (pl. attribútumokNetCDF-3 fájl) ...
     
#### hosszú{#long} 
* hosszú tulajdonságértékek (64 bites, aláírt, jelenleg a NUG ésERDDAP™de még nem támogatta a CF) Döntési pont nélkül kell írni, és a "L", pl. -12345678987654321L, 0L, 12345678987654321L . Ha használja a konvertáló szoftvert, hogy átalakítsa az NCCSV fájlt hosszú értékekkel egyNetCDF-3 fájl, bármilyen hosszú érték átalakul a kettős értékekre. Az érvényes hosszú értékek tartománya -9223372036854775808 9223372036854775807. Egy szám, ami hosszúnak tűnik, de érvénytelen (9223372036854775808L) Hiányzó értékre fog váltani, vagy hibaüzenetet generál. Ha lehetséges, használjon duplán az ulong helyett, mert sok rendszer nem támogat hosszú ideig (pl.:NetCDF-3 fájl) ...
     
#### Utána{#ulong} 
* ulong attribute értékek (64 bites, lemondatlan, jelenleg NUG ésERDDAP™de még nem támogatta a CF) Döntési pont nélkül kell írni, és a "uL", pl. 0uL, 12345678987654321uL, 9007199254740992uL . Ha használja a konvertáló szoftvert, hogy átalakítsa az NCCSV fájlt hosszú értékekkel egyNetCDF-3 fájl, bármilyen hosszú érték átalakul a kettős értékekre. Az érvényes hosszú értékek tartománya 0–18446744073709551615. Egy szám, amely úgy néz ki, mint egy hosszú, de érvénytelen (pl.: 184467440737095516uL) Hiányzó értékre fog váltani, vagy hibaüzenetet generál. Ha lehetséges, használjon duplán az ulong helyett, mert sok rendszer nem támogatja az aláírt vagy nem írt hosszú ideig (pl.:NetCDF-3 fájl) ...
     
#### Float{#float} 
* Float attribute értékek (32 bites) Meg kell írni a „f”-t, és lehet, hogy döntő pont és / vagy exponens, például 0f, 1f, 12,34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Használja NaNf egy float NaN (hiányzik) érték. Az úszók köre megközelítőleg +/-3.40282347E+38f (7 jelentős decimális számjegy) ... Egy szám, ami úgy néz ki, mint egy úszó, de érvénytelen (pl.: 1.0e39f) Hiányzó értékre fog váltani, vagy hibaüzenetet generál.
     
#### dupla dupla{#double} 
* kettős tulajdonságértékek (64 bites) Meg kell írni a "d" elegendőséggel, és lehet, hogy döntő pont és / vagy exponens, például 0d, 1d, 12,34d, 1e12d, 1.23e + 12d, 1.23e12d, 1.87E-7d. Használja NaNd kettős NaN (hiányzik) érték. A kettős hatótávolság körülbelül +/-1.79769313486231570E+308d (15 jelentős decimális számjegy) ... Egy szám, ami kettősnek tűnik, de érvénytelen (pl.: 1.0e309d) Hiányzó értékre fog váltani, vagy hibaüzenetet generál.
     
#### Hírek{#string} 
* A jellemző értékek az UCS-2 karakterek sorozata (i.e., 2 fehér Unicode karakterek, mint aJava) , amelyet JSON-szerű húrokként kell írni.
    * Dupla idézetek ("...") A String értéken belül két kettős idézetként kell kódolni ("") ... Ez az, amit a táblázatprogramok megkövetelnek az .csv fájlok olvasásakor. Ez az, amit a spreadsheet programok írnak, amikor egy .csv fájlként menti meg a táblát.
    * A speciális JSON backslash kódolt karaktereket egy String értéken belül kell kódolni, mint a JSON (nem valószínű, hogy\\n(újvonal), || (backslash), \\ f (fokozat), \t (ab), \r (fuvarozási visszatérés) vagy[↑u *hhhh* ](#uhhhh)Szintax. Egy táblázatban ne használja az Alt Enter-et, hogy egy szövegsejtben határozzon meg egy új vonalat; ehelyett használjon\\n  (2 karakter: backslash és 'n "...") új vonal jelzésére.
##### uhhhh {#uhhhh} 
    * Minden más karakter kevesebb, mint a karakter #32 kell kódolni a szintax \\u *hhhh* , ahol hhhh a 4 számjegyű hexadecimális szám a karakter.
    * Minden nyomtatható karakter nagyobb, mint a karakter #126, pl. az euró jel, előfordulhat, hogy kódolatlan, például € (Euro karakter) vagy kódolt[↑u *hhhh* ](#uhhhh)szintax, pl.: \\u20AC. Lásd a kódoldalakat hivatkozva[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)megtalálni a speciális Unicode karakterekkel kapcsolatos hexadecimális számokat, vagy használjon szoftverkönyvtárat. Vegyük észre, hogy néhányERDDAP™kimeneti fájltípusok, például .csv, az ISO 8859-1 karakterkészletet használja, így az Unicode karakterek a #255 felett elvesznek, amikor ezeket az adatértékeket ezekre a fájltípusokra írják.
    * Minden nem nyomtatható karakter nagyobb, mint a karakter #126, például a karakter #127, STRONGLY DISCOURAGED, de SHOULD használja a \\uuu *hhhh* szintaxis, ha tartalmazza őket.
    * Ha a sztringnek van egy helye az elején vagy a végén, vagy magában foglalja a " (dupla idézet) vagy egy comma, vagy olyan értékeket tartalmaz, amelyeket egyébként más adattípusként értelmeznek (pl. egy int) Vagy a "null" szó, az egész sztringet kettős idézetbe kell zárni; máskülönben a JSON-val ellentétben a kettős idézetek opcionálisak. Javasoljuk: ha kétséges, zárja be az egész Stringet a kettős idézetekben. A sztring kezdetén vagy végén lévő űrök erősen elriasztottak.
         
#### char{#char} 
* char attribute értékek egyetlen UCS-2 karakter (i.e., 2 fehér Unicode karakterek, mint aJava) ... Nyomtatott karakterek (más, mint a speciális karakterek, mint az újvonal, "," és \") lehet írni, mint az. Különleges karakterek (pl. újline) más nyomtathatatlan karakterek (pl.: #127) Írni kell a[↑u *hhhh* ](#uhhhh)Szintax. A Char attribútum értékeit egyetlen idézetbe kell zárni (a belső idézetek) dupla idézetek (a külső idézetek) , pl. "a", """"" (kettős idézet karakter) , "" \"""" (egyetlen idézet karakter) , "'''''''''''''' (egy lap) , '''''U007F''' (törlesztő "karakter "...") , és "" €" (Euro karakter) ... Ez a rendszer az egységes és kettős idézetek furcsa és nehézkes, de ez egy módja annak, hogy különbséget tegyen a karakterisztikai értékek a Strings-től oly módon, hogy működik a táblázatok. Az érték, amely úgy néz ki, mint egy char, de érvénytelen lesz generálni egy hibaüzenetet. Vegyük észre, hogy néhányERDDAP™kimeneti fájltípusok, például .csv, az ISO 8859-1 karakterkészletet használja, így az Unicode karakterek a #255 felett elvesznek, amikor ezeket az adatértékeket ezekre a fájltípusokra írják.

### Suffix{#suffix} 
Vegye figyelembe, hogy az NCCSV fájl tulajdonságaiban minden numerikus tulajdonsági értéknek elegendő levelet kell tartalmaznia (pl. „b”) azonosítani a számszerű adattípust (pl. byte) ... De egy NCCSV-fájl adatrészében a számszerű adatértékeknek soha nem kell ezeknek elegendő betűkkel rendelkezniük (kivételével a "L" hosszú integrátorok és "uL" az ulong integerek) — az adattípust a\\*DATA_TYPE\\*a változó tulajdonsága.

### Adattípus{#data-type} 
Az adattípus minden egyes nemhez[Skalár](#scalar)A változót egy\\*DATA_TYPE\\*tulajdonság, amely értéke lehet a byte, ubyte, rövid, ushort, int, uint, hosszú, ulong, float, dupla, String vagy char (eseti érzéketlenség) ... Például,
qc\\_flag,\\*DATA_TYPE\\*Betiltás
WARNING: A helyes meghatározása\\*DATA_TYPE\\*a te felelősséged. A rossz adattípus meghatározása (pl. int, ha meg kell határozni a floatot) nem generál hibaüzenetet, és az elveszett információt okozhatja (pl. a float értékek a betűkhöz kerülnek) amikor az NCCSV fájlt olvassa elERDDAP™vagy átalakul egyNetCDFfájl.

### Char felfedezett{#char-discouraged} 
A char adatértékek használata elriasztott, mert nem széles körben támogatott más fájltípusokban. char értékeket lehet írni az adatszekcióban, mint egy karakter, vagy mint Strings (nevezetesen, ha speciális karaktert kell írnia) ... Ha egy String megtalálható, a String első karakterét a char értékeként fogják használni. Zero hossza Strings és hiányzó értékek fognak áttérni karakter \\uFFF. Vegyük észre, hogyNetCDFfájlok csak egyetlen byte chars, így minden chars nagyobb, mint char #255 lesz átalakítva "?", amikor írásNetCDFfájlok. Hacsak egy charset tulajdonságot nem használnak más charset megadására egy jótékonysági változóhoz, az ISO-8859-1 charsetet használnak.

### Hosszú és nem aláírt bizalom{#long-and-unsigned-discouraged} 
A hosszú és nem aláírt típusok feltárultak. Bár sok fájltípus (pl.:NetCDF-4 és json) ésERDDAP™hosszú és nem aláírt támogatás (Ubyte, ushort, uint, ulong) az értékek, a hosszú és nem aláírt értékek használata az NCCSV fájlokban jelenleg elriasztott, mert jelenleg nem támogatják az Excel, a CF és aNetCDF-3 fájl. Ha hosszú vagy nem aláírt értékeket szeretne meghatározni egy NCCSV fájlban (vagy a megfelelő Excel táblázatban) Használja a "L" elegendőt, hogy az Excel ne kezelje a számokat alacsonyabb pontossággal rendelkező lebegő pontszámként. Jelenleg, ha egy NCCSV fájlt egyNetCDF-3.ncfájl, hosszú és hosszan tartó adatértékek átalakulnak kettős értékek, ami miatt elvesztése pontosság nagyon nagy értékek (kevesebb, mint -2^53 hosszú, vagy nagyobb, mint 2^53 hosszú és ulong) ... InkábbNetCDF-3.ncfájlok, ubyte, ushort és uint változók úgy tűnnek, mint byte, rövid és int a \\_Unsigned=true metaadata tulajdonság. InkábbNetCDF-3.ncfájlok, ubyte, ushort és uint attribútumok úgy tűnnek, mint byte, rövid és betűk, amelyek tartalmazzák a megfelelő két kiegészítési értéket (pl. 255ub úgy tűnik, mint -1b) ... Ez nyilvánvalóan baj, ezért aláírt adattípusokat kell használni a nem jelentett adattípusok helyett, amikor csak lehetséges.

### CF, ACDD ésERDDAP™Metadata{#cf-acdd-and-erddap-metadata} 
Mivel elképzelt, hogy a legtöbb NCCSV fájl vagy.nca tőlük létrehozott fájlokat, beolvassákERDDAP, erősen ajánlott, hogy az NCCSV fájlok magukban foglalják a metaadat tulajdonságokat, amelyeket a szükséges vagy ajánlottERDDAP™(lásd)
[/docs/server-admin/adatbázisok#globális tulajdonságok](/docs/server-admin/datasets#global-attributes)). Az attribútumok szinte mindegyike a CF és az ACDD metaadat szabványokból, és az adatkészlet megfelelő leírására szolgálnak (ki, mi, mikor, hol, miért,) valakinek, aki egyébként semmit sem tud az adatkészletről. Különösen fontos, szinte minden numerikus változónak egy egységnek kell lennie egyUDUNITS- kompatibilis érték, pl.
sst,units,degree\\_C

Jó, ha további jellemzőket is tartalmaz, amelyek nem a CF vagy az ACDD szabványokból származnak, vagyERDDAP...

## [Adatrész](#the-data-section) {#the-data-section} 

### [Szerkesztés](#structure) {#structure} 

Az adatszekció első sorának eset-érzékeny, comma-elválasztott listát kell tartalmaznia a változó nevekről. A listán szereplő összes változót a metaadat szakaszban kell leírni, és fordítva (más, mint[\\*Globális\\*](#global)tulajdonságok és[\\*SCALAR\\*](#scalar)változók) ...

Az adatszekció büntető vonalakon keresztül a másodiknak összevett értékek listáját kell tartalmaznia. Minden adatsornak ugyanolyan értékekkel kell rendelkeznie, mint a vígjáték-választott lista a változó nevekről. Az értékek előtti vagy utáni Űrök nem engedélyezettek, mert problémákat okoznak a fájl behozatalakor a táblázatban lévő programokba. Ebben a szakaszban minden oszlopnak csak az értékeket kell tartalmaznia\\*DATA_TYPE\\*az adott változóra vonatkozóan\\*DATA_TYPE\\*ennek a változónak tulajdonítható. Ellentétben az attribútumok rész, numerikus értékek az adatszekcióban nem kell elegendő betűkkel az adattípus megjelöléséhez. Ellentétben az attribútumok szakaszában, az adatszekcióban szereplő char-értékek kihagyhatják a záró idézeteket, ha nem szükségesek a disambiguációhoz (Így a „,” és a „\\”” idézni kell, ahogy itt látható) ... Lehet, hogy ezek az adatsorok száma egy NCCSV fájlban, de jelenlegERDDAP™csak az NCCSV fájlokat olvashatja legfeljebb 2 milliárd sorral. Általánosságban elmondható, hogy a nagy adatkészleteket több NCCSV adatfájlba osztja, amelyek mindegyike kevesebb, mint 1 millió sort tartalmaz.

#### Végadatok{#end-data} 
Az adatszekció végét csak egy sorral kell denotálni
\\*END\\_DATA\\*

Ha van további tartalom az NCCSV fájlban azután\\*END\\_DATA\\*vonal, figyelmen kívül hagyják, ha az NCCSV fájlt egy.ncfájl. Az ilyen tartalom tehát elriasztott.

Ezeknek az egyezményeknek a követése során a változó nevek és adatértékek több oszlopban lesznek. Lásd az alábbi példát.

### [Hiányzó értékek](#missing-values) {#missing-values} 

A számtalan hiányzó értéket numerikus értékként lehet megírni, amelyet egymissing\\_valuevagy a \\_FillValue a változónak tulajdonítható. Például lásd a második értéket ezen adatsorban:
Bell M. Shimada, 99,123.4
Ez az ajánlott módja annak, hogy kezelje a hiányzó értékeket a byte, ubyte, rövid, ushort, int, uint, hosszú és ulong változók.

Float vagy dupla NaN értékek lehet írni, mint NaN. Például lásd a második értéket ezen adatsorban:
Bell M. Shimada, NaN,123.4

A nyomorú és numerikus hiányzó értékeket üres mező jelezheti. Például lásd a második értéket ezen adatsorban:
Bell M. Shimada, 123.4

For byte, ubyte, rövid, ushort, int, uint, hosszú és ulong változók, az NCCSV átalakító hasznosság ésERDDAP™az üres mezőt az adott adattípus maximális megengedett értékévé alakítja át (pl. 127 byte) ... Ha ezt megteszi, győződjön meg róla, hogy hozzáad egymissing\\_valuevagy a \\_FillValue ennek a változónak a tulajdonsága, hogy azonosítsa ezt az értéket, például
 *változó név* \\_FillValue,127b
A float és a kettős változók esetében egy üres mezőt át kell alakítani a NaN-re.

### [DateTime értékek](#datetime-values) {#datetime-values} 

DateTime értékek (beleértve a dátumértékeket, amelyeknek nincs időösszetevője) lehet képviselni, mint számok, vagy mint Strings az NCCSV fájlokat. Egy adott dátumTime változó csak String értékek vagy csak numerikus értékek, nem mindkettő. Az NCCSV szoftver átalakítja a String dateTime értékeket numerikus dátumba Időértékek a létrehozáskor.ncfájlok (a CF által előírt) ... A string dateTime értékek előnye, hogy könnyen olvasható emberek.

A numerikus értékként képviselt DateTime értékeknek olyan egységekkel kell rendelkezniük, amelyek meghatározzák a " *egység* óta *dátum Idő* Amint azt a CF megköveteli, és amelyet aUDUNITSpl.:
Idő, egységek, másodpercek 1970-01-01T00:00Z

A String értékként képviselt DateTime értékeknek erősnek kell lennie\\*DATA_TYPE\\*attribútum és egy olyan egység, amely meghatározza a dátumot Az idő minta, amit a megadottJavaDateTimeFormatter osztály
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) ... Például,
Idő, egységek,yyyy-MM-ddT'HH:mm:ssZ
Az adott adatok változójának összes dátuma ugyanazt a formátumot kell használni.
A legtöbb esetben a dátumTime minta, amire szüksége van az egységek tulajdonsága lesz a variáció az egyik ilyen formátumok:

*   yyyy-MM-ddT'HH:mm:ss. SSSZ - ami az ISO 8601:2004 (EZ) dátum Idő formátum. Szüksége lehet egy rövidített verzióra, például,yyyy-MM-ddT'HH:mm:ssZ (az egyetlen ajánlott formátum) vagyyyyy-MM-dd... Ha megváltoztatja a dátum formátumátTime értékek, NCCSV határozottan javasolja, hogy változtassa meg ezt a formátumot (Talán rövidítve) ... Ez az a formátum, amelyERDDAP™Ha az NCCSV fájlokat írja.
* yyyMddHHmmss.SSS - ez az ISO 8601:2004 dátum kompakt verziója Idő formátum. Szüksége lehet egy rövidített változata ennek, például yyyyMMdd.
* M/d/yyyy H:mm:ss. SSS - amely kezeli az amerikai stílus dátumokat és dátumokatTimes, mint "3/23/2017 16:22:03.000". Szükség lehet egy rövidített változata ennek, pl. M/d/yyyy.
* yyyDDHHmmssSSSS - ez az év, plusz az év nulla beágyazott napja (pl, 001 = Jan 1, 365 = Dec 31 egy nem-levő évben; ez néha tévesen nevezik Julian dátum) ... Szüksége lehet egy rövidített változata ennek, például yyyyDD.

#### Precizitás{#precision} 
Amikor egy szoftverkönyvtár egy.ncfájl egy NCCSV fájlba, minden dátum Időértékeket fognak írni, mint Strings az ISO 8601:2004 (EZ) dátum Idő formátum, pl., 1970-01-01T00:00Z. Ellenőrizheti a pontosságot a pontossággalERDDAP-specifikus tulajdonságtime\\_precision... Lásd
[/docs/server-admin/adatkészletek#time\\_precision](/docs/server-admin/datasets#time_precision)...

#### Időzóna{#time-zone} 
Az alapértelmezett időzóna a dátumhoz Az időértékek aZulu  (vagy GMT) időzóna, amelynek nincs napfény megtakarítási időszaka. Ha egy dátumTime változó dátumaTime értékek egy másik időzónából, meg kell határozni ezt aERDDAP-specifikus tulajdonságtime\\_zone... Ez egy követelmény aERDDAP™(lásd)
[/docs/server-admin/adatkészletek#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [diploma értékek](#degree-values) {#degree-values} 

Amint azt a CF megköveteli, minden fokos érték (pl. a hosszúság és a szélesség) Meg kell határozni, mint a decimal-degree kettős értékek, nem, mint a fok °min'sec" String, vagy külön változó fokozatok, percek, másodpercek. Az iránytervezők N, S, E és W nem engedélyezettek. Használjon negatív értékeket a nyugati hosszúságokra és a déli kapcsolatokra.

## [DSG Jellemző típusok](#dsg-feature-types) {#dsg-feature-types} 

Egy NCCSV fájl tartalmazhat CF Discrete Sampling Geometry
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) adatok. Ez az a tulajdonság, amely ezt a munkát végzi:

1. Amint azt a CF megköveteli, az NCCSV fájlnak tartalmaznia kell egy sort a metaadat szakaszban, amely azonosítja a[\\*Globális\\*](#global) featureTypetulajdonság, pl.
    \\*Globális\\*,featureType,trajekció
2. HasználatERDDAP™Az NCCSV fájlnak tartalmaznia kell egy sort vagy vonalat a cf\\_role=...\\_id változók, pl.
hajó,cf\\_role,trajectory\\_id
Ez opcionális a CF számára, de az NCCSV-ben szükséges.
3. HasználatERDDAP™Az NCCSV-fájlnak tartalmaznia kell egy sort vagy vonalat a metaadat szakaszban, amely azonosítja, hogy mely változók kapcsolódnak minden alkalommalSeries, pályázat vagy profil, amelyet a szükségesERDDAP™(lásd)
    [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)), pl.
    \\*Globális\\*,cdm\\_trajectory\\_variables"ship
vagy
    \\*Globális\\*,cdm\\_timeseries\\_variables",station\\_id,lat,lon"

## [minta fájl](#sample-file) {#sample-file} 

Itt egy mintafájl, amely bemutatja az NCCSV fájl számos jellemzőjét:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.2"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.20
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
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
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
sst,testChars,"','","'""'","'€'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Megjegyzések:

* Ez a minta fájl sok nehéz esetet tartalmaz (pl. char és hosszú változók és nehéz String értékek) ... A legtöbb NCCSV fájl sokkal egyszerűbb lesz.
* A licencvonal itt két sorba kerül, de csak egy sor a mintafájlban.
* ↑u20ac a\\uhhhh kódolás €. \\u00FC a\\uhhhü kódolása. Használhatja közvetlenül a kódolatlan karaktereket is.
* Sok A példabeszédeket kettős idézetek zárják be, annak ellenére, hogy nem kell, pl. sok globális tulajdonság, beleértve a címet, a lon egységeket és az adatok 3. sorát.)
* Világosabb és jobb lenne, ha a teszthez tartozó egységek magasan változót írnának két idézetben, jelezve, hogy ez egy erős érték. De a jelenlegi képviselet (1, idézetek nélkül) helyesen értelmezzük, mint egy String, nem pedig egy integrált, mert nincs „i” suffix.
* Ellentétben más numerikus adattípusok, a hosszú értékek az adatszekcióban elegendő ("L") Ez azonosítja számszerű adattípusát. Ez szükséges ahhoz, hogy megakadályozzák a táblákat az értékek úszó pontszámként értelmezésének, és így elveszítsék a pontosságot.

## [táblák](#spreadsheets) {#spreadsheets} 

Egy táblázatban, mint egy NCCSV fájlban:

* Az NCCSV fájlokhoz meghatározott számértékek írása (pl. elegendő levéllel, pl. „f”, az attribútum adattípusának azonosítása) ...
* A Strings-ben minden nem nyomtatható és különleges karaktert JSON-szerű backslashed karakterként kell írni (pl.:\\nújdonság) vagy mint a hexadecimális Unicode karakterszám (eseti érzéketlenség) a szintax[↑u *hhhh* ](#uhhhh)... Figyelemre méltó, használata\\n  (2 karakter: backslash és 'n "...") jelezni egy új vonalat egy Stringben, nem az Alt Enter. Minden nyomtatható karakter kódolatlan vagy a szintaxissal írható[↑u *hhhh* ](#uhhhh)...

Az egyetlen különbség az NCCSV fájlok és az analóg táblázat között, amely követi ezeket az egyezményeket:

* Az NCCSV fájlok értékei a commas által elválasztott vonalon.
A spreadsheets értékei a szomszédos sejtek vonalán.
* Az NCCSV fájlokat gyakran kettős idézetek veszik körül.
A táblákban lévő húrokat soha nem veszik körül kettős idézetek.
* Belső kettős idézetek ("...") Az NCCSV fájlokban található Strings 2 dupla idézetnek tűnik.
Internal dupla idézetek táblák úgy tűnik, mint 1 dupla idézet.

Ha az ilyen egyezményeket követő táblázat CSV-fájlként mentésre kerül, sok sor végén gyakran extra commas lesz. A szoftver, amely átalakítja az NCCSV fájlokat.ncA fájlok figyelmen kívül hagyják az extra commas.

### [Excel](#excel) {#excel} 

Egy NCCSV fájl importálása Excel-be:

1. Válassza a File: Open .
2. Változtassa meg a fájltípust a szöveges fájlokhoz (\\*.prn;\\*.txt; \\*.csv) ...
3. Keresse meg a könyvtárakat, és kattintson az NCCSV .csv fájlra.
4. Click Open.

Egy NCCSV fájl létrehozása egy Excel táblából:

1. Válaszd ki a fájlt: Save As .
2. Változtassa meg a Megtakarítást típusként: CSV (Comma elkötelezett)   (\\*.csv) ...
3. Válaszul a kompatibilitási figyelmeztetés, kattintson Igen.
4. Az eredmény .csv fájl lesz extra commas végén az összes sorok más, mint a CSV sorok. Nem lehet figyelmen kívül hagyni őket.

Az Excel-ben a fenti NCCSV-fájl úgy tűnik, mint

![mintExcel.png](/img/sampleExcel.png)

### [Google lapok](#google-sheets) {#google-sheets} 

Egy NCCSV fájl importálása a Google Sheets-be:

1. File: Import .
2. Válasszon egy fájl feltöltéséhez és kattintson a fájl feltöltésére a számítógépről. Válassza ki a fájlt, majd kattintson az Open .
      
Vagy válassza ki a Drive-t, és változtassa meg a fájltípus leállítását az összes fájltípusra. Válassza ki a fájlt, majd kattintson az Open .

Az NCCSV fájl létrehozása egy Google Sheets tábláról:

1. Válaszd ki a fájlt: Save As .
2. Változtassa meg a Megtakarítást típusként: CSV (Comma elkötelezett)   (\\*.csv) ...
3. Válaszul a kompatibilitási figyelmeztetés, kattintson Igen.
4. Az eredmény .csv fájl lesz extra commas végén az összes sorok más, mint a CSV sorok. Engedjétek őket.

## [Problémák / figyelmeztetések](#problemswarnings) {#problemswarnings} 

* Ha létrehoz egy NCCSV fájlt egy szövegszerkesztővel, vagy ha analóg táblát hoz létre egy táblázatban, a szövegszerkesztő vagy a táblázatprogram nem ellenőrzi, hogy ezeket az egyezményeket helyesen követi. Öntől függ, hogy megfelelően kövesse ezeket az egyezményeket.
* Az egyezményt egy csv fájlba követő táblázat átalakítása (Így egy NCCSV fájl) az összes CSV adatsoron kívüli sor végén további kommákhoz vezet. Engedjétek őket. A szoftver akkor átalakítja az NCCSV fájlokat.ncA fájlok figyelmen kívül hagyják őket.
* Ha egy NCCSV fájl túlzott kommákkal rendelkezik a sorok végén, eltávolíthatja őket az NCCSV fájl átalakításával.NetCDFfájl, majd átalakítja aNetCDFvissza egy NCCSV fájlba.
* Amikor megpróbálja átalakítani egy NCCSV fájlt egyNetCDFfájl, néhány hibát a szoftver észlel, és hibaüzeneteket generál, ami miatt a megtérés kudarcot vall. Más problémák kemények vagy lehetetlenek elkapni, és nem generál hibaüzeneteket vagy figyelmeztetéseket. Egyéb problémák (pl. túlzott commas a sorok végén) figyelmen kívül hagyják. A fájlátalakító csak minimális ellenőrzést végez az elért korrektségrőlNetCDFfájl, pl. a CF megfelelés tekintetében. Ez a fájl alkotója és a fájlfelhasználó felelőssége, hogy ellenőrizze, hogy a konverzió eredményei a kívánt és helyesek. Két módja annak, hogy ellenőrizze:
    * Nyomtassa ki a tartalmát.ncfájl ncdump
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) ...
    * Nézd meg az adatok tartalmátERDDAP™...

## [változások](#changes) {#changes} 

Az eredeti verzió volt[NCCSV v1.00](/docs/user/nccsv-1.00)  (benneERDDAP™v1.76, 2017-05-12) 

* Bevezetett változások[NCCSV v1.10](/docs/user/nccsv-1.10)  (benneERDDAP™v2.10, megjelent 2020-11-05) :
    * Hozzáadott támogatás az ubyte, ushort, uint, ulong. A CF-nek köszönhetően az ilyen adattípusok támogatása a CF-ben.
* Változások v1.20 (benneERDDAP™v2.23, megjelent 2023-02-27) :
    * Váltott ASCII karakter kódolás UTF-8 kódolás NCCSV .csv fájlokat.
        *   ERDDAP™Még mindig olvashat fájlokat az NCCSV összes korábbi és jelenlegi verziójáról.
        *   ERDDAP™most mindig írja az NCCSV v1.20 fájlokat.
        * Ha megírta az ügyfélnek, hogy olvassa el az NCCSV fájlokat, változtassa meg, így kezeli az összes NCCSV fájlt UTF-8 fájlként. Ez az idősebb NCCSV fájlokkal működik, mert az ASCII az UTF-8 karakter kódolása.
        * Pauline Chauvetnek, Natenek és Thomas Gardinernek köszönhetően.
