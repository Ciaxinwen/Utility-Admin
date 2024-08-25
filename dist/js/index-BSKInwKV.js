import{w as k}from"./index-B38KeQ4T.js";import{n as z,f as B,v as f,R as $,o as x,p as w,q as l,O as o,k as t,bQ as O,a6 as T,aY as V,aZ as S,K as s,a8 as M,a7 as L,ay as j,bR as H,aU as R,bS as N,bT as W,bU as A,aP as D,V as I,E as Z,J as E,au as F,X as q,am as J,a9 as K,bm as P,bV as Q}from"./.pnpm-DTVa1Nkx.js";const X={class:"basic-resizer w-full flex"},Y={class:"min-h-380px flex-grow-1"},G={class:"h-90%"},ee={key:0,class:"mt-2 flex justify-between"},oe={class:"flex items-center mx-30px"},te={class:"preview-box overflow-hidden w-250px h-250px border border-solid border-#ccc rounded-1/2 dark:border-#303030"},ne=["src"],U=z({name:"BasicResizer",__name:"BasicResizer",props:{imgUrl:{type:String,default:""},actions:{type:Boolean,default:!0}},setup(m,{expose:g}){const d=m,v=B(()=>d.imgUrl.length),n=f(),a=$({autoCropWidth:250,autoCropHeight:250,outputType:"png",autoCrop:!0,fixedBox:!1}),r=f({url:"",img:null}),b=i=>{r.value=i};return g({cropper:n}),(i,e)=>{const p=H,u=R,c=j,h=N,y=W,_=A;return x(),w("div",X,[l("div",Y,[l("div",G,[o(t(O),{ref_key:"cropper",ref:n,img:m.imgUrl,info:!0,autoCrop:t(a).autoCrop,autoCropWidth:t(a).autoCropWidth,autoCropHeight:t(a).autoCropHeight,fixedBox:t(a).fixedBox,outputType:t(a).outputType,onRealTime:b},null,8,["img","autoCrop","autoCropWidth","autoCropHeight","fixedBox","outputType"])]),m.actions?(x(),w("div",ee,[l("div",null,[T(i.$slots,"prefixAction")]),V(l("div",null,[o(c,{title:i.$t("components.resizer.zoomIn"),placement:"bottom"},{default:s(()=>[o(u,{type:"primary",onClick:e[0]||(e[0]=C=>t(n).changeScale(1.1))},{icon:s(()=>[o(p)]),_:1})]),_:1},8,["title"]),o(c,{title:i.$t("components.resizer.zoomOut"),placement:"bottom"},{default:s(()=>[o(u,{type:"primary",onClick:e[1]||(e[1]=C=>t(n).changeScale(-1.1))},{icon:s(()=>[o(h)]),_:1})]),_:1},8,["title"]),o(c,{title:i.$t("components.resizer.clockwise"),placement:"bottom"},{default:s(()=>[o(u,{type:"primary",onClick:e[2]||(e[2]=C=>t(n).rotateRight())},{icon:s(()=>[o(y)]),_:1})]),_:1},8,["title"]),o(c,{title:i.$t("components.resizer.anticlockwise"),placement:"bottom"},{default:s(()=>[o(u,{type:"primary",onClick:e[3]||(e[3]=C=>t(n).rotateLeft())},{icon:s(()=>[o(_)]),_:1})]),_:1},8,["title"])],512),[[S,t(v)]])])):M("",!0)]),l("div",oe,[l("div",te,[l("img",{src:t(r).url,style:L(t(r).img)},null,12,ne)])])])}}}),se=z({__name:"UploadResizerModal",props:{modelValue:{type:Boolean,default:!1},modelModifiers:{}},emits:D(["submit"],["update:modelValue"]),setup(m,{emit:g}){const d=I(m,"modelValue"),v=g,n=f([]),a=f("");Z(n,()=>{if(!n.value[0])return;const e=new FileReader;e.readAsDataURL(n.value[0].originFileObj),e.onload=()=>{a.value=e.result}},{deep:!0});const r=f(),b=()=>{r.value.cropper.getCropBlob(e=>{v("submit",e)})},i=()=>{d.value=!1,n.value=[],a.value=""};return(e,p)=>{const u=P,c=R,h=Q,y=F;return x(),E(y,{open:d.value,"onUpdate:open":p[1]||(p[1]=_=>d.value=_),title:e.$t("components.resizer.modalTitle"),okText:e.$t("components.resizer.ok"),width:"800px",onOk:b,onCancel:i},{default:s(()=>[o(U,{ref_key:"basicResizerRef",ref:r,imgUrl:t(a)},{prefixAction:s(()=>[o(h,{"file-list":t(n),"onUpdate:fileList":p[0]||(p[0]=_=>q(n)?n.value=_:null),accept:"image/png, image/jpeg, image/jpg",maxCount:1,showUploadList:!1,beforeUpload:()=>!1},{default:s(()=>[o(c,{type:"primary"},{icon:s(()=>[o(u)]),default:s(()=>[J(" "+K(e.$t("components.resizer.choose")),1)]),_:1})]),_:1},8,["file-list"])]),_:1},8,["imgUrl"])]),_:1},8,["open","title","okText"])}}}),le=k(U),re=k(se);export{le as B,re as U};
