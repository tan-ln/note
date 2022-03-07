// 从 url 中查询参数

// https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=44004473_26_oem_dg&wd=web

const getUrlParams = function () {
  const obj = {}
  // const href = window.location.href
  const href = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=44004473_26_oem_dg&wd=web前端'
  const args = href.slice(href.indexOf('?') + 1).split('&')
  args.forEach(item => {
    let arr = item.split('=')
    obj[arr[0]] = arr[1]
  })
  return obj
}

const res = getUrlParams()
console.log(res['wd'])
