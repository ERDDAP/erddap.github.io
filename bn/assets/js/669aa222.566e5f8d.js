"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6692],{28453:(r,e,t)=>{t.d(e,{R:()=>i,x:()=>o});var n=t(96540);const s={},a=n.createContext(s);function i(r){const e=n.useContext(a);return n.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function o(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(s):r.components||s:i(r.components),n.createElement(a.Provider,{value:e},r.children)}},89228:(r,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","title":"to-hex-c-s-s-v-string","description":"//ERDDAP/com.cohort.util/ScriptString2/toHexCSSVString","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"to-float-array","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-float-array"},"next":{"title":"to-int-array","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-int-array"}}');var s=t(74848),a=t(28453);const i={},o="toHexCSSVString",c={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Return",id:"return-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Return",id:"return-2",level:4},{value:"Parameters",id:"parameters-2",level:4}];function l(r){const e={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.R)(),...r.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:["//",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"})]}),"\n",(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"tohexcssvstring",children:"toHexCSSVString"})}),"\n",(0,s.jsxs)(e.p,{children:["[JVM]",(0,s.jsx)(e.br,{}),"\n","open fun ",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Byte>): ",(0,s.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(e.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfc."}),"\n",(0,s.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,s.jsx)(e.h4,{id:"return",children:"Return"}),"\n",(0,s.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,s.jsx)(e.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(e.p,{children:"JVM"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{}),(0,s.jsx)(e.th,{})]})}),(0,s.jsx)(e.tbody,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ar"}),(0,s.jsx)(e.td,{children:"an array of bytes"})]})})]}),"\n",(0,s.jsxs)(e.p,{children:["[JVM]",(0,s.jsx)(e.br,{}),"\n","open fun ",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Short>): ",(0,s.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(e.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfffc."}),"\n",(0,s.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,s.jsx)(e.h4,{id:"return-1",children:"Return"}),"\n",(0,s.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,s.jsx)(e.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsx)(e.p,{children:"JVM"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{}),(0,s.jsx)(e.th,{})]})}),(0,s.jsx)(e.tbody,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ar"}),(0,s.jsx)(e.td,{children:"an array of short"})]})})]}),"\n",(0,s.jsxs)(e.p,{children:["[JVM]",(0,s.jsx)(e.br,{}),"\n","open fun ",(0,s.jsx)(e.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-hex-c-s-s-v-string",children:"toHexCSSVString"}),"(ar: Array<Int>): ",(0,s.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(e.p,{children:"This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -> 0xfffffffc."}),"\n",(0,s.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toHexCSVString."}),"\n",(0,s.jsx)(e.h4,{id:"return-2",children:"Return"}),"\n",(0,s.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,s.jsx)(e.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsx)(e.p,{children:"JVM"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{}),(0,s.jsx)(e.th,{})]})}),(0,s.jsx)(e.tbody,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ar"}),(0,s.jsx)(e.td,{children:"an array of ints"})]})})]})]})}function h(r={}){const{wrapper:e}={...(0,a.R)(),...r.components};return e?(0,s.jsx)(e,{...r,children:(0,s.jsx)(l,{...r})}):l(r)}}}]);