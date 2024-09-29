import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()  // Defines this class as a GraphQL Object Type
export class User { 
  @Field(() => Int) // Specify the type if using GraphQL
  id: number;
  
  @Field()  // GraphQL field for the 'name' field of the User
  username: string;

  @Field(() => Role) // Specify the type for GraphQL
  role: Role;

  @Field()  // You can choose to expose or not expose this field in GraphQL
  password: string;  // If you don't want this in responses, remove this line
}
