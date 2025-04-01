"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9973],{28453:(e,t,r)=>{r.d(t,{R:()=>n,x:()=>a});var o=r(96540);const s={},c=o.createContext(s);function n(e){const t=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),o.createElement(c.Provider,{value:t},e.children)}},69293:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>l,frontMatter:()=>n,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","title":"guess-frac","description":"//ERDDAP/com.cohort.util/ScriptMath2/guessFrac","source":"@site/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac.md","sourceDirName":"dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2","slug":"/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docSidebar","previous":{"title":"guess-frac-string","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac-string"},"next":{"title":"hi-div","permalink":"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/hi-div"}}');var s=r(74848),c=r(28453);const n={},a="guessFrac",i={},d=[];function h(e){const t={a:"a",br:"br",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["//",(0,s.jsx)(t.a,{href:"/th/docs/dokka/",children:"ERDDAP"}),"/",(0,s.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/",children:"com.cohort.util"}),"/",(0,s.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/",children:"ScriptMath2"}),"/",(0,s.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac",children:"guessFrac"})]}),"\n",(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"guessfrac",children:"guessFrac"})}),"\n",(0,s.jsxs)(t.p,{children:["[JVM]",(0,s.jsx)(t.br,{}),"\n","open fun ",(0,s.jsx)(t.a,{href:"/th/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2/guess-frac",children:"guessFrac"}),"(r: Double, int3: Array<Int>)"]}),"\n",(0,s.jsx)(t.p,{children:"Looks for a fraction very close to some decimal value."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Tries denominators 1..1000. So answer is at least accurate to within 1/1000th. For example, .33333 -> 1/3."}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"For example: -1.75 -> whole=-1, numerator=-3 denominator=4"}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Results stored in int3[0=whole, 1=num, 2=den]."}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Slow if no good match found, but this does a good approximate job that gcd() might miss. ```kotlin\r\nint ar[]=new int[3];\r\ndouble d=-1.75;\r\nint whole=guessFrac(d,ar);\r\n//results: ar[0]=-1, ar[1]=-3, ar[2]=4"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{})}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:t}={...(0,c.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}}}]);