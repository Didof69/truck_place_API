import { IsLatitude, IsLongitude, IsNotEmpty, IsString, Length } from "class-validator";

export class InseeLocationDto {
  @IsNotEmpty()
  @Length(5, 5)
  insee_code: string;
}
