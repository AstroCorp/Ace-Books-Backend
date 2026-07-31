import { Collection } from "@mikro-orm/core";
import { OneToMany } from "@mikro-orm/decorators/legacy";
import { BaseEntity } from "@/infrastructure/orm/entities/BaseEntity";
import type { File } from "@/infrastructure/orm/entities/File";
import type { AbstractConstructor, FileDTO, WithFiles } from "@/infrastructure/orm/types/entities";

export const FileCollection = {
	Image: "image",
	File: "file",
} as const;

export function HasFiles<TBase extends AbstractConstructor<BaseEntity>>(Base: TBase) {
	// Lazy para evitar dependencia circular (`require` no resuelve alias `@/`)
	function getFileClass() {
		return require("../File").File as typeof import("../File").File;
	}

	abstract class HasFilesHost extends Base implements WithFiles {
		@OneToMany(() => getFileClass(), (file: File) => file.model)
		files = new Collection<File>(this);

		addFile(fileDTO: FileDTO): File {
			const FileEntity = getFileClass();
			const file = new FileEntity(fileDTO);

			file.model = this as unknown as File["model"];
			this.files.add(file);

			return file;
		}

		getFile(collection: string): File | undefined {
			return this.files.getItems().find((file) => file.collection === collection);
		}
	}

	return HasFilesHost;
}
