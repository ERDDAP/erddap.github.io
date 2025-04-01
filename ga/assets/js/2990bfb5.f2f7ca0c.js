"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6564],{26409:(r,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>d,default:()=>o,frontMatter:()=>i,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string","title":"to-c-s-s-v-string","description":"//ERDDAP/com.cohort.util/ScriptString2/toCSSVString","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"to-byte-array","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-byte-array"},"next":{"title":"to-c-s-v-string","permalink":"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-v-string"}}');var n=t(74848),s=t(28453);const i={},d="toCSSVString",l={},c=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Return",id:"return-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Return",id:"return-2",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Return",id:"return-3",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"Return",id:"return-4",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Return",id:"return-5",level:4},{value:"Parameters",id:"parameters-5",level:4},{value:"Return",id:"return-6",level:4},{value:"Parameters",id:"parameters-6",level:4},{value:"Return",id:"return-7",level:4},{value:"Parameters",id:"parameters-7",level:4},{value:"Return",id:"return-8",level:4},{value:"Parameters",id:"parameters-8",level:4}];function h(r){const e={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...r.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:["//",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/",children:"ERDDAP"}),"/",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"})]}),"\n",(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"tocssvstring",children:"toCSSVString"})}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Any>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"Generates a Comma-Space-Separated-Value (CSSV) string."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-03-06, this didn't do anything special for strings with internal commas or quotes. Now it uses toJson for that string."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:'a CSSV String with the values with ", " after all but the last value. Returns null if ar is null. null elements are represented as "[null]".'}),"\n",(0,n.jsx)(e.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of objects"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Boolean>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-1",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of boolean"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Byte>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-2",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of bytes"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Char>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array. (chars are treated as unsigned shorts)."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-3",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of char"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Short>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-4",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of shorts"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Int>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-5",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of ints"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Long>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-6",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of longs"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Float>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-7",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of float"})]})})]}),"\n",(0,n.jsxs)(e.p,{children:["[JVM]",(0,n.jsx)(e.br,{}),"\n","open fun ",(0,n.jsx)(e.a,{href:"/ga/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/to-c-s-s-v-string",children:"toCSSVString"}),"(ar: Array<Double>): ",(0,n.jsx)(e.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(e.p,{children:"This generates a Comma-Space-Separated-Value (CSSV) String from the array."}),"\n",(0,n.jsx)(e.p,{children:"CHANGED: before 2011-09-04, this was called toCSVString."}),"\n",(0,n.jsx)(e.h4,{id:"return-8",children:"Return"}),"\n",(0,n.jsx)(e.p,{children:"a CSSV String (or null if ar is null)"}),"\n",(0,n.jsx)(e.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,n.jsx)(e.p,{children:"JVM"}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsx)(e.tbody,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"ar"}),(0,n.jsx)(e.td,{children:"an array of double"})]})})]})]})}function o(r={}){const{wrapper:e}={...(0,s.R)(),...r.components};return e?(0,n.jsx)(e,{...r,children:(0,n.jsx)(h,{...r})}):h(r)}},28453:(r,e,t)=>{t.d(e,{R:()=>i,x:()=>d});var a=t(96540);const n={},s=a.createContext(n);function i(r){const e=a.useContext(s);return a.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function d(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(n):r.components||n:i(r.components),a.createElement(s.Provider,{value:e},r.children)}}}]);