import { IsNumber, Max, Min } from 'class-validator';

export class ReplaceUserPositionDTO {
  @IsNumber()
  @Min(1)
  @Max(10)
  newPosition: number;
}
