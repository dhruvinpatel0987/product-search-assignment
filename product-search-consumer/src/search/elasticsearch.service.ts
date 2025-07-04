import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly esClient: NestElasticsearchService) {}

  async index<T>(index: string, id: string, document: T): Promise<void> {
    await this.esClient.index<T>({
      index,
      id,
      document,
    });
  }
}
