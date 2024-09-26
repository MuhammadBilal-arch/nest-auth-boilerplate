import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

//   @IsEmail()
//   email: string;

  @IsString()
  password: string;
}