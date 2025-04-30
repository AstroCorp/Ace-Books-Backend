import { Module } from '@nestjs/common';
import { EmailsController } from '@/emails/emails.controller';
import { EmailsService } from '@/emails/emails.service';
import { OrmModule } from '@/orm/orm.module';
import { UsersService } from '@/users/users.service';
import { NodemailerService } from '@/emails/nodemailerService.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		OrmModule,
		JwtModule
	],
	controllers: [EmailsController],
	providers: [
		EmailsService,
		UsersService,
		NodemailerService,
	],
	exports: [
		EmailsService,
		NodemailerService,
	],
})
export class EmailsModule {}
