import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './modules/orm/orm.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		OrmModule, 
		AuthModule,
		ScheduleModule.forRoot(),
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
