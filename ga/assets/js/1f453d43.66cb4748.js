"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6013],{18913:(a,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>o,frontMatter:()=>r,metadata:()=>h,toc:()=>d});const h=JSON.parse('{"id":"contributing/programmer-guide","title":"Cl\xe1r na dToghth\xf3ir\xed","description":"Is ruda\xed iad seo nach bhfuil ach r\xedomhchl\xe1raitheoir a bhfuil s\xe9 ar intinn aige oibri\xfa leisERDDAP\'sJavaN\xed m\xf3r ranganna a fhios.","source":"@site/i18n/ga/docusaurus-plugin-content-docs/current/contributing/programmer-guide.md","sourceDirName":"contributing","slug":"/contributing/programmer-guide","permalink":"/ga/docs/contributing/programmer-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/programmer-guide.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"Ag cur leERDDAP\u2122","permalink":"/ga/docs/contributing/"},"next":{"title":"ERDDAP\u2122irl - Library Service","permalink":"/ga/docs/contributing/release_process"}}');var e=i(74848),s=i(28453);const r={sidebar_position:2},c="Cl\xe1r na dToghth\xf3ir\xed",t={},d=[{value:"<strong>Dul ar an gC\xf3d Foinse</strong>",id:"getting-the-source-code",level:3},{value:"<strong>ERDDAP\u2122sple\xe1chas</strong>",id:"erddap-dependencies",level:3},{value:"<strong>Leathanaigh</strong>",id:"leathanaigh",level:4},{value:"<strong>Amharc ar gach eolas</strong>",id:"development-environment",level:3},{value:"<strong>Amharc ar gach eolas</strong>",id:"important-classes",level:3},{value:"<strong>Eolas faoin gComhlacht</strong>",id:"code-contributions",level:3},{value:"<strong>Juding Do Rann\xedoca\xedochta\xed C\xf3d</strong>",id:"judging-your-code-contributions",level:3}];function l(a){const n={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...a.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.header,{children:(0,e.jsx)(n.h1,{id:"cl\xe1r-na-dtoghth\xf3ir\xed",children:"Cl\xe1r na dToghth\xf3ir\xed"})}),"\n",(0,e.jsx)(n.p,{children:"Is ruda\xed iad seo nach bhfuil ach r\xedomhchl\xe1raitheoir a bhfuil s\xe9 ar intinn aige oibri\xfa leisERDDAP'sJavaN\xed m\xf3r ranganna a fhios."}),"\n",(0,e.jsx)(n.h3,{id:"getting-the-source-code",children:(0,e.jsx)(n.strong,{children:"Dul ar an gC\xf3d Foinse"})}),"\n",(0,e.jsx)(n.p,{children:"\xa0"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["Via Foinse C\xf3d ar GitHub\nT\xe1 an c\xf3d foinse do leaganacha poibl\xed le d\xe9ana\xed agus leaganacha in-fhorbairt ar f\xe1il freisin tr\xedd",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP",children:"D\xe9an teagmh\xe1il linn"}),". L\xe9igh le do thoil an",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/wiki",children:"F\xe9ach ar L\xe9arsc\xe1ileanna"}),"don tionscadal sin. M\xe1s mian leat an c\xf3d foinse a mhodhn\xfa (agus b'fh\xe9idir go bhfuil na hathruithe a ionchorpr\xfa isteach sa chaighde\xe1nERDDAP\u2122d\xe1ileadh) , is \xe9 seo an cur chuige molta."]}),"\n"]}),"\n",(0,e.jsx)(n.h3,{id:"erddap-dependencies",children:(0,e.jsx)(n.strong,{children:"ERDDAP\u2122sple\xe1chas"})}),"\n",(0,e.jsxs)(n.p,{children:["ERDDAP\u2122\xdas\xe1ideann Maven a lucht\xfa sple\xe1chais c\xf3d chomh maith le roinnt comhaid tagartha statach (Seirbh\xeds do Chustaim\xe9ir\xed) . D\xe9antar \xe9 seo chun go leor comhaid mh\xf3ra a st\xf3r\xe1il sa st\xf3r.\nIs f\xe9idir leat \xfas\xe1id a bhaint ",(0,e.jsx)(n.code,{children:"mvn compile "})," agus a beir na sple\xe1chais agus comhaid aife. Is f\xe9idir leat \xfas\xe1id a bhaint freisin ",(0,e.jsx)(n.code,{children:"pac\xe1iste mvn"})," a ghini\xfaint comhad cogadh.\nIs f\xe9idir leat a \xedosl\xf3d\xe1il de l\xe1imh na comhaid aife:"]}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip",children:"Sonra\xed Teagmh\xe1la.zip"}),"agus unzip s\xe9 isteach / WEB-INF/ref/ ."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip",children:"ref_files.zip"}),"agus unzip s\xe9 isteach / WEB-INF/ref/ ."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip",children:"erddapContent.zip"}),"  (leagan 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dar d\xe1ta 2024-10-14) agus unzip s\xe9 isteach ",(0,e.jsx)(n.em,{children:"tomcat"}),", a chruth\xfa_tomcat_/content/erddap."]}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(n.p,{children:["TABHAIR FAOI DEARA: De r\xe9ir r\xe9amhshocraithe beidh Maven taisce tagairt statach agus sonra\xed a \xedosl\xf3d\xe1il cartlann agus iad a bhaint ach amh\xe1in nuair a leagan nua \xedosl\xf3d\xe1il. A skip \xedosl\xf3d\xe1il go hioml\xe1n, is f\xe9idir leat a leagtar ar an ",(0,e.jsx)(n.code,{children:"skipResourceDownload "})," agus / n\xf3 ",(0,e.jsx)(n.code,{children:"skipTestResourceDownload air\xedonna a Maven (e.g. "}),"mvn -DskipResourceDownload pac\xe1iste ",(0,e.jsx)(n.code,{children:".) . Chun east\xf3scadh bhfeidhm, a leagtar"}),"-Ddownload.unpack = stre",(0,e.jsx)(n.code,{children:"agus"}),"-Ddownload.unpackWhenChanged = False` ."]}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["ERDDAP\u2122agus t\xe1 a subcomponents an-liobr\xe1lacha, foinse oscailte",(0,e.jsx)(n.a,{href:"/license",children:"online service"}),", ionas gur f\xe9idir leat an c\xf3d foinse a \xfas\xe1id agus a mhodhn\xfa chun cr\xedche ar bith, le haghaidh brab\xfais n\xf3 neamhbhrab\xfais. Tabhair faoi deara goERDDAP\u2122agus t\xe1 go leor fochomhph\xe1irtithe cead\xfanais a cheangal go n-admha\xedonn t\xfa an fhoinse an c\xf3d go bhfuil t\xfa ag baint \xfas\xe1ide as. F\xe9ach ar",(0,e.jsx)(n.a,{href:"/credits",children:"Creidmheasanna"}),". Cib\xe9 acu is g\xe1 n\xf3 nach ea, t\xe1 s\xe9 ach foirm mhaith a admh\xe1il go l\xe9ir de na rann\xedoc\xf3ir\xed."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:(0,e.jsx)(n.strong,{children:"\xdas\xe1id an C\xf3d do Thionscadail Eile"})}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(n.p,{children:["C\xe9 go bhfuil f\xe1ilte romhat codanna de naERDDAP\u2122c\xf3d do thionscadail eile, rabhadh gur f\xe9idir leis an gc\xf3d agus beidh athr\xfa. N\xed chuirimid gealltanas chun tac\xfa le h\xfas\xe1id\xed eile ar \xe1r gc\xf3d. Beidh Git agus GitHub do r\xe9itigh is m\xf3 chun d\xe9ile\xe1il leis seo - Git is f\xe9idir leat a chumasc \xe1r n-athruithe i do athruithe.\n",(0,e.jsx)(n.strong,{children:"I gc\xe1s go leor c\xe1sanna ina bhf\xe9adfadh t\xfa a bheith tempted a \xfas\xe1id codanna deERDDAP\u2122i do thionscadal, is d\xf3igh linn go bhfaighidh t\xfa s\xe9 i bhfad n\xedos \xe9asca a shuite\xe1il agus a \xfas\xe1idERDDAP\u2122mar at\xe1,"})," agus ansin scr\xedobh seirbh\xeds\xed eile a \xfas\xe1ideannERDDAP's services. Is f\xe9idir leat a chur ar bun do chuid f\xe9inERDDAP\u2122suite\xe1il amh in uair an chloig n\xf3 dh\xf3. Is f\xe9idir leat a chur ar bun do chuid f\xe9inERDDAP\u2122suite\xe1il ar bhealach snasta i gceann c\xfapla l\xe1 (ag brath ar l\xedon agus ar chastacht do tacar sonra\xed) . Ach hacking amach codanna deERDDAP\u2122i gc\xe1s go bhfuil do thionscadal f\xe9in d\xf3cha seachtain\xed a ghlacadh (agus m\xedonna a ghabh\xe1il subtleties) agus caillfidh t\xfa an cumas chun athruithe agus Ceart\xfach\xe1in \xf3 ina dhiaidh sinERDDAP\u2122scaoileadh. T\xe1imid ag (ar nd\xf3igh,) smaoineamh go bhfuil go leor bunt\xe1ist\xed ag baint \xfas\xe1ide asERDDAP\u2122mar at\xe1 agus a dh\xe9anamh doERDDAP\u2122suite\xe1il inrochtana go poibl\xed. Mar sin f\xe9in, i gc\xe1sanna \xe1irithe, b'fh\xe9idir nach mbeadh t\xfa ag iarraidh a dh\xe9anamh doERDDAP\u2122suite\xe1il inrochtana go poibl\xed. Ansin, is f\xe9idir le do sheirbh\xeds rochtain a fh\xe1il agus do phr\xedobh\xe1ideach a \xfas\xe1idERDDAP\u2122agus n\xed g\xe1 do chliaint a fhios faoiERDDAP\u2122."]}),"\n",(0,e.jsx)(n.h4,{id:"leathanaigh",children:(0,e.jsx)(n.strong,{children:"Leathanaigh"})}),"\n",(0,e.jsxs)(n.p,{children:["N\xf3, t\xe1 cur chuige eile a d'fh\xe9adf\xe1 a fh\xe1il \xfas\xe1ideach at\xe1 leathbhealach idir delving isteachERDDAP's c\xf3d agus ag baint \xfas\xe1ide asERDDAP\u2122mar sheirbh\xeds gr\xe9as\xe1in neamhsple\xe1ch amh\xe1in: Sa rang EDD, t\xe1 modh statach a ligeann duit a dh\xe9anamh ar shampla de tacar sonra\xed (bunaithe ar an tsonra\xedocht sadatasets.xml) :\nclice\xe1il grianghraf a mh\xe9ad\xfa XLUMX (Teaghr\xe1n SOLAS t-\xe1dh)\n",(0,e.jsx)(n.code,{children:"Filleann s\xe9 ar shampla de EDDTable n\xf3EDDGridtacar sonra\xed. Mar gheall ar sin mar shampla, is f\xe9idir leat glaoch \\\\ "}),"A dh\xe9anamh NewFileForDapQuery (String userDapQuery, String dir, String fileName, String file Cine\xe1l Gluaiseacht)\n`chun an c\xe1s a insint chun comhad sonra\xed a dh\xe9anamh, de fileType ar leith, leis na tortha\xed \xf3 cheist \xfas\xe1ideora. D\xe1 bhr\xed sin, is bealach simpl\xed \xe9 seo a \xfas\xe1idERDDAP's modhanna chun sonra\xed a iarraidh agus comhad a fh\xe1il mar fhreagra, d\xedreach mar a bheadh cliant a \xfas\xe1idERDDAP\u2122iarratas gr\xe9as\xe1in. Ach oibr\xedonn an cur chuige seo laistigh de doJavacl\xe1r agus sheachbh\xf3thar an g\xe1 at\xe1 le freastala\xed iarratas cos\xfail Tomcat. Bainimid \xfas\xe1id as an gcur chuige seo do go leor de na t\xe1st\xe1lacha aonaid EDDTable agusEDDGridfo-aicm\xed, ionas gur f\xe9idir leat a fheice\xe1il sampla\xed de seo sa c\xf3d foinse do gach ceann de na ranganna."]}),"\n",(0,e.jsx)(n.h3,{id:"development-environment",children:(0,e.jsx)(n.strong,{children:"Amharc ar gach eolas"})}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["T\xe1 cumra\xedochta\xed do",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/jetty",children:"Seirbh\xeds do Chustaim\xe9ir\xed"}),"agus",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/docker",children:"D\xe9an teagmh\xe1il Linn"}),"i GitHub, c\xe9 go bhfuilthar ag s\xfail le scaoileadh a re\xe1cht\xe1il i Tomcat."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.strong,{children:"Rogha"})," : Socraigh suasERDDAP\u2122i Tomcat \\\n\xd3s rud \xe9ERDDAP\u2122T\xe1 s\xe9 i gceist go pr\xedomha a bheith ina servlet ag rith i Tomcat, molaimid go l\xe1idir go leanann t\xfa an caighde\xe1n",(0,e.jsx)(n.a,{href:"/docs/server-admin/deploy-install",children:"treoracha a shuite\xe1il"}),"a shuite\xe1il Tomcat, agus ansin a shuite\xe1ilERDDAP\u2122i webapps Tomcat ar eolaire. I measc ruda\xed eile,ERDDAP\u2122dearadh a bheith suite\xe1ilte i strucht\xfar eolaire Tomcat agus t\xe1 s\xfail Tomcat a chur ar f\xe1il roinnt .jar comhaid."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"ERDDAP\u2122N\xed g\xe1 IDE ar leith (Chris \xdas\xe1ideann den chuid is m\xf3 C\xf3d Sti\xfaideo Visual, Bob \xfas\xe1idtear EditPlus) . N\xed chuirimid \xfas\xe1id Eclipse, Ant, etc; n\xe1 n\xed chuirimid ar f\xe1ilERDDAPTaca\xedocht a bhaineann leo. \xdas\xe1ideann an tionscadal Maven."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Bainimid \xfas\xe1id as comhad bhaisc a scriosadh gach ceann de na. comhaid rang sa chrann foinse chun a chinnti\xfa go bhfuil muid ar compile glan (le javac) ."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"T\xe1imid ag \xfas\xe1id faoi l\xe1thair javac Adoptium ar jdk-21.0.3+9 a thioms\xfa gov.noaaa.pfeg.coastwatch.TestAll (t\xe1 s\xe9 naisc le roinnt ranganna nach mbeadh a thioms\xfa ar shl\xed eile) agus a re\xe1cht\xe1il na t\xe1st\xe1lacha. Ar ch\xfaiseanna sl\xe1nd\xe1la, t\xe1 s\xe9 beagnach i gc\xf3na\xed is fearr a bhaint as na leaganacha is d\xe9ana\xed deJava21 agus Tomcat 10."}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Nuair a re\xe1cht\xe1il muid javac n\xf3 java, Is \xe9 an t-eolaire at\xe1 ann faoi l\xe1thair ",(0,e.jsx)(n.em,{children:"tomcat"}),"/webapps / erddap / WEB-INF."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Is \xe9 \xe1r javac agus java classpath\n",(0,e.jsx)(n.code,{children:"aicm\xed; ../../.../lib/servlet-api.jar;lib/* "})]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Mar sin, beidh do l\xedne ord\xfa javac rud \xe9igin cos\xfail le\n",(0,e.jsx)(n.code,{children:"javac -encoding ranganna UTF-8 -cp; ../ ../ ../ ../ .. / svlet-api.jar;lib/* ranganna/gov/pfel/coastwatch/TestAll.java"})]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Agus beidh do l\xedne ord\xfa java a bheith rud \xe9igin cos\xfail le\n.../ ../ ../ ../ ../ ../ .. ../ .. ../ .. .. .. .. .. .. .. ... .. .. . ... . .. .. . ... ../ .. ../ .. .. ../ . .. . . ../ .../ . ... . . . ...... . ./ . . . ./ ....../ . . . . . . . . . ./ . . . ./ . . . . . . . . . . . . . . . . . . . . . . . . . . . . ranganna/gclianta/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na ranganna/na/na/na ranganna/na/na ranganna/na/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na ranganna/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na/na ranganna/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na/na/na/na/na ranganna/na/na/na/na/na\n",(0,e.jsx)(n.code,{children:"Roghnach: Is f\xe9idir leat a chur "}),"-verbose: gc`, a ins\xedonnJavastaidreamh bailithe truflais a phriont\xe1il."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"M\xe1 t\xe1st\xe1il Gach compiles, gach rudERDDAP\u2122T\xe1 riachtanais curtha le ch\xe9ile. T\xe1 roinnt ranganna le ch\xe9ile nach bhfuil ag teast\xe1il le haghaidhERDDAP\u2122. M\xe1 \xe9ir\xedonn Tioms\xfa TestAll ach n\xed compile roinnt rang, nach bhfuil an rang ag teast\xe1il. (T\xe1 roinnt ranganna neamhchr\xedochnaithe / gan \xfas\xe1id.)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"I roinnt c\xe1sanna, \xfas\xe1idimid 3\xfa p\xe1irt\xed c\xf3d foinse ionad .jar comhaid (go h\xe1irithe le haghaidhDODS) agus t\xe1 siad mhodhn\xfa beag\xe1n chun fadhbanna a r\xe9iteach leJava21. Is minic a dh\xe9antar modhnuithe beaga eile (go h\xe1irithe iDODS) ar ch\xfaiseanna eile."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["T\xe1 an chuid is m\xf3 ranganna modhanna t\xe1st\xe1la ina gcomhad src / t\xe1st\xe1la a bhaineann leo. Is f\xe9idir leat a re\xe1cht\xe1il na t\xe1st\xe1lacha JUnit leis an ",(0,e.jsx)(n.code,{children:"mvn t\xe1st\xe1la "})," ord\xfa . Beidh s\xe9 seo \xedosl\xf3d\xe1il roinnt comhaid zip sonra\xed go bhfuil na t\xe1st\xe1lacha ag brath ar \xf3 scaoileadh is d\xe9ana\xed",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddapTest/releases/",children:"ERDDAPSeirbh\xeds do Chustaim\xe9ir\xed T\xe1st\xe1il T\xe1st\xe1il"}),".\n\xa0\nTABHAIR FAOI DEARA: \xcdosl\xf3d\xe1lacha Maven ach beidh unzip na cartlanna a \xedosl\xf3d\xe1il ar gach forghn\xedomh\xfa, a th\xf3gann am. A skip \xedosl\xf3d\xe1il\nagus unzipping cartlanna sonra\xed t\xe1st\xe1la, is f\xe9idir leat a shonr\xfa ar an ",(0,e.jsx)(n.code,{children:"skipTestResourceDownload "})," maoin a Maven (e.g ",(0,e.jsx)(n.code,{children:"mvn -DskipTestResourceDownload pac\xe1iste "})," .) ."]}),"\n"]}),"\n"]}),"\n",(0,e.jsx)(n.h3,{id:"important-classes",children:(0,e.jsx)(n.strong,{children:"Amharc ar gach eolas"})}),"\n",(0,e.jsx)(n.p,{children:"M\xe1s mian leat chun breathn\xfa ar an c\xf3d foinse agus iarracht a dh\xe9anamh amach conasERDDAP\u2122oibreacha, le do thoil a dh\xe9anamh."}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"T\xe1 an c\xf3dJavaTuairim\xed Doc, ach anJavaN\xedl Docs a ghintear. Thig leat a ghini\xfaint iad."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Na ranganna is t\xe1bhachta\xed (lena n-\xe1ir\xedtear na cinn at\xe1 luaite th\xedos) at\xe1 laistigh de gov/noaa/pfel/erddap."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"An bhfuilERDDAP\u2122T\xe1 an rang na modhanna leibh\xe9al is airde. S\xedneann s\xe9 HttpServlet."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"ERDDAP\u2122iarrata\xed ar ch\xe1sanna fo-aicm\xedEDDGridn\xf3 EDDTable, a l\xe9ir\xedonn tacair sonra\xed aonair."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"EDStatic T\xe1 an chuid is m\xf3 den fhaisn\xe9is statach agus su\xedmh (e.g., \xf3 na comhaid thus.xml agus teachtaireachta\xed.xml) agus cuireann seirbh\xeds\xed statach (e.g., r\xedomhphoist a sheoladh) ."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"EDDGridagus fo-aicm\xed EDDTable parse\xe1il an t-iarratas, sonra\xed a fh\xe1il \xf3 mhodhanna fo-aicme-sonrach, ansin form\xe1id na sonra\xed don fhreagra."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"EDDGridfo-aicm\xed a bhr\xfa sonra\xed isteach GridDataAccessor (an coime\xe1d\xe1n sonra\xed inmhe\xe1nach le haghaidh sonra\xed eangaithe) ."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Cuireann fo-aicm\xed EDDTable sonra\xed i bhfo-aicm\xed TableWriter, a scr\xedobhann sonra\xed chuig cine\xe1l comhaid ar leith ar an bhf\xe9ile."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Amharc ar gach eolas (e.g., ranganna ar leibh\xe9al \xedseal) T\xe1 s\xe9 t\xe1bhachtach freisin, ach is l\xfa seans go mbeidh t\xfa ag obair chun iad a athr\xfa.\n\xa0"}),"\n"]}),"\n"]}),"\n",(0,e.jsx)(n.h3,{id:"code-contributions",children:(0,e.jsx)(n.strong,{children:"Eolas faoin gComhlacht"})}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Saincheisteanna GitHub\nM\xe1s mian leat cur ach nach bhfuil tionscadal, f\xe9ach ar an liosta de",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"Saincheisteanna GitHub"}),", go leor acu tionscadail a d'fh\xe9adfa\xed t\xfa a chur ar. M\xe1s mian leat a bheith ag obair ar cheist, le do thoil \xe9 a shannadh chun t\xfa f\xe9in a chur in i\xfal do dhaoine eile a bhfuil t\xfa ag obair ar s\xe9. Is \xed an cheist GitHub an \xe1it is fearr chun aon cheisteanna a phl\xe9 maidir le conas dul ar aghaidh leis an obair ar an gceist sin."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["M\xe1 t\xe1 an t-athr\xfa gur mhaith leat a dh\xe9anamh ar cheann de na c\xe1sanna coitianta th\xedos, le do thoil a chruth\xfa",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"An bhfuil t\xfa ag obair"}),"l\xe9ir\xedonn an t-athr\xfa at\xe1 beartaithe agat a dh\xe9anamh. Ansin, nuair a bh\xedonn an t-athr\xfa cr\xedochnaithe, d\xe9an iarratas tarraingthe chun an cumasc a iarraidh. I measc na n-athruithe coitianta t\xe1:"]}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Ba mhaith leat a scr\xedobh fo-aicme eile deEDDGridn\xf3 EDDTable a l\xe1imhse\xe1il cine\xe1l foinse sonra\xed eile. M\xe1s amhlaidh, molaimid go bhfaighidh t\xfa an fo-aicme is gaire at\xe1 ann cheana agus an c\xf3d sin a \xfas\xe1id mar phointe tosaigh."}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Ba mhaith leat a scr\xedobh eile SaveAs_FileType_ modh. M\xe1s amhlaidh, molaimid go bhfaighidh t\xfa an modh is gaire sh\xe1bh\xe1il As_FileType_ iEDDGridn\xf3 EDDTable agus an c\xf3d sin a \xfas\xe1id mar phointe tosaigh."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(n.p,{children:["T\xe1 na c\xe1sanna an bunt\xe1iste go bhfuil an c\xf3d scr\xedobh t\xfa f\xe9in-at\xe1. N\xed bheidh ort a fhios go l\xe9ir na sonra\xed arERDDAP's inmhe\xe1nacha. Agus beidh s\xe9 \xe9asca d\xfainn a ionchorpr\xfa do ch\xf3d iERDDAP. Tabhair faoi deara go m\xe1 dh\xe9anann t\xfa c\xf3d a chur isteach, beidh an cead\xfanas ag teast\xe1il ag lu\xed leis anERDDAP\u2122 ",(0,e.jsx)(n.a,{href:"/license",children:"free"}),"  (e.g.,",(0,e.jsx)(n.a,{href:"https://www.apache.org/licenses/",children:"taiseachas aeir: fliuch"}),",",(0,e.jsx)(n.a,{href:"https://www.opensource.org/licenses/bsd-license.php",children:"taiseachas aeir: fliuch"}),", n\xf3",(0,e.jsx)(n.a,{href:"https://www.opensource.org/licenses/mit-license.php",children:"MIT-X"}),") . D\xe9anfaimid liosta de do rann\xedoca\xedocht sa",(0,e.jsx)(n.a,{href:"/credits",children:"creidmheasanna"}),"."]}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["M\xe1 t\xe1 gn\xe9 nach bhfuil cl\xfadaithe thuas gur mhaith leat a chur leisERDDAP, moltar sn\xe1ithe pl\xe9 a chruth\xfa ar dt\xfas sa",(0,e.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/discussions/categories/ideas",children:"GitHub Pl\xe9igh"}),". Maidir le gn\xe9ithe/athruithe suntasacha, pl\xe9ifidh an Bord Teicni\xfail iad agus cinnfidh s\xe9 c\xe9 acu a chead\xf3idh s\xe9 \xe9 a chur leis.ERDDAP\u2122."]}),"\n"]}),"\n",(0,e.jsx)(n.h3,{id:"judging-your-code-contributions",children:(0,e.jsx)(n.strong,{children:"Juding Do Rann\xedoca\xedochta\xed C\xf3d"})}),"\n",(0,e.jsx)(n.p,{children:"M\xe1s mian leat c\xf3d n\xf3 athruithe eile a chur isteach le bheith san \xe1ireamhERDDAP, is \xe9 sin iontach. N\xed m\xf3r do rann\xedoca\xedocht clo\xed le crit\xe9ir \xe1irithe chun glacadh leo. M\xe1 leanann t\xfa na treoirl\xednte th\xedos, m\xe9ada\xedonn t\xfa go m\xf3r an seans go nglacfar le do rann\xedoca\xedocht.\n\xa0"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"An bhfuilERDDAP\u2122T\xe1 tionscadal \xe1 bhainisti\xfa ag NATD (NOAASti\xfarth\xf3ir Teicni\xfail Ceaptha) le hionchur \xf3 Bhord Teicni\xfail.\n\xd3 2007 (an t\xfasERDDAP) tr\xed 2022, ba \xe9 sin Bob Simons (chomh maith leis an Founder-Leader) . Ag tos\xfa i m\xed Ean\xe1ir 2023, is \xe9 sin Chris John. Go bun\xfasach, t\xe1 an NATD freagrach asERDDAP, mar sin t\xe1 s / s\xe9 an focal deiridh ar chinnt\xed faoiERDDAP\u2122c\xf3d, go h\xe1irithe maidir leis an dearadh agus an nglacfar le hiarraidh tarraingthe \xe1irithe n\xf3 nach nglacfar l\xe9i. Caithfidh s\xe9 a bheith ar an mbealach seo go p\xe1irteach ar ch\xfaiseanna \xe9ifeacht\xfalachta (oibr\xedonn s\xe9 go hiontach do Linus Torvalds agus Linux) agus go p\xe1irteach ar ch\xfaiseanna sl\xe1nd\xe1la: T\xe1 duine \xe9igin a insint do na daoine sl\xe1nd\xe1la TF a ghlacann s / s\xe9 freagracht as sl\xe1nd\xe1il agus sl\xe1ine an ch\xf3d.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"N\xed dh\xe9anann an NATD r\xe1th\xfa go mbeidh s / s\xe9 glacadh le do ch\xf3d.\nM\xe1s rud \xe9 nach tionscadal ag obair ach amach chomh maith le bh\xed s\xfail againn agus m\xe1s rud \xe9 nach f\xe9idir \xe9 a tharrth\xe1il, n\xed bheidh an NATD \xe1ireamh an tionscadal saERDDAP\u2122d\xe1ileadh. N\xe1 b\xedodh dona. Uaireanta nach bhfuil tionscadail ag obair amach chomh maith le s\xfail. Tarla\xedonn s\xe9 do gach forbr\xf3ir bogearra\xed. M\xe1 leanann t\xfa na treoirl\xednte th\xedos, t\xfa a mh\xe9ad\xfa go m\xf3r do seans rath.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"T\xe1 s\xe9 is fearr m\xe1 t\xe1 na hathruithe ar leas ginear\xe1lta agus \xfas\xe1ideacht.\nM\xe1 t\xe1 an c\xf3d sonrach do d'eagra\xedocht, is d\xf3cha gur fearr brainse ar leith a choime\xe1d ar bunERDDAP\u2122do do \xfas\xe1id. D\xe9anann Axiom seo. Fortunately, Git dh\xe9anann s\xe9 seo \xe9asca a dh\xe9anamh. Is mian leis an NATD f\xeds comhsheasmhach a choime\xe1d ar bun le haghaidhERDDAP, n\xed f\xe9idir \xe9 a bheith ina thionscadal doirteal cistine nuair a chuireann gach duine gn\xe9 saincheaptha d\xe1 dtionscadal.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Lean anJavaCoinbhinsi\xfain an Ch\xf3id.\nGo ginear\xe1lta, ba ch\xf3ir do ch\xf3d a bheith ar chaighde\xe1n maith agus ba ch\xf3ir a lean\xfaint ar an bunaidh",(0,e.jsx)(n.a,{href:"https://www.oracle.com/technetwork/java/codeconventions-150003.pdf",children:"JavaCoinbhinsi\xfain C\xf3d"}),": a chur . comhaid rang san \xe1it chu\xed sa strucht\xfar eolaire, a thabhairt. comhaid ranga ainm cu\xed, san \xe1ireamh cu\xedJavatuairim\xed Doc, san \xe1ireamh / / tuairim\xed ag t\xfas gach m\xedr de ch\xf3d, fleasc le 4 sp\xe1sanna (bl\xe1thanna cumhra: cumhr\xe1in) , l\xednte a sheachaint ^80 carachtair, etc. N\xed Coinbhinsi\xfain athr\xfa agus an c\xf3d foinse i gc\xf3na\xed go hioml\xe1n suas go dt\xed seo. Nuair a bheidh amhras, c\xf3d mheaitse\xe1il leis na coinbhinsi\xfain agus n\xed c\xf3d at\xe1 ann cheana."]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"\xdas\xe1id rang tuairisci\xfail, modh agus ainmneacha athraitheacha.\nSin a dh\xe9anann an c\xf3d n\xedos \xe9asca do dhaoine eile a l\xe9amh.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Seachain c\xf3d mhaisi\xfail.\nSan fhadtr\xe9imhse, beidh ort n\xf3 daoine eile a dh\xe9anamh amach an c\xf3d chun \xe9 a choime\xe1d ar bun. Mar sin, bain \xfas\xe1id as modhanna simpl\xed c\xf3daithe at\xe1 n\xedos \xe9asca d\xe1 bhr\xed sin do dhaoine eile (lena n-\xe1ir\xedtear t\xfa sa todhcha\xed) a figi\xfar amach. Ar nd\xf3igh, m\xe1 t\xe1 bunt\xe1iste f\xedor a \xfas\xe1id roinnt mhaisi\xfailJavagn\xe9 cl\xe1ir, \xe9 a \xfas\xe1id, ach doicim\xe9ad go forleathan cad a rinne t\xfa, c\xe9n f\xe1th, agus conas a oibr\xedonn s\xe9.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Obair leis an mBord Teicni\xfail sula dtosa\xedonn t\xfa.\nM\xe1 t\xe1 s\xfail agat a fh\xe1il do athruithe c\xf3d ceirteacha tarraingthe isteachERDDAP\u2122, Beidh an Bord Teicni\xfail ag iarraidh cinnte chun labhairt faoi cad t\xe1 t\xfa ag dul a dh\xe9anamh agus conas t\xe1 t\xfa ag dul a dh\xe9anamh sula nd\xe9anann t\xfa aon athruithe ar an gc\xf3d. Ar an mbealach sin, is f\xe9idir linn a sheachaint a dh\xe9anann t\xfa athruithe nach bhfuil an NATD, sa deireadh, glacadh. Nuair a bh\xedonn t\xfa ag d\xe9anamh an obair, t\xe1 an NATD agus an Bord Teicni\xfail s\xe1sta ceisteanna a fhreagairt chun cabhr\xfa leat a figi\xfar amach an c\xf3d at\xe1 ann cheana f\xe9in agus (forioml\xe1n) conas dul i ngleic le do thionscadal.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsxs)(n.p,{children:["Obair go neamhsple\xe1ch (an oiread agus is f\xe9idir) tar \xe9is duit tos\xfa.\nI gcodarsnacht leis an thuas \"Work leis an mBord Teicni\xfail\", tar \xe9is duit t\xfas a chur ar an tionscadal, spreagann an NATD t\xfa a bheith ag obair chomh neamhsple\xe1ch agus is f\xe9idir. M\xe1 t\xe1 an NATD a insint duit beagnach gach rud agus go leor ceisteanna a fhreagairt (go h\xe1irithe na cinn a d'fh\xe9adf\xe1 a bheith fhreagair ag l\xe9amh an doicim\xe9adacht n\xf3 an c\xf3d) , ansin nach bhfuil do chuid iarrachta\xed coigiltis ama don NATD agus s / d'fh\xe9adfadh s\xe9 chomh maith a dh\xe9anamh ar an obair iad f\xe9in. T\xe1 s\xe9 an",(0,e.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/The_Mythical_Man-Month",children:"M\xed an Duine Mythical"}),"fadhb. Ar nd\xf3igh, ba cheart d\xfainn cumars\xe1id a dh\xe9anamh f\xf3s. Bheadh s\xe9 iontach a fheice\xe1il go tr\xe9imhsi\xfail do chuid oibre ar si\xfal chun a chinnti\xfa go bhfuil an tionscadal ar rian. Ach an n\xedos m\xf3 is f\xe9idir leat obair go neamhsple\xe1ch (tar \xe9is don Bhord Teicni\xfail aont\xfa ar an tasc ar l\xe1imh agus an cur chuige ginear\xe1lta) , an n\xedos fearr.\n\xa0"]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Seachain bugs.\nM\xe1s rud \xe9 nach bhfuil a bug gafa roimh scaoileadh, c\xfaiseanna s\xe9 fadhbanna d'\xfas\xe1ideoir\xed (ag is fearr) , tuairisce\xe1in an t-eolas m\xedcheart (ag is measa) , Is blot arERDDAP's ch\xe1il, agus beidh s\xe9 f\xf3s ar amach-de-d\xe1taERDDAP\u2122suite\xe1lacha ar feadh na mblianta. Obair an-deacair a bugs a sheachaint. Is cuid de seo scr\xedobh c\xf3d glan (mar sin t\xe1 s\xe9 n\xedos \xe9asca fadhbanna a fheice\xe1il) . Is cuid de seo t\xe1st\xe1lacha aonaid a scr\xedobh. Is cuid de seo dearcadh lean\xfanach a sheachaint bug nuair a scr\xedobh t\xfa c\xf3d. N\xe1 d\xe9an an oth NATD ag cur do ch\xf3d aERDDAP\u2122.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:'Scr\xedobh t\xe1st\xe1il n\xf3 t\xe1st\xe1lacha aonaid.\nLe haghaidh c\xf3d nua, ba ch\xf3ir duit t\xe1st\xe1lacha JUnit a scr\xedobh i gcomhad t\xe1st\xe1la.\nScr\xedobh ar a laghad modh t\xe1st\xe1la aonair amh\xe1in go t\xe1st\xe1lacha go maith an c\xf3d scr\xedobh t\xfa agus \xe9 a chur leis an rang \' comhad t\xe1st\xe1la JUnit ionas go mbeidh s\xe9 ar si\xfal go huathoibr\xedoch. Aonad an Aonaid (agus a bhaineann) T\xe1 t\xe1st\xe1lacha ar cheann de na beala\xed is fearr a bugs ghabh\xe1il, ar dt\xfas, agus san fhadtr\xe9imhse (mar ruda\xed eile a athr\xfa iERDDAP\u2122) . Mar a d\xfairt Bob, "T\xe1 t\xe1st\xe1lacha m\xedcheart cad a ligeann dom codlata san o\xedche."\n\xa0'}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"D\xe9an s\xe9 \xe9asca don NATD a thuiscint agus glacadh leis na hathruithe i d'iarratas tarraingt.\nCuid de sin ag scr\xedobh modh t\xe1st\xe1la aonad (s s) . Cuid de go bhfuil teorainn do athruithe ar roinn amh\xe1in de ch\xf3d (n\xf3 aicme amh\xe1in) m\xe1s f\xe9idir. N\xed bheidh an NATD glacadh le haon iarratas tarraingt leis na c\xe9adta athruithe ar fud an c\xf3d. Ins\xedonn an NATD na daoine sl\xe1nd\xe1la TF a ghlacann freagracht as sl\xe1nd\xe1il agus sl\xe1ine an ch\xf3d. M\xe1 t\xe1 an iomarca athruithe n\xf3 go bhfuil siad r\xf3-deacair a dh\xe9anamh amach, ansin t\xe1 s\xe9 ach r\xf3-deacair a fh\xedor\xfa go bhfuil na hathruithe ceart agus nach bhfuil a thabhairt isteach bugs n\xf3 saincheisteanna sl\xe1nd\xe1la.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Coinnigh s\xe9 simpl\xed.\nIs t\xe9ama forioml\xe1n maith do do ch\xf3d: Coinnigh s\xe9 simpl\xed. T\xe1 c\xf3d simpl\xed \xe9asca do dhaoine eile (lena n-\xe1ir\xedtear t\xfa sa todhcha\xed) a l\xe9amh agus a chothabh\xe1il. T\xe1 s\xe9 \xe9asca don NATD a thuiscint agus d\xe1 bhr\xed sin glacadh.\n\xa0"}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\n",(0,e.jsx)(n.p,{children:"Glac freagracht fadt\xe9armach do do ch\xf3d.\nSa fhadtr\xe9imhse, is fearr m\xe1 ghlacann t\xfa freagracht lean\xfanach as do ch\xf3d a chothabh\xe1il agus ceisteanna a fhreagairt faoi (e.g., saERDDAP\u2122Gr\xfapa Google) . Mar n\xf3ta roinnt \xfadair, Is c\xf3d dliteanas chomh maith le s\xf3cmhainn. M\xe1 t\xe1 a bug amach sa todhcha\xed, t\xe1 s\xe9 is fearr m\xe1 shocra\xedonn t\xfa \xe9 mar a fhios ag aon duine do ch\xf3d n\xedos fearr n\xe1 t\xfa (chomh maith ionas go mbeidh dreasacht ann bugs a sheachaint sa ch\xe9ad \xe1it) . N\xedl an NATD ag iarraidh tiomantas daingean a chur ar f\xe1il cothabh\xe1il lean\xfanach. Is \xe9 an NATD ag r\xe1 go bhfuil ag d\xe9anamh an chothabh\xe1il a bheith bu\xedoch go m\xf3r."}),"\n"]}),"\n"]})]})}function o(a={}){const{wrapper:n}={...(0,s.R)(),...a.components};return n?(0,e.jsx)(n,{...a,children:(0,e.jsx)(l,{...a})}):l(a)}},28453:(a,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var h=i(96540);const e={},s=h.createContext(e);function r(a){const n=h.useContext(s);return h.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function c(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(e):a.components||e:r(a.components),h.createElement(s.Provider,{value:n},a.children)}}}]);