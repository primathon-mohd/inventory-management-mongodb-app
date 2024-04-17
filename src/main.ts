import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { HttpExceptionFilter } from './utils/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('');

  app.useGlobalFilters(new HttpExceptionFilter());

  const httpAdapterInstance = app.getHttpAdapter().getInstance();
  httpAdapterInstance.disable('x-powered-by');

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
    allowedHeaders: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('INVENTORY MANAGEMENT')
    .setDescription(
      "Inventory Management description : Two Types of users are available to manage the organization's data !!",
    )
    .setVersion('1.0')
    .addTag('Inventory Management END-POINTS')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      methodKey: string,
      // , controllerKey: string
    ) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
