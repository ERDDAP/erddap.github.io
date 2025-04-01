"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5926],{28453:(e,t,a)=>{a.d(t,{R:()=>i,x:()=>l});var r=a(96540);const s={},n=r.createContext(s);function i(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(n.Provider,{value:t},e.children)}},34699:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","title":"simple-matlab-name-safe","description":"//ERDDAP/com.cohort.util/ScriptString2/simpleMatlabNameSafe","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","permalink":"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"rounding-parse-int","permalink":"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/rounding-parse-int"},"next":{"title":"split-no-trim","permalink":"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/split-no-trim"}}');var s=a(74848),n=a(28453);const i={},l="simpleMatlabNameSafe",o={},c=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function d(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["//",(0,s.jsx)(t.a,{href:"/zh/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(t.a,{href:"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(t.a,{href:"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,s.jsx)(t.a,{href:"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe",children:"simpleMatlabNameSafe"})]}),"\n",(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"simplematlabnamesafe",children:"simpleMatlabNameSafe"})}),"\n",(0,s.jsxs)(t.p,{children:["[JVM]",(0,s.jsx)(t.br,{}),"\n","open fun ",(0,s.jsx)(t.a,{href:"/zh/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/simple-matlab-name-safe",children:"simpleMatlabNameSafe"}),"(s: ",(0,s.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,s.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(t.p,{children:"This is like encodeMatlabNameSafe, but simpler and won't always retain all the info."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"first character must be A-Z, a-z."}),"\n",(0,s.jsx)(t.li,{children:"subsequent characters must be A-Z, a-z, _, 0-9."}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["non-safe characters are some safe variant.  See posix fully portable file names at ",(0,s.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Filename",children:"https://en.wikipedia.org/wiki/Filename"}),' .  When the encoding is more than 25 characters, this stops encoding and adds "xh" and the hash code for the entire original string, so the result will always be less than ~41 characters.  This meets MatLab restrictions: ',(0,s.jsx)(t.a,{href:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html",children:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html"})]}),"\n",(0,s.jsx)(t.p,{children:"THIS WON'T BE CHANGED. SOME datasetIDs DEPEND ON SAME ENCODING OVER TIME."}),"\n",(0,s.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,s.jsx)(t.p,{children:'s with all of the non-variableNameSafe characters changed. If s is null, this returns "null_". If s is "", this returns "nothing_".'}),"\n",(0,s.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(t.p,{children:"JVM"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:"s"})})})]})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);