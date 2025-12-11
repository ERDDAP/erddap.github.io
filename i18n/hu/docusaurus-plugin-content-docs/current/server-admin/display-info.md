---
sidebar_position: 7
---
#  `Kijelző Info` és `megjelenítés` Tagok

## Leírás
Ez a funkció lehetővé teszi, hogy megjelenítse a választás globális tulajdonságait az adatkészletek oldalon `Információ` sor.

## Használati utasítások
Ezek a címkék csak használhatók a `Sax parser` ... Hogy lehetővé tegyük és használjuk őket, kövessük ezeket a lépéseket:

1.  **Lehetővé teszi az SAX Parser** :
Adja hozzá a következő sort a `setup.xml` fájl:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adjon Tagokat ` datasets.xml ` ** :
A ` datasets.xml ` fájl, beleértve két felső szintű címkét:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Alapértelmezett viselkedés** :
   - Ha ezeket a címkéket nem adják hozzá, vagy üres maradnak ` datasets.xml ` fájl, az alapértelmezett értékeket az alábbiak szerint alkalmazzák:
     -  `Kijelző Info` : `Összefoglaló, licenc` 
     -  `megjelenítés` : `összefoglaló,licensz` 

4.  **Biztonsági ellenállás biztosítása** :
A comma-választott értékek száma mind a `Kijelző Info` és `megjelenítés` A címkéknek ugyanaznak kell lenniük.

## Hogyan működik
- A `megjelenítés` a címke meghatározza a globális tulajdonságokat (amelyet a&lt; ` addAttributes ` és gt; tag) minden adatkészlet számára megjelenítendő.
- A megfelelő értékek a `Kijelző Info` címkeként jelenik meg a címkén `Információ` Az UI sora.
- Amikor a felhasználó a megjelenített címkék felett ül, megjelenik egy tooltip, megmutatva a globális tulajdonság értékét.

## Példa
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Adatkészlet globális tulajdonságok példa:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI viselkedés:
- A szavak `Kijelző1` és `Kijelző2` jelenik meg a `Információ` sor az UI-n.
- Amikor a tooltips megjeleníti a megfelelő tulajdonságértékeket:
  -  `Kijelző1` Tooltip megmutatja _Ez att1_
  -  `Kijelző2` Tooltip megmutatja _Ez att2_

## Megjegyzések
- Győződjön meg a megadott tulajdonságnevekről `megjelenítés` a címke megfelel az adatkészletben meghatározott globális tulajdonságoknak.
- A helytelen vagy hiányzó tulajdonságok hibás üzeneteket fognak bejelenteni.

Ezen lépések követésével testreszabhatja a `Információ` sorolja az adatkészletek oldalát, hogy megjelenítse a vonatkozó globális tulajdonságokat a megfelelő tooltipokkal.
