import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpException, HttpStatus, Query, Search } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientProxy } from '@nestjs/microservices';
import { REQUEST } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';

@Controller('clients')
export class ClientsController {
  constructor(
    @Inject('CLIENT_SERVICE')
    private readonly clientProxy: ClientProxy,
    @Inject(REQUEST) private readonly request,
  ) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const clientHeader = this.request.headers['authorization'];
      const token = typeof clientHeader==='string' ? clientHeader.replace('Bearer ', '') : undefined;
      const register_client = await firstValueFrom(this.clientProxy.send({cmd: 'register_client'},{_token: token, ...createClientDto}));
      return register_client;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return 'Registro de clientes ApiGateway';
  }

  @Get()
  async findAll(@Query('search') search:string) {
      try {
      const clientHeader = this.request.headers['authorization'];
      const token = typeof clientHeader==='string' ? clientHeader.replace('Bearer ', '') : undefined;
      const find_clients = await firstValueFrom(this.clientProxy.send({cmd: 'find_clients'},{_token: token, search: search}));
      return find_clients;
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
      const clientHeader = this.request.headers['authorization'];
      const token = typeof clientHeader==='string' ? clientHeader.replace('Bearer ', '') : undefined;
      const find_client = await firstValueFrom(this.clientProxy.send({cmd: 'find_client'},{_token: token, client_id:id}));
      return find_client;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
        message: error.message,
        errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      const clientHeader = this.request.headers['authorization'];
      const token = typeof clientHeader==='string' ? clientHeader.replace('Bearer ', '') : undefined;
      const update_client = await firstValueFrom(this.clientProxy.send({cmd: 'update_client'},{_token: token, client_id:id, ...updateClientDto}));
      return update_client;
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
      const clientHeader = await this.request.headers['authorization'];
      const token = typeof clientHeader==='string' ? clientHeader.replace('Bearer ','') : undefined;
      const delete_client = await firstValueFrom(this.clientProxy.send({cmd:'delete_client'}, {_token:token, client_id:id}));
      return delete_client;
    } catch (error) {
      console.log('CATCH', error);
      throw new HttpException({
      message: error.message,
      errors: error.errors,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
