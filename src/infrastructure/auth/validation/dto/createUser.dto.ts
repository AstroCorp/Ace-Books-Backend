import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';
import { IsEmailAvailable } from '@/infrastructure/auth/validation/pipes/isEmailAvalible.pipe';

export class CreateUserDTO {
	@IsEmail(undefined, { message: 'invalid email' })
	@IsEmailAvailable()
	@MaxLength(255)
	email: string;

	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@MaxLength(32)
	password: string;
}
