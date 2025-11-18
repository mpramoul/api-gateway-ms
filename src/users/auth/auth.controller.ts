import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly clientProxy: ClientProxy) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      const auth_login = await firstValueFrom(this.clientProxy.send({cmd:'login'}, authLoginDto))
      return auth_login;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const auth_register = await firstValueFrom(this.clientProxy.send({cmd:'register'},createUserDto));
      return auth_register;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}