import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from './search/elasticsearch.service';
import { ELASTIC_SEARCH_INDEX } from './constant';

@Injectable()
export class AppService {
  constructor(private readonly elastic: ElasticsearchService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createProductSearchLog(data: any) {
    await this.elastic.index(ELASTIC_SEARCH_INDEX, data.id, data);
  }
}
