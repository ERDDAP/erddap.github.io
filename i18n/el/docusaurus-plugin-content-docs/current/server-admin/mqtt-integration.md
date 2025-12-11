#  ERDDAP Ολοκλήρωση MQTT

 ERDDAP τώρα περιλαμβάνει υποστήριξη για το πρωτόκολλο MQTT για να διευκολύνει την κατάποση δεδομένων σε πραγματικό χρόνο και ειδοποιήσεις. Αυτή η λειτουργικότητα τροφοδοτείται από την ανοικτή πηγή [ **Πελάτης HiveMQ MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) και [ **HiveMQ κοινοτική έκδοση** ](https://github.com/hivemq/hivemq-community-edition) βιβλιοθήκες χρηματιστών.

 ERDDAP μπορεί να αξιοποιήσει το MQTT με δύο πρωταρχικούς τρόπους:

1.   **Ως πελάτης MQTT:**    ERDDAP μπορούν να εγγραφούν σε θέματα σε ένα υπάρχον μεσίτη MQTT για να απορροφήσουν τα δεδομένα και να δημιουργήσουν σύνολα δεδομένων σε πραγματικό χρόνο.
    
2.   **Ως MQTT Broker:**    ERDDAP μπορεί να φιλοξενήσει το δικό του ενσωματωμένο μεσίτη MQTT, επιτρέποντας σε εξωτερικούς πελάτες να δημοσιεύουν τα δεδομένα απευθείας σε αυτό.
    

-------------

##  ERDDAP ως πελάτης MQTT

 ERDDAP μπορεί να λειτουργήσει ως πελάτης MQTT για να εγγραφεί σε θέματα σε έναν εξωτερικό ή δικό του ενσωματωμένο μεσίτη MQTT. Αυτό επιτυγχάνεται με τη χρήση του νέου `Πίνακας EDDFromMqtt` Τύπος συνόλου δεδομένων, το οποίο λειτουργεί παρόμοια με το υπάρχον `Πίνακας EDDFromHttpGet` Σύστημα δεδομένων.

Επί του παρόντος, η εφαρμογή του πελάτη υποστηρίζει μόνο **εγγραφή** σε θέματα.

## Configuration: `Πίνακας EDDFromMqtt` 

Για να ρυθμίσετε ένα σύνολο δεδομένων για να εγγραφείτε σε μεσίτη MQTT, ορίστε ένα σύνολο δεδομένων τύπου `Πίνακας EDDFromMqtt` σε σας ` datasets.xml ` Αρχείο. Οι ακόλουθες ετικέτες ρυθμίσεων είναι διαθέσιμες εντός του ` <dataset> ` Τμήμα:

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

-------------

##  ERDDAP ως MQTT Broker

 ERDDAP μπορεί να τρέξει έναν ενσωματωμένο μεσίτη MQTT, ο οποίος εξυπηρετεί δύο κύριους σκοπούς:

1.   **Κατάποση δεδομένων:** Για να λαμβάνετε δεδομένα που δημοσιεύονται από εξωτερικούς πελάτες MQTT για τη δημιουργία συνόλων δεδομένων σε πραγματικό χρόνο.
    
2.   **Κοινοποιήσεις:** Για τη δημοσίευση ειδοποιήσεων σχετικά με αλλαγές συνόλου δεδομένων.
    

## Ενεργοποίηση του Ενσωματωμένου Μεσίτη

Ο ενσωματωμένος μεσίτης MQTT είναι απενεργοποιημένος εξ ορισμού. Για να το ενεργοποιήσετε, προσθέστε την ακόλουθη σημαία `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> αλήθεια </enableMqttBroker> `  

## Κατάλογοι ρυθμίσεων & δεδομένων Broker

Μπορείτε να καθορίσετε προσαρμοσμένους καταλόγους για τις ρυθμίσεις και τα αρχεία δεδομένων του μεσίτη σε `setup.xml` . Αν αυτές οι ετικέτες έχουν μείνει άδειες, ERDDAP θα χρησιμοποιήσει τους προκαθορισμένους καταλόγους που καθορίζονται από τη βιβλιοθήκη HiveMQ. Για περισσότερες προηγμένες λεπτομέρειες διαμόρφωσης, συμπεριλαμβανομένης της καταγραφής και των επεκτάσεων, παρακαλούμε ανατρέξτε στον επίσημο [ **HiveMQ Κοινοτική Έκδοση Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Χρήση περίπτωσης 1: Κατάποση δεδομένων από πελάτες MQTT

Για να δημιουργήσετε ένα σύνολο δεδομένων σε πραγματικό χρόνο χρησιμοποιώντας τον ενσωματωμένο μεσίτη, μπορείτε να ρυθμίσετε ένα `Πίνακας EDDFromMqtt` σύνολο δεδομένων (όπως περιγράφεται ανωτέρω) μέσα στο _ίδιο_ ERDDAP παράδειγμα για να συνδεθεί με το δικό του τοπικό μεσίτη . Οι εξωτερικοί πελάτες MQTT μπορούν στη συνέχεια να δημοσιεύσουν δεδομένα σε αυτό ERDDAP μεσίτης, ο οποίος `Πίνακας EDDFromMqtt` Το σύνολο δεδομένων θα εγγραφεί και θα απορροφηθεί.

## Χρήση περίπτωσης 2: Publishing Dataset Αλλαγή ειδοποιήσεων

 ERDDAP μπορεί να ρυθμιστεί για να δημοσιεύει ειδοποιήσεις σχετικά με τις αλλαγές συνόλου δεδομένων (π.χ. ενημερώσεις ή επαναφορτίσεις) σε ένα θέμα για έναν χρηματιστή MQTT. Πρώτον, βεβαιωθείτε ότι ο μεσίτης είναι ενεργοποιημένος ή εξωτερικός είναι διαθέσιμος. Στη συνέχεια, ενεργοποιήστε το χαρακτηριστικό κοινοποίησης `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> αλήθεια </publishMqttNotif> `  

Όταν ενεργοποιηθεί αυτή η λειτουργία, ERDDAP χρησιμοποιεί έναν εσωτερικό πελάτη MQTT για να δημοσιεύσει τα μηνύματα. Οι ρυθμίσεις σύνδεσης για αυτόν τον πελάτη μπορούν να προσαρμοστούν σε `setup.xml` . Στον παρακάτω πίνακα παρατίθενται οι διαθέσιμες ρυθμίσεις και οι προκαθορισμένες τιμές τους.

 | Ετικέτα | Τύπος | Προκαθορισμένη τιμή | Περιγραφή εμπορευμάτων | 
 | ------------------------- | ----------- | ----------------- | ------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | συμβολοσειρά |   `τοπικός οικοδεσπότης`         | Ο μεσίτης που θα δημοσιεύσει τις ειδοποιήσεις. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Το λιμάνι του μεσίτη κοινοποίησης. | 
 |   ` <mqttClientId> `             | συμβολοσειρά |   `erddap-πελάτης`     | Η ταυτότητα του πελάτη για τον εκδότη ειδοποιήσεων. | 
 |   ` <mqttUserName> `             | συμβολοσειρά |   `όνομα χρήστη erddap`   | Το όνομα χρήστη του εκδότη κοινοποίησης. | 
 |   ` <mqttPassword> `             | συμβολοσειρά |   `κωδικός erddap`   | Ο κωδικός πρόσβασης για τον εκδότη ειδοποιήσεων. | 
 |   ` <mqttSsl> `                  | βουλεάνη |   `ψευδές`             | Χρήση SSL/TLS για τη σύνδεση κοινοποίησης. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Διατηρήστε το χρονικό διάστημα σε δευτερόλεπτα. | 
 |   ` <mqttCleanStart> `           | βουλεάνη |   `ψευδές`             | Έναρξη με μια καθαρή συνεδρία (δεν υπάρχει μόνιμη κατάσταση συνεδρίας) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Διάστημα λήξης συνεδρίας σε δευτερόλεπτα. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Χρονικό όριο σύνδεσης σε δευτερόλεπτα. | 
 |   ` <mqttAutomaticReconnect> `   | βουλεάνη |   `αλήθεια`              | Αυτόματη επανασύνδεση αν η σύνδεση χαθεί. | 


-------------

## Περιβάλλον Μεταβλητή ανάλυση ` datasets.xml ` 

Έχει εισαχθεί ένα νέο χαρακτηριστικό που επιτρέπει τη χρήση των μεταβλητών περιβάλλοντος μέσα ` datasets.xml ` . Αυτό είναι **ενεργοποιημένο εξ ορισμού** .

Για να απενεργοποιήσετε αυτή τη λειτουργία, προσθέστε την ακόλουθη σημαία `setup.xml` :

xml

 ` <enableEnvParsing> ψευδές </enableEnvParsing> ` 
