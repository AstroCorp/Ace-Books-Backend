import { Injectable } from '@nestjs/common';
import { hashSync, verifySync } from '@node-rs/argon2';
import { HashPort } from '@/domain/auth/ports/hash.port';

@Injectable()
class HashService implements HashPort {
	generate(value: string): string {
		return hashSync(value);
	}

	check(value: string, hash: string): boolean {
		return verifySync(hash, value);
	}
}

export default HashService;
