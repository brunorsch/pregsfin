import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { gerarDocumentFactory } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('docs', app, gerarDocumentFactory(app));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
