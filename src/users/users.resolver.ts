// src/user/users.resolver.ts
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './dto/users.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorators';

@Resolver(() => User)
@UseGuards(AuthGuard, RolesGuard) // Apply guards globally to the resolver
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @Roles('ADMIN')  // Only allow users with the 'ADMIN' role to access
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to access
  async findOne(@Args('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
    @Context() context: any  // Use the context to access the current user
  ): Promise<User> {
    const user = context.req.user;  // Access the current user from the context
    // Check if the user has appropriate roles or permissions if needed
    return this.userService.create(createUserDto);
  }

  @Mutation(() => User, { nullable: true })
  @Roles('ADMIN') // Restrict to admin
  async update(
    @Args('id') id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Mutation(() => User, { nullable: true })
  @Roles('ADMIN')  // Only allow users with the 'ADMIN' role to access
  async remove(@Args('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
