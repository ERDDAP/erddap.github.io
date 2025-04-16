---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™şi Norul

## Ce este Norul

Cea mai simplă definiție nu este serverele locale. Acest lucru este foarte larg și poate însemna multe configurații diferite. De exemplu, ar putea fi un server fizic dedicat într-un centru de date, un server virtual privat, un server comun, fără servere, sau altceva.

### De ce Cloud

Există multe motive pentru care organizaţiile vor să se mute în nor. Cea mai importantă este flexibilitatea pe care o oferă pentru nevoile de calcul/de stocare în comparație cu achiziționarea hardware-ului fizic.

Acest lucru elimină necesitatea de a menține o cameră de datecenter/server. De asemenea, permite scalarea resurselor de calcul la nevoile curente. La fel ca norul poate însemna multe lucruri diferite, fiind capabil de a scala resursele de asemenea. Ar putea însemna să plăteşti mai mult. (sau mai puțin) resurse fără servere. Aceasta ar putea însemna trecerea de la un server comun la un server privat. Ar putea însemna modernizarea la un server fizic mai mare dedicat.

## CanERDDAP™Fugi în nor?

Da.

ERDDAP™este proiectat pentru a rula în Tomcat, care poate fi rulat local sau în medii cloud. Există sprijin comunitar pentru rularea în Docker și există[oficial Suport Docker vine în curând](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Acestea fiind spuse,ERDDAP™a fost proiectat într-un moment în care serverele dedicate erau norma. Nu este fără server, și ar fi extrem de dificil dacă nu imposibil de a face fără server.

### CanERDDAP™Scală?

ScalareERDDAP™este mai complicat decât utilizarea mai multor resurse fără servere. Avem nişte documente grozave despre[cum să scarămERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Facilitarea scaleiERDDAP™Este ceva ce ne interesează.

### Ce previne autoscalarea?

ERDDAP™face multe lucruri, inclusiv păstrarea seturilor de date la zi, notificarea abonaților de modificări ale seturilor de date, caching date, manipularea cererilor utilizatorilor, și mai mult. Pentru un nivel suficient de mareERDDAP™server ca[CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Asta înseamnă că face mereu ceva. Utilizarea continuă este de fapt o situație extrem de costisitoare pentru opțiunile fără servere (platiti o prima mare pentru calcul atunci cand faceti fara server si astfel avantajul principal este atunci cand faceti doar ocazional apeluri) . În plus, încercarea de a muta toateERDDAP™

### CanERDDAP™utilizaţi Cloud Storage?

Da.

ERDDAP™suportă depozitarea norului (inclusiv AWS S3) şi îmbunătăţirea acestui sprijin (de exemplu, S3 care nu sunt SWS) este o prioritate majoră pentruERDDAP™foaia de parcurs privind dezvoltarea.ERDDAP™este, de asemenea, capabil de a extrage date de la numeroase servicii online existente. Pentru mai multe informații Vă recomandăm căutarea prin intermediul nostru[Documentație tip set de date](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
