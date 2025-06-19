---
sidebar_position: 7
---
# ZobrazitInfo a DisplayAttribute Štítky

## Popis zboží
Tato funkce vám umožňuje zobrazit globální atributy dle vašeho výběru v záložce datové soubory v řádku 

## Návod k použití
Tyto značky mohou být použity pouze s paralyzérem. S cílem umožnit a použít tyto kroky:

1.  **Povolit SAX Parser** :
Přidat následující řádek do svého souboru setup.xml.
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Přidat značky v ?datasets.xml?** :
In the ?datasets.xmlSoubor, včetně dvou značek nejvyšší úrovně:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Výchozí chování** :
   - Pokud tyto značky nejsou přidávány nebo ponechány prázdné v zařízenídatasets.xmlSoubor se standardně používá takto:
     - ZobrazitInfo: Licence ?
     - Attribute: Summary,licence ?

4.  **Zajistit soudržnost** :
Počet čárkových oddělovaných hodnot v obou tagech musí být stejný.

## Jak to funguje
- Štítek DisplayAttribute určuje globální atributy (definované v rámci&lt;?addAttributesPro každý soubor údajů se zobrazí značka.
- Odpovídající hodnoty v záložce ¶DisplayInfo-Display jsou zobrazeny jako štítky v řádku ¶Informace o UI.
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
- Slova "Zobrazení" a "Zobrazení" budou zobrazena v řádku "Informace" na UI.
- Když se visí, tipy nástrojů zobrazí odpovídající hodnoty atributu:
  - Zobrazit1: Tooltip shows _This is att1_
  - Zobrazit2: Tooltip shows _This is att2_

## Poznámky
- Ujistěte se, že názvy atributů uvedené v tagu "Attribute" odpovídají globálním atributům definovaným v datovém souboru.
- Nesprávné nebo chybějící atributy budou logovat chybové zprávy.

Tím, že budete postupovat podle těchto kroků, si můžete upravit řádek informací na stránce souborů pro zobrazení příslušných globálních atributů s odpovídajícími tipy nástrojů.
