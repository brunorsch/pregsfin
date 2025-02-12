import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { gerarDocumentFactory } from './swagger.config';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('docs', app, gerarDocumentFactory(app));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
