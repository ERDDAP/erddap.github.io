---
sidebar_position: 3
---
#  ERDDAP™ Procesul de eliberare
* Asigurați-vă că fișierele de comparație a imaginii sunt disponibile (Acest lucru ar putea însemna funcționare `mvn verifica` , dacă doriți să accelereze această restricție la doar grupul ImageComparison, deși rețineți că încă necesită efectuarea de teste Jetty) 
* Actualizează dependențele
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Module de actualizare
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Rulați teste pentru a vă asigura că actualizările dependenței nu au rupt nimic pentru toate configurațiile majore (Seturile de date parsing în special, deși orice alte setări semnificative, precum și) . Rețineți că suita de testare externă poate fi foarte fulg. Apartamentul de testare lentAWS poate dura foarte mult timp.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Folosește TranslateMessages.translate () actualizarea traducerilor, dacă este necesar
* EDStatic.java a stabilit dezvoltarea Mod pentru fals, modificați numărul versiunii și specificați data eliberării.
* Construieşte
```
mvn clean
mvn compile
mvn package
```
## Canary
Trimiteți fișierul de război pentru distribuție pe serverul Coastwatch sau pe un alt server care utilizează majoritatea tipurilor de seturi de date și primește o mulțime de trafic.
Vrem să încercăm să găsim erori înainte de o distribuție mai largă a clădirii.

Include mesajul atunci când spune despre o nouă versiune.

Procedura standard este:
* Încărcaţi fişierul .war pe Coastwatch \\[ Tomcat \\] /content/erddap/
* Ca utilizator=tomcat:
  * În \\[ Tomcat \\] /bin/ :
./shutdown.sh /foloseste "ps-fu tomcat" pentru a se asigura că a oprit
  * În \\[ Tomcat \\] /webapps/:
rm -rf erddap
Rm erddap. război
cp ../content/erddap/erddap2.22.war erddap.war.
  * În \\[ Tomcat \\] /bin/ :
./startup.sh
  * După ERDDAP a returnat o pagină web, în \\[ Tomcat \\] /webapps/:
chgrp-R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## Eliberare GitHub
Proiectul de lansare GitHub, include erddap.war și erddapContent .zip   (fără numere de versiune) 

title: The official v2.25 version
descrie: Vezi lista de modificări la
      https://erddap.github.io/changes#version-225

## Actualizare documentație
* Actualizează numărul versiunii în fișierul docusaurus.config.ts (în secțiunea subsol) .
* Editează paginile de documentare (implementarea-instalare.md și implementarea update.md) .
  * Caută \\[ erddap.war \\]  
  * Copiază informațiile existente (ușor reformat) la lista instalațiilor anterioare 2.
  * Schimbă informațiile de eliberare curentă pentru Erddap. război la \\[ erddap.war \\] 
* Rulați traducerile pentru site-ul de documentare.
* Fă o cerere şi uneşte schimbările.
* Desfășoară site-ul de documentare (vezi readme) .

## Asigură-te că alte repo sunt actualizate după cum este necesar
În principal, aceasta înseamnă ErddapContent și ErddapTest, dar acestea ar trebui să fie actualizate în timpul schimbărilor de dezvoltare.

## Anunță utilizatorii
Mai întâi notifică orice utilizator care a solicitat modificări (sau ale căror insecte au fost fixate) . Oferă-le timp pentru a verifica modificările și/sau ridica probleme.

 ERDDAP versiunea 2.25 este acum disponibilă&#33;

Puteți citi despre schimbările la
https://erddap.github.io/changes#version-225

Unele dintre schimbări sunt schimbări pe care le-ai sugerat. Vă mulţumesc foarte mult pentru sugestii. Caută numele tău în lista de modificări pentru a vedea detaliile. Ar fi minunat dacă ai putea încerca noile caracteristici în curând, înainte de a anunța această nouă versiune la un public mai larg.

Dacă sunteţi ERDDAP administrator, instrucțiunile de modernizare sunt la
https://erddap.github.io/docs/server-admin/deploy-update

Dacă aveţi probleme, întrebări, sugestii, vă rog să-mi trimiteţi un e-mail.

Vă mulțumim pentru utilizarea ERDDAP .

### Anunță eliberarea
Trimite un anunţ la lista de anunţuri.
