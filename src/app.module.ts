import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './modules/orm/orm.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [OrmModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
