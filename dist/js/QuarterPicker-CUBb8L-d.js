import{a as L,_ as M,w as E,h as z}from"./index-B38KeQ4T.js";import{d as f,br as A,l as T,n as $,aP as U,V as j,x as F,v as u,f as J,E as K,bs as W,o as g,J as w,K as h,k as c,_ as X,q as k,O as v,a9 as V,p as q,Y as Z,a7 as G,Z as H,r as ee,af as P,ba as te,b9 as ae,bt as ne,a4 as re,X as oe}from"./.pnpm-DTVa1Nkx.js";function se(_){const n=["零","一","二","三","四","五","六","七","八","九"],m=["十","百","千","万","亿"];let e=_.toString(),i="",d=!1;for(let o=0;o<e.length;o++){let s=parseInt(e[o]);s===0?d||(i+=n[s],d=!0):(i+=n[s]+(o>0?m[Math.floor((e.length-o-1)/4)]:""),d=!1)}return i}f.extend(A);const le={list:[{id:1,label:"第一季度"},{id:2,label:"第二季度"},{id:3,label:"第三季度"},{id:4,label:"第四季度"}],start:["-01-01","-04-01","-07-01","-10-01"],end:["-03-31","-06-30","-09-30","-12-31"]},ue=()=>T.cloneDeep(le),ce=()=>{const _=f().year(),n=se(f().quarter());return`${_}年第${n}季度`},ie={class:"quarter-picker-content__header"},de={class:"quarter-picker-content__body"},pe=["onClick"],fe=$({name:"QuarterPicker",__name:"QuarterPicker",props:{modelValue:{type:String,default:""},modelModifiers:{}},emits:U(["change"],["update:modelValue"]),setup(_,{emit:n}){const m=n,e=j(_,"modelValue"),i=L(),{config:d}=F(i),o=u(),s=u(!1),a=u(f().year()),x=u([]),p=u(),y=J(()=>t=>{const r=e.value?e.value.split("年"):ce().split("年");return Number(r[0])===a.value&&r[1]===t.label}),C=u([]),D=u([]),I=()=>{a.value=f().year(a.value+1).year()},N=()=>{a.value=f().year(a.value-1).year()},O=t=>{p.value=t,e.value=a.value+"年"+p.value.label,P(()=>{s.value=!1})},R=async t=>{t&&(e.value=t,await P(),m("change",{value:t,startDate:a.value+(p.value?C.value[p.value.id-1]:""),endDate:a.value+(p.value?D.value[p.value.id-1]:"")}))};return K(e,()=>{const{list:t,start:r,end:b}=ue();x.value=t,p.value=t[0],C.value=r,D.value=b,e.value?a.value=+e.value.split("年")[0]:a.value=f().year()},{immediate:!0}),W(o,()=>{s.value=!1}),(t,r)=>{const b=te,S=ae,Q=ne,Y=re,B=X;return g(),w(B,{open:c(s),overlayClassName:"quarter-picker-popover",placement:"bottomLeft",arrow:!1,trigger:"click"},{content:h(()=>[k("div",{ref_key:"datePoperContentRef",ref:o,class:"quarter-picker-content"},[k("div",ie,[v(b,{class:"text-#8c8c8c hover:text-#1f1f1f dark:hover:text-#dedede dark:text-#848484 transition-all duration-300",onClick:N}),k("span",null,V(c(a))+" 年",1),v(S,{class:"text-#8c8c8c hover:text-#1f1f1f dark:hover:text-#dedede dark:text-#848484 transition-all duration-300",onClick:I})]),k("div",de,[(g(!0),q(H,null,Z(c(x),l=>(g(),q("span",{key:l.id,class:"hover:bg-#f2f3f5 dark:hover:bg-#313131 transition-all duration-300",style:G({backgroundColor:c(y)(l)?c(d).themeColor:"",color:c(y)(l)?"#fff":""}),onClick:me=>O(l)},V(l.label),13,pe))),128))])],512)]),default:h(()=>[v(Y,ee(t.$attrs,{value:e.value,"onUpdate:value":r[0]||(r[0]=l=>e.value=l),"prefix-icon":"Calendar",onInput:R,onClick:r[1]||(r[1]=l=>s.value=!0)}),{suffix:h(()=>[v(Q,{class:"dark:text-#4f4f4f text-#bfbfbf"})]),_:1},16,["value"])]),_:1},8,["open"])}}}),_e=M(fe,[["__scopeId","data-v-6c1e0a10"]]),ve=E(_e),he=$({__name:"QuarterPicker",setup(_){const n=u();return(m,e)=>{const i=z;return g(),w(i,{title:"季度选择器",dense:""},{default:h(()=>[v(c(ve),{style:{width:"350px"},modelValue:c(n),"onUpdate:modelValue":e[0]||(e[0]=d=>oe(n)?n.value=d:null),type:"quarter",placeholder:"请选择时间"},null,8,["modelValue"])]),_:1})}}});export{he as default};
