import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { format } from 'date-fns'
import { InjectRepository } from 'nestjs-mikro-orm';
import { RefreshToken, User } from 'orm/entities';
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

	@Cron('0 8 * * 1') // 8:00 de cada lunes
	async handleCron() {
		const oldRefreshTokens = await this.refreshTokenRepository.find({ 
			$and: [
				{ 
					expiresIn: { 
						$lte: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
					},
				},
			],
		});
		
		oldRefreshTokens.forEach(async (rf: RefreshToken) => {
			const user = await rf.user.load();

			this.logger.log("Borrando token " + rf.token + " de " + user.email 
				+ " expirado el " + format(new Date(rf.expiresIn), 'dd-MM-yyyy') + ' a las ' + format(new Date(rf.expiresIn), 'HH:mm:ss'));
			
			await this.refreshTokenRepository.remove(rf);
		});

		this.refreshTokenRepository.flush();
		
		this.logger.debug('Se han eliminado los refresh_tokens antiguos');
	}
}
