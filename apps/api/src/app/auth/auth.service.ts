import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  // async register(email: string, password: string, name?: string) {
  //   const existingUser = await this.usersService.findByEmail(email);
  //   if (existingUser) {
  //     throw new ConflictException('Email already exists');
  //   }
  //
  //   const user = await this.usersService.create(email, password, name);
  //   // TODO: fix
  //   // const { password: _, ...result } = user.toObject();
  //   const { password: _, ...result } = (user as any).toObject();
  //
  //   return this.login(result);
  // }

  async register(email: string, password: string, name?: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(email, password, name);

    // ✅ Pass full user
    return this.login(user);
  }

}
