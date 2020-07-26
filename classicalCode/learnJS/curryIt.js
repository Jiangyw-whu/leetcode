function curryIt(fn) {
    let length = fn.length;
    const args = [];
    const result =  function (arg){
        args.push(arg);
        length --;
        if(length <= 0 ){
            return fn.apply(this, args);
        } else {
            return result;
        }
    }
    return result;
}
var fn = function (a, b, c) {
    return a + b + c
}; 
curryIt(fn)(1)(2)(3);