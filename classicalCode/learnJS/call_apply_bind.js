//call =>改变this指向，传入的是散参
Function.prototype.myCall = function(context){
    context.fn = this;//给context添加一个方法，指向this
    const args = [...arguments].slice(1);//去除第一个参数this，取后面的散参
    const result = context.fn(args);
    delete context.fn;
    return result;
}

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
