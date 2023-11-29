import {Module} from '@nestjs/common';
import {GatewayController} from './gateway.controller';
import {GatewayService} from './gateway.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'STUDENTS_SERVICE',
          transport: Transport.NATS,
          options: {
            servers: [process.env.NATS_HOST],
          }
        }
      ])
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
