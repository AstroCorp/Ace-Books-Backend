import { IsJWT } from 'class-validator';

export class VerifyEmailDTO {
	@IsJWT()
	token: string;
}
