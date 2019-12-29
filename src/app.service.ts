import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	root(): string {
		return "Ace Books - API";
	}
}
