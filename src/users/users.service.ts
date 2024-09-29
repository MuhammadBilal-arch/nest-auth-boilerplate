import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from '../../prisma/prisma.service'; // Import PrismaService
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  // Find all users
  async findAll() {
    return this.prisma.user.findMany(); // Fetch all users from the database
  }

  // Find a user by ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id : Number(id) } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    // Check for unique username constraint before creating
    const existingUser = await this.prisma.user.findUnique({
      where: { username: createUserDto.username }, // Assuming you have a unique username
    });

    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          password: hashedPassword,
          role: createUserDto.role,
        }, // Insert new user into the database
      });
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  // Update an existing user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto, // Update user details in the database
      });
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }

  // Remove a user by ID
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.prisma.user.delete({ where: { id } }); // Delete user from the database
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
    }
  }
}
