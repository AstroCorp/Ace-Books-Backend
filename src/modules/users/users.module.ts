import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './users.service';
import { OrmModule } from '../../orm/orm.module';
import { jwtConstants } from './constants';
import { TwingAdapter } from './mails/adapters/twing.adapter';

@Module({
	imports: [
		OrmModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.access_expiresIn },
		}),
		MailerModule.forRoot({
			transport: {
			  	host: 'smtp.gmail.com',
			  	port: 587,
			  	secure: false,
			  	ignoreTLS: false,
			  	auth: {
					user: '',
					pass: '',
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
