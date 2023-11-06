import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('To-do-list')
  .setDescription('o sistema consiste em criar uma api onde possa ser consulta, criada , atualizada a tarefa')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  app.use(cookieParser());
  
  app.use(helmet());
  app.use(csurf({ cookie: true }));

  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
