import { IsLatitude, IsLongitude, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateLocationDto {
  @IsNotEmpty()
  @Length(5, 5)
  @Matches(/[0-9AB]/)
  insee_code: string;

  @IsNotEmpty()
  @Length(5, 5)
  @Matches(/[0-9]/)
  zip_code: string;

  @IsNotEmpty()
  @IsString()
  parking_name: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: string;
}
