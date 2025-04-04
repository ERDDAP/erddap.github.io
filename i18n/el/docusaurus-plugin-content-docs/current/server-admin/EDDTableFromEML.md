---
title: "EDDTableFromEML"
sidebar_position: 6
---
# Ο πίνακας EDDFromEML και ο πίνακας EDDFromEMLBatch Επιλογές δημιουργίας συνόλων δεδομένων Xml

\\[Αυτή η ιστοσελίδα θα ενδιαφέρει μόνοERDDAP™διαχειριστές που εργάζονται με αρχεία EML.
Το έγγραφο αυτό δημιουργήθηκε αρχικά το 2016. Τελευταία επιμέλεια έγινε στις 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)είναι ένας διακομιστής δεδομένων που δίνει στους χρήστες έναν απλό, συνεπή τρόπο για να κατεβάσετε υποσύνολα των gridded και πίνακα επιστημονικών δεδομένων σε κοινές μορφές αρχείων και να κάνει γραφήματα και χάρτες.ERDDAP™λειτουργεί με δεδομένο σύνολο δεδομένων είτε ως ομάδα πολυδιάστατων καννάβδινων μεταβλητών (π.χ. δεδομένα δορυφορικών ή μοντέλων) ή ως πίνακας βάσης δεδομένων (με στήλη για κάθε τύπο πληροφοριών και σειρά για κάθε παρατήρηση) .ERDDAP™είναι Ελεύθερο και Open Source Software, έτσι ώστε ο καθένας μπορεί[λήψη και εγκατάστασηERDDAP™](/docs/server-admin/deploy-install)για να εξυπηρετήσουν τα δεδομένα τους.

