(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{9014:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(7492)}])},3857:function(e,t,n){"use strict";n.d(t,{kL:function(){return a},sY:function(){return u}});var o=n(9515),r=n(1463),i=n.n(r);function a(e){var t=!0,n=!1,o=void 0;try{for(var r,a=i().i18n.locales[Symbol.iterator]();!(t=(r=a.next()).done);t=!0){var u=r.value;if(e.includes(".".concat(u,".")))return u}}catch(c){n=!0,o=c}finally{try{t||null==a.return||a.return()}finally{if(n)throw o}}return i().i18n.defaultLocale}function u(){return i().i18n.defaultLocale}t.ZP=(0,o.Z)({supportedLngs:i().i18n.locales,fallbackLng:i().i18n.defaultLocale})},6761:function(e,t,n){"use strict";n.d(t,{l_:function(){return l}});var o=n(5893),r=n(7294),i=n(1163),a=n(3857),u=n(1463),c=n.n(u),s=function(e){var t=(0,i.useRouter)();e=e||t.asPath;var n=c().i18n.locales;return(0,r.useEffect)((function(){var o=a.ZP.detect()||(0,a.sY)();if("/404"!==t.route)a.ZP.cache&&a.ZP.cache(o),t.replace("/"+o+e);else{var r=n.find((function(t){return t===e.split("/")[1]||""}))||(0,a.sY)();t.replace("/"+r+t.route)}})),(0,o.jsx)(o.Fragment,{})},l=function(){return s(""),(0,o.jsx)(o.Fragment,{})}},1463:function(e){"use strict";e.exports={i18n:{locales:["zh","en"],defaultLocale:"zh"}}},7492:function(e,t,n){"use strict";n.r(t);var o=n(6761);t.default=o.l_},9515:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.d(t,{Z:function(){return _}});var i=n(5671),a=n(3144),u=[],c=u.forEach,s=u.slice;function l(e){return c.call(s.call(arguments,1),(function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])})),e}var f=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,p=function(e,t,n){var o=n||{};o.path=o.path||"/";var r=e+"="+encodeURIComponent(t);if(o.maxAge>0){var i=o.maxAge-0;if(isNaN(i))throw new Error("maxAge should be a Number");r+="; Max-Age="+Math.floor(i)}if(o.domain){if(!f.test(o.domain))throw new TypeError("option domain is invalid");r+="; Domain="+o.domain}if(o.path){if(!f.test(o.path))throw new TypeError("option path is invalid");r+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");r+="; Expires="+o.expires.toUTCString()}if(o.httpOnly&&(r+="; HttpOnly"),o.secure&&(r+="; Secure"),o.sameSite)switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:r+="; SameSite=Strict";break;case"lax":r+="; SameSite=Lax";break;case"strict":r+="; SameSite=Strict";break;case"none":r+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return r},g=function(e,t,n,o){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{path:"/",sameSite:"strict"};n&&(r.expires=new Date,r.expires.setTime(r.expires.getTime()+60*n*1e3)),o&&(r.domain=o),document.cookie=p(e,encodeURIComponent(t),r)},d=function(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},h={name:"cookie",lookup:function(e){var t;if(e.lookupCookie&&"undefined"!==typeof document){var n=d(e.lookupCookie);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!==typeof document&&g(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain,t.cookieOptions)}},v={name:"querystring",lookup:function(e){var t;if("undefined"!==typeof window)for(var n=window.location.search.substring(1).split("&"),o=0;o<n.length;o++){var r=n[o].indexOf("=");if(r>0)n[o].substring(0,r)===e.lookupQuerystring&&(t=n[o].substring(r+1))}return t}},m=null,w=function(){if(null!==m)return m;try{m="undefined"!==window&&null!==window.localStorage;var e="i18next.translate.boo";window.localStorage.setItem(e,"foo"),window.localStorage.removeItem(e)}catch(t){m=!1}return m},k={name:"localStorage",lookup:function(e){var t;if(e.lookupLocalStorage&&w()){var n=window.localStorage.getItem(e.lookupLocalStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&w()&&window.localStorage.setItem(t.lookupLocalStorage,e)}},y=null,S=function(){if(null!==y)return y;try{y="undefined"!==window&&null!==window.sessionStorage;var e="i18next.translate.boo";window.sessionStorage.setItem(e,"foo"),window.sessionStorage.removeItem(e)}catch(t){y=!1}return y},b={name:"sessionStorage",lookup:function(e){var t;if(e.lookupSessionStorage&&S()){var n=window.sessionStorage.getItem(e.lookupSessionStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupSessionStorage&&S()&&window.sessionStorage.setItem(t.lookupSessionStorage,e)}},x={name:"navigator",lookup:function(e){var t=[];if("undefined"!==typeof navigator){if(navigator.languages)for(var n=0;n<navigator.languages.length;n++)t.push(navigator.languages[n]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},O={name:"htmlTag",lookup:function(e){var t,n=e.htmlTag||("undefined"!==typeof document?document.documentElement:null);return n&&"function"===typeof n.getAttribute&&(t=n.getAttribute("lang")),t}},L={name:"path",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(n instanceof Array)if("number"===typeof e.lookupFromPathIndex){if("string"!==typeof n[e.lookupFromPathIndex])return;t=n[e.lookupFromPathIndex].replace("/","")}else t=n[0].replace("/","")}return t}},C={name:"subdomain",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);n instanceof Array&&(t="number"===typeof e.lookupFromSubdomainIndex?n[e.lookupFromSubdomainIndex].replace("http://","").replace("https://","").replace(".",""):n[0].replace("http://","").replace("https://","").replace(".",""))}return t}};var P=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,i.Z)(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return(0,a.Z)(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services=e,this.options=l(t,this.options||{},{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"]}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=n,this.addDetector(h),this.addDetector(v),this.addDetector(k),this.addDetector(b),this.addDetector(x),this.addDetector(O),this.addDetector(L),this.addDetector(C)}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var n=[];return e.forEach((function(e){if(t.detectors[e]){var o=t.detectors[e].lookup(t.options);o&&"string"===typeof o&&(o=[o]),o&&(n=n.concat(o))}})),this.services.languageUtils.getBestMatchFromCodes?n:n.length>0?n[0]:null}},{key:"cacheUserLanguage",value:function(e,t){var n=this;t||(t=this.options.caches),t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach((function(t){n.detectors[t]&&n.detectors[t].cacheUserLanguage(e,n.options)})))}}]),e}();P.type="languageDetector";var E=P,j=["supportedLngs","fallbackLng","order"];function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var U=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},F=function(e){if("string"===typeof e&&e.indexOf("-")>-1){var t=["hans","hant","latn","cyrl","cans","mong","arab"],n=e.split("-");return 2===n.length?(n[0]=n[0].toLowerCase(),n[1]=n[1].toUpperCase(),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=U(n[1].toLowerCase()))):3===n.length&&(n[0]=n[0].toLowerCase(),2===n[1].length&&(n[1]=n[1].toUpperCase()),"sgn"!==n[0]&&2===n[2].length&&(n[2]=n[2].toUpperCase()),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=U(n[1].toLowerCase())),t.indexOf(n[2].toLowerCase())>-1&&(n[2]=U(n[2].toLowerCase()))),n.join("-")}return e},T=function(e){var t=e.supportedLngs,n=e.fallbackLng;return function(e){if(!e)return null;var o,r=function(e){return!t||!t.length||t.indexOf(e)>-1};return e.forEach((function(e){if(!o){var n=F(e);t&&!r(n)||(o=n)}})),!o&&t&&e.forEach((function(e){if(!o){var n=function(e){if(!e||e.indexOf("-")<0)return e;var t=e.split("-");return F(t[0])}(e);o=r(n)?n:t.find((function(e){if(0===e.indexOf(n))return e}))}})),o||(o=n),o}};function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.supportedLngs,n=e.fallbackLng,o=e.order,i=void 0===o?["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"]:o,a=r(e,j),u=T({supportedLngs:t,fallbackLng:n}),c=new E({languageUtils:{getBestMatchFromCodes:u}},D({order:i},a));return{detect:function(e){var t=c.detect(e);return u(t)},cache:function(e,t){return c.cacheUserLanguage(e,t)}}}}},function(e){e.O(0,[774,888,179],(function(){return t=9014,e(e.s=t);var t}));var t=e.O();_N_E=t}]);