"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5407],{28453:(e,a,t)=>{t.d(a,{R:()=>i,x:()=>o});var r=t(96540);const n={},s=r.createContext(n);function i(e){const a=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),r.createElement(s.Provider,{value:a},e.children)}},68548:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe","title":"encode-matlab-name-safe","description":"//ERDDAP/com.cohort.util/ScriptString2/encodeMatlabNameSafe","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"encode-file-name-safe","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-file-name-safe"},"next":{"title":"extract-all-capture-groups-as-string-array","permalink":"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/extract-all-capture-groups-as-string-array"}}');var n=t(74848),s=t(28453);const i={},o="encodeMatlabNameSafe",c={},d=[{value:"Return",id:"return",level:4},{value:"Parameters",id:"parameters",level:4}];function l(e){const a={a:"a",br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a.p,{children:["//",(0,n.jsx)(a.a,{href:"/bn/docs/dokka/",children:"ERDDAP"}),"/",(0,n.jsx)(a.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,n.jsx)(a.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/",children:"ScriptString2"}),"/",(0,n.jsx)(a.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe",children:"encodeMatlabNameSafe"})]}),"\n",(0,n.jsx)(a.header,{children:(0,n.jsx)(a.h1,{id:"encodematlabnamesafe",children:"encodeMatlabNameSafe"})}),"\n",(0,n.jsxs)(a.p,{children:["[JVM]",(0,n.jsx)(a.br,{}),"\n","open fun ",(0,n.jsx)(a.a,{href:"/bn/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2/encode-matlab-name-safe",children:"encodeMatlabNameSafe"}),"(s: ",(0,n.jsx)(a.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"}),"): ",(0,n.jsx)(a.a,{href:"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",children:"String"})]}),"\n",(0,n.jsx)(a.p,{children:"This is like encodeFileNameSafe, but further restricts the name to"}),"\n",(0,n.jsxs)(a.ul,{children:["\n",(0,n.jsx)(a.li,{children:"first character must be A-Z, a-z."}),"\n",(0,n.jsx)(a.li,{children:"subsequent characters must be A-Z, a-z, _, 0-9."}),"\n"]}),"\n",(0,n.jsxs)(a.p,{children:["'x' and non-safe characters are CONVERTED to 'x' plus their 2 lowercase hexadecimalDigit number or \"xx\" + their 4 hexadecimalDigit number.  See posix fully portable file names at ",(0,n.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/Filename",children:"https://en.wikipedia.org/wiki/Filename"}),' .  When the encoding is more than 25 characters, this stops encoding and adds "xh" and the hash code for the entire original string, so the result will always be less than ~41 characters.  This meets MatLab restrictions: ',(0,n.jsx)(a.a,{href:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html",children:"https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html"})]}),"\n",(0,n.jsx)(a.p,{children:"THIS WON'T BE CHANGED. FILE NAMES CREATED FOR EDDGridFromFile and EDDTableFromFile DEPEND ON SAME ENCODING OVER TIME."}),"\n",(0,n.jsx)(a.h4,{id:"return",children:"Return"}),"\n",(0,n.jsx)(a.p,{children:'s with all of the non-variableNameSafe characters changed. If s is null, this returns "x_1". If s is "", this returns "x_0".'}),"\n",(0,n.jsx)(a.h4,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(a.p,{children:"JVM"}),"\n",(0,n.jsxs)(a.table,{children:[(0,n.jsx)(a.thead,{children:(0,n.jsx)(a.tr,{children:(0,n.jsx)(a.th,{})})}),(0,n.jsx)(a.tbody,{children:(0,n.jsx)(a.tr,{children:(0,n.jsx)(a.td,{children:"s"})})})]})]})}function h(e={}){const{wrapper:a}={...(0,s.R)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}}}]);