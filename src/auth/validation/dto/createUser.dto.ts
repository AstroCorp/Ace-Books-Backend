import { IsEmail, IsStrongPassword } from 'class-validator';
import { IsEmailAvailable } from '@/auth/validation/pipes/isEmailAvalible.pipe';

export class CreateUserDTO {
	@IsEmail(undefined, { message: 'invalid email' })
	@IsEmailAvailable()
	email: string;

	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;
}
