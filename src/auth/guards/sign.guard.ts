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

		return checkUrlSigned(fullUrl);
	}
}
