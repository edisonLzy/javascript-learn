# Set

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

## 遍历 set

> set 数据结构没有 索引

**forEach**

```js
new Set(["foo", "bar", undefined]).forEach((el, index) => {
  // el === 'foo'
  console.log(el === index); // true
});
```

**for of**

> set部署了 Symbol(Symbol.iterator) 接口
```js
const set = new Set(["foo", "bar", undefined]);
for (const iterator of set) {
  console.log(iterator);
}
```
