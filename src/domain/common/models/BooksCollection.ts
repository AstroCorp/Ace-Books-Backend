import { BaseModel, BaseModelDTO } from "./BaseModel";

interface BooksCollectionDTO extends BaseModelDTO {
	user: number;
	title: string;
	image: string | null;
	description: string;
}

class BooksCollection extends BaseModel {
	private _user: number;
	private _title: string;
	private _image: string | null;
	private _description: string;

	constructor(booksCollectionDTO: BooksCollectionDTO) {
		super(booksCollectionDTO);

		this._user = booksCollectionDTO.user;
		this._title = booksCollectionDTO.title;
		this._image = booksCollectionDTO.image;
		this._description = booksCollectionDTO.description;
	}

	public get user(): number {
		return this._user;
	}

	public get title(): string {
		return this._title;
	}

	public get image(): string | null {
		return this._image;
	}

	public get description(): string {
		return this._description;
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
