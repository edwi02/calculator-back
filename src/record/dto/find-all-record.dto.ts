import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { PaginationDto } from "src/common/dto";
import { v4 as uuidv4 } from 'uuid';

export class FindAllRecordDto extends PaginationDto {
    @IsOptional()
    @IsUUID()
    @IsString()
    @ApiPropertyOptional({
        example: uuidv4(),
        description: 'What ID user do you need?'
    })
    userId?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    @ApiPropertyOptional({
        example: uuidv4(),
        description: 'What ID operation do you need?'
    })
    operationId?: string;
}