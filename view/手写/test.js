const _Promise = function (fn) {
  this.state = 'PENDDING'
  this.value = ''

  const resolve =  (value) => {
    this.state = 'RESOLVE'
    this.value = value
  }
  const reject = (value) => {
    this.state = 'REJECT'
    this.value = value
  }
  this.then = (onResovle, onReject) => {
    if (this.state === 'RESOLVE') {
      onResovle(this.value)
    } else {
      onReject(this.value)
    }
  }

  try {
    fn(resolve, reject)
  } catch(err) {
    reject(err)
  }
}

let p = new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000);
})

p.then(res => {
  console.log(res)
})

