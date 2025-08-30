---
sidebar_position: 2
---
# Aggiornamento
Come fare un aggiornamento di un esistenteERDDAP™sul server

## Cambiamenti{#changes} 
1. Fare le modifiche elencate in[Cambiamenti](/changes)nella sezione intitolata "PensiERDDAP™Gli amministratori devono sapere e fare" per tuttiERDDAP™versioni dalla versione che stavi usando.
     
## Java {#java} 
2. Se si sta aggiornando daERDDAP™versione 2.18 o sotto, è necessario passare aJava21 (o nuovo) e il relativo Tomcat 10. Vedere il regolareERDDAP™istruzioni per l'installazione[Java](/docs/server-admin/deploy-install#java)e[Tomcat](/docs/server-admin/deploy-install#tomcat). Dovrai anche copiare il tuo_tomcat_/content/erddapdirectory dalla tua vecchia installazione Tomcat alla tua nuova installazione Tomcat.

## Scarica{#download} 
3. Scarica[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)in _tomcat_/webapps .
     (versione 2.28.0, 620,824,288 byte, MD5=f948b2ba603f65a83ac67af43da9e4c2, datata 08-29-2025) 
     
## messaggi.xml{#messagesxml} 
4. 
    * Comune: Se si sta aggiornando daERDDAP™versione 1.46 (o sopra) e basta usare i messaggi standard, il nuovo standard message.xml verrà installato automaticamente (tra i file .class via erddap. guerra) .
         
    * Rare: Se si sta aggiornando daERDDAP™versione 1.44 (o sotto) ♪
È necessario eliminare il vecchio file message.xml:
        _tomcat_/content/erddap/messages.xml .
I nuovi messaggi standard.xml verranno installati automaticamente (tra i file .class via erddap. guerra) .
         
    * Rare: Se si apportano sempre modifiche al file standard (in luogo) ♪
è necessario apportare tali modifiche al nuovo file message.xml (che è
WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml dopo erddap.war è decompresso da Tomcat.
         
    * Rare: Se si mantiene un file di messaggi personalizzati.xml in_tomcat_/content/erddap/
tu devi capire (Via diff) quali modifiche sono state apportate ai messaggi di default.xml (che sono nel nuovo erddap. la guerra
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) e modifica il tuo file xml personalizzato.
         
## Installazione{#install} 
5. Installare il nuovoERDDAP™in Tomcat:
* Non usare Tomcat Manager. Prima o poi ci saranno problemi di memoria di PermGen. E 'meglio chiudere e avviare Tomcat.
\\* Sostituisci i riferimenti a _tomcat_ di seguito con l'attuale directory Tomcat sul tuo computer.
     
### Linux e Mac{#linux-and-macs} 
1. Stopdown Tomcat: Da una riga di comando, utilizzare: _tomcat_/bin/shutdown.sh
E usare ps -ef|tomcat grep per vedere se / quando il processo è stato interrotto. (Potrebbe volerci un minuto o due.) 
2. Rimuovere i decompressiERDDAP™installazione: In _tomcat_/webapps, utilizzare
rm -rf erddap
3. Elimina il vecchio erddap. file di guerra: In _tomcat_/webapps, utilizzare rm erddap. guerra
4. Ricevuto. file di guerra dalla directory temporanea a _tomcat_/webapps
5. Riavvia Tomcat eERDDAP: uso _tomcat_/bin/startup.sh
6. VistaERDDAP™nel tuo browser per verificare che il riavvio è riuscito.
     (Spesso, devi provare alcune volte e aspettare un minuto prima di vedereERDDAP™.)   
             
### Windows{#windows} 
1. Stopdown Tomcat: Da una riga di comando, usare: _tomcat_\\bin\\\shutdown.bat
2. Rimuovere i decompressiERDDAP™installazione: In _tomcat_/webapps, utilizzare
del /S/Q erddap
3. Elimina il vecchio erddap. file di guerra: In _tomcat_\\webapps, utilizzare il erddap. guerra
4. Ricevuto. file di guerra dalla directory temporanea a _tomcat_\\webapps
5. Riavvia Tomcat eERDDAP: uso _tomcat_\\bin\\startup.bat
6. VistaERDDAP™nel tuo browser per verificare che il riavvio è riuscito.
     (Spesso, devi provare alcune volte e aspettare un minuto prima di vedereERDDAP™.) 

Aggiornamento dei problemiERDDAP? Guarda la nostra[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
