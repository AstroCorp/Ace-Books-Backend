import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { Author } from '../../entities';
import config from '../../mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [Author],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
