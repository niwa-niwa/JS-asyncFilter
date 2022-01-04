(async function () {
  const myArray = [1, 2, 3, 4, 5];

  const results = await asyncFilter(myArray, async (num) => {
    await doAsyncFunc();
    return num > 2;
  });

  console.log(results);
})();

function sleep(waitMsec) {
  const startMsec = new Date();

  while (new Date() - startMsec < waitMsec);
}

function doAsyncFunc() {
  sleep(3000);
  return;
  // return Promise.resolve();
}

async function asyncFilter(arr, callback) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail))
    )
  ).filter((i) => i !== fail);
}
