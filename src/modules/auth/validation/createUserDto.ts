import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsEmailAvailable } from './pipes/isEmailAvailable';
import { IsLangAvailable } from './pipes/isLangAvailable';

export class CreateUserDto {
    @IsEmail()
    @IsEmailAvailable()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;

    @IsNotEmpty()
    @IsLangAvailable()
    lang: string;
}
