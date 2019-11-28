import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { OrmModule } from "../orm/orm.module";

@Module({
	imports: [OrmModule],
	controllers: [UserController],
	providers: [],
})
export class UserModule {}
