import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('AUTH_SERVICE') private readonly clientProxy: ClientProxy) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const register_user = await firstValueFrom(this.clientProxy.send({cmd:'register_user'}, createUserDto));
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
  findAll() {
    //return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.usersService.remove(+id);
  }
}
