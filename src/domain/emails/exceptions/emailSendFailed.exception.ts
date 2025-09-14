import BaseException from "@/domain/common/exceptions/baseException";

export const EMAIL_SEND_FAILED_EXCEPTION = 'EMAIL_SEND_FAILED_EXCEPTION';

class EmailSendFailedException extends BaseException {
	constructor(userId: number, message: string) {
		super(EMAIL_SEND_FAILED_EXCEPTION, `failed to send email to user with id "${userId}": ${message}`);
	}
}

export default EmailSendFailedException;
