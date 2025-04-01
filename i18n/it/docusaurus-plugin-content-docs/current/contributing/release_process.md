---
sidebar_position: 3
---
# ERDDAP™Processo di rilascio
* Assicurarsi che i file di confronto immagine siano disponibili (questo potrebbe significare eseguire `mvn verificare`, se si desidera accelerare che fino limitarsi a solo il gruppo ImageComparison, anche se nota che richiede ancora l'esecuzione di test Jetty) 
* Dipendenze di aggiornamento
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Aggiornare i plugin
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Eseguire test per assicurarsi che gli aggiornamenti di dipendenza non hanno rotto nulla per tutte le principali configurazioni (parsing in particolare, anche se altre impostazioni significative) 
```
mvn verify
```
* Utilizzare TranslateMessages.translate () per aggiornare le traduzioni se necessario
* EDStatic.java set development Modalità a falso, modificare il numero di versione e specificare la data di rilascio.
* Fai la costruzione
```
mvn clean
mvn compile
mvn package
```
## Canari
Invia il file di guerra per la distribuzione sul server Coastwatch o qualche altro server che utilizza la maggior parte dei tipi di dataset e riceve un sacco di traffico.
Vogliamo cercare di trovare errori prima di una più ampia distribuzione della costruzione.

Includi il messaggio quando si parla di una nuova release.

La procedura standard è:
* Carica il file .war a coastwatch\\[tomcat\\]/ contenuto/erddap/
* Come utente=tomcat:
  * In\\[tomcat\\]:
./shutdown.sh //use "ps -fu tomcat" per assicurarsi che si sia fermato
  * In\\[tomcat\\]/webapps/ :
rm -rf erddap
Erddap. guerra
C ../content/erddap/erddap2.22.war erddap.war //o qualunque sia il numero
  * In\\[tomcat\\]:
./startup.sh
  * DopoERDDAPha reso una pagina web, in\\[tomcat\\]/webapps/ :
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## Comunicato GitHub
Progetto del rilascio di GitHub, includere erddap.war e erddapContent.zip  (nessun numero di versione) 

title: The official v2.25 version
descrivere: Vedere l'elenco delle modifiche
       https://erddap.github.io/changes#version-225
 

## Aggiornamento della documentazione
* Aggiornare il numero di versione nel file docusaurus.config.ts (nella sezione del piè di pagina) .
* Modificare le pagine della documentazione (deploy-install.md e deploy-update.md) .
  * Ricerca per\\[erddap.war\\] 
  * Copia le informazioni esistenti (leggermente riformattato) all'elenco delle installazioni precedenti 2.
  * Modificare le informazioni di rilascio attuali per erddap. guerra\\[erddap.war\\]
* Eseguire le traduzioni per il sito di documentazione.
* Fai una richiesta pull e unisci i cambiamenti.
* Distribuire il sito di documentazione (vedi leggere) .

## Assicurarsi che altri repos sono aggiornati secondo le necessità
Principalmente questo significa ErddapContent e ErddapTest, ma dovrebbero essere tenuti aggiornati durante i cambiamenti di sviluppo.

## Informare gli utenti
Prima avvisare gli utenti che hanno richiesto modifiche (o i cui bug sono stati fissi) . Date loro il tempo per verificare le modifiche e/o sollevare problemi.

ERDDAPversione 2.25 è ora disponibile&#33;

Si può leggere sui cambiamenti a
 https://erddap.github.io/changes#version-225
 

Alcuni dei cambiamenti sono i cambiamenti che hai suggerito. Grazie mille per i vostri suggerimenti. Cerca il tuo nome nell'elenco delle modifiche per vedere i dettagli. Sarebbe fantastico se si potesse provare le nuove funzionalità presto, prima di annunciare questa nuova versione a un pubblico più ampio.

Se sei unERDDAPamministratore, le istruzioni per l'aggiornamento sono a
 https://erddap.github.io/docs/server-admin/deploy-update
 

Se avete problemi, domande, suggerimenti, si prega di e-mail me.

Grazie per l'utilizzoERDDAP.

### Comunicato stampa
Invia un annuncio alla mailing list Annunci.
