const oDiv = document.getElementById('div');

const clickEvent = document.createEvent('MouseEvent');

clickEvent.initMouseEvent('click',true,true);


oDiv.addEventListener('click',function(e){
    console.log('click',e);
})

oDiv.dispatchEvent(clickEvent)