import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { OrmModule } from "@/orm/orm.module";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot([
			{
				ttl: process.env.RATE_LIMIT_TTL,
				limit: process.env.RATE_LIMIT_MAX,
			},
		]),
		OrmModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
