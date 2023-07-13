// 手写new
const myNew = (Con, ...args) => {
  const obj = {}
  obj._proto = Con.prototype
  const returnVal = Con.apply(obj, args)
  return typeof returnVal === 'object' ? returnVal : obj
}

// 手写instanceof
const myInstanceof = (obj, Con) => {
  while (obj) {
    if (obj._proto_ === Con.prototype) {
      return true
    }
    obj = obj._proto
  }
  return false
}

// 手写promise
// https://yes-1-am.gitbook.io/blog/javascript/shou-xie-promise-ji-xiang-guan-dai-ma-li-jie
// https://www.bilibili.com/video/BV12m4y1R7Q3/?spm_id_from=333.999.0.0&vd_source=0c04c8492fb837222bf487a426361c6a 讲得不错
class MyPromise {
  constructor(exec) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value
        this.resolvedCallbacks.forEach((cb) => cb())
      }
    }
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.rejectedCallbacks.forEach((cb) => cb())
      }
    }
    try {
      exec(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onResolved, onRejected) {
    onResolved =
      typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    const promise2 = new MyPromise((resolve, reject) => {
      const handleResolve = () => {
        setTimeout(() => {
          try {
            let x = onResolved(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      const handleReject = () => {
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === 'resolve') {
        handleResolve()
      } else if (this.status === 'reject') {
        handleReject()
      } else {
        this.resolvedCallbacks.push(handleResolve)
        this.rejectedCallbacks.push(handleReject)
      }
    })
    return promise2
  }
}

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject('不能调用自身')
  }
  if (x instanceof MyPromise) {
    // promise
    // x.then(value => resolve(value), reason => reject(resson))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

// promise all实现
const myPromiseAll = (promiseList) => {
  const len = promiseList.length
  return new Promise((resolve) => {
    let count = 0
    let res = []
    for (let i = 0; i < len; i++) {
      const task = promiseList[i]
      Promise.resolve(task).then((currRes) => {
        count += 1
        res[i] = currRes
        if (count === len) {
          resolve(res)
        }
      })
    }
  })
}

// 带并发限制的promiseall
const myPromiseAll2 = (promiseList, limit) => {
  return new Promise((resolve) => {
    let len = promiseList.length
    let startTasks = 0
    let finishedTasks = 0
    let res = []
    const doNext = () => {
      if (finishedTasks >= len) {
        resolve(res)
        return
      }
      // 不可能的事情
      if (startTasks >= len) {
        return
      }
      const currIndex = startTasks
      startTasks++
      Promise.resolve(promiseList[currIndex])
        .then((currRes) => {
          finishedTasks++
          res[currIndex] = currRes
          doNext()
        })
        .catch((e) => {
          reject(e)
        })
    }
    for (let i = 0; i < limit; i++) {
      doNext()
    }
  })
}

// 类似实现，js调度器
class Schedule {
  constructor(limit) {
    this.limit = limit
    this.queue = []
    this.runningCount = 0
  }
  async add(promiseFunc) {
    if (this.runningCount >= this.limit) {
      await new Promise((resolve) => this.queue.push(resolve))
      return this.add(promiseFunc)
    } else {
      this.runningCount++
      try {
        const res = await promiseFunc()
        this.next()
        return res
      } finally {
        this.runningCount--
      }
    }
  }
  next() {
    if (this.queue.length === 0) {
      return
    }
    const nextTask = this.queue.shift()
    nextTask()
  }
}

// promise race
const myPromiseRace = (promiseList) => {
  return new Promise((resolve, reject) => {
    promiseList.forEach((task) => {
      Promise.resolve(task).then((res) => {
        resolve(res)
      })
    })
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
const myPromise = (fn) => {
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

// 红绿灯问题
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
function light(timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb())
    }, timer * 1000)
  })
}
light(3, red)
  .then(() => {
    return light(2, yellow)
  })
  .then(() => {
    return light(1, green)
  })

// ajax
const myAjax = (url, method, body, headers) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open(method, url)
    for (let key in headers) {
      req.setRequestHeader(key, headers[key])
    }
    req.onreadystatechange(() => {
      if (res.readystatus === 4) {
        if (+req.status >= 200 && +req.status <= 300) {
          resolve(req.responseText)
        } else {
          reject(req)
        }
      }
    })
    req.send(body)
  })
}
// apply
Function.prototype.myApply = (context, args = []) => {
  context.fn = this
  const res = args.length > 0 ? context.fn(args) : context.fn()
  delete context.fn
  return res
}

// call
Function.prototype.myCall = (context, ...args) => {
  context.fn = this
  args = args ? args : []
  const res = args.length > 0 ? context.fn(...args) : context.fn()
  delete context.fn
  return res
}

// bind
Function.prototype.myBind = (context, ...args) => {
  const fn = this
  args = args ? args : []
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs])
  }
}

