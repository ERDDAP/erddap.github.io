# Riconoscimento

Il contributore[crediti](https://github.com/erddap/erddap/blob/main/CREDITS.md)perERDDAP™è ora su una pagina separata.ERDDAP™è un prodotto del[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division").

Bob Simons è l'autore principale originale diERDDAP™  (il progettista e lo sviluppatore software che ha scritto ilERDDAP- codice specifico) . Il punto di partenza era quello di Roy Mendelssohn (Il capo di Bob) suggerimento che Bob gira il suo programma ConvertTable (una piccola utility che converte i dati tabulari da un formato all'altro e che era in gran parte il codice dal pre-NOAAlavoro che Bob ha rimesso ad essere open source) in un servizio web.

Era ed è le idee di Roy Mendelssohn sui sistemi di dati distribuiti, il suo suggerimento iniziale a Bob, e il suo supporto continuo (incluso hardware, rete e altro supporto software, e liberando il tempo di Bob in modo da poter trascorrere più tempo sulERDDAP™codice) che ha reso possibile questo progetto e ha permesso la sua crescita.

TheERDDAP-il codice specifico è autorizzato come fonte aperta protetta da copyright, con[NOAA](https://www.noaa.gov)il diritto d'autore. Vedi il[ERDDAP™licenza](/license).
ERDDAP™utilizza librerie di dominio pubblico, Apache, LGPL, MIT/X, Mozilla e librerie di dominio pubblico e dati.
ERDDAP™non richiede alcun codice GPL o programmi commerciali.

La maggior parte dei finanziamenti per il lavoroERDDAP™è venuto daNOAAIn questo ha pagato lo stipendio di Bob Simons. Per il primo anno diERDDAP™, quando era un appaltatore del governo, i finanziamenti provenivano dal[NOAACosta](https://coastwatch.noaa.gov/)programma, il[NOAAIOOS](https://ioos.noaa.gov/)programma, e l'ormai defunto Pacific Ocean Shelf Tracking (POST) programma.

Molto credito va ai moltiERDDAP™amministratori e utenti che hanno fatto suggerimenti e commenti che hanno portato a molti miglioramentiERDDAP. Molti sono menzionati per nome nel[Elenco delle modifiche](/changes). Grazie a tutti (nome e non nominata) Molto. Così,ERDDAP™è un grande esempio di[Innovazione guidata dall'utente](https://en.wikipedia.org/wiki/User_innovation), dove l'innovazione del prodotto viene spesso dai consumatori (ERDDAP™utenti) non solo i produttori (ERDDAP™sviluppatori) .

Ecco l'elenco di software e dataset che si trovano nellaERDDAP™distribuzione. Siamo molto grati per tutti questi. Grazie mille.
\\[A partire dal 2021, è diventato quasi impossibile elencare correttamente tutte le fonti di codice perERDDAP™perché alcune delle librerie che utilizziamo (in particolare netcdf-java e soprattutto AWS) a sua volta utilizzare molte, molte altre biblioteche. Tutte le biblioteche cheERDDAP™le chiamate di codice sono incluse direttamente qui sotto, come sono molte delle librerie che le altre biblioteche chiamano a loro volta. Se vedete che abbiamo omesso un progetto qui sotto, fateci sapere in modo che possiamo aggiungere il progetto qui sotto e dare credito dove il credito è dovuto.\\]

## Panoramica{#overview} 
ERDDAP™è un[JavaServ.](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)programma. AERD, corre dentro un[Tomcat](https://tomcat.apache.org/)server di applicazione (licenza:[Apache](https://www.apache.org/licenses/)) con un[Apache](https://httpd.apache.org/)server web (licenza:[Apache](https://www.apache.org/licenses/)) , in esecuzione su un computer utilizzando[Red Hat Linux](https://www.redhat.com/)sistema operativo (licenza:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) .
     
## Datasets{#datasets} 
I set di dati provengono da varie fonti. Vedere i metadati (in particolare il "sourceUrl", "infoUrl""institution", e "licenza") per ogni dataset. Molti set di dati hanno una restrizione sul loro utilizzo che richiede di citare / accreditare il fornitore di dati ogni volta che si utilizza i dati. È sempre un buon modulo per citare/creditare il fornitore di dati. Vedi[Come Citare un Dataset in un Libro](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset).
     
## Software di CoHort{#cohort-software} 
[Le classi com/cohort](#cohort-software)sono da CoHort Software ( https://www.cohortsoftware.com ) che rende queste classi disponibili con una licenza MIT/X (vedi classi/com/cohort/util/LICENSE.txt) .
     
## Sfogliatore di moto{#coastwatch-browser} 
ERDDAP™utilizza il codice del progetto CoastWatch Browser (ora decomissioned) dal[NOAACosta](https://coastwatch.noaa.gov) [Nodo regionale della costa occidentale](https://coastwatch.pfeg.noaa.gov/)  (licenza: fonte aperta protetta da copyright) . Il progetto è stato avviato e gestito da Dave Foley, ex Coordinatore delNOAACosta Ovest Costa Nodo Regionale. Tutto il codice CoastWatch Browser è stato scritto da Bob Simons.
     
## OPeNDAP {#opendap} 
Dati da[OPeNDAP](https://www.opendap.org)i server sono letti con[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (licenza: LGPL) .
     
## NetCDF- Java{#netcdf-java} 
NetCDFfile (.nc) , stile GMTNetCDFfile (.grd) , GRIB, e BUFR sono letti e scritti con codice nel[NetCDF JavaBiblioteca](https://www.unidata.ucar.edu/software/netcdf-java/)  (licenza:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) da[Unidata](https://www.unidata.ucar.edu/).

Software incluso nelNetCDF Java.jar:

* Slf4j
TheNetCDF JavaBiblioteca e Cassandra bisogno[slf4j dal Facade di registrazione semplice perJava](https://www.slf4j.org/)progetto. Attualmente,ERDDAP™utilizza lo slf4j-simple-xxx.jar rinominato slf4j.jar per soddisfare questa esigenza. (licenza:[MIT/X](https://www.slf4j.org/license.html)) .
     
* JDOM
TheNetCDF Java.jar include il codice di elaborazione XML da[JDOM](http://www.jdom.org/)  (licenza:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , che è incluso nel netcdfAll.jar.
     
* Joda
TheNetCDF Java.jar include[Joda](https://www.joda.org/joda-time/)per calcoli di calendario (che probabilmente non sono utilizzati daERDDAP) . (licenza:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) .
     
* Apache
TheNetCDF Java.jar include file .jar da diversi[Progetti Apache](https://www.apache.org/):
    [comuni-codicec](https://commons.apache.org/proper/commons-codec/)♪
    [comuni-scoperta](https://commons.apache.org/discovery/)♪
    [comuni...httpcliente](https://hc.apache.org/httpcomponents-client-ga/)♪
    [comune-logging](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponenti](https://hc.apache.org)♪
     (Per tutti: licenza:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Questi sono inclusi nel netcdfAll.jar.
     
* Altri
TheNetCDF Java.jar comprende anche il codice da: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, comogle.common. (Google utilizza le licenze Apache e BSD.)   
         
## SGT{#sgt} 
I grafici e le mappe sono creati on-the-fly con una versione modificata diNOAASGT (era https://www.pmel.noaa.gov/epic/java/sgt/ , ora interrotto) versione 3 (aJava-based Scientific Graphics Toolkit scritto da Donald Denbo a[NOAAPMEL](https://www.pmel.noaa.gov/))   (licenza: fonte aperta protetta da copyright (era https://www.pmel.noaa.gov/epic/java/license.html ) ) .
     
## Walter Zorn{#walter-zorn} 
Grandi, strumenti HTML suERDDAPLe pagine HTML sono create con wz\\_tooltip di Walter Zorn. j (licenza: LGPL) .
I cursori e la funzione di trascinamento del Sorter Slide sono creati con wz\\_dragdrop.js di Walter Zorn (licenza: LGPL) .
     
## aperto PDF{#openpdf} 
I file .pdf sono creati con[Aprire il PDF](https://github.com/LibrePDF/OpenPDF), un liberoJava- Libreria PDF.
     
## GSH{#gshhs} 
I dati di riva e lago sono da[GSH](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)-- Un database globale di Shoreline auto-consistente, gerarchico e ad alta risoluzione (licenza:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) e creato da Paul Wessel e Walter Smith.

Noi non facciamo appello alla CORRETENZA DEI DATI SHORELINE che vengono conERDDAP™- Non usarlo per i PURPOS NAVIGATIONAL.
     
    
## Pscoast GMT{#gmt-pscoast} 
I dati del confine politico e del fiume provengono da[pscoa](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)programma in[GMT](https://www.soest.hawaii.edu/gmt/), che utilizza i dati dal[CIA Banca Mondiale dei Dati II](https://www.evl.uic.edu/pape/data/WDB/)  (licenza: pubblico dominio) .

Non facciamo appello alla CORRETENZA dei dati biblici POLITICHE che vengono conERDDAP.
    
## ETOPO{#etopo} 
I dati della vasca/topografia utilizzati sullo sfondo di alcune mappe sono i seguenti:[ETOPO1 Global 1-Minute Grid Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Superficie del ghiaccio, griglia registrata, binario, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (licenza:[dominio pubblico](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , che è distribuito gratuitamente[NOAANGDC](https://www.ngdc.noaa.gov).

Non facciamo appello alla CORRETENZA DEI DATI BATHYMETRY/TOPOGRAFIA che vengono conERDDAP. Non usarlo per i PURPOS NAVIGATIONAL.
    
## JavaMail{#javamail} 
Le e-mail vengono inviate utilizzando il codice nella posta. vaso daOracle'[JavaAPI di posta](https://javaee.github.io/javamail/)  (licenza:[SVILUPPO E DISTRIBUZIONE COMUNE (CDDL) Versione 1.1](https://javaee.github.io/javamail/LICENSE)) .
     
## JSON{#json} 
ERDDAP™usi[json.org'sJava-basata libreria JSON](https://www.json.org/index.html)a parse[JSON](https://www.json.org/)dati (licenza:[fonte aperta protetta da copyright](https://www.json.org/license.html)) .
     

## PostgrSQL{#postgrsql} 
ERDDAP™incluso il[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)autista (licenza:[BSD](https://www.postgresql.org/about/licence/)) . Il conducente è Copyright (C) 1997-2010, PostgreSQL Global Development Group. Tutti i diritti riservati.
     
## Lucene{#lucene} 
ERDDAP™utilizzare il codice da Apache[Lucene](https://lucene.apache.org/). (licenza:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) per l'opzione "lucene" motore di ricerca (ma non per il motore di ricerca predefinito "originale") .
     
## comuni-compresso{#commons-compress} 
ERDDAP™utilizzare il codice da Apache[comuni-compresso](https://commons.apache.org/compress/). (licenza:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## JEXL{#jexl} 
ERDDAP™supporto per la valutazione di espressioni e script in&lt;sourceNames&gt; si basa sulla[Progetto Apache](https://www.apache.org/):[JavaLingua di espressione (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licenza:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Cassandra{#cassandra} 
ERDDAP™incluso Apache[Cassandra](https://cassandra.apache.org/) [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (licenza:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) .
Cassandra-driver-core.jar richiede (e cosìERDDAP™incluso) :
*   [guava.jar](https://github.com/google/guava)  (licenza:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) .
*   [Lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (licenza:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) .
*   [metriche-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (licenza:[MITTA](https://github.com/codahale/metrics/blob/master/LICENSE)) .
*   [netty-all.jar](https://netty.io/downloads.html)  (licenza:[Apache 2.0](https://netty.io/downloads.html)) .
*   [snappy-java.jar](https://xerial.org/snappy-java/)  (licenza:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) .
         
## KT\\_tavolozza{#kt_-palettes} 
Le palette di colori che hanno il prefisso "KT\\_"sono[raccolta di tavolozze .cpt di Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (licenza:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , ma leggermente riformattato da Jennifer Sevadjian diNOAAaffinché si conformanoERDDAPI requisiti del .cpt.
     
## Leaflet {#leaflet} 
ERDDAP™utilizza ilJavaLibreria script[Leaflet](https://leafletjs.com/)  (licenza:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) comeWMScliente suWMSpagine web inERDDAP. È un software eccellente (ben progettato, facile da usare, veloce e gratuito) di Vladimir Agafonkin.
     
## AWS{#aws} 
Per lavorare con Amazon AWS (incluso S3) ♪ERDDAP™utilizza v2 del[AWS SDK perJava](https://aws.amazon.com/sdk-for-java/)  (licenza:[Apache](https://www.apache.org/licenses/)) .

AWS richiede che Maven tiri le dipendenze. Essi includono i seguenti file .jar (dove xxx è il numero di versione, che cambia nel tempo, e il tipo di licenza è in parentesi) : annotazioni-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analysis-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MITTA) , errore\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , fallaceaccess-xxx.jar (Apache) ♪httpcore-xxx.jar (Apache) , j2objc-annotations-xxx.jar (Apache) , Jackson-annotations-xxx.jar (Apache) Jackson-core-xxx.jar (Apache) , Jackson-databind-xxx.jar (Apache) Traduzione: (BSD) # (Apache) , jffi-xxx.native. vaso (Apache) , jnr-constants-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) Traduzione: (Apache) , jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Copyright open source) , jsr305-xxx.jar (Apache) ♪, listenablefuture-xxx.jar (Apache) , circa una dozzina di netty. Il vaso (Apache) , profili-xxx.jar (Apache) , protocollo-core-xxx.jar (Apache) , reattivi-streams-xxx.jar (COSTO 1.0) , regioni-xxx.jar (Apache) , s3-xxx.jar (Apache) # (Apache) ♪ utils-xxx.jar (?) . Per vedere le licenze effettive, cercare il nome .jar nel[Maven Repository](https://mvnrepository.com/)e poi rovistare nei file del progetto per trovare la licenza.
    

Siamo anche molto grati per tutti i software e siti web che utilizziamo quando sviluppiamoERDDAP, incluso
[Chrome](https://www.google.com/chrome/browser/desktop/)♪
[curl](https://curl.haxx.se/)♪
[DuckDuckGo](https://duckduckgo.com/?q=)♪
[Modifica](https://www.editplus.com/)♪
[FileZilla](https://filezilla-project.org/).
[GitHub](https://github.com/)♪
[Ricerca Google](https://www.google.com/webhp)♪
[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)♪
[sovraccarico di stack](https://stackoverflow.com/)♪
[todo](https://todoist.com/?lang=en)♪
[Wikipedia](https://www.wikipedia.org/)♪
Internet, il World Wide Web, e tutti gli altri, grandi, siti web utili.
Grazie mille.
