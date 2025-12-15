---
sidebar_position: 7
---
#  `affichage Informations` et `affichageAttribut` Étiquettes

## Désignation des marchandises
Cette fonctionnalité vous permet d'afficher les attributs globaux de votre choix sur la page des ensembles de données de la `Informations` rangée.

## Instructions d'utilisation
Ces étiquettes ne peuvent être utilisées qu'avec `Analyseur de sax` . Pour les activer et les utiliser, suivez les étapes suivantes :

1.  **Activer l'analyseur SAX** :
Ajoutez à votre `configuration.xml` fichier & #160;:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Ajouter des étiquettes ` datasets.xml ` ** :
Dans ` datasets.xml ` fichier, inclure deux balises de haut niveau:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportement par défaut** :
   - Si ces balises ne sont pas ajoutées ou laissées vides ` datasets.xml ` fichier, les valeurs par défaut sont appliquées comme suit:
     -  `affichage Informations` : `Résumé, License` 
     -  `affichageAttribut` : `résumé, licence` 

4.  **Assurer la cohérence** :
Nombre de valeurs séparées par des virgules dans les deux `affichage Informations` et `affichageAttribut` Les étiquettes doivent être les mêmes.

## Comment ça marche
- Les `affichageAttribut` tag spécifie les attributs globaux (définis dans le&lt; ` addAttributes ` Tag &gt;) à afficher pour chaque jeu de données.
- Les valeurs correspondantes `affichage Informations` tag sont affichés comme des étiquettes dans le `Informations` ligne de l'assurance-chômage.
- Lorsque l'utilisateur survole les étiquettes affichées, une infobulle apparaîtra, montrant la valeur de l'attribut global.

## Exemple
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Attributs globaux de données Exemple :
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Comportement de l'assurance-chômage :
- Les mots `Affichage1` et `Affichage2` sera affiché dans le `Informations` ligne sur l'interface utilisateur.
- Lorsque vous planez, tooltips affiche les valeurs d'attribut correspondantes :
  -  `Affichage1` : Tooltip montre _C'est att1_
  -  `Affichage2` : Tooltip montre _C'est att2_

## Annexe
- Assurez-vous que les noms d'attributs spécifiés dans le `affichageAttribut` tag correspondent aux attributs globaux définis dans l'ensemble de données.
- Les attributs incorrects ou manquants enregistreront les messages d'erreur.

En suivant ces étapes, vous pouvez personnaliser `Informations` ligne sur la page des ensembles de données pour afficher les attributs globaux pertinents avec les tooltips correspondants.
