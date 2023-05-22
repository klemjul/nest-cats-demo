import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = this.usersService.find(username);
    if (user?.password !== password) {
      throw new UnauthorizedException("Sign in failed");
    }
    const access_token = await this.jwtService.signAsync({
      username: user.username,
      roles: user.roles,
    });
    return {
      access_token,
    };
  }
}
