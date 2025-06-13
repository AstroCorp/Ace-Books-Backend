import { Module } from "@nestjs/common";
import { UsersService } from "@/application/users/users.service";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { UsersController } from "@/infrastructure/users/users.controller";

@Module({
	imports: [OrmModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
