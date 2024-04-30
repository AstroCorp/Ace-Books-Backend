import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { OrmModule } from "@/orm/orm.module";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { MailsModule } from "@/mails/mails.module";
import { TasksModule } from "@/tasks/tasks.module";

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
		ScheduleModule.forRoot(),
		TasksModule,
		OrmModule,
		AuthModule,
		UsersModule,
		MailsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
