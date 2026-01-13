---
sidebar_position: 2
---
# Actualizează
Cum se face o actualizare a unei existenţe ERDDAP™ pe serverul dumneavoastră

## Modificări{#changes} 
1. Face modificările enumerate în [Modificări](/changes) în secțiunea intitulată "Lucruri ERDDAP™ Administratorii trebuie să știe și să facă "pentru toate ERDDAP™ versiuni de la versiunea pe care o foloseai.
     
##  Java  {#java} 
2. Dacă sunteți actualizarea de la ERDDAP™ versiunea 2.18 sau mai jos, trebuie să comutați la Java 25 (sau mai nou) şi Tomcat 10. A se vedea regulat ERDDAP™ instrucțiuni de instalare pentru [ Java ](/docs/server-admin/deploy-install#java) şi [Tomcat](/docs/server-admin/deploy-install#tomcat) . Va trebui, de asemenea, să copiezi _tomcat_/content/erddap director de la vechea ta instalare Tomcat la noua ta instalare Tomcat.

## Descărcare{#download} 
3. Descărcare [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) în _tomcat_/webapps.
     (Versiunea 2.29.0, 706,788,135 octeți, MD5=A5ED0DC8D46CA27640FFEB8CE4A8560, datată 12-15-2025) 
     
## message.xml{#messagesxml} 
4. 
    * Frecvente: Dacă sunteți actualizarea de la ERDDAP™ versiunea 1.46 (sau mai sus) și utilizați doar mesajele standard, noile mesaje standard.xml vor fi instalate automat (printre fișierele .class prin erddap. război) .
         
    * Rare: Dacă sunteți actualizarea de la ERDDAP™ versiunea 1.44 (sau mai jos) ,
TREBUIE să ștergeți fișierul vechi.xml:
         _tomcat_/content/erddap /mesaje.xml.
Noile mesaje standard.xml vor fi instalate automat (printre fișierele .class prin erddap. război) .
         
    * Rare: Dacă faceți întotdeauna modificări la fișierul standard de mesaje.xml (în loc) ,
aveți nevoie pentru a face aceste modificări la noul fișier mesaje.xml (care este
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).
         
    * Rare: Dacă mențineți un fișier de mesaje personalizate.xml în _tomcat_/content/erddap /,
Trebuie să-ţi dai seama (prin diff) ce modificări au fost făcute la mesajele implicite.xml (care sunt în noul erdap. război ca
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) și modificați fișierul dvs. personalizat.xml în consecință.
         
## Instalează{#install} 
5. Instalați noul ERDDAP™ în Tomcat:
\\* Nu folosi Tomcat Manager. Mai devreme sau mai târziu vor exista probleme de memorie PermGen. E mai bine să-l oprim pe Tomcat.
\\* Înlocuiește referințele la _tomcat_ de mai jos cu directorul Tomcat real de pe computer.
     
### Linux și Macs{#linux-and-macs} 
1. Oprire Tomcat: De la o linie de comandă, utilizați: _tomcat_/bin/shutdown.sh
Și de a folosi ps -ef | Grep tomcat pentru a vedea dacă / atunci când procesul a fost oprit. (Poate dura un minut sau două.) 
2. Elimină decomprimatul ERDDAP™ instalare: În _tomcat_/webapps, utilizați
rm -rf erddap
3. Şterge-l pe bătrânul Erddap. fișier război: În _tomcat_/webapps, utilizați rm erddap. război
4. Copiază noul Erddap. fișier de război de la directorul temporar la _tomcat_/webapps
5. Reporniţi Tomcat şi ERDDAP : utilizați _tomcat_/bin/startup.sh
6. Vizualizare ERDDAP™ în browser pentru a verifica dacă repornirea a reușit.
     (De multe ori, trebuie să încercați de câteva ori și așteptați un minut înainte de a vedea ERDDAP™ .)   
             
### Ferestre{#windows} 
1. Oprire Tomcat: De la o linie de comandă, utilizați: _tomcat_\\bin\\\ shutdown.bat 
2. Elimină decomprimatul ERDDAP™ instalare: În _tomcat_/webapps, utilizați
del/S/Q erddap
3. Şterge-l pe bătrânul Erddap. fișier de război: În _tomcat_\\Webapps, utilizați del erddap. război
4. Copiază noul Erddap. fișier de război de la directorul temporar la _tomcat_\\webapps
5. Reporniţi Tomcat şi ERDDAP : utilizați _tomcat_\\bin\\startup.bat
6. Vizualizare ERDDAP™ în browser pentru a verifica dacă repornirea a reușit.
     (De multe ori, trebuie să încercați de câteva ori și așteptați un minut înainte de a vedea ERDDAP™ .) 

Probleme la actualizare ERDDAP ? A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
