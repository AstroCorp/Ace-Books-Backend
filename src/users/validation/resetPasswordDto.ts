import { IsEmail, Length, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto 
{
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @Length(23, 23, {
        message: 'the code is not valid'
    })
    code: string;

    @MinLength(6)
    @MaxLength(25)
    @ApiProperty()
    newPassword: string;
}
