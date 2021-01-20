import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController
{
	constructor(
		private readonly appService: AppService
	) {
		//
	}

	@ApiExcludeEndpoint(true)
	@Get()
	root() {
		return this.appService.root();
	}
}
