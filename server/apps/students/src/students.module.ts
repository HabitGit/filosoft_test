import {Module} from '@nestjs/common';
import {StudentsController} from './students.controller';
import {StudentsService} from './students.service';
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "process";
import {Grades} from "./grades.model";
import {Students} from "./students.model";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        SequelizeModule.forFeature([Students, Grades]),
        ClientsModule.register([
            {
                name: 'STUDENTS_MODULE',
                transport: Transport.NATS,
                options: {
                    servers: [
                        'nats://192.162.246.63:4222',
                    ],
                    timeout: 10000,
                }
            }
        ]),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Grades, Students],
        })
    ],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule {
}
