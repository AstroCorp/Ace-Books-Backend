import { Module } from '@nestjs/common';
import { EmailsService } from '@/infrastructure/emails/emails.service';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersService } from '@/application/users/users.service';
import { NodemailerService } from '@/infrastructure/emails/nodemailer.service';
import { JwtModule } from '@nestjs/jwt';
import Sign from '@/infrastructure/auth/utils/sign';
import Hash from '@/infrastructure/auth/utils/hash';

@Module({
	imports: [
		OrmModule,
		JwtModule,
	],
	providers: [
		EmailsService,
		UsersService,
		NodemailerService,
		Sign,
		Hash,
	],
	exports: [
		EmailsService,
	],
})
export class EmailsModule {}
