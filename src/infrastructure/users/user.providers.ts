import { HASH_PORT } from '@/domain/auth/ports/hash.port';
import HashService from '@/infrastructure/auth/services/hash.service';

import { SIGN_PORT } from '@/domain/auth/ports/sign.ports';
import SignService from '@/infrastructure/auth/services/sign.service';

import { EMAILS_PORT } from '@/domain/emails/ports/emails.port';
import { EmailsService } from '@/infrastructure/emails/services/emails.service';

import { USER_READER_REPOSITORY } from "@/domain/user/repositories/userReaderRepositoryInterface";
import { PostgresUserReaderRepository } from "@/infrastructure/users/repositories/postgresUserReaderRepository";

import { USER_WRITER_REPOSITORY } from "@/domain/user/repositories/userWriterRepositoryInterface";
import { PostgresUserWriterRepository } from "@/infrastructure/users/repositories/postgresUserWriterRepository";

export const PROVIDERS = [
	{
		provide: HASH_PORT,
		useClass: HashService,
	},
	{
		provide: SIGN_PORT,
		useClass: SignService,
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
];
