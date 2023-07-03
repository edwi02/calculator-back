import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( ()=> Number )
    @ApiPropertyOptional({
        default: 50, 
        description: 'How mamy rows do you need?',
        example: 25
    })
    limitRows?: number;

    @IsOptional()
    @Min(0)
    @Type( ()=> Number )
    @ApiPropertyOptional({
        description: 'How many rows do you want to get?',
        example: 0
    })
    offsetRows?: number;

    @IsOptional()
    @IsIn(['true', 'false'])
    @ApiPropertyOptional({
        description: 'Filter isActive rows',
        enum: ['true', 'false'],
        example: 'true'
    })
    isActive?: string;
}