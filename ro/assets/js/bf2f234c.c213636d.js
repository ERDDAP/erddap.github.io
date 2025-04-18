"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[729],{14495:(e,a,i)=>{i.r(a),i.d(a,{assets:()=>c,contentTitle:()=>s,default:()=>o,frontMatter:()=>l,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\\\\\[Aceast\u0103 pagin\u0103 web va fi doar de interesERDDAP\u2122administratori care lucreaz\u0103 cu fi\u0219iere EML.","source":"@site/i18n/ro/docusaurus-plugin-content-docs/current/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/ro/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/ro/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/ro/docs/server-admin/display-info"}}');var r=i(74848),n=i(28453);const l={title:"EDDTableFromEML",sidebar_position:6},s="Tabelul EDDFromEML \u0219i tabelul EDDFromEMLBatch Op\u021biuni \xeen set\u0103ri de date generate Xml",c={},d=[{value:"\xcentreb\u0103ri",id:"questions",level:2},{value:"Detalii de proiectare",id:"design-details",level:2},{value:"Un tabel de date devine unulERDDAP\u2122Set de date",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML comparativ cu CF+ACDD",id:"eml-versus-cfacdd",level:3},{value:"Modific\u0103ri minore",id:"small-changes",level:3},{value:"DocBook",id:"docbook",level:3},{value:"Fi\u0219iere de date",id:"data-files",level:3},{value:".zip&#39;d Fi\u0219iere de date",id:"zipd-data-files",level:3},{value:"Tip de stocare",id:"storagetype",level:3},{value:"Unit\u0103\u021bi",id:"units",level:3},{value:"Versiunea EML 2.1.1",id:"eml-version-211",level:3},{value:"Probleme cu fi\u0219ierele EML",id:"issues-with-the-eml-files",level:2},{value:"Coloanele de date \u0219i timp separate",id:"separate-date-and-time-columns",level:3},{value:"Nume de coloan\u0103 inconsecvente",id:"inconsistent-column-names",level:3},{value:"Ordine coloan\u0103 diferit\u0103",id:"different-column-order",level:3},{value:"Incorect numheaderLines",id:"incorrect-numheaderlines",level:3},{value:"numHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"Format de date",id:"datetime-format-strings",level:3},{value:"Data, dar f\u0103r\u0103 fus orar",id:"datetime-but-no-time-zone",level:3},{value:"Lips\u0103missing\\_value",id:"missing-missing_value",level:3},{value:"Probleme mici",id:"small-problems",level:3},{value:"Caractere unicode nevalide",id:"invalid-unicode-characters",level:3},{value:"Unit\u0103\u021bi de coloan\u0103 diferite] (#DiferitColumnUnits)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"Variante diferite ale EML",id:"different-versions-of-eml",level:3},{value:"Probleme la analiza fi\u0219ierului de date",id:"trouble-parsing-the-data-file",level:3}];function u(e){const a={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.header,{children:(0,r.jsx)(a.h1,{id:"tabelul-eddfromeml-\u0219i-tabelul-eddfromemlbatch-op\u021biuni-\xeen-set\u0103ri-de-date-generate-xml",children:"Tabelul EDDFromEML \u0219i tabelul EDDFromEMLBatch Op\u021biuni \xeen set\u0103ri de date generate Xml"})}),"\n",(0,r.jsx)(a.p,{children:"\\[Aceast\u0103 pagin\u0103 web va fi doar de interesERDDAP\u2122administratori care lucreaz\u0103 cu fi\u0219iere EML.\nAcest document a fost creat ini\u021bial \xeen 2016. A fost editat ultima dat\u0103 \xeen 2020-11-30.\\]"}),"\n",(0,r.jsxs)(a.p,{children:[(0,r.jsxs)(a.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:[" ",(0,r.jsx)(a.strong,{children:"ERDDAP\u2122"})," "]}),"este un server de date care ofer\u0103 utilizatorilor un mod simplu, consistent de a desc\u0103rca subseturi de seturi de date \u0219tiin\u021bifice \xeen formate de fi\u0219iere comune \u0219i de a face grafice \u0219i h\u0103r\u021bi.ERDDAP\u2122func\u021bioneaz\u0103 cu un anumit set de date ca fie un grup de variabile multidimensionale \xeen re\u021bea (De exemplu, date satelit sau model) sau ca tabel de baze de date (cu o coloan\u0103 pentru fiecare tip de informa\u021bii \u0219i un r\xe2nd pentru fiecare observa\u021bie) .ERDDAP\u2122este Free and Open Source Software, astfel \xeenc\xe2t oricine poate",(0,r.jsx)(a.a,{href:"/docs/server-admin/deploy-install",children:"desc\u0103rcare \u0219i instalareERDDAP\u2122"}),"pentru a servi datele lor."]}),"\n",(0,r.jsxs)(a.p,{children:["Pentru a ad\u0103uga un set de date la unERDDAP\u2122instalare,ERDDAP\u2122Administratorul trebuie s\u0103 adauge o bucat\u0103 de XML care descrie setul de date la un fi\u0219ier numitdatasets.xml. (Exist\u0103",(0,r.jsx)(a.a,{href:"/docs/server-admin/datasets",children:"documenta\u0163ie complet\u0103 pentrudatasets.xml"}),".) De\u0219i este posibil s\u0103 se genereze bucata de XML pentrudatasets.xml\xeen \xeentregime de m\xe2n\u0103,ERDDAP\u2122vine cu un instrument numit",(0,r.jsxs)(a.a,{href:"/docs/server-admin/datasets#tools",children:[" ",(0,r.jsx)(a.strong,{children:"Genereaz\u0103Seturi de dateXml"})," "]}),"care poate genera proiectul brut al buc\u0103\u021bii de XML necesare pentru un anumit set de date bazat pe o anumit\u0103 surs\u0103 de informa\u021bii despre setul de date."]}),"\n",(0,r.jsxs)(a.p,{children:["Primul lucru Genereaz\u0103DateSeturi Xml \xeentreab\u0103 ce tip de set de date dori\u021bi s\u0103 crea\u021bi. Genereaz\u0103 dateName Xml are o op\u021biune special\u0103, ",(0,r.jsx)(a.strong,{children:"Tabel EDDFromEML"})," , care utilizeaz\u0103 informa\u021biile \xeentr-un",(0,r.jsx)(a.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Limbajul metadatelor ecologice (EML) "}),"Fi\u0219ier XML pentru a genera bucata de XML pentrudatasets.xmlpentru a crea un",(0,r.jsx)(a.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"Tabel EDD din AsciiFiles"}),"Set de date din fiecare tabel de date dintr-un fi\u0219ier EML. Acest lucru func\u021bioneaz\u0103 foarte bine pentru majoritatea fi\u0219ierelor EML, mai ales pentru c\u0103 fi\u0219ierele EML fac o treab\u0103 excelent\u0103 de stocare a tuturor metadatelor necesare pentru un set de date \xeentr-un format u\u0219or de lucrat-cu. Informa\u021biile care Genereaz\u0103DatesetsXml trebuie s\u0103 creeze seturile de date este \xeen fi\u0219ierul EML, inclusiv URL-ul pentru fi\u0219ierul de date, care Genereaz\u0103DatesetsXml desc\u0103rc\u0103ri, parses, \u0219i se compar\u0103 cu descrierea din fi\u0219ierul EML. (Multe grupuri ar face bine s\u0103 treac\u0103 la EML, care este un sistem mare pentru documentarea oric\u0103rui set de date \u0219tiin\u021bifice tabulare, nu doar date ecologice. \u0218i multe grupuri care creeaz\u0103 scheme XML ar face bine s\u0103 utilizeze EML ca un studiu de caz pentru schema XML care sunt clare, la punctul, nu excesiv de ad\xe2nc (\u0219i anume, prea multe niveluri) , \u0219i u\u0219or pentru oameni \u0219i calculatoare s\u0103 lucreze cu .)"]}),"\n",(0,r.jsx)(a.h2,{id:"questions",children:"\xcentreb\u0103ri"}),"\n",(0,r.jsx)(a.p,{children:"Aici sunt toate \xeentreb\u0103rile Genereaz\u0103DateSeturi Xml va \xeentreba, cu comentarii despre modul \xeen care ar trebui s\u0103 r\u0103spund\u0103 dac\u0103 dori\u021bi s\u0103 procesa\u021bi doar un fi\u0219ier EML sau un lot de fi\u0219iere EML:"}),"\n",(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsx)(a.p,{children:"Care EDDType?\nDac\u0103 dori\u021bi s\u0103 procesa\u021bi doar un fi\u0219ier, r\u0103spunde\u021bi: EDDTABLEFromEML\nDac\u0103 dori\u021bi s\u0103 procesa\u021bi un grup de fi\u0219iere, r\u0103spunde\u021bi: EDDtableFromEMLBatch"}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsx)(a.p,{children:"Director pentru a stoca fi\u0219iere?\nIntroduce\u021bi numele dosarului care va fi utilizat pentru a stoca fi\u0219ierele EML \u0219i/sau date desc\u0103rcate.\nDac\u0103 directorul nu exist\u0103, va fi creat."}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsx)(a.p,{children:"(Pentru tabelul EDDFromEML numai) URL EML sau nume de fi\u0219ier local?\nIntroduce\u021bi URL-ul sau numele de fi\u0219ier local al unui fi\u0219ier EML."}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsxs)(a.p,{children:["(Numai pentru tabelul EDDFromEMLBatch) EML dir (URL sau locale) ?\nIntroduce\u021bi numele dosarului cu fi\u0219ierele EML (un URL sau un dir local) .\nDe exemplu: ",(0,r.jsx)(a.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsx)(a.p,{children:"(Numai pentru tabelul EDDFromEMLBatch) Numele fi\u0219ierului regex?\nIntroduce\u021bi expresia regulat\u0103 care va fi utilizat pentru a identifica fi\u0219ierele EML dorite \xeen directorul EML.\nDe exemplu: knb-lter-sbc\\.\\d."}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsx)(a.p,{children:"Utiliza\u021bi fi\u0219ierele locale dac\u0103 sunt prezente (Adev\u0103rat.|fals) ?\nIntroduce\u021bi adev\u0103rat pentru a utiliza fi\u0219ierele EML locale existente \u0219i fi\u0219iere de date, dac\u0103 acestea exist\u0103.\nIntroduce\u021bi fals pentru a re-downloada \xeentotdeauna fi\u0219ierele EML \u0219i/sau fi\u0219ierele de date."}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsxs)(a.p,{children:['accesibil La?\nDac\u0103 dori\u021bi ca noile seturi de date s\u0103 fie seturi de date private \xeenERDDAP, specific\u0103 numele grupului (s) care va avea acces.\nRecomandat pentru grupurile LTER: combina "lter" plus grupul, de exemplu, lter SBC.\nDac\u0103 introduce\u021bi "null," nu va fi nici<accesibil To> eticheta \xeen ie\u0219ire.\nVezi?',(0,r.jsx)(a.a,{href:"/docs/server-admin/datasets#accessibleto",children:"accesibil La"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(a.li,{children:["\n",(0,r.jsxs)(a.p,{children:["locale TimeZone (De exemplu, SUA/Pacific) ?\nDac\u0103 o variabil\u0103 temporal\u0103 indic\u0103 faptul c\u0103 are valori locale ale timpului, aceast\u0103 fus orar va fi atribuit.\nAceasta trebuie s\u0103 fie o valoare de la",(0,r.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"Lista coloanelor TZ a numelor fusului orar"}),'.\nObserva\u021bi toate numele u\u0219or de utilizat "US/..." de la sf\xe2r\u0219itul listei.\nDac\u0103 mai t\xe2rziu g\u0103si\u021bi c\u0103 a fi incorect, pute\u021bi schimbatime\\_zone\xeen bucat\u0103 dedatasets.xml.']}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(a.p,{children:["EML plusERDDAP\u2122este o combinatie mare, deoareceERDDAP\u2122poate oferi utilizatorilor acces mai direct la bog\u0103\u021bia de",(0,r.jsx)(a.a,{href:"https://knb.ecoinformatics.org/",children:"Re\u0163eaua de cunoa\u015ftere pentru biocomplexitate (KNB) "}),"\u015fi",(0,r.jsx)(a.a,{href:"https://lternet.edu/",children:"Cercetare ecologic\u0103 pe termen lung (LTER) "}),"date \u0219i ajut\u0103 aceste proiecte s\u0103 \xeendeplineasc\u0103 cerin\u021bele guvernului SUA",(0,r.jsx)(a.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Accesul public la rezultatele cercet\u0103rii (PARR) Cerin\u021be"}),"prin punerea la dispozi\u021bie a datelor prin intermediul unui serviciu web. De asemenea, EML plusERDDAP\u2122pare a fi un pod mare \xeentre oamenii de \u0219tiin\u021b\u0103 \xeen domeniul academic / NSF-finan\u021bate \u0219i oamenii de \u0219tiin\u021b\u0103 \xeen agen\u021bia federal\u0103 (NOAA, NASA, USGS) T\u0103r\xe2mul."]}),"\n",(0,r.jsxs)(a.p,{children:["A se vedea noastre",(0,r.jsx)(a.a,{href:"/docs/intro#support",children:"sec\u021biunea privind ob\u021binerea de sprijin suplimentar"}),".\n\xa0"]}),"\n",(0,r.jsx)(a.h2,{id:"design-details",children:"Detalii de proiectare"}),"\n",(0,r.jsx)(a.p,{children:"Aici sunt detaliile de proiectare ale op\u021biunii EDDTabelulFromEML \xeen GenerateDatesetsXml.\nUnele sunt legate de diferen\u021be \xeen modul \xeen care EML \u0219iERDDAP\u2122face lucruri \u0219i cum Genereaz\u0103Datesets Xml se ocup\u0103 cu aceste probleme."}),"\n",(0,r.jsx)(a.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"Un tabel de date devine unulERDDAP\u2122Set de date"}),"\n",(0,r.jsxs)(a.p,{children:["Un fi\u0219ier EML poate avea mai multe<date Tabel>s.ERDDAP\u2122face unulERDDAP\u2122Set de date pentru EML Tabel. \u0103datasetIDpentru setul de date este\n",(0,r.jsx)(a.em,{children:"EMLName"})," \\_t ",(0,r.jsx)(a.em,{children:"Num\u0103r tabel"}),"   (atunci c\xe2nd EMLname este text) sau\n",(0,r.jsx)(a.em,{children:"sistem\\_EMLName"})," \\_t ",(0,r.jsx)(a.em,{children:"Num\u0103r tabel"}),"   (atunci c\xe2nd EMLname este un num\u0103r) .\nDe exemplu, tabelul #1 \xeen fi\u0219ierul knb-lter-sbc.28, devineERDDAP\u2122 datasetID= knb\\_lter\\_sbc\\_28\\_t1,\n\xa0"]}),"\n",(0,r.jsx)(a.h3,{id:"eml-versus-cfacdd",children:"EML comparativ cu CF+ACDD"}),"\n",(0,r.jsxs)(a.p,{children:["Aproape toate metadatele din fi\u0219ierele EML devine \xeenERDDAP, dar \xeentr-un format diferit.ERDDAP\u2122utilizeaz\u0103",(0,r.jsx)(a.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"CF"}),"\u015fi",(0,r.jsx)(a.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"ACDD"}),"standarde privind metadatele. Acestea sunt sisteme de metadate complementare care utilizeaz\u0103 perechi cheie = valori pentru metadate globale \u0219i pentru metadatele fiec\u0103rei variabile.\nDa, reprezentarea EML a metadatelor este mai frumoas\u0103 dec\xe2t reprezentarea CF+ACDD. Nu sugerez utilizarea reprezent\u0103rii CF+ACDD ca un \xeenlocuitor pentru EML. G\xe2ndi\u021bi-v\u0103 la CF+ACDD ca parte a podului de la lumea EML laOPeNDAP/CF/ACDD lume.\n\xa0"]}),"\n",(0,r.jsx)(a.h3,{id:"small-changes",children:"Modific\u0103ri minore"}),"\n",(0,r.jsx)(a.p,{children:"ERDDAP\u2122face o mul\u021bime de mici schimb\u0103ri. De exemplu,ERDDAP\u2122utilizeaz\u0103 EML non-DOIalternator Identificatorul plus un num\u0103r de tabel de dateERDDAP\u2122 datasetID, dar u\u015for se schimb\u0103 alternativ Identificator pentru a face din acesta un nume variabil valabil \xeen majoritatea limbilor computerizate, de exemplu date knb-lter-sbc.33 Tabelul #1 devine knb\\_lter\\_sbc\\_33\\_t1.\n\xa0"}),"\n",(0,r.jsx)(a.h3,{id:"docbook",children:"DocBook"}),"\n",(0,r.jsx)(a.p,{children:"EML folose\u0219te sistemul de marcare al DocBook pentru a asigura structura blocurilor de text din fi\u0219ierele EML. CF \u0219i ACDD impun ca metadatele s\u0103 fie text simplu. Genereaz\u0103 date Xml converte\u0219te textul marcat \xeen text simplu care arat\u0103 ca versiunea formatat\u0103 a textului. Etichetele de linie sunt igienizate cu paranteze p\u0103trate, de exemplu,\\[accentuat\\], \u0219i l\u0103sat \xeen textul simplu.\n\xa0"}),"\n",(0,r.jsx)(a.h3,{id:"data-files",children:"Fi\u0219iere de date"}),"\n",(0,r.jsx)(a.p,{children:"Deoarece tabelul de date EML include URL-ul fi\u0219ierului de date real, GenerateDatesets Xml va:"}),"\n",(0,r.jsxs)(a.ol,{children:["\n",(0,r.jsx)(a.li,{children:"Desc\u0103rca\u0163i fi\u015fierul de date."}),"\n",(0,r.jsx)(a.li,{children:"P\u0103stra\u021bi-l \xeen acela\u0219i director ca fi\u0219ierul EML."}),"\n",(0,r.jsx)(a.li,{children:"Cite\u015fte datele."}),"\n",(0,r.jsx)(a.li,{children:"Compara\u021bi descrierea datelor din EML cu datele reale din fi\u0219ier."}),"\n",(0,r.jsx)(a.li,{children:"Dac\u0103 Genereaz\u0103 date Xml g\u0103se\u0219te diferen\u021be, se ocup\u0103 cu ele, sau \xeentreab\u0103 operatorul dac\u0103 diferen\u021bele sunt \xeen regul\u0103, sau returneaz\u0103 un mesaj de eroare. Detaliile sunt \xeen diferite articole de mai jos.\n\xa0"}),"\n"]}),"\n",(0,r.jsx)(a.h3,{id:"zipd-data-files",children:".zip'd Fi\u0219iere de date"}),"\n",(0,r.jsxs)(a.p,{children:["Dac\u0103 fi\u0219ierul cu date de referin\u021b\u0103 este a.zipDosarul trebuie s\u0103 con\u0163in\u0103 un singur dosar. Acest fi\u0219ier va fi utilizat pentruERDDAP\u2122Set de date. Dac\u0103 exist\u0103 mai mult de 1 fi\u0219ier.ERDDAP\u2122va respinge acest set de date. Dac\u0103 este necesar, acest lucru ar putea fi modificat. (\xcen practic\u0103, toate fi\u0219ierele SBC LTER zip au doar un fi\u0219ier de date.)",(0,r.jsx)(a.br,{}),"\n","\xa0"]}),"\n",(0,r.jsx)(a.h3,{id:"storagetype",children:"Tip de stocare"}),"\n",(0,r.jsx)(a.p,{children:"Dac\u0103 depozitarea unei coloane Tipul nu este specificat,ERDDAP\u2122folose\u0219te cea mai bun\u0103 presupunere pe baza datelor din fi\u0219ierul de date. Acest lucru func\u021bioneaz\u0103 destul de bine.\n\xa0"}),"\n",(0,r.jsx)(a.h3,{id:"units",children:"Unit\u0103\u021bi"}),"\n",(0,r.jsxs)(a.p,{children:["ERDDAP\u2122utiliz\u0103ri",(0,r.jsx)(a.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITSformatare pentru unit\u0103\u021bi"}),'. Genereaz\u0103 dateName Xml este capabil de a converti unit\u0103\u021bile EML laUDUNITScurat aproximativ 95% din timp. Restul de 5% rezult\u0103 \xeentr-o descriere lizibil\u0103 a unit\u0103\u021bilor, de exemplu, "biomassDensityUnitPerAbundanceUnit" \xeen EML devine "unitate de densitate a biomasei per unitate de abunden\u021b\u0103" \xeenERDDAP. Tehnic, acest lucru nu este permis. Nu cred c\u0103 e at\xe2t de r\u0103u \xeen aceste circumstan\u0163e.\\[Dac\u0103 este necesar, unit\u0103\u021bile care nu pot fi realizateUDUNITScompatibil ar putea fi mutat la atributul de comentariu al variabilei.\\]',(0,r.jsx)(a.br,{}),"\n","\xa0"]}),"\n",(0,r.jsx)(a.h3,{id:"eml-version-211",children:"Versiunea EML 2.1.1"}),"\n",(0,r.jsx)(a.p,{children:"Acest suport pentru fi\u0219iere EML v2.1.1 a fost ad\u0103ugat la GenerateDatasets Xml \xeen 2016 cu speran\u021ba c\u0103 va exista o anumit\u0103 absorb\u021bie \xeen comunitatea EML. Din 2020, acest lucru nu s-a \xeent\xe2mplat. \u0103ERDDAP\u2122dezvoltatorii ar fi bucuro\u0219i s\u0103 adauge suport pentru versiunile mai recente ale EML, dar numai \xeen cazul \xeen care noile caracteristici vor fi utilizate efectiv. V\u0103 rug\u0103m s\u0103 e-mailerd.data at noaa.govdac\u0103 dori\u021bi sprijin pentru versiuni mai recente ale EML \u0219i va folosi de fapt aceast\u0103 caracteristic\u0103.\n\xa0"}),"\n",(0,r.jsx)(a.h2,{id:"issues-with-the-eml-files",children:"Probleme cu fi\u0219ierele EML"}),"\n",(0,r.jsx)(a.p,{children:"Exist\u0103 unele probleme/probleme cu fi\u0219ierele EML care cauzeaz\u0103 probleme atunci c\xe2nd un client software (cum ar fi op\u021biunea EDDTabelFromEML \xeen GenerateDatesetsXML) \xeencearc\u0103 s\u0103 interpreteze/proceseze fi\u0219ierele EML."}),"\n",(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsx)(a.li,{children:"De\u0219i exist\u0103 mai multe probleme enumerate aici, acestea sunt \xeen mare parte mici, probleme rezolvabile. \xcen general, EML este un sistem mare \u0219i a fost pl\u0103cerea mea de a lucra cu ea."}),"\n",(0,r.jsx)(a.li,{children:"Acestea sunt sortate aproximativ de la cel mai r\u0103u / cel mai comun la cel mai pu\u021bin r\u0103u / mai pu\u021bin frecvente."}),"\n",(0,r.jsx)(a.li,{children:"Cele mai multe sunt legate de mici probleme \xeen anumite fi\u0219iere EML (care nu sunt vina lui EML) ."}),"\n",(0,r.jsx)(a.li,{children:"Majoritatea pot fi fixate prin simple modific\u0103ri ale fi\u0219ierului EML sau a fi\u0219ierului de date."}),"\n",(0,r.jsx)(a.li,{children:"Av\xe2nd \xeen vedere c\u0103 oamenii LTER construiesc un checker EML pentru a testa valabilitatea fi\u0219ierelor EML, am ad\u0103ugat c\xe2teva sugestii mai jos cu privire la caracteristicile care ar putea fi ad\u0103ugate la checker."}),"\n"]}),"\n",(0,r.jsx)(a.p,{children:"Iat\u0103 problemele:"}),"\n",(0,r.jsx)(a.h3,{id:"separate-date-and-time-columns",children:"Coloanele de date \u0219i timp separate"}),"\n",(0,r.jsx)(a.p,{children:"Unele fi\u015fiere de date au coloane separate pentru data \u015fi pentru timp, dar nici o coloan\u0103 dat\u0103 + or\u0103 unificat\u0103. \xcen prezent, Genereaz\u0103 date Xml creeaz\u0103 un set de date cu aceste coloane separate, dar nu este ideal pentru c\u0103:"}),"\n",(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsx)(a.li,{children:'Este cel mai bine dac\u0103 seturile de date \xeenERDDAP\u2122au o dat\u0103 + or\u0103 combinat\u0103 coloan\u0103 numit\u0103"time".'}),"\n",(0,r.jsx)(a.li,{children:'Adesea, setul de date nu se \xeencarc\u0103ERDDAP\u2122pentru c\u0103"time"coloana nu are date data + ora.'}),"\n"]}),"\n",(0,r.jsx)(a.p,{children:"Exist\u0103 dou\u0103 solu\u0163ii posibile:"}),"\n",(0,r.jsxs)(a.ol,{children:["\n",(0,r.jsx)(a.li,{children:"Editeaz\u0103 fi\u0219ierul de date surs\u0103 pentru a ad\u0103uga o coloan\u0103 nou\u0103 \xeen fi\u0219ierul de date (\u0219i descrie-l \xeen EML) atunci c\xe2nd coloanele de date \u0219i de timp sunt fuzionate \xeentr-o singur\u0103 coloan\u0103. Apoi rerula\u021bi GenerateDateName Xml astfel \xeenc\xe2t s\u0103 g\u0103seasc\u0103 noua coloan\u0103."}),"\n",(0,r.jsxs)(a.li,{children:["Utiliza\u0163i",(0,r.jsx)(a.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Variabile derivate"}),"caracteristic\u0103 \xeenERDDAP\u2122definirea unei noi variabile \xeendatasets.xmlcare este creat prin concatenare a datei \u0219i a coloanelor de timp. Unul dintre exemple se refer\u0103 \xeen mod specific la aceast\u0103 situa\u021bie.\n\xa0"]}),"\n"]}),"\n",(0,r.jsx)(a.h3,{id:"inconsistent-column-names",children:"Nume de coloan\u0103 inconsecvente"}),"\n",(0,r.jsx)(a.p,{children:"Fi\u0219ierele EML enumer\u0103 coloanele fi\u0219ierului de date \u0219i numele acestora. Din p\u0103cate, acestea sunt adesea diferite de numele coloanei din fi\u0219ierul de date reale. \xcen mod normal, ordinea coloanei din fi\u0219ierul EML este aceea\u0219i cu ordinea coloanei din fi\u0219ierul de date, chiar dac\u0103 numele variaz\u0103 u\u0219or, dar nu \xeentotdeauna. Genereaz\u0103 dateName Xml \xeencearc\u0103 s\u0103 se potriveasc\u0103 cu numele coloanei. C\xe2nd nu se poate (care este frecvent\u0103) , se va opri, v\u0103 arat\u0103 EML / perechi de nume de fi\u0219iere de date, \u0219i \xeentreba\u021bi dac\u0103 acestea sunt aliniate corect. Dac\u0103 introduce\u021bi 's' pentru a s\u0103ri peste o mas\u0103, GenerateDatasetsXml va imprima un mesaj de eroare \u0219i du-te la masa urm\u0103toare.\nSolu\u021bia este de a modifica numele gre\u0219ite ale coloanei din fi\u0219ierul EML pentru a se potrivi cu numele coloanei din fi\u0219ierul de date.\n\xa0"}),"\n",(0,r.jsx)(a.h3,{id:"different-column-order",children:"Ordine coloan\u0103 diferit\u0103"}),"\n",(0,r.jsx)(a.p,{children:"Exist\u0103 mai multe cazuri \xeen care EML a specificat coloanele \xeentr-o ordine diferit\u0103 dec\xe2t exist\u0103 \xeen fi\u0219ierul de date. Genereaz\u0103 dateName Xml se va opri \u0219i va \xeentreba operatorul dac\u0103 meciurile sunt \xeen regul\u0103 sau dac\u0103 setul de date ar trebui s\u0103 fie omis. Dac\u0103 este omis, va exista un mesaj de eroare \xeen fi\u0219ierul cu rezultate, de exemplu:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n      datasetID=knb\\\\_lter\\\\_sbc\\\\_17\\\\_t1\n      dataFile=all\\\\_fish\\\\_all\\\\_years\\\\_20140903.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        SURVEY\\\\_TIMING        = notes\n        NOTES                = survey\\\\_timing\n      --&gt;\n"})}),"\n",(0,r.jsx)(a.p,{children:"Solu\u021bia este de a fixa ordinea coloanei \xeen aceste fi\u0219iere EML, astfel \xeenc\xe2t acestea s\u0103 se potriveasc\u0103 cu ordinea din fi\u0219ierele de date."}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML verificat c\u0103 coloanele \u0219i ordinea coloanei \xeen fi\u0219ierul surs\u0103 se potrivesc coloane \u0219i ordine coloan\u0103 \xeen fi\u0219ierul EML."}),"\n",(0,r.jsx)(a.h3,{id:"incorrect-numheaderlines",children:"Incorect numheaderLines"}),"\n",(0,r.jsx)(a.p,{children:"Mai multe date Tabelele numHeaderLines=1, de exemplu, ...sf.4011. Acest lucru cauzeaz\u0103ERDDAP\u2122s\u0103 citeasc\u0103 prima linie de date ca nume de coloane. Am \xeencercat manual s\u0103 SKIP toate aceste tabele de date. Acestea sunt evidente, deoarece numele surs\u0103 col ne\xeencheiat sunt toate valorile de date. \u0218i dac\u0103 exist\u0103 fi\u0219iere care au incorect numHeaderLines=0, sistemul meu nu face evident. Iat\u0103 un exemplu din dosarul SBC LTER:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3017\\\\_t1\n      dataFile=MC06\\\\_allyears\\\\_2012-03-03.txt\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        2008-10-01T00:00     = timestamp\\\\_local\n        2008-10-01T07:00     = timestamp\\\\_UTC\n        2.27                 = discharge\\\\_lps\n        -999.0               = water\\\\_temperature\\\\_celsius\n      --&gt;\n"})}),"\n",(0,r.jsx)(a.p,{children:"Deci eroarea poate ap\u0103rea ca \u0219i cum GenerateDatasets Xml crede c\u0103 prima linie cu date din fi\u0219ier (De exemplu, cu 2008-10-01T00:00 etc.) este linia cu numele coloanei (ca \u0219i cum 2008-10-01T00:00 ar fi un nume de coloan\u0103) ."}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML verificat valoarea numHeaderLines."}),"\n",(0,r.jsx)(a.h3,{id:"numheaderlines--0",children:"numHeaderLines = 0"}),"\n",(0,r.jsx)(a.p,{children:"Unele fi\u015fiere surs\u0103 nu au nume de coloan\u0103.ERDDAP\u2122accept\u0103 c\u0103, \xeen cazul \xeen care EML descrie acela\u0219i num\u0103r de coloane."}),"\n",(0,r.jsx)(a.p,{children:"\xcen opinia mea, acest lucru pare foarte periculos. Ar putea fi coloane \xeentr-o ordine diferit\u0103 sau cu diferite unit\u0103\u021bi (vezi mai jos) \u0218i nu exist\u0103 nici o modalitate de a prinde aceste probleme. Este mult mai bine dac\u0103 toate fi\u0219ierele de date ASCII au un r\xe2nd cu numele coloanei."}),"\n",(0,r.jsx)(a.h3,{id:"datetime-format-strings",children:"Format de date"}),"\n",(0,r.jsxs)(a.p,{children:["EML are un mod standard de a descrie formatele de date. dar exist\u0103 o varia\u021bie considerabil\u0103 \xeen utilizarea sa \xeen fi\u0219ierele EML. (M-am \xeen\u015felat \xeen leg\u0103tur\u0103 cu asta. V\u0103d documenta\u021bia EML pentru format String care pare s\u0103 se potriveasc\u0103",(0,r.jsx)(a.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"JavaDataTimeFormatery"}),", dar care nu are liniile directoare importante cu privire la utilizarea sa, cu rezultatul c\u0103 formatString este adesea / de obicei folosit necorespunz\u0103tor.) Exist\u0103 mai multe cazuri cu caz incorect \u0219i/sau suprapunere incorect\u0103 a unei litere \u0219i/sau formatare nestandardizat\u0103. Asta pune o povar\u0103 nerezonabil\u0103 asupra clien\u021bilor, \xeen special clientilor software cum ar fi GenerateDatasetsXml. Genereaz\u0103 dateName Xml \xeencearc\u0103 s\u0103 transforme formatele definite incorect \xeen fi\u0219ierele EML\n",(0,r.jsx)(a.a,{href:"/docs/server-admin/datasets#string-time-units",children:"data/ora \xeen careERDDAP\u2122necesit\u0103"}),", care este aproape identic cu pentruJava/Joda format timp specifica\u021bie, dar este pu\u021bin mai iert\u0103tor."]}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML necesit\u0103 respectarea strict\u0103 aJavaJodaERDDAPspecifica\u021biile unit\u0103\u021bilor de timp \u0219i au verificat dac\u0103 valorile timpului de dat\u0103 din tabelul de date ar putea fi m\u0103surate corect cu formatul specificat."}),"\n",(0,r.jsx)(a.h3,{id:"datetime-but-no-time-zone",children:"Data, dar f\u0103r\u0103 fus orar"}),"\n",(0,r.jsx)(a.p,{children:'Genereaz\u0103 dateName Xml caut\u0103 o coloan\u0103 cu data Timpul \u0219i o anumit\u0103 fus orar (fieZulu: din unit\u0103\u021bi de timp care se termin\u0103 \xeen "Z" sau o denumire a coloanei sau o defini\u021bie a atributului care include "gmt" sau "utc" sau local\u0103: de la "local" \xeen denumirea coloanei sau defini\u021bia atributului) . De asemenea, acceptabil este un fi\u0219ier cu o coloan\u0103 dat\u0103, dar nu coloan\u0103 de timp. De asemenea, acceptabil este un fi\u0219ier f\u0103r\u0103 informa\u021bii data sau ora.'}),"\n",(0,r.jsx)(a.p,{children:'Genereaz\u0103 dateName Xml trateaz\u0103 toate "local" ori ca fiind din fusul orar pe care le pute\u021bi specifica pentru un anumit lot de fi\u0219iere, de exemplu, pentru SBC LTER, utiliza\u021bi US/Pacific. Informa\u021biile sunt uneori \xeen comentarii, dar nu \xeentr-o form\u0103 care este u\u0219or pentru un program de calculator pentru a da seama.'}),"\n",(0,r.jsx)(a.p,{children:'Fi\u0219ierele care nu \xeendeplinesc acest criteriu sunt respinse cu mesajul "NU DATA BUN\u0102 (TIMP) Variabil." Problemele comune sunt:'}),"\n",(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsx)(a.li,{children:"Exist\u0103 o coloan\u0103 cu date \u0219i o coloan\u0103 cu ore, dar nu data Coloana timpului."}),"\n",(0,r.jsx)(a.li,{children:"Sunt unit\u0103\u0163i de timp, dar fusul orar nu este specificat."}),"\n"]}),"\n",(0,r.jsxs)(a.p,{children:['Alte observa\u021bii:\nDac\u0103 exist\u0103 o dat\u0103 bun\u0103 + timp cu coloana fus orar, acea coloan\u0103 va fi numit\u0103"time"\xeenERDDAP.ERDDAP\u2122cere ca datele din coloana timpului s\u0103 fie u\u0219or de \xeen\u021beles/convertibileZulu/UTC/GMT data fusului orarTimes.\\[Credinta mea este: folosind ora locala si diferite formate data/ora (2 cifre ani! mm/zz/yy vs dd/mm/yy vs ...) \xeen fi\u015fierele de date for\u0163eaz\u0103 utilizatorul final s\u0103 fac\u0103 conversii complicate laZulutimp pentru a compara datele dintr-un set de date cu datele de la altul. Deci...ERDDAP\u2122standardizeaz\u0103 toate datele din timp: Pentru orele de coarde,ERDDAP\u2122utilizeaz\u0103 \xeentotdeauna ISO 8601:2004 (E) format standard, de exemplu, 1985-01-02T 00:00:00Z. Pentru perioade numerice,ERDDAP\u2122\xeentotdeauna folose\u0219te"seconds since 1970-01-01T00:00:00Z".ERDDAP\u2122Folose\u015fte \xeentotdeaunaZulu  (UTC, GMT) fusul orar pentru a elimina dificult\u0103\u021bile de lucru cu diferite zone de timp \u0219i timp standard fa\u021b\u0103 de timpul de var\u0103. Genereaz\u0103 date Xml caut\u0103 o coloan\u0103 de date EML cu data + oraZulu. Acest lucru este greu, deoarece EML nu utilizeaz\u0103 un vocabular / sistem formal (ca',(0,r.jsx)(a.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"JavaFormat timp / Joda"}),') pentru specificarea datelor Format timp:\nDac\u0103 exist\u0103 un col cu valori numerice ale timpului (de exemplu,Matlabori) \u015fiZulufus orar (sau doar date, f\u0103r\u0103 coloane temporale) , este utilizat ca"time".\nDac\u0103 exist\u0103 un col cu date privind data \u015fi ora, utiliz\xe2ndZulufusul orar, este utilizat ca"time"\u0219i orice alt\u0103 dat\u0103 sau coloan\u0103 de timp este eliminat\u0103.\n\xcen caz contrar, dac\u0103 se g\u0103se\u0219te un col cu date exacte, acesta este utilizat ca"time"variabil\u0103 (f\u0103r\u0103 fus orar) .\nDac\u0103 exist\u0103 o coloan\u0103 de date \u0219i o coloan\u0103 de timp \u0219i nicio dat\u0103 combinat\u0103 Setul de date este respins, dar setul de date poate fi utilizat prin ad\u0103ugarea unei date combinate Coloana temporal\u0103 (preferabil,Zulufusul orar) la fi\u0219ierul de date \u0219i ad\u0103ugarea descrierii sale \xeen fi\u0219ierul EML.\nEXEMPLU DE LA SBC LTER:',(0,r.jsx)(a.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"Tabelul de date #2."]}),"\n",(0,r.jsxs)(a.p,{children:["Ar fi frumos dac\u0103 EML/LTER ar solicita includerea unei coloane cuZulu  (UTC, GMT) timp de timp \xeen toate fi\u0219ierele relevante de date surs\u0103. Urm\u0103torul cel mai bun este de a ad\u0103uga un sistem la EML pentru a specifica otime\\_zoneatribut folosind nume standard (de la",(0,r.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"Coloana TZ"}),") ."]}),"\n",(0,r.jsx)(a.h3,{id:"missing-missing_value",children:"Lips\u0103missing\\_value"}),"\n",(0,r.jsx)(a.p,{children:"Unele coloane folosesc unmissing\\_valuedar nu-l lista\u021bi \xeen metadatele EML, de exemplu, precipita\u021bii\\_mm \xeen knb-lter-sbc.5011 folose\u0219te -999. \xcen cazul \xeen care nicio valoare lips\u0103 nu este specificat\u0103 \xeen EML, GenerateDatasetsXml caut\u0103 automat valori comune lips\u0103 (de exemplu 99, -99, 999, -999, 9999, -9999, etc.) \u015fi creeaz\u0103 aceste metadate. Dar alte lipsestemissing\\_valueNu sunt prin\u015fi."}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML uitat pentru lips\u0103missing\\_valuec."}),"\n",(0,r.jsx)(a.h3,{id:"small-problems",children:"Probleme mici"}),"\n",(0,r.jsx)(a.p,{children:"Sunt multe probleme mici. (ortografie, punctua\u0163ie) care va fi probabil g\u0103sit\u0103 doar de un om care inspecteaz\u0103 fiecare set de date."}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML ar c\u0103uta ortografie \u0219i erori gramaticale. Aceasta este o problem\u0103 dificil\u0103, deoarece cuvintele din \u0219tiin\u021b\u0103 sunt adesea marcate de dame de vraj\u0103. Editarea uman\u0103 este probabil necesar\u0103."}),"\n",(0,r.jsx)(a.h3,{id:"invalid-unicode-characters",children:"Caractere unicode nevalide"}),"\n",(0,r.jsx)(a.p,{children:"Unele dintre con\u021binutul EML con\u021bine caractere invalide Unicode. Acestea sunt, probabil, caractere din charset Windows care au fost copiate incorect \u0219i lipite \xeen fi\u0219ierele UTF-8 EML. Genereaz\u0103 dateName Xml igienizeaz\u0103 aceste caractere la, de exemplu,\\[#128\\], astfel \xeenc\xe2t acestea sunt u\u0219or de c\u0103utat \xeenERDDAP\u2122 datasets.xmlDosar."}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML verificat pentru asta. Este u\u015for de g\u0103sit \u015fi u\u015for de reparat."}),"\n",(0,r.jsx)(a.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Unit\u0103\u021bi de coloan\u0103 diferite] (#DiferitColumnUnits)"}),"\n",(0,r.jsx)(a.p,{children:'Unele tabele de date EML definesc coloane care nu sunt conforme cu coloanele din fi\u0219ierul de date, \xeen special pentru c\u0103 au unit\u0103\u021bi diferite. Genereaz\u0103 dateName Astea sunt steaguri Xml. Depinde de operator s\u0103 decid\u0103 dac\u0103 diferen\u0163ele sunt \xeen regul\u0103 sau nu. Acestea apar \xeen fi\u0219ierul de e\u0219ecuri sub form\u0103 de tabele de date "SKIPPED." Exemplu \xeen fi\u0219ierul SBC LTER e\u0219ecuri:'}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3\\\\_t1\n      dataFile=SBCFC\\\\_Precip\\\\_Daily\\\\_active\\\\_logger.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        Daily\\\\_Precipitation\\\\_Total\\\\_mm = Daily\\\\_Precipitation\\\\_Total\\\\_inch\n        Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_mm = Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_inch\n      --\x3e\n"})}),"\n",(0,r.jsx)(a.p,{children:"Ar fi frumos dac\u0103 checker EML verificat c\u0103 unit\u0103\u021bile se potrivesc. Din p\u0103cate, acest lucru este, probabil, imposibil de prins \u0219i apoi imposibil de rezolvat f\u0103r\u0103 a contacta creatorul de seturi de date, av\xe2nd \xeen vedere c\u0103 fi\u0219ierul surs\u0103 nu include unit\u0103\u021bi. Discrepan\u021ba de exemplu de mai sus a fost vizibil\u0103 numai deoarece unit\u0103\u021bile au fost incluse \xeen denumirea coloanei surs\u0103 \u0219i numele coloanei EML. C\xe2te alte tabele de date au aceast\u0103 problem\u0103, dar sunt nedetectabile?"}),"\n",(0,r.jsx)(a.h3,{id:"different-versions-of-eml",children:"Variante diferite ale EML"}),"\n",(0,r.jsx)(a.p,{children:"Genereaz\u0103 dateName Xml este conceput pentru a lucra cu EML 2.1.1. Alte versiuni de EML va func\u021biona \xeen m\u0103sura \xeen care acestea se potrivesc 2.1.1 sau c\u0103 GenerateDateSetsXml are cod special pentru a face fa\u021b\u0103 cu ea. Aceasta este o problem\u0103 rar\u0103. C\xe2nd apare, solu\u021bia este de a converti fi\u0219ierele la EML 2.1.1, sau trimite fi\u0219ierul EML laerd.data at noaa.gov, astfel \xeenc\xe2t s\u0103 pot face modific\u0103ri la GenerateDatasets Xml pentru a face fa\u021b\u0103 diferen\u021belor."}),"\n",(0,r.jsx)(a.p,{children:"Bob a ad\u0103ugat suport pentru fi\u0219iere EML la GenerateDatasets Xml \xeen 2016 cu speran\u021ba c\u0103 va exista o anumit\u0103 absorb\u021bie \xeen comunitatea EML. Din 2020, acest lucru nu s-a \xeent\xe2mplat. Bob este fericit pentru a ad\u0103uga suport pentru versiuni mai recente de EML, dar numai \xeen cazul \xeen care noile caracteristici vor fi utilizate de fapt. V\u0103 rug\u0103m s\u0103 e-mailerd.data at noaa.govdac\u0103 dori\u021bi sprijin pentru versiuni mai recente ale EML \u0219i va folosi de fapt aceast\u0103 caracteristic\u0103."}),"\n",(0,r.jsx)(a.h3,{id:"trouble-parsing-the-data-file",children:"Probleme la analiza fi\u0219ierului de date"}),"\n",(0,r.jsxs)(a.p,{children:['Rar, un tabel de date poate fi respins cu eroarea "num\u0103rul nea\u0219teptat de articole pe linia #120 (observate=52, a\u015fteptate=50) " Un mesaj de eroare ca acesta \xeenseamn\u0103 c\u0103 o linie din fi\u0219ierul de date avea un num\u0103r diferit de valori dec\xe2t celelalte linii. Acesta poate fi o problem\u0103 \xeenERDDAP\u2122  (De exemplu, nu se analizeaz\u0103 corect fi\u0219ierul) sau \xeen dosar. EXEMPLU DE LA SBC LTER:\n',(0,r.jsx)(a.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"Tabelul de date #3, a se vedea fi\u0219ierul de date=LTER\\_lunly\\_bottledata\\_\xeenregistrat\\_sta\u021bii\\_2014044.txt"]})]})}function o(e={}){const{wrapper:a}={...(0,n.R)(),...e.components};return a?(0,r.jsx)(a,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,a,i)=>{i.d(a,{R:()=>l,x:()=>s});var t=i(96540);const r={},n=t.createContext(r);function l(e){const a=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function s(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(n.Provider,{value:a},e.children)}}}]);