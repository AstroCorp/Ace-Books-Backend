import { ExceptionFilter as NestExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import BaseException from '@/domain/common/exceptions/baseException';

interface ExceptionMapping {
	exception: Function;
	status: HttpStatus;
}

@Catch(BaseException)
export class ExceptionFilter implements NestExceptionFilter {
	private readonly logger = new Logger(ExceptionFilter.name);

	constructor(private readonly exceptionMappings: ExceptionMapping[]) {
		//
	}

	catch(exception: BaseException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();
		const request = ctx.getRequest<FastifyRequest>();

		const mapping = this.exceptionMappings.find(m => exception instanceof m.exception);
		const statusCode = mapping?.status || HttpStatus.INTERNAL_SERVER_ERROR;

		this.logger.error(`${exception.code}: ${exception.message}`, exception.stack, {
			code: exception.code,
			status: statusCode,
			path: request.url,
			method: request.method,
			stack: exception.stack,
		});

		response.status(statusCode).send({
			code: exception.code,
			message: exception.message,
			path: request.url,
			method: request.method,
		});
	}
}
