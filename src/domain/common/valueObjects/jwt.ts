import { validateSync, IsJWT } from "class-validator";
import ValidationException from "@/domain/common/exceptions/validationException";

class Jwt {
	@IsJWT({ message: 'invalid token' })
	private _value: string;

	constructor(jwt: string) {
		this._value = jwt;

		const errors = validateSync(this, {
			validationError: {
				target: false,
				value: false,
			},
		})
		.map(error => error.constraints ? Object.values(error.constraints) : [])
		.flat()
		.map(error => error.replace('_value', 'jwt'));

		if (errors.length > 0) {
			throw new ValidationException(errors);
		}
	}

	public get value(): string {
		return this._value;
	}
}

export default Jwt;
