import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './users.service';
import { OrmModule } from '../../orm/orm.module';
import { TwingAdapter } from './mails/adapters/twing.adapter';
import { default as Config } from '../../config';

@Module({
	imports: [
		OrmModule,
		JwtModule.register({
			secret: Config.jwt.secret,
			signOptions: { expiresIn: Config.jwt.timeout },
		}),
		MailerModule.forRoot({
			transport: {
			  	host: Config.mail.host,
			  	port: Config.mail.port,
			  	secure: false,
			  	ignoreTLS: false,
			  	auth: {
					user: Config.mail.username,
					pass: Config.mail.password,
			  	},
			},
			template: {
			  	dir: './src/modules/users/mails/templates/',
				adapter: new TwingAdapter(),
			},
		}),
	],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
