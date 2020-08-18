import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getRepository(): string {
		return 'https://github.com/AstroCorp/Ace-Books-Backend';
	}
}
