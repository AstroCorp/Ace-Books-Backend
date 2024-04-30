import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { OrmModule } from "@/orm/orm.module";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { EmailsModule } from "@/emails/emails.module";
import { TasksModule } from "@/tasks/tasks.module";
import { APP_GUARD } from "@nestjs/core";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			throttlers: [
				{
					name: 'default',
					ttl: process.env.DEFAULT_RATE_LIMIT_TTL,
					limit: process.env.DEFAULT_RATE_LIMIT_MAX,
				},
			],
		}),
		ScheduleModule.forRoot(),
		TasksModule,
		OrmModule,
		AuthModule,
		UsersModule,
		EmailsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
