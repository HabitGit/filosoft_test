import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('get-test')
  getTest(): string {
    return this.studentsService.getTest();
  }

  @MessagePattern('students.v1.graded')
  getInfo(@Payload() info) {
    console.log('Info: ', info)
  }
}
