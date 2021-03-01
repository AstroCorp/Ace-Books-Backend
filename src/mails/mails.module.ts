import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TwingAdapter } from './adapters/twing.adapter';
import { MailsService } from './mails.service';
import { OrmModule } from '../orm/orm.module';

@Module({
	imports: [
		OrmModule,
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>('MAIL_HOST'),
					port: configService.get<number>('MAIL_PORT'),
					secure: false,
					ignoreTLS: false,
					auth: {
						user: configService.get<string>('MAIL_USERNAME'),
						pass: configService.get<string>('MAIL_PASSWORD'),
					},
				},
				template: {
					dir: './src/mails/templates/',
					adapter: new TwingAdapter(),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailsService],
})
export class MailsModule {}
