---
sidebar_position: 2
---
# Actualizează
Cum se face o actualizare a unei existenţeERDDAP™pe serverul dumneavoastră

## Modificări{#changes} 
1. Face modificările enumerate în[Modificări](/changes)în secțiunea intitulată "LucruriERDDAP™Administratorii trebuie să știe și să facă "pentru toateERDDAP™versiuni de la versiunea pe care o foloseai.
     
## Java {#java} 
2. Dacă sunteți actualizarea de laERDDAP™versiunea 2.18 sau mai jos, trebuie să comutați laJava21 (sau mai nou) şi Tomcat 10. A se vedea regulatERDDAP™instrucțiuni de instalare pentru[Java](/docs/server-admin/deploy-install#java)şi[Tomcat](/docs/server-admin/deploy-install#tomcat). Va trebui, de asemenea, să copiezi_tomcat_/content/erddapdirector de la vechea ta instalare Tomcat la noua ta instalare Tomcat.

## Descărcare{#download} 
3. Descărcare[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)în _tomcat_/webapps.
     (Versiunea 2.26, 607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, datată 03-31-2025) 
     
## message.xml{#messagesxml} 
4. 
    * Frecvente: Dacă sunteți actualizarea de laERDDAP™versiunea 1.46 (sau mai sus) și utilizați doar mesajele standard, noile mesaje standard.xml vor fi instalate automat (printre fișierele .class prin erddap. război) .
         
    * Rare: Dacă sunteți actualizarea de laERDDAP™versiunea 1.44 (sau mai jos) ,
TREBUIE să ștergeți fișierul vechi.xml:
        _tomcat_/content/erddap/mesaje.xml.
Noile mesaje standard.xml vor fi instalate automat (printre fișierele .class prin erddap. război) .
         
    * Rare: Dacă faceți întotdeauna modificări la fișierul standard de mesaje.xml (în loc) ,
aveți nevoie pentru a face aceste modificări la noul fișier mesaje.xml (care este
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).
         
    * Rare: Dacă mențineți un fișier de mesaje personalizate.xml în_tomcat_/content/erddap/,
Trebuie să-ţi dai seama (prin diff) ce modificări au fost făcute la mesajele implicite.xml (care sunt în noul erdap. război ca
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) și modificați fișierul dvs. personalizat.xml în consecință.
         
## Instalează{#install} 
5. Instalați noulERDDAP™în Tomcat:
\\* Nu folosi Tomcat Manager. Mai devreme sau mai târziu vor exista probleme de memorie PermGen. E mai bine să-l oprim pe Tomcat.
\\* Înlocuiește referințele la _tomcat_ de mai jos cu directorul Tomcat real de pe computer.
     
### Linux și Macs{#linux-and-macs} 
1. Oprire Tomcat: De la o linie de comandă, utilizați: _tomcat_/bin/shutdown.sh
Și de a folosi ps -ef|Grep tomcat pentru a vedea dacă / atunci când procesul a fost oprit. (Poate dura un minut sau două.) 
2. Elimină decomprimatulERDDAP™instalare: În _tomcat_/webapps, utilizați
rm -rf erddap
3. Şterge-l pe bătrânul Erddap. fișier război: În _tomcat_/webapps, utilizați rm erddap. război
4. Copiază noul Erddap. fișier de război de la directorul temporar la _tomcat_/webapps
5. Reporniţi Tomcat şiERDDAP: utilizați _tomcat_/bin/startup.sh
6. VizualizareERDDAP™în browser pentru a verifica dacă repornirea a reușit.
     (De multe ori, trebuie să încercați de câteva ori și așteptați un minut înainte de a vedeaERDDAP™.)   
             
### Ferestre{#windows} 
1. Oprire Tomcat: De la o linie de comandă, utilizați: _tomcat_\\bin\\\shutdown.bat
2. Elimină decomprimatulERDDAP™instalare: În _tomcat_/webapps, utilizați
del/S/Q erddap
3. Şterge-l pe bătrânul Erddap. fișier de război: În _tomcat_\\Webapps, utilizați del erddap. război
4. Copiază noul Erddap. fișier de război de la directorul temporar la _tomcat_\\webapps
5. Reporniţi Tomcat şiERDDAP: utilizați _tomcat_\\bin\\startup.bat
6. VizualizareERDDAP™în browser pentru a verifica dacă repornirea a reușit.
     (De multe ori, trebuie să încercați de câteva ori și așteptați un minut înainte de a vedeaERDDAP™.) 

Probleme la actualizareERDDAP? A se vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
