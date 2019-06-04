/**饼图封装开始
 * 
 var data = [
        {
            title: '15-20岁',
            num: 6
        },
        {
            title: '20-25岁',
            num: 30
        },
        {
            title: '25-30岁',
            num: 10
        },
        {
            title: '30以上',
            num: 8
        }
    ];
// var pieChart = new PieChart();
// pieChart.init(data);
修改之后 直接 new PieChart(data) 就行
 * **/
var PieChart=function(data,offsetX=0,offsetY=0,radius=150,outLine=20,space=20,rectW=30,rectH=16,ctx){
    this.ctx=ctx||document.querySelector('canvas').getContext('2d');
    this.radius=radius;
    this.offsetX=offsetX;
    this.offsetY=offsetY;
    this.outLine=outLine;
    this.space=space;
    this.rectH=rectH;
    this.rectW=rectW;
    this.x0=this.ctx.canvas.width/2+this.offsetX;
    this.y0=this.ctx.canvas.height/2+this.offsetY;
}
PieChart.prototype.init=function(data){
    // 1. 画饼  把数据转化成弧度
    // 2. 画指向线并描述
    // 3. 画矩形+描述
    this.drawPie(data);
}
PieChart.prototype.drawPie=function(data){
    this.transAngle(data);
    var startAngle=0;
    var that=this;
    data.forEach(function(item,i){
        var endAngle=startAngle+item.angle;
        that.ctx.beginPath();
        that.ctx.moveTo(that.x0,that.y0);
        that.ctx.arc(that.x0,that.y0,that.radius,startAngle,endAngle);
        that.ctx.closePath();
        var color=that.ctx.fillStyle=that.getRandomColor();
        that.ctx.fill();
        // 画线并描述
        that.drawLine(startAngle,item.angle,color,item.title);
        // 画矩形+描述
        that.drawRect(i,item.title)
        startAngle+=item.angle;
    })
}
PieChart.prototype.transAngle=function(data){
    var total=0;
    data.forEach(function(item,i){
        total+=item.num;
    })
    data.forEach(function(item,i){
        item.angle=(item.num/total)*2*Math.PI
    })
    return data;
}
PieChart.prototype.getRandomColor=function(){
    var r=Math.floor(Math.random()*266);
    var g=Math.floor(Math.random()*266);
    var b=Math.floor(Math.random()*266);
    return "rgb("+r+","+g+","+b+")";
}
PieChart.prototype.drawLine=function(startAngle,angle,color,title){
    var edge = this.radius + this.outLine;
    /*x轴方向的直角边*/
    var edgeX = Math.cos(startAngle + angle / 2) * edge;
    /*y轴方向的直角边*/
    var edgeY = Math.sin(startAngle + angle / 2) * edge;
    /*计算出去的点坐标*/
    var outX = this.x0 + edgeX;
    var outY = this.y0 + edgeY;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(outX, outY);
    this.ctx.strokeStyle = color;
    /*画文字和下划线*/
    /*线的方向怎么判断 伸出去的点在X0的左边 线的方向就是左边*/
    /*线的方向怎么判断 伸出去的点在X0的右边 线的方向就是右边*/
    /*结束的点坐标  和文字大小*/
    this.ctx.font = '14px Microsoft YaHei';
    var textWidth = this.ctx.measureText(title).width ;
    if(outX > this.x0){
        /*右*/
        this.ctx.lineTo(outX + textWidth,outY);
        this.ctx.textAlign = 'left';
    }else{
        /*左*/
        this.ctx.lineTo(outX - textWidth,outY);
        this.ctx.textAlign = 'right';
    }
    this.ctx.stroke();
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(title,outX,outY);
}
PieChart.prototype.drawRect=function(index,title){
    this.ctx.fillRect(this.space,this.space + index * (this.rectH + 10),this.rectW,this.rectH);
    /*绘制文字*/
    this.ctx.beginPath();
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.font = '12px Microsoft YaHei';
    this.ctx.fillText(title,this.space + this.rectW + 10 , this.space + index * (this.rectH + 10));
   
}
// 饼图封装结束

/****
 *  new Person()
 * 封装动画行走的人 开始
 */
var Person = function (src="image/04.png",stepSzie=10,num=4,ctx) {
    this.ctx = ctx || document.querySelector('canvas').getContext('2d');
    this.src = src;
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
    /*行走相关参数*/
    this.stepSzie = stepSzie;
    /* 0 前  1 左  2 右  3 后  和图片的行数包含的图片对应上*/
    this.direction = 0;
    /*x轴方向的偏移步数*/
    this.stepX =0;
    /*y轴方向的偏移步数*/
    this.stepY = 0;
    // num为默认一大张精灵图上有4张图
    this.num=num;
    /*初始化方法*/
    this.init();
};

