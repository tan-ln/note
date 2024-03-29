# HTTP 缓存

通过在客户端和服务端之间存储和重用先前获取的资源副本，来减少网络流量和加快资源的加载时间，提升用户体验

## 好处

1. 减少加载时间
直接使用本地资源，无需重新请求

2. 减少服务器压力
无需处理重复请求，减少服务器的负载，减少运营成本

3. 减少网络流量消耗
客户端无需重复请求

4. 提升用户体验
使用本地缓存速度更快


## 强缓存

### Expires

服务端在返回资源时，响应头中携带一个 `Expires` 字段，用于表明资源的有效期 （GMT 类型：格林尼治时间）
浏览器在请求资源时判断：
  存在 `未到期的资源` 则直接使用缓存资源
  `资源过期` 或 `不存在缓存` 则发起请求，并缓存响应的数据

> `Expires` 是 `HTTP/1.0` 时代的产物，现代浏览器默认使用 `HTTP/1.1`

> 另外有个问题是，`Expires` 时间是由服务端生成的，如果服务端和客户端时间不一致，则可能导致缓存命中有误差


### Cache-Control

`Cache-Control` 是 `HTTP/1.1` 的响应头，弥补了 `Expires` 的缺陷

与 `Expires` 不同的是，`Expires` 是由服务端给的绝对时间，而 `Cache-Control` 则会告诉客户端资源的有效时间，相对的比如：100s


几个常用的属性：
```
max-age               缓存有效期，单位秒
max-stale             允许资源过期，但有一个允许过期最大值
min-fresh             指定的时间短内保持资源是新的，也就是说在设定的时间内获取资源不管缓存有没效, 都需要发起缓存进行验证(协商缓存验证)
no-cache              无论本地资源是否过期，都进行协商缓存验证
no-store              不使用任何缓存
```

### Pragma

`HTTP/1.0` 规定的响应头，`HTTP/1.1` 也使用，向下兼容只支持 `HTTP/1.0` 的客户端

用于配合 `Expires`，它只有一个属性值：`no-cache` 表示不使用 强缓存

> 优先级高于 `Cache-Control` 和 `Expires`


## 协商缓存










[https://juejin.cn/post/7300562752421625865](https://juejin.cn/post/7300562752421625865)




