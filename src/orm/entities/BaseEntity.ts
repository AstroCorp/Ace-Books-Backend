import { PrimaryKey, Property } from '@mikro-orm/core';
import { format } from 'date-fns';

export abstract class BaseEntity 
{
	@PrimaryKey()
	id!: number;

	@Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
	createdAt!: Date;

	@Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
	updatedAt!: Date;
}
