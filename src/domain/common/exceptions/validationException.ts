import BaseException from "@/domain/common/exceptions/baseException";

export const VALIDATION_EXCEPTIONS = 'VALIDATION_EXCEPTIONS';

class ValidationException extends BaseException {
	constructor(errors: string[]) {
		super(VALIDATION_EXCEPTIONS, 'validation failed: ' + errors.join(', '));
	}
}

export default ValidationException;
