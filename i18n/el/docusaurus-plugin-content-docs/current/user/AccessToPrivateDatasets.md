---
title: "Access to Private Datasets"
---
# Πρόσβαση σε Ιδιωτικά Datasets in ERDDAP™ 

Πολλά ERDDAP™ οι εγκαταστάσεις δεν έχουν ενεργοποιημένη πιστοποίηση και ως εκ τούτου δεν παρέχουν κανένα τρόπο για τους χρήστες να συνδεθείτε, ούτε έχουν ιδιωτικά σύνολα δεδομένων.

Μερικά ERDDAP™ οι εγκαταστάσεις έχουν ενεργοποιηθεί. Αυτή τη στιγμή, ERDDAP™ υποστηρίζει μόνο την ταυτοποίηση μέσω Google-διαχειριζόμενους λογαριασμούς ηλεκτρονικού ταχυδρομείου, η οποία περιλαμβάνει λογαριασμούς ηλεκτρονικού ταχυδρομείου στο NOAA και πολλά πανεπιστήμια. Εάν ERDDAP™ έχει ενεργοποιημένη την ταυτοποίηση, οποιοσδήποτε με ένα λογαριασμό ηλεκτρονικού ταχυδρομείου που διαχειρίζεται η Google μπορεί να συνδεθεί, αλλά θα έχει πρόσβαση μόνο στα ιδιωτικά σύνολα δεδομένων που το ERDDAP™ Ο διαχειριστής τους έχει εξουσιοδοτήσει ρητά να έχουν πρόσβαση.

## Ενημερωμένες οδηγίες{#updated-instructions} 

Μερικές από τις παρακάτω πληροφορίες είναι ξεπερασμένες. Μέχρι να ενημερωθεί αυτό μπορείτε να χρησιμοποιήσετε [αυτό το blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) για πρόσφατα βήματα για τη λήψη δεδομένων από ένα ιδιωτικό σύνολο δεδομένων με σενάρια.

## Άνθρωποι με περιηγητές{#humans-with-browsers} 

Ανθρώπινοι χρήστες ERDDAP™ μπορεί να συνδεθεί σε ERDDAP™ σε ένα πρόγραμμα περιήγησης προκειμένου να αποκτήσει πρόσβαση σε ιδιωτικά σύνολα δεδομένων που είναι εξουσιοδοτημένα να έχουν πρόσβαση.

Για να συνδεθείτε:

1. Κάντε κλικ στο σύνδεσμο στο πάνω αριστερά οποιασδήποτε ERDDAP™ Ιστοσελίδα.
Εάν δεν υπάρχει σύνδεση, η ERDDAP™ η εγκατάσταση δεν έχει ενεργοποιημένη ταυτοποίηση και δεν υπάρχουν ιδιωτικά σύνολα δεδομένων.
     
2. Κάντε κλικ στο κουμπί Σύνδεση για να συνδεθείτε στο λογαριασμό σας Google.
Το κείμενο του κουμπιού θα πρέπει να αλλάξει σε " Υπογραφή σε".
     
3. Κάντε κλικ στην είσοδο ERDDAP Κουμπί.
Η ιστοσελίδα πρέπει να αλλάξει για να πει Είστε συνδεδεμένοι ως *ισχ Διεύθυνση Email* .
Αν όχι, περιμένετε 5 δευτερόλεπτα και κάντε κλικ στην εγγραφή ERDDAP Κουμπί και πάλι.
Σε ακραίες περιπτώσεις, μπορεί να χρειαστεί να περιμένετε και στη συνέχεια να δοκιμάσετε ξανά μερικές φορές.
     
4. Μην χρησιμοποιείτε το κουμπί Πίσω του browser σας. Χρησιμοποιήστε το - ERDDAP " σύνδεση στην κορυφή του παραπάνω, στη συνέχεια, χρησιμοποιήστε άλλους συνδέσμους για να πάτε στο ERDDAP™ σελίδες που σας ενδιαφέρουν. Αν μια κρυφή ιστοσελίδα λέει ότι δεν είστε συνδεδεμένοι, ξαναγεμίστε τη σελίδα.
     

## Σενάρια{#scripts} 

 \\[ Αυτό είναι ελαφρώς τροποποιημένο από τις πληροφορίες που παρέχονται από Lynn DeWitt, ο οποίος έκανε τη σκληρή δουλειά να καταλάβω αυτό. Λιν, σ' ευχαριστώ πολύ&#33;
Εάν έχετε διορθώσεις ή προτάσεις, παρακαλούμε στείλτε email erd.data @ noa.gov . \\] 

