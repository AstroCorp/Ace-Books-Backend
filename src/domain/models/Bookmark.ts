import { BaseModel, BaseModelDTO } from "./BaseModel";

interface BookmarkDTO extends BaseModelDTO {
	user: number;
	book: number;
	color: string;
	page: number;
	comment: string;
}

class Bookmark extends BaseModel {
	private user: number;
	private book: number;
	private color: string;
	private page: number;
	private comment: string;

	constructor(bookmarkDTO: BookmarkDTO) {
		super(bookmarkDTO);

		this.user = bookmarkDTO.user;
		this.book = bookmarkDTO.book;
		this.color = bookmarkDTO.color;
		this.page = bookmarkDTO.page;
		this.comment = bookmarkDTO.comment;
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
