import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";
import SignService from "@/infrastructure/auth/services/sign.service";

@Injectable()
export class SignGuard implements CanActivate
{
	constructor(
		private readonly sign: SignService,
	) {
		//
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<FastifyRequest>();
		const fullUrl = request.protocol + '://' + request.headers.host + request.raw.url;
		const fullUrlObj = new URL(fullUrl);

		console.error('LOG SIGN GUARD', fullUrl);

		if (Object.keys(request.body || {}).length > 0) {
			const bodyString = JSON.stringify(request.body);
			fullUrlObj.searchParams.set('body', bodyString);

			console.error('LOG SIGN GUARD BODY', bodyString);
		}

		return this.sign.check(fullUrlObj);
	}
}
