# 可选链

> 通过使用 ?. 操作符取代 . 操作符，JavaScript 会在尝试访问 obj.first.second 之前，先隐式地检查并确定 obj.first 既不是 null 也不是 undefined。如果obj.first 是 null 或者 undefined，表达式将会短路计算直接返回 undefined。


```js
// 空值合并操作符
let customer = {
    name: "Carl",
    details: { age: 82 }
  };
let customerCity = customer?.city ?? "暗之城";
console.log(customerCity); // “暗之城”
```