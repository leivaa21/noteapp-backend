import { Injectable } from '@nestjs/common';
import Note from './note.entity';

import { randomUUID } from 'crypto';

@Injectable()
class NotesService {
  private readonly notes = new Array<Note>();
  createNote(title: string, content: string): void {
    const id = randomUUID();
    const note = new Note(id, title, content);
    this.notes.push(note);
  }
  getNotes(): Note[] {
    return this.notes;
  }
  getNoteByID(id: string): Note | undefined {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      return undefined;
    }
    return this.notes[index];
  }
}

export { NotesService };
