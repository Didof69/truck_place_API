import { IsNotEmpty, IsInt } from "class-validator";


export class ParkingDto {
  @IsNotEmpty()
  @IsInt()
  parking_id: number;
}
