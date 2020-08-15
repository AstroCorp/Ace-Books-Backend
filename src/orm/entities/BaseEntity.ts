import { IdEntity, PrimaryKey, Property } from "mikro-orm";

export abstract class BaseEntity implements IdEntity<BaseEntity> {
	@PrimaryKey()
	id!: number;

	@Property({ default: 'CURRENT_TIMESTAMP' })
	createdAt!: Date;

	@Property({ default: 'CURRENT_TIMESTAMP', onUpdate: () => 'CURRENT_TIMESTAMP' })
	updatedAt!: Date;
}
