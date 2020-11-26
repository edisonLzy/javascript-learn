# 事件

## 事件流

> 描述页面`接收事件`的顺序

### IE 事件冒泡流

> 由事件触发的 具体元素 到 不具体的元素

### Netscape Communicator 事件捕获流

> 由事件触发的 不具体元素 到 具体的元素

### DOM 事件流

> DOM2 Events 规范规定事件流分为 3 个阶段：`事件捕获、到达目标和事件冒泡`

## 事件处理程序

> 命名规范 : on + '事件名'

### HTML 事件处理程序

> 直接作为 HTML 元素的 属性进行事件绑定

### DOM0 事件处理程序

> 以这种方式添加事件处理程序是注册在事件流的`冒泡阶段的`

**添加 事件处理程序**

> 作为 指定元素的 属性进行事件绑定。

```js
let btn = document.getElementById("myBtn");
btn.onclick = function () {
  // this === btn
};
```

**移除**

> 事件处理程序属性的值设置为 null

```js
btn.onclick = null;
```

### DOM2 事件处理程序

> 相比于 DOM0，DOM2 采用事件池管理元素的事件处理程序 ，可以添加多个。第三个参数用于指定 `是否需要注册在捕获阶段运行的事件处理程序，默认值是false`

**添加 addEventListener(type,handler,boolean)**

```js
let btn = document.getElementById("myBtn");
btn.addEventListener(
  "click",
  () => {
    console.log(this.id);
  },
  false
);
```

**移除 removeEventListener(type,handler,boolean)**

```js
let btn = document.getElementById("myBtn");
let handler = function () {
  console.log(this.id);
};
btn.addEventListener("click", handler, false);
// 其他代码
btn.removeEventListener("click", handler, false);
```

**是否注册在捕获阶段运行的事件处理程序**

```js
// template
<div id="div">
  <button id="btn">点击我</button>
</div>;
// js
const div = document.querySelector("#div");
const btn = document.querySelector("#btn");

div.addEventListener(
  "click",
  () => {
    console.log("div");
  },
  true
);

btn.addEventListener(
  "click",
  () => {
    console.log("btn");
  },
  true
);
// div btn

div.addEventListener(
  "click",
  () => {
    console.log("div");
  },
  false
);

btn.addEventListener(
  "click",
  () => {
    console.log("btn");
  },
  false
);

// btn div
```

### IE 事件处理程序

> IE 的事件处理程序 都注册到 冒泡阶段

**attchEvent**

> 添加事件处理程序

1. 事件 type 和 DOM0 级 一致
2. 处理程序的作用域 是`全局 window` 而不是 当前的 dom 对象
3. 可以添加多个事件处理程序， 但`执行顺序 和 DOM2级事件相反 `

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function () {
  console.log(this === window); // true
});
```

**detachEvent**

> 移除特定的事件处理程序

```js
var btn = document.getElementById("myBtn");
var handler = function () {
  console.log("Clicked");
};
btn.attachEvent("onclick", handler);

btn.detachEvent("onclick", handler);
```

**跨浏览器兼容方案**

```js
const EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
};
```

## 事件对象

### DOM 事件对象

> 通过 事件处理程序的参数进行传入

```js
let btn = document.getElementById("myBtn");
btn.onclick = function (event) {
  console.log(event.type); // "click"
};
btn.addEventListener(
  "click",
  (event) => {
    console.log(event.type); // "click"
  },
  false
);
```

**event**

```js
event:{
  currentTarget, // 注册 事件处理程序的元素
  target,// 当前触发 事件处理程序的元素
  preventDefault(),// 阻止事件的默认动作 例如 a标签
  stopPropagation(), // 立即阻止事件流在DOM结构中传播，取消后续的事件捕获或冒泡
}
```

### IE 事件对象

**event**

> 事件对象

1. DOM0 级绑定 event 对象作为 window 的 一个属性 即:

```js
const btn = document.getElementById("myBtn");
btn.onclick = function () {
  console.log(this); //btn
  const event = window.event;
  console.log(event.type); // "click"
};
```

2. DOM2 级绑定 `event对象作为window的 一个属性 且 也作为事件处理函数的参数传入`

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function (event) {
  console.log(this); //window
  console.log(event.type); // "click"
  window.event === event; // true
});
```

```js
event:{
  srcElement,// 当前触发 事件处理程序的元素
  returnValue,// 默认为true , 设置为false 可以阻止事件的默认动作 例如 a标签
  cancelBubble, // 默认为false , 设置为true 阻止事件冒泡
}
```

**跨浏览事件**

```js
const EventUtil = {
  addHandler: function (element, type, handler) {
    // 为节省版面，删除了之前的代码
  },
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  removeHandler: function (element, type, handler) {
    // 为节省版面，删除了之前的代码
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
};
```

## 事件类型


### 用户界面时间 UI事件

# get

1. frameset 

> https://www.w3school.com.cn/tags/tag_frameset.asp

2. 选中 textarea 或者 input的 选中事件 select

3. window.getSelection().toString() 获取选中的文本信息