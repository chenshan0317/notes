##安装 mint-UI 只适用于Vue项目
npm i mint-ui -S
##引用
	全部引用组件
import Vue from 'vue'
import Mint from 'mint-ui'
Vue.use(Mint)



按需导入，可以安装一个babel-plugin-component插件
npm i babel-plugin-component -D
.babelrc文件
{
  "presets": ["env", "stage-0"],
  "plugins": ["transform-runtime", ["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
	按需引用组件
import Vue from 'vue'
import {Cell,Checklist} from 'mint-ui'
Vue.component(Cell.name,Cell)
Vue.component(Checklist.name,Checklist)

##MUI是代码片段，类似于bootstrap

##把项目托管到云中
先创建几个文件
.gitignore
	node_modules
	.idea
	.vscode
	.git
README.md
LICENSE 开源项目都有一个协议文件

git init
git add .
git commit -m 'commit'
git remote add origin master
git push origin master

vscode中默认集成git工具