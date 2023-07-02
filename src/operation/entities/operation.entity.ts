import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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


}

