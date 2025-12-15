---
sidebar_position: 7
---
#  `zobrazení Informace` a `displayAttribute` Štítky

## Popis zboží
Tato funkce vám umožňuje zobrazit globální atributy dle vašeho výběru v záložce datové soubory v `Informace` Veslujte.

## Návod k použití
Tyto značky lze použít pouze s `Saxofony` . S cílem umožnit a použít tyto kroky:

1.  **Povolit SAX Parser** :
Přidat následující řádek do vašeho `setup.xml` soubor:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Přidat značky ` datasets.xml ` ** :
V ` datasets.xml ` soubor, včetně dvou značek nejvyšší úrovně:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Výchozí chování** :
   - Pokud tyto značky nejsou přidány nebo ponechány prázdné v ` datasets.xml ` soubor, výchozí hodnoty jsou použity takto:
     -  `zobrazení Informace` : `Shrnutí, Licence` 
     -  `displayAttribute` : `souhrn, licence` 

4.  **Zajistit soudržnost** :
Počet hodnot oddělených čárkou v obou případech `zobrazení Informace` a `displayAttribute` Tagy musí být stejné.

## Jak to funguje
- The `displayAttribute` tag určuje globální atributy (definované v rámci&lt; ` addAttributes ` &gt; tag) se zobrazí pro každý soubor dat.
- Odpovídající hodnoty v `zobrazení Informace` tag se zobrazí jako štítek v `Informace` Řada UI.
- Když se uživatel vznáší nad zobrazenými etiketami, objeví se tip nástrojů, zobrazí hodnotu globálního atributu.

## Příklad
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Atributy Příklad:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Chování:
- Slova `Displej1` a `Display2` bude zobrazeno v `Informace` Řádek na UI.
- Když se visí, tipy nástrojů zobrazí odpovídající hodnoty atributu:
  -  `Displej1` : Tooltip shows _ This is att1_
  -  `Display2` : Tooltip shows _ This is att2_

## Poznámky
- Zajistit názvy atributů uvedené v `displayAttribute` tag odpovídá globálním atributům definovaným v datovém souboru.
- Nesprávné nebo chybějící atributy budou logovat chybové zprávy.

Následováním těchto kroků můžete přizpůsobit `Informace` řádek na záložce soubory dat pro zobrazení příslušných globálních atributů s odpovídajícími tipy nástrojů.
