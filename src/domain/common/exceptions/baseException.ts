abstract class BaseException extends Error {
	public readonly code: string;

	constructor(code: string, message: string) {
		super(message);

		this.name = new.target.name;
		this.code = code;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default BaseException;
