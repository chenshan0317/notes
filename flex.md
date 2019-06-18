1.flex容器display:flex;
6个属性：
flex-direction:row|row-reverse|column|column-reserve主轴的排列方向
flex-wrap:wrap|nowrap|wrap-reverse默认项目都排列在一条线上，如果排不下去，如何换行
flex-flow:flex-direction|flex-wrap的简写形式
justify-content:flex-start|flex-end|center|space-between|space-around主轴上的对齐方式
align-items:flex-start|flex-end|center|baseline|stretch交叉轴上的对齐方式
align-content：flex-start|flex-end|center|space-between|space-around|stretch定义了多根轴线的对齐方式，如果只有一根轴线，该属性根本不起作用

2.项目的属性
6个属性：
order:1 项目的排列顺序，越小排列越靠前，默认为0
flex-grow:0 项目的放大比例 默认为0
flex-shrink:0项目的缩小比例 默认为1
flex-basis:length|auto 像height和width一样，auto会占据多余默认空间
flex:flex-grow flex-shrink flex-basis
align-self:
