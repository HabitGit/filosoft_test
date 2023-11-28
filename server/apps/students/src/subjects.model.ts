import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Grades} from "./grades.model";

@Table({ tableName: 'subjects' })
export class Subjects extends Model<Subjects> {
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING })
    subject: string;

    @HasMany(() => Grades)
    grades: Grades[];
}