import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';

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
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
