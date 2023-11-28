import {Module} from '@nestjs/common';
import {StudentsController} from './students.controller';
import {StudentsService} from './students.service';
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "process";
import {Grades} from "./grades.model";
import {Students} from "./students.model";
import {Subjects} from "./subjects.model";

@Module({
  imports: [
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Grades, Students, Subjects],
      })
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
