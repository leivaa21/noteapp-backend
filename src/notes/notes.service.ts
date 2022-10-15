import { Injectable } from '@nestjs/common';
import Note from './note.entity';

@Injectable()
class NotesService {
  getNotes(): Note[] {
    return [];
  }
}

export { NotesService };
