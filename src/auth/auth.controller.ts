import { Controller, UseGuards, Post, Body, HttpCode, Res, Req, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './validation/dto/createUser.dto';
import Session from './types/session';

@Controller('auth')
export class AuthController
{
	constructor(
		private authService: AuthService,
	) {
		//
	}

	@Post('register')
	async register(@Body() body: CreateUserDto, @Res() response: Response): Promise<Response<any, Record<string, any>>> {
		const { refresh_token, access_token } = await this.authService.register(body.email, body.password, body.lang);

		response.cookie('refresh_token', refresh_token.token, { 
			httpOnly: true, 
			expires: new Date(refresh_token.expiresIn),
		});

		return response.send({
			access_token,
		});
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(200)
	async login(@Req() req: Session, @Res() response: Response): Promise<Response<any, Record<string, any>>> {
		const { refresh_token, access_token } = await this.authService.login(req.user);

		response.cookie('refresh_token', refresh_token.token, { 
			httpOnly: true, 
			expires: new Date(refresh_token.expiresIn),
		});

		return response.send({
			access_token,
		});
	}

	@Post('refresh')
	async refreshToken(@Req() request: Request, @Res() response: Response): Promise<Response<any, Record<string, any>>> {
		const refreshToken = request.cookies ? request.cookies.refresh_token : null;

		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		const { refresh_token, access_token } = await this.authService.refreshToken(refreshToken);

		response.cookie('refresh_token', refresh_token.token, { 
			httpOnly: true, 
			expires: new Date(refresh_token.expiresIn),
		});

		return response.send({
			access_token,
		});
	}

	@Post('logout')
	@HttpCode(200)
	async logout(@Req() request: Request, @Res() response: Response): Promise<Response<any, Record<string, any>>> {
		const { refresh_token: refreshToken } = request.cookies;

		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		await this.authService.logout(refreshToken);

		response.cookie('refresh_token', refreshToken, { 
			httpOnly: true, 
			expires: new Date(0),
		});

		return response.send();
	}
}
