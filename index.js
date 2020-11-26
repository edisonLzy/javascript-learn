function $(selector){
    return document.querySelector(selector)
}
// 捕获阶段
const div = $("#div");
const btn = $("#btn");
const textarea = $("#selcted");

textarea.addEventListener('select',e=>{
    console.log(e);
})

div.addEventListener(
  "click",
  (e) => {
    console.log(JSON.parse(JSON.stringify(e)));
    e.preventDefault();
    console.log(e);
    console.log("div", e.eventPhase); //3 表示事件发生在冒泡阶段
  },
  false
);

btn.addEventListener(
  "click",
  function (e) {
    console.log(this);
    // e.stopImmediatePropagation()
    console.log("btn", e.eventPhase); //2 表示事件发生在 处于目标阶段
  },
  true
);

// document.body.addEventListener(
//   "click",
//   (event) => {
//     console.log(event.eventPhase); // 1 表示事件发生在 处于冒泡阶段
//   },
//   true
// );
