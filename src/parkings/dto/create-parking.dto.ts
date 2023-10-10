export class CreateParkingDto {
  parking_id: number;
  parking_name: string;
  longitude: number;
  latitude: number;
  nb_space_all: number;
  nb_space_free: number;
  registration_date: Date;
  public_view: boolean;
  main_road?: string;
  direction?: string;
  location_id: number;
  user_id: number;
  photo_id?: number;
}
