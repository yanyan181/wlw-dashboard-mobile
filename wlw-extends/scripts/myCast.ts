import { mycast, castDetail, CastData } from "./util";
import { createCastData } from "./createCastData";
let isLoading = false;

alert("てすとてすとてすとてすと");
insertLoadButtonDOM(document);

export async function createCastList(doc: Document) {
  const castList: any = await mycast();
  const castDataList: CastData[] = [];
  isLoading = true;
  if (castList.status === "OK") {
    for (const cast of castList.cast) {
      const castDom: Document = await castDetail(cast.id);
      castDataList.push(
        await createCastData(
          castDom,
          cast.id,
          cast.na,
          cast.crc >= 4 ? String(+cast.cr + 100) : String(+cast.cr),
          cast.ci,
          cast.rt
        )
      );
      const sleep = (msec: number) =>
        new Promise((resolve) => setTimeout(resolve, msec));
      await sleep(1000);
    }
  }
  isLoading = false;
  localStorage.castDataList = JSON.stringify(castDataList);
  const dateTime = new Date();
  localStorage.lastGetDate = dateTime.toLocaleDateString();
}

export function insertLoadButtonDOM(doc: Document) {
  const innerDom = document.getElementById("inner");
  if (innerDom?.parentNode) {
    const polyfill = document.createElement("script");
    polyfill.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
    innerDom.parentNode.insertBefore(polyfill, innerDom.nextSibling);

    const script = document.createElement("script");
    script.src = `!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=17)}({1:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return i}));var r=function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function u(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,u)}c((r=r.apply(t,e||[])).next())}))},o=function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};function a(){return r(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,fetch("https://wonderland-wars.net/mycast",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){if(t.ok)return t.json();throw t})).then((function(t){return{payload:t}})).catch((function(t){return t}))];case 1:return[2,t.sent()]}}))}))}function i(t){return r(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,fetch("https://wonderland-wars.net/castdetail.html?cast="+t,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){if(t.ok)return t.text();throw t})).then((function(t){return(new DOMParser).parseFromString(t,"text/html")})).catch((function(t){return t}))];case 1:return[2,e.sent()]}}))}))}},17:function(t,e,n){"use strict";n.r(e),n.d(e,"createCastList",(function(){return u})),n.d(e,"insertLoadButtonDOM",(function(){return c}));var r=n(1),o=n(2),a=function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function u(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,u)}c((r=r.apply(t,e||[])).next())}))},i=function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};function u(t){return a(this,void 0,void 0,(function(){var t,e,n,a,u,c,l,s,f;return i(this,(function(i){switch(i.label){case 0:return[4,Object(r.b)()];case 1:if(t=i.sent(),e=[],!0,"OK"!==t.status)return[3,7];n=0,a=t.cast,i.label=2;case 2:return n<a.length?(u=a[n],[4,Object(r.a)(u.id)]):[3,7];case 3:return c=i.sent(),s=(l=e).push,[4,Object(o.a)(c,u.id,u.na,u.crc>=4?String(+u.cr+100):String(+u.cr),u.ci,u.rt)];case 4:return s.apply(l,[i.sent()]),[4,function(t){return new Promise((function(e){return setTimeout(e,t)}))}(1e3)];case 5:i.sent(),i.label=6;case 6:return n++,[3,2];case 7:return!1,localStorage.castDataList=JSON.stringify(e),f=new Date,localStorage.lastGetDate=f.toLocaleDateString(),[2]}}))}))}function c(t){var e=document.getElementById("inner");if(null==e?void 0:e.parentNode){var n=document.createElement("script");n.src="https://polyfill.io/v3/polyfill.min.js?features=es6",e.parentNode.insertBefore(n,e.nextSibling);var r=document.createElement("script");r.src="https://cdn.jsdelivr.net/gh/yanyan181/wlw-dashboard-mobile@test-001/wlw-extends/dist/dashboardPage.js",e.parentNode.insertBefore(r,e.nextSibling);var o=document.createElement("div");o.id="load_button",e.parentNode.insertBefore(o,e),alert("💩💩💩💩")}}alert("てすとてすとてすとてすと"),c(document)},2:function(t,e,n){"use strict";function r(t,e,n,r,a,i){var u=t.getElementsByClassName("block_playdata_01_text"),c=t.getElementsByClassName("block_playdata_02_text"),l=u[0].textContent?o(u[0].textContent):0,s=u[1].textContent?o(u[1].textContent):0,f=u[2].textContent?o(u[2].textContent):0,d=u[3].textContent?o(u[3].textContent):0,p=c[0].textContent?o(c[0].textContent):0,h=c[1].textContent?o(c[1].textContent):0,b=c[2].textContent?o(c[2].textContent):0,y=c[3].textContent?o(c[3].textContent):0,v=c[4].textContent?o(c[4].textContent):0,m=c[5].textContent?o(c[5].textContent):0,w=p-b==0?0:Math.round((h-p)*s/(p-b)),x=0===s?0:Math.round(s/(s+w)*100*10)/10,g=0===s?0:0===d?f:Math.round(f/d*100)/100;return{name:n,id:+e,rank:+r,image:a,useRate:l,winCount:s,killCount:g,deathCount:d,averageEval:p,winEval:h,loseEval:b,averageNice:y,winNice:v,loseNice:m,loseCount:w,winRate:x,killRate:g,roll:i,timestamp:Date.now()}}function o(t){return t.match("p")?+t.split("p")[0]:t.match("％")?+t.split("％")[0]:t.match("勝")?+t.split("勝")[0]:+t}n.d(e,"a",(function(){return r}))}});`;
    innerDom.parentNode.insertBefore(script, innerDom.nextSibling);

    const div = document.createElement("div");
    div.id = "load_button";
    innerDom.parentNode.insertBefore(div, innerDom);
    alert("💩💩💩💩");
  }
}
