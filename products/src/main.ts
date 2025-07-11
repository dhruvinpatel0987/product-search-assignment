import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Listening on port', process.env.PORT || 3000);
  });
}

bootstrap();
