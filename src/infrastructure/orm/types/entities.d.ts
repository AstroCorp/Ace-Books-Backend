import type { Collection } from "@mikro-orm/core";
import type { TokenType } from "@/domain/common/models/Token";
import type { File as FileEntity } from "@/infrastructure/orm/entities/File";

export interface BookDTO {
	user: number;
	title: string;
	description: string;
	pages: number;
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

export interface FileDTO {
	collection: string;
	filename: string;
	disk: string;
	size: number;
}

export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

export interface WithFiles {
	files: Collection<FileEntity>;
	addFile(fileDTO: FileDTO): FileEntity;
	getFile(collection: string): FileEntity | undefined;
}
