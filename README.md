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

**不会事件冒泡的事件**

> https://zhuanlan.zhihu.com/p/164844013

```js
1. mouseleave/mouseenter
2. Media 事件(音视频的play事件等)
3. blur / focus 事件
4. scroll事件


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

### 用户界面时间 UI 事件

**onload**

1. window

2. img

   2.1 img 元素 的`onload事件`，需要在 src 属性赋值前 注册.

   2.2 img 元素 的`src属性`一经指定 就会下载 src 引用的资源

```js
window.addEventListener("load", () => {
  let image = document.createElement("img");
  image.addEventListener("load", (event) => {
    console.log(event.target.src);
  });
  document.body.appendChild(image);
  image.src = "smile.gif";
});
```

2.3 image 构造函数 属于 DOM0

```js
window.addEventListener("load", () => {
  let image = new Image();
  image.addEventListener("load", (event) => {
    console.log("Image loaded!");
  });
  image.src = "smile.gif";
});
```

3. script

> 元素会在 JavaScript 文件 `加载完成并执行完成 后触发load事件`，从而可以动态检查

```js
window.addEventListener("load", () => {
  let script = document.createElement("script");
  script.addEventListener("load", (event) => {
    console.log("Loaded");
  });
  script.src = "example.js";
  document.body.appendChild(script);
});
```

4. link

> `IE , Opera`支持<link> 元素触发 load 事件。行为和 script 表现一致

**resize**

1.1 `避免`在这个事件处理程序中执行过多计算。否则可能由于执行过于频繁而导致浏览器响应明确变慢。

1.2 浏览器窗口在最大化和最小化时也会触发 resize 事件。

**scroll**

> 兼容获取 滚动距离

```js
window.addEventListener("scroll", (event) => {
  if (document.compatMode == "CSS1Compat") {
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
});
```

### 焦点事件

> 1011

## 脚本触发事件
> https://developer.mozilla.org/zh-CN/docs/Web/API/Event

# todo

- [] document.compatMode

> 表明当前文档的渲染模式是 `怪异模式/混杂模式(Quirks mode)` 还是标准模式。

BackCompat === 怪异模式/混杂模式
CSS1Compat === 标准模式

```js
// 一个准确获取网页客户区的宽高、滚动条宽高、滚动条Left和Top的代码
if (document.compatMode == "BackCompat") {
  cWidth = document.body.clientWidth;
  cHeight = document.body.clientHeight;
  sWidth = document.body.scrollWidth;
  sHeight = document.body.scrollHeight;
  sLeft = document.body.scrollLeft;
  sTop = document.body.scrollTop;
} else {
  //document.compatMode == "CSS1Compat"
  cWidth = document.documentElement.clientWidth;
  cHeight = document.documentElement.clientHeight;
  sWidth = document.documentElement.scrollWidth;
  sHeight = document.documentElement.scrollHeight;
  sLeft =
    document.documentElement.scrollLeft == 0
      ? document.body.scrollLeft
      : document.documentElement.scrollLeft;
  sTop =
    document.documentElement.scrollTop == 0
      ? document.body.scrollTop
      : document.documentElement.scrollTop;
}
```

- [] 什么是 "CSS1Compat"

# get

1. frameset

> https://www.w3school.com.cn/tags/tag_frameset.asp

2. 选中 textarea 或者 input 的 选中事件 select

3. window.getSelection().toString() 获取选中的文本信息

4. document.documentElement === html
