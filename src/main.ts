import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const session = require('express-session');

	app.use(session({
		secret: 'ace-books',
		resave: false,
		saveUninitialized: false
	}));

	await app.listen(3000);
}

bootstrap();
