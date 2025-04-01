"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1237],{10170:(e,i,a)=>{a.r(i),a.d(i,{assets:()=>s,contentTitle:()=>t,default:()=>m,frontMatter:()=>l,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\\\\\[Questa pagina web sar\xe0 solo di interesseERDDAP\u2122amministratori che lavorano con i file EML.","source":"@site/i18n/it/docusaurus-plugin-content-docs/current/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/it/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/it/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/it/docs/server-admin/display-info"}}');var o=a(74848),r=a(28453);const l={title:"EDDTableFromEML",sidebar_position:6},t="EDDTableFromEML e EDDTableFromEMLBatch Opzioni in GenerateDatasets Xml",s={},d=[{value:"Domande",id:"questions",level:2},{value:"Design dettagli",id:"design-details",level:2},{value:"Un datoTable Diventa unoERDDAP\u2122Dataset",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML contro CF+ACDD",id:"eml-versus-cfacdd",level:3},{value:"Piccoli cambiamenti",id:"small-changes",level:3},{value:"DocBook",id:"docbook",level:3},{value:"File di dati",id:"data-files",level:3},{value:".zip&#39;d File di dati",id:"zipd-data-files",level:3},{value:"Tubo di stoccaggio",id:"storagetype",level:3},{value:"Unit\xe0",id:"units",level:3},{value:"EML versione 2.1.1",id:"eml-version-211",level:3},{value:"Problemi con i file EML",id:"issues-with-the-eml-files",level:2},{value:"Data e ora separate colonne",id:"separate-date-and-time-columns",level:3},{value:"Nome colonna incoerente",id:"inconsistent-column-names",level:3},{value:"Ordine colonna differente",id:"different-column-order",level:3},{value:"Non corretto numHeaderLines",id:"incorrect-numheaderlines",level:3},{value:"numHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"DataTime Formato Strings",id:"datetime-format-strings",level:3},{value:"DataTime But No Time Zone",id:"datetime-but-no-time-zone",level:3},{value:"Mancatomissing\\_value",id:"missing-missing_value",level:3},{value:"Piccoli problemi",id:"small-problems",level:3},{value:"Personaggi non validi Unicode",id:"invalid-unicode-characters",level:3},{value:"Diverse unit\xe0 di colonna] (#differenteColumnUnits)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"Versioni diverse di EML",id:"different-versions-of-eml",level:3},{value:"Problemi di Parsing the Data File",id:"trouble-parsing-the-data-file",level:3}];function c(e){const i={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.header,{children:(0,o.jsx)(i.h1,{id:"eddtablefromeml-e-eddtablefromemlbatch-opzioni-in-generatedatasets-xml",children:"EDDTableFromEML e EDDTableFromEMLBatch Opzioni in GenerateDatasets Xml"})}),"\n",(0,o.jsx)(i.p,{children:"\\[Questa pagina web sar\xe0 solo di interesseERDDAP\u2122amministratori che lavorano con i file EML.\r\nQuesto documento \xe8 stato originariamente creato nel 2016. \xc8 stato modificato l'ultima volta il 2020-11-30.\\]"}),"\n",(0,o.jsxs)(i.p,{children:[(0,o.jsxs)(i.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:[" ",(0,o.jsx)(i.strong,{children:"ERDDAP\u2122"})," "]}),"\xe8 un server di dati che fornisce agli utenti un modo semplice e coerente per scaricare sottoinsiemi di dataset scientifici grigliati e tabulari in formati di file comuni e fare grafici e mappe.ERDDAP\u2122funziona con un dato dataset come un gruppo di variabili grigliate multidimensionali (ad esempio, dati satellitari o modello) o come tabella di base (con una colonna per ogni tipo di informazione e una riga per ogni osservazione) .ERDDAP\u2122\xe8 Software Libero e Open Source, cos\xec chiunque pu\xf2",(0,o.jsx)(i.a,{href:"/docs/server-admin/deploy-install",children:"scaricare e installareERDDAP\u2122"}),"per servire i loro dati."]}),"\n",(0,o.jsxs)(i.p,{children:["Per aggiungere un set di dati a unERDDAP\u2122installazione, ilERDDAP\u2122l'amministratore deve aggiungere un pezzo di XML che descrive il dataset a un file chiamatodatasets.xml. (C'\xe8",(0,o.jsx)(i.a,{href:"/docs/server-admin/datasets",children:"documentazione approfondita perdatasets.xml"}),".) Anche se \xe8 possibile generare il pezzo di XML perdatasets.xmlinteramente a mano,ERDDAP\u2122viene con uno strumento chiamato",(0,o.jsxs)(i.a,{href:"/docs/server-admin/datasets#tools",children:[" ",(0,o.jsx)(i.strong,{children:"GenerareDatasetsXml"})," "]}),"che pu\xf2 generare la bozza ruvida del pezzo di XML necessario per un dato set di dati basato su alcune fonti di informazioni sul dataset."]}),"\n",(0,o.jsxs)(i.p,{children:["La prima cosa GenerateDatasets Xml chiede che tipo di dataset si desidera creare. Genera i dati Xml ha un'opzione speciale, ",(0,o.jsx)(i.strong,{children:"EDDTable FromEML"})," , che utilizza le informazioni in un",(0,o.jsx)(i.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Lingua ecologica dei metadati (EML) "}),"file XML per generare il pezzo di XML perdatasets.xmlper creare un",(0,o.jsx)(i.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"EDDTableFromAsciiFiles"}),"dataset da ogni tabella di dati in un file EML. Questo funziona molto bene per la maggior parte dei file EML, soprattutto perch\xe9 i file EML fanno un ottimo lavoro di memorizzazione di tutti i metadati necessari per un set di dati in un formato facile da lavorare. Le informazioni che GenerateDatasetsXml ha bisogno di creare i set di dati \xe8 nel file EML, tra cui l'URL per il file di dati, che GenerateDatasetsXml scarica, parses, e confronta con la descrizione nel file EML. (Molti gruppi potrebbero fare bene per passare a EML, che \xe8 un ottimo sistema per documentare qualsiasi dataset scientifico tabulare, non solo dati ecologici. E molti gruppi che creano schemi XML farebbe bene ad usare EML come caso di studio per lo schema XML che sono chiari, al punto, non eccessivamente profondi (cio\xe8, troppi livelli) , e facile per gli esseri umani e computer a lavorare con.)"]}),"\n",(0,o.jsx)(i.h2,{id:"questions",children:"Domande"}),"\n",(0,o.jsx)(i.p,{children:"Ecco tutte le domande GenerateDatasets Xml chieder\xe0, con commenti su come si dovrebbe rispondere se si desidera elaborare solo un file EML o un gruppo di file EML:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsx)(i.p,{children:"Quale EDDType?\r\nSe si desidera elaborare un solo file, rispondere: EDDTableFromEML\r\nSe si desidera elaborare un gruppo di file, rispondere: EDDTableFromEMLBatch"}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsx)(i.p,{children:"Directory per memorizzare i file?\r\nInserisci il nome della directory che verr\xe0 utilizzata per memorizzare i file EML e/o dati scaricati.\r\nSe la directory non esiste, verr\xe0 creata."}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsx)(i.p,{children:"(Per EDDTableDaEML solo) URL EML o file localeName?\r\nInserisci l'URL o il nome del file locale di un file EML."}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsxs)(i.p,{children:["(Per EDDTableFromEMLBatch solo) EML dir (URL o locale) ?\r\nInserisci il nome della directory con i file EML (un URL o un dir locale) .\r\nPer esempio: ",(0,o.jsx)(i.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsx)(i.p,{children:"(Per EDDTableFromEMLBatch solo) Nome file regex?\r\nInserisci l'espressione regolare che verr\xe0 utilizzata per identificare i file EML desiderati nella directory EML.\r\nPer esempio: knb-lter-sbc\\\\\\\\d+"}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsx)(i.p,{children:"Utilizzare i file locali se presenti (vero|falso) ?\r\nInserisci il vero per utilizzare i file EML locali esistenti e i file di dati, se esistono.\r\nInserisci falso per scaricare sempre i file EML e/o i file di dati."}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsxs)(i.p,{children:['accessibile A?\r\nSe si desidera che i nuovi set di dati siano dataset privati inERDDAP, specificare il nome del gruppo (#) che sar\xe0 consentito l\'accesso.\r\nRaccomandato per gruppi LTER: combinare "lter" pi\xf9 il gruppo, ad esempio, lter Sbc.\r\nSe si entra "null", non ci sar\xe0<accessibile To> tag in uscita.\r\nVedi',(0,o.jsx)(i.a,{href:"/docs/server-admin/datasets#accessibleto",children:"accessibile A"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(i.li,{children:["\n",(0,o.jsxs)(i.p,{children:["locale locale TimeZone (ad esempio, US/Pacifico) ?\r\nSe una variabile di tempo indica che ha valori di tempo locale, questo fuso orario verr\xe0 assegnato.\r\nQuesto deve essere un valore dal",(0,o.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"Elenco della colonna TZ dei nomi della zona temporale"}),'.\r\nNota tutti i nomi "US/..." facili da usare alla fine della lista.\r\nSe poi si trova che per essere errato, \xe8 possibile modificare iltime\\_zonein the chunk ofdatasets.xml.']}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(i.p,{children:["EML plusERDDAP\u2122\xe8 una grande combinazione, poich\xe9ERDDAP\u2122pu\xf2 dare agli utenti pi\xf9 accesso diretto alla ricchezza di",(0,o.jsx)(i.a,{href:"https://knb.ecoinformatics.org/",children:"Rete di Conoscenza per la Biocomplessit\xe0 (KNB) "}),"e",(0,o.jsx)(i.a,{href:"https://lternet.edu/",children:"Ricerca ecologica a lungo termine (LETTERA) "}),"dati e aiutare questi progetti incontrare il governo degli Stati Uniti",(0,o.jsx)(i.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Accesso pubblico ai risultati della ricerca (PARERI) requisiti"}),"rendendo i dati disponibili tramite un servizio web. Inoltre, EML plusERDDAP\u2122sembra un grande ponte tra gli scienziati nel regno accademico / finanziato dal NSF e scienziati nell'agenzia federale (NOAA, NASA, USGS) Il regno."]}),"\n",(0,o.jsxs)(i.p,{children:["Guarda la nostra",(0,o.jsx)(i.a,{href:"/docs/intro#support",children:"sezione per ottenere supporto aggiuntivo"}),".\r\n\xa0"]}),"\n",(0,o.jsx)(i.h2,{id:"design-details",children:"Design dettagli"}),"\n",(0,o.jsx)(i.p,{children:"Ecco i dettagli di progettazione dell'opzione EDDTableFromEML in GenerateDatasetsXml.\r\nAlcuni sono legati alle differenze nel modo in cui EML eERDDAP\u2122fare le cose e come GenerateDatasets Xml si occupa di questi problemi."}),"\n",(0,o.jsx)(i.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"Un datoTable Diventa unoERDDAP\u2122Dataset"}),"\n",(0,o.jsxs)(i.p,{children:["Un file EML pu\xf2 avere pi\xf9<dati Table>s.ERDDAP\u2122faERDDAP\u2122dataset per dati EMLTable. ThedatasetIDper il dataset \xe8\r\n",(0,o.jsx)(i.em,{children:"EMLName"})," # ",(0,o.jsx)(i.em,{children:"tavoloNumero"}),"   (quando EMLname \xe8 testo) o\r\n",(0,o.jsx)(i.em,{children:"sistema\\_EMLName"})," # ",(0,o.jsx)(i.em,{children:"tavoloNumero"}),"   (quando EMLname \xe8 un numero) .\r\nAd esempio, la tabella #1 nel file knb-lter-sbc.28, diventaERDDAP\u2122 datasetID=knb\\_lter\\_sbc\\_28\\_t1,\r\n\xa0"]}),"\n",(0,o.jsx)(i.h3,{id:"eml-versus-cfacdd",children:"EML contro CF+ACDD"}),"\n",(0,o.jsxs)(i.p,{children:["Quasi tutti i metadati nei file EML entra inERDDAP, ma in un formato diverso.ERDDAP\u2122utilizza il",(0,o.jsx)(i.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"CFU"}),"e",(0,o.jsx)(i.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"ACDDETTI"}),"standard di metadati. Sono sistemi di metadati complementari che utilizzano coppie chiave=valore per metadati globali e per i metadati di ciascuna variabile.\r\nS\xec, la rappresentazione EML dei metadati \xe8 pi\xf9 bella della rappresentazione CF+ACDD. Non sto suggerendo di usare la rappresentazione CF+ACDD come sostituto per l'EML. Si prega di pensare a CF+ACDD come parte del ponte dal mondo EML alOPeNDAP/CF/ACDD mondo.\r\n\xa0"]}),"\n",(0,o.jsx)(i.h3,{id:"small-changes",children:"Piccoli cambiamenti"}),"\n",(0,o.jsx)(i.p,{children:"ERDDAP\u2122fa un sacco di piccoli cambiamenti. Per esempio,ERDDAP\u2122utilizza il EML non-DOIalternativo Identifier plus a dataNumero comeERDDAP\u2122 datasetID, ma leggermente si alternano Identifier per renderlo un nome variabile valido nella maggior parte delle lingue del computer, ad esempio, dati knb-lter-sbc.33 La tabella #1 diventa knb\\_lter\\_sbc\\_33\\_t1.\r\n\xa0"}),"\n",(0,o.jsx)(i.h3,{id:"docbook",children:"DocBook"}),"\n",(0,o.jsx)(i.p,{children:"EML utilizza il sistema di markup di DocBook per fornire la struttura a blocchi di testo nei file EML. CF e ACDD richiedono che i metadati siano testo semplice. Cos\xec genera i dati Xml converte il testo segnalato in testo normale che sembra la versione formattata del testo. I tag in linea sono sanitizzati con staffe quadrate, ad esempio,\\[sottolineato\\], e lasciato nel testo normale.\r\n\xa0"}),"\n",(0,o.jsx)(i.h3,{id:"data-files",children:"File di dati"}),"\n",(0,o.jsx)(i.p,{children:"Dal momento che i dati EMLTable include l'URL del file di dati effettivo, GenerateDatasets Xml sar\xe0:"}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsx)(i.li,{children:"Scarica il file di dati."}),"\n",(0,o.jsx)(i.li,{children:"Conservalo nella stessa directory del file EML."}),"\n",(0,o.jsx)(i.li,{children:"Leggi i dati."}),"\n",(0,o.jsx)(i.li,{children:"Confrontare la descrizione dei dati nell'EML con i dati reali nel file."}),"\n",(0,o.jsx)(i.li,{children:"Se Genera i dati Xml trova differenze, si occupa di loro, o chiede all'operatore se le differenze sono ok, o restituisce un messaggio di errore. I dettagli sono in vari articoli qui sotto.\r\n\xa0"}),"\n"]}),"\n",(0,o.jsx)(i.h3,{id:"zipd-data-files",children:".zip'd File di dati"}),"\n",(0,o.jsxs)(i.p,{children:["Se il file di dati di riferimento \xe8 un.zipfile, deve contenere solo un file. Questo file sar\xe0 usato perERDDAP\u2122Dataset. Se c'\xe8 pi\xf9 di 1 file.ERDDAP\u2122respinger\xe0 tale dataset. Se necessario, questo potrebbe essere modificato. (In pratica, tutti i file zip SBC LTER hanno solo un file di dati.)",(0,o.jsx)(i.br,{}),"\n","\xa0"]}),"\n",(0,o.jsx)(i.h3,{id:"storagetype",children:"Tubo di stoccaggio"}),"\n",(0,o.jsx)(i.p,{children:"Se lo storage di una colonna Il tipo non \xe8 specificato,ERDDAP\u2122utilizza la sua migliore ipotesi in base ai dati nel file di dati. Questo funziona abbastanza bene.\r\n\xa0"}),"\n",(0,o.jsx)(i.h3,{id:"units",children:"Unit\xe0"}),"\n",(0,o.jsxs)(i.p,{children:["ERDDAP\u2122usi",(0,o.jsx)(i.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITSformattazione per unit\xe0"}),'. Genera i dati Xml \xe8 in grado di convertire unit\xe0 EML inUDUNITSpulito circa il 95% del tempo. Il restante 5% si traduce in una descrizione leggibile delle unit\xe0, ad esempio, "biomassDensityUnitPerAbundanceUnit" in EML diventa "unit\xe0 di densit\xe0 di biomassa per unit\xe0 di abbondanza" inERDDAP. Tecnicamente non e\' permesso. Non credo che sia cosi\' male nelle circostanze.\\[Se necessario, unit\xe0 che non possono essere fatteUDUNITScompatibile potrebbe essere spostato all\'attributo di commento della variabile.\\]',(0,o.jsx)(i.br,{}),"\n","\xa0"]}),"\n",(0,o.jsx)(i.h3,{id:"eml-version-211",children:"EML versione 2.1.1"}),"\n",(0,o.jsx)(i.p,{children:"Questo supporto per i file EML v2.1.1 \xe8 stato aggiunto a GenerateDatasets Xml nel 2016 con la speranza che ci sarebbe qualche assunzione nella comunit\xe0 EML. A partire dal 2020, non \xe8 successo. TheERDDAP\u2122gli sviluppatori sarebbero felici di aggiungere il supporto per le versioni pi\xf9 recenti di EML, ma solo se le nuove funzionalit\xe0 saranno effettivamente utilizzate. Si prega di e-mailerd.data at noaa.govse si desidera il supporto per le versioni pi\xf9 recenti di EML e in realt\xe0 user\xe0 questa funzione.\r\n\xa0"}),"\n",(0,o.jsx)(i.h2,{id:"issues-with-the-eml-files",children:"Problemi con i file EML"}),"\n",(0,o.jsx)(i.p,{children:"Ci sono alcuni problemi / problemi con i file EML che causano problemi quando un client software (come l'opzione EDDTableFromEML in GenerateDatasetsXML) tenta di interpretare / elaborare i file EML."}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsx)(i.li,{children:"Anche se ci sono diversi problemi elencati qui, sono per lo pi\xf9 piccoli, solvable problemi. In generale, EML \xe8 un grande sistema ed \xe8 stato il mio piacere lavorare con esso."}),"\n",(0,o.jsx)(i.li,{children:"Questi sono approssimativamente ordinati dal peggio / pi\xf9 comune a meno male / meno comune."}),"\n",(0,o.jsx)(i.li,{children:"La maggior parte sono correlati a piccoli problemi in specifici file EML (che non sono colpa di EML) ."}),"\n",(0,o.jsx)(i.li,{children:"La maggior parte pu\xf2 essere fissata con semplici modifiche al file EML o al file di dati."}),"\n",(0,o.jsx)(i.li,{children:"Dato che le persone LTER stanno costruendo un checker EML per testare la validit\xe0 dei file EML, ho aggiunto alcuni suggerimenti qui sotto per quanto riguarda le caratteristiche che potrebbero essere aggiunte al checker."}),"\n"]}),"\n",(0,o.jsx)(i.p,{children:"Ecco i problemi:"}),"\n",(0,o.jsx)(i.h3,{id:"separate-date-and-time-columns",children:"Data e ora separate colonne"}),"\n",(0,o.jsx)(i.p,{children:"Alcuni file di dati hanno colonne separate per data e per ora, ma nessuna colonna data + ora unificata. Attualmente, GenerateDatasets Xml crea un set di dati con queste colonne separate, ma non \xe8 ideale perch\xe9:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsx)(i.li,{children:'\xc8 meglio se i datasets inERDDAP\u2122hanno una colonna data+ora combinata chiamata"time".'}),"\n",(0,o.jsx)(i.li,{children:'Spesso il dataset non si carica inERDDAP\u2122perch\xe9"time"la colonna non ha dati data+ora.'}),"\n"]}),"\n",(0,o.jsx)(i.p,{children:"Ci sono due soluzioni possibili:"}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsx)(i.li,{children:"Modificare il file di dati sorgente per aggiungere una nuova colonna nel file di dati (e descriverlo nell'EML) dove le colonne della data e dell'ora sono unite in una colonna. Poi eseguire GenerateDatasets Xml cos\xec trova la nuova colonna."}),"\n",(0,o.jsxs)(i.li,{children:["Utilizzare",(0,o.jsx)(i.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Variabili derivati"}),"funzione inERDDAP\u2122definire una nuova variabiledatasets.xmlche \xe8 creato concatenando la data e le colonne di tempo. Uno degli esempi riguarda specificamente questa situazione.\r\n\xa0"]}),"\n"]}),"\n",(0,o.jsx)(i.h3,{id:"inconsistent-column-names",children:"Nome colonna incoerente"}),"\n",(0,o.jsx)(i.p,{children:"I file EML elencano le colonne del file di dati e i loro nomi. Purtroppo, sono spesso diversi dai nomi delle colonne nel file di dati reale. Normalmente, l'ordine della colonna nel file EML \xe8 lo stesso dell'ordine della colonna nel file di dati, anche se i nomi variano leggermente, ma non sempre. Genera i dati Xml cerca di abbinare i nomi delle colonne. Quando non pu\xf2 (che \xe8 comune) , si fermer\xe0, mostrare le coppie di nome file EML/data, e chiedere se sono correttamente allineati. Se si immette 's' per saltare una tabella, GeneratedDatasetsXml stamper\xe0 un messaggio di errore e andare alla tabella successiva.\r\nLa soluzione \xe8 quella di cambiare i nomi delle colonne errate nel file EML per abbinare i nomi delle colonne nel file di dati.\r\n\xa0"}),"\n",(0,o.jsx)(i.h3,{id:"different-column-order",children:"Ordine colonna differente"}),"\n",(0,o.jsx)(i.p,{children:"Ci sono diversi casi in cui l'EML specificava le colonne in un ordine diverso da quello che esiste nel file di dati. Genera i dati Xml si fermer\xe0 e chieder\xe0 all'operatore se i matchup sono ok o se il dataset dovrebbe essere saltato. Se \xe8 saltato, ci sar\xe0 un messaggio di errore nel file dei risultati, ad esempio:"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n      datasetID=knb\\\\_lter\\\\_sbc\\\\_17\\\\_t1\r\n      dataFile=all\\\\_fish\\\\_all\\\\_years\\\\_20140903.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        SURVEY\\\\_TIMING        = notes\r\n        NOTES                = survey\\\\_timing\r\n      --&gt;\n"})}),"\n",(0,o.jsx)(i.p,{children:"La soluzione \xe8 quella di correggere l'ordine della colonna in questi file EML in modo che corrispondano all'ordine nei file di dati."}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se il checker EML controllasse che le colonne e l'ordine della colonna nel file sorgente corrispondono alle colonne e all'ordine della colonna nel file EML."}),"\n",(0,o.jsx)(i.h3,{id:"incorrect-numheaderlines",children:"Non corretto numHeaderLines"}),"\n",(0,o.jsx)(i.p,{children:"Diversi dati Tabelle in modo errato numHeaderLines=1, ad esempio, ...sbc.4011. Questo provocaERDDAP\u2122leggere la prima riga di dati come i nomi delle colonne. Ho cercato di SKIP manualmente tutti questi datiTavole. Sono ovvi perch\xe9 i nomi col sorgente non corrispondenti sono tutti valori di dati. E se ci sono file che erroneamente hanno numHeaderLines=0, il mio sistema non lo rende evidente. Ecco un esempio del file di guasti SBC LTER:"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3017\\\\_t1\r\n      dataFile=MC06\\\\_allyears\\\\_2012-03-03.txt\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        2008-10-01T00:00     = timestamp\\\\_local\r\n        2008-10-01T07:00     = timestamp\\\\_UTC\r\n        2.27                 = discharge\\\\_lps\r\n        -999.0               = water\\\\_temperature\\\\_celsius\r\n      --&gt;\n"})}),"\n",(0,o.jsx)(i.p,{children:"Cos\xec l'errore pu\xf2 apparire come se GenerateDatasets Xml pensa che la prima linea con i dati nel file (ad esempio, con 2008-10-01T00:00 ecc.) \xe8 la linea con i nomi delle colonne (come se 2008-10-01T00:00 fosse un nome di colonna) ."}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker controllasse il valore di numHeaderLines."}),"\n",(0,o.jsx)(i.h3,{id:"numheaderlines--0",children:"numHeaderLines = 0"}),"\n",(0,o.jsx)(i.p,{children:"Alcuni file sorgente non hanno nomi di colonne.ERDDAP\u2122accetta che se l'EML descrive lo stesso numero di colonne."}),"\n",(0,o.jsx)(i.p,{children:"A mio parere, questo sembra molto pericoloso. Ci potrebbero essere colonne in un ordine diverso o con unit\xe0 diverse (vedi sotto) e non c'\xe8 modo di prendere quei problemi. \xc8 molto meglio se tutti i file di dati ASCII hanno una riga con i nomi delle colonne."}),"\n",(0,o.jsx)(i.h3,{id:"datetime-format-strings",children:"DataTime Formato Strings"}),"\n",(0,o.jsxs)(i.p,{children:["EML ha un modo standard per descrivere i formati di data time. ma c'\xe8 una notevole variazione nel suo uso nei file EML. (Prima mi sbagliavo. Vedo la documentazione EML per formatString che sembra abbinare",(0,o.jsx)(i.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"JavaSpecificazione DataTimeFormatter"}),", ma che manca delle linee guida importanti circa il suo utilizzo, con il risultato che formatString \xe8 spesso / di solito improprio usato.) Ci sono diverse istanze con caso errato e/o duplicazione errata di una lettera e/o formattazione non standard. Questo mette un onere irragionevole per i clienti, in particolare i client software come GenerateDatasetsXml. Genera i dati Xml cerca di convertire i formati non definiti nei file EML in\r\n",(0,o.jsx)(i.a,{href:"/docs/server-admin/datasets#string-time-units",children:"il formato data/ora cheERDDAP\u2122richiede"}),", che \xe8 quasi identico aJava/Joda tempo formato specificazione, ma \xe8 leggermente pi\xf9 indulgente."]}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker richiedesse una stretta adesione allaJava/Joda/ERDDAPla specificazione delle unit\xe0 di tempo e ha verificato che i valori dell'ora della data nella tabella dei dati potrebbero essere analizzati correttamente con il formato specificato."}),"\n",(0,o.jsx)(i.h3,{id:"datetime-but-no-time-zone",children:"DataTime But No Time Zone"}),"\n",(0,o.jsx)(i.p,{children:'Generare i dati Xml cerca una colonna con data Tempo e una determinata zona temporale (oZulu: dalle unit\xe0 di tempo che terminano in \'Z\' o da un nome di colonna o una definizione di attributo che include "gmt" o "utc", o locale: da "locale" nel nome della colonna o nella definizione di attributo) . Anche accettabile \xe8 un file con una colonna della data ma nessuna colonna di tempo. Anche accettabile \xe8 un file senza informazioni di data o ora.'}),"\n",(0,o.jsx)(i.p,{children:'Genera i dati Xml tratta tutti i tempi "locali" come dal fuso orario che \xe8 possibile specificare per un determinato lotto di file, ad esempio, per SBC LTER, utilizzare US / Pacific. Le informazioni sono a volte nei commenti, ma non in una forma che \xe8 facile per un programma di computer da capire.'}),"\n",(0,o.jsx)(i.p,{children:'I file che non soddisfano questi criteri vengono rifiutati con il messaggio "NO GOOD DATE (TEMPO) VARIABILE. I problemi comuni sono:'}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsx)(i.li,{children:"C'\xe8 una colonna con date e una colonna con tempi, ma non data Colonna temporale."}),"\n",(0,o.jsx)(i.li,{children:"Ci sono unit\xe0 temporali, ma la zona temporale non \xe8 specificata."}),"\n"]}),"\n",(0,o.jsxs)(i.p,{children:['Altri commenti:\r\nSe c\'\xe8 una buona data + ora con la colonna fuso orario, quella colonna verr\xe0 nominata"time"inERDDAP.ERDDAP\u2122richiede che i dati della colonna di tempo siano comprensibili/convertibiliZulu/UTC/GMT data fuso orario.\\[La mia convinzione \xe8: usare orari locali e diversi formati di data/ora (2 anni! mm/dd/yyy vs dd/mm/yy vs ...) nei file di dati costringe l\'utente finale a fare complicate conversioni aZulutempo al fine di confrontare i dati da un dataset con i dati da un altro. Quindi...ERDDAP\u2122standardizza tutti i dati del tempo: Per tempi di stringa,ERDDAP\u2122utilizza sempre la ISO 8601:2004 (E) formato standard, per esempio, 1985-01-02T00:00:00Z. Per tempi numerici,ERDDAP\u2122sempre usi"seconds since 1970-01-01T00:00:00Z".ERDDAP\u2122usa sempreZulu  (UTC, GMT) fuso orario per rimuovere le difficolt\xe0 di lavorare con diversi fusi orari e tempo standard rispetto all\'ora legale. Cos\xec genera i dati Xml cerca una colonna EMLTabella con data+timeZulu. Questo \xe8 difficile perch\xe9 EML non utilizza un vocabolario formale/sistema (come',(0,o.jsx)(i.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"JavaFormato orario /Joda"}),') per specificare i dati Formato del tempo:\r\nSe c\'\xe8 un col con valori di tempo numerici (ad esempio,Matlabvolte) eZulufuso orario (o solo date, senza colonne di tempo) , \xe8 usato come"time".\r\nSe c\'\xe8 un col con dati di data e ora, utilizzando ilZulufuso orario, \xe8 usato come"time"e qualsiasi altra data o colonna dell\'ora viene rimossa.\r\nAltro se si trova un col con le informazioni della data giusta, viene utilizzato come"time"variabile (senza fuso orario) .\r\nSe c\'\xe8 una colonna di dati e una colonna di tempo e nessuna data combinata La colonna del tempo, il dataset \xe8 REJECTED \u2014 ma il dataset potrebbe essere reso utilizzabile aggiungendo una data combinata Colonna temporale (preferibilmente,Zulufuso orario) al file di dati e aggiungendo la sua descrizione nel file EML.\r\nEXAMPLE da SBC LTER:',(0,o.jsx)(i.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"datiTabella #2."]}),"\n",(0,o.jsxs)(i.p,{children:["Sarebbe bello se EML/LTER richiedesse l'inclusione di una colonna conZulu  (UTC, GMT) tempi di fuso orario in tutti i relativi file di dati di origine. Il prossimo meglio \xe8 aggiungere un sistema a EML per specificare untime\\_zoneattributo utilizzando nomi standard (dal",(0,o.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"Colonna TZ"}),") ."]}),"\n",(0,o.jsx)(i.h3,{id:"missing-missing_value",children:"Mancatomissing\\_value"}),"\n",(0,o.jsx)(i.p,{children:"Alcune colonne usano unmissing\\_valuema non elencarlo nei metadati EML, ad esempio, precipitazioni\\_mm in knb-lter-sbc.5011 utilizza -999. Se non viene specificato alcun valore mancante nell'EML, GenerateDatasetsXml cerca automaticamente i valori mancanti comuni (Ad esempio, 99, 99, 99, 999, 999, 9999, -9999, ecc.) e crea quei metadati. Ma altri mancantimissing\\_values non sono catturati."}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker cercasse di mancaremissing\\_valueS."}),"\n",(0,o.jsx)(i.h3,{id:"small-problems",children:"Piccoli problemi"}),"\n",(0,o.jsx)(i.p,{children:"Ci sono un sacco di piccoli problemi (ortografia, punteggiatura) che probabilmente sar\xe0 trovato solo da un umano che ispeziona ogni dataset."}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker cercasse errori di ortografia e grammatica. Questo \xe8 un problema difficile perch\xe9 le parole nella scienza sono spesso contrassegnate da controllori di incantesimi. L'editing umano \xe8 probabilmente necessario."}),"\n",(0,o.jsx)(i.h3,{id:"invalid-unicode-characters",children:"Personaggi non validi Unicode"}),"\n",(0,o.jsx)(i.p,{children:"Alcuni contenuti EML contengono caratteri Unicode non validi. Questi sono probabilmente personaggi del set di beneficenza di Windows che sono stati copiati e incollati in modo errato nei file UTF-8 EML. Genera i dati Xml santifica questi caratteri ad esempio,\\[#128 #\\], quindi sono facili da cercare nelERDDAP\u2122 datasets.xmlfile."}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker lo controllasse. \xc8 facile da trovare e facile da risolvere."}),"\n",(0,o.jsx)(i.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Diverse unit\xe0 di colonna] (#differenteColumnUnits)"}),"\n",(0,o.jsx)(i.p,{children:'Alcuni dati EMLTables definiscono colonne che sono in contrasto con le colonne nel file di dati, in particolare perch\xe9 hanno unit\xe0 diverse. Genera i dati Xml le bandiere. Spetta all\'operatore decidere se le differenze vanno bene o no. Questi appaiono nel file di guasti come dati "SKIPPED". EXAMPLE in SBC LTER guasti file:'}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3\\\\_t1\r\n      dataFile=SBCFC\\\\_Precip\\\\_Daily\\\\_active\\\\_logger.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        Daily\\\\_Precipitation\\\\_Total\\\\_mm = Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n        Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_mm = Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n      --\x3e\n"})}),"\n",(0,o.jsx)(i.p,{children:"Sarebbe bello se l'EML checker controllasse che le unit\xe0 combaciassero. Sfortunatamente, questo \xe8 probabilmente impossibile da catturare e quindi impossibile da risolvere senza contattare il creatore del dataset, dato che il file sorgente non include unit\xe0. La discrepanza per l'esempio sopra era evidente solo perch\xe9 le unit\xe0 erano incluse nel nome della colonna di origine e nel nome della colonna EML. Quanti altri datiTavole hanno questo problema ma sono inosservabili?"}),"\n",(0,o.jsx)(i.h3,{id:"different-versions-of-eml",children:"Versioni diverse di EML"}),"\n",(0,o.jsx)(i.p,{children:"Genera i dati Xml \xe8 progettato per lavorare con EML 2.1.1. Altre versioni di EML lavoreranno nella misura in cui corrispondono a 2.1.1 o che GenerateDatasetsXml ha un codice speciale per affrontarlo. E' un problema raro. Quando si verifica, la soluzione \xe8 quella di convertire i file in EML 2.1.1, o inviare il file EML inerd.data at noaa.gov, cos\xec posso apportare modifiche a GenerateDatasets Xml per affrontare le differenze."}),"\n",(0,o.jsx)(i.p,{children:"Bob ha aggiunto il supporto per i file EML per GenerateDatasets Xml nel 2016 con la speranza che ci sarebbe qualche assunzione nella comunit\xe0 EML. A partire dal 2020, non \xe8 successo. Bob \xe8 felice di aggiungere il supporto per le versioni pi\xf9 recenti di EML, ma solo se le nuove funzionalit\xe0 saranno effettivamente utilizzati. Si prega di e-mailerd.data at noaa.govse si desidera il supporto per le versioni pi\xf9 recenti di EML e in realt\xe0 user\xe0 questa funzione."}),"\n",(0,o.jsx)(i.h3,{id:"trouble-parsing-the-data-file",children:"Problemi di Parsing the Data File"}),"\n",(0,o.jsxs)(i.p,{children:['Raramente, un datoTable pu\xf2 essere respinto con l\'errore "numero non previsto di elementi in linea #120 (osservato=52, atteso=50) " Un messaggio di errore come questo significa che una linea nel file di dati aveva un numero diverso di valori rispetto alle altre linee. Potrebbe essere un problemaERDDAP\u2122  (ad esempio, non analizzare correttamente il file) o nel file. EXAMPLE da SBC LTER:\r\n',(0,o.jsx)(i.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"dataTable #3, vedere datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt"]})]})}function m(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},28453:(e,i,a)=>{a.d(i,{R:()=>l,x:()=>t});var n=a(96540);const o={},r=n.createContext(o);function l(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function t(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);