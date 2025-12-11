#  ERDDAP Intégration MQTT

 ERDDAP le protocole MQTT pour faciliter l'ingestion de données en temps réel et les notifications. Cette fonctionnalité est alimentée par le open-source [ **Client HiveMQ MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) et [ **Édition communautaire HiveMQ** ](https://github.com/hivemq/hivemq-community-edition) des bibliothèques de courtage.

 ERDDAP peut tirer parti de MQTT de deux façons principales :

1.   **En tant que client MQTT :**    ERDDAP peuvent s'abonner à des sujets sur un courtier MQTT existant pour ingérer des données et créer des ensembles de données en temps réel.
    
2.   **En tant que courtier MQTT :**    ERDDAP peut héberger son propre courtier MQTT intégré, permettant aux clients externes de lui publier des données directement.
    

- Oui.

##  ERDDAP en tant que client MQTT

 ERDDAP peut agir comme client MQTT pour s'abonner à des sujets sur un courtier MQTT externe ou son propre courtier intégré. Ceci est réalisé en utilisant la nouvelle `EDDTableFromMqtt` type d'ensemble de données, qui fonctionne de la même manière que l'actuel `EDDTableFromHttpGet` ensemble de données.

Actuellement, la mise en œuvre du client ne prend en charge que **abonnement** à des sujets.

## Configuration & #160;: `EDDTableFromMqtt` 

Pour configurer un ensemble de données pour s'abonner à un courtier MQTT, définissez un ensemble de données de type `EDDTableFromMqtt` dans votre ` datasets.xml ` fichier. Les balises de configuration suivantes sont disponibles dans la ` <dataset> ` bloc:

```
<!-- Example configuration for an EDDTableFromMqtt dataset in datasets.xml -->
<dataset type="EDDTableFromMqtt" datasetID="mqtt_realtime_data" active="true">

    <!-- The hostname or IP address of the MQTT broker. -->
    <serverHost>broker.example.com</serverHost>

    <!-- The port number of the MQTT broker. -->
    <serverPort>1883</serverPort>

    <!-- A unique identifier for this MQTT client. -->
    <clientId>erddap-subscriber-1</clientId>

    <!-- The username for broker authentication (optional). -->
    <username>user</username>

    <!-- The password for broker authentication (optional). -->
    <password>secret</password>

    <!-- A comma-separated list of MQTT topics to subscribe to. -->
    <topics>sensor/+/data, another/topic</topics>

    <!-- Set to 'true' to use a secure SSL/TLS connection. Default is 'false'. -->
    <useSsl>false</useSsl>

    <!-- The session expiry interval in seconds. -->
    <sessionExpiryInterval>3600</sessionExpiryInterval>

    <!-- The connection timeout in seconds. -->
    <connectionTimeout>10</connectionTimeout>

    <!-- Set to 'true' to enable automatic reconnection. Default is 'true'. -->
    <automaticReconnect>true</automaticReconnect>

</dataset>
```

- Oui.

##  ERDDAP comme courtier MQTT

 ERDDAP peut gérer un courtier MQTT intégré, qui a deux objectifs principaux:

1.   **Ingestion des données:** Pour recevoir des données publiées par des clients externes du MQTT pour créer des ensembles de données en temps réel.
    
2.   **Notifications:** Publier des notifications sur les modifications de l'ensemble de données.
    

## Permettre au courtier intégré

Le courtier MQTT intégré est désactivé par défaut. Pour l'activer, ajouter le drapeau suivant à `configuration.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> vrai </enableMqttBroker> `  

## Configuration des courtiers et répertoires de données

Vous pouvez spécifier des répertoires personnalisés pour la configuration du courtier et les fichiers de données dans `configuration.xml` . Si ces étiquettes sont laissées vides, ERDDAP utilisera les répertoires par défaut spécifiés par la bibliothèque HiveMQ. Pour des détails de configuration plus avancés, y compris l'enregistrement et les extensions, veuillez consulter le [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Cas d'utilisation 1 : ingérer les données des clients du MQTT

Pour construire un ensemble de données en temps réel en utilisant le courtier intégré, vous pouvez configurer un `EDDTableFromMqtt` ensemble de données (comme décrit ci-dessus) dans le _même_ ERDDAP instance pour se connecter à son propre courtier local . Les clients externes du MQTT peuvent ensuite publier des données à ERDDAP courtier, dont le `EDDTableFromMqtt` dataset s'abonnera et ingérera.

## Cas d'utilisation 2 : Publication des notifications de modification des ensembles de données

 ERDDAP peut être configuré pour publier des notifications sur les modifications des ensembles de données (Par exemple, mises à jour ou recharges) à un sujet sur un courtier MQTT. Tout d'abord, assurez-vous que le courtier est activé ou qu'un courtier externe est disponible. Puis, activez la fonctionnalité de notification dans `configuration.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> vrai </publishMqttNotif> `  

Lorsque cette fonctionnalité est activée, ERDDAP utilise un client MQTT interne pour publier les messages. Les paramètres de connexion pour ce client peuvent être personnalisés dans `configuration.xml` . Le tableau ci-dessous énumère les paramètres disponibles et leurs valeurs par défaut.

 | Balise | Type | Valeur par défaut | Désignation des marchandises | 
 | ------------ | - Oui. | ----------------- | ------------------------------------------------------------------------ | 
 |   ` <mqttServerHost> `           | chaîne |   `hôte local`         | Le courtier hôte de publier des notifications à. | 
 |   ` <mqttServerPort> `           | Int |   `1883`              | Le port du courtier en notification. | 
 |   ` <mqttClientId> `             | chaîne |   `Client erddap`     | L'identité du client pour l'éditeur de notification. | 
 |   ` <mqttUserName> `             | chaîne |   `erddap-nom d'utilisateur`   | Le nom d'utilisateur de l'éditeur de notification. | 
 |   ` <mqttPassword> `             | chaîne |   `Mot de passe erddap`   | Le mot de passe de l'éditeur de notification. | 
 |   ` <mqttSsl> `                  | booléen |   `faux`             | Utilisez SSL/TLS pour la connexion de notification. | 
 |   ` <mqttKeepAlive> `            | Int |   `60`                | Maintenir l'intervalle de vie en quelques secondes. | 
 |   ` <mqttCleanStart> `           | booléen |   `faux`             | Commencez par une session propre (aucun état de session persistant) . | 
 |   ` <mqttSessionExpiry> `        | Int |   `10`                | Intervalle d'expiration de la session en secondes. | 
 |   ` <mqttConnectionTimeout> `    | Int |   `10`                | Délai de connexion en secondes. | 
 |   ` <mqttAutomaticReconnect> `   | booléen |   `vrai`              | Reconnecter automatiquement si la connexion est perdue. | 


- Oui.

## Parsing variable environnement dans ` datasets.xml ` 

Une nouvelle fonctionnalité a été introduite qui permet l'utilisation de variables d'environnement dans ` datasets.xml ` . Voici **activé par défaut** .

Pour désactiver cette fonctionnalité, ajoutez le drapeau suivant à `configuration.xml` :

xml

 ` <enableEnvParsing> faux </enableEnvParsing> ` 
