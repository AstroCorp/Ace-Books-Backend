import BaseException from "@/domain/common/exceptions/baseException";

export const USER_ALREADY_VERIFIED_EXCEPTION = 'USER_ALREADY_VERIFIED_EXCEPTION';

class UserAlreadyVerifiedException extends BaseException {
	constructor(userId: number) {
		super(USER_ALREADY_VERIFIED_EXCEPTION, `User with id "${userId}" already verified`);
	}
}

export default UserAlreadyVerifiedException;
