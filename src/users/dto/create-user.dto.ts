import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;

  photo_id: number;
}
