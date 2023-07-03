import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber} from "class-validator";

export class RandomStringCalculateDto {
    @IsNotEmpty()
    @IsNumber({})
    @ApiProperty({
        description: 'Number string you would like to generate.',
        example: 2
    })
    quantity: number;

    @IsNotEmpty()
    @IsNumber({})
    @ApiProperty({
        description: 'Lenght string you would like to generate. Same value for each string',
        example: 2
    })
    length: number;
    
}
