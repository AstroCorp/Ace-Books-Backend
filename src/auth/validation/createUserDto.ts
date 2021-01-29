import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { IsEmailAvailable } from './pipes/isEmailAvailable';
import { IsLangAvailable } from './pipes/isLangAvailable';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
{
    @IsEmail({}, {
        message: 'the email is not valid'
    })
    @IsEmailAvailable()
    @ApiProperty()
    email: string;

    @MinLength(6)
    @MaxLength(25)
    @ApiProperty()
    password: string;

    @IsLangAvailable()
    @ApiProperty()
    lang: string;
}
