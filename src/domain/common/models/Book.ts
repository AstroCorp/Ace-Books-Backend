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
	private _user: number;
	private _title: string;
	private _image: string | null;
	private _description: string;
	private _pages: number;
	private _filename: string;

	constructor(bookDTO: BookDTO) {
		super(bookDTO);

		this._user = bookDTO.user;
		this._title = bookDTO.title;
		this._image = bookDTO.image;
		this._description = bookDTO.description;
		this._pages = bookDTO.pages;
		this._filename = bookDTO.filename;
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

	public get pages(): number {
		return this._pages;
	}

	public get filename(): string {
		return this._filename;
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
