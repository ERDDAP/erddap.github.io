"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8282],{28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>i});var d=s(96540);const a={},l=d.createContext(a);function r(e){const n=d.useContext(l);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),d.createElement(l.Provider,{value:n},e.children)}},36042:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>d,toc:()=>c});const d=JSON.parse('{"id":"server-admin/deploy-update","title":"(\uc8fc)","description":"Existing\uc758 \uc5c5\ub370\uc774\ud2b8\ub97c \uc218\ud589\ud558\ub294 \ubc29\ubc95ERDDAP\u2122\uc11c\ubc84\uc5d0\uc11c","source":"@site/i18n/ko/docusaurus-plugin-content-docs/current/server-admin/deploy-update.md","sourceDirName":"server-admin","slug":"/server-admin/deploy-update","permalink":"/ko/docs/server-admin/deploy-update","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/deploy-update.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"\uc124\uce58\ud558\uae30","permalink":"/ko/docs/server-admin/deploy-install"},"next":{"title":"ERDDAP\u2122 - Working with the datasets.xml File","permalink":"/ko/docs/server-admin/datasets"}}');var a=s(74848),l=s(28453);const r={sidebar_position:2},i="(\uc8fc)",t={},c=[{value:"\uae30\ud0c0",id:"changes",level:2},{value:"Java",id:"java",level:2},{value:"\ub2e4\uc6b4\ub85c\ub4dc",id:"download",level:2},{value:"\uba54\uc2dc\uc9c0.xml",id:"messagesxml",level:2},{value:"\uc124\uce58\ud558\uae30",id:"install",level:2},{value:"\ub9ac\ub205\uc2a4 \ubc0f \ub9e5",id:"linux-and-macs",level:3},{value:"\uc708\ub3c4\uc6b0",id:"windows",level:3}];function o(e){const n={a:"a",br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"\uc8fc",children:"(\uc8fc)"})}),"\n",(0,a.jsx)(n.p,{children:"Existing\uc758 \uc5c5\ub370\uc774\ud2b8\ub97c \uc218\ud589\ud558\ub294 \ubc29\ubc95ERDDAP\u2122\uc11c\ubc84\uc5d0\uc11c"}),"\n",(0,a.jsx)(n.h2,{id:"changes",children:"\uae30\ud0c0"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38",(0,a.jsx)(n.a,{href:"/changes",children:"\uae30\ud0c0"}),'"Things"\ub77c\ub294 \uc139\uc158\uc5d0\uc11cERDDAP\u2122Administrators Need to know and Do"\ubaa8\ub4e0\uc5d0 \ub300\ud55cERDDAP\u2122\ub2f9\uc2e0\uc774 \uc0ac\uc6a9 \ub41c \ubc84\uc804\ubd80\ud130 \ubc84\uc804.\n\xa0']}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"java",children:"Java"}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsxs)(n.li,{children:["\ub2f9\uc2e0\uc740\uc5d0\uc11c \uaca9\uc0c1\uc2dc\ud0a4\ub294 \uacbd\uc6b0\uc5d0ERDDAP\u2122\ubc84\uc804 2.18 \uc774\ud558, \ub2f9\uc2e0\uc740 \uc804\ud658\ud574\uc57cJava24\uc2dc\uac04 (\ub610\ub294 newer) \uadf8\ub9ac\uace0 \uad00\ub828 Tomcat 10. \uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38ERDDAP\u2122\uc124\uce58 \uc124\uba85\uc11c",(0,a.jsx)(n.a,{href:"/docs/server-admin/deploy-install#java",children:"Java"}),"\uc774\ub984 *",(0,a.jsx)(n.a,{href:"/docs/server-admin/deploy-install#tomcat",children:"\ud1b0\ucea3"}),"\xb7 \ub2f9\uc2e0\uc740 \ub610\ud55c \ub2f9\uc2e0\uc758 \ubcf5\uc0ac\ud574\uc57c\ud569\ub2c8\ub2e4_tomcat_/content/erddap\uc624\ub798\ub41c Tomcat \uc124\uce58\uc5d0\uc11c \uc0c8\ub85c\uc6b4 Tomcat \uc124\uce58\ub85c \ub514\ub809\ud1a0\ub9ac."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"download",children:"\ub2e4\uc6b4\ub85c\ub4dc"}),"\n",(0,a.jsxs)(n.ol,{start:"3",children:["\n",(0,a.jsxs)(n.li,{children:["\ub2e4\uc6b4\ub85c\ub4dc",(0,a.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war",children:"\ub2e4\uc6b4\ub85c\ub4dc"}),"\uc73c\ub85c ",(0,a.jsx)(n.em,{children:"tomcat"}),"/webapps .\n(\ubc84\uc804 2.26, 607,404,032 \ubc14\uc774\ud2b8, MD5=99a725108b37708e5420986c1616a119, \ub0a0\uc9dc 03-31-2025)\n\xa0"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"messagesxml",children:"\uba54\uc2dc\uc9c0.xml"}),"\n",(0,a.jsxs)(n.ol,{start:"4",children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"\uc77c\ubc18: \ub2f9\uc2e0\uc740\uc5d0\uc11c \uaca9\uc0c1\uc2dc\ud0a4\ub294 \uacbd\uc6b0\uc5d0ERDDAP\u2122\ubc84\uc804 1.46 (\ub610\ub294 \uc704) \uadf8\ub9ac\uace0 \ub2f9\uc2e0\uc740 \uadf8\ub0e5 \ud45c\uc900 \uba54\uc2dc\uc9c0\ub97c \uc0ac\uc6a9, \uc0c8\ub85c\uc6b4 \ud45c\uc900 message.xml \uc790\ub3d9\uc73c\ub85c \uc124\uce58\ub429\ub2c8\ub2e4 (erddap\uc744 \ud1b5\ud574 .class \ud30c\uc77c \uc911. \uc804\uc7c1 \uc804\uc7c1) \xb7\n\xa0"}),"\n",(0,a.jsxs)(n.li,{children:["\ud76c\uadc0 : \ub2f9\uc2e0\uc740\uc5d0\uc11c \uaca9\uc0c1\uc2dc\ud0a4\ub294 \uacbd\uc6b0\uc5d0ERDDAP\u2122\ubc84\uc804 1.44 (\ub610\ub294 \uc544\ub798) \xb7\n\ub2f9\uc2e0\uc740 \uc774\uc804 message.xml \ud30c\uc77c\uc744 \uc0ad\uc81c:\n",(0,a.jsx)(n.em,{children:"tomcat"}),"/content/erddap/messages.xml\uc758.\n\uc0c8\ub85c\uc6b4 \ud45c\uc900 message.xml\uc740 \uc790\ub3d9\uc73c\ub85c \uc124\uce58\ub429\ub2c8\ub2e4. (erddap\uc744 \ud1b5\ud574 .class \ud30c\uc77c \uc911. \uc804\uc7c1 \uc804\uc7c1) \xb7\n\xa0"]}),"\n",(0,a.jsx)(n.li,{children:"\ud76c\uadc0 : \ud56d\uc0c1 \ud45c\uc900 message.xml \ud30c\uc77c \ubcc0\uacbd (\ub0b4 \uacc4\uc815) \xb7\n\uc0c8\ub85c\uc6b4 message.xml \ud30c\uc77c\ub85c \ubcc0\uacbd\ud574\uc57c \ud569\ub2c8\ub2e4.\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml erddap.war\uac00 Tomcat\uc5d0 \uc758\ud574 decompressed \ud6c4\uc5d0.\n\xa0"}),"\n",(0,a.jsx)(n.li,{children:"\ud76c\uadc0 : custom message.xml \ud30c\uc77c\uc744 \uc720\uc9c0\ud558\uba74_tomcat_/content/erddap\xb7\n\ub2f9\uc2e0\uc740 \uc54c\uc544\ub0bc \ud544\uc694\uac00 (diff\ub97c \ud1b5\ud574) \uc5b4\ub5a4 \ubcc0\uacbd\uc774 default message.xml (\uc0c8\ub85c\uc6b4 erddap\uc5d0 \uc788\uc2b5\ub2c8\ub2e4. \uc804\uc7c1\uc73c\ub85c\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) \ubc0f \uc0ac\uc6a9\uc790 \uc815\uc758 \uba54\uc2dc\uc9c0\ub97c \uc218\uc815\ud569\ub2c8\ub2e4.xml \ud30c\uc77c\uc5d0 \ub530\ub77c.\n\xa0"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"install",children:"\uc124\uce58\ud558\uae30"}),"\n",(0,a.jsxs)(n.ol,{start:"5",children:["\n",(0,a.jsx)(n.li,{children:"\uc0c8 \uc124\uce58ERDDAP\u2122Tomcat\uc5d0\uc11c:\n\uc774\ub984 * Tomcat Manager\ub97c \uc0ac\uc6a9\ud558\uc9c0 \ub9c8\uc2ed\uc2dc\uc624. \uace7 \ub610\ub294 \ub098\uc911\uc5d0 PermGen \uba54\ubaa8\ub9ac \ubb38\uc81c\uac00\uc788\uc744 \uac83\uc785\ub2c8\ub2e4. \uc2e4\uc81c\ub85c \uc885\ub8cc \ubc0f \uc2dc\uc791 Tomcat\uc5d0 \ub354 \ub098\uc740.\n\\* \ucef4\ud4e8\ud130\uc5d0\uc11c \uc2e4\uc81c Tomcat \ub514\ub809\ud1a0\ub9ac\uc640 \uc544\ub798 _tomcat_\uc5d0 \ucc38\uc870\ub97c \ub300\uccb4\ud558\uc2ed\uc2dc\uc624.\n\xa0"}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"linux-and-macs",children:"\ub9ac\ub205\uc2a4 \ubc0f \ub9e5"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\ud3d0\uc1c4 Tomcat: \uba85\ub839\uc904\uc5d0\uc11c \uc0ac\uc6a9: ",(0,a.jsx)(n.em,{children:"tomcat"}),"/bin/shutdown.sh\n\uadf8\ub9ac\uace0 \uc0ac\uc6a9 ps -ef|grep tomcat\uc740 if/when \ud504\ub85c\uc138\uc2a4\uac00 \uc911\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4. (1\ubd84 \ub610\ub294 2\ubd84 \uc815\ub3c4 \uac78\ub9b4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.)"]}),"\n",(0,a.jsxs)(n.li,{children:["decompressed \uc81c\uac70ERDDAP\u2122\uc784\uba85: \uc5d0\uc11c ",(0,a.jsx)(n.em,{children:"tomcat"}),"/webapps, \uc0ac\uc6a9\nrm -rf\uc758 erddap"]}),"\n",(0,a.jsxs)(n.li,{children:["\uc624\ub798\ub41c erddap\uc744 \uc0ad\uc81c\ud569\ub2c8\ub2e4. \uc804\uc7c1 \ud30c\uc77c: \uc5d0\uc11c ",(0,a.jsx)(n.em,{children:"tomcat"}),"/webapps, \uc0ac\uc6a9 rm erddap. \uc804\uc7c1 \uc804\uc7c1"]}),"\n",(0,a.jsxs)(n.li,{children:["\uc0c8\ub85c\uc6b4 erddap\uc744 \ubcf5\uc0ac\ud569\ub2c8\ub2e4. \uc784\uc2dc \ub514\ub809\ud1a0\ub9ac\uc758 \uc804\uc7c1 \ud30c\uc77c ",(0,a.jsx)(n.em,{children:"tomcat"}),"/webapps"]}),"\n",(0,a.jsxs)(n.li,{children:["\ud1b0\ucea3\uacfcERDDAP: \uc0ac\uc6a9 ",(0,a.jsx)(n.em,{children:"tomcat"}),"/bin/startup.sh"]}),"\n",(0,a.jsxs)(n.li,{children:["(\uc8fc)ERDDAP\u2122\ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ub2e4\uc2dc \uc2dc\uc791\uc774 \uc131\uacf5\ud588\ub294\uc9c0 \ud655\uc778\ud558\uc2ed\uc2dc\uc624.\n(\uc885\uc885, \ub2f9\uc2e0\uc740 \uba87 \ubc88 \uc2dc\ub3c4\ud558\uace0 \ub2f9\uc2e0\uc774 \ubcfc \uc804\uc5d0 \ubd84 \uae30\ub2e4\ub9bd\ub2c8\ub2e4ERDDAP\u2122\xb7)",(0,a.jsx)(n.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"windows",children:"\uc708\ub3c4\uc6b0"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\ud3d0\uc1c4 Tomcat: \uba85\ub839\uc904\uc5d0\uc11c use: ",(0,a.jsx)(n.em,{children:"tomcat"}),"\\bin\\\\shutdown.bat"]}),"\n",(0,a.jsxs)(n.li,{children:["decompressed \uc81c\uac70ERDDAP\u2122\uc784\uba85: \uc5d0\uc11c ",(0,a.jsx)(n.em,{children:"tomcat"}),"/webapps, \uc0ac\uc6a9\n\ub378 /S / Q erddap"]}),"\n",(0,a.jsxs)(n.li,{children:["\uc624\ub798\ub41c erddap\uc744 \uc0ad\uc81c\ud569\ub2c8\ub2e4. \uc804\uc7c1 \ud30c\uc77c: \uc5d0\uc11c ",(0,a.jsx)(n.em,{children:"tomcat"}),"\\webapps, \uc0ac\uc6a9 del erddap. \uc804\uc7c1 \uc804\uc7c1"]}),"\n",(0,a.jsxs)(n.li,{children:["\uc0c8\ub85c\uc6b4 erddap\uc744 \ubcf5\uc0ac\ud569\ub2c8\ub2e4. \uc784\uc2dc \ub514\ub809\ud1a0\ub9ac\uc758 \uc804\uc7c1 \ud30c\uc77c ",(0,a.jsx)(n.em,{children:"tomcat"}),"\\webapps"]}),"\n",(0,a.jsxs)(n.li,{children:["\ud1b0\ucea3\uacfcERDDAP: \uc0ac\uc6a9 ",(0,a.jsx)(n.em,{children:"tomcat"}),"\\bin\\startup.bat"]}),"\n",(0,a.jsx)(n.li,{children:"(\uc8fc)ERDDAP\u2122\ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ub2e4\uc2dc \uc2dc\uc791\uc774 \uc131\uacf5\ud588\ub294\uc9c0 \ud655\uc778\ud558\uc2ed\uc2dc\uc624.\n(\uc885\uc885, \ub2f9\uc2e0\uc740 \uba87 \ubc88 \uc2dc\ub3c4\ud558\uace0 \ub2f9\uc2e0\uc774 \ubcfc \uc804\uc5d0 \ubd84 \uae30\ub2e4\ub9bd\ub2c8\ub2e4ERDDAP\u2122\xb7)"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Troubles \uc5c5\ub370\uc774\ud2b8ERDDAP\xb7 \ub354 \ubcf4\uae30",(0,a.jsx)(n.a,{href:"/docs/intro#support",children:"\ub354 \ub9ce\uc740 \uc9c0\uc6d0 \uc5bb\uae30\uc5d0 \uc139\uc158"}),"\xb7"]})]})}function m(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}}}]);