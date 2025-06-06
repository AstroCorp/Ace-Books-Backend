import { hashSync, verifySync } from '@node-rs/argon2';
import HashPort from '@/application/auth/ports/hash.port';
import { Injectable } from '@nestjs/common';

@Injectable()
class Hash implements HashPort {
	generate(value: string): string {
		return hashSync(value);
	}

	check(value: string, hash: string): boolean {
		return verifySync(hash, value);
	}
}

export default Hash;
