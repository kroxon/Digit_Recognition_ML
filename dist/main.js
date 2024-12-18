(()=>{"use strict";var n={365:(n,e,t)=>{t.d(e,{A:()=>s});var r=t(601),o=t.n(r),a=t(314),i=t.n(a)()(o());i.push([n.id,"html {\n  background-color: rgba(233, 155, 188, 0);\n}\n\nbody {\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  height: 100vh;\n  flex-direction: column;\n  background: #D9AF8B;\n}\n\n.square {\n  background-color: rgb(0, 0, 0);\n  display: flex;\n  flex-grow: 1;\n  /* border: 0.5px solid #cfcbcb60; */\n  /* box-sizing: border-box; */\n}\n\n.row {\n  display: flex;\n  flex-grow: 1;\n}\n\n.container {\n  display: grid;\n  grid-template-columns: 3fr 1fr;\n  gap: 20px;\n}\n\n#grid-container,\n.img-canvas {\n  margin: 20px auto;\n  display: flex;\n  flex-flow: column nowrap;\n  width: min(40vw, 80vh);\n  height: min(40vw, 80vh);\n  background-color: beige;\n}\n\nbutton {\n  border: none;\n  background-color: #D98555;\n  color: #ffff;\n  padding: 10px 20px;\n  font-size: 20px;\n  font-weight: 700;\n  width: 200px;\n  border-radius: 10px;\n  margin: 20px auto 20px auto;\n  position: relative;\n  box-shadow: 5px 5px 5px #BF463B;\n  transition: all 0.3s ease;\n}\n\n\nbutton:hover {\n  box-shadow: 0px 2px 20px #BF463B;\n  top: 3px;\n}\n\nbutton:active {\n  box-shadow: none;\n  top: 5px;\n}\n\ncanvas {\n  border: 1px solid black;\n  cursor: crosshair;\n}\n\n.black {\n  background-color: black;\n}\n\n.white {\n  background-color: white;\n}\n",""]);const s=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],s=0;s<n.length;s++){var c=n[s],d=r.base?c[0]+r.base:c[0],l=a[d]||0,u="".concat(d," ").concat(l);a[d]=l+1;var p=t(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var m=o(f,r);r.byIndex=s,e.splice(s,0,{identifier:u,updater:m,references:1})}i.push(u)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var c=r(n,o),d=0;d<a.length;d++){var l=t(a[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=c}}},659:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return n[r](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var r=t(72),o=t.n(r),a=t(825),i=t.n(a),s=t(659),c=t.n(s),d=t(56),l=t.n(d),u=t(540),p=t.n(u),f=t(113),m=t.n(f),y=t(365),h={};h.styleTagTransform=m(),h.setAttributes=l(),h.insert=c().bind(null,"head"),h.domAPI=i(),h.insertStyleElement=p(),o()(y.A,h),y.A&&y.A.locals&&y.A.locals;let v=!1,g=0,x=0;const b=document.getElementById("drawingCanvas"),w=b.getContext("2d");b.addEventListener("mousedown",(n=>{v=!0,[g,x]=[n.offsetX,n.offsetY],b.style.cursor="crosshair"})),b.addEventListener("mousemove",(n=>{if(!v)return;const e=n.offsetX,t=n.offsetY;w.beginPath(),w.moveTo(g,x),w.lineTo(e,t),w.lineWidth=30,w.strokeStyle="black",w.stroke(),[g,x]=[e,t]})),b.addEventListener("mouseup",(()=>{v=!1,b.style.cursor="default"})),b.addEventListener("mouseout",(()=>{v=!1,b.style.cursor="default"})),async function(){try{const{X:n,y:e}=await async function(){const n=await fetch("data/X.json"),e=await fetch("data/y.json");let t=await n.json(),r=await e.json();return t=t.map((n=>n.map((n=>n>.5?1:0)))),Array.isArray(r)&&Array.isArray(r[0])&&(r=r.map((n=>n[0]))),t=tf.tensor2d(t),r=tf.tensor1d(r),{X:t,y:r}}(),t=function(){const n=tf.sequential();return n.add(tf.layers.dense({units:128,activation:"relu",inputShape:[400]})),n.add(tf.layers.dropout({rate:.5})),n.add(tf.layers.dense({units:64,activation:"relu"})),n.add(tf.layers.dense({units:10,activation:"softmax"})),n}(),r=await async function(n,e,t){return n.compile({loss:"sparseCategoricalCrossentropy",optimizer:tf.train.adam(5e-4),metrics:["accuracy"]}),await n.fit(e,t,{epochs:10,batchSize:32,shuffle:!0,callbacks:{onEpochEnd:(n,e)=>{console.log(`Epoka ${n+1}: loss = ${e.loss.toFixed(4)}, accuracy = ${e.acc.toFixed(4)}`)}}})}(t,n,e);console.log("Finished training:",r),await async function(n,e,t=4015){const r=n.slice([t,0],[1,400]);!function(n){const e=n.reshape([20,20]).arraySync(),t=e[0].map(((n,t)=>e.map((n=>n[t]))));let r=document.getElementById("digitGrid");r||(console.log("Creating container..."),r=document.createElement("div"),r.id="digitGrid",r.style.display="grid",r.style.gridTemplateColumns="repeat(20, 1fr)",r.style.gridTemplateRows="repeat(20, 1fr)",r.style.width="200px",r.style.height="200px",r.style.gap="1px",document.body.appendChild(r)),r.innerHTML="";for(const n of t)for(const e of n){const n=document.createElement("div");n.style.width="100%",n.style.height="100%",n.className=e>.5?"black":"white",r.appendChild(n)}}(r);const o=e.predict(r),a=await o.array(),i=o.argMax(-1).dataSync()[0];return console.log("Predicting a Two:"),console.log(a),console.log(`Largest Prediction Index: ${i}`),i}(n,t,2015)}catch(n){console.error("Error during training:",n)}}()})();