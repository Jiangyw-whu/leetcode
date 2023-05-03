function promise(){
    this.state="pending";
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallback = [];
    this.rejectCallback = [];
    const resolve = (value) => {
        if(this.state === "pending"){
            this.state = "resolved";
            this.value = value;
        }
    };
    const reject = (reason) => {
        if(this.state === "pending"){
            this.state = "rejected";
            this.reason = reason;
        }
    };
    try{
        executor(resolve,reject);
    } catch(err){
        reject(err);
    }
}

promise.prototype.then = function(fn1,fn2){
    var that = this;
    var promise2;
    fn1 = fn1 instanceof 'function' ? fn1 : function(v){};
    fn2 = fn2 instanceof 'function' ? fn2 : function(r){};
    if(that.state === 'resloved'){
        return promise2 = new promise(function(reslove,reject){
            try{
                var x = fn1(that.data);
                reslove(x);
            }catch(err){
                reject(err)
            }
        });
    }
    if(that.state === 'rejected'){
        return promise2 = new promise(function(reslove,reject){
            try{
                var x = fn2(that.data);
                reject(x);
            }catch(err){
                reject(err)
            }
        });
    }
    if(that.state === 'pending'){
        return promise2 = new promise(function(reslove,reject){
            this.resolveCallback.push(function(value){
                try{
                    var x = fn1(that.data);
                    reslove(x);
                }catch(err){
                    reject(err)
                }
            })
            this.rejectCallback.push(function(reason){
                try{
                    var x = fn2(that.data);
                    reject(x);
                }catch(err){
                    reject(err)
                }
            })
        });
    }
}


//规范的写法
function promise (){
    var self = this;
    self.state = "pending";
    self.resolveCallbacks = [];
    self.rejectCallbacks = [];
    function resolve(value){
        if(value instanceof promise){
            return value.then(resolve,reject);
        }
        setTimeout(()=>{
            if(self.state === "pending"){
                self.state = "reslove";
                self.data = value;
                for(let i=0;i<resolveCallbacks.length;i++){
                    self.resolveCallbacks[i](value);
                }
            }
        });
    }
    function reject(reason){
        setTimeout(()=>{
            if(self.state === "pending"){
                self.state = "reject";
                self.data = reason;
                for(let i=0;i<rejectCallbacks.length;i++){
                    self.rejectCallbacks[i](reason);
                }
            }
        });
    }
    try {
        executor(resolve, reject);
    } catch (reason) {
        reject(reason);
    }
}