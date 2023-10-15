import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpRequestDto } from './dtos/sign-up-request.dto';
import { SignInRequestDto } from './dtos/sign-in-request.dto';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpRequestDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequestDto) {
    return this.authService.signIn(signInDto);
  }
}
