import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { OrmModule } from '../../orm/orm.module';
import { jwtConstants } from './constants';

@Module({
	imports: [
		OrmModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.access_expiresIn },
		}),
	],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
