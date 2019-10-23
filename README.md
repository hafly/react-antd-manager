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

/public/assets----存储静态图片资源和共用icon图标(放在public中不会被打包到js)  
src目录
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
2.图片引用路径有些地方要./，有些又要/才行，网上找了很久没有实际的解决办法。  
3.添加打包分析插件webpack-bundle-analyzer  
4.通过打包插件分析，打包后有3.6MB多，发现antd并没有实现按需加载，现已实现，需要引入babel-plugin-import；  
antd的icon生成的dist比较大，有600多k，通过官方github上的方法已解决按需加载；  
发现echarts也没实现按需加载，echarts-for-react也要按需加载才能实现。  
经过上面的打包优化后，打包只有2.1MB了。  
5.现在代码全部打包到一个包里的，首次加载速度可能较慢，通过Route-based code splitting 打包代码拆分，进一步提高首次加载速度。  
