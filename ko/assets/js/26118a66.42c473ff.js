"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4204],{3707:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>h,frontMatter:()=>n,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor","title":"get-time-base-and-factor","description":"//ERDDAP/com.cohort.util/ScriptCalendar2/getTimeBaseAndFactor","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"format","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/format"},"next":{"title":"parse-to-epoch-seconds","permalink":"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/parse-to-epoch-seconds"}}');var r=a(74848),o=a(28453);const n={},c="getTimeBaseAndFactor",i={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Throws",id:"throws",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["//",(0,r.jsx)(t.a,{href:"/ko/docs/dokka/",children:"ERDDAP"}),"/",(0,r.jsx)(t.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,r.jsx)(t.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/",children:"ScriptCalendar2"}),"/",(0,r.jsx)(t.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor",children:"getTimeBaseAndFactor"})]}),"\n",(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"gettimebaseandfactor",children:"getTimeBaseAndFactor"})}),"\n",(0,r.jsxs)(t.p,{children:["[JVM]",(0,r.jsx)(t.br,{}),"\n","open fun ",(0,r.jsx)(t.a,{href:"/ko/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2/get-time-base-and-factor",children:"getTimeBaseAndFactor"}),"(tsUnits: ",(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),", timeZone: ",(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/TimeZone.html",children:"TimeZone"}),"): Array<Double>"]}),"\n",(0,r.jsx)(t.p,{children:'This converts a string "[units] since [isoDate]" (e.g., "minutes since 1985-01-01") into a baseSeconds (seconds since 1970-01-01) and a factor ("minutes" returns 60).  So simplistically, epochSeconds = storedTime * factor + baseSeconds.  Or simplistically, storedTime = (epochSeconds - baseSeconds) / factor.'}),"\n",(0,r.jsx)(t.p,{children:"WARNING: don't use the equations above. Use unitsSinceToEpochSeconds or epochSecondsToUnitsSince which correctly handle special cases."}),"\n",(0,r.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,r.jsx)(t.p,{children:"double[]{baseSeconds, factorToGetSeconds}"}),"\n",(0,r.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsx)(t.p,{children:"JVM"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{}),(0,r.jsx)(t.th,{})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"tsUnits"}),(0,r.jsx)(t.td,{children:'e.g., "minutes since 1985-01-01". This may include hours, minutes, seconds, decimal, and Z or timezone offset (default=Zulu). This is lenient.'})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"timeZone"}),(0,r.jsxs)(t.td,{children:['Is a TimeZone from TimeZone.gettimeZone(id). For valid ID\'s, see the "TZ database names" column in the table at ',(0,r.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"})," If this is null, Zulu will be used."]})]})]})]}),"\n",(0,r.jsx)(t.h4,{id:"throws",children:"Throws"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{}),(0,r.jsx)(t.th,{})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/RuntimeException.html",children:"RuntimeException"})}),(0,r.jsx)(t.td,{children:"if trouble (tsUnits is null or invalid)"})]})})]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>n,x:()=>c});var s=a(96540);const r={},o=s.createContext(r);function n(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:n(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);