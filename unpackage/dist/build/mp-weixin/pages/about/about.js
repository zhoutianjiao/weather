(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/about/about"],{"058f":function(n,t,e){"use strict";e.r(t);var o=e("3169"),u=e("dacc");for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);e("1ee9");var c,a=e("f0c5"),r=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=r.exports},"1ee9":function(n,t,e){"use strict";var o=e("d59d"),u=e.n(o);u.a},3169:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return o}));var o={uniNoticeBar:function(){return e.e("components/uni-notice-bar/uni-notice-bar").then(e.bind(null,"e868"))},uniList:function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"2cef"))},uniListItem:function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"7242"))}},u=function(){var n=this,t=n.$createElement;n._self._c},i=[]},7639:function(n,t,e){"use strict";(function(n){e("c113");o(e("66fd"));var t=o(e("058f"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},d59d:function(n,t,e){},dacc:function(n,t,e){"use strict";e.r(t);var o=e("dc5d"),u=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=u.a},dc5d:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){e.e("components/uni-notice-bar/uni-notice-bar").then(function(){return resolve(e("e868"))}.bind(null,e)).catch(e.oe)},u=function(){e.e("components/tina-btn/tian-btn").then(function(){return resolve(e("b465"))}.bind(null,e)).catch(e.oe)},i={name:"UniNoticeBar",components:{uniNoticeBar:o,tianbtn:u},data:function(){return{userinfo:{},stats:!1,statuss:!0}},onLoad:function(){var t=this;n.getStorage({key:"userinfo",success:function(n){t.userinfo=n.data,console.log(t.userinfo,"xxx")}})},onShow:function(){var t=this;n.getSetting({success:function(n){console.log("授权：",n),n.authSetting["scope.userInfo"]?(console.log("当前已授权"),t.stats=!0,t.statuss=!1):console.log("当前未授权")}})},onShareAppMessage:function(n){return{title:"goodday天气，开心每一天",path:"/pages/index/index",imageUrl:"/static/share.png"}},methods:{logins:function(){n.showModal({content:"您需要登录账号",success:function(t){t.confirm?n.navigateTo({url:"grant"}):t.cancel}})}}};t.default=i}).call(this,e("543d")["default"])}},[["7639","common/runtime","common/vendor"]]]);