Είναι επίσης δυνατό να συνδεθείτε ERDDAP™ και πρόσβαση σε ιδιωτικά σύνολα δεδομένων μέσω ενός σεναρίου. Εδώ είναι ένα παράδειγμα που χρησιμοποιεί curl :

1. Αυτές οι οδηγίες υποθέτουν ότι χρησιμοποιείτε μια διεύθυνση gmail όπου η ταυτοποίηση 2 συντελεστών δεν είναι ενεργοποιημένη. Εάν η κύρια διεύθυνση gmail σας έχει ενεργοποιημένη την ταυτοποίηση 2 συντελεστών, σκεφτείτε να δημιουργήσετε μια άλλη διεύθυνση gmail με απενεργοποιημένη την ταυτοποίηση 2 συντελεστών.
     
2. Σύνδεση στο ERDDAP™ χειροκίνητα με τη διεύθυνση gmail που θέλετε να χρησιμοποιήσετε στο σενάριό σας και να αποδεχθείτε τυχόν άδειες που απαιτούνται, και στη συνέχεια να συνδεθείτε εντελώς έξω.
     
3. Ανοίξτε το πρόγραμμα περιήγησης Εργαλεία Προγραμματιστή, και πηγαίνετε στην καρτέλα Network.
     
4. Κάντε κλικ στο ERDDAP™ " log in" link, στη συνέχεια το κουμπί " Συνδεθείτε" και επιλέξτε την κατάλληλη διεύθυνση ηλεκτρονικού ταχυδρομείου, εάν σας ζητηθεί.
     
5. Μετά τις αλλαγές του buttonSign in" button to "Signed in", η καρτέλα Developer Tools Network θα εμφανίζει δύο καταχωρήσεις που μοιάζουν με τις ακόλουθες (παράδειγμα από το Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Χρησιμοποιήστε το μενού του ποντικιού δεξί κλικ για να αντιγράψετε ως cURL" και τα δύο αυτά urls και επικολλήστε τα σε έναν απλό επεξεργαστή κειμένου
     
6. Κάντε κλικ στο "Σύνδεση ERDDAP " κουμπί και "αντιγραφή ως cURL" ο σύνδεσμος που μοιάζει με:
```
    login.html  
```
και κολλήστε αυτό το τρίτο curl εντολή στο αρχείο κειμένου.
     
7. Στο αρχείο κειμένου, θα έχετε τώρα 3 γραμμές όπως τα ακόλουθα, όπου έχετε συνδεθεί σε ένα ERDDAP™ εξυπηρετητής στο ' *https://host.somewhere.com/erddap* \". Η πρώτη curl εντολή παίρνει το προφίλ χρήστη σας σε "login\\_hint" και παράγει ένα "id\\_token. Το δεύτερο χρησιμοποιεί το id\\_token για να συνδεθεί στο Google, και το τρίτο στη συνέχεια συνδέεται με ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Οι παραπάνω 3 γραμμές, όταν εκτελούνται διαδοχικά από μια γραμμή εντολών, θα σας συνδέσουν σε ERDDAP . Για να τα χρησιμοποιήσετε σε ένα σενάριο πρέπει να συλλάβετε το id\\_token από την πρώτη γραμμή, να το τροφοδοτήσετε στη δεύτερη γραμμή και να γράψετε ένα cookie που θα διαβαστεί από επόμενες γραμμές.
     
9. Για να αναπτύξετε ένα σενάριο, εκτελέστε το πρώτο (\"https://accounts.google.com)   curl γραμμή ακριβώς όπως αντιγράφηκε από τα εργαλεία του προγραμματιστή, και να συλλάβει την απάντηση (μπορεί να πάρετε ένα curl σφάλμα σχετικά με τη σημαία "--2.0" απλά αφαιρέστε το) . Σε php μοιάζει με τα ακόλουθα:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Συνδεθείτε στο Google εκτελώντας τη δεύτερη γραμμή χρησιμοποιώντας $id\\_token, αφαιρώντας πρώτα την παράμετρο "-H 'Cookie: stuff'" και αντίθετα λέγοντας curl για να γράψετε ένα cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Σύνδεση στο ERDDAP™ , αφαιρώντας και πάλι την παράμετρο "-H 'Cookie: stuff'" και χρησιμοποιώντας το προηγουμένως γραμμένο cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Τώρα θα πρέπει να μπορείτε να ζητήσετε δεδομένα από τον εξυπηρετητή, χρησιμοποιώντας το ίδιο cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
