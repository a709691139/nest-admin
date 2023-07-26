import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { join } from 'path';
import { GlobalExceptionFilter } from './common/filter/GlobalExceptionFilter';

const PREFIX = '/api';
const SWAGGER_PATH = '/swagger';
const STATIC_ASSETS_PATH = '/static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(PREFIX);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: STATIC_ASSETS_PATH,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints),
        );
        const message = messages.join(', ');
        throw new HttpException(
          'Validation failed：' + message,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  const configSerive = app.get(ConfigService);
  const enableSwagger = configSerive.get<boolean>('enableSwagger');
  if (enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('nest接口')
      .setDescription('admin')
      .setVersion('1.0.0')
      .addGlobalParameters({
        name: 'tenantId',
        description: 'tenantId',
        in: 'header',
        required: true,
        schema: {
          type: 'string',
          default: '001',
        },
      })
      .addBearerAuth({
        type: 'apiKey',
        name: 'token',
        in: 'header',
        scheme: 'token',
        description: '开发测试环境直接传admin可免登陆',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    document.security = [{ bearer: [] }];
    SwaggerModule.setup(SWAGGER_PATH, app, document);
  }

  const port = configSerive.get<number>('port');
  await app.listen(port, () => {
    Logger.debug(`
    env: ${process.env.NODE_ENV}
    启动成功：http://localhost:${port}${PREFIX}
    API 文档：http://localhost:${port}${SWAGGER_PATH}
    静态文件：http://localhost:${port}${STATIC_ASSETS_PATH}
    `);
  });
}
bootstrap();
