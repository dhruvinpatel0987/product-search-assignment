import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'src/constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @Inject('PRODUCT_LIST_CONSUMER')
    private readonly productListConsumerClient: ClientKafka,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    const saved = await this.productRepo.save(product);

    await this.productListConsumerClient.emit(KAFKA_EVENTS, JSON.stringify(saved));

    return saved;
  }
}
