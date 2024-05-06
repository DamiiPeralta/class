import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './midldleware/logger.middelware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
