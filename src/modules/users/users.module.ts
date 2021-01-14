import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './users.service';
import { OrmModule } from '../orm/orm.module';
import { TwingAdapter } from './mails/adapters/twing.adapter';

@Module({
	imports: [
		OrmModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
  			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { 
					expiresIn: configService.get<string>('JWT_TIMEOUT'),
				},
			}),
			inject: [ConfigService],
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
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
					dir: './src/modules/users/mails/templates/',
					adapter: new TwingAdapter(),
			  	},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
