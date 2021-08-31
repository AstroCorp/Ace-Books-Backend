import { IsEmail } from 'class-validator';

export class ResendResetPasswordDto
{
	@IsEmail({}, {
		message: 'isEmail',
	})
	email: string;
}
