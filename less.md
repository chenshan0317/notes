###less的作用
可以让css编写更加容易，简洁
###less的使用
node.js中使用less
    npm install -g less
    lessc style.less style.css

    当然，存在很多插件，可以把.less文件生成.css文件。在vsCode中，可以在扩展程序中下载easy less插件，重启vscode，此时写的less文件会自动在同目录生成对应的.css文件。
    如果想要配置一下，可以进入setting.json文件中进行配置（文件-首选项-设置）。也可以对这个文件夹中的less文件进行单独设置，先生成一个.vscode目录，用来存放配置文件的。至于生成的办法很多，我是随便按了下f5,启动调试，虽然调试失败，但是会自动生成这个文件，在.vscode文件夹中，添加一个配置文件名称settings.json
    {
	    "less.compile": {
		    "compress": true, // 是否删除多余空白字符
		    "sourceMap": false, // 是否创建文件目录树，true的话会自动生成一个 .css.map 文件
		    "out": false, // 是否输出css文件，false为不输出,也可以填写一个目录："${workspaceRoot}\\css\\"
		    "outExt": ".wxss", // 输出文件的后缀,默认为.css
	    }
    }

--------------------- 



在游览器中使用less
    <link rel="stylesheet/less" type="text/css" href="styles.less" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.8.1/less.min.js" ></script>
###less中的变量
    @width: 10px;
    @height: @width + 10px;
    
    #header {
      width: @width;
      height: @height;
    }
###less中的混合
    .bordered {
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    #menu a {
      color: #111;
      .bordered();
    }
    
    .post a {
      color: red;
      .bordered();
    }
###less中的嵌套
    #header {
      color: black;
      .navigation {
    	font-size: 12px;
      }
      .logo {
    	width: 300px;
      }
    }
###less中的运算
    // numbers are converted into the same units
    @conversion-1: 5cm + 10mm; // result is 6cm
    @conversion-2: 2 - 3cm - 5mm; // result is -1.5cm
    
    // conversion is impossible
    @incompatible-units: 2 + 5px - 3cm; // result is 4px
    
    // example with variables
    @base: 5%;
    @filler: @base * 2; // result is 10%
    @other: @base + @filler; // result is 15%
###less中给元素添加伪元素
    .btn{
    	&:hover{
    		color:red;
    	}
    }
###less中想混合几个属性
    .btn(){
    	.tab{
    		color:green;
    	}
    }
    
    #header a{
    	.btn.tab()
    }

----------------------------------------------
    #colors() {
      primary: blue;
      secondary: green;
    }
    
    .button {
      color: #colors[primary];
      border: 1px solid #colors[secondary];
    }