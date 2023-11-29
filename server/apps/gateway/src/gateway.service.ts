import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {IQueryParams} from "./interfaces/queryParams.interface";

@Injectable()
export class GatewayService {
    constructor(
        @Inject('STUDENTS_SERVICE') private studentsService: ClientProxy,
    ) {
    }

    getHello() {
        return 'Welcome &#128519';
    }

    async getGradeLog(params: IQueryParams) {
        return this.studentsService.send(
            'tolstov.log.get',
            params,
        );
    }

    async getPersonalStatistic(personalCode: number) {
        return this.studentsService.send(
            'tolstov.statistic.get',
            personalCode,
        );
    }
}
