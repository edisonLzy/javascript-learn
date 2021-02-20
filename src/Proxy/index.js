import './traceMethodscall';
import './revocable'

const arr = []; 
const proxyArr = new Proxy(arr,{
    defineProperty(target,p,attrs){
      console.log(target,p,attrs);
      return Reflect.defineProperty(target,p,attrs)
    }
})

Object.defineProperty(proxyArr , 0 , {
    value:1
})



