import { RefreshToken } from "@/orm/entities/RefreshToken";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(
		private readonly em: EntityManager,
	) {
		//
	}

	@Cron('0 8 * * 1') // 8:00 de cada lunes
	async removeExpiredRefreshTokens() {
		const emFork = this.em.fork();

		// Eliminamos los refresh_tokens que han expirado, es decir,
		// los que han sido creados hace más de 7 días
		const refreshTokens = await emFork.find(RefreshToken, {
			createdAt: {
				$lte: new Date(Date.now() - 604800000),
			},
		});

		await emFork.remove(refreshTokens).flush();

		this.logger.log('Expired refresh tokens removed');
	}
}
