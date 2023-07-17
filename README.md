# Nest-admin

nestjs+typeOrm+react+amis 组成的基础管理后台，含权限管理、菜单管理、自定义表单设计器

## 文档

- nestjs: https://nestjs.bootcss.com/first-steps.html
- swagger: https://docs.nestjs.com/openapi/types-and-parameters
  https://docs.nestjs.com/openapi/operations
- typeorm: https://typeorm.bootcss.com/entities
- 校验 dto: class-validator

## 接口

- api: http://localhost:3000/api/xxx 接口统一前缀 /api
- swagger: http://localhost:3000/swagger
- 静态文件: 位置/public，访问: http://localhost:3000/static/temp.js

## 运行

- 安装 mysql ，创建 `nestjs` 数据库
- 安装 redis
- 配置好`config/development.ts`

## 分页查询，前端可自定义参数条件

- 1、支持模糊查询 前后带\*
- 2、取非查询 在查询输入框前面输入! 则查询该字段不等于输入值的数据 (数值类型不支持此种查询,可以将数值字段定义为字符串类型的)
- 3、in 查询 若传入的数据带,(逗号) 则表示该查询为 in 查询
- 4、时间范围查询，需包含两个字段：{_}\_begin，{_}\_end
- 5、大小查询："lt 100" 中间空格 , 小于查询 lt 100, 小于等于 le 100, 大于 gt 100, 大于等于 ge 100

## 接口返回数据

统一格式返回， `{status:0,message:"成功", data:'xxx'}`

- 普通 @ApiResponseWrap(DemoOne)
- 分页 @ApiPaginatedResponse(DemoOne)

## 接口校验

不建议在 entity 里加，因为会把那些分页查询编辑接口也校验

```ts
import { IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

/** 新增接口dto */
export class AddUserDto {
  @ApiProperty({
    description: '名称',
    required: true,
  })
  @IsNotEmpty({ message: 'name 不允许为空' })
  name: string;

  @IsNotEmpty({ message: 'code 不允许为空' })
  code: string;

  @IsArray()
  @ArrayNotEmpty()
  myArray: any[];
}
```

## todo

### demo 例子

- demoOne 单表查询增删改查
- demoOneSoftDelete 单表查询增删改查-软删除，每个表都可以选加入 createdAt createdBy deletedAt
- demoOneToOne 一对一表
- demoOneToMany 一对多表
- demoManyToMany 多对多

### 登陆注册

- 验证码
- 登陆
- 注册
- 怎么添加 token 验证+swagger

### 表单

- 表单验证+swagger
- 表单设计器，前端的增删改查可视化 schema
- - 如果存后端：前端根据/apiSchemaPage/:pageid， 来获取
- - 如果存前端：前端根据/apiSchemaPage/:pageid， 先判断前端有无定义了，无就去读接口。 或者自定义其他页面+路由吧
