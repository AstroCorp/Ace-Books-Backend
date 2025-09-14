import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "@/infrastructure/auth/guards/jwt.guard";
import { Session } from "@/infrastructure/auth/types/session";

@Controller('users')
export class ProfileController
{
	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	__invoke(@Request() req: Session) {
    	return req.user.getDataForProfile();
	}
}
