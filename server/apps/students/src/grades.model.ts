import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Students} from "./students.model";
import {Subjects} from "./subjects.model";

@Table({ tableName: 'grades' })
export class Grades extends Model<Grades> {
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Subjects)
    @Column({ type: DataType.INTEGER })
    subjectId: number;

    @BelongsTo(() => Subjects)
    subject: Subjects;

    @Column({ type: DataType.INTEGER })
    grade: number;

    @ForeignKey(() => Students)
    @Column({ type: DataType.INTEGER })
    studentId: number;

    @BelongsTo(() => Students)
    student: Students;
}