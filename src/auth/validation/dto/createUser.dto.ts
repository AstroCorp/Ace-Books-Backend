import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { IsEmailAvailable } from '../pipes/isEmailAvailable';

export class CreateUserDto
{
	@IsEmail({}, {
		message: 'isEmail',
	})
	@IsEmailAvailable()
	email: string;

	@MinLength(6, {
		message: 'minLength',
	})
	@MaxLength(25, {
		message: 'maxLength',
	})
	password: string;
}
