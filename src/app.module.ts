import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';
import { PostSubscriber } from '@/provider/EntityListener';
import { HttpCommonDataProvider } from './provider/HttpCommonDataProvider';
import { RequestInterceptor } from './provider/RequestInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DemoOneSoftDeleteModule } from './modules/demo/demoOneSoftDelete/demoOneSoftDelete.module';
import { DemoOneModule } from './modules/demo/demoOne/demoOne.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisLockModule } from 'nestjs-simple-redis-lock';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        return {
          config: {
            host: redisConfig.host,
            port: redisConfig.port,
            db: redisConfig.database,
            password: redisConfig.password,
            ttl: redisConfig.ttl,
          },
        };
      },
    }),
    RedisLockModule.register({}),
    SystemModule,
    DemoOneModule,
    DemoOneSoftDeleteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpCommonDataProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    PostSubscriber,
  ],
})
export class AppModule {}
