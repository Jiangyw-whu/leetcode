
//函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
function debounce(fn,wait){
    var timer = null;
    return function(){
        let context = this;
        let args = arguments;
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=>{
            fn.apply(context,args);
        },wait);
    };
}
//函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

function throttle(fn,delay) {
    var preTime = Date.now();
    return function(){
        let context = this;
        let args = arguments;
        nowTime = Date.now();
        if(nowTime-preTime>=delay){
            preTime = Date.now();
            return fn.apply(context,args);
        }
    };
}