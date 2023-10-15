import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInRequestDto } from './dtos/sign-in-request.dto';
import { SignUpRequestDto } from './dtos/sign-up-request.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private signJwtToken(user: User) {
    const payload = { id: user.id, role: user.role };
    return this.jwtService.signAsync(payload);
  }

  async signIn(signInRequest: SignInRequestDto) {
    const existingUser = await this.userService.findByEmail(
      signInRequest.email,
    );

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (await bcrypt.compare(signInRequest.password, existingUser.password)) {
      return {
        accessToken: await this.signJwtToken(existingUser),
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(signUpRequest: SignUpRequestDto) {
    const existingUser = await this.userService.findByEmail(
      signUpRequest.email,
    );

    if (existingUser) {
      throw new ConflictException(
        `User with email ${signUpRequest.email} already exists`,
      );
    }

    const newUser = await this.userService.create(signUpRequest);

    return {
      accessToken: await this.signJwtToken(newUser),
    };
  }
}
