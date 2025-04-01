"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5256],{28453:(e,t,r)=>{r.d(t,{R:()=>s,x:()=>n});var a=r(96540);const i={},o=a.createContext(i);function s(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function n(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(o.Provider,{value:t},e.children)}},78340:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>n,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe","title":"modify-to-be-file-name-safe","description":"//ERDDAP/com.cohort.util/ScriptString2/modifyToBeFileNameSafe","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"modify-to-be-a-s-c-i-i","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-a-s-c-i-i"},"next":{"title":"modify-to-be-variable-name-safe","permalink":"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-variable-name-safe"}}');var i=r(74848),o=r(28453);const s={},n="modifyToBeFileNameSafe",d={},c=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const t={a:"a",br:"br",em:"em",h1:"h1",h4:"h4",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["//",(0,i.jsx)(t.a,{href:"/es/docs/dokka/",children:"ERDDAP"}),"/",(0,i.jsx)(t.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,i.jsx)(t.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,i.jsx)(t.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe",children:"modifyToBeFileNameSafe"})]}),"\n",(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"modifytobefilenamesafe",children:"modifyToBeFileNameSafe"})}),"\n",(0,i.jsxs)(t.p,{children:["[JVM]",(0,i.jsx)(t.br,{}),"\n","open fun ",(0,i.jsx)(t.a,{href:"/es/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/modify-to-be-file-name-safe",children:"modifyToBeFileNameSafe"}),"(s: ",(0,i.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,i.jsx)(t.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,i.jsxs)(t.p,{children:["This returns the string with just file-name-safe characters (0-9, A-Z, a-z, ",(0,i.jsx)(t.em,{children:", -, .). This is different from String2.encodeFileNameSafe -- this emphasizes readability, not avoiding losing information. Non-safe characters are converted to '"}),"'. Adjacent '",(0,i.jsx)(t.em,{children:"' are collapsed into '"}),"'. See posix fully portable file names at ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Filename",children:"https://en.wikipedia.org/wiki/Filename"})," . See javadocs for java.net.URLEncoder, which describes valid characters (but deals with encoding, whereas this method alters or removes). The result may be shorter than s. Note, this does not check for filenames that are too long (Windows has a path+fileName max length of 255 chars)."]}),"\n",(0,i.jsx)(t.h4,{id:"return",children:"Return"}),"\n",(0,i.jsx)(t.p,{children:"s with all of the non-fileNameSafe characters removed or changed"}),"\n",(0,i.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(t.p,{children:"JVM"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"s"}),(0,i.jsxs)(t.td,{children:['If s is null, this returns "',(0,i.jsx)(t.em,{children:'null". If s is "", this returns "'}),'".']})]})})]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}}}]);