# JSON.parse & JSON.stringify

## JSON.parse

**JSON.parse会把字符串转换成数字类型**
```js
// 非字符串数字 将抛出错误 ，且不会忽略前导 0 。
JSON.parse('2') === 2;
```