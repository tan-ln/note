# TCP | IP | HTTP

    HTTP    应用层      无状态，无连接，对于事务没有记忆能力      xml 明文 可解析       
    TCP     传输层      数据传递，有序，可靠的，面向连接          二进制格式面向字节         一对一通信
    UDP     传输层      无连接，快速但不安全，如写信              面向报文                  一对多 | 多对多
    IP      网络层      网络路由和寻址

HTTP 1.0 默认使用短链接，客户和服务器每进行一次 HTTP 操作就建立一次连接，任务结束就中断

HTTP 1.1 起，使用长链接，用以保持 持续连接，响应头：`Connection: keep-alive`，可以设置保持时间

长连接可以省去较多的TCP建立和关闭的操作，减少浪费，节约时间。对于频繁请求资源的客户端适合使用长连接。

    信息只能单向传送为单工；
    信息能双向传送但不能同时双向传送称为半双工；
    信息能够同时双向传送则称为全双工。

# https
### 1. 公钥: 公开的加密方式
### 2. 私钥：存在服务器的唯一解公钥加密的方式
### 3. 数字签名，防止内容被篡改
同时发送 加密后的数据 data + ^data&(再加密后) ====== > 服务器，解密 ^data& === data ? 可信 : 被篡改

### 4. 数字证书，保证服务器的可信度，真实域名， 
请求与相应，携带证书，表示发送者的身份
CA 权威机构颁发的证书 （代表某个域名、携带 加密的公钥）
判断证书与当前 请求的服务器域名一致，为可信

启用 https 要携带 证书公钥

# http && https 区别
```
                    http                https
端口                 80                 443
OSI网络模型         应用层               传输层
安全                无加密               加密 (公钥 + 私钥 + 数字签名 + 数字证书)
```
# GET && POST
1. `get` 请求在*浏览器回退*时，*不会重新请求*；`post` 请求则*会重新请求*
2. `get` 请求浏览器会*主动缓存*；`post` 请求不会，需要*手动设置*
3. 浏览器*历史记录*保留 `get` 请求参数；`post` 请求的参数不会
4. `get` 是通过 url 形式，其*长度有限制*（浏览器不同长度限制不同）；`post` *浏览器不限制*，看服务器是否有限制
5. `get` 请求 url 地址栏暴露参数，`post` 请求参数在请求体中（payload | formData）

# 三次握手 && 四次挥手

## 三次握手
1. 建立连接，客户端发送 syn 包到服务器，等待确认
2. 服务器收到 syn 包，确认之后，发送 syn + ack 包
3. 客户端收到 syn + ack ，向服务器发送确认包 ack

连接成功

## 四次挥手
1. 浏览器发送完数据后，请求断开连接，发送 fin
2. 服务器发送 ack 包到客户端，确认断开请求
3. 服务器发送断开 fin 请求
4. 客户端确认服务器的断开 ack

断开连接

# socket.io
    http: 应用层、无连接、无状态（一问一答）、        数据解析、携带请求头、行、体
    tcp： 传输层、面向连接（三次握手、四次挥手）、    只进行数据传输
    udp： 传输层、无连接（广播）、速度快容易丢包
    ws：将 http 升级到 websocket，但底层还是 tcp

1. 长轮询：客户端不停问、服务器不停回。ajax setInterval
2. 长连接：客户端一次、服务器多次（向客户端单向输出）
3. websocket：全双工、兼容性 IE11

## socket
概念：套接字，网络通信过程中端点的抽象表示
> 建立Socket连接至少需要一对套接字，其中一个运行于客户端，称为ClientSocket ，另一个运行于服务器端，称为ServerSocket 