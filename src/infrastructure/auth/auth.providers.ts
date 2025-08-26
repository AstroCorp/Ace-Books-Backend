import { HASH_PORT } from '@/domain/auth/ports/hash.port';
import HashService from '@/infrastructure/auth/services/hash.service';

import { JWT_PORT } from '@/domain/auth/ports/jwt.port';
import JwtService from '@/infrastructure/auth/services/jwt.service';

import { SIGN_PORT } from '@/domain/auth/ports/sign.ports';
import SignService from '@/infrastructure/auth/services/sign.service';

import { UUID_PORT } from '@/domain/auth/ports/uuid.port';
import UuidService from '@/infrastructure/auth/services/uuid.service';

import { EMAILS_PORT } from '@/domain/emails/ports/emails.port';
import { EmailsService } from '@/infrastructure/emails/services/emails.service';

import { USER_READER_REPOSITORY } from '@/domain/user/repositories/userReaderRepositoryInterface';
import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';

import { USER_WRITER_REPOSITORY } from '@/domain/user/repositories/userWriterRepositoryInterface';
import { PostgresUserWriterRepository } from '@/infrastructure/users/repositories/postgresUserWriterRepository';

import { TOKEN_READER_REPOSITORY } from '@/domain/auth/repositories/tokenReaderRepositoryInterface';
import { PostgresTokenReaderRepository } from '@/infrastructure/auth/repositories/postgresTokenReaderRepository';

import { TOKEN_WRITER_REPOSITORY } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';
import { PostgresTokenWriterRepository } from '@/infrastructure/auth/repositories/postgresTokenWriterRepository';

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
		provide: UUID_PORT,
		useClass: UuidService,
	},
	{
		provide: EMAILS_PORT,
		useClass: EmailsService,
	},
	{
		provide: USER_READER_REPOSITORY,
		useClass: PostgresUserReaderRepository,
	},
	{
		provide: USER_WRITER_REPOSITORY,
		useClass: PostgresUserWriterRepository,
	},
	{
		provide: TOKEN_READER_REPOSITORY,
		useClass: PostgresTokenReaderRepository,
	},
	{
		provide: TOKEN_WRITER_REPOSITORY,
		useClass: PostgresTokenWriterRepository,
	},
];
