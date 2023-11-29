import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Grades} from "./grades.model";

@Table({tableName: 'students'})
export class Students extends Model<Students> {
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
    personalCode: string;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.STRING})
    lastName: string;

    @HasMany(() => Grades)
    statistic: Grades[];
}