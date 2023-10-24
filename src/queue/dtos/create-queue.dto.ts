import { IsString, Max, Min, IsInt } from 'class-validator';

export class CreateQueueDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Max(120)
  @Min(1)
  averageWaitTimeInMinutes: number;

  @IsInt()
  @Max(10)
  @Min(4)
  maxParticipants: number;
}
