(()=>{"use strict";var n={365:(n,e,t)=>{t.d(e,{A:()=>c});var o=t(601),r=t.n(o),a=t(314),i=t.n(a)()(r());i.push([n.id,"html {\n  background-color: rgba(233, 155, 188, 0);\n}\n\nbody {\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  height: 100vh;\n  flex-direction: column;\n  background: #D9AF8B;\n}\n\n.square {\n  background-color: rgb(0, 0, 0);\n  display: flex;\n  flex-grow: 1;\n  /* border: 0.5px solid #cfcbcb60; */\n  /* box-sizing: border-box; */\n}\n\n.row {\n  display: flex;\n  flex-grow: 1;\n}\n\n.container {\n  display: grid;\n  grid-template-columns: 3fr 1fr;\n  gap: 20px;\n}\n\n#grid-container,\n.img-canvas {\n  margin: 20px auto;\n  display: flex;\n  flex-flow: column nowrap;\n  width: min(40vw, 80vh);\n  height: min(40vw, 80vh);\n  background-color: beige;\n}\n\nbutton {\n  border: none;\n  background-color: #D98555;\n  color: #ffff;\n  padding: 10px 20px;\n  font-size: 20px;\n  font-weight: 700;\n  width: 200px;\n  border-radius: 10px;\n  margin: 20px auto 20px auto;\n  position: relative;\n  box-shadow: 5px 5px 5px #BF463B;\n  transition: all 0.3s ease;\n}\n\n\nbutton:hover {\n  box-shadow: 0px 2px 20px #BF463B;\n  top: 3px;\n}\n\nbutton:active {\n  box-shadow: none;\n  top: 5px;\n}\n\ncanvas {\n  border: 1px solid black;\n  cursor: crosshair;\n}\n\n.black {\n  background-color: black;\n}\n\n.white {\n  background-color: white;\n}\n\n#digitGrid {\n  display: grid;\n  grid-template-columns: repeat(20, 1fr);\n  grid-template-rows: repeat(20, 1fr);\n  width: 200px;\n  height: 200px;\n  gap: 1px;\n}\n\n#digitGrid div {\n  width: 20px;\n  height: 20px;\n}\n\n.prediction {\n  font-size: 20px;\n  font-weight: 700;\n  color: #D98555;\n  text-align: center;\n}\n\n#predictions {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 20px;\n}",""]);const c=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],d=o.base?s[0]+o.base:s[0],l=a[d]||0,u="".concat(d," ").concat(l);a[d]=l+1;var p=t(u),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var g=r(f,o);o.byIndex=c,e.splice(c,0,{identifier:u,updater:g,references:1})}i.push(u)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var a=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=o(n,r),d=0;d<a.length;d++){var l=t(a[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=s}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var o=t(72),r=t.n(o),a=t(825),i=t.n(a),c=t(659),s=t.n(c),d=t(56),l=t.n(d),u=t(540),p=t.n(u),f=t(113),g=t.n(f),h=t(365),m={};m.styleTagTransform=g(),m.setAttributes=l(),m.insert=s().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=p(),r()(h.A,m),h.A&&h.A.locals&&h.A.locals;let v=!1,y=0,x=0;!async function(){let n;try{n=await async function(){const n=await tf.loadLayersModel("/models/model.json");return console.log("Model loaded successfully"),n}(),function(){const e=document.getElementById("drawingCanvas"),t=e.getContext("2d");t.fillStyle="white",e.addEventListener("mousedown",(n=>{v=!0,[y,x]=[n.offsetX,n.offsetY],e.style.cursor="crosshair"})),e.addEventListener("mousemove",(n=>{if(!v)return;const e=n.offsetX,o=n.offsetY;t.beginPath(),t.moveTo(y,x),t.lineTo(e,o),t.lineWidth=30,t.strokeStyle="white",t.stroke(),[y,x]=[e,o]})),e.addEventListener("mouseup",(()=>{v=!1,e.style.cursor="default"})),e.addEventListener("mouseout",(()=>{v=!1,e.style.cursor="default"})),document.getElementById("predictButton").addEventListener("click",(async()=>{const e=function(){const n=document.getElementById("drawingCanvas"),e=n.getContext("2d").getImageData(0,0,n.width,n.height).data,t=20,o=n.width/t,r=n.height/t;let a=Array.from({length:t},(()=>Array(t).fill(0)));for(let i=0;i<t;i++)for(let c=0;c<t;c++){const t=Math.floor(c*o),s=Math.floor(i*r),d=Math.floor((c+1)*o),l=Math.floor((i+1)*r);let u=0,p=0;for(let o=s;o<l;o++)for(let r=t;r<d;r++){const t=4*(o*n.width+r);u+=(e[t]+e[t+1]+e[t+2])/3,p++}const f=u/p>=128?1:0;a[i][c]=f}const i=Array.from({length:t},((n,e)=>a.map((n=>n[e])))).flat();return tf.tensor2d(i,[1,400])}();console.log(e.arraySync());const t=await async function(n,e){if(!(n instanceof tf.Tensor))throw new Error("imageData must be a Tensor");const t=e.predict(n),o=await t.array(),r=t.argMax(-1).dataSync()[0];return console.log("Predicting a digit:"),console.log(o),function(n){const e=document.getElementById("predictions");e.innerHTML="";for(let t=0;t<n[0].length;t++){const o=(100*n[0][t]).toFixed(2),r=t,a=(n[t],document.createElement("div"));a.className="prediction",a.innerHTML=`${r} - ${o}%`,e.appendChild(a)}}(o),console.log(`Largest Prediction Index: ${r}`),function(n){const e=n.reshape([20,20]).arraySync(),t=e[0].map(((n,t)=>e.map((n=>n[t]))));let o=document.getElementById("digitGrid");o||(o=document.createElement("div"),o.id="digitGrid",document.body.appendChild(o)),o.innerHTML="";for(const n of t)for(const e of n){const n=document.createElement("div");n.style.width="100%",n.style.height="100%",n.className=e>.5?"black":"white",o.appendChild(n)}}(n),r}(e,n);console.log(`Predicted digit: ${t}`)}))}()}catch(n){console.error("Error during training or prediction:",n)}}()})();