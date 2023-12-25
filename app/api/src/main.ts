import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://data-visualizer-2szambpc7-mohamedhadhoud1.vercel.app',
    credentials: true,
    allowedHeaders: ['Content-Type'],
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();
