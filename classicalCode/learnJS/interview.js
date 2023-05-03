function F(){
}
F.prototype.add = function(){
    this.count++;
    console.log(this.count)
}
F.prototype.count = 0;
new F().add(); //1
new F().add(); //1

for(let i=0;i<10;++i){
    setTimeout(()=>console.log(i),0);
} //1-9


const a =[1,2,3].map(k=>console.log(k))
//1 2 3

function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
};
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
};

Foo.getName(); //找静态方法 ->2
getName(); //function getName5 function getName 4->4
Foo().getName(); //先执行getName1 return了window对象，window.getName此时是getName1，->1 
getName(); // ->1
new Foo.getName();//输出的是Foo的静态方法getName()->2
new Foo().getName();//先new Foo()，再getName，所以是在原型里找，输出3
new new Foo().getName(); //同上，输出3
