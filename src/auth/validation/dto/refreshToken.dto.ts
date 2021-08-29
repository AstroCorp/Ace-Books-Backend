import { IsEmail } from 'class-validator';
import { IsEmailAvailable } from '../pipes/isEmailAvailable';
import { IsValidRefreshToken } from '../pipes/isValidRefreshToken';

export class RefreshTokenDto
{
	@IsEmail({}, {
		message: 'the email is not valid',
	})
	@IsEmailAvailable(false)
	email: string;

	@IsValidRefreshToken()
	refreshToken: string;
}
