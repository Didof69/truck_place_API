import { IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/)
  password: string;
}
