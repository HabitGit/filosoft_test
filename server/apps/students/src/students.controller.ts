import {Controller, ValidationPipe} from '@nestjs/common';
import {StudentsService} from './students.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {GradeInfoDto} from "./dtos/gradeInfo.dto";
import {IQueryParams} from "./interfaces/queryParams.interface";
import {Grades} from "./grades.model";
import {StudentDto} from "./dtos/student.dto";

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {
    }

    @MessagePattern('get-test')
    getTest() {
        return this.studentsService.getTest();
    }

    @MessagePattern('students.v1.graded')
    getGradeInfo(@Payload() info: GradeInfoDto): Promise<void> {
        return this.studentsService.setInfo(info);
    }

    @MessagePattern('tolstov.log.get')
    getGradeLog(@Payload() queryParams: IQueryParams): Promise<{ count: number, rows: Grades[] }> {
        return this.studentsService.getGradeLog(queryParams);
    }

    @MessagePattern('tolstov.statistic.get')
    getStudentStatistic(@Payload(ValidationPipe) personalCode: string): Promise<{
        student: StudentDto,
        statistic: Grades[]
    }> {
        return this.studentsService.getStudentStatistic(personalCode);
    }
}
