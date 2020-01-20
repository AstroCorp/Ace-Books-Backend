import { Get, Controller, Post, Req, Res } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "../../entities";

@Controller("user")
export class UserController {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {}

	@Get() // index
	async find() {
		return await this.userRepository.findAll();
	}

	@Post("/register")
	async register(@Req() req: any, @Res() res: any) {
		// Campos rellenados
		if (
			!req.body.username ||
			!req.body.email ||
			!req.body.email_repeat ||
			!req.body.password
		) {
			return {
				code: 400,
				message: "No has completado todos los campos",
			};
		}

		// El correo ya está en uso
		const author = await this.userRepository.findOne({
			email: req.body.email,
		});

		if (author !== null) {
			return {
				code: 400,
				message: "El correo ya está en uso",
			};
		}

		// Si todo va bien se crea el usuario y se inicia sesión
		const newUser = new User(req.body.username, req.body.email);
		await this.userRepository.persistAndFlush(newUser);

		const { username, email, password } = req.body;
		req.session.user = { username, email, password };

		return {
			code: 200,
			message: "Usuario creado correctamente",
		};
	}

	@Get("/logout")
	async logout(@Req() req: any) {
		delete req.session.user;

		return true;
	}

	@Get("/test")
	async test(@Req() req: any) {
		return req.session.user;
	}
}
