import { BaseModel, BaseModelDTO } from "./BaseModel";

interface BookDTO extends BaseModelDTO {
	user: number;
	title: string;
	image: string | null;
	description: string;
	pages: number;
	filename: string;
}

class Book extends BaseModel {
	private user: number;
	private title: string;
	private image: string | null;
	private description: string;
	private pages: number;
	private filename: string;

	constructor(bookDTO: BookDTO) {
		super(bookDTO);

		this.user = bookDTO.user;
		this.title = bookDTO.title;
		this.image = bookDTO.image;
		this.description = bookDTO.description;
		this.pages = bookDTO.pages;
		this.filename = bookDTO.filename;
	}

	public toObject(): BookDTO {
		return {
			...super.toObject(),
			user: this.user,
			title: this.title,
			image: this.image,
			description: this.description,
			pages: this.pages,
			filename: this.filename,
		};
	}
}

export { Book, BookDTO };
