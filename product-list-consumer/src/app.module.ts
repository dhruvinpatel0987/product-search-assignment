import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticSearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [ElasticSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
