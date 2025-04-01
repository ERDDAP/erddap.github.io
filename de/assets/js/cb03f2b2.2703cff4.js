"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8519],{28453:(e,t,o)=>{o.d(t,{R:()=>n,x:()=>d});var r=o(96540);const s={},i=r.createContext(s);function n(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),r.createElement(i.Provider,{value:t},e.children)}},81965:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>n,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","title":"epoch-seconds-to-limited-iso-string-t","description":"//ERDDAP/com.cohort.util/ScriptCalendar2/epochSecondsToLimitedIsoStringT","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"clear-smaller-fields","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/clear-smaller-fields"},"next":{"title":"epoch-seconds-to-units-since","permalink":"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-units-since"}}');var s=o(74848),i=o(28453);const n={},d="epochSecondsToLimitedIsoStringT",c={},a=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["//",(0,s.jsx)(t.a,{href:"/de/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/",children:"ScriptCalendar2"}),"/",(0,s.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t",children:"epochSecondsToLimitedIsoStringT"})]}),"\n",(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"epochsecondstolimitedisostringt",children:"epochSecondsToLimitedIsoStringT"})}),"\n",(0,s.jsxs)(t.p,{children:["[JVM]",(0,s.jsx)(t.br,{}),"\n","open fun ",(0,s.jsx)(t.a,{href:"/de/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t",children:"epochSecondsToLimitedIsoStringT"}),"(time_precision: ",(0,s.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),", seconds: Double, NaNString: ",(0,s.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,s.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,s.jsx)(t.p,{children:"This is like safeEpochSecondsToIsoStringT3Z, but returns a limited precision string. This won't throw an exception."}),"\n",(0,s.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,s.jsx)(t.p,{children:"the formatted time string (or NaNString if trouble)"}),"\n",(0,s.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(t.p,{children:"JVM"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"time_precision"}),(0,s.jsx)(t.td,{children:'can be "1970", "1970-01", "1970-01-01", "1970-01-01T00Z", "1970-01-01T00:00Z", "1970-01-01T00:00:00Z" (used if time_precision not matched), "1970-01-01T00:00:00.0Z", "1970-01-01T00:00:00.00Z", "1970-01-01T00:00:00.000Z". Or any of those without "Z". If time_precision ends in Z, the result will too. If time_precision doesn\'t end in Z, the result won\'t end in Z. Note that ERDDAP requires/forces/ensures any format with hours(min(sec)) to have Z.'})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"seconds"}),(0,s.jsx)(t.td,{children:"the epochSeconds value"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"NaNString"}),(0,s.jsx)(t.td,{children:"the value to return if seconds is not finite or is too big."})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}}}]);