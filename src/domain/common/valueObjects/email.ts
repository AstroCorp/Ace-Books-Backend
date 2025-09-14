import { validateSync, IsEmail, MaxLength } from "class-validator";
import ValidationException from "@/domain/common/exceptions/validationException";

class Email {
	@IsEmail(undefined, { message: 'invalid email' })
	@MaxLength(255)
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
