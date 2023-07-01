import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RegEx } from '../../common/regular-expressions';

export class LoginUserDto {

    @IsString()
    @IsEmail()
    username: string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        RegEx.password(), {
        message: 'The password must have a uppercase, lowercase letter and a number'
    })
    password: string;

}