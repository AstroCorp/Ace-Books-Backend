import { Module } from '@nestjs/common';
import { MailsController } from '@/mails/mails.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailsService } from '@/mails/mails.service';
import { OrmModule } from '@/orm/orm.module';
import { TwingAdapter } from '@/mails/adapters/twing.adapter';
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
					dir: process.cwd() + '/src/mails/templates/',
					adapter: new TwingAdapter({
						baseUrl: 'file://' + process.cwd() + '/src/mails/css/',
					}),
				},
			}),
		}),
	],
	controllers: [MailsController],
	providers: [
		MailsService,
		UsersService,
	],
})
export class MailsModule {}
