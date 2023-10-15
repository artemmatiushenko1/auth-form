import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpRequestDto } from './dtos/sign-up-request.dto';
import { SignInRequestDto } from './dtos/sign-in-request.dto';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpRequestDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequestDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  getCurrentUser(@Req() request: Request) {
    return this.userService.findOne(request.user.id);
  }
}
