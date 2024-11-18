import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './schedule.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ScheduleModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.enableCors();

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
