import { Expose, Exclude } from 'class-transformer';

export class QueueModel {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Exclude()
  ownerId: string;

  @Expose()
  description: string;

  @Expose()
  averageWaitTimeInMinutes: number;

  @Expose()
  maxParticipants: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class QueuesModel {
  queues: QueueModel[];
}
