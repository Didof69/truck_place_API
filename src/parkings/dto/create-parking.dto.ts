import { IsBoolean, IsISO8601, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsPositive, IsString, Max } from "class-validator";

export class CreateParkingDto {
  @IsNotEmpty()
  @IsString()
  parking_name: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  nb_space_all: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  nb_space_free: number;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  registration_date: Date;

  @IsNotEmpty()
  @IsBoolean()
  public_view: boolean;

  main_road: string;

  direction: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  location_id: number;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  user_id: number;

  photo_id: number;
}
