import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "orm/entities";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(email);

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.userId };

		return {
			code: 200,
			message: 'Token generado',
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(email: string, password: string) {
		// Campos rellenados
		if (!email || !password) {
			return {
				code: 400,
				message: "No has completado todos los campos",
			};
		}

		// El correo ya está en uso
		const author = await this.usersService.findOne(email);

		if (author) {
			return {
				code: 400,
				message: "El correo ya está en uso",
			};
		}

		// Si todo va bien se crea el usuario
		const newUser = new User(email, password); // TODO: Encriptar contraseña

		await this.usersService.create(newUser);

		const payload = { email: newUser.email, sub: newUser.id };

		return {
			code: 200,
			message: "Usuario creado correctamente",
		  	access_token: this.jwtService.sign(payload),
		};
	}
}
