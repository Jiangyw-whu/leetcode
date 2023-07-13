// 红路灯问题
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
const light = function (timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb())
    }, timer)
  })
}

const step = () => {
  light(3000, red)
    .then(() => {
      return light(2000, green)
    })
    .then(() => {
      return light(1000, yellow)
    })
}

// mergePromise
// 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1)
    return 1
  })
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2)
    return 2
  })
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3)
    return 3
  })

const mergePromise = (promiseList = []) => {
  const data = []
  let promiseRunners = Promise.resolve()
  promiseList?.forEach((currPromise) => {
    promiseRunners = promiseRunners.then(currPromise).then((res) => {
      data.push(res)
      console.log('res', res)
      return data
    })
  })
  return promiseRunners
}

function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable)
    // 定义Promise对象resolve的数组
    const result = []
    // 定义一个计数器用来判断是否所有的promise执行完毕
    let count = 0
    // 并发执行每一个promise
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          result[i] = res
          count++
          if (count === promises.length) {
            resolve(result)
          }
        })
        .catch((err) => reject(err))
    }
  })
}

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})
