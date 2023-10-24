import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateQueueDTO } from './dtos/create-queue.dto';
import { HttpClientService } from 'src/http-client/http-client.service';
import { User } from 'src/auth/interfaces/request-with-user.interface';

@Injectable()
export class QueueService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async create(createQueueDTO: CreateQueueDTO, user: User) {
    const url = this.baseUrl;

    const { data: createdQueue } = await this.httpClientService.post(url, {
      ...createQueueDTO,
      ownerId: user.id,
    });

    return createdQueue;
  }

  async list(user: User) {
    const url = this.baseUrl + `?ownerId=${user.id}`;

    const { data: queues } = await this.httpClientService.get(url);

    return queues;
  }

  private get baseUrl() {
    return this.configService.get('QUEUE_API_BASE_URL');
  }
}
