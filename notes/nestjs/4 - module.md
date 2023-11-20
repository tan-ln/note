# Modules

```ts
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [], // 可导出共享给其他模块
})
```

全局模块
```ts
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [], // 可导出共享给其他模块
})
```