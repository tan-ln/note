# 实体 Entity

实体是一个映射到数据库表的类。 你可以通过定义一个新类来创建一个实体，并用@Entity()来标记：

```ts

import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
 
@Entity()
export class Test {
  // 自动递增的主键
  @PrimaryGeneratedColumn()
  id:number
  
  @Column()
  name:string

  @Column()
  password:string

  @Column()
  age:number

```