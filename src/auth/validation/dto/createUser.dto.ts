import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { IsEmailAvailable } from '../pipes/isEmailAvailable';

export class CreateUserDto
{
	@IsEmail({}, {
		message: 'the email is not valid',
	})
	@IsEmailAvailable()
	email: string;

	@MinLength(6)
	@MaxLength(25)
	password: string;
}
