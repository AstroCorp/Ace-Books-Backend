interface BaseModelDTO {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

abstract class BaseModel {
	private _id: number;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor(baseModelDTO: BaseModelDTO) {
		this._id = baseModelDTO.id;
		this._createdAt = baseModelDTO.createdAt;
		this._updatedAt = baseModelDTO.updatedAt;
	}

	public toObject(): BaseModelDTO {
		return {
			id: this._id,
			createdAt: this._createdAt,
			updatedAt: this._updatedAt,
		};
	}

	public get id(): number {
		return this._id;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}

export { BaseModelDTO, BaseModel };
