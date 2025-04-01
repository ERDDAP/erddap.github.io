"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4612],{28453:(a,n,i)=>{i.d(n,{R:()=>s,x:()=>t});var e=i(96540);const h={},r=e.createContext(h);function s(a){const n=e.useContext(r);return e.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function t(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(h):a.components||h:s(a.components),e.createElement(r.Provider,{value:n},a.children)}},74473:(a,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>c,frontMatter:()=>s,metadata:()=>e,toc:()=>o});const e=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\\\\\[Beidh an leathanach gr\xe9as\xe1in a bheith ach amh\xe1in ar sp\xe9is leoERDDAP\u2122riarth\xf3ir\xed a oibr\xedonn le comhaid EML.","source":"@site/i18n/ga/docusaurus-plugin-content-docs/current/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/ga/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/ga/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/ga/docs/server-admin/display-info"}}');var h=i(74848),r=i(28453);const s={title:"EDDTableFromEML",sidebar_position:6},t="An EDDTableFromEML agus EDDTableFromEMLBatch Roghanna i GenerateDatasets XLUMX",l={},o=[{value:"Ceisteanna agus Questions",id:"questions",level:2},{value:"Naisc go dt\xed su\xedomhanna eile",id:"design-details",level:2},{value:"Tiocfaidh chun bheith One Sonra\xedERDDAP\u2122Toradh na sonra\xed",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML versus CF + ACD",id:"eml-versus-cfacdd",level:3},{value:"Athruithe Beaga",id:"small-changes",level:3},{value:"D\xe9an teagmh\xe1il",id:"docbook",level:3},{value:"irl - Library Service",id:"data-files",level:3},{value:".zip&#39;d Comhaid Sonra\xed",id:"zipd-data-files",level:3},{value:"tr\xe9imhse saoil: ilbhliant\xfail",id:"storagetype",level:3},{value:"Amharc ar gach eolas",id:"units",level:3},{value:"Leagan EML 2.1.1",id:"eml-version-211",level:3},{value:"Saincheisteanna leis na Comhaid EML",id:"issues-with-the-eml-files",level:2},{value:"D\xe1ta agus am Col\xfain",id:"separate-date-and-time-columns",level:3},{value:"Inconsistent Column Ainmneacha",id:"inconsistent-column-names",level:3},{value:"Ord\xfa Col\xfan \xc9ags\xfala",id:"different-column-order",level:3},{value:"numHeaderLines m\xedcheart",id:"incorrect-numheaderlines",level:3},{value:"numHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"DateTime Form\xe1id Stringsa",id:"datetime-format-strings",level:3},{value:"D\xe1ta Tuairim\xed R\xe9",id:"datetime-but-no-time-zone",level:3},{value:"Ag iarraidhmissing\\_value",id:"missing-missing_value",level:3},{value:"Fadhbanna Beaga",id:"small-problems",level:3},{value:"Carachtair Unicode luachmhar",id:"invalid-unicode-characters",level:3},{value:"Aonaid Chol\xfan \xe9ags\xfala] (clice\xe1il grianghraf a mh\xe9ad\xfa)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"Leaganacha \xe9ags\xfala de EML",id:"different-versions-of-eml",level:3},{value:"Triobl\xf3id Ag Comhbhr\xfa leis an Comhad Sonra\xed",id:"trouble-parsing-the-data-file",level:3}];function d(a){const n={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...a.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(n.header,{children:(0,h.jsx)(n.h1,{id:"an-eddtablefromeml-agus-eddtablefromemlbatch-roghanna-i-generatedatasets-xlumx",children:"An EDDTableFromEML agus EDDTableFromEMLBatch Roghanna i GenerateDatasets XLUMX"})}),"\n",(0,h.jsx)(n.p,{children:"\\[Beidh an leathanach gr\xe9as\xe1in a bheith ach amh\xe1in ar sp\xe9is leoERDDAP\u2122riarth\xf3ir\xed a oibr\xedonn le comhaid EML.\r\nCrutha\xedodh an doicim\xe9ad seo ar dt\xfas in 2016. Rinneadh eagarth\xf3ireacht air go deireanach ar 2020-11-30.\\]"}),"\n",(0,h.jsxs)(n.p,{children:[(0,h.jsxs)(n.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:[" ",(0,h.jsx)(n.strong,{children:"ERDDAP\u2122"})," "]}),"Is freastala\xed sonra\xed a thugann \xfas\xe1ideoir\xed ar bhealach simpl\xed, comhsheasmhach a \xedosl\xf3d\xe1il fo-thacar de gridded agus tabular tacar sonra\xed eola\xedochta i bhform\xe1id\xed comhad coitianta agus graif agus l\xe9arsc\xe1ileanna a dh\xe9anamh.ERDDAP\u2122oibreacha le tacar sonra\xed \xe1irithe mar ghr\xfapa de athr\xf3g greille tr\xedthoiseach (e.g., sonra\xed satail\xedte n\xf3 samhail) n\xf3 mar t\xe1bla bunachar-mhaith (le col\xfan do gach cine\xe1l faisn\xe9ise agus as a ch\xe9ile do gach breathn\xf3ireacht) .ERDDAP\u2122T\xe1 Bogearra\xed Foinse Saor in Aisce agus Oscailte, ionas gur f\xe9idir le duine ar bith",(0,h.jsx)(n.a,{href:"/docs/server-admin/deploy-install",children:"\xedosl\xf3d\xe1il agus a shuite\xe1ilERDDAP\u2122"}),"chun freastal ar a gcuid sonra\xed."]}),"\n",(0,h.jsxs)(n.p,{children:["Chun tacar sonra\xed a chur leisERDDAP\u2122suite\xe1il, anERDDAP\u2122N\xed m\xf3r riarth\xf3ir a chur le smut\xe1n de XML cur s\xedos ar an tacar sonra\xed le comhad ar a dtugtardatasets.xml. (N\xedl ann",(0,h.jsx)(n.a,{href:"/docs/server-admin/datasets",children:"doicim\xe9ad\xfa cr\xedochn\xfail ardatasets.xml"}),".) C\xe9 go bhfuil s\xe9 ind\xe9anta a ghini\xfaint an smut\xe1n de XML dodatasets.xmlgo hioml\xe1n de l\xe1imh,ERDDAP\u2122thagann le uirlis ar a dtugtar",(0,h.jsxs)(n.a,{href:"/docs/server-admin/datasets#tools",children:[" ",(0,h.jsx)(n.strong,{children:"Socraigh mar teanga r\xe9amhshocraithe"})," "]}),"is f\xe9idir a ghini\xfaint an dr\xe9acht garbh ar an smut\xe1n de XML ag teast\xe1il le haghaidh tacar sonra\xed ar leith bunaithe ar roinnt foinse eolais faoin tacar sonra\xed."]}),"\n",(0,h.jsxs)(n.p,{children:["An ch\xe9ad rud GenerateDatasets Xml Iarrann c\xe9n cine\xe1l tacar sonra\xed is mian leat a chruth\xfa. Sonra\xed a ghini\xfaint T\xe1 Xml rogha speisialta, ",(0,h.jsx)(n.strong,{children:"Seirbh\xeds\xed ar l\xedne"})," , a \xfas\xe1ideann an fhaisn\xe9is i",(0,h.jsx)(n.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Teanga meiteashonra\xed \xc9iceola\xedochta (EML) "}),"XML comhad a ghini\xfaint an smut\xe1n de XML dodatasets.xmla chruth\xfa",(0,h.jsx)(n.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"EDDTableFromAsciiFiles"}),"tacar sonra\xed \xf3 gach t\xe1bla sonra\xed i gcomhad EML. Oibr\xedonn s\xe9 seo go han-mhaith le haghaidh an chuid is m\xf3 comhaid EML, den chuid is m\xf3 toisc go bhfuil comhaid EML post den scoth a st\xf3r\xe1il gach ceann de na meiteashonra\xed is g\xe1 le haghaidh tacar sonra\xed i bhform\xe1id \xe9asca-le-obair-le-. Is \xe9 an t-eolas go GinrateDatasetsXml riachtanais a chruth\xfa ar an tacar sonra\xed sa chomhad EML, lena n-\xe1ir\xedtear an URL le haghaidh an comhad sonra\xed, a GinrateDatasetsXml \xedoslucht\xfa, parses, agus i gcompar\xe1id leis an cur s\xedos sa chomhad EML. (Bheadh go leor gr\xfapa\xed a dh\xe9anamh go maith a aistri\xfa chuig EML, a bhfuil c\xf3ras iontach do dhoicim\xe9ad\xfa aon tacar sonra\xed eola\xedochta tabular, n\xed hamh\xe1in sonra\xed \xe9iceola\xedochta. Agus go leor gr\xfapa\xed a chruth\xfa go mbeadh schemas XML dh\xe9anamh go maith a \xfas\xe1id EML mar staid\xe9ar c\xe1s do sc\xe9imre XML at\xe1 soil\xe9ir, go dt\xed an pointe, nach bhfuil r\xf3-doimhne (i.e., leibh\xe9il an iomarca) , agus \xe9asca do dhaoine agus r\xedomhair\xed a bheith ag obair leis.)"]}),"\n",(0,h.jsx)(n.h2,{id:"questions",children:"Ceisteanna agus Questions"}),"\n",(0,h.jsx)(n.p,{children:"Seo iad na ceisteanna go l\xe9ir GenerateDatasets Beidh Xml iarraidh, le tuairim\xed faoi conas ba ch\xf3ir duit a fhreagairt m\xe1s mian leat a phr\xf3ise\xe1il ach amh\xe1in comhad EML n\xf3 bhaisc de chomhaid EML:"}),"\n",(0,h.jsxs)(n.ul,{children:["\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsx)(n.p,{children:"C\xe9n EDDType?\r\nM\xe1s mian leat a phr\xf3ise\xe1il ach comhad amh\xe1in, freagra: EDDTableFromEML\r\nM\xe1s mian leat a phr\xf3ise\xe1il ar ghr\xfapa de chomhaid, freagra: EDDTableFromEMLBatch"}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsx)(n.p,{children:"Eolaire chun comhaid a st\xf3r\xe1il?\r\nCuir isteach an t-ainm ar an eolaire a bheidh in \xfas\xe1id a st\xf3r\xe1il \xedosl\xf3d\xe1il EML agus / n\xf3 comhaid sonra\xed.\r\nM\xe1s rud \xe9 nach bhfuil an eolaire ann, beidh s\xe9 a chruth\xfa."}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsx)(n.p,{children:"(Do EDDTableFromEML ach amh\xe1in) EML URL n\xf3 fileName \xe1iti\xfail?\r\nCuir isteach an URL n\xf3 logainm an comhad EML."}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsxs)(n.p,{children:["(Do EDDTableFromEMLBatch amh\xe1in) EML dir (URL n\xf3 \xe1iti\xfail) ?\r\nCuir isteach an t-ainm ar an eolaire leis na comhaid EML (URL n\xf3 dir \xe1iti\xfail) .\r\nMar shampla: ",(0,h.jsx)(n.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsx)(n.p,{children:"(Do EDDTableFromEMLBatch amh\xe1in) Athr\xf3g Filename?\r\nCuir isteach an abairt rialta a bheidh in \xfas\xe1id a aithint na comhaid EML ag teast\xe1il san eolaire EML.\r\nMar shampla: knb-fosbc\\.\\"}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsx)(n.p,{children:"Bain \xfas\xe1id as comhaid \xe1iti\xfala m\xe1s ann d\xf3ibh (f\xedor f\xedor|foirm duille: oval) ?\r\nIontr\xe1il f\xedor a bhaint as na comhaid EML \xe1iti\xfail agus comhaid sonra\xed at\xe1 ann cheana f\xe9in, m\xe1 t\xe1 siad ann.\r\nIontr\xe1il br\xe9agach a ath-\xedosl\xf3d\xe1il i gc\xf3na\xed ar na comhaid EML agus / n\xf3 comhaid sonra\xed."}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsxs)(n.p,{children:['ar f\xe1il Chun?\r\nM\xe1s mian leat na tacair sonra\xed nua a bheith tacair sonra\xed pr\xedobh\xe1ideacha iERDDAP, sonr\xf3far ainm an ghr\xfapa (s s) a chead\xf3far rochtain.\r\nMolta do ghr\xfapa\xed LTER: cuir "fosf\xe1" le ch\xe9ile m\xf3ide an gr\xfapa, m.sh., lter Sbc .\r\nM\xe1 th\xe9ann t\xfa isteach "null", n\xed bheidh aon<ar f\xe1il Chun & tag san aschur.\r\nF\xe9ach ar',(0,h.jsx)(n.a,{href:"/docs/server-admin/datasets#accessibleto",children:"ar f\xe1il Chun"}),"."]}),"\n"]}),"\n",(0,h.jsxs)(n.li,{children:["\n",(0,h.jsxs)(n.p,{children:["\xe1iti\xfail \xe1iti\xfail tr\xe9imhse de chuid eile: aon (e.g., SAM / Saor) ?\r\nM\xe1 l\xe9ir\xedonn athr\xf3g ama go bhfuil luachanna ama \xe1iti\xfala aige, beidh an crios ama seo a shannadh.\r\nN\xed m\xf3r gur luach \xe9 seo \xf3n",(0,h.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"TZ liosta col\xfan na n-ainmneacha crios ama"}),'.\r\nTabhair faoi deara gach ceann de na hainmneacha "US /..." \xe9asca le h\xfas\xe1id ag deireadh an liosta.\r\nM\xe1 fhaigheann t\xfa n\xedos d\xe9ana\xed go bhfuil a bheith m\xedcheart, is f\xe9idir leat athr\xfa ar antime\\_zonei smut\xe1n dedatasets.xml.']}),"\n"]}),"\n"]}),"\n",(0,h.jsxs)(n.p,{children:["EML m\xf3ideERDDAP\u2122Is measc\xe1n m\xf3r, \xf3s rud \xe9ERDDAP\u2122is f\xe9idir a thabhairt d'\xfas\xe1ideoir\xed rochtain n\xedos d\xedr\xed ar an saibhreas",(0,h.jsx)(n.a,{href:"https://knb.ecoinformatics.org/",children:"L\xedonra Eolais do Biocomplexity (An bhfuil t\xfa) "}),"agus",(0,h.jsx)(n.a,{href:"https://lternet.edu/",children:"Taighde \xc9iceola\xedochta Fadt\xe9armach (Leathanach) "}),"sonra\xed agus cabhr\xfa leis na tionscadail freastal ar rialtas na St\xe1t Aontaithe",(0,h.jsx)(n.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Rochtain Phoibl\xed ar Thortha\xed Taighde (PARR PARR) riachtanais na gcustaim\xe9ir\xed"}),"tr\xed na sonra\xed a chur ar f\xe1il tr\xed sheirbh\xeds gr\xe9as\xe1in. Chomh maith leis sin, EML m\xf3ideERDDAP\u2122cos\xfail le droichead m\xf3r idir eolaithe sa r\xe9imse acad\xfail / NSF-mhaoinithe agus eolaithe sa ghn\xedomhaireacht c\xf3naidhme (NOAA, NASA, USGS) r\xe9imse."]}),"\n",(0,h.jsxs)(n.p,{children:["F\xe9ach ar \xe1r",(0,h.jsx)(n.a,{href:"/docs/intro#support",children:"alt ar thaca\xedocht bhreise a fh\xe1il"}),".\r\n\xa0"]}),"\n",(0,h.jsx)(n.h2,{id:"design-details",children:"Naisc go dt\xed su\xedomhanna eile"}),"\n",(0,h.jsx)(n.p,{children:"Seo iad na sonra\xed a dhearadh ar an rogha EDDTableFromEML i GenerateDatasetsXml.\r\nRoinnt a bhaineann le difr\xedochta\xed i conas EML agusERDDAP\u2122ruda\xed a dh\xe9anamh agus conas GenerateDatasets D\xe9ile\xe1lann Xml leis na fadhbanna seo."}),"\n",(0,h.jsx)(n.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"Tiocfaidh chun bheith One Sonra\xedERDDAP\u2122Toradh na sonra\xed"}),"\n",(0,h.jsxs)(n.p,{children:["D'fh\xe9adfadh amh\xe1in EML comhad a bheith il<data recovery T\xe1bla & s.ERDDAP\u2122a dh\xe9anann ceann amh\xe1inERDDAP\u2122tacar sonra\xed in aghaidh EML dataTable. An bhfuildatasetIDdon tacar sonra\xed\r\n",(0,h.jsx)(n.em,{children:"D\xe9an Teagmh\xe1il Linn"})," T\xe1irg\xed gaolmhara ",(0,h.jsx)(n.em,{children:"duille dath: glas"}),"   (nuair a bhfuil EMLname t\xe9acs) n\xf3\r\n",(0,h.jsx)(n.em,{children:"C\xf3ras iompair"})," T\xe1irg\xed gaolmhara ",(0,h.jsx)(n.em,{children:"duille dath: glas"}),"   (nuair a bhfuil EMLname uimhir) .\r\nMar shampla, t\xe1bla #1 sa chomhad knb-fosb.28, thiocfaidh chun bheithERDDAP\u2122 datasetIDSonra\xed Teagmh\xe1la\r\n\xa0"]}),"\n",(0,h.jsx)(n.h3,{id:"eml-versus-cfacdd",children:"EML versus CF + ACD"}),"\n",(0,h.jsxs)(n.p,{children:["Faigheann beagnach gach ceann de na meiteashonra\xed sna comhaid EML isteachERDDAP, ach i bhform\xe1id \xe9ags\xfala.ERDDAP\u2122\xfas\xe1id\xed na",(0,h.jsx)(n.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"CF"}),"agus",(0,h.jsx)(n.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"Cl\xe1r na dToghth\xf3ir\xed"}),"caighde\xe1in meiteashonra\xed. T\xe1 siad c\xf3rais meiteashonra\xed comhl\xe1ntacha a \xfas\xe1ideann eochair = p\xe9ir\xed luach do meiteashonra\xed domhanda agus do gach athr\xf3g meiteashonra\xed.\r\nSea, Is \xe9 an ionada\xedocht EML na meiteashonra\xed n\xedos deise n\xe1 an ionada\xedocht CF + ACD. N\xedl m\xe9 ag moladh ag baint \xfas\xe1ide as an CF + ACD ionada\xedocht mar athshol\xe1thair don EML. Smaoinigh ar CF + ACD mar chuid den droichead \xf3n domhan EML go dt\xed anOPeNDAP/ CF / domhan CLD.\r\n\xa0"]}),"\n",(0,h.jsx)(n.h3,{id:"small-changes",children:"Athruithe Beaga"}),"\n",(0,h.jsx)(n.p,{children:"ERDDAP\u2122a dh\xe9anann a l\xe1n de na hathruithe beaga. Mar shampla,ERDDAP\u2122\xdas\xe1ideann an EML neamh-DOImalartach malartach Aitheant\xf3ir chomh maith le l\xedon sonra\xed a Th\xe1st\xe1il mar anERDDAP\u2122 datasetID, ach athruithe beag\xe1n malartach Aitheantas chun \xe9 a dh\xe9anamh ainm athraitheach bail\xed i bhformh\xf3r na dteangacha r\xedomhaireachta, e.g., sonra\xed knb-lter-sbc.33 T\xe1bla #1 thiocfaidh chun bheith knb\\_lter\\_sbc\\_33\\_t1.\r\n\xa0"}),"\n",(0,h.jsx)(n.h3,{id:"docbook",children:"D\xe9an teagmh\xe1il"}),"\n",(0,h.jsx)(n.p,{children:"\xdas\xe1ideann EML c\xf3ras marc\xe1la DocBook ar strucht\xfar a chur ar f\xe1il chun bloic t\xe9acs i gcomhaid EML. CF agus ACDD cheangal go meiteashonra\xed a bheith t\xe9acs plain. Mar sin GenerateDatasets Xml athra\xedonn an t\xe9acs marc\xe1ilte suas i t\xe9acs plain go Breathna\xedonn cos\xfail leis an leagan form\xe1idithe den t\xe9acs. Na clibeanna inl\xedne sanitized le l\xfaib\xedn\xed cearnach, m.sh.,\\[b\xe9im\\], agus d'fh\xe1g sa t\xe9acs plain.\r\n\xa0"}),"\n",(0,h.jsx)(n.h3,{id:"data-files",children:"irl - Library Service"}),"\n",(0,h.jsx)(n.p,{children:"\xd3s rud \xe9 go n-\xe1ir\xedtear an EML dataTable an URL an comhad sonra\xed iarbh\xedr, GenerateDatasets Beidh Xml:"}),"\n",(0,h.jsxs)(n.ol,{children:["\n",(0,h.jsx)(n.li,{children:"\xcdosl\xf3d\xe1il an comhad sonra\xed."}),"\n",(0,h.jsx)(n.li,{children:"St\xf3r\xe1il s\xe9 san eolaire c\xe9anna leis an gcomhad EML."}),"\n",(0,h.jsx)(n.li,{children:"L\xe9igh na sonra\xed."}),"\n",(0,h.jsx)(n.li,{children:"D\xe9an compar\xe1id idir an cur s\xedos ar na sonra\xed sa EML leis na sonra\xed iarbh\xedr sa chomhad."}),"\n",(0,h.jsx)(n.li,{children:"M\xe1 Gintear Xml fhaigheann difr\xedochta\xed, D\xe9ile\xe1lann s\xe9 leo, n\xf3 iarrann an t-oibreoir m\xe1 t\xe1 na difr\xedochta\xed ceart go leor, n\xf3 tuairisce\xe1in teachtaireacht earr\xe1ide. T\xe1 na sonra\xed i m\xedreanna \xe9ags\xfala th\xedos.\r\n\xa0"}),"\n"]}),"\n",(0,h.jsx)(n.h3,{id:"zipd-data-files",children:".zip'd Comhaid Sonra\xed"}),"\n",(0,h.jsxs)(n.p,{children:["M\xe1 t\xe1 an comhad sonra\xed tagartha.zipcomhad, n\xed m\xf3r ach comhad amh\xe1in a bheith ann. Beidh an comhad a \xfas\xe1id le haghaidhERDDAP\u2122tacar sonra\xed. M\xe1 t\xe1 n\xedos m\xf3 n\xe1 1 comhad.ERDDAP\u2122a dhi\xfalt\xfa go tacar sonra\xed. M\xe1s g\xe1, d'fh\xe9adfa\xed \xe9 seo a mhodhn\xfa. (Go praitici\xfail, t\xe1 gach comhad zip SBC LTER ach comhad sonra\xed amh\xe1in.)",(0,h.jsx)(n.br,{}),"\n","\xa0"]}),"\n",(0,h.jsx)(n.h3,{id:"storagetype",children:"tr\xe9imhse saoil: ilbhliant\xfail"}),"\n",(0,h.jsx)(n.p,{children:"M\xe1 st\xf3r\xe1il col\xfan N\xedl Cine\xe1l sonraithe,ERDDAP\u2122\xdas\xe1ideann a buille faoi thuairim is fearr bunaithe ar na sonra\xed sa chomhad sonra\xed. Oibr\xedonn s\xe9 seo go maith go leor.\r\n\xa0"}),"\n",(0,h.jsx)(n.h3,{id:"units",children:"Amharc ar gach eolas"}),"\n",(0,h.jsxs)(n.p,{children:["ERDDAP\u2122\xfas\xe1id\xed",(0,h.jsx)(n.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITSform\xe1idi\xfa d'aonaid"}),'. Sonra\xed a ghini\xfaint Xml in ann a thiont\xfa aonaid EML aUDUNITSglan thart ar 95% den am. Na tortha\xed 5% at\xe1 f\xe1gtha i cur s\xedos inl\xe9ite ar na haonaid, m.sh., "biomassDensityUnitPerAbundanceUnit" i EML thiocfaidh chun bheith "aonad dl\xfas bioomass in aghaidh an aonaid raidhse" iERDDAP. N\xedl s\xe9 seo ceadaithe go teicni\xfail. N\xed d\xf3igh liom go bhfuil s\xe9 chomh dona faoi na himthosca.\\[M\xe1s g\xe1, aonaid nach f\xe9idir a dh\xe9anamhUDUNITSd\'fh\xe9adfa\xed comhoiri\xfanach a aistri\xfa chuig an athr\xf3g ar tr\xe9ith comment.\\]',(0,h.jsx)(n.br,{}),"\n","\xa0"]}),"\n",(0,h.jsx)(n.h3,{id:"eml-version-211",children:"Leagan EML 2.1.1"}),"\n",(0,h.jsx)(n.p,{children:"Cuireadh an taca\xedocht le haghaidh EML v2.1.1 comhaid le GinrateDatasets Xml i 2016 leis an d\xf3chas go mbeadh roinnt uptake sa phobal EML. Amhail \xf3 2020, n\xe1r tharla. An bhfuilERDDAP\u2122Bheadh forbr\xf3ir\xed a bheith s\xe1sta taca\xedocht a chur le haghaidh leaganacha n\xedos d\xe9ana\xed de EML, ach amh\xe1in m\xe1 t\xe1 na gn\xe9ithe nua a \xfas\xe1id i nd\xe1ir\xedre. Cuir r\xedomhphost chugainnerd.data at noaa.govm\xe1s mian leat taca\xedocht le haghaidh leaganacha n\xedos d\xe9ana\xed de EML agus beidh a \xfas\xe1id i nd\xe1ir\xedre an ghn\xe9 seo.\r\n\xa0"}),"\n",(0,h.jsx)(n.h2,{id:"issues-with-the-eml-files",children:"Saincheisteanna leis na Comhaid EML"}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 roinnt saincheisteanna / comhartha\xed leis na comhaid EML a chur faoi deara fadhbanna nuair a cliant bogearra\xed (mar shampla an rogha EDDTableFromEML i GenerateDatasetsXML) iarracht a l\xe9irmh\xedni\xfa / a phr\xf3ise\xe1il na comhaid EML."}),"\n",(0,h.jsxs)(n.ul,{children:["\n",(0,h.jsx)(n.li,{children:"C\xe9 go bhfuil roinnt saincheisteanna at\xe1 liostaithe anseo, t\xe1 siad den chuid is m\xf3 beag, fadhbanna solvable. Go ginear\xe1lta, t\xe1 EML c\xf3ras m\xf3r agus t\xe1 s\xe9 mo \xe1thas a bheith ag obair leis."}),"\n",(0,h.jsx)(n.li,{children:"T\xe1 siad seo curtha in eagar go garbh \xf3 measa / is coitianta a laghad olc / n\xedos coitianta."}),"\n",(0,h.jsx)(n.li,{children:"An chuid is m\xf3 a bhaineann le fadhbanna beaga i gcomhaid EML ar leith (nach bhfuil locht EML ar) ."}),"\n",(0,h.jsx)(n.li,{children:"Is f\xe9idir an chuid is m\xf3 a shocr\xfa ag athruithe simpl\xed ar an comhad EML n\xf3 comhad sonra\xed."}),"\n",(0,h.jsx)(n.li,{children:"\xd3s rud \xe9 go bhfuil daoine LTER ag t\xf3g\xe1il ar checker EML a th\xe1st\xe1il ar bhail\xedocht na comhaid EML, t\xe1 m\xe9 a leanas roinnt molta\xed th\xedos maidir le gn\xe9ithe a d'fh\xe9adfa\xed a chur leis an checker."}),"\n"]}),"\n",(0,h.jsx)(n.p,{children:"Seo iad na saincheisteanna:"}),"\n",(0,h.jsx)(n.h3,{id:"separate-date-and-time-columns",children:"D\xe1ta agus am Col\xfain"}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 roinnt comhaid sonra\xed col\xfain ar leith le haghaidh d\xe1ta agus le haghaidh am, ach aon d\xe1ta aontaithe col\xfan+time. Faoi l\xe1thair, GenerateDatasets Crutha\xedonn Xml tacar sonra\xed leis na col\xfain ar leith, ach n\xedl s\xe9 oiri\xfanach mar gheall ar:"}),"\n",(0,h.jsxs)(n.ul,{children:["\n",(0,h.jsx)(n.li,{children:'T\xe1 s\xe9 is fearr m\xe1 tacair sonra\xed iERDDAP\u2122go bhfuil col\xfan chomhaimseartha d\xe1ta ar a dtugtar"time".'}),"\n",(0,h.jsx)(n.li,{children:'Go minic n\xed bheidh an tacar sonra\xed ualach iERDDAP\u2122mar gheall ar an"time"N\xed col\xfan bhfuil d\xe1ta + sonra\xed ama.'}),"\n"]}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 dh\xe1 r\xe9itigh is f\xe9idir:"}),"\n",(0,h.jsxs)(n.ol,{children:["\n",(0,h.jsx)(n.li,{children:"Edit an comhad sonra\xed foinse a chur le col\xfan nua sa datafile (agus cur s\xedos air sa EML) i gc\xe1s an d\xe1ta agus na col\xfain ama a chumasc isteach i gcol\xfan amh\xe1in. Ansin rerun GenerateDatasets Xml mar sin faigheann s\xe9 an col\xfan nua."}),"\n",(0,h.jsxs)(n.li,{children:["\xdas\xe1id an",(0,h.jsx)(n.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Athr\xf3g d\xedorthaithe"}),"gn\xe9 iERDDAP\u2122a shaini\xfa athr\xf3g nua idatasets.xmla crutha\xedodh tr\xedd an d\xe1ta agus na col\xfain ama a chalabr\xfa. D\xe9ile\xe1lann ceann de na sampla\xed go sonrach leis an staid seo.\r\n\xa0"]}),"\n"]}),"\n",(0,h.jsx)(n.h3,{id:"inconsistent-column-names",children:"Inconsistent Column Ainmneacha"}),"\n",(0,h.jsx)(n.p,{children:"Na comhaid EML liosta col\xfain an comhad sonra\xed agus a n-ainmneacha. Ar an drochuair, t\xe1 siad go minic difri\xfail \xf3 na hainmneacha col\xfan sa comhad sonra\xed iarbh\xedr. De ghn\xe1th, is \xe9 an t-ord\xfa col\xfan sa chomhad EML mar an gc\xe9anna leis an ord\xfa col\xfan sa chomhad sonra\xed, fi\xfa m\xe1 athra\xedonn na hainmneacha beag\xe1n, ach n\xed i gc\xf3na\xed. Sonra\xed a ghini\xfaint D\xe9anann Xml iarracht na hainmneacha col\xfan a mheaitse\xe1il. Nuair nach f\xe9idir \xe9 (is coitianta) , beidh s\xe9 stop a chur, a thaispe\xe1int duit an EML / data filename p\xe9ir\xed, agus a iarraidh m\xe1 t\xe1 siad ail\xednithe i gceart. M\xe1 th\xe9ann t\xfa isteach 's' a skip t\xe1bla, beidh GeneratedDatasetsXml phriont\xe1il teachtaireacht earr\xe1ide agus dul ar aghaidh go dt\xed an ch\xe9ad t\xe1bla eile.\r\nIs \xe9 an r\xe9iteach a athr\xfa ar na hainmneacha col\xfan earr\xe1ideach sa chomhad EML a mheaitse\xe1il leis na hainmneacha col\xfan sa chomhad sonra\xed.\r\n\xa0"}),"\n",(0,h.jsx)(n.h3,{id:"different-column-order",children:"Ord\xfa Col\xfan \xc9ags\xfala"}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 roinnt c\xe1sanna ina sonra\xedodh an EML na col\xfain in ord difri\xfail n\xe1 mar at\xe1 siad sa chomhad sonra\xed. Sonra\xed a ghini\xfaint Beidh Xml stopadh agus a iarraidh ar an oibreoir m\xe1 t\xe1 na matchups ceart go leor n\xf3 m\xe1s rud \xe9 gur ch\xf3ir an tacar sonra\xed a skipped. M\xe1s rud \xe9 go bhfuil s\xe9 scafa, beidh teachtaireacht earr\xe1ide sa chomhad tortha\xed, m.sh.,:"}),"\n",(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n      datasetID=knb\\\\_lter\\\\_sbc\\\\_17\\\\_t1\r\n      dataFile=all\\\\_fish\\\\_all\\\\_years\\\\_20140903.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        SURVEY\\\\_TIMING        = notes\r\n        NOTES                = survey\\\\_timing\r\n      --&gt;\n"})}),"\n",(0,h.jsx)(n.p,{children:"Is \xe9 an r\xe9iteach a shocr\xfa ar an ord\xfa col\xfan sna comhaid EML ionas go mheaitse\xe1il siad an t-ord\xfa sna comhaid sonra\xed."}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 sheice\xe1il an tseice\xe1la\xed EML go bhfuil na col\xfain agus ord col\xfan sa chomhad foinse mheaitse\xe1il na col\xfain agus ord\xfa col\xfan sa chomhad EML."}),"\n",(0,h.jsx)(n.h3,{id:"incorrect-numheaderlines",children:"numHeaderLines m\xedcheart"}),"\n",(0,h.jsx)(n.p,{children:"Roinnt sonra\xed T\xe1bla\xed st\xe1it m\xedcheart numHeaderLines = 1, m.sh., ...sbc.4011. Na c\xfaiseanna seoERDDAP\u2122an ch\xe9ad l\xedne sonra\xed a l\xe9amh mar ainmneacha an chol\xfain. Rinne m\xe9 iarracht de l\xe1imh SKIP gach ceann de na dataTables. T\xe1 siad soil\xe9ir toisc go bhfuil na hainmneacha col foinse unmatched gach luachanna sonra\xed. Agus m\xe1 t\xe1 comhaid go m\xedcheart numHeaderLines = 0, N\xed mo ch\xf3ras a dh\xe9anamh soil\xe9ir. Seo sampla \xf3 na teipeanna SBC LTER comhad:"}),"\n",(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3017\\\\_t1\r\n      dataFile=MC06\\\\_allyears\\\\_2012-03-03.txt\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        2008-10-01T00:00     = timestamp\\\\_local\r\n        2008-10-01T07:00     = timestamp\\\\_UTC\r\n        2.27                 = discharge\\\\_lps\r\n        -999.0               = water\\\\_temperature\\\\_celsius\r\n      --&gt;\n"})}),"\n",(0,h.jsx)(n.p,{children:"Mar sin, d'fh\xe9adfadh an earr\xe1id le feice\xe1il amhail is d\xe1 GenerateDatasets Xml cheapann go bhfuil an ch\xe9ad l\xedne le sonra\xed sa chomhad (e.g., le 2008-10-01T00:00 srl.) is \xe9 an l\xedne le hainmneacha col\xfan (amhail is d\xe1 mba ainm col\xfan 2008-10-01T00:00) ."}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 sheice\xe1il an EML an luach numHeaderLines."}),"\n",(0,h.jsx)(n.h3,{id:"numheaderlines--0",children:"numHeaderLines = 0"}),"\n",(0,h.jsx)(n.p,{children:"N\xed roinnt comhaid foinse bhfuil ainmneacha col\xfan.ERDDAP\u2122Glacann go m\xe1 dh\xe9anann an EML cur s\xedos ar an l\xedon c\xe9anna col\xfain."}),"\n",(0,h.jsx)(n.p,{children:"I mo thuairim: is cos\xfail seo an-chont\xfairteach. D'fh\xe9adfadh col\xfain a bheith in ord difri\xfail n\xf3 le haonaid \xe9ags\xfala (f\xe9ach th\xedos) agus n\xedl aon bhealach a ghabh\xe1il leis na fadhbanna. T\xe1 s\xe9 i bhfad n\xedos fearr m\xe1 t\xe1 gach comhad sonra\xed ASCII as a ch\xe9ile le hainmneacha col\xfan."}),"\n",(0,h.jsx)(n.h3,{id:"datetime-format-strings",children:"DateTime Form\xe1id Stringsa"}),"\n",(0,h.jsxs)(n.p,{children:["T\xe1 EML ar bhealach caighde\xe1nach chun cur s\xedos form\xe1id\xed am d\xe1ta. ach t\xe1 \xe9ags\xfalacht mh\xf3r ina \xfas\xe1id i gcomhaid EML. (Bh\xed m\xe9 m\xedcheart roimhe seo faoi seo. Feicim an doicim\xe9ad\xfa EML le haghaidh form\xe1idString is cos\xfail a mheaitse\xe1il leis an",(0,h.jsx)(n.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"JavaSonra\xedocht D\xe1ta"}),", ach a bhfuil easpa na treoirl\xednte t\xe1bhachtacha mar gheall ar a \xfas\xe1id, leis an toradh go bhfuil form\xe1id Go minic / de ghn\xe1th a \xfas\xe1idtear go m\xedchu\xed.) T\xe1 roinnt c\xe1sanna le c\xe1s m\xedcheart, agus / n\xf3 d\xfabailt m\xedcheart litir, agus / n\xf3 form\xe1idi\xfa neamhchaighde\xe1nach. Cuireann sin ualach m\xedr\xe9as\xfanta ar chliaint, go h\xe1irithe cliaint bogearra\xed ar n\xf3s GenerateDatasetsXml. Sonra\xed a ghini\xfaint Xml iarracht a thiont\xfa na form\xe1id\xed a shainmh\xedn\xedtear go m\xedcheart i gcomhaid EML isteach\r\n",(0,h.jsx)(n.a,{href:"/docs/server-admin/datasets#string-time-units",children:"an fhorm\xe1id d\xe1ta/am goERDDAP\u2122\xc9il\xedonn"}),", at\xe1 beagnach comhionann le haghaidhJava/ sonra\xedocht form\xe1id ama Joda, ach t\xe1 beag\xe1n n\xedos forgiving."]}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1s g\xe1 an checker EML clo\xed go docht leis anJavaSeirbh\xeds do Chustaim\xe9ir\xedERDDAPaonad ama sonra\xedocht agus a fh\xedor\xfa go bhf\xe9adfadh luachanna am d\xe1ta sa t\xe1bla sonra\xed a bheith parsed i gceart leis an bhform\xe1id sonraithe."}),"\n",(0,h.jsx)(n.h3,{id:"datetime-but-no-time-zone",children:"D\xe1ta Tuairim\xed R\xe9"}),"\n",(0,h.jsx)(n.p,{children:'Sonra\xed a ghini\xfaint Breathna\xedonn Xml do chol\xfan le d\xe1ta Am agus crios ama sonraithe (ceachtarZulu: \xf3 aonaid ama dar cr\xedoch \'Z\' n\xf3 sainmh\xedni\xfa ainm col\xfain n\xf3 tr\xe9ith lena n-\xe1ir\xedtear "gmt" n\xf3 "utc", n\xf3 \xe1iti\xfail: \xf3 "\xe1iti\xfail" in ainm col\xfan n\xf3 sainmh\xedni\xfa tr\xe9ith) . Chomh maith leis sin t\xe1 inghlactha comhad le col\xfan d\xe1ta ach aon chol\xfan am. Chomh maith leis sin t\xe1 inghlactha comhad gan aon d\xe1ta n\xf3 am faisn\xe9ise.'}),"\n",(0,h.jsx)(n.p,{children:'Sonra\xed a ghini\xfaint Xml d\xe9ile\xe1lann gach "\xe1iti\xfail" amanna mar a bheith as an crios ama is f\xe9idir leat a shonr\xfa le haghaidh bhaisc ar leith de chomhaid, m.sh., do SBC LTER, \xfas\xe1id a bhaint as US / Fanacht. T\xe1 an t-eolas uaireanta sna tuairim\xed, ach n\xed i bhfoirm at\xe1 \xe9asca le haghaidh cl\xe1r r\xedomhaire a figi\xfar amach.'}),"\n",(0,h.jsx)(n.p,{children:'Comhaid nach gcomhl\xedonann na crit\xe9ir seo a di\xfalta\xedodh leis an teachtaireacht "N\xcdO GOOD D\xc1TA (AMACH) VARIABLE". T\xe1 fadhbanna coitianta:'}),"\n",(0,h.jsxs)(n.ul,{children:["\n",(0,h.jsx)(n.li,{children:"T\xe1 col\xfan le d\xe1ta\xed agus col\xfan le hamanna, ach n\xed d\xe1ta col\xfan ama."}),"\n",(0,h.jsx)(n.li,{children:"T\xe1 aonaid ama, ach nach bhfuil an crios ama sonraithe."}),"\n"]}),"\n",(0,h.jsxs)(n.p,{children:['Tuairim\xed eile:\r\nM\xe1 t\xe1 d\xe1ta maith + am le col\xfan crios ama, beidh an col\xfan sin a ainmni\xfa"time"iERDDAP.ERDDAP\u2122\xc9il\xedonn an am sin sonra\xed col\xfan a thuiscint / invertible aZulu/ UTC / GMT am crios dateTimes.\\[Is \xe9 mo chreideamh: ag baint \xfas\xe1ide as amanna \xe1iti\xfala agus form\xe1id\xed d\xe1ta / ama \xe9ags\xfala (2-digit blianta! mm / liath vs dd / mm / liath vs...) i comhaid sonra\xed f\xf3rsa\xed an t-\xfas\xe1ideoir deiridh a dh\xe9anamh comhsh\xf3 casta aZuluam chun sonra\xed a chur i gcompar\xe1id \xf3 tacar sonra\xed amh\xe1in le sonra\xed \xf3 ch\xe9ile. Mar sin,ERDDAP\u2122caighde\xe1na\xedonn na sonra\xed ama go l\xe9ir: Le haghaidh amanna teaghr\xe1n,ERDDAP\u2122i gc\xf3na\xed \xfas\xe1ideann an ISO 8601:2004 (E) form\xe1id chaighde\xe1nach, mar shampla, 1985-01-02T00:00:00Z. Le haghaidh amanna uimhri\xfail,ERDDAP\u2122\xfas\xe1id\xed i gc\xf3na\xed"seconds since 1970-01-01T00:00:00Z".ERDDAP\u2122i gc\xf3na\xed a \xfas\xe1ideann anZulu  (UTC, GMT) crios ama a bhaint as na deacrachta\xed a bhaineann le bheith ag obair le criosanna ama \xe9ags\xfala agus am caighde\xe1nach i gcoinne am s\xe1bh\xe1il solas an lae. Mar sin GenerateDatasets Xml F\xe9achann col\xfan EML dataTable le d\xe1ta + amZulu. T\xe1 s\xe9 seo deacair toisc nach bhfuil EML a \xfas\xe1id focl\xf3ir foirmi\xfail / c\xf3ras (maith liom',(0,h.jsx)(n.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"JavaForm\xe1id ama Joda"}),') chun na sonra\xed a shonr\xfa Form\xe1id ama:\r\nM\xe1 t\xe1 col le luachanna ama uimhri\xfail (e.g.,Matlabamanna) agusZulucrios ama (n\xf3 d\xedreach d\xe1ta\xed, gan aon col\xfain ama) , \xfas\xe1idtear \xe9 mar"time".\r\nM\xe1 t\xe1 col le sonra\xed d\xe1ta agus am, ag baint \xfas\xe1ide as anZulucrios ama, \xfas\xe1idtear \xe9 mar"time"agus baintear aon d\xe1ta n\xf3 col\xfan ama eile.\r\nElse m\xe1 t\xe1 col le faisn\xe9is d\xe1ta amh\xe1in le f\xe1il, t\xe1 s\xe9 in \xfas\xe1id mar an"time"athraitheach (gan aon crios ama) .\r\nM\xe1 t\xe1 col\xfan sonra\xed agus col\xfan ama agus aon d\xe1ta comhcheangailte col\xfan ama, t\xe1 an tacar sonra\xed ATHBHREITHNITHE - ach d\'fh\xe9adfa\xed an tacar sonra\xed a dh\xe9anamh in\xfas\xe1idte tr\xed chur le d\xe1ta comhcheangailte col\xfan Am (b\'fhearr,Zulucrios ama) leis an comhad sonra\xed agus a chur leis a chur s\xedos sa chomhad EML.\r\nSEACHADADH \xf3 SBC LTER:',(0,h.jsx)(n.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"dataTable #2."]}),"\n",(0,h.jsxs)(n.p,{children:["Bheadh s\xe9 deas m\xe1s rud \xe9 EML / LTER ag teast\xe1il an \xe1ireamh col\xfan leZulu  (UTC, GMT) amanna crios ama i ngach comhad sonra\xed foinse \xe1bhartha. Ar Aghaidh is fearr a chur le c\xf3ras a EML a shonr\xfatime\\_zonetr\xe9ith ag baint \xfas\xe1ide as ainmneacha caighde\xe1nach (\xf3 na",(0,h.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"col\xfan TZ"}),") ."]}),"\n",(0,h.jsx)(n.h3,{id:"missing-missing_value",children:"Ag iarraidhmissing\\_value"}),"\n",(0,h.jsx)(n.p,{children:"Roinnt col\xfain a \xfas\xe1idmissing\\_valueach n\xe1 \xe9 a liost\xe1il sna meiteashonra\xed EML, m.sh., deascadh \\_mm i n-\xfas\xe1id\xed knb-fosb.5011 -999. M\xe1 t\xe1 aon luach ar iarraidh sonraithe sa EML, GinrateDatasetsXml cuardaigh go huathoibr\xedoch do luachanna ar iarraidh coitianta (mar shampla, 99, -99, 999, -999, 9999, -999, etc.) agus crutha\xedonn s\xe9 go meiteashonra\xed. Ach ar iarraidh eilemissing\\_values nach bhfuil gafa."}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 d'fh\xe9ach an checker EML ar iarraidhmissing\\_values."}),"\n",(0,h.jsx)(n.h3,{id:"small-problems",children:"Fadhbanna Beaga"}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 a l\xe1n fadhbanna beaga (litri\xfa, ponca\xedocht) a bheidh d\xf3cha ach amh\xe1in le f\xe1il ag ini\xfachadh an duine gach tacar sonra\xed."}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 d'fh\xe9ach an checker EML le haghaidh litri\xfa agus earr\xe1id\xed gramada\xed. Is \xe9 seo an fhadhb deacair toisc go bhfuil focail san eola\xedocht bratach go minic ag seice\xe1laithe litrithe. T\xe1 eagarth\xf3ireacht daonna is d\xf3cha ag teast\xe1il."}),"\n",(0,h.jsx)(n.h3,{id:"invalid-unicode-characters",children:"Carachtair Unicode luachmhar"}),"\n",(0,h.jsx)(n.p,{children:"T\xe1 cuid de an t-\xe1bhar EML carachtair Unicode neamhbhail\xed. Is iad seo is d\xf3cha carachtair \xf3 na charset Windows a bh\xed ch\xf3ipe\xe1il go m\xedcheart agus a ghream\xfa isteach an UTF-8 comhaid EML. Sonra\xed a ghini\xfaint Xml sanitizes na carachtair a e.g.,\\[Tuilleadh roghanna...\\], mar sin t\xe1 siad \xe9asca a chuardach le haghaidh saERDDAP\u2122 datasets.xmlcomhad."}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 sheice\xe1il an EML seo. T\xe1 s\xe9 \xe9asca a fh\xe1il agus \xe9asca a shocr\xfa."}),"\n",(0,h.jsx)(n.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Aonaid Chol\xfan \xe9ags\xfala] (clice\xe1il grianghraf a mh\xe9ad\xfa)"}),"\n",(0,h.jsx)(n.p,{children:'Roinnt Sonra\xed EML sainmh\xedni\xfa col\xfain at\xe1 ar neamhr\xe9ir leis na col\xfain sa chomhad sonra\xed, go h\xe1irithe toisc go bhfuil siad aonaid \xe9ags\xfala. Sonra\xed a ghini\xfaint Xml bratacha seo. T\xe1 s\xe9 suas go dt\xed an t-oibreoir a chinneadh an bhfuil na difr\xedochta\xed ceart n\xf3 nach bhfuil. Na feice\xe1il sa chomhad teipeanna mar "SKIPPED" dataTables. EXAMPLE i SBC LTER teipeanna comhad:'}),"\n",(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3\\\\_t1\r\n      dataFile=SBCFC\\\\_Precip\\\\_Daily\\\\_active\\\\_logger.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        Daily\\\\_Precipitation\\\\_Total\\\\_mm = Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n        Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_mm = Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n      --\x3e\n"})}),"\n",(0,h.jsx)(n.p,{children:"Bheadh s\xe9 deas m\xe1 sheice\xe1il an tseice\xe1la\xed EML go bhfuil an mheaitse\xe1il aonad. Ar an drochuair, t\xe1 s\xe9 seo d\xf3cha dodh\xe9anta a ghabh\xe1il agus ansin dodh\xe9anta a r\xe9iteach gan teagmh\xe1il a dh\xe9anamh leis an cruthaitheoir tacar sonra\xed, \xf3s rud \xe9 nach bhfuil an comhad foinse san \xe1ireamh aonaid. An neamhr\xe9ireacht mar shampla thuas a bh\xed ach faoi deara toisc go raibh na haonaid san \xe1ireamh san ainm col\xfan foinse agus an t-ainm col\xfan EML. C\xe9 mh\xe9ad sonra\xed eile T\xe1 an fhadhb seo ach t\xe1 undetectable?"}),"\n",(0,h.jsx)(n.h3,{id:"different-versions-of-eml",children:"Leaganacha \xe9ags\xfala de EML"}),"\n",(0,h.jsx)(n.p,{children:"Sonra\xed a ghini\xfaint T\xe1 Xml deartha chun obair le EML 2.1.1. Beidh leaganacha eile de EML ag obair a mh\xe9id a mheaitse\xe1il siad 2.1.1 n\xf3 go bhfuil GenerateDatasetsXml c\xf3d speisialta chun d\xe9ile\xe1il leis. Is fadhb annamh \xe9 seo. Nuair a tharla\xedonn s\xe9, Is \xe9 an r\xe9iteach a thiont\xfa do chuid comhad a EML 2.1.1, n\xf3 an comhad EML a sheoladh chuigerd.data at noaa.gov, mar sin is f\xe9idir liom athruithe a dh\xe9anamh ar GenerateDatasets Xml chun d\xe9ile\xe1il leis na difr\xedochta\xed."}),"\n",(0,h.jsx)(n.p,{children:"Chuir Bob taca\xedocht le haghaidh comhaid EML a GenerateDatasets Xml i 2016 leis an d\xf3chas go mbeadh roinnt uptake sa phobal EML. Amhail \xf3 2020, n\xe1r tharla. T\xe1 Bob s\xe1sta taca\xedocht a chur le haghaidh leaganacha n\xedos d\xe9ana\xed de EML, ach amh\xe1in m\xe1 t\xe1 na gn\xe9ithe nua a \xfas\xe1id i nd\xe1ir\xedre. Cuir r\xedomhphost chugainnerd.data at noaa.govm\xe1s mian leat taca\xedocht le haghaidh leaganacha n\xedos d\xe9ana\xed de EML agus beidh a \xfas\xe1id i nd\xe1ir\xedre an ghn\xe9 seo."}),"\n",(0,h.jsx)(n.h3,{id:"trouble-parsing-the-data-file",children:"Triobl\xf3id Ag Comhbhr\xfa leis an Comhad Sonra\xed"}),"\n",(0,h.jsxs)(n.p,{children:['Go hiond\xfail, d\'fh\xe9adfa\xed dataTable a dhi\xfalt\xfa leis an earr\xe1id "l\xedon gan choinne m\xedreanna ar l\xedne #120 (breathnaithe =52, ag s\xfail = 50) " " " Cialla\xedonn teachtaireacht earr\xe1ide mar seo go raibh l\xedne sa comhad sonra\xed roinnt luachanna \xe9ags\xfala n\xe1 na l\xednte eile. D\'fh\xe9adfadh s\xe9 a bheith ina fhadhb iERDDAP\u2122  (e.g., n\xed pars\xe1il an comhad i gceart) n\xf3 sa chomhad. SEACHADADH \xf3 SBC LTER:\r\n',(0,h.jsx)(n.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"dataTable #3, f\xe9ach datafile = LTER\\_m\xed\\_bottledata\\_register\\_stations\\_20140429.txt"]})]})}function c(a={}){const{wrapper:n}={...(0,r.R)(),...a.components};return n?(0,h.jsx)(n,{...a,children:(0,h.jsx)(d,{...a})}):d(a)}}}]);