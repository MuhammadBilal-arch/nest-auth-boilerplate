// src/auth/dto/login.dto.ts
import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client'; 

export class LoginDto {
  @ApiProperty({
    example: 'Ahmed',
    description: 'The username of the user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'USER | MODERATOR | ADMIN | SUPER_ADMIN ', // Set an example value for Swagger documentation
    description: 'The role of the user',
  })
  @IsEnum(Role, { message: 'Role must be either USER or ADMIN' }) // Validate the role field
  role: Role;
}
