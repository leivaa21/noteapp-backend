import { Injectable } from '@nestjs/common';
import Note from './note.entity';

import { randomUUID } from 'crypto';

@Injectable()
class NotesService {
  private readonly notes = new Map<string, Note>();
  createNote(title: string, content: string): void {
    const id = randomUUID();
    const note = new Note(id, title, content);
    this.notes.set(id, note);
  }
  getNotes(): Note[] {
    return Array.from(this.notes.values());
  }
  getNoteByID(id: string): Note | undefined {
    const note = this.notes.get(id);
    return note;
  }
  deleteNoteByID(id: string): void {
    if (!this.notes.has(id)) {
      return;
    }
    this.notes.delete(id);
  }
}

export { NotesService };
