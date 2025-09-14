import { BaseModel, BaseModelDTO } from "./BaseModel";

interface BookmarkDTO extends BaseModelDTO {
	user: number;
	book: number;
	color: string;
	page: number;
	comment: string;
}

class Bookmark extends BaseModel {
	private _user: number;
	private _book: number;
	private _color: string;
	private _page: number;
	private _comment: string;

	constructor(bookmarkDTO: BookmarkDTO) {
		super(bookmarkDTO);

		this._user = bookmarkDTO.user;
		this._book = bookmarkDTO.book;
		this._color = bookmarkDTO.color;
		this._page = bookmarkDTO.page;
		this._comment = bookmarkDTO.comment;
	}

	public get user(): number {
		return this._user;
	}

	public get book(): number {
		return this._book;
	}

	public get color(): string {
		return this._color;
	}

	public get page(): number {
		return this._page;
	}

	public get comment(): string {
		return this._comment;
	}

	public toObject(): BookmarkDTO {
		return {
			...super.toObject(),
			user: this.user,
			book: this.book,
			color: this.color,
			page: this.page,
			comment: this.comment,
		};
	}
}

export { Bookmark, BookmarkDTO };
