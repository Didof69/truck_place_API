import { IsLatitude, IsLongitude, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class InseeLocationDto {
  @IsNotEmpty()
  @Length(5, 5)
  @Matches(/[0-9AB]/)
  insee_code: string;
}
