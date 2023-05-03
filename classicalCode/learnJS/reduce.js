arr.reduce(callback,[initalValue])

callback=>(pre,cur,index,arr)

const arr = [1,2,3,4,5];
const sum = arr.reduce(function(pre,cur,index,arr){
    console.log(pre,cur,index);//1 2 1;3 3 2;6 4 3
    return pre+cur;
},0)//设置了初始值是0 输出结果如下 0 1 0;1 2 1;3 3 2;6 4 3


const sum = arr.reduce((x,y)=> {return x+y});

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
//计算每个元素出现的个数
const nameNum = names.reduce((pre,cur)=>{
    if(cur in pre){
        pre[cur]++;
    }else{
        pre[cur] = 1;
    }
},{})

//数组去重
const newArr = arr.reduce((pre,curr)=>{
    if(pre.indexOf(curr)==-1){
        return pre.concat(curr);
    }else{
        return pre;
    }
},[])

//将二维数组转化为一维数组
const arr3d = [[0, 1], [2, 3], [4,[5,6,7]]];
const getNewArr =  function(arr){
    return arr.reduce((pre,curr)=>pre.concat(Array.isArray(curr)?getNewArr(curr):curr))
}

//对象里的属性求和
var result = [
    {
      subject: 'math',
      score: 10
    },
    {
      subject: 'chinese',
      score: 20
    },
    {
      subject: 'english',
      score: 30
    }
  ];
   
  var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
  }, 0);
  console.log(sum) //60

