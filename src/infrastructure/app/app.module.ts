import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { APP_GUARD } from "@nestjs/core";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { AuthModule } from "@/infrastructure/auth/auth.module";
import { UsersModule } from "@/infrastructure/users/users.module";
import { TasksModule } from "@/infrastructure/tasks/tasks.module";
import { AppController } from "@/infrastructure/app/controllers/app.controller";

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
			skipIf: () => process.env.NODE_ENV === NodeJS.Environment.Testing,
		}),
		ScheduleModule.forRoot(),
		TasksModule,
		OrmModule,
		AuthModule,
		UsersModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	controllers: [
		AppController,
	],
})
export class AppModule {}
