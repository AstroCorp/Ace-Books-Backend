import { Module } from "@nestjs/common";
import { TasksService } from "@/infrastructure/tasks/tasks.service";
import { OrmModule } from "@/infrastructure/orm/orm.module";

@Module({
	imports: [OrmModule],
	providers: [TasksService],
})
export class TasksModule {}
