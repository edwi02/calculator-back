import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RegEx } from '../../common/regular-expressions';
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'Username value.',
        example: 'user.name@mail.com'
    })
    username: string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        RegEx.password(), {
        message: 'The password must have a uppercase, lowercase letter and a number'
    })
    @ApiProperty({
        description: 'Password value.',
        example: 'P4ss-2023'
    })
    password: string;

}