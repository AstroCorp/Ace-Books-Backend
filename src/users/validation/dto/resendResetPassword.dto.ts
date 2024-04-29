import { IsEmail } from 'class-validator';

export class ResendResetPasswordDTO {
	@IsEmail()
	email: string;
}
