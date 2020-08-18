import { Get, Controller, Redirect } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
		//
	}

	@Get()
	root() {
		Redirect(this.appService.getRepository());
	}
}
