import { Controller, UseGuards, Get, Post, Req, Res, Request } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "orm/entities";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		@InjectRepository(User) 
		private readonly userRepository: EntityRepository<User>, 
		
		private authService: AuthService,
	) {
		//
	}

	@Post("register")
	async register(@Req() req) {
		return await this.authService.register(req.body.email, req.body.password);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req) {
    	return req.user;
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('test')
	async test() {
		return await this.userRepository.findAll();
	}
}
