import {Module} from '@nestjs/common';
import {StudentsController} from './students.controller';
import {StudentsService} from './students.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
