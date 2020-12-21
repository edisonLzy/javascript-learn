const set = new Set(['foo', 'bar', undefined])
set.forEach((el,index)=>{
	console.log(el === index);
});

console.log(set);
for (const iterator of set) {
     console.log(iterator);
}