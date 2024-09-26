import { hashSync, verifySync } from '@node-rs/argon2';

export const encryptPassword = (password: string): string => {
	return hashSync(password);
}

export const checkPassword = (password: string, hash: string): boolean => {
	return verifySync(hash, password);
}
