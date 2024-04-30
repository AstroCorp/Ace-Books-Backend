import { IsStrongPassword, IsJWT } from 'class-validator';

export class ResetPasswordDTO {
	@IsJWT()
	token: string;

	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;
}
