webpackJsonp([16],{258:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=o(44),i=o(0),a=(o.n(i),o(259)),s=(o.n(a),o(47)),r=o(124),c=function(t){function n(n){var o=t.call(this,n)||this;return o.state={addAnimate:!1,toastMsg:{duation:3e3,msg:"\u6682\u4e0d\u652f\u6301\u6b64\u767b\u9646\u7c7b\u578b",show:!1}},o}return e.c(n,t),n.prototype.componentDidMount=function(){return e.b(this,void 0,Promise,function(){var t;return e.d(this,function(n){switch(n.label){case 0:return t=this,[4,this.changeAnimateStatus(5e3,!1)];case 1:return t.timer=n.sent(),[2]}})})},n.prototype.changeAnimateStatus=function(t,n){return e.b(this,void 0,void 0,function(){var o;return e.d(this,function(e){switch(e.label){case 0:return o=this,[4,setTimeout(function(){o.setState({toastMsg:{duation:3e3,msg:"\u6682\u4e0d\u652f\u6301\u6b64\u767b\u9646\u7c7b\u578b",show:n}}),o.props.changeToastState(o.state.toastMsg)},t)];case 1:return[2,e.sent()]}})})},n.prototype.componentWillUnmount=function(){clearTimeout(this.timer)},n.prototype.render=function(){return i.createElement("div",{className:["toast","iconfont icon-xiaoxi-jinggao",this.props.toast.show?"addAnimate":""].join(" ")},this.props.toast.msg)},n}(i.Component);n.default=Object(s.b)(function(t){return{toast:t.toast}},function(t){return{changeToastState:function(n){return t(r.a.setToastStatus(e.a({},n)))}}})(c)},259:function(t,n,o){var e=o(260);"string"===typeof e&&(e=[[t.i,e,""]]);var i={hmr:!1,transform:void 0};o(117)(e,i);e.locals&&(t.exports=e.locals)},260:function(t,n,o){(t.exports=o(116)(!1)).push([t.i,".toast {\n  width: auto;\n  padding: 7px 12px;\n  background: red;\n  position: fixed;\n  display: inline-block;\n  top: -26px;\n  left: calc(50% - 30px);\n  color: #ccc;\n  background: #635e5e;\n  border-radius: 10px;\n  -webkit-transition: all 3s ease-in-out;\n  -o-transition: all 3s ease-in-out;\n  transition: all 3s ease-in-out;\n  font-size: 12px !important;\n  text-align: center;\n  white-space: nowrap; }\n  .toast:before {\n    margin-right: 5px; }\n\n.iconfont {\n  font-size: 12px; }\n\n.addAnimate {\n  -webkit-animation: topToBottom 3s ease;\n          animation: topToBottom 3s ease;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate; }\n\n@-webkit-keyframes topToBottom {\n  from {\n    top: -26px; }\n  to {\n    top: 60px; } }\n\n@keyframes topToBottom {\n  from {\n    top: -26px; }\n  to {\n    top: 60px; } }\n",""])}});