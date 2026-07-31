import { Rel } from "@mikro-orm/core";
import { Entity, Index, ManyToOne, Property } from "@mikro-orm/decorators/legacy";
import { BaseEntity } from "@/infrastructure/orm/entities/BaseEntity";
import { Book } from "@/infrastructure/orm/entities/Book";
import { BooksCollection } from "@/infrastructure/orm/entities/BooksCollection";
import type { FileDTO } from "@/infrastructure/orm/types/entities";

@Entity({ tableName: 'files' })
@Index({ properties: ['model'] })
export class File extends BaseEntity
{
	// Relación polimórfica estilo Spatie: model_type + model_id
	@ManyToOne(() => [Book, BooksCollection])
	model: Rel<Book> | Rel<BooksCollection>;

	@Property()
	collection: string;

	@Property()
	filename: string;

	@Property()
	disk: string;

	@Property()
	size: number;

	constructor(fileDTO: FileDTO) {
		super();

		this.collection = fileDTO.collection;
		this.filename = fileDTO.filename;
		this.disk = fileDTO.disk;
		this.size = fileDTO.size;
	}
}
