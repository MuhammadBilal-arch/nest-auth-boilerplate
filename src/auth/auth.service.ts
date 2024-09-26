import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';  
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService , private readonly jwtService: JwtService) {}  // Inject PrismaService

  async login(loginDto: { username: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    // Check if user exists and password matches
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const payload = { username: user.username, id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { message: 'Login successful', accessToken , user };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async register(registerDto: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: registerDto.username,
          password: hashedPassword,
        },
      });
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { message: 'User registered successfully', accessToken, user };
    } catch (error) {
      // Handle unique constraint violation for username
      if (error.code === 'P2002') {
        throw new Error('Username already exists');
      }
      throw error;
    }
  }
}
