import { Module } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { OrmModule } from "@/orm/orm.module";
import { UsersController } from "@/users/users.controller";

@Module({
	imports: [OrmModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
