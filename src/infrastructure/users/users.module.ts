import { Module } from "@nestjs/common";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { UsersController } from "@/infrastructure/users/users.controller";
import { PostgresUserReaderRepository } from "@/infrastructure/users/repositories/postgresUserReaderRepository";
import { USER_READER_REPOSITORY } from "@/domain/user/repositories/userReaderRepositoryInterface";

@Module({
	imports: [OrmModule],
	controllers: [UsersController],
	providers: [
		{
			provide: USER_READER_REPOSITORY,
			useClass: PostgresUserReaderRepository,
		},
	],
	exports: [USER_READER_REPOSITORY],
})
export class UsersModule {}
