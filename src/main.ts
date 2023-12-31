import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { promises as FS } from 'fs';
import helmet from 'helmet';
import { nestCsrf } from 'ncsrf';

async function bootstrap() {

  const httpsOptions = {
    key: await FS.readFile('./llaves/privada-sin-pass.pem'),
    cert: await FS.readFile('./llaves/publica.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(helmet());
  
  app.enableCors({
    origin: "http://localhost:3001",
  });
  
  // app.use(nestCsrf());
  
  const config = new DocumentBuilder()
    .setTitle('Seguridad')
    .setDescription('API de Seguridad')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
