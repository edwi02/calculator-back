import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserStatus } from '../../common/common.constants';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'UUID'
    })
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

    @Column('boolean', {
        default: false
    })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
