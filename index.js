// 捕获阶段 
const div = document.querySelector('#div');
const btn = document.querySelector('#btn');

div.addEventListener('click',()=>{
     console.log('div');
},false)

btn.addEventListener('click',()=>{
    console.log('btn');
},true)
