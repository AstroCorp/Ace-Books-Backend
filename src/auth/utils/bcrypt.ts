import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const passwordEncrypt = (password: string): string => {
	return bcrypt.hashSync(password, SALT_ROUNDS);
}

export const passwordCompare = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash);
}
