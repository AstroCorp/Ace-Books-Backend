import { IsEmail } from 'class-validator';

export class SendResetPasswordDTO {
	@IsEmail()
	email: string;
}
