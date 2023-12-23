import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser';
//import * as dotenv from 'dotenv';

//dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const port = process.env.PORT || 3000;
  //app.use(cookieParser() as any);
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type'],
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
