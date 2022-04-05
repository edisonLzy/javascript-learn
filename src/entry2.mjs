let num = 0
let max = 10
let now = Date.now()
let incrementNumber = function () {
  num++
  while(Date.now() - now <= 1000){}
  // 如果还没有达到最大值，再设置一个超时任务
  if (num < max) {
    setTimeout(incrementNumber, 500)
  } else {
    alert('Done')
  }
}
setTimeout(incrementNumber, 500)
