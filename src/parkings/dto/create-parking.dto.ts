import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsISO8601, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsPositive, IsString, Length, Matches, ValidateNested } from "class-validator";
import { ServiceDto } from "src/services/dto/service.dto";
import { Service } from "src/services/entities/service.entity";

export class CreateParkingDto {
  @IsNotEmpty()
  @IsString()
  parking_name: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  nb_space_all: number;

  @IsNotEmpty()
  @IsInt()
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
  @Length(5, 5)
  @Matches(/[0-9AB]/)
  insee_code: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  user_id: number;

  photo_id: number;

  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => ServiceDto) // Utilisez le DTO de validation des services
  services: Service[];
}
