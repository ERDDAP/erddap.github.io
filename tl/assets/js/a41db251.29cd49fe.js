"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7857],{12673:(a,n,e)=>{e.r(n),e.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"server-admin/deploy-update","title":"Update","description":"Kung Paano Gagawin ang Isang Update ng Pag - iralERDDAP\u2122sa Iyong Server","source":"@site/i18n/tl/docusaurus-plugin-content-docs/current/server-admin/deploy-update.md","sourceDirName":"server-admin","slug":"/server-admin/deploy-update","permalink":"/tl/docs/server-admin/deploy-update","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/deploy-update.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"Iluklok","permalink":"/tl/docs/server-admin/deploy-install"},"next":{"title":"ERDDAP\u2122 - Working with the datasets.xml File","permalink":"/tl/docs/server-admin/datasets"}}');var s=e(74848),g=e(28453);const l={sidebar_position:2},t="Update",d={},o=[{value:"Mga pagbabago",id:"changes",level:2},{value:"Java",id:"java",level:2},{value:"Ibaba",id:"download",level:2},{value:".xml",id:"messagesxml",level:2},{value:"Iluklok",id:"install",level:2},{value:"Linux at Macs",id:"linux-and-macs",level:3},{value:"Windows",id:"windows",level:3}];function r(a){const n={a:"a",br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,g.R)(),...a.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"update",children:"Update"})}),"\n",(0,s.jsx)(n.p,{children:"Kung Paano Gagawin ang Isang Update ng Pag - iralERDDAP\u2122sa Iyong Server"}),"\n",(0,s.jsx)(n.h2,{id:"changes",children:"Mga pagbabago"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Gawin ang mga pagbabagong nakatala sa",(0,s.jsx)(n.a,{href:"/changes",children:"Mga pagbabago"}),'sa seksiyong pinamagatang "Mga Bagay na MahalagaERDDAP\u2122Kailangang Malaman at Gawin ng mga Administrador" para sa lahat ng mgaERDDAP\u2122na mula pa noong bersyong ginagamit mo.\n\xa0']}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"java",children:"Java"}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:["Kung ikaw ay lumalayoERDDAP\u2122bersyon 2.18 o sa ibaba, kailangan mong lumipatJava21 (o mas bago) at ang kaugnay na Tomcat 10. Tingnan ang regularERDDAP\u2122maglagay ng mga tagubilin para sa",(0,s.jsx)(n.a,{href:"/docs/server-admin/deploy-install#java",children:"Java"}),"at",(0,s.jsx)(n.a,{href:"/docs/server-admin/deploy-install#tomcat",children:"Tomcat"}),". Kailangan mo ring kopyahin ang iyong_tomcat_/content/erddapdirectory mula sa iyong lumang instalasyon ng Tomcat sa iyong bagong instalasyon ng Tomcat."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"download",children:"Ibaba"}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["Ibaba",(0,s.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war",children:"erddap.war"}),"sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"/webapps .\n(bersyon 2.26, 607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, may petsang 03-31-2025)\n\xa0"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"messagesxml",children:".xml"}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Karaniwan: Kung ikaw ay lumalayoERDDAP\u2122bersyon 1.46 (o sa itaas) at gagamitin mo lamang ang pamantayang mga mensahe, ang bagong pamantayang mga mensahe.xml ay kusang iluluklok (kabilang ang mga talaksang .class sa pamamagitan ng erddap. digmaan) .\n\xa0"}),"\n",(0,s.jsxs)(n.li,{children:["Pambihira: Kung ikaw ay lumalayoERDDAP\u2122bersyon 1.44 (o sa ibaba) ,\nKayo ang mag - aalis ng lumang mga mensahe.\n",(0,s.jsx)(n.em,{children:"tomcat"}),"/content/erddap/messages.xml .\nAng mga bagong pamantayang mensahe.xml ay awtomatikong iluluklok (kabilang ang mga talaksang .class sa pamamagitan ng erddap. digmaan) .\n\xa0"]}),"\n",(0,s.jsx)(n.li,{children:"Pambihira: Kung lagi kang gumagawa ng mga pagbabago sa pamantayang mga mensahe. (kahalili) ,\nkailangan mong gawin ang mga pagbabagong iyon sa bagong mga mensahe.\nWEB-INF/class/gov/noa/pfel/erddap/util/messages.xml pagkatapos ng erddap.war ay decompressed sa pamamagitan ng Tomcat).\n\xa0"}),"\n",(0,s.jsxs)(n.li,{children:["Pambihira: Kung ikaw ay may dalang mensahe ng kaugalian.",(0,s.jsx)(n.em,{children:"tomcat"}),"/content/erddap/,\nkailangan mong malaman (sa pamamagitan ng diff) kung anong mga pagbabago ang ginawa sa mga default na mensahe.xml (na nasa bagong erddap. digmaan bilang\nWEB-INF/class/gov/noa/pfel/erddap/util/messages.xml) at baguhin ang iyong mga mensaheng pang-ugali.xml file alinsunod dito.\n\xa0"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"install",children:"Iluklok"}),"\n",(0,s.jsxs)(n.ol,{start:"5",children:["\n",(0,s.jsxs)(n.li,{children:["Iluklok ang bagoERDDAP\u2122sa Tomcat:\n\\* Huwag gamitin si Tomcat Maler. Sa malao't madali ay magkakaroon ng mga isyu sa memorya sa PermGen. Mas mabuti na aktuwal na alisin at simulan ang Tomcat.\n\\* Palitan ang mga reperensiya sa ",(0,s.jsx)(n.em,{children:"tomcat"})," sa ibaba ng aktuwal na Tomcat directory sa iyong computer.\n\xa0"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"linux-and-macs",children:"Linux at Macs"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Shutdown Tomcat: Mula sa command line, gamitin: ",(0,s.jsx)(n.em,{children:"Tomcat"}),"/bin/shutdown.sh\nAt gumamit ng ps -ef|Mag-rep tomcat upang tingnan kung/kapag nahinto na ang proseso. (Maaaring kumuha ng isa o dalawang minuto.)"]}),"\n",(0,s.jsxs)(n.li,{children:["Alisin ang decompressedERDDAP\u2122pagluklok: Sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"/webapps, gamitin\nerddap ng rm -rf"]}),"\n",(0,s.jsxs)(n.li,{children:["Tanggalin ang lumang erddap. talaksang pandigma: Sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"/webapps, gamitin ang rm erddap. digmaan"]}),"\n",(0,s.jsxs)(n.li,{children:["Kopyahin ang bagong erddap. Ang talaksang pandigma mula sa pansamantalang directory hanggang sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"/webapps"]}),"\n",(0,s.jsxs)(n.li,{children:["Restart Tomcat atERDDAP: gamitin ang ",(0,s.jsx)(n.em,{children:"tomcat"}),"/bin/startup.sh"]}),"\n",(0,s.jsxs)(n.li,{children:["PangmalasERDDAP\u2122sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay.\n(Kadalasan, kailangan mong subukan nang ilang beses at maghintay ng isang minuto bago mo makitaERDDAP\u2122.)",(0,s.jsx)(n.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"windows",children:"Windows"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Shutdown Tomcat: Mula sa command line, gamitin ang: ",(0,s.jsx)(n.em,{children:"Tomcat"}),"\\bin\\shutdown.bat"]}),"\n",(0,s.jsxs)(n.li,{children:["Alisin ang decompressedERDDAP\u2122pagluklok: Sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"/webapps, gamitin\ndel /S/Q erddap"]}),"\n",(0,s.jsxs)(n.li,{children:["Tanggalin ang lumang erddap. talaksang pandigma: Sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"\\webapps, gumamit ng del erddap. digmaan"]}),"\n",(0,s.jsxs)(n.li,{children:["Kopyahin ang bagong erddap. talaksang pandigma mula sa pansamantalang directory hanggang sa ",(0,s.jsx)(n.em,{children:"tomcat"}),"\\webapps"]}),"\n",(0,s.jsxs)(n.li,{children:["Restart Tomcat atERDDAP: gamitin ang ",(0,s.jsx)(n.em,{children:"tomcat"}),"\\bin\\startup.bat"]}),"\n",(0,s.jsx)(n.li,{children:"PangmalasERDDAP\u2122sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay.\n(Kadalasan, kailangan mong subukan nang ilang beses at maghintay ng isang minuto bago mo makitaERDDAP\u2122.)"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Ang mga Suliranin ay Nagdudulot ng ProblemaERDDAP? Tingnan ang",(0,s.jsx)(n.a,{href:"/docs/intro#support",children:"sa pagkuha ng karagdagang suporta"}),"."]})]})}function m(a={}){const{wrapper:n}={...(0,g.R)(),...a.components};return n?(0,s.jsx)(n,{...a,children:(0,s.jsx)(r,{...a})}):r(a)}},28453:(a,n,e)=>{e.d(n,{R:()=>l,x:()=>t});var i=e(96540);const s={},g=i.createContext(s);function l(a){const n=i.useContext(g);return i.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function t(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(s):a.components||s:l(a.components),i.createElement(g.Provider,{value:n},a.children)}}}]);