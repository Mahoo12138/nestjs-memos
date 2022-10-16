import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { MemosService } from './memos.service';

@UseInterceptors(TransformInterceptor)
@Controller('/api')
export class MemosController {
  constructor(private readonly appService: MemosService) {}

  @Get('/status')
  getStatus() {
    return this.appService.getStatus();
  }
}
