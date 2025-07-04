import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ElasticsearchService } from './modules/search/elasticsearch.service';
import { v4 as uuidv4 } from 'uuid';
import { ELASTIC_SEARCH_INDEX, KAFKA_EVENTS } from './constant';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_SEARCH_CONSUMER')
    private readonly productSearchConsumerClient: ClientKafka,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async search(query: string): Promise<ProductDto[]> {
    const { data } = await this.elasticsearchService.search<ProductDto>({
      index: ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['name^3', 'sku^2', 'description'],
          fuzziness: 2,
        },
      },
    });

    this.productSearchConsumerClient.emit(KAFKA_EVENTS, {
      id: uuidv4(),
      query,
      data,
    });

    return data;
  }
}
