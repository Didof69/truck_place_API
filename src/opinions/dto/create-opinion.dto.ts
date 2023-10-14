import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateOpinionDto {
  @IsNotEmpty()
  @IsString()
  opinion: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  note: number;

  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  parking_id: number;
}
