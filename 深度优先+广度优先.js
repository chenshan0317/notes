// 1.深度优先遍历思路
// 当只有一个节点时：
// 当有子节点时：
var arr=[];
function deepTravelsal(dom){
    if(!dom) return;
    if(dom.children.length==0){
        arr.push(dom);
        return arr;
    }
    arr.push(dom);
    for(let i=0;i<dom.children.length;i++){
        deepTravelsal(dom.children[i]);
    }
}


// 2.深度优先非遍历思路
/**
 * 每次把节点遍历出来后，放到stack中，然后再把stack中的第一个元素提出来，遍历他的子元素，放到stack前面，这样，就形成了深度遍历
 * arr=[1] stack=[2,3]
 * arr[1,2] stack=[4,5,3]
 */
var arr=[],
    stack=[];
function deepTravelsal(dom){
    var node=dom;
    while(node){
        arr.push(node);
        for(let i=node.children.length-1;i>=0;i--){
            stack.unshift(node.children[i]);
        }
        node=stack.shift();
    }
}


// 广度优先非遍历思想
/**
 * 每次把节点遍历出来后，放到stack中，然后再取一个节点，遍历他的子元素，放到stack后面。直到这个子元素没有子元素了
 * stack[2,3]
 * stack[3,4,5]
 */
arr=[];
stack=[];
function travelsalBFSDom(dom){
    var node=dom;
    while(node){
        arr.push(node);
        for(let i=0;i<node.children.length;i++){
            stack.push(node.children[i]);
        }
        node=stack.shift();
    }
}
// 广度优先的遍历思路
arr=[];
stack=[];
function travelsalBFSDom(dom){
    if(!dom) return;
    for(let i=0;i<dom.children.length-1;i++){
        arr.push(dom.children[i]);
        stack.push(dom.children[i]);
    }
    dom=stack.shift();
    travelsalBFSDom(dom);
}