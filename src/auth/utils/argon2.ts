import { hashSync, verifySync } from '@node-rs/argon2';

export const passwordEncrypt = (password: string): string => {
	return hashSync(password);
}

export const passwordCompare = (password: string, hash: string): boolean => {
	return verifySync(hash, password);
}