Για να προσθέσετε ένα σύνολο δεδομένων σε έναERDDAP™εγκατάσταση, ηERDDAP™Ο διαχειριστής πρέπει να προσθέσει ένα κομμάτι XML που περιγράφει το σύνολο δεδομένων σε ένα αρχείο που ονομάζεταιdatasets.xml. (Υπάρχει.[ενδελεχή τεκμηρίωσηdatasets.xml](/docs/server-admin/datasets).) Αν και είναι δυνατόν να δημιουργήσετε το κομμάτι του XML γιαdatasets.xmlεξ ολοκλήρου με το χέρι,ERDDAP™έρχεται με ένα εργαλείο που ονομάζεται[ **Δημιουργία συνόλων δεδομένωνXml** ](/docs/server-admin/datasets#tools)που μπορεί να δημιουργήσει το πρόχειρο σχέδιο του κομματιού XML που απαιτείται για ένα δεδομένο σύνολο δεδομένων με βάση κάποια πηγή πληροφοριών σχετικά με το σύνολο δεδομένων.

Το πρώτο πράγμα GenerateDatasets Το Xml ρωτάει τι είδους σύνολο δεδομένων θέλετε να δημιουργήσετε. Δημιουργία συνόλων δεδομένων Xml έχει μια ειδική επιλογή, **Πίνακας EDDFromEML** , η οποία χρησιμοποιεί τις πληροφορίες σε[Οικολογικά μεταδεδομένα Γλώσσα (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Αρχείο XML για τη δημιουργία του κομματιού XML γιαdatasets.xmlγια τη δημιουργία ενός[Πίνακας EDD από αρχεία Ascii](/docs/server-admin/datasets#eddtablefromasciifiles)σύνολο δεδομένων από κάθε πίνακα δεδομένων σε ένα αρχείο EML. Αυτό λειτουργεί πολύ καλά για τα περισσότερα αρχεία EML, κυρίως επειδή τα αρχεία EML κάνουν μια εξαιρετική δουλειά της αποθήκευσης όλων των απαραίτητων μεταδεδομένων για ένα σύνολο δεδομένων σε μια εύκολη στην εργασία-με τη μορφή. Οι πληροφορίες που GenerateDatasetsXml πρέπει να δημιουργήσουν τα σύνολα δεδομένων είναι στο αρχείο EML, συμπεριλαμβανομένου του URL για το αρχείο δεδομένων, το οποίο GenerateDatasetsXml κατεβάζει, αναλύει, και συγκρίνει με την περιγραφή στο αρχείο EML. (Πολλές ομάδες θα έκαναν καλά να στραφούν σε EML, το οποίο είναι ένα μεγάλο σύστημα για την τεκμηρίωση κάθε πίνακα επιστημονικών δεδομένων, όχι μόνο οικολογικά δεδομένα. Και πολλές ομάδες που δημιουργούν σχήματα XML θα κάνει καλά να χρησιμοποιήσει EML ως μελέτη περίπτωση για XML σχήμα που είναι σαφές, ως το σημείο, όχι υπερβολικά βαθιά (Δηλαδή, πάρα πολλά επίπεδα) , και εύκολο για τους ανθρώπους και τους υπολογιστές να εργαστούν με.) 

## Ερωτήσεις{#questions} 

Εδώ είναι όλες οι ερωτήσεις GenerateDatasets Xml θα ρωτήσει, με σχόλια σχετικά με το πώς θα πρέπει να απαντήσετε αν θέλετε να επεξεργαστείτε μόνο ένα αρχείο EML ή μια παρτίδα αρχείων EML:

* Ποιο είδος EDD;
Αν θέλετε να επεξεργαστείτε μόνο ένα αρχείο, απαντήστε: EDDTableFromEML
Αν θέλετε να επεξεργαστείτε μια ομάδα αρχείων, απαντήστε: EDDTableFromEMLBatch
* Κατάλογος αποθήκευσης αρχείων;
Εισάγετε το όνομα του καταλόγου που θα χρησιμοποιηθεί για την αποθήκευση κατεβασμένων αρχείων EML ή/και δεδομένων.
Αν ο κατάλογος δεν υπάρχει, θα δημιουργηθεί.
*    (Για τον πίνακα EDDFromEML μόνο) URL EML ή τοπικό αρχείοName?
Εισάγετε το URL ή το τοπικό όνομα αρχείου ενός αρχείου EML.
*    (Μόνο για τον πίνακα EDDFromEMLBatch) EML dir (URL ή τοπικό) ♪ ♪
Εισάγετε το όνομα του καταλόγου με τα αρχεία EML (ένα URL ή ένα τοπικό dir) .
Για παράδειγμα: http://sbc.lternet.edu/data/eml/files/
 
*    (Μόνο για τον πίνακα EDDFromEMLBatch) Όνομα αρχείου regex;
Εισάγετε την κανονική έκφραση που θα χρησιμοποιηθεί για τον προσδιορισμό των επιθυμητών αρχείων EML στον κατάλογο EML.
Για παράδειγμα: Mamba, Σχέση/dating
* Χρήση τοπικών αρχείων αν υπάρχουν (αλήθεια|ψευδές) ♪ ♪
Εισάγετε αλήθεια για να χρησιμοποιήσετε τα υπάρχοντα τοπικά αρχεία EML και αρχεία δεδομένων, αν υπάρχουν.
Εισάγετε ψευδή για να επανακατεβάσετε πάντα τα αρχεία EML ή/και τα αρχεία δεδομένων.
* προσβάσιμη Για να;
Αν θέλετε τα νέα σύνολα δεδομένων να είναι ιδιωτικά σύνολα δεδομένων σεERDDAP, να προσδιορίσει το όνομα της ομάδας (α) θα επιτρέπεται η πρόσβαση.
Συνιστάται για ομάδες LTER: συνδυάζουν "lter" συν την ομάδα, π.χ., lter ΣΒΚ .
Εάν μπείτε "null", δεν θα υπάρξει&lt;προσβάσιμη To&gt; ετικέτα στην έξοδο.
Βλέπεις;[προσβάσιμη Στο](/docs/server-admin/datasets#accessibleto).
* τοπικό ΧρόνοςZone (π.χ., ΗΠΑ/Ειρηνικού) ♪ ♪
Εάν μια χρονική μεταβλητή δείχνει ότι έχει τοπικές τιμές ώρας, αυτή η ζώνη ώρας θα οριστεί.
Αυτό πρέπει να είναι μια τιμή από το[Κατάλογος των ονομάτων ζώνης ώρας στη στήλη TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Σημειώστε όλα τα εύκολα στη χρήση "ΗΠΑ/..." ονόματα στο τέλος της λίστας.
Εάν αργότερα διαπιστώσετε ότι είναι λάθος, μπορείτε να αλλάξετε τοtime\\_zoneστο κομμάτι τουdatasets.xml.

EML συνERDDAP™είναι ένας μεγάλος συνδυασμός, δεδομένου ότιERDDAP™μπορεί να δώσει στους χρήστες πιο άμεση πρόσβαση στον πλούτο[Δίκτυο Γνώσης για Βιοπλοκή (ΚΝΒ) ](https://knb.ecoinformatics.org/)και[Μακροπρόθεσμη Οικολογική Έρευνα (ΛΕΚΤΡΟΝ) ](https://lternet.edu/)δεδομένα και να βοηθήσει αυτά τα έργα πληρούν την κυβέρνηση των ΗΠΑ[Πρόσβαση του κοινού στα Ερευνητικά Αποτελέσματα (ΠΑΡR) Απαιτήσεις](https://nosc.noaa.gov/EDMC/PD.DSP.php)καθιστώντας τα δεδομένα διαθέσιμα μέσω υπηρεσίας ιστού. Επίσης, EML συνERDDAP™Φαίνεται σαν μια μεγάλη γέφυρα μεταξύ των επιστημόνων στο ακαδημαϊκό / NSF-χρηματοδοτούμενο βασίλειο και επιστήμονες στην ομοσπονδιακή υπηρεσία (NOAA, NASA, USGS) Βασίλειο.

Δείτε μας[τμήμα για τη λήψη πρόσθετης υποστήριξης](/docs/intro#support).
 
## Λεπτομέρειες σχεδιασμού{#design-details} 

Εδώ είναι οι λεπτομέρειες σχεδιασμού της επιλογής EDDTableFromEML στο GenerateDatasetsXml.
Ορισμένες σχετίζονται με διαφορές στον τρόπο με τον οποίο EML καιERDDAP™κάνει πράγματα και πώς GenerateDatasets Xml ασχολείται με αυτά τα προβλήματα.

### Ένας πίνακας δεδομένων γίνεται έναςERDDAP™Σύνολο δεδομένων{#one-datatable-becomes-one-erddap-dataset} 
Ένα αρχείο EML μπορεί να έχει πολλαπλές&lt;δεδομένα Πίνακας&gt;s.ERDDAP™κάνει έναERDDAP™dataset ανά EML dataTable. ΗdatasetIDγια το σύνολο δεδομένων
 *EMLName* \\_Τ *Αριθμός πίνακα*   (όταν το όνομα EML είναι κείμενο) ή
 *σύστημα\\_ EMLName* \\_Τ *Αριθμός πίνακα*   (όταν το όνομα EML είναι αριθμός) .
Για παράδειγμα, ο πίνακας # 1 στο αρχείο knb-lter-sbc.28, γίνεταιERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML έναντι CF+ACDD{#eml-versus-cfacdd} 
Σχεδόν όλα τα μεταδεδομένα στα αρχεία EML μπαίνουν σεERDDAP, αλλά σε διαφορετική μορφή.ERDDAP™χρησιμοποιεί το[ΚΦ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)και[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)πρότυπα μεταδεδομένων. Πρόκειται για συμπληρωματικά συστήματα μεταδεδομένων που χρησιμοποιούν ζεύγη key=τιμών για τα παγκόσμια μεταδεδομένα και για τα μεταδεδομένα κάθε μεταβλητής.
Ναι, η αναπαράσταση EML των μεταδεδομένων είναι καλύτερη από την αναπαράσταση CF+ACDDD. Δεν προτείνω τη χρήση της αναπαράστασης CF+ACDD ως αντικατάστασης του EML. Παρακαλώ σκεφτείτε CF+ACDD ως μέρος της γέφυρας από τον κόσμο EML στοOPeNDAP/CF/ACDD κόσμο.
     
### Μικρές αλλαγές{#small-changes} 
ERDDAP™Κάνει πολλές μικρές αλλαγές. Για παράδειγμα,ERDDAP™χρησιμοποιεί το EML μη-DOIαναπληρωματικό Αναγνωριστικό συν έναν αριθμό πίνακα δεδομένων ωςERDDAP™ datasetID, αλλά ελαφρώς αλλάζει εναλλάξ Αναγνωριστικό για να γίνει έγκυρο μεταβλητό όνομα στις περισσότερες γλώσσες υπολογιστών, π.χ., δεδομένα knb-lter-sbc.33 Ο πίνακας # 1 γίνεται knb\\_lter\\_sbc\\_33\\1.
     
### Βιβλίο Doc{#docbook} 
Η EML χρησιμοποιεί το σύστημα σήμανσης του DocBook για να παρέχει δομή σε μπλοκ κειμένου σε αρχεία EML. CF και ACDD απαιτούν τα μεταδεδομένα να είναι απλό κείμενο. Δημιουργία συνόλων δεδομένων Το Xml μετατρέπει το σημειωμένο κείμενο σε απλό κείμενο που μοιάζει με τη μορφοποιημένη έκδοση του κειμένου. Οι ετικέτες inline καθαρίζονται με αγκύλες, π.χ.,\\[έμφαση\\], και αριστερά στο απλό κείμενο.
     
### Αρχεία δεδομένων{#data-files} 
Δεδομένου ότι ο πίνακας δεδομένων EML περιλαμβάνει το URL του πραγματικού αρχείου δεδομένων, GenerateDatasets Xml:
1. Κατεβάστε το αρχείο δεδομένων.
2. Αποθηκεύστε το στον ίδιο κατάλογο με το αρχείο EML.
3. Διάβασε τα δεδομένα.
4. Συγκρίνετε την περιγραφή των δεδομένων στο EML με τα πραγματικά δεδομένα στο αρχείο.
5. Αν δημιουργήσετε σύνολα δεδομένων Το Xml βρίσκει διαφορές, ασχολείται με αυτές, ή ρωτάει τον χειριστή αν οι διαφορές είναι εντάξει, ή επιστρέφει ένα μήνυμα σφάλματος. Οι λεπτομέρειες είναι σε διάφορα σημεία παρακάτω.
         
### .zipΑρχεία δεδομένων 'd{#zipd-data-files} 
Εάν το αρχείο δεδομένων αναφοράς είναι ένα.zipαρχείο, πρέπει να περιέχει μόνο ένα αρχείο. Το αρχείο αυτό θα χρησιμοποιηθεί για τοERDDAP™Σύστημα δεδομένων. Εάν υπάρχει περισσότερο από ένα αρχείο.ERDDAP™θα απορρίψει αυτό το σύνολο δεδομένων. Αν χρειαστεί, αυτό θα μπορούσε να τροποποιηθεί. (Στην πράξη, όλα τα αρχεία SBC LTER φερμουάρ έχουν μόνο ένα αρχείο δεδομένων.)   
     
### Τύπος αποθήκευσης{#storagetype} 
Εάν μια στήλη αποθηκεύεται Ο τύπος δεν προσδιορίζεται,ERDDAP™χρησιμοποιεί την καλύτερη εικασία του με βάση τα δεδομένα στο αρχείο δεδομένων. Δουλεύει πολύ καλά.
     
### Μονάδες{#units} 
ERDDAP™χρήσεις[UDUNITSμορφοποίηση μονάδων](https://www.unidata.ucar.edu/software/udunits/). Δημιουργία συνόλων δεδομένων Xml είναι σε θέση να μετατρέψει μονάδες EML σεUDUNITSκαθαρά περίπου το 95% του χρόνου. Το υπόλοιπο 5% έχει ως αποτέλεσμα μια αναγνώσιμη περιγραφή των μονάδων, π.χ., "biomassDensityUnitPerAbundanceUnit" σε EML γίνεται "biomass μονάδα πυκνότητας ανά μονάδα αφθονίας" σεERDDAP. Τεχνικά αυτό δεν επιτρέπεται. Δεν νομίζω ότι είναι τόσο άσχημα υπό αυτές τις συνθήκες.\\[Αν χρειαστεί, μονάδες που δεν μπορούν να γίνουν.UDUNITSσυμβατό θα μπορούσε να μετακινηθεί στο χαρακτηριστικό σχόλιο της μεταβλητής.\\]  
     
### EML έκδοση 2.1.1{#eml-version-211} 
Αυτή η υποστήριξη για αρχεία EML v2.1.1 προστέθηκε στα GenerateDatasets Xml το 2016 με την ελπίδα ότι θα υπάρξει κάποια πρόσληψη στην κοινότητα EML. Από το 2020, αυτό δεν έχει συμβεί. ΗERDDAP™προγραμματιστές θα ήταν στην ευχάριστη θέση να προσθέσετε υποστήριξη για πιο πρόσφατες εκδόσεις του EML, αλλά μόνο αν τα νέα χαρακτηριστικά θα χρησιμοποιηθούν πραγματικά. Παρακαλώ στείλτε emailerd.data at noaa.govαν θέλετε υποστήριξη για πιο πρόσφατες εκδόσεις του EML και θα χρησιμοποιήσετε πραγματικά αυτό το χαρακτηριστικό.
     

## Θέματα με τα αρχεία EML{#issues-with-the-eml-files} 

Υπάρχουν κάποια θέματα / προβλήματα με τα αρχεία EML που προκαλούν προβλήματα όταν ένας πελάτης λογισμικού (όπως η επιλογή EDDTableFromEML στο GenerateDatasetsXML) προσπαθεί να ερμηνεύσει / επεξεργαστεί τα αρχεία EML.

* Αν και υπάρχουν αρκετά θέματα που αναφέρονται εδώ, είναι κυρίως μικρά, επιλύσιμα προβλήματα. Γενικά, το EML είναι ένα μεγάλο σύστημα και ήταν χαρά μου να συνεργαστώ μαζί του.
* Αυτά είναι περίπου ταξινομημένα από το χειρότερο / πιο κοινό σε λιγότερο κακό / λιγότερο κοινό.
* Τα περισσότερα σχετίζονται με μικρά προβλήματα σε συγκεκριμένα αρχεία EML (που δεν είναι λάθος της EML) .
* Τα περισσότερα μπορούν να διορθωθούν με απλές αλλαγές στο αρχείο EML ή στο αρχείο δεδομένων.
* Δεδομένου ότι οι άνθρωποι του LTER κατασκευάζουν έναν ελεγκτή EML για να ελέγξουν την εγκυρότητα των αρχείων EML, έχω προσθέσει μερικές προτάσεις παρακάτω σχετικά με χαρακτηριστικά που θα μπορούσαν να προστεθούν στον ελεγκτή.

Εδώ είναι τα θέματα:

### Χωριστές στήλες ημερομηνίας και ώρας{#separate-date-and-time-columns} 
Ορισμένα αρχεία δεδομένων έχουν ξεχωριστές στήλες για την ημερομηνία και για το χρόνο, αλλά δεν ενοποιημένη ημερομηνία + ώρα στήλη. Επί του παρόντος, GenerateDatasets Το Xml δημιουργεί ένα σύνολο δεδομένων με αυτές τις ξεχωριστές στήλες, αλλά δεν είναι ιδανικό επειδή:

* Είναι καλύτερο αν τα σύνολα δεδομένωνERDDAP™έχουν μια συνδυασμένη ημερομηνία + ώρα στήλη που ονομάζεται"time".
* Συχνά το σύνολο δεδομένων δεν φορτώνειERDDAP™επειδή το"time"στήλη δεν έχει δεδομένα ημερομηνίας + ώρας.

Υπάρχουν δύο πιθανές λύσεις:
1. Επεξεργασία του αρχείου πηγαίου δεδομένων για την προσθήκη νέας στήλης στο αρχείο δεδομένων (και περιγράψτε το στο EML) όταν οι στήλες ημερομηνίας και ώρας συγχωνεύονται σε μία στήλη. Μετά επανεκκίνηση GenerateDatasets Xml έτσι βρίσκει τη νέα στήλη.
2. Χρήση του[Παράγωγες μεταβλητές](/docs/server-admin/datasets#script-sourcenamesderived-variables)χαρακτηριστικό στοERDDAP™για τον καθορισμό μιας νέας μεταβλητήςdatasets.xmlτο οποίο δημιουργείται με τη συγκράτηση της ημερομηνίας και των χρονικών στηλών. Ένα από τα παραδείγματα αφορά συγκεκριμένα την κατάσταση αυτή.
         
### Άκυρα ονόματα στηλών{#inconsistent-column-names} 
Τα αρχεία EML απαριθμούν τις στήλες του αρχείου δεδομένων και τα ονόματά τους. Δυστυχώς, είναι συχνά διαφορετικά από τα ονόματα στήλης στο πραγματικό αρχείο δεδομένων. Κανονικά, η σειρά στήλης στο αρχείο EML είναι η ίδια με τη σειρά στήλης στο αρχείο δεδομένων, ακόμη και αν τα ονόματα διαφέρουν ελαφρώς, αλλά όχι πάντα. Δημιουργία συνόλων δεδομένων Το Xml προσπαθεί να ταιριάξει τα ονόματα της στήλης. Όταν δεν μπορεί (η οποία είναι κοινή) , θα σταματήσει, θα σας δείξει τα ζεύγη ονομάτων αρχείων EML / δεδομένων, και ask αν είναι σωστά ευθυγραμμισμένα. Αν εισάγετε 's' για να παραλείψετε έναν πίνακα, το GeneratedDatasetsXml θα εκτυπώσει ένα μήνυμα σφάλματος και θα πάει στον επόμενο πίνακα.
Η λύση είναι να αλλάξετε τα λανθασμένα ονόματα στήλης στο αρχείο EML για να ταιριάζει με τα ονόματα στήλης στο αρχείο δεδομένων.
     
### Διαφορετική σειρά στηλών{#different-column-order} 
Υπάρχουν αρκετές περιπτώσεις όπου το EML καθόρισε τις στήλες με διαφορετική σειρά από αυτές που υπάρχουν στο αρχείο δεδομένων. Δημιουργία συνόλων δεδομένων Το Xml θα σταματήσει και θα ρωτήσει τον χειριστή αν τα matchups είναι εντάξει ή αν το σύνολο δεδομένων θα πρέπει να παραλειφθεί. Εάν παραληφθεί, θα υπάρξει ένα μήνυμα σφάλματος στο αρχείο αποτελεσμάτων, π.χ.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Η λύση είναι να διορθώσετε τη σειρά στήλης σε αυτά τα αρχεία EML έτσι ώστε να ταιριάζουν με τη σειρά στα αρχεία δεδομένων.

Θα ήταν ωραίο αν ο ελεγκτής EML έλεγξε ότι οι στήλες και η σειρά στήλης στο αρχείο πηγής ταιριάζουν με τις στήλες και τη σειρά στήλης στο αρχείο EML.
    
### Λάθος numHeaderLines{#incorrect-numheaderlines} 
Διάφορα δεδομένα Πίνακες δηλώνουν λανθασμένα numHeaderLines=1, π.χ., ...sbc.4011. Αυτό προκαλείERDDAP™να διαβάσει την πρώτη γραμμή δεδομένων ως ονόματα στήλης. Προσπάθησα να βάλω χειροκίνητα όλους αυτούς τους πίνακες δεδομένων. Είναι προφανείς επειδή τα αταίριαστα ονόματα πηγαίου κώδικα είναι όλες οι τιμές δεδομένων. Και αν υπάρχουν αρχεία που λανθασμένα έχουν numHeaderLines=0, το σύστημά μου δεν το κάνει προφανές. Εδώ είναι ένα παράδειγμα από το αρχείο αστοχιών SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Έτσι το σφάλμα μπορεί να εμφανιστεί σαν να δημιουργεί σύνολα δεδομένων Το Xml πιστεύει ότι η πρώτη γραμμή με δεδομένα στο αρχείο (π.χ., με 2008-10-01T00:00 κ.ά.) είναι η γραμμή με τα ονόματα στήλης (σαν το 2008-10-01T00:00 να είναι όνομα στήλης) .

Θα ήταν ωραίο αν ο ελεγκτής EML έλεγχε την τιμή numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Κάποια αρχεία πηγής δεν έχουν ονόματα στήλης.ERDDAP™αποδέχεται ότι εάν το EML περιγράφει τον ίδιο αριθμό στηλών.

Κατά τη γνώμη μου, αυτό φαίνεται πολύ επικίνδυνο. Μπορεί να υπάρχουν στήλες σε διαφορετική σειρά ή με διαφορετικές μονάδες (Βλέπε παρακάτω) και δεν υπάρχει τρόπος να πιάσουμε αυτά τα προβλήματα. Είναι πολύ καλύτερα αν όλα τα αρχεία δεδομένων ASCII έχουν μια σειρά με ονόματα στήλης.
    
### συμβολοσειρές μορφής ημερομηνίας-ώρας{#datetime-format-strings} 
EML έχει έναν τυποποιημένο τρόπο για να περιγράψει μορφές ημερομηνίας ώρα. Αλλά υπάρχει σημαντική διακύμανση στη χρήση του στα αρχεία EML. (Έκανα λάθος στο παρελθόν. Βλέπω την τεκμηρίωση EML για formatString που φαίνεται να ταιριάζει με το[JavaΗμερομηνίαΠροδιαγραφή αντικειμένου](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), αλλά η οποία στερείται των σημαντικών κατευθυντήριων γραμμών σχετικά με τη χρήση του, με αποτέλεσμα η μορφή String χρησιμοποιείται συχνά / συνήθως ακατάλληλα.) Υπάρχουν πολλές περιπτώσεις με λανθασμένη περίπτωση ή/και λανθασμένη επικάλυψη επιστολής ή/και μη τυπική μορφοποίηση. Αυτό επιβαρύνει τους πελάτες, ειδικά τους πελάτες λογισμικού όπως το GenerateDatasetsXml. Δημιουργία συνόλων δεδομένων Xml προσπαθεί να μετατρέψει τις λανθασμένα καθορισμένες μορφές στα αρχεία EML σε
[το μορφότυπο ημερομηνίας/ώρας πουERDDAP™απαιτεί](/docs/server-admin/datasets#string-time-units), η οποία είναι σχεδόν πανομοιότυπη με γιαJava/Joda χρονική μορφή προδιαγραφή, αλλά είναι ελαφρώς πιο συγχωρητικό.

Θα ήταν ωραίο αν ο ελεγκτής EML απαιτούσε αυστηρή τήρηση τουJava/Τζόντα/ERDDAPοι προδιαγραφές των χρονομονάδων και η επαλήθευση ότι οι τιμές του χρόνου ημερομηνίας στον πίνακα δεδομένων μπορούν να αναλυθούν σωστά με την καθορισμένη μορφή.
    
### Ημερομηνία, αλλά όχι Ζώνη Ώρας{#datetime-but-no-time-zone} 
Δημιουργία συνόλων δεδομένων Xml ψάχνει για μια στήλη με ημερομηνία Ώρα και καθορισμένη ζώνη ώρας (είτεZulu: από μονάδες χρόνου που καταλήγουν στο 'Z' ή από έναν ορισμό στήλης ή χαρακτηριστικού που περιλαμβάνει "gmt" ή "utc", ή τοπικό: από "τοπικό" στο όνομα στήλης ή τον ορισμό χαρακτηριστικού) . Επίσης αποδεκτό είναι ένα αρχείο με στήλη ημερομηνίας αλλά όχι χρονική στήλη. Επίσης αποδεκτό είναι ένα αρχείο χωρίς πληροφορίες ημερομηνίας ή ώρας.

Δημιουργία συνόλων δεδομένων Το Xml αντιμετωπίζει όλους τους τοπικούς χρόνους ως να είναι από τη ζώνη ώρας που μπορείτε να καθορίσετε για μια δεδομένη παρτίδα αρχείων, π.χ., για SBC LTER, χρησιμοποιήστε US/Pacific. Οι πληροφορίες είναι μερικές φορές στα σχόλια, αλλά όχι σε μια μορφή που είναι εύκολο για ένα πρόγραμμα υπολογιστή να καταλάβω.

Τα αρχεία που δεν πληρούν αυτά τα κριτήρια απορρίπτονται με το μήνυμα " ΟΧΙ ΚΑΛΗ ΗΜΕΡΟΜΗΝΙΑ (ΧΡΟΝΟΣ) ΜΕΤΑΒΑΣΙΜΟ". Τα κοινά προβλήματα είναι:

* Υπάρχει μια στήλη με ημερομηνίες και μια στήλη με χρόνους, αλλά όχι ημερομηνία Χρονική στήλη.
* Υπάρχουν χρονικές μονάδες, αλλά η ζώνη ώρας δεν είναι καθορισμένη.

Άλλες παρατηρήσεις:
Εάν υπάρχει καλή ημερομηνία+ώρα με τη στήλη ζώνης ώρας, η στήλη αυτή θα ονομαστεί"time"μέσαERDDAP.ERDDAP™απαιτεί ότι τα δεδομένα χρονοσειρών είναι κατανοητά/μετατρέψιμαZulu/UTC/GMT ημερομηνία ώρα ζώνηTimes.\\[Η πεποίθησή μου είναι: χρήση τοπικών χρόνων και διαφορετικών μορφών ημερομηνίας/ώρας (Διψήφια χρόνια&#33; mm/dd/yy vs d/mm/yy vs ...) σε αρχεία δεδομένων αναγκάζει τον τελικό χρήστη να κάνει περίπλοκες μετατροπές σεZuluχρόνο για τη σύγκριση δεδομένων από ένα σύνολο δεδομένων με δεδομένα από ένα άλλο. Λοιπόν...ERDDAP™τυποποιεί όλα τα δεδομένα χρόνου: Για τους χρόνους χορδών,ERDDAP™χρησιμοποιεί πάντα το ISO 8601:2004 (E) τυπική μορφή, για παράδειγμα, 1985-01-02T00:00:00Z. Για αριθμητικούς χρόνους,ERDDAP™πάντα χρήση"seconds since 1970-01-01T00:00:00Z".ERDDAP™πάντα χρησιμοποιεί τοZulu  (UTC, GMT) ζώνη ώρας για την άρση των δυσκολιών της εργασίας με διαφορετικές ζώνες ώρας και κανονικό χρόνο έναντι της ημέρας ακριβής χρόνος. Δημιουργία συνόλων δεδομένων Xml αναζητά μια στήλη δεδομένων EML με ημερομηνία+ώραZulu. Αυτό είναι δύσκολο γιατί η EML δεν χρησιμοποιεί επίσημο λεξιλόγιο/σύστημα (Όπως[JavaΜορφή ώρας /Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) για τον προσδιορισμό των δεδομένων Μορφή χρόνου:
Αν υπάρχει κολ με αριθμητικές τιμές χρόνου (π.χ.,Matlabχρόνοι) καιZuluχρονοζώνη (ή απλά ημερομηνίες, χωρίς χρονικές στήλες) , χρησιμοποιείται ως"time".
Εάν υπάρχει στήλη με δεδομένα ημερομηνίας και ώρας, χρησιμοποιώντας τοZuluζώνη ώρας, χρησιμοποιείται ως"time"και οποιαδήποτε άλλη ημερομηνία ή χρονική στήλη αφαιρείται.
Διαφορετικά, εάν ένα col με πληροφορίες δίκαιης ημερομηνίας βρίσκεται, χρησιμοποιείται ως το"time"μεταβλητή (χωρίς ζώνη ώρας) .
Εάν υπάρχει στήλη δεδομένων και στήλη ώρας και δεν υπάρχει συνδυασμένη ημερομηνία Χρονική στήλη, το σύνολο δεδομένων είναι ΑΝΑΝΕΩΜΕΝΟ — αλλά το σύνολο δεδομένων θα μπορούσε να χρησιμοποιηθεί με την προσθήκη μιας συνδυασμένης ημερομηνίας Χρονική στήλη (κατά προτίμηση,Zuluζώνη ώρας) στο αρχείο δεδομένων και προσθέτοντας την περιγραφή του στο αρχείο EML.
ΠΑΡΑΔΕΙΓΜΑ από SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)Πίνακας δεδομένων # 2.

Θα ήταν ωραίο αν το EML/LTER απαιτούσε τη συμπερίληψη μιας στήλης μεZulu  (UTC, GMT) ώρες ζώνης ώρας σε όλα τα σχετικά αρχεία δεδομένων πηγής. Επόμενο καλύτερο είναι να προσθέσετε ένα σύστημα στο EML για να καθορίσετε έναtime\\_zoneχαρακτηριστικό που χρησιμοποιεί τυποποιημένα ονόματα (από την[Στήλη TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Λείπειmissing\\_value {#missing-missing_value} 
Ορισμένες στήλες χρησιμοποιούν αmissing\\_valueαλλά μην το απαριθμήσετε στα μεταδεδομένα EML, π.χ., καθίζηση\\_mm σε knb-lter-sbc.5011 χρησιμοποιεί -999. Εάν δεν ορίζεται τιμή που λείπει στο EML, το GenerateDatasetsXml ψάχνει αυτόματα για κοινές τιμές που λείπουν (π.χ. 99, -99, 999, -999, -9999, κ.λπ.) και δημιουργεί τα μεταδεδομένα. Αλλά άλλοι αγνοούμενοιmissing\\_valueΔεν πιάνονται.

Θα ήταν ωραίο αν ο ελεγκτής EML έψαχνε για λείπειmissing\\_valueΣ.
    
### Μικρά Προβλήματα{#small-problems} 
Υπάρχουν πολλά μικρά προβλήματα. (ορθογραφία, στίξη) που πιθανότατα θα βρεθεί μόνο από έναν άνθρωπο που επιθεωρεί κάθε σύνολο δεδομένων.

Θα ήταν καλό αν ο ελεγκτής EML έψαχνε για ορθογραφικά και γραμματικά λάθη. Αυτό είναι ένα δύσκολο πρόβλημα, επειδή οι λέξεις στην επιστήμη συχνά επισημαίνονται με ορθογραφικούς ελέγχους. Η ανθρώπινη επεξεργασία είναι πιθανώς απαραίτητη.
    
### Μη έγκυροι χαρακτήρες Unicode{#invalid-unicode-characters} 
Μερικά από το περιεχόμενο EML περιέχει άκυρους χαρακτήρες Unicode. Αυτοί είναι πιθανώς χαρακτήρες από το charset των Windows που αντιγράφηκαν λανθασμένα και επικολλήθηκαν στα αρχεία UTF-8 EML. Δημιουργία συνόλων δεδομένων Xml απολυμαίνει αυτούς τους χαρακτήρες π.χ.,\\[#128\\], έτσι είναι εύκολο να αναζητήσετε στοERDDAP™ datasets.xmlΑρχείο.

Θα ήταν καλό αν ο ελεγκτής EML τσέκαρε για αυτό. Είναι εύκολο να βρεθεί και εύκολο να διορθωθεί.
    
### Διαφορετικές μονάδες στηλών] (#διαφορετικά ColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Ορισμένοι πίνακες δεδομένων EML καθορίζουν στήλες που είναι ασυνεπείς με τις στήλες στο αρχείο δεδομένων, κυρίως επειδή έχουν διαφορετικές μονάδες. Δημιουργία συνόλων δεδομένων Xml σημαίες αυτές. Είναι στο χέρι του χειριστή να αποφασίσει αν οι διαφορές είναι εντάξει ή όχι. Αυτά εμφανίζονται στο αρχείο αποτυχιών ως "SKIPPED" dataTables. ΠΑΡΑΔΕΙΓΜΑ στο αρχείο αστοχιών LTER SBC:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Θα ήταν ωραίο αν ο ελεγκτής EML έλεγχε ότι οι μονάδες ταιριάζουν. Δυστυχώς, αυτό είναι μάλλον αδύνατο να συλληφθεί και στη συνέχεια αδύνατο να επιλυθεί χωρίς να επικοινωνήσετε με τον δημιουργό του συνόλου δεδομένων, δεδομένου ότι το αρχείο πηγής δεν περιλαμβάνει μονάδες. Η απόκλιση για το παραπάνω παράδειγμα ήταν αισθητή μόνο και μόνο επειδή οι μονάδες περιλαμβάνονταν στο όνομα της στήλης πηγής και το όνομα στήλης EML. Πόσοι άλλοι πίνακες δεδομένων έχουν αυτό το πρόβλημα αλλά είναι μη ανιχνεύσιμοι;
    
### Διαφορετικές εκδόσεις του EML{#different-versions-of-eml} 
Δημιουργία συνόλων δεδομένων Το Xml έχει σχεδιαστεί για να λειτουργεί με EML 2.1.1. Άλλες εκδόσεις του EML θα λειτουργήσει στο βαθμό που ταιριάζουν με 2.1.1 ή ότι GenerateDatasetsXml έχει ειδικό κωδικό για να ασχοληθεί με αυτό. Αυτό είναι σπάνιο πρόβλημα. Όταν συμβαίνει, η λύση είναι να μετατρέψετε τα αρχεία σας σε EML 2.1.1, ή να στείλετε το αρχείο EML σεerd.data at noaa.gov, ώστε να μπορώ να κάνω αλλαγές σε GenerateDatasets Xml για την αντιμετώπιση των διαφορών.

Ο Bob πρόσθεσε υποστήριξη για αρχεία EML σε GenerateDatasets Xml το 2016 με την ελπίδα ότι θα υπάρξει κάποια πρόσληψη στην κοινότητα EML. Από το 2020, αυτό δεν έχει συμβεί. Ο Bob είναι στην ευχάριστη θέση να προσθέσει υποστήριξη για πιο πρόσφατες εκδόσεις του EML, αλλά μόνο αν τα νέα χαρακτηριστικά θα χρησιμοποιηθούν πραγματικά. Παρακαλώ στείλτε emailerd.data at noaa.govαν θέλετε υποστήριξη για πιο πρόσφατες εκδόσεις του EML και θα χρησιμοποιήσετε πραγματικά αυτό το χαρακτηριστικό.
    
### Δυσκολία ανάλυσης του αρχείου δεδομένων{#trouble-parsing-the-data-file} 
Σπάνια, ένας πίνακας δεδομένων μπορεί να απορριφθεί με το σφάλμα " μη αναμενόμενο αριθμό στοιχείων στη γραμμή #120 (Παρατηρήθηκε=52, αναμένεται=50) " Ένα τέτοιο μήνυμα σφάλματος σημαίνει ότι μια γραμμή στο αρχείο δεδομένων είχε διαφορετικό αριθμό τιμών από τις άλλες γραμμές. Μπορεί να είναι πρόβλημαERDDAP™  (π.χ., μη σωστή ανάλυση του αρχείου) ή στο φάκελο. ΠΑΡΑΔΕΙΓΜΑ από SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)Πίνακας δεδομένων #3, βλ. datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt
