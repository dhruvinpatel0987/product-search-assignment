import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { KAFKA_EVENTS } from './constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(KAFKA_EVENTS)
  productSearch(data: any) {
    return this.appService.createProductSearchLog(data);
  }
}
