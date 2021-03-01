import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { format } from 'date-fns';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RefreshToken } from '../orm/entities';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class TasksService
{
	private readonly logger = new Logger(TasksService.name);

	constructor(
		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
	) {
		//
	}

	@Cron('0 8 * * 1') // 8:00 de cada lunes
	async handleCron(): Promise<void> {
		await this.refreshTokenRepository.nativeDelete({
			$and: [
				{
					expiresIn: {
						$lte: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
					},
				},
			],
		});

		this.logger.log('Se han eliminado los refresh_tokens que han expirado');
	}
}
