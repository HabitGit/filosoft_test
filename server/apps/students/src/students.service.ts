import {Injectable} from '@nestjs/common';
import {GradeInfoDto} from "./dtos/gradeInfo.dto";
import {Codec, connect, Msg, NatsConnection, StringCodec} from "nats";
import {InjectModel} from "@nestjs/sequelize";
import {Students} from "./students.model";
import {StudentDto} from "./dtos/student.dto";
import {Grades} from "./grades.model";
import {IQueryParams} from "./interfaces/queryParams.interface";
import {IPagination} from "./interfaces/pagination.interface";
import sequelize from "sequelize";

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Students) private studentsRepository: typeof Students,
        @InjectModel(Grades) private gradesRepository: typeof Grades,
    ) {
    }

    async getTest() {
        return 'test work';
    }

    async setInfo(info: GradeInfoDto): Promise<void> {
        const nc: NatsConnection = await connect({servers: 'nats://192.162.246.63:4222'});
        const sc: Codec<string> = StringCodec();

        const encodeReq: Uint8Array = sc.encode(JSON.stringify(
            {personalCode: info.personalCode}
        ));
        let studentData;
        await nc.request('students.v1.get', encodeReq)
            .then(async (m: Msg) => {
                studentData = JSON.parse(sc.decode(m.data));
            });
        await nc.close();

        //Добавить студента в БД
        const student: StudentDto = studentData.data;
        let isStudent: Students = await this.studentsRepository.findOne({
            where: {personalCode: info.personalCode},
        });
        if (!isStudent) {
            isStudent = await this.studentsRepository.create({
                personalCode: student.personalCode,
                name: student.name,
                lastName: student.lastName,
            })
        }

        // добавить оценку в бд
        await this.gradesRepository.create({
            subject: info.subject,
            grade: info.grade,
            personalCode: isStudent.personalCode,
            student: isStudent,
        })
        return;
    }

    async getGradeLog(queryParams: IQueryParams): Promise<{ count: number, rows: Grades[] }> {
        const {limit, offset}: IPagination = this.getPagination(queryParams.page, queryParams.size);

        return this.gradesRepository.findAndCountAll({
            attributes: [['createdAt', 'date'], 'subject', 'grade'],
            include: {
                model: Students,
                attributes: ['personalCode', 'name', 'lastName']
            },
            limit,
            offset,
            order: ['createdAt'],
            distinct: true,
        })
    }

    async getStudentStatistic(personalCode: string): Promise<{ student: StudentDto, statistic: Grades[] }> {
        const student: Students = await this.studentsRepository.findOne({
            where: {personalCode},
            attributes: [
                'personalCode',
                'name',
                'lastName',
            ],
        });
        const statistic: Grades[] = await this.gradesRepository.findAll({
            where: {personalCode: student.personalCode},
            attributes: [
                'subject',
                [sequelize.fn('MAX', sequelize.col('grade')), 'maxGrade'],
                [sequelize.fn('MIN', sequelize.col('grade')), 'minGrade'],
                [sequelize.fn('AVG', sequelize.col('grade')), 'avgGrade'],
                [sequelize.fn('COUNT', sequelize.col('subject')), 'totalGrades'],
            ],
            group: ['subject'],
        })
        return {student: {...student.dataValues}, statistic: [...statistic]};
    }

    private getPagination(page: number, size: number): IPagination {
        const limit: number = size ? +size : 10;
        const offset: number = page ? page * limit : 0;

        return {limit, offset};
    }

}
