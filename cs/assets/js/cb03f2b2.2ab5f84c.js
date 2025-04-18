"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8519],{28453:(e,t,o)=>{o.d(t,{R:()=>n,x:()=>c});var s=o(96540);const r={},i=s.createContext(r);function n(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:n(e.components),s.createElement(i.Provider,{value:t},e.children)}},81965:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>n,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","title":"epoch-seconds-to-limited-iso-string-t","description":"//ERDDAP/com.cohort.util/ScriptCalendar2/epochSecondsToLimitedIsoStringT","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"clear-smaller-fields","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/clear-smaller-fields"},"next":{"title":"epoch-seconds-to-units-since","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-units-since"}}');var r=o(74848),i=o(28453);const n={},c="epochSecondsToLimitedIsoStringT",d={},a=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["//",(0,r.jsx)(t.a,{href:"/cs/docs/dokka/",children:"ERDDAP"}),"/",(0,r.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,r.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/",children:"ScriptCalendar2"}),"/",(0,r.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t",children:"epochSecondsToLimitedIsoStringT"})]}),"\n",(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"epochsecondstolimitedisostringt",children:"epochSecondsToLimitedIsoStringT"})}),"\n",(0,r.jsxs)(t.p,{children:["[JVM]",(0,r.jsx)(t.br,{}),"\n","open fun ",(0,r.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/epoch-seconds-to-limited-iso-string-t",children:"epochSecondsToLimitedIsoStringT"}),"(time_precision: ",(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),", seconds: Double, NaNString: ",(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,r.jsx)(t.p,{children:"This is like safeEpochSecondsToIsoStringT3Z, but returns a limited precision string. This won't throw an exception."}),"\n",(0,r.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,r.jsx)(t.p,{children:"the formatted time string (or NaNString if trouble)"}),"\n",(0,r.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsx)(t.p,{children:"JVM"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{}),(0,r.jsx)(t.th,{})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"time_precision"}),(0,r.jsx)(t.td,{children:'can be "1970", "1970-01", "1970-01-01", "1970-01-01T00Z", "1970-01-01T00:00Z", "1970-01-01T00:00:00Z" (used if time_precision not matched), "1970-01-01T00:00:00.0Z", "1970-01-01T00:00:00.00Z", "1970-01-01T00:00:00.000Z". Or any of those without "Z". If time_precision ends in Z, the result will too. If time_precision doesn\'t end in Z, the result won\'t end in Z. Note that ERDDAP requires/forces/ensures any format with hours(min(sec)) to have Z.'})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"seconds"}),(0,r.jsx)(t.td,{children:"the epochSeconds value"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"NaNString"}),(0,r.jsx)(t.td,{children:"the value to return if seconds is not finite or is too big."})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);