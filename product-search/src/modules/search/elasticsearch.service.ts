import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types';
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

  async update<T>(index: string, id: string, doc: Partial<T>): Promise<void> {
    await this.esClient.update({
      index,
      id,
      doc: {
        doc,
      },
    });
  }

  async delete(index: string, id: string): Promise<void> {
    await this.esClient.delete({
      index,
      id,
    });
  }

  async search<T>(
    payload,
  ): Promise<{ data: T[]; hits: SearchHitsMetadata<T> }> {
    const { hits } = await this.esClient.search<T>(payload);

    return { data: hits.hits.map((hit) => hit._source as T), hits };
  }
}
