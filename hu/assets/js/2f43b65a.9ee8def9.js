"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1842],{28453:(e,a,n)=>{n.d(a,{R:()=>r,x:()=>o});var t=n(96540);const s={},l=t.createContext(s);function r(e){const a=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(l.Provider,{value:a},e.children)}},50199:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>t,toc:()=>k});const t=JSON.parse('{"id":"contributing/programmer-guide","title":"Programoz\xf3 \xfatmutat\xf3","description":"Ezek olyan dolgok, amelyek csak egy programoz\xf3, aki dolgozni akarERDDAPAJavaAz oszt\xe1lyoknak tudniuk kell.","source":"@site/i18n/hu/docusaurus-plugin-content-docs/current/contributing/programmer-guide.md","sourceDirName":"contributing","slug":"/contributing/programmer-guide","permalink":"/hu/docs/contributing/programmer-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/programmer-guide.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"Hozz\xe1j\xe1rul\xe1sERDDAP\u2122","permalink":"/hu/docs/contributing/"},"next":{"title":"ERDDAP\u2122Release Process","permalink":"/hu/docs/contributing/release_process"}}');var s=n(74848),l=n(28453);const r={sidebar_position:2},o="Programoz\xf3 \xfatmutat\xf3",i={},k=[{value:"<strong>A Forr\xe1sk\xf3d megszerz\xe9se</strong>",id:"getting-the-source-code",level:3},{value:"<strong>ERDDAP\u2122f\xfcgg\u0151s\xe9gek</strong>",id:"erddap-dependencies",level:3},{value:"<strong>F\xe9l\xfaton</strong>",id:"f\xe9l\xfaton",level:4},{value:"<strong>Fejleszt\xe9si k\xf6rnyezet</strong>",id:"development-environment",level:3},{value:"<strong>Fontos oszt\xe1lyok</strong>",id:"important-classes",level:3},{value:"<strong>K\xf3dex hozz\xe1j\xe1rul\xe1sok</strong>",id:"code-contributions",level:3},{value:"<strong>A k\xf3dex hozz\xe1j\xe1rul\xe1s\xe1nak meg\xedt\xe9l\xe9se</strong>",id:"judging-your-code-contributions",level:3}];function z(e){const a={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"programoz\xf3-\xfatmutat\xf3",children:"Programoz\xf3 \xfatmutat\xf3"})}),"\n",(0,s.jsx)(a.p,{children:"Ezek olyan dolgok, amelyek csak egy programoz\xf3, aki dolgozni akarERDDAPAJavaAz oszt\xe1lyoknak tudniuk kell."}),"\n",(0,s.jsx)(a.h3,{id:"getting-the-source-code",children:(0,s.jsx)(a.strong,{children:"A Forr\xe1sk\xf3d megszerz\xe9se"})}),"\n",(0,s.jsx)(a.p,{children:"\xa0"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Via Forr\xe1sk\xf3d GitHub\r\nA friss nyilv\xe1nos verzi\xf3k \xe9s fejleszt\xe9si verzi\xf3k forr\xe1sk\xf3dja szint\xe9n el\xe9rhet\u0151 a",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP",children:"GitHub"}),"... K\xe9rj\xfck, olvassa el a",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/wiki",children:"Wiki"}),"erre a projektre. Ha m\xf3dos\xedtani szeretn\xe9 a forr\xe1sk\xf3dot (\xe9s esetleg a szabv\xe1nyba beillesztett v\xe1ltoz\xe1sokERDDAP\u2122eloszt\xe1s) Ez az aj\xe1nlott megk\xf6zel\xedt\xe9s."]}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"erddap-dependencies",children:(0,s.jsx)(a.strong,{children:"ERDDAP\u2122f\xfcgg\u0151s\xe9gek"})}),"\n",(0,s.jsx)(a.p,{children:'ERDDAP\u2122haszn\xe1lja a Maven-t a k\xf3df\xfcgg\u0151s\xe9gek bet\xf6lt\xe9s\xe9re, valamint n\xe9h\xe1ny statikus referenciaf\xe1jl (WEB-INF/ref) ... Ez az\xe9rt t\xf6rt\xe9nik, hogy elker\xfclje sok nagy f\xe1jl t\xe1rol\xe1s\xe1t a repositoryban.\r\nHaszn\xe1lhatja a `mvn compile\'-t, \xe9s ez megfontolja a f\xfcgg\u0151s\xe9geket \xe9s a ref f\xe1jlokat. Haszn\xe1lhatja a "mvn csomagot", hogy l\xe9trehozzon egy h\xe1bor\xfas f\xe1jlt.\r\nManu\xe1lisan let\xf6ltheti a ref f\xe1jlokat:'}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip",children:"etopo1\\_ice\\_g\\_i2.zip"}),"\xe9s bez\xe1rja a /WEB-INF/ref/"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip",children:"ref_files.zip"}),"\xe9s bez\xe1rja a /WEB-INF/ref/"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip",children:"erddapContent.zip"}),"  (1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 2024-10-14) \xe9s zipogd be ",(0,s.jsx)(a.em,{children:"tomcat"}),", teremt\xe9s_tomcat_/content/erddap..."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:['MEGJEGYZ\xc9S: Az alap\xe9rtelmezett Maven statikus referenci\xe1t \xe9s teszteli az adatarch\xedvum let\xf6lt\xe9s\xe9t, \xe9s csak akkor vonja ki \u0151ket, ha egy \xfaj verzi\xf3t let\xf6ltenek. Ahhoz, hogy teljesen lemondjon, be\xe1ll\xedthatja a "skipResourceDownload" \xe9s / vagy "skipTestResourceDownload" tulajdons\xe1gokat a Maven sz\xe1m\xe1ra (pl. ',(0,s.jsx)(a.code,{children:"mvn -DskipResourceDownload csomag "}),') ... Er\u0151s\xedtse a kitermel\xe9st, \xe1ll\xedtsa be a "Ddownload.unpack=true" \xe9s a "Ddownload.unpackWhenChanged=false".']}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["ERDDAP\u2122\xe9s alkomponensei nagyon liber\xe1lisak, ny\xedlt forr\xe1sk\xf3d\xfaak",(0,s.jsx)(a.a,{href:"/license",children:"licencek"}),"\xcdgy b\xe1rmilyen c\xe9lra haszn\xe1lhatja \xe9s m\xf3dos\xedthatja a forr\xe1sk\xf3dot, profitra vagy nonprofitra. Vegy\xfck \xe9szre, hogyERDDAP\u2122\xe9s sok alkomponens rendelkezik licencekkel, amelyek megk\xf6vetelik, hogy elismerje a k\xf3d forr\xe1s\xe1t, amelyet haszn\xe1l. L\xe1sd",(0,s.jsx)(a.a,{href:"/credits",children:"Hitelek"}),"... F\xfcggetlen\xfcl att\xf3l, hogy sz\xfcks\xe9g van-e vagy sem, csak j\xf3 form\xe1ban ismerj\xfck el ezeket a k\xf6zrem\u0171k\xf6d\u0151ket."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:(0,s.jsx)(a.strong,{children:"Haszn\xe1lja a k\xf3dot m\xe1s projektekhez"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["M\xedg sz\xedvesen haszn\xe1lja a r\xe9szeitERDDAP\u2122M\xe1s projektek k\xf3dj\xe1t figyelmeztetni kell arra, hogy a k\xf3d k\xe9pes \xe9s meg fog v\xe1ltozni. Nem \xedg\xe9rj\xfck, hogy t\xe1mogassuk a k\xf3dunk m\xe1s felhaszn\xe1l\xe1s\xe1t. Git \xe9s GitHub lesz a f\u0151 megold\xe1sok foglalkozni ezzel - Git lehet\u0151v\xe9 teszi, hogy egyes\xedtse a v\xe1ltoz\xe1sokat a v\xe1ltoz\xe1sokat.\r\n",(0,s.jsx)(a.strong,{children:"Sok helyzetben, ahol lehet, hogy k\xeds\xe9rt\xe9s, hogy haszn\xe1lja r\xe9szeit.ERDDAP\u2122a projektben azt gondoljuk, hogy sokkal k\xf6nnyebb lesz telep\xedteni \xe9s haszn\xe1lniERDDAP\u2122mint"})," Ezut\xe1n \xedrjon m\xe1s szolg\xe1ltat\xe1sokat, amelyekERDDAPSzolg\xe1ltat\xe1sok. Be\xe1ll\xedthatja saj\xe1tj\xe1tERDDAP\u2122a telep\xedt\xe9s kegyetlen\xfcl egy-k\xe9t \xf3r\xe1ban. Be\xe1ll\xedthatja a saj\xe1tj\xe1tERDDAP\u2122telep\xedt\xe9s egy csiszolt m\xf3don n\xe9h\xe1ny nap alatt (az adatk\xe9szletek sz\xe1m\xe1t\xf3l \xe9s bonyolults\xe1g\xe1t\xf3l f\xfcgg\u0151en) ... De hacking out r\xe9szeiERDDAP\u2122a saj\xe1t projektje val\xf3sz\xedn\u0171leg hetekig tart (h\xf3napok a finoms\xe1gok elkap\xe1s\xe1ra) \xe9s elvesz\xedti a k\xe9pess\xe9g\xe9t, hogy be\xe9p\xedtse a v\xe1ltoz\xe1sokat \xe9s a hibajav\xedt\xe1sokat k\xe9s\u0151bbERDDAP\u2122kiad\xe1sok. Mi vagyunk (nyilv\xe1nval\xf3an) gondolja, hogy sok el\u0151nye van a haszn\xe1latnakERDDAP\u2122\xe9s a teERDDAP\u2122a telep\xedt\xe9s nyilv\xe1nosan hozz\xe1f\xe9rhet\u0151. Bizonyos k\xf6r\xfclm\xe9nyek k\xf6z\xf6tt azonban el\u0151fordulhat, hogy nem akarja, hogy a teERDDAP\u2122a telep\xedt\xe9s nyilv\xe1nosan hozz\xe1f\xe9rhet\u0151. Ezut\xe1n a szolg\xe1ltat\xe1s hozz\xe1f\xe9rhet \xe9s haszn\xe1lja a priv\xe1tERDDAP\u2122\xe9s az \xfcgyfeleknek nem kell tudniukERDDAP\u2122..."]}),"\n",(0,s.jsx)(a.h4,{id:"f\xe9l\xfaton",children:(0,s.jsx)(a.strong,{children:"F\xe9l\xfaton"})}),"\n",(0,s.jsx)(a.p,{children:'Vagy van egy m\xe1sik megk\xf6zel\xedt\xe9s, amelyet hasznosnak tal\xe1lhat, ami f\xe9l\xfaton van elt\xe9vesztveERDDAPk\xf3d \xe9s haszn\xe1latERDDAP\u2122\xf6n\xe1ll\xf3 webszolg\xe1ltat\xe1sk\xe9nt: Az EDD oszt\xe1lyban van egy statikus m\xf3dszer, amely lehet\u0151v\xe9 teszi egy adatk\xe9szlet p\xe9ld\xe1j\xe1t (a specifik\xe1ci\xf3 alapj\xe1ndatasets.xml) :\r\nAz egyik FromDataset Xml (String tDatasetID)\r\nVisszat\xe9r egy EDDTable vagyEDDGridadatk\xe9szlet. Tekintettel erre az esetre, h\xedvhatsz\\\r\n"makeNewFileForDapQuery (String felhaszn\xe1l\xf3DapQuery, String dir, String fileName, String f\xe1jl TypeName)\r\n"Mondja el az esetet, hogy egy adatf\xe1jl, egy adott f\xe1jlt\xedpus, az eredm\xe9nyeket egy felhaszn\xe1l\xf3 lek\xe9rdez\xe9s. \xcdgy ez egy egyszer\u0171 m\xf3dja annak, hogy haszn\xe1ljaERDDAP"Az adatok k\xe9r\xe9s\xe9re szolg\xe1l\xf3 m\xf3dszerek, \xe9s v\xe1laszul kapnak egy f\xe1jlt, ahogy az \xfcgyf\xe9l haszn\xe1lja aERDDAP\u2122webes alkalmaz\xe1s. De ez a megk\xf6zel\xedt\xe9s az \xd6n\xe9n bel\xfcl m\u0171k\xf6dikJavaprogram \xe9s megker\xfcli a sz\xfcks\xe9gess\xe9g\xe9t egy alkalmaz\xe1sszerver, mint a Tomcat. Ezt a megk\xf6zel\xedt\xe9st haszn\xe1ljuk az EDDTable \xe9sEDDGridaloszt\xe1lyok, \xedgy l\xe1that\xf3 p\xe9ld\xe1k erre a forr\xe1sk\xf3dban az \xf6sszes oszt\xe1ly.'}),"\n",(0,s.jsx)(a.h3,{id:"development-environment",children:(0,s.jsx)(a.strong,{children:"Fejleszt\xe9si k\xf6rnyezet"})}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Vannak konfigur\xe1ci\xf3k",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/jetty",children:"Jetty"}),"\xe9s",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/docker",children:"Docker"}),"GitHubban, b\xe1r a kiad\xe1sok v\xe1rhat\xf3an Tomcatban futnak."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Opcion\xe1lis"})," : Be\xe1ll\xedt\xe1sERDDAP\u2122Tomcat\\\r\n\xf3taERDDAP\u2122f\u0151k\xe9nt Tomcatban fut\xf3 szervk\xe9nt javasoljuk, hogy k\xf6vesse a szabv\xe1nyt",(0,s.jsx)(a.a,{href:"/docs/server-admin/deploy-install",children:"telep\xedt\xe9si utas\xedt\xe1sok"}),"telep\xedteni Tomcat, majd telep\xedteniERDDAP\u2122Tomcat webapps k\xf6nyvt\xe1r\xe1ban. T\xf6bbek k\xf6z\xf6tt,ERDDAP\u2122\xdagy tervezt\xe9k, hogy telep\xedtve van Tomcat k\xf6nyvt\xe1ri strukt\xfar\xe1j\xe1ban, \xe9s elv\xe1rja, hogy a Tomcat n\xe9h\xe1ny .jar f\xe1jlt ny\xfajtson."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"ERDDAP\u2122nem ig\xe9nyel konkr\xe9t IDE (Chris f\u0151k\xe9nt Visual Studio k\xf3dot haszn\xe1l, a Bob haszn\xe1lt EditPlus) ... Nem haszn\xe1ljuk az Eclipse-t, az Ant-t stb.; \xe9s nem aj\xe1nljuk felERDDAP- t\xe1mogat\xe1st nekik. A projekt Mavent haszn\xe1lja."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Olyan t\xe9telf\xe1jlt haszn\xe1lunk, amely t\xf6rli az \xf6sszes .class f\xe1jlt a forr\xe1sfa-ban, hogy biztos\xedtsuk, hogy tiszta kompile (javac) ..."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Jelenleg az Adoptium javac jdk-21.0.3+9-et haszn\xe1ljuk a gov.noaa.pfeg.coastwatch.TestAll sz\xe1m\xe1ra (n\xe9h\xe1ny oszt\xe1lyhoz kapcsol\xf3dik, amelyek egy\xe9bk\xe9nt nem fognak \xf6ssze\xe1ll\xedtani) \xe9s futtassa a teszteket. Biztons\xe1gi okokb\xf3l szinte mindig a legjobb, ha a leg\xfajabb verzi\xf3kat haszn\xe1ljaJava21 \xe9s Tomcat 10."}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Amikor javac-ot vagy jav\xe1t futtatjuk, a jelenlegi k\xf6nyvt\xe1r ",(0,s.jsx)(a.em,{children:"tomcat"}),"/webapps/erddap/WEB-INF."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"A javac \xe9s a java oszt\xe1lypath\r\n\u201eoszt\xe1lyok;../.../lib/servlet-api.jar;lib/*\u201d"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Teh\xe1t a javac parancssora valami ilyesmi lesz\r\n`javac - k\xf3dol\xe1s UTF-8 -cp oszt\xe1lyok;./../lib/servlet-api.jar;lib/* oszt\xe1lyok/gov/noa/pfel/coastwatch/TestAll.java"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:['\xc9s a java parancssor lesz valami "\r\n`java -cp oszt\xe1lyok;./.../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M oszt\xe1lyok/gov/noa/pfel/partwatch/TestAll\r\n"Opcion\xe1lis: hozz\xe1adhatja a "verbose',":gc",'"-t, ami megmondjaJavanyomtatni szemet gy\u0171jt\xe9si statisztik\xe1kat.']}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Ha teszt Minden \xf6sszet\xe9tel, mindenERDDAP\u2122Az ig\xe9nyeket \xf6ssze\xe1ll\xedtott\xe1k. N\xe9h\xe1ny oszt\xe1lyt \xf6ssze\xe1ll\xedtanak, amelyek nem sz\xfcks\xe9gesekERDDAP\u2122... Ha a TestAll \xf6ssze\xe1ll\xedt\xe1sa sikerrel j\xe1r, de nem k\xe9pes egyes oszt\xe1lyokat \xf6ssze\xe1ll\xedtani, akkor az oszt\xe1ly nem sz\xfcks\xe9ges. (Vannak befejezetlen / nem haszn\xe1lt oszt\xe1lyok.)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"N\xe9h\xe1ny esetben a .jar f\xe1jlok helyett a 3. f\xe9l forr\xe1sk\xf3dot haszn\xe1ljuk. (k\xfcl\xf6n\xf6senDODS) \xe9s kiss\xe9 m\xf3dos\xedtotta \u0151ket, hogy elker\xfclj\xe9k a probl\xe9m\xe1kat, amelyek \xf6sszef\xfcggnekJava21. Gyakran tett\xfcnk m\xe1s enyhe m\xf3dos\xedt\xe1sokat (nevezetesenDODS) egy\xe9b okokb\xf3l."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:['A legt\xf6bb oszt\xe1lynak van tesztm\xf3dja a kapcsol\xf3d\xf3 src/test f\xe1jlban. Futtathatja a JUnit teszteket a "mvn teszt" parancsgal. Ez t\xf6bb zip adatf\xe1jlot let\xf6lt, amelyeket a tesztek a leg\xfajabb kiad\xe1st\xf3l t\xe1maszkodnak',(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddapTest/releases/",children:"ERDDAP/erddap Test"}),'.\r\n\xa0\r\nMEGJEGYZ\xc9S: Maven caches let\xf6lt\xe9se, de lez\xe1rja a let\xf6lt\xf6tt arch\xedvumokat minden v\xe9grehajt\xe1sra, ami id\u0151t vesz ig\xe9nybe. Kihagyni a let\xf6lt\xe9st\r\n\xe9s a zipping teszt adatok arch\xedvumok, lehet, hogy megadja a "skipTestResourceDownload" tulajdon Maven (pl. ',(0,s.jsx)(a.code,{children:"mvn -DskipTestResourceDownload csomag "}),") ..."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"important-classes",children:(0,s.jsx)(a.strong,{children:"Fontos oszt\xe1lyok"})}),"\n",(0,s.jsx)(a.p,{children:"Ha meg szeretn\xe9 n\xe9zni a forr\xe1sk\xf3dot, \xe9s pr\xf3b\xe1lja kital\xe1lni, hogyanERDDAP\u2122munk\xe1k, k\xe9rlek."}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"A k\xf3dJavaDoc megjegyz\xe9sek, de aJavaAz okok nem keletkeztek. \xc9rezz szabadon l\xe9trehozni \u0151ket."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"A legfontosabb oszt\xe1lyok (bele\xe9rtve az al\xe1bbiakban eml\xedtetteket) a gov/noa/pfel/erddap."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"AERDDAP\u2122Az oszt\xe1ly rendelkezik a legmagasabb szint\u0171 m\xf3dszerekkel. Ez kiterjeszti a HttpServlet-et."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"ERDDAP\u2122\xe1tadja a k\xe9relmeket az aloszt\xe1lyok eseteireEDDGridvagy EDDTable, amely egyedi adatk\xe9szleteket k\xe9pvisel."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Az EDStatic a legt\xf6bb statikus inform\xe1ci\xf3val \xe9s be\xe1ll\xedt\xe1ssal rendelkezik (pl. a setup.xml \xe9s az \xfczenetek.xml f\xe1jlokb\xf3l) statikus szolg\xe1ltat\xe1sok ny\xfajt\xe1sa (pl. e-mailek k\xfcld\xe9se) ..."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"EDDGrid\xe9s az EDDTable aloszt\xe1lyok elv\xe1lasztj\xe1k a k\xe9r\xe9st, adatokat kapnak az aloszt\xe1lyspecifikus m\xf3dszerekr\u0151l, majd form\xe1zz\xe1k az adatokat a v\xe1laszra."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"EDDGridal\xe1: bead\xe1s \xe9ve (\xe9vsz\xe1m) (a bels\u0151 adatkont\xe9ner a r\xe1csolt adatokhoz) ..."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"EDDTable aloszt\xe1lyok tolj\xe1k az adatokat a TableWriter aloszt\xe1lyokba, amelyek az adatokat egy adott f\xe1jlt\xedpusra \xedrj\xe1k."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Egy\xe9b oszt\xe1lyok (pl. alacsony szint\u0171 oszt\xe1lyok) is fontos, de kev\xe9sb\xe9 val\xf3sz\xedn\u0171, hogy dolgozol, hogy megv\xe1ltoztassa \u0151ket.\r\n\xa0"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"code-contributions",children:(0,s.jsx)(a.strong,{children:"K\xf3dex hozz\xe1j\xe1rul\xe1sok"})}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["GitHub k\xe9rd\xe9sek\r\nHa szeretne hozz\xe1j\xe1rulni, de nincs projektje, l\xe1sd a list\xe1t",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"GitHub k\xe9rd\xe9sek"}),"Ezek k\xf6z\xfcl sokan olyan projektek, amelyeket megtehetsz. Ha egy k\xe9rd\xe9sben szeretn\xe9l dolgozni, k\xe9rlek, add meg magadnak, hogy jelezd m\xe1soknak, akiken dolgozol rajta. A GitHub k\xe9rd\xe9s a legjobb hely, hogy megvitass\xe1k minden k\xe9rd\xe9st, hogyan kell folytatni a munk\xe1t az adott k\xe9rd\xe9sben."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Ha a v\xe1ltoz\xe1s, amit meg akarsz csin\xe1lni, az az al\xe1bbi k\xf6z\xf6s esetek egyike, hozzon l\xe9tre egy",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"GitHub k\xe9rd\xe9s"}),"jelezve a v\xe1ltoz\xe1st, amit sz\xe1nd\xe9kozol tenni. Ezut\xe1n, ha a v\xe1ltoz\xe1s befejez\u0151dik, h\xfazza meg a k\xe9r\xe9st az egyes\xfcl\xe9s k\xe9r\xe9s\xe9re. A k\xf6z\xf6s v\xe1ltoz\xe1sok magukban foglalj\xe1k:"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Egy m\xe1sik aloszt\xe1lyt akarsz \xedrniEDDGridvagy EDDTable egy m\xe1sik adatforr\xe1st\xedpus kezel\xe9s\xe9re. Ha igen, javasoljuk, hogy megtal\xe1lja a legk\xf6zelebbi megl\xe9v\u0151 aloszt\xe1lyt, \xe9s haszn\xe1lja ezt a k\xf3dot kezd\u0151 pontk\xe9nt."}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Szeretn\xe9 \xedrni egy m\xe1sik ment\u0151As_FileType_ m\xf3dszert. Ha igen, javasoljuk, hogy megtal\xe1lja a legk\xf6zelebbi megl\xe9v\u0151 ment\u0151As_FileType_ m\xf3dszertEDDGridvagy EDDTable, \xe9s haszn\xe1lja ezt a k\xf3dot kezd\u0151pontk\xe9nt."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["Ezeknek a helyzeteknek az az el\u0151nye, hogy az \xe1ltalad \xedrt k\xf3d \xf6nmag\xe1t tartalmazza. Nem kell tudnia az \xf6sszes r\xe9szletetERDDAPBels\u0151k. \xc9s k\xf6nny\u0171 lesz sz\xe1munkra, hogy be\xe9p\xedts\xfck a k\xf3dj\xe1t aERDDAP... Vegye figyelembe, hogy ha beny\xfajtja a k\xf3dot, a licenc kompatibilis leszERDDAP\u2122 ",(0,s.jsx)(a.a,{href:"/license",children:"licenc"}),"  (pl.:",(0,s.jsx)(a.a,{href:"https://www.apache.org/licenses/",children:"Apache"}),",",(0,s.jsx)(a.a,{href:"https://www.opensource.org/licenses/bsd-license.php",children:"BSD"}),"vagy",(0,s.jsx)(a.a,{href:"https://www.opensource.org/licenses/mit-license.php",children:"MIT-X"}),") ... Felsoroljuk a hozz\xe1j\xe1rul\xe1sodat a",(0,s.jsx)(a.a,{href:"/credits",children:"hitelek"}),"..."]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Ha van egy funkci\xf3 nem fedi le, hogy szeretn\xe9 hozz\xe1adniERDDAPJavasoljuk, hogy el\u0151sz\xf6r hozzon l\xe9tre egy vita sz\xe1lat",(0,s.jsx)(a.a,{href:"https://github.com/ERDDAP/erddap/discussions/categories/ideas",children:"GitHub vit\xe1k"}),"... Jelent\u0151s jellemz\u0151k\xe9rt/v\xe1ltoz\xe1sok\xe9rt a M\u0171szaki Test\xfclet megvitatja \u0151ket, \xe9s eld\xf6nti, hogy j\xf3v\xe1hagyja-e hozz\xe1ad\xe1s\xe1t.ERDDAP\u2122..."]}),"\n"]}),"\n",(0,s.jsx)(a.h3,{id:"judging-your-code-contributions",children:(0,s.jsx)(a.strong,{children:"A k\xf3dex hozz\xe1j\xe1rul\xe1s\xe1nak meg\xedt\xe9l\xe9se"})}),"\n",(0,s.jsx)(a.p,{children:"Ha k\xf3dot vagy egy\xe9b v\xe1ltoztat\xe1sokat szeretne beny\xfajtani, amelyeket bele kell foglalniERDDAPEz nagyszer\u0171. Hozz\xe1j\xe1rul\xe1sodnak meg kell felelnie bizonyos krit\xe9riumoknak annak \xe9rdek\xe9ben, hogy elfogadjuk. Ha k\xf6veted az al\xe1bbi ir\xe1nymutat\xe1sokat, akkor nagyban n\xf6veled az elfogadott hozz\xe1j\xe1rul\xe1sod es\xe9ly\xe9t.\r\n\xa0"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"AERDDAP\u2122A projektet egy NATD kezeli (NOAAKinevezett m\u0171szaki igazgat\xf3) bemenettel egy Technikai Test\xfcletb\u0151l.\r\n2007-t\u0151l (kezdeteERDDAP) 2022-re ez Bob Simons volt (Alap\xedt\xf3-vezet\u0151) ... 2023 janu\xe1rj\xe1ban kezd\u0151d\u0151en ez Chris John. Alapvet\u0151en a NATD felel\u0151s aERDDAP, teh\xe1t \u0151 a v\xe9gs\u0151 sz\xf3 a d\xf6nt\xe9sekr\u0151lERDDAP\u2122k\xf3d, nevezetesen a tervez\xe9sr\u0151l \xe9s arr\xf3l, hogy egy adott h\xfaz\xe1si k\xe9relmet elfogadnak-e vagy sem. Ennek r\xe9szben a hat\xe9konys\xe1gi okokb\xf3l kell lennie (nagyszer\u0171en m\u0171k\xf6dik a Linus Torvalds \xe9s a Linux sz\xe1m\xe1ra) r\xe9szben biztons\xe1gi okokb\xf3l: Valakinek meg kell mondania az informatikai biztons\xe1gi embereket, akik a k\xf3d biztons\xe1g\xe1\xe9rt \xe9s integrit\xe1s\xe1\xe9rt felelnek.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"A NATD nem garant\xe1lja, hogy elfogadja a k\xf3dj\xe1t.\r\nHa egy projekt nem m\u0171k\xf6dik, \xe9s rem\xe9lt\xfck, \xe9s ha nem lehet megmenteni, a NATD nem tartalmazza a projektet a projektben.ERDDAP\u2122eloszt\xe1s. K\xe9rj\xfck, ne \xe9rezze rosszul. N\xe9ha a projektek nem dolgoznak ki, \xe9s rem\xe9lik. Ez t\xf6rt\xe9nik minden szoftverfejleszt\u0151vel. Ha k\xf6veti az al\xe1bbi ir\xe1nymutat\xe1sokat, akkor nagyban n\xf6veli a siker es\xe9lyeit.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"A legjobb, ha a v\xe1ltoz\xe1sok \xe1ltal\xe1nos \xe9rdek\u0171ek \xe9s hasznosak.\r\nHa a k\xf3d specifikus a szervezet sz\xe1m\xe1ra, akkor val\xf3sz\xedn\u0171leg a legjobb, ha fenntartja a k\xfcl\xf6n\xe1ll\xf3 fi\xf3kotERDDAP\u2122Haszn\xe1lat\xe1hoz. Axiom ezt teszi. Szerencs\xe9re Git megk\xf6nny\xedti ezt. A NATD egy k\xf6vetkezetes j\xf6v\u0151k\xe9pet akar fenntartaniERDDAPNem engedi, hogy konyhai s\xfcllyeszt\u0151 projekt legyen, ahol mindenki hozz\xe1ad egy egyedi funkci\xf3t a projekthez.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["K\xf6vesse aJavaK\xf3d Egyezm\xe9nyek.\r\n\xc1ltal\xe1ban a k\xf3dnak j\xf3 min\u0151s\xe9g\u0171nek kell lennie, \xe9s k\xf6vetnie kell az eredeti",(0,s.jsx)(a.a,{href:"https://www.oracle.com/technetwork/java/codeconventions-150003.pdf",children:"JavaK\xf3dexegyezm\xe9nyek"}),": tedd .class f\xe1jlokat a megfelel\u0151 helyre a k\xf6nyvt\xe1ri strukt\xfar\xe1ban, adjon .class f\xe1jlokat megfelel\u0151 nevet, bele\xe9rtve a megfelel\u0151 helyetJavaDoc megjegyz\xe9sek, bele\xe9rtve //kommentek a k\xf3d egyes bekezd\xe9s\xe9nek kezdet\xe9n, 4 helyet tartalmazva (nem f\xfcl) Ker\xfclje a sorokat > 80 karakter, stb. Az egyezm\xe9nyek v\xe1ltoz\xe1sa \xe9s a forr\xe1sk\xf3d nem mindig teljes m\xe9rt\xe9kben naprak\xe9sz. Ha k\xe9ts\xe9g mer\xfcl fel, illeszkedjen a k\xf3dhoz az egyezm\xe9nyekhez, \xe9s nem l\xe9tez\u0151 k\xf3dhoz."]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Haszn\xe1ljon le\xedr\xf3 oszt\xe1lyt, m\xf3dszert \xe9s v\xe1ltoz\xf3 neveket.\r\nEz megk\xf6nny\xedti a k\xf3dot m\xe1sok sz\xe1m\xe1ra, hogy olvass\xe1k.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Ker\xfclje a fancy k\xf3dot.\r\nHossz\xfa t\xe1von neked vagy m\xe1s embereknek ki kell tal\xe1lniuk a k\xf3dot annak \xe9rdek\xe9ben, hogy fenntarts\xe1k. K\xe9rj\xfck, haszn\xe1lja egyszer\u0171 k\xf3dol\xe1si m\xf3dszereket, amelyek \xedgy k\xf6nnyebbek m\xe1sok sz\xe1m\xe1ra (bele\xe9rtve \xd6nt a j\xf6v\u0151ben) kital\xe1lni. Nyilv\xe1nval\xf3, hogy ha van egy igazi el\u0151nye, hogy valamilyen fant\xe1ziaJavaprogramoz\xe1si funkci\xf3, haszn\xe1lja, de r\xe9szletesen dokument\xe1lja, amit csin\xe1lt, mi\xe9rt \xe9s hogyan m\u0171k\xf6dik.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Dolgozzon a Technikai Test\xfclettel, miel\u0151tt elkezden\xe9.\r\nHa rem\xe9led, hogy a k\xf3dod megv\xe1ltozik, beh\xfaz\xf3dikERDDAP\u2122A M\u0171szaki Test\xfclet hat\xe1rozottan arr\xf3l akar besz\xe9lni, hogy mit fog tenni, \xe9s hogyan fogod megtenni, miel\u0151tt b\xe1rmilyen v\xe1ltoztat\xe1st teszel a k\xf3dhoz. \xcdgy elker\xfclhetj\xfck, hogy megv\xe1ltoztassuk, amit a NATD v\xe9g\xfcl nem fogad el. Amikor a munk\xe1t v\xe9gzi, a NATD \xe9s a Technikai Test\xfclet hajland\xf3 v\xe1laszolni a k\xe9rd\xe9sekre, hogy seg\xedtsen kital\xe1lni a megl\xe9v\u0151 k\xf3dot \xe9s (\xe1ltal\xe1nos) hogyan kell kezelni a projektet.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:['\xf6n\xe1ll\xf3an dolgozik (a lehet\u0151 legt\xf6bbet) ut\xe1na indulsz.\r\nA fenti "Work with the Technical Board"-val ellent\xe9tben, miut\xe1n elkezdte a projektet, a NATD arra \xf6szt\xf6nzi \xd6nt, hogy a lehet\u0151 legf\xfcggetlenebb m\xf3don dolgozzon. Ha a NATD-nek szinte mindent el kell mondania, \xe9s sok k\xe9rd\xe9sre v\xe1laszol (k\xfcl\xf6n\xf6sen azok, akiket a dokument\xe1ci\xf3 vagy a k\xf3d olvas\xe1s\xe1val v\xe1laszolhatt\xe1l) Akkor az er\u0151fesz\xedt\xe9seid nem egy id\u0151megtakar\xedt\xe1s a NATD sz\xe1m\xe1ra, \xe9s \u0151 is elv\xe9gezheti a munk\xe1t. Ez a',(0,s.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/The_Mythical_Man-Month",children:"M\xedtoszi Ember Month"}),"probl\xe9ma. Term\xe9szetesen m\xe9g mindig kommunik\xe1lnunk kell. Nagyszer\u0171 lenne rendszeresen l\xe1tni a munk\xe1j\xe1t, hogy megbizonyosodjon arr\xf3l, hogy a projekt a p\xe1ly\xe1n van. Min\xe9l t\xf6bbet tudsz \xf6n\xe1ll\xf3an dolgozni (miut\xe1n a Technikai Test\xfclet elfogadja a feladatot, \xe9s az \xe1ltal\xe1nos megk\xf6zel\xedt\xe9s) Jobb.\r\n\xa0"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Ker\xfclje a hib\xe1kat.\r\nHa egy hiba nem fogott el a kiad\xe1s el\u0151tt, probl\xe9m\xe1t okoz a felhaszn\xe1l\xf3k sz\xe1m\xe1ra (a legjobb) visszat\xe9r a rossz inform\xe1ci\xf3hoz (a legrosszabb) , egy robban\xe1sERDDAPH\xedrn\xe9v, \xe9s tov\xe1bbra is kimarad a d\xe1tumb\xf3lERDDAP\u2122berendez\xe9sek \xe9vekig. Nagyon neh\xe9z elker\xfclni a hib\xe1kat. R\xe9sze ennek \xedr\xe1sa tiszta k\xf3d (\xedgy k\xf6nnyebb l\xe1tni a probl\xe9m\xe1kat) ... Ennek egy r\xe9sze az \xedr\xe1si egys\xe9g tesztek. Ennek egy r\xe9sze a hib\xe1s elker\xfcl\xe9s \xe1lland\xf3 hozz\xe1\xe1ll\xe1sa, amikor k\xf3dot \xedr. Ne tedd a NATD sajn\xe1lat\xe1t, hogy hozz\xe1add a k\xf3dodatERDDAP\u2122...\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:'\xcdrjon egy egys\xe9g tesztet vagy tesztet.\r\n\xdaj k\xf3dhoz \xedrjon JUnit teszteket egy tesztf\xe1jlban.\r\nK\xe9rj\xfck, \xedrjon legal\xe1bb egy egy\xe9ni tesztm\xf3dszert, amely alaposan teszteli a k\xf3dot, amelyet \xedr, \xe9s adja hozz\xe1 az oszt\xe1ly JUnit tesztf\xe1jlj\xe1hoz, hogy automatikusan futjon. Egys\xe9g (\xe9s kapcsol\xf3d\xf3) a tesztek az egyik legjobb m\xf3dja a hib\xe1k elkap\xe1s\xe1nak, kezdetben \xe9s hossz\xfa t\xe1von (mint m\xe1s dolgok megv\xe1ltoznakERDDAP\u2122) ... Ahogy Bob mondta: "Az egys\xe9ges tesztek az, ami \xe9jszaka alszanak."\r\n\xa0'}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"K\xf6nny\u0171v\xe9 tenni a NATD sz\xe1m\xe1ra, hogy meg\xe9rtse \xe9s elfogadja a h\xfaz\xe1si k\xe9relem v\xe1ltoz\xe1sait.\r\nEnnek egy r\xe9sze egy egys\xe9g-teszt m\xf3dszert \xedr (s) ... Ennek egy r\xe9sze korl\xe1tozza a v\xe1ltoz\xe1sokat a k\xf3d egyik szakasz\xe1ra (vagy egy oszt\xe1ly) ha lehets\xe9ges. A NATD nem fogad el semmilyen h\xfaz\xe1si k\xe9relmet t\xf6bb sz\xe1z v\xe1ltoztat\xe1ssal a k\xf3dban. A NATD elmondja az informatikai biztons\xe1gi embereknek, hogy v\xe1llalja a felel\u0151ss\xe9get a k\xf3d biztons\xe1g\xe1\xe9rt \xe9s integrit\xe1s\xe1\xe9rt. Ha t\xfal sok v\xe1ltoz\xe1s van, vagy t\xfal neh\xe9z kital\xe1lni, akkor t\xfal neh\xe9z ellen\u0151rizni a v\xe1ltoz\xe1sokat, \xe9s nem vezet be hib\xe1kat vagy biztons\xe1gi k\xe9rd\xe9seket.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Tartsa egyszer\u0171.\r\nEgy j\xf3 \xe1ltal\xe1nos t\xe9ma a k\xf3d: Tartsa egyszer\u0171. Egyszer\u0171 k\xf3d k\xf6nnyen m\xe1sok sz\xe1m\xe1ra (bele\xe9rtve \xd6nt a j\xf6v\u0151ben) olvasni \xe9s fenntartani. K\xf6nny\u0171 meg\xe9rteni \xe9s elfogadni a NATD-t.\r\n\xa0"}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Tegy\xfck fel a hossz\xfa t\xe1v\xfa felel\u0151ss\xe9get a k\xf3dod\xe9rt.\r\nHossz\xfa t\xe1von a legjobb, ha folyamatosan v\xe1llalja a felel\u0151ss\xe9get a k\xf3d fenntart\xe1sa \xe9s a k\xe9rd\xe9sek megv\xe1laszol\xe1sa miatt. (pl. aERDDAP\u2122Google Csoport) ... Ahogy egyes szerz\u0151k megjegyzik, a k\xf3d felel\u0151ss\xe9g, valamint eszk\xf6z. Ha egy hib\xe1t fedeznek fel a j\xf6v\u0151ben, akkor a legjobb, ha r\xf6gz\xedti, mert senki sem tudja jobban a k\xf3dj\xe1t, mint te (is, hogy van egy \xf6szt\xf6nz\u0151, hogy elker\xfclj\xe9k a hib\xe1kat az els\u0151 helyen) ... A NATD nem k\xe9r szil\xe1rd elk\xf6telezetts\xe9get a folyamatos karbantart\xe1s mellett. A NATD csak azt mondja, hogy a karbantart\xe1st nagyra \xe9rt\xe9kelik."}),"\n"]}),"\n"]})]})}function d(e={}){const{wrapper:a}={...(0,l.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(z,{...e})}):z(e)}}}]);