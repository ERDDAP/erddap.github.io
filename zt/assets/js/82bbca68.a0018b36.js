"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4968],{28453:(e,t,r)=>{r.d(t,{R:()=>n,x:()=>d});var s=r(96540);const a={},o=s.createContext(a);function n(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:n(e.components),s.createElement(o.Provider,{value:t},e.children)}},52611:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>l,frontMatter:()=>n,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds","title":"parse-to-epoch-seconds","description":"//ERDDAP/com.cohort.util/ScriptCalendar2/parseToEpochSeconds","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds","permalink":"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"get-time-base-and-factor","permalink":"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor"},"next":{"title":"try-to-epoch-seconds","permalink":"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/try-to-epoch-seconds"}}');var a=r(74848),o=r(28453);const n={},d="parseToEpochSeconds",c={},i=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Return",id:"return-1",level:4},{value:"Parameters",id:"parameters-1",level:4}];function h(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["//",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/",children:"ERDDAP"}),"/",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/",children:"ScriptCalendar2"}),"/",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds",children:"parseToEpochSeconds"})]}),"\n",(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"parsetoepochseconds",children:"parseToEpochSeconds"})}),"\n",(0,a.jsxs)(t.p,{children:["[JVM]",(0,a.jsx)(t.br,{}),"\n","open fun ",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds",children:"parseToEpochSeconds"}),"(sourceTime: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),", dateTimeFormat: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),", timeZoneString: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): Double"]}),"\n",(0,a.jsx)(t.p,{children:"This converts a sourceTime string into a double with epochSeconds."}),"\n",(0,a.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,a.jsx)(t.p,{children:"the epochSeconds value or NaN if trouble"}),"\n",(0,a.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(t.p,{children:"JVM"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{}),(0,a.jsx)(t.th,{})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"sourceTime"}),(0,a.jsx)(t.td,{children:"a formatted time string"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"dateTimeFormat"}),(0,a.jsxs)(t.td,{children:["See ",(0,a.jsx)(t.a,{href:"https://erddap.github.io/setupDatasetsXml.html#string-time-units",children:"https://erddap.github.io/setupDatasetsXml.html#string-time-units"})]})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"timeZoneString"}),(0,a.jsxs)(t.td,{children:['For a list of valid timezone ID\'s, see the "TZ database names" column in the table at ',(0,a.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"}),' . If this is null or "", Zulu will be used.']})]})]})]}),"\n",(0,a.jsxs)(t.p,{children:["[JVM]",(0,a.jsx)(t.br,{}),"\n","open fun ",(0,a.jsx)(t.a,{href:"/zt/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds",children:"parseToEpochSeconds"}),"(sourceTime: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),", dateTimeFormat: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): Double"]}),"\n",(0,a.jsx)(t.p,{children:"A variant of parseToEpochSeconds that uses the Zulu time zone."}),"\n",(0,a.jsx)(t.h4,{id:"return-1",children:"Return"}),"\n",(0,a.jsx)(t.p,{children:"the epochSeconds value or NaN if trouble"}),"\n",(0,a.jsx)(t.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,a.jsx)(t.p,{children:"JVM"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{}),(0,a.jsx)(t.th,{})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"sourceTime"}),(0,a.jsx)(t.td,{children:"a formatted time string"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"dateTimeFormat"}),(0,a.jsxs)(t.td,{children:["See ",(0,a.jsx)(t.a,{href:"https://erddap.github.io/setupDatasetsXml.html#string-time-units",children:"https://erddap.github.io/setupDatasetsXml.html#string-time-units"})]})]})]})]})]})}function l(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}}}]);