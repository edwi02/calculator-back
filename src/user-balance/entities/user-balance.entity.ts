import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class UserBalance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    balance: number;

    @OneToOne(
        () => User,
        (user) =>  user.userBalance,
        { onDelete: 'CASCADE', eager: true }
    )
    @JoinColumn({ name: "user_id" })
    user: User;

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
