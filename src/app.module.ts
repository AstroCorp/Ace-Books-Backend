import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [
		OrmModule, 
		AuthModule,
		ScheduleModule.forRoot(),
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
