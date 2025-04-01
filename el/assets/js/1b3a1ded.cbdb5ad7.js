"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4350],{28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>i});var r=s(96540);const d={},l=r.createContext(d);function a(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:a(e.components),r.createElement(l.Provider,{value:n},e.children)}},72377:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"server-admin/deploy-update","title":"\u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7","description":"\u03a0\u03ce\u03c2 \u03bd\u03b1 \u039a\u03ac\u03bd\u03b5\u03c4\u03b5 \u03bc\u03b9\u03b1 \u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7 \u03bc\u03b9\u03b1\u03c2 \u03a5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03c3\u03b1\u03c2ERDDAP\u2122\u03c3\u03c4\u03bf\u03bd \u03b5\u03be\u03c5\u03c0\u03b7\u03c1\u03b5\u03c4\u03b7\u03c4\u03ae \u03c3\u03b1\u03c2","source":"@site/i18n/el/docusaurus-plugin-content-docs/current/server-admin/deploy-update.md","sourceDirName":"server-admin","slug":"/server-admin/deploy-update","permalink":"/el/docs/server-admin/deploy-update","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/deploy-update.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"\u0395\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7","permalink":"/el/docs/server-admin/deploy-install"},"next":{"title":"ERDDAP\u2122 - Working with the datasets.xml File","permalink":"/el/docs/server-admin/datasets"}}');var d=s(74848),l=s(28453);const a={sidebar_position:2},i="\u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7",t={},c=[{value:"\u039c\u03b5\u03c4\u03b1\u03b2\u03bf\u03bb\u03ad\u03c2",id:"changes",level:2},{value:"Java",id:"java",level:2},{value:"\u039b\u03ae\u03c8\u03b7",id:"download",level:2},{value:"\u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1.xml",id:"messagesxml",level:2},{value:"\u0395\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7",id:"install",level:2},{value:"Linux \u03ba\u03b1\u03b9 Macs",id:"linux-and-macs",level:3},{value:"\u03a0\u03b1\u03c1\u03ac\u03b8\u03c5\u03c1\u03b1",id:"windows",level:3}];function o(e){const n={a:"a",br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"\u03b5\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7",children:"\u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7"})}),"\n",(0,d.jsx)(n.p,{children:"\u03a0\u03ce\u03c2 \u03bd\u03b1 \u039a\u03ac\u03bd\u03b5\u03c4\u03b5 \u03bc\u03b9\u03b1 \u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7 \u03bc\u03b9\u03b1\u03c2 \u03a5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03c3\u03b1\u03c2ERDDAP\u2122\u03c3\u03c4\u03bf\u03bd \u03b5\u03be\u03c5\u03c0\u03b7\u03c1\u03b5\u03c4\u03b7\u03c4\u03ae \u03c3\u03b1\u03c2"}),"\n",(0,d.jsx)(n.h2,{id:"changes",children:"\u039c\u03b5\u03c4\u03b1\u03b2\u03bf\u03bb\u03ad\u03c2"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u039a\u03ac\u03bd\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03b1\u03bb\u03bb\u03b1\u03b3\u03ad\u03c2 \u03c0\u03bf\u03c5 \u03b1\u03bd\u03b1\u03c6\u03ad\u03c1\u03bf\u03bd\u03c4\u03b1\u03b9 \u03c3\u03c4\u03bf",(0,d.jsx)(n.a,{href:"/changes",children:"\u039c\u03b5\u03c4\u03b1\u03b2\u03bf\u03bb\u03ad\u03c2"}),'\u03c3\u03c4\u03bf \u03c4\u03bc\u03ae\u03bc\u03b1 \u03bc\u03b5 \u03c4\u03af\u03c4\u03bb\u03bf " \u03a0\u03c1\u03ac\u03b3\u03bc\u03b1\u03c4\u03b1ERDDAP\u2122\u039f\u03b9 \u03b4\u03b9\u03b1\u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ad\u03c2 \u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03b3\u03bd\u03c9\u03c1\u03af\u03b6\u03bf\u03c5\u03bd \u03ba\u03b1\u03b9 \u03bd\u03b1 \u03ba\u03ac\u03bd\u03bf\u03c5\u03bd" \u03b3\u03b9\u03b1 \u03cc\u03bb\u03bf\u03c5\u03c2 \u03c4\u03bf\u03c5\u03c2ERDDAP\u2122\u03b5\u03ba\u03b4\u03cc\u03c3\u03b5\u03b9\u03c2 \u03bc\u03b5\u03c4\u03ac \u03c4\u03b7\u03bd \u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 \u03c0\u03bf\u03c5 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03c3\u03b1\u03c4\u03b5.\r\n\xa0']}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"java",children:"Java"}),"\n",(0,d.jsxs)(n.ol,{start:"2",children:["\n",(0,d.jsxs)(n.li,{children:["\u0395\u03ac\u03bd \u03b5\u03af\u03c3\u03c4\u03b5 \u03b1\u03bd\u03b1\u03b2\u03ac\u03b8\u03bc\u03b9\u03c3\u03b7 \u03b1\u03c0\u03ccERDDAP\u2122\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 2.18 \u03ae \u03ba\u03ac\u03c4\u03c9, \u03b8\u03b1 \u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03bc\u03b5\u03c4\u03b1\u03b2\u03b5\u03af\u03c4\u03b5 \u03c3\u03b5Java21 (\u03ae \u03bd\u03b5\u03cc\u03c4\u03b5\u03c1\u03bf\u03c2) \u03ba\u03b1\u03b9 \u03c4\u03bf \u03c3\u03c7\u03b5\u03c4\u03b9\u03ba\u03cc Tomcat 10. \u0394\u03b5\u03af\u03c4\u03b5 \u03c4\u03b7\u03bd \u03c4\u03b1\u03ba\u03c4\u03b9\u03ba\u03aeERDDAP\u2122\u03bf\u03b4\u03b7\u03b3\u03af\u03b5\u03c2 \u03b5\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7\u03c2 \u03b3\u03b9\u03b1",(0,d.jsx)(n.a,{href:"/docs/server-admin/deploy-install#java",children:"Java"}),"\u03ba\u03b1\u03b9",(0,d.jsx)(n.a,{href:"/docs/server-admin/deploy-install#tomcat",children:"\u03a4\u03bf\u03bc\u03ba\u03ac\u03c4"}),". \u0398\u03b1 \u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03b5\u03c0\u03af\u03c3\u03b7\u03c2 \u03bd\u03b1 \u03b1\u03bd\u03c4\u03b9\u03b3\u03c1\u03ac\u03c8\u03b5\u03c4\u03b5 \u03c4\u03bf_tomcat_/content/erddap\u03ba\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf\u03c2 \u03b1\u03c0\u03cc \u03c4\u03b7\u03bd \u03c0\u03b1\u03bb\u03b9\u03ac \u03b5\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7 Tomcat \u03c3\u03b1\u03c2 \u03c3\u03c4\u03b7 \u03bd\u03ad\u03b1 \u03b5\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7 Tomcat."]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"download",children:"\u039b\u03ae\u03c8\u03b7"}),"\n",(0,d.jsxs)(n.ol,{start:"3",children:["\n",(0,d.jsxs)(n.li,{children:["\u039b\u03ae\u03c8\u03b7",(0,d.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war",children:"Erddap.war (\u03c3\u03c4\u03b1 \u0391\u03b3\u03b3\u03bb\u03b9\u03ba\u03ac)."}),(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps .\r\n(\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 2.26, 607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, \u03bc\u03b5 \u03b7\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1 03-31-2025)\r\n\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"messagesxml",children:"\u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1.xml"}),"\n",(0,d.jsxs)(n.ol,{start:"4",children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\u03a3\u03c5\u03c7\u03bd\u03ad\u03c2: \u0395\u03ac\u03bd \u03b5\u03af\u03c3\u03c4\u03b5 \u03b1\u03bd\u03b1\u03b2\u03ac\u03b8\u03bc\u03b9\u03c3\u03b7 \u03b1\u03c0\u03ccERDDAP\u2122\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 1.46 (\u03ae \u03c0\u03ac\u03bd\u03c9) \u03ba\u03b1\u03b9 \u03b1\u03c0\u03bb\u03ac \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b5\u03af\u03c4\u03b5 \u03c4\u03b1 \u03c4\u03c5\u03c0\u03bf\u03c0\u03bf\u03b9\u03b7\u03bc\u03ad\u03bd\u03b1 \u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1, \u03c4\u03b1 \u03bd\u03ad\u03b1 \u03c4\u03c5\u03c0\u03bf\u03c0\u03bf\u03b9\u03b7\u03bc\u03ad\u03bd\u03b1 \u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1.xml \u03b8\u03b1 \u03b5\u03b3\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03b1\u03b8\u03b5\u03af \u03b1\u03c5\u03c4\u03cc\u03bc\u03b1\u03c4\u03b1 (\u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03b1\u03c1\u03c7\u03b5\u03af\u03c9\u03bd .class \u03bc\u03ad\u03c3\u03c9 erddap. \u03c0\u03cc\u03bb\u03b5\u03bc\u03bf\u03c2) .\r\n\xa0"}),"\n",(0,d.jsxs)(n.li,{children:["\u03a3\u03c0\u03ac\u03bd\u03b9\u03b5\u03c2: \u0395\u03ac\u03bd \u03b5\u03af\u03c3\u03c4\u03b5 \u03b1\u03bd\u03b1\u03b2\u03ac\u03b8\u03bc\u03b9\u03c3\u03b7 \u03b1\u03c0\u03ccERDDAP\u2122\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 1.44 (\u03ae \u03ba\u03ac\u03c4\u03c9) ,\r\n\u03a0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03b4\u03b9\u03b1\u03b3\u03c1\u03ac\u03c8\u03b5\u03c4\u03b5 \u03c4\u03bf \u03c0\u03b1\u03bb\u03b9\u03cc \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03bc\u03b7\u03bd\u03c5\u03bc\u03ac\u03c4\u03c9\u03bd.xml:\r\n",(0,d.jsx)(n.em,{children:"tomcat"}),"/content/erddap/\u03bc\u03ae\u03bd\u03c5\u03bc\u03b1.xml .\r\n\u03a4\u03b1 \u03bd\u03ad\u03b1 \u03c0\u03c1\u03cc\u03c4\u03c5\u03c0\u03b1 \u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1.xml \u03b8\u03b1 \u03b5\u03b3\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03b1\u03b8\u03bf\u03cd\u03bd \u03b1\u03c5\u03c4\u03cc\u03bc\u03b1\u03c4\u03b1 (\u03bc\u03b5\u03c4\u03b1\u03be\u03cd \u03c4\u03c9\u03bd \u03b1\u03c1\u03c7\u03b5\u03af\u03c9\u03bd .class \u03bc\u03ad\u03c3\u03c9 erddap. \u03c0\u03cc\u03bb\u03b5\u03bc\u03bf\u03c2) .\r\n\xa0"]}),"\n",(0,d.jsx)(n.li,{children:"\u03a3\u03c0\u03ac\u03bd\u03b9\u03b5\u03c2: \u0391\u03bd \u03ba\u03ac\u03bd\u03b5\u03c4\u03b5 \u03c0\u03ac\u03bd\u03c4\u03b1 \u03b1\u03bb\u03bb\u03b1\u03b3\u03ad\u03c2 \u03c3\u03c4\u03bf \u03c4\u03c5\u03c0\u03b9\u03ba\u03cc \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03bc\u03b7\u03bd\u03c5\u03bc\u03ac\u03c4\u03c9\u03bd.xml (\u03c3\u03c4\u03b7 \u03b8\u03ad\u03c3\u03b7 \u03c4\u03bf\u03c5) ,\r\n\u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03ba\u03ac\u03bd\u03b5\u03c4\u03b5 \u03b1\u03c5\u03c4\u03ad\u03c2 \u03c4\u03b9\u03c2 \u03b1\u03bb\u03bb\u03b1\u03b3\u03ad\u03c2 \u03c3\u03c4\u03bf \u03bd\u03ad\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03bc\u03b7\u03bd\u03c5\u03bc\u03ac\u03c4\u03c9\u03bd.xml (\u03c0\u03bf\u03c5 \u03b5\u03af\u03bd\u03b1\u03b9\r\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml \u03bc\u03b5\u03c4\u03ac \u03c4\u03b7\u03bd \u03b1\u03c0\u03bf\u03c3\u03c5\u03bc\u03c0\u03af\u03b5\u03c3\u03b7 \u03c4\u03bf\u03c5 erddap.war \u03b1\u03c0\u03cc \u03c4\u03bf Tomcat).\r\n\xa0"}),"\n",(0,d.jsx)(n.li,{children:"\u03a3\u03c0\u03ac\u03bd\u03b9\u03b5\u03c2: \u0391\u03bd \u03b4\u03b9\u03b1\u03c4\u03b7\u03c1\u03b5\u03af\u03c4\u03b5 \u03ad\u03bd\u03b1 \u03c0\u03c1\u03bf\u03c3\u03b1\u03c1\u03bc\u03bf\u03c3\u03bc\u03ad\u03bd\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03bc\u03b7\u03bd\u03c5\u03bc\u03ac\u03c4\u03c9\u03bd.xml \u03c3\u03b5_tomcat_/content/erddap/,\r\n\u03a0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03ba\u03b1\u03c4\u03b1\u03bb\u03ac\u03b2\u03b5\u03b9\u03c2. (\u03bc\u03ad\u03c3\u03c9 diff) \u03c0\u03bf\u03b9\u03b5\u03c2 \u03b1\u03bb\u03bb\u03b1\u03b3\u03ad\u03c2 \u03ad\u03c7\u03bf\u03c5\u03bd \u03b3\u03af\u03bd\u03b5\u03b9 \u03c3\u03c4\u03b1 \u03c0\u03c1\u03bf\u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b1 \u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03b1.xml (\u03c0\u03bf\u03c5 \u03b2\u03c1\u03af\u03c3\u03ba\u03bf\u03bd\u03c4\u03b1\u03b9 \u03c3\u03c4\u03bf \u03bd\u03ad\u03bf erddap. \u03c0\u03cc\u03bb\u03b5\u03bc\u03bf \u03c9\u03c2\r\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) \u03ba\u03b1\u03b9 \u03c4\u03c1\u03bf\u03c0\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bd \u03c4\u03bf \u03c0\u03c1\u03bf\u03c3\u03b1\u03c1\u03bc\u03bf\u03c3\u03bc\u03ad\u03bd\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c3\u03b1\u03c2.xml \u03b1\u03bd\u03b1\u03bb\u03cc\u03b3\u03c9\u03c2.\r\n\xa0"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"install",children:"\u0395\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7"}),"\n",(0,d.jsxs)(n.ol,{start:"5",children:["\n",(0,d.jsxs)(n.li,{children:["\u0395\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7 \u03c4\u03bf\u03c5 \u03bd\u03ad\u03bf\u03c5ERDDAP\u2122\u03c3\u03c4\u03bf Tomcat:\r\n\\* \u039c\u03b7\u03bd \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03b5\u03c4\u03b5 Tomcat Manager. \u0391\u03c1\u03b3\u03ac \u03ae \u03b3\u03c1\u03ae\u03b3\u03bf\u03c1\u03b1 \u03b8\u03b1 \u03c5\u03c0\u03ac\u03c1\u03be\u03bf\u03c5\u03bd \u03c0\u03c1\u03bf\u03b2\u03bb\u03ae\u03bc\u03b1\u03c4\u03b1 \u03bc\u03bd\u03ae\u03bc\u03b7\u03c2 PermGen. \u039a\u03b1\u03bb\u03cd\u03c4\u03b5\u03c1\u03b1 \u03bd\u03b1 \u03ba\u03bb\u03b5\u03af\u03c3\u03bf\u03c5\u03bc\u03b5 \u03ba\u03b1\u03b9 \u03bd\u03b1 \u03be\u03b5\u03ba\u03b9\u03bd\u03ae\u03c3\u03bf\u03c5\u03bc\u03b5 \u03c4\u03bf Tomcat.\r\n\\* \u0391\u03bd\u03c4\u03b9\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ce\u03bd \u03c3\u03c4\u03bf ",(0,d.jsx)(n.em,{children:"tomcat"})," \u03c0\u03b1\u03c1\u03b1\u03ba\u03ac\u03c4\u03c9 \u03bc\u03b5 \u03c4\u03bf\u03bd \u03c0\u03c1\u03b1\u03b3\u03bc\u03b1\u03c4\u03b9\u03ba\u03cc \u03ba\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf Tomcat \u03c3\u03c4\u03bf\u03bd \u03c5\u03c0\u03bf\u03bb\u03bf\u03b3\u03b9\u03c3\u03c4\u03ae \u03c3\u03b1\u03c2.\r\n\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"linux-and-macs",children:"Linux \u03ba\u03b1\u03b9 Macs"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf Tomcat: \u0391\u03c0\u03cc \u03bc\u03b9\u03b1 \u03b3\u03c1\u03b1\u03bc\u03bc\u03ae \u03b5\u03bd\u03c4\u03bf\u03bb\u03ce\u03bd, \u03c7\u03c1\u03ae\u03c3\u03b7: ",(0,d.jsx)(n.em,{children:"tomcat"}),"/bin/shutdown.sh\r\n\u039a\u03b1\u03b9 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03af\u03b7\u03c3\u03b5 \u03c4\u03bf ps -ef|grep tomcat \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b4\u03b5\u03af\u03c4\u03b5 \u03b1\u03bd/\u03cc\u03c4\u03b1\u03bd \u03b7 \u03b4\u03b9\u03b1\u03b4\u03b9\u03ba\u03b1\u03c3\u03af\u03b1 \u03ad\u03c7\u03b5\u03b9 \u03c3\u03c4\u03b1\u03bc\u03b1\u03c4\u03ae\u03c3\u03b5\u03b9. (\u039c\u03c0\u03bf\u03c1\u03b5\u03af \u03bd\u03b1 \u03c0\u03ac\u03c1\u03b5\u03b9 \u03ba\u03ac\u03bd\u03b1 \u03b4\u03c5\u03bf \u03bb\u03b5\u03c0\u03c4\u03ac.)"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0391\u03c6\u03b1\u03b9\u03c1\u03ad\u03c3\u03c4\u03b5 \u03c4\u03bf \u03b1\u03c0\u03bf\u03c3\u03c5\u03bc\u03c0\u03b9\u03b5\u03c3\u03bc\u03ad\u03bd\u03bfERDDAP\u2122\u03b5\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7: \u03a3\u03b5 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps, \u03c7\u03c1\u03ae\u03c3\u03b7\r\nrm - rf erddap"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0394\u03b9\u03b1\u03b3\u03c1\u03ac\u03c8\u03c4\u03b5 \u03c4\u03bf \u03c0\u03b1\u03bb\u03b9\u03cc erddap. \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c0\u03bf\u03bb\u03ad\u03bc\u03bf\u03c5: \u03a3\u03b5 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps, \u03c7\u03c1\u03ae\u03c3\u03b7 rm erddap. \u03c0\u03cc\u03bb\u03b5\u03bc\u03bf\u03c2"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0395\u03bb\u03ae\u03c6\u03b8\u03b7 \u03c4\u03bf \u03bd\u03ad\u03bf erddap. \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c0\u03bf\u03bb\u03ad\u03bc\u03bf\u03c5 \u03b1\u03c0\u03cc \u03c4\u03bf\u03bd \u03c0\u03c1\u03bf\u03c3\u03c9\u03c1\u03b9\u03bd\u03cc \u03ba\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf \u03c3\u03b5 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0395\u03c0\u03b1\u03bd\u03b5\u03ba\u03ba\u03af\u03bd\u03b7\u03c3\u03b7 Tomcat \u03ba\u03b1\u03b9ERDDAP: \u03c7\u03c1\u03ae\u03c3\u03b7 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/bin/startup.sh"]}),"\n",(0,d.jsxs)(n.li,{children:["\u03a0\u03c1\u03bf\u03b2\u03bf\u03bb\u03aeERDDAP\u2122\u03c3\u03c4\u03bf\u03bd \u03c0\u03b5\u03c1\u03b9\u03b7\u03b3\u03b7\u03c4\u03ae \u03c3\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b5\u03bb\u03ad\u03b3\u03be\u03b5\u03c4\u03b5 \u03cc\u03c4\u03b9 \u03b7 \u03b5\u03c0\u03b1\u03bd\u03b5\u03ba\u03ba\u03af\u03bd\u03b7\u03c3\u03b7 \u03c0\u03ad\u03c4\u03c5\u03c7\u03b5.\r\n(\u03a3\u03c5\u03c7\u03bd\u03ac, \u03b8\u03b1 \u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03b4\u03bf\u03ba\u03b9\u03bc\u03ac\u03c3\u03b5\u03c4\u03b5 \u03bc\u03b5\u03c1\u03b9\u03ba\u03ad\u03c2 \u03c6\u03bf\u03c1\u03ad\u03c2 \u03ba\u03b1\u03b9 \u03c0\u03b5\u03c1\u03b9\u03bc\u03ad\u03bd\u03b5\u03c4\u03b5 \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc \u03c0\u03c1\u03b9\u03bd \u03b4\u03b5\u03af\u03c4\u03b5ERDDAP\u2122.)",(0,d.jsx)(n.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"windows",children:"\u03a0\u03b1\u03c1\u03ac\u03b8\u03c5\u03c1\u03b1"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf Tomcat: \u0391\u03c0\u03cc \u03bc\u03b9\u03b1 \u03b3\u03c1\u03b1\u03bc\u03bc\u03ae \u03b5\u03bd\u03c4\u03bf\u03bb\u03ce\u03bd, \u03c7\u03c1\u03ae\u03c3\u03b7: ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\binbin\\shutdown.bat"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0391\u03c6\u03b1\u03b9\u03c1\u03ad\u03c3\u03c4\u03b5 \u03c4\u03bf \u03b1\u03c0\u03bf\u03c3\u03c5\u03bc\u03c0\u03b9\u03b5\u03c3\u03bc\u03ad\u03bd\u03bfERDDAP\u2122\u03b5\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7: \u03a3\u03b5 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps, \u03c7\u03c1\u03ae\u03c3\u03b7\r\n\u0394\u03b5\u03bb /S/Q erddap"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0394\u03b9\u03b1\u03b3\u03c1\u03ac\u03c8\u03c4\u03b5 \u03c4\u03bf \u03c0\u03b1\u03bb\u03b9\u03cc erddap. \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c0\u03bf\u03bb\u03ad\u03bc\u03bf\u03c5: \u03a3\u03b5 ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\webapps, \u03c7\u03c1\u03ae\u03c3\u03b7 del erddap. \u03c0\u03cc\u03bb\u03b5\u03bc\u03bf\u03c2"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0395\u03bb\u03ae\u03c6\u03b8\u03b7 \u03c4\u03bf \u03bd\u03ad\u03bf erddap. \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c0\u03bf\u03bb\u03ad\u03bc\u03bf\u03c5 \u03b1\u03c0\u03cc \u03c4\u03bf\u03bd \u03c0\u03c1\u03bf\u03c3\u03c9\u03c1\u03b9\u03bd\u03cc \u03ba\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf \u03c3\u03c4\u03bf ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\webapps"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0395\u03c0\u03b1\u03bd\u03b5\u03ba\u03ba\u03af\u03bd\u03b7\u03c3\u03b7 Tomcat \u03ba\u03b1\u03b9ERDDAP: \u03c7\u03c1\u03ae\u03c3\u03b7 ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\bin\\startup.bat"]}),"\n",(0,d.jsx)(n.li,{children:"\u03a0\u03c1\u03bf\u03b2\u03bf\u03bb\u03aeERDDAP\u2122\u03c3\u03c4\u03bf\u03bd \u03c0\u03b5\u03c1\u03b9\u03b7\u03b3\u03b7\u03c4\u03ae \u03c3\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b5\u03bb\u03ad\u03b3\u03be\u03b5\u03c4\u03b5 \u03cc\u03c4\u03b9 \u03b7 \u03b5\u03c0\u03b1\u03bd\u03b5\u03ba\u03ba\u03af\u03bd\u03b7\u03c3\u03b7 \u03c0\u03ad\u03c4\u03c5\u03c7\u03b5.\r\n(\u03a3\u03c5\u03c7\u03bd\u03ac, \u03b8\u03b1 \u03c0\u03c1\u03ad\u03c0\u03b5\u03b9 \u03bd\u03b1 \u03b4\u03bf\u03ba\u03b9\u03bc\u03ac\u03c3\u03b5\u03c4\u03b5 \u03bc\u03b5\u03c1\u03b9\u03ba\u03ad\u03c2 \u03c6\u03bf\u03c1\u03ad\u03c2 \u03ba\u03b1\u03b9 \u03c0\u03b5\u03c1\u03b9\u03bc\u03ad\u03bd\u03b5\u03c4\u03b5 \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc \u03c0\u03c1\u03b9\u03bd \u03b4\u03b5\u03af\u03c4\u03b5ERDDAP\u2122.)"}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u0395\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7 \u03c0\u03c1\u03bf\u03b2\u03bb\u03b7\u03bc\u03ac\u03c4\u03c9\u03bdERDDAP\u266a \u266a \u0394\u03b5\u03af\u03c4\u03b5 \u03bc\u03b1\u03c2",(0,d.jsx)(n.a,{href:"/docs/intro#support",children:"\u03c4\u03bc\u03ae\u03bc\u03b1 \u03b3\u03b9\u03b1 \u03c4\u03b7 \u03bb\u03ae\u03c8\u03b7 \u03c0\u03c1\u03cc\u03c3\u03b8\u03b5\u03c4\u03b7\u03c2 \u03c5\u03c0\u03bf\u03c3\u03c4\u03ae\u03c1\u03b9\u03be\u03b7\u03c2"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}}}]);