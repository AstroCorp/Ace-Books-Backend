import { Module } from '@nestjs/common';
import { EmailsController } from '@/emails/emails.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailsService } from '@/emails/emails.service';
import { OrmModule } from '@/orm/orm.module';
import { TwingAdapter } from '@/emails/adapters/twing.adapter';
import { UsersService } from '@/users/users.service';

@Module({
	imports: [
		OrmModule,
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: process.env.MAIL_HOST,
					port: process.env.MAIL_PORT,
					secure: false,
					ignoreTLS: false,
					auth: {
						user: process.env.MAIL_USERNAME,
						pass: process.env.MAIL_PASSWORD,
					},
				},
				template: {
					dir: process.cwd() + '/src/emails/templates/',
					adapter: new TwingAdapter({
						baseUrl: 'file://' + process.cwd() + '/src/emails/css/',
					}),
				},
			}),
		}),
	],
	controllers: [EmailsController],
	providers: [
		EmailsService,
		UsersService,
	],
})
export class EmailsModule {}
