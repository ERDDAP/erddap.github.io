"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9242],{17662:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal","title":"almost-equal","description":"//ERDDAP/com.cohort.util/ScriptMath2/almostEqual","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"-u-s-h-o-r-t_-m-a-x_-v-a-l-u-e","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/-u-s-h-o-r-t_-m-a-x_-v-a-l-u-e"},"next":{"title":"almost0","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost0"}}');var a=r(74848),n=r(28453);const i={},o="almostEqual",d={},l=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Return",id:"return-1",level:4},{value:"Parameters",id:"parameters-1",level:4}];function c(t){const e={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(e.p,{children:["//",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/",children:"ERDDAP"}),"/",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/",children:"ScriptMath2"}),"/",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal",children:"almostEqual"})]}),"\n",(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"almostequal",children:"almostEqual"})}),"\n",(0,a.jsxs)(e.p,{children:["[JVM]",(0,a.jsx)(e.br,{}),"\n","open fun ",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal",children:"almostEqual"}),"(nSignificantDigits: Int, d1: Double, d2: Double): Boolean"]}),"\n",(0,a.jsx)(e.p,{children:"This tests if the numbers are equal to at least n significant digits."}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"Numbers must match to 1 part in 10^n to ensure that rounding to n-1 digits is identical."}),"\n",(0,a.jsx)(e.li,{children:"If d1 and d2 are almost0, this returns true."}),"\n",(0,a.jsx)(e.li,{children:"This is slow compared to almost0."}),"\n"]}),"\n",(0,a.jsx)(e.h4,{id:"return",children:"Return"}),"\n",(0,a.jsx)(e.p,{children:"true if the numbers are equal to at least n significant digits (or are both almost0). If either number is NaN or Infinity, this returns false."}),"\n",(0,a.jsx)(e.h4,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(e.p,{children:"JVM"}),"\n",(0,a.jsxs)(e.table,{children:[(0,a.jsx)(e.thead,{children:(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.th,{}),(0,a.jsx)(e.th,{})]})}),(0,a.jsxs)(e.tbody,{children:[(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"nSignificantDigits"}),(0,a.jsx)(e.td,{children:"0 to 18 are allowed; 5, 9, and 14 are common"})]}),(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"d1"}),(0,a.jsx)(e.td,{children:"any double"})]}),(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"d2"}),(0,a.jsx)(e.td,{children:"any double"})]})]})]}),"\n",(0,a.jsxs)(e.p,{children:["[JVM]",(0,a.jsx)(e.br,{}),"\n","open fun ",(0,a.jsx)(e.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/almost-equal",children:"almostEqual"}),"(nSignificantDigits: Int, f1: Float, f2: Float): Boolean"]}),"\n",(0,a.jsx)(e.p,{children:"This tests if two floats are equal to at least n significant digits."}),"\n",(0,a.jsx)(e.h4,{id:"return-1",children:"Return"}),"\n",(0,a.jsx)(e.p,{children:"true if the numbers are equal to at least n significant digits (or are both almost0). If either number is NaN or Infinity, this returns false."}),"\n",(0,a.jsx)(e.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,a.jsx)(e.p,{children:"JVM"}),"\n",(0,a.jsxs)(e.table,{children:[(0,a.jsx)(e.thead,{children:(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.th,{}),(0,a.jsx)(e.th,{})]})}),(0,a.jsxs)(e.tbody,{children:[(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"nSignificantDigits"}),(0,a.jsx)(e.td,{children:"0 to 18 are allowed; 5, 9, and 14 are common"})]}),(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"f1"}),(0,a.jsx)(e.td,{children:"any float"})]}),(0,a.jsxs)(e.tr,{children:[(0,a.jsx)(e.td,{children:"f2"}),(0,a.jsx)(e.td,{children:"any float"})]})]})]})]})}function h(t={}){const{wrapper:e}={...(0,n.R)(),...t.components};return e?(0,a.jsx)(e,{...t,children:(0,a.jsx)(c,{...t})}):c(t)}},28453:(t,e,r)=>{r.d(e,{R:()=>i,x:()=>o});var s=r(96540);const a={},n=s.createContext(a);function i(t){const e=s.useContext(n);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:i(t.components),s.createElement(n.Provider,{value:e},t.children)}}}]);