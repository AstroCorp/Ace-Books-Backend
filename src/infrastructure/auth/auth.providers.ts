import { HASH_PORT } from '@/domain/auth/ports/hash.port';
import HashService from '@/infrastructure/auth/services/hash.service';
import { JWT_PORT } from '@/domain/auth/ports/jwt.port';
import JwtService from '@/infrastructure/auth/services/jwt.service';
import { SIGN_PORT } from '@/domain/auth/ports/sign.ports';
import SignService from '@/infrastructure/auth/services/sign.service';
import { EMAILS_PORT } from '@/domain/auth/ports/emails.port';
import EmailsService from '@/infrastructure/emails/emails.service';

export const PROVIDERS = [
	{
		provide: HASH_PORT,
		useClass: HashService,
	},
	{
		provide: JWT_PORT,
		useClass: JwtService,
	},
	{
		provide: SIGN_PORT,
		useClass: SignService,
	},
	{
		provide: EMAILS_PORT,
		useClass: EmailsService,
	},
];
