"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8350],{28453:(a,i,n)=>{n.d(i,{R:()=>s,x:()=>d});var e=n(96540);const r={},h=e.createContext(r);function s(a){const i=e.useContext(h);return e.useMemo((function(){return"function"==typeof a?a(i):{...i,...a}}),[i,a])}function d(a){let i;return i=a.disableParentContext?"function"==typeof a.components?a.components(r):a.components||r:s(a.components),e.createElement(h.Provider,{value:i},a.children)}},83552:(a,i,n)=>{n.r(i),n.d(i,{assets:()=>t,contentTitle:()=>d,default:()=>o,frontMatter:()=>s,metadata:()=>e,toc:()=>c});const e=JSON.parse('{"id":"contributing/release_process","title":"ERDDAP\u2122irl - Library Service","description":"* D\xe9an cinnte comhaid compar\xe1id \xedomh\xe1 ar f\xe1il (d\'fh\xe9adfadh s\xe9 seo i gceist ag rith  mvn f\xedoraithe , m\xe1s mian leat a luas go srian suas go dt\xed d\xedreach leis an ngr\xfapa \xcdomh\xe1 Compar\xe1id c\xe9 faoi deara go n-\xe9il\xedonn f\xf3s ag rith t\xe1st\xe1lacha Jetty)","source":"@site/i18n/ga/docusaurus-plugin-content-docs/current/contributing/release_process.md","sourceDirName":"contributing","slug":"/contributing/release_process","permalink":"/ga/docs/contributing/release_process","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/release_process.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"docSidebar","previous":{"title":"Cl\xe1r na dToghth\xf3ir\xed","permalink":"/ga/docs/contributing/programmer-guide"},"next":{"title":"index","permalink":"/ga/docs/dokka/"}}');var r=n(74848),h=n(28453);const s={sidebar_position:3},d="ERDDAP\u2122irl - Library Service",t={},c=[{value:"Canary",id:"canary",level:2},{value:"Deireadh an chomhr\xe1",id:"deireadh-an-chomhr\xe1",level:2},{value:"Nuashonraigh Doicim\xe9id",id:"nuashonraigh-doicim\xe9id",level:2},{value:"A chinnti\xfa go bhfuil repos eile suas chun d\xe1ta de r\xe9ir mar is g\xe1",id:"a-chinnti\xfa-go-bhfuil-repos-eile-suas-chun-d\xe1ta-de-r\xe9ir-mar-is-g\xe1",level:2},{value:"\xdas\xe1ideoir\xed a chur in i\xfal",id:"\xfas\xe1ideoir\xed-a-chur-in-i\xfal",level:2},{value:"Scaoileadh unsa",id:"scaoileadh-unsa",level:3}];function l(a){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,h.R)(),...a.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"erddapirl---library-service",children:"ERDDAP\u2122irl - Library Service"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["D\xe9an cinnte comhaid compar\xe1id \xedomh\xe1 ar f\xe1il (d'fh\xe9adfadh s\xe9 seo i gceist ag rith ",(0,r.jsx)(i.code,{children:"mvn f\xedoraithe"}),", m\xe1s mian leat a luas go srian suas go dt\xed d\xedreach leis an ngr\xfapa \xcdomh\xe1 Compar\xe1id c\xe9 faoi deara go n-\xe9il\xedonn f\xf3s ag rith t\xe1st\xe1lacha Jetty)"]}),"\n",(0,r.jsx)(i.li,{children:"Nuashonraigh sple\xe1chas"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"mvn versions:display-dependency-updates   // (displays updates)\r\nmvn versions:use-latest-versions  // (updates dependencies, though sometimes we don\u2019t want to do all of them)\r\nmvn versions:update-properties // (updates versions in the property block)\n"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Nuashonraigh plugins"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"mvn versions:display-plugin-updates // (displays updates, need to manually update)\n"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"t\xe1st\xe1lacha Rith a dh\xe9anamh nuashonruithe sple\xe1chas cinnte nach raibh aon rud a bhriseadh do gach cumra\xedochta\xed m\xf3ra (datasets pars\xe1il go h\xe1irithe, c\xe9 aon su\xedmh suntasacha eile chomh maith)"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"mvn verify\n"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"\xdas\xe1id TranslateMessages.translate () aistri\xfach\xe1in a thabhairt cothrom le d\xe1ta m\xe1s g\xe1"}),"\n",(0,r.jsx)(i.li,{children:"EDStatic.java leagan forbartha M\xf3d go br\xe9agach, athr\xfa ar an uimhir leagan agus an d\xe1ta scaoilte a shonr\xfa."}),"\n",(0,r.jsx)(i.li,{children:"An bhfuil an t\xf3g\xe1il"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"mvn clean\r\nmvn compile\r\nmvn package\n"})}),"\n",(0,r.jsx)(i.h2,{id:"canary",children:"Canary"}),"\n",(0,r.jsx)(i.p,{children:"Seol an comhad cogadh le d\xe1ileadh ar an bhfreastala\xed Coastwatch n\xf3 freastala\xed \xe9igin eile a \xfas\xe1ideann an chuid is m\xf3 de na cine\xe1lacha tacar sonra\xed agus faigheann a l\xe1n tr\xe1chta.\r\nBa mhaith linn iarracht a dh\xe9anamh earr\xe1id\xed a aimsi\xfa roimh dh\xe1ileadh n\xedos leithne ar an t\xf3g\xe1il."}),"\n",(0,r.jsx)(i.p,{children:"Cuir teachtaireacht nuair a insint faoi scaoileadh nua."}),"\n",(0,r.jsx)(i.p,{children:"Is \xe9 an n\xf3s imeachta caighde\xe1nach:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Upload an .war comhad a coastwatch\\[taiseachas aeir: fliuch\\]/ \xe1bhar / caip\xedn /"}),"\n",(0,r.jsxs)(i.li,{children:["Mar \xfas\xe1ideoir = tomcat:","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:'I\\[taiseachas aeir: fliuch\\]/ i / :\r\n. / shutdown.sh / / \xfas\xe1id "ps -fu tomcat" chun a chinnti\xfa go bhfuil s\xe9 stop'}),"\n",(0,r.jsx)(i.li,{children:"I\\[taiseachas aeir: fliuch\\]/ iarratais / :\r\nSeirbh\xeds do Chustaim\xe9ir\xed\r\nrm erddap. cogadh cogadh cogadh\r\ncine\xe1l gas: in airde ../content/erddap/erddap2.22.war erddap.war / / n\xf3 is cuma cad \xe9 an uimhir"}),"\n",(0,r.jsx)(i.li,{children:"I\\[taiseachas aeir: fliuch\\]/ i / :\r\n./startup.sh"}),"\n",(0,r.jsx)(i.li,{children:"Tar \xe9is anERDDAPT\xe1 ar ais leathanach gr\xe9as\xe1in, i\\[taiseachas aeir: fliuch\\]/ iarratais / :\r\nAn bhfuil a fhios agat?\r\nclice\xe1il grianghraf a mh\xe9ad\xfa\r\nclice\xe1il grianghraf a mh\xe9ad\xfa"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"deireadh-an-chomhr\xe1",children:"Deireadh an chomhr\xe1"}),"\n",(0,r.jsx)(i.p,{children:"Dr\xe9acht an scaoileadh GitHub, san \xe1ireamh erddap.war agus erddapContent.zip  (aon uimhreacha leagan)"}),"\n",(0,r.jsxs)(i.p,{children:["title: The official v2.25 version\r\ncur s\xedos: F\xe9ach ar an liosta athruithe ar\r\n",(0,r.jsx)(i.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,r.jsx)(i.h2,{id:"nuashonraigh-doicim\xe9id",children:"Nuashonraigh Doicim\xe9id"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Nuashonr\xfa an uimhir leagan sa docusaurus.config.ts comhad (i alt footer) ."}),"\n",(0,r.jsxs)(i.li,{children:["Cuir na leathanaigh doicim\xe9adachta in eagar (imscaradh-install.md agus imscaradh-suasdate.md) .","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Cuardaigh le haghaidh\\[erddap.war\\]"}),"\n",(0,r.jsx)(i.li,{children:"C\xf3ipe\xe1il an t-eolas at\xe1 ann cheana (beag\xe1n reformatted) chuig an liosta de na suite\xe1lacha roimhe seo 2. 2. 2."}),"\n",(0,r.jsx)(i.li,{children:"Athraigh an t-eolas scaoileadh reatha le haghaidh erddap. cogadh ag\\[erddap.war\\]"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.li,{children:"Rith na haistri\xfach\xe1in don su\xedomh doicim\xe9ad\xfach\xe1in."}),"\n",(0,r.jsx)(i.li,{children:"D\xe9an iarratas tarraingt agus na hathruithe a chumasc."}),"\n",(0,r.jsx)(i.li,{children:"D\xe9an ini\xfachadh ar an su\xedomh doicim\xe9ad\xfach\xe1in (f\xe9ach readme) ."}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"a-chinnti\xfa-go-bhfuil-repos-eile-suas-chun-d\xe1ta-de-r\xe9ir-mar-is-g\xe1",children:"A chinnti\xfa go bhfuil repos eile suas chun d\xe1ta de r\xe9ir mar is g\xe1"}),"\n",(0,r.jsx)(i.p,{children:"Den chuid is m\xf3 cialla\xedonn s\xe9 seo ErddapContent agus ErddapTest, ach ba ch\xf3ir iad a choinne\xe1il suas chun d\xe1ta le linn athruithe forbartha."}),"\n",(0,r.jsx)(i.h2,{id:"\xfas\xe1ideoir\xed-a-chur-in-i\xfal",children:"\xdas\xe1ideoir\xed a chur in i\xfal"}),"\n",(0,r.jsx)(i.p,{children:"An ch\xe9ad f\xf3gra a thabhairt d'\xfas\xe1ideoir\xed a d'iarr athruithe (n\xf3 a raibh a bugs socraithe) . Tabhair am d\xf3ibh athruithe a fh\xedor\xfa agus / n\xf3 saincheisteanna a ard\xfa."}),"\n",(0,r.jsx)(i.p,{children:"ERDDAPT\xe1 leagan 2.25 ar f\xe1il anois!"}),"\n",(0,r.jsxs)(i.p,{children:["Is f\xe9idir leat l\xe9amh faoi na hathruithe ag\r\n",(0,r.jsx)(i.a,{href:"https://erddap.github.io/changes#version-225",children:"https://erddap.github.io/changes#version-225"})]}),"\n",(0,r.jsx)(i.p,{children:"T\xe1 cuid de na hathruithe athruithe a mhol t\xfa. Go raibh m\xedle maith agat go m\xf3r do do chuid molta\xed. Cuardaigh le haghaidh d'ainm sa liosta na n-athruithe chun na sonra\xed a fheice\xe1il. Bheadh s\xe9 iontach m\xe1 d'fh\xe9adfa\xed t\xfa iarracht a dh\xe9anamh amach na gn\xe9ithe nua go luath, sula fh\xf3gairt m\xe9 an leagan nua do lucht f\xe9achana n\xedos leithne."}),"\n",(0,r.jsxs)(i.p,{children:["M\xe1 t\xe1 t\xfaERDDAPriarth\xf3ir, t\xe1 na treoracha le haghaidh uasghr\xe1d\xfa ag\r\n",(0,r.jsx)(i.a,{href:"https://erddap.github.io/docs/server-admin/deploy-update",children:"https://erddap.github.io/docs/server-admin/deploy-update"})]}),"\n",(0,r.jsx)(i.p,{children:"M\xe1 t\xe1 aon fhadhbanna, ceisteanna, molta\xed, le do thoil r\xedomhphost chugam."}),"\n",(0,r.jsx)(i.p,{children:"Go raibh maith agat as \xfas\xe1idERDDAP."}),"\n",(0,r.jsx)(i.h3,{id:"scaoileadh-unsa",children:"Scaoileadh unsa"}),"\n",(0,r.jsx)(i.p,{children:"Seol f\xf3gra chuig an liosta seolta\xed F\xf3gra\xed."})]})}function o(a={}){const{wrapper:i}={...(0,h.R)(),...a.components};return i?(0,r.jsx)(i,{...a,children:(0,r.jsx)(l,{...a})}):l(a)}}}]);