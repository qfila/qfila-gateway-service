import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateQueueDTO } from './dtos/create-queue.dto';
import { QueueService } from './queue.service';
import { plainToInstance } from 'class-transformer';
import {
  QueueModel,
  QueueWithParticipantsModel,
  QueuesModel,
} from './queue.model';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReplaceUserPositionDTO } from './dtos/replace-user-position.dto';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async listOwnerQueues(
    @Request() req: RequestWithUser,
    @Query('code') code?: string,
  ) {
    if (code) {
      const queue = await this.queueService.findByCode(code, req.user);

      return plainToInstance(QueueModel, queue);
    }

    const queues = await this.queueService.list(req.user);

    return plainToInstance(QueuesModel, { queues });
  }

  @Get(':id')
  async findQueueById(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    const queueWithParticipants = await this.queueService.findByQueueId(
      id,
      req.user,
    );

    return plainToInstance(QueueWithParticipantsModel, queueWithParticipants);
  }

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

  @Post(':id/join')
  async addUser(@Param('id') id: string, @Request() req: RequestWithUser) {
    const res = await this.queueService.addUser(id, req.user.id);

    return res;
  }

  @Delete(':id/user/:user_id')
  async removeUser(
    @Param('id') id: string,
    @Param('user_id') userId: string,
    @Request() req: RequestWithUser,
  ) {
    const res = await this.queueService.removeUser(id, req.user.id, userId);

    return res;
  }

  @Put(':id/users/:user_id/replace_position')
  async replaceUserPosition(
    @Param('id') queueId: string,
    @Param('user_id') userId: string,
    @Body() replaceUserPositionDTO: ReplaceUserPositionDTO,
    @Request() req: RequestWithUser,
  ) {
    return this.queueService.replaceUserPosition(
      queueId,
      userId,
      replaceUserPositionDTO.newPosition,
      req.user.id,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.queueService.delete(id, req.user.id);
  }
}
