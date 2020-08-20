import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { OrmModule } from 'orm/orm.module';

@Module({
    imports: [OrmModule],
    providers: [TasksService],
})
export class TasksModule {}