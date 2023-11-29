import {Controller} from '@nestjs/common';
import { StudentsService } from './students.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {GradeInfoDto} from "./dtos/gradeInfo.dto";

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('get-test')
  getTest() {
    return this.studentsService.getTest();
  }

  @MessagePattern('students.v1.graded')
  getGradeInfo(@Payload() info: GradeInfoDto) {
    console.log('Info: ', info)
    return this.studentsService.setInfo(info);
  }
}
