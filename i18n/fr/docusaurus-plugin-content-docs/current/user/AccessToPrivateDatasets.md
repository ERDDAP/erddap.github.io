---
title: "Access to Private Datasets"
---
# Accès aux ensembles de données privés dansERDDAP™

NombreuxERDDAP™les installations n'ont pas d'authentification activée et ne fournissent donc aucun moyen pour les utilisateurs de se connecter, ni n'ont de jeux de données privés.

CertainsERDDAP™les installations ont une authentification activée. Actuellement,ERDDAP™ne prend en charge que l'authentification via les comptes de messagerie gérés par Google, qui inclut les comptes de messagerie àNOAAet de nombreuses universités. SiERDDAP™a l'authentification activée, toute personne avec un compte e-mail géré par Google peut se connecter, mais ils n'auront accès aux ensembles de données privés que leERDDAP™l'administrateur les a explicitement autorisés à y accéder.

## Instructions actualisées{#updated-instructions} 

Certaines des informations ci-dessous sont périmées. Jusqu'à ce que cela soit mis à jour, vous pouvez utiliser[ce billet de blog](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)pour les dernières étapes sur l'obtention de données d'un jeu de données privé avec des scripts.

## Les humains avec les navigateurs{#humans-with-browsers} 

Utilisateurs humains deERDDAP™peut se connecterERDDAP™dans un navigateur afin d'accéder à des ensembles de données privés qu'ils sont autorisés à accéder.

Pour vous connecter :

1. Cliquez sur le lien de connexion dans la partie supérieure gauche de n'importe quelERDDAP™page web.
S'il n'y a pas de lien de connexion, leERDDAP™installation n'a pas d'authentification activée et il n'y a pas de jeux de données privés.
     
2. Cliquez sur le bouton Connexion pour vous connecter à votre compte Google.
Le texte du bouton doit être remplacé par "Signé".
     
3. Cliquez sur la connexionERDDAPbouton.
La page Web devrait changer pour dire Vous êtes connecté comme *Votre Adresse électronique* .
Si ce n'est pas le cas, attendez 5 secondes et cliquez sur ConnexionERDDAPencore un bouton.
Dans les cas extrêmes, vous devrez peut-être attendre et réessayer quelques fois.
     
4. N'utilisez pas le bouton Back de votre navigateur. Utilisez le "ERDDAP" lien en haut de la ci-dessus, puis utiliser d'autres liens pour aller àERDDAP™pages qui vous intéressent. Si une page web mise en cache indique que vous n'êtes pas connecté, rechargez la page.
     

## Scripts{#scripts} 

\\[Ceci est légèrement modifié par rapport à l'information fournie par Lynn DeWitt, qui a fait le travail difficile de comprendre cela. Lynn, merci beaucoup &#33;
Si vous avez des corrections ou des suggestions, veuillez envoyer un courriel à erd.data @ noaa.gov .\\]

Il est également possible de se connecter àERDDAP™et accéder à des ensembles de données privés via un script. Voici un exemple qui utilisecurl:

1. Ces instructions supposent que vous utilisez une adresse gmail où l'authentification à 2 facteurs n'est pas activée. Si votre adresse gmail principale a une authentification à 2 facteurs activée, envisagez de créer une autre adresse gmail avec une authentification à 2 facteurs désactivée.
     
2. Connectez-vous àERDDAP™manuellement avec l'adresse gmail que vous voulez utiliser dans votre script et accepter toutes les permissions nécessaires, puis se connecter complètement à nouveau.
     
3. Ouvrez le navigateur Outils développeurs, et allez dans l'onglet Réseau.
     
4. Cliquez sur leERDDAP™Lien « se connecter », puis le bouton « Se connecter » et choisir l'adresse email appropriée si elle est demandée.
     
5. Après la modification du bouton "S'identifier", l'onglet Developer Tools Network affichera deux entrées qui ressemblent à ce qui suit : (exemple de Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Utilisez le menu contextuel de clic droit de la souris pour « copier en tant que cURL » et collez-les dans un éditeur de texte simple
     
6. Cliquez sur "Se connecter"ERDDAP"bouton et "copie comme cURL" le lien qui ressemble à:
```
    login.html  
```
et coller ce troisièmecurlcommande dans le fichier texte.
     
7. Dans le fichier texte, vous aurez maintenant 3 lignes comme ce qui suit, où vous avez connecté unERDDAP™serveur à ' * https://host.somewhere.com/erddap * ". La premièrecurlcommande obtient votre profil utilisateur dans "login\\_hint" et génère un "id\\_token". La seconde utilise l'id\\_token pour se connecter à Google, et la troisième puis se connecte àERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Les 3 lignes ci-dessus, lorsqu'elles sont exécutées séquentiellement à partir d'une ligne de commande, vous connecterontERDDAP. Afin de pouvoir les utiliser dans un script, vous devez capturer l'id\\_token depuis la première ligne, le alimenter à la deuxième ligne, et écrire un cookie à lire par les lignes suivantes.
     
9. Pour développer un script, lancez le premier (' https://accounts.google.com )  curlligne exactement comme il a été copié à partir des outils de développeur, et capturer la réponse (vous pouvez obtenircurlerreur sur le drapeau "--2.0" il suffit de le supprimer) . Dans php, il ressemble à ce qui suit :
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Connectez-vous à Google en exécutant la deuxième ligne en utilisant $id\\_token, en supprimant d'abord le paramètre "-H 'Cookie: stuff'" et en disant plutôtcurlpour écrire un cookie :
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Connectez-vous àERDDAP™, en supprimant à nouveau le paramètre "-H 'Cookie: stuff'" et en utilisant le cookie écrit précédemment:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Vous devriez maintenant pouvoir demander des données au serveur, en utilisant le même cookie :
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
