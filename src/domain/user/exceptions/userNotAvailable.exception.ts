import BaseException from "@/domain/common/exceptions/baseException";

export const USER_NOT_AVAILABLE_EXCEPTION = 'USER_NOT_AVAILABLE_EXCEPTION';

class UserNotAvailableException extends BaseException {
	constructor() {
		super(USER_NOT_AVAILABLE_EXCEPTION, 'user not available');
	}
}

export default UserNotAvailableException;
