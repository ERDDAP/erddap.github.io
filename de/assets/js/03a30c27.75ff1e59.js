"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8858],{28453:(e,t,r)=>{r.d(t,{R:()=>a,x:()=>c});var i=r(96540);const n={},s=i.createContext(n);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),i.createElement(s.Provider,{value:t},e.children)}},65773:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable","title":"is-printable","description":"//ERDDAP/com.cohort.util/ScriptString2/isPrintable","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"is-number","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-number"},"next":{"title":"is-remote","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-remote"}}');var n=r(74848),s=r(28453);const a={},c="isPrintable",d={},o=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["//",(0,n.jsx)(t.a,{href:"/de/docs/dokka/",children:"ERDDAP"}),"/",(0,n.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,n.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,n.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable",children:"isPrintable"})]}),"\n",(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"isprintable",children:"isPrintable"})}),"\n",(0,n.jsxs)(t.p,{children:["[JVM]",(0,n.jsx)(t.br,{}),"\n","fun ",(0,n.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable",children:"isPrintable"}),"(ch: Int): Boolean"]}),"\n",(0,n.jsx)(t.p,{children:"This indicates if ch is printable with System.err.println() and Graphics.drawString(); hence, it is a subset of 0..255."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"This is used, for example, to limit characters entering CoText."}),"\n",(0,n.jsx)(t.li,{children:"Currently, this accepts the ch if (ch>=32 && ch<127) || (ch>=161 && ch<=255)."}),"\n",(0,n.jsx)(t.li,{children:"tab(#9) is not included. It should be caught separately and dealt with (expand to spaces?). The problem is that tabs are printed with a wide box (non-character symbol) in Windows Courier font. Thus, they mess up the positioning of characters in CoText."}),"\n",(0,n.jsx)(t.li,{children:"newline is not included. It should be caught separately and dealt with."}),"\n",(0,n.jsx)(t.li,{children:"This requires further study into all standard fonts on all platforms to see if other characters can be accepted."}),"\n"]}),"\n",(0,n.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,n.jsx)(t.p,{children:"true if ch is a printable character"}),"\n",(0,n.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:"JVM"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"ch"}),(0,n.jsx)(t.td,{children:"a char"})]})})]}),"\n",(0,n.jsxs)(t.p,{children:["[JVM]",(0,n.jsx)(t.br,{}),"\n","fun ",(0,n.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/is-printable",children:"isPrintable"}),"(s: ",(0,n.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),"): Boolean"]}),"\n",(0,n.jsx)(t.p,{children:"Returns true if all of the characters in s are printable"})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}}}]);