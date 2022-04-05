function add1(str) {
  return '1' + str;
}
function add2(str) {
  return '2' + str;
}
function add3(str) {
  return '3' + str;
}

function compose(fns) {
  if (fns.length === 0) {
    return (v) => v;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  const result = fns.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
  return result;
}
// (...args)=> f3(f2(f1(...args)))
let fn = compose([add3, add2, add1]);
let result = fn('zhufeng');
console.log(result);
