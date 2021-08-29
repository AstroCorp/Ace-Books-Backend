import { IsEmail } from 'class-validator';

export class ResendResetPasswordDto
{
	@IsEmail()
	email: string;
}
