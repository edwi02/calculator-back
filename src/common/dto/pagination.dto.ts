import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( ()=> Number )
    @ApiPropertyOptional({
        default: 50, 
        description: 'How mamy rows do you need'
    })
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type( ()=> Number )
    @ApiPropertyOptional({
        description: 'How mamy rows do you want to do'
    })
    offset?: number;

    @IsOptional()
    @IsIn(['true', 'false'])
    @ApiPropertyOptional({
        description: 'Filter isActive rows'
    })
    isActive?: string;
}