import { validateSync, IsStrongPassword, MaxLength } from 'class-validator';
import ValidationException from '@/domain/common/exceptions/validationException';

class Password {
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@MaxLength(32)
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
