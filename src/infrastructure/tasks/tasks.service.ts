import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Token } from "@/infrastructure/orm/entities/Token";

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(
		private readonly em: EntityManager,
	) {
		//
	}

	@Cron('0 8 * * 1') // 8:00 de cada lunes
	async removeExpiredTokens() {
		const emFork = this.em.fork();

		// Eliminamos los tokens que han expirado, es decir,
		// los que han sido creados hace más de 7 días
		const tokens = await emFork.find(Token, {
			createdAt: {
				$lte: new Date(Date.now() - 604800000),
			},
		});

		await emFork.remove(tokens).flush();

		this.logger.log('Expired tokens removed');
	}
}
