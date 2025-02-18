# Crédits

## ContributionsERDDAP™code{#contributions-to-erddap-code} 
* MergeIR
    [EDDGridDeMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles)a été écrit et contribué par Jonathan Lafite et Philippe Makowski de R.Tech Engineering (licence: copyrighted open source) . Merci, Jonathan et Philippe &#33;
     
* TableauDonnées du rédacteur
    [Données Tableau (TableWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)a été écrit et contribué par Roland Schweitzer deNOAA  (licence: copyrighted open source) . Merci, Roland &#33;
     
* Json-ld
La première version du[Marquage sémantique des données avec json-ld (JSON Données liées) ](/docs/server-admin/additional-information#json-ld)Caractéristique (et donc tout le travail dur dans la conception du contenu) a été écrit et contribué (licence: copyrighted open source) par Adam Leadbetter et Rob Fuller du Marine Institute en Irlande. Merci, Adam et Rob &#33;
     
*   orderBy  
Le code de la[orderByMeanfiltre](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean)entabledapet les modifications importantes apportées au code[_variableNom/diviseur:offset_notation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions)pour tousorderByles filtres ont été écrits et contribués (licence: copyrighted open source) par Rob Fuller et Adam Leadbetter du Marine Institute en Irlande. Merci, Rob et Adam &#33;
     
* Types de marqueurs sans frontières
Le code pour trois nouveaux types de marqueurs (Carré rempli sans frontières, Cercle rempli sans frontières, Triangle rempli sans frontières) a été contribué par Marco Alba de ETT / EMODnet Physique. Merci, Marco Alba &#33;
     
* Traductions de messages.xml
La version initiale du code dans TranslateMessages.java qui utilise le service de traduction de Google pour traduire des messages.xml dans différentes langues a été écrite par Qi Zeng, qui travaillait comme stagiaire Google Summer of Code. Merci, Oui &#33;
     
*   orderBySomme
Le code de la[orderByFiltre de somme](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum)entabledap  (basé sur Rob Fuller et Adam LeadbetterorderByMean) et la vérification de tous et de tous les boutons sur leEDDGridLe formulaire d'accès aux données a été rédigé et contribué (licence: copyrighted open source) par Marco Alba de ETT Solutions et EMODnet. Merci, C'est Marco &#33;
     
* Hors de portée .transparent Demandes Png
    ERDDAP™maintenant accepte les demandes pour . transparent Png's lorsque les valeurs de latitude et/ou de longitude sont partiellement ou totalement hors de portée. (C'étaitERDDAP™GitHub Issues #19, posté par Rob Fuller -- merci de l'avoir affiché, Rob.) Le code pour corriger cela a été écrit par Chris John. Merci, C'est Chris &#33;
     
* Afficher les données de base64 dans.htmlTableRéponses
Le code pour afficher les données d'image de base64 dans.htmlTableLes réponses ont été fournies par Marco Alba de ETT / EMODnet Physics. Merci, Marco Alba &#33;
     
* n Amélioration des fils
Le système nThreads pour EDDTableFromFiles a été considérablement amélioré. Ces changements conduisent à une énorme amélioration de la vitesse (Par exemple, accélération 2X lorsque nThreads est réglé à 2 ou plus) pour les demandes les plus difficiles (lorsqu'un grand nombre de dossiers doivent être traités pour recueillir les résultats) . Ces changements entraîneront également une accélération généraleERDDAP™. Chris John a apporté le code de ces changements. Merci, C'est Chris &#33;

* palette de couleurs EK80 pour les ensembles de données acoustiques. Merci Rob Cermak &#33;

* EDDTableAggregateRows agrégation pour tous les enfants fixés. Merci Marco Alba &#33;

* Correction pour les noms de var incorrects dans les journaux. Merci Ayush Singh &#33;
