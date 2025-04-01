"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1815],{28453:(n,e,s)=>{s.d(e,{R:()=>d,x:()=>c});var i=s(96540);const r={},l=i.createContext(r);function d(n){const e=i.useContext(l);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:d(n.components),i.createElement(l.Provider,{value:e},n.children)}},72692:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>t,contentTitle:()=>c,default:()=>o,frontMatter:()=>d,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"contributing/programmer-guide","title":"\u7a0b\u5e8f\u5458\u6307\u5357","description":"\u8fd9\u4e9b\u53ea\u662f\u7a0b\u5e8f\u5458\u60f3\u914d\u5408\u7684ERDDAP\u56e0\u4e3aJava\u8bfe\u5802\u9700\u8981\u77e5\u9053\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/contributing/programmer-guide.md","sourceDirName":"contributing","slug":"/contributing/programmer-guide","permalink":"/zh/docs/contributing/programmer-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/programmer-guide.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docSidebar","previous":{"title":"\u6350\u6b3eERDDAP\u2122","permalink":"/zh/docs/contributing/"},"next":{"title":"ERDDAP\u2122\u91ca\u653e\u8fc7\u7a0b","permalink":"/zh/docs/contributing/release_process"}}');var r=s(74848),l=s(28453);const d={sidebar_position:2},c="\u7a0b\u5e8f\u5458\u6307\u5357",t={},h=[{value:"<strong>\u83b7\u53d6\u6e90\u4ee3\u7801</strong>",id:"getting-the-source-code",level:3},{value:"<strong>ERDDAP\u2122\u4f9d\u8d56\u5173\u7cfb</strong>",id:"erddap-dependencies",level:3},{value:"<strong>\u534a\u5f84</strong>",id:"\u534a\u5f84",level:4},{value:"<strong>\u53d1\u5c55\u73af\u5883</strong>",id:"development-environment",level:3},{value:"<strong>\u91cd\u8981\u7c7b</strong>",id:"important-classes",level:3},{value:"<strong>\u4ee3\u7801\u8d21\u732e</strong>",id:"code-contributions",level:3},{value:"<strong>\u5224\u65ad\u60a8\u7684\u4ee3\u7801\u8d21\u732e</strong>",id:"judging-your-code-contributions",level:3}];function a(n){const e={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,l.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"\u7a0b\u5e8f\u5458\u6307\u5357",children:"\u7a0b\u5e8f\u5458\u6307\u5357"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fd9\u4e9b\u53ea\u662f\u7a0b\u5e8f\u5458\u60f3\u914d\u5408\u7684ERDDAP\u56e0\u4e3aJava\u8bfe\u5802\u9700\u8981\u77e5\u9053\u3002"}),"\n",(0,r.jsx)(e.h3,{id:"getting-the-source-code",children:(0,r.jsx)(e.strong,{children:"\u83b7\u53d6\u6e90\u4ee3\u7801"})}),"\n",(0,r.jsx)(e.p,{children:"\xa0"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["GitHub \u4e0a\u7684 Via \u6e90\u4ee3\u7801\r\n\u8fd1\u671f\u516c\u5f00\u7248\u672c\u548c\u5f00\u53d1\u4e2d\u7248\u672c\u7684\u6e90\u4ee3\u7801\u4e5f\u53ef\u901a\u8fc7\u4e0b\u5217\u9014\u5f84\u83b7\u53d6:",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP",children:"GitHub \u56fe\u50cf"}),"\u3002 \u3002 \u3002 \u3002 \u8bf7\u8bfb\u4e00\u4e0b",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/wiki",children:"\u7ef4\u57fa"}),"\u4e3a\u8fd9\u4e2a\u9879\u76ee\u3002 \u5982\u679c\u60a8\u60f3\u8981\u4fee\u6539\u6e90\u4ee3\u7801 (\u5e76\u53ef\u80fd\u5c06\u4fee\u6539\u7eb3\u5165\u6807\u51c6ERDDAP\u2122\u5206\u53d1) ,\u8fd9\u662f\u5efa\u8bae\u7684\u65b9\u6cd5\u3002"]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"erddap-dependencies",children:(0,r.jsx)(e.strong,{children:"ERDDAP\u2122\u4f9d\u8d56\u5173\u7cfb"})}),"\n",(0,r.jsx)(e.p,{children:"ERDDAP\u2122\u4f7f\u7528 Maven \u6765\u88c5\u5165\u4ee3\u7801\u4f9d\u8d56\u4ee5\u53ca\u4e00\u4e9b\u9759\u6001\u5f15\u7528\u6587\u4ef6 (WEB-INF/ ref (\u82f1\u8bed).) \u3002 \u3002 \u3002 \u8fd9\u662f\u4e3a\u4e86\u907f\u514d\u5728\u5bc4\u5b58\u5668\u4e2d\u5b58\u50a8\u8bb8\u591a\u5927\u6587\u4ef6.\r\n\u60a8\u53ef\u4ee5\u4f7f\u7528\u201c mvn \u7f16\u8bd1\u201d , \u8fd9\u5c06\u83b7\u53d6\u4f9d\u8d56\u5173\u7cfb\u548c\u6821\u5bf9\u6587\u4ef6 \u3002 \u60a8\u4e5f\u53ef\u4ee5\u4f7f\u7528\u201c mvn \u5305\u201d \u6765\u751f\u6210\u6218\u4e89\u6587\u4ef6 \u3002\r\n\u60a8\u53ef\u4ee5\u624b\u52a8\u4e0b\u8f7d\u53c2\u8003\u6587\u4ef6 :"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip",children:"etopo1\\_ice\\_g\\_i2.zip"}),"\u5e76\u89e3\u6790\u4e3a/WEB-INF/ref/."]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip",children:"\u53c2\u8003\u6587\u4ef6.zip"}),"\u5e76\u89e3\u6790\u4e3a/WEB-INF/ref/."]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip",children:"erddap \u7ec4\u4ef6.zip"}),"  (1.0.0,2033\u5b57\u8282,MD5=2B8D2A5AE5ED73E3A42B529C168C60B5,\u65e5\u671f\u4e3a2024-10-14) \u5e76\u5c06\u5176\u89e3\u6790\u4e3a ",(0,r.jsx)(e.em,{children:"tomcat"}),",\u521b\u5efa_tomcat_/content/erddap\u3002 \u3002 \u3002 \u3002"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u6ce8:\u9ed8\u8ba4\u60c5\u51b5\u4e0b,Maven\u4f1a\u7f13\u5b58\u9759\u6001\u5f15\u7528\u548c\u6d4b\u8bd5\u6570\u636e\u5b58\u6863\u4e0b\u8f7d,\u4ec5\u5728\u4e0b\u8f7d\u65b0\u7248\u672c\u65f6\u624d\u63d0\u53d6. \u8981\u5168\u90e8\u8df3\u8fc7\u4e0b\u8f7d, \u60a8\u53ef\u4ee5\u5c06\u201c skipResourceDownload\u201d \u548c/ \u6216\u201c skip TestResourceDownload\u201d \u5c5e\u6027\u8bbe\u7f6e\u4e3a Maven (\u4f8b\u5982,",(0,r.jsx)(e.code,{children:"mvn - Dskip \u8d44\u6e90\u4e0b\u8f7d\u5305 "}),") \u3002 \u3002 \u3002 \u4e3a\u5f3a\u5236\u63d0\u53d6,\u8bbe\u7f6e\u201c-Ddownload.unpack= true\u201d\u548c\u201c-Ddownload.unpack when Changed=false\u201d \u3002"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["ERDDAP\u2122\u53ca\u5176\u5b50\u7ec4\u4ef6\u5177\u6709\u975e\u5e38\u5bbd\u677e,\u5f00\u6e90",(0,r.jsx)(e.a,{href:"/license",children:"\u8bb8\u53ef\u8bc1"}),",\u8fd9\u6837\u4f60\u5c31\u53ef\u4ee5\u4e3a\u4efb\u4f55\u76ee\u7684\u4f7f\u7528\u548c\u4fee\u6539\u6e90\u4ee3\u7801,\u65e0\u8bba\u662f\u76c8\u5229\u8fd8\u662f\u975e\u8425\u5229. \u8bf7\u6ce8\u610f",":ERDDAP","\u2122\u5e76\u4e14\u8bb8\u591a\u5b50\u7ec4\u4ef6\u62e5\u6709\u8bb8\u53ef\u8bc1,\u9700\u8981\u60a8\u786e\u8ba4\u60a8\u4f7f\u7528\u7684\u4ee3\u7801\u6765\u6e90\u3002 \u89c1",(0,r.jsx)(e.a,{href:"/credits",children:"\u8d37\u9879"}),"\u3002 \u3002 \u3002 \u65e0\u8bba\u662f\u5426\u9700\u8981,\u627f\u8ba4\u6240\u6709\u8fd9\u4e9b\u8d21\u732e\u8005\u53ea\u662f\u597d\u7684\u5f62\u5f0f\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5bf9\u5176\u5b83\u9879\u76ee\u4f7f\u7528\u4ee3\u7801"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u6b22\u8fce\u60a8\u4f7f\u7528ERDDAP\u2122\u7528\u4e8e\u5176\u4ed6\u5de5\u7a0b\u7684\u4ee3\u7801,\u8b66\u544a\u8be5\u4ee3\u7801\u53ef\u4ee5\u5e76\u4e14\u5c06\u4f1a\u6539\u53d8\u3002 \u6211\u4eec\u4e0d\u627f\u8bfa\u652f\u6301\u6211\u4eec\u4ee3\u7801\u7684\u5176\u4ed6\u7528\u9014. Git \u548c GitHub \u5c06\u662f\u60a8\u5904\u7406\u8fd9\u4e2a\u95ee\u9898\u7684\u4e3b\u8981\u89e3\u51b3\u65b9\u6848 -- Git \u5141\u8bb8\u60a8\u5c06\u6211\u4eec\u7684\u66f4\u6539\u5408\u5e76\u5230\u60a8\u7684\u66f4\u6539\u4e2d\u3002\r\n",(0,r.jsx)(e.strong,{children:"\u5728\u5f88\u591a\u60c5\u51b5\u4e0b,\u4f60\u53ef\u80fd\u4f1a \u8bd5\u56fe\u4f7f\u7528\u90e8\u5206ERDDAP\u2122\u5728\u4f60\u7684\u5de5\u7a0b\u4e2d,\u6211\u4eec\u8ba4\u4e3a\u4f60\u4f1a\u53d1\u73b0 \u5b89\u88c5\u548c\u4f7f\u7528\u66f4\u5bb9\u6613ERDDAP\u2122\u540c\u6837,"})," \u7136\u540e\u5199\u5176\u4ed6\u4f7f\u7528ERDDAP\u670d\u52a1\u3002 \u4f60\u53ef\u4ee5\u81ea\u5df1\u8bbeERDDAP\u2122\u5728\u4e00\u4e24\u4e2a\u5c0f\u65f6\u540e\u5c31\u5b89\u88c5\u4e86 \u4f60\u53ef\u4ee5\u81ea\u5df1\u8bbeERDDAP\u2122\u51e0\u5929\u540e\u4ee5\u629b\u5149\u65b9\u5f0f\u5b89\u88c5 (\u53d6\u51b3\u4e8e\u6570\u636e\u96c6\u7684\u6570\u91cf\u548c\u590d\u6742\u7a0b\u5ea6) \u3002 \u3002 \u3002 \u3002 \u4f46\u662f,\u9ed1\u8fdb\u90e8\u5206ERDDAP\u2122\u53ef\u80fd\u8981\u82b1\u4e0a\u51e0\u5468\u65f6\u95f4 (\u548c\u6570\u6708\u6355\u6349\u5fae\u5999) \u7136\u540e\u60a8\u5c06\u5931\u53bb\u540e\u7eed\u4fee\u6539\u548c\u9519\u8bef\u4fee\u6b63\u7684\u80fd\u529bERDDAP\u2122\u91ca\u653e \u6211\u4eec (\u5f88\u660e\u663e) \u8ba4\u4e3a\u4f7f\u7528ERDDAP\u2122\u4e5f\u8ba9\u4f60ERDDAP\u2122\u5b89\u88c5\u53ef\u516c\u5f00\u8bbf\u95ee\u3002 \u7136\u800c,\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b,\u4f60\u53ef\u80fd\u4e0d\u60f3\u505a\u4f60\u7684ERDDAP\u2122\u5b89\u88c5\u53ef\u516c\u5f00\u8bbf\u95ee\u3002 \u90a3\u4e48,\u4f60\u7684\u670d\u52a1\u53ef\u4ee5\u8fdb\u5165\u548c\u4f7f\u7528\u4f60\u7684\u79c1\u4ebaERDDAP\u2122\u4f60\u7684\u5ba2\u6237\u4e0d\u9700\u8981\u77e5\u9053ERDDAP\u2122\u3002 \u3002 \u3002 \u3002"]}),"\n",(0,r.jsx)(e.h4,{id:"\u534a\u5f84",children:(0,r.jsx)(e.strong,{children:"\u534a\u5f84"})}),"\n",(0,r.jsx)(e.p,{children:"\u6216\u8005,\u8fd8\u6709\u4e00\u79cd\u65b9\u6cd5,\u4f60\u53ef\u80fd\u4f1a\u53d1\u73b0\u6709\u7528 \u5728\u63a2\u7d22\u4e4b\u95f4ERDDAP\u4ee3\u7801\u548c\u4f7f\u7528ERDDAP\u2122\u4f5c\u4e3a\u4e00\u4e2a\u72ec\u7acb\u7684\u7f51\u7edc\u670d\u52a1: \u5728EDD \u7c7b\u4e2d,\u6709\u4e00\u4e2a\u9759\u6001\u65b9\u6cd5,\u53ef\u4ee5\u8ba9\u4f60\u5236\u4f5c\u4e00\u4e2a\u6570\u636e\u96c6\u5b9e\u4f8b (\u57fa\u4e8edatasets.xml) \u6570\u5b57 :\r\n'\u4e00\u4e2a\u6765\u81ea\u6570\u636e\u96c6' xml \u6570\u636e (\u5b57\u7b26\u4e32 tDatasetID)\r\n\u8fd4\u56de EDD\u8868\u6216EDDGrid\u6570\u636e\u96c6\u3002 \u65e2\u7136\u5982\u6b64,\u4f60\u53ef\u4ee5\u6253\u7535\u8bdd\r\n\u201c make NewFileForDap\u67e5\u8be2 (\u5b57\u7b26\u4e32\u7528\u6237DapQuery\u3001\u5b57\u7b26\u4e32\u76ee\u5f55\u3001\u5b57\u7b26\u4e32\u6587\u4ef6Name\u3001\u5b57\u7b26\u4e32\u6587\u4ef6 \u7c7b\u578bName)\r\n`\u8ba9\u5b9e\u4f8b\u5236\u4f5c\u7279\u5b9a\u6587\u4ef6\u7684\u6570\u636e\u6587\u4ef6Type,\u5e76\u9644\u4e0a\u7528\u6237\u67e5\u8be2\u7684\u7ed3\u679c\u3002 \u56e0\u6b64,\u8fd9\u662f\u4e00\u4e2a\u7b80\u5355\u7684\u4f7f\u7528\u65b9\u5f0fERDDAP\u6b63\u5982\u5ba2\u6237\u7aef\u4f1a\u4f7f\u7528ERDDAP\u2122\u7f51\u7edc\u5e94\u7528\u7a0b\u5e8f\u3002 \u4f46\u662f\u8fd9\u4e2a\u65b9\u6cd5\u5728\u4f60\u7684Java\u7a0b\u5e8f\u5e76\u7ed5\u8fc7\u50cfTomcat\u8fd9\u6837\u7684\u5e94\u7528\u7a0b\u5e8f\u670d\u52a1\u5668\u7684\u9700\u8981. \u6211\u4eec\u5728EDD Table\u548cEDDGrid\u5b50\u7c7b,\u6240\u4ee5\u60a8\u53ef\u4ee5\u5728\u6e90\u4ee3\u7801\u4e2d\u770b\u5230\u6240\u6709\u8fd9\u4e9b\u7c7b\u7684\u4f8b\u5b50\u3002"}),"\n",(0,r.jsx)(e.h3,{id:"development-environment",children:(0,r.jsx)(e.strong,{children:"\u53d1\u5c55\u73af\u5883"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u6709\u914d\u7f6e\u7528\u4e8e",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/jetty",children:"\u6d01\u8482,\u4f60\u597d\u5417?"}),"\u548c",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/blob/main/development/docker",children:"\u63d2\u5934"}),"\u5728GitHub\u4e2d,\u867d\u7136\u9884\u8ba1\u53d1\u5e03\u4f1a\u8fd0\u884c\u5728Tomcat\u4e2d."]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.strong,{children:"\u53ef\u9009"})," \u6570\u5b57 : \u8bbe\u7f6eERDDAP\u2122\u5728\u6c64\u59c6\u5361\u7279\r\n\u4eceERDDAP\u2122\u6211\u4eec\u5f3a\u70c8\u5efa\u8bae\u4f60\u4eec\u9075\u5b88\u6807\u51c6",(0,r.jsx)(e.a,{href:"/docs/server-admin/deploy-install",children:"\u5b89\u88c5\u6307\u4ee4"}),"\u5b89\u88c5Tomcat,\u7136\u540e\u5b89\u88c5ERDDAP\u2122\u5728Tomcat\u7684\u7f51\u7edc\u5e94\u7528\u76ee\u5f55\u4e2d\u3002 \u9664\u5176\u4ed6\u4e8b\u9879\u5916,ERDDAP\u2122\u88ab\u8bbe\u8ba1\u4e3a\u5b89\u88c5\u5728Tomcat\u7684\u76ee\u5f55\u7ed3\u6784\u4e2d,\u5e76\u671f\u671bTomcat\u63d0\u4f9b\u4e00\u4e9b.jar\u6587\u4ef6."]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"ERDDAP\u2122\u4e0d\u9700\u8981\u7279\u5b9a\u7684IDE (Chris\u4e3b\u8981\u4f7f\u7528Visual Studio\u4ee3\u7801,Bob\u4f7f\u7528EditPlus) \u3002 \u3002 \u3002 \u6211\u4eec\u4e0d\u4f7f\u7528Eclipse\u3001Ant\u7b49;\u6211\u4eec\u4e5f\u4e0d\u63d0\u4f9bERDDAP- \u4e0e\u4ed6\u4eec\u76f8\u5173\u7684\u652f\u6301\u3002 \u5de5\u7a0b\u786e\u5b9e\u4f7f\u7528\u4e86\u9a6c\u6587."}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u6211\u4eec\u4f7f\u7528\u4e00\u4e2a\u6279\u91cf\u6587\u4ef6\u5220\u9664\u6e90\u6811\u4e2d\u6240\u6709 . class \u6587\u4ef6,\u4ee5\u786e\u4fdd\u6211\u4eec\u6709\u4e00\u4e2a\u5e72\u51c0\u7684\u7f16\u8bd1 (\u5e26Javac) \u3002 \u3002 \u3002 \u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u76ee\u524d\u6211\u4eec\u4f7f\u7528\u9886\u517b\u7684javac jdk-21.0.3+9\u6765\u7f16\u8bd1gov.noaa.pfeg.coastwatch.Testall. (\u5b83\u6709\u94fe\u63a5\u5230\u51e0\u4e2a\u7c7b,\u5426\u5219\u4e0d\u4f1a\u7f16\u8bd1) \u5e76\u8fdb\u884c\u6d4b\u8bd5\u3002 \u51fa\u4e8e\u5b89\u5168\u8003\u8651,\u51e0\u4e4e\u603b\u662f\u6700\u597d\u4f7f\u7528\u6700\u65b0\u7684\u7248\u672c\u3002Java21\u548c\u6c64\u59c6\u5361\u727910\u3002"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u5f53\u8fd0\u884c javac \u6216 java \u65f6, \u5f53\u524d\u76ee\u5f55\u4e3a ",(0,r.jsx)(e.em,{children:"tomcat"}),"/webapps/erddap/WEB-INF \u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u6211\u4eec\u7684Javac\u548cJava\u9636\u7ea7\u662f\r\n",(0,r.jsx)(e.code,{children:"\u7c7b;./././lib/servlet-api.jar;lib/*"})]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u6240\u4ee5,\u4f60\u7684Javac\u6307\u6325\u7ebf \u4f1a\u662f\u7c7b\u4f3c\u7684\u4e1c\u897f\r\n`javac-\u7f16\u7801UTF-8-cp\u7c7b;././lib/servlet-api.jar;lib/*\u7c7b/gov/noaa/pfel/coastwatch/TestAll.java'"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u4f60\u7684Java\u6307\u6325\u7ebf\u4f1a\u50cf...\r\n",(0,r.jsx)(e.code,{children:"java-cp\u73ed;./././lib/servlet-api.jar;lib/*-Xmx4000M-Xms4000M /\u653f\u5e9c/noaa/pfel/\u6d77\u5cb8\u76d1\u89c6/\u8bd5\u9a8c "}),"\u5907\u9009:\u4f60\u53ef\u4ee5\u6dfb\u52a0`-\u52a8\u8bcd",":gc","',\u5b83\u8bf4\u660e",":Java","\u6253\u5370\u5783\u573e\u6536\u96c6\u7edf\u8ba1\u6570\u636e\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5982\u679c\u6d4b\u8bd5 \u6240\u6709\u7f16\u8bd1,\u4e00\u5207ERDDAP\u2122\u5df2\u7ecf\u6c47\u7f16\u4e86\u9700\u6c42\u3002 \u51e0\u95e8\u8bfe\u662f\u7f16\u7684 \u4e0d\u9700\u8981\u7528\u4e8eERDDAP\u2122\u3002 \u3002 \u3002 \u5982\u679c\u7f16\u8bd1TestAll\u6210\u529f,\u4f46\u4e0d\u7f16\u8bd1\u4e00\u4e9b\u7c7b,\u90a3\u7c7b\u5c31\u4e0d\u9700\u8981\u4e86. (\u6709\u4e00\u4e9b\u672a\u5b8c\u6210/\u672a\u4f7f\u7528\u7684\u8bfe\u7a0b\u3002)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5728\u5c11\u6570\u60c5\u51b5\u4e0b,\u6211\u4eec\u4f7f\u7528\u7b2c\u4e09\u65b9\u6e90\u4ee3\u7801\u800c\u4e0d\u662f.jar\u6587\u4ef6 (\u7279\u522b\u9488\u5bf9DODS) \u5e76\u7a0d\u4f5c\u4fee\u6539,\u4ee5\u907f\u514d\u51fa\u73b0\u4e0eJava21. \u6211\u4eec\u7ecf\u5e38\u4f5c\u51fa\u5176\u4ed6\u5fae\u5c0f\u4fee\u6539\u3002 (\u76ee\u6807DODS) \u7531\u4e8e\u5176\u4ed6\u539f\u56e0\u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u5927\u591a\u6570\u73ed\u7ea7\u5728\u5176\u76f8\u5173\u7684src/test\u6587\u4ef6\u4e2d\u90fd\u6709\u6d4b\u8bd5\u65b9\u6cd5. \u60a8\u53ef\u4ee5\u4f7f\u7528\u201cmvn\u6d4b\u8bd5\u201d\u547d\u4ee4\u8fdb\u884cJUnit\u6d4b\u8bd5\u3002 \u8fd9\u5c06\u4e0b\u8f7d\u4ece\u6700\u8fd1\u53d1\u5e03\u7684\u6d4b\u8bd5\u4e2d\u4f9d\u8d56\u7684\u6570\u4e2a\u6570\u636ezip\u6587\u4ef6",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddapTest/releases/",children:"ERDDAP/\u57c3\u5c14\u8fbe\u666e \u6d4b\u8bd5"}),"\u3002 \u3002 \u3002 \u3002 \u3002\r\n\xa0\r\n\u6ce8",":Maven","\u7f13\u5b58\u4e0b\u8f7d,\u4f46\u4f1a\u89e3\u6790\u6bcf\u6b21\u6267\u884c\u4e2d\u4e0b\u8f7d\u7684\u6863\u6848,\u8fd9\u9700\u8981\u65f6\u95f4\u3002 \u8df3\u8fc7\u4e0b\u8f7d\r\n\u5e76\u89e3\u5bc6\u6d4b\u8bd5\u6570\u636e\u6863\u6848,\u60a8\u53ef\u4ee5\u6307\u5b9a\u201c skip Test RequestDownload\u201d \u5c5e\u6027\u7ed9 Maven (\u4f8b\u5982,",(0,r.jsx)(e.code,{children:"mvn - Dskip TestResource' \u8f6f\u4ef6\u5305 "}),") \u3002 \u3002 \u3002 \u3002"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"important-classes",children:(0,r.jsx)(e.strong,{children:"\u91cd\u8981\u7c7b"})}),"\n",(0,r.jsx)(e.p,{children:"\u5982\u679c\u4f60\u60f3\u770b\u770b\u6e90\u4ee3\u7801 \u5e76\u8bd5\u56fe\u627e\u51fa\u5982\u4f55ERDDAP\u2122\u5de5\u4f5c,\u8bf7\u3002"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5bc6\u7801\u6709Java\u533b\u751f\u8bc4\u8bba,\u4f46Java\u533b\u751f\u8fd8\u6ca1\u6709\u751f\u6210\u3002 \u81ea\u7531\u4ea7\u751f\u5b83\u4eec\u5427"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u6700\u91cd\u8981\u7684\u73ed\u7ea7 (\u5305\u62ec\u4ee5\u4e0b\u6240\u8ff0) \u5728\u653f\u5e9c/noaa/pfel/erddap\u8303\u56f4\u5185\u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u90a3\u4e2aERDDAP\u2122\u7c7b\u6709\u6700\u9ad8\u7ea7\u522b\u7684\u65b9\u6cd5\u3002 \u5b83\u6269\u5c55\u4e86HttpServlet."}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["ERDDAP\u2122\u5c06\u8bf7\u6c42\u8f6c\u5230\u4ee5\u4e0b\u7c7b\u522b",":EDDGrid","\u6216 EDD\u8868,\u4ee3\u8868\u5355\u4e2a\u6570\u636e\u96c6\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"EDStatic \u62e5\u6709\u5927\u90e8\u5206\u9759\u6001\u4fe1\u606f\u548c\u8bbe\u7f6e (\u4f8b\u5982,\u4ece\u8bbe\u7f6e.xml\u548c\u6d88\u606f.xml\u6587\u4ef6) \u5e76\u63d0\u4f9b\u9759\u6001\u670d\u52a1 (\u4f8b\u5982,\u53d1\u9001\u7535\u5b50\u90ae\u4ef6) \u3002 \u3002 \u3002 \u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"EDDGrid\u548c EDDTable \u5b50\u7c7b\u89e3\u6790\u8bf7\u6c42,\u4ece\u5b50\u7c7b\u7279\u5b9a\u65b9\u6cd5\u83b7\u53d6\u6570\u636e,\u7136\u540e\u4e3a\u54cd\u5e94\u683c\u5f0f\u5316\u6570\u636e."}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"EDDGrid\u5b50\u7c7b\u5c06\u6570\u636e\u63a8\u5165 GridData \u8bbf\u95ee\u5668 (\u7f51\u683c\u6570\u636e\u7684\u5185\u90e8\u6570\u636e\u5bb9\u5668) \u3002 \u3002 \u3002 \u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"EDDTable\u5b50\u7c7b\u5c06\u6570\u636e\u63a8\u5165TableWriter\u5b50\u7c7b,\u8fd9\u4e9b\u5b50\u7c7b\u5c06\u6570\u636e\u5199\u5165\u4e00\u4e2a\u7279\u5b9a\u7684\u6587\u4ef6\u7c7b\u578b\u4e0a\u98de."}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5176\u4ed6\u8bfe\u7a0b (\u4f8b\u5982,\u4f4e\u7ea7\u73ed\u7ea7) \u4e5f\u662f\u5f88\u91cd\u8981\u7684,\u4f46\u4f60\u4e0d\u592a\u53ef\u80fd \u52aa\u529b\u6539\u53d8\u5b83\u4eec\u3002\r\n\xa0"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"code-contributions",children:(0,r.jsx)(e.strong,{children:"\u4ee3\u7801\u8d21\u732e"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["GitHub \u95ee\u9898\r\n\u5982\u679c\u60a8\u613f\u610f\u8d21\u732e\u4f46\u6ca1\u6709\u9879\u76ee,\u8bf7\u53c2\u89c1\u5217\u8868",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"GitHub \u95ee\u9898"}),",\u5176\u4e2d\u8bb8\u591a\u90fd\u662f\u4f60\u53ef\u4ee5\u627f\u62c5\u7684\u9879\u76ee\u3002 \u5982\u679c\u4f60\u60f3\u5c31\u4e00\u4e2a\u95ee\u9898\u5f00\u5c55\u5de5\u4f5c,\u8bf7\u81ea\u884c\u6307\u5b9a,\u5411\u5176\u4ed6\u4eba\u8868\u660e\u4f60\u6b63\u5728\u7814\u7a76\u7684\u95ee\u9898\u3002 GitHub\u95ee\u9898\u662f\u8ba8\u8bba\u4efb\u4f55\u95ee\u9898\u7684\u6700\u4f73\u573a\u6240,\u4ee5\u4fbf\u5f00\u5c55\u6709\u5173\u8be5\u95ee\u9898\u7684\u5de5\u4f5c\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u82e5\u60a8\u60f3\u505a\u51fa\u6539\u53d8,",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"GitHub \u95ee\u9898"}),"\u8868\u793a\u60a8\u6253\u7b97\u4f5c\u51fa\u7684\u66f4\u6539\u3002 \u7136\u540e,\u4e00\u65e6\u4fee\u6539\u5b8c\u6210,\u5c31\u53d1\u51fa\u62c9\u52a8\u8bf7\u6c42,\u8bf7\u6c42\u5408\u5e76. \u5171\u540c\u53d8\u5316\u5305\u62ec:"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u60a8\u60f3\u8981\u5199\u53e6\u4e00\u4e2a\u5b50\u7c7bEDDGrid\u6216 EDD Table \u5904\u7406\u53e6\u4e00\u4e2a\u6570\u636e\u6e90\u7c7b\u578b\u3002 \u5982\u679c\u662f\u8fd9\u6837,\u6211\u4eec\u5efa\u8bae\u4f60\u4eec\u627e\u5230\u6700\u63a5\u8fd1\u7684\u73b0\u6709\u5b50\u7c7b,\u5e76\u4f7f\u7528\u8be5\u4ee3\u7801\u4f5c\u4e3a\u8d77\u70b9."}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u60a8\u60f3\u8981\u5199\u5165\u53e6\u4e00\u4e2a\u4fdd\u5b58 As_ FileType_ \u65b9\u6cd5 \u3002 \u5982\u679c\u662f\u7684\u8bdd,\u6211\u4eec\u5efa\u8bae\u60a8\u5728\u5176\u4e2d\u627e\u5230\u6700\u8fd1\u7684\u4fdd\u5b58 As_ FileType_ \u65b9\u6cd5EDDGrid\u6216 EDD Table \u5e76\u4f7f\u7528\u8be5\u4ee3\u7801\u4f5c\u4e3a\u8d77\u70b9\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u8fd9\u4e9b\u60c5\u5f62\u7684\u4f18\u70b9\u662f \u4f60\u5199\u7684\u4ee3\u7801\u662f\u81ea\u6210\u4e00\u4f53\u7684 \u4f60\u4e0d\u9700\u8981\u77e5\u9053\u6240\u6709\u7ec6\u8282ERDDAP'\u5185\u7ecf\u66f0. \u6211\u4eec\u5f88\u5bb9\u6613\u628a\u5bc6\u7801\u8f93\u5165ERDDAP\u3002 \u3002 \u3002 \u8bf7\u6ce8\u610f,\u5982\u679c\u60a8\u786e\u5b9e\u63d0\u4ea4\u4e86\u4ee3\u7801,\u8bb8\u53ef\u8bc1\u9700\u8981\u4e0e\u8be5\u4ee3\u7801\u517c\u5bb9\u3002ERDDAP\u2122 ",(0,r.jsx)(e.a,{href:"/license",children:"\u8bb8\u53ef\u8bc1"}),"  (\u4f8b\u5982,",(0,r.jsx)(e.a,{href:"https://www.apache.org/licenses/",children:"\u963f\u5e15\u5947\u8bedName"}),", (\u4e2d\u6587).",(0,r.jsx)(e.a,{href:"https://www.opensource.org/licenses/bsd-license.php",children:"BSD \u8f6f\u4ef6"}),",\u6216",(0,r.jsx)(e.a,{href:"https://www.opensource.org/licenses/mit-license.php",children:"\u9ebb\u7701\u7406\u5de5\u5b66\u9662-X"}),") \u3002 \u3002 \u3002 \u6211\u4eec\u5c06\u5217\u51fa\u4f60\u7684\u8d21\u732e",(0,r.jsx)(e.a,{href:"/credits",children:"\u8d37\u65b9"}),"\u3002 \u3002 \u3002 \u3002"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u5982\u679c\u60a8\u6709\u4e00\u4e2a\u4e0a\u9762\u6ca1\u6709\u8986\u76d6\u7684\u7279\u5f81,\u60a8\u5e0c\u671b\u6dfb\u52a0\u5230ERDDAP,\u5efa\u8bae\u9996\u5148\u5728",(0,r.jsx)(e.a,{href:"https://github.com/ERDDAP/erddap/discussions/categories/ideas",children:"GitHub \u8ba8\u8bba"}),"\u3002 \u3002 \u3002 \u5bf9\u4e8e\u91cd\u5927\u7279\u70b9/\u6539\u53d8,\u6280\u672f\u59d4\u5458\u4f1a\u5c06\u8ba8\u8bba\u8fd9\u4e9b\u7279\u70b9,\u5e76\u51b3\u5b9a\u662f\u5426\u6838\u51c6\u5c06\u5176\u6dfb\u52a0\u5230ERDDAP\u2122\u3002 \u3002 \u3002 \u3002"]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"judging-your-code-contributions",children:(0,r.jsx)(e.strong,{children:"\u5224\u65ad\u60a8\u7684\u4ee3\u7801\u8d21\u732e"})}),"\n",(0,r.jsx)(e.p,{children:"\u5982\u679c\u60a8\u60f3\u8981\u63d0\u4ea4\u8981\u5305\u542b\u5728\u5176\u4e2d\u7684\u4ee3\u7801\u6216\u5176\u4ed6\u4fee\u6539ERDDAP\u8fd9\u662f\u4f1f\u5927\u7684\u3002 \u4f60\u7684\u8d21\u732e\u5fc5\u987b\u7b26\u5408\u67d0\u4e9b\u6807\u51c6\u624d\u80fd\u88ab\u63a5\u53d7\u3002 \u5982\u679c\u4f60\u9075\u5faa\u4ee5\u4e0b\u51c6\u5219,\u4f60\u5c06\u5927\u5927\u589e\u52a0\u4f60\u7684\u8d21\u732e\u88ab\u63a5\u53d7\u7684\u673a\u4f1a\u3002\r\n\xa0"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u90a3\u4e2aERDDAP\u2122\u9879\u76ee\u7531NATD\u7ba1\u7406 (NOAA\u4efb\u547d\u7684\u6280\u672f\u4e3b\u4efb) \u7531\u6280\u672f\u59d4\u5458\u4f1a\u63d0\u4f9b\u6295\u5165\u3002\r\n\u4ece2007\u5e74\u8d77 (\u5f00\u59cbERDDAP) 2022\u5e74,\u9c8d\u52c3\u30fb\u897f\u8499\u65af (\u4e5f\u662f\u521b\u59cb\u4eba-\u9886\u5bfc\u8005) \u3002 \u3002 \u3002 \u4ece2023\u5e741\u6708\u5f00\u59cb,\u8fd9\u5c31\u662f\u514b\u91cc\u65af\xb7\u7ea6\u7ff0. \u57fa\u672c\u4e0a,NATD\u8d1f\u8d23ERDDAP,\u6240\u4ee5S/\u4ed6\u5bf9\u51b3\u5b9a\u6709\u6700\u540e\u7684\u53d1\u8a00\u6743ERDDAP\u2122\u4ee3\u7801,\u5c24\u5176\u662f\u5173\u4e8e\u8bbe\u8ba1\u4ee5\u53ca\u662f\u5426\u63a5\u53d7\u7ed9\u5b9a\u7684\u62c9\u52a8\u8bf7\u6c42\u3002 \u4e00\u5b9a\u662f\u56e0\u4e3a\u6548\u7387\u7684\u539f\u56e0 (\u8fd9\u5bf9Linus Torvalds\u548cLinux\u5f88\u6709\u7528) \u90e8\u5206\u51fa\u4e8e\u5b89\u5168\u539f\u56e0: \u5fc5\u987b\u6709\u4eba\u544a\u8bc9IT\u5b89\u5168\u4eba\u5458 \u4ed6/\u4ed6\u8d1f\u8d23\u4ee3\u7801\u7684\u5b89\u5168\u6027\u548c\u5b8c\u6574\u6027.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"NATD\u4e0d\u80fd\u4fdd\u8bc1\u4ed6\u63a5\u53d7\u4f60\u7684\u4ee3\u7801\r\n\u5982\u679c\u4e00\u4e2a\u9879\u76ee\u6ca1\u6709\u5982\u6211\u4eec\u6240\u5e0c\u671b\u7684\u90a3\u6837\u6210\u529f \u5982\u679c\u65e0\u6cd5\u633d\u6551\u7684\u8bdd NATD\u5c31\u4e0d\u4f1a\u628a\u8be5\u9879\u76ee\u5217\u5165ERDDAP\u2122\u5206\u53d1\u3002 \u8bf7\u4e0d\u8981\u611f\u5230\u96be\u8fc7\u3002 \u6709\u65f6\u9879\u76ee\u4f1a\u4e0d\u5c3d\u5982\u4eba\u610f \u5b83\u53d1\u751f\u5728\u6240\u6709\u8f6f\u4ef6\u5f00\u53d1\u8005\u8eab\u4e0a. \u5982\u679c\u4f60\u9075\u5faa\u4ee5\u4e0b\u51c6\u5219,\u4f60\u5c31\u4f1a\u5927\u5927\u589e\u52a0\u6210\u529f\u7684\u673a\u4f1a.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5982\u679c\u8fd9\u4e9b\u53d8\u5316\u5177\u6709\u666e\u904d\u7684\u5229\u76ca\u548c\u6548\u7528,\u90a3\u662f\u6700\u597d\u7684.\r\n\u5982\u679c\u4ee3\u7801\u662f\u60a8\u7684\u7ec4\u7ec7\u7279\u6709\u7684, \u6700\u597d\u4fdd\u6301\u4e00\u4e2a\u5355\u72ec\u7684\u5206\u652fERDDAP\u2122\u4f9b\u4f60\u4eec\u4f7f\u7528\u3002 Axiom\u8fd9\u6837\u505a\u3002 \u5e78\u8fd0\u7684\u662f,\u5409\u7279\u8ba9\u8fd9\u4ef6\u4e8b\u53d8\u5f97\u5bb9\u6613\u4e86. NATD\u5e0c\u671b\u4fdd\u6301\u5bf9ERDDAP,\u4e0d\u5141\u8bb8\u5b83\u6210\u4e3a\u4e00\u4e2a\u53a8\u623f\u6c34\u69fd\u9879\u76ee,\u6bcf\u4e2a\u4eba\u90fd\u5728\u5176\u4e2d\u4e3a\u5176\u9879\u76ee\u6dfb\u52a0\u4e00\u4e2a\u5b9a\u5236\u7684\u7279\u6027.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["\u8ddf\u7740Java\u300a\u5b88\u5219\u516c\u7ea6\u300b\u3002\r\n\u4e00\u822c\u6765\u8bf4,\u4f60\u7684\u4ee3\u7801\u5e94\u8be5\u8d28\u91cf\u597d,\u5e94\u8be5\u9075\u5faa\u539f\u6765\u7684",(0,r.jsx)(e.a,{href:"https://www.oracle.com/technetwork/java/codeconventions-150003.pdf",children:"Java\u5b88\u5219\u516c\u7ea6"}),": \u5c06. class \u6587\u4ef6\u653e\u5728\u76ee\u5f55\u7ed3\u6784\u7684\u9002\u5f53\u4f4d\u7f6e, \u7ed9. class \u6587\u4ef6\u4e00\u4e2a\u9002\u5f53\u7684\u540d\u79f0, \u5305\u62ec properJavaDoc \u6ce8\u91ca,\u5728\u4ee3\u7801\u7684\u6bcf\u4e00\u6bb5\u5f00\u5934\u5305\u542b//\u6ce8\u91ca,\u7f29\u8fdb4\u4e2a\u7a7a\u683c (\u6ca1\u6709\u6807\u7b7e) ,\u907f\u514d\u884c >80\u5b57\u7b26\u7b49. \u4f20\u7edf\u6539\u53d8, \u6e90\u4ee3\u7801\u5e76\u4e0d\u603b\u662f\u5b8c\u5168\u66f4\u65b0\u3002 \u5f53\u51fa\u73b0\u7591\u95ee\u65f6,\u5c06\u4ee3\u7801\u4e0e\u516c\u7ea6\u800c\u4e0d\u662f\u73b0\u6709\u7684\u4ee3\u7801\u76f8\u5339\u914d\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u4f7f\u7528\u63cf\u8ff0\u7c7b,\u65b9\u6cd5\u548c\u53ef\u53d8\u540d\u79f0.\r\n\u8fd9\u8ba9\u5176\u4ed6\u4eba\u66f4\u5bb9\u6613\u9605\u8bfb\u4ee3\u7801.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u907f\u514d\u5947\u5f02\u7684\u4ee3\u7801\u3002\r\n\u4ece\u957f\u8fdc\u6765\u770b,\u4f60\u6216\u5176\u4ed6\u4eba\u5fc5\u987b\u627e\u51fa\u4ee3\u7801\u624d\u80fd\u7ef4\u6301. \u6240\u4ee5,\u8bf7\u4f7f\u7528\u7b80\u5355\u7684\u7f16\u7801\u65b9\u6cd5,\u8fd9\u6837\u5bf9\u5176\u4ed6\u4eba\u66f4\u5bb9\u6613 (\u5305\u62ec\u4f60\u7684\u672a\u6765) \u627e\u51fa\u6765\u3002 \u5f88\u660e\u663e,\u5982\u679c\u6709\u771f\u6b63\u7684\u4f18\u52bf \u4f7f\u7528\u4e00\u4e9b\u82b1\u54e8Java\u7f16\u7a0b\u529f\u80fd,\u4f7f\u7528\u5b83,\u4f46\u5927\u91cf\u8bb0\u5f55\u4f60\u505a\u4e86\u4ec0\u4e48,\u4e3a\u4ec0\u4e48,\u4ee5\u53ca\u5b83\u662f\u5982\u4f55\u5de5\u4f5c\u7684.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u5728\u4f60\u5f00\u59cb\u4e4b\u524d\u8ddf\u6280\u672f\u59d4\u5458\u4f1a\u5408\u4f5c\r\n\u5982\u679c\u4f60\u60f3\u8ba9\u60a8\u7684\u4ee3\u7801\u66f4\u6539\u8fdb\u5165ERDDAP\u2122\u6280\u672f\u59d4\u5458\u4f1a\u7edd\u5bf9\u4f1a\u60f3\u5728\u4fee\u6539\u4ee3\u7801\u4e4b\u524d \u8c08\u8c08\u4f60\u8981\u505a\u4ec0\u4e48\u548c\u600e\u4e48\u505a \u8fd9\u6837\u6211\u4eec\u5c31\u53ef\u4ee5\u907f\u514d\u4f60\u505a\u51faNATD\u6700\u7ec8\u4e0d\u63a5\u53d7\u7684\u6539\u53d8. \u5728\u4f60\u505a\u8fd9\u9879\u5de5\u4f5c\u65f6,NATD\u548c\u6280\u672f\u59d4\u5458\u4f1a\u613f\u610f\u56de\u7b54\u95ee\u9898,\u4ee5\u5e2e\u52a9\u4f60\u627e\u51fa\u73b0\u6709\u7684\u4ee3\u7801\u548c (\u603b\u8ba1) \u5982\u4f55\u89e3\u51b3\u60a8\u7684\u9879\u76ee\u3002\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:['\u72ec\u7acb\u5de5\u4f5c (\u5c3d\u53ef\u80fd\u591a) \u4f60\u5f00\u59cb\u540e\r\n\u4e0e\u4e0a\u8ff0"\u4e0e\u6280\u672f\u59d4\u5458\u4f1a\u5408\u4f5c"\u76f8\u5bf9,\u5728\u9879\u76ee\u5f00\u59cb\u540e,NATD\u9f13\u52b1\u60a8\u5c3d\u53ef\u80fd\u72ec\u7acb\u5de5\u4f5c. \u5982\u679cNATD\u8981\u544a\u8bc9\u4f60\u51e0\u4e4e\u6240\u6709\u7684\u4e8b\u60c5 \u56de\u7b54\u5f88\u591a\u95ee\u9898 (\u7279\u522b\u662f\u90a3\u4e9b\u4f60\u53ef\u4ee5\u901a\u8fc7\u9605\u8bfb\u6587\u6863\u6216\u4ee3\u7801\u6765\u56de\u7b54\u7684) \u90a3\u6837\u4f60\u7684\u52aa\u529b\u5c31\u4e0d\u662f NATD\u7684\u8282\u7701\u65f6\u95f4\u4e86 \u4ed6\u4e5f\u53ef\u4ee5\u81ea\u5df1\u505a \u8fd9\u662f',(0,r.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/The_Mythical_Man-Month",children:"\u795e\u8bdd\u4eba\u7269\u6708"}),"\u95ee\u9898\u3002 \u5f53\u7136,\u6211\u4eec\u8fd8\u662f\u5e94\u8be5\u6c9f\u901a\u3002 \u6700\u597d\u80fd\u5b9a\u671f\u770b\u5230\u4f60\u7684\u5de5\u4f5c\u8fdb\u5c55,\u4ee5\u786e\u4fdd\u9879\u76ee\u8d70\u4e0a\u6b63\u8f68\u3002 \u4e0d\u8fc7\u4f60\u8d8a\u80fd\u72ec\u7acb\u5de5\u4f5c (\u5728\u6280\u672f\u59d4\u5458\u4f1a\u5546\u5b9a\u624b\u5934\u7684\u4efb\u52a1\u548c\u4e00\u822c\u529e\u6cd5\u4e4b\u540e) - \u8d8a\u597d\u8d8a\u597d\r\n\xa0"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u907f\u5f00\u866b\u5b50\u3002\r\n\u5982\u679c\u4e00\u4e2a\u9519\u8bef\u5728\u53d1\u5e03\u524d\u6ca1\u6709\u88ab\u6293\u4f4f,\u4f1a\u5bf9\u7528\u6237\u9020\u6210\u95ee\u9898 (\u6700\u591a\u4e0d\u8fc7) ,\u8fd4\u56de\u9519\u8bef\u7684\u4fe1\u606f (\u6700\u7cdf\u7684\u65f6\u5019) ,\u662f\u4e00\u4e2ablot\u4e0aERDDAP\u540d\u58f0\u8fdc\u626c \u5c06\u6301\u7eed\u8fc7\u65f6ERDDAP\u2122\u8bbe\u65bd\u4f7f\u7528\u5e74\u9650\u3002 \u5341\u5206\u52aa\u529b\u5730\u907f\u514d\u866b\u866b. \u4e00\u90e8\u5206\u662f\u5199\u5e72\u51c0\u7684\u4ee3\u7801 (\u6240\u4ee5\u66f4\u5bb9\u6613\u770b\u5230\u95ee\u9898) \u3002 \u3002 \u3002 \u8fd9\u90e8\u5206\u662f\u5199\u4f5c\u5355\u4f4d\u6d4b\u8bd5. \u5176\u4e2d\u4e00\u90e8\u5206\u662f\u5199\u4ee3\u7801\u65f6\u5bf9\u907f\u866b\u7684\u6052\u5b9a\u6001\u5ea6. \u4e0d\u8981\u8ba9NATD\u540e\u6094 \u52a0\u4e0a\u4f60\u7684\u4ee3\u7801ERDDAP\u2122\u3002 \u3002 \u3002 \u3002\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:'\u5199\u51fa\u5355\u4f4d\u6d4b\u8bd5\u6216\u6d4b\u8bd5.\r\n\u5bf9\u4e8e\u65b0\u4ee3\u7801,\u60a8\u5e94\u8be5\u5728\u6d4b\u8bd5\u6587\u4ef6\u4e2d\u5199\u5165JUnit\u6d4b\u8bd5.\r\n\u8bf7\u81f3\u5c11\u5199\u51fa\u4e00\u79cd\u4e2a\u4f53\u6d4b\u8bd5\u65b9\u6cd5, \u5f7b\u5e95\u6d4b\u8bd5\u60a8\u6240\u5199\u7684\u4ee3\u7801, \u5e76\u5c06\u5176\u6dfb\u52a0\u5230\u7c7b\u7684\u201c JUnit\u201d \u6d4b\u8bd5\u6587\u4ef6\u4e2d, \u4ee5\u4fbf\u81ea\u52a8\u8fd0\u884c \u3002 \u5355\u4f4d (\u53ca\u6709\u5173\u4e8b\u9879) \u6d4b\u8bd5\u662f\u6355\u866b\u7684\u6700\u597d\u65b9\u6cd5\u4e4b\u4e00 \u9996\u5148,\u4ece\u957f\u8fdc\u6765\u770b (\u968f\u7740\u5176\u4ed6\u4e8b\u7269\u7684\u53d8\u5316ERDDAP\u2122) \u3002 \u3002 \u3002 \u6b63\u5982\u9c8d\u52c3\u6240\u8bf4, "\u5355\u4f4d\u6d4b\u8bd5\u8ba9\u6211\u665a\u4e0a\u7761\u89c9\u3002"\r\n\xa0'}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u8ba9NATD\u5bb9\u6613\u7406\u89e3\u5e76\u63a5\u53d7\u4f60\u62c9\u529b\u8bf7\u6c42\u4e2d\u7684\u53d8\u52a8.\r\n\u5176\u4e2d\u4e00\u90e8\u5206\u662f\u5199\u4e00\u4e2a\u5355\u4f4d\u6d4b\u8bd5\u65b9\u6cd5 (\u7f16\u53f7) \u3002 \u3002 \u3002 \u5176\u4e2d\u4e00\u90e8\u5206\u662f\u9650\u5236\u60a8\u4fee\u6539\u4ee3\u7801\u7684\u4e00\u8282 (\u6216\u4e00\u4e2a\u7c7b\u522b) \u5982\u679c\u53ef\u80fd\u7684\u8bdd\u3002 NATD\u4e0d\u4f1a\u63a5\u53d7\u4efb\u4f55\u62c9\u52a8\u8bf7\u6c42,\u5728\u6574\u4e2a\u4ee3\u7801\u4e2d\u4f1a\u6709\u6570\u767e\u4e2a\u4fee\u6539. NATD\u544a\u8bc9IT\u5b89\u5168\u4eba\u5458,\u4ed6/\u4ed6\u8d1f\u8d23\u4ee3\u7801\u7684\u5b89\u5168\u6027\u548c\u5b8c\u6574\u6027. \u5982\u679c\u6709\u592a\u591a\u7684\u6539\u53d8\u6216\u8005\u5b83\u4eec\u592a\u96be\u60f3\u51fa,\u90a3\u4e48\u5c31\u5f88\u96be\u6838\u5b9e\u8fd9\u4e9b\u6539\u53d8\u662f\u6b63\u786e\u7684,\u5e76\u4e14\u4e0d\u8981\u5f15\u5165\u9519\u8bef\u6216\u5b89\u5168\u95ee\u9898.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u7b80\u5355\u70b9\r\n\u4f60\u4ee3\u7801\u7684\u4e00\u4e2a\u597d\u7684\u603b\u4e3b\u9898\u662f:\u4fdd\u6301\u7b80\u5355. \u7b80\u5355\u7684\u4ee3\u7801\u5bf9\u5176\u4ed6\u4eba\u6765\u8bf4\u5f88\u7b80\u5355 (\u5305\u62ec\u4f60\u7684\u672a\u6765) \u9605\u8bfb\u548c\u7ef4\u62a4\u3002 NATD\u5f88\u5bb9\u6613\u7406\u89e3\u4ece\u800c\u63a5\u53d7.\r\n\xa0"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"\u627f\u62c5\u4f60\u4ee3\u7801\u7684\u957f\u671f\u8d23\u4efb\r\n\u4ece\u957f\u8fdc\u6765\u770b,\u4f60\u6700\u597d\u627f\u62c5\u6301\u7eed\u7684\u8d23\u4efb \u7ef4\u6301\u4f60\u7684\u4ee3\u7801,\u56de\u7b54\u5173\u4e8e\u5b83\u7684\u95ee\u9898 (\u4f8b\u5982,ERDDAP\u2122\u8c37\u6b4c\u96c6\u56e2) \u3002 \u3002 \u3002 \u6b63\u5982\u4e00\u4e9b\u4f5c\u8005\u6307\u51fa,\u4ee3\u7801\u65e2\u662f\u8d1f\u503a\u4e5f\u662f\u8d44\u4ea7\u3002 \u5982\u679c\u5c06\u6765\u53d1\u73b0\u4e00\u4e2a\u866b\u5b50,\u6700\u597d\u8fd8\u662f\u628a\u5b83\u4fee\u597d \u56e0\u4e3a\u6ca1\u6709\u4eba\u6bd4\u4f60\u66f4\u4e86\u89e3\u4f60\u7684\u5bc6\u7801 (\u4e5f\u662f\u4e3a\u4e86\u9632\u6b62\u866b\u5b50\u51fa\u73b0) \u3002 \u3002 \u3002 NATD\u5e76\u4e0d\u662f\u8981\u6c42\u575a\u5b9a\u627f\u8bfa\u63d0\u4f9b\u6301\u7eed\u7684\u7ef4\u62a4. NATD\u53ea\u662f\u8868\u793a,\u505a\u7ef4\u4fee\u5de5\u4f5c\u4f1a\u975e\u5e38\u611f\u6fc0."}),"\n"]}),"\n"]})]})}function o(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}}}]);