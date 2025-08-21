/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = await this.usersService.create(createUserDto);
    const { password, ...safeUser } = newUser; // works now
    return safeUser;
  }

  async login(email: string, password: string): Promise<Omit<User, 'password'>> {
    // find user including password field
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // return safe user (without password)
    const { password: _p, ...safeUser } = user as any;
    return safeUser;
  }
}
