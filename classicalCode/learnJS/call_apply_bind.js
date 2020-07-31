//call =>改变this指向，传入的是散参
Function.prototype.myCall = function(context){
    // console.log('this:',this);//传入的是一个方法，比如Person.say
    // console.log('context',context);//context:{name:Tom1}
    context.fn = this;//给context添加一个方法，指向this
    //console.log('arguments',arguments)//参数 Arguments [{…}, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    //console.log('[...arguments]',[...arguments])// [{…}]
    const args = [...arguments].slice(1);//去除第一个参数this，取后面的散参
    // console.log('args',args) //{name: "Tom1", fn:f }
    const result = context.fn(args);
    // console.log('result',result)
    delete context.fn;
    return result;
}
let Person = {
    name: 'Tom',
    say(age) {
        console.log(this)
        console.log(`我叫${this.name}我今年${age}`)
    }
}
Person1 = {
    name: 'Tom1'
}
Person.say.myCall(Person1)

//apply =》传入的是数组
Function.prototype.myApply = function(context){
    context.fn = this;
    let result;
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    }else{
        result = context.fn();
    }
    delete context.fn;
    return result;
}

//bind =>不是立即执行的，所以是返回一个函数
Function.prototype.myBind = function(context){
    let that = this;
    let args = [...arguments].slice(1);//可以支持柯里化传参，保存参数
    return function() {
        let newArg = [...arguments];
        console.log(newArg);
        return that.apply(context,arg.concat(newArg))
    }
}

const functionNew = ((Con, ...args) =>{
    const obj = {};
    obj._proto_ = Con.prototype;
    const res = Con.apply(obj,...args);
    return res instanceof Object? res : obj;
})
