import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class BasicCalculateDto {
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true, message: 'each value in number must be a number.'})
    @ArrayMinSize(2)
    @ApiProperty({
        description: 'Array of numbers.',
        example: [10,20,-74]
    })
    numbers: number[];
}
