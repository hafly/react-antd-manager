(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1147:function(e,n,a){"use strict";a.r(n),a.d(n,"default",function(){return y});a(321);var t=a(322),l=a.n(t),r=(a(95),a(94)),o=a.n(r),i=(a(153),a(65)),c=a.n(i),s=a(144),d=a(9),u=a(10),h=a(12),p=a(11),m=a(13),f=a(0),w=a.n(f),y=(a(329),function(e){function n(){var e,a;Object(d.a)(this,n);for(var t=arguments.length,l=new Array(t),r=0;r<t;r++)l[r]=arguments[r];return(a=Object(h.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(l)))).state={showModal1:!1,showModal2:!1,showModal3:!1,showModal4:!1},a.handleModal=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];a.setState(Object(s.a)({},e,n))},a.handleConfirm=function(e){c.a[e]({title:"\u786e\u8ba4",content:"\u4f60\u786e\u5b9a\u5b66\u4f1a\u4e86React\u4e86\u5417\uff1f",onOk:function(){console.log("Ok")},onCancel:function(){console.log("Cancel")}})},a}return Object(m.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){var e=this;return w.a.createElement("div",null,w.a.createElement(l.a,{title:"\u57fa\u7840\u6a21\u6001\u6846",className:"card-wrap"},w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleModal("showModal1",!0)}},"Open"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleModal("showModal2",!0)}},"\u81ea\u5b9a\u4e49\u9875\u811a"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleModal("showModal3",!0)}},"\u9876\u90e820px\u5f39\u6846"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleModal("showModal4",!0)}},"\u6c34\u5e73\u5782\u76f4\u5c45\u4e2d")),w.a.createElement(c.a,{title:"Open",visible:this.state.showModal1,onCancel:function(){return e.handleModal("showModal1",!1)}},w.a.createElement("p",null,"\u6b22\u8fce\u5b66\u4e60React\u8bfe\u7a0b")),w.a.createElement(c.a,{title:"\u81ea\u5b9a\u4e49\u9875\u811a",visible:this.state.showModal2,okText:"\u4e0b\u4e00\u6b65",cancelText:"\u7b97\u4e86",onCancel:function(){return e.handleModal("showModal2",!1)}},w.a.createElement("p",null,"\u6b22\u8fce\u5b66\u4e60React\u8bfe\u7a0b")),w.a.createElement(c.a,{title:"\u9876\u90e820px\u5f39\u6846",visible:this.state.showModal3,onCancel:function(){return e.handleModal("showModal3",!1)},style:{top:20}},w.a.createElement("p",null,"\u6b22\u8fce\u5b66\u4e60React\u8bfe\u7a0b")),w.a.createElement(c.a,{title:"\u6c34\u5e73\u5782\u76f4\u5c45\u4e2d",visible:this.state.showModal4,onCancel:function(){return e.handleModal("showModal4",!1)},wrapClassName:"vertical-center-modal"},w.a.createElement("p",null,"\u6b22\u8fce\u5b66\u4e60React\u8bfe\u7a0b")),w.a.createElement(l.a,{title:"\u4fe1\u606f\u786e\u8ba4\u6846",className:"card-wrap"},w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleConfirm("confirm")}},"Confirm"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleConfirm("info")}},"Info"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleConfirm("success")}},"Success"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleConfirm("error")}},"Error"),w.a.createElement(o.a,{type:"primary",onClick:function(){return e.handleConfirm("warning")}},"Warning")))}}]),n}(w.a.Component))},329:function(e,n,a){var t=a(330);"string"===typeof t&&(t=[[e.i,t,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};a(43)(t,l);t.locals&&(e.exports=t.locals)},330:function(e,n,a){(e.exports=a(42)(!1)).push([e.i,".card-wrap {\n  margin-bottom: 10px;\n}\n.card-wrap button {\n  margin-right: 10px;\n}\n/* modals */\n.vertical-center-modal {\n  text-align: center;\n  white-space: nowrap;\n}\n.vertical-center-modal:before {\n  content: '';\n  display: inline-block;\n  width: 0;\n  height: 100%;\n  vertical-align: middle;\n}\n.vertical-center-modal .ant-modal {\n  display: inline-block;\n  text-align: left;\n}\n/* carousel */\n.ant-carousel .slick-slide {\n  text-align: center;\n  height: 160px;\n  line-height: 160px;\n  background: #364d79;\n  overflow: hidden;\n}\n.ant-carousel .slick-slide h3 {\n  color: #fff;\n}\n.slider-wrap .ant-carousel .slick-slide {\n  height: 360px;\n}\n.slider-wrap .ant-carousel .slick-slide img {\n  width: 100%;\n}\n",""])}}]);