import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class CreateOperationDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Operation type.',
        example: 'addition'
    })
    type: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Operation cost (USD).',
        example: 74
    })
    cost: number;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: 'Active/Inactive operation.',
        example: true,
        enum: [true, false]
    })
    isActive?: boolean;

}
