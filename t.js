Promise.resolve()
  .then(() => {
    console.log(0);
    return new Promise((resolve) => {
      resolve(4);
    });
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 宏:
// 微: [0,1]
// 输出: 0