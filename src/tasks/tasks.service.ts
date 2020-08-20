import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from 'nestjs-mikro-orm';
import { RefreshToken } from 'orm/entities';
import { EntityRepository } from 'mikro-orm';

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(
		@InjectRepository(RefreshToken) 
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
	) {
		//
	}

	// @Cron('0 0 8 ? * MON *') // 8:00 de cada lunes
	@Cron('3 * * * * *')
	async handleCron() {
		const oldRefreshTokens = await this.refreshTokenRepository.find({ 
			$and: [
				{ 
					expiresIn: { 
						$lte: new Date()
					} 
				}
			] 
		});
		
		console.log(oldRefreshTokens);
		console.log(await this.refreshTokenRepository.findAll());
		// await this.refreshTokenRepository.removeAndFlush(dbRefreshToken);

		this.logger.debug('Se han eliminado los refresh_tokens antiguos');
	}
}
