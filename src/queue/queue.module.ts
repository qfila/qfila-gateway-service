import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { HttpClientModule } from 'src/http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