Person.prototype.init = function () {
    var that = this;
    this.loadImage(function (image) {
        that.imageWidth = image.width;
        that.imageHeight = image.height;
        that.personWidth = that.imageWidth / that.num;
        that.personHeight = that.imageHeight /that.num;
        that.x0 = that.canvasWidth / 2 - that.personWidth / 2;
        that.y0 = that.canvasHeight / 2 - that.personHeight / 2;
        that.ctx.drawImage(image,
            0,0,
            that.personWidth,that.personHeight,
            that.x0,that.y0,
            that.personWidth,that.personHeight);

        /*3.能通过方向键去控制人物行走*/
        that.index = 0;
        document.onkeydown = function (e) {
            if(e.keyCode == 40){
                that.direction = 0;
                that.stepY ++;
                that.drawImage(image);
                /*前*/
            }else if(e.keyCode == 37){
                that.direction = 1;
                that.stepX --;
                that.drawImage(image);
                /*左*/
            }else if(e.keyCode == 39){
                that.direction = 2;
                that.stepX ++;
                that.drawImage(image);
                /*右*/
            }else if(e.keyCode == 38){
                that.direction = 3;
                that.stepY --;
                that.drawImage(image);
                /*后*/
            }
        }
    });
}
/*加载图片*/
Person.prototype.loadImage = function (callback) {
    var image = new Image();
    image.onload = function () {
        callback && callback(image);
    };
    image.src = this.src;
};
/*绘制图片 */
Person.prototype.drawImage = function (image) {
    this.index ++;
    /*清除画布*/
    this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    /*绘图*/
    /*在精灵图上的定位 x  索引*/
    /*在精灵图上的定位 y  方向*/
    this.ctx.drawImage(image,
        this.index * this.personWidth,this.direction * this.personHeight,
        this.personWidth,this.personHeight,
        this.x0 + this.stepX * this.stepSzie ,this.y0 + this.stepY * this.stepSzie,
        this.personWidth,this.personHeight);
    /*如果索引超出了 变成0*/
    if(this.index >= this.num-1){
        this.index = 0;
    }
};

// 动画 行走的人结束

/**
 * 移动手机端 轮播图 封装 
 *  var banner = document.querySelector('.jd_banner');
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    new Banner(banner,imageBox,pointBox)
 */
var Banner=function(container,imageBox,pointBox,transTime=0.2,interval=3000){
    this.width=banner.offsetWidth;//元素相对父级的偏移
    this.imageBox=imageBox;
    this.points=pointBox.querySelectorAll('li');
    this.transTime=transTime;//进行过渡时的过渡时间
    this.interval=interval;
    this.timer=0;
    this.index=1;//当前图片索引
    this.slideImage();
    this.imageTouchEvent();
}
Banner.prototype.addTransition=function(){
    this.imageBox.style.transition = 'all '+this.transTime+'s';
    this.imageBox.style.webkitTransition = 'all '+this.transTime+'s';
}
Banner.prototype.removeTransition=function(){
    this.imageBox.style.transition = 'none';
    this.imageBox.style.webkitTransition = 'none';
}
Banner.prototype.setTranslateX=function(translateX){
    this.imageBox.style.transform = 'translateX(' + translateX + 'px)';
    this.imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
}
Banner.prototype.slideImage=function(){
    /*程序的核心 this.index */
    var that=this;
    that.timer = setInterval(function () {
        that.index++;
        /*加过渡*/
        that.addTransition();
        /*做位移*/
        that.setTranslateX(-that.index * that.width);
    }, that.interval);
    /*需要等最后一张动画结束去判断 是否瞬间定位第一张*/
    this.imageBox.addEventListener('transitionend', function () {
        /*自动滚动的无缝*/
        if (that.index >= 9) {
            that.index = 1;
            /*瞬间定位*/
            /*清过渡*/
            that.removeTransition();
            /*做位移*/
            that.setTranslateX(-that.index * that.width);
        }
        /*滑动的时候也需要无缝*/
        else if (that.index <= 0) {
            that.index = 8;
            /*瞬间定位*/
            /*清过渡*/
            that.removeTransition();
            /*做位移*/
            that.setTranslateX(-that.index * that.width);
        }
        /*根据索引设置点*/
        /*此时此刻  this.index  的取值范围  1-8（0,8--1,9）*/
        /*点索引  this.index - 1 */
        that.setPoint();
});
}
Banner.prototype.setPoint = function () {
        /*this.index 1-8*/
        /*清除样式*/
        for (var i = 0; i < this.points.length; i++) {
            var obj = this.points[i];
            obj.classList.remove('now');
        }
        /*给对应的加上样式*/
        this.points[this.index - 1].classList.add('now');
    }
