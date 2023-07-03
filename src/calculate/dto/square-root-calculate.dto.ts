import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber} from "class-validator";

export class SquareRootCalculateDto {
    @IsNotEmpty()
    @IsNumber({})
    @ApiProperty({
        description: 'Number value.',
        example: 64
    })
    number: number;
}
