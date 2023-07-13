/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
  const getRemainingArr = (arr, k) => {
    const len = arr.length
    const cutIndex = len % k
    const newBegin = arr.slice(cutIndex + 1, len)
    const newEnd = arr.slice(0, cutIndex)
    return [...newBegin, ...newEnd]
  }
  let flag = true
  let newArr = Array(n)
    .fill(0)
    .map((_, index) => index)
  while (flag) {
    newArr = getRemainingArr(newArr, m)
    if (newArr.length <= 2) {
      flag = false
    }
  }
  return newArr
}
