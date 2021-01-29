import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MailsModule } from './mails/mails.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		OrmModule, 
		AuthModule,
		ScheduleModule.forRoot(),
		TasksModule,
		MailsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
