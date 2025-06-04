---
title: "Localized Metadata"
sidebar_position: 8
---
## Métadonnées localisées

### Désignation des marchandises
Cette fonctionnalité vous permet d'inclure des métadonnées localisées sur vos ensembles de données et variables. Tout attribut défini dans unaddAttributestag peut être localisé. Ceci est destiné à être utilisé pour les attributs de chaîne commune comme le titre, résumé, licence, instituion. Il n'est pas recommandé d'utiliser pour le calcul numérique (Par exemple "_FillValue") ou des valeurs normalisées (Par exemple, "catégorie_ioos") et la localisation de ces types de valeurs peut avoir un comportement surprenant.

### Instructions d'utilisation
Pour les activer et les utiliser, suivez les étapes suivantes :

1.  **Ajouter des étiquettes dans `datasets.xml"** :
Dans le 'datasets.xml` fichier, ajoutez vos métadonnées localisées dans la section Ajouter des attributs:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Comportement par défaut** :
   - Si aucune balise xml:lang n'est fournie, les informations fournies seront affichées pour toutes les langues. Cela correspond au précédent.
   - Si certaines balises xml:lang sont fournies, ces valeurs seront utilisées pour les requêtes dans ces langues. Si un utilisateur demande une langue qui n'a pas de valeur xml:lang fournie, la valeur de la langue par défaut (changements climatiques) sera utilisé.