// My Object.create
function myCreate(obj) {
  function C() {}
  C._proto_ = obj
  return new C()
}

// 几种继承
// 原型链继承
function Parent() {
  this.name = 'father'
}
function Child() {}
Child.prototype = new Parent()
const child = new Child()

// 构造函数继承
// 修改父类构造函数this
function Child() {
  Parent.call(this)
}
// 组合 1+2
function Child() {
  Parent.call(this)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
// 寄生组合继承 todo

function parent(age) {
  this.age = age
}

parent.prototype.say = function () {
  console.log(this.age)
}

function sub(age, value) {
  parent.call(this, age)
  this.value = value
}

sub.prototype = Object.create(parent.prototype, {
  constructor: {
    value: sub,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

// 实现一个Object.assign
const myAssign = (target, ...sources) => {
  let targetObj = Object(target)
  sources.forEach((source) => {
    if (source !== null && source !== undefined) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          targetObj[key] = source[key]
        }
      }
    }
  })
  return targetObj
}

// 防抖
const myDebounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
// 节流
const myThrottle = (fn, delay) => {
  let preTime = Date.now()
  return function (...args) {
    let nowTime = Data.now()
    if (nowTime - preTime >= delay) {
      preTime = nowTime
      fn(...args)
    }
  }
}

// flat实现
const myFlat = (arr) => {
  return arr.reduce((newArr, item) => {
    return newArr.concat(Array.isArray(item) ? myFlat(item) : item)
  }, [])
}

// 函数柯里化
const myCurried = (fn, ...args) => {
  // 参数够了，就不用递归找参数了
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return function (...newArgs) {
      myCurried(fn, ...args, ...newArgs)
    }
  }
}

// 观察者模式
class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    this.observers = this.observers.filter(
      (observerName) => observerName !== observer
    )
  }
  notify(data) {
    this.observers.forEach((observer) => observer.update(data))
  }
}

class Observer {
  update(data) {
    console.log(`update ${data}`)
  }
}

// 示例：创建一个主题和多个观察者
const subject = new Subject()

const observer1 = new Observer()
const observer2 = new Observer()

subject.addObserver(observer1)
subject.addObserver(observer2)

// 发送通知，观察者接收数据
subject.notify({ message: 'Hello, observers!' })

// 删除一个观察者
subject.removeObserver(observer1)

// 再次发送通知，仅剩下的观察者接收数据
subject.notify({ message: 'Hello, observer2!' })

// EventEmit
const eventEmit = new EventEmit()
const task1 = () => {
  console.log('task1')
}
const task2 = () => {
  console.log('task2')
}
eventEmit.on('task', task1)
eventEmit.on('task', task2)
eventEmit.off('task', task1)
setTimeout(() => {
  eventEmit.emit('task') // 输出task2
})

class EventEmitter {
  constructor(props) {
    this.event = {}
  }
  on(type, fn) {
    if (this.event[type]) {
      this.event[type].push(fn)
    } else {
      this.event[type] = [fn]
    }
  }
  off(type, fn) {
    if (this.event[type]) {
      this.event[type] = this.event[type].filter((item) => item !== fn)
    }
  }
  emit(type) {
    if (this.event[type]) {
      this.event[type].forEach((ele) => ele())
    }
  }
}

// 图片懒加载
const imgLoad = (img) => {
  return new Promise((resolve, reject) => {
    img.setAttribute('src', img.getAttribute('data-src'))
    img.onload = () => {
      img.removeAttribute('data-src')
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error('error'))
    }
  })
}
const imgLazyLoad = (imgList) => {
  for (let i = 0; i < imgList.length; i++) {
    const currImg = imgList[i]
    const isIntoView =
      window.screenTop + window.innerHeight - currImg.offsetTop >= 0
    if (isIntoView) {
      imgLazyLoad(currImg)
        .then(() => {
          console.log('load')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
window.addEventListener('load', loadImagesInView)
window.addEventListener('scroll', loadImagesInView)
