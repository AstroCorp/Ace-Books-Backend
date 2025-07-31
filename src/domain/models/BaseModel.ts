interface BaseModelDTO {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

class BaseModel {
	private id: number;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(baseModelDTO: BaseModelDTO) {
		this.id = baseModelDTO.id;
		this.createdAt = baseModelDTO.createdAt;
		this.updatedAt = baseModelDTO.updatedAt;
	}

	public toObject(): BaseModelDTO {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export { BaseModelDTO, BaseModel };
