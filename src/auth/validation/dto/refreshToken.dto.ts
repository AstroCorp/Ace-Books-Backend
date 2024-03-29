import { IsEmail } from 'class-validator';
import { IsEmailAvailable } from '../pipes/isEmailAvailable';
import { IsValidRefreshToken } from '../pipes/isValidRefreshToken';

export class RefreshTokenDto
{
	@IsEmail({}, {
		message: 'isEmail',
	})
	@IsEmailAvailable(false)
	email: string;

	@IsValidRefreshToken()
	refreshToken: string;
}
