import { IsLatitude, IsLongitude, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateLocationDto {
  @IsNotEmpty()
  @Length(5, 5)
  insee_code: string;

  @IsNotEmpty()
  @Length(5, 5)
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
