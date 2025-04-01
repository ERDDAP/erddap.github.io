---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo` et `displayAttribute` Étiquettes

### Désignation des marchandises
Cette fonctionnalité vous permet d'afficher les attributs globaux de votre choix sur la page des ensembles de données dans la ligne `Information`.

### Instructions d'utilisation
Ces balises ne peuvent être utilisées qu'avec l'analyseur `Sax`. Pour les activer et les utiliser, suivez les étapes suivantes :

1.  **Activer l'analyseur SAX** :
Ajoutez la ligne suivante à votre fichier `setup.xml` :
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Ajouter des étiquettes dans `datasets.xml"** :
Dans le 'datasets.xml` fichier, inclure deux balises de haut niveau:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportement par défaut** :
   - Si ces balises ne sont pas ajoutées ou laissées vides dans le `datasets.xml` fichier, les valeurs par défaut sont appliquées comme suit:
     - `displayInfo`: "Sommaire, License "
     - «displayAttribute»: «résumé, licence "

4.  **Assurer la cohérence** :
Le nombre de valeurs séparées par des virgules dans les balises `displayInfo` et `displayAttribute` doit être le même.

### Comment ça marche
- La balise `displayAttribute` spécifie les attributs globaux (définis dans la&lt;"addAttributes`&gt; tag) à afficher pour chaque ensemble de données.
- Les valeurs correspondantes de l'étiquette `displayInfo` sont affichées sous forme d'étiquettes dans la ligne `Information` de l'interface utilisateur.
- Lorsque l'utilisateur survole les étiquettes affichées, une infobulle apparaîtra, montrant la valeur de l'attribut global.

### Exemple
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Attributs globaux de données Exemple :
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Comportement de l'assurance-chômage :
- Les mots `Display1` et `Display2` seront affichés dans la ligne `Information` de l'interface utilisateur.
- Lorsque vous planez, tooltips affiche les valeurs d'attribut correspondantes :
  - `Affichage1`: Tooltip affiche _C'est att1_
  - `Affichage2`: Tooltip affiche _C'est att2_

### Annexe
- Assurez-vous que les noms d'attributs spécifiés dans la balise `displayAttribute` correspondent aux attributs globaux définis dans l'ensemble de données.
- Les attributs incorrects ou manquants enregistreront les messages d'erreur.

En suivant ces étapes, vous pouvez personnaliser la ligne `Information` sur la page des ensembles de données pour afficher les attributs globaux pertinents avec les tooltips correspondants.
