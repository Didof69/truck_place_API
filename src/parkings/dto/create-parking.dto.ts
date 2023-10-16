import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsISO8601, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { CreateOpinionDto } from "src/opinions/dto/create-opinion.dto";
import { Opinion } from "src/opinions/entities/opinion.entity";
import { ServiceDto } from "src/services/dto/service.dto";
import { Service } from "src/services/entities/service.entity";
import { CreateSubscribeDto } from "src/subscribes/dto/create-subscribe.dto";

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
  @Length(5, 5)
  insee_code: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  user_id: number;

  photo_id: number;

  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => ServiceDto) // Utilisez le DTO de validation des Saison
  services: Service[];

  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => CreateOpinionDto) // Utilisez le DTO de validation des Saison
  opinions: Opinion[];

  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => CreateSubscribeDto) // Utilisez le DTO de validation des Saison
  subscribes: Opinion[];
}
