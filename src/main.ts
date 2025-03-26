import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the global prefix to 'api/v1'
  app.setGlobalPrefix('api/v1');

  // Configure the ValidationPipe to whitelist
  // and forbid non-whitelisted properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
