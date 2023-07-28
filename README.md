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

## 注意事项

- nestjs 全局 provider 里 不能引入 Scope.REQUEST 的 provider
  如全局监听里，不能引入 HttpCommonDataProvider

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

## redis

```ts
@InjectRedis() private readonly redis: Redis,
await this.redis.set('testMap', JSON.stringify({ heh: 1 }), 'EX', 10);

// 锁
await this.lockService.lock('test1', 2 * 60 * 1000, 100, 10);
await new Promise((resolve) => setTimeout(resolve, 5000));
this.count++;
this.lockService.unlock('test1');
```

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

// 可以自动去除多余的字段，只要RegisUserDto定义的
@UsePipes(new ValidationPipe({ whitelist: true }))
async regis(@Body() dto: RegisUserDto) {
  console.log('dto', dto);
}
```

## 数据表命名

系统级别的都用`sys_`前缀，如`sys_user`

## todo

### demo 例子

- demoOne 单表查询增删改查
- demoOneSoftDelete 单表查询增删改查-软删除，deletedAt
  entity 加入 CommonSoftDeleteEntity，删除用 repository.softRemove
- demoOneToOne 一对一表
- demoOneToMany 一对多表
- demoManyToMany 多对多

#### 生成 demo 模板

方法，先编写好模板，然后用`lodash/template`库做文本替换

```js
const _ = require('lodash');
const templateString = '<%= age > 18 ? "Adult" : "Minor" %>';
const compiledTemplate = _.template(templateString);
const result = compiledTemplate({ age: 25 });
console.log(result); // 输出: Adult
```

### 登陆注册

默认全部接口都需要校验登陆，如不需要就加个`@NotNeedLogin()`

- 验证码
- 登陆
- 注册
- 怎么添加 token 验证+swagger
- 校验权限

```ts
// 添加，传多个就需要有其中一个权限
@NeedPermissions('user:add') //
```

###

### 表单

- 表单验证+swagger
- 表单设计器，前端的增删改查可视化 schema
- - 如果存后端：前端根据/apiSchemaPage/:pageid， 来获取
- - 如果存前端：前端根据/apiSchemaPage/:pageid， 先判断前端有无定义了，无就去读接口。 或者自定义其他页面+路由吧

1、自我介绍
各位考官好，我是 X 号考生，很荣幸能参加此次面试。接下来我简单介绍一下自己。(主要是涵盖自己的工作履历业绩，荣誉证书，对应聘这个岗位的优劣)
自 XX 以来一直从事的 XX，主要的工作内容是··....，任职期间共获取 XX 的销售额等等:同时，也获得 X 次荣誉，比如·....·等等，( 以及自己考取的证书的证书亦可以说 )

针对我应聘这个岗位的优劣势，我认为优势有一下几个方面
(1)我有较强的学习能力: 学习内容+成绩+获奖情况+自学的内容及成果
(2)我有较强的销售( 或沟通 )能力: 具体举例说明
(3)我有较强的抗压(或适应 )能力: 具体举例说明

各位考官好，我是 xx，很荣幸能参加此次面试。接下来我简单介绍一下自己。

- 我一直从事软件开发相关工作，主做前端开发方向，如网页、小程序、手机应用、电脑端 window 应用。平时喜欢研究不同方向的事物，如游戏开发和单片机开发。
- 针对我应聘的这个岗位，我认为优势有一下几个方面
- 在个人学习能力方面：喜欢研究不同方向的编程技术，xxxxx
- 在生活日常方面，和农商银行接触较多，
- 在工作经验方面：做过大量互联网产品项目，如江门共升精准教育家校平台和新会陈皮圈商城项目；也有政府类项目，如蓬江区的公安系统、台山市安监局的楠极安全软件。银行类型项目有最近的江门农商的小微金融系统的开发。

介绍工作方向、工作经验、个人爱好、与岗位匹配优势

2、是否已经离职?你离职的原因是什么，请快速回答无需思考
在职中，希望能去一个稳定向上的平台发展，银行的这个岗位刚好跟我对自己未来的发展规划完全一致。
3、为什么报考农行，对这个单位岗位有什么了解?
4、执行任务之前与领导确认好了原计划。如果执行任务时，发现原计划无法执行，怎么办？
四个要点 1.冷静：表达态度，道歉 2.解决：撤回计划，分情况解决 3.反思：分析原因 4.总结：惩前毖后

近五年你的职业规划

介绍你的大学专业，和本岗位匹配程度

随机题：
传统银行怎么转型？
如何看待电子支付方式对银行的冲击？
工作特别多时，你如何平衡？
如何确保自己能胜任这份工作？
你最大的优点是什么？
你最大的缺点是什么？
你对工资的要求是什么？
你平时有什么兴趣爱好？
人脉、能力、机遇、性格。你觉得哪个更重要？
你觉得我们现在的业务，有哪些可以改进的地方
银行必备品质？
