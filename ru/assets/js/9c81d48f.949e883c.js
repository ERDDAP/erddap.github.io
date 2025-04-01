"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3016],{28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>i});var r=s(96540);const d={},a=r.createContext(d);function l(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),r.createElement(a.Provider,{value:n},e.children)}},51894:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"server-admin/deploy-update","title":"\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435","description":"\u041a\u0430\u043a \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0435\u0433\u043eERDDAP\u2122\u041d\u0430 \u0432\u0430\u0448\u0435\u043c \u0441\u0435\u0440\u0432\u0435\u0440\u0435","source":"@site/i18n/ru/docusaurus-plugin-content-docs/current/server-admin/deploy-update.md","sourceDirName":"server-admin","slug":"/server-admin/deploy-update","permalink":"/ru/docs/server-admin/deploy-update","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/deploy-update.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"\u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c","permalink":"/ru/docs/server-admin/deploy-install"},"next":{"title":"ERDDAP\u2122 - Working with the datasets.xml File","permalink":"/ru/docs/server-admin/datasets"}}');var d=s(74848),a=s(28453);const l={sidebar_position:2},i="\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435",t={},c=[{value:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f",id:"changes",level:2},{value:"Java",id:"java",level:2},{value:"\u0441\u043a\u0430\u0447\u0430\u0442\u044c",id:"download",level:2},{value:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f.xml",id:"messagesxml",level:2},{value:"\u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c",id:"install",level:2},{value:"Linux \u0438 Mac",id:"linux-and-macs",level:3},{value:"Windows",id:"windows",level:3}];function o(e){const n={a:"a",br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435",children:"\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435"})}),"\n",(0,d.jsx)(n.p,{children:"\u041a\u0430\u043a \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0435\u0433\u043eERDDAP\u2122\u041d\u0430 \u0432\u0430\u0448\u0435\u043c \u0441\u0435\u0440\u0432\u0435\u0440\u0435"}),"\n",(0,d.jsx)(n.h2,{id:"changes",children:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u0412\u043d\u0435\u0441\u0438\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f, \u043f\u0435\u0440\u0435\u0447\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0435 \u0432",(0,d.jsx)(n.a,{href:"/changes",children:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"}),'\u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435, \u043e\u0437\u0430\u0433\u043b\u0430\u0432\u043b\u0435\u043d\u043d\u043e\u043c "\u0412\u0435\u0449\u0438ERDDAP\u2122\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u0437\u043d\u0430\u0442\u044c \u0438 \u0434\u0435\u043b\u0430\u0442\u044c \u0434\u043b\u044f \u0432\u0441\u0435\u0445ERDDAP\u2122\u0412\u0435\u0440\u0441\u0438\u044f, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u0438.\r\n\xa0']}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"java",children:"Java"}),"\n",(0,d.jsxs)(n.ol,{start:"2",children:["\n",(0,d.jsxs)(n.li,{children:["\u0415\u0441\u043b\u0438 \u0432\u044b \u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u0443\u0435\u0442\u0435\u0441\u044c \u043e\u0442ERDDAP\u2122\u0412\u0435\u0440\u0441\u0438\u044f 2.18 \u0438\u043b\u0438 \u043d\u0438\u0436\u0435, \u0432\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430Java21 (\u0438\u043b\u0438 \u043d\u043e\u0432\u044b\u0439) \u041f\u043e\u0445\u043e\u0436\u0438\u0435 \u0438\u0433\u0440\u044b Tomcat 10 \u0421\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u044b\u0435ERDDAP\u2122\u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u0438 \u043f\u043e \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0435 \u0434\u043b\u044f",(0,d.jsx)(n.a,{href:"/docs/server-admin/deploy-install#java",children:"Java"}),"\u0438",(0,d.jsx)(n.a,{href:"/docs/server-admin/deploy-install#tomcat",children:"\u0422\u043e\u043c\u043a\u0430\u0442"}),". \u0412\u0430\u043c \u0442\u0430\u043a\u0436\u0435 \u043f\u0440\u0438\u0434\u0435\u0442\u0441\u044f \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c_tomcat_/content/erddap\u041e\u0442 \u0441\u0442\u0430\u0440\u043e\u0439 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 Tomcat \u0434\u043e \u043d\u043e\u0432\u043e\u0439 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 Tomcat."]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"download",children:"\u0441\u043a\u0430\u0447\u0430\u0442\u044c"}),"\n",(0,d.jsxs)(n.ol,{start:"3",children:["\n",(0,d.jsxs)(n.li,{children:["\u0441\u043a\u0430\u0447\u0430\u0442\u044c",(0,d.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war",children:"erddap.war"}),(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps.\r\n(\u0432\u0435\u0440\u0441\u0438\u044f 2.26, 607 404 032 \u0431\u0430\u0439\u0442, MD5=99a725108b37708e5420986c1616a119, \u0434\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u0430\u044f 03-31-2025)\r\n\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"messagesxml",children:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f.xml"}),"\n",(0,d.jsxs)(n.ol,{start:"4",children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\u041e\u0431\u0449\u0435\u0435: \u0415\u0441\u043b\u0438 \u0432\u044b \u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u0443\u0435\u0442\u0435\u0441\u044c \u043e\u0442ERDDAP\u2122\u0412\u0435\u0440\u0441\u0438\u044f 1.46 (\u0432\u044b\u0448\u0435 \u0438\u043b\u0438 \u0432\u044b\u0448\u0435) \u0438 \u0432\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0435 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f, \u043d\u043e\u0432\u044b\u0435 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f.xml \u0431\u0443\u0434\u0443\u0442 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u044b \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 (\u0424\u0430\u0439\u043b\u044b \u043a\u043b\u0430\u0441\u0441\u0430 \u0447\u0435\u0440\u0435\u0437 erddap. \u0432\u043e\u0439\u043d\u0430) .\r\n\xa0"}),"\n",(0,d.jsxs)(n.li,{children:["\u0420\u0435\u0434\u043a\u043e: \u0415\u0441\u043b\u0438 \u0432\u044b \u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u0443\u0435\u0442\u0435\u0441\u044c \u043e\u0442ERDDAP\u2122\u0412\u0435\u0440\u0441\u0438\u044f 1.44 (\u043d\u0438\u0436\u0435 \u0438\u043b\u0438 \u043d\u0438\u0436\u0435) ,\r\n\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0442\u0430\u0440\u044b\u0439 \u0444\u0430\u0439\u043b message.xml:\r\n",(0,d.jsx)(n.em,{children:"tomcat"}),"/content/erddap/messages.xml.\r\n\u041d\u043e\u0432\u044b\u0439 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442 Messages.xml \u0431\u0443\u0434\u0435\u0442 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 (\u0424\u0430\u0439\u043b\u044b \u043a\u043b\u0430\u0441\u0441\u0430 \u0447\u0435\u0440\u0435\u0437 erddap. \u0432\u043e\u0439\u043d\u0430) .\r\n\xa0"]}),"\n",(0,d.jsx)(n.li,{children:"\u0420\u0435\u0434\u043a\u043e: \u0415\u0441\u043b\u0438 \u0432\u044b \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043d\u043e\u0441\u0438\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0432 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439 \u0444\u0430\u0439\u043b message.xml (\u043d\u0430 \u043c\u0435\u0441\u0442\u0435) ,\r\n\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u0432\u043d\u0435\u0441\u0442\u0438 \u044d\u0442\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0432 \u043d\u043e\u0432\u044b\u0439 \u0444\u0430\u0439\u043b message.xml (\u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043e\u0434\u043d\u0438\u043c \u0438\u0437 \u043e\u0441\u043d\u043e\u0432\u043d\u044b\u0445 \u0444\u0430\u0439\u043b\u043e\u0432).\r\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml \u043f\u043e\u0441\u043b\u0435 erddap.war \u0440\u0430\u0437\u043b\u0430\u0433\u0430\u0435\u0442\u0441\u044f Tomcat.\r\n\xa0"}),"\n",(0,d.jsx)(n.li,{children:"\u0420\u0435\u0434\u043a\u043e: \u0415\u0441\u043b\u0438 \u0432\u044b \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0439 \u0444\u0430\u0439\u043b message.xml_tomcat_/content/erddap/\r\n\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u0432\u044b\u044f\u0441\u043d\u0438\u0442\u044c (\u0447\u0435\u0440\u0435\u0437 diff) \u041a\u0430\u043a\u0438\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0431\u044b\u043b\u0438 \u0432\u043d\u0435\u0441\u0435\u043d\u044b \u0432 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e.xml (\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043d\u0430\u0445\u043e\u0434\u044f\u0442\u0441\u044f \u0432 \u043d\u043e\u0432\u043e\u043c erddap). \u0412\u043e\u0439\u043d\u0430 \u043a\u0430\u043a\r\nWEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) \u0438 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0441\u0432\u043e\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0439 \u0444\u0430\u0439\u043b message.xml.\r\n\xa0"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"install",children:"\u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c"}),"\n",(0,d.jsxs)(n.ol,{start:"5",children:["\n",(0,d.jsx)(n.li,{children:"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0435 \u043d\u043e\u0432\u044b\u0439ERDDAP\u2122\u0412 Tomcat:"}),"\n"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\u041d\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 Tomcat Manager. \u0420\u0430\u043d\u043e \u0438\u043b\u0438 \u043f\u043e\u0437\u0434\u043d\u043e \u043f\u043e\u044f\u0432\u044f\u0442\u0441\u044f \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u044b \u0441 \u043f\u0430\u043c\u044f\u0442\u044c\u044e. \u041b\u0443\u0447\u0448\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u044c \u0438 \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c Tomcat.\r\n\u0417\u0430\u043c\u0435\u043d\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 ",(0,d.jsx)(n.em,{children:"tomcat"})," \u043d\u0438\u0436\u0435 \u0444\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u043e\u043c Tomcat \u043d\u0430 \u0432\u0430\u0448\u0435\u043c \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440\u0435.\r\n\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"linux-and-macs",children:"Linux \u0438 Mac"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 Tomcat: \u0418\u0437 \u043a\u043e\u043c\u0430\u043d\u0434\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435: ",(0,d.jsx)(n.em,{children:"tomcat"}),"/bin/shutdown.sh\r\n\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 ps -ef|\u0413\u0440\u0443\u043f \u0422\u043e\u043c\u043a\u044d\u0442, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c, \u0435\u0441\u043b\u0438 / \u043a\u043e\u0433\u0434\u0430 \u043f\u0440\u043e\u0446\u0435\u0441\u0441 \u0431\u044b\u043b \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d. (\u042d\u0442\u043e \u043c\u043e\u0436\u0435\u0442 \u0437\u0430\u043d\u044f\u0442\u044c \u043c\u0438\u043d\u0443\u0442\u0443 \u0438\u043b\u0438 \u0434\u0432\u0435.)"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0435\u043a\u043e\u043c\u043f\u0440\u0435\u0441\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439ERDDAP\u2122\u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430: \u0412 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps\r\nrm -rf erddap"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0423\u0434\u0430\u043b\u0438\u0442\u0435 \u0441\u0442\u0430\u0440\u044b\u0439 erddap. \u0412\u043e\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b: \u0412 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 rm erddap. \u0432\u043e\u0439\u043d\u0430"]}),"\n",(0,d.jsxs)(n.li,{children:["\u041a\u043e\u043f\u0438\u0440\u0443\u0439\u0442\u0435 \u043d\u043e\u0432\u044b\u0439 erddap. \u0432\u043e\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b \u0438\u0437 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0433\u043e \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0430 \u0432 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps"]}),"\n",(0,d.jsx)(n.li,{children:"\u041f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u043a Tomcat \u0438ERDDAP_tomcat_/bin/startup.sh"}),"\n",(0,d.jsxs)(n.li,{children:["\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044cERDDAP\u2122\u0412 \u0432\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c, \u0447\u0442\u043e \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0443\u0434\u0430\u043b\u0430\u0441\u044c.\r\n(\u0427\u0430\u0441\u0442\u043e \u0432\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0440\u0430\u0437 \u0438 \u043f\u043e\u0434\u043e\u0436\u0434\u0430\u0442\u044c \u043c\u0438\u043d\u0443\u0442\u0443, \u043f\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043c \u0443\u0432\u0438\u0434\u0435\u0442\u044c.ERDDAP\u2122.)",(0,d.jsx)(n.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"windows",children:"Windows"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 Tomcat: \u0418\u0437 \u043a\u043e\u043c\u0430\u043d\u0434\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435: ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\bin\\shutdown.bat"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0435\u043a\u043e\u043c\u043f\u0440\u0435\u0441\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439ERDDAP\u2122\u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430: \u0412 ",(0,d.jsx)(n.em,{children:"tomcat"}),"/webapps\r\n\u0434\u0435\u043b\u044c /S/Q erddap"]}),"\n",(0,d.jsxs)(n.li,{children:["\u0423\u0434\u0430\u043b\u0438\u0442\u0435 \u0441\u0442\u0430\u0440\u044b\u0439 erddap. \u0412\u043e\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b: \u0412 ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\webapps \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 del erddap. \u0432\u043e\u0439\u043d\u0430"]}),"\n",(0,d.jsxs)(n.li,{children:["\u041a\u043e\u043f\u0438\u0440\u0443\u0439\u0442\u0435 \u043d\u043e\u0432\u044b\u0439 erddap. \u0432\u043e\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b \u0438\u0437 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0433\u043e \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0430 \u0432 ",(0,d.jsx)(n.em,{children:"tomcat"}),"\\webapps"]}),"\n",(0,d.jsx)(n.li,{children:"\u041f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u043a Tomcat \u0438ERDDAP_tomcat_\\bin\\startup.bat"}),"\n",(0,d.jsx)(n.li,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044cERDDAP\u2122\u0412 \u0432\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c, \u0447\u0442\u043e \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0443\u0434\u0430\u043b\u0430\u0441\u044c.\r\n(\u0427\u0430\u0441\u0442\u043e \u0432\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0440\u0430\u0437 \u0438 \u043f\u043e\u0434\u043e\u0436\u0434\u0430\u0442\u044c \u043c\u0438\u043d\u0443\u0442\u0443, \u043f\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043c \u0443\u0432\u0438\u0434\u0435\u0442\u044c.ERDDAP\u2122.)"}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u041f\u0440\u043e\u0431\u043b\u0435\u043c\u044b \u0441 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435\u043cERDDAP? \u0423\u0432\u0438\u0434\u0435\u0442\u044c \u043d\u0430\u0448",(0,d.jsx)(n.a,{href:"/docs/intro#support",children:"\u0420\u0430\u0437\u0434\u0435\u043b \u043e \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0435"}),"."]})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}}}]);