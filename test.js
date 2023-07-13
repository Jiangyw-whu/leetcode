Array.proptotype.myFilter = (fn) => {
  const arr = this
  return arr.reduce((filterdArr, currItem) => {
    const res = fn(currItem)
    if (!!res) {
      filterdArr.push(currItem)
    }
    return filterdArr
  }, [])
}
