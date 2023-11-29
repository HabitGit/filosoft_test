import {Injectable} from '@nestjs/common';
import {GradeInfoDto} from "./dtos/gradeInfo.dto";
import {Codec, connect, Msg, NatsConnection, StringCodec} from "nats";
import {InjectModel} from "@nestjs/sequelize";
import {Subjects} from "./subjects.model";
import {Students} from "./students.model";
import {StudentDto} from "./dtos/student.dto";
import {Grades} from "./grades.model";

interface IReq {
    personalCode: string;
}

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Subjects) private subjectsRepository: typeof Subjects,
        @InjectModel(Students) private studentsRepository: typeof Students,
        @InjectModel(Grades) private gradesRepository: typeof Grades,
    ) {
    }

    async getTest() {
        return 'test work';
    }

    async setInfo(info: GradeInfoDto) {
        const nc: NatsConnection = await connect({servers: 'nats://192.162.246.63:4222'});
        const sc: Codec<string> = StringCodec();

        const encodeReq: Uint8Array = sc.encode(JSON.stringify(
            {personalCode: info.personalCode}
        ));
        // type StudentData<T> = T;
        let studentData;
        await nc.request('students.v1.get', encodeReq)
            .then(async (m: Msg) => {
                studentData = JSON.parse(sc.decode(m.data));
            });
        await nc.close();

        //Добавить студента в БД
        const student: StudentDto = studentData.data;
        let isStudent: Students = await this.studentsRepository.findOne({
            where: { personalCode: info.personalCode },
        });
        if (!isStudent) {
            isStudent = await this.studentsRepository.create({
                personalCode: student.personalCode,
                name: student.name,
                lastName: student.lastName,
            })
        }

        // Добавить предмет в БД
        let isSubject: Subjects = await this.subjectsRepository.findOne({
            where: { subject: info.subject },
        });
        if (!isSubject) {
            isSubject = await this.subjectsRepository.create({
                subject: info.subject,
            });
        }

        // добавить оценку в бд
        await this.gradesRepository.create({
            subjectId: isSubject.id,
            subject: isSubject,
            grade: info.grade,
            studentId: isStudent.id,
            student: isStudent,
        })
        return;
    }
}
