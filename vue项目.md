1.已安装node npm
2.项目结构构建
  npm i vue-cli -g 
  vue init webpack sell 创建项目sell的结构
  npm install 安装相关得包
  npm run dev 访问localhost:8080端口，项目启动成功
3.项目结构
webpack配置相关：
	bulid
	config
src 存放源码
static 存放静态资源
4.webpack打包
5.需求分析


jsonview插件，让游览器上的json格式化
项目：
1.把svg图片搞成字体图标
2.mock后台数据
	1.data.json文件
	2.在webpack.dev.conf.js文件中
	const express = require('express')
	const app = express()//请求server
	var appData = require('../data.json')//加载本地数据文件
	var seller = appData.seller//获取对应的本地数据
	var goods = appData.goods
	var ratings = appData.ratings
	var apiRoutes = express.Router()
	app.use('/api', apiRoutes)//通过路由请求数据

	devServer: {
    
    watchOptions: {
      poll: config.dev.poll,
    }，
     //第二步找到devServer,在里面添加
	before(app) {
	  app.get('/api/seller', (req, res) => {
	    res.json({
	      errno: 0,
	      data: seller
	    })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
	  }),
	  app.get('/api/goods', (req, res) => {
	    res.json({
	      errno: 0,
	      data: goods
	    })
	  }),
	  app.get('/api/ratings', (req, res) => {
	    res.json({
	      errno: 0,
	      data: ratings
	    })
	  })
	}
	  }
	3.npm dev run
	这样在前台就能通过 地址访问模拟的数据了



 

