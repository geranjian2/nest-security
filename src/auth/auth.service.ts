import { Injectable, Logger } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from 'src/user/entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.getOneEmail(email);
    Logger.debug(JSON.stringify(user));

    if (user && compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };

    return {
      ...rest,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
