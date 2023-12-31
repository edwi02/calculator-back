import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { v4 as uuidv4 } from 'uuid';

import { Operation } from "src/operation/entities/operation.entity";
import { User } from "src/auth/entities/user.entity";

export class CreateRecordDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Operation cost (USD).',
        example: 74
    })
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'User balance after execute operation (USD).',
        example: 74
    })
    balance: number;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: uuidv4(),
        description: 'operation Id'
    })
    operationId: Operation;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: uuidv4(),
        description: 'user Id'
    })
    userId: User;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Operation response.',
        example: '8A5d7',
        examples: [
            74,
            8,
            -7,
            '8A5d7'
        ]
    })
    operationResponse: string;
}
