// benchmarking.js

const timeFunc = async (func, startMsg, stopMsg = '') => {
  console.log(startMsg);
  const startTime = Date.now();
  await func();
  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000;

  if (stopMsg === '') {
    console.log(`Completed in ${executionTime} seconds.`);
  }
  else {
    console.log(`${stopMsg} completed in ${executionTime} seconds.`);
  }
};


module.exports = timeFunc;
