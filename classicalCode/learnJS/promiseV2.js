// promise retry
const retry = (fn, times = 3, delay = 500) => {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        const res = await fn()
        resolve(res)
        break
      } catch (e) {
        if (!times) {
          reject(e)
        }
      }
    }
  })
}

// promise all
const myPromiseAll = (promiseList) => {
  return new Promise((resolve, reject) => {
    let count = 0
    const len = promiseList.length
    let res = []
    for (let i = 0; i < len; i++) {
      const task = promiseList[i]
      task().then((currRes) => {
        res[i] = currRes
        count++
        if (count === n) {
          resolve(res)
        }
      })
    }
  })
}
// 加上限制并发数量
function myPromiseAll2(promiseList, limit) {
  return new Promise((resolve, reject) => {
    let finishCount = 0
    let count = 0
    const len = promiseList?.length
    let res = new Array(len)
    const next = (p, index) => {
      p().then((r) => {
        res[index] = r
        finishCount++
        if (promiseList.length) {
          const p = promiseList.shift()
          next(p, count)
          count++
        } else if (finishCount === len) {
          resolve(res)
        }
      })
    }

    while (count < limit && promiseList.length) {
      const p = promiseList.shift()
      next(p, count)
      count++
    }
  })
}
// callback改成promise形式
// 使用前
// fs.readFile('./index.js', (err, data) => {
//   if (!err) {
//     console.log(data.toString())
//   }
//   console.log(err)
// })
// 使用promisify后
// const readFile = promisify(fs.readFile)
// readFile('./index.js')
//   .then((data) => {
//     console.log(data.toString())
//   })
//   .catch((err) => {
//     console.log('error:', err)
//   })
const promisify = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
      fn.apply(null, args)
    })
  }
}
// promise race
const myPromiseRace = (promiseList) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.len; i++) {
      const currTask = promiseList[i]
      currTask()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}
