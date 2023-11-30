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

  async findByQueueId(queueId: string, user: User) {
    const url = `${this.baseUrl}/${queueId}?userId=${user.id}`;

    const { data: queue } = await this.httpClientService.get(url);

    return queue;
  }

  async findByCode(code: string, user: User) {
    const url = `${this.baseUrl}/?userId=${user.id}&code=${code}`;

    const { data: queue } = await this.httpClientService.get(url);

    return queue;
  }

  async list(user: User) {
    const url = this.baseUrl + `?userId=${user.id}`;

    const { data: queues } = await this.httpClientService.get(url);

    return queues;
  }

  async addUser(queueId: string, userId: string) {
    const url = `${this.baseUrl}/${queueId}/user`;
    const { data: res } = await this.httpClientService.post(url, { userId });

    return res;
  }

  async replaceUserPosition(
    queueId: string,
    userId: string,
    newPosition: number,
    ownerId: string,
  ) {
    const url = `${this.baseUrl}/${queueId}/users/${userId}/replace_position`;

    const { data: res } = await this.httpClientService.put(url, {
      newPosition,
      userId: ownerId,
    });

    return res;
  }

  async delete(queueId: string, ownerId: string) {
    const url = `${this.baseUrl}/${queueId}?userId=${ownerId}`;

    const { data: res } = await this.httpClientService.delete(url);

    return res;
  }

  private get baseUrl() {
    return this.configService.get('QUEUE_API_BASE_URL');
  }
}
