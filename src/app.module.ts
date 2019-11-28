import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrmModule } from "./modules/orm/orm.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [OrmModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
