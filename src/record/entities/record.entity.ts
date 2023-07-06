import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Operation } from "../../operation/entities/operation.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @ManyToOne(
        () => User,
        (user) =>  user.record,
        { eager: true }
    )
    @JoinColumn({ name: "user_id" })
    user: User;
    
    @Column({ name: "user_balance" })
    balance: number;

    @ManyToOne(
        () => Operation,
        (operation) =>  operation.record,
        { eager: true }
    )
    @JoinColumn({ name: "operation_id" })
    operation: Operation;

    @Column({ name: "operation_response" })
    operationResponse: string;

    @Column({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    date: Date;

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
