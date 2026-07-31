import { Opt } from "@mikro-orm/core";
import { PrimaryKey, Property } from "@mikro-orm/decorators/legacy";

export abstract class BaseEntity {
	@PrimaryKey()
	id: number;

	@Property()
	createdAt: Date & Opt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date & Opt = new Date();
}
