import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class AppService {
	getHello(): string {
		fs.readdirSync(process.cwd() + '/src/emails/templates/').forEach((file) => {
			console.log('>> debug ls', file);
		});
		return 'Hello World!';
	}
}
