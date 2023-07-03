import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RegEx } from "src/common/regular-expressions";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ 
        description: 'Username value, It is an email',
        example: 'user@mail.com'
    })
    username: string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        RegEx.password(), {
        message: 'password must have a appercase, lowercase letter and a number'
    })
    @ApiProperty({
        description: 'Password value',
        example: 'P4ssw0rd'
    })
    password: string;

}
