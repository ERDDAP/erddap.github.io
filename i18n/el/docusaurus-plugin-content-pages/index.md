---
title: "ERDDAP™ Documentation"
---
## ΤελευταίαERDDAP™έκδοση{#latest-erddap-version} 

2.26, βλέπε[τεκμηρίωση αλλαγών](/changes#version-226)και[Κατέβασέ το.](https://github.com/ERDDAP/erddap/releases/tag/v2.26.0).

## ERDDAP™Πληροφορίες{#erddap-information} 

ERDDAP™είναι ένας επιστημονικός διακομιστής δεδομένων που δίνει στους χρήστες έναν απλό, συνεπή τρόπο για να κατεβάσετε υποσύνολα της
grided και πίνακα επιστημονικών δεδομένων σε κοινές μορφές αρχείων και να κάνει γραφήματα και χάρτες.
ERDDAP™είναι ένας Ελεύθερος και Ανοικτός Κώδικας (Απάτσι και Απάτσι)  JavaΑπό το ServletNOAA NMFS SWFSCΤμήμα Περιβαλλοντικής Έρευνας (ERD) .

* Για να δείτε/χρησιμοποιήσετε έναERDDAP™εγκατάσταση:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Για να ξεκινήσετε με μια ανάγνωση εγκατάστασης[ο οδηγός εγκατάστασης ανάπτυξης](/docs/server-admin/deploy-install).
* Για να συμβάλει κώδικα δείτε το[Οδηγός προγραμματιστή](/docs/contributing/programmer-guide).


Παρακάτω θα βρείτε σχετικούς συνδέσμους για ερωτήσεις και πώς να συνεισφέρετε.
* Επανεξέτασε τις συζητήσεις και κάνε ερωτήσεις στο[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)ή στο[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Ανασκόπηση και υποβολή θεμάτων[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Για να προταθούν τα αιτήματα χαρακτηριστικού, ακολουθήστε αυτή την καθοδήγηση:[ERDDAPΣυζητήσεις #93 (σχόλιο) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Αναζήτηση πολλαπλώνERDDAP™α
Υπάρχουν δύο τρόποι για την αναζήτηση πολλαπλώνERDDAP™s για σύνολα δεδομένων:[Αναζήτηση πολλαπλώνERDDAP™α](/SearchMultipleERDDAPs.html)και[ERDDAP™Ανακάλυψη συνόλου δεδομένων](http://erddap.com/).


## Ρυθμίστε το Δικό σαςERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™α[Ελεύθερος και ανοιχτός κώδικας](https://en.wikipedia.org/wiki/Free_and_open-source_software), όλα-Java  (σέρβις) , web εφαρμογή που τρέχει σε έναν εξυπηρετητή web εφαρμογή (για παράδειγμα, Tomcat (συνιστάται) , ή Jetty (λειτουργεί, αλλά δεν το υποστηρίζουμε.) ) . Αυτή η ιστοσελίδα είναι κυρίως για τους ανθρώπους ("ERDDAP™διαχειριστές") που θέλουν να στήσουν το δικό τουςERDDAP™εγκατάσταση στη δική τους ιστοσελίδα.

Για να ξεκινήσετε με μια ανάγνωση εγκατάστασης[ο οδηγός εγκατάστασης ανάπτυξης](/docs/server-admin/deploy-install).

### ΧρήσηERDDAP™να διανείμεις τα δεδομένα σου;{#why-use-erddap-to-distribute-your-data} 

Επειδή η μικρή προσπάθεια για την ίδρυσηERDDAP™φέρνει πολλά οφέλη.

* Εάν έχετε ήδη μια υπηρεσία web για τη διανομή των δεδομένων σας,
Μπορείτε να στήσετεERDDAP™να έχετε πρόσβαση στα δεδομένα σας μέσω της υπάρχουσας υπηρεσίας.
Ή μπορείς να στήσειςERDDAP™να έχετε πρόσβαση στα δεδομένα σας απευθείας από τοπικά αρχεία.
* Για κάθε σύνολο δεδομένων, πρέπει να γράψετε μόνο ένα μικρό κομμάτι XML για να πείτεERDDAP™Πώς να αποκτήσετε πρόσβαση στο σύνολο δεδομένων.
* Μόλις το κάνεις.ERDDAP™εξυπηρετώντας τα δεδομένα σας, οι τελικοί χρήστες μπορούν:
    * Αίτηση των δεδομένων με διάφορους τρόπους (DAP,WMS, και περισσότερο στο μέλλον) .
    * Αποκτήστε την απάντηση δεδομένων σε διάφορες μορφές αρχείων. (Αυτός είναι πιθανώς ο μεγαλύτερος λόγος&#33;) 
    * Φτιάξε γραφήματα και χάρτες. (Σε όλους αρέσουν οι όμορφες φωτογραφίες.) 
    * Χτίστε άλλα χρήσιμα και ενδιαφέροντα πράγματα στην κορυφή τηςERDDAPΥπηρεσίες ιστού - δείτε το[Awesome ERDDAPΤΜ](https://github.com/IrishMarineInstitute/awesome-erddap)λίστα των φοβερόERDDAP-σχετικά έργα.

Μπορείς.[προσαρμογή](/docs/server-admin/deploy-install#customize)ισχERDDAPΈτσι φαίνεται.ERDDAP™αντανακλά την οργάνωσή σας και ταιριάζει με την υπόλοιπη ιστοσελίδα σας.

## Είναι δύσκολη η διαδικασία εγκατάστασης; Μπορώ να το κάνω;{#is-the-installation-procedure-hard-can-i-do-it} 

Η αρχική εγκατάσταση χρειάζεται λίγο χρόνο, αλλά δεν είναι πολύ δύσκολο. Μπορείς να το κάνεις. Αν κολλήσεις, στείλε μου email.erd dot data at noaa dot gov. Θα σε βοηθήσω.
Ή, μπορείτε να συμμετάσχετε στο[ERDDAP™Ομάδα Google / Λίστα αλληλογραφίας](https://groups.google.com/g/erddap)και να δημοσιεύσετε την ερώτησή σας εκεί.

## Ποιος ΧρησιμοποιείERDDAP™ {#who-uses-erddap} 

ERDDAP™έχει εγκατασταθεί από περίπου 100 οργανισμούς σε τουλάχιστον 17 χώρες

 (Αυστραλία, Βέλγιο, Καναδάς, Κίνα, Γαλλία, Ινδία, Ιρλανδία, Ιταλία, Νέα Ζηλανδία, Ρωσία, Νότια Αφρική, Ισπανία, Σρι Λάνκα, Σουηδία, Ταϊλάνδη, Ηνωμένο Βασίλειο, ΗΠΑ) , συμπεριλαμβανομένων:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Κέντρο Έρευνας Ασίας-Ειρηνικού, Διεθνές Κέντρο Ερευνών Ειρηνικού) στο Πανεπιστήμιο της Χαβάης (UH)  
*   [BCO-DMO στο WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Βιολογική και Χημική Ωκεανογραφία Γραφείο Διαχείρισης Δεδομένων στο Woods Hole Oceanographic Όργανο)  
*   [ΚανγουίνERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Καναδικό δίκτυο πληροφοριών Watershed) στο Κέντρο Επιστήμης Παρατήρησης της Γης (Διευθύνοντες Σύμβουλοι) , Πανεπιστήμιο της Μανιτόμπα
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Πρόγραμμα πληροφοριών παράκτιων δεδομένων στο UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Εθνικό Συμβούλιο Ερευνών της Ιταλίας, Ινστιτούτο Πολικών Επιστημών)  
* CSIRO και IMO (Οργανισμός Επιστημονικής και Βιομηχανικής Έρευνας της Αυστραλίας και Ολοκληρωμένο Θαλάσσιο Σύστημα Παρακολούθησης) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAΓραφείο Ανταπόκρισης και Αποκατάστασης)  
*   [Φυσική EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)  (Το Ευρωπαϊκό Δίκτυο Θαλάσσιων Παρατηρήσεων και Δεδομένων -- Φυσική)  
*   [ΓΟΜΡΙ](https://erddap.griidc.org/erddap/index.html)  (Πρωτοβουλία για την έρευνα στον Κόλπο του Μεξικού)  
*   [Ινστιτούτο Hakai](https://catalogue.hakai.org/erddap/index.html)  (Το Ινστιτούτο Hakai στην Κεντρική Ακτή της Βρετανικής Κολομβίας, Καναδάς) 
*   [Υπηρεσίες Τεχνολογίας Λυκείου](https://myhsts.org), η οποία προσφέρει κωδικοποίηση και τεχνολογική κατάρτιση για μαθητές και ενήλικες
*   [ΙΧΕΚ](https://erddap.ichec.ie/erddap/index.html)  (Ιρλανδικό Κέντρο Υπολογιστών Υψηλού Τέλους) 
*   [INCOΙΣ](https://erddap.incois.gov.in/erddap/index.html)  (Εθνικό Κέντρο Πληροφοριών της Ινδίας για τον Ωκεανό)  
* IRD (Institut de Recherche pour le Développement, Γαλλία)   
CNRS (Κέντρο National de la Recherche Scientifique, Γαλλία)   
UPMC (Πανεπιστημιούπολη Pierre et Marie CURIE, Παρίσι, Γαλλία)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Πανεπιστημιούπολη Félix HOUPHOU)   
IPSL (Ινστιτούτο Pierre Simon Laplace des sciences de l'environnement, Παρίσι, Γαλλία)   
LMI ECLAIRS (στα Αγγλικά) (Laboratoire Mixte Διεθνές «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques» (στα αγγλικά).) 
* ΚΚΕρ (Ευρωπαϊκή Επιτροπή - Κοινό Κέντρο Ερευνών, Ευρωπαϊκή Ένωση) 
*   [Το Ινστιτούτο Πεζοναυτών](https://erddap.marine.ie/erddap/index.html)  (Ιρλανδία)  
* Θαλάσσια Όργανα Α.Ε. (Ισπανία) 
* ΝΚΜ (Εθνική Υπολογιστική Υποδομή της Αυστραλίας) 
*   [NOAAΑκτοφυλακή](https://coastwatch.noaa.gov/erddap/index.html)  (κεντρική)  
*   [NOAAΑκτοφυλακή CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Καραϊβική/Κόμβος του Μεξικού)  
*   [NOAAΑκτοφυλακή GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Κόμβος των Μεγάλων Λιμνών)  
*   [NOAACoastWatch Δυτική Ακτή](https://coastwatch.pfeg.noaa.gov/erddap/index.html)με την οποία συνυπάρχει και συνεργάζεται με
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Τμήμα Περιβαλλοντικής ΈρευναςSWFSCτουNMFS) 
*   [NOAAΑισθητήρες IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Ολοκληρωμένο σύστημα παρατήρησης του ωκεανού)  
*   [NOAAΙΩΣ ΓΕNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Κεντρικό και Βόρειο Καλιφόρνια Ocean Observing System, που διοικείται από την Axiom Data Science)  
*   [NOAAIOOS GCOOS Ατμοσφαιρικά και Ωκεανογραφικά Δεδομένα: Σύστημα παρατήρησης](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Ατμοσφαιρικά και Ωκεανογραφικά Στοιχεία: Ιστορικές συλλογές](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Βιολογική και κοινωνικοοικονομική](https://gcoos4.tamu.edu/erddap/index.html)  (Σύστημα παρατήρησης ακτής του Κόλπου) 
*   [NOAAΙΩ ΝΕΡΑΚΟΣ](http://www.neracoos.org/erddap/index.html)  (Βορειοανατολική Περιφερειακή Ένωση Παράκτιων και Ωκεανικών Συστημάτων Παρατήρησης)  
*   [NOAAΙΟΟΣ NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Εθνικό Glider Κέντρο Συνελεύσεων Δεδομένων)  
*   NOAAΙΟΙ ΝΑΝΟΥ (Βορειοδυτική Ένωση Δικτύων Συστημάτων Παρατήρησης Ωκεανού) 
*   [NOAAΙΩΣ ΠΑΚΙΟΥ](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Ειρηνικός Νήσοι Ωκεανός σύστημα παρατήρησης) στο Πανεπιστήμιο της Χαβάης (UH)  
*   NOAAΧΩΡΕΣ (Σύστημα παρατήρησης παράκτιου ωκεανού της Νότιας Καλιφόρνιας) 
*   [NOAAΙΩΣ ΣΕΚΟΥΡΑ](https://erddap.secoora.org/erddap/index.html)  (Νοτιοανατολικός Παράκτιος Ωκεανός Παρατηρώντας την Περιφερειακή Ένωση)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Εθνικά Κέντρα Περιβαλλοντικής Ενημέρωσης)    
*   NOAASTP NGDC (Εθνικό Γεωφυσικό Data Center, Solar -- Χερσαία Φυσική) 
*   NOAA NMFSΝΕΦΣΚ (Κέντρο Επιστημών Αλιείας Βορειοανατολικής) 
*   [NOAAΣΥΛΛΟΓΕΣ](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Κέντρο Επιχειρησιακών Ωκεανογραφικών Προϊόντων και Υπηρεσιών)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Παρατηρώντας το Κέντρο Παρακολούθησης Συστήματος)  
*   [NOAAΠΙΦΣΚ](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Επιστημονικό Κέντρο Αλιείας Νήσων Ειρηνικού)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAΠολική Παρακολούθηση](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Ενοποιημένο πλαίσιο πρόσβασης)  
*   [Ωκεάνια Δίκτυα Καναδάς](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Δίκτυο εντοπισμού ωκεανού](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Όλα τα δεδομένα](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Πρωτοβουλία Παρατηρητηρίων Ωκεανού)   
OOI / Μη προσαρμοσμένα δεδομένα
* Princeton, Ομάδα Ερευνών Υδρομετεωρολογίας
* R.Tech Engineering, Γαλλία
*   [Πανεπιστήμιο Rutgers, Τμήμα Θαλάσσιων και Παράκτιων Επιστημών](https://tds.marine.rutgers.edu/erddap/index.html)  
* Ινστιτούτο Εκβολών του Σαν Φρανσίσκο
*   [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Έξυπνος Ατλαντικός](https://www.smartatlantic.ca/erddap/index.html)Αναμνηστικό Πανεπιστήμιο της Νέας Γης
* Δίκτυο Περιβαλλοντικής Παρατήρησης της Νότιας Αφρικής
* Τεχνολογίες Spyglass
* Πανεπιστήμιο Στάνφορντ, Ναυτικός Σταθμός Χόπκινς
*   [ΙΟΔΕ της UNESCO](https://erddap.oa.iode.org/erddap/index.html)  (Διεθνής Ωκεανογραφική και Ενημέρωση Ανταλλαγή δεδομένων)  
*   [Πανεπιστήμιο της Βρετανικής Κολομβίας, Γη, Ωκεανός & Ατμοσφαιρική Τμήμα Επιστημών](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Πανεπιστήμιο της Καλιφόρνια στο Davis, Θαλάσσιο εργαστήριο Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Πανεπιστήμιο του Ντέλαγουερ, δορυφορικός σταθμός λήψης](https://basin.ceoe.udel.edu/erddap/index.html) 
* Πανεπιστήμιο της Ουάσινγκτον, Εργαστήριο Εφαρμοσμένης Φυσικής
*   [ΣΥΑΑΑ](https://geoport.usgs.esipfed.org/erddap/index.html)  (Πρόγραμμα παράκτιας και θαλάσσιας γεωλογίας)  
*   [ΦΩΤΟΓΡΑΦΙΕΣ](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Φωνή του Ωκεανού, Σουηδία)  

Αυτή είναι μια λίστα με μόνο μερικές από τις οργανώσεις όπουERDDAP™έχει εγκατασταθεί από κάποιο άτομο ή κάποια ομάδα. Δεν υπονοεί ότι το άτομο, η ομάδα, ή η οργάνωση συνιστά ή υποστηρίζειERDDAP.

### ERDDAP™συνιστάται εντόςNOAAκαι CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAΔιαδικαστική οδηγία για την πρόσβαση στα δεδομένα](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)περιλαμβάνειERDDAP™στον κατάλογο των συνιστώμενων εξυπηρετητών δεδομένων για χρήση από ομάδες εντόςNOAA.ERDDAP™αναφέρεται ευνοϊκά στο σημείο 4.2.3 του
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Διαχείριση δεδομένων έρευνας Οδηγός Βέλτιστων Πρακτικών) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) του Κέντρου National de la Recherche Scientifique (CNRS) στη Γαλλία.

## Εμφάνιση σλάιντ{#slide-shows} 

Εδώ είναι μερικά PowerPoint slide δείχνει και τα έγγραφα που έχει δημιουργήσει Bob Simons που σχετίζονται μεERDDAP.

 **Συζητήσεις του Ευρωπαϊκού ΚοινοβουλίουNational Oceanic and Atmospheric Administration.** 

Τα τέσσερα κύρια έγγραφα:

*   [Κύρια εισαγωγήERDDAP™  (έκδοση 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Μπορείτε επίσης να[Δείτε αυτό το βίντεο του Μπομπ να μιλάει![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Περιγραφή μιας σελίδαςERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Βαριά φορτία, πλέγματα, συστάδες, ομοσπονδίες, και υπολογιστικό σύννεφο](/docs/server-admin/scaling)
*   [Κατευθυντήριες γραμμές του Bob για τα συστήματα διανομής δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Άλλες παρουσιάσεις:

*   [2020 EDM: Νέα χαρακτηριστικάERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Λήψη δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Ή[Δείτε αυτό το βίντεο του Μπομπ να μιλάει](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Νέα χαρακτηριστικά στοERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Καλοκαίρι ESIP: Subsetting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Καλοκαίρι ESIP: Υποστήριξη JSONERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Διανεμημένο Σύστημα Υπηρεσιών Ιστού (Πιο γρήγορα, πιο εύκολα, λιγότερο ακριβά)   (Ή γιατί ήμουν ευτυχισμένη πριν 4 χρόνια.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [EDM 2018:ERDDAP™το 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Νέα χαρακτηριστικά στοERDDAP™για τα δεδομένα εικόνας, ήχου και βίντεο](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF καιERDDAP™Λύσεις για την ενσωμάτωση δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Μια γρήγορη εισαγωγή στοERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM και 2017 IOOS: Νέα ή ελάχιστα γνωστάERDDAP™Χαρακτηριστικά (για χρήστες) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM και 2017 IOOS: Νέα ή ελάχιστα γνωστάERDDAP™Χαρακτηριστικά (για τους διαχειριστές) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB καιERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 Εντάξει. Πώς μεταφέρονται τα δεδομένα από την πηγή στον τελικό χρήστη; Παλιά Σχολή εναντίον Νέας Σχολής](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Καλοκαίρι ΕΣΙΡ: Η μεγάλη εικόνα: ΠΑΡR,OPeNDAP,ERDDAP™, και Διανομή δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: Ένα και έγινε](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Επόμενη γενιά Εξυπηρετητές δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Καλοκαίρι ESIP: Πίνακας Συγκέντρωση](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's και Don't για Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Η ιδανική διεπαφή χρήστη](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Καλοκαίρι ESIP: Δεδομένα πίνακα](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Μην αντιμετωπίζετε In-Situ και Tabular δεδομένα όπως Gridded δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Κάντε περισσότερα με λιγότερα](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Κατευθυντήριες γραμμές για τα συστήματα διανομής δεδομένων](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Παρουσιάσεις από άλλους ανθρώπους:

*   [Ένα FAIR βασισμένο εργαλείο για τη βελτίωση της ανταλλαγής παγκόσμιων δεδομένων![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
του Kevin O'Brien στο Παγκόσμιο Σύστημα Παρατήρησης του Ωκεανού (ΓΟΥΑ) Ομάδα συντονισμού Webinar/Παρατήρησης (ΟΣΓ) Σειρά / 1, 12 Νοεμβρίου 2020.
*   [Χτίστε τη δική σας εφαρμογή καιρούNOAAΑνοικτά σημειωματάρια δεδομένων και Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
από τους Filipe Fernandes και Rich Signell στο SciPy 2018, 13 Ιουλίου 2018.
*   [Χρήση του OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
από τον Rich Signell, Φεβρουάριος 2018.
*   [ΕΣΙΡ Τεχνική κατάδυση: "ERDDAPΑστραπιαία ομιλία"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Οκτώ 5-λεπτές συζητήσεις για ενδιαφέροντα πράγματα που κάνουν οι άνθρωποι μεERDDAPαπό τους Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton και Eli Hunter που παρουσιάστηκαν ως ESIP Tech Dive στις 31 Αυγούστου 2017.
*   [ΧρήσηERDDAP™σε δεδομένα πίνακα πρόσβασης![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
από τον Rich Signell, Αύγουστος 2015.
*   [Δοκιμή χρήσηςERDDAP™για μπλε δεδομένα άνθρακα![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
από τον Rich Signell, Αύγουστος 2015.
*   [Χρήση δεδομένων απόERDDAP™μέσαNOAAΣGNOMEΛογισμικό![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Σε αυτό το βίντεο, ο Rich Signell κατεβάζει τα δεδομένα πρόβλεψης ωκεανών ρευμάτων απόERDDAP™για να διαμορφώσει μια τοξική διαρροή στον ωκεανό χρησιμοποιώντας[NOAAΣGNOMEλογισμικό](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (Σε 5 λεπτά&#33;) . (Ένα μικρό λάθος στο βίντεο: όταν ψάχνετε για σύνολα δεδομένων, μην χρησιμοποιείτε ΚΑΙ μεταξύ των όρων αναζήτησης. Είναι υπονοούμενο.) Από τον Rich Signell, 8 Απριλίου 2011.
