import { Expose, Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Participant } from './interfaces/participant.interface';

export class QueueModel {
  @Expose()
  id: string;

  @Expose()
  code: string;

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
  participantsCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class QueueWithParticipantsModel extends QueueModel {
  @Expose()
  participants: Participant[];
}

export class QueuesModel {
  @ValidateNested()
  @Type(() => QueueModel)
  queues: QueueModel[];
}
