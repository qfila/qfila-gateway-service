import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CreateQueueDTO } from './dtos/create-queue.dto';
import { QueueService } from './queue.service';
import { plainToInstance } from 'class-transformer';
import { QueueModel, QueuesModel } from './queue.model';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async create(
    @Body() createQueueDTO: CreateQueueDTO,
    @Request() req: RequestWithUser,
  ) {
    const createdQueue = await this.queueService.create(
      createQueueDTO,
      req.user,
    );

    return plainToInstance(QueueModel, createdQueue);
  }

  @Get()
  async listOwnerQueues(@Request() req: RequestWithUser) {
    const queues = await this.queueService.list(req.user);

    return plainToInstance(QueuesModel, queues);
  }
}
