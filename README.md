## React+antd后台模板

学习了[《React全家桶+AntD共享单车后台管理系统》](https://coding.imooc.com/learn/list/236.html)，并同步实现教程中的功能。  
菜单、路由和导航和基础组件与老师的略有不同，通过自己的思路不断优化完善。  

这个项目完全是自己手写，而不是搬的源码。在工作中已经用antd-pro开发了一个项目了，学习这个教程的初衷是全面熟悉antd组件和React，扎实基础，并希望通过学习其它项目接触更多的编程思想。  

### 技术栈

 - react
 - antd
 - react-router
 - axios
 - redux
 - webpack
 
### 项目目录结构

src目录
assets----存储静态图片资源和共用icon图标  
config----配置文件  
components----存储共用组件  
pages----业务页面入口和常用模板  
redux----状态管理  
styles----公共样式  
utils----工具函数  
admin.js----admin路由页面  
common.js----common路由页面
router.js----路由管理

### 收获
对antd组件更加熟练，并封装了表单、表格组件和Layout布局组件  

### 后台实现
该项目涉及后台，使用的是本地部署的easymock，有机会再上传到云平台。

### 后续优化
1.本想用原生的fetch替代axios。查资料才知道fetch还有不少问题，而axios既提供了并发的封装，也没有fetch的各种问题，而且体积也较小，最终还是采用axios。  
