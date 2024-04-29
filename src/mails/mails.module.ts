import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailsService } from '@/mails/mails.service';
import { OrmModule } from '@/orm/orm.module';
import { TwingAdapter } from './adapters/twing.adapter';

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
	providers: [MailsService],
})
export class MailsModule {}
