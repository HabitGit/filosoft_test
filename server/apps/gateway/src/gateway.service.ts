import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {IPersonalCode, IQueryParams} from "./interfaces/queryParams.interface";
import {Observable} from "rxjs";
import {Grades} from "../../students/src/grades.model";
import {StudentDto} from "../../students/src/dtos/student.dto";

@Injectable()
export class GatewayService {
    constructor(
        @Inject('STUDENTS_SERVICE') private studentsService: ClientProxy,
    ) {
    }

    getHello() {
        return 'Welcome &#128519';
    }

    async getGradeLog(params: IQueryParams): Promise<Observable<{ count: number, rows: Grades[] }>> {
        return this.studentsService.send(
            'tolstov.log.get',
            params,
        );
    }

    async getPersonalStatistic(personalCode: IPersonalCode): Promise<Observable<{
        student: StudentDto,
        statistic: Grades[]
    }>> {
        return this.studentsService.send(
            'tolstov.statistic.get',
            personalCode.personalCode,
        );
    }
}
