import { Get, Controller } from '@nestjs/common';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';
import { Author } from '../../entities';

@Controller('author')
export class AuthorController {

  constructor(@InjectRepository(Author) private readonly authorRepository: EntityRepository<Author>) { }

  @Get()
  async find() {
    return await this.authorRepository.findAll();
  }

}
