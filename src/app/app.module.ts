import { Module } from '@nestjs/common';
import { NotesController } from 'src/notes/notes.controller';
import { NotesService } from 'src/notes/notes.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
