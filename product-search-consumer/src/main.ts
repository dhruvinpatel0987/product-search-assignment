import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('process.env.KAFKA_BROKER :>> ', process.env.KAFKA_BROKER);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
    },
  });

  await app.startAllMicroservices();

  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Listening on port', process.env.PORT || 3000);
  });
}
bootstrap();
