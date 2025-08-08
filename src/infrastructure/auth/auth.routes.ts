import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import RegisterController from '@/infrastructure/auth/controllers/register.controller';

@Controller('auth')
export class AuthRoutes {
	constructor(private registerController: RegisterController) {
		//
	}

	@Post('register')
	register(@Body() body: CreateUserDTO) {
		return this.registerController.execute(body);
	}
}
