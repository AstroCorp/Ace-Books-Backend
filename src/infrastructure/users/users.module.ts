import { Module } from "@nestjs/common";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { UsersController } from "@/infrastructure/users/users.controller";

@Module({
	imports: [OrmModule],
	controllers: [UsersController],
	providers: [],
	exports: [],
})
export class UsersModule {}
