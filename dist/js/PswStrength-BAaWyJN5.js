import{w as v,h as w}from"./index-B38KeQ4T.js";import{n as i,aP as V,V as b,f as S,o as u,p as $,J as h,bn as k,Y as M,r as P,a8 as x,q as c,k as r,be as y,K as _,a6 as B,bo as I,bp as C,bq as m,v as N,O as p,X as q}from"./.pnpm-DTVa1Nkx.js";const z={class:"strength-mether"},O=["value"],R=i({name:"StrengthMether",__name:"StrengthMether",props:V({score:{type:String,default:""},showInput:{type:Boolean,default:!0}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const e=t,a=b(t,"modelValue"),o=S(()=>e.showInput?m(a.value).guesses_log10:m(e.score).guesses_log10);return(s,n)=>{const f=y;return u(),$("div",z,[t.showInput?(u(),h(f,P({key:0,value:a.value,"onUpdate:value":n[0]||(n[0]=l=>a.value=l)},s.$attrs,{"show-password":""}),k({_:2},[M(Object.keys(s.$slots),l=>({name:l,fn:_(g=>[B(s.$slots,l,I(C(g||{})))])}))]),1040,["value"])):x("",!0),c("meter",{class:"w-full",min:"0",max:"12",low:"4",high:"8",optimum:"10",value:r(o)},null,8,O)])}}}),d=v(R),U=c("h4",{class:"mb-2"},"基础用法：",-1),j=c("h4",{class:"mb-2"},"隐藏输入框：",-1),K=i({__name:"PswStrength",setup(t){const e=N("utility");return(a,o)=>{const s=w;return u(),h(s,{title:"密码强度校验组件",dense:""},{default:_(()=>[U,p(r(d),{modelValue:r(e),"onUpdate:modelValue":o[0]||(o[0]=n=>q(e)?e.value=n:null),placeholder:"请输入密码",class:"w-300px"},null,8,["modelValue"]),j,p(r(d),{placeholder:"请输入密码",showInput:!1,score:"vue3!@#hh",class:"w-300px"})]),_:1})}}});export{K as default};
