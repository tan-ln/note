const Ajax = {
  get: function (url, callback) {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    // 传参 'http://xxx.xxx.com?wd=somthing&...'
    xhr.open('get', url, false)
    xhr.send()
    xhr.onreadyStateChange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(xhr.responseText)
        }
      }
    }
  },
  post: function (url, data, callback) {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open('post', url, false)
    // 设置请求头
    xhr.setRequestHeadr('Content-Type', 'application/x-www-form-urlencoded')   // 表单默认格式 { key: value }
    // xhr.setRequestHeadr('Content-Type', 'application/json')                 // json
    // xhr.setRequestHeadr('Content-Type', 'text/html')
    xhr.send(data)
    xhr.onreadyStateChange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(xhr.responseText)
        }
      }
    }
  }
}

/**
 *  Ajax2.0
 *    const formData = new FormData()
 *    formData.set('key', 'value')
 *    xhr.send(formData)
 */
