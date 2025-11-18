import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Authcontroller } from './auth/auth.controller';

@Module({
  imports: [
    //Conexion NATS----------------------------------
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {servers: ['nats://localhost:4222']}
      }
    ])
    //------------------------------------------------
  ],
  controllers: [UsersController,Authcontroller],
  providers: [],
})
export class UsersModule {}
