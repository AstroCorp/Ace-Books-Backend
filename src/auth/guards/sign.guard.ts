import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { checkUrlSigned } from '@/auth/utils/sign';

@Injectable()
export class SignGuard implements CanActivate
{
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<FastifyRequest>();
		const fullUrl = request.protocol + '://' + request.hostname + request.raw.url;

		const queryParams = Object.keys(request.query).filter((key) => key !== 'signature' && key !== 'expires');
		const bodyParams = Object.keys(request.body);

		// Comprobamos que el body coincida con los parámetros firmados
		const checkBodyParams = queryParams.every((key) => bodyParams.includes(key) && request.body[key].toString() === request.query[key].toString());

		if (!checkBodyParams) {
			return false;
		}

		return checkUrlSigned(fullUrl);
	}
}
