
document.addEventListener('mousedown',()=>{
    console.log('doc');
})
parent.addEventListener('mousedown',()=>{
    console.log('parent');
})

children.addEventListener('mousedown',()=>{
    console.log('children');
})