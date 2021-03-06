import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OrmModule } from '../orm/orm.module';
import { UsersController } from './users.controller';
import { MailsService } from '../mails/mails.service';

@Module({
	imports: [OrmModule],
	controllers: [UsersController],
	providers: [
		UsersService,
		MailsService,
	],
	exports: [UsersService],
})
export class UsersModule {}
