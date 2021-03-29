 # water fall 实现

 ## API
 
 1. minGap: 水平方向的最小间隙 
 2. imgSrcs: 图片源 
 3. imgWidth: 图片宽度(必须)
 4. container: 图片容器
 ## 实现思路

 1. 图片定宽
 2. 利用绝对定位, 计算图片的位置
 3. 计算一行有几张图片(对应数组的项数 `向下取整` ), 并将这几张图片高度push到数组中
 4. 记录最小的值和索引
 5. 计算gap
 6. 计算图片的配置(top `注意图片的加载是异步的` , left)

## TODO

1. 元素尺寸的计算(clientWitdh)

## get

1. img元素按照 baseline排列
2. getComputedStyle(dom) 获取 dom的样式
3. Math.min.apply(null,arr) 获取数组中的最小值
