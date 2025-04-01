"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[625],{28453:(t,e,s)=>{s.d(e,{R:()=>o,x:()=>a});var i=s(96540);const r={},n=i.createContext(r);function o(t){const e=i.useContext(n);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:o(t.components),i.createElement(n.Provider,{value:e},t.children)}},75338:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions","title":"suggest-max-divisions","description":"//ERDDAP/com.cohort.util/ScriptMath2/suggestMaxDivisions","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions","permalink":"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"suggest-low-high","permalink":"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-low-high"},"next":{"title":"ten","permalink":"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/ten"}}');var r=s(74848),n=s(28453);const o={},a="suggestMaxDivisions",d={},c=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function h(t){const e={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...t.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["//",(0,r.jsx)(e.a,{href:"/fi/docs/dokka/",children:"ERDDAP"}),"/",(0,r.jsx)(e.a,{href:"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,r.jsx)(e.a,{href:"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/",children:"ScriptMath2"}),"/",(0,r.jsx)(e.a,{href:"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions",children:"suggestMaxDivisions"})]}),"\n",(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"suggestmaxdivisions",children:"suggestMaxDivisions"})}),"\n",(0,r.jsxs)(e.p,{children:["[JVM]",(0,r.jsx)(e.br,{}),"\n","open fun ",(0,r.jsx)(e.a,{href:"/fi/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/suggest-max-divisions",children:"suggestMaxDivisions"}),"(range: Double, maxDivisions: Int): Double"]}),"\n",(0,r.jsx)(e.p,{children:"This suggests the division distance along an axis so that there will be between maxDivisions/2 and maxDivisions."}),"\n",(0,r.jsx)(e.h4,{id:"return",children:"Return"}),"\n",(0,r.jsx)(e.p,{children:"a double with the suggested division distance. If range isn't finite, this returns NaN. If range == 0, this returns 1. If range <0, this the result will be negative. If maxDivisions == 0, this returns range. If maxDivisions <0, this uses Math.abs(maxDivisions)."}),"\n",(0,r.jsx)(e.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsx)(e.p,{children:"JVM"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{}),(0,r.jsx)(e.th,{})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"range"}),(0,r.jsx)(e.td,{children:"the range of the axis, e.g., an axis spanning 30 - 50 would have a range of 20"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"maxDivisions"}),(0,r.jsx)(e.td,{children:"the maximum number of divisions (segments). If you have maxNValues, use maxNValues-1 to call this method."})]})]})]})]})}function l(t={}){const{wrapper:e}={...(0,n.R)(),...t.components};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(h,{...t})}):h(t)}}}]);