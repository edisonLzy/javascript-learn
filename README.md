# 前端监控

## 为什么需要 前端监控

## 目标 

### 稳定性

### 用户体验

### 扩展业务

## 监控流程 

### 🚩 埋点

**代码埋点**

**可视化埋点**

**无痕埋点**
### 🚩 数据采集

**捕获全局未被捕获的错误 和 捕获资源加载错误**

> 通过 监听 'error' 事件

**捕获没有 被捕获promise的错误**

 > 通过 监听 unhandledrejection捕获 

```js

 window.addEventListener('unhandledrejection',(ev)=>{
    // 行列 在 ev.reason中
 })

```

**捕获接口异常**

> 通过 重写 `XMLHttpRequest`的open,send方法 ,类似 vue的数组拦截。注意排出拦截`上报接口的url`的地址

**白屏监控**

> `document.elementsFromPoint(x,y)` 获取 处于 （x,y）坐标位置的 元素  
>  查看`某个坐标`所处的`某个区域的元素`是否是 html,body,等包裹元素. 
> `需要处于 页面onload时进行监控`


**页面加载时间**

> performance API 。 

```js
const {}  = performance.timing;
```

> 1. performanceObserver API 添加 获取 FMP 以及 LCP 的观察者。
> 2. performance.getEntriesByName 获取 时间

```js
// 获取 FMP需要 给  有意义的 元素添加
elementtiming = 'meaningful'
```

**gif图片 做数据上报  image beacon**

```

1. 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
2. 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
3. 跨域友好
4. 执行过程无阻塞
5. 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
6. GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

```


### 数据建模存储

### 数据传输

1. 前端 通过 请求一个 1*1的gif 进行数据上报
2. nginx 用来接收访问 并 记录日志
3. 通过 fee.js(顶塔) 清洗数据和入库数据


### 数据统计


**数据可视化**

**报告和报警**

# get

1. 腾讯云的日志系统 是什么 ?  阿里云 SLS日志服务
2. __dirname 表示什么 ？
3. process.cwd 表示什么 ？
4. context 配置 ？ 
5. htmlwebpackplugin 的 inject配置 注入 生成的js文件到 指定的区域中 。 

```js
inject:'head' // 将生成的dist文件 在head中引入
```

6. user-agent 第三方包 用于解析 UserAgent字段

7.  捕获全局 未 捕获的错误  

```js
 // 捕获全局 未捕获的错误  
 window.addEventListener('error',(ev)=>{
    //  do somethings 
    ev.colno //  错误的列数
    ev.lineon //  错误的行
    ev.path // 抛出错误的元素
 })
 // 为什么需要 拿到最后一个交互事件对象 ?  

```

8. 换行符 '\n'

9. addEventListener 第三个参数 

```js

{
    capture:
    passive:
}
```

10. dom事件对象的path属性 
> 记录会发生这个事件的所有元素 ，直到window为止

11. element.nodeName 节点名称

12. 如何 调用 阿里云 SLS服务 
> 阿里云 请求对象的值 不能是数字

13. 如何获取请求体的大小

> 通过 JSON.stringify()

14. navigator对象 
> 用于获取 浏览器的信息 例如 user-agent 等字段

15. devServer.before
> 配置 路由 ,devServer本质是一个 express服务器

```js

before(router){
   router.get()
   router.post()
}
```

16. XHR 发送 error事件的条件 。 且只要服务器响应 就会触发 `load`事件

17. document.readyState === 'complete'

18. axios 在 node环境 是使用 http 发送的请求，浏览器端基于 XHRHttpRequests

19. ttfb 首字节到达时间 

20. js的执行 会阻塞 dom的解析 

21. 浏览器双缓冲

22. caniuse 获取 API兼容性