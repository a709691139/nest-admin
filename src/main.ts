import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');

  const configSerive = app.get(ConfigService);
  const enableSwagger = configSerive.get<boolean>('enableSwagger');
  if (enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('nest接口')
      .setDescription('admin')
      .setVersion('1.0.0')
      // .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
      // .setBasePath('http://localhost:5000')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document);
  }

  const port = configSerive.get<number>('port');
  await app.listen(port);
}
bootstrap();
