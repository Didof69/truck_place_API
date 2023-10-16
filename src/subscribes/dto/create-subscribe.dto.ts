import { IsISO8601, IsInt, IsNotEmpty } from "class-validator";

export class CreateSubscribeDto {
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  unsubscribe_date: Date;
    
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  parking_id: number;
}
