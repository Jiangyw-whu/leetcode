$ajax({
    url:'www.baidu.com',
    type:'get',
    dataType:'jsonP',
    jsonPCallBack:"handleCallBack",
    data:{}
})


function jsonp(req){
    let script = domcunment.createElement('script');
    let url = req.url+'?callback='+req.callback.name;
    script.src = url;
    domcunment.getElementByTagName('head'[0]).appendChild(script);
}

function hello(res){
    alert('hello'+res.data);
}
jsonp({
    url:'www.baidu.com',
    callback:hello
});


this.$http.jsonP('http:www.baidu.com',{
    params:{},
    jsonP: 'handleCallBack'
}).then((res)=>{
    console.log(res);
})