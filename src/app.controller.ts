import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination, ResponseWrap } from './common/dto/ResponseWrap';
import { HttpCommonDataProvider } from './common/provider/HttpCommonDataProvider';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { RedisLockService } from 'nestjs-simple-redis-lock';
import { NotNeedLogin } from './common/decorator/NotNeedLogin';

@ApiTags('app')
@ApiExtraModels(Pagination, ResponseWrap)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRedis() private readonly redis: Redis,
    private readonly lockService: RedisLockService,
  ) {}
  @Inject()
  private readonly httpCommonDataProvider: HttpCommonDataProvider;

  count = 0;
  @ApiOperation({ summary: '简介', description: '说明' })
  @NotNeedLogin()
  @Get('/')
  async getHello() {
    this.httpCommonDataProvider.incrementCounter();
    console.log(
      'getHelloincrementCounter',
      this.httpCommonDataProvider.getCounter(),
    );
    this.count++;
    console.log(`index1 / 当前进程的PID为：${process.pid}`, this.count);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log('index1 count', this.count);
    return this.appService.getHello();
  }

  @ApiOperation({ summary: '简介', description: '说明' })
  @NotNeedLogin()
  @Get('/2')
  async getHello2() {
    this.count++;
    console.log(`index2 / 当前进程的PID为：${process.pid}`, this.count);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('index2 count', this.count);
    return this.appService.getHello();
  }

  @Get('/redis/set')
  @NotNeedLogin()
  async redisSet() {
    await this.redis.set('testMap', JSON.stringify({ heh: 1 }), 'EX', 10);
    const data = await this.redis.get('testMap');
    return {
      data,
      type: typeof data,
    };
  }

  @Get('/redis/get')
  @NotNeedLogin()
  async redisGet() {
    return this.redis.get('test');
  }

  @Get('/redis/del')
  @NotNeedLogin()
  async redisDel() {
    return this.redis.del('test');
  }

  @Get('/redis/lock')
  @NotNeedLogin()
  async redisLock() {
    await this.lockService.lock('test1', 2 * 60 * 1000, 100, 10);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.count++;
    this.lockService.unlock('test1');
    return this.count;
  }
}
