import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RegEx } from "src/common/regular-expressions";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        RegEx.password(), {
        message: 'The password must have a appercase, lowercase letter and a number'
    })
    password: string;

}
