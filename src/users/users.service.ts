// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from '../../prisma/prisma.service';  // Import PrismaService

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}  // Inject PrismaService

  // Find all users
  async findAll() {
    return this.prisma.user.findMany();  // Fetch all users from the database
  }

  // Find a user by ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,  // Insert new user into the database
    });
  }

  // Update an existing user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,  // Update user details in the database
    });
  }

  // Remove a user by ID
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.prisma.user.delete({ where: { id } });  // Delete user from the database
  }
}
