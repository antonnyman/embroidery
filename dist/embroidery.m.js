function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var e,n,r={a:"click",button:"click",form:"submit",input:"input",select:"change",textarea:"input"},i=function(){function e(t,e){this.cache={"data-target":[],"data-action":[]},this.initCalled=!1,this.context=e,this.dataAttr=t.getAttribute("data-controller"),this.targetElements=t.querySelectorAll("[data-target]"),this.actionElements=t.querySelectorAll("[data-action]"),this.updateCache(this.targetElements,"data-target"),this.updateCache(this.actionElements,"data-action"),this.create(),this.context[this.dataAttr]&&this.context[this.dataAttr].init&&"function"==typeof this.context[this.dataAttr].init&&!this.initCalled&&(this.context[this.dataAttr].init(this.cache["data-target"]),this.initCalled=!0)}var n=e.prototype;return n.updateCache=function(e,n){var r=this;e.forEach(function(e){var i,a;r.cache=t({},r.cache,((a={})[n]=t({},r.cache[n],((i={})[e.getAttribute(n)]=e,i)),a))})},n.create=function(){var t=this;this.actionElements.forEach(function(e){var n=e.getAttribute("data-action");if(!n||""===n)throw new Error("[Embroidery]: An action attribute was specified without an action. Is the action an empty string or missing?");n.split(" ").map(function(n){var i=null,a=null;if(n.includes("->")){var o=n.split("->");i=o[0],a=o[1]}else{var c=e.tagName.toLowerCase();i=r[c],a=n}if(!i)throw new Error("[Embroidery]: Missing event on "+e+", for example click or change.");if(!a)throw new Error("[Embroidery]: Missing function on "+e+". Specify your function in the controller.");e.addEventListener(i,function(){t.context[t.dataAttr][a](t.cache["data-target"])})})})},e}(),a=function(){function t(t){this.element=t,this.dataAttr=t.getAttribute("data-partial"),this.create()}return t.prototype.create=function(){try{var t=this;return Promise.resolve(fetch(t.dataAttr,{method:"GET",headers:{"Content-Type":"text/html"}})).then(function(e){return Promise.resolve(e.text()).then(function(e){t.element.insertAdjacentHTML("beforeend",e)})})}catch(t){return Promise.reject(t)}},t}();!function(t){t.Controller="[data-controller]",t.Partial="[data-partial]"}(e||(e={})),function(t){t.Controller="controller",t.Partial="partial"}(n||(n={}));var o=function(){function r(){var t;this.cache=((t={})[n.Controller]=[],t[n.Partial]=[],t)}r.start=function(){var t=new r;return t.start(),t};var o=r.prototype;return o.start=function(){try{var t=this;return Promise.resolve(new Promise(function(t){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",t):t()})).then(function(){console.info("Embroidery started."),t.discover(function(e){t.initialize(e)},e.Controller),t.discover(function(e){t.initialize(e)},e.Partial),t.listenForNewUninitializedControllersAtRuntime(function(e){t.initialize(e)})})}catch(t){return Promise.reject(t)}},o.register=function(e){this.context=t({},this.context,e)},o.discover=function(t,e){document.querySelectorAll(e).forEach(function(e){return t(e)})},o.updateCache=function(e,n){var r;this.cache=t({},this.cache,((r={})[n]=[].concat(this.cache[n],[e]),r))},o.initialize=function(t){var e=this,r=t;if(r.dataset)try{Object.keys(r.dataset).forEach(function(t){switch(t){case n.Controller:return e.updateCache(r,n.Controller),new i(r,e.context);case n.Partial:return e.updateCache(r,n.Partial),new a(r);default:throw new Error("Element is not a specified data type, like controller or partial. Did you forget to register it?")}})}catch(t){setTimeout(function(){throw t},0)}else console.error("An element "+r+" was picked up but could not be initialized")},o.discoverUninitializedControllers=function(t,n){var r=this;return void 0===n&&(n=null),Array.from((n||document).querySelectorAll(e.Controller)).filter(function(t){var n;return!(null==(n=r.cache[e.Controller])?void 0:n.includes(t))}).map(function(e){return t(e)})},o.listenForNewUninitializedControllersAtRuntime=function(t){var n=this;return new MutationObserver(function(r){return r.map(function(r){var i=r.addedNodes;i.length>0&&i.forEach(function(r){var i;1===r.nodeType&&((null==r||null==(i=r.parentElement)?void 0:i.closest(e.Controller))||n.discoverUninitializedControllers(function(e){t(e)},r.parentElement))})})}).observe(document.querySelector("body"),{childList:!0,attributes:!0,subtree:!0})},r}();export{o as Embroidery};
//# sourceMappingURL=embroidery.m.js.map
