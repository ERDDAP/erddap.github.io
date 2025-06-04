---
title: "Localized Metadata"
sidebar_position: 8
---
## Lokální metadata

### Popis zboží
Tato funkce umožňuje zahrnout lokalizovaná metadata o vašich datových souborech a proměnných. Jakýkoli atribut definovaný vaddAttributestag lze lokalizovat. To je určeno k použití pro běžné atributy řetězce, jako je název, shrnutí, licence, institution. Nedoporučuje se používat pro numerické (např. "_FillValue") nebo standardizované hodnoty (např. "ioos_categorie") a umístění těchto typů hodnot může mít překvapivé chování.

### Návod k použití
S cílem umožnit a použít tyto kroky:

1.  **Přidat značky v ?datasets.xml?** :
In the ?datasets.xmlSoubor, přidejte lokalizovaná metadata do sekce atributů přidání:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Výchozí chování** :
   - Pokud nejsou poskytnuty žádné xml:lang značky, poskytnuté informace budou zobrazeny pro všechny jazyky. Tohle odpovídá předchozímu behavoirovi.
   - Pokud jsou poskytnuty některé xml:lang značky, budou tyto hodnoty použity pro žádosti v těchto jazycích. Pokud uživatel požaduje jazyk, který nemá stanovenou hodnotu xml:lang, hodnotu z výchozího jazyka (Angličtina) budou použity.
