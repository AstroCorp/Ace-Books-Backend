import { Book } from "@/orm/entities/Book";
import { User } from "@/orm/entities/User";

export interface BookDTO {
	user: User;
	title: string;
	image: string | null;
	description: string;
	pages: number;
	filename: string;
}

export interface BookmarkDTO {
	user: User;
	book: Book;
	color: string;
	page: number;
	comment: string;
}

export interface BooksCollectionDTO {
	user: User;
	title: string;
	image: string | null;
	description: string;
}

export interface UserDTO {
	email: string;
	password: string;
}
