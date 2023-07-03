import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber} from "class-validator";

export class SquareRootCalculateDto {
    @IsNotEmpty()
    @IsNumber({})
    @ApiProperty({
        description: 'Number value you would like to calculate square root.',
        example: 64
    })
    number: number;
}
