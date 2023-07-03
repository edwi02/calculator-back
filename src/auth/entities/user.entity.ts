import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../common/common.constants';
import { Record } from '../../record/entities/record.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'User id (UUID)',
        uniqueItems: true
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
        (record) => record.user
    )
    record: Record[];

}
