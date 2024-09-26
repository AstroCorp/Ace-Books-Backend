import { IsInt, IsJWT } from 'class-validator';

export class VerifyEmailDTO {
	@IsInt()
	userId: number;

	@IsJWT()
	token: string;
}
