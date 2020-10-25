import { IsEmail } from 'class-validator';
import { IsEmailAvailable } from './pipes/isEmailAvailable';
import { IsValidToken } from './pipes/isValidToken';

export class RefreshTokenDto {
    @IsEmail({}, {
        message: 'the email is not valid'
    })
    @IsEmailAvailable(false)
    email: string;

    @IsValidToken()
    refreshToken: string;
}
