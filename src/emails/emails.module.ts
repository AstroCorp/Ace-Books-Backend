import { Module } from '@nestjs/common';
import { EmailsController } from '@/emails/emails.controller';
import { EmailsService } from '@/emails/emails.service';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersService } from '@/application/users/users.service';
import { NodemailerService } from '@/emails/nodemailerService.service';
import { JwtModule } from '@nestjs/jwt';
import Sign from '@/infrastructure/auth/utils/sign';
import Hash from '@/infrastructure/auth/utils/hash';

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
		Sign,
		Hash,
	],
	exports: [
		EmailsService,
		NodemailerService,
	],
})
export class EmailsModule {}
