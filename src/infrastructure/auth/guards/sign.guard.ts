import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import SignService from '@/infrastructure/auth/services/sign.service';

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

		const checkMethod = ['GET', 'DELETE'].includes(request.method);

		if (!checkMethod) {
			return false;
		}

		console.log('SignGuard:', fullUrl);

		return this.sign.check(fullUrlObj);
	}
}
