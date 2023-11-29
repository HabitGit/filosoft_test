import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Students} from "./students.model";

@Table({ tableName: 'grades' })
export class Grades extends Model<Grades> {
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING })
    subject: string;

    @Column({ type: DataType.INTEGER })
    grade: number;

    @ForeignKey(() => Students)
    @Column({ type: DataType.STRING })
    personalCode: string;

    @BelongsTo(() => Students)
    student: Students;
}