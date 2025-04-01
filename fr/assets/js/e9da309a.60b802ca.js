"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1803],{20445:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>i,contentTitle:()=>d,default:()=>l,frontMatter:()=>n,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa","title":"mantissa","description":"//ERDDAP/com.cohort.util/ScriptMath2/mantissa","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa","permalink":"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"m-per-mile","permalink":"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/m-per-mile"},"next":{"title":"math-to-compass-degrees","permalink":"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/math-to-compass-degrees"}}');var s=r(74848),o=r(28453);const n={},d="mantissa",i={},c=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function h(t){const e={a:"a",br:"br",em:"em",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:["//",(0,s.jsx)(e.a,{href:"/fr/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(e.a,{href:"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(e.a,{href:"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/",children:"ScriptMath2"}),"/",(0,s.jsx)(e.a,{href:"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa",children:"mantissa"})]}),"\n",(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"mantissa",children:"mantissa"})}),"\n",(0,s.jsxs)(e.p,{children:["[JVM]",(0,s.jsx)(e.br,{}),"\n","open fun ",(0,s.jsx)(e.a,{href:"/fr/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/mantissa",children:"mantissa"}),"(d: Double): Double"]}),"\n",(0,s.jsxs)(e.p,{children:["This returns the mantissa of a double (-0.0175 returns -1.75 since -0.0175=-1.75*10^-2). It handles 0, +, and - numbers. WARNING: round off problems can cause (for example) 100 to be treated 10 ",(0,s.jsx)(e.em,{children:"10^1, not 1"}),"10^2!"]}),"\n",(0,s.jsx)(e.p,{children:"See the similar String2.toRational()"}),"\n",(0,s.jsx)(e.h4,{id:"return",children:"Return"}),"\n",(0,s.jsx)(e.p,{children:"d / exponent(d) (or 0 if d=0, or NaN if !finite(d))"}),"\n",(0,s.jsx)(e.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(e.p,{children:"JVM"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{}),(0,s.jsx)(e.th,{})]})}),(0,s.jsx)(e.tbody,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"d"}),(0,s.jsx)(e.td,{children:"any double"})]})})]})]})}function l(t={}){const{wrapper:e}={...(0,o.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(h,{...t})}):h(t)}},28453:(t,e,r)=>{r.d(e,{R:()=>n,x:()=>d});var a=r(96540);const s={},o=a.createContext(s);function n(t){const e=a.useContext(o);return a.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function d(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:n(t.components),a.createElement(o.Provider,{value:e},t.children)}}}]);