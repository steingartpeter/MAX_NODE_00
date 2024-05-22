exports.tstFunc = function () {
  console.log("HELPER FUNC RUNS HERE ...");
  const obj = { member1: "data1", member2: "data2", member3: 18, member4: [1, 2, 3, 4, 5] };
  ({ member1, ...member1less } = obj);
  console.log("obj:");
  console.log(obj);
  console.log("spread bj:");
  console.log(member1less);
};

exports.gnrtRndmInt = function (min, max) {
  return Math.floor(min + Math.random() * max);
};

exports.findChncIdx = (rndmNr, arr) => {
  if (rndmNr <= 0) {
    return 0;
  } else if (rndmNr >= 1) {
    return 1;
  } else {
    const idx = -1;
    for (let ix1 = 0; ix1 < arr.length; ix1++) {
      const element = arr[ix1];
      if (element >= rndmNr) {
        return ix1;
      }
    }
  }
};
