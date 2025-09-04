import BaseException from "@/domain/common/exceptions/baseException";

export const EMAIL_NOT_AVAILABLE_EXCEPTION = 'EMAIL_NOT_AVAILABLE_EXCEPTION';

class EmailNotAvailableException extends BaseException {
	constructor() {
		super(EMAIL_NOT_AVAILABLE_EXCEPTION, 'email not available');
	}
}

export default EmailNotAvailableException;
