# Providers

Provider 只是一个用 @Injectable() 装饰器注释的类, 他们都可以通过 constructor 注入依赖关系

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return `This action returns all user`;
  }
}
```

> module 引入 service 在 provider 注入
```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

```

> 在 controller 使用 注入的 service

```ts
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
```

## 自定义名称
上面的用法只是语法糖

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [{
    provider: '_user_', // 自定义名称
    useClass: UserService
  }],
})
export class UserModule {}
```

使用 自定义名称的 service
```ts
@Controller('user')
export class UserController {
  constructor(@Inject('_user_') private readonly userService: UserService) {}
}
```


## 自定义注入值

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: '_user_',
      useClass: UserService,
    },
    {
      provide: 'Huawei',
      useValue: ['遥遥领先'],
    },
  ],
})
export class UserModule {}
```

使用
```ts
@Controller('user')
// @Controller({
//   path: 'user',
//   version: '1',
// })
export class UserController {
  constructor(
    @Inject('_user_') private readonly userService: UserService,
    @Inject('Huawei') private sloganValue: string[],
  ) {}

  @Post('save')
  @HttpCode(500)
  createUser(@Headers() headers, @Request() req) {
    console.log(headers, req.body);
    return {
      message: 'response message',
      data: this.sloganValue.join(','),
    };
  }
}

/**
 * {
    "message": "response message",
    "data": "遥遥领先"
  }
 * /
```







