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
        ]
    }
```
##
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
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960' },

