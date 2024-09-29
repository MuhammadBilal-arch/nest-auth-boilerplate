import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth') // Tag the controller for Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' }) // Describe the operation
  @ApiResponse({ status: 200, description: 'Login successful' }) // Response description
  @ApiResponse({ status: 401, description: 'Invalid credentials' }) // Error description
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
