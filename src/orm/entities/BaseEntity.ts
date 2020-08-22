import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
	@PrimaryKey()
	id!: number;

	@Property({ default: 'CURRENT_TIMESTAMP' })
	createdAt!: Date;

	@Property({ default: 'CURRENT_TIMESTAMP', onUpdate: () => 'CURRENT_TIMESTAMP' })
	updatedAt!: Date;
}
