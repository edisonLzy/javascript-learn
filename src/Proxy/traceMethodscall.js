const obj = {
    multiply(x, y) {
      return x * y;
    },
  };

const proxyObj = new Proxy(obj,{
    get(target,p,receiver){
        console.log(this,  receiver);
        const origin = Reflect.get(target,p);
        return function (a,b){
          console.log(this);
          return Reflect.apply(origin,null,[a,b])
        }
    }
    
})
console.log(proxyObj.multiply(1,2));