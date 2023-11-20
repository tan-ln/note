
## Controller Request

nestjs 提供了方法参数装饰器 用来帮助我们快速获取参数 如下

```ts
@Request()	                                req          
@Response()	                                res                   
@Next()	                                    next
@Session()	                                req.session
@Param(key?: string)       	                req.params/req.params[key]
@Body(key?: string)	                        req.body/req.body[key]
@Query(key?: string)	                      req.query/req.query[key]
@Headers(name?: string)   	                req.headers/req.headers[name]
@HttpCode	
```

### 获取 `get` 请求传参
可以使用 `Request` 装饰器 或者 `Query` 装饰器 跟 express 完全一样

```ts
// localhost:3000/user?name=10086
  @Get()
  find(@Request() req) {
    console.log(req.query);
    return {
      code: 200,
    };
  }
```

> 也可以使用 Query 直接获取 不需要在通过req.query 了
```ts
// localhost:3000/user/findByName?name=10086
  @Get('findByName')
  find(@Query() query) {
    console.log(query);
    return {
      code: 200,
    };
  }
```

### post
```ts
// localhost:3000/user/save
// body: { name: 10086 }
  @Post('save')
  createUser(@Request() req) {
    console.log(req.body);
    return {
      code: 200,
    };
  }
```

```ts
// localhost:3000/user/form
// body: { name: 10086 }
  @Post('form')
  form(@Body() body) {
    console.log(body);
    return {
      code: 200,
    };
  }
```

```ts
// localhost:3000/user/shop
// body: { prodName: 'yaoyaolingxian' }
  @Post('shop')
  shop(@Body('prodName') body) {
    console.log(body);
    return {
      code: 200,
    };
  }
```

### 动态路由

可使用 request 装饰器或 params 装饰器

```ts
// localhost:3000/user/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
```


### 读取 headers

```ts
  @Post('save')
  createUser(@Headers() headers, @Request() req) {
    console.log(headers, req.body);
    return {
      code: 200,
    };
  }

  {
    accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache',
    'accept-encoding': 'gzip, deflate',
    connection: 'keep-alive',
    cookie: 'cookie-123',
    'user-agent': 'axios/0.21.1',
    'content-length': '41',
    host: 'localhost:3000'
  }
```


### 控制接口返回的状态码

```ts
// localhost:3000/user/save
  @Post('save')
  @HttpCode(500)
  createUser(@Headers() headers, @Request() req) {
    console.log(headers, req.body);
    return {
      message: 'response message',
    };
  }

  /** 响应
   * Status:
      500 Internal Server Error
      Duration:
      58 ms
   * 
```
