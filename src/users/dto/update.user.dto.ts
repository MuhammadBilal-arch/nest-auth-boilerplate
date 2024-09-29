// src/user/dto/update-user.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional } from 'class-validator';

@InputType()  // Make sure to add this decorator
export class UpdateUserDto {
  @Field()
  @IsOptional()  
  @IsString()
  username?: string;

//   @IsOptional()
//   @IsEmail()
//   email?: string;
  @Field()
  @IsOptional()
  @IsString()
  password?: string;
}