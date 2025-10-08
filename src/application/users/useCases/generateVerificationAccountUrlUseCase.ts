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
		const hash = this.hashService.generate(user.email);
		const verifyUrl = new URL(process.env.BACKEND_URL + '/users/verify-account');
		const body = JSON.stringify({
			email: user.email,
			hash
		});

		verifyUrl.searchParams.set('body', body);

		const expiration = DateTime.now().plus({ minutes: parseInt(process.env.GENERIC_JWT_SECRET_EXPIRES) }).toJSDate();
		const urlSigned = this.signService.generate(verifyUrl, expiration);

		// Añadimos los parámetros de la URL firmada a la URL del frontend para que
		// sean usados al hacer la petición de verificación de email
		const frontUrl = new URL(process.env.FRONTEND_URL + '/verify-email');

		Array.from(urlSigned.searchParams.entries()).forEach(([key, value]) => {
			if (key === 'body') {
				const bodyObj = JSON.parse(value);

				Array.from(Object.entries(bodyObj)).forEach(([bodyKey, bodyValue]: [string, string]) => {
					frontUrl.searchParams.append(bodyKey, bodyValue);
				});

				return;
			}

			frontUrl.searchParams.append(key, value);
		});

		return frontUrl;
	}
}
