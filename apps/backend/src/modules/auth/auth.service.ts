import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      email: registerDto.email,
      passwordHash: hashedPassword,
      role: registerDto.role || Role.CUSTOMER,
    });

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, 
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return { message: 'Logged in successfully', user: { id: user.id, email: user.email, role: user.role } };
  }

  logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
