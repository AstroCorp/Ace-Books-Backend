import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OrmModule } from '../orm/orm.module';

@Module({
	imports: [OrmModule],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
