"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6692],{28453:(e,r,t)=>{t.d(r,{R:()=>i,x:()=>o});var s=t(96540);const n={},a=s.createContext(n);function i(e){const r=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(a.Provider,{value:r},e.children)}},89228:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","title":"to-hex-c-s-s-v-string","description":"//ERDDAP/com.cohort.util/ScriptString2/toHexCSSVString","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"to-float-array","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-float-array"},"next":{"title":"to-int-array","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-int-array"}}');var n=t(74848),a=t(28453);const i={},o="toHexCSSVString",c={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Return",id:"return-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Return",id:"return-2",level:4},{value:"Parameters",id:"parameters-2",level:4}];function l(e){const r={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:["//",(0,n.jsx)(r.a,{href:"/es/docs/dokka/",children:"ERDDAP"}),"/",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"})]}),"\n",(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"tohexcssvstring",children:"toHexCSSVString"})}),"\n",(0,n.jsxs)(r.p,{children:["[JVM]",(0,n.jsx)(r.br,{}),"\n","open fun ",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Byte>): ",(0,n.jsx)(r.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(r.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfc."}),"\n",(0,n.jsx)(r.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,n.jsx)(r.h4,{id:"return",children:"Return"}),"\n",(0,n.jsx)(r.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(r.p,{children:"JVM"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{}),(0,n.jsx)(r.th,{})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"ar"}),(0,n.jsx)(r.td,{children:"an array of bytes"})]})})]}),"\n",(0,n.jsxs)(r.p,{children:["[JVM]",(0,n.jsx)(r.br,{}),"\n","open fun ",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Short>): ",(0,n.jsx)(r.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(r.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfffc."}),"\n",(0,n.jsx)(r.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,n.jsx)(r.h4,{id:"return-1",children:"Return"}),"\n",(0,n.jsx)(r.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsx)(r.p,{children:"JVM"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{}),(0,n.jsx)(r.th,{})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"ar"}),(0,n.jsx)(r.td,{children:"an array of short"})]})})]}),"\n",(0,n.jsxs)(r.p,{children:["[JVM]",(0,n.jsx)(r.br,{}),"\n","open fun ",(0,n.jsx)(r.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Int>): ",(0,n.jsx)(r.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(r.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfffffffc."}),"\n",(0,n.jsx)(r.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,n.jsx)(r.h4,{id:"return-2",children:"Return"}),"\n",(0,n.jsx)(r.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsx)(r.p,{children:"JVM"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{}),(0,n.jsx)(r.th,{})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"ar"}),(0,n.jsx)(r.td,{children:"an array of ints"})]})})]})]})}function h(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}}}]);