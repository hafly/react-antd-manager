(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1158:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return V});a(360);var n=a(361),l=a.n(n),r=(a(153),a(65)),i=a.n(r),c=(a(365),a(366)),o=a.n(c),u=(a(95),a(94)),s=a.n(u),m=(a(321),a(322)),d=a.n(m),p=(a(344),a(345)),E=a.n(p),h=a(9),y=a(10),v=a(12),b=a(11),f=a(13),O=(a(355),a(350)),g=a.n(O),w=(a(347),a(348)),j=a.n(w),S=a(0),C=a.n(S),_=a(96),x=a(97),I=j.a.Item,k=g.a.Option,V=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(l)))).state={loading:!0,dataSource:[],isShowOpenCity:!1},a.params={page:1},a.handleOpenCity=function(){a.setState({isShowOpenCity:!0})},a.handleSubmit=function(){var e=a.cityForm.props.form.getFieldsValue();_.a.ajax({url:"/city/open",data:e}).then(function(e){E.a.success(e.message),a.setState({isShowOpenCity:!1}),a.requestList()})},a}return Object(f.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){this.requestList()}},{key:"requestList",value:function(){var e=this;this.setState({loading:!0,dataSource:[]}),_.a.ajax({url:"/open_city",data:{page:this.params.page}}).then(function(t){var a=t.data;a.rows.map(function(e,t){return e.key=t}),e.setState({loading:!1,dataSource:a.rows,pagination:x.a.pagination(a,function(t){e.params.page=t,e.requestList()})})})}},{key:"render",value:function(){var e=this,t=[{title:"\u57ce\u5e02ID",dataIndex:"id"},{title:"\u57ce\u5e02\u540d\u79f0",dataIndex:"name"},{title:"\u7528\u8f66\u6a21\u5f0f",dataIndex:"mode"},{title:"\u8fd0\u8425\u6a21\u5f0f",dataIndex:"op_mode"},{title:"\u6388\u6743\u52a0\u76df\u5546",dataIndex:"franchisee_name"},{title:"\u57ce\u5e02\u7ba1\u7406\u5458",dataIndex:"city_admins",render:function(e){return e.map(function(e){return e.user_name}).join(",")}},{title:"\u57ce\u5e02\u5f00\u901a\u65f6\u95f4",dataIndex:"open_time"},{title:"\u64cd\u4f5c\u65f6\u95f4",dataIndex:"update_time",render:function(e){return x.a.formatDate(e)}},{title:"\u64cd\u4f5c\u4eba",dataIndex:"sys_user_name"}];return C.a.createElement(l.a,{spinning:this.state.loading},C.a.createElement(d.a,null,C.a.createElement(D,null)),C.a.createElement(d.a,{style:{marginTop:10,borderBottom:0}},C.a.createElement(s.a,{type:"primary",onClick:this.handleOpenCity},"\u5f00\u901a\u57ce\u5e02")),C.a.createElement("div",{className:"content-wrap",style:{borderTop:0}},C.a.createElement(o.a,{columns:t,dataSource:this.state.dataSource,pagination:this.state.pagination})),C.a.createElement(i.a,{title:"\u5f00\u901a\u57ce\u5e02",width:360,visible:this.state.isShowOpenCity,onCancel:function(){e.setState({isShowOpenCity:!1})},onOk:this.handleSubmit},C.a.createElement(F,{wrappedComponentRef:function(t){e.cityForm=t}})))}}]),t}(C.a.Component),D=function(e){function t(){return Object(h.a)(this,t),Object(v.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return C.a.createElement(j.a,{layout:"inline"},C.a.createElement(I,{label:"\u57ce\u5e02"},e("city_id",{initialValue:""})(C.a.createElement(g.a,{placeholder:"\u5168\u90e8",style:{width:100}},C.a.createElement(k,{value:""},"\u5168\u90e8"),C.a.createElement(k,{value:"1"},"\u5317\u4eac\u5e02"),C.a.createElement(k,{value:"2"},"\u5929\u6d25\u5e02"),C.a.createElement(k,{value:"3"},"\u91cd\u5e86\u5e02")))),C.a.createElement(I,{label:"\u7528\u8f66\u6a21\u5f0f"},e("defaultTime",{initialValue:"0"})(C.a.createElement(g.a,{placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4",style:{width:124}},C.a.createElement(k,{value:"0"},"\u65e0\u9ed8\u8ba4\u65f6\u95f4"),C.a.createElement(k,{value:"1"},"\u5f53\u524d\u5929\u524d30\u5929"),C.a.createElement(k,{value:"2"},"\u5f53\u592913\u65e5\u524d-\u5f53\u59292\u65e5\u524d")))),C.a.createElement(I,{label:"\u8fd0\u8425\u6a21\u5f0f"},e("op_mode",{initialValue:""})(C.a.createElement(g.a,{placeholder:"\u5168\u90e8",style:{width:100}},C.a.createElement(k,{value:""},"\u5168\u90e8"),C.a.createElement(k,{value:"1"},"\u81ea\u8425"),C.a.createElement(k,{value:"2"},"\u52a0\u76df")))),C.a.createElement(I,{label:"\u52a0\u76df\u5546\u6388\u6743\u72b6\u6001"},e("auth_status",{initialValue:""})(C.a.createElement(g.a,{placeholder:"\u5168\u90e8",style:{width:100}},C.a.createElement(k,{value:""},"\u5168\u90e8"),C.a.createElement(k,{value:"1"},"\u5df2\u6388\u6743"),C.a.createElement(k,{value:"2"},"\u672a\u6388\u6743")))),C.a.createElement(I,null,C.a.createElement(s.a,{type:"primary",style:{margin:"0 20px"}},"\u67e5\u8be2"),C.a.createElement(s.a,null,"\u91cd\u7f6e")))}}]),t}(C.a.Component);D=j.a.create()(D);var F=function(e){function t(){return Object(h.a)(this,t),Object(v.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t={labelCol:{span:5},wrapperCol:{span:19}};return C.a.createElement(j.a,{layout:"horizontal"},C.a.createElement(I,Object.assign({label:"\u9009\u62e9\u57ce\u5e02"},t),e("city_id",{initialValue:"1"})(C.a.createElement(g.a,null,C.a.createElement(k,{value:""},"\u5168\u90e8"),C.a.createElement(k,{value:"1"},"\u5317\u4eac\u5e02"),C.a.createElement(k,{value:"2"},"\u5929\u6d25\u5e02")))),C.a.createElement(I,Object.assign({label:"\u8fd0\u8425\u6a21\u5f0f"},t),e("op_mode",{initialValue:"1"})(C.a.createElement(g.a,null,C.a.createElement(k,{value:"1"},"\u81ea\u8425"),C.a.createElement(k,{value:"2"},"\u52a0\u76df")))),C.a.createElement(I,Object.assign({label:"\u7528\u8f66\u6a21\u5f0f"},t),e("use_mode",{initialValue:"1"})(C.a.createElement(g.a,null,C.a.createElement(k,{value:"1"},"\u6307\u5b9a\u505c\u8f66\u70b9"),C.a.createElement(k,{value:"2"},"\u7981\u505c\u533a")))))}}]),t}(C.a.Component);F=j.a.create()(F)}}]);