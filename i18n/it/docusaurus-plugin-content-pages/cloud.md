---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™e il cloud

## Che cosa è il Cloud

La definizione più semplice non è server locali. Questo è molto ampio e può significare molte configurazioni diverse. Ad esempio, potrebbe essere un server fisico dedicato in un data center, un Virtual Private Server, un server condiviso, senza server o qualcos'altro.

### Perché Cloud

Ci sono molti motivi per cui le organizzazioni vogliono trasferirsi nel cloud. La più importante è la flessibilità che fornisce per le esigenze di calcolo / archiviazione rispetto all'acquisto di hardware fisico.

Questo elimina la necessità di mantenere una stanza datacenter/server. Consente anche di scalare le risorse di calcolo alle vostre esigenze attuali. Molto simile al cloud può significare molte cose diverse, essere in grado di scalare le risorse fa pure. Potrebbe significare pagare di più (o meno) risorse senza server. Potrebbe significare passare da un server condiviso a un server privato. Potrebbe significare l'aggiornamento a un server fisico dedicato più grande.

## CanERDDAP™correre nel cloud?

Si'.

ERDDAP™è progettato per funzionare all'interno di Tomcat che può essere eseguito localmente o in ambienti cloud. C'è un sostegno comunitario per correre a Docker e c'è[ufficiale Supporto Docker in arrivo](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Detto questo,ERDDAP™è stato progettato in un momento in cui i server dedicati erano la norma. Non è serverless, e sarebbe estremamente difficile se non impossibile renderlo serverless.

### CanERDDAP™scala?

ScalaERDDAP™è più complicato di usare più risorse senza server. Abbiamo una grande documentazione su[come scalareERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Rendere più facile scalareERDDAP™è qualcosa che ci interessa.

### Cosa impedisce l'autoscaling?

ERDDAP™sta facendo molte cose, tra cui la conservazione di datasets fino ad oggi, notificante abbonati di modifiche a datasets, dati di cache, la gestione delle richieste degli utenti, e altro ancora. Per un numero sufficientemente elevatoERDDAP™server come[Costa](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Questo significa che sta continuamente facendo qualcosa. L'uso continuo è in realtà una situazione estremamente costosa per le opzioni serverless (paghi un grande premio per calcolare quando fai serverless e quindi il vantaggio principale è quando fai solo occasionalmente chiamate) . Inoltre, cercando di spostare tuttiERDDAP™’ varie funzionalità alle versioni serverless finirebbero con una configurazione significativamente più complicata necessaria per gli amministratori.

### CanERDDAP™utilizzare Cloud Storage?

Si'.

ERDDAP™supporta il cloud storage (incluso AWS S3) e migliorare il sostegno (per esempio non AWS S3) è una priorità elevataERDDAP™sviluppo roadmap.ERDDAP™è anche in grado di tirare i dati da molti servizi online esistenti. Per ulteriori informazioni vi consiglio di guardare attraverso il nostro[documentazione tipo dataset](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
