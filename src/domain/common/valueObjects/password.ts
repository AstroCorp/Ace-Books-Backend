import { validateSync, IsStrongPassword, MaxLength } from "class-validator";
import ValidationException from "@/domain/common/exceptions/validationException";

class Password {
	public static RULES = {
		MIN_LENGTH: 8,
		MAX_LENGTH: 32,
		MIN_LOWERCASE: 1,
		MIN_UPPERCASE: 1,
		MIN_NUMBERS: 1,
		MIN_SYMBOLS: 1,
	};

	@IsStrongPassword({
		minLength: Password.RULES.MIN_LENGTH,
		minLowercase: Password.RULES.MIN_LOWERCASE,
		minUppercase: Password.RULES.MIN_UPPERCASE,
		minNumbers: Password.RULES.MIN_NUMBERS,
		minSymbols: Password.RULES.MIN_SYMBOLS,
	})
	@MaxLength(Password.RULES.MAX_LENGTH)
	private _value: string;

	constructor(password: string) {
		this._value = password;

		const errors = validateSync(this, {
			validationError: {
				target: false,
				value: false,
			},
		})
		.map(error => error.constraints ? Object.values(error.constraints) : [])
		.flat()
		.map(error => error.replace('_value', 'password'));

		if (errors.length > 0) {
			throw new ValidationException(errors);
		}
	}

	public get value(): string {
		return this._value;
	}
}

export default Password;
