import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserStatus } from '../../common/common.constants';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column('varchar', {
        unique: true
    })
	username: string;

    @Column('varchar', {
        select: false   
    })
	password: string;

    @Column('varchar',{
        default: UserStatus.active
    })
	status: UserStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
