---
title: "Localized Metadata"
sidebar_position: 8
---
## Helyi Metadata

### Leírás
Ez a funkció lehetővé teszi a lokalizált metaadatokat az adatkészletekről és a változókról. Minden olyan tulajdonság, amelyet egyaddAttributesA címke lokalizálható. Ezt olyan közös karakterlánc-jellemzőkre kell használni, mint a cím, az összefoglaló, a licenc, az intézet. Nem ajánlott numerikusan használni (pl. „_FillValue”) vagy szabványosított értékek (pl. „ioos_category”) és az ilyen típusú értékek elhelyezése meglepő viselkedéssel járhat.

### Használati utasítások
Hogy lehetővé tegyük és használjuk őket, kövessük ezeket a lépéseket:

1.  **Adjon hozzá Tagokat a `datasets.xml`** :
A `datasets.xml` fájl, add hozzá a lokalizált metaadatot a hozzáadott tulajdonságok részében:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Alapértelmezett viselkedés** :
   - Ha nincs xml:lang címkék, a megadott információkat minden nyelven megjelenítik. Ez megfelel az előző viselkedésnek.
   - Ha néhány xml:lang címkét biztosítanak, ezeket az értékeket ezekben a nyelveken kérésre használják. Ha egy felhasználó olyan nyelvet kér, amely nem rendelkezik adott xml:lang értékkel, az alapértelmezett nyelv értéke (angol) fogják használni.
