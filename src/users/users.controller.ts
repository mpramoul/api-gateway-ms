import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { REQUEST } from '@nestjs/core';

@Controller('users')
export class UsersController {
  
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientProxy: ClientProxy,
    @Inject(REQUEST) private readonly request,
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const authHeader = await this.request.headers['authorization'];
      const token = typeof authHeader==='string' ? authHeader.replace('Bearer ', '') : undefined;
      const register_user = await firstValueFrom(this.clientProxy.send({cmd:'register_user'}, {_token: token, ...createUserDto}));
      return register_user;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const authHeader = await this.request.headers['authorization'];
      const token = typeof authHeader==='string' ? authHeader.replace('Bearer ', '') : undefined;
      const user_list = await firstValueFrom(this.clientProxy.send({cmd:'user_list'}, {_token: token}));
      return user_list;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const authHeader = await this.request.headers['authorization'];
      const token = typeof authHeader==='string' ? authHeader.replace('Bearer ', '') : undefined;
      const user_list_one = await firstValueFrom(this.clientProxy.send({cmd:'user_list_one'}, {_token: token, user_id: id}));
      return user_list_one;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const authHeader = await this.request.headers['authorization'];
      const token = typeof authHeader==='string' ? authHeader.replace('Bearer ', '') : undefined;
      const user_update = await firstValueFrom(this.clientProxy.send({cmd:'user_update'}, {_token: token, user_id: id, ...updateUserDto}));
      return user_update;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      try {
      const authHeader = await this.request.headers['authorization'];
      const token = typeof authHeader==='string' ? authHeader.replace('Bearer ', '') : undefined;
      const user_delete = await firstValueFrom(this.clientProxy.send({cmd:'user_delete'}, {_token: token, user_id: id}));
      return user_delete;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
