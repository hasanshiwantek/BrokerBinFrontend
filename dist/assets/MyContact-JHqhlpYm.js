import{b as U,r as a,a as R,c as S,al as k,j as e,am as C,an as A,ao as M,N as v,L as o,aq as L}from"./index-SDeZWYlL.js";import{m as h}from"./MyProfile.module-Cdgpf7Z5.js";import{j as E}from"./tableData-Dg4l-e4e.js";import{d as B}from"./index-DF4zBA-v.js";import{q as I,m as T}from"./index-BgpzSwrX.js";import{c as F}from"./MyVendors.module-BQPwKHZR.js";import"./iconBase-DNWruYMs.js";const O="_inventory_1wsy1_1",D="_inventory_btn_1wsy1_1",P="_inventory_main_1wsy1_1",q="_inventory_main_submitBtn_1wsy1_1",G="_inventory_main_desc_1wsy1_1",Q="_inventory_main_footer_1wsy1_1",X="_inventory_main_AutoUploadh1_1wsy1_1",H="_inventory_main_ExampleFile_1wsy1_1",J="_inventory_main_scheduleUpload_1wsy1_1",K="_inventory_main_scheduleUpload_toggle_1wsy1_1",W="_inventory_main_scheduleUpload_footer_1wsy1_1",Y="_inventory_main_scheduleUpload_addFile_1wsy1_1",Z="_inventory_main_scheduleUpload_addFile_btn_1wsy1_1",$="_inventory_main_scheduleUpload_addFile_toggle_1wsy1_1",z="_inventory_main_scheduleUpload_addFile_toggle_fields_1wsy1_1",ee="_inventory_main_scheduleUpload_addFile_toggle_btn_1wsy1_1",ne="_vendor_1wsy1_333",se="_vendor_view_1wsy1_1",oe="_myVendor_1wsy1_373",ie="_myVendor_link_1wsy1_1",te="_myVendor_company_1wsy1_401",ae="_myVendor_company_list_main_1wsy1_1",_e="_myVendor_company_list_main_img_1wsy1_1",re="_myVendor_company_list_main_info_1wsy1_1",ce="_myVendor_company_list_main_notesRating_1wsy1_1",le="_myVendor_company_list_main_notes_1wsy1_1",de="_myVendor_company_list_main_rating_1wsy1_1",me="_myVendor_company_list_main_actions_1wsy1_1",ye="_myVendor_company_display_1wsy1_591",pe="_vendor_vanLink_1wsy1_603",he="_vendor_p_1wsy1_617",xe="_inventory_exportRemove_1wsy1_633",ve="_inventory_exportRemove_step1_radioBtn_1wsy1_1",je="_inventory_exportRemove_step2_1wsy1_1",ue="_inventory_exportRemove_step3_1wsy1_1",ge="_inventory_exportRemove_btn_1wsy1_1",fe="_searchVendor_search_1wsy1_1",Ve="_company_1wsy1_847",we="_searchVendor_results_1wsy1_1",Ne="_compnaySearch_1wsy1_801",be="_companyItem_1wsy1_847",Fe="_footerlinks_1wsy1_871",s={inventory:O,inventory_btn:D,inventory_main:P,inventory_main_submitBtn:q,inventory_main_desc:G,inventory_main_footer:Q,inventory_main_AutoUploadh1:X,inventory_main_ExampleFile:H,inventory_main_scheduleUpload:J,inventory_main_scheduleUpload_toggle:K,inventory_main_scheduleUpload_footer:W,inventory_main_scheduleUpload_addFile:Y,inventory_main_scheduleUpload_addFile_btn:Z,inventory_main_scheduleUpload_addFile_toggle:$,inventory_main_scheduleUpload_addFile_toggle_fields:z,inventory_main_scheduleUpload_addFile_toggle_btn:ee,vendor:ne,vendor_view:se,myVendor:oe,myVendor_link:ie,myVendor_company:te,myVendor_company_list_main:ae,myVendor_company_list_main_img:_e,myVendor_company_list_main_info:re,myVendor_company_list_main_notesRating:ce,myVendor_company_list_main_notes:le,myVendor_company_list_main_rating:de,myVendor_company_list_main_actions:me,myVendor_company_display:ye,vendor_vanLink:pe,vendor_p:he,inventory_exportRemove:xe,inventory_exportRemove_step1_radioBtn:ve,inventory_exportRemove_step2:je,inventory_exportRemove_step3:ue,inventory_exportRemove_btn:ge,searchVendor_search:fe,company:Ve,searchVendor_results:we,compnaySearch:Ne,companyItem:be,footerlinks:Fe},Ue=()=>{const m=U.get("token"),[y,d]=a.useState(""),[f,_]=a.useState(!1),j=a.useRef(),l=a.useRef(),x=R(),{searchMyVendor:c,myVendor:u}=S(i=>i.toolsStore);function V(i,r){let t;return(...b)=>{clearTimeout(t),t=setTimeout(()=>i(...b),r)}}const g=V(i=>{i&&x(A({search:i,token:m}))},500);a.useEffect(()=>{y?g(y):x(k())},[y,x,m]),a.useEffect(()=>{const i=r=>{j.current&&!j.current.contains(r.target)&&l.current&&!l.current.contains(r.target)&&_(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[]);const w=i=>{const r=i.target.value;d(r),_(!0)},N=i=>{const r={company_id:i.id};x(C({companyId:r,token:m})),d(i.name),_(!1)},n=()=>_(!0),p=()=>{setTimeout(()=>_(!1),200)};return e.jsxs(e.Fragment,{children:[e.jsx("span",{children:e.jsx("label",{htmlFor:"company",children:"Quick Add:"})}),e.jsx("br",{}),e.jsxs("span",{ref:j,children:[e.jsx("input",{type:"search",name:"company",id:"company",value:y,onChange:w,onFocus:n,onBlur:p,required:!0}),e.jsx("div",{className:F.compnaySearch,ref:l,children:f&&e.jsx("ul",{children:(c==null?void 0:c.length)>0?c.map(i=>e.jsxs("li",{onClick:()=>N(i),className:F.companyItem,children:[e.jsx("p",{children:i.name}),i.region&&i.region&&e.jsxs("p",{children:[e.jsxs("span",{children:[i.region,","]}),e.jsx("span",{children:i.country})]})]},i.id)):e.jsx("li",{children:"No results found"},"no-results")})})]})]})},Ee=()=>{const m=U.get("token");let[y,d]=a.useState(!0),[f,_]=a.useState(!1),[j,l]=a.useState(!1),[x,c]=a.useState(!1);const{myVendor:u,loading:V}=S(n=>n.toolsStore),g=R(),w=n=>{n.target.value==="company"?(d(!0),_(!1),l(!1),c(!1)):n.target.value==="show"?(d(!1),_(!0),l(!1),c(!1)):n.target.value==="country"?(d(!1),_(!1),l(!0),c(!1)):n.target.value==="state"&&(d(!1),_(!1),l(!1),c(!0))},N=n=>{const p={company_id:n};console.log(p),g(L({companyId:p,token:m}))};return a.useEffect(()=>{g(M({token:m}))},[]),V?e.jsx("p",{children:"Loading..."}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:s.inventory,children:[e.jsx("div",{className:s.vendor_vanLink,children:e.jsx("div",{className:h.profileInfo_links,children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(v,{to:"/myprofile",end:!0,className:({isActive:n})=>n?h.active:"",children:e.jsx("span",{children:"Personal Info"})})}),e.jsx("li",{children:e.jsx(v,{to:"/myprofile/Options",className:({isActive:n})=>n?h.active:"",children:e.jsx("span",{children:"Options"})})}),e.jsx("li",{children:e.jsx(v,{to:"/myprofile/MyVendors",className:({isActive:n})=>n?h.active:"",children:e.jsx("span",{children:"My Vendors"})})}),e.jsx("li",{children:e.jsx(v,{to:"/myprofile/MyContact",className:({isActive:n})=>n?h.active:"",children:e.jsx("span",{children:"My Contacts"})})}),e.jsx("li",{children:e.jsx(v,{to:"/myprofile/broadcastfilter",className:({isActive:n})=>n?h.active:"",children:e.jsx("span",{children:"Broadcast Filters"})})})]})})}),e.jsx("div",{className:s.vendor_p,children:e.jsx("p",{children:"My Vendors"})}),e.jsxs("div",{className:s.vendor,children:[e.jsxs("div",{className:s.vendor_view,children:[e.jsx("div",{className:s.searchVendor,children:e.jsx("div",{className:s.searchVendor_search,children:e.jsx(Ue,{})})}),e.jsxs("div",{children:[e.jsx("p",{children:"view by"}),e.jsxs("select",{onChange:w,children:[e.jsx("option",{value:"company",children:"Company"}),e.jsx("option",{value:"show",children:"Display"}),e.jsx("option",{value:"country",children:"Country"}),e.jsx("option",{value:"state",children:"State"})]})]})]}),e.jsxs("div",{className:s.myVendor,children:[y&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:s.myVendor_link,children:e.jsxs("div",{children:[e.jsx(o,{to:"##",children:"#"}),e.jsx(o,{to:"#A",children:"A"}),e.jsx(o,{to:"#B",children:"B"}),e.jsx(o,{to:"#C",children:"C"}),e.jsx(o,{to:"#D",children:"D"}),e.jsx(o,{to:"#E",children:"E"}),e.jsx(o,{to:"#F",children:"F"}),e.jsx(o,{to:"#G",children:"G"}),e.jsx(o,{to:"#H",children:"H"}),e.jsx(o,{to:"#I",children:"I"}),e.jsx(o,{to:"#J",children:"J"}),e.jsx(o,{to:"#K",children:"K"}),e.jsx(o,{to:"#L",children:"L"}),e.jsx(o,{to:"#M",children:"M"}),e.jsx(o,{to:"#N",children:"N"}),e.jsx(o,{to:"#O",children:"O"}),e.jsx(o,{to:"#P",children:"P"}),e.jsx(o,{to:"#Q",children:"Q"}),e.jsx(o,{to:"#R",children:"R"}),e.jsx(o,{to:"#S",children:"S"}),e.jsx(o,{to:"#T",children:"T"}),e.jsx(o,{to:"#U",children:"U"}),e.jsx(o,{to:"#V",children:"V"}),e.jsx(o,{to:"#W",children:"W"}),e.jsx(o,{to:"#X",children:"X"}),e.jsx(o,{to:"#Y",children:"Y"}),e.jsx(o,{to:"#Z",children:"Z"})]})}),e.jsx("div",{className:s.myVendor_company,children:u==null?void 0:u.map(n=>e.jsx("div",{className:s.myVendor_company_list,children:e.jsxs("div",{className:s.myVendor_company_list_main,children:[e.jsxs("div",{className:s.myVendor_company_list_main_img,children:[e.jsx("img",{src:n.company.image,alt:"vendor logo"}),e.jsx("span",{children:e.jsx("p",{children:n.company.name})})]}),e.jsxs("div",{className:s.myVendor_company_list_main_info,children:[e.jsxs("span",{children:[e.jsx("strong",{children:"company:"}),e.jsx("p",{children:n.company.name})]}),e.jsxs("span",{children:[e.jsx("strong",{children:"fax:"}),e.jsx("p",{children:n.company.phone_num})]}),e.jsxs("span",{children:[e.jsx("strong",{children:"phone:"}),e.jsx("p",{children:n.company.phone_num})]}),e.jsxs("span",{children:[e.jsx("strong",{children:"hours:"}),e.jsxs("p",{children:[n.company.open_timing," to"," ",n.company.close]})]}),e.jsxs("span",{children:[e.jsx("strong",{children:"ship by:"}),e.jsx("p",{children:"4pm"})]}),e.jsxs("span",{children:[e.jsx("strong",{children:"location:"}),e.jsx("p",{children:n.company.address})]})]}),e.jsxs("div",{className:s.myVendor_company_list_main_notesRating,children:[e.jsxs("div",{className:s.myVendor_company_list_main_notes,children:[e.jsx("span",{children:e.jsx("strong",{children:"Notes:"})}),e.jsx("span",{children:e.jsx("textarea",{name:"notes",id:"notes",cols:10,rows:6})}),e.jsx("span",{children:e.jsx("button",{type:"button",className:s.myVendor_company_list_main_notes_btn,children:"save"})})]}),e.jsxs("div",{className:s.myVendor_company_list_main_rating,children:[e.jsx("input",{type:"range",name:"ratingContact",id:"ratingContact",min:0,max:5}),e.jsx("span",{children:"My Rating: 4"})]})]}),e.jsx("div",{className:s.myVendor_company_list_main_actions,children:e.jsx("button",{type:"button",onClick:()=>N(n.company.id),children:"X"})})]})},n.company.id))})]}),f&&e.jsxs("div",{className:s.myVendor_company_display,children:[e.jsx("h1",{children:"Display: Normal"}),E.map((n,p)=>{const i=Object.keys(n)[0],r=n[i];return e.jsx("div",{className:s.myVendor_company_name,children:e.jsx("div",{className:s.myVendor_company_name_list,children:r.map((t,b)=>e.jsxs("div",{className:s.myVendor_company_name_list_specified,children:[e.jsxs("div",{className:s.myVendor_company_name_list_specified_main,children:[e.jsxs("div",{className:s.myVendor_company_name_list_specified_img,children:[e.jsx("img",{src:t.img,alt:"company logo"}),e.jsxs("span",{children:[e.jsx(B,{}),e.jsx("p",{children:t.name}),e.jsx(I,{})]})]}),e.jsxs("div",{className:s.myVendor_company_name_list_specified_desc,children:[e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:t.name}),e.jsx("p",{children:t.address})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"phone: "}),t.phone]})]}),e.jsx("p",{children:t.description})]})]}),e.jsxs("div",{className:s.myVendor_company_name_list_specified_feedback,children:[e.jsx("img",{src:t.feedbackImg,alt:"feedback"}),e.jsxs("span",{children:[e.jsxs("p",{children:[t.ratingCount[0],"%"]}),e.jsxs("p",{children:["(",t.ratingCount[1],")"]})]}),e.jsx("p",{children:t.ratingMember})]}),e.jsx("div",{className:s.myVendor_company_name_list_specified_add,children:e.jsx(T,{})})]},t.name))})},p)})]})]})]})]})})};export{Ee as default};