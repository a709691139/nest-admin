import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';
import { PostSubscriber } from '@/common/provider/EntityListener';
import { HttpCommonDataProvider } from './common/provider/HttpCommonDataProvider';
import { RequestInterceptor } from './common/provider/RequestInterceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoOneModule } from './modules/demo/demoOne/demoOne.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisLockModule } from 'nestjs-simple-redis-lock';
import { AuthMiddleware } from './common/middleware/AuthMiddleware';
import { AuthGuard } from './common/provider/AuthGuard';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpCommonDataProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PostSubscriber,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
