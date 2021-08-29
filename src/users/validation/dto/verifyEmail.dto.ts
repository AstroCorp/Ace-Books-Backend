import { Length } from 'class-validator';

export class VerifyEmailDto
{
	@Length(23, 23, {
		message: 'the code is not valid',
	})
	code: string;
}
