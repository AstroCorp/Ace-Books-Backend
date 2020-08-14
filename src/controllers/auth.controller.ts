import { Controller, UseGuards, Get, Post, Req, Res, Request } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "../entities";
import { LocalAuthGuard } from "modules/auth/local-auth.guard";
import { JwtAuthGuard } from "modules/auth/jwt-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>, private jwtService: JwtService) {
		//
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		const payload = { email: req.user.email, sub: req.user.id };

		return {
		  	access_token: this.jwtService.sign(payload),
		};
	}

	@UseGuards(LocalAuthGuard)
	@Post("register")
	async register(@Req() req: any, @Res() res: any) {
		// Campos rellenados
		if (!req.body.email || !req.body.password) {
			return {
				code: 400,
				message: "No has completado todos los campos",
			};
		}

		// El correo ya está en uso
		const author = await this.userRepository.findOne({
			email: req.body.email,
		});

		if (author) {
			return {
				code: 400,
				message: "El correo ya está en uso",
			};
		}

		// Si todo va bien se crea el usuario
		const { email, password } = req.body;
		const newUser = new User(email, password); // TODO: Encriptar contraseña

		await this.userRepository.persistAndFlush(newUser);

		const payload = { email: newUser.email, sub: newUser.id };

		return {
			code: 200,
			message: "Usuario creado correctamente",
		  	access_token: this.jwtService.sign(payload),
		};
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req) {
    	return req.user;
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('test')
	async test() {
		return await this.userRepository.findAll();
	}
}
