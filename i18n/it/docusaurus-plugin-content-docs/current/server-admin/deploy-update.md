---
sidebar_position: 2
---
# Aggiornamento
Come fare un aggiornamento di un esistente ERDDAP™ sul server

## Cambiamenti{#changes} 
1. Fare le modifiche elencate in [Cambiamenti](/changes) nella sezione intitolata "Pensi ERDDAP™ Gli amministratori devono sapere e fare" per tutti ERDDAP™ versioni dalla versione che stavi usando.
     
##  Java  {#java} 
2. Se si sta aggiornando da ERDDAP™ versione 2.18 o sotto, è necessario passare a Java 21 (o nuovo) e il relativo Tomcat 10. Vedere il regolare ERDDAP™ istruzioni per l'installazione [ Java ](/docs/server-admin/deploy-install#java) e [Tomcat](/docs/server-admin/deploy-install#tomcat) . Dovrai anche copiare il tuo _tomcat_/content/erddap directory dalla tua vecchia installazione Tomcat alla tua nuova installazione Tomcat.

## Scarica{#download} 
3. Scarica [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) in _tomcat_/webapps .
     (versione 2.28.1, 622,676,238 byte, MD5=48b4226045f950c8a8d69ef9521b9bc9, datata 09-05-2025) 
     
## messaggi.xml{#messagesxml} 
4. 
    * Comune: Se si sta aggiornando da ERDDAP™ versione 1.46 (o sopra) e basta usare i messaggi standard, il nuovo standard message.xml verrà installato automaticamente (tra i file .class via erddap. guerra) .
         
    * Rare: Se si sta aggiornando da ERDDAP™ versione 1.44 (o sotto) ♪
È necessario eliminare il vecchio file message.xml:
         _tomcat_/content/erddap /messages.xml .
I nuovi messaggi standard.xml verranno installati automaticamente (tra i file .class via erddap. guerra) .
         
    * Rare: Se si apportano sempre modifiche al file standard (in luogo) ♪
è necessario apportare tali modifiche al nuovo file message.xml (che è
WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml dopo erddap.war è decompresso da Tomcat.
         
    * Rare: Se si mantiene un file di messaggi personalizzati.xml in _tomcat_/content/erddap /
tu devi capire (Via diff) quali modifiche sono state apportate ai messaggi di default.xml (che sono nel nuovo erddap. la guerra
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) e modifica il tuo file xml personalizzato.
         
## Installazione{#install} 
5. Installare il nuovo ERDDAP™ in Tomcat:
* Non usare Tomcat Manager. Prima o poi ci saranno problemi di memoria di PermGen. E 'meglio chiudere e avviare Tomcat.
\\* Sostituisci i riferimenti a _tomcat_ di seguito con l'attuale directory Tomcat sul tuo computer.
     
### Linux e Mac{#linux-and-macs} 
1. Stopdown Tomcat: Da una riga di comando, utilizzare: _tomcat_/bin/shutdown.sh
E usare ps -ef | tomcat grep per vedere se / quando il processo è stato interrotto. (Potrebbe volerci un minuto o due.) 
2. Rimuovere i decompressi ERDDAP™ installazione: In _tomcat_/webapps, utilizzare
rm -rf erddap
3. Elimina il vecchio erddap. file di guerra: In _tomcat_/webapps, utilizzare rm erddap. guerra
4. Ricevuto. file di guerra dalla directory temporanea a _tomcat_/webapps
5. Riavvia Tomcat e ERDDAP : uso _tomcat_/bin/startup.sh
6. Vista ERDDAP™ nel tuo browser per verificare che il riavvio è riuscito.
     (Spesso, devi provare alcune volte e aspettare un minuto prima di vedere ERDDAP™ .)   
             
### Windows{#windows} 
1. Stopdown Tomcat: Da una riga di comando, usare: _tomcat_\\bin\\\ shutdown.bat 
2. Rimuovere i decompressi ERDDAP™ installazione: In _tomcat_/webapps, utilizzare
del /S/Q erddap
3. Elimina il vecchio erddap. file di guerra: In _tomcat_\\webapps, utilizzare il erddap. guerra
4. Ricevuto. file di guerra dalla directory temporanea a _tomcat_\\webapps
5. Riavvia Tomcat e ERDDAP : uso _tomcat_\\bin\\startup.bat
6. Vista ERDDAP™ nel tuo browser per verificare che il riavvio è riuscito.
     (Spesso, devi provare alcune volte e aspettare un minuto prima di vedere ERDDAP™ .) 

Aggiornamento dei problemi ERDDAP ? Guarda la nostra [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
