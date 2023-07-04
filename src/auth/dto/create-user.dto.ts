import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RegEx } from "src/common/regular-expressions";
import { ValidRoles } from "../interfaces";

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

    @IsOptional()
    @IsEnum(ValidRoles, { each: true, message: `Values allowed: [${ Object.values(ValidRoles)}]` })
    roles: string[] = [ValidRoles.user]

}
