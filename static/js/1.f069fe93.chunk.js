webpackJsonp([1],{125:function(t,n,i){t.exports=i.p+"static/media/coverall.6cb90dbc.png"},140:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(44),o=i(0),s=(i.n(o),i(189)),l=(i.n(s),i(45));n.default=function(t){var n=e.e(o.useState(""),2),i=n[0],s=n[1];return o.useEffect(function(){var n=t.item.playCount>1e4?Math.floor(t.item.playCount/1e3)+t.item.playCount%1e4+"\u4e07":t.item.playCount+"";s(n)},[t.item.playCount]),o.createElement("div",{className:"musicList"},o.createElement(l.b,{to:"/",className:"link"},o.createElement("div",{className:"listBox"},o.createElement("div",{className:"mask"}),o.createElement("img",{src:t.item.picUrl||t.item.coverImgUrl,alt:"\u56fe\u7247"}),o.createElement("div",{className:"bottomMsg iconfont icon-erji icon-bofang"},i)),o.createElement("div",{className:"description"},t.item.name)))}},189:function(t,n,i){var e=i(190);"string"===typeof e&&(e=[[t.i,e,""]]);var o={hmr:!1,transform:void 0};i(117)(e,o);e.locals&&(t.exports=e.locals)},190:function(t,n,i){var e=i(121);(t.exports=i(116)(!1)).push([t.i,".musicList {\n  width: 140px;\n  height: 204px;\n  display: inline-block; }\n  .musicList .link {\n    color: #ccc;\n    text-align: center;\n    line-height: 27px; }\n    .musicList .link .listBox {\n      width: 140px;\n      height: 140px;\n      position: relative; }\n      .musicList .link .listBox .mask {\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        background: url("+e(i(125))+") no-repeat;\n        background-position: 0 0; }\n      .musicList .link .listBox img {\n        width: 140px;\n        height: 140px; }\n      .musicList .link .listBox .bottomMsg {\n        position: absolute;\n        bottom: 0;\n        width: 100%;\n        height: 27px;\n        background: url("+e(i(125))+') no-repeat;\n        font-size: 12px;\n        color: #fff; }\n        .musicList .link .listBox .bottomMsg:after {\n          content: "\\E60A";\n          position: absolute;\n          right: 10px; }\n      .musicList .link .listBox .icon-erji:before {\n        content: "\\E602";\n        position: absolute;\n        left: 10px; }\n    .musicList .link .description {\n      width: 100%;\n      white-space: inherit;\n      font-size: 14px;\n      color: #000;\n      text-decoration: none;\n      text-align: left; }\n',""])}});