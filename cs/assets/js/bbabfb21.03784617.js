"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6505],{28453:(e,t,r)=>{r.d(t,{R:()=>n,x:()=>o});var s=r(96540);const a={},c=s.createContext(a);function n(e){const t=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:n(e.components),s.createElement(c.Provider,{value:t},e.children)}},65463:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>h,frontMatter:()=>n,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes","title":"extract-all-regexes","description":"//ERDDAP/com.cohort.util/ScriptString2/extractAllRegexes","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"extract-all-capture-groups-as-string-array","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-capture-groups-as-string-array"},"next":{"title":"extract-capture-group","permalink":"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-capture-group"}}');var a=r(74848),c=r(28453);const n={},o="extractAllRegexes",i={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Throws",id:"throws",level:4}];function l(e){const t={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,c.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["//",(0,a.jsx)(t.a,{href:"/cs/docs/dokka/",children:"ERDDAP"}),"/",(0,a.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,a.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,a.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes",children:"extractAllRegexes"})]}),"\n",(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"extractallregexes",children:"extractAllRegexes"})}),"\n",(0,a.jsxs)(t.p,{children:["[JVM]",(0,a.jsx)(t.br,{}),"\n","open fun ",(0,a.jsx)(t.a,{href:"/cs/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-regexes",children:"extractAllRegexes"}),"(s: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),", regex: ",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),"): Array<",(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html",children:"String"}),">"]}),"\n",(0,a.jsx)(t.p,{children:"This returns all the sections of s that match regex. It assumes that the extracted parts don't overlap. !!! Note that . in the regex doesn't match line terminators in s !!!"}),"\n",(0,a.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,a.jsx)(t.p,{children:"a String[] with all the matching sections of s (or String[0] if none)"}),"\n",(0,a.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(t.p,{children:"JVM"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{}),(0,a.jsx)(t.th,{})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"s"}),(0,a.jsx)(t.td,{children:"the source String"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"regex"}),(0,a.jsx)(t.td,{children:'the regular expression, see java.util.regex.Pattern. Note that you often want to use the "reluctant" qualifiers which match as few chars as possible (e.g., ??, *?, +?) not the "greedy" qualifiers which match as many chars as possible (e.g., ?, *, +).'})]})]})]}),"\n",(0,a.jsx)(t.h4,{id:"throws",children:"Throws"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{}),(0,a.jsx)(t.th,{})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/RuntimeException.html",children:"RuntimeException"})}),(0,a.jsx)(t.td,{children:"if trouble"})]})})]})]})}function h(e={}){const{wrapper:t}={...(0,c.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}}}]);