import { IsEmail } from 'class-validator';
import { IsEmailAvailable } from '../pipes/isEmailAvailable';
import { IsValidRefreshToken } from '../pipes/isValidRefreshToken';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto
{
    @IsEmail({}, {
        message: 'the email is not valid'
    })
    @IsEmailAvailable(false)
    @ApiProperty()
    email: string;

    @IsValidRefreshToken()
    @ApiProperty()
    refreshToken: string;
}
