# 事件


## mousedown 事件 与 input focus 事件存在的问题

**场景**
> 实现一个 自由伸缩的 dialog

**问题**
> 给 dialog 这个 dom 对象绑定 mousedown 事件之后，dialog 的子元素的 input focus 事件无法触发

**原理**
> 对于 focus 事件， 是按照 mousedown -> focus -> mouseup -> click 顺序。 所以在 mousedown 的时 候是获取不到 focus 事件的

**解决方案**
  ```js
  if(oEvent.target.nodeName.toLowerCase() === 'input'){ //如果目标元素是input则跳出滑动事件
               oEvent.target.focus()
               return;
           }

  ```

## 阻止默认行为 和 阻止事件冒泡 

```js

function stopBubble(e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  //否则，我们需要使用IE的方式来取消事件冒泡
  else window.event.cancelBubble = true;
}
//阻止浏览器的默认行为
function stopDefault(e) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else window.event.returnValue = false;
  return false;
}



```