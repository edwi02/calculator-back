import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Record } from "../../record/entities/record.entity";

@Entity()
export class Operation {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        unique: true
    })
    type: string;

    @Column('numeric')
    cost: number;

    @Column('boolean', {
        default: true
    })
    isActive: boolean;

    @Column('boolean', {
        default: false
    })
    isDeleted: boolean;

    @CreateDateColumn({
        select: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        select: false
    })
    updatedAt: Date;

    @OneToMany(
        () => Record,
        (record) =>  record.operation
    )
    record: Record[];


}

