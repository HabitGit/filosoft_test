import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern({ cmd: 'get-test' })
  getTest(): string {
    return this.studentsService.getTest();
  }
}
