import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';

@Module({
  exports: [HttpClientService],
  providers: [HttpClientService],
})
export class HttpClientModule {}
