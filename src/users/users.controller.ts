// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorators';

@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth('access-token') // This will tell Swagger to include the Bearer token
@ApiTags('users') // Tag the controller for Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @Roles('ADMIN','SUPER_ADMIN','MODERATOR')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getProfile(@Req() req: Request) {
    console.log(req['user'])
    const userId = req['user']['id']; // Assuming your JWT payload includes userId
    return this.userService.findOne(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
