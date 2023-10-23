import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginPayload } from './interfaces/login-payload.interface';
import { ConfigService } from '@nestjs/config';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await compare(password, user.password_hash);

    if (passwordMatches) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials.');
  }

  async login({ id, username, email }: LoginPayload) {
    const jwtPayload = { username, email, sub: id };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    return {
      accessToken,
    };
  }
}
