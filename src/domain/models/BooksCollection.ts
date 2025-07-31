import { BaseModel, BaseModelDTO } from "./BaseModel";

interface BooksCollectionDTO extends BaseModelDTO {
	user: number;
	title: string;
	image: string | null;
	description: string;
}

class BooksCollection extends BaseModel {
	private user: number;
	private title: string;
	private image: string | null;
	private description: string;

	constructor(booksCollectionDTO: BooksCollectionDTO) {
		super(booksCollectionDTO);

		this.user = booksCollectionDTO.user;
		this.title = booksCollectionDTO.title;
		this.image = booksCollectionDTO.image;
		this.description = booksCollectionDTO.description;
	}

	public toObject(): BooksCollectionDTO {
		return {
			...super.toObject(),
			user: this.user,
			title: this.title,
			image: this.image,
			description: this.description,
		};
	}
}

export { BooksCollection, BooksCollectionDTO };
