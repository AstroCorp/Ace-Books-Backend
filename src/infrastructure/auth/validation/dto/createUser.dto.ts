import { Transform } from 'class-transformer';
import Email from '@/domain/common/valueObjects/email';
import Password from '@/domain/common/valueObjects/password';

export class CreateUserDTO {
	@Transform(({ value }) => new Email(value))
	email: Email;

	@Transform(({ value }) => new Password(value))
	password: Password;
}
