import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsModule as ClientsMsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsMsModule.register([
    {
    name: 'CLIENT_SERVICE',
    transport: Transport.NATS,
    options: ['nats://localhost:4222'],
  }])],
  controllers: [ClientsController],
  providers: [],
})
export class ClientsModule {}
