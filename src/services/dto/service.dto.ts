import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class ServiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(4)
  service_id: number;
}
