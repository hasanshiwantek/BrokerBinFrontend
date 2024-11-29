import{c as p,a as h,j as e,a9 as x,b as j}from"./index-SDeZWYlL.js";import{c as d}from"./Inventory.module-DIToDVM4.js";import{h as v}from"./tableData-Dg4l-e4e.js";import{I as m}from"./InventoryButtons-ClxUomOt.js";const y=()=>{const i=p(n=>n.inventoryStore.inventoryAddData),l=h(),o=(n,s)=>{const t=i.map((a,r)=>r===s?{...a,[n.target.name]:n.target.value}:a);l(x(t))};return e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:v.map(n=>e.jsx("th",{children:n},n))})}),e.jsx("tbody",{children:i.map((n,s)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("input",{type:"text",name:"partModel",value:n.partModel,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsx("input",{type:"text",name:"heciClei",value:n.heciClei,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsx("input",{type:"text",name:"mfg",value:n.mfg,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsx("input",{type:"text",name:"price",value:n.price,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsx("input",{type:"text",name:"quantity",value:n.quantity,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsxs("select",{name:"status",value:n.status,onChange:t=>o(t,s),children:[e.jsx("option",{value:"stock",children:"Stock"}),e.jsx("option",{value:"dist",children:"DIST"})]})}),e.jsx("td",{children:e.jsx("input",{name:"productDescription",type:"text",value:n.productDescription,onChange:t=>o(t,s)})}),e.jsx("td",{children:e.jsxs("select",{name:"cond",value:n.cond,onChange:t=>o(t,s),children:[e.jsx("option",{value:"new",children:"NEW"}),e.jsx("option",{value:"asis",children:"ASIS"}),e.jsx("option",{value:"exc",children:"EXC"}),e.jsx("option",{value:"f/s",children:"F/S"}),e.jsx("option",{value:"nob",children:"NOB"}),e.jsx("option",{value:"ref",children:"REF"}),e.jsx("option",{value:"oemref",children:"OEMREF"}),e.jsx("option",{value:"rep",children:"REP"}),e.jsx("option",{value:"used",children:"USED"})]})})]},s))})]})},D=()=>{const i=j.get("token"),{inventoryAddData:l}=p(n=>n.inventoryStore),o=async n=>{n.preventDefault();const s=new FormData(n.target),t=Object.fromEntries(s.entries());if(Object.keys(t).forEach(a=>{a!=="addInventory"&&delete t[a]}),l){const a=l.filter((r,c)=>r.heciClei!==""||r.mfg!==""||r.partModel!==""||r.price!==""||r.productDescription!==""||r.quantity!=="");if(a.length>0){if(a==null?void 0:a.some(c=>Object.values(c).some(u=>u===""))){alert("Please fill all fields in a whole row to add to an inventory.");return}}else{alert("Please fill in the inventory data.");return}t.addInventory=a}else alert("Please fill in the inventory data.");try{(await fetch("https://phplaravel-1343027-4927440.cloudwaysapps.com/api/inventory/add",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok?alert("Success to add inventory data."):alert("Failed to add inventory data.")}catch(a){console.log(a)}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:d.inventory,children:[e.jsx(m,{}),e.jsx("div",{className:d.inventory_add_main,children:e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{className:d.inventory_add_main_top,children:[e.jsx("button",{type:"button",children:e.jsx("input",{type:"submit",value:"save"})}),e.jsx("button",{type:"button",children:"telecom"})]}),e.jsx(y,{}),e.jsx("div",{className:d.inventory_add_main_bottom,children:e.jsx("button",{type:"button",children:e.jsx("input",{type:"submit",value:"save"})})})]})})]})})};export{D as default};