插件 koroFileHeader可以在构造函数头尾插入注释
插件 vetur插件，可使得.vue文件高亮显示和提示功能
###作用
解决各个包之间的复杂的依赖关系
##安装
npm i webpack -g 全局安装
npm i webpack --save-dev安装到项目中
##案例 webpack打包
npm init
npm i jquery --save 安装jquery类库
创建main.js文件
创建index.html文件
在mian.js中：
```
	// 导入jquery类库
    import $ from 'jquery'

    // 设置偶数行背景色，索引从0开始，0是偶数
    $('#list li:even').css('backgroundColor','lightblue');
    // 设置奇数行背景色
    $('#list li:odd').css('backgroundColor','pink');
```
webpack src/js/main.js dist/bundle.js
这样，页面中引入的main.js文件就能直接用bundle.js代替了，也能识别


#webpack配置文件打包，简化命令webpack
创建webpack.config.js文件
```
    // 导入处理路径的模块
    var path = require('path');

    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
        entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        }
    }
```
#实时打包编译webpack-dev-server
实时编译
npm i webpack-dev-server --save-dev
要借助package.json中scripts下新增"dev":"webpack-dev-server --contentBase src"来打包
此时的bundle.js为内存中的js，需修改<script src="bundle.js"></script>
npm run dev
#比较繁琐，需要指定启动的目录，同时还要修改index.html中script标签中的src属性，
用html-webpack-plugin插件，可指定目录--contentBase中的目录和不用引入bundle.js文件
```
    // 导入处理路径的模块
    var path = require('path');
    // 导入自动生成HTMl文件的插件
    var htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        },
        plugins:[ // 添加plugins节点配置插件
            new htmlWebpackPlugin({
                template:path.resolve(__dirname, 'src/index.html'),//模板路径
                filename:'index.html'//自动生成的HTML文件的名称
            })
        ]，
resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径，这样可以直接import Vue from "vue"而不用import Vue from "/vue/dist/vue.js"
      // "vue$": "vue/dist/vue.js"
    }
  }
    }
```
##--hot 实现游览器无刷新跟新
```
"dev": "webpack-dev-server --hot --port 4321 --open"
```
### 方式2：
1. 修改`webpack.config.js`文件，新增`devServer`节点如下：
```
devServer:{
        hot:true,
        open:true,
        port:4321
    }
```
##使用webpack打包css文件
npm i style-loader css-loader --save-dev
```
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```

npm i less-loader less -D
```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```
npm i sass-loader node-sass --save-dev
```
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```
使用webpack处理css中的路径
1. 运行`cnpm i url-loader file-loader --save-dev`
2. 在`webpack.config.js`中添加处理url路径的loader模块：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```
3. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&[hash]-[name].[ext]' },

##使用babel处理高级js语法
1. 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel的相关loader包
2. 运行`cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```
{
    "presets":["es2015", "stage-0"],
    "plugins":["transform-runtime"]
}
```
5. **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**

##

// 在webpack 中尝试使用 Vue：
// 注意： 在 webpack 中， 使用 import Vue from 'vue' 导入的 Vue 构造函数，功能不完整，只提供了 runtime-only 的方式，并没有提供 像网页中那样的使用方式；
import Vue from 'vue'
// import Vue from '../node_modules/vue/dist/vue.js'
// 回顾 包的查找规则：
// 1. 找 项目根目录中有没有 node_modules 的文件夹
// 2. 在 node_modules 中 根据包名，找对应的 vue 文件夹
// 3. 在 vue 文件夹中，找 一个叫做 package.json 的包配置文件
// 4. 在 package.json 文件中，查找 一个 main 属性【main属性指定了这个包在被加载时候，的入口文件】

为了使用vue中默认的这种runtime-only方式，只能创建一个Vue模板方式，用原来的那种方式不行。方法如下总结：

// 总结梳理： webpack 中如何使用 vue :
// 1. 安装vue的包：  cnpm i vue -S
// 2. 由于 在 webpack 中，推荐使用 .vue 这个组件模板文件定义组件，所以，需要安装 能解析这种文件的 loader    cnpm i vue-loader vue-template-complier -D
// 3. 在 main.js 中，导入 vue 模块  import Vue from 'vue'
// 4. 定义一个 .vue 结尾的组件，其中，组件有三部分组成： template script style
// 5. 使用 import login from './login.vue' 导入这个组件
// 6. 创建 vm 的实例 var vm = new Vue({ el: '#app', render: c => c(login) })
// 7. 在页面中创建一个 id 为 app 的 div 元素，作为我们 vm 实例要控制的区域；

##在vue组件页面中，集成vue-router路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from './components/account/login.vue'
var router = new VueRouter({

  routes: [

    { path: '/', redirect: '/login' },

    { path: '/login', component: login },

    { path: '/register', component: register }

  ]

});
var vm = new Vue({

  el: '#app',

  // render: c => { return c(App) }

  render(c) {

    return c(App);

  },

  router // 将路由对象，挂载到 Vue 实例上

});

###组件style标签中的lang属性和scoped属性
在style标签中写的style属性，会让所有元素有这个属性，而不是只针对这个模板有这个属性，可以<style scoped></style>
在style标签中只能写普通的css样式，如果要写scss样式的，设置lang属性：<style lang="scss"></style>
