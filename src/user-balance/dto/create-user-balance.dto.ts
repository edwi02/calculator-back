import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserBalanceDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: uuidv4(),
        description: 'user Id'
    })
    userId: User;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'balance of user(USD).',
        example: 100
    })
    balance: number;

}