Banner.prototype.imageTouchEvent=function(){
    that=this;
    /*绑定事件*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    this.imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(that.timer);
        /*记录起始位置的X坐标*/
        startX = e.touches[0].clientX;
    });
    this.imageBox.addEventListener('touchmove', function (e) {
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移  不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -that.index * that.width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        that.removeTransition();
        that.setTranslateX(translateX);
        isMove = true;
        
    });
    this.imageBox.addEventListener('touchend', function (e) {
        /*4.  5.  实现*/
        /*要使用移动的距离*/
        if (isMove) {
            if (Math.abs(distanceX) < that.width / 3) {
                /*吸附*/
                that.addTransition();
                that.setTranslateX(-that.index * that.width);
            } else {
                /*切换*/
                /*右滑动 上一张*/
                if (distanceX > 0) {
                    that.index--;
                }
                /*左滑动 下一张*/
                else {
                    that.index++;
                }
                /*根据this.index去动画的移动*/
                that.addTransition();
                that.setTranslateX(-that.index *that.width);
                console.log(that.index)
            }
            
        }
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            that.index++;
            /*加过渡*/
            that.addTransition();
            /*做位移*/
            that.setTranslateX(-that.index * that.width);
        }, that.interval);
    });
}

    //移动端 轮播图 封装结束

// 封装ajax
// 测试调用
var sendData = {name:'asher',sex:'male'};
Ajax('get', 'data/data.html', sendData, function(data){
    console.log(data);
}, function(error){
    console.log(error);
});


function Ajax(type,url,data,success,failed){
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest()
    }else{
        xhr=new ActiveXObject('Microsoft.XMLHTTP')
    }

    var type=type.toUpperCase()
    // 用于清缓存
    var random=Math.random()

    if(typeof(data)=='object'){
        var str='';
        for(var item in data){
            str+=item+"="+data[item]+"&";
        }
        data=str.replace(/&$/,'')
    }

    if(type=='GET'){
        if(data){
            xhr.open('GET',url+'?'+data,true)
        }else{
            xhr.open('GET',url+'?t='+random,true)
        }
        xhr.send()
    }else if(type=="POST"){
        xhr.open('POST',url,true)
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(data)
    }
    /*
    ** 每当readyState改变时，就会触发onreadystatechange事件
    ** readyState属性存储有XMLHttpRequest的状态信息
    ** 0 ：请求未初始化
    ** 1 ：服务器连接已建立
    ** 2 ：请求已接受
    ** 3 : 请求处理中
    ** 4 ：请求已完成，且相应就绪
    */
    // 处理返回的数据
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                success(xhr.responseText)
            }else{
                if(failed){
                    failed(xhr.status)
                }
            }
        }
    }
}


    // 封装ajax结束

    // ###继承的封装
function extend(subClass,superClass){
	var F=function(){}
	F.prototype=superClass.prototype
	subClass.prototype=new F()
	subClass.prototype.constructor=subClass

	subClass.superclass=superClass.prototype
}
// ###克隆的封装
function clone(object){
		function F(){}
		F.prototype=object
		return new F;
}
//###数组去重的一种简单方法封装
function dedupe(array){
    return Array.from(new Set(array));
    // 或者return [...new Set(array)]
}

// ###节点深度遍历的三种方法
// 1 2 .递归
function deepTravelsall(parentNode,nodeList=[]){
    if(parentNode==null) return;
    nodeList.push(parentNode);
    let children=parentNode.children;
    for(let i=0;i<=children.length-1;i++){
        deepTravelsall(children[i],nodeList);
    }
    return nodeList;
}

function deepTravelsall(parentNode){
    let nodeList=[];
    if(parentNode==null) return;
    nodeList.push(parentNode);
    let children=parentNode.children;
    for(let i=0;i<=children.length-1;i++){
        nodeList=nodeList.concat(deepTravelsall(i))
    }
    return nodeList;
}
// 3 非递归深度遍历
// node = [] stack = [parent]
// node = [parent] stack = [child3,child2,child1]
// node = [parent, child1] stack = [child3,child2,child1-2,child1-1]
// node = [parent, child1-1] stack = [child3,child2,child1-2]
function deepTravelsall(parentNode){
    let strack=[];
    let nodeList=[];
    if(parentNode==null) return;
    strack.push(parentNode);
    while(strack.length){
        let item=strack.pop();
        let children=item.children;
        nodeList.push(item)
        for(let i=children.length-1;i>=0;i--){
            strack.push(children[i])
        }
    }
    return nodeList;
}

// 广度优先遍历
// nodes = [] stack = [parent]
// nodes = [parent] stack = [child1,child2,child3]
// nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
// nodes = [parent,child1,child2]
function widthTravelsall(parentNode){
    let nodeList=[];
    let strack=[];
    if(parentNode==null) return;
    strack.push(parentNode);
    while(strack.length){
        let item=strack.shift();
        let children=item.children;
        nodeList.push(item);
        for(let i=0;i<children.length-1;i++){
            strack.push(children[i])
        }
    }
    return nodeList;
}

