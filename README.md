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

## 运行

- 安装 mysql ，创建 `nestjs` 数据库
- 安装 redis
- 配置好`config/development.ts`

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
