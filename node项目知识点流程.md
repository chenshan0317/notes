todomvc.com
art design pro蚂蚁金服的一个前端界面

$_SERVER['PHP_SELF'] 当前的url地址
$_SERVER['REQUEST_METHOD']


1.数据库基本操作
	$connection=mysqli_connect("127.0.0.1","root","12345","demo")
	$query=mysqli_query($connect,"select * from users")
	// $row=mysqli_fetch_assoc($query);//每次只能取一行
	while($row=mysqli_fetch_assoc($query)){};
	mysqli_free_result($query);
	mysqli_close($connection);
2.php中操作Cookie
	//但是一般不这样,因为header函数在设置键值时，会出现覆盖情况
	header('Set-Cookie:foo=bar;foo1=bar1');//服务端通过响应头把cookie给客户端
	//专门用于设置cookie的,可以只传一个参数key，传一个是删除（原理：设置过期时间是一个过去时间）
	setcookie('key','value'，'设置cookie的过期时间'，'path'，domain,secure（false）,httponly(false）);不传递第三个参数，就是会话级cookie,即关闭游览器就会自动删除
	                                                                 第四个参数，就是该路径下的所有文件都能访问这个cookie(cookie的作用范围)
	                                                                 第五个参数，cookie的作用域名范围，域名下的所有子域名都能访问
	setcookie('key1','value2');
	//取cookie的方式，可以访问客户端提交过来的cookie
	$_COOKIE
	
3.js中操作cookie(httponly js访问不到)
		document.cookie      获取cookie
		document.cookie='foo=bar'  设置cookie
		
4.php中操作session
	session_start()//开启session,也可以通过配置文件开启
	session
	unset($_SESSION['name'])
	$_SESSION
5.两种方式不想看到广告
	第一种：通过a链接到另一个php页面，在这个php页面设置cookie,然后在前台页面展示的时候判断，有cookie,就不展示广告页面
	第二种，直接通过a标签？后的参数传递给原页面，如果点击了a标签，传递了此参数，则不现实广告页面。

6.ajax(用户编程)
	var xhr=new XMLHttpRequest()//安装游览器
	   第三个参数为sync，默认为true
	xhr.open('GET','a.php'，ture)//打开游览器，输入网址   设置了请求行;  
	  xhr.setRequestHeader('foo','bar') 设置了请求头；
	  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')一旦请求体是urlencoded格式的，一定要设置'Content-Type','application/x-
	xhr.send()  设置了请求体；
	//接受响应
	xhr.onreadystatechange=function(){
		console.log(this.readyState);
		响应行 this.status;
	}
	state:
		0 初始化 创建请求代理对象
		1 open()方法已经被调用。建立一个与服务端特定端口的连接
		2 已经接受到了响应报文的响应头；可以拿到头getAllResponseHeaders()，但是拿不到体responseText()
		3 正在下载响应报文的响应体
		4 相应体已经下载ok
		
	//onload事件是HTML5 中提供的XMLRequestRuest version2.0定义的
	onload事件 就相当于onreadystatechange=4时候的状态，
	
7.线程和进程
	进程：进行中的程序；
	线程：专业上是 CPU 最小执行单元
	
	
8.模板引擎的渲染和使用art-template
	var context={comments:res.data}模板所需要的数据
	var html=template('tmpl',context)第一个参数为模板的id
	
9.ajax的封装
	function ajax(method,url,params,done){
		method=method.toUpperCase();
		var arr=[];
		for(var item in params){
			arr.push(item+"="+params[item]);
		}
		var querystring=arr.join('&');
		
		var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject(Microsoft.XMLHTTP);
		if(method==='GET'){
			url+='?'+querystring;
		}
		xhr.open(method,url);
		data=null;
		if(method==='POST'){
			xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
			data=querystring;
		}
		xhr.send(data);
		
		xhr.onreadystatechange=function(){
			if(this.readyState!==4) return;
			try{
				done(JSON.parse(this.responseText));
			}catch(e){
				done(this.responseText)
			}
		}
	}
	
	
10.jquery中的ajax
	$.ajax({
		url:'./get.php',
		type:'get',
		dataType:'json',这个其实是服务端响应体的类型Content-type:application/json
		data:{id:1},
		beforeSend:function(xhr){},
		success:function(data){},
		error:function(err){},
		complete:function(){}
	})
	jquery内部帮忙实现了，服务端设置了content-type:application/json,responseText会帮忙转换成json,而原生的里面即使设置了，responseText始终是string类型。
	
	高度封装的：
	$.get('time.php',{id:1},function(res){});
	$.post('time.php',{id:1},function(res){});
	$.getJSON('time.php',{id:1},function(res){});这个就是不管服务端设置的响应类型是什么，拿到的response都是json格式
	
		
	
11.	load 应用场景：界面的局部刷新
	$(function($){
		//入口函数的作用，就是有一个独立的作用域，传$，就是用了局部变量，不传，用的就是全局变量
		$(.item).on('click',function(){
			var url=$(this).attr('href');
			$('#main').load(url+' #main>*');元素里面载入一个页面，没必要整个页面一起载入
			return false;
		})
	})

全局事件处理函数：
	$(document).ajaxStart(function(){})只要有ajax请求发生，就会执行，避免了很多次ajax请求时，要处理的函数太多，维护麻烦
	.ajaxStop()
	
nprogress 进度条 引入他的js css
	$(document).ajaxStart(function(){
		NProgress.start();
	}).ajaxStop(function(){
		NProgress.done();
	})


12.跨域
	正是因为ajax不能请求跨域，才出现了jsonp的概念，ajax和jsonp没有半毛钱关系。
	
	同源策略：两个url地址之间，只有域名，协议，端口完全相同，才叫同源；而只有同源的地址之间，才能发送ajax请求
	img link iframe可以载入另一个页面 script  他们都可以自己发请求，而表单 a 标签必须点一下才可以发请求
	img可以 发送 不同源地址之间请求img=new Image();img.src='';但是无法拿到响应结果
	script标签解决跨域问题的原理：
		服务端发送的是以json格式的，但是客户端script引入要以js格式，才能执行。
		所以，服务端这里以一个变量的形式var a={...}返回，这样script标签引入就可以执行
		但，由于异步的原因，很有可能会报错
		所以这里用到了函数回调，服务端这样返回func(a)，客户端再写一个func函数，这样就可以避免异步的问题
		
		当然还有第二种方法，一句话就可以解决：ajax请求不是会出现跨域不能请求的问题嘛？他会报错，那就直接在服务端加上这样一句话：header("Content-Type:cross...."),同样是返回json格式
		
		jquery中封装的jsonp如何使用：
		$.ajax({
			url:'',
			dataType:'jsonp',
			success:function(){}
		})
	
13.项目搭建
	内容管理系统：
	全球40%的网站都是用wordpress
	博客管理系统typecho
	
	服务器的搭建，修改http-vhosts文件，修改hosts文件，重启apache
	php中的一些数据库扩展打开，pdo...
	
	墨刀（移动端）/AXure 原型设计工具
	技术选型，数据库设计，项目架构设计，业务迭代开发，集中测试，部署上线
	OTO线上对线下 送餐订餐  BTC :business to customer BTB: business to business
	
	php+mysql
	jquery+bootstroop+plugin+NProgress
	1.项目结构搭建
		前台（面向用户）访问地址：
			前台访问地址：https://www.wedn.net/
			后台访问地址：http://admin.wedn.net/
		后台（面向管理员）访问地址：
			前台访问地址：https://www.wedn.net/
			后台访问地址：http://admin.wedn.net/admin/
		建立文件夹：admin(index.php) ,static(静态文件) :包含 assets uploads,index.php
		配置apache虚拟主机：...
		为了防止访问前端页面（没有index）的时候，出现文件夹，可以把虚拟文件配置时候的Options Indexes FollowSymLinks 中的Indexes去掉
		
		有多少个页面，就有多少个php文件去处理
	2.静态页面数据整合（直接放进去）项目配置文件
		项目中新建配置文件php文件   我们项目中用到的配置信息：
			<?php
				define('BD_HOST','localhost');
				define('DB_USER','root');
				define('DB_PASS','12345');
				define('DB_NAME','blog');
		在另一个页面载入这个配置文件
		<?php
			require_once 'config.php';  require 和require_once
		?>
	3.错误信息的显示
		如果在php文件发生错误是，如果页面上不提示错误信息，只是提示500 Internal Server Error,应该是PHP配置的问题，解决方案就是，找到php.ini配置文件，将
		display_errors=on
	4.批量整合后台页面
		把静态页面.html页面变成动态页面.php
		cmd 路劲 把路径下所有的html页面重命名为php页面：ren *.html *.php
		更改里面link里的路劲问题，find advanced->In Parent Folder(好像必须要装什么插件)
		
	5.抽离页面公共区域
		新建inc文件夹 新建公共页面的文件 （这里可能有多个公共文件）
			<?php include 'inc/sitebar.php'; ?>
	
	
	6.侧边栏高亮显示
		客户端请求文件-》index.php载入->sitebar.php，所以，index里面定义的变量，sitebar里也能访问
		$current_page=...
		为了防止错误，可在侧边栏里这样定义一下：$current_page=isset($current_page)?$current_page:'';
		另一种方法：也可使用$_SERVER['PHP_SELF'];
	
	
	
	
	




	