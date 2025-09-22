import { validateSync, IsEmail, MaxLength } from "class-validator";
import ValidationException from "@/domain/common/exceptions/validationException";

class Email {
	public static RULES = {
		ERROR_MESSAGE: 'invalid email',
		MAX_LENGTH: 255,
	};

	@IsEmail(undefined, { message: Email.RULES.ERROR_MESSAGE })
	@MaxLength(Email.RULES.MAX_LENGTH)
	private _value: string;

	constructor(email: string) {
		this._value = email;

		const errors = validateSync(this, {
			validationError: {
				target: false,
				value: false,
			},
		})
		.map(error => error.constraints ? Object.values(error.constraints) : [])
		.flat()
		.map(error => error.replace('_value', 'email'));

		if (errors.length > 0) {
			throw new ValidationException(errors);
		}
	}

	public get value(): string {
		return this._value;
	}
}

export default Email;
