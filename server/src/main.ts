import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PORT } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
