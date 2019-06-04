##css
###定位
position:absolute;根据父级定位
position:relative;根据自己原先所在位置定位

margin 塌陷：（父子）父（maigin-top）>子(maigin-top),子（maigin-top）不显示
margin合并：（兄弟）之间的margin-bottom和margin-top,只会显示其中大的margin
##bfc
使元素不会对外部元素发生影响
如：
1.防止margin合并
2.如果父元素没有设置宽高，就会被子元素撑起来，如果子元素浮动，会脱离文本流，父元素就撑不开了，变成一条线。所以可以给父元素设置bfc
3.可以阻止元素被浮动元素覆盖。
    <div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
	<div style="width: 200px; height: 200px;background: #eee;overflow:hidden;">我是一个没有设置浮动, 有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
bfc:
float:left/right(不为none)
position:absolute/fixed
display:inline-block,table-cell,table-caption,flex,inline-flex
over-flow:hidden(不为visible)

###单行文本溢出盒子...
	text-over-flow:ellipsis;
	text-flow:hidden;
	white-space:no-wrap;
###多行文本溢出...
目前没有特殊的处理方法，只能用height和line-height做限制
	text-over-flow:ellipsis;
	over-flow:hidden;
###网速不好，不加载css，依然能够访问网页
	text-indent:width
	over-flow:hidden;
	white-space:no-wrap;
@2.把盒子高度设置为0，图片填充在padding中，然后溢出隐藏
	height:0;
	padding-top:image-width;
	over-flow:hidden;
###a标签
锚点
	<a href="#btn"></a>
    <input type="button" id="btn">
----------------------
http://es6.ruanyifeng.com/#docs/set-map
##js
###reg
###游览器内核
|--游览器内核--|--shell内核（渲染引擎16ms  js引擎）--|
- google webkit/blink
- Firefox Gecko
- IE trident
- safari webkit
- Opera presto

###数据类型
原始值：number,boolean,string,undefined,null
引用值：array,object,function...
1/0 Infinity number
undefined=undefined
Inifinity=Infinity
NaN!=NaN
undefined,null 既不大于0也不小于0也不等于0
undefined,null,NaN,0,false,''这几个bool都是false
&& a=1&&2  a=2 ;a=0&&2  a=0
|| a=1||2  a=1 ;a=0||2  a=2

Number,把看起来不像数字的转化成NaN,把能转化成数字的转化成数字，如：true/false
Number(123aaa) NaN
Number(undefined) NaN
Number(a) NaN
parseInt(),只能把能转换成数字的转化成数字true/false不行
parseInt(123aaa) 123
parseInt(132,8) 132是8进制，要转化成10进制
‘132’.toString(16) 132是10进制，要转化成16进制
[^a]非a
^a 以a开头
能匹配多，就不匹配少，在后面？，就尽可能匹配少
n* {0,}
n+ {1,}
n? {0,1}
n{x}
n{x,y}

###函数预编译
###作用域链
继承模式
var inhert=(function(target,origin){
   function F(){};
   return function(){
          F.portotype=origin.prototype;
          target.prototype=new F();
          target.prototype.constructor=target;
          target.portotype.uber=origin;

}
}())
深拷贝
 function deepClone(origin,target){
            var target=target||{},
                toStr=Object.prototype.toString,
                arrStr="[object Array]"
            for(var prop in origin){
                if(origin.hasOwnProperty(prop)){
                    if(origin[prop]!==null&&typeof(origin[prop])=='object'){
                       if (toStr.call(origin[prop])==arrStr){
                           target[prop]=[]
                       }else{
                           target[prop]={}
                       }
                       deepClone(origin[prop],target[prop]);
                    }else{
                        target[prop]=origin[prop]
                    }
                }
            }
         }
        obj={
            "name":'xioa',
            "card":[1,2,3,"card1"],
            "son":{
                "name":"sonname"
            }
        }
        obj1=deepClone(obj)
重写typeof属性不满足需求，写type函数
 function type(target){
            var template={
                "[object Array]":"array",
                "[object Object]":"object",
                "[object Number]":"number-object",
                "[object String]":"string-object",
                "[object Boolean]":"boolean-object"
            }
            if(target===null){
                return null;
            }
            if(typeof(target)=="object"){
                var str=Object.prototype.toString.call(target);
                return template(str); 
            }else{
                return typeof target;
            }
        }
数组去重 注意此时当value值为0的情况
  array.prototype.unique=function(){
              var temp={},
                  arr=[],
                  len=this.length;
              for(var i = 0; i < len; i++){
                  if(!temp[this[i]]){
                      temp[this[i]] = "abc";
                      arr.push(this[i]);
                  }
              }
              return arr;
          }

###数组的几种常用方法
push,pop,unshitf(从前面增加)，shift(从前面减少)，sort,reverse,splice从第几个开始，切几个数，在切口处添加数字
concat,join(不传参按，连接)---split
###数组的排序方法重写
若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
若 a 等于 b，则返回 0。
若 a 大于 b，则返回一个大于 0 的值。

	升序
	arr.sort(function(a,b){
		return a-b;
	})
	乱序
	arr.sort(function(a,b){
		return Math.random()-0.5;
	})
###不可配置属性不可delete掉
var test=1;则test在window上，这种情况下，delete window.test 为false;一旦经历了var的操作，所得出的属性，window,这种属性叫做不可配置属性，不可配置属性delete不掉
###节点
parent.removeChild()这个只是剪切出来
child.remove()这个是真正的remove

滚动条滚动 window上有3个方法：scroll(x,y),scrollTo(x,y)   scrollBy(x,y):在原有数据基础上做滚动距离累加
###取消冒泡
e.stopPropagation	e.cancleBubble()
###取消默认事件
return false;
e.preventDefault()
e.returnValue=false
###防抖和节流
###数组去重，提供得一个新方法
	function dedupe(array){
		return Array.from(new Set(array));
	}
###深度优先遍历和广度优先遍历
###图的深度优先遍历和图的广度优先遍历
###深度优先拷贝函数&&广度优先拷贝函数