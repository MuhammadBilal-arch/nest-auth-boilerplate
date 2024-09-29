import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

@InputType()  // Make sure to add this decorator
export class CreateUserDto {
  @ApiProperty({
    example: 'Admin', // Set an example value for Swagger documentation
    description: 'The username of the user',
  })
  @Field({ description: 'The username of the user' })
  @IsString()
  username: string;

  //   @IsEmail()
  //   email: string;

  @ApiProperty({
    example: '123456', // Set an example value for Swagger documentation
    description: 'The password of the user',
  })
  @Field({ description: 'The password of the user' })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'USER | MODERATOR | ADMIN | SUPER_ADMIN ', // Set an example value for Swagger documentation
    description: 'The role of the user',
  })
  @Field(() => Role, { description: 'The role of the user' })
  @IsEnum(Role, { message: 'Role must be either USER or ADMIN' }) // Validate the role field
  role: Role;
}
