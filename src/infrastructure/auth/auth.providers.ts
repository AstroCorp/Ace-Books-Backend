import { HASH_PORT } from '@/domain/auth/ports/hash.port';
import HashService from '@/infrastructure/auth/services/hash.service';
import { JWT_PORT } from '@/domain/auth/ports/jwt.port';
import JwtService from '@/infrastructure/auth/services/jwt.service';
import { SIGN_PORT } from '@/domain/auth/ports/sign.ports';
import SignService from '@/infrastructure/auth/services/sign.service';
import { USER_WRITER_REPOSITORY } from '@/domain/user/repositories/userWriterRepositoryInterface';
import { PostgresUserWriterRepository } from '@/infrastructure/users/repositories/postgresUserWriterRepository';
import { TOKEN_WRITER_REPOSITORY } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';
import { PostgresTokenWriterRepository } from '@/infrastructure/auth/repositories/postgresTokenWriterRepository';
import { USER_READER_REPOSITORY } from '@/domain/user/repositories/userReaderRepositoryInterface';
import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';

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
		provide: USER_WRITER_REPOSITORY,
		useClass: PostgresUserWriterRepository,
	},
	{
		provide: TOKEN_WRITER_REPOSITORY,
		useClass: PostgresTokenWriterRepository,
	},
	{
		provide: USER_READER_REPOSITORY,
		useClass: PostgresUserReaderRepository,
	}
];
