import type { TokenType } from "@/domain/common/models/Token";

export interface BookDTO {
	user: number;
	title: string;
	image: string | null;
	description: string;
	pages: number;
	filename: string;
}

export interface BookmarkDTO {
	user: number;
	book: number;
	color: string;
	page: number;
	comment: string;
}

export interface BooksCollectionDTO {
	user: number;
	title: string;
	image: string | null;
	description: string;
}

export interface UserDTO {
	email: string;
	password: string;
}

export interface TokenDTO {
	user: number;
	token: string;
	type: TokenType;
}
