---
title: pdf转图片base64上传
date: 2022-09-01 22:58:13
tags: [pdf, 上传, base64, react, antd, pdfjs-dist]
---

> 需求：PDF 转图片 -> base64 格式 -> 上传图片

## PDF 转 base64 图片
参考：[Using pdf.js in React](https://github.com/mozilla/pdf.js/issues/10316)

- 安装 `pdfjs-dist`
```bash
npm install pdf-dist@2.0.943 --save
```

- 项目当中引入
```js
import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
// 解析需要
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
```

项目使用了 Antd 的 Upload 组件，
```js
<Upload
  beforeUpload={beforeUpload}
  action="/api/xxxxxxxxxx"
  headers={{ Authorization: token }}
  maxCount={1}
  accept="image/*, .pdf"
>
  ...
</Upload>
```
- 拦截默认上传动作
```js
// pdf 上传前拦截
const beforeUpload = (originFileObj: any) => {
  if (originFileObj.type === 'application/pdf') {
    // 解析 pdf
    readPdf(originFileObj)
    return false
  }
}
```

- pdf 解析
```js
  // pdf 解析
  const readPdf = (file: any) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function (e) {
      const arr = new Uint8Array(this.result)
      PDFJS.getDocument({data: arr}).then(function(pdf: any) {
        if (pdf) {
          // 多页
          // const pageNum = pdf.numPages
          // for (let i = 1; i <= pageNum; i++) {
          // 只展示一页
          for (let i = 1; i <= 1; i++) {
            // 生成每一页的 canvas
            const canvas = document.createElement('canvas')
            canvas.id = 'pageNum' + i
            // canvas 添加到 dom
            document.getElementById('pdf-container')?.appendChild(canvas)
            const context = canvas.getContext('2d')
            openPage(pdf, i, context)
          }
        }
      }).catch((e: any) => {
        console.error(e)
      })
    }
  }
```

- canvas 设置，转换为 base64 图片
```js
  const openPage = (pdfFile: any, num: number, context: any) => {
    var scale = 2
    pdfFile.getPage(num).then((page: any) => {
      const viewport = page.getViewport(scale)
      var canvas = context.canvas
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      var renderContext = {
        canvasContext: context,
        viewport
      }
      page.render(renderContext).promise.finally(() => {
        const base64String = canvas.toDataURL("image/jpeg")
        // useState 设置图片 url
        setPdfimg(base64String)
        // 手动上传
        handleUpload(base64String)
      })
    })
  }
```

- 手动上传 base64 转为 file binary
```js
  // pdf 转 base64 后手动上传
  const handleUpload = (base64String: string) => {
    // 解码 base64 去掉url头，并转换为byte
    let bytes = window.atob(base64String.split(',')[1])
    let array = []
    for(let i = 0; i < bytes.length; i++){
      array.push(bytes.charCodeAt(i))
    }
    // blob
    // let blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    // binary
    let file = new File([new Uint8Array(array)], '投放授权书.png', { type: 'image/png' })
    // 生成 formData
    const formData = new FormData()
    formData.append('file', file)

    fetch('/api/xxxxxxxxxx', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token
      }
    })
      .then(res => res.json())
      .catch(() => {
        message.error('upload failed.');
      })
      .then(resp => {
        console.log(resp)
      })
      .finally(() => {
      })
  }
```


参考：
[React中使用 Pdf.JS 将 pdf 转为图片](https://www.likecs.com/show-775309.html)
[在react中 实现 base64的图片转换成formdata格式并实现上传功能](https://www.codeleading.com/article/7946117501/)
[Base64转Binary](https://blog.csdn.net/fbean/article/details/125369400)