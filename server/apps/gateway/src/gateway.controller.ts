import {Controller, Get, Param, Query, ValidationPipe} from '@nestjs/common';
import {GatewayService} from './gateway.service';
import {IPersonalCode, IQueryParams} from "./interfaces/queryParams.interface";
import {Grades} from "../../students/src/grades.model";
import {Observable} from "rxjs";
import {StudentDto} from "../../students/src/dtos/student.dto";

@Controller()
export class GatewayController {
    constructor(private readonly gatewayService: GatewayService) {
    }

    @Get()
    getHello() {
        return this.gatewayService.getHello();
    }

    @Get('log')
    getGradesLog(@Query() params: IQueryParams): Promise<Observable<{ count: number, rows: Grades[] }>> {
        return this.gatewayService.getGradeLog(params);
    }

    @Get('/statistic/:personalCode')
    getPersonalStatistic(@Param(ValidationPipe) personalCode: IPersonalCode): Promise<Observable<{
        student: StudentDto,
        statistic: Grades[]
    }>> {
        return this.gatewayService.getPersonalStatistic(personalCode);
    }
}
