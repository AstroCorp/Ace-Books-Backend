import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
	@PrimaryKey()
	id!: number;

	@Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
	createdAt!: Date;

	@Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => 'CURRENT_TIMESTAMP' })
	updatedAt!: Date;
}
