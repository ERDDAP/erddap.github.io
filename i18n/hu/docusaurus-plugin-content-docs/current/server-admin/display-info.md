---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## "displayInfo" és "displayAttribute" Tagok

### Leírás
Ez a funkció lehetővé teszi, hogy megjelenítse a választott globális tulajdonságait az adatkészletek oldalon a "Information" sorban.

### Használati utasítások
Ezeket a címkéket csak a "Sax parser" segítségével lehet használni. Hogy lehetővé tegyük és használjuk őket, kövessük ezeket a lépéseket:

1.  **Lehetővé teszi az SAX Parser** :
Adja hozzá a következő sort a "setup.xml" fájlhoz:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adjon hozzá Tagokat a `datasets.xml`** :
A `datasets.xml` fájl, tartalmaz két felső szintű címkét:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Alapértelmezett viselkedés** :
   - Ha ezeket a címkéket nem adják hozzá, vagy üresen hagyják a "datasets.xml`fájl, az alapértelmezett értékeket az alábbiak szerint alkalmazzák:
     - "displayInfo": "Feltétel, licenc `
     - "displayAttribute": "összefoglaló, licenc `

4.  **Biztonsági ellenállás biztosítása** :
A comma-választott értékek száma mind a "displayInfo", mind a "displayAttribute" címkéknek ugyanaznak kell lenniük.

### Hogyan működik
- A "displayAttribute" címke meghatározza a globális tulajdonságokat (a `<addAttributes>`címke) minden adatkészlet számára megjelenítendő.
- A "displayInfo" címke megfelelő értékei az UI "Information" sorában található címkékként jelennek meg.
- Amikor a felhasználó a megjelenített címkék felett ül, megjelenik egy tooltip, megmutatva a globális tulajdonság értékét.

### Példa
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Adatkészlet globális tulajdonságok példa:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI viselkedés:
- A "Display1" és a "Display2" szavak a "Information" sorban jelennek meg az UI-n.
- Amikor a tooltips megjeleníti a megfelelő tulajdonságértékeket:
  - dalszöveg: Tooltip Shows - This att1_
  - dalszöveg: Tooltip Shows - This att2_

### Megjegyzések
- Gondoskodjon a „displayAttribute” címkeben meghatározott tulajdonságnevekről az adatkészletben meghatározott globális tulajdonságokkal.
- A helytelen vagy hiányzó tulajdonságok hibás üzeneteket fognak bejelenteni.

Ezen lépések követésével testreszabhatja az „Information” sort az adatkészletek oldalon, hogy megjelenítse a vonatkozó globális tulajdonságokat a megfelelő tooltipokkal.
