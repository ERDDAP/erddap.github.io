"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5846],{28453:(e,t,r)=>{r.d(t,{R:()=>s,x:()=>o});var a=r(96540);const n={},i=a.createContext(n);function s(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(i.Provider,{value:t},e.children)}},86396:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe","title":"encode-file-name-safe","description":"//ERDDAP/com.cohort.util/ScriptString2/encodeFileNameSafe","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"different-line","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/different-line"},"next":{"title":"encode-matlab-name-safe","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe"}}');var n=r(74848),i=r(28453);const s={},o="encodeFileNameSafe",c={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["//",(0,n.jsx)(t.a,{href:"/th/docs/dokka/",children:"ERDDAP"}),"/",(0,n.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,n.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,n.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe",children:"encodeFileNameSafe"})]}),"\n",(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"encodefilenamesafe",children:"encodeFileNameSafe"})}),"\n",(0,n.jsxs)(t.p,{children:["[JVM]",(0,n.jsx)(t.br,{}),"\n","open fun ",(0,n.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe",children:"encodeFileNameSafe"}),"(s: ",(0,n.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,n.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsxs)(t.p,{children:["This is different from String2.modifyToBeFileNameSafe -- this encodes non-fileNameSafe characters so little or no information is lost.  This returns the string with just file-name-safe characters (0-9, A-Z, a-z, _, -, .).  'x' and non-safe characters are CONVERTED to 'x' plus their 2 lowercase hexadecimalDigit number or \"xx\" + their 4 hexadecimalDigit number.  See posix fully portable file names at ",(0,n.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Filename",children:"https://en.wikipedia.org/wiki/Filename"}),' .  When the encoding is more than 25 characters, this stops encoding and adds "xh" and the hash code for the entire original string, so the result will always be less than ~41 characters.']}),"\n",(0,n.jsx)(t.p,{children:"THIS WON'T BE CHANGED. FILE NAMES CREATED FOR EDDGridCopy and EDDTableCopy DEPEND ON SAME ENCODING OVER TIME."}),"\n",(0,n.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,n.jsx)(t.p,{children:'s with all of the non-fileNameSafe characters changed. If s is null, this returns "x-1". If s is "", this returns "x-0".'}),"\n",(0,n.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:"JVM"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsx)(t.tr,{children:(0,n.jsx)(t.th,{})})}),(0,n.jsx)(t.tbody,{children:(0,n.jsx)(t.tr,{children:(0,n.jsx)(t.td,{children:"s"})})})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}}}]);