"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5796],{15732:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>d,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"contributing/contributing","title":"\u8ca2\u732e\u3059\u308bERDDAP\u2122","description":"\u554f\u984c\u5831\u544a","source":"@site/i18n/ja/docusaurus-plugin-content-docs/current/contributing/contributing.md","sourceDirName":"contributing","slug":"/contributing/","permalink":"/ja/docs/contributing/","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/contributing/contributing.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"docSidebar","previous":{"title":"Contributing","permalink":"/ja/docs/category/contributing"},"next":{"title":"\u30d7\u30ed\u30b0\u30e9\u30de\u30ac\u30a4\u30c9","permalink":"/ja/docs/contributing/programmer-guide"}}');var r=i(74848),s=i(28453);const d={sidebar_position:1},o="\u8ca2\u732e\u3059\u308bERDDAP\u2122",c={},a=[{value:"\u554f\u984c\u5831\u544a",id:"reporting-an-issue",level:2},{value:"\u554f\u984c\u306e\u4fee\u6b63",id:"fixing-an-issue",level:2},{value:"\u65b0\u6a5f\u80fd\u306e\u8ffd\u52a0",id:"adding-a-new-feature",level:2},{value:"\u6280\u8853\u7684\u306a\u8cea\u554f\u306e\u305f\u3081",id:"for-technical-questions",level:2},{value:"\u304a\u554f\u3044\u5408\u308f\u305bERDDAP\u2122\u30b5\u30fc\u30d0\u7ba1\u7406\u306e\u30b5\u30dd\u30fc\u30c8",id:"for-erddap-server-admin-support",level:2}];function u(e){const n={a:"a",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"\u8ca2\u732e\u3059\u308berddap",children:"\u8ca2\u732e\u3059\u308bERDDAP\u2122"})}),"\n",(0,r.jsx)(n.h2,{id:"reporting-an-issue",children:"\u554f\u984c\u5831\u544a"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"\u30d0\u30b0\u304c\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u8106\u5f31\u6027\u3067\u3042\u308b\u5834\u5408\u3001GitHub \u306e\u554f\u984c\u3092\u958b\u304f\u5fc5\u8981\u306f\u3042\u308a\u307e\u305b\u3093\u3002"})," , \u3067\u306f\u306a\u304f\u3001\u79c1\u305f\u3061\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044",(0,r.jsx)(n.a,{href:"https://github.com/erddap/erddap?tab=security-ov-file",children:"\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30dd\u30ea\u30b7\u30fc"}),"\u304a\u554f\u3044\u5408\u308f\u305b \u30d1\u30d6\u30ea\u30c3\u30af\u30c8\u30e9\u30c3\u30ab\u30fc\u304b\u3089\u3001\u6a5f\u5bc6\u6027\u306e\u9ad8\u3044\u554f\u984c\u304c\u524a\u9664\u3055\u308c\u307e\u3059\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["GitHub\u3067\u691c\u7d22\u3057\u3066\u30d0\u30b0\u304c\u5831\u544a\u3055\u308c\u3066\u3044\u306a\u3044\u3053\u3068\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",(0,r.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/issues",children:"\u554f\u984c\u70b9"}),"\u304a\u554f\u3044\u5408\u308f\u305b"]}),"\n",(0,r.jsx)(n.p,{children:"\u6a5f\u80fd\u30ea\u30af\u30a8\u30b9\u30c8\u304c\u3042\u308b\u5834\u5408\u3001Github \u30c7\u30a3\u30b9\u30ab\u30c3\u30b7\u30e7\u30f3\u3092\u884c\u3044\u307e\u3059\u3002 (\u8a73\u3057\u304f\u306f\u3053\u3061\u3089\u3092\u3054\u89a7\u304f\u3060\u3055\u3044\u3002) \u304a\u554f\u3044\u5408\u308f\u305b"}),"\n",(0,r.jsxs)(n.p,{children:["\u554f\u984c\u306b\u5bfe\u51e6\u3059\u308b\u554f\u984c\u304c\u898b\u3064\u304b\u3089\u306a\u3044\u5834\u5408\u3001",(0,r.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/issues/new",children:"\u65b0\u3057\u3044\u3082\u306e\u3092\u958b\u304f"}),"\u304a\u554f\u3044\u5408\u308f\u305b \u30bf\u30a4\u30c8\u30eb\u3068\u660e\u78ba\u306a\u8aac\u660e\u3001\u53ef\u80fd\u306a\u9650\u308a\u95a2\u9023\u6027\u306e\u9ad8\u3044\u60c5\u5831\u3001\u304a\u3088\u3073\u554f\u984c\u306e\u518d\u73fe\u306e\u305f\u3081\u306e\u6307\u793a\u3092\u5fc5\u305a\u542b\u3081\u3066\u304f\u3060\u3055\u3044\u3002ERDDAP\u2122\u60f3\u5b9a\u3055\u308c\u308b\u52d5\u4f5c\u304c\u8d77\u3053\u3089\u306a\u3044\u30b5\u30fc\u30d0\u3092\u30c7\u30e2\u30f3\u30b9\u30c8\u30ec\u30fc\u30b7\u30e7\u30f3\u3057\u307e\u3059\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"fixing-an-issue",children:"\u554f\u984c\u306e\u4fee\u6b63"}),"\n",(0,r.jsx)(n.p,{children:"\u65b0\u3057\u3044GitHub\u30d7\u30eb\u30ea\u30af\u30a8\u30b9\u30c8\u3092\u958b\u304f (\u30d7\u30ed\u30e2\u30fc\u30b7\u30e7\u30f3) \u30d1\u30c3\u30c1\u3092\u4f7f\u3063\u3066\u3002"}),"\n",(0,r.jsx)(n.p,{children:"PR\u306e\u8aac\u660e\u306f\u3001\u554f\u984c\u3068\u89e3\u6c7a\u7b56\u3092\u660e\u78ba\u306b\u8a18\u8ff0\u3057\u307e\u3059\u3002 \u8a72\u5f53\u3059\u308b\u5834\u5408\u3001\u95a2\u9023\u3059\u308b\u554f\u984c\u756a\u53f7\u3092\u542b\u3081\u308b\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u63d0\u51fa\u306e\u524d\u306b\u3001\u5fc5\u305a\u304a\u8aad\u307f\u304f\u3060\u3055\u3044\u3002",(0,r.jsx)(n.a,{href:"/docs/contributing/programmer-guide",children:"\u30d7\u30ed\u30b0\u30e9\u30de\u30ac\u30a4\u30c9"}),"\u30b3\u30fc\u30c7\u30a3\u30f3\u30b0\u306e\u6163\u7fd2\u306b\u3064\u3044\u3066\u306e\u8a73\u7d30\u3092\u77e5\u308b\u305f\u3081\u306e\u30ac\u30a4\u30c9\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"adding-a-new-feature",children:"\u65b0\u6a5f\u80fd\u306e\u8ffd\u52a0"}),"\n",(0,r.jsxs)(n.p,{children:["\u5909\u66f4\u3092\u63d0\u6848\u3059\u308b",(0,r.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/discussions",children:"ERDDAP\u2122GitHub\u306e\u30c7\u30a3\u30b9\u30ab\u30c3\u30b7\u30e7\u30f3"}),"\u30b3\u30fc\u30c9\u306e\u4f5c\u6210\u3092\u958b\u59cb GitHub\u306e\u30c7\u30a3\u30b9\u30ab\u30c3\u30b7\u30e7\u30f3\u3092\u4f5c\u6210\u3059\u308b\u524d\u306b\u3001\u3053\u308c\u3092\u8aad\u3093\u3067\u304f\u3060\u3055\u3044\u3002",(0,r.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427",children:"\u30a4\u30f3\u30d5\u30a9\u30e1\u30fc\u30b7\u30e7\u30f3"}),"\u304a\u554f\u3044\u5408\u308f\u305b"]}),"\n",(0,r.jsx)(n.p,{children:"\u5909\u66f4\u306b\u95a2\u3059\u308b\u80af\u5b9a\u7684\u306a\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af\u3092\u53ce\u96c6\u3059\u308b\u307e\u3067\u3001GitHub\u3067\u554f\u984c\u3092\u958b\u304f\u5fc5\u8981\u306f\u3042\u308a\u307e\u305b\u3093\u3002 GitHub\u306e\u554f\u984c\u306f\u3001\u30d0\u30b0\u5831\u544a\u3068\u4fee\u6b63\u306e\u305f\u3081\u306b\u4e3b\u306b\u610f\u56f3\u3055\u308c\u3066\u3044\u307e\u3059\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"for-technical-questions",children:"\u6280\u8853\u7684\u306a\u8cea\u554f\u306e\u305f\u3081"}),"\n",(0,r.jsxs)(n.p,{children:["\u8a73\u7d30\u306f\u3053\u3061\u3089",(0,r.jsx)(n.a,{href:"https://github.com/ERDDAP/erddap/discussions",children:"ERDDAP\u2122GitHub\u306e\u30c7\u30a3\u30b9\u30ab\u30c3\u30b7\u30e7\u30f3"}),"\u304a\u554f\u3044\u5408\u308f\u305b"]}),"\n",(0,r.jsx)(n.h2,{id:"for-erddap-server-admin-support",children:"\u304a\u554f\u3044\u5408\u308f\u305bERDDAP\u2122\u30b5\u30fc\u30d0\u7ba1\u7406\u306e\u30b5\u30dd\u30fc\u30c8"}),"\n",(0,r.jsxs)(n.p,{children:["\u8a73\u7d30\u306f\u3053\u3061\u3089",(0,r.jsx)(n.a,{href:"https://groups.google.com/g/erddap",children:"ERDDAP\u2122\u30e6\u30fc\u30b6\u30fc\u306eGoogle\u30b0\u30eb\u30fc\u30d7"}),"\u304a\u554f\u3044\u5408\u308f\u305b"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>o});var t=i(96540);const r={},s=t.createContext(r);function d(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);