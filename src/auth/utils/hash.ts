import { hashSync, verifySync } from '@node-rs/argon2';

export const generateHash = (data: string): string => {
	return hashSync(data);
}

export const checkHash = (data: string, hash: string): boolean => {
	return verifySync(hash, data);
}
