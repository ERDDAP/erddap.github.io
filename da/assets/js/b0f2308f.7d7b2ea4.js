"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5926],{28453:(e,a,t)=>{t.d(a,{R:()=>i,x:()=>l});var r=t(96540);const s={},n=r.createContext(s);function i(e){const a=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function l(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(n.Provider,{value:a},e.children)}},34699:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","title":"simple-matlab-name-safe","description":"//ERDDAP/com.cohort.util/ScriptString2/simpleMatlabNameSafe","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","permalink":"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"rounding-parse-int","permalink":"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/rounding-parse-int"},"next":{"title":"split-no-trim","permalink":"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/split-no-trim"}}');var s=t(74848),n=t(28453);const i={},l="simpleMatlabNameSafe",o={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function c(e){const a={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(a.p,{children:["//",(0,s.jsx)(a.a,{href:"/da/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(a.a,{href:"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(a.a,{href:"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,s.jsx)(a.a,{href:"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe",children:"simpleMatlabNameSafe"})]}),"\n",(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"simplematlabnamesafe",children:"simpleMatlabNameSafe"})}),"\n",(0,s.jsxs)(a.p,{children:["[JVM]",(0,s.jsx)(a.br,{}),"\n","open fun ",(0,s.jsx)(a.a,{href:"/da/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe",children:"simpleMatlabNameSafe"}),"(s: ",(0,s.jsx)(a.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,s.jsx)(a.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(a.p,{children:"This is like encodeMatlabNameSafe, but simpler and won't always retain all the info."}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"first character must be A-Z, a-z."}),"\n",(0,s.jsx)(a.li,{children:"subsequent characters must be A-Z, a-z, _, 0-9."}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["non-safe characters are some safe variant.  See posix fully portable file names at ",(0,s.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/Filename",children:"https://en.wikipedia.org/wiki/Filename"}),' .  When the encoding is more than 25 characters, this stops encoding and adds "xh" and the hash code for the entire original string, so the result will always be less than ~41 characters.  This meets MatLab restrictions: ',(0,s.jsx)(a.a,{href:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html",children:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html"})]}),"\n",(0,s.jsx)(a.p,{children:"THIS WON'T BE CHANGED. SOME datasetIDs DEPEND ON SAME ENCODING OVER TIME."}),"\n",(0,s.jsx)(a.h4,{id:"return",children:"Return"}),"\n",(0,s.jsx)(a.p,{children:'s with all of the non-variableNameSafe characters changed. If s is null, this returns "null_". If s is "", this returns "nothing_".'}),"\n",(0,s.jsx)(a.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(a.p,{children:"JVM"}),"\n",(0,s.jsxs)(a.table,{children:[(0,s.jsx)(a.thead,{children:(0,s.jsx)(a.tr,{children:(0,s.jsx)(a.th,{})})}),(0,s.jsx)(a.tbody,{children:(0,s.jsx)(a.tr,{children:(0,s.jsx)(a.td,{children:"s"})})})]})]})}function h(e={}){const{wrapper:a}={...(0,n.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}}}]);