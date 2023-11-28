import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Grades} from "./grades.model";

@Table({ tableName: 'students' })
export class Students extends Model<Students> {
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING })
    personalCode: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @HasMany(() => Grades)
    grades: Grades[];
}