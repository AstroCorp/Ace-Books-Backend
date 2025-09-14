import { Inject, Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { HASH_PORT, HashPort } from "@/domain/auth/ports/hash.port";
import { SIGN_PORT, SignPort } from "@/domain/auth/ports/sign.ports";
import { User } from "@/domain/common/models/User";

@Injectable()
export class GenerateVerificationAccountUrlUseCase {
	constructor(
		@Inject(HASH_PORT)
		private readonly hashService: HashPort,

		@Inject(SIGN_PORT)
		private readonly signService: SignPort,
	) {
		//
	}

	public execute(user: User): URL {
		const userId = user.id.toString();
		const hash = this.hashService.generate(user.email);

		const verifyUrl = new URL(process.env.BACKEND_URL + '/users/verify-account');
		const body = JSON.stringify({
			userId,
			hash
		});

		verifyUrl.searchParams.set('body', body);

		const expiration = DateTime.now().plus({ minutes: parseInt(process.env.GENERIC_JWT_SECRET_EXPIRES) }).toJSDate();
		const urlSigned = this.signService.generate(verifyUrl, expiration);

		// Añadimos los parámetros de la URL firmada a la URL del frontend para que
		// sean usados al hacer la petición de verificación de email
		const frontUrl = new URL(process.env.FRONTEND_URL + '/verify-email');

		Array.from(urlSigned.searchParams.entries()).forEach(([key, value]) => {
			frontUrl.searchParams.append(key, value);
		});

		return frontUrl;
	}
}
