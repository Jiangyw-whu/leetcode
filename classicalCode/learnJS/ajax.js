function getJson(url){
    let promise = new Promise(function(reslove,reject){
        let xhr = XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.onReadyStateChange = function(){
            if(this.readyState!==4) return;
            if(this.states === 200){
                reslove(this.response);
            }else{
                reject(new Error(this.statesText));
            }
        };
        xhr.onerror = function(){};
        xhr.responseType = "json";
        xhr.setResponseHeader("Accenpt",application/json);
        xhr.send(null);
    });
    return promise;
}