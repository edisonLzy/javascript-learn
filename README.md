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
