import {Module} from '@nestjs/common';
import {StudentsController} from './students.controller';
import {StudentsService} from './students.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'STUDENTS_SERVICE',
          transport: Transport.NATS,
          options: {
            servers: ['nats://localhost:4222'],
            queue: 'students_queue'
          }
        }
      ])
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
