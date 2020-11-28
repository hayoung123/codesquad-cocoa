//Brute Force
//Time complexity : O(n^2)
//Space complexity : O(1)
var twoSum = function (nums, target) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
};

//Hash Map
//Time complexity : O(n)
//Space complexity : O(n)

const twoSum = (nums, target) => {
  const sumMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const minus = target - nums[i];
    if (sumMap.has(minus)) return [sumMap.get(minus), i];
    sumMap.set(nums[i], i);
  }
};
