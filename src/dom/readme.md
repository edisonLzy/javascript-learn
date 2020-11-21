# DOM


## 获取某个dom元素的属性值

```js
window.getComputedStyle(dom).marginLeft
```

## 获取dom的边框宽度
  - 行间样式的border
    oDom.style.borderLeftWidth
    oDom.currentStyle.borderLeftWidth [ie]
  - 获取css中的
    getComputedStyle(oDom,null)['border-left-width']
## 获取dom的位置信息和大小信息
  - dom.getBoundingClientRect()
## 获取dom大小相关的方法
  - dom.offsetWidth [border-box]
  - dom.clientWidth [padding-box]
## 获取鼠标点击的位置
  - (e.pageX,e.pageY)
## 操作css变量

**读取变量**
elem.style.getPropertyValue()

**设置变量**
elem.style.setProperty()

**删除变量**
elem.style.removeProperty()

```js
      (function(window){

                 let doc = document.body.style;
        document.addEventListener('DOMContentLoaded',function(){
            doc.setProperty('--red',0)
            doc.setProperty('--green',0)
            doc.setProperty('--blue',0)
        })
        let oset = document.getElementById('set');
        let oget = document.getElementById('get');
        let oremove = document.getElementById('remove');
        function random(){
            // 获取一个范围的随机数
            //   (max - min) + min;
           return Math.random() * (255 - 100) + 100;
        }
        oset.addEventListener('click',function(){
            doc.setProperty('--red',random())
            doc.setProperty('--green',random())
            doc.setProperty('--blue',random())
        })
        oget.addEventListener('click',function(){
            console.log(doc.getPropertyValue('--red'))
            console.log(doc.getPropertyValue('--green'))
            console.log(doc.getPropertyValue('--blue'))
            
        })
        oremove.addEventListener('click',function(){
            // doc.removeProperty('--blue')
        })
        
        var i =0;
        Object.defineProperty(window,'a',{
            get(){
                return ++i;
            }
        })
        if(a===1&&a===2&&a===3){
            console.log('hi')
        }
      })(window)

```